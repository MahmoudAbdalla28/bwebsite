import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComplianceAlignmentSection from "@/components/ComplianceAlignmentSection";
import CTASection from "@/components/CTASection";

export default function CompliancePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <ComplianceAlignmentSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
