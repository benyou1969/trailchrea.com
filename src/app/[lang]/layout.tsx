import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Barlow_Condensed, Cairo, Inter } from "next/font/google";

import { event } from "@/config/race";
import {
  getDictionary,
  hasLocale,
  localeMeta,
  locales,
} from "@/data/i18n";
import { I18nProvider } from "@/components/i18n-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import "../globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** Arabic pages only — no preload so fr/en/ber pages don't fetch it eagerly. */
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);

  return {
    metadataBase: new URL(event.siteUrl),
    title: {
      default: `${event.name} — ${event.alternateName}`,
      template: `%s · ${event.name}`,
    },
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[lang].ogLocale,
      siteName: event.name,
      title: `${event.name} — ${event.alternateName}`,
      description: t.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#10291f",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = await getDictionary(lang);
  const { dir } = localeMeta[lang];

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${barlowCondensed.variable} ${inter.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <I18nProvider lang={lang} t={t}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} t={t} />
        </I18nProvider>
      </body>
    </html>
  );
}
