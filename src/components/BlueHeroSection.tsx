"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import cloudData from "../../public/assets/lottie/cloud-security.json";

export default function BlueHeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-36 bg-bg overflow-hidden" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-radial-soft" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-bg px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-primary">Bastion Blue</span>
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-text sm:text-6xl">
                Production defense for every AI agent
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary">
                A reverse proxy that sits between your agents and their LLM providers. Every request and response is inspected, logged, and scored before it touches your systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.99]"
              >
                Get started
              </a>
              <a
                href="#dashboard"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                See the dashboard
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right: Lottie */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex justify-center"
          >
            <Lottie animationData={cloudData} loop className="w-full max-w-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
