"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { differenceInSeconds } from "date-fns";

import { event } from "@/config/race";
import { easeOutExpo } from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";

interface Remaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function remainingTo(target: Date): Remaining {
  const total = Math.max(0, differenceInSeconds(target, new Date()));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: String(days).padStart(3, "0"),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

/**
 * One digit cell — split-flap read: the old face folds down from a bottom
 * hinge (fast) while the new face drops in from a top hinge, so each digit
 * is static ≥65% of every second.
 */
function FlipDigit({ digit }: { digit: string }) {
  const reduced = useReducedMotion();
  return (
    <span
      className="relative inline-flex h-[1.15em] w-[0.62em] items-center justify-center overflow-hidden rounded-xs bg-white/8 ring-1 ring-white/12"
      style={{ perspective: 300 }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={
            reduced ? { opacity: 0 } : { rotateX: -90, opacity: 0, originY: 0 }
          }
          animate={{
            rotateX: 0,
            opacity: 1,
            originY: 0,
            transition: {
              rotateX: { duration: 0.3, ease: easeOutExpo },
              opacity: { duration: 0.15 },
            },
          }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.15 } }
              : {
                  rotateX: 90,
                  opacity: 0,
                  originY: 1,
                  transition: {
                    rotateX: { duration: 0.22, ease: easeOutExpo },
                    opacity: { duration: 0.15 },
                    originY: { duration: 0 },
                  },
                }
          }
          className="display block font-bold will-change-transform"
          style={{ backfaceVisibility: "hidden" }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* dir=ltr: Western digits keep their order under an RTL document */}
      <span
        dir="ltr"
        className="flex gap-[3px] text-3xl text-sand sm:text-4xl md:text-5xl"
      >
        {value.split("").map((digit, i) => (
          <FlipDigit key={`${i}-${value.length}`} digit={digit} />
        ))}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
        {label}
      </span>
    </div>
  );
}

/**
 * Flip-clock countdown to the first start (21 Nov 2026, 08:00).
 * Renders a static placeholder until mounted so the prerendered HTML
 * never disagrees with the client (static export = built ahead of time).
 * The interval only runs while the clock is in the viewport — no perpetual
 * per-second work while the visitor reads the rest of the page.
 */
export function Countdown() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const [now, setNow] = useState<Remaining | null>(null);

  useEffect(() => {
    if (!inView) return;
    const target = new Date(event.startDate);
    const tick = () => setNow(remainingTo(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [inView]);

  const shown: Remaining = now ?? {
    days: "---",
    hours: "--",
    minutes: "--",
    seconds: "--",
  };

  return (
    <div
      ref={rootRef}
      role="timer"
      aria-label={`${t.hero.countdown.title} — ${t.hero.date}`}
      className="flex items-end gap-3 sm:gap-5"
    >
      <Unit value={shown.days} label={t.hero.countdown.days} />
      <span className="display pb-7 text-2xl text-sand/40 sm:text-3xl">:</span>
      <Unit value={shown.hours} label={t.hero.countdown.hours} />
      <span className="display pb-7 text-2xl text-sand/40 sm:text-3xl">:</span>
      <Unit value={shown.minutes} label={t.hero.countdown.minutes} />
      <span className="display pb-7 text-2xl text-sand/40 sm:text-3xl">:</span>
      <Unit value={shown.seconds} label={t.hero.countdown.seconds} />
    </div>
  );
}
