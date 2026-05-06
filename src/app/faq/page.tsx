import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
