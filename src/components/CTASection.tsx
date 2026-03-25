"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg shadow-black/5">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                  Ready to make your AI fleet secured?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  30-day pilot. On your infrastructure. See what your agents are
                  really doing, and give your carrier the data they need.
                </p>
                <div className="mt-8 space-y-3">
                  {["Deploy in under 15 minutes", "Zero data leaves your network", "Carrier-ready telemetry at the end"].map((p) => (
                    <div key={p} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-text-secondary">{p}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="border-t border-border bg-bg-alt p-8 md:border-l md:border-t-0 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {submitted ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-bg">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-text">We&apos;ll be in touch</h3>
                    <p className="mt-2 text-sm text-text-muted">Expect a response within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { id: "name", label: "Full name", type: "text", placeholder: "Jane Smith" },
                      { id: "email", label: "Work email", type: "email", placeholder: "jane@company.com" },
                      { id: "company", label: "Company", type: "text", placeholder: "Acme Corp" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-text-secondary">{field.label}</label>
                        <input
                          id={field.id} name={field.id} type={field.type} required
                          placeholder={field.placeholder}
                          className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-dim transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    ))}

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-text-secondary">I am a...</label>
                      <select id="role" name="role" required defaultValue=""
                        className="mt-1.5 w-full cursor-pointer rounded-lg border border-border bg-white px-4 py-3 text-sm text-text transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="ops">Head of AI Operations</option>
                        <option value="caio">Chief AI Officer</option>
                        <option value="dpo">Data Privacy Officer</option>
                        <option value="cto">CTO / Technical Leader</option>
                        <option value="broker">Insurance Broker</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full cursor-pointer rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.01] active:scale-[0.99]">
                      Request a demo
                    </button>
                    <p className="text-center text-xs text-text-dim">No commitment required.</p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
