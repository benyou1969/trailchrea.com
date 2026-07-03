"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

import { stats } from "@/config/race";
import {
  easeOutExpo,
  ruleDrawY,
  staggerChildren,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";

function formatStat(v: number, decimals: number) {
  return v.toLocaleString("fr-DZ", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Count-up numeral. Writes straight to the DOM node during the tween —
 * a setState per frame × 4 counters would jank the mid-range Android target.
 */
function Counter({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduced) {
      ref.current.textContent = formatStat(value, decimals);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: easeOutExpo,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = formatStat(v, decimals);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatStat(0, decimals)}
    </span>
  );
}

/**
 * The race in four numbers — one dark band, huge condensed numerals.
 * Section identity: each hairline rule draws down like a surveyor's mark,
 * then its numbers fade in and count up.
 */
export function Stats() {
  const reduced = useReducedMotion();

  const contentVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ...transitionBase, delay: 0.15 },
        },
      };

  return (
    <section className="clip-diagonal-top relative z-10 bg-night text-sand">
      <div className="mx-auto max-w-6xl px-4 py-20 pt-28 sm:px-6">
        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerChildren(0.1)}
          className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{ hidden: {}, visible: {} }}
              className="relative ps-5"
            >
              <motion.span
                aria-hidden="true"
                variants={reduced ? undefined : ruleDrawY}
                className="absolute inset-y-0 start-0 w-px origin-top bg-white/15"
              />
              <motion.div variants={contentVariants} className="flex flex-col gap-2">
                <dd className="display order-1 text-6xl font-bold text-gold sm:text-7xl">
                  <Counter value={stat.value} decimals={stat.decimals ?? 0} />
                  {stat.suffix}
                </dd>
                <dt className="order-2 max-w-[16ch] text-sm font-medium text-sand/80">
                  {stat.label}
                </dt>
              </motion.div>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
