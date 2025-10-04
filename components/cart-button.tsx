"use client";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./cart-context";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  X,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  Package,
  Tag,
} from "lucide-react";
import ColorSwatch from "./color-swatch";

function formatEUR(cents: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export default function CartButton() {
  const { count, state, setQty, remove, clear, total } = useCart();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // cerrar al click fuera (mejorado con pointerdown para no perder eventos)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const el = panelRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center gap-2 rounded-full border brd bg-[var(--card)] px-3 py-1.5 text-sm hover:shadow-[0_0_0_4px_var(--brand-ring)] transition-all"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="cart-drawer"
      >
        <ShoppingCart className="h-4 w-4" aria-hidden />
        <span>Carrito</span>
        {mounted && count > 0 && (
          <span className="ml-1 inline-flex items-center justify-center rounded-full bg-brand px-2 py-0.5 text-xs text-[var(--brand-fg)]">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          {/* backdrop (sigue cerrando al click) */}
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          {/* drawer */}
          <aside
            ref={panelRef}
            id="cart-drawer"
            role="dialog"
            aria-label="Carrito"
            className="absolute right-0 top-0 flex h-dvh w-full max-w-sm flex-col border-l brd bg-[var(--bg)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b brd p-4">
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold">
                <ShoppingCart className="h-5 w-5" aria-hidden />
                Tu carrito
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-muted hover:text-brand"
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="flex-1 overflow-auto divide-y"
              style={{
                borderColor: "color-mix(in oklab, var(--brd) 15%, transparent)",
              }}
            >
              {state.lines.length === 0 ? (
                <div className="p-10 text-center text-sm text-muted">
                  <Package className="mx-auto mb-3 h-6 w-6" aria-hidden />
                  Tu carrito está vacío.
                </div>
              ) : (
                state.lines.map((l) => (
                  <div key={l.key} className="flex gap-3 p-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border brd bg-card">
                      {l.image && (
                        <Image
                          src={l.image}
                          alt={l.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <Link
                        href={`/product/${l.slug}`}
                        className="font-medium hover:text-brand"
                      >
                        {l.name}
                      </Link>

                      {/* Badges: color + talla */}
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        {l.colorway && l.colorway.length > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full border brd px-2 py-0.5">
                            <ColorSwatch colors={l.colorway} title="Color" />
                            <span>Color</span>
                          </span>
                        )}
                        {l.size && (
                          <span className="rounded-full border brd px-2 py-0.5">
                            Talla: <strong className="ml-1">{l.size}</strong>
                          </span>
                        )}
                      </div>

                      {/* Precio unitario */}
                      <div className="mt-1 text-sm text-muted">
                        <Tag className="mr-1 inline h-3.5 w-3.5" aria-hidden />
                        {formatEUR(l.price)} / ud.
                      </div>

                      {/* Controles */}
                      <div className="mt-2 inline-flex items-center gap-2">
                        <button
                          onClick={() => setQty(l.key, Math.max(1, l.qty - 1))}
                          className="inline-flex h-7 w-7 items-center justify-center rounded border brd"
                          aria-label="Disminuir"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          className="w-12 rounded border brd bg-[var(--bg)] p-1 text-center"
                          value={l.qty}
                          onChange={(e) => {
                            const v = parseInt(e.target.value || "1", 10);
                            if (!Number.isNaN(v))
                              setQty(l.key, Math.max(1, Math.min(v, 99)));
                          }}
                          inputMode="numeric"
                          aria-label="Cantidad"
                        />
                        <button
                          onClick={() => setQty(l.key, Math.min(99, l.qty + 1))}
                          className="inline-flex h-7 w-7 items-center justify-center rounded border brd"
                          aria-label="Aumentar"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => remove(l.key)}
                          className="ml-3 inline-flex items-center gap-1 text-sm text-muted hover:text-brand"
                          aria-label="Eliminar producto"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </button>

                        {/* Total por línea a la derecha */}
                        <span className="ml-auto text-sm font-medium">
                          {formatEUR(l.price * l.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t brd p-4">
              <div className="flex items-center justify-between text-sm">
                <span>Total</span>
                <strong>{formatEUR(total)}</strong>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={clear}
                  className="flex-1 rounded-full border brd px-4 py-2 text-sm"
                >
                  Vaciar
                </button>
                <button
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-[var(--brand-fg)]"
                  disabled
                >
                  <CreditCard className="h-4 w-4" aria-hidden />
                  Pagar (pronto)
                </button>
              </div>
              <p className="mt-2 text-xs text-muted">
                * Demo sin backend. Stripe se añadirá más adelante.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
