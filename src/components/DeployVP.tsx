"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const snippets = [
  { label: "OpenAI", env: "OPENAI_API_BASE", val: "http://bastion:8443" },
  { label: "Anthropic", env: "ANTHROPIC_BASE_URL", val: "http://bastion:8443" },
  { label: "LangChain", env: "base_url", val: '"http://bastion:8443"' },
];

export default function DeployVP() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt border-y border-border-light" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-4">Deployment</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">
              Up and running in minutes.<br />
              <span className="gradient-text">Governing in days.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Deploy across your entire AI fleet without rebuilding a single agent. One environment variable. No code changes. Full visibility from day one.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "No agent rebuilds or SDK changes",
                "Works with every major model provider",
                "On-premise — nothing leaves your infrastructure",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-primary" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-text-muted">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — code snippets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-3"
          >
            {snippets.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="rounded-sm border border-border bg-surface p-5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-dim mb-3">{s.label}</p>
                <p className="font-mono text-xs text-text-secondary">{s.env}<span className="text-text-dim">=</span></p>
                <p className="font-mono text-xs text-primary mt-0.5">{s.val}</p>
              </motion.div>
            ))}
            <p className="text-xs text-text-dim text-center pt-1">One variable. Every agent covered.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
