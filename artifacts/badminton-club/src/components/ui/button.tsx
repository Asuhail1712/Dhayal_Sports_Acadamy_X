import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "interactive-button inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,#FF4D00,#FF8A00)] text-primary-foreground shadow-[0_12px_35px_rgba(255,90,0,0.28)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(255,90,0,0.24)]",
        outline:
          "border-2 border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        glass:
          "glass-panel text-foreground hover:bg-white hover:-translate-y-0.5 hover:border-primary/30",
        neon:
          "border-2 border-primary bg-transparent text-primary shadow-[inset_0_0_0_1px_rgba(255,90,0,0.08)] hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_18px_34px_rgba(255,90,0,0.18)]",
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
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
