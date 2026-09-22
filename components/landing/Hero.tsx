"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroShowcase } from "./HeroShowcase";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-28 pt-40 sm:pt-48">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute right-[10%] top-[20%] h-[360px] w-[360px] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="section-shell flex flex-col items-center text-center"
      >
        <motion.div
          variants={item}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-muted"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Now shipping v2.0 with real-time collaboration
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl"
        >
          The intelligence layer for
          <br />
          <span className="gradient-text">every workflow you run</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance text-lg text-muted"
        >
          Lumina AI turns scattered tools into one calm workspace — chat,
          automate, and generate with models that understand your context.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/dashboard">
            <Button size="lg">
              Start building free
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="lg">
            <Play className="h-4 w-4" />
            Watch product tour
          </Button>
        </motion.div>

        <motion.p variants={item} className="mt-6 text-xs text-muted">
          No credit card required · 14-day free trial · Cancel anytime
        </motion.p>

        {/* Product preview showcase */}
        <motion.div variants={item} className="w-full">
          <HeroShowcase />
        </motion.div>
      </motion.div>
    </section>
  );
}
