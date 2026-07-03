import type { MetadataRoute } from "next";

import { event } from "@/config/race";
import { locales } from "@/data/i18n";

export const dynamic = "force-static";

const pages = ["", "/parcours", "/courses", "/infos", "/resultats", "/contact"];
const legalPages = ["/conditions", "/confidentialite"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-01");

  return [...pages, ...legalPages].flatMap((page) =>
    locales.map((lang) => ({
      url: `${event.siteUrl}/${lang}${page}`,
      lastModified,
      changeFrequency: legalPages.includes(page)
        ? ("yearly" as const)
        : ("weekly" as const),
      priority: page === "" ? 1 : legalPages.includes(page) ? 0.3 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${event.siteUrl}/${l}${page}`]),
        ),
      },
    })),
  );
}
