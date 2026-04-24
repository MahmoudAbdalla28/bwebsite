"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const steps = [
  { num: "1", label: "Red discovers vulnerability", desc: "Agent #3 is susceptible to a Crescendo-style multi-turn jailbreak that extracts its system prompt.", color: "text-red", bg: "bg-red-bg" },
  { num: "2", label: "Finding becomes defense rule", desc: "The attack pattern gets converted into an enforcement rule and pushed into Blue's knowledge graph.", color: "text-primary", bg: "bg-primary-bg" },
  { num: "3", label: "Blue blocks it in production", desc: "The proxy is now actively blocking the specific attack pattern Red discovered. Underwriting report shows: discovered on this date, mitigated on this date.", color: "text-primary", bg: "bg-primary-bg" },
  { num: "4", label: "SDK codifies it as a regression test", desc: "The vulnerability becomes a permanent test in the client's CI/CD pipeline. If a model swap or prompt change reintroduces it six months later, the test catches it.", color: "text-primary", bg: "bg-primary-bg" },
];

export default function FeedbackLoopSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-primary">The Loop</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Every vulnerability found becomes a defense rule enforced
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Red runs on a schedule. Each run might find new things that feed into Blue.
              Blue's defenses evolve with the threat landscape instead of sitting on a static
              ruleset someone wrote six months ago. Two layers of protection from one discovery.
            </p>

          </motion.div>

          {/* Right: steps */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex gap-4 rounded-xl border border-border bg-white p-5"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${step.bg}`}>
                  <span className={`text-sm font-bold ${step.color}`}>{step.num}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{step.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
