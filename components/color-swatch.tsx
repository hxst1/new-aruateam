"use client";

import { useId } from "react";
import type { ColorKey } from "@/lib/types";

type Props = {
  colors: ColorKey[]; // ["purple"] | ["purple","black"]
  size?: number; // px
  className?: string;
  title?: string;
};

const MAP: Record<ColorKey, string> = {
  black: "#0b0b0e",
  purple: "#8b5cf6",
  red: "#ef4444",
  white: "#ffffff",
};

export default function ColorSwatch({
  colors,
  size = 20,
  className = "",
  title,
}: Props) {
  const id = useId();
  const [c1, c2] =
    colors.length >= 2 ? [colors[0], colors[1]] : [colors[0], undefined];

  const fill1 = MAP[c1];
  const fill2 = c2 ? MAP[c2] : MAP[c1];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden={!title}
      role={title ? "img" : "presentation"}
      shapeRendering="geometricPrecision"
      preserveAspectRatio="xMidYMid meet"
    >
      {title && <title>{title}</title>}

      <defs>
        <clipPath id={`clip-${id}`}>
          {/* r=48 para dejar sitio al stroke sin que se corte */}
          <circle cx="46" cy="46" r="45" />
        </clipPath>
      </defs>

      <g clipPath={`url(#clip-${id})`}>
        {/* base */}
        <rect x="0" y="0" width="100" height="100" fill={fill1} />
        {/* diagonal 45° (llenando triángulo inferior-derecha) */}
        {c2 && <polygon points="100,0 100,100 0,100" fill={fill2} />}
      </g>

      {/* borde nítido con tu token --brd */}
      <circle
        cx="46"
        cy="46"
        r="45"
        fill="none"
        stroke="var(--brd)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
