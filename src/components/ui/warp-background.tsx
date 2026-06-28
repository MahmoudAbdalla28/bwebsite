"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Warp Background — dark hero treatment with diagonal blue/cyan rays
 * radiating from the bottom-right corner. Bastion palette adaptation
 * of the Magic UI Warp Background pattern.
 */
export function WarpBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-slate-950",
        className
      )}
    >
      {/* The warp wedge — contained in the bottom-right corner, doesn't cross the page center */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMaxYMax slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            {/* All-blue palette, no cyan. Deepest at the base, gradually
                lighter blue toward the top edge — but never reaching ice/white. */}
            <linearGradient id="ray1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#172554" stopOpacity="0" />
              <stop offset="60%" stopColor="#172554" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="ray2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0" />
              <stop offset="60%" stopColor="#1e3a8a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="ray3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="0" />
              <stop offset="60%" stopColor="#1e40af" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="ray4" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
              <stop offset="60%" stopColor="#1d4ed8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="ray5" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="60%" stopColor="#2563eb" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="ray6" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="ray7" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="ray8" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
              <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Rays radiate from the bottom-right corner across the full diagonal,
              extending past the upper-left edge so the fan reads end-to-end. */}
          <g transform="translate(1200, 800)">
            <polygon points="0,0 -1900,-1150 -1900,-1080 0,-40" fill="url(#ray1)" />
            <polygon points="0,-40 -1900,-1080 -1900,-1010 0,-80" fill="url(#ray2)" />
            <polygon points="0,-80 -1900,-1010 -1900,-940 0,-120" fill="url(#ray3)" />
            <polygon points="0,-120 -1900,-940 -1900,-870 0,-160" fill="url(#ray4)" />
            <polygon points="0,-160 -1900,-870 -1900,-800 0,-200" fill="url(#ray5)" />
            <polygon points="0,-200 -1900,-800 -1900,-730 0,-240" fill="url(#ray6)" />
            <polygon points="0,-240 -1900,-730 -1900,-660 0,-280" fill="url(#ray7)" />
            <polygon points="0,-280 -1900,-660 -1900,-590 0,-320" fill="url(#ray8)" />
          </g>
        </svg>
      </div>

      {/* Soft corner glow — pushes the warp wedge into the page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.28) 0%, rgba(37,99,235,0.18) 30%, rgba(30,58,138,0.08) 55%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* Center darkening — softer now since rays span full diagonal; just enough
          to keep the headline legible without hiding the rays behind it. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 45%, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.25) 55%, transparent 85%)",
        }}
      />
    </div>
  );
}
