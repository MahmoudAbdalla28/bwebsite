"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PlatformSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="platform" className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-pill">How it works</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Drop in, <span className="gradient-text">don't rebuild</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary">
            One environment variable change. Your agents keep running. Bastion
            sits in between and handles the rest.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl border border-border bg-white p-8 md:p-10 mb-14 shadow-lg shadow-primary/5"
        >
          <svg viewBox="0 0 800 220" className="w-full" fill="none">
            {/* Agents */}
            <rect x="30" y="50" width="150" height="100" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            <text x="105" y="88" fill="#334155" fontSize="12" fontWeight="600" textAnchor="middle">Your AI Agents</text>
            <text x="105" y="108" fill="#64748B" fontSize="9" textAnchor="middle">LangChain, CrewAI,</text>
            <text x="105" y="121" fill="#64748B" fontSize="9" textAnchor="middle">AutoGen, 35+ more</text>

            {/* Arrow bidirectional */}
            <line x1="185" y1="100" x2="270" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
            <polygon points="265,95 275,100 265,105" fill="#CBD5E1" />
            <polygon points="195,95 185,100 195,105" fill="#CBD5E1" />
            <text x="228" y="90" fill="#94A3B8" fontSize="8" textAnchor="middle">API calls</text>

            {/* Bastion */}
            <rect x="275" y="20" width="250" height="165" rx="14" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="2" />
            <text x="400" y="48" fill="#0D6EFD" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="2">BASTION</text>

            {[
              { y: 60, label: "PII Monitoring", desc: "Track data exposure" },
              { y: 88, label: "Action Risk Scoring", desc: "Evaluate tool call risk" },
              { y: 116, label: "Behavioral Baselines", desc: "Detect drift from normal" },
              { y: 144, label: "Consistency Analysis", desc: "Score output reliability" },
            ].map((layer) => (
              <g key={layer.label}>
                <rect x="290" y={layer.y} width="220" height="22" rx="5" fill="white" stroke="#DBEAFE" strokeWidth="0.5" />
                <circle cx="306" cy={layer.y + 11} r="3.5" fill="#0D6EFD" fillOpacity="0.6" />
                <text x="316" y={layer.y + 15} fill="#334155" fontSize="9" fontWeight="500">{layer.label}</text>
                <text x="502" y={layer.y + 15} fill="#94A3B8" fontSize="8" textAnchor="end">{layer.desc}</text>
              </g>
            ))}

            {/* Arrow bidirectional */}
            <line x1="530" y1="100" x2="615" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
            <polygon points="610,95 620,100 610,105" fill="#CBD5E1" />
            <polygon points="540,95 530,100 540,105" fill="#CBD5E1" />
            <text x="573" y="90" fill="#94A3B8" fontSize="8" textAnchor="middle">Secured</text>

            {/* LLM */}
            <rect x="620" y="50" width="150" height="100" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            <text x="695" y="88" fill="#334155" fontSize="12" fontWeight="600" textAnchor="middle">LLM Provider</text>
            <text x="695" y="108" fill="#64748B" fontSize="9" textAnchor="middle">OpenAI, Anthropic,</text>
            <text x="695" y="121" fill="#64748B" fontSize="9" textAnchor="middle">Groq, local</text>

            {/* Report arrow */}
            <line x1="400" y1="185" x2="400" y2="205" stroke="#0D6EFD" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="400" y="218" fill="#0D6EFD" fontSize="9" fontWeight="600" textAnchor="middle">→ Underwriting Report</text>
          </svg>
        </motion.div>

        {/* What Bastion does — not tiers, just capabilities */}
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex-1 rounded-2xl sm:rounded-r-none border border-border bg-white p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">Monitor</p>
            <h3 className="mt-3 text-lg font-semibold text-text">See everything</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Every request and response logged. PII detected, tool calls tracked, confidence scored. Your agents don't know it's there.
            </p>
          </motion.div>

          <div className="hidden sm:flex items-center -mx-px">
            <svg viewBox="0 0 24 40" className="h-10 w-6 text-primary" fill="none">
              <path d="M4 20h16M14 14l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex-1 rounded-2xl sm:rounded-none border border-border bg-white p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">Enforce</p>
            <h3 className="mt-3 text-lg font-semibold text-text">Act on it</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              PII redacted before leaving your network. Unauthorized tool calls stripped. Anomalies blocked. Stronger data for your carrier.
            </p>
          </motion.div>

          <div className="hidden sm:flex items-center -mx-px">
            <svg viewBox="0 0 24 40" className="h-10 w-6 text-primary" fill="none">
              <path d="M4 20h16M14 14l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex-1 rounded-2xl sm:rounded-l-none border border-border bg-white p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">Validate</p>
            <h3 className="mt-3 text-lg font-semibold text-text">Prove it</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Continuous compliance verification across your fleet. Policy violations surfaced, scored, and documented.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
