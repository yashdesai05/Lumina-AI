"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Vercel", label: "VERCEL" },
  { name: "Linear", label: "LINEAR" },
  { name: "Supabase", label: "SUPABASE" },
  { name: "Stripe", label: "STRIPE" },
  { name: "Raycast", label: "RAYCAST" },
  { name: "Scale AI", label: "SCALE AI" },
];

export function LogoCloud() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.01] py-14">
      <div className="section-shell">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted">
          Powering intelligence for teams shipping at scale
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale transition-opacity hover:opacity-100">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted hover:text-foreground transition-colors cursor-default"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <span>{partner.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
