"use client";
import items from "@/data/items.json";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { useMemo, useState } from "react";

const ALL = "Todos";
type SortKey = "relevance" | "price-asc" | "price-desc" | "name";

export default function ShopPage() {
  const products = items as Product[];

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const [cat, setCat] = useState<string>(ALL);
  const [q, setQ] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("relevance");

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

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "name":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "relevance":
      default:
        break;
    }
    return arr;
  }, [filtered, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shop</h1>
          <p className="text-sm text-muted">{sorted.length} productos</p>
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
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border brd bg-[var(--card)] px-3 py-2 text-sm"
          >
            <option value="relevance">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A–Z</option>
          </select>
        </div>
      </header>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border brd bg-card p-8 text-sm text-muted">
          No hay productos que coincidan con tu búsqueda.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
