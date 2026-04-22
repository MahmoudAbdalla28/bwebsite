"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const personas = [
  {
    role: "Insurance Broker",
    scenario: "Carriers won't underwrite AI without data.",
    answer: "Bastion generates the telemetry your carrier needs. 30 days, one report, coverage unlocked.",
  },
  {
    role: "Enterprise CTO",
    scenario: "An AI agent processed health records — we found out three days later.",
    answer: "PII is detected and redacted at the network layer before it hits the LLM. Real-time alerts.",
  },
  {
    role: "Chief Risk Officer",
    scenario: "Legal sent back a 47-page risk assessment asking for controls we don't have.",
    answer: "Continuous monitoring, configurable enforcement. Every metric Legal asked for, generated automatically.",
  },
];

const highlights = [
  {
    stat: "30",
    unit: "days",
    label: "Monitoring window",
    desc: "Learn your fleet baseline before enforcing anything.",
  },
  {
    stat: "1",
    unit: "binary",
    label: "Zero dependencies",
    desc: "Single Rust binary. No Python, no containers, no runtime.",
  },
  {
    stat: "0",
    unit: "data",
    label: "Nothing leaves",
    desc: "All event data stays on your infrastructure. Always.",
  },
];

export default function BuyerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="relative pt-12 pb-24 md:pt-16 md:pb-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-pill">Who it&apos;s for</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Sound <span className="gradient-text">familiar?</span>
          </h2>
        </motion.div>

        {/* Persona cards */}
        <div className="grid gap-5 md:grid-cols-3 mb-14">
          {personas.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl border border-border bg-white p-7 flex flex-col gap-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div>
                <span className="label-pill mb-3 inline-flex">{p.role}</span>
                <p className="mt-3 text-base font-semibold text-text leading-snug italic">&ldquo;{p.scenario}&rdquo;</p>
              </div>
              <p className="text-sm leading-relaxed text-text-muted border-t border-border pt-4">{p.answer}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid gap-px sm:grid-cols-3 rounded-2xl border border-border overflow-hidden bg-border"
        >
          {highlights.map((h) => (
            <div key={h.stat} className="bg-white px-8 py-7 flex items-center gap-5">
              <div className="shrink-0">
                <p className="text-4xl font-extrabold gradient-text leading-none">{h.stat}<span className="text-base font-semibold text-text-dim ml-1">{h.unit}</span></p>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{h.label}</p>
                <p className="mt-1 text-xs text-text-muted">{h.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
