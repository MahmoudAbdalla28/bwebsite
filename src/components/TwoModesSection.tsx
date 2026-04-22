"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TwoModesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="label-pill">Two Modes</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Pre-bind stress testing.<br />
            <span className="gradient-text">Post-bind runtime telemetry.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Two modes sharing a signal stack. One attested file any carrier
            panel can consume.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Assessment card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border-2 border-primary bg-white p-8 shadow-md shadow-primary/10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-primary-bg flex items-center justify-center">
                {/* Target / probe icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="#0D6EFD" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Assessment</p>
                <h3 className="mt-0.5 text-lg font-bold text-text">Pre-bind adversarial testing</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Adversarial engagements run across the underwriting cycle. Baseline,
              quarterly passes, renewal window, and a pass on every model, prompt,
              corpus, or tool change. Our offensive team extends the attack
              library against every deployment we see.
            </p>

            <div className="mt-6 space-y-4">
              {[
                { k: "Coverage", v: "Prompt injection · tool-chain composition · data exfiltration · jailbreaks" },
                { k: "Methods", v: "Crescendo · TAP · PAIR · Evolutionary · PyRIT / Garak" },
                { k: "Cadence", v: "Baseline · quarterly · renewal · change-triggered" },
              ].map((row) => (
                <div key={row.k}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-text-dim">{row.k}</p>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">{row.v}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 pt-5 border-t border-border text-[11px] text-text-dim">
              OWASP ASI-aligned · MAESTRO-intersection coverage
            </p>
          </motion.div>

          {/* Telemetry / KG framework card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-2xl border-2 border-primary bg-white p-8 shadow-md shadow-primary/10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                {/* KG / constellation icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="6" cy="6" r="2" fill="white" />
                  <circle cx="18" cy="6" r="2" fill="white" />
                  <circle cx="12" cy="14" r="2" fill="white" />
                  <circle cx="6" cy="20" r="2" fill="white" />
                  <circle cx="18" cy="20" r="2" fill="white" />
                  <path d="M6 6L12 14M18 6L12 14M12 14L6 20M12 14L18 20" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Telemetry · Our Moat</p>
                <h3 className="mt-0.5 text-lg font-bold text-text">Post-bind behavioral telemetry</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              The methods we use are published. The difficult artifact is the
              knowledge graph framework that turns a carrier&apos;s systems of
              record into an attestation surface. That&apos;s the load-bearing
              piece — and the work.
            </p>

            <div className="mt-6 space-y-4">
              {[
                { k: "Groundedness", v: "KG entailment · FActScore-style" },
                { k: "Authorization", v: "Hoare-triple composition" },
                { k: "Drift", v: "Online Kernel CUSUM" },
              ].map((row) => (
                <div key={row.k}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{row.k}</p>
                  <p className="mt-1 text-xs text-text-muted font-mono leading-relaxed">{row.v}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 pt-5 border-t border-border text-[11px] text-text-dim">
              On-premise · sub-10ms overhead · tamper-evident log
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
