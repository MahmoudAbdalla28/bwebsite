"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

type Mode = "observe" | "enforce";

const MODE_COPY: Record<Mode, string> = {
  observe:
    "Observability ships as a webhook ingest. Your application pushes agent traffic to Bastion asynchronously, out-of-band, with sub-millisecond overhead. No SDK changes, no agent rebuilds.",
  enforce:
    "Enforcement adds an inline gateway. Agents route through Bastion in flight, with PII redaction and tool allow/blocklists applied per request. No SDK changes, no agent rebuilds.",
};

export default function PlatformSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [mode, setMode] = useState<Mode>("observe");

  return (
    <section id="platform" className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="label-pill">How it works</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Drop In, <span className="gradient-text">Don&apos;t Rebuild</span>
          </h2>
        </motion.div>

        {/* Toggle ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative inline-flex items-center rounded-full border border-border bg-white p-1 shadow-sm">
            <motion.span
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-primary"
              initial={false}
              animate={{ x: mode === "observe" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            />
            <button
              onClick={() => setMode("observe")}
              className={`relative z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer ${
                mode === "observe" ? "text-white" : "text-text-muted hover:text-text"
              }`}
            >
              Observe
            </button>
            <button
              onClick={() => setMode("enforce")}
              className={`relative z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer ${
                mode === "enforce" ? "text-white" : "text-text-muted hover:text-text"
              }`}
            >
              Enforce
            </button>
          </div>
        </motion.div>

        {/* Mode-specific description ─────────────── */}
        <div className="mx-auto max-w-2xl mb-8 min-h-[5rem] flex items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-center text-base text-text-secondary"
            >
              {MODE_COPY[mode]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Animated diagram card ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl border border-border bg-white p-8 md:p-10 mb-14 shadow-lg shadow-primary/5"
        >
          {mode === "observe" ? <ObserveDiagram /> : <EnforceDiagram />}
        </motion.div>

        {/* Capability cards (unchanged) */}
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex-1 rounded-2xl sm:rounded-r-none border border-border bg-white p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">Monitor</p>
            <h3 className="mt-3 text-lg font-semibold text-text">See Everything</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Every request and response logged. PII detected, tool calls tracked, confidence scored. Your agents don&apos;t know it&apos;s there.
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
            <h3 className="mt-3 text-lg font-semibold text-text">Act On It</h3>
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
            <h3 className="mt-3 text-lg font-semibold text-text">Prove It</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Continuous compliance verification across your fleet. Policy violations surfaced, scored, and documented.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── OBSERVE diagram (default) ─────────────────────────
   Agents call LLM directly; webhook pushes async to Bastion. */
function ObserveDiagram() {
  return (
    <svg viewBox="0 0 800 230" className="w-full" fill="none">
      <text x="30" y="22" fill="#0D6EFD" fontSize="10" fontWeight="700" letterSpacing="2">OBSERVE</text>
      <text x="120" y="22" fill="#94A3B8" fontSize="9">watch your fleet · without slowing it down</text>

      {/* Agents */}
      <rect x="30" y="48" width="150" height="80" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <text x="105" y="78" fill="#334155" fontSize="11" fontWeight="600" textAnchor="middle">Your AI Agents</text>
      <text x="105" y="96" fill="#64748B" fontSize="9" textAnchor="middle">LangChain, CrewAI,</text>
      <text x="105" y="108" fill="#64748B" fontSize="9" textAnchor="middle">AutoGen, 35+ more</text>

      {/* Request: agents → LLM */}
      <line x1="185" y1="80" x2="618" y2="80" stroke="#CBD5E1" strokeWidth="1.5" />
      <polygon points="613,75 623,80 613,85" fill="#CBD5E1" />
      <text x="400" y="70" fill="#94A3B8" fontSize="9" textAnchor="middle">request</text>

      {/* Response: LLM → agents */}
      <line x1="190" y1="100" x2="623" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
      <polygon points="195,95 185,100 195,105" fill="#CBD5E1" />
      <text x="400" y="116" fill="#94A3B8" fontSize="9" textAnchor="middle">response</text>

      {/* LLM */}
      <rect x="625" y="48" width="150" height="80" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <text x="700" y="78" fill="#334155" fontSize="11" fontWeight="600" textAnchor="middle">LLM Provider</text>
      <text x="700" y="96" fill="#64748B" fontSize="9" textAnchor="middle">OpenAI, Anthropic,</text>
      <text x="700" y="108" fill="#64748B" fontSize="9" textAnchor="middle">Bedrock, local</text>

      {/* Side channel to Bastion (in the background) */}
      <path d="M105 128 L105 175 L230 175" stroke="#0D6EFD" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      <polygon points="230,170 240,175 230,180" fill="#0D6EFD" />
      <text x="115" y="143" fill="#0D6EFD" fontSize="9" fontWeight="600">activity sent in the background</text>

      {/* Bastion box (out-of-band) — centered between Agents and LLM */}
      <rect x="242" y="150" width="320" height="50" rx="10" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="2" />
      <text x="402" y="172" fill="#0D6EFD" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">BASTION</text>
      <text x="402" y="187" fill="#475569" fontSize="9" textAnchor="middle">spots sensitive data · learns normal behavior · keeps a record</text>

      {/* Output footer */}
      <text x="400" y="222" fill="#0D6EFD" fontSize="10" fontWeight="600" textAnchor="middle">Risk record for your stakeholders</text>
    </svg>
  );
}

/* ── + ENFORCE diagram (opt-in inline gateway) ───────── */
function EnforceDiagram() {
  return (
    <svg viewBox="0 0 800 230" className="w-full" fill="none">
      <text x="30" y="22" fill="#0D6EFD" fontSize="10" fontWeight="700" letterSpacing="2">ENFORCE</text>
      <text x="135" y="22" fill="#94A3B8" fontSize="9">opt-in · checks every request · slight delay</text>

      {/* Agents */}
      <rect x="30" y="70" width="150" height="90" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <text x="105" y="105" fill="#334155" fontSize="11" fontWeight="600" textAnchor="middle">Your AI Agents</text>
      <text x="105" y="125" fill="#64748B" fontSize="9" textAnchor="middle">same agents,</text>
      <text x="105" y="138" fill="#64748B" fontSize="9" textAnchor="middle">routed through Bastion</text>

      {/* Agent → Bastion (request) */}
      <line x1="185" y1="105" x2="278" y2="105" stroke="#CBD5E1" strokeWidth="1.5" />
      <polygon points="278,100 288,105 278,110" fill="#CBD5E1" />

      {/* Bastion → Agent (response) */}
      <line x1="190" y1="125" x2="288" y2="125" stroke="#CBD5E1" strokeWidth="1.5" />
      <polygon points="195,120 185,125 195,130" fill="#CBD5E1" />

      {/* Bastion (inline, sovereign proxy) */}
      <rect x="290" y="55" width="220" height="120" rx="12" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="2" />
      <text x="400" y="84" fill="#0D6EFD" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="2">BASTION</text>
      {[
        { y: 100, label: "Enforces your rules" },
        { y: 122, label: "Blocks unsafe requests" },
        { y: 144, label: "Removes sensitive data" },
      ].map((row) => (
        <g key={row.label}>
          <rect x="305" y={row.y} width="190" height="20" rx="4" fill="white" stroke="#DBEAFE" strokeWidth="0.5" />
          <circle cx="319" cy={row.y + 10} r="3" fill="#0D6EFD" fillOpacity="0.7" />
          <text x="328" y={row.y + 13} fill="#334155" fontSize="9" fontWeight="500">{row.label}</text>
        </g>
      ))}

      {/* Arrow Bastion → LLM */}
      <line x1="512" y1="105" x2="618" y2="105" stroke="#CBD5E1" strokeWidth="1.5" />
      <polygon points="613,100 623,105 613,110" fill="#CBD5E1" />

      {/* LLM → Bastion (response) */}
      <line x1="517" y1="125" x2="623" y2="125" stroke="#CBD5E1" strokeWidth="1.5" />
      <polygon points="522,120 512,125 522,130" fill="#CBD5E1" />

      {/* LLM */}
      <rect x="625" y="70" width="150" height="90" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <text x="700" y="105" fill="#334155" fontSize="11" fontWeight="600" textAnchor="middle">LLM Provider</text>
      <text x="700" y="125" fill="#64748B" fontSize="9" textAnchor="middle">OpenAI, Anthropic,</text>
      <text x="700" y="138" fill="#64748B" fontSize="9" textAnchor="middle">Bedrock, local</text>

      {/* Output footer */}
      <text x="400" y="222" fill="#0D6EFD" fontSize="10" fontWeight="600" textAnchor="middle">Live protection + complete record</text>
    </svg>
  );
}
