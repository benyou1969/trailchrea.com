"use client";

import { motion, useReducedMotion } from "framer-motion";

import { easeOutQuint, viewportOnce } from "@/lib/motion";

/**
 * The signature brand move: a race's elevation silhouette draws itself
 * start → finish, then its area fill breathes in underneath. Profiles read
 * left-to-right on every locale (SVG is unaffected by document dir).
 * `color` is any CSS color — the race cards pass the ITRA badge color.
 */
export function ElevationProfile({
  path,
  color,
  className = "h-12 w-full",
}: {
  path: string;
  color: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const stroke = color || "var(--color-cedar)";

  return (
    <svg
      viewBox="0 0 200 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        d={`${path} L200 48 L0 48 Z`}
        fill={stroke}
        initial={{ opacity: reduced ? 0.08 : 0 }}
        whileInView={{ opacity: 0.08 }}
        viewport={viewportOnce}
        transition={{ duration: 0.4, delay: reduced ? 0 : 1.1 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={reduced ? undefined : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: easeOutQuint }}
      />
    </svg>
  );
}
