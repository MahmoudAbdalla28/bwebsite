"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Animated counter hook
function useCounter(end: number, duration: number, startAnimation: boolean, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!startAnimation) return;
    const ctrl = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Number(v.toFixed(decimals))),
    });
    return () => ctrl.stop();
  }, [end, duration, startAnimation, decimals]);
  return value;
}

// Fake timeline data
const timelineData = [
  { day: "Mar 1", risk: 0.18, cost: 2.1 },
  { day: "Mar 2", risk: 0.15, cost: 2.4 },
  { day: "Mar 3", risk: 0.22, cost: 1.8 },
  { day: "Mar 4", risk: 0.12, cost: 3.1 },
  { day: "Mar 5", risk: 0.14, cost: 2.7 },
  { day: "Mar 6", risk: 0.11, cost: 2.2 },
  { day: "Mar 7", risk: 0.09, cost: 2.9 },
  { day: "Mar 8", risk: 0.13, cost: 2.5 },
  { day: "Mar 9", risk: 0.10, cost: 3.3 },
  { day: "Mar 10", risk: 0.08, cost: 2.8 },
  { day: "Mar 11", risk: 0.12, cost: 2.1 },
  { day: "Mar 12", risk: 0.07, cost: 3.0 },
  { day: "Mar 13", risk: 0.09, cost: 2.6 },
  { day: "Mar 14", risk: 0.12, cost: 2.4 },
];

const agents = [
  { name: "Sera", status: "online", requests: 412, cost: 8.2, latency: "890ms", risk: 0.05 },
  { name: "Operator", status: "online", requests: 387, cost: 11.5, latency: "2.1s", risk: 0.15 },
  { name: "Recon", status: "online", requests: 298, cost: 3.9, latency: "1.4s", risk: 0.02 },
  { name: "Bastion", status: "online", requests: 203, cost: 7.8, latency: "3.8s", risk: 0.45 },
];

const events = [
  { time: "14:23:01", agent: "Operator", type: "PII Detected", detail: "SSN pattern in response", severity: "high" },
  { time: "14:22:47", agent: "Sera", type: "Tool Call", detail: "search_knowledge_base", severity: "low" },
  { time: "14:22:31", agent: "Bastion", type: "Rate Spike", detail: "3.2x baseline exceeded", severity: "medium" },
  { time: "14:22:18", agent: "Recon", type: "Request", detail: "GPT-4o completion", severity: "low" },
  { time: "14:21:55", agent: "Operator", type: "Tool Blocked", detail: "delete_record stripped", severity: "high" },
  { time: "14:21:40", agent: "Sera", type: "Request", detail: "Claude completion", severity: "low" },
];

function MiniChart({ data, active }: { data: typeof timelineData; active: boolean }) {
  const maxRisk = Math.max(...data.map((d) => d.risk));
  const h = 60;
  const w = 280;
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (d.risk / maxRisk) * h * 0.8 - h * 0.1,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D6EFD" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0D6EFD" stopOpacity="0" />
        </linearGradient>
      </defs>
      {active && (
        <>
          <motion.path
            d={areaD}
            fill="url(#chartFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path
            d={pathD}
            fill="none"
            stroke="#0D6EFD"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />
        </>
      )}
    </svg>
  );
}

export default function DashboardShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleEvents, setVisibleEvents] = useState(0);

  const spend = useCounter(31.4, 1.5, isInView, 2);
  const latency = useCounter(1.4, 1.2, isInView, 1);
  const pii = useCounter(23, 1.8, isInView);
  const risk = useCounter(0.12, 1.5, isInView, 2);

  // Stream events in one by one
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setVisibleEvents((v) => {
        if (v >= events.length) {
          clearInterval(timer);
          return v;
        }
        return v + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <div ref={ref} className="relative">
      {/* Browser chrome */}
      <div className="rounded-2xl border border-border bg-white shadow-2xl shadow-black/10 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-bg-alt">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-border" />
            <span className="h-3 w-3 rounded-full bg-border" />
            <span className="h-3 w-3 rounded-full bg-border" />
          </div>
          <div className="flex-1 mx-8">
            <div className="mx-auto max-w-sm rounded-md bg-white border border-border px-3 py-1 text-[11px] text-text-dim text-center font-mono">
              demo.pistonsolutions.ai/bastion-blue
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden md:flex w-48 shrink-0 flex-col border-r border-border bg-bg-alt p-3 gap-1">
            {["Fleet Overview", "Live Telemetry", "Safety Metrics", "Event Log", "Policy Config"].map((item, i) => (
              <div
                key={item}
                className={`rounded-lg px-3 py-2 text-xs font-medium ${
                  i === 0 ? "bg-primary-bg text-primary" : "text-text-muted"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main area */}
          <div className="flex-1 p-4 md:p-6 bg-bg-alt min-h-[420px]">
            {/* Executive metrics bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { label: "Total LLM Spend", value: `$${spend.toFixed(2)}`, sub: "14d" },
                { label: "Avg Response Time", value: `${latency.toFixed(1)}s`, sub: "fleet" },
                { label: "PII Exposures", value: `${pii}`, sub: "detected" },
                { label: "Fleet Risk Score", value: `${risk.toFixed(2)}`, sub: "low" },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="rounded-xl border border-border bg-white p-3"
                >
                  <p className="text-[10px] font-medium text-text-dim">{m.label}</p>
                  <p className="mt-1 text-xl font-bold text-text">{m.value}</p>
                  <p className="text-[10px] text-text-dim">{m.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
              {/* Left: chart + agents */}
              <div className="space-y-4">
                {/* Risk timeline chart */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl border border-border bg-white p-4"
                >
                  <p className="text-[10px] font-semibold text-text-dim mb-2">RISK SCORE (14D)</p>
                  <MiniChart data={timelineData} active={isInView} />
                </motion.div>

                {/* Agent cards */}
                <div className="grid grid-cols-2 gap-2">
                  {agents.map((agent, i) => (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.12 }}
                      className="rounded-xl border border-border bg-white p-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <motion.span
                          className="h-2 w-2 rounded-full bg-primary"
                          animate={isInView ? { opacity: [0.4, 1, 0.4] } : {}}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                        <span className="text-xs font-semibold text-text">{agent.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                        <span className="text-text-dim">Requests</span>
                        <span className="text-text-muted text-right">{agent.requests}</span>
                        <span className="text-text-dim">Cost</span>
                        <span className="text-text-muted text-right">${agent.cost}</span>
                        <span className="text-text-dim">Latency</span>
                        <span className="text-text-muted text-right">{agent.latency}</span>
                        <span className="text-text-dim">Risk</span>
                        <span className={`text-right font-medium ${agent.risk >= 0.3 ? "text-red" : "text-primary"}`}>
                          {agent.risk}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: event feed */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-border bg-white p-4 overflow-hidden"
              >
                <p className="text-[10px] font-semibold text-text-dim mb-3">LIVE EVENT FEED</p>
                <div className="space-y-2">
                  {events.slice(0, visibleEvents).map((ev, i) => (
                    <motion.div
                      key={`${ev.time}-${i}`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2 rounded-lg bg-bg-alt px-3 py-2"
                    >
                      <span
                        className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                          ev.severity === "high" ? "bg-red" : "bg-primary"
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-text-dim">{ev.time}</span>
                          <span className="text-[10px] font-semibold text-text">{ev.agent}</span>
                        </div>
                        <p className="text-[10px] text-text-muted truncate">
                          {ev.type}: {ev.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {visibleEvents < events.length && (
                    <div className="flex items-center gap-2 px-3 py-2">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-[10px] text-text-dim">Listening...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
