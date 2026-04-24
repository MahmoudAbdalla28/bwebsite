"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Zero data egress",
    body: "Every event, every trace, every report stays inside your perimeter. No cloud relay. No vendor access. Nothing leaves your infrastructure — by design.",
  },
  {
    number: "02",
    title: "One variable. Every agent.",
    body: "No SDK changes. No agent rebuilds. Route traffic through a single endpoint and your entire AI fleet is governed from day one.",
  },
  {
    number: "03",
    title: "Structured for decisions",
    body: "The telemetry Bastion generates is built for risk stakeholders — not just dashboards. Every metric is traceable, documented, and defensible under audit.",
  },
  {
    number: "04",
    title: "Behavioral intelligence",
    body: "Bastion learns what normal looks like for each agent, then flags deviation before it becomes an incident — across prompt changes, model updates, and production drift.",
  },
];

export default function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32" style={{ background: "#0F172A" }} ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-8" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-400">Why Bastion</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Built for enterprise.{" "}
            <span className="gradient-text">No compromises.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Other solutions add visibility by adding dependencies. Bastion adds visibility by sitting between — zero trust, zero footprint, full coverage.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-[#0F172A] p-8 md:p-10 hover:bg-white/[0.04] transition-colors duration-300 group"
            >
              <p className="text-4xl font-extrabold gradient-text leading-none mb-5">{p.number}</p>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
