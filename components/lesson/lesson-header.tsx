"use client";

import { useRouter } from "next/navigation";
import { X, Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

export const LessonHeader = ({ hearts, percentage, hasActiveSubscription }: Props) => {
  const router = useRouter();

  return (
    <header className="lg:pt-8 pt-6 px-4 lg:px-10 flex gap-x-4 items-center max-w-2xl mx-auto w-full">
      <button onClick={() => router.push("/learn")} aria-label="Tutup pelajaran">
        <X className="text-ink/40 hover:text-ink/70 transition-colors h-6 w-6" />
      </button>
      <Progress value={percentage} className="h-3" />
      <div className="text-coral-deep flex items-center font-bold gap-1">
        <Heart className="h-5 w-5 fill-coral text-coral-deep" />
        {hasActiveSubscription ? "\u221e" : hearts}
      </div>
    </header>
  );
};
