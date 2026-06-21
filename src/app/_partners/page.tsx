"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SANS = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";
const MONO = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

const FADE_UP = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const PARTNERS = [
  {
    eyebrow: "Carriers & MGAs",
    title: "Underwriting agentic AI policies.",
    body: "You cannot write affirmative AI coverage on a self-attested questionnaire. Bastion is the independent telemetry layer your policy period requires: pre-bind, in-force, and at renewal. We do not underwrite. We produce the evidence file your carrier panel can consume.",
    triggers: [
      "Pre-bind risk posture without asking the client to integrate",
      "In-force monitoring across the policy period",
      "Renewal pricing on policy-long evidence, not point-in-time questionnaires",
      "Active intervention before claims are filed",
    ],
    ctaLabel: "Partner with Bastion",
    ctaHref: "/contact/",
  },
  {
    eyebrow: "Auditors",
    title: "Verifying agentic AI compliance.",
    body: "When the question is whether an agent stayed within its declared boundaries across every interaction, every update, every change, the answer is in the posture file. Bastion produces the documented evidence trail that converts opinion into fact, mapped at section-level granularity to the framework your audit is anchored on.",
    triggers: [
      "FDA Predetermined Change Control Plan reviews",
      "EU AI Act high-risk system audits (Articles 9-15)",
      "NAIC Model Bulletin compliance evidence",
      "ISO 14971 risk-management dossiers",
    ],
    ctaLabel: "Partner with Bastion",
    ctaHref: "/contact/",
  },
  {
    eyebrow: "Compliance Firms",
    title: "Delivering AI compliance to your enterprise clients.",
    body: "Your clients are running AI agents and asking you the same question every month: does this meet the framework? Bastion is the evidence engine you can deliver against. We handle the continuous probing, attestation, and runtime monitoring; you own the client relationship and the strategic compliance work.",
    triggers: [
      "White-labelled posture reports for client deliverables",
      "Continuous re-attestation as part of your retainer",
      "Framework coverage across FDA, ISO, NIST, EU AI Act, NAIC",
      "Co-delivery on AI-specific procurement reviews",
    ],
    ctaLabel: "Partner with Bastion",
    ctaHref: "/contact/",
  },
];

export default function PartnersPage() {
  return (
    <div
      className="relative min-h-screen text-gray-900 overflow-x-hidden"
      style={{ fontFamily: SANS }}
    >
      <Navbar />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative pt-36 md:pt-44 pb-20 md:pb-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-700"
              style={{ fontFamily: MONO }}
            >
              Partners
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.025em] leading-[1.05] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              Bastion partners with the people who{" "}
              <span className="text-blue-600/80 italic font-medium">
                price, audit, and certify
              </span>{" "}
              agentic AI.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-7 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-gray-700"
            >
              Bastion sells direct to enterprises deploying AI agents. The carriers underwriting the risk, the auditors signing off on the controls, and the compliance firms delivering the program all sit alongside the customer, and rely on the same evidence. If that&apos;s you, this is where to start.
            </motion.p>
          </div>
        </section>

        {/* PARTNER SECTIONS */}
        <section className="relative pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-6 md:gap-8"
            >
              {PARTNERS.map((p) => (
                <motion.div
                  key={p.eyebrow}
                  variants={FADE_UP}
                  className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/70 shadow-lg shadow-blue-500/5 p-8 md:p-10 grid md:grid-cols-12 gap-8 md:gap-10"
                >
                  <div className="md:col-span-5">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700"
                      style={{ fontFamily: MONO }}
                    >
                      {p.eyebrow}
                    </p>
                    <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.015em] text-gray-900 leading-snug">
                      {p.title}
                    </h2>
                    <a
                      href={p.ctaHref}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
                    >
                      {p.ctaLabel} <span aria-hidden>→</span>
                    </a>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      {p.body}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {p.triggers.map((t) => (
                        <li
                          key={t}
                          className="flex gap-3 text-[13px] md:text-sm text-gray-700"
                        >
                          <span
                            aria-hidden
                            className="mt-2 inline-block h-1 w-1 rounded-full bg-blue-600 shrink-0"
                          />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="relative pb-24 md:pb-32">
          <div className="mx-auto max-w-5xl px-6">
            <motion.a
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              href="/contact/"
              className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-10 md:p-14 rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-xl shadow-blue-500/5 transition-all hover:bg-white hover:-translate-y-1 hover:shadow-blue-500/15"
            >
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-4"
                  style={{ fontFamily: MONO }}
                >
                  Become a Bastion Partner
                </p>
                <p
                  className="text-2xl md:text-3xl font-semibold tracking-[-0.015em] leading-tight text-gray-900"
                  style={{ fontFamily: SANS }}
                >
                  Tell us how you work with regulated AI. We&apos;ll show you the evidence layer your clients are about to ask for.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-gray-900 shrink-0">
                Reach Out
                <svg
                  viewBox="0 0 16 12"
                  className="h-3 w-4 transition-transform group-hover:translate-x-1.5"
                  fill="none"
                >
                  <path
                    d="M0 6h13M9 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
