import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComplianceAlignmentSection from "@/components/ComplianceAlignmentSection";
import CTASection from "@/components/CTASection";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function CompliancePage() {
  return (
    <>
      <Navbar />
      <main>
        <WavyBackground
          colors={["#2563EB", "#3B82F6", "#60A5FA", "#38BDF8", "#818CF8"]}
          waveOpacity={0.6}
          blur={10}
        >
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-2xl shadow-blue-500/10 px-8 py-10 md:px-12 md:py-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 mb-5 text-center">
              Compliance
            </p>
            <p className="text-3xl md:text-5xl lg:text-7xl text-gray-900 font-semibold tracking-[-0.025em] leading-[1.05] text-center">
              How Bastion aligns with{" "}
              <span className="text-blue-700 italic font-medium">regulation.</span>
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base md:text-lg text-gray-700 font-normal text-center">
              Pick a framework. See the principles inside it and how Bastion satisfies each one, mapped to artefacts your regulator, enterprise buyer, and carrier panel will accept.
            </p>
          </div>
        </WavyBackground>
        <ComplianceAlignmentSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
