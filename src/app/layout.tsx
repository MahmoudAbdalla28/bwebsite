import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bastion | Agentic Risk Infrastructure",
  description:
    "Bastion is Agentic Risk Infrastructure (ARI). Continuous visibility, evidence, and enforcement for production AI agents.",
  icons: {
    icon: "/favicon.png",
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
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text font-sans antialiased">{children}</body>
    </html>
  );
}
