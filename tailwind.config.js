/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#08080a",
        "bg-alt": "#0c0c0e",
        card: "#0d0d0f",
        "card-hover": "#111113",
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          strong: "rgba(255,255,255,0.14)",
        },
        ink: {
          DEFAULT: "#f5f5f4",
          muted: "#9a9a9f",
          dim: "#5c5c62",
        },
        accent: {
          DEFAULT: "#d98e3e",
          soft: "rgba(217,142,62,0.10)",
          line: "rgba(217,142,62,0.35)",
        },
        yes: {
          DEFAULT: "#3fb87f",
          soft: "rgba(63,184,127,0.10)",
        },
        no: {
          DEFAULT: "#e0616f",
          soft: "rgba(224,97,111,0.10)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "10px",
        xl: "14px",
      },
      maxWidth: {
        container: "1180px",
      },
    },
  },
  plugins: [],
};
