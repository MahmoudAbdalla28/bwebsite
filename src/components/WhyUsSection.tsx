"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Zero data egress",
    body: "Every event, every trace, every report stays inside your perimeter. No cloud relay. No vendor access. Nothing leaves your infrastructure by design.",
  },
  {
    number: "02",
    title: "One endpoint. Every agent.",
    body: "No SDK changes. No agent rebuilds. Send traffic to a Bastion webhook (or route inline when enforcement is on) and your entire AI fleet is governed from day one.",
  },
  {
    number: "03",
    title: "Structured for underwriting",
    body: "Telemetry mapped directly to what carriers and MGAs need to write affirmative AI coverage: fleet risk scores, drift incidents, tool-call validation, exposure quantification. Defensible under audit, ingestible into underwriting workflows.",
  },
  {
    number: "04",
    title: "Behavioral intelligence",
    body: "Bastion learns what normal looks like for each agent, then flags deviation before it becomes an incident across prompt changes, model updates, and production drift.",
  },
];

export default function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative pt-8 md:pt-10 pb-20 md:pb-24 bg-bg-alt" ref={ref}>
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-4">Why Bastion</p>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Built for enterprise.{" "}
            <span className="gradient-text">No compromises.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Other solutions add visibility by adding dependencies. Bastion adds visibility without sitting in your request path: zero trust, zero footprint, full coverage.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
            >
              <p className="text-3xl font-extrabold gradient-text leading-none mb-4">{p.number}</p>
              <h3 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
