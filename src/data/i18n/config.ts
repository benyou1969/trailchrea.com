/**
 * Locale registry. URLs are prefixed with these codes (`/fr`, `/en`, `/ar`, `/ber`).
 * `ber` covers Tamazight (Latin script); browser tags kab/tzm/zgh map onto it
 * during detection (see app/(redirect)/page.tsx).
 */

export const locales = ["fr", "en", "ar", "ber"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);

export interface LocaleMeta {
  /** native name, shown in the language switcher */
  label: string;
  /** compact form for the collapsed switcher button */
  short: string;
  /** single glyph for the badge icon — native script, not a flag */
  glyph: string;
  dir: "ltr" | "rtl";
  /** Open Graph locale, when a standard code exists */
  ogLocale?: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  fr: { label: "Français", short: "FR", glyph: "FR", dir: "ltr", ogLocale: "fr_DZ" },
  en: { label: "English", short: "EN", glyph: "EN", dir: "ltr", ogLocale: "en_US" },
  ar: { label: "العربية", short: "AR", glyph: "ع", dir: "rtl", ogLocale: "ar_DZ" },
  ber: { label: "Tamaziɣt", short: "ⵣ", glyph: "ⵣ", dir: "ltr" },
};

/** localStorage key shared by the switcher and the root redirect page */
export const LANG_STORAGE_KEY = "trail-chrea:lang";
