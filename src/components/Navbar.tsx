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
      <div className="flex items-center justify-between px-3 md:px-4 py-2">
        <a href="/" className="cursor-pointer flex items-center gap-3 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/bastion-logo.webp"
            alt="Bastion"
            className="h-9 md:h-11 w-auto object-contain flex-shrink-0"
            style={{
              filter: "drop-shadow(0 0 14px rgba(110, 180, 255, 0.85)) drop-shadow(0 1px 3px rgba(0,0,0,0.55)) brightness(1.06)",
            }}
          />
        </a>

        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          <a
            href="/insurance/"
            className="hidden md:inline-block text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 hover:text-white transition-colors whitespace-nowrap"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
          >
            For Carriers
          </a>
          <a
            href="/contact/"
            className="rounded-full bg-blue-700 hover:bg-blue-800 px-3.5 md:px-5 py-2 md:py-2.5 text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.14em] md:tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer shadow-lg shadow-blue-900/50 whitespace-nowrap"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
