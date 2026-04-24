"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ReportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
              Complete AI visibility. <span className="gradient-text">One intelligent report.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Bastion monitors your AI agent fleet and produces a structured behavioral assessment. Every metric traceable, every decision documented, every stakeholder covered.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: "Risk posture score", desc: "Weighted across all agents" },
                { label: "Data handling record", desc: "Documented remediation history" },
                { label: "Behavioral stability", desc: "Deviation rate over 30 days" },
                { label: "Loss event log", desc: "Classified by type and severity" },
              ].map((tile) => (
                <div key={tile.label} className="rounded-xl border border-border bg-white p-4">
                  <p className="text-sm font-semibold text-text leading-tight">{tile.label}</p>
                  <p className="text-xs text-text-muted mt-1">{tile.desc}</p>
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
              <span className="text-[10px] font-mono font-semibold text-text-dim">30-day window</span>
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
              <div className="rounded-lg bg-bg-alt border border-border p-3">
                <p className="text-xs font-semibold text-text">Recommendation: Eligible for standard AI liability coverage</p>
                <p className="text-[10px] text-text-dim mt-1">4 agents · 1,847 interactions · 30-day monitoring period</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
