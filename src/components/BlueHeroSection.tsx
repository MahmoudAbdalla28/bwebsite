"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import shieldData from "../../public/assets/lottie/shield-3d.json";

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
              <h1 className="text-5xl font-bold tracking-tight text-text sm:text-6xl">
                Production <span className="gradient-text">Defense</span> for Every AI Agent
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary">
                Continuous runtime visibility into every AI agent in your fleet. <strong className="text-text font-semibold">Every request and response is captured, scored, and made auditable.</strong> Out-of-band by default, with optional inline enforcement when you need it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="/bastion/contact/"
                className="btn-glow inline-flex items-center rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.99]"
              >
                Get started
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
            <Lottie animationData={shieldData} loop className="w-full max-w-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
