"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname?.startsWith("/contact");

  return (
    <footer className="relative border-t border-white/10 py-12 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/bastion-logo.webp" alt="Bastion" className="h-9 w-auto opacity-90" />
            <span className="border-l border-white/20 pl-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 leading-tight">
              The Assurance Layer<br />for AI Agents
            </span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/insurance/"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              For insurers
            </a>
            <a
              href="mailto:team@trybastion.ai"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              team@trybastion.ai
            </a>
            {!isContactPage && (
              <>
                <a
                  href="/contact/"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  Contact
                </a>
                <a
                  href="/contact/"
                  className="inline-flex items-center rounded-full bg-blue-700 hover:bg-blue-800 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-blue-900/40 cursor-pointer"
                >
                  Book a Demo
                </a>
              </>
            )}
          </div>

          <p className="text-[11px] text-gray-500">&copy; {new Date().getFullYear()} trybastion.ai</p>
        </div>

        {/* Founder credibility — keep factual per pitch deck; no unverified credentials */}
        <p className="mt-8 text-[11px] leading-relaxed text-gray-500 max-w-xl">
          Independent, third-party testing. Built by engineers from NYSE quant-trading systems and adversarial ML research.
        </p>
      </div>
    </footer>
  );
}
