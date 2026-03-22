import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
      <body className="antialiased flex flex-col items-center bg-yellow-600">
        {children}
      </body>
    </html>
  );
}
