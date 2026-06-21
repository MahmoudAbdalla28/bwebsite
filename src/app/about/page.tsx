"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SANS = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";
const MONO = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

const PROBLEM_POINTS = [
  {
    num: "01",
    body: "Jailbreaks, prompt injection, tool misuse: agents fail in production, and companies find out from incidents instead of audits.",
  },
  {
    num: "02",
    body: "Buyers won't sign without proof the agent is safe. Sellers have no proof to offer. Nobody is stress-testing these systems before they ship.",
  },
  {
    num: "03",
    body: "The agentic economy doesn't scale until someone breaks these things first.",
  },
];

const ATTACK_CATEGORIES = [
  {
    num: "01",
    title: "Jailbreaks & prompt injection.",
    body: "Forcing the agent past its guardrails through crafted inputs.",
  },
  {
    num: "02",
    title: "Tool misuse & decision chains.",
    body: "Tricking the agent into calling tools it shouldn't, or in the wrong order.",
  },
  {
    num: "03",
    title: "Behavioral drift.",
    body: "Detecting when the agent slowly stops doing what it was supposed to do.",
  },
];

const TRACTION = [
  {
    name: "GitHub",
    body: "The world's largest software development platform, used by over 100 million developers and hosting 420 million repositories globally.",
  },
  {
    name: "Priceline",
    body: "One of the world's largest online travel platforms, serving tens of millions of travelers across 220+ countries every year.",
  },
  {
    name: "Chatbase",
    body: "One of the leading no-code AI chatbot builders, powering conversations for millions of end-users across 10,000+ businesses in 140+ countries.",
  },
  {
    name: "Scorpion",
    body: "One of the largest digital marketing agencies for local businesses, with 10,000+ clients reaching millions of customers across the US annually.",
  },
];

const MOTIONS = [
  {
    audience: "For AI-native startups",
    title: "Six-month security reviews, in six weeks.",
    body: "Enterprise security reviews kill deals. A Bastion report is the artifact the CISO already wants — and the founder can buy it with a credit card, run it the same day, and ship it with the next pitch.",
  },
  {
    audience: "For enterprises with internal agents",
    title: "Devs add it to CI/CD. No top-down sale.",
    body: "Engineers create an account and drop Bastion into their pipeline. Every agent build gets adversarially tested before merge. Adoption starts where the agents are built — enterprise contract follows the usage.",
  },
];

const MOAT = [
  {
    num: "01",
    title: "We break an agent",
    body: "Custom attack run against a real customer deployment.",
  },
  {
    num: "02",
    title: "Attack goes in the library",
    body: "Every novel vector becomes a permanent test case.",
  },
  {
    num: "03",
    title: "Library tests the next agent",
    body: "Every future customer benefits from every prior engagement.",
  },
  {
    num: "04",
    title: "Dataset compounds",
    body: "Cross-customer risk intelligence competitors cannot replicate.",
  },
];

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen text-gray-900 bg-white overflow-x-hidden"
      style={{ fontFamily: SANS }}
    >
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 border-b border-gray-200">
          <div className="mx-auto max-w-5xl px-6">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-500 mb-6"
              style={{ fontFamily: MONO }}
            >
              Pre-Seed 2026
            </p>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.025em] leading-[0.95] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              Bastion.
            </h1>
            <p className="mt-8 max-w-3xl text-xl md:text-2xl leading-snug text-gray-800">
              We break AI agents{" "}
              <span className="italic text-blue-600 font-medium">
                before your customers do.
              </span>
            </p>
            <p className="mt-6 max-w-3xl text-base md:text-lg text-gray-600 leading-relaxed">
              Adversarial testing for AI agents, mapped to{" "}
              <span className="font-semibold text-gray-900">OWASP LLM Top 10</span>,{" "}
              <span className="font-semibold text-gray-900">OWASP Agentic AI Threats</span>, and{" "}
              <span className="font-semibold text-gray-900">MITRE ATLAS</span>.
            </p>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="relative py-20 md:py-24 border-b border-gray-200">
          <div className="mx-auto max-w-5xl px-6">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-700 mb-5"
              style={{ fontFamily: MONO }}
            >
              01 / The Problem
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              AI agents are shipping broken.
            </h2>
            <ul className="mt-10 space-y-6">
              {PROBLEM_POINTS.map((p) => (
                <li key={p.num} className="flex gap-5 items-start">
                  <span
                    className="shrink-0 text-base md:text-lg font-bold text-blue-600 leading-snug mt-0.5"
                    style={{ fontFamily: MONO }}
                  >
                    {p.num}
                  </span>
                  <p className="text-base md:text-lg leading-relaxed text-gray-800">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TRACTION — WITH CUSTOMER NAMES */}
        <section className="relative py-20 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="mx-auto max-w-6xl px-6">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-700 mb-5"
              style={{ fontFamily: MONO }}
            >
              02 / Traction
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              We break what others ship.
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              Agents in which we have successfully found vulnerabilities:
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {TRACTION.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl bg-white border border-gray-200 p-6"
                >
                  <p
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: SANS }}
                  >
                    {t.name}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-gray-700">
                    {t.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-3xl text-base md:text-lg text-gray-800 leading-relaxed">
              From low-severity exposures to critical PII leakages,{" "}
              <span className="font-semibold text-gray-900">
                these industry-leading companies couldn&apos;t find what we did.
              </span>
            </p>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="relative py-20 md:py-24 bg-gray-900 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-400 mb-5"
              style={{ fontFamily: MONO }}
            >
              03 / The Solution
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-white"
              style={{ fontFamily: SANS }}
            >
              Adversarial testing for AI agents.
            </h2>
            <p className="mt-3 text-lg md:text-xl text-gray-300">
              Built for how agents actually fail.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {ATTACK_CATEGORIES.map((a) => (
                <div
                  key={a.num}
                  className="rounded-2xl bg-gray-50 text-gray-900 p-7"
                >
                  <p
                    className="text-sm font-bold text-blue-600"
                    style={{ fontFamily: MONO }}
                  >
                    {a.num}
                  </p>
                  <p className="mt-5 text-lg font-semibold tracking-[-0.005em] leading-snug">
                    {a.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-sm md:text-base text-gray-400 leading-relaxed">
              All findings mapped to{" "}
              <span className="font-semibold text-gray-200">OWASP LLM Top 10</span>,{" "}
              <span className="font-semibold text-gray-200">OWASP Agentic AI Threats</span>,{" "}
              <span className="font-semibold text-gray-200">MITRE ATLAS</span>. Tested once or continuously on every build.
            </p>
          </div>
        </section>

        {/* THE WEDGE */}
        <section className="relative py-20 md:py-24 bg-white border-b border-gray-200">
          <div className="mx-auto max-w-6xl px-6">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-700 mb-5"
              style={{ fontFamily: MONO }}
            >
              04 / The Wedge
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              Path of least resistance to market.
            </h2>
            <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-gray-700">
              Adversarial testing for AI agents, mapped to the technical frameworks security teams actually run on:{" "}
              <span className="font-semibold text-gray-900">
                OWASP LLM Top 10, OWASP Agentic AI Threats, MITRE ATLAS.
              </span>
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOTIONS.map((m) => (
                <div
                  key={m.audience}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-7 md:p-9"
                >
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700"
                    style={{ fontFamily: MONO }}
                  >
                    {m.audience}
                  </p>
                  <h3
                    className="mt-4 text-xl md:text-2xl font-semibold tracking-[-0.01em] text-gray-900 leading-snug"
                    style={{ fontFamily: SANS }}
                  >
                    {m.title}
                  </h3>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-700">
                    {m.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center italic text-blue-700 text-base md:text-lg font-semibold">
              Two motions. One dataset. Every engagement sharpens the next.
            </p>
          </div>
        </section>

        {/* COMPOUNDING MOAT */}
        <section className="relative py-20 md:py-24 bg-gray-900 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-400 mb-5"
              style={{ fontFamily: MONO }}
            >
              05 / Compounding Moat
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-white"
              style={{ fontFamily: SANS }}
            >
              Every test sharpens the next.
            </h2>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {MOAT.map((m, i) => (
                <div
                  key={m.num}
                  className={`rounded-2xl p-6 flex flex-col ${
                    i === 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  <p
                    className={`text-sm font-bold ${
                      i === 3 ? "text-white/80" : "text-blue-600"
                    }`}
                    style={{ fontFamily: MONO }}
                  >
                    {m.num}
                  </p>
                  <p className="mt-4 text-base md:text-lg font-semibold tracking-[-0.005em] leading-snug">
                    {m.title}
                  </p>
                  <p
                    className={`mt-3 text-[13px] leading-relaxed ${
                      i === 3 ? "text-white/85" : "text-gray-700"
                    }`}
                  >
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 md:py-24 bg-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-gray-900"
              style={{ fontFamily: SANS }}
            >
              Talk to the founders.
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              Pre-Seed 2026. Building the adversarial testing layer the agentic economy doesn&apos;t have yet.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors shadow-md shadow-blue-500/30"
              >
                Reach out
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
