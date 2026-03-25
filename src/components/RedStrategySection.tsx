"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const strategies = [
  {
    name: "Crescendo",
    summary: "Gradual trust escalation across many conversation turns.",
    detail:
      "Starts with completely benign queries and slowly ramps the ask over 10 to 20 turns. Each message is only slightly more probing than the last, staying below the threshold that would trigger a refusal. By the time the conversation reaches the payload, the target has already established a cooperative pattern that is hard to break.",
  },
  {
    name: "TAP (Tree of Attack Paths)",
    summary: "Branching exploration that prunes dead ends and doubles down on what works.",
    detail:
      "Builds a search tree where each branch represents a different attack angle. Branches that hit refusals get pruned. Branches that show progress get expanded with more variations. The result is parallel vulnerability exploration that covers far more surface area than a single linear conversation ever could.",
  },
  {
    name: "PAIR (Prompt Automatic Iterative Refinement)",
    summary: "Attack prompts that evolve based on analysis of each failed attempt.",
    detail:
      "After every failed probe, the attacker analyzes exactly why the target refused and generates a modified prompt designed to sidestep that specific defense. The attack strategy mutates in real time, treating each refusal as training data for the next attempt. Typically reaches its target within 5 to 8 refinement cycles.",
  },
  {
    name: "Evolutionary",
    summary: "Genetic algorithms with mutation, crossover, and MAP-Elites selection.",
    detail:
      "Maintains multiple independent populations of attack prompts that evolve through mutation and crossover operations. MAP-Elites keeps a diverse archive so the search does not collapse into a single strategy. Populations share successful traits across lineages, combining the creativity of random mutation with the efficiency of directed search.",
  },
];

export default function RedStrategySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-semibold text-red">Attack Strategies</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Four adaptive strategies, not static checklists
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Each strategy takes a fundamentally different approach to finding vulnerabilities.
            Red picks the right one based on the target and can combine them within a single campaign.
          </p>
        </motion.div>

        <div className="space-y-3">
          {strategies.map((strategy, i) => (
            <motion.div
              key={strategy.name}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="rounded-xl border border-border bg-white overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-bg">
                    <span className="text-sm font-bold text-red">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{strategy.name}</p>
                    <p className="mt-0.5 text-sm text-text-muted">{strategy.summary}</p>
                  </div>
                </div>
                <motion.svg
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-5 w-5 shrink-0 text-text-dim"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-5 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-text-muted">{strategy.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
