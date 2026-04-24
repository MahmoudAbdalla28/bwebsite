"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const personas = [
  {
    role: "Procurement",
    scenario: "We had the technology. Legal had the concerns. We needed a way to demonstrate controlled, documented AI deployment — and we needed it fast.",
    answer: "Bastion generates the audit trail and policy controls legal needs to sign off. Documented evidence that your agents operate within defined boundaries — no new frameworks, no red-team engagements.",
  },
  {
    role: "Engineering",
    scenario: "We don't want another security dashboard to maintain. The team is already stretched. We need visibility that fits into how we actually ship.",
    answer: "Bastion integrates where your team already works — Slack alerts on policy violations, SDK hooks in your dev environment, structured logs into your existing SIEM. No new tooling to own.",
  },
  {
    role: "Insurance",
    scenario: "AI submissions with no behavioral data attached. No baseline, no incident history, nothing to evaluate against.",
    answer: "Behavioral monitoring produces a structured telemetry report — fleet risk scores, PII exposure rates, consistency metrics, incident logs. The documented evidence your risk stakeholders need to make a decision.",
  },
];

const highlights = [
  {
    stat: "0",
    unit: "data exits",
    label: "On-prem only",
    desc: "All event data stays on your infrastructure. Nothing reaches us or any third party.",
  },
  {
    stat: "4",
    unit: "checks per call",
    label: "Every interaction audited",
    desc: "PII detection, action validation, drift scoring, and consistency check — on every call.",
  },
  {
    stat: "1",
    unit: "report",
    label: "Audit-ready output",
    desc: "A single structured file with every metric your risk stakeholders need to make a decision.",
  },
];

export default function BuyerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="solutions" className="relative pt-12 pb-24 md:pt-16 md:pb-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
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
                <p className="text-xs font-medium text-text-dim uppercase tracking-widest">{p.role}</p>
                <p className="mt-3 text-base font-semibold text-text leading-snug">&ldquo;{p.scenario}&rdquo;</p>
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
