import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import CartButton from "./cart-button";
import Logo from "./logo";
import { Store, Flag, Shirt, KeyRound } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border brd bg-[var(--bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          aria-label="ARUATEAM Home"
          className="flex items-center gap-2 leading-none shrink-0"
        >
          <Logo
            color="var(--fg)"
            starColor="var(--brand)"
            width={200}
            height={65}
          />
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-brand"
          >
            <Store className="h-4 w-4" aria-hidden />
            <span>Tienda</span>
          </Link>
          <a
            href="#noboris"
            className="inline-flex items-center gap-1.5 hover:text-brand"
          >
            <Flag className="h-4 w-4" aria-hidden />
            <span>Noboris</span>
          </a>
          <a
            href="#ropa"
            className="inline-flex items-center gap-1.5 hover:text-brand"
          >
            <Shirt className="h-4 w-4" aria-hidden />
            <span>Ropa</span>
          </a>
          <a
            href="#accesorios"
            className="inline-flex items-center gap-1.5 hover:text-brand"
          >
            <KeyRound className="h-4 w-4" aria-hidden />
            <span>Accesorios</span>
          </a>

          <ThemeToggle />
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
