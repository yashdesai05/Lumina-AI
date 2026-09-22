"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  UploadCloud,
  Search,
  Database,
  Layers,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Clock,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

interface KnowledgeDoc {
  id: string;
  title: string;
  source: string;
  type: "pdf" | "code" | "notion" | "web";
  chunks: number;
  size: string;
  updated: string;
  status: "ready" | "indexing" | "syncing";
}

const initialDocs: KnowledgeDoc[] = [
  {
    id: "1",
    title: "Q3_Product_Roadmap_Master.pdf",
    source: "Google Drive Sync",
    type: "pdf",
    chunks: 1420,
    size: "4.2 MB",
    updated: "2 hours ago",
    status: "ready",
  },
  {
    id: "2",
    title: "nextjs-api-service / core-backend",
    source: "GitHub: main branch",
    type: "code",
    chunks: 8940,
    size: "18.5 MB",
    updated: "Yesterday",
    status: "ready",
  },
  {
    id: "3",
    title: "Company Onboarding & SOP Manual",
    source: "Notion Enterprise",
    type: "notion",
    chunks: 3200,
    size: "6.8 MB",
    updated: "3 days ago",
    status: "ready",
  },
  {
    id: "4",
    title: "Customer_Interviews_2026.pdf",
    source: "Manual Upload",
    type: "pdf",
    chunks: 610,
    size: "2.1 MB",
    updated: "Just now",
    status: "syncing",
  },
];

export default function WorkspacePage() {
  const [docs, setDocs] = useState<KnowledgeDoc[]>(initialDocs);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pdf" | "code" | "notion">("all");
  const [isUploading, setIsUploading] = useState(false);

  const filteredDocs = docs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.source.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || doc.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc: KnowledgeDoc = {
        id: crypto.randomUUID(),
        title: `Design_System_Spec_v${docs.length + 1}.pdf`,
        source: "Manual Upload",
        type: "pdf",
        chunks: 480,
        size: "1.9 MB",
        updated: "Just now",
        status: "ready",
      };
      setDocs((prev) => [newDoc, ...prev]);
      setIsUploading(false);
    }, 1200);
  };

  const handleDelete = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Top Bar Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-background/80 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-semibold text-foreground">Workspace & Knowledge</h1>
          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-400">
            Vector Store Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={handleSimulateUpload}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            {isUploading ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            {isUploading ? "Embedding..." : "Upload Document"}
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-7xl space-y-8 p-6 lg:p-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Indexed Chunks</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary-400">
                <Layers className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {docs.reduce((acc, d) => acc + d.chunks, 0).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-muted">Model: text-embedding-3-large</p>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Connected Sources</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary-400">
                <Database className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold text-foreground">{docs.length}</p>
            <p className="mt-1 text-xs text-muted">3 auto-synced daily</p>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Storage Consumed</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary-400">
                <HardDrive className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold text-foreground">31.6 MB</p>
            <p className="mt-1 text-xs text-muted">Of 5.0 GB Pro storage quota</p>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Retrieval Latency</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary-400">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold text-foreground">18ms</p>
            <p className="mt-1 text-xs text-muted">P99 hybrid semantic search</p>
          </GlassCard>
        </div>

        {/* Upload Drop Area */}
        <div
          onClick={handleSimulateUpload}
          className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.04]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-400 group-hover:scale-110 transition-transform">
            <UploadCloud className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-foreground">
            Drop files here or click to index into AI knowledge
          </h3>
          <p className="mt-1 text-xs text-muted">
            Supports PDF, Markdown, DOCX, TXT, and GitHub repositories up to 50MB
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 sm:w-80">
            <Search className="h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search documents or sources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(["all", "pdf", "code", "notion"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "border border-white/10 bg-white/[0.03] text-muted hover:bg-white/[0.06] hover:text-foreground"
                )}
              >
                {tab === "all" ? "All Files" : tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredDocs.map((doc) => (
            <GlassCard key={doc.id} className="relative flex flex-col justify-between p-5">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-primary-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="truncate text-sm font-semibold text-foreground">
                        {doc.title}
                      </h4>
                      <p className="truncate text-xs text-muted">{doc.source}</p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                      doc.status === "ready"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400 animate-pulse"
                    )}
                  >
                    {doc.status === "ready" ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    {doc.status === "ready" ? "Indexed" : "Syncing"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-3 text-xs text-muted">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted/70">
                      Chunks
                    </span>
                    <span className="font-medium text-foreground">{doc.chunks}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted/70">
                      Size
                    </span>
                    <span className="font-medium text-foreground">{doc.size}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted/70">
                      Updated
                    </span>
                    <span className="font-medium text-foreground">{doc.updated}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="flex items-center gap-1 text-xs text-primary-400 hover:underline cursor-pointer">
                  View embeddings <ExternalLink className="h-3 w-3" />
                </span>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="rounded-lg p-1.5 text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  aria-label="Delete document"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
