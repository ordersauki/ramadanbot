import type { Metadata, Viewport } from "next";
import { Inter, Amiri, Cinzel, Cormorant_Garamond } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const amiri = Amiri({ weight: ['400', '700'], subsets: ["arabic"], variable: '--font-amiri' });
const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-cinzel' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400', '600'], subsets: ["latin"], variable: '--font-cormorant' });

export const metadata: Metadata = {
  title: "Ramadan Bot",
  description: "A premium AI-powered Ramadan flyer generator.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.variable} ${amiri.variable} ${cinzel.variable} ${cormorant.variable} antialiased bg-black flex justify-center items-center h-screen w-screen overflow-hidden`}
        style={{ backgroundColor: '#000000', color: '#ffffff' }}
      >
        {children}
      </body>
    </html>
  );
}