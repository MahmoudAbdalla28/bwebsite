"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type PersonaId = "risk" | "carrier";

interface Persona {
  id: PersonaId;
  label: string;
  icon: React.ReactNode;
  stuck: string;
  bastion: string;
  proofLabel: string;
  proof: string[];
}

const PERSONAS: Persona[] = [
  {
    id: "risk",
    label: "Security & Compliance",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    stuck: "Legal won't let you ship AI agents without provable controls, and your engineering team won't tolerate another dashboard to maintain or SDK to rewrite. You need re-validation every time a model or prompt changes, but it has to fit how you actually ship.",
    bastion: "One config change. Drop the proxy in, point your agents at it, and your fleet inherits enforcement, telemetry, and continuous attestation against your declared safeguards. Every model swap, prompt edit, or tool-chain change triggers re-validation automatically. Tamper-evident logs your legal and risk teams can sign off on. No SDK rewrite, no rebuilds, no new tooling to own.",
    proofLabel: "The Tech & Frameworks Behind It",
    proof: ["Drop-in proxy", "Sub-10ms overhead", "NIST AI RMF", "ISO 42001", "EU AI Act Art. 12", "MRM"],
  },
  {
    id: "carrier",
    label: "Carrier / MGA",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13l4-4 4 3 7-7" />
        <path d="M14 5h7v7" />
      </svg>
    ),
    stuck: "You're being asked to write affirmative AI coverage with no actuarial baseline. Point-in-time questionnaires don't survive contact with a real agent fleet.",
    bastion: "Continuous, underwriter-ready telemetry across six structural dimensions of agent risk. One attested file, consumable across your entire carrier panel. The Evidence of Control to convert silent AI exposure into affirmatively-priced coverage.",
    proofLabel: "The Standard Behind It",
    proof: ["Continuous attestation", "Carrier-panel format", "Tamper-evident"],
  },
];

export default function WhatThisMeansSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [active, setActive] = useState<PersonaId>("risk");

  const persona = PERSONAS.find((p) => p.id === active)!;

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-display-sm text-text">
            Pick Your <span className="gradient-text">Field</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Tell us where you sit. We&apos;ll show you what changes for you.
          </p>
        </motion.div>

        {/* Persona selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 rounded-sm border border-border bg-surface p-2"
        >
          {PERSONAS.map((p) => {
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`relative flex items-center justify-center gap-2.5 px-4 py-3 rounded-sm text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary-bg text-primary shadow-sm"
                    : "text-text-muted hover:text-text hover:bg-bg-alt"
                }`}
              >
                <span className={isActive ? "text-primary" : "text-text-dim"}>
                  {p.icon}
                </span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-sm border border-border bg-surface p-8 md:p-10 shadow-sm overflow-hidden md:h-[26rem]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-3">
                    Where You&apos;re Stuck
                  </p>
                  <p className="text-base leading-relaxed text-text">
                    {persona.stuck}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-3">
                    What Bastion Does
                  </p>
                  <p className="text-base leading-relaxed text-text">
                    {persona.bastion}
                  </p>
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-3">
                  {persona.proofLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {persona.proof.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-bg-alt border border-border px-3 py-1 text-xs font-medium text-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex justify-center"
        >
          <a
            href={`/bastion/contact/?persona=${persona.id}`}
            className="btn-glow inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.99]"
          >
            Continue this conversation
            <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none">
              <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
