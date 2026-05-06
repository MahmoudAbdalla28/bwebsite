import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudiesSection from "@/components/CaseStudiesSection";

export default function CaseStudiesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <CaseStudiesSection />
      </main>
      <Footer />
    </>
  );
}
