"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "Where does our data go?",
    a: "Nowhere. Bastion runs on-prem, all data lives in local SQLite on your infrastructure. Nothing goes to us or any third party. The underwriting report only contains sanitized aggregate metrics, no raw prompts or responses.",
  },
  {
    q: "PIPEDA, Law 25, and GDPR?",
    a: "On-prem keeps data in your jurisdiction with no cross-border transfer. PII detection and redaction at the proxy layer prevents personal data from reaching LLM providers. The telemetry log provides the audit trail regulators require, and the underwriting report has no personal data in it.",
  },
  {
    q: "Does the proxy itself introduce risk?",
    a: "Single compiled Rust binary with no runtime dependencies. Rust memory safety eliminates buffer overflows and use-after-free. Two ports exposed, neither public-facing in standard deployment. No arbitrary code execution, no eval, no dynamic plugins.",
  },
  {
    q: "What if Bastion goes down?",
    a: "Configurable. Monitor mode is passthrough, so if the proxy dies agents connect directly to their LLM providers. Enforce mode defaults to fail-closed, which is the right default for regulated environments. Fail-open is available if availability matters more.",
  },
];

export default function ComplianceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="label-pill">Compliance &amp; Data</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-text sm:text-5xl">
              Questions Enterprise <span className="gradient-text">Buyers Ask</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Built for environments where data residency, regulatory alignment, and
              proxy security are not optional.
            </p>

            {/* Compliance badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["PIPEDA", "Law 25", "GDPR", "SOC 2 (roadmap)", "ISO 27001 (compatible)"].map((badge) => (
                <span key={badge} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: FAQ accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="rounded-sm border border-border bg-surface overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-text">{faq.q}</span>
                  <svg
                    viewBox="0 0 16 16"
                    className={`h-4 w-4 shrink-0 text-text-dim transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                    fill="none"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-5 pb-4"
                  >
                    <p className="text-sm leading-relaxed text-text-muted">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
