"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const scenarios = [
  {
    question: "A client asked if their AI agents are covered and we had no answer",
    answer: "Bastion generates the risk telemetry your carrier needs to actually price AI liability. 30 days of monitoring, one structured report. You deliver the answer.",
  },
  {
    question: "We want to offer AI coverage but carriers won't underwrite without data",
    answer: "That's the gap Bastion fills. Deploy on your client's infrastructure, generate carrier-grade telemetry, and bring the underwriter a report they can work with.",
  },
  {
    question: "We have agents in production but no one can tell the board what they actually did last quarter",
    answer: "Bastion logs every API call, tool invocation, and PII detection across your fleet. Timestamped, categorized, and aggregated into a report the board reads in five minutes.",
  },
  {
    question: "Legal sent back a 47-page risk assessment asking for controls we don't have",
    answer: "Continuous monitoring with configurable enforcement. PII never leaves the network. Every metric Legal asked for, generated automatically from real operational data.",
  },
  {
    question: "An AI agent processed customer health records and we found out three days later from Slack",
    answer: "PII is detected and redacted at the network layer before it reaches the LLM. Real-time alerts. Your carrier gets the report before you get the Slack message.",
  },
  {
    question: "Our carrier dropped AI from our coverage after the ISO CG 40 47 endorsement",
    answer: "Bastion generates the quantified risk telemetry your carrier needs to actually underwrite AI liability instead of just saying no. 30 days of monitoring, one structured report.",
  },
];

export default function BuyerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="solutions" className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary">Common scenarios</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Sound familiar?
          </h2>
        </motion.div>

        <div className="space-y-3">
          {scenarios.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="rounded-xl border border-border bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full cursor-pointer items-start justify-between px-6 py-5 text-left gap-4"
              >
                <span className="text-sm font-semibold text-text leading-relaxed">{s.question}</span>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-4 w-4 shrink-0 mt-0.5 text-text-dim transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 pb-5"
                >
                  <p className="text-sm leading-relaxed text-text-muted">{s.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
