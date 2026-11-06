/**
 * NadaVeena design tokens (single source of truth for scale values).
 * Colour VALUES live in src/css/tokens.css as CSS variables so light/dark
 * switch without per-element `dark:` classes. This file maps them to utilities.
 */
const color = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/js/**/*.js"],
  // Styleguide builds swatch classes at runtime
  safelist: ["canvas","surface","sunken","ink","muted","line","primary","accent","accent-fill","brand","sandal","peacock","terracotta","leaf"].map((n) => `bg-${n}`),
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    // Responsive breakpoints
    screens: {
      sm: "640px", // large phones
      md: "768px", // tablets
      lg: "1024px", // small desktop
      xl: "1280px", // desktop
      "2xl": "1536px",
    },
    extend: {
      colors: {
        canvas: color("canvas"), // page background (ivory)
        surface: color("surface"), // raised panels
        sunken: color("sunken"), // alternate section background
        ink: color("ink"), // body text
        muted: color("muted"), // secondary text
        line: color("line"), // borders
        primary: color("primary"), // brand action (maroon / gold in dark)
        "primary-hover": color("primary-hover"),
        "on-primary": color("on-primary"),
        accent: color("accent"), // antique gold, text-safe
        "accent-fill": color("accent-fill"), // antique gold, decorative fills
        brand: color("brand"), // fixed deep maroon (never flips)
        "on-brand": color("on-brand"),
        "gold-light": color("gold-light"), // bright gold for dark bands
        deep: color("deep"), // deepest maroon for text on gold
        sandal: color("sandal"),
        peacock: color("peacock"),
        terracotta: color("terracotta"),
        leaf: color("leaf"),
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Source Sans 3"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      // Fluid type scale: [size, { lineHeight, letterSpacing, fontWeight }]
      fontSize: {
        display: ["clamp(2.75rem, 1.9rem + 4vw, 5rem)", { lineHeight: "1.04", letterSpacing: "-0.01em", fontWeight: "600" }],
        h1: ["clamp(2.25rem, 1.7rem + 2.6vw, 3.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "600" }],
        h2: ["clamp(1.875rem, 1.5rem + 1.8vw, 2.75rem)", { lineHeight: "1.15", fontWeight: "600" }],
        h3: ["clamp(1.5rem, 1.3rem + 1vw, 2rem)", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }],
        h5: ["1.125rem", { lineHeight: "1.4", fontWeight: "700" }],
        h6: ["1rem", { lineHeight: "1.4", fontWeight: "700" }],
        lead: ["clamp(1.125rem, 1.05rem + 0.4vw, 1.3125rem)", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.55" }],
        eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.22em", fontWeight: "700" }],
      },
      spacing: {
        // Fluid layout spacing (use for sections, gutters)
        section: "clamp(4rem, 3rem + 5vw, 7.5rem)",
        "section-sm": "clamp(2.5rem, 2rem + 3vw, 4.5rem)",
        gutter: "clamp(1rem, 0.5rem + 2.5vw, 2rem)",
        // Button heights
        "btn-sm": "2.5rem",
        btn: "3rem",
        "btn-lg": "3.5rem",
        // Header height
        header: "4.5rem",
      },
      maxWidth: {
        prose: "40rem",
        narrow: "48rem",
        content: "80rem", // the ONE public content width (header, sections, footer)
        wide: "80rem", // alias of content: kept so old markup cannot drift
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(var(--c-shadow) / 0.08), 0 2px 8px rgb(var(--c-shadow) / 0.06)",
        card: "0 4px 16px rgb(var(--c-shadow) / 0.10), 0 1px 3px rgb(var(--c-shadow) / 0.08)",
        lift: "0 16px 40px rgb(var(--c-shadow) / 0.18)",
      },
      transitionDuration: { DEFAULT: "200ms" },
      zIndex: { header: "50", top: "60", skip: "100" },
    },
  },
  plugins: [],
};
