"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-foreground transition-all hover:bg-black/[0.06] dark:hover:bg-white/[0.08] ${className}`}
      aria-label="Toggle color theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-500 transition-transform rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
