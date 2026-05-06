"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const personas = [
  {
    role: "Risk / Compliance Lead",
    scenario: "Legal won't let us ship AI agents without provable controls. Annual audits aren't enough; we need re-validation every time a model or prompt changes.",
    answer: "Bastion runs continuous attestation against your declared safeguards. Every model swap, prompt edit, or tool-chain change triggers re-validation. Tamper-evident logs your legal and risk teams can sign off on, mapped to the frameworks regulators actually ask for.",
  },
  {
    role: "Engineering",
    scenario: "We don't want another security dashboard to maintain. The team is stretched and we need visibility that fits how we actually ship.",
    answer: "Bastion is one config change. Drop the proxy in, point your agents at it, and your fleet inherits enforcement and telemetry. No SDK rewrite, no rebuilds, no new tooling to own.",
  },
  {
    role: "Carrier / MGA Underwriter",
    scenario: "We're being asked to write affirmative AI coverage with no actuarial baseline. Point-in-time questionnaires don't survive contact with a real agent fleet.",
    answer: "Bastion delivers continuous, actuarial-grade telemetry across six structural dimensions of agent behavior. One attested file, consumable across your entire carrier panel. The Evidence of Control to convert silent AI exposure into affirmatively-priced coverage.",
  },
];

export default function BuyerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="solutions" className="relative pt-12 pb-24 md:pt-16 md:pb-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Three Conversations. <span className="gradient-text">Same Friction.</span>
          </h2>
        </motion.div>

        {/* Persona cards */}
        <div className="grid gap-5 md:grid-cols-3 mb-14">
          {personas.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl border border-border bg-white p-7 flex flex-col gap-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div>
                <p className="text-xs font-medium text-text-dim uppercase tracking-widest">{p.role}</p>
                <p className="mt-3 text-base font-semibold text-text leading-snug">&ldquo;{p.scenario}&rdquo;</p>
              </div>
              <p className="text-sm leading-relaxed text-text-muted border-t border-border pt-4">{p.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
