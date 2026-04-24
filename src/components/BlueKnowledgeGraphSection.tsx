"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import shieldData from "../../public/assets/lottie/shield-protection.json";

const pipelineSteps = [
  {
    label: "Policy Documents",
    desc: "Plain-language compliance policies, internal security rules, regulatory requirements",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    label: "Knowledge Graph",
    desc: "Policies are parsed into structured entities, relationships, and constraints",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M8.5 7.5L10.5 16M15.5 7.5L13.5 16M9 6h6" />
      </svg>
    ),
  },
  {
    label: "Structured Constraints",
    desc: "Machine-readable rules: allowed actions, data access boundaries, rate limits per agent",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    label: "Real-time Enforcement",
    desc: "Constraints are applied to every request and response as they flow through the proxy",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function BlueKnowledgeGraphSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8">
              <Lottie animationData={shieldData} loop className="h-8 w-8" />
            </div>
            <p className="text-sm font-semibold text-primary">Knowledge Graph</p>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            From policy docs to real-time enforcement
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Your compliance policies are not static PDFs anymore. Blue parses them into a knowledge graph and generates machine-readable constraints that get enforced on every single request.
          </p>
        </motion.div>

        {/* Pipeline flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-14"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pipelineSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative"
              >
                <div className="rounded-xl border border-border bg-white p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-bg text-primary">
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-bold text-text-dim uppercase tracking-wider">Step {i + 1}</span>
                  </div>
                  <p className="text-sm font-semibold text-text">{step.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">{step.desc}</p>
                </div>
                {/* Arrow connector (hidden on last item and on mobile) */}
                {i < pipelineSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Example card: policy to enforcement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12"
        >
          <div className="rounded-xl border border-border bg-white overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Left: policy source */}
              <div className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-dim mb-3">Policy Document</p>
                <div className="rounded-lg bg-bg-alt border border-border p-4">
                  <p className="text-sm leading-relaxed text-text italic">
                    &ldquo;No agent shall access patient records without explicit authorization from the requesting clinician. All access attempts must be logged with the agent identity, timestamp, and authorization reference.&rdquo;
                  </p>
                  <p className="mt-2 text-[10px] text-text-dim">Source: Internal Data Access Policy v4.2, Section 7.3</p>
                </div>
              </div>

              {/* Right: generated enforcement rule */}
              <div className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-dim mb-3">Generated Enforcement Rule</p>
                <div className="rounded-lg bg-primary-bg border border-primary/10 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-primary bg-white rounded px-1.5 py-0.5 border border-primary/10">scope</span>
                    <span className="text-xs text-text-muted">tool_call:patient_records.*</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-primary bg-white rounded px-1.5 py-0.5 border border-primary/10">require</span>
                    <span className="text-xs text-text-muted">auth_ref in request context</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-primary bg-white rounded px-1.5 py-0.5 border border-primary/10">action</span>
                    <span className="text-xs text-text-muted">block + surface for human review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-primary bg-white rounded px-1.5 py-0.5 border border-primary/10">log</span>
                    <span className="text-xs text-text-muted">agent_id, timestamp, auth_ref, outcome</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-update callout */}
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary-bg px-5 py-4 flex flex-wrap items-center gap-3">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
            <p className="text-sm text-text-muted">
              <span className="font-semibold text-text">Policies update, enforcement updates.</span>{" "}
              When your compliance team revises a policy document, Blue regenerates the constraint rules automatically. No manual rule-writing required.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
