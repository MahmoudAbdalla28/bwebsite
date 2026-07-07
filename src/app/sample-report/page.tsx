"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SANS = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";
const MONO = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

// Lead-qualification note: Role = CEO/Founder or Head of Sales/Revenue flags a
// revenue-owner lead for priority follow-up. Role and agent type ride along in
// the message body until a real CRM integration exists.
export default function SampleReportPage() {
  const [form, setForm] = useState({ email: "", company: "", role: "", agent: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // FormSubmit delivers to team@trybastion.ai. First-ever submission triggers
      // a one-time activation email that must be confirmed once before forwarding.
      const response = await fetch("https://formsubmit.co/ajax/team@trybastion.ai", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          type: "Sample report request",
          email: form.email,
          company: form.company,
          role: form.role,
          agent: form.agent,
          _subject: `Sample report request — ${form.company || form.email}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden bg-slate-950"
      style={{ fontFamily: SANS }}
    >
      <Navbar heroTheme="dark" />

      <main className="relative z-10">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 0%, rgba(37,99,235,0.22) 0%, rgba(15,23,42,0) 70%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-20 md:pt-44 md:pb-28">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Left copy */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p
                  className="text-xs md:text-sm font-bold uppercase tracking-[0.32em] text-blue-400 mb-6"
                  style={{ fontFamily: MONO }}
                >
                  Sample Report
                </p>
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.08] text-white"
                  style={{ fontFamily: SANS }}
                >
                  See what your buyer&apos;s security team{" "}
                  <span className="text-blue-400 italic font-medium">would receive.</span>
                </h1>
                <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-300">
                  A redacted Bastion assessment from a real engagement: executive summary, findings with severity and remediation status, and the full framework mapping reviewers look for.
                </p>
                <ul className="mt-7 space-y-3">
                  {[
                    "Mapped to OWASP LLM Top 10, OWASP Top 10 for Agentic Applications, and MITRE ATLAS",
                    "Alignment notes for ISO 42001 and NIST AI RMF",
                    "Coverage timestamp tied to the shipped agent version",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg viewBox="0 0 16 16" className="h-4 w-4 mt-1 text-blue-400 flex-shrink-0" fill="currentColor" aria-hidden>
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.78 5.97a.75.75 0 0 0-1.06-.02L6.75 9.94 5.28 8.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5a.75.75 0 0 0 0-1.06Z" />
                      </svg>
                      <span className="text-sm md:text-base leading-relaxed text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
              >
                {status === "sent" ? (
                  <div className="flex flex-col items-center justify-center min-h-[320px] text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/15 border border-blue-500/30">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">Request received</h3>
                    <p className="mt-2 text-sm text-gray-400 max-w-xs">
                      We&apos;ll email you the sample report within 24 hours. Want findings on your own agent instead?
                    </p>
                    <a
                      href="/contact/"
                      className="mt-6 group inline-flex items-center gap-2.5 rounded-full bg-blue-700 hover:bg-blue-600 px-6 py-3 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-blue-900/40"
                    >
                      Book a demo
                      <svg viewBox="0 0 16 12" className="h-3 w-4 transition-transform group-hover:translate-x-0.5" fill="none">
                        <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1.5">Work email</label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="name@company.com"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-medium text-gray-300 mb-1.5">Company</label>
                      <input id="company" name="company" type="text" required value={form.company} onChange={handleChange} placeholder="Company name"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-xs font-medium text-gray-300 mb-1.5">Role</label>
                      <select id="role" name="role" required value={form.role} onChange={handleChange}
                        className="w-full cursor-pointer rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option value="" disabled>Select</option>
                        <option value="CEO / Founder">CEO / Founder</option>
                        <option value="Head of Sales / Revenue">Head of Sales / Revenue</option>
                        <option value="CTO / Engineering">CTO / Engineering</option>
                        <option value="Security">Security</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="agent" className="block text-xs font-medium text-gray-300 mb-1.5">What agent are you shipping?</label>
                      <input id="agent" name="agent" type="text" required value={form.agent} onChange={handleChange} placeholder="e.g. voice support agent for clinics"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <button type="submit" disabled={status === "sending"}
                      className="w-full cursor-pointer rounded-full bg-blue-700 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-blue-800 transition-all disabled:opacity-50 shadow-lg shadow-blue-900/40">
                      {status === "sending" ? "Sending..." : status === "error" ? "Try again" : "Send me the sample report"}
                    </button>
                    <p className="text-[11px] text-gray-500 text-center">
                      Delivered to your inbox within 24 hours.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
