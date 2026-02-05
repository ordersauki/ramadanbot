import type { Metadata, Viewport } from "next";
import { Inter, Amiri, Cinzel, Cormorant_Garamond } from "next/font/google";
import React from "react";
import { PWARegistration } from "@/components/PWARegistration";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const amiri = Amiri({ weight: ['400', '700'], subsets: ["arabic"], variable: '--font-amiri' });
const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-cinzel' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400', '600'], subsets: ["latin"], variable: '--font-cormorant' });

export const metadata: Metadata = {
  title: "Ramadan Bot - AI Spiritual Companion",
  description: "Generate personalized daily Ramadan reflections grounded in authentic Islamic teachings. Create beautiful shareable flyers and track your spiritual journey.",
  manifest: "/manifest.json",
  keywords: ["Ramadan", "Islamic", "Reflection", "Flyer", "Muslim", "Spirituality", "AI"],
  authors: [{ name: "Abdallah Nangere" }],
  creator: "Abdallah Nangere",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ramadanbot.com",
    siteName: "Ramadan Bot",
    title: "Ramadan Bot - AI Spiritual Companion",
    description: "Generate personalized daily Ramadan reflections grounded in authentic Islamic teachings.",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Ramadan Bot Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramadan Bot - AI Spiritual Companion",
    description: "Generate personalized daily Ramadan reflections",
    images: ["/icon-512x512.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ramadan Bot",
  },
  formatDetection: {
    telephone: false,
  },
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
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ramadan Bot" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#0f766e" />
        <meta name="description" content="Generate personalized daily Ramadan reflections grounded in authentic Islamic teachings." />
      </head>
      <body 
        className={`${inter.variable} ${amiri.variable} ${cinzel.variable} ${cormorant.variable} antialiased bg-black flex justify-center items-center h-screen w-screen overflow-hidden`}
        style={{ backgroundColor: '#000000', color: '#ffffff' }}
      >
        <PWARegistration />
        {children}
      </body>
    </html>
  );
}