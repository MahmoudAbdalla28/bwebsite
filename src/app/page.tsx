"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Spotlight } from "@/components/ui/spotlight";

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

export default function Home() {


  return (
    <div
      className="relative min-h-screen text-gray-900 overflow-x-hidden"
      style={{ fontFamily: SANS }}
    >
      <Navbar heroTheme="dark" />

      <main className="relative z-10">

        {/* HERO — illustrated mountain landscape background */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          {/* Background image */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url(/assets/landing-mountains.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Vignette — darkens the centre so the headline reads against the bright sky */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(10, 30, 70, 0.55) 0%, rgba(10, 30, 70, 0.30) 45%, rgba(10, 30, 70, 0.10) 80%, rgba(10, 30, 70, 0) 100%)",
            }}
          />
          {/* Spotlight — sweeps in from upper-left to illuminate the headline */}
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-28 text-center w-full">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.32em] text-white"
              style={{ fontFamily: MONO, textShadow: "0 2px 6px rgba(0,0,0,0.55)" }}
            >
              AI Agent Pentesting
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: "easeOut", delay: 0.1 }}
              className="mx-auto mt-6 max-w-5xl text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[5.25rem] font-semibold tracking-[-0.025em] leading-[1.04] text-white"
              style={{ fontFamily: SANS }}
            >
              We break AI agents{" "}
              <span className="text-blue-300 italic font-medium">before your customers do.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-10 max-w-2xl rounded-2xl bg-slate-900/55 backdrop-blur-md border border-white/10 px-8 py-8 md:px-12 md:py-10 shadow-xl shadow-black/30"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
            >
              <p className="text-lg md:text-2xl font-medium leading-snug text-white">
                Adversarial testing for AI agents.
              </p>
              <p className="mt-5 text-sm md:text-base leading-relaxed text-gray-300">
                <span className="text-gray-400">Mapped to:</span>{" "}
                <span className="text-gray-100">OWASP LLM Top 10</span>
                <span className="mx-2 text-gray-500">·</span>
                <span className="text-gray-100">OWASP Agentic AI Threats</span>
                <span className="mx-2 text-gray-500">·</span>
                <span className="text-gray-100">MITRE ATLAS</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="/contact/"
                className="group inline-flex items-center gap-2.5 rounded-full bg-blue-600 hover:bg-blue-500 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_10px_30px_-8px_rgba(37,99,235,0.7)]"
              >
                Try the tool
                <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none">
                  <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/contact/"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/15 hover:border-white/50 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5"
              >
                Book a security review
                <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none">
                  <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ATTACK CATEGORIES — what we test for */}
        <section className="relative -mt-12 md:-mt-16 z-20">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-2xl shadow-blue-500/10 px-6 py-6 md:px-10 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
            >
              <div className="text-center md:px-2">
                <p
                  className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-blue-700"
                  style={{ fontFamily: SANS }}
                >
                  Jailbreaks
                </p>
                <p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-600">
                  Prompt injection, role escape, system-prompt leaks
                </p>
              </div>
              <div className="text-center md:border-x md:border-gray-200/70 md:px-4">
                <p
                  className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-blue-700"
                  style={{ fontFamily: SANS }}
                >
                  Tool misuse
                </p>
                <p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-600">
                  Unauthorized calls, parameter abuse, lateral moves
                </p>
              </div>
              <div className="text-center md:px-2">
                <p
                  className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-blue-700"
                  style={{ fontFamily: SANS }}
                >
                  Behavioral drift
                </p>
                <p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-600">
                  Off-task responses, scope violations, hallucinated commitments
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM */}
        {/* WHAT BASTION DOES — single comprehensive explainer (replaces old Solution panel) */}
        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl"
            >
              <p
                className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-700 mb-5"
                style={{ fontFamily: MONO }}
              >
                What Bastion does
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-gray-900"
                style={{ fontFamily: SANS }}
              >
                Continuous{" "}
                <span className="text-blue-600/80 italic font-medium">adversarial testing</span>{" "}
                for AI agents.
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-700 max-w-3xl">
                Bastion connects to your AI agent through the SDK, an endpoint, or a phone number. An autonomous fleet of adversarial agents probes it. Every finding ships as a reproducible proof of concept with a severity score. It re-runs on every change, so a new model or prompt can&apos;t quietly reopen what you already fixed.
              </p>
            </motion.div>

            <div className="mt-20 md:mt-28 space-y-24 md:space-y-32">
              {[
                {
                  n: "01",
                  t: "Connect",
                  sub: "Drop in the SDK, or give us an endpoint or a phone number.",
                  b: "Text and voice agents, nothing to rebuild. Bastion plugs into what's already running.",
                },
                {
                  n: "02",
                  t: "Attack",
                  sub: "A fleet of autonomous agents adapts mid-conversation.",
                  b: "It chains tool calls and tests who can reach what. Not a fixed checklist, a live adversary.",
                },
                {
                  n: "03",
                  t: "Prove",
                  sub: "Every finding ships with a safe proof of concept and a severity.",
                  b: "Verbatim evidence, fully reproducible. Your team can replay every exploit and verify the fix.",
                },
                {
                  n: "04",
                  t: "Continuous",
                  sub: "It re-runs as the agent changes.",
                  b: "A new model or prompt cannot quietly reopen what you already fixed. The test surface evolves with the agent.",
                },
              ].map((s, i) => {
                const isOdd = i % 2 === 1;
                return (
                  <motion.div
                    key={s.n}
                    variants={isOdd ? FADE_RIGHT : FADE_LEFT}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-10 md:gap-16 items-start"
                  >
                    <div className={isOdd ? "md:col-start-2" : ""}>
                      <h3
                        className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] text-blue-700"
                        style={{ fontFamily: SANS }}
                      >
                        {s.t}
                      </h3>
                      <p className="mt-5 text-lg md:text-xl leading-snug text-gray-800">
                        {s.sub}
                      </p>
                      <p className="mt-5 text-base md:text-lg leading-relaxed text-gray-600">
                        {s.b}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-16 md:mt-20"
            >
              <p
                className="text-sm md:text-base font-bold tracking-[0.18em] text-blue-700 mb-8"
                style={{ fontFamily: MONO }}
              >
                What it catches:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                {CATCHES.map((c) => (
                  <div key={c.title}>
                    <h4 className="text-base md:text-lg font-semibold tracking-[-0.01em] text-gray-900 leading-snug">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>



        {/* WHY YOUR STACK MISSES IT — TABLED 2026-05-28 (toggle false → true to restore) */}
        {false && (
        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-3xl mb-14 text-center mx-auto"
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
                style={{ fontFamily: MONO }}
              >
                Beyond Your Stack
              </p>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] text-gray-900"
                style={{ fontFamily: SANS }}
              >
                Why your stack doesn&apos;t see this.
              </h2>
              <p className="mt-7 text-base md:text-lg leading-relaxed text-gray-600">
                You&apos;ve got MDR, an MSSP running your SIEM, prompt guardrails, maybe an AI gateway. Each was designed for a different category of risk. None were built for an agent that changes its own behavior between deployments. Agentic failure happens at the intersection none of them cover.
              </p>
            </motion.div>

            {/* Comparison table */}
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-xl shadow-blue-500/5 px-6 md:px-10 py-3 md:py-5"
            >
              {/* Header row */}
              <div
                className="hidden md:grid grid-cols-12 gap-6 py-4 border-b border-gray-200/60 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500"
                style={{ fontFamily: MONO }}
              >
                <div className="col-span-3">Tool</div>
                <div className="col-span-4">What it catches</div>
                <div className="col-span-5">What it misses</div>
              </div>

              {[
                {
                  tool: "MDR / EDR",
                  catches: "Endpoint compromise, malicious processes, credential abuse.",
                  misses: "Semantic agent behavior. Tool-call chains. Logic drift inside the inference loop.",
                },
                {
                  tool: "MSSP / SIEM",
                  catches: "Log correlation across infrastructure, alert triage at scale.",
                  misses: "Prompt-time intent. Model swaps that silently move the agent outside its declared boundaries.",
                },
                {
                  tool: "Prompt Guardrails",
                  catches: "Known malicious prompts, basic prompt injection signatures.",
                  misses: "Tool-chain composition attacks. Scope-boundary manipulation. Vectors not in their training set.",
                },
                {
                  tool: "In-house Red Team",
                  catches: "The vectors you thought to test, before you shipped.",
                  misses: "Failure classes that emerge after deployment. Patterns no single team has seen yet.",
                },
                {
                  tool: "AI Gateway",
                  catches: "Throughput, key rotation, cost ceilings, basic logging.",
                  misses: "Adversarial validation. Regulatory mapping. The evidence file your carrier or regulator can act on.",
                },
              ].map((row, i) => (
                <motion.div
                  key={row.tool}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-5 md:py-6 border-b border-gray-200/40 last:border-0"
                >
                  <div
                    className="col-span-1 md:col-span-3 text-[13px] md:text-sm font-semibold tracking-[0.04em] text-gray-900"
                    style={{ fontFamily: MONO }}
                  >
                    {row.tool}
                  </div>
                  <div className="col-span-1 md:col-span-4 text-sm leading-relaxed text-gray-600">
                    <span
                      className="md:hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400 block mb-1"
                      style={{ fontFamily: MONO }}
                    >
                      Catches
                    </span>
                    {row.catches}
                  </div>
                  <div className="col-span-1 md:col-span-5 text-sm leading-relaxed text-blue-700 font-medium">
                    <span
                      className="md:hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-700/60 block mb-1"
                      style={{ fontFamily: MONO }}
                    >
                      Misses
                    </span>
                    {row.misses}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        )}



        {/* PROBLEM — story moved to bottom, before final CTA */}
        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-120px" }}
              className="mx-auto max-w-4xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-[-0.02em] leading-[1.12] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              Buyers won&apos;t sign without proof the agent is safe.{" "}
              <span className="text-blue-600/80">Sellers have no proof to offer.</span>
            </motion.h2>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-20 grid md:grid-cols-2 gap-6"
            >
              <GlassProblemCard
                eyebrow="AI Agents Are Shipping Broken"
                title="Companies are finding out from incidents, not audits."
                body="Air Canada's chatbot invented a refund policy and courts held the airline liable. Chevrolet's bot got prompt-injected into selling a Tahoe for $1. Replit's agent ignored 11 code-freeze orders, wiped production, then fabricated 4,000 fake users to cover it. Hallucination, prompt injection, autonomous destruction. Every one of these failures was findable in advance."
                cta="See what we test"
                ctaHref="/contact/"
                slideFrom="left"
              />
              <GlassProblemCard
                eyebrow="The Procurement Wall"
                title="Six-month security reviews, in six weeks."
                body="Enterprise security reviews take six months. The CISO wants pen-test evidence the agent is safe. Sellers don't have it, so deals stall, or die. Bastion delivers the same artifact in six weeks: same-day run, ready to ship with the next pitch."
                cta="Try the tool"
                ctaHref="/contact/"
                slideFrom="right"
              />
            </motion.div>
          </div>
        </section>

        {/* DUAL CTA */}
        <section className="relative py-20 md:py-28">
          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-6"
          >
            <motion.a
              variants={FADE_LEFT}
              href="/contact/"
              className="group flex flex-col justify-between gap-12 p-10 md:p-14 rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-xl shadow-blue-500/5 transition-all hover:bg-white hover:-translate-y-1 hover:shadow-blue-500/15"
            >
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
                  style={{ fontFamily: MONO }}
                >
                  Self-serve
                </p>
                <p
                  className="text-2xl md:text-3xl font-semibold tracking-[-0.015em] leading-tight text-gray-900"
                  style={{ fontFamily: SANS }}
                >
                  Drop in the SDK and see what breaks.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-gray-900">
                Try the tool
                <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-1.5" fill="none">
                  <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </motion.a>
            <motion.a
              variants={FADE_RIGHT}
              href="/contact/"
              className="group flex flex-col justify-between gap-12 p-10 md:p-14 rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-xl shadow-blue-500/5 transition-all hover:bg-white hover:-translate-y-1 hover:shadow-blue-500/15"
            >
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
                  style={{ fontFamily: MONO }}
                >
                  Talk to us
                </p>
                <p
                  className="text-2xl md:text-3xl font-semibold tracking-[-0.015em] leading-tight text-gray-900"
                  style={{ fontFamily: SANS }}
                >
                  Walk through your agent with our team.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-gray-900">
                Book a security review
                <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-1.5" fill="none">
                  <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="relative py-14 mt-8 border-t border-gray-200/60">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/bastion-logo.webp" alt="Bastion" className="h-8 w-auto opacity-90" />
              <span className="border-l border-gray-300 pl-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 leading-tight">
                Adversarial Testing<br />for AI
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

/* ─────────────── Glass cards (light) ─────────────── */

function GlassProblemCard({
  eyebrow,
  title,
  body,
  cta,
  ctaHref,
  slideFrom,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  ctaHref: string;
  slideFrom: "left" | "right";
}) {
  const variant = slideFrom === "left" ? FADE_LEFT : FADE_RIGHT;
  return (
    <motion.div
      variants={variant}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="rounded-[30px] p-10 md:p-12 transition-all"
      style={{
        background: "#f0f0f0",
        boxShadow: "15px 15px 30px #cfcfcf, -15px -15px 30px #ffffff",
      }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-900 mb-6"
        style={{ fontFamily: MONO }}
      >
        — {eyebrow}
      </p>
      <h3
        className="text-2xl md:text-3xl font-semibold tracking-[-0.015em] leading-tight text-gray-900 mb-6"
        style={{ fontFamily: SANS }}
      >
        {title}
      </h3>
      <p className="text-sm md:text-base leading-relaxed text-gray-900">{body}</p>
      <a
        href={ctaHref}
        className="mt-8 group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-blue-600 hover:text-blue-700 transition-colors"
      >
        {cta}
        <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-1" fill="none">
          <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </a>
    </motion.div>
  );
}

const CATCHES = [
  {
    title: "Jailbreaks & injection",
    body: "Crafted and hidden inputs that get the agent off-policy. The way in, not the prize.",
  },
  {
    title: "Tool & action abuse",
    body: "Driving the agent to call tools and reach systems it never should.",
  },
  {
    title: "Authorization & cross-user data",
    body: "One user reaching another's data or actions through the agent. Where the real damage lives.",
  },
  {
    title: "Live voice agents",
    body: "Real adversarial phone calls against telephony agents. The surface almost no one can test.",
  },
  {
    title: "Behavioral drift",
    body: "The agent quietly stops following policy as it ships new versions.",
  },
];

