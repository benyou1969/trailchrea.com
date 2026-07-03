import Image from "next/image";

import { cn } from "@/lib/utils";

/** Mark: the official Trail Chréa badge. Transparent PNG, works on any surface.
 * logo-192 is a downscaled copy of logo.png (1024px original kept for OG/print). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo-192.png"
      alt=""
      aria-hidden="true"
      width={96}
      height={96}
      loading="eager"
      className={cn("size-9 shrink-0", className)}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="display text-2xl leading-none tracking-wide">
        Trail{" "}
        <span className="font-extrabold">Chrea</span>
      </span>
    </span>
  );
}
