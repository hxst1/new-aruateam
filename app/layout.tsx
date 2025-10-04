import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARUATEAM Shop",
  description: "Frontend e-commerce de ARUATEAM (drift brand)",
  icons: {
    icon: "/logo.svg",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// --- anti-flash script inline
const THEME_SNIPPET = `
(function(){
  try {
    var d = document.documentElement;
    // evitar transiciones durante el swap inicial
    d.setAttribute('data-theme-transition','');
    var stored = localStorage.getItem('theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = stored || system;
    d.setAttribute('data-theme', theme);
    // quitar flag tras primer frame
    requestAnimationFrame(function(){ d.removeAttribute('data-theme-transition'); });
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Permite a los componentes nativos seguir el tema */}
        <meta name="color-scheme" content="light dark" />
        {/* Aplica el tema antes del primer render */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SNIPPET }} />
        <style>{`
          /* desactiva transiciones mientras se aplica el tema inicial */
          html[data-theme-transition] * { transition: none !important; }
        `}</style>
      </head>
      <body className="bg-app">{children}</body>
    </html>
  );
}
