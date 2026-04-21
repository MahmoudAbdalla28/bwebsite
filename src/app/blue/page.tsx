import Navbar from "@/components/Navbar";
import BlueHeroSection from "@/components/BlueHeroSection";
import BlueSection from "@/components/BlueSection";
import BlueKnowledgeGraphSection from "@/components/BlueKnowledgeGraphSection";
import BlueBlockedActionsSection from "@/components/BlueBlockedActionsSection";
import BlueTelemetrySection from "@/components/BlueTelemetrySection";
import BlueFleetSection from "@/components/BlueFleetSection";
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
        <BlueBlockedActionsSection />
        <BlueFleetSection />
        <BlueTelemetrySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
