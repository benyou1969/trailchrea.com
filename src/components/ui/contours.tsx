import { cn } from "@/lib/utils";

/**
 * Topographic contour texture — concentric irregular loops like an IGN map
 * of the Chréa massif. Drifts slowly via the shared mist keyframes.
 * Parent needs `relative overflow-hidden`; place content above with z-10.
 */
export function Contours({
  className,
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  const rings = [
    "M300 260c-90-70-60-160 40-180s240-10 300 50 40 150-60 190-190 10-280-60Z",
    "M320 245c-72-58-48-130 34-146s196-8 244 40 32 122-50 154-156 10-228-48Z",
    "M342 230c-56-45-38-102 26-115s154-6 192 32 25 96-40 121-122 8-178-38Z",
    "M365 216c-40-33-27-75 19-84s112-5 140 23 18 70-29 88-90 6-130-27Z",
    "M388 202c-25-20-17-47 12-53s70-3 88 15 11 44-18 55-57 4-82-17Z",
  ];
  return (
    <svg
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full animate-mist-slow",
        className,
      )}
    >
      <g fill="none" stroke={stroke} strokeWidth="1.2">
        {rings.map((d) => (
          <path key={d} d={d} />
        ))}
        {/* second massif, offset */}
        <g transform="translate(320 140) scale(0.9)">
          {rings.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}
