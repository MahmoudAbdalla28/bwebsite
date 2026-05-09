"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const SANS = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";
const MONO = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const FADE_LEFT = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const FADE_RIGHT = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const PIPELINE = [
  {
    eyebrow: "Pre-underwriting",
    label: "Non-invasive Assessment",
    body: "Every agentic AI system has an external surface — a phone number, a chatbot endpoint, a public API. Bastion probes it adversarially before your client integrates anything. No SDK. No install. No friction. You get an initial risk posture that prices the policy. Your client gets a preview of their actual failure surface. The quote gets written.",
  },
  {
    eyebrow: "In-force",
    label: "Active Telemetry Across the Policy Period",
    body: "Once the policy is bound, Bastion integration becomes a coverage condition. One endpoint change on the client side. From that point, every agent interaction writes structured tamper-evident evidence into a continuously updated posture file. You see the risk profile in real time — not at renewal, not when a claim is filed. When a client's agent starts drifting toward known failure patterns, you know before it becomes your problem.",
    italic: "The same model Coalition uses to intervene before cyber incidents become claims — applied to agentic AI behavior.",
  },
  {
    eyebrow: "Renewal",
    label: "Dynamic Risk Profile",
    body: "At renewal, you don't re-underwrite from a questionnaire. You re-underwrite from a policy-period-long evidence trail. Every model update, every prompt change, every behavioral delta is documented and mapped to your risk framework. Clients who ran clean get rewarded. Clients whose risk profile degraded get repriced. Accurately.",
  },
];

export default function InsurancePage() {
  const [hoveredPipeline, setHoveredPipeline] = useState<number | null>(null);
  return (
    <div
      className="relative min-h-screen text-gray-900 overflow-x-hidden"
      style={{ fontFamily: SANS }}
    >
      <Navbar />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-6 pt-36 pb-20 md:pt-48 md:pb-24 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: "easeOut" }}
              className="mx-auto max-w-5xl text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[5rem] font-semibold tracking-[-0.025em] leading-[1.04] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              Underwrite agentic AI without asking your client to{" "}
              <span className="text-blue-600 italic font-medium">integrate anything.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-10 max-w-3xl text-base md:text-lg leading-relaxed text-gray-600"
            >
              Bastion&apos;s pre-underwriting assessment probes any client&apos;s public-facing AI agent &mdash; phone number, chatbot, API endpoint &mdash; and produces a risk posture you can price from. No SDK on their side. No friction. The quote gets written. Integration becomes a condition of coverage.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="/bastion/contact/"
                className="group inline-flex items-center gap-2.5 rounded-full bg-blue-600 hover:bg-blue-700 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_10px_30px_-8px_rgba(37,99,235,0.5)]"
              >
                Book a Pre-Underwriting Walkthrough
                <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none">
                  <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — Manifesto */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="bastion-aurora" aria-hidden="true" />
          <div className="bastion-aurora-mask" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.1] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              Every MGA writing AI policies in 2026 will need{" "}
              <motion.span
                className="relative inline-block text-blue-600 italic font-medium"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.035, delayChildren: 0.55 },
                  },
                }}
              >
                <span className="sr-only">independent telemetry.</span>
                <span aria-hidden="true" className="inline-block">
                  {Array.from("independent telemetry.").map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block will-change-transform"
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 38,
                          scale: 0.45,
                          rotate: ((i * 41) % 30) - 15,
                          filter: "blur(8px)",
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          rotate: 0,
                          filter: "blur(0px)",
                          transition: {
                            type: "spring",
                            stiffness: 105,
                            damping: 13,
                            mass: 0.7,
                            opacity: { duration: 0.4 },
                            filter: { duration: 0.5, ease: "easeOut" },
                          },
                        },
                      }}
                    >
                      {char === " " ? " " : char}
                    </motion.span>
                  ))}
                </span>
              </motion.span>
            </motion.h2>
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.15 }}
              className="mt-7 text-base md:text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto"
            >
              The first ones to integrate it will own the category before regulation forces it.
            </motion.p>
          </div>
        </section>

        {/* SECTION 3 — Pipeline (3 cols) */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] text-gray-900 mb-16"
              style={{ fontFamily: SANS }}
            >
              From quote to claim.{" "}
              <span className="text-blue-600 italic font-medium">Bastion is in the loop.</span>
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
              }}
              className="grid md:grid-cols-3 gap-6"
              onMouseLeave={() => setHoveredPipeline(null)}
            >
              {PIPELINE.map((step, i) => {
                const fromLeft = i === 0;
                const fromRight = i === 2;
                const isMiddle = i === 1;
                const isHoveredOther = hoveredPipeline !== null && hoveredPipeline !== i;
                const isHoveredSelf = hoveredPipeline === i;

                return (
                  <motion.div
                    key={step.eyebrow}
                    variants={{
                      hidden: {
                        x: fromLeft ? -160 : fromRight ? 160 : 0,
                        y: isMiddle ? 80 : 0,
                        opacity: 0,
                        scale: 0.92,
                        rotate: fromLeft ? -2 : fromRight ? 2 : 0,
                      },
                      show: {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        transition: {
                          type: "spring",
                          stiffness: 55,
                          damping: 16,
                          mass: 1,
                        },
                      },
                    }}
                    onMouseEnter={() => setHoveredPipeline(i)}
                    animate={{
                      filter: isHoveredOther ? "blur(4px)" : "blur(0px)",
                      opacity: isHoveredOther ? 0.45 : 1,
                      scale: isHoveredSelf ? 1.02 : isHoveredOther ? 0.97 : 1,
                      y: isHoveredSelf ? -8 : 0,
                    }}
                    transition={{
                      filter: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      y: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className={`relative rounded-3xl bg-white/70 backdrop-blur-xl border p-10 md:p-12 transition-shadow duration-500 ${
                      isHoveredSelf
                        ? "border-blue-200/70 shadow-2xl shadow-blue-500/20 bg-white"
                        : "border-gray-200/60 shadow-xl shadow-blue-500/5"
                    }`}
                  >
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400 mb-5"
                      style={{ fontFamily: MONO }}
                    >
                      {String(i + 1).padStart(2, "0")} — {step.eyebrow}
                    </p>
                    <h3
                      className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-gray-900 mb-6 leading-snug"
                      style={{ fontFamily: SANS }}
                    >
                      {step.label}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-gray-600">{step.body}</p>
                    {step.italic && (
                      <p className="mt-6 pt-6 border-t border-gray-200/60 text-sm italic leading-relaxed text-blue-700">
                        {step.italic}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — Coalition proof */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-xl shadow-blue-500/5 p-10 md:p-16">
              <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                <motion.div
                  variants={FADE_LEFT}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="md:col-span-5"
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-6"
                    style={{ fontFamily: MONO }}
                  >
                    Proof Of Model
                  </p>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] text-gray-900"
                    style={{ fontFamily: SANS }}
                  >
                    Active underwriting works.{" "}
                    <span className="text-blue-600 italic font-medium">Coalition proved it.</span>
                  </h2>
                  <div className="mt-10 grid grid-cols-2 gap-6">
                    <div>
                      <p
                        className="text-5xl md:text-6xl font-semibold tracking-[-0.02em] text-blue-600"
                        style={{ fontFamily: SANS }}
                      >
                        64%
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                        fewer claims vs. industry
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-5xl md:text-6xl font-semibold tracking-[-0.02em] text-blue-600"
                        style={{ fontFamily: SANS }}
                      >
                        2017
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                        continuous-telemetry underwriting since
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={FADE_RIGHT}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="md:col-span-7"
                >
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Coalition has underwritten cyber risk on continuous proprietary telemetry since 2017. The result: <strong className="text-gray-900 font-semibold">64% fewer claims than the industry average.</strong> The model is simple &mdash; independent continuous telemetry produces more accurate pricing, earlier intervention, and better loss ratios than point-in-time assessment.
                  </p>
                  <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-700">
                    Bastion brings that model to agentic AI. We don&apos;t underwrite. We don&apos;t compete with carriers. We produce the independent evidence layer your policy period requires &mdash; in a format any carrier panel can consume.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — Compounding edge */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.08] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              Every deployment makes your underwriting{" "}
              <span className="text-blue-600 italic font-medium">more accurate.</span>
            </motion.h2>

            {/* Data Edge — punchy moat lead */}
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="mt-10 relative rounded-3xl border border-blue-200/60 backdrop-blur-xl shadow-xl shadow-blue-500/10 p-10 md:p-14 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(219, 234, 254, 0.6) 0%, rgba(255, 255, 255, 0.7) 60%, rgba(207, 250, 254, 0.5) 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl"
              />
              <div className="relative">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
                  style={{ fontFamily: MONO }}
                >
                  The Data Edge
                </p>
                <p
                  className="text-2xl md:text-3xl lg:text-[2.25rem] font-medium tracking-[-0.015em] leading-[1.3] text-gray-900"
                  style={{ fontFamily: SANS }}
                >
                  Bastion leverages{" "}
                  <span className="text-blue-600 italic font-semibold">Aggregated Risk Telemetry</span>.{" "}
                  Our{" "}
                  <span className="text-blue-600 italic font-semibold">Knowledge Graph</span>{" "}
                  identifies emerging{" "}
                  <span className="text-blue-600 italic font-semibold">&quot;Agentic Failure Classes&quot;</span>{" "}
                  across the ecosystem, providing you with{" "}
                  <span className="text-blue-600 italic font-semibold">Day-Zero protection</span>{" "}
                  against logic drift that hasn&apos;t even hit your vertical yet.
                </p>
              </div>
            </motion.div>

            {/* Subtle data-handling hedge — points to FAQ for those who want detail */}
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.18 }}
              className="mt-4 max-w-3xl text-xs leading-relaxed text-gray-500"
            >
              Ecosystem learning operates on anonymized failure classes &mdash; never customer payloads. We don&apos;t train models on your data and we don&apos;t sell or share it.{" "}
              <a
                href="/bastion/faq/#faq"
                className="text-blue-700 hover:text-blue-800 underline underline-offset-2 decoration-blue-700/40 hover:decoration-blue-800/70 transition-colors"
              >
                See data handling
              </a>
              .
            </motion.p>

            {/* Concrete proof */}
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="mt-10 max-w-4xl text-base md:text-lg leading-relaxed text-gray-700"
            >
              Bastion sees across every agentic deployment it monitors. Failure patterns discovered in one deployment get tested against all others. A vulnerability class that appears consistently across voice AI agents in clinical settings becomes a pricing signal for every policy in that category. There is no AI liability loss history anywhere in the market right now. Bastion is building it &mdash; and every MGA that partners with us gets access to the taxonomy that makes accurate pricing possible.
            </motion.p>
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-4xl text-base md:text-lg italic leading-relaxed text-blue-700"
            >
              This edge compounds. The more deployments, the richer the taxonomy, the more accurate the underwriting.
            </motion.p>
          </div>
        </section>

        {/* SECTION 6 — Independence */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-xl shadow-blue-500/5 p-10 md:p-16">
              <motion.h2
                variants={FADE_UP}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.08] text-gray-900"
                style={{ fontFamily: SANS }}
              >
                Why{" "}
                <span className="text-blue-600 italic font-medium">independence</span>{" "}
                matters.
              </motion.h2>
              <motion.p
                variants={FADE_UP}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.15 }}
                className="mt-8 text-base md:text-lg leading-relaxed text-gray-700"
              >
                Bastion is the independent infrastructure layer that produces the evidence your policy period requires. A carrier cannot underwrite on self-reported logs &mdash; the evidence has to come from outside the system being assessed. That independence is what makes the posture file carrier-consumable and what makes claims defensible when they&apos;re filed.
              </motion.p>
            </div>
          </div>
        </section>

        {/* PRE-FOOTER CTA */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.a
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              href="/bastion/contact/"
              className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-10 md:p-14 rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-xl shadow-blue-500/5 transition-all hover:bg-white hover:-translate-y-1 hover:shadow-blue-500/15"
            >
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-4"
                  style={{ fontFamily: MONO }}
                >
                  For Carriers / MGAs
                </p>
                <p
                  className="text-2xl md:text-3xl font-semibold tracking-[-0.015em] leading-tight text-gray-900"
                  style={{ fontFamily: SANS }}
                >
                  Underwrite agentic AI on independent telemetry.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-gray-900 shrink-0">
                Book a Walkthrough
                <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-1.5" fill="none">
                  <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </motion.a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative py-14 mt-8 border-t border-gray-200/60">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bastion/assets/bastion-logo.webp" alt="Bastion" className="h-8 w-auto opacity-90" />
              <span className="border-l border-gray-300 pl-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 leading-tight">
                Agentic Risk<br />Infrastructure
              </span>
            </div>
            <p
              className="text-[11px] text-gray-500 leading-relaxed max-w-2xl"
              style={{ fontFamily: MONO }}
            >
              <a href="mailto:info@pistonsolutions.ai" className="text-gray-700 hover:text-gray-900 transition-colors">info@pistonsolutions.ai</a>
              {" | "}Bastion is a product of Piston Solutions. Bastion does not certify, underwrite, or provide legal advice.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
