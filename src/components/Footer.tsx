export default function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-bg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="/bastion" className="flex items-center gap-3 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bastion/assets/bastion-logo.webp" alt="Bastion" className="h-10 w-auto" />
            <span className="border-l border-border pl-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-dim leading-tight">
              Agentic Risk<br />Infrastructure
            </span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <a href="/bastion/faq/" className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer">FAQ</a>
            <a href="/bastion/contact/" className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer">Contact</a>
            <a href="/bastion/contact/" className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer">Book a Demo</a>
          </div>

          <p className="text-xs text-text-dim">&copy; {new Date().getFullYear()} PistonSolutions</p>
        </div>
      </div>
    </footer>
  );
}
