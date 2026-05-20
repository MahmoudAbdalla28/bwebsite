"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResourceItem {
  label: string;
  href: string;
}

export default function Navbar({ heroTheme = "light" }: { heroTheme?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Floating pill is always white-bg, so text colours are always light-mode.
  // heroTheme prop is kept for API compatibility but no longer drives styling.
  void heroTheme;
  void scrolled;
  const taglineCls = "text-text-dim border-border";
  const linkCls = "text-gray-600 hover:text-gray-900";
  const burgerCls = "bg-text-muted";

  const links = [
    { label: "Platform", href: "/platform/" },
    { label: "Insurance", href: "/insurance/" },
    { label: "Compliance", href: "/compliance/" },
  ];

  const resources: ResourceItem[] = [
    { label: "Case Studies", href: "/case-studies/" },
    { label: "Partners", href: "/partners/" },
  ];

  const openResources = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setResourcesOpen(true);
  };
  const scheduleCloseResources = () => {
    closeTimer.current = setTimeout(() => setResourcesOpen(false), 120);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-12 md:top-14 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-7xl rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-200/70 shadow-lg shadow-gray-900/5"
    >
      <div className="flex items-center justify-between px-5 md:px-6 py-3 md:py-4">
        <a href="/" className="cursor-pointer flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/bastion-logo.webp"
            alt="Bastion"
            className="h-9 md:h-11 w-auto object-contain"
            style={{
              filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.55)) drop-shadow(0 0 22px rgba(110, 180, 255, 0.35))",
            }}
          />
          <span className={`inline-block border-l pl-3 text-[10px] font-semibold uppercase tracking-[0.2em] leading-tight max-w-[120px] ${taglineCls}`}>
            Agentic Risk<br />Infrastructure
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={`text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer ${linkCls}`}>{link.label}</a>
          ))}

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={openResources}
            onMouseLeave={scheduleCloseResources}
          >
            <button
              type="button"
              className={`flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer ${linkCls}`}
              onClick={() => setResourcesOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={resourcesOpen}
            >
              Resources
              <svg
                viewBox="0 0 12 8"
                className={`h-2.5 w-3 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                fill="none"
              >
                <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-44 rounded-2xl border border-gray-200/60 bg-surface/80 backdrop-blur-xl shadow-lg overflow-hidden"
                  role="menu"
                >
                  {resources.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-blue-50/60 hover:text-gray-900 transition-colors"
                      role="menuitem"
                    >
                      {r.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/contact/"
            className="rounded-full bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer shadow-md shadow-blue-500/30"
          >
            Book an Assessment
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-sm md:hidden cursor-pointer hover:bg-bg-alt transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 ${burgerCls} transition-all duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 ${burgerCls} transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 ${burgerCls} transition-all duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden bg-surface border-b border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-sm px-4 py-3 text-sm font-medium text-text-muted hover:bg-bg-alt hover:text-text cursor-pointer">
                  {link.label}
                </a>
              ))}
              <p className="mt-2 px-4 text-[10px] font-bold uppercase tracking-widest text-text-dim">Resources</p>
              {resources.map((r) => (
                <a key={r.href} href={r.href} onClick={() => setMobileOpen(false)} className="rounded-sm px-4 py-3 text-sm font-medium text-text-muted hover:bg-bg-alt hover:text-text cursor-pointer">
                  {r.label}
                </a>
              ))}
              <div className="mt-3 border-t border-border pt-4">
                <a href="/contact/" onClick={() => setMobileOpen(false)} className="btn-glow block rounded-sm bg-primary px-5 py-3 text-center text-sm font-semibold text-white cursor-pointer">
                  Request a demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
