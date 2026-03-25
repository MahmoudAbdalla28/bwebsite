"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import lockData from "../../public/assets/lottie/security-lock.json";

const scenarios = [
  {
    situation: "Four production agents running 24/7. Board meeting in two weeks. Nobody can answer the question: what did the AI actually do last quarter?",
    outcome: "Full audit trail. Every API call, tool invocation, and PII detection, timestamped and categorized. Aggregated into a five-minute board read.",
    before: "4 agents · 12,000+ actions · 0 records",
    after: "4 agents · 12,247 actions · 100% logged",
  },
  {
    situation: "Pilot program approved, budget allocated. Legal sends back a 47-page risk assessment asking for controls that don't exist yet.",
    outcome: "Continuous monitoring with configurable enforcement. PII never leaves the network. Every metric Legal asked for, generated automatically from real operational data.",
    before: "47 requirements · 0 controls · blocked",
    after: "47 requirements · 47 controls · cleared",
  },
  {
    situation: "An AI agent just processed customer health records. You find out three days later from a Slack thread. The carrier wants to know your exposure.",
    outcome: "PII detected and redacted at the network layer before it reaches the LLM. Real-time alerts. The carrier got the report before you got the Slack message.",
    before: "PII exposure unknown · 72hr discovery",
    after: "PII detected <1ms · redacted in-flight · 0%",
  },
];

export default function BuyerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-primary">Solutions</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
                From blind spot to full visibility
              </h2>
            </motion.div>

            <div className="mt-12 space-y-6">
              {scenarios.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="rounded-2xl border border-border bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
                >
                  <p className="text-base leading-relaxed text-text-secondary italic">
                    &ldquo;{s.situation}&rdquo;
                  </p>

                  <div className="mt-4 h-px bg-border" />

                  <p className="mt-4 text-base leading-relaxed text-text">
                    {s.outcome}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-red-bg px-4 py-2.5 font-mono text-xs text-red">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-red block mb-1">Before</span>
                      {s.before}
                    </div>
                    <div className="rounded-lg bg-primary-bg px-4 py-2.5 font-mono text-xs text-primary-dark">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-primary block mb-1">With Bastion</span>
                      {s.after}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side Lottie */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:block sticky top-32 w-64"
          >
            <Lottie animationData={lockData} loop className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
