"use client";

import { useState } from "react";
import { Search, Bell, Plus, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useChat } from "./ChatContext";

const models = [
  { id: "GPT-4o", label: "GPT-4o (Omni)" },
  { id: "Claude 3.5 Sonnet", label: "Claude 3.5 Sonnet" },
  { id: "Gemini 1.5 Pro", label: "Gemini 1.5 Pro" },
];

export function TopNav() {
  const { selectedModel, setSelectedModel, startNewChat, activeChatTitle } = useChat();
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] dark:border-white/[0.06] border-black/[0.06] bg-background/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-medium text-foreground truncate max-w-xs sm:max-w-sm">
          {activeChatTitle}
        </h1>

        {/* Model Dropdown */}
        <div className="relative">
          <button
            onClick={() => setModelOpen(!modelOpen)}
            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 text-xs text-muted hover:text-foreground transition-colors"
          >
            <Sparkles className="h-3 w-3 text-primary-400" />
            <span>{selectedModel}</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>

          {modelOpen && (
            <div className="absolute left-0 mt-2 z-50 w-44 rounded-xl border border-black/10 dark:border-white/10 bg-surface/95 p-1.5 shadow-2xl backdrop-blur-xl">
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModel(m.id);
                    setModelOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                    selectedModel === m.id
                      ? "bg-primary/20 text-primary-500 dark:text-primary-300 font-medium"
                      : "text-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-foreground"
                  }`}
                >
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="hidden items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1.5 sm:flex">
          <Search className="h-3.5 w-3.5 text-muted" />
          <input
            placeholder="Search in chat..."
            className="w-36 bg-transparent text-xs text-foreground placeholder:text-muted focus:outline-none"
          />
        </div>

        <ThemeToggle />

        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-muted transition-colors hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-secondary" />
        </button>

        <Button size="sm" onClick={startNewChat} className="flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          <span>New chat</span>
        </Button>
      </div>
    </header>
  );
}
