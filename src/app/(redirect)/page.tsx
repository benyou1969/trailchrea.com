"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  defaultLocale,
  hasLocale,
  LANG_STORAGE_KEY,
  localeMeta,
  locales,
  type Locale,
} from "@/data/i18n";
import { LangBadge } from "@/components/layout/language-switcher";

/**
 * French is the site default: everyone lands on /fr unless they explicitly
 * picked another language before (switcher choice saved in localStorage).
 * No Accept-Language sniffing — the switcher is one tap away.
 */
function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && hasLocale(saved)) return saved;
  } catch {
    // storage unavailable — use the default
  }
  return defaultLocale;
}

/**
 * Static export = no server-side locale negotiation, so `/` is a tiny
 * client redirect. The visible links double as the no-JS fallback.
 */
export default function LocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${detectLocale()}`);
  }, [router]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="text-2xl font-bold tracking-wide text-sand">
        Trail Chrea 2026
      </p>
      <nav aria-label="Languages" className="flex flex-wrap justify-center gap-3">
        {locales.map((code) => (
          <Link
            key={code}
            href={`/${code}`}
            className="flex items-center gap-2 rounded-sm border border-white/20 py-2 pe-4 ps-2 text-sm font-semibold text-sand/80 transition-colors hover:border-sand/50 hover:text-sand"
          >
            <LangBadge code={code} />
            {localeMeta[code].label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
