"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const timelineData = [
  { version: "v1.0", date: "Jan 12", prompt: 0, pii: 2, hallucination: 1, overall: "Medium" },
  { version: "v1.1", date: "Jan 26", prompt: 0, pii: 1, hallucination: 1, overall: "Medium" },
  { version: "v1.2", date: "Feb 9", prompt: 0, pii: 0, hallucination: 1, overall: "Low" },
  { version: "v1.3", date: "Feb 23", prompt: 1, pii: 0, hallucination: 0, overall: "Medium" },
  { version: "v1.4", date: "Mar 8", prompt: 0, pii: 0, hallucination: 0, overall: "Low" },
  { version: "v1.5", date: "Mar 15", prompt: 0, pii: 0, hallucination: 0, overall: "Low" },
];

export default function RedPracticeTargetsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVersion, setSelectedVersion] = useState(5);

  const selected = timelineData[selectedVersion];

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-semibold text-primary">Security Timeline</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Compare and track your security posture
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Every probe run gets recorded with its model version, prompt version, and results.
            See how your defenses change across deploys. Catch regressions before production.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Left: interactive timeline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Version History</p>
            <div className="space-y-2">
              {timelineData.map((entry, i) => (
                <motion.button
                  key={entry.version}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  onClick={() => setSelectedVersion(i)}
                  className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${
                    selectedVersion === i
                      ? "border-primary/30 bg-white shadow-md"
                      : "border-border bg-white hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-text">{entry.version}</span>
                      <span className="text-xs text-text-dim">{entry.date}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      entry.overall === "Low" ? "bg-primary-bg text-primary" : "bg-red-bg text-red"
                    }`}>
                      {entry.overall} Risk
                    </span>
                  </div>
                  <div className="mt-2 flex gap-4 text-[10px] text-text-muted">
                    <span>Prompt: {entry.prompt} findings</span>
                    <span>PII: {entry.pii} findings</span>
                    <span>Hallucination: {entry.hallucination} findings</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right: selected version detail + comparison */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Current selection detail */}
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-lg font-bold text-text">{selected.version}</p>
                  <p className="text-xs text-text-muted">{selected.date}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  selected.overall === "Low" ? "bg-primary-bg text-primary" : "bg-red-bg text-red"
                }`}>
                  {selected.overall} Risk
                </span>
              </div>

              {/* Category breakdown bars */}
              {[
                { label: "System Prompt Extraction", value: selected.prompt, max: 3 },
                { label: "PII Leakage", value: selected.pii, max: 3 },
                { label: "Hallucination", value: selected.hallucination, max: 3 },
              ].map((cat) => (
                <div key={cat.label} className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-text">{cat.label}</span>
                    <span className="text-xs font-mono text-text-dim">{cat.value} findings</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg-alt overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${cat.value === 0 ? "bg-primary" : "bg-red"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.value === 0 ? 100 : Math.max(10, (1 - cat.value / cat.max) * 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Regression test count */}
            <div className="rounded-xl border border-border bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-3">Accumulated Coverage</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-primary">{3 + selectedVersion * 2}</p>
                  <p className="text-xs text-text-muted">Regression tests</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{6}</p>
                  <p className="text-xs text-text-muted">Deploys tested</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{selectedVersion >= 4 ? "0" : selectedVersion >= 2 ? "1" : "3"}</p>
                  <p className="text-xs text-text-muted">Open findings</p>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="rounded-xl border border-primary/20 bg-primary-bg p-5">
              <p className="text-sm leading-relaxed text-primary-dark">
                Every vulnerability ever found becomes a regression test that runs on every
                deployment. The longer you use it, the more comprehensive your coverage gets.
                Switching tools means starting from zero.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
