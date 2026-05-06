"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface FAQItem {
  category: string;
  q: string;
  a: string | string[];
  list?: { label?: string; body: string }[];
}

const faqs: FAQItem[] = [
  {
    category: "Governance",
    q: 'How does Bastion define "acceptable" behavior for my agents?',
    a: "We use a Policy-as-Code engine that aligns with global standards (NIST AI RMF, ISO 42001) and your specific business logic. Bastion automatically builds a Knowledge Graph of your LLM's tool calls and API signatures.",
    list: [
      { label: "Cold Start", body: "Onboarding is instant." },
      { label: "Learning Phase", body: "Bastion observes traffic for 10–14 days to baseline normal behavior before enforcement begins." },
    ],
  },
  {
    category: "Deployment",
    q: "Is Bastion invasive?",
    a: [
      "No. By default, Bastion shadows your agentic systems with zero impact on latency or privacy. Telemetry is sent to a Bastion webhook endpoint: your application (or a lightweight sidecar) pushes agent traffic to Bastion asynchronously. Bastion never sits in the request path. Zero changes to your API data path.",
      "For customers who require active enforcement, Bastion can additionally operate as an inline gateway: a sovereign proxy with light latency overhead, typically 5 to 250ms depending on the layers of security applied. This is the kill switch carriers require for high-stakes agents, available as an opt-in layer on top of the shadow mode.",
    ],
  },
  {
    category: "Deployment",
    q: "How long does it actually take to onboard?",
    a: "Minutes for inline gateway: point your traffic at the Bastion endpoint and you're enforced. Shadow mode adds host agent rollout for full payload visibility.",
  },
  {
    category: "Insurance",
    q: "What insurance lines does Bastion help unlock?",
    a: "Bastion's telemetry maps to five coverage lines, with different impact in each. The Insurance Nexus page details the cell-by-cell mapping; the summary:",
    list: [
      { label: "Cyber", body: "Primary lever. Satisfies 2026 AI Security Rider testing mandates, blocks PII exfiltration in real time, and supplies the continuous-underwriting telemetry feeding modern cyber-risk pricing." },
      { label: "Tech E&O", body: "Densest column. Continuous attestation against declared safeguards, hallucination-class loss reduction, and admissible evidence for E&O claims defense." },
      { label: "Professional Indemnity", body: "Bias and fairness testing, guideline-grounded outputs, and decision audit logs that support duty-of-care defense in disparate-impact and negligent-advice claims." },
      { label: "Product Liability", body: "Cryptographic chain-of-custody for AI decisions on physical systems, supplementing functional-safety stacks for industrial and med-tech AI." },
      { label: "CGL", body: "Buy-back support for the new generative AI exclusions on Coverage B (defamation, advertising injury, output-side privacy violations)." },
    ],
  },
  {
    category: "Insurance",
    q: "What is the ROI?",
    a: "Bastion turns uninsurable agents into standard risk assets.",
    list: [
      { label: "For Founders", body: 'Shorter sales cycles with enterprise clients who demand "sovereign governance."' },
      { label: "For Risk Managers", body: "Lower premiums through verifiable, real-time loss-prevention data." },
    ],
  },
  {
    category: "Data Sovereignty",
    q: "Does my data stay sovereign?",
    a: "Always. Bastion stores telemetry in AES-256 encrypted vaults. We do not use your data to train models, and we do not have visibility into the raw payload unless specifically configured for forensic auditing. Your data remains your moat.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-bg-alt border-t border-border-light scroll-mt-20" ref={ref}>
      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-5">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Common Questions.{" "}
            <span className="gradient-text">Direct Answers.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            For questions not addressed here, contact our team directly.
          </p>
        </motion.div>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.04 + i * 0.04 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">
                    {faq.category}
                  </p>
                  <p className="text-base font-semibold text-text group-hover:text-primary transition-colors duration-200">
                    {faq.q}
                  </p>
                </div>
                <motion.svg
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0 text-text-dim"
                  fill="none"
                >
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 space-y-3">
                      {(Array.isArray(faq.a) ? faq.a : [faq.a]).map((para, pi) => (
                        <p key={pi} className="text-sm leading-relaxed text-text-muted">{para}</p>
                      ))}
                      {faq.list && (
                        <ul className="space-y-2.5 pl-1">
                          {faq.list.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                              <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                              <p>
                                {item.label && (
                                  <span className="font-semibold text-text">{item.label}: </span>
                                )}
                                {item.body}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
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
