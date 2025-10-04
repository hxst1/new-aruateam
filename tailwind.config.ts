import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
	extend: {
	  colors: {
		bg: "var(--bg)",
		fg: "var(--fg)",
		muted: "var(--muted)",
		card: "var(--card)",
		brand: {
		  DEFAULT: "var(--brand)",
		  fg: "var(--brand-fg)",
		  ring: "var(--brand-ring)"
		}
	  },
	  boxShadow: {
		brand: "0 0 0 4px var(--brand-ring)",
	  },
	  borderRadius: {
		xl: "1rem",
		'2xl': "1.25rem",
	  }
	}
  },
  plugins: [
	function ({ addBase }: { addBase: (base: Record<string, string | Record<string, string>>) => void }) {
	  addBase({
		":root": {
		  /* LIGHT THEME: red accent */
		  "--bg": "#ffffff",
		  "--fg": "#0a0a0a",
		  "--muted": "#6b7280",
		  "--card": "#f8f9fb",

		  "--brand": "#ef4444", /* red-500 */
		  "--brand-fg": "#ffffff",
		  "--brand-ring": "rgba(239,68,68,0.35)",

		  /* design tokens */
		  "--radius": "1rem"
		},
		'[data-theme="dark"]': {
		  /* DARK THEME: purple accent */
		  "--bg": "#0b0b0e",
		  "--fg": "#e5e7eb",
		  "--muted": "#9ca3af",
		  "--card": "#121218",

		  "--brand": "#8b5cf6", /* violet-500 */
		  "--brand-fg": "#0b0b0e",
		  "--brand-ring": "rgba(139,92,246,0.35)"
		}
	  })
	}
  ]
};

export default config;