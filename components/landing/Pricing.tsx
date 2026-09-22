"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: "$0",
      cadence: "forever free",
      description: "For individuals exploring AI workflows.",
      features: [
        "100 AI messages / month",
        "1 connected workspace",
        "Community support & docs",
        "Standard response speed",
        "1 active automation pipeline",
      ],
      cta: "Start for free",
      href: "/dashboard",
      highlighted: false,
    },
    {
      name: "Pro",
      price: annual ? "$23" : "$29",
      cadence: annual ? "per month, billed annually" : "per month",
      savings: annual ? "Save $72/year" : undefined,
      description: "For professionals and teams relying on AI daily.",
      features: [
        "Unlimited AI messages",
        "5 collaborative workspaces",
        "Priority edge inference speed",
        "Multi-agent automations & triggers",
        "BYOK (Bring your own API key)",
        "Shared threads & team permissions",
      ],
      cta: "Start 14-day free trial",
      href: "/dashboard",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      cadence: "tailored billing",
      description: "For organizations with advanced security & scale needs.",
      features: [
        "Unlimited workspaces & seats",
        "Dedicated VPC & on-premise deploy",
        "SOC-2 Type II audit logs & SSO",
        "Custom model fine-tuning & RAG",
        "99.99% uptime guarantee SLA",
        "Dedicated solutions architect",
      ],
      cta: "Contact Enterprise",
      href: "/dashboard/settings",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 relative">
      <div className="section-shell">
        <SectionHeading
          title="Simple pricing that scales with you"
          description="Start free. Upgrade only when your team is ready to move faster."
        />

        {/* Cadence Switcher */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-xs sm:text-sm font-medium transition-colors cursor-pointer",
              !annual ? "text-foreground font-semibold" : "text-muted"
            )}
            onClick={() => setAnnual(false)}
          >
            Monthly billing
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual(!annual)}
            className={cn(
              "relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              annual ? "bg-primary" : "bg-white/10"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                annual ? "translate-x-6" : "translate-x-0"
              )}
            />
          </button>
          <div
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={() => setAnnual(true)}
          >
            <span
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors",
                annual ? "text-foreground font-semibold" : "text-muted"
              )}
            >
              Annual billing
            </span>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              Save 20%
            </span>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard
                hover={false}
                className={cn(
                  "relative flex h-full flex-col p-8 transition-all",
                  plan.highlighted &&
                    "border-primary/40 bg-gradient-to-b from-primary/[0.08] to-transparent shadow-glow"
                )}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-white shadow-sm">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
                <h3 className="text-lg font-medium text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>

                <div className="mt-6 flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold text-foreground tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-muted">{plan.cadence}</span>
                  </div>
                  {plan.savings && (
                    <span className="mt-1 text-xs font-medium text-emerald-400">
                      {plan.savings}
                    </span>
                  )}
                </div>

                <Link href={plan.href} className="mt-6">
                  <Button
                    variant={plan.highlighted ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
