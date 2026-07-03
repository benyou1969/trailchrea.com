"use client";

import { motion } from "framer-motion";

import { easeOutQuint } from "@/lib/motion";

/**
 * Page-level crossfade on route change — opacity only, on purpose: a live
 * transform here would become the containing block for fixed descendants
 * (lightbox, drawer) and double-move each page's own entrance choreography.
 * Exits are structurally unavailable (template remounts), so every page's
 * first section carries the arrival identity.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: easeOutQuint }}
    >
      {children}
    </motion.div>
  );
}
