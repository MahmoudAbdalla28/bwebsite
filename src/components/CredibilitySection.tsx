"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CredibilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-primary">Output</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            What your risk stakeholders see
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-black/5"
        >
          <div className="border-b border-border px-8 py-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">Sample Report</p>
                <p className="mt-1 text-lg font-semibold text-text">Underwriting Telemetry Report</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-primary">30-day monitoring complete</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Fleet Risk Score", value: "12", unit: "/100", color: "text-primary", bg: "bg-primary-bg", sub: "Low Risk" },
                { label: "PII Exposure", value: "0.3", unit: "%", color: "text-primary", bg: "bg-primary-bg", sub: "100% remediated" },
                { label: "Consistency", value: "99.7", unit: "%", color: "text-primary", bg: "bg-primary-bg", sub: "Stable baseline" },
                { label: "Incidents Blocked", value: "1", unit: "", color: "text-primary-light", bg: "bg-primary-bg", sub: "Unauthorized tool call" },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className={`rounded-xl ${m.bg} p-5`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">{m.label}</p>
                  <p className="mt-2">
                    <span className={`text-3xl font-bold ${m.color}`}>{m.value}</span>
                    <span className="text-base text-text-dim">{m.unit}</span>
                  </p>
                  <p className="mt-1 text-xs text-text-muted">{m.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-primary/20 bg-primary-bg px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-primary">Eligible for standard AI liability coverage</span>
              </div>
              <span className="text-xs text-text-dim font-mono">4 agents · 1,847 interactions · 30-day period</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
