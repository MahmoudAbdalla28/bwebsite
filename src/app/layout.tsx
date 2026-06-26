import type { Metadata } from "next";
import "./globals.css";
import SoftMeshBackground from "@/components/SoftMeshBackground";

export const metadata: Metadata = {
  title: "Bastion · Continuous Red-Teaming for AI Agents",
  description:
    "We attack your AI agents so attackers can't. Continuous red-teaming for voice and chat agents. Real attacks, real findings, the same engine that gets paid on public bug-bounty programs.",
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
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
