// app/about/page.tsx
import Image from "next/image";
import { Instagram, Car, Wrench, Sparkles, Calendar } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border brd bg-[var(--card)]">
        <div className="absolute inset-0 -z-10 opacity-15" aria-hidden>
          <svg
            className="h-full w-full"
            viewBox="0 0 800 400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="g-about" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--brand)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {Array.from({ length: 18 }).map((_, i) => (
              <rect
                key={i}
                x={i * 45}
                y={0}
                width={2}
                height={400}
                fill="url(#g-about)"
              />
            ))}
          </svg>
        </div>

        <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              About <span className="text-brand">Arua</span> Team
            </h1>
            <p className="mt-3 text-sm text-muted">
              Arua (アルア) es un equipo de drift nacido como división de
              Duskies, enfocado en crear <em>builds</em> únicas para el derrape.
              Sus fundadores, Edu y Jimy, traen a España un estilo inspirado en
              la cultura japonesa underground.
            </p>
            <p className="mt-2 text-sm text-muted">
              Construimos y perfeccionamos nuestros propios coches, mezclando la
              fluidez y técnica del Meihan Style con la adrenalina del street
              drift. No solo buscamos mejorar en pista; buscamos capturar la
              magia que hace del drift una cultura única.
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border brd bg-[var(--bg)]">
            <Image
              src="/images/test.jpg" // ← reemplaza
              alt="Arua Team — sesión nocturna"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* MIEMBROS */}
      <section className="mt-12">
        <header className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Miembros</h2>
          <p className="text-sm text-muted">
            Conoce a los creadores detrás de los coches y la esencia del equipo.
            No aceptamos nuevos miembros, pero estamos abiertos a colaboraciones
            que compartan nuestra filosofía.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* EDU */}
          <article className="rounded-2xl border brd bg-[var(--card)] p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">✦ Edu</h3>
              <a
                href="https://instagram.com/edu.r__"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border brd px-3 py-1 text-xs hover:text-brand"
                aria-label="Instagram de Edu"
              >
                <Instagram className="h-4 w-4" /> @edu.r__
              </a>
            </div>

            <p className="mt-2 text-sm text-muted">
              Programador y entusiasta de la cultura japonesa. Ha vivido en
              varias zonas de España y conoce la cultura del automovilismo.
              Compró su BMW 330Ci en 2023.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="Edu"
                  fill
                  className="object-cover"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="BMW 330Ci de Edu"
                  fill
                  className="object-cover"
                />
              </figure>
            </div>

            <div className="mt-4 rounded-xl border brd bg-[var(--bg)] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Car className="h-4 w-4 text-brand" />
                <strong className="text-sm">BMW 330Ci</strong>
              </div>
              <p className="text-sm text-muted">
                Coupé deportivo equilibrado entre rendimiento y lujo. Tracción
                trasera y manual.
              </p>

              <div className="mt-3">
                <div className="mb-1 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-brand" />
                  <strong className="text-sm">Mods</strong>
                </div>
                <ul className="text-sm text-muted list-disc pl-5">
                  <li>Suspensión roscada BC Racing</li>
                  <li>Body kit</li>
                  <li>Brazos de suspensión regulables</li>
                  <li>Reducción de peso</li>
                  <li>Alerón de techo</li>
                  <li>Quickshifter</li>
                </ul>
              </div>
            </div>
          </article>

          {/* JIMY */}
          <article className="rounded-2xl border brd bg-[var(--card)] p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">✦ Jimy</h3>
              <a
                href="https://instagram.com/jimy.k4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border brd px-3 py-1 text-xs hover:text-brand"
                aria-label="Instagram de Jimy"
              >
                <Instagram className="h-4 w-4" /> @jimy.k4
              </a>
            </div>

            <p className="mt-2 text-sm text-muted">
              Programador y apasionado de Japón. Conoce la cultura
              automovilística japonesa y la aplica en su Lexus IS200, comprado
              en 2023.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="Jimy"
                  fill
                  className="object-cover"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="Lexus IS200 de Jimy"
                  fill
                  className="object-cover"
                />
              </figure>
            </div>

            <div className="mt-4 rounded-xl border brd bg-[var(--bg)] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Car className="h-4 w-4 text-brand" />
                <strong className="text-sm">Lexus IS200</strong>
              </div>
              <p className="text-sm text-muted">
                Sedán compacto de lujo con equilibrio entre confort y
                deportividad. Tracción trasera y manual.
              </p>

              <div className="mt-3">
                <div className="mb-1 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-brand" />
                  <strong className="text-sm">Mods</strong>
                </div>
                <ul className="text-sm text-muted list-disc pl-5">
                  <li>Suspensión roscada BC Racing</li>
                  <li>Llantas Yokohama SA3R</li>
                  <li>
                    Body kit BN (parachoques delantero adaptado del BMW de Edu)
                  </li>
                  <li>Radiador Mishimoto</li>
                  <li>Capó de fibra con salidas centrales</li>
                  <li>Brazos de suspensión regulables</li>
                  <li>Reducción de peso</li>
                  <li>Alerón de techo</li>
                  <li>Quickshifter</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* HISTORIA / TIMELINE */}
      <section className="mt-12">
        <header className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Historia</h2>
          <p className="text-sm text-muted">
            De un logo más “cargado” a una identidad minimal y agresiva con
            detalles reflectantes.
          </p>
        </header>

        <div className="space-y-6">
          {/* Paso 1 */}
          <div className="rounded-2xl border brd bg-[var(--card)] p-5">
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand" />
              <span className="text-sm font-semibold">2024 — Primer logo</span>
            </div>
            <p className="text-sm text-muted">
              Arua nació en 2024 con una identidad diferente. El logo antiguo
              era más abrumador y no encajaba al 100% con la estética del
              equipo.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="Primer logo de Arua Team"
                  fill
                  className="object-contain p-4"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="Primer logo de Arua Team variante"
                  fill
                  className="object-contain p-4"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="Primer logo de Arua Team variante"
                  fill
                  className="object-contain p-4"
                />
              </figure>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="rounded-2xl border brd bg-[var(--card)] p-5">
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand" />
              <span className="text-sm font-semibold">
                2025 — Nuevo logo + adaptación de parachoques
              </span>
            </div>
            <p className="text-sm text-muted">
              A finales de 2025 reenfocamos el equipo con un logo más limpio,
              minimal y agresivo. Las estrellas incorporan toques reflectantes
              para reflejar la personalidad del grupo.
            </p>
            <p className="mt-2 text-sm text-muted">
              No nos quedamos solo en la identidad: dimos el salto a la fibra de
              vidrio y adaptamos el parachoques del BMW al Lexus. Gracias a{" "}
              <strong>Rodri</strong>, profesional de la fibra, el proyecto salió
              perfecto.
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)] md:col-span-2">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="Parachoques del BMW adaptado al Lexus"
                  fill
                  className="object-cover"
                />
                <figcaption className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-[11px] text-white">
                  BMW bumper adaptado al Lexus
                </figcaption>
              </figure>
              <figure className="relative aspect-square overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← reemplaza
                  alt="Nuevo logo de Arua Team"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-brand px-2 py-1 text-[10px] text-[var(--brand-fg)]">
                  <Sparkles className="h-3 w-3" /> Nuevo logo
                </div>
              </figure>
            </div>

            <p className="mt-3 text-sm text-muted">
              El nuevo logo y la adaptación del parachoques dieron al equipo la
              agresividad y personalidad que siempre quisimos transmitir. Esto
              es solo el principio.
            </p>
          </div>
        </div>
      </section>

      {/* CTA / COLABORACIONES */}
      <section className="mt-12 rounded-2xl border brd bg-[var(--card)] p-6 text-center">
        <h3 className="text-xl font-bold tracking-tight">¿Colaboramos?</h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          No aceptamos nuevos miembros, pero nos encantan las colaboraciones y
          los proyectos que encajan con nuestra filosofía. Escríbenos para
          sesiones, merch o eventos.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <a
            href="https://instagram.com/aruateam" // ← pon el vuestro
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-[var(--brand-fg)] hover:shadow-[0_0_0_4px_var(--brand-ring)]"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border brd px-4 py-2 text-sm"
          >
            Ver Gallery
          </a>
        </div>
      </section>
    </div>
  );
}
