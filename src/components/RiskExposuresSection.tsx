"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  {
    metric: "Guardrail pass/fail rate",
    measures: "Proportion of inputs and outputs that comply with defined behavioral policies over a given period.",
    implication: "Quantifies stability and compliance posture. High failure rates indicate elevated E&O or operational risk.",
  },
  {
    metric: "Tool / function call audit log",
    measures: "Complete record of all external actions initiated by agentic AI systems.",
    implication: "Critical for underwriting agentic AI deployments. Mitigates unbounded risk exposure from autonomous financial or operational actions.",
  },
  {
    metric: "Behavioral drift indicators",
    measures: "Statistical deviation of current model behavior from established baseline.",
    implication: "Early indicator of model degradation before it produces visible failures. Enables proactive risk intervention.",
  },
  {
    metric: "Incident classification records",
    measures: "Structured log of all flagged events, classified by type, severity, and resolution.",
    implication: "Primary evidentiary documentation for claims defensibility. Demonstrates governance discipline and human oversight protocols.",
  },
];

export default function RiskExposuresSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-sm font-semibold text-primary">What we mitigate</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            Telemetry that maps to policy lines
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-border bg-white overflow-hidden"
        >
          <div className="hidden md:grid grid-cols-[1.2fr_1.5fr_2fr] gap-4 px-6 py-4 bg-bg-alt border-b border-border">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">Telemetry Metric</p>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">What It Measures</p>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">Underwriting Implication</p>
          </div>

          {metrics.map((m, i) => (
            <motion.div
              key={m.metric}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`grid md:grid-cols-[1.2fr_1.5fr_2fr] gap-4 px-6 py-5 ${
                i < metrics.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <p className="text-sm font-semibold text-text">{m.metric}</p>
              <p className="text-sm text-text-muted leading-relaxed">{m.measures}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{m.implication}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
