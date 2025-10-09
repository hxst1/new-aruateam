"use client";
import Image from "next/image";
import Link from "next/link";
import type { Product, ColorKey } from "@/lib/types";
import Price from "./price";
import { useCart } from "./cart-context";
import ColorSwatch from "./color-swatch";
import { ShoppingCart } from "lucide-react";

function normalizeColorway(cw: Product["colorway"]): ColorKey[] {
  if (!cw) return [];
  return (Array.isArray(cw) ? cw.slice(0, 2) : [cw]) as ColorKey[];
}

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const colors = normalizeColorway(product.colorway);
  const colorTitle =
    colors.length === 2
      ? `${colors[0]} / ${colors[1]}`
      : colors.length === 1
      ? colors[0]
      : "no color";

  return (
    <div className="group h-full">
      <div className="card h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-0.5 flex flex-col border brd">
        {/* Media */}
        <Link
          href={`/product/${product.slug}`}
          className="block cursor-pointer"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={product.images?.[0] ?? "/placeholder.png"}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
            <div className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-medium text-[var(--brand-fg)]">
              {product.inStock ? "In stock" : "Sold out"}
            </div>
          </div>
        </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <Link
            href={`/product/${product.slug}`}
            className="block cursor-pointer"
          >
            <h3 className="text-base font-semibold tracking-tight">
              {product.name}
            </h3>
            {product.description && (
              <p className="mt-1 text-sm text-muted line-clamp-2">
                {product.description}
              </p>
            )}
          </Link>

          {/* Meta info */}
          <div className="mt-2 flex items-center gap-2">
            <ColorSwatch
              colors={colors}
              size={18}
              className="shrink-0"
              title={`Color: ${colorTitle}`}
            />
            {product.tags?.[0] && (
              <span className="text-xs uppercase tracking-wide text-brand">
                {product.tags[0]}
              </span>
            )}
          </div>

          {/* Footer (bottom-aligned) */}
          <div className="mt-auto flex items-center justify-between pt-3">
            <Price amount={product.price} currency={product.currency} />
            <button
              onClick={() => addProduct(product, 1)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-[var(--brand-fg)] hover:shadow-[0_0_0_4px_var(--brand-ring)] disabled:opacity-50 cursor-pointer"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-3.5 w-3.5" aria-hidden />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
