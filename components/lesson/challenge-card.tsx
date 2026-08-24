"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  id: number;
  text: string;
  selected?: boolean;
  correct?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  type: "SELECT" | "ASSIST" | "MATCH" | "TRANSLATE" | "LISTEN" | "FILL_BLANK";
};

export const ChallengeCard = ({ text, selected, onClick, disabled, status, type }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-full border-2 border-line rounded-xl p-4 lg:p-5 flex items-center gap-3 hover:bg-mist active:scale-[0.98] transition-all text-left bg-white",
        selected && "border-trail-light bg-mist",
        selected && status === "correct" && "border-trail bg-mist",
        selected && status === "wrong" && "border-coral bg-red-50",
        type === "ASSIST" && "w-full"
      )}
    >
      <div
        className={cn(
          "h-6 w-6 shrink-0 rounded-md border-2 border-line flex items-center justify-center text-xs font-bold text-ink/40",
          selected && "border-trail-light text-trail",
          selected && status === "correct" && "bg-trail border-trail text-white",
          selected && status === "wrong" && "bg-coral border-coral text-white"
        )}
      >
        {selected && status === "correct" && <Check className="h-4 w-4" />}
        {selected && status === "wrong" && <X className="h-4 w-4" />}
      </div>
      <p className="text-ink font-medium text-sm lg:text-base">{text}</p>
    </button>
  );
};
