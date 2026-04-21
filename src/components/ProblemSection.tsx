"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-20 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-sm font-semibold text-primary">The problem</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            AI is uninsurable without data
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            ISO endorsements CG 40 47 and CG 40 48 went effective January 2026,
            letting carriers strip AI-related claims from standard policies entirely.
            Companies deploying agents may already be uninsured and not know it.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-primary sm:text-3xl">400%+</span>
              <span className="text-sm text-text-muted">premium spikes</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-primary sm:text-3xl whitespace-nowrap">CG 40 47</span>
              <span className="text-sm text-text-muted">AI claims excluded</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
