"use client";

import { motion, useReducedMotion } from "framer-motion";

import { event } from "@/config/race";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";

/**
 * Partner marquee — CSS keyframes (GPU translateX). Track is doubled so
 * -50% loops seamlessly. The wrapper is forced dir=ltr: partner names are
 * Latin wordmarks on every locale, and the left-anchored track + leftward
 * loop would otherwise open a growing gap under an RTL document.
 * Reduced motion: names wrap as a static list instead of a frozen track.
 */
export function Sponsors() {
  const { t, dir } = useI18n();
  const reduced = useReducedMotion();
  const rtl = dir === "rtl";
  const items = [...event.partners, ...event.partners];

  const titleVariants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { clipPath: rtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
        visible: {
          clipPath: "inset(0 0% 0 0%)",
          transition: { duration: 0.6, ease: easeOutExpo },
        },
      };

  return (
    <section className="clip-diagonal-top relative z-10 overflow-hidden bg-night py-16 pt-24 text-sand">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={titleVariants}
          className="display text-3xl text-sand/90"
        >
          {t.sponsors.title}
        </motion.h2>
      </div>

      <motion.div
        dir="ltr"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mt-10 overflow-hidden motion-reduce:[mask-image:none]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <ul className="flex w-max animate-marquee gap-20 pr-20 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:animate-none motion-reduce:justify-center motion-reduce:gap-10 motion-reduce:px-6">
          {items.map((partner, i) => (
            <li
              key={`${partner}-${i}`}
              aria-hidden={i >= event.partners.length}
              className={`display whitespace-nowrap text-5xl font-extrabold uppercase text-sand/35 ${
                i >= event.partners.length ? "motion-reduce:hidden" : ""
              }`}
            >
              {partner}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
