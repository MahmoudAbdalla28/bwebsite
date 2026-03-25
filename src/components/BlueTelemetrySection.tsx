"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  {
    label: "PII Exposure Rate",
    value: "0.3%",
    sub: "Across 4 agents, 30 days",
    progress: 3,
    sparkline: [8, 12, 6, 4, 3, 5, 2, 3, 4, 2, 3, 1],
  },
  {
    label: "Consistency Score",
    value: "99.7%",
    sub: "Response alignment to constraints",
    progress: 99.7,
    sparkline: [95, 97, 98, 96, 99, 98, 99, 100, 99, 100, 99, 100],
  },
  {
    label: "Action Compliance",
    value: "98.2%",
    sub: "Actions within policy bounds",
    progress: 98.2,
    sparkline: [92, 94, 96, 95, 97, 96, 98, 97, 99, 98, 98, 98],
  },
  {
    label: "Anomaly Frequency",
    value: "1.4/day",
    sub: "Flagged deviations from baseline",
    progress: 14,
    sparkline: [5, 3, 4, 2, 3, 1, 2, 1, 2, 1, 1, 1],
  },
  {
    label: "Cost per Agent",
    value: "$7.85",
    sub: "Average daily LLM spend",
    progress: 45,
    sparkline: [12, 10, 9, 11, 8, 7, 9, 8, 7, 8, 7, 8],
  },
  {
    label: "Latency Overhead",
    value: "12ms",
    sub: "Added by security checks",
    progress: 6,
    sparkline: [18, 15, 14, 13, 12, 13, 11, 12, 13, 12, 11, 12],
  },
];

function Sparkline({ data, id }: { data: number[]; id: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 80;
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((d - min) / range) * h * 0.7 - h * 0.15,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-20 h-6" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D6EFD" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0D6EFD" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#spark-${id})`} />
      <path d={pathD} fill="none" stroke="#0D6EFD" strokeWidth="1.5" />
    </svg>
  );
}

export default function BlueTelemetrySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-sm font-semibold text-primary">Telemetry</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            30 days of signal, one underwriting report
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Blue collects six core metrics over a 30-day monitoring window. This is the data your insurance carrier needs to actually price AI liability coverage.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="rounded-xl border border-border bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">{m.label}</p>
                  <p className="mt-2 text-2xl font-bold text-text">{m.value}</p>
                  <p className="mt-1 text-[10px] text-text-dim">{m.sub}</p>
                </div>
                <Sparkline data={m.sparkline} id={`m-${i}`} />
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-1.5 w-full rounded-full bg-bg-alt overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${Math.min(m.progress, 100)}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 rounded-xl border border-primary/20 bg-primary-bg p-6"
        >
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm font-semibold text-text">The 30-day monitoring window</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Blue runs in monitor mode first, learning your fleet's baseline behavior without interfering with operations. After 30 days, it generates a carrier-grade telemetry report with enough actuarial data for your insurance provider to price coverage confidently.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {["Week 1", "Week 2", "Week 3", "Week 4"].map((w, i) => (
                <div key={w} className="text-center">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    i < 3 ? "bg-primary text-white" : "border-2 border-primary/30 text-primary"
                  }`}>
                    {i + 1}
                  </div>
                  <p className="mt-1 text-[9px] text-text-dim">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
