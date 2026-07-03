import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { event } from "@/config/race";
import { locales } from "@/data/i18n";

import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title: `${event.name} — ${event.alternateName}`,
  // language chooser only — search engines should index the locale pages
  robots: { index: false },
  alternates: {
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
      "x-default": "/",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#10291f",
};

/** Root layout for `/` only: detects the locale then hands off to /{lang}. */
export default function RedirectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-night">{children}</body>
    </html>
  );
}
