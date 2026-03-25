"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import shieldData from "../../public/assets/lottie/shield-protection.json";

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-primary">The challenge</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">
              Companies must contend with complex AI risks
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary">
              AI agents are making real decisions with real consequences. But
              carriers can't see inside these systems. So they're either
              excluding AI from coverage entirely, or pricing it so high that
              deployment doesn't make financial sense.
            </p>

            <div className="mt-8 space-y-5">
              {[
                { stat: "400%+", desc: "premium spikes when carriers can't quantify AI risk" },
                { stat: "CG 40 47", desc: "ISO endorsement lets carriers strip AI claims from standard policies (effective Jan 2026)" },
              ].map((item, i) => (
                <motion.div
                  key={item.stat}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="text-2xl font-bold text-primary sm:text-3xl whitespace-nowrap">{item.stat}</span>
                  <span className="text-sm text-text-muted">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Lottie animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Soft glow behind */}
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />
              <Lottie
                animationData={shieldData}
                loop
                className="relative w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
