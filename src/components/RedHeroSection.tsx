"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import radarData from "../../public/assets/lottie/radar.json";

export default function RedHeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-bg p-2.5">
                <svg viewBox="1 0 22 26" className="h-full w-full" fill="none" stroke="#DC2626" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" strokeLinecap="round" />
                  <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-red">Bastion Red</p>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-text sm:text-6xl">
              Find what breaks before attackers do
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary max-w-xl">
              Autonomous adversarial testing campaigns that adapt to your AI agent&apos;s
              defenses in real time. Point it at any endpoint, define a scope, and let
              multi-turn attack strategies probe for weaknesses you did not know existed.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <a
                href="#contact"
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.99]"
              >
                Run a probe
              </a>
              <a
                href="#docs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                See documentation
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right: Lottie radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <Lottie animationData={radarData} loop className="w-full max-w-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
