"use client";

import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ParticleNetwork = dynamic(() => import("./ParticleNetwork"), { ssr: false });

const cyclingWords = ["insurable", "auditable", "quantifiable"];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % cyclingWords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg-alt">
      {/* Particle Network — Cisco-style generative sphere */}
      <div className="absolute inset-0 hidden md:block">
        <ParticleNetwork />
      </div>

      {/* Dot pattern background */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />

      {/* Left-side text readability gradient */}
      {/* Left readability zone, right stays clear for particles */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-alt via-bg-alt/50 to-transparent w-[55%]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-alt to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-40 md:pb-20 min-h-[80vh] flex flex-col justify-center">
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="label-pill">AI Liability Telematics</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-2xl text-5xl font-semibold leading-[1.1] tracking-tight text-text sm:text-6xl lg:text-7xl"
        >
          Make AI agents{" "}
          <span className="relative inline-block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={cyclingWords[wordIndex]}
                className="gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                {cyclingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
        >
          <strong className="text-text font-semibold">Runtime telemetry</strong> that gives carriers the data to underwrite AI liability. Deploy on client infrastructure in minutes.
        </motion.p>

        {/* CTAs — clean, blue primary like Cisco */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#brokerages"
            className="btn-glow rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            For Brokerages
          </a>
          <a
            href="#platform"
            className="group flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-dark cursor-pointer"
          >
            How it works
            <svg viewBox="0 0 20 12" className="h-3 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none">
              <path d="M0 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
