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
      <body className="antialiased flex flex-col items-center w-full bg-yellow-600">
        <main className="w-full max-w-7xl">
          {children}
        </main>
      </body>
    </html>
  );
}