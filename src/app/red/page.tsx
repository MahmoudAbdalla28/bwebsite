import Navbar from "@/components/Navbar";
import RedHeroSection from "@/components/RedHeroSection";
import RedSection from "@/components/RedSection";
import RedStrategySection from "@/components/RedStrategySection";
import RedDashboardShowcase from "@/components/RedDashboardShowcase";
import RedSDKSection from "@/components/RedSDKSection";
import RedPracticeTargetsSection from "@/components/RedPracticeTargetsSection";
import RedReportingSection from "@/components/RedReportingSection";
import FeedbackLoopSection from "@/components/FeedbackLoopSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function RedPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <RedHeroSection />
        <RedSection />
        <RedStrategySection />
        <RedDashboardShowcase />
        <RedSDKSection />
        <RedPracticeTargetsSection />
        <RedReportingSection />
        <FeedbackLoopSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
