"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PERSONA_PRESETS: Record<string, { type: string; message: string }> = {
  dev: {
    type: "Dev team shipping AI agents",
    message: "We're shipping AI agents and want to drop Bastion into our pipeline. Tell me how to get the SDK running and what the first probe looks like.",
  },
  founder: {
    type: "Founder / engineering leader",
    message: "Enterprise security reviews are slowing our deals. I want to see what a Bastion findings report looks like and how fast we can hand one to a buyer's CISO.",
  },
  carrier: {
    type: "Insurance carrier / MGA",
    message: "We're looking at AI agent exposure. I want to see the dataset structure and how it maps to our book.",
  },
};

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [form, setForm] = useState({ name: "", email: "", organization: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const persona = params.get("persona");
    if (persona && PERSONA_PRESETS[persona]) {
      const preset = PERSONA_PRESETS[persona];
      setForm((prev) => ({ ...prev, type: preset.type, message: preset.message }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // FormSubmit delivers to team@trybastion.ai. Same email is the reply-to.
      // First-ever submission triggers a one-time activation email that must be
      // confirmed once before forwarding begins.
      const response = await fetch("https://formsubmit.co/ajax/team@trybastion.ai", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organization: form.organization,
          type: form.type,
          message: form.message,
          _subject: `New Bastion inquiry — ${form.type || "Contact"}${form.organization ? ` (${form.organization})` : ""}`,
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
    <section id="contact" className="relative py-24 md:py-32 bg-slate-950" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Left copy */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Talk to us
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-300">
                Tell us about your AI agent. We'll point our adversarial fleet at it and come back with a real finding.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">For dev teams</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Give us a phone number, point us at an endpoint, or drop in the SDK. The first probe runs the same day. Findings come back as reproducible proofs of concept with severity.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">For founders</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Enterprise security reviews kill deals. We hand you the findings report your buyer's CISO already wants, in weeks instead of months, ready to ship with your next pitch.
                  </p>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="border-t md:border-t-0 md:border-l border-white/10 bg-white/[0.02] p-8 md:p-12">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center min-h-[360px] text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/15 border border-blue-500/30">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">Message received</h3>
                  <p className="mt-2 text-sm text-gray-400">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1.5">Name</label>
                      <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Full Name"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-xs font-medium text-gray-300 mb-1.5">Organization</label>
                      <input id="organization" name="organization" type="text" required value={form.organization} onChange={handleChange} placeholder="Company Name"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1.5">Work email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="name@company.com"
                      className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-xs font-medium text-gray-300 mb-1.5">I am a...</label>
                    <select id="type" name="type" required value={form.type} onChange={handleChange}
                      className="w-full cursor-pointer rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option value="" disabled>Select</option>
                      <option value="Dev team shipping AI agents">Dev team shipping AI agents</option>
                      <option value="Founder / engineering leader">Founder / engineering leader</option>
                      <option value="Security / compliance owner">Security / compliance owner</option>
                      <option value="Insurance carrier / MGA">Insurance carrier / MGA</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-gray-300 mb-1.5">Message</label>
                    <textarea id="message" name="message" required value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your use case..."
                      className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
                  </div>

                  <button type="submit" disabled={status === "sending"}
                    className="w-full cursor-pointer rounded-full bg-blue-700 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-blue-800 transition-all disabled:opacity-50 shadow-lg shadow-blue-900/40">
                    {status === "sending" ? "Sending..." : status === "error" ? "Try again" : "Send"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
