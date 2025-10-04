import * as React from "react";
import items from "@/data/items.json";
import type { Product } from "@/lib/types";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>; // 👈 params es un Promise
}) {
  const { slug } = React.use(params); // 👈 desempaquetar

  const product = (items as Product[]).find((p) => p.slug === slug);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
