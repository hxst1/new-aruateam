"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import sessions from "@/data/gallery.json";
import type { GallerySession } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import LightboxMin from "@/components/lightboxMin";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" }).format(
      new Date(iso)
    );
  } catch {
    return iso;
  }
}

export default function GalleryPage() {
  const data = (sessions as GallerySession[]).slice();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<{ sid: string; index: number } | null>(
    null
  );

  const current = useMemo(() => {
    if (!active) return null;
    const s = data.find((x) => x.id === active.sid);
    if (!s) return null;
    return { session: s, index: active.index };
  }, [active, data]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Gallery</h1>
        <p className="text-sm text-muted">
          Sesiones, eventos y lifestyle de ARUATEAM (crédito a fotógrafos).
        </p>
      </header>

      <div className="space-y-12">
        {data.map((s) => (
          <section key={s.id}>
            <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {s.title}
                </h2>
                <p className="text-xs text-muted">
                  Por{" "}
                  {s.photographer.instagram ? (
                    <a
                      href={`https://instagram.com/${s.photographer.instagram.replace(
                        /^@/,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-brand"
                    >
                      {s.photographer.name}{" "}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    s.photographer.name
                  )}{" "}
                  · {formatDate(s.date)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {s.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActive({ sid: s.id, index: i });
                    setOpen(true);
                  }}
                  className="group relative overflow-hidden rounded-xl border brd focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt ?? ""}
                    width={1200}
                    height={1200}
                    className="h-48 w-full object-cover sm:h-56 md:h-64 transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA simple hacia Shop (natural) */}
      <section className="mt-12">
        <div className="rounded-2xl border brd bg-[var(--card)] p-6 text-center">
          <p className="text-sm text-muted">
            Si te mola lo que ves, por aquí tienes nuestro shop. Sin prisa.
          </p>
          <div className="mt-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[var(--brand-fg)] hover:shadow-[0_0_0_4px_var(--brand-ring)]"
            >
              Ir al Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {open && current && (
        <LightboxMin
          images={current?.session.images ?? []}
          index={current?.index ?? 0}
          open={!!current && open}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
