/**
 * Centralized motion vocabulary. Every animated component imports from here
 * so the whole site shares one physical language: exponential ease-outs,
 * 30px rises, consistent stagger rhythm. GPU properties only (transform,
 * opacity, clip-path, filter) — never layout properties.
 *
 * Reduced motion: components use framer-motion's built-in `useReducedMotion`;
 * variants here expose `reduced` equivalents (crossfade, no displacement).
 */
import type { Transition, Variants } from "framer-motion";

/** ease-out-expo — fast launch, long settle. The site's default curve. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
/** ease-out-quint — slightly rounder, for large surfaces (dividers, panels) */
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;

export const durations = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

export const transitionBase: Transition = {
  duration: durations.base,
  ease: easeOutExpo,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.9,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 22,
};

/** Fade + 30px rise — the standard section reveal. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
};

/** Crossfade-only variant for prefers-reduced-motion. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.fast } },
};

/** Parent orchestrator: staggers `fadeRise` children. */
export const staggerChildren = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Per-letter reveal for the hero display title. */
export const letterReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotate: 3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Badge / chip spring entrance. */
export const springIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: springSnappy },
};

/** Standard whileInView props so sections animate once, near-viewport. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
