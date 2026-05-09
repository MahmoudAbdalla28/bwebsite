"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Coverage = "cyber" | "techeo" | "pi" | "pl" | "cgl";
type CellLevel = "primary" | "supporting" | "none";

const COVERAGES: { id: Coverage; label: string }[] = [
  { id: "cyber", label: "Cyber" },
  { id: "techeo", label: "Tech E&O" },
  { id: "pi", label: "PI" },
  { id: "pl", label: "Product Liab." },
  { id: "cgl", label: "CGL" },
];

interface FeatureRow {
  name: string;
  cells: Record<Coverage, CellLevel>;
  tip: Record<Coverage, string>;
}

const FEATURES: FeatureRow[] = [
  {
    name: "Stays in Your Cloud Tenant",
    cells: { cyber: "primary", techeo: "supporting", pi: "none", pl: "none", cgl: "none" },
    tip: {
      cyber: "Removes shared-infrastructure concentration risk.",
      techeo: "Limits supply-chain exposure to upstream providers.",
      pi: "",
      pl: "",
      cgl: "",
    },
  },
  {
    name: "Tested Before Launch, Re-Tested on Every Change",
    cells: { cyber: "primary", techeo: "primary", pi: "supporting", pl: "supporting", cgl: "supporting" },
    tip: {
      cyber: "Satisfies AI Security Rider testing mandate. Closes rider-continuity gap when AI changes mid-policy.",
      techeo: "Aligns with AI-specific carrier pre-bind testing requirements. Keeps declared safeguards provable through every change.",
      pi: "Pre-deployment validation plus re-validation of duty of care after every model update.",
      pl: "Supplements ISO 26262 / IEC 61508. Required by EU Product Liability Directive for self-learning AI.",
      cgl: "Pre-bind controls evidence for AI exclusion buy-back, with continuity across changes.",
    },
  },
  {
    name: "Single Gateway With Live Risk Visibility",
    cells: { cyber: "primary", techeo: "primary", pi: "primary", pl: "primary", cgl: "supporting" },
    tip: {
      cyber: "Single point all AI traffic flows through. Continuous underwriting in the cyber-telemetry precedent.",
      techeo: "Standardized control surface and real-time portfolio visibility for every agent.",
      pi: "Continuous duty-of-care attestation across the deployment.",
      pl: "Real-time safety monitoring for AI-controlled physical systems.",
      cgl: "Continuous evidence stream for buy-back continuity.",
    },
  },
  {
    name: "Outputs Grounded or Blocked in Real Time",
    cells: { cyber: "primary", techeo: "primary", pi: "primary", pl: "primary", cgl: "primary" },
    tip: {
      cyber: "Sub-millisecond blocking of PII exfiltration and unsafe actions.",
      techeo: "Hallucination-class loss frequency reduction. Proves controls are actively in force.",
      pi: "Negligent-advice defense via guideline-grounded outputs.",
      pl: "Misdiagnosis prevention. Blocks dangerous AI commands before they reach actuators.",
      cgl: "Bodily-injury prevention. Intercepts defamation and PII outputs before they leave the agent.",
    },
  },
  {
    name: "Audit-Ready Compliance",
    cells: { cyber: "primary", techeo: "primary", pi: "primary", pl: "supporting", cgl: "supporting" },
    tip: {
      cyber: "Maps directly onto NIST CSF 2.0 controls.",
      techeo: "Multi-framework evidence for claims defense.",
      pi: "Supports regulatory defense and fines coverage.",
      pl: "Compliance anchor for product safety claims.",
      cgl: "Frameworks support exclusion buy-back negotiation.",
    },
  },
  {
    name: "Immutable Vault",
    cells: { cyber: "supporting", techeo: "primary", pi: "primary", pl: "none", cgl: "supporting" },
    tip: {
      cyber: "Forensic evidence for breach defense.",
      techeo: "Admissible logs for claims defense.",
      pi: "Withstands legal scrutiny for malpractice defense.",
      pl: "",
      cgl: "Supports AI exclusion buy-back negotiation.",
    },
  },
  {
    name: "Bias and Fairness Tested",
    cells: { cyber: "none", techeo: "supporting", pi: "primary", pl: "none", cgl: "none" },
    tip: {
      cyber: "",
      techeo: "Reduces discriminatory-output severity.",
      pi: "Discrimination carveback evidence.",
      pl: "",
      cgl: "",
    },
  },
];

interface Risk {
  name: string;
  featureRows: number[];
  primary: Coverage;
  description: string;
}

const RISKS: Risk[] = [
  { name: "Prompt Injection", featureRows: [2, 3], primary: "cyber", description: "Adversarial input crafted to bypass guardrails and trigger unintended actions." },
  { name: "Hallucination", featureRows: [1, 3], primary: "techeo", description: "AI produces confident outputs not grounded in fact or source data." },
  { name: "Algorithmic Bias", featureRows: [6], primary: "pi", description: "Model outputs are systematically skewed across protected groups." },
  { name: "Misdiagnosis (BI)", featureRows: [3], primary: "pl", description: "AI-driven medical or safety decision causes physical harm." },
  { name: "Defamation by AI", featureRows: [3], primary: "cgl", description: "AI output makes false statements that damage reputation." },
  { name: "Data Exfiltration", featureRows: [0, 2, 3], primary: "cyber", description: "Sensitive data leaves the network through AI traffic or tool calls." },
  { name: "Cross-Tenant Contamination", featureRows: [0], primary: "techeo", description: "Multi-tenant AI leaks one client's data into another's context." },
  { name: "Discriminatory Outcomes", featureRows: [6], primary: "pi", description: "AI decisioning produces disparate impact in hiring, lending, or access." },
  { name: "Advertising Injury", featureRows: [3], primary: "cgl", description: "AI-generated marketing content infringes IP, defames, or violates privacy." },
  { name: "EU AI Act Fines", featureRows: [1, 4, 5], primary: "cyber", description: "Regulatory penalties for non-compliance with EU AI Act risk obligations." },
  { name: "Agentic Errors", featureRows: [1, 3], primary: "techeo", description: "Autonomous agent takes incorrect actions outside its scope." },
  { name: "Output Privacy Violation", featureRows: [3, 5], primary: "cgl", description: "AI output reveals personal data without authorization." },
  { name: "Adversarial Tampering", featureRows: [1, 2, 3, 5], primary: "cyber", description: "Model or training data corrupted by an attacker to alter behavior." },
  { name: "Model Drift", featureRows: [1, 3], primary: "techeo", description: "Model performance degrades as production data diverges from training." },
  { name: "Unauthorized AI Use", featureRows: [2], primary: "cyber", description: "Employees use AI tools without sanctioned policy or oversight." },
  { name: "AI Technology Liability", featureRows: [1, 3], primary: "techeo", description: "Errors or failures in AI products sold, licensed, or distributed." },
  { name: "AI-Generated Content Risk", featureRows: [3], primary: "cgl", description: "Copyright, defamation, or IP exposure from AI-generated output." },
  { name: "Regulatory Violations", featureRows: [1, 4, 5], primary: "cyber", description: "Fines or defense costs under EU AI Act, NAIC, or US state AI laws." },
  { name: "Bias and Discrimination", featureRows: [6], primary: "pi", description: "AI system produces discriminatory outcomes against protected groups." },
];

function CellSymbol({ level }: { level: CellLevel }) {
  if (level === "primary") {
    return <span className="block h-3.5 w-3.5 rounded-full bg-primary" />;
  }
  if (level === "supporting") {
    return (
      <span className="block h-3.5 w-3.5 rounded-full border-2 border-primary relative overflow-hidden">
        <span className="absolute inset-0 left-1/2 bg-primary" />
      </span>
    );
  }
  return <span className="block h-3.5 w-3.5 rounded-full border border-border" />;
}

export default function InsuranceNexusSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [hoverCell, setHoverCell] = useState<{ row: number; col: Coverage } | null>(null);
  const [activeRisk, setActiveRisk] = useState<number | null>(null);
  const [hoverRisk, setHoverRisk] = useState<number | null>(null);

  const isRowHighlighted = (rowIdx: number) =>
    activeRisk !== null && RISKS[activeRisk].featureRows.includes(rowIdx);
  const isColHighlighted = (col: Coverage) =>
    activeRisk !== null && RISKS[activeRisk].primary === col;

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-pill">Insurance Nexus</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Where Bastion Lands in Your{" "}
            <span className="gradient-text">Coverage Stack</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-text-secondary">
            Hover any cell or click any risk. See exactly how Bastion&apos;s telemetry aligns with specific coverage stacks and insurance policies.
          </p>
        </motion.div>

        {/* Mobile-only swipe hint */}
        <div className="md:hidden mb-4 flex items-center justify-center gap-2 text-xs text-text-dim">
          <span className="font-medium uppercase tracking-widest">Swipe to explore</span>
          <motion.svg
            viewBox="0 0 16 12"
            className="h-3 w-4 text-primary"
            fill="none"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>

        {/* Heat-map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-sm border border-border bg-surface p-6 md:p-8 shadow-lg shadow-primary/5 overflow-x-auto"
        >
          <div className="min-w-[720px]">
            {/* Column headers */}
            <div className="grid grid-cols-[minmax(220px,2fr)_repeat(5,1fr)] gap-2 pb-4 border-b border-border mb-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-text-dim">
                Bastion Features
              </div>
              {COVERAGES.map((c) => {
                const colHighlighted = isColHighlighted(c.id);
                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-center"
                  >
                    <span
                      className={`inline-block text-center font-bold uppercase tracking-wider transition-all duration-300 ${
                        colHighlighted
                          ? "bg-primary text-white px-3 py-1.5 rounded-full text-xs shadow-md shadow-primary/30"
                          : "text-text-dim text-[11px]"
                      }`}
                    >
                      {c.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Rows */}
            {FEATURES.map((feature, rowIdx) => {
              return (
                <div
                  key={feature.name}
                  className="grid grid-cols-[minmax(220px,2fr)_repeat(5,1fr)] gap-2 py-3 border-b border-border-light last:border-0"
                >
                  <div className="text-sm font-medium text-text">
                    {feature.name}
                  </div>
                  {COVERAGES.map((c) => {
                    const level = feature.cells[c.id];
                    const colHighlighted = isColHighlighted(c.id);
                    const isHovered =
                      hoverCell?.row === rowIdx && hoverCell?.col === c.id;
                    return (
                      <div
                        key={c.id}
                        className={`relative flex items-center justify-center transition-colors duration-300 ${
                          colHighlighted ? "bg-primary-bg/60" : ""
                        }`}
                        onMouseEnter={() =>
                          level !== "none" && setHoverCell({ row: rowIdx, col: c.id })
                        }
                        onMouseLeave={() => setHoverCell(null)}
                      >
                        <div
                          className={`flex items-center justify-center rounded-sm p-2 transition-all duration-300 ${
                            level !== "none" ? "cursor-help" : ""
                          } ${
                            colHighlighted && level !== "none"
                              ? "scale-[1.4] drop-shadow-[0_0_8px_rgba(13,110,253,0.4)]"
                              : ""
                          }`}
                        >
                          <CellSymbol level={level} />
                        </div>
                        {isHovered && level !== "none" && (
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-sm bg-text px-3 py-2 text-xs text-white shadow-xl">
                            <p className="font-semibold mb-0.5">{feature.name}</p>
                            <p className="text-white/80 leading-relaxed">{feature.tip[c.id]}</p>
                            <span className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-text" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <CellSymbol level="primary" />
                <span>Primary Lever</span>
              </div>
              <div className="flex items-center gap-2">
                <CellSymbol level="supporting" />
                <span>Supporting</span>
              </div>
              <div className="flex items-center gap-2">
                <CellSymbol level="none" />
                <span>No Effect</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Risk pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14"
        >
          <div className="text-center mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-2">Risk Categories Bastion Addresses</p>
            <p className="text-sm text-text-muted">
              Click a risk to highlight which coverage responds.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {RISKS.map((risk, i) => (
              <div key={risk.name} className="relative">
                <button
                  onClick={() => setActiveRisk(activeRisk === i ? null : i)}
                  onMouseEnter={() => setHoverRisk(i)}
                  onMouseLeave={() => setHoverRisk(null)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200 cursor-pointer ${
                    activeRisk === i
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-surface text-text-muted border-border hover:border-primary/40 hover:text-text"
                  }`}
                >
                  {risk.name}
                </button>
                {hoverRisk === i && (
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-sm bg-text px-3 py-2 text-xs text-white shadow-xl">
                    <p className="font-semibold mb-0.5">{risk.name}</p>
                    <p className="text-white/80 leading-relaxed">{risk.description}</p>
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-text" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {activeRisk !== null && (
            <div className="mt-4 text-center text-xs text-text-dim">
              Click again to clear.
            </div>
          )}
        </motion.div>

        {/* Two confidences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              Two Confidences. <span className="gradient-text">One Protocol.</span>
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-sm border-2 border-primary bg-surface p-8 shadow-md shadow-primary/10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                Confidence to Deploy
              </p>
              <p className="text-base text-text-muted leading-relaxed">
                For the enterprise running the AI agent.
              </p>
              <p className="mt-3 text-base text-text leading-relaxed font-medium">
                Bastion is the controls, evidence, and defenses your legal and risk teams can sign off on.
              </p>
            </div>
            <div className="rounded-sm border-2 border-primary bg-surface p-8 shadow-md shadow-primary/10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                Confidence to Procure
              </p>
              <p className="text-base text-text-muted leading-relaxed">
                For the underwriter sizing up the risk.
              </p>
              <p className="mt-3 text-base text-text leading-relaxed font-medium">
                Bastion is the quantified telemetry, audit trail, and classified exposure that lets you write the line.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
