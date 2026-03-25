"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleNetwork = dynamic(() => import("./ParticleNetwork"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bg-alt">
      {/* Particle Network — Cisco-style generative sphere */}
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>

      {/* Dot pattern background */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />

      {/* Left-side text readability gradient */}
      {/* Left readability zone, right stays clear for particles */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-alt via-bg-alt/50 to-transparent w-[55%]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-alt to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-40 md:pb-20 min-h-[80vh] flex flex-col justify-center">
        {/* Breadcrumb-style label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-text-muted"
        >
          AI Security
        </motion.p>

        {/* Headline — left aligned, large, clean like Cisco */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-2xl text-5xl font-semibold leading-[1.1] tracking-tight text-text sm:text-6xl lg:text-7xl"
        >
          The defense layer to deploy
          <br />
          <span className="gradient-text">your AI solutions</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary"
        >
          End-to-end monitoring and control for enterprises deploying AI agents.
          Turn blackbox systems into glassbox with quantifiable, managed risks.
        </motion.p>

        {/* CTAs — clean, blue primary like Cisco */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Request a demo
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
