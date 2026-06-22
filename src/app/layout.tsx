import type { Metadata } from "next";
import "./globals.css";
import SoftMeshBackground from "@/components/SoftMeshBackground";

export const metadata: Metadata = {
  title: "Bastion | The Evaluation Layer for AI Agents",
  description:
    "Bastion is the security review for AI agents. We pentest them against OWASP LLM Top 10, OWASP Agentic AI Threats, and MITRE ATLAS. Drop in the SDK, point us at an endpoint, or give us a phone number.",
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
