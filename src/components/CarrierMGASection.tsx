"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    title: "Convert Silent Exposure Into Priced Coverage",
    body: "Standard policy frameworks leave AI exposures trapped as silent risk. Bastion delivers the Evidence of Control your reinsurers and risk committee need to write affirmative AI coverage with confidence, backed by traceable, audit-defensible telemetry.",
  },
  {
    title: "Continuous, Not Point-in-Time",
    body: "Static questionnaires can't survive contact with a live agent fleet. Bastion replaces annual snapshots with real-time agentic-risk signals: fleet risk scores, drift incidents, tool-call validation, exposure quantification, for tighter loss ratios across your AI book.",
  },
];

export default function CarrierMGASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-4">For Carriers &amp; MGAs</p>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Underwrite the AI Era.{" "}
            <span className="gradient-text">Affirmatively.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Point-in-time AI underwriting is running out of road. Bastion is the
            continuous telemetry layer behind the next generation of affirmative
            AI coverage.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="rounded-2xl border border-border bg-white p-8 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10"
        >
          <a
            href="/bastion/contact/"
            className="btn-glow inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Partner with us
            <svg viewBox="0 0 20 12" className="h-3 w-5" fill="none">
              <path d="M0 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
