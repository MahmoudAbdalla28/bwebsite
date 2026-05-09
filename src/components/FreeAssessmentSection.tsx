"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Choice = "yes" | "no" | "unsure";
type AnswerValue = Choice | string;

interface YesNoQuestion {
  id: string;
  type: "choice";
  prompt: string;
}

interface DropdownQuestion {
  id: string;
  type: "dropdown";
  prompt: string;
  options: string[];
}

type Question = YesNoQuestion | DropdownQuestion;

const QUESTIONS: Question[] = [
  {
    id: "pii",
    type: "choice",
    prompt: "Does your agentic workflow handle protected PII, PHI (Protected Health Information), or financial transactions exceeding $500?",
  },
  {
    id: "human-in-loop",
    type: "choice",
    prompt: "Does your agent operate with a human in the loop?",
  },
  {
    id: "direct-write-access",
    type: "choice",
    prompt: "Does your agent have direct write access to external APIs and databases?",
  },
  {
    id: "ai-endorsement",
    type: "choice",
    prompt: "Does your insurance policy include an affirmative AI endorsement?",
  },
  {
    id: "policy-enforcement",
    type: "choice",
    prompt: "Does your stack enforce your AI policies on every agent?",
  },
  {
    id: "immutable-logs",
    type: "choice",
    prompt: "Do you retain immutable logs of every prompt, tool call, and agent action for at least 90 days?",
  },
  {
    id: "industry",
    type: "dropdown",
    prompt: "What field does your AI agent live in?",
    options: [
      "Aviation / Aerospace",
      "Banking / Financial services",
      "Energy / Utilities",
      "Government / Defense",
      "Healthcare / Life sciences",
      "Insurance",
      "Legal",
      "Manufacturing / Industrial",
      "Media / Gaming",
      "Retail / E-commerce",
      "SaaS / Technology",
      "Other",
    ],
  },
];

const CHOICE_LABELS: Record<Choice, string> = {
  yes: "Yes",
  no: "No",
  unsure: "Not sure",
};

export default function FreeAssessmentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", organization: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const assessmentSummary = QUESTIONS.map((q) => {
      const a = answers[q.id];
      const display = a === undefined ? "—" : q.type === "choice" ? CHOICE_LABELS[a as Choice] : (a as string);
      return `- ${q.prompt} → ${display}`;
    }).join("\n");
    try {
      const response = await fetch("https://pistonsolutions.ai/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `SOURCE: Free Assessment (Insurance Nexus)\nORG: ${form.organization}\n\nASSESSMENT ANSWERS:\n${assessmentSummary}\n\nMESSAGE:\n${form.message || "(none)"}`,
        }),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [dropdownOpen]);

  useEffect(() => {
    setDropdownOpen(false);
  }, [step]);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setSubmitted(false);
    setForm({ name: "", organization: "", email: "", message: "" });
    setStatus("idle");
  };

  const startAssessment = () => {
    reset();
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const current = QUESTIONS[step];
  const currentAnswer = answers[current?.id];
  const canAdvance = currentAnswer !== undefined && currentAnswer !== "";
  const isLast = step === QUESTIONS.length - 1;

  const advanceFrom = (questionStep: number) => {
    if (questionStep === QUESTIONS.length - 1) {
      setSubmitted(true);
    } else {
      setStep(questionStep + 1);
    }
  };

  const setAnswer = (value: AnswerValue) => {
    const currentStep = step;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    if (current.type === "choice") {
      // Auto-advance after a brief pause so the selection is visible
      setTimeout(() => advanceFrom(currentStep), 220);
    }
  };

  const next = () => {
    if (!canAdvance) return;
    advanceFrom(step);
  };

  const back = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  return (
    <>
      <section className="relative pt-8 pb-24 md:pt-12 md:pb-32 bg-bg-alt" ref={ref}>
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-sm border border-border bg-surface p-10 md:p-14 shadow-lg shadow-primary/5 text-center"
          >
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
              Free Assessment
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
              See Where You <span className="gradient-text">Stand</span>
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary max-w-2xl mx-auto">
              Seven questions. Two minutes. Get a snapshot of your AI coverage posture and where the gaps your carrier cares about actually are.
            </p>
            <button
              onClick={startAssessment}
              className="btn-glow mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.99]"
            >
              Start free assessment
              <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none">
                <path
                  d="M0 6h13M9 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop with blur */}
            <button
              type="button"
              aria-label="Close assessment"
              onClick={closeModal}
              className="absolute inset-0 bg-bg/70 backdrop-blur-md cursor-default"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl rounded-sm border border-border bg-surface shadow-2xl shadow-primary/10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="assessment-title"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-text-dim hover:bg-bg-alt hover:text-text transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>

              {!submitted ? (
                <div className="p-8 md:p-10">
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-text-dim mb-3">
                      <span>
                        Question {step + 1} of {QUESTIONS.length}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-bg-alt rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={false}
                        animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3
                        id="assessment-title"
                        className="text-xl md:text-2xl font-semibold text-text leading-snug"
                      >
                        {current.prompt}
                      </h3>

                      <div className="mt-6 space-y-2">
                        {current.type === "choice" ? (
                          (Object.keys(CHOICE_LABELS) as Choice[]).map((choice) => {
                            const selected = currentAnswer === choice;
                            return (
                              <button
                                key={choice}
                                onClick={() => setAnswer(choice)}
                                className={`w-full flex items-center justify-between rounded-sm border px-5 py-4 text-left text-sm font-medium transition-all cursor-pointer ${
                                  selected
                                    ? "border-primary bg-primary-bg text-primary shadow-sm"
                                    : "border-border bg-surface text-text hover:border-primary/40 hover:bg-bg-alt/60"
                                }`}
                              >
                                <span>{CHOICE_LABELS[choice]}</span>
                                <span
                                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                    selected ? "border-primary bg-primary" : "border-border"
                                  }`}
                                >
                                  {selected && (
                                    <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
                                      <path
                                        d="M2 6l3 3 5-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  )}
                                </span>
                              </button>
                            );
                          })
                        ) : (
                          <div ref={dropdownRef} className="relative">
                            <button
                              type="button"
                              onClick={() => setDropdownOpen((v) => !v)}
                              aria-haspopup="listbox"
                              aria-expanded={dropdownOpen}
                              className={`w-full flex items-center justify-between rounded-sm border px-5 py-4 text-left text-sm font-medium transition-all cursor-pointer ${
                                dropdownOpen
                                  ? "border-primary bg-surface shadow-sm"
                                  : currentAnswer
                                    ? "border-primary bg-primary-bg text-primary shadow-sm"
                                    : "border-border bg-surface text-text-muted hover:border-primary/40 hover:bg-bg-alt/60"
                              }`}
                            >
                              <span className={currentAnswer ? "" : "text-text-dim"}>
                                {(currentAnswer as string) || "Select your industry"}
                              </span>
                              <svg
                                viewBox="0 0 12 8"
                                className={`h-2.5 w-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                fill="none"
                              >
                                <path
                                  d="M1 1.5l5 5 5-5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>

                            <AnimatePresence>
                              {dropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute left-0 right-0 top-full mt-2 z-20 rounded-sm border border-border bg-surface shadow-lg max-h-[16rem] overflow-y-auto py-1.5"
                                  role="listbox"
                                >
                                  {current.options.map((opt) => {
                                    const selected = currentAnswer === opt;
                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        role="option"
                                        aria-selected={selected}
                                        onClick={() => {
                                          setAnswer(opt);
                                          setDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-5 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                                          selected
                                            ? "bg-primary-bg text-primary"
                                            : "text-text hover:bg-bg-alt"
                                        }`}
                                      >
                                        <span>{opt}</span>
                                        {selected && (
                                          <svg viewBox="0 0 12 12" className="h-3 w-3 text-primary" fill="none">
                                            <path
                                              d="M2 6l3 3 5-6"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        )}
                                      </button>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={back}
                      disabled={step === 0}
                      className={`text-sm font-medium transition-colors cursor-pointer ${
                        step === 0
                          ? "text-text-dim/40 cursor-not-allowed"
                          : "text-text-muted hover:text-text"
                      }`}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={next}
                      disabled={!canAdvance}
                      className={`inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-all ${
                        canAdvance
                          ? "bg-primary text-white hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
                          : "bg-bg-alt text-text-dim cursor-not-allowed"
                      }`}
                    >
                      {isLast ? "See result" : "Next"}
                      <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none">
                        <path
                          d="M0 6h13M9 1l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : status === "sent" ? (
                /* Sent state */
                <div className="p-8 md:p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-bg text-primary">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-text">
                    Message Received
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary max-w-md mx-auto">
                    Thanks for completing the assessment. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-7 rounded-sm border border-border bg-surface px-7 py-3 text-sm font-semibold text-text-muted hover:bg-bg-alt hover:text-text transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* Embedded contact form */
                <div className="p-8 md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-2">
                    Assessment Complete
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-text">
                    Let&apos;s Talk Through Your Setup
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Drop your details and we&apos;ll be in touch within 24 hours.
                  </p>

                  <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="assess-name" className="block text-xs font-medium text-text-secondary mb-1.5">Name</label>
                        <input
                          id="assess-name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleFormChange}
                          placeholder="Full Name"
                          className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="assess-org" className="block text-xs font-medium text-text-secondary mb-1.5">Organization</label>
                        <input
                          id="assess-org"
                          name="organization"
                          type="text"
                          required
                          value={form.organization}
                          onChange={handleFormChange}
                          placeholder="Company Name"
                          className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="assess-email" className="block text-xs font-medium text-text-secondary mb-1.5">Work email</label>
                      <input
                        id="assess-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="name@company.com"
                        className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="assess-msg" className="block text-xs font-medium text-text-secondary mb-1.5">Message <span className="text-text-dim font-normal">(optional)</span></label>
                      <textarea
                        id="assess-msg"
                        name="message"
                        value={form.message}
                        onChange={handleFormChange}
                        rows={3}
                        placeholder="Anything you'd like us to know..."
                        className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full cursor-pointer rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark transition-all disabled:opacity-50"
                    >
                      {status === "sending" ? "Sending..." : status === "error" ? "Try again" : "Request a briefing"}
                    </button>

                    <button
                      type="button"
                      onClick={reset}
                      className="w-full text-xs font-medium text-text-dim hover:text-text-muted transition-colors cursor-pointer"
                    >
                      Retake assessment
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
