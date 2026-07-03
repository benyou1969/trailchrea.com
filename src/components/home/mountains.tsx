/**
 * Hero scenery layers, back to front. Each is a full-width SVG band anchored
 * to the bottom of the hero; the parallax offsets are applied by the hero.
 * Colors step from hazy far-ridge green to cedar-deep foreground.
 */

function Ridge({
  d,
  fill,
  className,
}: {
  d: string;
  fill: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={className}
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

export function RidgeFar({ className }: { className?: string }) {
  return (
    <Ridge
      className={className}
      fill="#3a604f"
      d="M0 356l90-44 74 30 96-58 82 40 108-74 96 52 90-32 104 58 92-44 98 36 110-62 84 44 96-28 120 52 100-38v332H0Z"
    />
  );
}

export function RidgeMid({ className }: { className?: string }) {
  return (
    <Ridge
      className={className}
      fill="#28503f"
      d="M0 412l112-70 88 44 118-92 94 56 122-70 104 64 96-40 128 74 98-52 116 60 122-78 92 48 90-30v244H0Z"
    />
  );
}

export function RidgeNear({ className }: { className?: string }) {
  return (
    <Ridge
      className={className}
      fill="#1b4332"
      d="M0 468l136-96 104 58 132-108 118 72 142-88 122 76 132-56 148 90 130-64 124 70 152-86v284H0Z"
    />
  );
}

/** One cedar silhouette: stacked branch tiers + trunk, like the logo mark. */
function Cedar({
  x,
  scale,
  fill,
}: {
  x: number;
  scale: number;
  fill: string;
}) {
  return (
    <g transform={`translate(${x} 560) scale(${scale}) translate(0 -118)`} fill={fill}>
      <path d="M-4 118V96m4 22V96h-4m2-96L38 62H24l16 34H26l14 26H-40l14-26h-14l16-34h-14L-2 0Z" />
    </g>
  );
}

export function CedarForeground({ className }: { className?: string }) {
  const fill = "#10291f";
  return (
    <svg
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={className}
    >
      {/* foreground hill */}
      <path
        d="M0 512l180-38 210 30 240-44 250 36 220-28 200 34 140-22v80H0Z"
        fill={fill}
      />
      <Cedar x={90} scale={1.15} fill={fill} />
      <Cedar x={215} scale={0.7} fill={fill} />
      <Cedar x={1180} scale={1.3} fill={fill} />
      <Cedar x={1330} scale={0.85} fill={fill} />
      <Cedar x={1420} scale={0.6} fill={fill} />
    </svg>
  );
}
