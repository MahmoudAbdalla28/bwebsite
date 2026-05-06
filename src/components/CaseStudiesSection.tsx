"use client";

import { useState, useRef, Fragment } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* Bold numbers (and adjacent units like "30 days") inside a string */
function boldNumbers(text: string) {
  const splitRegex = /(\d+(?:[.,]\d+)?(?:\s*(?:days?|hours?|ms|%|x))?)/g;
  return text.split(splitRegex).map((part, i) =>
    /^\d/.test(part)
      ? <strong key={i} className="font-bold text-text">{part}</strong>
      : <Fragment key={i}>{part}</Fragment>
  );
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  briefing: string;
  results: string[];
  tags: string[];
  images?: { src: string; alt: string }[];
  href?: string;
}

const studies: CaseStudy[] = [
  {
    id: "01",
    title: "Solving the AI Coverage Cliff in Industrial Production",
    client: "MEBA (Advanced Manufacturing)",
    briefing:
      "As MEBA moved toward an AI-augmented production model, new generative AI exclusions threatened to void their CGL policy for any agentic error. Bastion was deployed as the technical underwriting layer covering runtime enforcement, knowledge graph governance, and continuous adversarial assessment, providing the structured evidence MEBA's insurer required to issue an affirmative AI endorsement.",
    results: [
      "42 governance policies converted into enforced technical rules",
      "14 agentic-drift incidents intercepted and contained over 30 days",
      "Affirmative AI endorsement issued; exclusions bought back at renewal",
    ],
    tags: ["Industrial AI", "Insurtech", "CGL Continuity", "Runtime Enforcement"],
    href: "/bastion/case-studies/meba/",
  },
];

export default function CaseStudiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [open, setOpen] = useState<CaseStudy | null>(null);

  return (
    <>
      <section id="case-studies" className="relative py-24 md:py-32 bg-bg border-t border-border-light scroll-mt-20" ref={ref}>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-4">Case Studies</p>
              <h2 className="text-3xl font-bold tracking-tight text-text sm:text-5xl max-w-2xl">
                Documented Outcomes.{" "}
                <span className="gradient-text">In the Field.</span>
              </h2>
            </div>
            <a
              href="/bastion/contact/"
              className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-dim hover:text-primary transition-colors"
            >
              Request full archive
              <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none">
                <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <div className="grid gap-6">
            {studies.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                onClick={() => {
                  if (study.href) window.location.href = study.href;
                  else setOpen(study);
                }}
                className="group cursor-pointer rounded-2xl border border-border bg-white p-8 md:p-10 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {/* Top: Ref + tags */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-text-dim">
                    Case · {study.id}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted bg-bg-alt border border-border group-hover:border-primary/30 group-hover:text-primary transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client */}
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
                  {study.client}
                </p>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text group-hover:text-primary transition-colors leading-[1.15] mb-8 max-w-3xl">
                  {study.title}
                </h3>

                {/* Outcomes grid */}
                <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-border">
                  {study.results.slice(0, 3).map((res, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-sm font-bold text-primary shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <p className="text-base text-text-secondary leading-relaxed">
                        {boldNumbers(res)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-[0.15em] text-text-dim group-hover:text-primary transition-colors">
                    Read Full Study
                  </span>
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                      <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-border rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl shadow-primary/10"
            >
              {/* Header band */}
              <div className="relative px-8 pt-8 pb-6 border-b border-border bg-bg-alt">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <span className="inline-block px-2 py-1 text-[10px] font-mono bg-primary text-white uppercase tracking-widest">
                      Case File · {open.client}
                    </span>
                    <h3 className="mt-3 text-2xl md:text-3xl font-bold text-text tracking-tight uppercase leading-tight">
                      {open.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    className="shrink-0 h-9 w-9 rounded-full border border-border bg-white flex items-center justify-center text-text-muted hover:text-text hover:border-text transition-colors"
                    aria-label="Close"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {open.images && open.images.length > 0 && (
                  <div className={`grid gap-3 ${open.images.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                    {open.images.map((img) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.src}
                        src={img.src}
                        alt={img.alt}
                        className="w-full rounded-lg border border-border bg-bg-alt object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="font-mono text-[10px] uppercase text-primary tracking-widest border-b border-border pb-2">
                      Briefing
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {open.briefing}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] uppercase text-primary tracking-widest border-b border-border pb-2">
                      Impact Metrics
                    </h4>
                    <ul className="space-y-3">
                      {open.results.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-text-secondary leading-relaxed">
                          <span className="font-mono text-primary font-bold shrink-0">0{idx + 1}</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex justify-between items-center">
                  <div className="flex flex-wrap gap-3">
                    {open.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    className="text-xs font-mono uppercase tracking-widest text-text-dim hover:text-primary transition-colors"
                  >
                    Close File
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
