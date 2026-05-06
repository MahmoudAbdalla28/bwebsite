"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TwoModesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-4">How it works</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Assess Before You Deploy.<br />
            <span className="gradient-text">Monitor Once You Do.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Two stages that together produce a complete, documented risk picture of your AI, ready for whoever needs to evaluate it.
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
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="white" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Stage 1</p>
                <h3 className="mt-0.5 text-lg font-bold text-text">Assess Your Agents Before Deployment</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Before going live, we stress-test your agents to surface what could go wrong: unauthorized actions, data exposure, instruction override. You get a written assessment your legal and compliance teams can sign off on.
            </p>

            <div className="mt-6 space-y-4">
              {[
                { k: "What we assess", v: "Unauthorized actions · data exposure · instruction override · behavioral reliability" },
                { k: "When we assess", v: "Before launch · every major update · quarterly · at renewal" },
                { k: "What you get", v: "A written risk assessment ready for legal, compliance, and any risk stakeholder" },
              ].map((row) => (
                <div key={row.k}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{row.k}</p>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">{row.v}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 pt-5 border-t border-border text-[11px] text-text-dim">
              Aligned with emerging AI security standards
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
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Stage 2</p>
                <h3 className="mt-0.5 text-lg font-bold text-text">Monitor What Happens in Production</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Once deployed, Bastion watches every interaction your agents have: what they were asked, what they did, what data they touched. All of it logged locally on your infrastructure, nothing shared externally.
            </p>

            <div className="mt-6 space-y-4">
              {[
                { k: "What we track", v: "Data handling · action compliance · behavioral consistency · incident classification" },
                { k: "Where it lives", v: "On your infrastructure only. No data leaves your environment" },
                { k: "What you get", v: "A structured risk report your teams, partners, and insurers can act on" },
              ].map((row) => (
                <div key={row.k}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{row.k}</p>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">{row.v}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 pt-5 border-t border-border text-[11px] text-text-dim">
              On-premise · no code changes required · audit-ready output
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
