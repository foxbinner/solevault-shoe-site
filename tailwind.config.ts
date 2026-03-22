import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      colors: {
        bg: "var(--bg)",
        "bg-card": "var(--bg-card)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        border: "var(--border)",
        white: "var(--white)",
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(14,14,14,0.06)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
