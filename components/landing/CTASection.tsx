"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Aurora Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[450px] w-[650px] rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-[140px]" />
      </div>

      <div className="section-shell">
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 text-center shadow-glass backdrop-blur-2xl sm:p-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-300 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready to ship faster?</span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Supercharge your workflow with <br />
            <span className="gradient-text">intelligent AI automation</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base text-muted leading-relaxed">
            Join thousands of developers, founders, and product teams building tomorrow&apos;s
            applications today with Lumina AI.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Get started for free
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/workspace">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                Explore Knowledge Base
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Setup in under 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
