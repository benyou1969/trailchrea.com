"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  fadeOnly,
  fadeRise,
  maskRise,
  staggerChildren,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Section-standard whileInView reveal, once. Default is fade + 30px rise;
 * pass `variants` for a section-specific move (see src/lib/motion.ts
 * vocabulary), or `variant="mask"` for the display-heading baseline shear.
 * Delay travels through `custom` — dynamic variants own their transitions.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "rise",
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "p" | "h2" | "h3";
  variant?: "rise" | "mask";
  variants?: Variants;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag];

  if (variant === "mask" && !reduced) {
    // The viewport trigger MUST live on the clip parent: the sheared inner
    // span starts fully clipped, and IntersectionObserver never fires for
    // an element hidden by an ancestor's overflow clip.
    // pb offsets Barlow's tight 0.92 line-height so descenders survive.
    return (
      <MotionTag
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={cn("overflow-clip pb-[0.08em]", className)}
      >
        <motion.span
          variants={maskRise}
          custom={delay}
          className="block will-change-transform"
        >
          {children}
        </motion.span>
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduced ? fadeOnly : (variants ?? fadeRise)}
      custom={delay}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its `Reveal`-variant children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerChildren(stagger, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Child item for RevealGroup. Accepts a variants override per section. */
export function RevealItem({
  children,
  className,
  variants,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={reduced ? fadeOnly : (variants ?? fadeRise)}
      className={cn(className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}
