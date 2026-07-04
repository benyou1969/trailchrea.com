"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { event } from "@/config/race";
import { easeOutQuint, viewportOnce } from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";
import { Reveal } from "@/components/ui/reveal";

/**
 * International invitation, staged as a commemorative Algerian stamp —
 * Maqam Echahid (Unsplash, Daoud Abismail) on perforated stamp paper,
 * pressed onto the night "envelope" and cancelled with a Chréa postmark.
 * Copy sits to its right. Stamp furniture is decorative Latin linework,
 * so it stays LTR and aria-hidden on every locale.
 */
export function Welcome() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const year = event.startDate.slice(0, 4);
  const cancelDate = event.startDate.slice(0, 10).split("-").reverse().join(".");

  return (
    <section className="relative overflow-hidden bg-night text-sand">
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-24 sm:px-6 sm:py-32 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div className="relative mx-auto w-full max-w-sm md:mx-0">
          {/* affixed with a tilt — enters flat and oversized, settles like
              being pressed down; pure transform, crossfade under reduced */}
          <motion.div
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, scale: 1.12, rotate: 0 }
            }
            whileInView={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, rotate: -2.5 }
            }
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutQuint }}
            className="stamp-perf bg-sand p-3 shadow-2xl shadow-black/50 sm:p-4"
          >
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src="/gallery/08-maqam-echahid.webp"
                alt={t.welcome.imageAlt}
                fill
                sizes="(min-width: 640px) 24rem, 90vw"
                className="object-cover"
              />
              {/* engraving furniture needs its own scrim at both ends */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-night/50 via-transparent to-night/50"
              />
              <div
                aria-hidden="true"
                dir="ltr"
                className="absolute inset-0 flex flex-col justify-between p-3 text-sand sm:p-4"
              >
                <div className="flex items-start justify-between">
                  <span className="display text-lg tracking-wide">
                    ALGÉRIE
                  </span>
                  <span className="display text-3xl text-gold">{year}</span>
                </div>
                <span className="display text-sm tracking-wider text-sand/90">
                  TRAIL CHREA · {event.location.altitudeM} M
                </span>
              </div>
            </div>
          </motion.div>

          {/* cancellation mark strikes the corner once the stamp lands */}
          <motion.svg
            viewBox="0 0 210 110"
            aria-hidden="true"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.25 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: reduced ? 0.3 : 0.45,
                delay: 0.55,
                ease: easeOutQuint,
              },
            }}
            viewport={viewportOnce}
            className="absolute -right-8 -top-9 w-36 rotate-8 text-gold/75 sm:-right-12 sm:w-44"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            <g fill="none" stroke="currentColor">
              <circle cx="55" cy="55" r="44" strokeWidth="1.5" />
              <circle cx="55" cy="55" r="27" strokeWidth="1" />
              {/* killer bars — the wavy cancellation lines */}
              <g strokeWidth="1.5">
                <path d="M 106 40 q 10 -7 20 0 t 20 0 t 20 0 t 20 0 t 20 0" />
                <path d="M 106 55 q 10 -7 20 0 t 20 0 t 20 0 t 20 0 t 20 0" />
                <path d="M 106 70 q 10 -7 20 0 t 20 0 t 20 0 t 20 0 t 20 0" />
              </g>
            </g>
            <defs>
              <path id="postmark-top" d="M 19.5 55 A 35.5 35.5 0 0 1 90.5 55" />
              <path id="postmark-bottom" d="M 19.5 55 A 35.5 35.5 0 0 0 90.5 55" />
            </defs>
            <g fill="currentColor" fontSize="10" letterSpacing="2">
              <text>
                <textPath href="#postmark-top" startOffset="50%" textAnchor="middle">
                  CHRÉA · BLIDA
                </textPath>
              </text>
              <text>
                <textPath href="#postmark-bottom" startOffset="50%" textAnchor="middle">
                  ALGÉRIE
                </textPath>
              </text>
            </g>
            <text
              x="55"
              y="59"
              textAnchor="middle"
              fill="currentColor"
              fontSize="11.5"
            >
              {cancelDate}
            </text>
          </motion.svg>
        </div>

        <div className="min-w-0">
          <Reveal variant="mask" as="h2" className="display text-5xl sm:text-6xl lg:text-7xl">
            {t.welcome.title}
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-6 max-w-2xl text-base leading-relaxed text-sand/90 sm:text-lg">
            {t.welcome.body}
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-sm font-medium text-gold">
            {t.hero.location} · {t.hero.date}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
