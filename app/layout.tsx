import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from 'next/image';
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
  author: "BARK Protocol",
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
          <div className="flex items-center justify-center">
            <Image
              src="https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg"
              alt="BARK Logo"
              width={120}
              height={40}
            />
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
