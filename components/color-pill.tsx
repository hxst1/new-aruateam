"use client";

import { useId } from "react";
import type { ColorKey } from "@/lib/types";

type Props = {
  colors: ColorKey[]; // 1 o 2 colores
  width?: number; // px
  height?: number; // px
  className?: string;
  title?: string;
};

const MAP: Record<ColorKey, string> = {
  black: "#0b0b0e",
  purple: "#8b5cf6",
  red: "#ef4444",
  white: "#ffffff",
};

export default function ColorPill({
  colors,
  width = 56,
  height = 20,
  className = "",
  title,
}: Props) {
  const id = useId();
  const radius = Math.min(height / 2, 12); // radios suaves
  const [c1, c2] =
    colors.length >= 2 ? [colors[0], colors[1]] : [colors[0], undefined];

  const fill1 = MAP[c1];
  const fill2 = c2 ? MAP[c2] : MAP[c1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={!title}
      shapeRendering="geometricPrecision"
      preserveAspectRatio="xMidYMid meet"
    >
      {title && <title>{title}</title>}

      <defs>
        <clipPath id={`pill-clip-${id}`}>
          <rect
            x="1"
            y="1"
            width={width - 2}
            height={height - 2}
            rx={radius}
            ry={radius}
          />
        </clipPath>
      </defs>

      <g clipPath={`url(#pill-clip-${id})`}>
        <rect x="0" y="0" width={width} height={height} fill={fill1} />
        {c2 && (
          // triángulo diagonal que rellena mitad inferior-derecha
          <polygon
            points={`${width},0 ${width},${height} 0,${height}`}
            fill={fill2}
          />
        )}
      </g>

      {/* borde con tu token --brd */}
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx={radius}
        ry={radius}
        fill="none"
        stroke="var(--brd)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
