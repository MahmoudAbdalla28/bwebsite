import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bastion · The Assurance Layer for AI Agents",
  description:
    "Independent, continuous adversarial testing for voice and chat AI agents. The report clears enterprise security review. The data becomes the risk layer carriers price coverage against.",
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
      <body className="bg-slate-950 text-white font-sans antialiased">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
