"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Which AI models are supported out of the box?",
    answer:
      "Lumina AI natively integrates with top foundation models including OpenAI (GPT-4o, o1-preview), Anthropic (Claude 3.5 Sonnet), Google (Gemini 1.5 Pro), and ultra-low-latency open-weight models via Groq LPUs. You can toggle between models per conversation or per workflow with one click.",
  },
  {
    question: "Can I bring my own API keys (BYOK)?",
    answer:
      "Yes! You can choose between using our unified managed subscription credits, or plug in your own OpenAI, Anthropic, or Google API keys directly in the Settings panel. When using BYOK, you pay provider prices directly with zero platform markup.",
  },
  {
    question: "Is my team's proprietary data and code safe?",
    answer:
      "Strictly yes. We do not use customer inputs or proprietary documents to train foundation models. All vector embeddings are encrypted at rest using AES-256 and transmitted over TLS 1.3. We support enterprise zero-data-retention (ZDR) agreements and SOC-2 Type II controls.",
  },
  {
    question: "How is Lumina AI different from standard ChatGPT or Claude?",
    answer:
      "While general chatbots operate in isolated single-chat silos, Lumina AI connects your entire workflow: your codebase, team documentation, Notion, and databases. It offers visual multi-agent workflows, automated scheduled background pipelines, and shared collaborative team threads.",
  },
  {
    question: "Can I cancel or switch my plan at any time?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your subscription at any point from your billing dashboard. If you cancel, you will maintain full access through the end of your billing cycle with zero surprise charges.",
  },
  {
    question: "Do you offer custom Enterprise or on-premise deployments?",
    answer:
      "Yes. For regulated financial or healthcare organizations, our Enterprise tier supports isolated VPC instances (AWS, GCP, Azure), dedicated custom LLM fine-tuning, SCIM provisioning, and 99.99% uptime SLAs.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="section-shell max-w-4xl">
        <SectionHeading
          title="Frequently asked questions"
          description="Everything you need to know about getting started, model connectivity, and security."
        />

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <GlassCard
                key={faq.question}
                className="overflow-hidden transition-colors duration-200 p-0"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-primary/20 text-primary-400" : "text-muted"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="border-t border-white/[0.06] px-6 pb-6 pt-3 text-sm text-muted leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
