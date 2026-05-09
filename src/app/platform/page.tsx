"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Vortex } from "@/components/ui/vortex";

const KnowledgeGraphDemo = dynamic(
  () => import("@/components/KnowledgeGraphDemo"),
  { ssr: false },
);

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
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const PIPELINE = [
  {
    number: "01",
    title: "External Probe",
    sub: "Adversarial QA on the public surface.",
    body: "We attack your public-facing agent — phone number, chatbot endpoint, API. Prompt injection, scope-boundary manipulation, tool-chain composition attacks, jailbreaks. No SDK on your side, no data shared, no install. Your agent is probed exactly the way an attacker would probe it.",
    note: "No integration required to start. We probe from outside.",
  },
  {
    number: "02",
    title: "Knowledge Graph",
    sub: "Your deployment-specific failure surface.",
    body: "Every finding gets encoded into a structured map of how your agent fails — not its intended behavior. Vectors, severity, the path through your tool-chain. A living model of your real failure surface, not a generic threat list.",
    note: "Re-built on every model, prompt, corpus, or tool-chain change.",
  },
  {
    number: "03",
    title: "CI/CD Re-attestation",
    sub: "Every change triggers a regression pass.",
    body: "A new model version. A prompt change. An infra update you didn't control. Each one runs against the Knowledge Graph automatically. Did this change introduce a pattern we've already proven is dangerous? Did it move the agent outside its declared boundaries?",
    note: "Automatic. Hooks into your existing CI/CD.",
  },
  {
    number: "04",
    title: "Runtime Pattern Matching",
    sub: "Production traffic checked against the verified surface.",
    body: "In production, every live interaction is checked against the Knowledge Graph. Not generic anomaly detection — specific pattern matching against your known failure vectors. When a real interaction approaches a vector we've already proven dangerous, Bastion flags it before it becomes an incident.",
    note: "Sub-millisecond overhead. Out-of-band by default; inline when enforcement is enabled.",
  },
  {
    number: "05",
    title: "Posture File",
    sub: "The artifact your regulator can act on.",
    body: "A continuously versioned evidence file. Every adversarial finding, every CI/CD pass, every runtime observation — mapped to your specific regulatory framework. FDA PCCP, ISO 14971, NIST AI RMF, EU AI Act, NAIC. When someone asks you to prove the agent behaved, this is what you hand them.",
    note: "Carrier-panel format. Regulator-defensible. Tamper-evident.",
  },
];

const AUDIENCES = [
  {
    eyebrow: "For Enterprises",
    title: "Deploying AI agents in production.",
    body: "Security and platform engineering own the deploy. Risk and compliance often hold the budget because of the insurance angle. Bastion drops in without an SDK rewrite and produces the evidence file your legal, audit, and risk teams have been asking for.",
    triggers: [
      "FDA submissions and post-market change reports",
      "Enterprise procurement reviews and AI liability questionnaires",
      "Board-level AI risk briefings",
      "Annual SOC 2, ISO 42001, and NIST AI RMF attestations",
    ],
    ctaLabel: "Book an Assessment",
    ctaHref: "/bastion/contact/",
  },
  {
    eyebrow: "For Carriers / MGAs",
    title: "Underwriting agentic AI policies.",
    body: "You cannot write affirmative AI coverage on a self-attested questionnaire. Bastion is the independent telemetry layer your policy period requires — pre-bind, in-force, and at renewal. We do not underwrite. We produce the evidence file your carrier panel can consume.",
    triggers: [
      "Pre-bind risk posture without asking the client to integrate",
      "In-force monitoring across the policy period",
      "Renewal pricing on policy-long evidence, not point-in-time questionnaires",
      "Active intervention before claims are filed",
    ],
    ctaLabel: "MGA / Carrier Partner",
    ctaHref: "/bastion/insurance/",
  },
  {
    eyebrow: "For Regulators & Auditors",
    title: "Verifying agentic AI compliance.",
    body: "When the question is whether an agent stayed within its declared boundaries across every interaction, every update, every change — the answer is in the posture file. Bastion produces the documented evidence trail that converts opinion into fact.",
    triggers: [
      "FDA Predetermined Change Control Plan reviews",
      "EU AI Act high-risk system audits (Articles 9–15)",
      "NAIC Model Bulletin compliance evidence",
      "ISO 14971 risk-management dossiers",
    ],
    ctaLabel: "Reach Out",
    ctaHref: "/bastion/contact/",
  },
];

const VERTICALS = [
  { name: "Healthcare & Life Sciences", regs: "FDA PCCP · ISO 14971" },
  { name: "Financial Services", regs: "NAIC · CBB Module SG" },
  { name: "Industrial & Critical Infrastructure", regs: "ISO 14971 · IEC 61508" },
  { name: "Insurance & InsurTech", regs: "NAIC · State DOIs" },
  { name: "Legal & Professional Services", regs: "NIST AI RMF · State bar AI rules" },
  { name: "SaaS & AI Vendors", regs: "ISO 42001 · NIST AI RMF" },
];

export default function PlatformPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAudience, setSelectedAudience] = useState<number | null>(null);
  return (
    <div
      className="relative min-h-screen text-gray-900 overflow-x-hidden"
      style={{ fontFamily: SANS }}
    >
      <Navbar />

      <main className="relative z-10">
        {/* HERO — WebGL projection scene as full-bleed background */}
        <section className="relative overflow-hidden min-h-[700px] md:min-h-[820px] lg:min-h-[900px]">
          {/* Vortex — transparent particle bg lets the page mesh show through */}
          <Vortex
            backgroundColor="transparent"
            baseHue={210}
            rangeHue={30}
            containerClassName="absolute inset-0"
            className="w-full h-full"
          >
            <div className="relative z-10 mx-auto max-w-6xl px-6 pt-40 pb-24 md:pt-52 md:pb-28 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: "easeOut" }}
                className="mx-auto max-w-5xl text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[5rem] font-semibold tracking-[-0.025em] leading-[1.04] text-gray-900"
                style={{ fontFamily: SANS }}
              >
                How Bastion turns agent risk into{" "}
                <span className="text-blue-600 italic font-medium">evidence.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto mt-10 max-w-3xl text-base md:text-lg leading-relaxed text-gray-700"
              >
                Independent adversarial QA. A versioned posture file. Continuous runtime telemetry. One pipeline, three layers, every regulated AI deployment &mdash; without asking your client to integrate anything.
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
                  Book a Walkthrough
                  <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none">
                    <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#how"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 hover:bg-white hover:border-gray-300 px-7 py-3.5 text-[14px] font-semibold text-gray-900 transition-all hover:-translate-y-0.5 shadow-sm"
                >
                  See How It Works
                  <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-y-0.5" fill="none">
                    <path d="M8 1v10M3 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </Vortex>
        </section>

        {/* HOW — 5-step pipeline */}
        <section id="how" className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center max-w-3xl mx-auto"
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
                style={{ fontFamily: MONO }}
              >
                How It Works
              </p>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] text-gray-900"
                style={{ fontFamily: SANS }}
              >
                From external probe to{" "}
                <span className="text-blue-600 italic font-medium">runtime evidence.</span>
              </h2>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-gray-600">
                Five layers, one continuous evidence trail. Every layer is auditable, mapped to your regulatory framework, and re-attested on every change.
              </p>
            </motion.div>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {PIPELINE.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <motion.div
                    key={step.number}
                    variants={FADE_UP}
                    layout
                    transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                    className={`relative rounded-3xl border overflow-hidden transition-colors duration-300 ${
                      isActive
                        ? "bg-white/80 backdrop-blur-xl border-blue-200/70 shadow-xl shadow-blue-500/10"
                        : "bg-white/40 backdrop-blur-md border-gray-200/40 hover:bg-white/60 hover:border-gray-200/60"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(isActive ? -1 : i)}
                      className="w-full text-left grid md:grid-cols-12 gap-6 md:gap-10 px-8 md:px-10 py-7 md:py-8 cursor-pointer"
                    >
                      <div className="md:col-span-2 flex items-baseline md:items-start">
                        <span
                          className={`text-4xl md:text-5xl font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                            isActive ? "text-blue-600" : "text-blue-600/25"
                          }`}
                          style={{ fontFamily: SANS }}
                        >
                          {step.number}
                        </span>
                      </div>

                      <div className="md:col-span-9 flex flex-col justify-center">
                        <h3
                          className={`text-xl md:text-2xl font-semibold tracking-[-0.015em] transition-colors duration-300 ${
                            isActive ? "text-gray-900" : "text-gray-700"
                          }`}
                          style={{ fontFamily: SANS }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`mt-1 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                            isActive ? "text-blue-700" : "text-gray-400"
                          }`}
                          style={{ fontFamily: MONO }}
                        >
                          {step.sub}
                        </p>
                      </div>

                      <div className="md:col-span-1 flex items-center justify-end md:justify-end">
                        <motion.svg
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          viewBox="0 0 24 24"
                          className={`h-5 w-5 transition-colors duration-300 ${
                            isActive ? "text-blue-600" : "text-gray-400"
                          }`}
                          fill="none"
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </motion.svg>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: 8 }}
                            animate={{ y: 0 }}
                            exit={{ y: 8 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                            className="grid md:grid-cols-12 gap-6 md:gap-10 px-8 md:px-10 pb-8 md:pb-10"
                          >
                            <div className="md:col-span-2" />
                            <div className="md:col-span-10 max-w-3xl">
                              <p className="text-base leading-relaxed text-gray-600">
                                {step.body}
                              </p>
                              <p
                                className="mt-5 text-xs italic leading-relaxed text-gray-500"
                                style={{ fontFamily: MONO }}
                              >
                                {step.note}
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* KNOWLEDGE GRAPH — interactive demo of what the pipeline produces (desktop+ only) */}
        <section className="relative py-24 md:py-32 hidden md:block">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
                style={{ fontFamily: MONO }}
              >
                Try it yourself
              </p>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] text-gray-900"
                style={{ fontFamily: SANS }}
              >
                The evidence layer,{" "}
                <span className="text-blue-600 italic font-medium">live.</span>
              </h2>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-gray-600">
                Click any node — agent, tool, policy, finding — to see the facts Bastion has indexed. Filter by source to see what came from telemetry, what came from policy docs, what came from Red findings.
              </p>
            </motion.div>

            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <KnowledgeGraphDemo />
            </motion.div>
          </div>
        </section>

        {/* WHO — three audiences */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center max-w-3xl mx-auto"
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
                style={{ fontFamily: MONO }}
              >
                Who It&apos;s For
              </p>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] text-gray-900"
                style={{ fontFamily: SANS }}
              >
                Three audiences.{" "}
                <span className="text-blue-600 italic font-medium">One evidence layer.</span>
              </h2>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-gray-600">
                The same posture file is consumable by the people building the agent, the people writing the policy, and the people checking the work.
              </p>
            </motion.div>

            <div className="relative min-h-[420px] md:min-h-[480px]">
              <AnimatePresence mode="wait">
                {selectedAudience === null ? (
                  <motion.div
                    key="rotating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <p
                      className="text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-gray-400 mb-10"
                      style={{ fontFamily: MONO }}
                    >
                      Click a name to see how it fits
                    </p>

                    <div
                      className="relative h-[330px] md:h-[420px] overflow-hidden"
                      style={{
                        // Fade names in at the top and out at the bottom via alpha mask —
                        // no overlay divs, no backdrop blur, the page mesh shows through cleanly.
                        maskImage:
                          "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
                      }}
                    >
                      <motion.div
                        initial={{ y: "-50%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 14,
                          ease: "linear",
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                        className="flex flex-col"
                      >
                        {[...AUDIENCES, ...AUDIENCES].map((aud, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedAudience(i % AUDIENCES.length)}
                            className="h-[110px] md:h-[140px] flex items-center justify-center text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-gray-300 hover:text-blue-600 active:text-blue-700 transition-colors duration-300 cursor-pointer text-center px-6"
                            style={{ fontFamily: SANS }}
                          >
                            {aud.eyebrow}
                          </button>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative grid md:grid-cols-12 gap-10 md:gap-16 pt-4"
                  >
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => setSelectedAudience(null)}
                      className="absolute top-0 right-0 h-11 w-11 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/60 hover:bg-white hover:border-blue-300 flex items-center justify-center group transition-colors z-10"
                      aria-label="Close"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors"
                        fill="none"
                      >
                        <path
                          d="M3 3l10 10M13 3L3 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>

                    {/* Left: title */}
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      className="md:col-span-5 flex flex-col justify-center md:sticky md:top-32 md:self-start md:pr-6"
                    >
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-6"
                        style={{ fontFamily: MONO }}
                      >
                        {AUDIENCES[selectedAudience].eyebrow}
                      </p>
                      <h3
                        className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-gray-900 leading-[1.1]"
                        style={{ fontFamily: SANS }}
                      >
                        {AUDIENCES[selectedAudience].title}
                      </h3>
                    </motion.div>

                    {/* Right: info */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      className="md:col-span-7 flex flex-col pr-14 md:pr-16"
                    >
                      <p className="text-base md:text-lg leading-relaxed text-gray-600">
                        {AUDIENCES[selectedAudience].body}
                      </p>

                      <div className="mt-8 pt-6 border-t border-gray-200/60">
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500 mb-4"
                          style={{ fontFamily: MONO }}
                        >
                          Where It Triggers
                        </p>
                        <ul className="space-y-3">
                          {AUDIENCES[selectedAudience].triggers.map((t) => (
                            <li
                              key={t}
                              className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-gray-700"
                            >
                              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={AUDIENCES[selectedAudience].ctaHref}
                        className="mt-10 inline-flex items-center gap-2 self-start rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 shadow-md shadow-blue-500/30"
                      >
                        {AUDIENCES[selectedAudience].ctaLabel}
                        <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none">
                          <path
                            d="M0 6h13M9 1l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* VERTICALS */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-12 items-end">
              <motion.h2
                variants={FADE_LEFT}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-5 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.08] text-gray-900"
                style={{ fontFamily: SANS }}
              >
                Built for{" "}
                <span className="text-blue-600 italic font-medium">regulated</span>{" "}
                AI deployments.
              </motion.h2>
              <motion.p
                variants={FADE_RIGHT}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-7 text-base md:text-lg leading-relaxed text-gray-600"
              >
                Vertical-specific pattern libraries, mapped to the regulatory frameworks that matter in each industry. Every new engagement makes the library sharper for everyone in that vertical &mdash; without ever exposing customer data.
              </motion.p>
            </div>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {VERTICALS.map((v) => (
                <motion.div
                  key={v.name}
                  variants={FADE_UP}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="group rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-md shadow-blue-500/5 hover:shadow-blue-500/15 hover:bg-white p-6 md:p-7 transition-shadow"
                >
                  <h4
                    className="text-base md:text-lg font-semibold tracking-[-0.01em] text-gray-900"
                    style={{ fontFamily: SANS }}
                  >
                    {v.name}
                  </h4>
                  <p
                    className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700"
                    style={{ fontFamily: MONO }}
                  >
                    {v.regs}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
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
                  See It Run
                </p>
                <p
                  className="text-2xl md:text-3xl font-semibold tracking-[-0.015em] leading-tight text-gray-900"
                  style={{ fontFamily: SANS }}
                >
                  Pre-underwriting probe in 30 minutes. Posture file in under a week. Production enforcement at 30 days.
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
            <div className="flex flex-wrap items-center gap-8">
              <a href="/bastion/faq/" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
              <a href="/bastion/contact/" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <p
              className="text-[11px] text-gray-500 leading-relaxed max-w-2xl"
              style={{ fontFamily: MONO }}
            >
              <a href="mailto:info@pistonsolutions.ai" className="text-gray-700 hover:text-gray-900 transition-colors">info@pistonsolutions.ai</a>
              {" | "}Bastion is a product of Piston Solutions.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
