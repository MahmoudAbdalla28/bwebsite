import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import PlatformSection from "@/components/PlatformSection";
import BuyerSection from "@/components/BuyerSection";
import CredibilitySection from "@/components/CredibilitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <PlatformSection />
        <section className="py-24 md:py-32 bg-bg">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary">Live Dashboard</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-5xl">
                See everything your agents do
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <a href="/blue" className="group block rounded-2xl border border-border bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 cursor-pointer">
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                  <p className="text-sm font-semibold text-text">Bastion Blue</p>
                  <span className="text-xs text-primary font-medium group-hover:underline">View dashboard</span>
                </div>
                <img src="/assets/bluescreenshot.webp" alt="Bastion Blue fleet monitoring dashboard" className="w-full" />
              </a>

              <a href="/red" className="group block rounded-2xl border border-border bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red/5 hover:border-red/20 cursor-pointer">
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                  <p className="text-sm font-semibold text-text">Bastion Red</p>
                  <span className="text-xs text-red font-medium group-hover:underline">View probe engine</span>
                </div>
                <img src="/assets/redscreenshot.webp" alt="Bastion Red adversarial probe engine" className="w-full" />
              </a>
            </div>
          </div>
        </section>
        <BuyerSection />
        <CredibilitySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
