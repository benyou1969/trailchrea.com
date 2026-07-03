"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { clipWipeUp, easeOutExpo, springSoft } from "@/lib/motion";
import { useI18n } from "@/components/i18n-provider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * Placeholder scenes generated into /public/gallery — swap for real race
 * photography (same filenames) when the organizers deliver it.
 */
const photos = [
  { src: "/gallery/01-lever-de-soleil.svg", alt: "Lever de soleil sur les crêtes de Chréa", wide: true },
  { src: "/gallery/02-cretes-dans-la-brume.svg", alt: "Crêtes dans la brume matinale" },
  { src: "/gallery/03-foret-de-cedres.svg", alt: "Sentier dans la forêt de cèdres" },
  { src: "/gallery/04-sentier-terracotta.svg", alt: "Single track au coucher du soleil" },
  { src: "/gallery/05-nuit-au-sommet.svg", alt: "Nuit étoilée au sommet" },
  { src: "/gallery/06-arrivee-doree.svg", alt: "Lumière dorée sur la ligne d'arrivée", wide: true },
];

/** Entrance counter-zoom paired with the tile's bottom-up unmask. */
const settleScale = {
  hidden: { scale: 1.12 },
  visible: {
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  // -1 = arrived from the right (prev), +1 = from the left (next), 0 = open
  const [slideDir, setSlideDir] = useState(0);
  const photo = photos[index];

  const prev = useCallback(() => {
    setSlideDir(-1);
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, onNavigate]);
  const next = useCallback(() => {
    setSlideDir(1);
    onNavigate((index + 1) % photos.length);
  }, [index, onNavigate]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  // move focus into the dialog; hand it back to the trigger on close
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus();
  }, []);

  const figureVariants = reduced
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        // photo nav slides in arrow direction; first open springs from scale
        enter: (d: number) =>
          d === 0 ? { opacity: 0, scale: 0.92 } : { opacity: 0, x: d * 40 },
        center: (d: number) => ({
          opacity: 1,
          scale: 1,
          x: 0,
          transition:
            d === 0 ? springSoft : { duration: 0.28, ease: easeOutExpo },
        }),
        exit: (d: number) => ({
          opacity: 0,
          x: d === 0 ? 0 : d * -28,
          scale: d === 0 ? 0.97 : 1,
          transition: { duration: 0.2, ease: easeOutExpo },
        }),
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      className="fixed inset-0 z-(--z-lightbox) flex items-center justify-center bg-night/92 p-4 backdrop-blur-sm"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.gallery.close}
        className="absolute right-4 top-4 rounded-sm p-2.5 text-sand transition-[color,background-color,transform] duration-150 ease-(--ease-out-expo) hover:bg-white/10 active:scale-[0.94]"
      >
        <X className="size-6" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label={t.gallery.previous}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-sm p-2 text-sand transition-[color,background-color,transform] duration-150 ease-(--ease-out-expo) hover:bg-white/10 active:scale-[0.94] sm:left-6"
      >
        <ChevronLeft className="size-8" aria-hidden="true" />
      </button>

      <AnimatePresence mode="popLayout" custom={slideDir}>
        <motion.figure
          key={photo.src}
          custom={slideDir}
          variants={figureVariants}
          initial="enter"
          animate="center"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="max-h-full"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={1200}
            height={900}
            className="max-h-[78svh] w-auto rounded-md object-contain"
          />
          <figcaption className="mt-3 text-center text-sm text-sand/80">
            {photo.alt}
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label={t.gallery.next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-2 text-sand transition-[color,background-color,transform] duration-150 ease-(--ease-out-expo) hover:bg-white/10 active:scale-[0.94] sm:right-6"
      >
        <ChevronRight className="size-8" aria-hidden="true" />
      </button>
    </motion.div>
  );
}

export function Gallery() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal
          variant="mask"
          as="h2"
          className="display text-5xl text-night sm:text-6xl"
        >
          {t.gallery.title}
        </Reveal>
        <Reveal as="p" delay={0.15} className="mt-4 max-w-xl text-base leading-relaxed text-stone">
          {t.gallery.subtitle}
        </Reveal>

        {/* photographic unmask: tiles uncover bottom-up while the image settles */}
        <RevealGroup
          stagger={0.08}
          className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {photos.map((photo, i) => (
            <RevealItem
              key={photo.src}
              variants={clipWipeUp}
              className={photo.wide ? "col-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={photo.alt}
                className="group block h-full w-full overflow-hidden rounded-md transition-transform duration-150 ease-(--ease-out-expo) active:scale-[0.98]"
              >
                <motion.div
                  variants={reduced ? undefined : settleScale}
                  className="h-full w-full"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-(--ease-out-quint) motion-safe:group-hover:scale-105"
                  />
                </motion.div>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
