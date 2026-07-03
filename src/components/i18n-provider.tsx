"use client";

import { createContext, useContext, useMemo } from "react";

import { localeMeta, type Dictionary, type Locale } from "@/data/i18n";

interface I18nContextValue {
  lang: Locale;
  t: Dictionary;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

/** Hands the active locale + dictionary to client components. */
export function I18nProvider({
  lang,
  t,
  children,
}: {
  lang: Locale;
  t: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ lang, t, dir: localeMeta[lang].dir }),
    [lang, t],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
