"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Component {
  name: string;
  measures: string;
  method: string;
}

const COMPONENTS: Component[] = [
  {
    name: "PII Exposure",
    measures: "Rate of unredacted personally identifiable information in agent outputs.",
    method: "NLP module: pattern and classifier-based detection on every agent response.",
  },
  {
    name: "Policy Violations",
    measures: "Tool calls attempting actions outside enforcement boundaries.",
    method: "Composed policy validator: multi-step tool-call analysis, not just per-step checks.",
  },
  {
    name: "Behavioral Anomaly",
    measures: "Statistical deviation from established agent behavior baselines.",
    method: "Per-agent behavioral fingerprint with online drift detection.",
  },
  {
    name: "Output Integrity",
    measures: "Hallucinated data, unverifiable claims, and fabricated citations.",
    method: "Knowledge-graph claim verification: every assertion checked against authorized sources.",
  },
  {
    name: "Model Drift",
    measures: "Systematic shifts in model output distribution over time.",
    method: "Long-window distribution comparison across baseline and live traffic.",
  },
];

export default function ReportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-4">Methodology</p>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-5xl">
            The Stats That Matter for{" "}
            <span className="gradient-text">Coverage and Regulation.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Every metric Bastion collects maps to a specific coverage trigger or regulatory requirement, traceable back to source events.
          </p>
        </motion.div>

        {/* 5 component cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-14">
          {COMPONENTS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="rounded-sm border border-border bg-surface p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <h3 className="text-base font-bold text-text mb-2">{c.name}</h3>
              <p className="text-xs text-text-muted leading-relaxed mb-4 min-h-[72px]">{c.measures}</p>
              <div className="pt-4 border-t border-border">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-1.5">How it&apos;s produced</p>
                <p className="text-xs text-text-secondary leading-relaxed">{c.method}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
