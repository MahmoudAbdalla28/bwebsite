import type { Metadata } from "next";
import "./globals.css";
import SoftMeshBackground from "@/components/SoftMeshBackground";

export const metadata: Metadata = {
  title: "Bastion | Agentic Risk Infrastructure",
  description:
    "Bastion is Agentic Risk Infrastructure (ARI). Continuous visibility, evidence, and enforcement for production AI agents.",
  icons: {
    icon: [
      { url: "/favicon.webp", type: "image/webp" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-gray-900 font-sans antialiased">
        <SoftMeshBackground />
        <div className="relative z-10">
          {/* Announcement banner — winners' badge */}
          <div className="relative z-30 bg-[#aec2d6] text-gray-900 text-center px-4 py-3 md:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] border-b border-white/40">
            Bastion wins BDO&apos;s &ldquo;Best Quantified Savings&rdquo; prize at Mila Build OS26
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
