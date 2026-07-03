"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Clock, Flag, Mountain, Route } from "lucide-react";

import { difficultyMeta, formatDzd, races, type Race } from "@/config/race";
import { cardTip } from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { Contours } from "@/components/ui/contours";
import { ElevationProfile } from "@/components/ui/elevation-profile";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

function TiltCard({ race }: { race: Race }) {
  const { lang, t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const lift = useMotionValue(1);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });
  const slift = useSpring(lift, { stiffness: 220, damping: 24 });
  const transform = useTransform(
    [srx, sry, slift],
    ([x, y, s]) =>
      `perspective(900px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`,
  );

  function onPointerMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 3);
    rx.set(((e.clientY - rect.top) / rect.height - 0.5) * -3);
    lift.set(1.02);
  }

  function onPointerLeave() {
    rx.set(0);
    ry.set(0);
    lift.set(1);
  }

  const difficulty = difficultyMeta[race.difficulty];

  return (
    <motion.article
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={reduced ? undefined : { transform, transformStyle: "preserve-3d" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-night/8 transition-shadow duration-300 ease-(--ease-out-quint) hover:shadow-xl hover:shadow-night/10"
    >
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-4xl text-night">{race.name}</h3>
          <span
            className={cn(
              "rounded-sm px-2.5 py-1 text-xs font-bold uppercase tracking-wide",
              difficulty.className,
            )}
          >
            {t.races.difficulty[race.difficulty]}
          </span>
        </div>

        <p className="display mt-4 text-6xl font-extrabold text-night">
          {race.distanceKm.toLocaleString("fr-DZ")}
          <span className="ml-1.5 text-2xl font-semibold text-stone">
            {t.common.km}
          </span>
        </p>

        {/* the card's hero graphic: the course's own elevation silhouette */}
        <ElevationProfile
          path={race.profilePath}
          color={race.color}
          className="mt-5 h-12 w-full"
        />

        <p className="mt-4 text-sm leading-relaxed text-stone">
          {t.races.descriptions[race.id]}
        </p>

        <dl className="mt-6 space-y-2.5 border-t border-night/8 pt-5 text-sm">
          <div className="flex items-center gap-2.5">
            <Mountain className="size-4 shrink-0 text-stone" aria-hidden="true" />
            <dt className="text-stone">{t.races.elevation}</dt>
            <dd className="ms-auto font-semibold text-night">
              {race.elevationGainM.toLocaleString("fr-DZ")} m {t.common.dPlus}
            </dd>
          </div>
          <div className="flex items-center gap-2.5">
            <Flag className="size-4 shrink-0 text-stone" aria-hidden="true" />
            <dt className="text-stone">{t.races.start}</dt>
            <dd className="ms-auto font-semibold text-night">{race.startTime}</dd>
          </div>
          {race.cutoffTime && (
            <div className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-stone" aria-hidden="true" />
              <dt className="text-stone">{t.races.cutoff}</dt>
              <dd className="ms-auto font-semibold text-night">
                {race.cutoffTime}
              </dd>
            </div>
          )}
          <div className="flex items-center gap-2.5">
            <Route className="size-4 shrink-0 text-stone" aria-hidden="true" />
            <dt className="text-stone">{t.races.price}</dt>
            <dd className="ms-auto font-semibold text-night">
              {formatDzd(race.priceDzd)}
            </dd>
          </div>
        </dl>

        {/* Hidden until the /courses page ships:
        <div className="mt-auto pt-7">
          <Link
            href={`/${lang}/courses#${race.id}`}
            className="display flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3 text-lg font-bold tracking-wide text-night ring-1 ring-night/15 transition-all duration-150 ease-(--ease-out-expo) hover:bg-night hover:text-sand active:scale-[0.97]"
          >
            {t.races.details}
            <ArrowRight
              className="size-5 rtl:-scale-x-100 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:rtl:group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
        */}
      </div>
    </motion.article>
  );
}

export function RaceCards() {
  const { t } = useI18n();
  return (
    <section id="courses" className="relative overflow-hidden bg-sand">
      <Contours className="text-cedar/8" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal
          variant="mask"
          as="h2"
          className="display max-w-xl text-5xl text-night sm:text-6xl"
        >
          {t.races.title}
        </Reveal>
        <Reveal as="p" delay={0.15} className="mt-4 max-w-xl text-base leading-relaxed text-stone">
          {t.races.subtitle}
        </Reveal>

        {/* cards tip up from the trail base — perspective lives on the grid */}
        <RevealGroup
          stagger={0.12}
          className="mt-14 grid gap-6 [perspective:1200px] md:grid-cols-3"
        >
          {races.map((race) => (
            <RevealItem
              key={race.id}
              variants={cardTip}
              style={{ transformOrigin: "50% 100%" }}
              className="h-full"
            >
              <TiltCard race={race} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
