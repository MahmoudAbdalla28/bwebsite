"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ReportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: the pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="label-pill">The Underwriting Report</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
              The data carriers need to <span className="gradient-text">say yes</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Bastion monitors AI agent fleets and produces a structured risk
              assessment built for actuaries and brokers. Every metric traces
              back to the events that generated it.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                {
                  label: "Fleet risk score",
                  desc: "Weighted breakdown",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  ),
                },
                {
                  label: "PII exposure",
                  desc: "Remediation stats",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                      <rect x="4" y="10" width="16" height="11" rx="2" />
                      <path d="M8 10V7a4 4 0 118 0v3" />
                    </svg>
                  ),
                },
                {
                  label: "Consistency score",
                  desc: "Across all agents",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M4 19l4-6 4 3 8-10" />
                      <circle cx="8" cy="13" r="1.2" fill="#0D6EFD" />
                      <circle cx="12" cy="16" r="1.2" fill="#0D6EFD" />
                    </svg>
                  ),
                },
                {
                  label: "Incident summary",
                  desc: "By type and severity",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                      <path d="M14 3v6h6M8 13h8M8 17h5" />
                    </svg>
                  ),
                },
              ].map((tile) => (
                <div key={tile.label} className="rounded-xl border border-border bg-white p-4 flex items-start gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-primary-bg p-1.5">{tile.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-text leading-tight">{tile.label}</p>
                    <p className="text-xs text-text-muted mt-0.5">{tile.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: mini report preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl border border-border bg-white shadow-xl shadow-primary/8 overflow-hidden"
          >
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-text">Underwriting Telemetry Report</p>
              <span className="rounded-full bg-primary-bg px-2.5 py-0.5 text-[10px] font-semibold text-primary">30-day</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Fleet Risk", value: "12/100", sub: "Low" },
                  { label: "PII Exposure", value: "0.3%", sub: "100% remediated" },
                  { label: "Consistency", value: "99.7%", sub: "Stable" },
                  { label: "Blocked", value: "1", sub: "Tool call" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg bg-bg-alt p-3">
                    <p className="text-[10px] text-text-dim">{m.label}</p>
                    <p className="text-xl font-extrabold gradient-text">{m.value}</p>
                    <p className="text-[10px] text-text-dim">{m.sub}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-primary-bg border border-primary/10 p-3">
                <p className="text-xs font-semibold text-primary">Recommendation: Eligible for standard AI liability coverage</p>
                <p className="text-[10px] text-text-dim mt-1">4 agents · 1,847 interactions · 30-day monitoring period</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
