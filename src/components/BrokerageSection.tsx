"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    title: "Differentiate your offering",
    body: "Your competitors can't underwrite AI liability because they don't have the data. You can. Bastion gives you the telemetry stack to offer AI coverage as a service.",
  },
  {
    title: "Deploy on client infrastructure",
    body: "Single binary, 30-day monitoring window. Your client changes one environment variable. You get a carrier-grade risk report without touching their code.",
  },
  {
    title: "Revenue per client",
    body: "Every enterprise deploying AI agents needs coverage. Bastion turns that need into a recurring revenue stream for your brokerage.",
  },
];

export default function BrokerageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="brokerages" className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-sm font-semibold text-primary">For Brokerages</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            Add AI risk telemetry to your book of business
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Carriers need actuarial data to underwrite AI liability. Bastion
            generates it. You deliver it.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="rounded-2xl border border-border bg-white p-8"
            >
              <h3 className="text-lg font-semibold text-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {card.body}
              </p>
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
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
