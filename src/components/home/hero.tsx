"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CalendarDays, ChevronDown, MapPin } from "lucide-react";

import { event } from "@/config/race";
import { easeOutExpo, easeOutQuint, springSnappy } from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";
import { Magnetic } from "@/components/ui/magnetic";
import { Countdown } from "@/components/home/countdown";
import {
  CedarForeground,
  RidgeFar,
  RidgeMid,
  RidgeNear,
} from "@/components/home/mountains";

/**
 * Staggered per-letter reveal; words stay unbreakable for small screens.
 * Pure CSS (animate-letter-in) so the prerendered H1 — the LCP element —
 * paints before hydration; reduced motion is handled by the global kill.
 */
function RevealTitle({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  let letterIndex = 0;
  return (
    // dir=ltr: the wordmark is Latin on every locale; per-letter inline-blocks
    // would otherwise reverse under an RTL (Arabic) document direction.
    <span dir="ltr" className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        // the space lives OUTSIDE the word span: trailing whitespace inside
        // an inline-block is trimmed and the words would run together
        <span key={w} aria-hidden="true">
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const i = letterIndex++;
              return (
                <span
                  key={i}
                  className="animate-letter-in inline-block"
                  style={{ animationDelay: `${(delay + i * 0.035).toFixed(3)}s` }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

function ParallaxLayer({
  y,
  children,
  className,
}: {
  y: MotionValue<string> | undefined;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      style={y ? { y } : undefined}
      aria-hidden="true"
      className={`absolute inset-x-0 bottom-0 ${y ? "will-change-transform" : ""} ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/** Pre-soft mist ellipse — gradient instead of a live blur filter. */
function MistBand({ animation, alpha }: { animation: string; alpha: number }) {
  return (
    <div
      className={`${animation} mx-[-10%] h-28 rounded-[100%]`}
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, rgba(250,246,240,${alpha}), transparent 70%)`,
      }}
    />
  );
}

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // daybreak overlay leaves the tree once its crossfade finishes
  const [dawnDone, setDawnDone] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Farther layers drift less; foreground races past — depth on scroll.
  const yFar = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yNear = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "48%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // the sun sinks behind RidgeMid as you scroll: rate between yFar and yMid
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const glowFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-svh overflow-hidden bg-night"
    >
      {/* dusk sky behind the ridgelines */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #1c1c1e 0%, #1e2b26 45%, #234438 100%)",
        }}
      />

      {/* morning glow — rises on load, sinks behind the mid ridge on scroll */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduced ? undefined : { y: glowY, opacity: glowFade }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: easeOutQuint }}
          style={{
            transformOrigin: "68% 66%",
            background:
              "radial-gradient(58% 42% at 68% 66%, rgba(217,164,65,0.28) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* daybreak: pre-dawn darkness lifts as the title arrives */}
      {!reduced && !dawnDone && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: easeOutQuint }}
          onAnimationComplete={() => setDawnDone(true)}
          style={{
            background:
              "linear-gradient(to bottom, #141416 0%, #17201c 45%, #1a2f28 100%)",
          }}
        />
      )}

      <ParallaxLayer y={reduced ? undefined : yFar}>
        <RidgeFar className="h-[62svh] w-full opacity-80" />
      </ParallaxLayer>

      {/* mist band drifting between the far and mid ridges */}
      <ParallaxLayer y={reduced ? undefined : yMid} className="bottom-[24svh]">
        <MistBand animation="animate-mist" alpha={0.12} />
      </ParallaxLayer>

      <ParallaxLayer y={reduced ? undefined : yMid}>
        <RidgeMid className="h-[52svh] w-full" />
      </ParallaxLayer>

      <ParallaxLayer y={reduced ? undefined : yNear} className="bottom-[10svh]">
        <MistBand animation="animate-mist-slow" alpha={0.1} />
      </ParallaxLayer>

      <ParallaxLayer y={reduced ? undefined : yNear}>
        <RidgeNear className="h-[42svh] w-full" />
      </ParallaxLayer>

      <ParallaxLayer y={reduced ? undefined : yFront}>
        <CedarForeground className="h-[34svh] w-full" />
      </ParallaxLayer>

      <div className="grain absolute inset-0" aria-hidden="true" />

      {/* content — tail widens its rhythm: badge spring opens, CTA spring closes */}
      <motion.div
        style={reduced ? undefined : { y: yContent, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-4 pb-32 pt-28 text-center sm:px-6"
      >
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springSnappy, delay: 0.15 }}
          className="display rounded-sm bg-gold px-3.5 py-1.5 text-base font-bold tracking-wider text-night"
        >
          {t.hero.edition}
        </motion.p>

        <h1 className="display mt-6 text-[clamp(3.4rem,11vw,6rem)] text-sand">
          <RevealTitle text="Trail Chrea" delay={0.25} />
          <RevealTitle
            text="2026"
            delay={0.75}
            className="block text-gold"
          />
        </h1>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95, ease: easeOutExpo }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-medium text-cedar-mist sm:text-base"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4 text-gold" aria-hidden="true" />
            {t.hero.location}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4 text-gold" aria-hidden="true" />
            {t.hero.date}
          </span>
        </motion.p>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: easeOutExpo }}
          className="mt-10"
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...springSnappy, delay: 1.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href={event.registration.url}
              target="_blank"
              rel="noopener noreferrer"
              className="display block rounded-sm bg-terracotta px-9 py-4 text-2xl font-bold tracking-wide text-sand shadow-lg shadow-terracotta/30 transition-[color,background-color,transform] duration-150 ease-(--ease-out-expo) hover:bg-terracotta-deep active:scale-[0.97]"
            >
              {t.hero.registerCta}
            </a>
          </Magnetic>
          <a
            href="#courses"
            className="display rounded-sm border border-sand/30 px-7 py-4 text-xl font-semibold tracking-wide text-sand transition-[color,background-color,border-color,transform] duration-150 ease-(--ease-out-expo) hover:border-sand/60 hover:bg-white/5 active:scale-[0.97]"
          >
            {t.hero.discoverRaces}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-gold"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-gold" />
          </span>
          {t.hero.urgency}
        </motion.p>
      </motion.div>

      {/* scroll cue — breathes, then hands the page over as you scroll */}
      <motion.div
        style={reduced ? undefined : { opacity: cueOpacity }}
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sand/60"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <ChevronDown className="animate-cue size-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
