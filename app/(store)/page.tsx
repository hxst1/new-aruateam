"use client";
import items from "@/data/items.json";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import Image from "next/image";
import { useMemo, useState } from "react";

const ALL = "Todos";

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
      const byQ =
        q.trim().length === 0
          ? true
          : (p.name + " " + (p.description ?? "") + " " + p.tags.join(" "))
              .toLowerCase()
              .includes(q.toLowerCase());
      return byCat && byQ;
    });
  }, [products, cat, q]);

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
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold"
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

      {/* GRID */}
      <section id="catalogo" className="my-12">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Catálogo</h2>
            <p className="text-sm text-muted">
              Productos ARUATEAM — demo frontend
            </p>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
