"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const agents = [
  {
    name: "Customer Support",
    role: "Handles ticket routing and customer queries via chat",
    tools: ["search_kb", "create_ticket", "send_email"],
    status: "normal",
    requests: "2,841/day",
  },
  {
    name: "Sales Automation",
    role: "Generates proposals and follows up with prospects",
    tools: ["query_crm", "draft_email", "schedule_meeting"],
    status: "normal",
    requests: "1,203/day",
  },
  {
    name: "Data Pipeline",
    role: "Summarizes reports and extracts structured data from PDFs",
    tools: ["read_document", "write_db", "generate_summary"],
    status: "normal",
    requests: "890/day",
  },
  {
    name: "Operator",
    role: "Internal ops automation across multiple backend services",
    tools: ["query_db", "update_record", "delete_record"],
    status: "divergent",
    requests: "1,547/day",
    alert: "Started calling delete_record 3 days ago. No other agent in the fleet has ever used this tool. Rate of novel tool usage: 12x above fleet baseline.",
  },
];

export default function BlueFleetSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-sm font-semibold text-primary">Fleet Intelligence</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            One compromised agent looks normal alone
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Your fleet has agents handling support, sales, data processing, and
            internal ops. Each one builds a behavioral baseline over time. Bastion
            watches all of them together, so when one starts doing something none
            of the others have ever done, that signal is impossible to miss.
          </p>
        </motion.div>

        {/* Agent fleet cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08 }}
              className={`rounded-xl border p-5 ${
                agent.status === "divergent"
                  ? "border-red/30 bg-red-bg/30"
                  : "border-border bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${
                    agent.status === "divergent" ? "bg-red" : "bg-primary"
                  }`} />
                  <p className="text-sm font-semibold text-text">{agent.name}</p>
                </div>
                <span className="text-[10px] text-text-dim font-mono">{agent.requests}</span>
              </div>

              <p className="text-xs text-text-muted">{agent.role}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {agent.tools.map((t) => (
                  <span
                    key={t}
                    className={`rounded px-2 py-0.5 text-[10px] font-mono ${
                      agent.status === "divergent" && t === "delete_record"
                        ? "bg-red-bg text-red font-semibold"
                        : "bg-bg-alt text-text-dim"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {agent.alert && (
                <div className="mt-3 rounded-lg bg-red-bg border border-red/20 p-3">
                  <p className="text-[10px] font-semibold text-red mb-1">Fleet anomaly detected</p>
                  <p className="text-[10px] text-text-muted leading-relaxed">{agent.alert}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* How drift happens */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-xl border border-border bg-white p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim mb-4">How drift happens</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-text">Model updates</p>
              <p className="text-xs text-text-muted mt-1">
                A provider ships a new model version. Your prompts still work, but
                the safety boundaries shifted. Tool call patterns change in ways
                nobody notices for weeks.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-text">Prompt drift</p>
              <p className="text-xs text-text-muted mt-1">
                Teams iterate on system prompts independently. Over time, agents
                diverge from their original constraints. What was tested in staging
                no longer matches production.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-text">Fleet comparison catches it</p>
              <p className="text-xs text-text-muted mt-1">
                Operator starts calling delete_record. No other agent has ever used it.
                Individual monitoring sees nothing wrong. Fleet correlation flags it
                immediately.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
