"use client";

import { motion } from "framer-motion";

export default function Navbar({ heroTheme = "light" }: { heroTheme?: "light" | "dark" }) {
  void heroTheme;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-3 md:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-7xl"
    >
      <div className="flex items-center justify-between px-2 md:px-4 py-2">
        <a href="/" className="cursor-pointer flex items-center gap-3 rounded-2xl bg-slate-950/75 border border-white/10 px-3 py-2 shadow-lg shadow-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/bastion-logo.webp"
            alt="Bastion"
            className="h-9 md:h-11 w-auto object-contain"
            style={{
              filter: "drop-shadow(0 0 14px rgba(110, 180, 255, 0.6)) brightness(1.08)",
            }}
          />
          <span
            className="inline-block border-l border-white/40 pl-3 text-[10px] font-bold uppercase tracking-[0.2em] leading-tight max-w-[120px] text-white"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.7)" }}
          >
            The Evaluation Layer<br />for AI Agents
          </span>
        </a>

        <a
          href="/contact/"
          className="rounded-full bg-blue-600 hover:bg-blue-700 px-4 md:px-5 py-2 md:py-2.5 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer shadow-lg shadow-blue-900/40 whitespace-nowrap"
        >
          Book a Security Review
        </a>
      </div>
    </motion.nav>
  );
}
