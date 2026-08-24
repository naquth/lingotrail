"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  completed?: boolean;
  percentage: number;
};

// Horizontal offsets that create the winding trail shape (signature layout)
const OFFSETS = [0, 44, 74, 44, 0, -44, -74, -44];

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  completed,
  percentage,
}: Props) => {
  const router = useRouter();
  const cycleIndex = index % OFFSETS.length;
  const offsetX = OFFSETS[cycleIndex];

  const Icon = completed ? Check : locked ? Star : Star;

  const onClick = () => {
    if (locked) return;
    router.push(`/lesson/${id}`);
  };

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      {current ? (
        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <div className="bg-white border-2 border-line rounded-xl px-3 py-1.5 text-xs font-bold text-trail-deep animate-trail-pulse">
              MULAI
            </div>
            <div className="w-3 h-3 bg-white border-r-2 border-b-2 border-line rotate-45 -mt-1.5" />
          </div>
          <button
            onClick={onClick}
            className="btn-3d h-16 w-16 rounded-full bg-sun text-ink flex items-center justify-center [--btn-shadow:#a67900] hover:brightness-105"
          >
            <Icon className="h-8 w-8 fill-white text-white" strokeWidth={2} />
          </button>
        </div>
      ) : (
        <button
          onClick={onClick}
          disabled={locked}
          className={cn(
            "btn-3d h-14 w-14 rounded-full flex items-center justify-center",
            completed
              ? "bg-trail text-white [--btn-shadow:#0a4a4a]"
              : "bg-white text-ink/30 border-2 border-line [--btn-shadow:#dfe6e2]"
          )}
        >
          <Icon className={cn("h-6 w-6", completed ? "text-white" : "text-ink/30")} />
        </button>
      )}
    </div>
  );
};
