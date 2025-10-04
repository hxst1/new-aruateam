import { Instagram, Music2, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border brd">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} ARUATEAM. All rights reserved.
          </p>

          <div className="flex items-center justify-center md:justify-end gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 hover:text-brand"
            >
              <Instagram className="h-4 w-4" aria-hidden />
              Instagram
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 hover:text-brand"
            >
              <Music2 className="h-4 w-4" aria-hidden />
              TikTok
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 hover:text-brand"
            >
              <Youtube className="h-4 w-4" aria-hidden />
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
