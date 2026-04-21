export default function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-bg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="/bastion" className="flex items-center gap-2.5 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bastion/assets/bastion-logo.webp" alt="Bastion" className="h-7 w-auto" />
          </a>

          <div className="flex items-center gap-8">
            <a href="/bastion/blue" className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer">Platform</a>
            <a href="/bastion/deploy" className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer">Deploy</a>
            <a href="#contact" className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer">Book a Demo</a>
          </div>

          <p className="text-xs text-text-dim">&copy; {new Date().getFullYear()} PistonSolutions</p>
        </div>
      </div>
    </footer>
  );
}
