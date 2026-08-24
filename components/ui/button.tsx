import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-3d inline-flex items-center justify-center gap-2 rounded-2xl font-display font-bold uppercase tracking-wide text-sm transition-colors disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-trail text-white [--btn-shadow:#0a4a4a] hover:bg-trail-light",
        sun: "bg-sun text-ink [--btn-shadow:#a67900] hover:brightness-105",
        coral:
          "bg-coral text-white [--btn-shadow:#b53a2d] hover:brightness-105",
        outline:
          "bg-white text-trail border-2 border-line [--btn-shadow:#dfe6e2] hover:bg-mist",
        ghost:
          "bg-transparent text-trail-deep shadow-none hover:bg-mist normal-case font-sans font-semibold",
        danger:
          "bg-white text-coral-deep border-2 border-line [--btn-shadow:#dfe6e2] hover:bg-red-50",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-8 text-base",
        sm: "h-9 px-4 text-xs",
        icon: "h-11 w-11",
      },
      full: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, full, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
