import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "interactive-button inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "border border-white/15 bg-primary text-white shadow-[0_8px_20px_-6px_rgba(33,81,163,0.4)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(33,81,163,0.5)]",
        green:
          "border border-white/20 bg-secondary text-[#062a15] shadow-[0_8px_24px_-6px_rgba(0,176,80,0.35)] hover:bg-[#0abd5b] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(0,176,80,0.45)]",
        outline:
          "border border-primary/20 bg-white/80 text-primary backdrop-blur-md hover:bg-primary hover:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        glass:
          "glass-panel text-foreground hover:bg-white hover:-translate-y-0.5 hover:border-primary/30",
        neon: "border-2 border-primary bg-transparent text-primary shadow-[inset_0_0_0_1px_rgba(33,81,163,0.08)] hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_18px_34px_rgba(0,176,80,0.18)]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-2xl px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
