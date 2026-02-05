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
  title: "Ramadan Bot: AI Flyer Generator",
  description: "Create beautiful, personalized Ramadan flyers and Islamic spiritual content with ease.",
  metadataBase: new URL("https://www.ramadanbot.vercel.app"),
  manifest: "/manifest.json",
  keywords: ["Ramadan", "Islamic", "Flyer Generator", "Ramadan Bot", "Muslim", "Spirituality", "Islamic Design", "Ramadan Creator", "Islamic Content"],
  authors: [{ name: "Abdallah Nangere" }],
  creator: "Abdallah Nangere",
  verification: {
    google: "xe2tz-sYxM82yWmgNE4s_EqQeeTutOdnax8YmhYXRgA",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ramadanbot.vercel.app",
    siteName: "Ramadan Bot",
    title: "Ramadan Bot: AI Flyer Generator",
    description: "Create beautiful, personalized Ramadan flyers and Islamic spiritual content.",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Ramadan Bot Logo",
      },
      {
        url: "/ramadan-background.png",
        width: 1080,
        height: 1080,
        alt: "Ramadan Flyer Template",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    creator: "@RamadanBot",
    title: "Ramadan Bot: AI Flyer Generator",
    description: "Create beautiful, personalized Ramadan flyers instantly",
    images: ["/icon-512x512.png", "/ramadan-background.png"],
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
        <meta name="application-name" content="Ramadan Bot" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
        <meta name="theme-color" content="#0f766e" />
        <meta name="description" content="Create beautiful, personalized Ramadan flyers and Islamic spiritual content." />
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