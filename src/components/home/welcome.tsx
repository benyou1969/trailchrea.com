"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useI18n } from "@/components/i18n-provider";
import { Reveal } from "@/components/ui/reveal";

/**
 * International invitation — Maqam Echahid rising over Algiers (Unsplash,
 * Daoud Abismail). Full-bleed monument with the copy pinned to its dark
 * concrete base under a night gradient; the image drifts slowly against
 * scroll (GPU translate only, disabled under reduced motion).
 */
export function Welcome() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-night text-sand"
    >
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-x-0 -inset-y-[8%]"
      >
        <Image
          src="/gallery/08-maqam-echahid.webp"
          alt={t.welcome.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* legibility: night floor fading into the sky */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/10"
      />

      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-20 pt-44 sm:px-6">
        <Reveal>
          <h2 className="display max-w-3xl text-5xl sm:text-7xl">
            {t.welcome.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-sand/90 sm:text-lg">
            {t.welcome.body}
          </p>
          <p className="mt-6 text-sm font-medium text-gold">
            {t.hero.location} · {t.hero.date}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
