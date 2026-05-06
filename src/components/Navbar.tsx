"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResourceItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Platform", href: "/bastion/platform/" },
    { label: "Insurance Nexus", href: "/bastion/insurance-nexus/" },
    { label: "Compliance", href: "/bastion/compliance/" },
  ];

  const resources: ResourceItem[] = [
    { label: "FAQ", href: "/bastion/faq/" },
    { label: "Case Studies", href: "/bastion/case-studies/" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-border-light"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/bastion" className="cursor-pointer flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bastion/assets/bastion-logo.webp" alt="Bastion" className="h-16 w-auto object-contain" />
          <span className="inline-block border-l border-border pl-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-dim leading-tight max-w-[120px]">
            Agentic Risk<br />Infrastructure
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text cursor-pointer">{link.label}</a>
          ))}

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={openResources}
            onMouseLeave={scheduleCloseResources}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text cursor-pointer"
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
                  className="absolute right-0 mt-3 w-44 rounded-xl border border-border bg-white shadow-lg overflow-hidden"
                  role="menu"
                >
                  {resources.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      className="block px-4 py-3 text-sm font-medium text-text-muted hover:bg-bg-alt hover:text-text transition-colors"
                      role="menuitem"
                    >
                      {r.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/bastion/contact/" className="text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text cursor-pointer">Contact</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/bastion/contact/"
            className="btn-glow rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Request a demo
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden cursor-pointer hover:bg-bg-alt transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-text-muted transition-all duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-text-muted transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-text-muted transition-all duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
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
            className="overflow-hidden bg-white border-b border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-text-muted hover:bg-bg-alt hover:text-text cursor-pointer">
                  {link.label}
                </a>
              ))}
              <p className="mt-2 px-4 text-[10px] font-bold uppercase tracking-widest text-text-dim">Resources</p>
              {resources.map((r) => (
                <a key={r.href} href={r.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-text-muted hover:bg-bg-alt hover:text-text cursor-pointer">
                  {r.label}
                </a>
              ))}
              <a href="/bastion/contact/" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-text-muted hover:bg-bg-alt hover:text-text cursor-pointer">
                Contact
              </a>
              <div className="mt-3 border-t border-border pt-4">
                <a href="/bastion/contact/" onClick={() => setMobileOpen(false)} className="btn-glow block rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white cursor-pointer">
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
