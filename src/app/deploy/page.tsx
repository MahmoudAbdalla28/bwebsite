import Navbar from "@/components/Navbar";
import DeploymentSection from "@/components/DeploymentSection";
import DashboardShowcase from "@/components/DashboardShowcase";
import ComplianceSection from "@/components/ComplianceSection";
import IntegrationsCarousel from "@/components/IntegrationsCarousel";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function DeployPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <DeploymentSection />

        <section id="dashboard" className="relative py-24 md:py-32 bg-bg">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary">Dashboard</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
                Real-time fleet visibility
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-text-secondary">
                Costs, latency, risk scores, and live event feeds in one place.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_280px] items-start">
              <DashboardShowcase />
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">Your Fleet</p>
                {[
                  { name: "Sera", role: "Customer support chat agent", requests: "412/day" },
                  { name: "Operator", role: "Internal ops automation across backend services", requests: "387/day" },
                  { name: "Recon", role: "Research and structured data extraction from documents", requests: "298/day" },
                  { name: "Billing", role: "Invoice and payment processing", requests: "203/day" },
                ].map((agent) => (
                  <div key={agent.name} className="rounded-xl border border-border bg-white p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm font-semibold text-text">{agent.name}</p>
                    </div>
                    <p className="text-xs text-text-muted">{agent.role}</p>
                    <p className="mt-2 text-[10px] text-text-dim font-mono">{agent.requests}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ComplianceSection />
        <IntegrationsCarousel category="security" />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
