"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code2,
  FileSearch,
  Workflow,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

interface DemoMode {
  id: string;
  label: string;
  icon: any;
  title: string;
  prompt: string;
  latency: string;
  tokens: string;
  result: string;
  tags: string[];
}

const demos: DemoMode[] = [
  {
    id: "reasoning",
    label: "Deep Reasoning",
    icon: Brain,
    title: "System Architecture & Fault Tolerance",
    prompt: "Design a fault-tolerant vector database cluster with 99.99% availability, active-active cross-region replication, and automatic fallback for partitioned nodes.",
    latency: "142ms",
    tokens: "1,240 tokens",
    tags: ["Distributed Systems", "Raft Consensus", "P99 SLA"],
    result: `## Recommended Architecture: Multi-Region Active-Active Vector Mesh

1. **Storage Topology:**
   - Deploy 3-node HNSW vector shards across us-east-1 and eu-west-1.
   - Synchronous replication within region via Raft; asynchronous gossip-based conflict resolution across WAN.

2. **Network Partition Handling:**
   - Implement local read replicas serving P99 queries within 12ms during cross-region fiber cuts.
   - Read repair and anti-entropy background sweep re-sync vector embeddings once network health restores.

3. **Latency Benchmarks:**
   - Intra-region queries: 8ms (cosine distance @ 1536 dims).
   - Cross-region write propagation: < 85ms with quorum ACK.`,
  },
  {
    id: "coding",
    label: "Code Synthesis",
    icon: Code2,
    title: "Production React Hook with Debounce & Cache",
    prompt: "Write a high-performance useSemanticSearch hook with AbortController cancellation, client-side LRU cache, and optimistic loading states.",
    latency: "96ms",
    tokens: "860 tokens",
    tags: ["React 18", "TypeScript", "AbortController"],
    result: `export function useSemanticSearch(query: string, delay = 250) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cacheRef = useRef<Map<string, SearchResult[]>>(new Map());

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    if (cacheRef.current.has(query)) {
      setResults(cacheRef.current.get(query)!);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
          signal: controller.signal,
        });
        const data = await res.json();
        cacheRef.current.set(query, data.items);
        setResults(data.items);
      } finally {
        setIsLoading(false);
      }
    }, delay);

    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, delay]);

  return { results, isLoading };
}`,
  },
  {
    id: "docs",
    label: "Doc Intelligence",
    icon: FileSearch,
    title: "Contract Risk & Redline Extraction",
    prompt: "Extract indemnity limits, governing law, and any non-standard unilateral termination clauses from this Master Services Agreement.",
    latency: "110ms",
    tokens: "2,100 tokens",
    tags: ["Legal NLP", "Risk Matrix", "Entity Extraction"],
    result: `### Audit Analysis: Master Services Agreement (v4.2)

- **⚠️ Clause 8.3 (Indemnification):**
  Uncapped consequential liability identified. Standard SaaS threshold is 12 months fees paid ($140,000 max).
  *Recommendation:* Replace with mutual 1x limitation of liability standard carve-out.

- **✅ Clause 14.1 (Governing Law):**
  Jurisdiction specified as State of Delaware courts. Aligns with standard corporate governance.

- **⚠️ Clause 16.2 (Unilateral Termination):**
  Counterparty retained a 10-day termination for convenience clause without prorated refund provisions.
  *Action:* Require 30-day notice with prepaid credit preservation.`,
  },
  {
    id: "workflows",
    label: "Autonomous Workflows",
    icon: Workflow,
    title: "Multi-Agent Incident Triager",
    prompt: "When an unhandled exception rate exceeds 2% in Datadog, inspect recent commits, generate a rollback candidate PR, and page the on-call engineer.",
    latency: "180ms",
    tokens: "1,550 tokens",
    tags: ["Agentic Loop", "GitHub API", "Slack + PagerDuty"],
    result: `[Agent Orchestrator initialized @ 14:02:18 UTC]
1. Datadog Webhook received: 4.8% 500 error spike on /api/v2/checkout.
2. Agent Inspect: Git blame shows commit 4f981a "Optimize SQL index" merged 12m ago.
3. Agent Action: Created candidate branch "hotfix/revert-4f981a".
4. Agent Action: Ran automated test suite — all 84 test suites passing.
5. Notification: Paged on-call (Jordan Davis) on Slack #incidents with 1-click Approve Rollback button.
Status: Pipeline awaiting human verification.`,
  },
];

export function Playground() {
  const [selectedId, setSelectedId] = useState("reasoning");
  const [copied, setCopied] = useState(false);

  const activeDemo = demos.find((d) => d.id === selectedId) || demos[0];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="section-shell">
        <SectionHeading
          title="Experience Lumina in real time"
          description="Test model reasoning, code generation, document intelligence, and multi-agent workflows directly in your browser."
        />

        {/* Tab Selector */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {demos.map((demo) => {
            const Icon = demo.icon;
            const isSelected = selectedId === demo.id;
            return (
              <button
                key={demo.id}
                onClick={() => setSelectedId(demo.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-glow"
                    : "border border-white/10 bg-white/[0.03] text-muted hover:bg-white/[0.06] hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{demo.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Sandbox Window */}
        <div className="mt-8 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {activeDemo.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeDemo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      {activeDemo.latency}
                    </span>
                    <span>•</span>
                    <span>{activeDemo.tokens}</span>
                  </div>
                </div>

                {/* Input Prompt Box */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-400">
                    Input Instruction
                  </span>
                  <p className="mt-1 text-muted leading-relaxed font-mono">{activeDemo.prompt}</p>
                </div>

                {/* Output Result Box */}
                <div className="rounded-xl border border-white/10 bg-black/50 p-5 font-mono text-xs text-gray-300">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3 text-[11px] text-muted">
                    <span>Lumina AI Response Stream</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed font-sans text-xs">
                    {activeDemo.result}
                  </pre>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
