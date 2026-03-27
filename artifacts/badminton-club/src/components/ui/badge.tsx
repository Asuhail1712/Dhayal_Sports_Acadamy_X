import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "glass" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground": variant === "destructive",
          "text-foreground": variant === "outline",
          "border-white/10 bg-white/5 backdrop-blur-md text-foreground": variant === "glass",
          "border-transparent bg-green-500/20 text-green-400 border border-green-500/30": variant === "success",
          "border-transparent bg-orange-500/20 text-orange-400 border border-orange-500/30": variant === "warning",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
