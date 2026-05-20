"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "bastion-award-bubble-dismissed-v10";

export default function AwardBubble() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") {
      setVisible(false);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30"
        >
          <div
            className="relative border-b flex items-center justify-center gap-3 px-4 py-2.5 md:py-3 pr-11"
            style={{
              backgroundColor: "#4d1b6e",
              borderColor: "rgba(237, 228, 211, 0.18)",
              boxShadow: "0 10px 24px -10px rgba(77, 27, 110, 0.45)",
            }}
          >
            {/* Trophy icon */}
            <div
              className="shrink-0 h-6 w-6 rounded-md inline-flex items-center justify-center"
              style={{ backgroundColor: "#ede4d3" }}
            >
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="none"
                stroke="#4d1b6e"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9V3h12v6a6 6 0 0 1-12 0z" />
                <path d="M6 5H3a3 3 0 0 0 3 3M18 5h3a3 3 0 0 1-3 3" />
                <path d="M10 21h4M12 17v4" />
              </svg>
            </div>

            {/* Text */}
            <p className="text-[12px] md:text-[13px] font-semibold text-white text-center leading-snug">
              <span style={{ color: "#ede4d3" }} className="uppercase tracking-[0.16em] text-[10px] md:text-[11px] font-bold mr-2">
                Award Won
              </span>
              Best Quantified Savings
              <span className="hidden sm:inline font-normal" style={{ color: "rgba(237, 228, 211, 0.75)" }}>
                {" · Mila Build OS26 · BDO Prize"}
              </span>
            </p>

            {/* Close button */}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="absolute top-1/2 -translate-y-1/2 right-2 h-7 w-7 inline-flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none">
                <path
                  d="M2 2l10 10M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
