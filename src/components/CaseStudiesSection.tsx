"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const SANS = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";
const MONO = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

type MetricValue = number | "endorsed";

interface Metric {
  value: MetricValue;
  label: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  sector: string;
  metrics: [Metric, Metric, Metric];
  tags: string[];
  href: string;
}

const studies: CaseStudy[] = [
  {
    id: "01",
    title: "Solving the AI coverage cliff in industrial production.",
    client: "MEBA",
    sector: "Advanced Manufacturing",
    metrics: [
      {
        value: 42,
        label: "governance policies converted into enforced technical rules",
      },
      {
        value: 14,
        label: "agentic-drift incidents intercepted in 30 days",
      },
      {
        value: "endorsed",
        label:
          "Affirmative AI endorsement issued; exclusions bought back at renewal",
      },
    ],
    tags: ["Industrial AI", "Insurtech", "CGL Continuity", "Runtime Enforcement"],
    href: "/bastion/case-studies/meba/",
  },
];

function CountUp({
  to,
  inView,
  delay = 0,
}: {
  to: number;
  inView: boolean;
  delay?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, delay, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function CaseStudiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="case-studies"
      className="relative py-24 md:py-32 scroll-mt-20"
      ref={ref}
      style={{ fontFamily: SANS }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6"
        >
          <div className="max-w-3xl">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5"
              style={{ fontFamily: MONO }}
            >
              Case Studies
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.04] text-gray-900">
              Documented outcomes.{" "}
              <span className="text-blue-600 italic font-medium">In the field.</span>
            </h2>
          </div>
          <a
            href="/bastion/contact/"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500 hover:text-blue-600 transition-colors"
            style={{ fontFamily: MONO }}
          >
            Request full archive
            <svg
              viewBox="0 0 16 12"
              className="h-3 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
            >
              <path
                d="M0 6h13M9 1l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </motion.div>

        {/* Studies */}
        <div className="space-y-10 md:space-y-14">
          {studies.map((study, i) => (
            <motion.a
              key={study.id}
              href={study.href}
              initial={{ opacity: 0, y: 60, scale: 0.96, rotate: -0.4 }}
              animate={
                inView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}
              }
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              className="group relative block overflow-hidden rounded-3xl border border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-blue-500/5 hover:shadow-blue-500/20 hover:bg-white p-10 md:p-16 lg:p-20 transition-all duration-500"
            >
              {/* Top row: tags */}
              <div className="relative flex flex-wrap gap-1.5 justify-end mb-14 md:mb-20">
                {study.tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: 24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.55,
                      delay: 0.75 + idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700 bg-blue-50/80 border border-blue-100 px-3 py-1.5 rounded-full"
                    style={{ fontFamily: MONO }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Client eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative text-[12px] md:text-sm font-semibold uppercase tracking-[0.24em] text-blue-700 mb-7"
                style={{ fontFamily: MONO }}
              >
                {study.client}
                <span className="text-gray-300 mx-3">·</span>
                <span className="text-gray-500">{study.sector}</span>
              </motion.p>

              {/* Editorial title */}
              <motion.h3
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.95,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.06] text-gray-900 max-w-4xl"
              >
                {study.title}
              </motion.h3>

              {/* Metrics — the stars of the show */}
              <div className="relative mt-16 md:mt-24 grid md:grid-cols-3 gap-12 md:gap-8 pt-12 border-t border-gray-200/60">
                {study.metrics.map((m, idx) => {
                  const isNumber = typeof m.value === "number";
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 28 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.7,
                        delay: 0.9 + idx * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex flex-col"
                    >
                      {isNumber ? (
                        <span
                          className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] text-blue-600 leading-none mb-5"
                          style={{
                            fontFamily: SANS,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          <CountUp
                            to={m.value as number}
                            inView={inView}
                            delay={0.95 + idx * 0.12}
                          />
                        </span>
                      ) : (
                        <motion.div
                          initial={{ scale: 0, rotate: -18 }}
                          animate={
                            inView ? { scale: 1, rotate: -6 } : {}
                          }
                          transition={{
                            type: "spring",
                            stiffness: 110,
                            damping: 12,
                            mass: 0.7,
                            delay: 1.15,
                          }}
                          className="inline-flex items-center gap-3 self-start border-2 border-blue-600 px-4 py-2.5 rounded-md mb-5 bg-blue-50/40"
                          style={{ fontFamily: MONO }}
                        >
                          <svg
                            className="h-5 w-5 text-blue-600"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <motion.path
                              d="M3 8.5l3.5 3.5L13 4"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={inView ? { pathLength: 1 } : {}}
                              transition={{
                                duration: 0.65,
                                delay: 1.5,
                                ease: "easeInOut",
                              }}
                            />
                          </svg>
                          <span className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                            Endorsed
                          </span>
                        </motion.div>
                      )}

                      <p className="text-sm md:text-base leading-relaxed text-gray-600 max-w-[26ch]">
                        {m.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="relative mt-14 md:mt-20 pt-8 border-t border-gray-200/60 flex items-center justify-between">
                <span
                  className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gray-900 group-hover:text-blue-600 transition-colors"
                  style={{ fontFamily: MONO }}
                >
                  Read full study
                </span>
                <span className="h-12 w-12 rounded-full bg-gray-900 group-hover:bg-blue-600 flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45">
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="none"
                  >
                    <path
                      d="M5 11L11 5M11 5H6M11 5V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
