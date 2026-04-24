"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Animated flow dot ── */
function FlowDot({ direction, delay = 0 }: { direction: "down" | "right"; delay?: number }) {
  const isVert = direction === "down";
  return (
    <motion.div
      className="absolute rounded-full bg-primary"
      style={{ width: 6, height: 6, left: isVert ? "calc(50% - 3px)" : 0, top: isVert ? 0 : "calc(50% - 3px)" }}
      animate={isVert
        ? { top: ["-6px", "calc(100% + 6px)"], opacity: [0, 1, 1, 0] }
        : { left: ["-6px", "calc(100% + 6px)"], opacity: [0, 1, 1, 0] }
      }
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: "linear" }}
    />
  );
}

/* ── Connection line with animated dots ── */
function FlowConnection({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <>
      {/* Vertical on mobile */}
      <div className={`relative flex md:hidden flex-col items-center py-2 ${className}`}>
        <div className="relative w-px h-12 bg-border overflow-hidden">
          <FlowDot direction="down" />
          <FlowDot direction="down" delay={1.2} />
        </div>
        {label && <p className="text-[10px] text-text-dim mt-1">{label}</p>}
      </div>
      {/* Horizontal on desktop */}
      <div className={`relative hidden md:flex flex-col items-center justify-center ${className}`}>
        <div className="relative w-full h-px bg-border overflow-hidden">
          <FlowDot direction="right" />
          <FlowDot direction="right" delay={1.2} />
        </div>
        {label && <p className="text-[10px] text-text-dim mt-2 text-center">{label}</p>}
      </div>
    </>
  );
}

export default function DeploymentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative bg-white" ref={ref}>
      {/* Header */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="label-pill">Deployment</span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text sm:text-6xl leading-[1.1]">
              One config change.<br /><span className="gradient-text">Full visibility.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
              Point your agents at Bastion instead of the provider. Your API keys pass through. Everything else stays the same.
            </p>
          </motion.div>

          {/* Integration snippets */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-14 grid gap-4 sm:grid-cols-3"
          >
            {[
              { label: "OpenAI", env: "OPENAI_API_BASE", val: "http://bastion:8443" },
              { label: "Anthropic", env: "ANTHROPIC_BASE_URL", val: "http://bastion:8443" },
              { label: "LangChain", env: "base_url", val: '"http://bastion:8443"' },
            ].map((ex) => (
              <div key={ex.label} className="rounded-xl border border-border bg-bg-alt p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-dim mb-3">{ex.label}</p>
                <p className="font-mono text-xs text-text-secondary">{ex.env}<span className="text-text-dim">=</span></p>
                <p className="font-mono text-xs text-primary-dark mt-0.5">{ex.val}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Architecture: DOM-based data flow ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="relative bg-bg-alt border-y border-border-light py-16 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm font-semibold tracking-wide text-primary mb-2">Architecture</p>
          <h3 className="text-2xl font-semibold text-text sm:text-3xl">
            Where your data flows
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
            Everything inside the boundary runs on your infrastructure.
            The underwriting report is the only output — aggregate risk
            metrics for your carrier.
          </p>

          {/* ── Infrastructure boundary ── */}
          <div className="mt-14 relative rounded-2xl border-2 border-dashed border-primary/20 p-6 md:p-10">
            {/* Boundary label */}
            <div className="absolute -top-3.5 left-6 md:left-10 bg-bg-alt px-4">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-primary/60">
                Your infrastructure
              </span>
            </div>

            {/* ── Main flow: Agents → Bastion → LLM ── */}
            <div className="flex flex-col md:flex-row md:items-stretch gap-0 mt-4">

              {/* Agent node */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex-1 rounded-2xl border border-border bg-white p-6 md:p-8 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-bg-alt flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round">
                      <rect x="4" y="4" width="16" height="16" rx="4" />
                      <circle cx="9" cy="11" r="1" /><circle cx="15" cy="11" r="1" />
                      <path d="M10 15h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Your AI Agents</p>
                    <p className="text-xs text-text-dim">35+ frameworks</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {["LangChain", "CrewAI", "AutoGen", "Custom"].map((f) => (
                    <span key={f} className="rounded-md bg-bg-alt px-2 py-0.5 text-[10px] text-text-dim">{f}</span>
                  ))}
                </div>
              </motion.div>

              {/* Connection: Agents → Bastion */}
              <FlowConnection label="Requests & responses" className="md:w-16 md:min-w-[64px] shrink-0" />

              {/* Bastion node — primary, larger */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="flex-[1.4] rounded-2xl border-2 border-primary bg-white p-6 md:p-8 relative overflow-hidden"
              >
                {/* Subtle radial glow */}
                <div className="pointer-events-none absolute inset-0 bg-radial-soft opacity-60" />

                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">Bastion</p>

                  <div className="space-y-3">
                    {[
                      { check: "PII detection & redaction", desc: "Scans requests and responses" },
                      { check: "Tool call validation", desc: "Verifies against policy" },
                      { check: "Behavioral analysis", desc: "Baselines and drift detection" },
                      { check: "Policy enforcement", desc: "Block, redact, or flag" },
                    ].map((layer) => (
                      <div key={layer.check} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary/50 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-text leading-tight">{layer.check}</p>
                          <p className="text-xs text-text-dim mt-0.5">{layer.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Connection: Bastion → LLM */}
              <FlowConnection label="Secured traffic" className="md:w-16 md:min-w-[64px] shrink-0" />

              {/* LLM node */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="flex-1 rounded-2xl border border-border bg-white p-6 md:p-8 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-bg-alt flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 8v4l2 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">LLM Provider</p>
                    <p className="text-xs text-text-dim">API passthrough</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {["OpenAI", "Anthropic", "Groq", "Local"].map((f) => (
                    <span key={f} className="rounded-md bg-bg-alt px-2 py-0.5 text-[10px] text-text-dim">{f}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Local storage row ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {[
                { icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                    <ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" /><path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
                  </svg>
                ), label: "Local SQLite", sub: "All event data" },
                { icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" />
                  </svg>
                ), label: "Audit log", sub: "Append-only" },
                { icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 3v18" />
                  </svg>
                ), label: "Dashboard", sub: "Internal network" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-white px-4 py-3 flex items-center gap-3">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs font-medium text-text">{item.label}</p>
                    <p className="text-[10px] text-text-dim">{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Report output — outside boundary ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Animated flow line out */}
            <div className="relative w-px h-10 bg-border overflow-hidden">
              <FlowDot direction="down" />
            </div>

            <div className="rounded-2xl border border-primary/20 bg-white p-6 md:p-8 w-full max-w-md text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M9 15l2 2 4-4" />
                </svg>
                <p className="text-sm font-semibold text-text">Underwriting Report</p>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Aggregate risk metrics for your carrier to price the policy.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Deployment options + metrics ── */}
      <div className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {/* Deployment paths */}
            <div className="grid gap-px md:grid-cols-2 rounded-2xl border border-border overflow-hidden bg-border">
              <div className="bg-white p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-dim">On-prem</p>
                <h4 className="mt-3 text-lg font-semibold text-text">Run on your infrastructure</h4>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Single compiled Rust binary. Logs to local SQLite. Dashboard on your internal network. Designed for regulated and air-gapped environments.
                </p>
              </div>
              <div className="bg-white p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-dim">Managed</p>
                <h4 className="mt-3 text-lg font-semibold text-text">Run in the cloud</h4>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Hosted proxy fleet with telemetry pipeline and dashboards. Point your agents at our endpoint. Both options produce identical telemetry and reports.
                </p>
              </div>
            </div>

            {/* Performance metrics */}
            <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "<10ms", label: "Added latency", detail: "Compiled heuristics, no LLM in the hot path" },
                { value: "35+", label: "Frameworks supported", detail: "LangChain, CrewAI, AutoGen, Semantic Kernel, and more" },
                { value: "PIPEDA", label: "Compliance ready", detail: "On-prem data residency, PII redaction, append-only audit" },
                { value: "Minutes", label: "Time to deploy", detail: "Single binary, one config change" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-extrabold gradient-text">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-text-secondary">{stat.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-text-dim">{stat.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
