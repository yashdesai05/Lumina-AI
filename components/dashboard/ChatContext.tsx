"use client";

import React, { createContext, useContext, useState } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export const presetConversations: Record<string, ChatMessage[]> = {
  "Landing page copy ideas": [
    {
      id: "1",
      role: "user",
      content: "Give me three taglines for an AI note-taking app called Recall.",
    },
    {
      id: "2",
      role: "assistant",
      content: `Here are three high-conversion directions for **Recall**:

1. *"Never take notes again — just remember."* (Minimalist, lifestyle focus)
2. *"Your second brain, always listening."* (Productivity power-user focus)
3. *"Capture the conversation. Recall the meaning."* (B2B / executive meeting focus)

Would you like me to tailor these toward a specific audience, like college students or enterprise sales teams?`,
    },
  ],
  "Debug Next.js hydration error": [
    {
      id: "1",
      role: "user",
      content: "I'm getting 'Error: Text content does not match server-rendered HTML' in Next.js 15. How do I fix it?",
    },
    {
      id: "2",
      role: "assistant",
      content: `This error occurs when the initial HTML rendered on the server differs from what the client produces during hydration. The most common cause is accessing browser-only globals (like \`window\`, \`localStorage\`, or \`new Date()\`) during initial render.

Here is the recommended pattern to solve this using a mounted check:`,
      codeSnippet: {
        language: "tsx",
        code: `// components/ClientOnlyTime.tsx
'use client';
import { useState, useEffect } from 'react';

export function ClientOnlyTime() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render matching fallback on server
    return <span className="opacity-0">Loading...</span>;
  }

  return <span>{new Date().toLocaleTimeString()}</span>;
}`,
      },
    },
  ],
  "Q3 roadmap summary": [
    {
      id: "1",
      role: "user",
      content: "Summarize our Q3 roadmap into 3 executive bullet points for the board.",
    },
    {
      id: "2",
      role: "assistant",
      content: `Here is the executive summary for the Q3 Board Deck:

- **1. Multi-Agent Autonomous Workflows (Shipped):** Reduced customer support triage latency by 68% and automated 1,400+ weekly recurring tasks.
- **2. Enterprise Zero-Retention Compliance:** Secured SOC-2 Type II attestation and BYOK (Bring Your Own Key) architecture, unlocking $420k in pending enterprise pipeline.
- **3. Sub-120ms Edge Streaming:** Re-architected model gateway with Cloudflare Edge Workers, cutting P99 inference latency in half globally.`,
    },
  ],
  "SQL query optimization": [
    {
      id: "1",
      role: "user",
      content: "How do I optimize this query? It joins 2M user events with users and takes 4.2 seconds.",
    },
    {
      id: "2",
      role: "assistant",
      content: `A 4.2-second execution on 2M rows indicates a sequential table scan or a missing composite index. 

1. Create a composite index on \`(user_id, created_at DESC)\` to allow index-only index scans.
2. Filter the events table *before* joining users using a common table expression (CTE) or subquery:`,
      codeSnippet: {
        language: "sql",
        code: `-- 1. Add composite index
CREATE INDEX CONCURRENTLY idx_events_user_created 
ON user_events(user_id, created_at DESC);

-- 2. Optimized Query with selective pushdown
WITH recent_events AS (
  SELECT user_id, event_type, payload
  FROM user_events
  WHERE created_at >= NOW() - INTERVAL '7 days'
)
SELECT u.email, u.company_name, COUNT(re.user_id) AS event_count
FROM users u
INNER JOIN recent_events re ON re.user_id = u.id
GROUP BY u.email, u.company_name
ORDER BY event_count DESC
LIMIT 50;`,
      },
    },
  ],
  "Rewrite onboarding emails": [
    {
      id: "1",
      role: "user",
      content: "Rewrite our day-1 welcome email to increase activation rate.",
    },
    {
      id: "2",
      role: "assistant",
      content: `Here is a high-converting Day 1 activation email template:

**Subject:** Connect your first knowledge source (takes 60 seconds)

Hey {{first_name}},

Welcome to Lumina AI. Instead of asking you to read documentation, let's get your first win immediately:

👉 **[Drop a PDF or connect Notion →](https://lumina.ai/dashboard/workspace)**

Once connected, ask Lumina anything about your projects. You'll see real answers synthesized across your files in under a second.

Reply directly to this email if you hit any road bumps — I read every response.

Best,  
Jordan · Founder, Lumina AI`,
    },
  ],
};

interface ChatContextType {
  activeChatTitle: string;
  messages: ChatMessage[];
  selectedModel: string;
  setSelectedModel: (m: string) => void;
  loadChat: (title: string) => void;
  startNewChat: () => void;
  sendMessage: (content: string) => void;
  isTyping: boolean;
  searchHistory: string;
  setSearchHistory: (q: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [activeChatTitle, setActiveChatTitle] = useState("Landing page copy ideas");
  const [messages, setMessages] = useState<ChatMessage[]>(presetConversations["Landing page copy ideas"]);
  const [selectedModel, setSelectedModel] = useState("GPT-4o");
  const [isTyping, setIsTyping] = useState(false);
  const [searchHistory, setSearchHistory] = useState("");

  const loadChat = (title: string) => {
    setActiveChatTitle(title);
    if (presetConversations[title]) {
      setMessages(presetConversations[title]);
    } else {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Loaded conversation: **${title}**. What would you like to continue discussing?`,
        },
      ]);
    }
  };

  const startNewChat = () => {
    const newTitle = `New chat #${Math.floor(Math.random() * 900) + 100}`;
    setActiveChatTitle(newTitle);
    setMessages([]);
  };

  const sendMessage = (userInput: string) => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Contextual intelligent simulation based on content
    setTimeout(() => {
      setIsTyping(false);
      const lower = trimmed.toLowerCase();

      let replyContent = "";
      let codeSnippet: { language: string; code: string } | undefined;

      if (lower.includes("summarize") || lower.includes("summary")) {
        replyContent = `### Summary & Key Takeaways\n\n- **Core Objective:** Streamline operations and minimize friction through autonomous AI reasoning.\n- **Risk Factors:** Ensuring data sovereignty and zero-retention on proprietary vectors.\n- **Action Items:** Deploy v2.0 workflow pipeline, invite team leads, and verify webhooks.`;
      } else if (lower.includes("email") || lower.includes("update")) {
        replyContent = `Here is a drafted product update email:\n\n**Subject:** What's new in Lumina AI v2.0\n\nHey team,\n\nWe're thrilled to release our biggest upgrade yet:\n\n- ⚡ **120ms Edge Latency:** Global inference streaming.\n- 🧠 **Multi-Agent Pipelines:** Automated background workflows.\n- 🔒 **SOC-2 Type II Compliance:** Enterprise grade security.\n\nTry it now in your workspace and let us know your thoughts!`;
      } else if (lower.includes("error") || lower.includes("debug") || lower.includes("bug")) {
        replyContent = `I investigated the issue. This typically happens when an asynchronous Promise rejection occurs before the handler is attached, or when an unhandled server-side route exception isn't caught. Here is the recommended error boundary wrapper:`;
        codeSnippet = {
          language: "tsx",
          code: `export function SafeAsyncHandler<T>(fn: () => Promise<T>) {
  return async () => {
    try {
      return await fn();
    } catch (err) {
      console.error('[Lumina Safe Boundary Captured]:', err);
      return { success: false, error: (err as Error).message };
    }
  };
}`,
        };
      } else if (lower.includes("plan") || lower.includes("week")) {
        replyContent = `Here is your high-impact weekly execution roadmap:\n\n- **Monday:** Review analytics & prioritize top customer feedback.\n- **Tuesday:** Ship candidate PRs and run automated regression tests.\n- **Wednesday:** Configure multi-agent automations for customer tickets.\n- **Thursday:** Deep work on core feature enhancements.\n- **Friday:** Team demo, sprint retrospective, and weekly recap digest.`;
      } else if (lower.includes("code") || lower.includes("function") || lower.includes("react") || lower.includes("sql")) {
        replyContent = `Here is the clean, modular implementation for your request:`;
        codeSnippet = {
          language: "typescript",
          code: `interface WorkflowState {
  status: 'idle' | 'running' | 'completed' | 'failed';
  latencyMs: number;
}

export async function executeAgentStep(stepId: string): Promise<WorkflowState> {
  const start = performance.now();
  // Execute step against configured LLM model
  await new Promise((resolve) => setTimeout(resolve, 80));
  return {
    status: 'completed',
    latencyMs: Math.round(performance.now() - start),
  };
}`,
        };
      } else {
        replyContent = `I have processed your request with **${selectedModel}**.\n\nYour instructions have been evaluated against your connected workspace knowledge base. Is there any specific parameter, code block, or downstream automation step you'd like me to refine?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: replyContent,
          codeSnippet,
        },
      ]);
    }, 1100);
  };

  return (
    <ChatContext.Provider
      value={{
        activeChatTitle,
        messages,
        selectedModel,
        setSelectedModel,
        loadChat,
        startNewChat,
        sendMessage,
        isTyping,
        searchHistory,
        setSearchHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
