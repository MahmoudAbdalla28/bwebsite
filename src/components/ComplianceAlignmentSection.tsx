"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Item {
  title: string;
  category?: string;
  text: string;
  bastion: string[];
}

interface Framework {
  id: string;
  abbrev: string;
  fullName: string;
  version: string;
  issuer: string;
  description: string;
  items: Item[];
}

const FRAMEWORKS: Framework[] = [
  {
    id: "eu-ai-act",
    abbrev: "EU AI Act",
    fullName: "Regulation (EU) 2024/1689",
    version: "Effective Aug 2026",
    issuer: "European Union",
    description: "Binding EU law for high-risk AI systems. Articles 9–15 set the technical requirements.",
    items: [
      {
        title: "Article 9: Risk Management System",
        text: "Continuous, lifecycle-long process to identify, analyze, evaluate, and mitigate risks to health, safety, and fundamental rights.",
        bastion: [
          "Tested Before Launch, Re-Tested on Every Change: continuous risk identification across the lifecycle",
          "Six Signals provide the measurable inputs to ongoing risk assessment",
        ],
      },
      {
        title: "Article 10: Data and Data Governance",
        text: "Training, validation, and test datasets must meet quality criteria and be subject to data governance practices.",
        bastion: [
          "Single Gateway with Live Risk Visibility logs every data flow into and out of the agent",
          "Audit-Ready Compliance preserves the data governance trail",
        ],
      },
      {
        title: "Article 11: Technical Documentation",
        text: "Drawn up before placing on market and continuously updated; must demonstrate compliance with the high-risk requirements.",
        bastion: [
          "Audit-Ready Compliance: framework-mapped evidence pack regenerated on every change",
          "Immutable Vault preserves the documentation chain of custody",
        ],
      },
      {
        title: "Article 12: Record-Keeping",
        text: "Automatic logging of events over the lifetime of the AI system, with traceability appropriate to the intended purpose.",
        bastion: [
          "Immutable Vault: tamper-evident records of every interaction",
          "Single Gateway captures every request, response, and tool call",
        ],
      },
      {
        title: "Article 13: Transparency to Deployers",
        text: "Provide deployers with sufficient information to interpret outputs and use the system appropriately.",
        bastion: [
          "Audit-Ready Compliance: narrative reporting alongside the structured telemetry",
          "Six Signals expose performance characteristics deployers need to interpret outputs",
        ],
      },
      {
        title: "Article 14: Human Oversight",
        text: "Designed and developed to be effectively overseen by natural persons during the period the system is in use.",
        bastion: [
          "Outputs Grounded or Blocked in Real Time: enables human review and intervention before action",
          "Single Gateway centralizes the oversight surface across the agent fleet",
        ],
      },
      {
        title: "Article 15: Accuracy, Robustness, and Cybersecurity",
        text: "Achieve appropriate accuracy, robustness, and cybersecurity, and perform consistently in those respects throughout the lifecycle.",
        bastion: [
          "Tested Before Launch, Re-Tested on Every Change: adversarial validation under attack conditions",
          "Six Signals: Drift & Regression detect accuracy degradation",
          "Continuous attestation across the lifecycle, not point-in-time",
        ],
      },
    ],
  },
  {
    id: "naic",
    abbrev: "NAIC Model Bulletin",
    fullName: "Use of AI Systems by Insurers",
    version: "Dec 2023",
    issuer: "National Association of Insurance Commissioners",
    description: "Model bulletin on AI governance for underwriting, claims, and rate-setting. Adopted as enforceable regulation by a growing number of US state insurance commissioners.",
    items: [
      {
        title: "Written AI Systems Program (AIS Program)",
        text: "Insurers must develop, implement, and maintain a written program for the responsible use of AI Systems making or supporting decisions that impact consumers.",
        bastion: [
          "Audit-Ready Compliance: produces the documented evidence base of an AIS Program",
          "Single Gateway with Live Risk Visibility: operational backbone the program runs on",
        ],
      },
      {
        title: "Governance Structure & Accountability",
        text: "Cross-functional governance with stakeholders from actuarial, data science, underwriting, compliance, and legal, with clear roles and decision-making authority.",
        bastion: [
          "Single Gateway centralizes accountability: every action attributable to a defined role and policy",
          "Audit-Ready Compliance creates a shared evidence base across actuarial, compliance, and legal teams",
        ],
      },
      {
        title: "Risk Management & Internal Controls",
        text: "Robust controls, internal audit functions, and written policies covering each stage of an AI system's lifecycle.",
        bastion: [
          "Six Signals across the agent lifecycle: Behavioral Baselines, Action Accountability, Drift & Regression",
          "Tested Before Launch, Re-Tested on Every Change: adversarial validation feeds the risk register",
        ],
      },
      {
        title: "Bias Testing & Validation",
        text: "Demonstrate bias testing, fairness metrics, and validation across consumer-impacting AI systems.",
        bastion: [
          "Six Signals: Fleet-Wide Correlation surfaces aggregate bias patterns across cohorts",
          "Behavioral Baselines flag drift in outcomes by demographic segment",
        ],
      },
      {
        title: "Third-Party Vendor Diligence",
        text: "Insurers remain responsible for third-party data and AI systems; contracts must allow audit rights and regulatory cooperation.",
        bastion: [
          "Audit-Ready Compliance documents the dependency chain and re-validates on every change",
          "Immutable Vault preserves the third-party interaction record for regulatory inquiries",
        ],
      },
      {
        title: "Consumer Transparency & Notification",
        text: "Notify consumers when AI systems are in use; provide appropriate information on how AI affects decisions impacting them.",
        bastion: [
          "Audit-Ready Compliance: narrative + structured records explaining decisions affecting consumers",
          "Immutable Vault provides the verifiable trail behind each decision",
        ],
      },
    ],
  },
  {
    id: "cbb",
    abbrev: "CBB Module SG / GCC",
    fullName: "Central Bank of Bahrain · GCC Financial Regulation",
    version: "Current",
    issuer: "Central Bank of Bahrain · GCC regulators",
    description: "Regulatory context for GCC-based financial services clients, including Sharia-compliant Islamic banking and finance.",
    items: [
      {
        title: "AI Governance for Regulated Financial Services",
        text: "Authorised firms must apply governance, risk management, and operational controls when deploying AI in regulated financial activity.",
        bastion: [
          "Audit-Ready Compliance: governance evidence consumable by CBB and equivalent GCC regulators",
          "Single Gateway centralizes accountability across AI-driven financial workflows",
        ],
      },
      {
        title: "Operational Risk for Autonomous Workflows",
        text: "Managing operational risk introduced by autonomous decisioning, including monitoring, escalation, and human override pathways.",
        bastion: [
          "Outputs Grounded or Blocked in Real Time: sub-millisecond intervention before unsafe autonomous action",
          "Six Signals: Action Accountability validates every autonomous decision against composed policy",
        ],
      },
      {
        title: "Sharia & Islamic Banking Compliance",
        text: "AI deployments in Islamic finance must respect Sharia principles, including avoidance of gharar (excessive uncertainty) and maintenance of Sharia-board oversight pathways.",
        bastion: [
          "Audit-Ready Compliance: encodes Sharia-board policy into runtime constraints",
          "Outputs Grounded or Blocked in Real Time enforces Sharia-aligned operational boundaries",
        ],
      },
      {
        title: "Data Sovereignty & Cross-Border Controls",
        text: "Sensitive financial and customer data must remain under jurisdictional controls, with documented cross-border transfer protections.",
        bastion: [
          "Single Gateway logs every data flow, including cross-border movement",
          "Immutable Vault preserves jurisdictional access records",
        ],
      },
      {
        title: "Regulatory Reporting & Audit",
        text: "Continuous documentation enabling on-demand regulatory inquiry, audit, and supervisory review.",
        bastion: [
          "Audit-Ready Compliance: framework-mapped evidence pack regenerated on demand",
          "Continuous attestation across the AI lifecycle, not point-in-time snapshots",
        ],
      },
    ],
  },
  {
    id: "gdpr",
    abbrev: "GDPR",
    fullName: "General Data Protection Regulation",
    version: "Reg. (EU) 2016/679",
    issuer: "European Union",
    description: "Binding EU privacy law. Sets controls over personal data processing, including AI-driven decisions and outputs.",
    items: [
      {
        title: "Article 5: Lawful, Fair, and Transparent Processing",
        text: "Personal data must be processed lawfully, fairly, and transparently. Includes purpose limitation, data minimization, accuracy, and storage limitation.",
        bastion: [
          "Single Gateway logs every data flow into and out of agents: supports lawfulness and transparency evidence",
          "Outputs Grounded or Blocked in Real Time enforces purpose limitation at the runtime layer",
        ],
      },
      {
        title: "Article 22: Automated Decision-Making and Profiling",
        text: "Data subjects have the right not to be subject to a decision based solely on automated processing that produces legal or similarly significant effects.",
        bastion: [
          "Outputs Grounded or Blocked in Real Time: enables human review and intervention before automated decisions execute",
          "Single Gateway centralizes the human-oversight pathway across the agent fleet",
        ],
      },
      {
        title: "Article 25: Data Protection by Design and by Default",
        text: "Data protection principles must be embedded into the design of processing activities and applied by default.",
        bastion: [
          "Single Gateway with Live Risk Visibility: privacy-by-design infrastructure layer",
          "Audit-Ready Compliance bakes data-protection controls into the deployment baseline",
        ],
      },
      {
        title: "Article 32: Security of Processing",
        text: "Implement appropriate technical and organizational measures to ensure security of personal data processing.",
        bastion: [
          "Outputs Grounded or Blocked in Real Time: PII redaction and exfiltration prevention at the gateway",
          "Immutable Vault: tamper-evident records of every access and processing event",
        ],
      },
      {
        title: "Article 35: Data Protection Impact Assessment (DPIA)",
        text: "Required for processing likely to result in high risk to rights and freedoms, including large-scale automated profiling.",
        bastion: [
          "Tested Before Launch, Re-Tested on Every Change: adversarial impact assessment feeding the DPIA",
          "Six Signals: Fleet-Wide Correlation surfaces aggregate impact patterns",
        ],
      },
    ],
  },
];

export default function ComplianceAlignmentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeId, setActiveId] = useState<string>("eu-ai-act");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const framework = FRAMEWORKS.find((f) => f.id === activeId)!;

  const selectFramework = (id: string) => {
    setActiveId(id);
    setExpandedIdx(null);
  };

  const toggleItem = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative py-24 md: py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="label-pill">Compliance</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm: text-5xl">
            How Bastion Aligns With{" "}
            <span className="gradient-text">Regulation</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-text-secondary">
            Pick a compliance. See the principles inside it and how Bastion satisfies each one.
          </p>
        </motion.div>

        {/* Framework selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 sm: grid-cols-3 lg: grid-cols-4 gap-3 mb-10"
        >
          {FRAMEWORKS.map((f) => {
            const isActive = activeId === f.id;
            return (
              <button
                key={f.id}
                onClick={() => selectFramework(f.id)}
                className={`flex flex-col items-start gap-1 rounded-sm border p-4 text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-primary bg-primary-bg shadow-md shadow-primary/10"
                    : "border-border bg-surface hover: border-primary/30 hover: shadow-sm"
                }`}
              >
                <span
                  className={`text-sm font-bold ${
                    isActive ? "text-primary" : "text-text"
                  }`}
                >
                  {f.abbrev}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-text-dim">
                  {f.version}
                </span>
                <span className="text-xs text-text-muted leading-snug mt-1">
                  {f.fullName}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-sm border border-border bg-surface p-8 md: p-10 shadow-sm overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={framework.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Framework header */}
              <div className="mb-8 pb-6 border-b border-border">
                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                  <h3 className="text-2xl md: text-3xl font-bold tracking-tight text-text">
                    {framework.abbrev}
                  </h3>
                  <span className="text-sm text-text-muted">
                    {framework.fullName}
                  </span>
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-text-dim mb-3">
                  {framework.issuer} · {framework.version}
                </p>
                <p className="text-base leading-relaxed text-text-secondary">
                  {framework.description}
                </p>
              </div>

              {/* Items list: collapsed by default, click to expand */}
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-dim mb-4">
                {framework.items.length} principles · click any to expand
              </p>
              <div className="space-y-2">
                {framework.items.map((item, idx) => {
                  const isOpen = expandedIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-sm border transition-all duration-200 ${
                        isOpen
                          ? "border-primary/40 bg-primary-bg/30"
                          : "border-border bg-surface hover: border-primary/20"
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(idx)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                          <span
                            className={`text-sm font-semibold ${
                              isOpen ? "text-primary" : "text-text"
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.category && (
                            <span className="rounded-full border border-primary/20 bg-primary-bg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <svg
                          viewBox="0 0 12 8"
                          className={`h-3 w-3 shrink-0 text-text-dim transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-primary" : ""
                          }`}
                          fill="none"
                        >
                          <path
                            d="M1 1.5l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 grid md: grid-cols-2 gap-6 md: gap-8 border-t border-primary/15">
                              <div className="pt-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2">
                                  The Principle
                                </p>
                                <p className="text-sm leading-relaxed text-text">
                                  {item.text}
                                </p>
                              </div>
                              <div className="pt-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2">
                                  How Bastion Aligns
                                </p>
                                <ul className="space-y-2">
                                  {item.bastion.map((b, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2.5">
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                      <span className="text-sm leading-relaxed text-text-muted">
                                        {b}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="/bastion/contact/"
            className="btn-glow inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-sm font-semibold text-white transition-all hover: bg-primary-dark hover: scale-[1.02] active: scale-[0.99]"
          >
            Talk to us about your compliance posture
            <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none">
              <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
