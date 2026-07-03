import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

import { event } from "@/config/race";
import type { Dictionary, Locale } from "@/data/i18n";
import { Logo } from "@/components/layout/logo";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/** Server component — receives the locale + dictionary from the layout. */
export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <footer className="bg-cedar-deep text-sand">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[2fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cedar-mist">
            {t.footer.tagline}
          </p>
          <p className="mt-6 text-sm text-cedar-mist">
            {t.hero.date} · {t.hero.location}
          </p>
          <a
            href={event.organizers.collaborationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-3"
          >
            <Image
              src="/images/dzmoves.png"
              alt=""
              width={44}
              height={41}
              className="h-9 w-auto shrink-0 animate-stride"
            />
            <span className="leading-snug">
              <span className="block text-xs text-cedar-mist">
                {t.organizers.collaboration}
              </span>
              <span className="block text-sm font-semibold text-sand transition-colors group-hover:text-gold">
                {event.organizers.collaboration}
              </span>
            </span>
          </a>
        </div>

        {/* Navigation column hidden until the subpages
            (parcours, courses, infos, resultats, contact) ship. */}

        <div>
          <h2 className="display text-lg tracking-wide text-gold">
            {t.footer.followUs}
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={event.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cedar-mist transition-colors hover:text-sand"
              >
                <InstagramIcon className="size-4" aria-hidden="true" />
                @trail.chrea
              </a>
            </li>
            <li>
              <a
                href={event.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cedar-mist transition-colors hover:text-sand"
              >
                <FacebookIcon className="size-4" aria-hidden="true" />
                Trail Chrea
              </a>
            </li>
            <li>
              <a
                href={event.contact.organizerInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cedar-mist transition-colors hover:text-sand"
              >
                <InstagramIcon className="size-4" aria-hidden="true" />
                @gravir.blida
              </a>
            </li>
            <li>
              <a
                href={`mailto:${event.contact.email}`}
                className="flex items-center gap-2 text-sm text-cedar-mist transition-colors hover:text-sand"
              >
                <Mail className="size-4" aria-hidden="true" />
                {event.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-5 sm:px-6">
          <p className="text-xs text-cedar-mist/80">
            © 2026 {event.organizers.main} · {event.name} — {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link
                href={`/${lang}/conditions`}
                className="text-xs text-cedar-mist/80 transition-colors hover:text-sand"
              >
                {t.legal.terms.title}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/confidentialite`}
                className="text-xs text-cedar-mist/80 transition-colors hover:text-sand"
              >
                {t.legal.privacy.title}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
