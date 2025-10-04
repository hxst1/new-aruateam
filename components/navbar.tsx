"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";
import CartButton from "./cart-button";
import Logo from "./logo";
import { Store, Flag, Shirt, KeyRound, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
        href="/"
        className="inline-flex items-center gap-1.5 hover:text-brand"
        onClick={onClick}
      >
        <Store className="h-4 w-4" aria-hidden />
        <span>Tienda</span>
      </Link>
      <a
        href="#noboris"
        className="inline-flex items-center gap-1.5 hover:text-brand"
        onClick={onClick}
      >
        <Flag className="h-4 w-4" aria-hidden />
        <span>Noboris</span>
      </a>
      <a
        href="#ropa"
        className="inline-flex items-center gap-1.5 hover:text-brand"
        onClick={onClick}
      >
        <Shirt className="h-4 w-4" aria-hidden />
        <span>Ropa</span>
      </a>
      <a
        href="#accesorios"
        className="inline-flex items-center gap-1.5 hover:text-brand"
        onClick={onClick}
      >
        <KeyRound className="h-4 w-4" aria-hidden />
        <span>Accesorios</span>
      </a>
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
          {/* MÓVIL: solo palabra-marca */}
          <span className="md:hidden text-lg font-black tracking-tight mr-1">
            <span className="text-brand">ARUA</span>TEAM
          </span>

          {/* DESKTOP: logo SVG */}
          <div className="hidden md:flex items-center h-10">
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border brd bg-[var(--card)] hover:shadow-[0_0_0_4px_var(--brand-ring)]"
            aria-label="Abrir menú"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Drawer móvil */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="mobile-menu"
            role="dialog"
            aria-label="Menú principal"
            className="absolute right-0 top-0 h-dvh w-full max-w-xs bg-[var(--bg)] border-l brd shadow-2xl flex flex-col"
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

            <div className="flex-1 p-2">
              <div className="flex flex-col gap-1 text-sm">
                <NavItems onClick={() => setOpen(false)} />
              </div>

              <div className="mt-4 border-t brd pt-4">
                <div className="text-xs text-muted mb-2">Apariencia</div>
                <ThemeToggle />
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
