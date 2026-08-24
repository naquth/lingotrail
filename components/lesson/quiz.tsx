"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Gem, Heart } from "lucide-react";
import { reduceHearts } from "@/actions/user-progress";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { LessonHeader } from "./lesson-header";
import { ChallengeCard } from "./challenge-card";
import { LessonFooter } from "./lesson-footer";
import { Button } from "@/components/ui/button";

type ChallengeOption = {
  id: number;
  text: string;
  correct: boolean;
  imageSrc: string | null;
  audioSrc: string | null;
};

type Challenge = {
  id: number;
  question: string;
  type: "SELECT" | "ASSIST" | "MATCH" | "TRANSLATE" | "LISTEN" | "FILL_BLANK";
  completed: boolean;
  challengeOptions: ChallengeOption[];
};

type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  challenges: Challenge[];
  hasActiveSubscription: boolean;
};

export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialPercentage,
  challenges,
  hasActiveSubscription,
}: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((c) => !c.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const isLessonComplete = activeIndex >= challenges.length;

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((current) => current + 1);
    setSelectedOption(undefined);
    setStatus("none");
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      return;
    }

    const correctOption = options.find((o) => o.correct);
    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") return;
            setStatus("correct");
            setPercentage((p) => p + 100 / challenges.length);
            if (hearts < 5) setHearts((h) => h + 0);
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.7 },
              colors: ["#0F7A72", "#F2B705", "#FF6B5B"],
            });
          })
          .catch(() => {});
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") return;
            setStatus("wrong");
            setHearts((h) => Math.max(h - 1, 0));
          })
          .catch(() => {});
      });
    }
  };

  if (isLessonComplete) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 h-full py-16 px-6 text-center">
        <Image src="/mascot/compa.svg" alt="" width={160} height={160} className="animate-float-slow" />
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-trail-deep">
          Pelajaran selesai!
        </h1>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <Gem className="h-8 w-8 fill-trail-light text-trail" />
            <p className="font-bold text-lg">{challenges.length * 10} XP</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Heart className="h-8 w-8 fill-coral text-coral-deep" />
            <p className="font-bold text-lg">{hearts}</p>
          </div>
        </div>
        <Button size="lg" onClick={() => router.push("/learn")}>
          Lanjut
        </Button>
      </div>
    );
  }

  if (hearts === 0 && !hasActiveSubscription) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 h-full py-16 px-6 text-center">
        <Image src="/mascot/compa.svg" alt="" width={140} height={140} />
        <h1 className="font-display text-2xl font-bold text-coral-deep">
          Hearts kamu habis!
        </h1>
        <p className="text-ink/60 max-w-sm">
          Isi ulang hearts di toko pakai gems, atau tunggu sampai besok untuk
          lanjut belajar.
        </p>
        <Button size="lg" onClick={() => router.push("/shop")}>
          Ke toko
        </Button>
      </div>
    );
  }

  return (
    <>
      <LessonHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={hasActiveSubscription}
      />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full py-8 lg:py-12">
          <h1 className="font-display text-xl lg:text-2xl font-bold text-center mb-8">
            {challenge?.question}
          </h1>

          <div
            className={
              challenge?.type === "ASSIST"
                ? "flex flex-col gap-3"
                : "grid grid-cols-1 sm:grid-cols-2 gap-3"
            }
          >
            {options.map((option) => (
              <ChallengeCard
                key={option.id}
                id={option.id}
                text={option.text}
                type={challenge.type}
                selected={selectedOption === option.id}
                onClick={() => onSelect(option.id)}
                disabled={pending || status !== "none"}
                status={
                  selectedOption === option.id
                    ? status
                    : "none"
                }
              />
            ))}
          </div>
        </div>
      </div>

      <LessonFooter
        onCheck={onContinue}
        status={status}
        disabled={pending || !selectedOption}
      />
    </>
  );
};
