"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const checkPipeline = [
  {
    name: "PII Detection",
    desc: "Compiled regex for SSNs, credit cards, emails, phones, health IDs. Deterministic matching, zero latency. In enforce mode, redacts before forwarding.",
    metric: "PII exposure rate",
  },
  {
    name: "Hallucination Scoring",
    desc: "Flags hedging language, ungrounded claims, and responses that contradict system prompt constraints. Outputs a 0-1 confidence score per response.",
    metric: "Consistency score",
  },
  {
    name: "Action Validation",
    desc: "Parses tool_calls from LLM responses and checks against per-agent allow/blocklists. Unauthorized calls get stripped before they reach the agent.",
    metric: "Blocked action count",
  },
  {
    name: "Anomaly Detection",
    desc: "Tracks request rates per agent on rolling windows. Flags when an agent calls a tool it has never used before, a strong signal of prompt injection.",
    metric: "Anomaly count",
  },
];

export default function BlueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCheck, setActiveCheck] = useState(0);

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="label-pill">How it works</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Secure every AI agent <span className="gradient-text">in production</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Reverse proxy between your agents and their LLM providers. Every request
            and response flows through a check pipeline, gets logged locally, and
            feeds into structured risk telemetry.
          </p>
        </motion.div>

        {/* Architecture + Integration in a 2-col grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-14">
          {/* Left: architecture diagram */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-border bg-white p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Architecture</p>
            <svg viewBox="0 0 400 320" className="w-full" fill="none">
              {/* Single binary */}
              <rect x="100" y="10" width="200" height="50" rx="10" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1.5" />
              <text x="200" y="32" fill="#0D6EFD" fontSize="9" fontWeight="700" textAnchor="middle" letterSpacing="1.5">SINGLE BINARY</text>
              <text x="200" y="48" fill="#64748B" fontSize="8" textAnchor="middle">No Python, no containers, no deps</text>

              {/* Arrow down */}
              <line x1="200" y1="60" x2="200" y2="85" stroke="#CBD5E1" strokeWidth="1.5" />
              <polygon points="195,80 200,90 205,80" fill="#CBD5E1" />

              {/* Config change */}
              <rect x="60" y="90" width="280" height="45" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
              <text x="200" y="110" fill="#334155" fontSize="9" fontWeight="600" textAnchor="middle">One environment variable change</text>
              <text x="200" y="125" fill="#94A3B8" fontSize="7.5" textAnchor="middle">OPENAI_API_BASE=http://bastion:8443</text>

              {/* Arrow down */}
              <line x1="200" y1="135" x2="200" y2="160" stroke="#CBD5E1" strokeWidth="1.5" />
              <polygon points="195,155 200,165 205,155" fill="#CBD5E1" />

              {/* Two modes side by side */}
              <rect x="30" y="165" width="160" height="55" rx="10" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1" />
              <text x="110" y="187" fill="#0D6EFD" fontSize="9" fontWeight="600" textAnchor="middle">Monitor</text>
              <text x="110" y="203" fill="#64748B" fontSize="7.5" textAnchor="middle">Log everything silently</text>

              <rect x="210" y="165" width="160" height="55" rx="10" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1" />
              <text x="290" y="187" fill="#0D6EFD" fontSize="9" fontWeight="600" textAnchor="middle">Enforce</text>
              <text x="290" y="203" fill="#64748B" fontSize="7.5" textAnchor="middle">Block and redact in real time</text>

              {/* Arrow between modes */}
              <line x1="190" y1="192" x2="210" y2="192" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="206,188 214,192 206,196" fill="#CBD5E1" />

              {/* Both arrow down to output */}
              <line x1="110" y1="220" x2="110" y2="245" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="290" y1="220" x2="290" y2="245" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="110" y1="245" x2="290" y2="245" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="200" y1="245" x2="200" y2="265" stroke="#CBD5E1" strokeWidth="1.5" />
              <polygon points="195,260 200,270 205,260" fill="#CBD5E1" />

              {/* Output */}
              <rect x="80" y="270" width="240" height="40" rx="10" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="200" y="293" fill="#0D6EFD" fontSize="9" fontWeight="600" textAnchor="middle">Underwriting Telemetry Report</text>
            </svg>
          </motion.div>

          {/* Right: frictionless integration */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-primary/20 bg-primary-bg p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-4">Frictionless Integration</p>
            <p className="text-sm leading-relaxed text-text-muted">
              Bastion drops into your existing architecture without rebuilding agents.
            </p>
            <div className="mt-4 space-y-2">
              {[
                "Single binary deploy on your infrastructure",
                "One endpoint change for existing agents",
                "No SDK rewrite or model-provider lock-in",
                "Monitor first, enforce when ready",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-xs text-text-muted">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Check Pipeline - full width */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Check Pipeline</p>

          <div className="grid gap-3 sm:grid-cols-4 mb-4">
            {checkPipeline.map((check, i) => (
              <button
                key={check.name}
                onClick={() => setActiveCheck(i)}
                className={`cursor-pointer rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  activeCheck === i
                    ? "bg-white border border-primary/20 shadow-sm"
                    : "bg-white/50 border border-border hover:border-primary/20"
                }`}
              >
                <p className={`text-sm font-semibold ${activeCheck === i ? "text-primary" : "text-text-muted"}`}>
                  {check.name}
                </p>
              </button>
            ))}
          </div>

          <motion.div
            key={activeCheck}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-border bg-white p-6"
          >
            <p className="text-base font-semibold text-text">{checkPipeline[activeCheck].name}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{checkPipeline[activeCheck].desc}</p>
            <div className="mt-3 rounded-lg bg-primary-bg px-3 py-1.5 inline-block">
              <span className="text-xs font-medium text-primary">Feeds: {checkPipeline[activeCheck].metric}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Fleet correlation - full width */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 rounded-xl border border-primary/20 bg-primary-bg p-6"
        >
          <p className="text-sm font-semibold text-text">Fleet-wide correlation</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Monitors the whole fleet, not just individual agents. If one agent starts calling tools
            no other agent has ever used, that signal is much stronger than individual baseline deviation.
            A compromised agent that looks normal in isolation but diverges from fleet behavior gets flagged and blocked.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
