"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { event, horsSerie, pastEditions, races } from "@/config/race";
import {
  easeOutExpo,
  springSnappy,
  springSoft,
  viewportOnce,
} from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";
import { Contours } from "@/components/ui/contours";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const fmt = (n: number) => n.toLocaleString("fr-DZ");

/**
 * Count-up numeral for the participation figures. Writes straight to the
 * DOM node during the tween (no per-frame React renders).
 */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduced) {
      ref.current.textContent = fmt(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: easeOutExpo,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = fmt(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} dir="ltr">
      {fmt(0)}
    </span>
  );
}

/** Medal photo swings upright once its row is on screen. */
function MedalImage({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -6, scale: 0.9 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={springSoft}
      className="shrink-0"
    >
      <Image
        src={src}
        alt={alt}
        width={640}
        height={880}
        className="h-auto w-28 rounded-md shadow-lg ring-1 ring-white/10 sm:w-40"
      />
    </motion.div>
  );
}

/** Participants bars are scaled against the 2026 target. */
const BAR_MAX = event.expectedParticipants;

function ParticipantsBar({
  value,
  color,
  label,
}: {
  value: number;
  color: "gold" | "terracotta";
  label: string;
}) {
  const { dir } = useI18n();
  const reduced = useReducedMotion();
  const fraction = Math.min(value / BAR_MAX, 1);
  return (
    <div className="mt-5 max-w-md">
      <p className="flex items-baseline gap-2">
        <span
          className={cn(
            "display text-4xl tabular-nums",
            color === "terracotta" ? "text-terracotta" : "text-gold",
          )}
        >
          <CountUp value={value} />
        </span>
        <span className="text-sm text-sand/75">{label}</span>
      </p>
      <div
        aria-hidden="true"
        className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          initial={reduced ? { scaleX: fraction } : { scaleX: 0 }}
          whileInView={{ scaleX: fraction }}
          viewport={viewportOnce}
          transition={{ duration: 1.4, ease: easeOutExpo }}
          style={{ transformOrigin: dir === "rtl" ? "100% 50%" : "0% 50%" }}
          className={cn(
            "h-full w-full rounded-full",
            color === "terracotta" ? "bg-terracotta" : "bg-gold",
          )}
        />
      </div>
    </div>
  );
}

function EntryDot({
  variant,
}: {
  variant: "past" | "special" | "upcoming";
}) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      initial={reduced ? { opacity: 0 } : { scale: 0 }}
      whileInView={reduced ? { opacity: 1 } : { scale: 1 }}
      viewport={viewportOnce}
      transition={springSnappy}
      className={cn(
        "absolute start-0 top-3 flex size-[11px] items-center justify-center rounded-full",
        variant === "past" && "bg-gold",
        variant === "special" && "bg-terracotta",
        variant === "upcoming" && "border-2 border-gold bg-cedar-deep",
      )}
    >
      {variant === "upcoming" && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-50" />
      )}
    </motion.span>
  );
}

/**
 * The editions timeline — a gold route line drawn by scroll progress
 * (like a GPX trace filling in), one checkpoint per edition, participant
 * bars scaled to the 2026 target, medal photos as physical proof.
 * Data: pastEditions + horsSerie in src/config/race.ts.
 */
export function History() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section
      id="editions"
      className="clip-diagonal-top relative z-10 overflow-hidden bg-cedar-deep text-sand"
    >
      <Contours className="text-sand/6" />

      <div className="relative mx-auto max-w-6xl px-4 pb-36 pt-32 sm:px-6">
        <Reveal variant="mask" as="h2" className="display text-5xl sm:text-6xl">
          {t.history.title}
        </Reveal>
        <Reveal as="p" delay={0.15} className="mt-4 max-w-xl text-base leading-relaxed text-cedar-mist">
          {t.history.subtitle}
        </Reveal>

        <ol ref={listRef} className="relative mt-16">
          {/* route line: faint rail + gold trace drawn by scroll */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 top-4 start-[5px] w-px bg-white/15"
          />
          <motion.div
            aria-hidden="true"
            style={reduced ? undefined : { scaleY: lineScale }}
            className="absolute bottom-4 top-4 start-[5px] w-px origin-top bg-gold"
          />

          {pastEditions.map((edition) => (
            <li
              key={edition.edition}
              className="relative ps-8 pb-16 sm:ps-12"
            >
              <EntryDot variant="past" />
              <Reveal>
                <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
                  <div className="min-w-0 max-w-xl flex-1 basis-72">
                    <h3 className="display text-5xl text-sand sm:text-6xl">
                      {edition.year}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-cedar-mist">
                      {t.history.editionLabels[edition.edition - 1]} ·{" "}
                      {edition.dateDisplay}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-sand/90">
                      {/* dir=ltr: keeps "10 km" and the Latin route in
                          start→finish order under the Arabic document */}
                      <span dir="ltr" className="inline-block">
                        <span className="font-semibold text-gold">
                          {edition.distances.join(" · ")}
                        </span>
                        <span className="text-sand/50"> — </span>
                        {edition.route}
                      </span>
                    </p>
                    <ParticipantsBar
                      value={edition.participants}
                      color="gold"
                      label={t.history.runners}
                    />
                    {edition.record && (
                      <p className="mt-3 text-sm text-sand/75">
                        <span className="font-semibold text-gold">
                          {t.history.record}
                        </span>
                        {edition.wilayas && edition.countries && (
                          <>
                            {" · "}
                            {edition.wilayas} {t.history.wilayas} ·{" "}
                            {edition.countries} {t.history.countries}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                  {edition.medalImage && (
                    <MedalImage
                      src={edition.medalImage}
                      alt={`${t.history.medalAlt} — ${edition.year}`}
                    />
                  )}
                </div>
              </Reveal>
            </li>
          ))}

          {/* hors-série: Trail Chiffa, terracotta accent */}
          <li className="relative ps-8 pb-16 sm:ps-12">
            <EntryDot variant="special" />
            <Reveal>
              <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
                <div className="min-w-0 max-w-xl flex-1 basis-72">
                  <h3 className="display text-4xl text-sand sm:text-5xl">
                    {horsSerie.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-cedar-mist">
                    {t.history.horsSerie} · {horsSerie.dateDisplay}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-sand/90">
                    <span dir="ltr" className="inline-block">
                      <span className="font-semibold text-gold">
                        {horsSerie.distances.join(" · ")}
                      </span>
                      <span className="text-sand/50"> — </span>
                      {horsSerie.route}
                    </span>
                  </p>
                  <ParticipantsBar
                    value={horsSerie.participants}
                    color="terracotta"
                    label={t.history.runners}
                  />
                  <p className="mt-3 text-sm text-sand/75">
                    {horsSerie.wilayas} {t.history.wilayas} ·{" "}
                    {horsSerie.countries} {t.history.countries}
                  </p>
                </div>
                <MedalImage
                  src={horsSerie.medalImage}
                  alt={`${t.history.medalAlt} — ${horsSerie.name}`}
                />
              </div>
            </Reveal>
          </li>

          {/* 2026 — the edition being written; the one CTA */}
          <li className="relative ps-8 sm:ps-12">
            <EntryDot variant="upcoming" />
            <Reveal>
              <div className="min-w-0 max-w-xl">
                <h3 className="display text-5xl text-sand sm:text-6xl">2026</h3>
                <p className="mt-2 text-sm font-medium text-cedar-mist">
                  {t.hero.edition} · {t.hero.date}
                </p>
                <p className="mt-3 text-base leading-relaxed text-sand/90">
                  <span dir="ltr" className="inline-block font-semibold text-gold">
                    {races.map((race) => fmt(race.distanceKm)).join(" · ")}{" "}
                    {t.common.km}
                  </span>
                  <span className="text-sand/50"> — </span>
                  {t.history.upcomingRoute}
                </p>
                <div className="mt-5 max-w-md">
                  <p className="flex items-baseline gap-2">
                    <span className="display text-4xl tabular-nums text-gold">
                      {fmt(event.expectedParticipants)}
                    </span>
                    <span className="text-sm text-sand/75">
                      {t.history.expected}
                    </span>
                  </p>
                  <div
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 rounded-full border border-dashed border-gold/50"
                  />
                </div>
                <a
                  href={event.registration.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="display mt-7 inline-flex items-center gap-2 rounded-sm bg-terracotta px-5 py-3 text-base font-bold tracking-wide text-sand transition-[color,background-color,transform] duration-150 ease-(--ease-out-expo) hover:bg-terracotta-deep active:scale-[0.97]"
                >
                  {t.hero.registerCta}
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}
