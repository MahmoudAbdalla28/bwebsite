import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TwoModesSection from "@/components/TwoModesSection";
import DeployVP from "@/components/DeployVP";
import PlatformSection from "@/components/PlatformSection";
import RiskExposuresSection from "@/components/RiskExposuresSection";
import BrokerageSection from "@/components/BrokerageSection";
import ReportSection from "@/components/ReportSection";
import BuyerSection from "@/components/BuyerSection";
import IntegrationsCarousel from "@/components/IntegrationsCarousel";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TwoModesSection />
        <DeployVP />
        <PlatformSection />
        <section className="py-24 md:py-32 bg-bg">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary">Live Dashboard</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
                This is what it looks like
              </h2>
            </div>
            <a href="/bastion/blue" className="group block rounded-2xl border border-border bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 cursor-pointer">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <p className="text-sm font-semibold text-text">Fleet Monitoring Dashboard</p>
                <span className="text-xs text-primary font-medium group-hover:underline">Explore</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bastion/assets/bluescreenshot.webp" alt="Bastion fleet monitoring dashboard" className="w-full" />
            </a>
          </div>
        </section>
        <BrokerageSection />
        <ReportSection />
        <RiskExposuresSection />
        <IntegrationsCarousel category="llm" />
        <BuyerSection />
        <WhyUsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
