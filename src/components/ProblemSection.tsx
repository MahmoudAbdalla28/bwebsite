"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-28 bg-bg" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="label-pill">The Problem</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
            AI is <span className="text-red font-extrabold">uninsurable</span> without data
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            ISO endorsements CG&nbsp;40&nbsp;47 and CG&nbsp;40&nbsp;48 went effective January 2026,
            letting carriers strip AI-related claims from standard policies entirely.{" "}
            <strong className="text-text font-semibold">Companies deploying agents may already be uninsured and not know it.</strong>
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-10 md:gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-6xl font-extrabold text-red sm:text-7xl leading-none">400%+</p>
              <p className="mt-2 text-sm font-medium text-text-muted uppercase tracking-widest">premium spikes</p>
            </motion.div>
            <div className="hidden md:block w-px h-16 bg-border" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-6xl font-extrabold text-red sm:text-7xl leading-none whitespace-nowrap">CG 40 47</p>
              <p className="mt-2 text-sm font-medium text-text-muted uppercase tracking-widest">AI claims excluded</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
