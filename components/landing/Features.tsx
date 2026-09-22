"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Workflow,
  ShieldCheck,
  Gauge,
  MessagesSquare,
  Puzzle,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Features() {
  return (
    <section id="features" className="py-28">
      <div className="section-shell">
        <SectionHeading
          title="Everything your team needs to ship with AI"
          description="One workspace for conversation, automation, and knowledge — built to feel instant at every step."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2"
        >
          {/* Large feature — model reasoning */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-2 lg:row-span-1"
          >
            <GlassCard className="flex h-full flex-col justify-between overflow-hidden p-8">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                  <Brain className="h-5 w-5 text-primary-400" />
                </div>
                <h3 className="text-xl font-medium text-foreground">
                  Reasoning that keeps your context
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted">
                  Lumina remembers project history, documents, and past
                  decisions, so every answer builds on the last one instead
                  of starting from zero.
                </p>
              </div>
              <div className="mt-8 flex gap-2">
                {["Context", "Memory", "Retrieval"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Automation */}
          <motion.div variants={fadeUp} className="lg:row-span-2">
            <GlassCard className="flex h-full flex-col justify-between p-8">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15">
                  <Workflow className="h-5 w-5 text-secondary-400" />
                </div>
                <h3 className="text-xl font-medium text-foreground">
                  Automations that run themselves
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Turn a recurring task into a trigger once, and Lumina
                  handles the rest — drafts, summaries, and follow-ups on
                  schedule.
                </p>
              </div>
              <div className="mt-8 space-y-2">
                {["New lead summarized", "Weekly report drafted", "Ticket triaged"].map(
                  (step, i) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-xs text-muted"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      {step}
                    </div>
                  )
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* Security */}
          <motion.div variants={fadeUp}>
            <GlassCard className="flex h-full flex-col justify-between p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                <ShieldCheck className="h-5 w-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Enterprise-grade security
              </h3>
              <p className="mt-2 text-sm text-muted">
                SOC 2 controls, SSO, and full audit logs so IT can say yes.
              </p>
            </GlassCard>
          </motion.div>

          {/* Speed */}
          <motion.div variants={fadeUp}>
            <GlassCard className="flex h-full flex-col justify-between p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15">
                <Gauge className="h-5 w-5 text-secondary-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Built for speed
              </h3>
              <p className="mt-2 text-sm text-muted">
                Streamed responses and edge caching keep replies under a
                second.
              </p>
            </GlassCard>
          </motion.div>

          {/* Collaboration */}
          <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
            <GlassCard className="flex h-full flex-col justify-between p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                <MessagesSquare className="h-5 w-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Shared threads
              </h3>
              <p className="mt-2 text-sm text-muted">
                Bring teammates into any conversation without losing the
                thread&apos;s context.
              </p>
            </GlassCard>
          </motion.div>

          {/* Integrations */}
          <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
            <GlassCard className="flex h-full flex-col justify-between p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15">
                <Puzzle className="h-5 w-5 text-secondary-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Connects to your stack
              </h3>
              <p className="mt-2 text-sm text-muted">
                Native integrations with the tools your team already runs
                daily.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
