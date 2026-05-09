"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Step {
  number: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Who Buys",
    body: "Enterprises running AI agents in production. Security and platform engineering own the deploy; risk and compliance often hold the budget because of the insurance angle.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V8a2 2 0 012-2h4V3h6v3h4a2 2 0 012 2v13" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "30-Day Baseline",
    body: "Deploy as a reverse proxy in observe mode. Passive telemetry, sub-millisecond overhead. Bastion learns the traffic and maps risk against real behavior.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Underwriting Handoff",
    body: "Posture report goes to the carrier. They price the policy against real fleet data instead of a self-attested questionnaire.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
        <path d="M14 3v6h6" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Production Enforcement",
    body: "Tier 1 controls flip on: PII redaction, tool allow/blocklists, all tuned to what the baseline surfaced.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Continuous Posture",
    body: "Telemetry keeps flowing through the policy term. Renewals priced on live risk, not stale snapshots.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 11-3-6.7" />
        <path d="M21 4v5h-5" />
      </svg>
    ),
  },
];

export default function HowWeEngageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-surface border-t border-border-light" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
            Engagement Model
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-5xl">
            How We <span className="gradient-text">Engage</span>
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary max-w-3xl mx-auto">
            Sold to the enterprise running the agents. Aligned with the carrier underwriting the risk. One deployment, two beneficiaries.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 relative">
          {/* Horizontal connector line on desktop */}
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-surface border-2 border-primary shadow-sm">
                  <span className="text-sm font-bold text-primary">{step.number}</span>
                </div>

                {/* Card */}
                <div className="mt-6 rounded-sm border border-border bg-bg p-6 w-full h-full">
                  <div className="flex items-center justify-center h-10 w-10 rounded-sm bg-primary-bg text-primary mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-base font-bold text-text mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
