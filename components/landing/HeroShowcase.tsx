"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Play,
} from "lucide-react";

export function HeroShowcase() {
  const [activeTab, setActiveTab] = useState<"code" | "reasoning" | "data">("code");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto mt-16 w-full max-w-5xl">
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-70 blur-2xl transition duration-1000" />

      {/* Floating Glass Badges */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 -top-6 z-20 hidden items-center gap-2 rounded-2xl border border-white/10 bg-surface/90 px-3.5 py-2 shadow-2xl backdrop-blur-xl sm:flex"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <Zap className="h-3.5 w-3.5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-foreground">118ms Latency</p>
          <p className="text-[10px] text-muted">Edge streaming active</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 -bottom-5 z-20 hidden items-center gap-2 rounded-2xl border border-white/10 bg-surface/90 px-3.5 py-2 shadow-2xl backdrop-blur-xl sm:flex"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20 text-primary-400">
          <ShieldCheck className="h-3.5 w-3.5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-foreground">SOC-2 Type II</p>
          <p className="text-[10px] text-muted">Zero data retention guarantee</p>
        </div>
      </motion.div>

      {/* Main Glass Workspace Window */}
      <div className="glass-strong shadow-glass relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c0c0e]/95 backdrop-blur-2xl">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-muted/70">lumina-ai :: agent-orchestrator-v2</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] p-1">
            {[
              { id: "code", label: "Code Synthesis", icon: Terminal },
              { id: "reasoning", label: "Multi-Step Trace", icon: Bot },
              { id: "data", label: "Knowledge RAG", icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="h-3 w-3" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inner Content Body */}
        <div className="p-5 sm:p-7">
          {/* User Prompt Simulation */}
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">User Prompt</span>
                <span className="text-[10px] text-muted">Model: Claude 3.5 Sonnet</span>
              </div>
              <p className="mt-1 text-xs text-muted/90 leading-relaxed font-mono">
                &quot;Analyze our Stripe MRR churn, identify top drop-off cohorts, and generate a Next.js server action to trigger retention workflows.&quot;
              </p>
            </div>
          </div>

          {/* Reasoning Execution Trace */}
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] px-3.5 py-2 text-[11px] text-emerald-300">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>3 Data Sources Vectorized</span>
            </div>
            <span className="text-white/20">•</span>
            <span>Retrieved 1,420 Chunks (18ms)</span>
            <span className="text-white/20">•</span>
            <span>Confidence Score: 99.4%</span>
          </div>

          {/* Output Display depending on Tab */}
          {activeTab === "code" && (
            <div className="relative rounded-xl border border-white/[0.08] bg-black/60 p-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-[11px] text-muted">
                <span>app/actions/retention-pipeline.ts</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto text-[11.5px] leading-relaxed text-gray-300">
                <code>
{`export async function triggerRetentionWorkflow(cohortId: string) {
  'use server';
  const session = await auth();
  if (!session) throw new UnauthorizedError();

  // 1. Query high-risk customer accounts with Lumina Vector Agent
  const highRiskCustomers = await lumina.query({
    index: 'stripe_churn_signals',
    filter: { cohort: cohortId, riskScore: { $gte: 0.78 } },
    topK: 25,
  });

  // 2. Dispatch automated personalized retention incentives via Edge Worker
  const results = await Promise.all(
    highRiskCustomers.map((user) =>
      lumina.agents.runWorkflow('retention_offer_v2', {
        userId: user.id,
        discountRate: 0.25,
      })
    )
  );

  return { success: true, dispatched: results.length };
}`}
                </code>
              </pre>
            </div>
          )}

          {activeTab === "reasoning" && (
            <div className="space-y-2.5 rounded-xl border border-white/[0.08] bg-black/60 p-4 text-xs">
              {[
                { step: "1. Ingestion & Tokenization", detail: "Parsed 42,000 Stripe subscription events from webhook stream." },
                { step: "2. Anomaly Detection", detail: "Identified 18% churn spike in European SMB cohort following billing currency change." },
                { step: "3. Strategy Generation", detail: "Synthesized localized EUR pricing strategy + multi-channel re-engagement sequence." },
                { step: "4. Execution Pipeline", detail: "Ready to deploy server action with 99.4% test coverage." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 border-b border-white/[0.04] pb-2 last:border-0 last:pb-0">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary-300">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-[11px]">{item.step}</p>
                    <p className="text-muted text-[11px] mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "data" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-white/[0.08] bg-black/60 p-4 text-xs">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                <span className="text-[10px] text-muted uppercase tracking-wider">Vector Index</span>
                <p className="mt-1 font-semibold text-foreground">hybrid-hnsw-dense</p>
                <p className="mt-1 text-[11px] text-emerald-400">✓ In-Memory Cached</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                <span className="text-[10px] text-muted uppercase tracking-wider">Embedding Dimensions</span>
                <p className="mt-1 font-semibold text-foreground">3,072 dimensions</p>
                <p className="mt-1 text-[11px] text-muted">Cosine similarity</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                <span className="text-[10px] text-muted uppercase tracking-wider">Context Window</span>
                <p className="mt-1 font-semibold text-foreground">128,000 tokens</p>
                <p className="mt-1 text-[11px] text-primary-400">Zero context compaction</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
