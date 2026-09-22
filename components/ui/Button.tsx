"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<string, string> = {
      primary:
        "bg-gradient-to-r from-primary to-secondary text-white shadow-glow hover:scale-[1.02] active:scale-[0.98]",
      ghost:
        "bg-black/[0.04] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.08]",
      outline:
        "border border-black/15 dark:border-white/15 text-foreground hover:border-black/30 dark:hover:border-white/30 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]",
    };

    const sizes: Record<string, string> = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
