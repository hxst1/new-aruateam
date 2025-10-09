// app/about/page.tsx
"use client";
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
              Arua (アルア) is a drift team spun out of Duskies, focused on
              building distinctive drift-ready cars. Founded by Edu and Jimy,
              the team blends Spanish grit with an underground Japanese
              aesthetic.
            </p>
            <p className="mt-2 text-sm text-muted">
              We build and refine our own cars, taking cues from Meihan-style
              precision and the adrenaline of street drift. It’s not only about
              cutting lap times—it’s about capturing the spark that makes drift
              a culture.
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border brd bg-[var(--bg)]">
            <Image
              src="/images/test.jpg" // ← replace with a real image
              alt="Arua Team — night session"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mt-12">
        <header className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Team</h2>
          <p className="text-sm text-muted">
            Meet the people behind the builds and the vision. We collaborate
            with photographers, fabricators, and friends who share the same
            approach: thoughtful design, clean execution, and a love for drift.
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
                className="inline-flex items-center gap-1 rounded-full border brd px-3 py-1 text-xs hover:text-brand cursor-pointer"
                aria-label="Edu's Instagram"
              >
                <Instagram className="h-4 w-4" /> @edu.r__
              </a>
            </div>

            <p className="mt-2 text-sm text-muted">
              Developer and long-time fan of Japanese car culture. Picked up his
              BMW 330Ci in 2023 and has been refining it since.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="Edu"
                  fill
                  className="object-cover"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="Edu's BMW 330Ci"
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
                Balanced coupe that blends performance with a bit of luxury.
                Rear-wheel drive, manual.
              </p>

              <div className="mt-3">
                <div className="mb-1 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-brand" />
                  <strong className="text-sm">Mods</strong>
                </div>
                <ul className="text-sm text-muted list-disc pl-5">
                  <li>BC Racing coilovers</li>
                  <li>Body kit</li>
                  <li>Adjustable suspension arms</li>
                  <li>Weight reduction</li>
                  <li>Roof wing</li>
                  <li>Short shifter</li>
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
                className="inline-flex items-center gap-1 rounded-full border brd px-3 py-1 text-xs hover:text-brand cursor-pointer"
                aria-label="Jimy's Instagram"
              >
                <Instagram className="h-4 w-4" /> @jimy.k4
              </a>
            </div>

            <p className="mt-2 text-sm text-muted">
              Developer with a soft spot for Japan. Dailying and developing a
              Lexus IS200 since 2023, with a build that leans into clean lines
              and function.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="Jimy"
                  fill
                  className="object-cover"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="Jimy's Lexus IS200"
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
                Compact sport sedan balancing comfort and response. Rear-wheel
                drive, manual.
              </p>

              <div className="mt-3">
                <div className="mb-1 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-brand" />
                  <strong className="text-sm">Mods</strong>
                </div>
                <ul className="text-sm text-muted list-disc pl-5">
                  <li>BC Racing coilovers</li>
                  <li>Yokohama SA3R wheels</li>
                  <li>BN body kit (front bumper adapted from Edu’s BMW)</li>
                  <li>Mishimoto radiator</li>
                  <li>Vented carbon hood</li>
                  <li>Adjustable suspension arms</li>
                  <li>Weight reduction</li>
                  <li>Roof wing</li>
                  <li>Short shifter</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* STORY / TIMELINE */}
      <section className="mt-12">
        <header className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Story</h2>
          <p className="text-sm text-muted">
            From a heavier mark to a cleaner, more aggressive identity with
            reflective touches.
          </p>
        </header>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="rounded-2xl border brd bg-[var(--card)] p-5">
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand" />
              <span className="text-sm font-semibold">2024 — First logo</span>
            </div>
            <p className="text-sm text-muted">
              Arua started in 2024 with a different identity. The first logo
              felt busy and didn’t fully match the team’s direction.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="Arua Team first logo"
                  fill
                  className="object-contain p-4"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="Arua Team first logo — variant"
                  fill
                  className="object-contain p-4"
                />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="Arua Team first logo — variant"
                  fill
                  className="object-contain p-4"
                />
              </figure>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border brd bg-[var(--card)] p-5">
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand" />
              <span className="text-sm font-semibold">
                2025 — New logo + bumper adaptation
              </span>
            </div>
            <p className="text-sm text-muted">
              Late 2025, we tightened the brand: cleaner, minimal, and sharper.
              Subtle reflective accents in the stars mirror the team’s vibe.
            </p>
            <p className="mt-2 text-sm text-muted">
              We didn’t stop at graphics. We moved into fiberglass work and
              adapted the BMW front bumper onto the Lexus. Huge thanks to{" "}
              <strong>Rodri</strong> for the pro fiberglass work.
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border brd bg-[var(--bg)] md:col-span-2">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="BMW bumper adapted to the Lexus"
                  fill
                  className="object-cover"
                />
                <figcaption className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-[11px] text-white">
                  BMW bumper adapted to Lexus
                </figcaption>
              </figure>
              <figure className="relative aspect-square overflow-hidden rounded-xl border brd bg-[var(--bg)]">
                <Image
                  src="/images/test.jpg" // ← replace
                  alt="New Arua Team logo"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-brand px-2 py-1 text-[10px] text-[var(--brand-fg)]">
                  <Sparkles className="h-3 w-3" /> New logo
                </div>
              </figure>
            </div>

            <p className="mt-3 text-sm text-muted">
              The refined mark and the bumper swap brought the edge and
              personality we were aiming for—and it’s just the beginning.
            </p>
          </div>
        </div>
      </section>

      {/* CTA / COLLABS */}
      <section className="mt-12 rounded-2xl border brd bg-[var(--card)] p-6 text-center">
        <h3 className="text-xl font-bold tracking-tight">Collaborations</h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          We’re always open to projects that share our philosophy—shoots, custom
          merch, events, and build ideas. If that sounds like you, let’s talk.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <a
            href="https://instagram.com/aruateam" // ← set your handle
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-[var(--brand-fg)] hover:shadow-[0_0_0_4px_var(--brand-ring)] cursor-pointer"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border brd px-4 py-2 text-sm cursor-pointer"
          >
            View Gallery
          </a>
        </div>
      </section>
    </div>
  );
}
