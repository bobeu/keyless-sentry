import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  title: "BountyClaw | The Arbiter",
  description: "Autonomous Bounty Marketplace Protocol - AI-Powered Verification",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-yellow-600">
        <div className="min-h-screen w-full max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-4">
          {children}
        </div>
      </body>
    </html>
  );
}