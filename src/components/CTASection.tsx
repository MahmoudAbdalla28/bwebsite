"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [form, setForm] = useState({ name: "", email: "", organization: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://pistonsolutions.ai/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `TYPE: ${form.type}\nORG: ${form.organization}\n\n${form.message}`,
        }),
      });

      if (!response.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-white overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Left copy */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Get in touch
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                AI agents need telemetry to be insurable. We build it.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-border bg-bg-alt p-4">
                  <p className="text-sm font-semibold text-text">For enterprises</p>
                  <p className="mt-1 text-xs text-text-muted">
                    30-day pilot on your infrastructure. We generate the telemetry
                    your carrier needs to price the policy.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-bg-alt p-4">
                  <p className="text-sm font-semibold text-text">For carriers and brokers</p>
                  <p className="mt-1 text-xs text-text-muted">
                    Co-define what AI risk telemetry should look like.
                    Shape the underwriting standard for insurable AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="border-t md:border-t-0 md:border-l border-border bg-bg-alt p-8 md:p-12">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center min-h-[360px] text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-bg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-text">Message received</h3>
                  <p className="mt-2 text-sm text-text-muted">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-text-secondary mb-1.5">Name</label>
                      <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Smith"
                        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-xs font-medium text-text-secondary mb-1.5">Organization</label>
                      <input id="organization" name="organization" type="text" required value={form.organization} onChange={handleChange} placeholder="Acme Corp"
                        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-text-secondary mb-1.5">Work email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@company.com"
                      className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-xs font-medium text-text-secondary mb-1.5">I am a...</label>
                    <select id="type" name="type" required value={form.type} onChange={handleChange}
                      className="w-full cursor-pointer rounded-lg border border-border bg-white px-4 py-3 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="" disabled>Select</option>
                      <option value="Enterprise deploying AI">Enterprise deploying AI agents</option>
                      <option value="Insurance carrier">Insurance carrier</option>
                      <option value="Insurance broker">Insurance broker</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-text-secondary mb-1.5">Message</label>
                    <textarea id="message" name="message" required value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your use case..."
                      className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>

                  <button type="submit" disabled={status === "sending"}
                    className="w-full cursor-pointer rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark transition-all disabled:opacity-50">
                    {status === "sending" ? "Sending..." : status === "error" ? "Try again" : "Request a briefing"}
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
