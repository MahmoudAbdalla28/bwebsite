"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  {
    metric: "Guardrail pass/fail rate",
    implication: "Quantifies stability and compliance posture. High failure rates indicate elevated E&O or operational risk.",
    tag: "E&O Risk",
  },
  {
    metric: "Tool / function call audit log",
    implication: "Mitigates unbounded risk from autonomous financial or operational actions.",
    tag: "Agentic AI",
  },
  {
    metric: "Behavioral drift indicators",
    implication: "Early indicator of model degradation before it produces visible failures.",
    tag: "Model Risk",
  },
  {
    metric: "Incident classification records",
    implication: "Primary evidentiary documentation for claims defensibility.",
    tag: "Claims Defense",
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
          <span className="label-pill">What we mitigate</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Telemetry that maps to <span className="gradient-text">policy lines</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl border border-border bg-white p-8 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <span className="self-start rounded-full bg-primary-bg px-3 py-1 text-xs font-semibold text-primary border border-primary/10">
                {m.tag}
              </span>
              <p className="text-base font-semibold text-text leading-snug">{m.metric}</p>
              <p className="text-sm leading-relaxed text-text-muted">{m.implication}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
