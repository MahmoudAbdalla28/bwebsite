"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function InsurerCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 md:py-28 bg-bg" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-sm border border-primary/20 bg-primary-bg p-8 md:p-12 text-center"
        >
          <p className="text-sm font-semibold text-primary">For Carriers &amp; MGAs</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Underwrite the AI era. Affirmatively.
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-text-secondary">
            Embed continuous AI risk telemetry into your underwriting flow.
            Active monitoring of agentic risk across your insureds, mapped to
            CG 40 47 / CG 40 48 buybacks, Tech E&amp;O, and Cyber lines.
            Co-define the underwriting standard for the AI era.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@pistonsolutions.ai"
              className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all cursor-pointer"
            >
              info@pistonsolutions.ai
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
