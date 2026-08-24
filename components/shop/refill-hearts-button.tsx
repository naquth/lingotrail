"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";

type Props = {
  hearts: number;
  points: number;
};

export const RefillHeartsButton = ({ hearts, points }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      refillHearts()
        .then(() => router.refresh())
        .catch(() => {});
    });
  };

  return (
    <div className="rounded-2xl border-2 border-line bg-white p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Heart className="h-9 w-9 fill-coral text-coral-deep shrink-0" />
        <div>
          <p className="font-display font-bold">Isi ulang hearts</p>
          <p className="text-ink/50 text-sm">10 gems untuk 5 hearts penuh</p>
        </div>
      </div>
      <Button
        onClick={onClick}
        disabled={pending || hearts === 5 || points < 10}
        variant="sun"
        size="sm"
      >
        {hearts === 5 ? "Penuh" : "Tukar"}
      </Button>
    </div>
  );
};
