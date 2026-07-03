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

/**
 * Fade + 30px rise — the fallback section reveal (body copy, misc blocks).
 * `visible` is a dynamic variant: pass the delay via `custom={delay}` —
 * a `transition` prop on the component would be overridden by the variant.
 */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...transitionBase, delay },
  }),
};

/** Crossfade-only variant for prefers-reduced-motion. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: durations.fast, delay },
  }),
};

/**
 * Display headings: text shears up from its own baseline. Needs an
 * `overflow-clip` parent (Reveal's `mask` variant provides one).
 * y in % + no opacity — the clip does the work. RTL-safe (vertical).
 */
export const maskRise: Variants = {
  hidden: { y: "110%" },
  visible: (delay: number = 0) => ({
    y: "0%",
    transition: { duration: 0.7, ease: easeOutExpo, delay },
  }),
};

/**
 * Horizontal unveiling wipe. `rtl` flips the hidden inset so content is
 * always uncovered in reading direction.
 */
export const clipWipeX = (rtl: boolean): Variants => ({
  hidden: { clipPath: rtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 0.8, ease: easeOutQuint, delay },
  }),
});

/** Bottom-up photographic unmask (pair with an inner counter-scale). */
export const clipWipeUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: durations.slow, ease: easeOutQuint, delay },
  }),
};

/** Cards tip up from the trail base — parent needs [perspective:1200px]. */
export const cardTip: Variants = {
  hidden: { opacity: 0, y: 56, rotateX: 8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.75, ease: easeOutExpo, delay },
  }),
};

/** Vertical hairline draw (stat rules, timeline strokes). origin-top. */
export const ruleDrawY: Variants = {
  hidden: { scaleY: 0 },
  visible: (delay: number = 0) => ({
    scaleY: 1,
    transition: { duration: 0.5, ease: easeOutQuint, delay },
  }),
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
