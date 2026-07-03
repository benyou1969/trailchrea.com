import type { Metadata } from "next";

import { getDictionary, hasLocale, locales, type Locale } from "@/data/i18n";
import { LegalArticle } from "@/components/legal/legal-article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);

  return {
    title: t.legal.privacy.title,
    description: t.legal.privacy.metaDescription,
    alternates: {
      canonical: `/${lang}/confidentialite`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/confidentialite`]),
      ),
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "fr";
  const t = await getDictionary(locale);

  return <LegalArticle doc={t.legal.privacy} legal={t.legal} />;
}
