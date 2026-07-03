"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera, Droplets, Medal, ScrollText, Shield, Shirt } from "lucide-react";

import { event } from "@/config/race";
import { easeOutQuint, viewportOnce } from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";
import { Contours } from "@/components/ui/contours";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  assurance: Shield,
  photographie: Camera,
  tshirt: Shirt,
  eau: Droplets,
  medaille: Medal,
  certificat: ScrollText,
};

/**
 * Runner's pack — one cedar-drenched strip, icons on a hairline grid.
 * Section identity: the lattice is uncovered like a kit checklist unrolling
 * (clip-path wipe in reading direction); tiles never move, so the hairline
 * grid stays rigid.
 */
export function Included() {
  const { t, dir } = useI18n();
  const reduced = useReducedMotion();
  const rtl = dir === "rtl";

  const container = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { clipPath: rtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
        visible: {
          clipPath: "inset(0 0% 0 0%)",
          transition: {
            duration: 0.8,
            ease: easeOutQuint,
            staggerChildren: 0.05,
            delayChildren: 0.1,
          },
        },
      };

  const tile = {
    hidden: { opacity: reduced ? 1 : 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="clip-diagonal-top relative z-10 overflow-hidden bg-cedar text-sand">
      <Contours className="text-sand/6" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 pt-32 sm:px-6">
        <Reveal variant="mask" as="h2" className="display text-5xl sm:text-6xl">
          {t.included.title}
        </Reveal>
        <Reveal as="p" delay={0.15} className="mt-4 max-w-lg text-base leading-relaxed text-cedar-mist">
          {t.included.subtitle}
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={container}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/12 sm:grid-cols-3 lg:grid-cols-6"
        >
          {event.included.map((item) => {
            const Icon = icons[item.id];
            return (
              <motion.div
                key={item.id}
                variants={tile}
                className="flex flex-col items-center gap-4 bg-cedar px-4 py-10"
              >
                <Icon className="size-8 text-gold" aria-hidden="true" />
                <span className="text-center text-sm font-semibold">
                  {t.included.items[item.id]}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-sm text-cedar-mist">
            {t.included.chipNotice}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
