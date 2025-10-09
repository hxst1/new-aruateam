"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";

function formatEUR(cents: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

// Simple portal to mount into <body>
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function CartButton() {
  const { count, state, setQty, remove, clear, total } = useCart();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  // Lock body scroll when the cart is open
  useBodyScrollLock(open);

  // Close with ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer relative inline-flex items-center gap-2 rounded-full border brd bg-[var(--card)] px-3 py-1.5 text-sm hover:shadow-[0_0_0_4px_var(--brand-ring)] transition-all"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="cart-drawer"
      >
        <ShoppingCart className="h-4 w-4" aria-hidden />
        <span>Cart</span>
        {mounted && count > 0 && (
          <span className="ml-1 inline-flex items-center justify-center rounded-full bg-brand px-1.75 py-0.5 text-xs text-[var(--brand-fg)]">
            {count}
          </span>
        )}
      </button>

      {open && (
        <Portal>
          {/* Root overlay on <body> */}
          <div className="fixed inset-0 z-[100]">
            {/* Backdrop: closes on click and does NOT let events pass through */}
            <button
              type="button"
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 cursor-default"
              style={{ pointerEvents: "auto" }}
            />

            {/* Drawer */}
            <aside
              ref={panelRef}
              id="cart-drawer"
              role="dialog"
              aria-label="Shopping cart"
              className="fixed right-0 top-0 flex h-dvh w-full max-w-sm flex-col border-l brd bg-[var(--bg)] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b brd p-4">
                <h3 className="inline-flex items-center gap-2 text-lg font-semibold">
                  <ShoppingCart className="h-5 w-5" aria-hidden />
                  Shopping Cart
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-brand cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                className="flex-1 overflow-auto divide-y"
                style={{
                  borderColor:
                    "color-mix(in oklab, var(--brd) 15%, transparent)",
                }}
              >
                {state.lines.length === 0 ? (
                  <div className="p-10 text-center text-sm text-muted">
                    <Package className="mx-auto mb-3 h-6 w-6" aria-hidden />
                    Your cart is empty, sadly.
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

                        {/* Badges: color + size */}
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                          {l.colorway && l.colorway.length > 0 && (
                            <span className="inline-flex items-center gap-1 rounded-full border brd px-2 py-0.5">
                              <ColorSwatch colors={l.colorway} title="Color" />
                              <span>Color</span>
                            </span>
                          )}
                          {l.size && (
                            <span className="rounded-full border brd px-2 py-0.5">
                              Size: <strong className="ml-1">{l.size}</strong>
                            </span>
                          )}
                        </div>

                        {/* Unit price */}
                        <div className="mt-1 text-sm text-muted">
                          <Tag
                            className="mr-1 inline h-3.5 w-3.5"
                            aria-hidden
                          />
                          {formatEUR(l.price)} / ea.
                        </div>

                        {/* Controls */}
                        <div className="mt-2 inline-flex items-center gap-2">
                          <button
                            onClick={() =>
                              setQty(l.key, Math.max(1, l.qty - 1))
                            }
                            className="inline-flex h-7 w-7 items-center justify-center rounded border brd cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            className="w-12 rounded border brd bg-[var(--bg)] p-1 text-center cursor-pointer"
                            value={l.qty}
                            onChange={(e) => {
                              const v = parseInt(e.target.value || "1", 10);
                              if (!Number.isNaN(v))
                                setQty(l.key, Math.max(1, Math.min(v, 99)));
                            }}
                            inputMode="numeric"
                            aria-label="Quantity"
                          />
                          <button
                            onClick={() =>
                              setQty(l.key, Math.min(99, l.qty + 1))
                            }
                            className="inline-flex h-7 w-7 items-center justify-center rounded border brd cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => remove(l.key)}
                            className="ml-3 inline-flex items-center gap-1 text-sm text-muted hover:text-brand cursor-pointer"
                            aria-label="Delete product"
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete product</span>
                          </button>

                          {/* Line total aligned right */}
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
                    className="flex-1 rounded-full border brd px-4 py-2 text-sm cursor-pointer"
                  >
                    Empty
                  </button>
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-[var(--brand-fg)] cursor-pointer"
                    disabled
                  >
                    <CreditCard className="h-4 w-4" aria-hidden />
                    Pay (soon)
                  </button>
                </div>
                <p className="mt-2 text-xs text-muted">
                  * Demo without backend. Stripe will be added later.
                </p>
              </div>
            </aside>
          </div>
        </Portal>
      )}
    </>
  );
}
