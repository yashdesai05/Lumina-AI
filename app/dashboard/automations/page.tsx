"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Workflow,
  Plus,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Zap,
  Sparkles,
  GitPullRequest,
  Mail,
  MessageSquare,
  BarChart3,
  Bot,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

interface AutomationItem {
  id: string;
  name: string;
  description: string;
  trigger: string;
  triggerIcon: any;
  action: string;
  actionIcon: any;
  model: string;
  active: boolean;
  totalRuns: number;
  successRate: string;
  lastRun: string;
}

const initialAutomations: AutomationItem[] = [
  {
    id: "1",
    name: "Customer Support Auto-Triage & Drafting",
    description: "Categorizes incoming Zendesk tickets, searches docs for answers, and drafts replies for agents.",
    trigger: "New Zendesk Ticket",
    triggerIcon: MessageSquare,
    action: "Draft Reply & Tag Urgency",
    actionIcon: Mail,
    model: "GPT-4o",
    active: true,
    totalRuns: 1420,
    successRate: "99.2%",
    lastRun: "3 mins ago",
  },
  {
    id: "2",
    name: "GitHub PR Architecture & Security Linter",
    description: "Analyzes pull requests for SQL injection, breaking API changes, and missing tests.",
    trigger: "Pull Request Opened",
    triggerIcon: GitPullRequest,
    action: "Post In-Depth Review Comment",
    actionIcon: Bot,
    model: "Claude 3.5 Sonnet",
    active: true,
    totalRuns: 489,
    successRate: "100%",
    lastRun: "24 mins ago",
  },
  {
    id: "3",
    name: "Daily Executive KPI Digest & Outlier Alerts",
    description: "Aggregates revenue, churn, and active users from Stripe & PostHog into an executive Slack summary.",
    trigger: "Cron: Daily 8:00 AM",
    triggerIcon: Clock,
    action: "Deliver Slack Report",
    actionIcon: BarChart3,
    model: "Gemini 1.5 Pro",
    active: true,
    totalRuns: 312,
    successRate: "98.7%",
    lastRun: "Today at 08:00 AM",
  },
  {
    id: "4",
    name: "High-Intent Inbound Lead Qualifier",
    description: "Enriches new signups with Clearbit data and generates custom sales talk-tracks.",
    trigger: "New Workspace Signup",
    triggerIcon: Zap,
    action: "Enrich & Sync to HubSpot",
    actionIcon: Sparkles,
    model: "GPT-4o",
    active: false,
    totalRuns: 89,
    successRate: "97.8%",
    lastRun: "2 days ago",
  },
];

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<AutomationItem[]>(initialAutomations);
  const [filter, setFilter] = useState<"all" | "active" | "paused">("all");

  const toggleStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const filteredAutomations = automations.filter((item) => {
    if (filter === "active") return item.active;
    if (filter === "paused") return !item.active;
    return true;
  });

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Top Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-background/80 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-semibold text-foreground">AI Automations & Agents</h1>
          <span className="rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary-400">
            {automations.filter((a) => a.active).length} Pipelines Running
          </span>
        </div>

        <Button size="sm" className="flex items-center gap-2">
          <Plus className="h-3.5 w-3.5" />
          New Automation
        </Button>
      </header>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl space-y-8 p-6 lg:p-8">
        {/* Metric Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <GlassCard className="p-5">
            <span className="text-xs font-medium text-muted">Total Agent Invocations</span>
            <p className="mt-2 text-3xl font-semibold text-foreground">2,310</p>
            <p className="mt-1 text-xs text-emerald-400">↑ 18% from last week</p>
          </GlassCard>

          <GlassCard className="p-5">
            <span className="text-xs font-medium text-muted">Overall Success Rate</span>
            <p className="mt-2 text-3xl font-semibold text-foreground">99.4%</p>
            <p className="mt-1 text-xs text-muted">0.6% retried automatically</p>
          </GlassCard>

          <GlassCard className="p-5">
            <span className="text-xs font-medium text-muted">Hours Saved This Month</span>
            <p className="mt-2 text-3xl font-semibold text-foreground">142 hrs</p>
            <p className="mt-1 text-xs text-primary-400">Equivalent to 1.8 full-time ops</p>
          </GlassCard>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(["all", "active", "paused"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  filter === tab
                    ? "bg-secondary text-white"
                    : "border border-white/10 bg-white/[0.03] text-muted hover:bg-white/[0.06] hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs text-muted">Showing {filteredAutomations.length} workflows</span>
        </div>

        {/* Automations List */}
        <div className="space-y-4">
          {filteredAutomations.map((item) => (
            <GlassCard key={item.id} className="p-6 transition-all duration-300">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        item.active ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-muted"
                      )}
                    />
                    <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-muted">
                      {item.model}
                    </span>
                  </div>
                  <p className="max-w-2xl text-xs text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors",
                      item.active
                        ? "border border-white/10 bg-white/[0.04] text-muted hover:bg-white/[0.08] hover:text-foreground"
                        : "bg-primary text-white"
                    )}
                  >
                    {item.active ? (
                      <>
                        <Pause className="h-3 w-3" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3" /> Resume
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Visual Pipeline Flow */}
              <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-xs">
                <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 text-foreground font-medium">
                  <item.triggerIcon className="h-3.5 w-3.5 text-primary-400" />
                  <span>{item.trigger}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-secondary/15 px-3 py-1.5 text-secondary-300 font-medium">
                  <Bot className="h-3.5 w-3.5 text-secondary-400" />
                  <span>AI Reasoning Pipeline</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted shrink-0" />
                <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 text-foreground font-medium">
                  <item.actionIcon className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{item.action}</span>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-3 text-xs text-muted">
                <div className="flex items-center gap-6">
                  <span>
                    Total Runs: <strong className="text-foreground">{item.totalRuns}</strong>
                  </span>
                  <span>
                    Success Rate:{" "}
                    <strong className="text-emerald-400">{item.successRate}</strong>
                  </span>
                  <span>
                    Last Executed: <strong className="text-foreground">{item.lastRun}</strong>
                  </span>
                </div>
                <button className="flex items-center gap-1 text-primary-400 hover:underline">
                  <SlidersHorizontal className="h-3 w-3" /> Configure Prompt & Steps
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
