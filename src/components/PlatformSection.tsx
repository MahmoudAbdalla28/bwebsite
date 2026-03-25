"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import networkData from "../../public/assets/lottie/network-nodes.json";

export default function PlatformSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="platform" className="relative py-24 md:py-32 bg-bg-alt" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-primary">The Platform</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            Unified Agent Defense
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary">
            Singular AI protection for every request. Bastion Blue sits between
            your agents and model providers to observe, enforce, and report risk
            with zero changes to agent code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <div className="rounded-2xl border border-primary/30 bg-white p-8 shadow-xl shadow-primary/5">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-bg p-2.5">
                    <svg viewBox="1 0 22 26" className="h-full w-full" fill="none" stroke="#0D6EFD" strokeWidth="1.5">
                      <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text">Bastion Blue</h3>
                    <p className="text-sm text-primary">Monitor, Enforce, Report</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-text-secondary">
                  Reverse proxy that intercepts every LLM API call. It scans inputs,
                  validates tool behavior, logs events, and produces carrier-ready
                  telemetry while keeping all raw traffic on your infrastructure.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium">
                  <span className="rounded-full bg-primary-bg px-3 py-1 text-primary">Monitor</span>
                  <svg viewBox="0 0 16 8" className="h-2 w-4 text-text-dim" fill="none"><path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
                  <span className="rounded-full bg-primary-bg px-3 py-1 text-primary">Enforce</span>
                  <svg viewBox="0 0 16 8" className="h-2 w-4 text-text-dim" fill="none"><path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
                  <span className="rounded-full bg-primary-bg px-3 py-1 text-primary-light">Report</span>
                </div>
              </div>

              <div>
                <div className="rounded-xl bg-bg-alt p-4">
                  <Lottie animationData={networkData} loop className="h-40 w-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
