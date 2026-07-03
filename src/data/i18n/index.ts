import type { Locale } from "./config";
import type { Dictionary } from "./fr";

export {
  defaultLocale,
  hasLocale,
  LANG_STORAGE_KEY,
  localeMeta,
  locales,
  type Locale,
} from "./config";
export type { Dictionary } from "./fr";

/**
 * Dictionaries load lazily so only the requested locale is ever bundled.
 * Called from server components; client components receive the active
 * dictionary through <I18nProvider>.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./fr").then((m) => m.fr),
  en: () => import("./en").then((m) => m.en),
  ar: () => import("./ar").then((m) => m.ar),
  ber: () => import("./ber").then((m) => m.ber),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
