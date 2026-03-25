"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function DeploymentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <p className="text-sm font-semibold text-primary">Deployment</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            One environment variable
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary">
            Works with anything that makes HTTP calls to an LLM provider.
            No SDK, no code changes, no dependencies.
          </p>
        </motion.div>

        {/* Code examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {[
            { framework: "OpenAI SDK", code: "OPENAI_API_BASE=http://bastion:8443" },
            { framework: "Anthropic SDK", code: "ANTHROPIC_BASE_URL=http://bastion:8443" },
            { framework: "LangChain", code: 'base_url="http://bastion:8443"' },
          ].map((ex, i) => (
            <motion.div
              key={ex.framework}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="rounded-xl border border-border bg-white p-5"
            >
              <p className="text-xs font-semibold text-text-dim">{ex.framework}</p>
              <pre className="mt-3 rounded-lg bg-primary-bg p-4 text-xs text-primary-dark font-mono overflow-x-auto">
                {ex.code}
              </pre>
            </motion.div>
          ))}
        </motion.div>

        {/* Deployment options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-bg">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="2" y="3" width="20" height="18" rx="3" />
                  <path d="M7 8h10M7 12h6" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-text">Local</p>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Single binary on your infrastructure. Data never leaves your network.
              Logs to local SQLite, dashboard on your internal network. Only thing
              that exits is the sanitized underwriting report.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-bg">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 14c0 4 4 6 8 6s8-2 8-6" />
                  <ellipse cx="12" cy="8" rx="8" ry="4" />
                  <path d="M4 8v6M20 8v6" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-text">Cloud</p>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Hosted proxy fleet, telemetry pipeline, and dashboards. Point your
              agents at our endpoint. Per API call or per agent per month. Both
              models produce identical telemetry.
            </p>
          </div>
        </motion.div>

        {/* Latency + compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid gap-4 sm:grid-cols-3"
        >
          {[
            { label: "Added latency", value: "<10ms", detail: "All compiled regex and heuristics, no LLM inference in the hot path" },
            { label: "Frameworks", value: "All of them", detail: "LangChain, CrewAI, AutoGen, Semantic Kernel, custom agents, direct SDK" },
            { label: "Fail mode", value: "Configurable", detail: "Fail closed for regulated environments, fail open when availability matters more" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-white p-5">
              <p className="text-xs font-semibold text-text-dim">{item.label}</p>
              <p className="mt-1 text-lg font-bold text-primary">{item.value}</p>
              <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
