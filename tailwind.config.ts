import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Neo-Brutalist: Comic Sans MS
        sans: ['"Comic Sans MS"', '"Comic Sans"', "cursive"],
      },
      colors: {
        // Neo-Brutalist colors
        brutalist: {
          black: "#000000",
          white: "#FFFFFF",
          yellow: "#FFFF00",
          red: "#FF0000",
          green: "#39FF14",
          blue: "#0000FF",
        },
      },
      boxShadow: {
        // Hard edge shadow
        brutal: "4px 4px 0px 000000",
        "brutal-sm": "2px 2px 0px 000000",
        "brutal-lg": "6px 6px 0px 000000",
      },
    },
  },
  plugins: [],
};

export default config;
