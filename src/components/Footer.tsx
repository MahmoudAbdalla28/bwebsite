export default function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-bg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
              <path d="M16 2L4 8v8c0 7.2 5.1 13.9 12 16 6.9-2.1 12-8.8 12-16V8L16 2z" fill="#EFF6FF" stroke="#0D6EFD" strokeWidth="1.5" />
              <path d="M12 16l3 3 5-6" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold text-text">Bastion</span>
          </div>

          <div className="flex items-center gap-8">
            {[{ label: "Red", href: "/red" }, { label: "Blue", href: "/blue" }, { label: "Deploy", href: "/deploy" }, { label: "Contact", href: "#contact" }].map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer">{l.label}</a>
            ))}
          </div>

          <p className="text-xs text-text-dim">&copy; {new Date().getFullYear()} PistonSolutions</p>
        </div>
      </div>
    </footer>
  );
}
