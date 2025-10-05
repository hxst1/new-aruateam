"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";
import CartButton from "./cart-button";
import Logo from "./logo";
import { Store, Images, Info, Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";

function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Bloquea scroll cuando el menú móvil está abierto
  useBodyScrollLock(open);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const NavItems = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Link
        href="/shop"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[15px] md:text-sm hover:text-brand"
        onClick={onClick}
      >
        <Store className="h-4 w-4" aria-hidden />
        <span>Shop</span>
      </Link>
      <Link
        href="/gallery"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[15px] md:text-sm hover:text-brand"
        onClick={onClick}
      >
        <Images className="h-4 w-4" aria-hidden />
        <span>Gallery</span>
      </Link>
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[15px] md:text-sm hover:text-brand"
        onClick={onClick}
      >
        <Info className="h-4 w-4" aria-hidden />
        <span>About us</span>
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border brd bg-[var(--bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:py-3">
        {/* Marca */}
        <Link
          href="/"
          aria-label="ARUATEAM Home"
          className="flex items-center gap-2 leading-none shrink-0"
        >
          {/* Móvil: palabra-marca */}
          <span className="md:hidden text-[18px] font-black tracking-tight mr-1">
            <span className="text-brand">ARUA</span>TEAM
          </span>

          {/* Desktop: logo SVG */}
          <div className="hidden md:flex items-center h-10 m-2">
            <Logo
              color="var(--fg)"
              starColor="var(--brand)"
              width={200}
              height={65}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3 text-sm">
          <NavItems />
          <ThemeToggle />
          <CartButton />
        </nav>

        {/* Acciones móviles */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <CartButton />
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border brd bg-[var(--card)] hover:shadow-[0_0_0_4px_var(--brand-ring)]"
            aria-label="Abrir menú"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Drawer móvil en portal (para asegurar overlay total) */}
      {open && (
        <Portal>
          <div className="fixed inset-0 z-[90] md:hidden">
            {/* Backdrop: cierra al click */}
            <button
              type="button"
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 cursor-default"
              style={{ pointerEvents: "auto" }}
            />

            {/* Panel */}
            <aside
              id="mobile-menu"
              role="dialog"
              aria-label="Menú principal"
              className="fixed right-0 top-0 h-dvh w-full max-w-xs bg-[var(--bg)] border-l brd shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b brd">
                <span className="text-base font-semibold">Menú</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-brand"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 p-3">
                <div className="flex flex-col gap-1">
                  {/* Enlaces con área táctil amplia */}
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-base hover:bg-[var(--card)] hover:text-brand"
                  >
                    <Store className="h-5 w-5" />
                    Shop
                  </Link>
                  <Link
                    href="/gallery"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-base hover:bg-[var(--card)] hover:text-brand"
                  >
                    <Images className="h-5 w-5" />
                    Gallery
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-base hover:bg-[var(--card)] hover:text-brand"
                  >
                    <Info className="h-5 w-5" />
                    About us
                  </Link>
                </div>

                <div className="mt-4 border-t brd pt-4">
                  <div className="text-xs text-muted mb-2">Apariencia</div>
                  <ThemeToggle />
                </div>
              </div>
            </aside>
          </div>
        </Portal>
      )}
    </header>
  );
}
