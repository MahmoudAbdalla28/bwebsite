"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SANS = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";
const MONO = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const STEPS = [
  {
    num: "01",
    title: "Adversarial testing",
    body: "We pentest live agents for jailbreaks, tool abuse, data exfiltration, and drift. Every probe is a controlled loss event, recorded.",
  },
  {
    num: "02",
    title: "A compounding dataset",
    body: "Each finding becomes a structured record. Across customers it compounds into risk intelligence no point-in-time audit can match.",
  },
  {
    num: "03",
    title: "Underwriting-native output",
    body: "Frequency and severity by agent class and deployment context, mapped to existing wordings. The substrate carriers price against.",
  },
];

const FIELDS = [
  { label: "Failure class", value: "jailbreak, tool abuse, drift" },
  { label: "Frequency", value: "events per 1,000 sessions" },
  { label: "Severity", value: "data class by impact tier" },
  { label: "Timing", value: "time-to-detect, time-to-contain" },
  { label: "Drift", value: "posture delta on every change" },
  { label: "Context", value: "industry, pattern, model family" },
];

const COMPARISON = [
  { row: "Live loss data", audit: "No", internal: "No", bastion: "Yes" },
  { row: "Updates on model change", audit: "No", internal: "Weeks", bastion: "Auto" },
  { row: "Cross-customer dataset", audit: "No", internal: "No", bastion: "Yes" },
  { row: "Severity quantification", audit: "Partial", internal: "Manual", bastion: "Structured" },
  { row: "Maps to existing wordings", audit: "No", internal: "No", bastion: "Yes" },
];

const ENGAGE = [
  {
    title: "Pilot the dataset",
    body: "Score 90 days of Bastion findings against a current AI E&O or cyber book. Find where today's exclusions would resolve to priced coverage.",
  },
  {
    title: "Co-develop a rider",
    body: "Build an AI-agent endorsement around the telemetry. Bastion supplies the data definitions; the carrier owns the product.",
  },
  {
    title: "License the data",
    body: "Feed the hazard library and frequency tables into existing pricing and accumulation models on a quarterly refresh.",
  },
];

export default function InsurancePage() {
  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden bg-slate-950"
      style={{ fontFamily: SANS }}
    >
      <Navbar heroTheme="dark" />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 0%, rgba(37,99,235,0.22) 0%, rgba(15,23,42,0) 70%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-16 md:pt-48 md:pb-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-xs md:text-sm font-bold uppercase tracking-[0.32em] text-blue-400"
              style={{ fontFamily: MONO }}
            >
              For Underwriting, Product &amp; Actuarial Leads
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: "easeOut", delay: 0.1 }}
              className="mx-auto mt-6 max-w-4xl text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.05] text-white"
              style={{ fontFamily: SANS }}
            >
              The risk data layer for{" "}
              <span className="text-blue-400 italic font-medium">AI agent coverage.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-gray-300"
            >
              With no loss history for AI agents, carriers exclude the exposure instead of pricing it. Bastion generates the missing data: continuous adversarial pentests against live agents, every finding structured into a cross-customer loss dataset carriers underwrite against.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-10"
            >
              <a
                href="/contact/?persona=carrier"
                className="group inline-flex items-center gap-2.5 rounded-full bg-blue-700 hover:bg-blue-600 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_10px_30px_-8px_rgba(37,99,235,0.7)]"
              >
                Talk to us
                <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none">
                  <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        {/* FROM TESTING TO UNDERWRITING */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-white mb-12"
              style={{ fontFamily: SANS }}
            >
              From adversarial testing{" "}
              <span className="text-blue-400 italic font-medium">to underwriting.</span>
            </motion.h2>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {STEPS.map((s) => (
                <motion.div
                  key={s.num}
                  variants={FADE_UP}
                  className="flex flex-col rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg shadow-blue-500/5 p-7 md:p-8"
                >
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-500 mb-4"
                    style={{ fontFamily: MONO }}
                  >
                    {s.num}
                  </p>
                  <h3
                    className="text-xl md:text-2xl font-semibold tracking-[-0.01em] text-white leading-snug"
                    style={{ fontFamily: SANS }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-300">{s.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHAT THE DATASET CARRIES */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-10"
            >
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-white"
                style={{ fontFamily: SANS }}
              >
                What the dataset carries.
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-400 max-w-2xl">
                Per-deployment fields, structured for direct ingest into pricing and accumulation models.
              </p>
            </motion.div>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {FIELDS.map((f) => (
                <motion.div
                  key={f.label}
                  variants={FADE_UP}
                  className="rounded-xl bg-white/[0.03] border border-white/10 px-5 py-4 flex items-baseline gap-3"
                >
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-400 whitespace-nowrap"
                    style={{ fontFamily: MONO }}
                  >
                    {f.label}
                  </span>
                  <span className="text-sm text-gray-300">{f.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-white mb-12"
              style={{ fontFamily: SANS }}
            >
              What you have today vs.{" "}
              <span className="text-blue-400 italic font-medium">what Bastion produces.</span>
            </motion.h2>

            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg shadow-blue-500/5 overflow-hidden"
            >
              {/* Header */}
              <div
                className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2 px-5 md:px-8 py-4 border-b border-white/10 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500"
                style={{ fontFamily: MONO }}
              >
                <div />
                <div className="text-center">Point-in-time audit</div>
                <div className="text-center">Internal review</div>
                <div className="text-center text-blue-400">Bastion</div>
              </div>
              {COMPARISON.map((r) => (
                <div
                  key={r.row}
                  className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2 px-5 md:px-8 py-4 border-b border-white/[0.06] last:border-0 items-center"
                >
                  <div className="text-[13px] md:text-sm font-medium text-gray-200">{r.row}</div>
                  <div className="text-center text-[13px] md:text-sm text-gray-500">{r.audit}</div>
                  <div className="text-center text-[13px] md:text-sm text-gray-500">{r.internal}</div>
                  <div className="text-center text-[13px] md:text-sm font-semibold text-blue-400">{r.bastion}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW A CARRIER CAN ENGAGE */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-white mb-12"
              style={{ fontFamily: SANS }}
            >
              How a carrier{" "}
              <span className="text-blue-400 italic font-medium">can engage.</span>
            </motion.h2>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {ENGAGE.map((e) => (
                <motion.div
                  key={e.title}
                  variants={FADE_UP}
                  className="flex flex-col rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg shadow-blue-500/5 p-7 md:p-8"
                >
                  <h3
                    className="text-xl md:text-2xl font-semibold tracking-[-0.01em] text-blue-400 leading-snug"
                    style={{ fontFamily: SANS }}
                  >
                    {e.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-300">{e.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY NOW + CTA */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl shadow-blue-500/5 p-10 md:p-14 text-center"
            >
              <p
                className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-500 mb-5"
                style={{ fontFamily: MONO }}
              >
                Why now
              </p>
              <p
                className="text-xl md:text-2xl font-medium leading-relaxed text-white max-w-3xl mx-auto"
                style={{ fontFamily: SANS }}
              >
                AI exclusions are spreading across cyber and E&amp;O. Carriers writing AI risk today are pricing blind. The carrier holding the underlying dataset shapes the wordings, and the rates.
              </p>
              <div className="mt-9">
                <a
                  href="/contact/?persona=carrier"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-blue-700 hover:bg-blue-600 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_10px_30px_-8px_rgba(37,99,235,0.7)]"
                >
                  Start the conversation
                  <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none">
                    <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
