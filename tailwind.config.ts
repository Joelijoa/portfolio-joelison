import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        fg: "#ffffff",
        muted: "#808080",
        dim: "#333333",
        subtle: "#1a1a1a",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "Poppins", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      animation: {
        "blink": "blink 0.8s step-end infinite",
        "scanlines": "scanlines 6s linear infinite",
        "glitch-shake": "glitch-shake 0.3s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanlines: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 200px" },
        },
        "glitch-shake": {
          "0%, 100%": { transform: "translate(0)" },
          "10%": { transform: "translate(-2px, 1px)" },
          "20%": { transform: "translate(2px, -1px)" },
          "30%": { transform: "translate(-1px, 2px)" },
          "40%": { transform: "translate(1px, -2px)" },
          "50%": { transform: "translate(-2px, -1px)" },
          "60%": { transform: "translate(2px, 1px)" },
          "70%": { transform: "translate(-1px, -2px)" },
          "80%": { transform: "translate(1px, 2px)" },
          "90%": { transform: "translate(-2px, 1px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
