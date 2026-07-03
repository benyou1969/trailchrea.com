"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";

import {
  LANG_STORAGE_KEY,
  localeMeta,
  locales,
  type Locale,
} from "@/data/i18n";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

/** Same page, other locale: swap the /{lang} prefix, keep the rest. */
function swapLocale(pathname: string, code: Locale): string {
  return `/${code}${pathname.replace(/^\/[^/]+/, "")}`;
}

/**
 * Language icon: native-script glyph in a small tile — deliberately not a
 * flag (none of these languages maps to a single country).
 */
export function LangBadge({
  code,
  className,
}: {
  code: Locale;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-sm bg-white/10 text-[11px] font-bold leading-none ring-1 ring-white/15",
        className,
      )}
    >
      {localeMeta[code].glyph}
    </span>
  );
}

function remember(code: Locale) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, code);
  } catch {
    // storage unavailable (private mode) — detection falls back to Accept-Language
  }
}

/** Pills for the mobile drawer. */
export function LanguagePills() {
  const { lang, t } = useI18n();
  const pathname = usePathname();

  return (
    <nav aria-label={t.common.language} className="flex flex-wrap gap-2">
      {locales.map((code) => (
        <Link
          key={code}
          href={swapLocale(pathname, code)}
          onClick={() => remember(code)}
          aria-current={code === lang ? "true" : undefined}
          className={cn(
            "flex items-center gap-2 rounded-sm border py-2 pe-3.5 ps-2 text-sm font-semibold transition-colors",
            code === lang
              ? "border-gold text-gold"
              : "border-white/20 text-sand/80 hover:border-sand/50 hover:text-sand",
          )}
        >
          <LangBadge
            code={code}
            className={code === lang ? "bg-gold/15 ring-gold/40" : undefined}
          />
          {localeMeta[code].label}
        </Link>
      ))}
    </nav>
  );
}

/** Compact dropdown for the desktop navbar. */
export function LanguageSwitcher() {
  const { lang, t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.common.language}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded-sm p-2 text-sm font-semibold text-sand/90 transition-colors hover:bg-white/10 hover:text-sand"
      >
        <Globe className="size-4" aria-hidden="true" />
        {localeMeta[lang].short}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute end-0 top-full mt-2 min-w-40 overflow-hidden rounded-sm border border-white/10 bg-night-soft py-1 shadow-xl"
          >
            {locales.map((code) => (
              <li key={code} role="none">
                <Link
                  role="menuitem"
                  href={swapLocale(pathname, code)}
                  onClick={() => {
                    remember(code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors hover:bg-white/10",
                    code === lang ? "text-gold" : "text-sand/90",
                  )}
                >
                  <LangBadge
                    code={code}
                    className={
                      code === lang ? "bg-gold/15 ring-gold/40" : undefined
                    }
                  />
                  <span className="flex-1">{localeMeta[code].label}</span>
                  {code === lang && (
                    <Check className="size-4" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
