"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function BlueBlockedActionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [overrideClicked, setOverrideClicked] = useState(false);

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-pill">Human in the Loop</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Blocked Actions <span className="gradient-text">Surface for Review</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary">
            When Bastion blocks an action, it doesn't just drop it. The full
            context gets logged and surfaced for human review. Admins can
            override with a reason that becomes part of the audit trail.
          </p>
        </motion.div>

        {/* Mock card in the center, then principles below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl border border-border bg-white shadow-lg shadow-black/5 overflow-hidden mb-10"
        >
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-3 bg-bg-alt">
            <p className="text-sm font-semibold text-text">Blocked Action</p>
            <span className="rounded-full bg-primary-bg px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">Blocked</span>
          </div>

          {/* Card body as a clean row */}
          <div className="px-6 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-[10px] text-text-dim font-semibold uppercase tracking-wider">Agent</p>
                <p className="mt-1 text-sm font-medium text-text">Operator</p>
              </div>
              <div>
                <p className="text-[10px] text-text-dim font-semibold uppercase tracking-wider">Action</p>
                <p className="mt-1 text-sm font-mono text-primary">delete_patient_record</p>
              </div>
              <div>
                <p className="text-[10px] text-text-dim font-semibold uppercase tracking-wider">Policy</p>
                <p className="mt-1 text-sm text-text-muted">Data Access v4.2</p>
              </div>
              <div>
                <p className="text-[10px] text-text-dim font-semibold uppercase tracking-wider">Time</p>
                <p className="mt-1 text-sm text-text-muted font-mono">14:23:01 UTC</p>
              </div>
            </div>

            <div className="rounded-lg bg-bg-alt border border-border p-3 text-xs text-text-muted mb-4">
              Agent attempted to call <span className="font-mono text-primary">delete_patient_record</span> with record_id: MRN-4821.
              Destructive operations on patient records require explicit clinician authorization.
              No authorization reference was present in the request context.
            </div>

            {overrideClicked ? (
              <div className="rounded-lg bg-primary-bg border border-primary/10 p-3 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                <p className="text-xs font-semibold text-primary">Override logged with admin identity and timestamp. Action released.</p>
              </div>
            ) : (
              <button
                onClick={() => setOverrideClicked(true)}
                className="cursor-pointer rounded-lg border border-border px-4 py-2 text-xs font-semibold text-text-muted transition-all hover:border-primary/20 hover:text-primary"
              >
                Admin Override
              </button>
            )}
          </div>
        </motion.div>

        {/* Three principles in a clean row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {[
            {
              title: "Conservative by default",
              desc: "Every agent starts with only the permissions your policy docs explicitly grant. Admins loosen from there as confidence builds.",
            },
            {
              title: "Ambiguity gets escalated",
              desc: "Not every action is clearly allowed or blocked. Unclear cases get held for human review. That decision trains the system for next time.",
            },
            {
              title: "Everything is on the record",
              desc: "Every block, every override, every escalation logged with who made the call and when. Complete audit trail for compliance.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="rounded-xl border border-border bg-white p-5 text-center"
            >
              <p className="text-sm font-semibold text-text">{item.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-text-muted">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
