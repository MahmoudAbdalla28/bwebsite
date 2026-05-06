import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
