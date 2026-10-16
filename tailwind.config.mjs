import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import { themes } from "./src/utils/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      "3xs": "350px",
      "2xs": "400px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        // Fuente del sistema de diseño (Sistema-Base.dc.html):
        // "Tipografía · Barlow Condensed y Barlow".
        //   Barlow          -> texto  · 17px/1.45, secundario 15px, etiquetas 12-13px
        //   Barlow Condensed -> cifras y títulos, siempre tabulares
        // "Cifras: siempre tabulares, para que no bailen al cambiar".
        condensed: [
          "Barlow Condensed",
          "Barlow",
          ...defaultTheme.fontFamily.sans,
        ],
        sans: ["Barlow", ...defaultTheme.fontFamily.sans],
        // Tabulares para todo lo numérico: velocidad, tiempos, distancias, KPIs.
        numeric: [
          "Barlow Condensed",
          "Barlow",
          ...defaultTheme.fontFamily.mono,
        ],
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: [themes],
  },
};