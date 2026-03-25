import Navbar from "@/components/Navbar";
import DeploymentSection from "@/components/DeploymentSection";
import ComplianceSection from "@/components/ComplianceSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function DeployPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <DeploymentSection />
        <ComplianceSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
