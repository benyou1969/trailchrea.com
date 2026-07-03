"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { event } from "@/config/race";
import { easeOutExpo, easeOutQuint, staggerChildren, viewportOnce } from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";
import { LogoMark } from "@/components/layout/logo";

/** Quiet fade for the credentials blocks — zero displacement on purpose. */
const blockFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
};

/**
 * Who's behind the race — quiet institutional strip above the footer.
 * Its baseline hairline draws itself center-out (RTL-neutral), then the
 * four blocks settle in with no movement: credentials, not choreography.
 */
export function Organizers() {
  const { t } = useI18n();
  return (
    <section className="relative bg-sand">
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: easeOutQuint }}
        style={{ transformOrigin: "50% 0" }}
        className="absolute inset-x-0 top-0 h-px bg-night/10"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren(0.08, 0.2)}
        className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between"
      >
        <motion.a
          variants={blockFade}
          href={event.contact.organizerInstagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4"
        >
          <LogoMark className="size-12 text-cedar" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">
              {t.organizers.main}
            </p>
            <p className="display text-3xl text-night transition-colors group-hover:text-terracotta-deep">
              {event.organizers.main}
            </p>
          </div>
        </motion.a>

        <motion.div variants={blockFade} className="flex items-center gap-4">
          <Image
            src="/images/djs-blida-logo.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-auto shrink-0"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">
              {t.organizers.support}
            </p>
            <p className="display text-3xl text-night">
              {event.organizers.support}
            </p>
          </div>
        </motion.div>

        <motion.a
          variants={blockFade}
          href={event.organizers.collaborationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4"
        >
          <Image
            src="/images/dzmoves.png"
            alt=""
            width={56}
            height={52}
            className="h-12 w-auto shrink-0 animate-stride"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">
              {t.organizers.collaboration}
            </p>
            <p className="display text-3xl text-night transition-colors group-hover:text-terracotta-deep">
              {event.organizers.collaboration}
            </p>
          </div>
        </motion.a>

        <motion.a
          variants={blockFade}
          href={event.featuredOn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4"
        >
          <Image
            src="/images/itra-logo.webp"
            alt=""
            width={60}
            height={48}
            className="h-12 w-auto shrink-0"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">
              {t.organizers.featuredOn}
            </p>
            <p className="display text-3xl text-night transition-colors group-hover:text-terracotta-deep">
              {event.featuredOn.abbreviation}
            </p>
            <p className="text-xs text-stone">{event.featuredOn.name}</p>
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
