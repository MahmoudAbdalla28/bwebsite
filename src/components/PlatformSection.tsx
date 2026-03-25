"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Lottie from "lottie-react";
import networkData from "../../public/assets/lottie/network-nodes.json";
import scanData from "../../public/assets/lottie/scan-animation.json";

export default function PlatformSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSide, setActiveSide] = useState<"blue" | "red">("blue");

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
            Two sides of one shield
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary">
            Find vulnerabilities before deployment. Monitor and enforce in production.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Bastion Blue */}
            <div
              className={`group cursor-pointer rounded-2xl border p-8 transition-all duration-300 ${
                activeSide === "blue"
                  ? "border-primary/30 bg-white shadow-xl shadow-primary/5"
                  : "border-border bg-white hover:border-primary/20 hover:shadow-md"
              }`}
              onClick={() => setActiveSide("blue")}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-bg p-2.5">
                  <svg viewBox="1 0 22 26" className="h-full w-full" fill="none" stroke="#0D6EFD" strokeWidth="1.5">
                    <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text">Bastion Blue</h3>
                  <p className="text-sm text-primary">Defense & Monitoring</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary">
                Reverse proxy that intercepts every LLM API call. Scans, validates,
                logs, and generates carrier-grade telemetry. No changes to your
                agent code. Nothing leaves your infrastructure.
              </p>

              {/* Lottie animation */}
              <div className="mt-6 rounded-xl bg-bg-alt p-4">
                <Lottie animationData={networkData} loop className="h-32 w-full" />
              </div>

              {/* Phase flow */}
              <div className="mt-6 flex items-center gap-3 text-xs font-medium">
                <span className="rounded-full bg-primary-bg px-3 py-1 text-primary">Monitor</span>
                <svg viewBox="0 0 16 8" className="h-2 w-4 text-text-dim" fill="none"><path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
                <span className="rounded-full bg-primary-bg px-3 py-1 text-primary">Enforce</span>
                <svg viewBox="0 0 16 8" className="h-2 w-4 text-text-dim" fill="none"><path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
                <span className="rounded-full bg-primary-bg px-3 py-1 text-primary-light">Report</span>
              </div>
            </div>

            {/* Bastion Red */}
            <div
              className={`group cursor-pointer rounded-2xl border p-8 transition-all duration-300 ${
                activeSide === "red"
                  ? "border-red/30 bg-white shadow-xl shadow-red/5"
                  : "border-border bg-white hover:border-red/20 hover:shadow-md"
              }`}
              onClick={() => setActiveSide("red")}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-bg p-2.5">
                  <svg viewBox="1 0 22 26" className="h-full w-full" fill="none" stroke="#DC2626" strokeWidth="1.5">
                    <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text">Bastion Red</h3>
                  <p className="text-sm text-red">Offensive Testing</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary">
                Agentic AI SDK for scenario-based pen-testing. Autonomous probes
                that extract system prompts, discover secrets, and map defense
                architectures before you deploy.
              </p>

              {/* Lottie animation */}
              <div className="mt-6 rounded-xl bg-bg-alt p-4">
                <Lottie animationData={scanData} loop className="h-32 w-full" />
              </div>

              {/* Phase flow */}
              <div className="mt-6 flex items-center gap-3 text-xs font-medium">
                <span className="rounded-full bg-red-bg px-3 py-1 text-red">Probe</span>
                <svg viewBox="0 0 16 8" className="h-2 w-4 text-text-dim" fill="none"><path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
                <span className="rounded-full bg-primary-bg px-3 py-1 text-primary-light">Discover</span>
                <svg viewBox="0 0 16 8" className="h-2 w-4 text-text-dim" fill="none"><path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
                <span className="rounded-full bg-primary-bg px-3 py-1 text-primary">Defend</span>
              </div>
            </div>
          </div>

          {/* Feedback loop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6 rounded-xl border border-border bg-white p-5 text-center"
          >
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center text-sm font-medium">
              <span className="text-red">Red finds vulnerabilities</span>
              <svg viewBox="0 0 40 12" className="h-3 w-10 hidden md:block text-text-dim" fill="none">
                <path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-primary">Blue enforces the fix</span>
              <svg viewBox="0 0 40 12" className="h-3 w-10 hidden md:block text-text-dim" fill="none">
                <path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-primary">Carrier prices the coverage</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
