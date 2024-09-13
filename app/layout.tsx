import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load local fonts
const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BARK - Blink Commerce",
  description: "Blink Commerce dApp - The future of decentralized shopping.",
  keywords: "BARK, blockchain, commerce, decentralized, Solana",
  author: "BARK Team",
  "theme-color": "#010101",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <header className="w-full py-4 bg-black text-white text-center">
          <h1 className="text-lg font-semibold">BARK e-Commerce</h1>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="w-full py-4 bg-gray-800 text-white text-center">
          <p>© {new Date().getFullYear()} BARK Protocol. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
