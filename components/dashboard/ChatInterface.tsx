"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Sparkles,
  Paperclip,
  Mic,
  Copy,
  Check,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat, ChatMessage } from "./ChatContext";

const suggestions = [
  "Summarize this document",
  "Write a product update email",
  "Explain this error message",
  "Plan my week",
];

export function ChatInterface() {
  const { messages, sendMessage, isTyping, selectedModel } = useChat();
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  function handleSuggestionClick(suggestionText: string) {
    sendMessage(suggestionText);
  }

  function handleCopyCode(code: string, id: string) {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Scrollable messages container */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-8">
          {messages.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-foreground">
                  What can I solve with you today?
                </h2>
                <p className="text-xs text-muted">
                  Powered by {selectedModel} with live workspace vector context.
                </p>
              </div>

              {/* Starter chips */}
              <div className="flex flex-wrap justify-center gap-2 max-w-md mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-primary/50 hover:bg-white/[0.06] hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[82%] space-y-3 rounded-2xl px-4 py-3 text-xs leading-relaxed",
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary to-secondary text-white font-medium"
                      : "glass text-foreground"
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {/* Render Code Snippet if present */}
                  {message.codeSnippet && (
                    <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/60 font-mono text-[11.5px]">
                      <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-3 py-2 text-muted">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-primary-400">
                          <Code2 className="h-3 w-3" />
                          {message.codeSnippet.language}
                        </span>
                        <button
                          onClick={() =>
                            handleCopyCode(message.codeSnippet!.code, message.id)
                          }
                          className="flex items-center gap-1 text-[11px] hover:text-foreground transition-colors"
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 overflow-x-auto text-gray-200">
                        <code>{message.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="glass flex items-center gap-1.5 rounded-2xl px-4 py-3.5">
                <span className="text-[11px] text-muted mr-1">Thinking with {selectedModel}</span>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-400"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-white/[0.06] bg-background/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl">
          {messages.length > 0 && messages.length <= 4 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-muted transition-colors hover:border-primary/40 hover:bg-white/[0.06] hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSend}
            className="glass-strong flex items-end gap-2 rounded-2xl p-2 pl-4"
          >
            <button
              type="button"
              className="mb-1.5 text-muted transition-colors hover:text-foreground"
              aria-label="Attach file"
              onClick={() =>
                alert("File attachment: connected to Lumina Vector Knowledge Base.")
              }
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              rows={1}
              placeholder={`Message Lumina (${selectedModel})...`}
              className="max-h-40 flex-1 resize-none bg-transparent py-2 text-xs sm:text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              className="mb-1.5 text-muted transition-colors hover:text-foreground"
              aria-label="Voice input"
              onClick={() => alert("Voice input: listening via Web Speech API...")}
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white transition-opacity disabled:opacity-40"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] text-muted">
            Lumina AI v2.0 · Hybrid vector retrieval with sub-second inference.
          </p>
        </div>
      </div>
    </div>
  );
}
