"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product, ColorKey, SizeKey } from "@/lib/types";
import { useCart } from "@/components/cart-context";
import ColorPill from "@/components/color-pill";
import { Check, Info, Ruler, Shirt, ShoppingCart } from "lucide-react";

function formatEUR(cents: number, currency = "EUR") {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    cents / 100
  );
}
function normalizeColorway(cw: Product["colorway"]): ColorKey[] {
  if (!cw) return [];
  return (Array.isArray(cw) ? cw.slice(0, 2) : [cw]) as ColorKey[];
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<SizeKey | null>(null);

  const colors = normalizeColorway(product.colorway);
  const colorTitle =
    colors.length === 2 ? `${colors[0]} / ${colors[1]}` : colors[0] ?? "N/A";

  const hasSizes = (product.sizeOptions?.length ?? 0) > 0;
  const canBuy = product.inStock && (!hasSizes || !!size);

  const displayName = useMemo(() => {
    return product.name;
  }, [product.name]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={product.images?.[0] ?? "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-medium text-[var(--brand-fg)]">
              {product.inStock ? "En stock" : "Agotado"}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>

          {colors.length > 0 && (
            <div className="mt-2 inline-flex items-center gap-2 text-sm">
              <span className="text-muted">Color</span>
              <ColorPill
                colors={colors}
                width={64}
                height={22}
                title={`Color: ${colorTitle}`}
              />
              <span className="text-muted">{colorTitle}</span>
            </div>
          )}

          {product.description && (
            <p className="mt-3 text-muted">{product.description}</p>
          )}

          <div className="mt-4 text-xl font-semibold">
            {formatEUR(product.price, product.currency)}
          </div>

          {hasSizes && (
            <fieldset className="mt-6">
              <legend className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Shirt className="h-4 w-4" />
                Talla
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.sizeOptions!.map((s) => {
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={[
                        "rounded-full px-3 py-1.5 text-sm border transition-shadow",
                        active
                          ? "bg-brand text-[var(--brand-fg)] hover:shadow-[0_0_0_4px_var(--brand-ring)]"
                          : "bg-[var(--bg)] brd hover:shadow-[0_0_0_2px_var(--brand-ring)]",
                      ].join(" ")}
                      aria-pressed={active}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {!size && (
                <p className="mt-2 text-xs text-muted">
                  Selecciona una talla para continuar.
                </p>
              )}
            </fieldset>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-9 w-9 rounded border brd"
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <input
                className="w-14 rounded border brd bg-[var(--bg)] p-2 text-center"
                value={qty}
                onChange={(e) => {
                  const v = parseInt(e.target.value || "1", 10);
                  if (!Number.isNaN(v)) setQty(Math.max(1, Math.min(v, 99)));
                }}
                aria-label="Cantidad"
                inputMode="numeric"
              />
              <button
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="h-9 w-9 rounded border brd"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-[var(--brand-fg)] hover:shadow-[0_0_0_4px_var(--brand-ring)] disabled:opacity-50"
              disabled={!canBuy}
              onClick={() => {
                // añadimos con talla como variante
                addProduct({ ...product, name: displayName }, qty, { size });
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? "Añadir al carrito" : "Agotado"}
            </button>

            <button className="rounded-full border brd px-5 py-2.5 text-sm">
              Lista de deseos
            </button>
          </div>

          {(product.dimensions || (product.sizeOptions?.length ?? 0) > 0) && (
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
              {product.dimensions && (
                <span className="inline-flex items-center gap-1.5">
                  <Ruler className="h-4 w-4" />
                  {product.dimensions}
                </span>
              )}
              {product.sizeOptions && (
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  Guía de tallas (pronto)
                </span>
              )}
            </div>
          )}

          {product.specs && product.specs.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                <Info className="h-4 w-4" />
                Especificaciones
              </h2>
              <div className="grid grid-cols-1 gap-2 rounded-xl border brd p-4 md:grid-cols-2">
                {product.specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4"
                  >
                    <span className="text-sm text-muted">{s.label}</span>
                    <span className="text-sm">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 text-xs text-muted">
            * Demo frontend (sin backend). Stripe se añadirá más adelante.
          </div>
        </div>
      </div>
    </div>
  );
}
