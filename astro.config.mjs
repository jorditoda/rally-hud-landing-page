import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Necesario para que Astro.url resuelva al dominio real en las etiquetas
  // Open Graph / Twitter y para generar el sitemap. Debe coincidir con CNAME.
  // ROADMAP.md -> E0.1
  site: "https://rallyhud.yapplic.com",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  // /app es una pagina de redireccion marcada como noindex: fuera del sitemap.
  // La version 3.2.x es la ultima compatible con Astro 4 (las 3.3+ usan la
  // API de rutas de Astro 5 y fallan con "Cannot read properties of undefined").
  // Revisar al subir a Astro 5 -> ver ROADMAP.md E6.1.
  integrations: [
    react(),
    tailwind(),
    sitemap({ filter: (page) => !page.endsWith("/app/") }),
  ],
});
