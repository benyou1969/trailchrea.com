import Image from "next/image";

import { event } from "@/config/race";
import { cn } from "@/lib/utils";

/**
 * The terracotta registration CTA with the DZ Moves platform mark —
 * one source of truth for the brand's primary action. Size/layout per
 * context comes in through className; the logo scales with the font.
 */
export function RegisterButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={event.registration.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "display inline-flex items-center justify-center gap-2 rounded-sm bg-terracotta font-bold tracking-wide text-sand transition-[color,background-color,transform] duration-150 ease-(--ease-out-expo) hover:bg-terracotta-deep active:scale-[0.97]",
        className,
      )}
    >
      <Image
        src="/images/dzmoves.png"
        alt=""
        width={35}
        height={33}
        className="h-[1.3em] w-auto shrink-0"
      />
      {children}
    </a>
  );
}
