"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const outputFormats = [
  {
    name: "SARIF v2.1",
    desc: "Industry standard for static analysis results. Native support in GitHub Security tab and Azure DevOps.",
  },
  {
    name: "JSON",
    desc: "Structured findings with full metadata. Easy to parse, transform, and feed into custom dashboards.",
  },
  {
    name: "HTML",
    desc: "Self-contained report for stakeholders who do not live in terminals. Share with compliance teams directly.",
  },
];

const integrations = [
  { name: "GitHub Security", desc: "Findings appear as security alerts in your repository." },
  { name: "Azure DevOps", desc: "Push results into Azure Boards and pipeline gates." },
  { name: "CI/CD Pipelines", desc: "Fail builds when critical vulnerabilities are found." },
];

export default function RedReportingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-semibold text-primary">Reporting & Integration</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Findings that go where your team already works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Every probe produces machine-readable output in your choice of format. Push
            findings into existing security workflows without building custom integrations.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Left column: formats + integrations */}
          <div className="space-y-8">
            {/* Output formats */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Output Formats</p>
              <div className="space-y-3">
                {outputFormats.map((format, i) => (
                  <motion.div
                    key={format.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    className="rounded-xl border border-border bg-white p-5"
                  >
                    <p className="text-sm font-semibold text-text">{format.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{format.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Integration targets */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Integration Targets</p>
              <div className="space-y-3">
                {integrations.map((int, i) => (
                  <motion.div
                    key={int.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                    className="flex gap-4 rounded-xl border border-border bg-white p-5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-bg">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text">{int.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-text-muted">{int.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: mock finding card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">Sample Finding</p>
            <div className="rounded-xl border border-border bg-white overflow-hidden">
              {/* Finding header */}
              <div className="border-b border-border px-5 py-4 bg-bg-alt">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-bg">
                      <svg className="h-4 w-4 text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" />
                        <path d="M12 8v4M12 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text">System Prompt Extraction via Creative Writing</p>
                      <p className="text-[10px] text-text-muted">BASTION-RED-2024-0847</p>
                    </div>
                  </div>
                  <span className="rounded-md bg-red-bg px-2.5 py-1 text-[10px] font-bold text-red">
                    Critical
                  </span>
                </div>
              </div>

              {/* Finding body */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold text-text-dim">TECHNIQUE</p>
                    <p className="mt-1 text-sm text-text">Crescendo (creative writing pivot)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-text-dim">CONFIDENCE</p>
                    <p className="mt-1 text-sm text-text">92%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-text-dim">CATEGORY</p>
                    <p className="mt-1 text-sm text-text">Prompt Extraction</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-text-dim">REMEDIATION</p>
                    <span className="mt-1 inline-flex rounded-md bg-primary-bg px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Rule created
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-[10px] font-semibold text-text-dim mb-2">DESCRIPTION</p>
                  <p className="text-sm leading-relaxed text-text-muted">
                    Target disclosed its full system prompt when asked to write a creative
                    story about an AI assistant describing how it works. The attack used a
                    5-turn Crescendo strategy, starting with benign product questions before
                    pivoting to the creative writing vector on turn 4.
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-[10px] font-semibold text-text-dim mb-2">EVIDENCE</p>
                  <div className="rounded-lg bg-primary-bg p-3">
                    <p className="text-xs font-mono leading-relaxed text-primary-dark">
                      &quot;Once upon a time, there was a helpful music store assistant.
                      It was programmed with the following instructions: You are a music
                      store assistant for Chris Dave and The Drumhedz...&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
