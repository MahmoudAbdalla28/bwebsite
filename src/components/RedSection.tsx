"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const attackCategories = [
  {
    name: "System Prompt Extraction",
    desc: "10+ attack families including role-play escalation, encoding tricks, multi-turn trust building, and prompt reflection. If your agent leaks its instructions, attackers can craft targeted exploits against everything else.",
  },
  {
    name: "PII Leakage",
    desc: "Probes for names, emails, SSNs, credit cards, health IDs across the full range from direct asks to sophisticated social engineering that tricks the agent into disclosure through normal-looking workflows.",
  },
  {
    name: "Hallucination & Fabrication",
    desc: "Tests whether agents make things up or contradict their own constraints. Critical in regulated industries where a pharmacy agent fabricating dosage info or a financial agent inventing numbers creates real liability.",
  },
];

export default function RedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">What Red Tests</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Three categories of risk, dozens of attack families
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Each category covers the full spectrum from naive direct asks to sophisticated
            multi-turn campaigns. Red does not just check if your agent says no to a bad
            question. It tests whether attackers can get around that no.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          {/* Attack categories */}
          <div className="space-y-4">
            {attackCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="rounded-xl border border-border bg-white p-5"
              >
                <p className="text-sm font-semibold text-text">{cat.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{cat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Effort levels */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:w-72"
          >
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-xs font-semibold text-text">Low Effort</p>
              <p className="mt-1 text-xs text-text-muted">CI/CD smoke tests. 30 seconds to 2 minutes. Run on every PR.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-xs font-semibold text-text">High Effort</p>
              <p className="mt-1 text-xs text-text-muted">Full adversarial campaigns. 2 to 5 minutes per category. Pre-launch audits.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
