import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InsuranceNexusSection from "@/components/InsuranceNexusSection";
import CarrierMGASection from "@/components/CarrierMGASection";
import FreeAssessmentSection from "@/components/FreeAssessmentSection";

export default function InsuranceNexusPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <InsuranceNexusSection />
        <CarrierMGASection />
        <FreeAssessmentSection />
      </main>
      <Footer />
    </>
  );
}
