"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const checkPipeline = [
  {
    name: "PII Detection",
    desc: "Compiled regex for SSNs, credit cards, emails, phones, health IDs. Pure deterministic matching, zero latency. In enforce mode, redacts before forwarding.",
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
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left column */}
          <div>
            {/* Architecture highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              {[
                { label: "Single Rust binary", detail: "No Python, no pip, no containers. Memory safe, async on tokio." },
                { label: "One config change", detail: "Swap your LLM base URL. Works with OpenAI, Anthropic, Groq, local models." },
                { label: "Two modes", detail: "Monitor mode logs everything silently. Enforce mode actively blocks and redacts." },
                { label: "Two ports", detail: "Primary for proxied LLM traffic. Secondary for dashboard API on internal network." },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="rounded-xl border border-border bg-white p-4"
                >
                  <p className="text-sm font-semibold text-text">{item.label}</p>
                  <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-bg p-2.5">
                  <svg viewBox="1 0 22 26" className="h-full w-full" fill="none" stroke="#0D6EFD" strokeWidth="1.5">
                    <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" strokeLinecap="round" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-primary">Bastion Blue</p>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                Defend every agent in production
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Reverse proxy between your agents and their LLM providers. Every request
                and response flows through a check pipeline, gets logged to local SQLite,
                and feeds into carrier-grade telemetry. The telematics box for AI liability.
              </p>
            </motion.div>

            {/* Check pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Check Pipeline</p>

              {/* Pipeline tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {checkPipeline.map((check, i) => (
                  <button
                    key={check.name}
                    onClick={() => setActiveCheck(i)}
                    className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                      activeCheck === i
                        ? "bg-primary-bg text-primary border border-primary/20"
                        : "bg-white border border-border text-text-muted hover:border-primary/20"
                    }`}
                  >
                    {check.name}
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
                <div className="mt-4 rounded-lg bg-primary-bg px-3 py-2 inline-block">
                  <span className="text-xs font-medium text-primary">Feeds: {checkPipeline[activeCheck].metric}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Fleet monitoring callout */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 rounded-xl border border-primary/20 bg-primary-bg p-6"
            >
              <p className="text-sm font-semibold text-text">Fleet-wide correlation</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Blue monitors the whole fleet, not just individual agents. If one agent starts calling tools
                no other agent has ever used, that signal is much stronger than individual baseline deviation.
                A compromised agent that looks normal in isolation but diverges from fleet behavior gets flagged and blocked.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
