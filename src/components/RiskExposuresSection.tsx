"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Signal {
  title: string;
  body: string;
  icon: React.ReactNode;
}

const SIGNALS: Signal[] = [
  {
    title: "Behavioral Baselines",
    body: "Every agent gets a personalized fingerprint built from its operational history. Deviations from that established pattern surface continuously, well before they become visible incidents. Catches the agent that gradually starts touching tools it never used or drifting in response style. These are signals a generic threshold can't catch because every agent's normal looks different.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-primary" fill="none">
        <path d="M4 24 L10 18 L15 22 L21 12 L28 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="4" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        <circle cx="21" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Action Accountability",
    body: "Every tool call validated against composed policy constraints, not just single-step checks. The read followed by a write, then a transfer, that compose into something no individual call would trip. Bastion sees the chain, not just the link.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-primary" fill="none">
        <rect x="6" y="10" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 10 V7 a5 5 0 0 1 10 0 V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 18 L15 21 L20 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Data Flow Visibility",
    body: "Sensitive data passing through any agent is identified, classified, and traced from input to output. Every redaction or block event is captured as evidence: not just 'PII detected,' but the specific field, the specific agent, the specific reason. The chain of custody underwriters and regulators ask for.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-primary" fill="none">
        <path d="M3 8 H29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 16 H29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 24 H29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="11" cy="8" r="2" fill="currentColor" />
        <circle cx="20" cy="16" r="2" fill="currentColor" />
        <circle cx="13" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Output Groundedness",
    body: "Each agent assertion is checked against the knowledge base it was authorized to use. Claims with no source backing are flagged as ungrounded; claims that contradict the source are flagged as hallucinated. Hallucination becomes measurable as a rate per thousand calls, not a vibe.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-primary" fill="none">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 20 L26 26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11 14 L13 16 L17 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Drift & Regression",
    body: "Model swaps, prompt edits, vendor updates, and slow seasonal drift surface as measurable shifts long before downstream metrics decay. Catches the silent regression: the prompt change that quietly raised the hallucination rate, the model upgrade that broke a tool-call pattern, the corpus update that reshaped output distribution.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-primary" fill="none">
        <path d="M4 16 L12 16 L16 8 L20 24 L24 16 L28 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="4" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Fleet-Wide Correlation",
    body: "Patterns no single agent can reveal: coordinated misuse, emergent escalation chains, systemic drift across the whole fleet, visible only at scale. One agent calling a new tool is noise. Three agents in the same hour, after the same prompt update, is a signal that only a cross-agent layer can surface.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-primary" fill="none">
        <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="25" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="18" r="2" fill="currentColor" />
        <line x1="16" y1="10" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="9" y1="20" x2="14" y2="19" stroke="currentColor" strokeWidth="1.5" />
        <line x1="23" y1="20" x2="18" y2="19" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function RiskExposuresSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-28 md:py-36 bg-bg-alt overflow-hidden" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="pointer-events-none absolute inset-0 bg-radial-soft opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary-bg px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
            The Core of What Bastion Does
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-text sm:text-6xl lg:text-7xl leading-[1.05]">
            Six Signals.{" "}
            <span className="gradient-text">One Picture of Agent Risk.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary max-w-2xl mx-auto">
            Most AI monitoring tools see surface events. Bastion is built around <strong className="text-text font-semibold">six structural dimensions</strong> of agent behavior, mapped directly to coverage triggers and regulatory requirements.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNALS.map((signal, i) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="group rounded-2xl border border-border bg-white p-8 shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary-bg flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <div className="h-7 w-7 flex items-center justify-center [&_svg]:h-7 [&_svg]:w-7">
                  {signal.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-text mb-3">{signal.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{signal.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 max-w-3xl mx-auto"
        >
          <div className="border-t border-border pt-8 text-center">
            <p className="text-base leading-relaxed text-text-secondary">
              These six dimensions are not arbitrary. Each maps to a specific category of AI failure that traditional security and observability tools miss: behavioral drift, agentic action chains, data leakage paths, ungrounded outputs, model regression, and fleet-level emergence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text font-semibold">
              It is the evidence layer Bastion is built around, and the layer carriers, regulators, and risk teams now require.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
