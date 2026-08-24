"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type Props = {
  value?: number;
  className?: string;
};

export const Progress = ({ value, className }: Props) => {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-mist border border-line",
        className
      )}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-trail transition-all rounded-full"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
