"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";
import {
  LanguagePills,
  LanguageSwitcher,
} from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { RegisterButton } from "@/components/ui/register-button";

export function Navbar() {
  const { lang, t, dir } = useI18n();
  const rtl = dir === "rtl";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Nav links hidden until the subpages ship; the logo already links home.
  const links: { href: string; label: string }[] = [
    // { href: `/${lang}`, label: t.nav.home },
    // { href: `/${lang}/parcours`, label: t.nav.parcours },
    // { href: `/${lang}/courses`, label: t.nav.courses },
    // { href: `/${lang}/infos`, label: t.nav.infos },
    // { href: `/${lang}/resultats`, label: t.nav.resultats },
    // { href: `/${lang}/contact`, label: t.nav.contact },
  ];

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close the drawer on navigation; lock body scroll while it's open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    // Fragment on purpose: the drawer must NOT live inside <header> —
    // its backdrop-filter makes the header the containing block for fixed
    // descendants, which would collapse the drawer's inset-0 to the 64px bar.
    <>
    <header
      className={cn(
        // blur stays static (never transitioned — repaints the whole hero);
        // the 300ms background fade masks its appearance completely
        "fixed inset-x-0 top-0 z-(--z-sticky) backdrop-blur-md transition-[background-color,border-color] duration-300 ease-(--ease-out-quint)",
        scrolled
          ? "border-b border-white/10 bg-night/70"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label={t.common.mainNav}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sand sm:px-6"
      >
        <Link
          href={`/${lang}`}
          aria-label={t.common.homeLink}
          className="shrink-0"
        >
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  // animated gold underline grows from the reading edge;
                  // the current page keeps it drawn (state ≠ color alone)
                  "relative text-sm font-medium transition-colors hover:text-gold",
                  "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-200 after:ease-(--ease-out-expo) rtl:after:origin-right",
                  pathname === link.href
                    ? "text-gold after:scale-x-100"
                    : "text-sand/90 after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <RegisterButton className="hidden px-5 py-2.5 text-base sm:inline-flex">
            {t.nav.register}
          </RegisterButton>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.common.openMenu}
            aria-expanded={open}
            className="rounded-sm p-2.5 transition-[color,background-color,transform] duration-150 ease-(--ease-out-expo) hover:bg-white/10 active:scale-[0.94] lg:hidden"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-(--z-drawer) bg-cedar-deep lg:hidden"
          >
            <div className="grain absolute inset-0" aria-hidden="true" />
            <div className="relative flex h-full flex-col px-6 py-4">
              <div className="flex h-12 items-center justify-between text-sand">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.common.closeMenu}
                  className="rounded-sm p-2.5 transition-[color,background-color,transform] duration-150 ease-(--ease-out-expo) hover:bg-white/10 active:scale-[0.94]"
                >
                  <X className="size-6" aria-hidden="true" />
                </button>
              </div>

              <ul className="mt-12 flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    // links enter from the reading edge (right under RTL)
                    // and retract toward it — no stagger on the way out
                    initial={
                      reduced ? { opacity: 0 } : { opacity: 0, x: rtl ? 32 : -32 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      reduced
                        ? { opacity: 0, transition: { duration: 0.2 } }
                        : {
                            opacity: 0,
                            x: rtl ? 16 : -16,
                            transition: { duration: 0.2, ease: easeOutExpo },
                          }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + i * 0.06,
                      ease: easeOutExpo,
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "display block py-2 text-5xl transition-colors",
                        pathname === link.href
                          ? "text-gold"
                          : "text-sand hover:text-gold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduced
                    ? { opacity: 0, transition: { duration: 0.2 } }
                    : { opacity: 0, y: 12, transition: { duration: 0.2 } }
                }
                transition={{ duration: 0.5, delay: 0.5, ease: easeOutExpo }}
                className="mt-auto pb-8"
              >
                <div className="mb-6">
                  <LanguagePills />
                </div>
                <RegisterButton className="flex gap-3 px-6 py-4 text-2xl">
                  {t.nav.register}
                </RegisterButton>
                <p className="mt-3 text-center text-sm text-cedar-mist">
                  {t.hero.urgency}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
