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
    title: t.legal.terms.title,
    description: t.legal.terms.metaDescription,
    alternates: {
      canonical: `/${lang}/conditions`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/conditions`]),
      ),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "fr";
  const t = await getDictionary(locale);

  return <LegalArticle doc={t.legal.terms} legal={t.legal} />;
}
