// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

// ---- Site URL base (adjust to your domain)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aruateam.com";

// ---- Metadata (SEO)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "ARUATEAM Shop",
  title: {
    default: "ARUATEAM Shop — Drift Supply",
    template: "%s | ARUATEAM Shop",
  },
  description:
    "ARUATEAM Drift Supply: lanyards, nobori flags, keychains, tees and hoodies. Clean visuals, JDM-inspired details, built by drift enthusiasts.",
  keywords: [
    "ARUATEAM",
    "drift",
    "JDM",
    "lanyards",
    "nobori",
    "keychains",
    "t-shirts",
    "hoodies",
    "BMW E46",
    "Lexus IS200",
    "drift brand",
    "street drift",
    "Meihan style",
    "motorsport apparel",
  ],
  category: "ecommerce",
  authors: [{ name: "ARUATEAM" }],
  creator: "ARUATEAM",
  publisher: "ARUATEAM",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      // Uncomment if you add i18n routing:
      // "es": "/es",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ARUATEAM Shop — Drift Supply",
    description:
      "Lanyards, nobori flags, keychains, tees and hoodies. JDM-inspired drift brand from Spain.",
    siteName: "ARUATEAM Shop",
    locale: "en_GB",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "ARUATEAM Shop — Drift Supply",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARUATEAM Shop — Drift Supply",
    description:
      "JDM-inspired drift brand: lanyards, nobori flags, keychains, tees and hoodies.",
    images: ["/og.jpg"],
    creator: "@aruateam", // set your handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "ARUATEAM Shop",
    statusBarStyle: "default",
    capable: true,
  },
  // If you have a web manifest, uncomment:
  // manifest: "/site.webmanifest",
};

// ---- themeColor now belongs to viewport
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }, // light theme
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" }, // --bg in dark
  ],
};

// --- anti-flash inline script
const THEME_SNIPPET = `
(function(){
  try {
    var d = document.documentElement;
    // avoid transitions during the first theme swap
    d.setAttribute('data-theme-transition','');
    var stored = localStorage.getItem('theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = stored || system;
    d.setAttribute('data-theme', theme);
    // remove the flag after the first frame
    requestAnimationFrame(function(){ d.removeAttribute('data-theme-transition'); });
  } catch(e) {}
})();
`;

// --- JSON-LD (Organization + WebSite with SearchAction)
const JSON_LD_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ARUATEAM",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  sameAs: [
    "https://instagram.com/aruateam",
    // add more socials if applicable
  ],
};

const JSON_LD_WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ARUATEAM Shop",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Allow native components to respect theme */}
        <meta name="color-scheme" content="light dark" />
        {/* Apply theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SNIPPET }} />
        <style>{`
          /* disable transitions while initial theme is applied */
          html[data-theme-transition] * { transition: none !important; }
        `}</style>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ORG) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_WEBSITE) }}
        />
      </head>
      <body className="bg-app">{children}</body>
    </html>
  );
}
