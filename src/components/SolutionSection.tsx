"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const modes = [
  {
    id: "monitor",
    label: "Monitor",
    sublabel: "30-day calibration",
    description: "Observe and learn. Bastion intercepts every API call, logs everything, and builds behavioral baselines for each agent. No interference with operations.",
    features: [
      "Full transcript capture with thinking blocks",
      "PII detection and exposure tracking",
      "Tool call frequency mapping",
      "Behavioral baseline establishment",
    ],
    color: "#3B82F6",
  },
  {
    id: "enforce",
    label: "Enforce",
    sublabel: "Active protection",
    description: "Act on what you've learned. PII is redacted before it leaves your network. Unauthorized tool calls are stripped. Anomalies trigger instant alerts.",
    features: [
      "PII redacted at the network layer",
      "Unauthorized tool calls blocked",
      "Rate anomaly detection and alerts",
      "Real-time incident response",
    ],
    color: "#22C55E",
  },
];

const deploymentSteps = [
  { step: "01", title: "Deploy", description: "Single binary, your infrastructure. No cloud dependency, no data leaves.", time: "10 minutes" },
  { step: "02", title: "Route", description: "Point your agents' API calls through Bastion. One config change.", time: "5 minutes" },
  { step: "03", title: "Monitor", description: "30-day calibration builds baselines. See everything your agents do.", time: "30 days" },
  { step: "04", title: "Report", description: "Sanitized telemetry report for your carrier. Aggregate metrics only.", time: "Automatic" },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeMode, setActiveMode] = useState("monitor");
  const currentMode = modes.find((m) => m.id === activeMode)!;

  return (
    <section id="solution" className="relative py-24 md:py-32" ref={ref}>
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-radial opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">The Solution</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            A security layer your
            <span className="gradient-text"> organization can stand behind</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-muted">
            One binary between your agents and their LLM calls. Every interaction intercepted,
            scanned, and logged — generating the documented evidence that makes AI governable.
          </p>
        </motion.div>

        {/* Two Modes */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          {/* Mode Toggle */}
          <div className="inline-flex rounded-xl border border-border bg-surface p-1">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                  activeMode === mode.id
                    ? "bg-bg text-text shadow-lg"
                    : "text-text-muted hover:text-text"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: mode.color }}
                  />
                  {mode.label}
                  <span className="hidden text-xs font-normal text-text-dim sm:inline">
                    — {mode.sublabel}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Mode Content */}
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid gap-6 md:grid-cols-2"
          >
            {/* Description */}
            <div className="rounded-2xl border border-border/50 bg-surface p-8">
              <p className="text-lg leading-relaxed text-text-muted">
                {currentMode.description}
              </p>
              <ul className="mt-6 space-y-3">
                {currentMode.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: currentMode.color }}
                    />
                    <span className="text-sm text-text">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="rounded-2xl border border-border/50 bg-surface p-6">
              <svg viewBox="0 0 400 280" className="w-full" fill="none">
                {/* Terminal-style header */}
                <rect x="0" y="0" width="400" height="280" rx="12" fill="#0F172A" />
                <circle cx="16" cy="14" r="4" fill="#EF4444" fillOpacity="0.6" />
                <circle cx="30" cy="14" r="4" fill="#EAB308" fillOpacity="0.6" />
                <circle cx="44" cy="14" r="4" fill="#22C55E" fillOpacity="0.6" />

                {/* Log lines */}
                <text x="16" y="45" fill="#64748B" fontSize="9" fontFamily="monospace">
                  {`[${activeMode === "monitor" ? "MONITOR" : "ENFORCE"}] bastion-proxy v1.0.0`}
                </text>
                <text x="16" y="60" fill="#64748B" fontSize="9" fontFamily="monospace">
                  listening on 0.0.0.0:8443
                </text>

                <text x="16" y="85" fill="#3B82F6" fontSize="9" fontFamily="monospace">
                  ▸ sera → POST /v1/chat/completions
                </text>
                <text x="16" y="100" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                  {`  input_rails: pii_scan ✓  rate_check ✓`}
                </text>
                <text x="16" y="115" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                  {`  forwarded → openrouter (1.2s)`}
                </text>
                <text x="16" y="130" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                  {`  output_rails: pii_scan ✓  tool_check ✓`}
                </text>
                <text x="16" y="145" fill="#22C55E" fontSize="9" fontFamily="monospace">
                  {`  ✓ logged event #1847`}
                </text>

                <text x="16" y="170" fill="#F97316" fontSize="9" fontFamily="monospace">
                  ▸ operator → POST /v1/chat/completions
                </text>
                <text x="16" y="185" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                  {`  input_rails: pii_scan ⚠ SSN detected`}
                </text>
                {activeMode === "enforce" ? (
                  <>
                    <text x="16" y="200" fill="#EF4444" fontSize="9" fontFamily="monospace">
                      {`  ✗ PII redacted: SSN → [REDACTED]`}
                    </text>
                    <text x="16" y="215" fill="#22C55E" fontSize="9" fontFamily="monospace">
                      {`  forwarded (sanitized) → openrouter`}
                    </text>
                  </>
                ) : (
                  <>
                    <text x="16" y="200" fill="#EAB308" fontSize="9" fontFamily="monospace">
                      {`  ⚠ flagged: pii_exposure (SSN)`}
                    </text>
                    <text x="16" y="215" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                      {`  forwarded (unmodified) → openrouter`}
                    </text>
                  </>
                )}
                <text x="16" y="230" fill="#22C55E" fontSize="9" fontFamily="monospace">
                  {`  ✓ logged event #1848`}
                </text>

                <text x="16" y="260" fill="#475569" fontSize="9" fontFamily="monospace">
                  fleet: 4 agents | 1,847 events | risk: 0.12
                </text>
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Deployment Steps */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold">Deploy in minutes, not months</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deploymentSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="group relative rounded-2xl border border-border/50 bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="text-4xl font-extrabold text-surface-light group-hover:text-primary/20 transition-colors duration-300">
                  {step.step}
                </span>
                <h4 className="mt-3 text-lg font-bold">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">{step.time}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
