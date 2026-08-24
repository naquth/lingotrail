"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
  lessonId?: number;
};

export const LessonFooter = ({ onCheck, status, disabled }: Props) => {
  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2 fixed bottom-0 left-0 right-0",
        status === "correct" && "border-transparent bg-mist",
        status === "wrong" && "border-transparent bg-red-50",
        status === "none" && "border-line bg-paper"
      )}
    >
      <div className="max-w-2xl mx-auto flex items-center h-full justify-between px-4 lg:px-10">
        {status === "correct" && (
          <div className="text-trail-deep font-bold text-base lg:text-2xl flex items-center gap-2">
            <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8" />
            Betul!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-coral-deep font-bold text-base lg:text-2xl flex items-center gap-2">
            <XCircle className="h-6 w-6 lg:h-8 lg:w-8" />
            Coba lagi
          </div>
        )}
        {status === "none" && <div />}

        <Button
          onClick={onCheck}
          disabled={disabled}
          size="lg"
          variant={status === "wrong" ? "coral" : "primary"}
          className="ml-auto min-w-32"
        >
          {status === "none" ? "Periksa" : "Lanjut"}
        </Button>
      </div>
    </footer>
  );
};
