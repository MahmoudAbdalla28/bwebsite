export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/bastion-logo.webp" alt="Bastion" className="h-9 w-auto opacity-90" />
            <span className="border-l border-white/20 pl-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 leading-tight">
              Adversarial Testing<br />for AI Agents
            </span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <a href="/faq/" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-400 hover:text-white transition-colors cursor-pointer">FAQ</a>
            <a href="/contact/" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</a>
            <a href="/contact/" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-400 hover:text-white transition-colors cursor-pointer">Book a Demo</a>
          </div>

          <p className="text-[11px] text-gray-500">&copy; {new Date().getFullYear()} PistonSolutions</p>
        </div>
      </div>
    </footer>
  );
}
