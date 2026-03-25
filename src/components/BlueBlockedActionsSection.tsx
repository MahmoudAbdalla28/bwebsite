"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const blockedAction = {
  timestamp: "2025-03-21 14:23:01 UTC",
  agent: "Operator",
  agentId: "agent-op-7f3a",
  action: "delete_patient_record",
  policyRule: "Data Access Policy v4.2, Section 7.3",
  constraint: "Destructive operations on patient records require explicit clinician authorization",
  context: "Agent attempted to call delete_patient_record with record_id: MRN-4821. No authorization reference was present in the request context.",
  status: "blocked",
};

export default function BlueBlockedActionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [overrideClicked, setOverrideClicked] = useState(false);

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: mock blocked action card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-border bg-white shadow-xl shadow-black/5 overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-bg">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-red" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text">Blocked Action</p>
                    <p className="text-[10px] text-text-dim font-mono">{blockedAction.timestamp}</p>
                  </div>
                </div>
                <span className="rounded-full bg-red-bg px-3 py-1 text-[10px] font-semibold text-red uppercase tracking-wider">
                  Blocked
                </span>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">Agent</p>
                    <p className="mt-1 text-sm font-medium text-text">{blockedAction.agent}</p>
                    <p className="text-[10px] text-text-dim font-mono">{blockedAction.agentId}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">Action</p>
                    <p className="mt-1 text-sm font-mono text-red">{blockedAction.action}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-dim">Policy Rule</p>
                  <p className="mt-1 text-sm text-text-muted">{blockedAction.policyRule}</p>
                  <p className="mt-1 text-xs text-text-dim">{blockedAction.constraint}</p>
                </div>

                <div className="rounded-lg bg-bg-alt border border-border p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-text-dim mb-2">Context</p>
                  <p className="text-xs leading-relaxed text-text-muted">{blockedAction.context}</p>
                </div>

                {/* Admin override */}
                <div className="border-t border-border pt-4">
                  {overrideClicked ? (
                    <div className="rounded-lg bg-primary-bg border border-primary/10 p-4">
                      <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <p className="text-sm font-semibold text-primary">Override logged</p>
                      </div>
                      <p className="mt-1 text-xs text-text-muted">Override recorded with admin identity and timestamp. Action released to agent.</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-muted">Authorized personnel can override with a logged reason</p>
                      <button
                        onClick={() => setOverrideClicked(true)}
                        className="cursor-pointer rounded-lg border border-border bg-white px-4 py-2 text-xs font-semibold text-text transition-all hover:border-primary/20 hover:bg-primary-bg hover:text-primary"
                      >
                        Admin Override
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: narrative */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-primary">Human in the Loop</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Blocked actions surface for review, not silence
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                When Blue blocks an action, it does not just drop it. The action is logged with full context and surfaced to the right person for review. Admins can override with a reason that becomes part of the audit trail.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 space-y-4"
            >
              <div className="rounded-xl border border-border bg-white p-5">
                <p className="text-sm font-semibold text-text">Conservative baselines</p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  Blue starts locked down based on your own policy documents. Each agent begins with only the permissions explicitly granted by your policies. Admins loosen constraints from there as they build confidence in each agent's behavior.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-white p-5">
                <p className="text-sm font-semibold text-text">Ambiguity gets escalated</p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  Not every action is clearly allowed or clearly blocked. When Blue encounters an ambiguous case, it holds the action and surfaces it for human review. The human decision then trains the system for next time.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-white p-5">
                <p className="text-sm font-semibold text-text">Full audit trail</p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  Every block, override, and escalation is logged with who, when, and why. Your compliance team gets a complete record of every decision, human or automated.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
