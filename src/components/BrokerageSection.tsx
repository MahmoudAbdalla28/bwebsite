"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ROWS = [
  {
    label: "Fleet risk score",
    without: { value: "?? / 100", note: "No baseline exists" },
    with:    { value: "12 / 100", note: "LOW — quantified", fill: 12, green: true },
  },
  {
    label: "AI call volume",
    without: { value: "Unknown", note: "No logging in place" },
    with:    { value: "1,847 calls", note: "30-day behavioral log", fill: 85, green: false },
  },
  {
    label: "PII exposure rate",
    without: { value: "Untracked", note: "Unquantifiable liability" },
    with:    { value: "0.3%", note: "100% auto-remediated", fill: 3, green: true },
  },
  {
    label: "Behavioral drift",
    without: { value: "N / A", note: "No baseline recorded" },
    with:    { value: "0.2 σ", note: "Stable — within threshold", fill: 97, green: true },
  },
  {
    label: "Incident log",
    without: { value: "None", note: "No visibility" },
    with:    { value: "1 blocked", note: "Tool call — documented", fill: 100, green: true },
  },
];

function DifferentiateGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-6 pt-5 border-t border-white/20"
    >
      {/* Column headers */}
      <div className="grid grid-cols-[1fr_1px_1fr] mb-1">
        <p className="text-[8px] font-bold uppercase tracking-widest text-white/65 text-center pb-2">
          Competitor Submission
        </p>
        <div className="bg-white/10" />
        <p className="text-[8px] font-bold uppercase tracking-widest text-white text-center pb-2">
          Your Submission (Bastion)
        </p>
      </div>

      {/* Comparison table */}
      <div className="rounded-xl border border-white/20 overflow-hidden">
        {ROWS.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1fr_1px_1fr] ${i < ROWS.length - 1 ? "border-b border-white/10" : ""}`}
          >
            {/* Without */}
            <div className="px-3 py-2.5">
              <p className="text-[7px] font-bold uppercase tracking-widest text-white/55 mb-1">{row.label}</p>
              <p className="text-[10px] font-bold text-white/60 leading-none">{row.without.value}</p>
              <p className="text-[7px] text-white/50 mt-0.5 leading-snug">{row.without.note}</p>
            </div>

            {/* Divider */}
            <div className="bg-white/10" />

            {/* With */}
            <div className="px-3 py-2.5 bg-white/5">
              <p className="text-[7px] font-bold uppercase tracking-widest text-white/50 mb-1">{row.label}</p>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold text-white leading-none shrink-0">{row.with.value}</p>
                <div className="flex-1 h-1 rounded-full bg-white/15 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${row.with.green ? "bg-emerald-400" : "bg-white"}`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${row.with.fill}%` }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.65, ease: "easeOut" }}
                  />
                </div>
              </div>
              <p className="text-[7px] text-white/50 mt-0.5 leading-snug">{row.with.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Outcomes */}
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <div className="rounded-xl border border-red-400/25 bg-red-950/20 px-3 py-2 text-center">
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-red-400 mx-auto mb-1" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="text-[9px] font-bold text-red-300">DECLINED</p>
          <p className="text-[7px] text-red-300/50 mt-0.5">CG 40 47 exclusion · 400%+ spike</p>
        </div>
        <div className="rounded-xl border border-emerald-400/25 bg-emerald-950/20 px-3 py-2 text-center">
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-emerald-400 mx-auto mb-1" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3.5 6l2 2L8.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[9px] font-bold text-emerald-300">AI COVERAGE ISSUED</p>
          <p className="text-[7px] text-emerald-300/50 mt-0.5">Priced to risk · standard rate</p>
        </div>
      </div>
    </motion.div>
  );
}

const CHECKS = [
  { label: "PII detection & redaction", sub: "Before data leaves network" },
  { label: "Tool call audit + allow/block", sub: "Every agentic action logged" },
  { label: "Risk score delta", sub: "Per-call anomaly measurement" },
  { label: "Consistency check", sub: "Output reliability scored" },
];

const METRICS = [
  { label: "Calls monitored", value: "1,847" },
  { label: "Fleet risk score", value: "12 / 100" },
  { label: "PII exposure", value: "0.3%" },
  { label: "Blocked calls", value: "1" },
];

function DeployGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-6 pt-5 border-t border-white/20 space-y-3"
    >
      {/* Client environment */}
      <div className="relative rounded-xl border border-dashed border-white/25 px-4 pt-6 pb-4">
        <span className="absolute -top-2.5 left-4 bg-primary text-[7px] font-bold uppercase tracking-widest text-white/50 px-2">
          Client Environment — nothing leaves this boundary
        </span>

        {/* Main flow: Agents → Bastion → LLM */}
        <div className="flex items-center gap-2 mb-4">
          {/* Agent cluster */}
          <div className="flex flex-col items-center shrink-0 gap-1">
            <div className="flex gap-1">
              {[0, 1, 2].map((j) => (
                <div key={j} className="h-6 w-6 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                  <svg viewBox="0 0 10 10" className="h-3.5 w-3.5 text-white/50" fill="none">
                    <circle cx="5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="0.9" />
                    <path d="M1.5 9.5c0-1.9 1.5-3 3.5-3s3.5 1.1 3.5 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                  </svg>
                </div>
              ))}
            </div>
            <p className="text-[7px] text-white/40">AI Agents</p>
          </div>

          {/* Animated connector */}
          <div className="flex-1 relative h-3 flex items-center overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/15" />
            {[0, 0.6].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/70"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay }}
              />
            ))}
          </div>

          {/* Bastion */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-xl bg-white/25 border-2 border-white/40 flex items-center justify-center shadow-lg shadow-black/20">
              <svg viewBox="0 0 14 16" className="h-5 w-5 text-white" fill="none">
                <path d="M7 1L1 3.5v5C1 12 3.5 15 7 15.5 10.5 15 13 12 13 8.5v-5L7 1z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.2" />
                <path d="M4.5 8.5l2 2L9.5 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[7px] font-bold text-white">Bastion</p>
          </div>

          {/* Animated connector */}
          <div className="flex-1 relative h-3 flex items-center overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/15" />
            {[0, 0.6].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/70"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay }}
              />
            ))}
          </div>

          {/* LLM */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-white/50" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.1" />
                <path d="M1.5 8h13M8 1.5c-2 2.5-2 8.5 0 13M8 1.5c2 2.5 2 8.5 0 13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[7px] text-white/40">LLM API</p>
          </div>
        </div>

        {/* Per-call checks + local telemetry — two columns */}
        <div className="grid grid-cols-2 gap-2">
          {/* Per-call checks */}
          <div className="rounded-lg border border-white/15 bg-black/20 px-3 py-2.5">
            <p className="text-[7px] font-bold uppercase tracking-widest text-white/40 mb-2">Per call</p>
            <div className="space-y-1.5">
              {CHECKS.map((c, i) => (
                <motion.div
                  key={c.label}
                  className="flex items-start gap-1.5"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                >
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-emerald-400 shrink-0 mt-0.5" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.9" />
                    <path d="M3 5l1.5 1.5L7 3.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="text-[8px] text-white/80 leading-tight">{c.label}</p>
                    <p className="text-[7px] text-white/35 leading-tight">{c.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Local telemetry */}
          <div className="rounded-lg border border-white/15 bg-black/20 px-3 py-2.5">
            <p className="text-[7px] font-bold uppercase tracking-widest text-white/40 mb-2">Local telemetry store</p>
            <div className="space-y-1.5">
              {[
                { label: "Risk events", fill: 12 },
                { label: "PII flags", fill: 28 },
                { label: "Tool calls", fill: 74 },
                { label: "Consistency", fill: 97 },
              ].map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-0.5">
                    <p className="text-[7px] text-white/40">{bar.label}</p>
                    <p className="text-[7px] text-white/40">{bar.fill}%</p>
                  </div>
                  <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-white/50"
                      initial={{ width: "0%" }}
                      animate={{ width: `${bar.fill}%` }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[7px] text-white/25 mt-2 leading-snug">No data leaves the network</p>
          </div>
        </div>

        {/* Env var */}
        <div className="mt-2.5 rounded-lg bg-black/30 border border-white/10 px-3 py-1.5 font-mono flex items-center gap-2">
          <span className="text-[7px] text-white/30 shrink-0">Only change needed:</span>
          <span className="text-[8px] text-blue-300">OPENAI_BASE_URL</span>
          <span className="text-[8px] text-white/25">=</span>
          <span className="text-[8px] text-emerald-300">http://bastion:8080</span>
        </div>
      </div>

      {/* Telemetry metrics */}
      <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
        <p className="text-[7px] font-bold uppercase tracking-widest text-white/35 mb-2.5">
          After 30 days — carrier report generated locally
        </p>
        <div className="grid grid-cols-4 gap-2">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="text-center"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <p className="text-[11px] font-bold text-white leading-none">{m.value}</p>
              <p className="text-[7px] text-white/40 mt-0.5 leading-snug">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline → report */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between text-[7px] text-white/35 mb-1">
            <span>Day 0 — deploy binary</span>
            <span>Day 30 — baseline complete</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
        <svg viewBox="0 0 14 10" className="h-2.5 w-3.5 text-white/25 shrink-0" fill="none">
          <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="shrink-0 rounded-lg border border-white/25 bg-white/10 px-2.5 py-1 text-center">
          <p className="text-[8px] font-bold text-white leading-none">Carrier</p>
          <p className="text-[8px] font-bold text-white leading-none">Report</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BrokerageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="brokerages" className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="label-pill">For Brokerages</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Add AI risk telemetry to your <span className="gradient-text">book of business</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Carriers need actuarial data to underwrite AI liability. Bastion generates it.{" "}
            <strong className="text-text font-semibold">You deliver it.</strong>
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Deliver data no competitor has",
              body: "Your competitors can't underwrite AI liability because they don't have the data. You can.",
              graphic: <DifferentiateGraphic />,
            },
            {
              title: "Deploy on client infrastructure",
              body: "Single binary, 30-day monitoring window. One environment variable. A carrier-grade report — no code changes.",
              graphic: <DeployGraphic />,
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              onClick={() => setActive(active === i ? null : i)}
              className={`cursor-pointer rounded-2xl border p-8 transition-all duration-300 ${
                active === i
                  ? "border-primary bg-primary shadow-xl shadow-primary/20"
                  : "border-border bg-white shadow-sm hover:border-primary/30 hover:shadow-md"
              }`}
            >
              <h3 className={`text-lg font-bold ${active === i ? "text-white" : "text-text"}`}>
                {card.title}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed ${active === i ? "text-blue-100" : "text-text-muted"}`}>
                {card.body}
              </p>
              {active === i && card.graphic}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Partner with us
            <svg viewBox="0 0 20 12" className="h-3 w-5" fill="none">
              <path d="M0 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
