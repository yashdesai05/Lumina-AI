import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function GlassCard({
  className,
  hover = true,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/85 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm dark:shadow-none transition-colors",
        hover &&
          "duration-300 hover:border-black/[0.14] dark:hover:border-white/[0.16] hover:shadow-md dark:hover:bg-white/[0.05]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
