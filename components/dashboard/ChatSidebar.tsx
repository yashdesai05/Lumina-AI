"use client";

import { Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "./ChatContext";

const historySections = [
  {
    group: "Today",
    chats: ["Landing page copy ideas", "Debug Next.js hydration error"],
  },
  {
    group: "Yesterday",
    chats: ["Q3 roadmap summary", "Rewrite onboarding emails"],
  },
  {
    group: "Previous 7 days",
    chats: [
      "Competitor pricing analysis",
      "SQL query optimization",
      "Brainstorm feature names",
    ],
  },
];

export function ChatSidebar() {
  const { activeChatTitle, loadChat, searchHistory, setSearchHistory } = useChat();

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-white/[0.06] bg-surface/40 lg:flex">
      <div className="p-4">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <Search className="h-3.5 w-3.5 text-muted" />
          <input
            placeholder="Search history..."
            value={searchHistory}
            onChange={(e) => setSearchHistory(e.target.value)}
            className="w-full bg-transparent text-xs text-foreground placeholder:text-muted focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {historySections.map((section) => {
          const matchingChats = section.chats.filter((c) =>
            c.toLowerCase().includes(searchHistory.toLowerCase())
          );

          if (matchingChats.length === 0) return null;

          return (
            <div key={section.group} className="mb-4">
              <p className="px-2 pb-2 text-[11px] font-medium text-muted/70 uppercase tracking-wider">
                {section.group}
              </p>
              <div className="space-y-0.5">
                {matchingChats.map((chat) => (
                  <button
                    key={chat}
                    onClick={() => loadChat(chat)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
                      activeChatTitle === chat
                        ? "bg-white/[0.08] text-foreground font-medium border border-white/[0.06]"
                        : "text-muted hover:bg-white/[0.03] hover:text-foreground"
                    )}
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 text-primary-400" />
                    <span className="truncate">{chat}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
