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
    body: "We attack your public-facing agent: phone number, chatbot endpoint, API. Prompt injection, scope-boundary manipulation, tool-chain composition attacks, jailbreaks. No SDK on your side, no data shared, no install. Your agent is probed exactly the way an attacker would probe it.",
    note: "No integration required to start. We probe from outside.",
  },
  {
    number: "02",
    title: "Knowledge Graph",
    sub: "Your deployment-specific failure surface.",
    body: "Every finding gets encoded into a structured map of how your agent fails, not its intended behavior. Vectors, severity, the path through your tool-chain. A living model of your real failure surface, not a generic threat list.",
    note: "Re-built on every model, prompt, corpus, or tool-chain change.",
  },
  {
    number: "03",
    title: "Continuous Re-attestation",
    sub: "Every change re-tested against the proven failure surface.",
    body: "A new model version. A prompt change. A new tool or knowledge update. Each one runs against the Knowledge Graph automatically. Did this change reintroduce a pattern we've already proven is dangerous? Did it move the agent outside its declared boundaries? You see the answer before the change reaches your customers.",
    note: "Automatic. Triggered the moment your agent changes.",
  },
  {
    number: "04",
    title: "Runtime Pattern Matching",
    sub: "Production traffic checked against the verified surface.",
    body: "In production, every live interaction is checked against the Knowledge Graph. Not generic anomaly detection: specific pattern matching against your known failure vectors. When a real interaction approaches a vector we've already proven dangerous, Bastion flags it before it becomes an incident.",
    note: "Sub-millisecond overhead. Out-of-band by default; inline when enforcement is enabled.",
  },
  {
    number: "05",
    title: "Posture File",
    sub: "The artifact your regulator can act on.",
    body: "A continuously versioned evidence file. Every adversarial finding, every re-attestation, every runtime observation, mapped to your specific regulatory framework. FDA PCCP, ISO 14971, HIPAA, NIST AI RMF, EU AI Act, NAIC. When someone asks you to prove the agent behaved, this is what you hand them.",
    note: "Carrier-panel format. Regulator-defensible. Tamper-evident.",
  },
];

const AUDIENCES = [
  {
    eyebrow: "For Enterprises",
    title: "Deploying AI agents in production.",
    body: "The Chief Compliance Officer and CISO own this decision. The CEO unblocks the procurement cycle. Bastion produces the evidence file your legal, audit, and risk teams have been asked to prove, without a months-long buildout. Your SOC 2 and ISO 27001 programs prove your infrastructure is secure. Bastion is the regulatory framework infrastructure that proves your AI agent is, a category neither was built to address.",
    triggers: [
      "FDA submissions and post-market change reports",
      "Enterprise procurement reviews and AI liability questionnaires",
      "Board-level AI risk briefings",
      "Annual SOC 2, ISO 42001, and NIST AI RMF attestations",
    ],
    ctaLabel: "Book an Assessment",
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
                Click any node (agent, tool, policy, finding) to see the facts Bastion has indexed. Filter by source to see what came from telemetry, what came from policy docs, what came from Red findings.
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

        {/* WHO — built for enterprises */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 md:mb-14 text-center max-w-3xl mx-auto"
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
                Built for enterprises{" "}
                <span className="text-blue-600 italic font-medium">deploying AI agents.</span>
              </h2>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-gray-600">
                The posture file is built for the compliance owner who has to defend it, the executive who has to close the deal, and the auditor who has to sign off.
              </p>
            </motion.div>

            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-5xl rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/70 shadow-lg shadow-blue-500/5 p-8 md:p-12 grid md:grid-cols-12 gap-10 md:gap-14"
            >
              <div className="md:col-span-5 flex flex-col">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
                  style={{ fontFamily: MONO }}
                >
                  {AUDIENCES[0].eyebrow}
                </p>
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-gray-900 leading-[1.1]"
                  style={{ fontFamily: SANS }}
                >
                  {AUDIENCES[0].title}
                </h3>
                <a
                  href={AUDIENCES[0].ctaHref}
                  className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 shadow-md shadow-blue-500/30"
                >
                  {AUDIENCES[0].ctaLabel}
                  <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none">
                    <path
                      d="M0 6h13M9 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>

              <div className="md:col-span-7">
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  {AUDIENCES[0].body}
                </p>

                <div className="mt-8 pt-6 border-t border-gray-200/60">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500 mb-4"
                    style={{ fontFamily: MONO }}
                  >
                    Where It Triggers
                  </p>
                  <ul className="space-y-3">
                    {AUDIENCES[0].triggers.map((t) => (
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
              </div>
            </motion.div>

            {/* Partner pointer */}
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-8 text-center text-[12px] md:text-[13px] text-gray-600"
            >
              Carrier, MGA, auditor, or compliance firm?{" "}
              <a
                href="/bastion/partners/"
                className="font-semibold text-blue-700 hover:text-blue-900"
              >
                See how we partner →
              </a>
            </motion.p>
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
                  Pre-underwriting probe in 30 minutes. Posture report in 24 hours. Audit-ready in 2 weeks.
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
