import Navbar from "@/components/Navbar";
import BlueHeroSection from "@/components/BlueHeroSection";
import BlueSection from "@/components/BlueSection";
import BlueKnowledgeGraphSection from "@/components/BlueKnowledgeGraphSection";
import BlueBlockedActionsSection from "@/components/BlueBlockedActionsSection";
import DashboardShowcase from "@/components/DashboardShowcase";
import BlueTelemetrySection from "@/components/BlueTelemetrySection";
import BlueFleetSection from "@/components/BlueFleetSection";
import CredibilitySection from "@/components/CredibilitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function BluePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <BlueHeroSection />
        <BlueSection />
        <BlueKnowledgeGraphSection />

        {/* Dashboard showcase wrapper */}
        <section id="dashboard" className="relative py-24 md:py-32 bg-bg">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary">Dashboard</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
                Real-time fleet visibility
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-text-secondary">
                See what every agent is doing, right now. Costs, latency, risk scores, and live event feeds in one place.
              </p>
            </div>
            <DashboardShowcase />
          </div>
        </section>

        <BlueTelemetrySection />
        <BlueBlockedActionsSection />
        <BlueFleetSection />
        <CredibilitySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
