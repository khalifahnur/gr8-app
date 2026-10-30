/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          deep: "var(--color-primary-deep)",
          soft: "var(--color-primary-soft)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          deep: "var(--color-secondary-deep)",
          soft: "var(--color-secondary-soft)",
        },
        accent: "var(--color-accent)",
        background: {
          DEFAULT: "var(--color-background)",
          element: "var(--color-background-element)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
        },
        border: "var(--color-border)",
      },
    },
  },
  plugins: [],
};
