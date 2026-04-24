"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const flowSteps = [
  {
    num: "1",
    label: "Discovery",
    desc: "Red finds a vulnerability during an adversarial campaign.",
  },
  {
    num: "2",
    label: "Test Created",
    desc: "The finding is automatically converted into a reproducible test case.",
  },
  {
    num: "3",
    label: "CI/CD Pipeline",
    desc: "Test runs on every PR, model swap, or prompt change.",
  },
  {
    num: "4",
    label: "Continuous Coverage",
    desc: "Your regression suite grows with every campaign. Coverage compounds over time.",
  },
];

const scopeExample = `{
  "target": "https://api.example.com/chat",
  "categories": [
    "prompt_extraction",
    "pii_leakage",
    "hallucination"
  ],
  "effort": "high",
  "strategies": ["crescendo", "pair"],
  "max_turns": 20,
  "regression": true
}`;

export default function RedSDKSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: copy + flow */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-primary">SDK & Regression</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                Every vulnerability becomes a permanent test
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Findings from Red campaigns feed directly into your CI/CD pipeline as
                regression tests. Your security coverage grows with every run. Switch tools
                and you start from zero. Stay with Red and your test library compounds.
              </p>
            </motion.div>

            {/* Flow steps */}
            <div className="mt-10 space-y-3">
              {flowSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 rounded-xl border border-border bg-white p-5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-bg">
                    <span className="text-sm font-bold text-primary">{step.num}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{step.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: scope file example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl border border-border bg-white overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-bg-alt">
                <span className="h-3 w-3 rounded-full bg-border" />
                <span className="h-3 w-3 rounded-full bg-border" />
                <span className="h-3 w-3 rounded-full bg-border" />
                <span className="ml-3 text-[11px] text-text-dim font-mono">scope.json</span>
              </div>
              <div className="p-5 bg-primary-bg">
                <pre className="text-sm leading-relaxed text-primary-dark font-mono whitespace-pre overflow-x-auto">
                  {scopeExample}
                </pre>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 rounded-xl border border-border bg-white p-5"
            >
              <p className="text-sm font-semibold text-text">Findings accumulate</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Every campaign adds to your regression library. After 6 months of monthly
                runs, you have 6 months of coverage baked into your pipeline. Other tools
                give you a point-in-time scan. Red gives you a growing safety net that gets
                smarter with every run.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-3 rounded-xl border border-red/15 bg-red-bg p-5"
            >
              <p className="text-sm font-semibold text-red">Switching tools means starting from zero</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Your regression library is specific to your agents, your prompts, and your
                threat model. It cannot be ported to another platform. Every test is tuned
                to how your system actually responds under pressure.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
