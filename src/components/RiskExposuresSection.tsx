"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const properties = [
  {
    title: "Groundedness",
    method: "KG entailment · FActScore-style",
    insurance: "Tech E&O · Consumer Protection",
    description: "Every claim an agent makes is checked against a knowledge graph of its actual sources. If the agent asserts something the graph doesn't contain, it fails.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <circle cx="32" cy="16" r="5" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1.5" />
        <circle cx="14" cy="40" r="5" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1.5" />
        <circle cx="50" cy="40" r="5" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1.5" />
        <circle cx="32" cy="52" r="4" fill="#0D6EFD" />
        <line x1="32" y1="21" x2="15" y2="36" stroke="#CBD5E1" strokeWidth="1.2" />
        <line x1="32" y1="21" x2="49" y2="36" stroke="#CBD5E1" strokeWidth="1.2" />
        <line x1="18" y1="43" x2="28" y2="49" stroke="#CBD5E1" strokeWidth="1.2" />
        <line x1="46" y1="43" x2="36" y2="49" stroke="#CBD5E1" strokeWidth="1.2" />
        <path d="M28 52l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Authorization",
    method: "Hoare-triple composition",
    insurance: "Privacy · Fraud",
    description: "Tool calls are verified against policy constraints before they execute. Composed actions get checked as a whole — not just per-step — so escalation paths are caught.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <rect x="10" y="16" width="44" height="8" rx="2" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1.5" />
        <rect x="10" y="28" width="44" height="8" rx="2" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1.5" />
        <rect x="10" y="40" width="44" height="8" rx="2" fill="#0D6EFD" stroke="#0D6EFD" strokeWidth="1.5" />
        <circle cx="16" cy="20" r="1.5" fill="#0D6EFD" />
        <circle cx="16" cy="32" r="1.5" fill="#0D6EFD" />
        <circle cx="16" cy="44" r="1.5" fill="white" />
        <rect x="42" y="42" width="8" height="5" rx="1" fill="white" />
        <path d="M44 42v-1.5a2 2 0 014 0V42" stroke="white" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    title: "Drift",
    method: "Online Kernel CUSUM",
    insurance: "Operational Technology",
    description: "Statistical detection flags when an agent's behavior deviates from baseline — before a model update, prompt change, or slow drift produces a visible failure.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <path d="M6 42 L24 42 L30 42 L38 28 L46 34 L58 18" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="6" y1="42" x2="58" y2="42" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="38" cy="28" r="3.5" fill="#0D6EFD" />
        <circle cx="38" cy="28" r="6" fill="#0D6EFD" fillOpacity="0.2" />
        <circle cx="12" cy="42" r="1" fill="#CBD5E1" />
        <circle cx="22" cy="42" r="1" fill="#CBD5E1" />
        <circle cx="52" cy="18" r="1" fill="#CBD5E1" />
      </svg>
    ),
  },
];

export default function RiskExposuresSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="label-pill">Attested Properties</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Three attested properties,<br /><span className="gradient-text">one evidence file</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Open methods behind a proprietary framework. One attestation file that
            any carrier panel can consume.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {properties.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="h-16 w-16 mb-5">{p.icon}</div>
              <h3 className="text-xl font-bold text-text">{p.title}</h3>
              <p className="mt-1 text-xs font-mono text-primary">{p.method}</p>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                {p.description}
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-dim">Insurance Line</p>
                <p className="mt-1 text-sm font-medium text-text">{p.insurance}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
