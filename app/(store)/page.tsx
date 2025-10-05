"use client";
import items from "@/data/items.json";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const ALL = "Todos";
const LIMIT = 6;

export default function HomePage() {
  const products = items as Product[];

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const [cat, setCat] = useState<string>(ALL);
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const byCat = cat === ALL ? true : p.tags?.includes(cat);
      const haystack = (
        p.name +
        " " +
        (p.description ?? "") +
        " " +
        p.tags.join(" ")
      ).toLowerCase();
      const byQ =
        q.trim().length === 0 ? true : haystack.includes(q.toLowerCase());
      return byCat && byQ;
    });
  }, [products, cat, q]);

  const visible = filtered.slice(0, LIMIT);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* HERO */}
      <section className="relative my-10 overflow-hidden rounded-2xl border brd bg-[var(--card)]">
        <div className="absolute inset-0 -z-10 opacity-20" aria-hidden>
          <svg
            className="h-full w-full"
            viewBox="0 0 800 400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--brand)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {Array.from({ length: 16 }).map((_, i) => (
              <rect
                key={i}
                x={i * 50}
                y={0}
                width={2}
                height={400}
                fill="url(#g)"
              />
            ))}
          </svg>
        </div>

        <div className="grid items-center gap-6 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              ARUATEAM <span className="text-brand">DRIFT</span> SUPPLY
            </h1>
            <p className="mt-3 max-w-prose text-base text-muted">
              Lanyards, noboris, llaveros, camisetas y sudaderas. Tonos negros
              en modo oscuro con acento morado; en claro, acento rojo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-[var(--brand-fg)]"
              >
                Ver catálogo
              </a>
              <a
                href="#accesorios"
                className="rounded-full border brd px-4 py-2 text-sm"
              >
                Accesorios
              </a>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-2xl border brd bg-[var(--bg)]">
            <Image
              src="/images/test.jpg"
              alt="Foto de productos ARUATEAM"
              width={800}
              height={600}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="my-12">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Catálogo</h2>
              <p className="text-sm text-muted">
                Mostrando {Math.min(LIMIT, filtered.length)} de{" "}
                {filtered.length}
              </p>
            </div>
            <Link
              href="/shop"
              className="rounded-full border brd px-3 py-1.5 text-xs sm:text-sm hover:shadow-[0_0_0_4px_var(--brand-ring)]"
            >
              Ver catálogo completo
            </Link>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar…"
              className="rounded-lg border brd bg-[var(--bg)] px-3 py-2 text-sm"
            />
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="rounded-lg border brd bg-[var(--card)] px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border brd bg-card p-8 text-sm text-muted">
            No hay productos que coincidan con tu búsqueda.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* CTA bajo el grid */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/shop"
                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[var(--brand-fg)] hover:shadow-[0_0_0_4px_var(--brand-ring)]"
              >
                Ver el catálogo completo
              </Link>
            </div>
          </>
        )}
      </section>

      {/* GALERÍA (teaser) */}
      <section className="my-16">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Galería</h3>
            <p className="text-sm text-muted">
              Sesiones, eventos y lifestyle ARUATEAM
            </p>
          </div>
          <Link
            href="/gallery"
            className="rounded-full border brd px-3 py-1.5 text-xs sm:text-sm hover:shadow-[0_0_0_4px_var(--brand-ring)]"
          >
            Ver galería
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {/* Sustituye por tus imágenes reales */}
          {[
            "/images/test.jpg",
            "/images/test1.jpg",
            "/images/test2.jpg",
            "/images/test3.jpg",
            "/images/test4.jpg",
            "/images/test5.jpg",
            "/images/test1.jpg",
            "/images/test2.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-xl border brd"
            >
              <Image
                src={src}
                alt={`Galería ${i + 1}`}
                width={600}
                height={600}
                className="h-40 w-full object-cover sm:h-44 md:h-48 transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.06]"
              />
              {/* overlay suave */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/gallery"
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[var(--brand-fg)] hover:shadow-[0_0_0_4px_var(--brand-ring)]"
          >
            Ver galería completa
          </Link>
        </div>
      </section>
    </div>
  );
}
