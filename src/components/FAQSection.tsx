"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    category: "Deployment",
    q: "How long does deployment take?",
    a: "Most teams are up and running in under an hour. Bastion deploys as a single binary on your infrastructure. Point your agents at it with one environment variable — no code changes, no rebuilds, no new SDK dependencies.",
  },
  {
    category: "Deployment",
    q: "Do we need to modify our AI agents?",
    a: "No. Bastion operates as a transparent proxy. Your agents continue calling their existing LLM endpoints — you update one environment variable to route traffic through Bastion. No SDK changes, no application-layer modifications.",
  },
  {
    category: "Data & Privacy",
    q: "Does any data leave our infrastructure?",
    a: "Zero. Bastion is entirely on-premise. All event data, telemetry, and reports are generated and stored within your environment. Nothing is transmitted to Bastion or any third party — by architecture, not policy.",
  },
  {
    category: "Coverage",
    q: "Which AI providers and frameworks does Bastion support?",
    a: "Bastion works with every major LLM provider — OpenAI, Anthropic, AWS Bedrock, Google Vertex AI, Azure OpenAI, Ollama, and LiteLLM. It is framework-agnostic and compatible with LangChain, LlamaIndex, and any custom agent implementation that makes standard HTTP API calls.",
  },
  {
    category: "The Report",
    q: "What does the telemetry report contain?",
    a: "The report includes a fleet risk score, PII exposure rates with full remediation history, behavioral consistency metrics over a rolling 30-day window, a classified incident log, and a summary recommendation for risk stakeholders. Every metric is traceable to its source events.",
  },
  {
    category: "Data & Privacy",
    q: "How does Bastion handle sensitive and regulated data?",
    a: "Bastion scans every agent interaction for PII and sensitive data before it reaches the LLM. Detected content is redacted or blocked based on your policy configuration. All detections are logged with full remediation records — every flagged event is documented.",
  },
  {
    category: "The Report",
    q: "What compliance frameworks does the output support?",
    a: "The telemetry report is structured to support AI risk frameworks including NIST AI RMF, EU AI Act documentation requirements, and standard enterprise information security audit processes. It provides the documented evidence that risk, legal, and compliance teams need to act.",
  },
  {
    category: "Coverage",
    q: "How is Bastion different from prompt guardrails?",
    a: "Prompt guardrails filter content at the application layer and must be integrated into each agent individually. Bastion operates at the infrastructure layer — across your entire fleet, without touching any agent. It adds behavioral drift detection, tool call validation, cross-agent correlation, and structured audit reporting that guardrail libraries do not provide.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt border-t border-border-light" ref={ref}>
      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-5">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Questions we get{" "}
            <span className="gradient-text">every time.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            If yours isn&apos;t here, reach out — we respond within 24 hours.
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
                    <p className="pb-6 text-sm leading-relaxed text-text-muted">
                      {faq.a}
                    </p>
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
