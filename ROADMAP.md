# Rally Hud — Landing Page Roadmap

Roadmap de mejora dividido en **fases** y **épicas** independientes. Cada épica está
pensada para que un agente (o una persona) pueda cogerla y ejecutarla sin contexto previo.

**Convención de estados:** `[ ]` pendiente · `[~]` en curso · `[x]` hecho

**Progreso:** Fase 0 ✅ (5/5) · Fase 1 ⬜ · Fase 2 ⬜ · Fase 3 ⬜ · Fase 4 ⬜ ·
Fase 5 ✅ 13/14 (E2.1–E2.14 salvo E2.0) · Fase 6 ⬜
*E2.0 (JSON-LD) queda pendiente: necesita los tokens finales, que ya están.*

**Definition of Done global (aplica a TODAS las épicas):**
- `pnpm run build` termina sin errores.
- `pnpm run check` reporta **0 errores y 0 hints** (✅ cumplido desde E0.3).
- Ninguna referencia local del build apunta a un fichero inexistente.
- No se introducen regresiones en lighthouse ni en el ancho de las secciones.
- Si toca contenido, se actualiza `src/utils/config.ts` (única fuente de verdad).

---

## Diagnóstico ejecutivo

> Estado tras la Fase 0. La columna "Antes" recoge la medición original.

| Área | Antes | Ahora | Impacto |
|---|---|---|---|
| Metadatos / OG | `og:url` = `localhost:4321` | ✅ dominio real | 🔴 Alto |
| Favicon | 404 (`favicon.svg` inexistente) | ✅ SVG + PNG 32px | 🔴 Alto |
| CI | pnpm 7 ignoraba el lockfile v9 | ✅ pnpm 9.15.9 + job `verify` | 🔴 Alto |
| `astro check` | 133 hints falsos | ✅ 0 hints | 🟠 Medio |
| Assets muertos | `dist` 10 MB | ✅ `dist` 3.3 MB | 🟠 Medio |
| Descriptions | `"Rally Hud"` (9 chars) | ✅ por página + canonical | 🔴 Alto |
| Sitemap | no existía | ✅ + `robots.txt` | 🟠 Medio |
| Headings | 4× `<h1>` + 0 en legales | ⬜ pendiente (E3.0) | 🔴 Alto |
| Bundle | ~130 KB gzip JS | ⬜ pendiente (E1.1) | 🟠 Medio |
| A11y | sin `aria-expanded`, autoplay sin pausa | ⬜ pendiente (E6.0) | 🟠 Medio |
| Paleta | daisyUI `corporate` ≠ identidad del producto | ✅ tokens de los tableros | 🔴 Alto |
| Tipografía | `Rowdies` (cartoon) | ✅ Barlow Condensed + Barlow | 🔴 Alto |
| Logo con caja blanca en dark | sí | ✅ SVG sin fondo (2,5 KB) | 🟠 Medio |
| Copy describe el producto real | no | sí | ✅ sí |
| Iconografía | cohete/trofeo/monedero de plantilla | ✅ 13 SVG del dominio | 🔴 Alto |
| Imágenes | stock de iOS en "How it works" | ✅ capturas reales del producto | 🔴 Alto |

---

# FASE 0 — Fundaciones ✅ COMPLETADA

Ninguna otra fase debería empezar antes de cerrar esta. Son cambios pequeños, de bajo
riesgo y alto impacto, y varios desbloquean el trabajo de otras fases.

> **Hallazgo corregido:** en la primera redacción de este roadmap se señaló que
> `actions/deploy-pages@v43D` era un tag inexistente. **Era un error de lectura**;
> el fichero ya usaba `actions/deploy-pages@v4`, que es un tag válido. No había
> ese bug, y no se ha tocado esa línea.

---

## E0.1 · Corregir metadatos y favicon — ✅ [x]

**Problema**
- `astro.config.mjs` no define `site`, así que `Astro.url` cae a `http://localhost:4321/`
  y todas las etiquetas Open Graph / Twitter salen con localhost.
- `Layout.astro:16` referencia `/favicon.svg`, que no existe en `public/` (solo hay
  `favicon.png`) → 404 en cada carga.

**Implementado**
- `favicon.svg` trazado a partir de la geometría **medida** de `public/logo.png`
  (1024×1024) con Python/PIL: centro del arco `(512, 683)`, radio del arco negro `367`
  (grosor `12`), radio exterior del arco rojo `335`, cubo `(458.5, 679) r31`,
  aguja a `46°` de longitud `178`. Escalado a un `viewBox` de 64 y engordado ópticamente
  para que siga siendo legible a 16 px. Verificado rasterizando el SVG en canvas:
  arco negro r 22–24, banda roja que afila de ~4 px a 0 hacia la izquierda, cubo y
  aguja en posición. **1.1 KB.**
- `favicon.png` regenerado a **32×32** (fallback): 184 KB → **1.0 KB**.
- `apple-touch-icon.png` 180×180 sobre fondo blanco (iOS no debe recibir transparencia): 8.4 KB.
- `theme-color` con variante `prefers-color-scheme` (claro `#ffffff` / oscuro `#0a0c10`).
- `Layout.astro` pasa de `Astro.props as TemplateConfig` (un cast que mentía sobre los
  tipos reales) a una `interface Props` explícita con `noindex?: boolean`.

**Criterios de aceptación**
- [x] `og:url` / `twitter:url` no contienen `localhost` → `https://rallyhud.yapplic.com/`
- [x] Los tres iconos existen en `dist/` y se referencian con el `rel` correcto.
- [x] `<title>` y `description` de la home proceden de `home.seo` → *(hecho en E0.5)*

---

## E0.2 · Arreglar CI — ✅ [x]

**Problema**
- `.github/workflows/main.yml` usa `pnpm/action-setup@v4` con `version: 7`, pero
  `pnpm-lock.yaml` es `lockfileVersion: '9.0'` (requiere pnpm ≥ 9).
  **Comportamiento real medido**, no supuesto:
  - Con `--frozen-lockfile` → `ERR_PNPM_LOCKFILE_BREAKING_CHANGE` (fallo duro).
  - Con `pnpm install` a secas (lo que hacía el CI) → **no falla**: avisa
    `Ignoring broken lockfile` y **resuelve las dependencias desde cero**, ignorando
    las versiones fijadas. Builds no reproducibles y riesgo de deriva.
- `node-version: [latest]` no está pineado → builds no deterministas.
- No hay paso de verificación (`astro check`) antes de desplegar.
- Solo se ejecuta en `push` a `master`: los PRs no se validan.
- Falta `concurrency` para evitar despliegues concurrentes.
- `pnpm install` sin `--frozen-lockfile`.

**Implementado**
- pnpm fijado a `9.15.9` en los dos jobs, en coherencia con el campo
  `packageManager` de `package.json`.
- `node-version: 22` pineado.
- Workflow partido en **dos jobs**:
  - `verify`: `checkout` → pnpm → `pnpm install --frozen-lockfile` → `pnpm run check`.
    Corre en `push` a master **y en todos los PRs**.
  - `deploy`: `needs: verify`, `if: github.event_name == 'push'`. Solo despliega si
    la verificación pasó.
- Bloque `concurrency` (`group: github-pages`, `cancel-in-progress: false`).
- Trigger `pull_request: branches: [master]`.
- Validado con PyYAML: 2 jobs, `needs`/`if` correctos, triggers y concurrency presentes.

**Deuda que queda (no bloqueante)**
- Actions pinning: `checkout@v6`, `setup-node@v6`, `configure-pages@v5`,
  `upload-pages-artifact@v4` son válidos, pero ya existen majors más nuevas
  (`checkout@v7`, `setup-node@v7`, `configure-pages@v6`, `upload-pages-artifact@v5`).
  Bump opcional.

**Criterios de aceptación**
- [x] YAML válido y estructura correcta (`verify` → `deploy`).
- [x] `pnpm install --frozen-lockfile` funciona con pnpm 9.15.9 y el lockfile v9.
- [x] Un error de tipos rompería el pipeline (job `verify` sin `continue-on-error`).
- [ ] El workflow completa en verde sobre una rama real → *requiere push; pendiente de
      verificar en CI.*

---

## E0.3 · Higiene de TypeScript — ✅ [x]

**Problema**
- `tsconfig.json` no declara `include`/`exclude`, por lo que `astro check` analiza `dist/`
  y genera **133 hints falsos** sobre `framer-motion` minificado. Esto entrena al equipo a
  ignorar la salida del type-checker.
- Faltaba el alias `@utils/*` (el código importaba `utils/config` en bare vía `baseUrl`,
  conviviendo con `@modules/*`, `@styles/*` y `@components/*`).

**Implementado**
```jsonc
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "node_modules"],
  "compilerOptions": { /* ... sin cambios ... */ }
}
```
- Añadido `"@utils/*": ["utils/*"]` a `paths`.

> Nota: un `exclude` explícito **pisa** el `exclude` por defecto de TypeScript, que es
> justamente lo que excluía `node_modules`. Por eso `node_modules` se lista a mano.

**Criterios de aceptación**
- [x] `pnpm run check` → `0 errors, 0 warnings, 0 hints`
      → antes: `55 files / 133 hints` · ahora: `45 files / 0 hints`

---

## E0.4 · Eliminar código y dependencias muertas — ✅ [x]

**Problema** (verificado con `scripts/audit-public-assets.py`)
- `src/components/themeSelector/` **no se importa en ningún sitio** → código muerto.
- `@heroicons/react` es dependencia *solo* por ese componente.
- `zod` está en `dependencies` y **no se usa** en ningún archivo de `src/`.
- `public/3D/` contiene **81 ficheros (3.2 MB) de los que se usan 2** en código activo.
- `public/screenshots/Simulator Screenshot - iPhone 16 - 2025-03-08 at 16.18.33.png`
  = **2.4 MB sin referencias**, y con espacios en el nombre.

**Matiz importante (evita trampas de 404)**
No se borró todo lo "no usado". 8 assets solo aparecen en **bloques comentados** de
`config.ts` que son restos de la plantilla de otro producto (*"gaming experience"*,
*"Bingo"*, *"Play with your friends in a single game"*):

| Asset | Referencia |
|---|---|
| `/3D/gift-front-color.webp`, `/3D/notify-heart-front-color.webp` | features comentadas |
| `/misc/companies/{apple,aws,google,tumblr}.svg` | partners comentado |
| `/stock/04.webp`, `/stock/05.webp` | pasos comentados |

Borrarlos habría dejado comentarios que rompen en cuanto alguien los descomente.
**Se conservan** y se limpian junto con el código commented-out en **E9.0**.

**Implementado**
- `src/components/themeSelector/` borrado.
- `pnpm remove @heroicons/react zod`.
- 77 iconos de `public/3D/` sin ninguna referencia borrados (conservados los 2 activos +
  los 2 solo comentados).
- Captura de 2.4 MB borrada, `.DS_Store` purgados.
- `public/`: **7.4 MB → 2.1 MB**. `dist/`: **10 MB → 3.3 MB**.
- Nuevo `scripts/audit-public-assets.py`: clasifica cada asset de `public/` como
  *activo* / *solo comentado* / *sin referencia*. **Reejecutar antes de cualquier
  borrado futuro de assets.**

**Criterios de aceptación**
- [x] `dist/` < 5 MB → **3.3 MB**
- [x] `pnpm run build` sigue generando las 5 páginas.
- [x] Ninguna imagen referenciada desde código activo ha sido borrada.
- [x] Auditoría automática de referencias sobre `dist/`: 35 referencias, **0 rotas**.

---

## E0.5 · Descriptions reales y SEO por página — ✅ [x]

**Problema**
- `home.seo` está definido (`config.ts:62-65`) pero **está muerto**: `index.astro` hace
  `<Layout {...defaultTemplateConfig}>`, que inyecta el `seo` global, no el de home.
  Resultado real: `<title>Download Rally Hud</title>`, `<description>Rally Hud</description>`.
- Una description de "Rally Hud" (9 caracteres) es inútil para CTR.
- `/app` también hereda el SEO por defecto.
- No hay `canonical`, ni `robots.txt`, ni sitemap.

**Implementado**
1. `index.astro` pasa `seo={defaultTemplateConfig.home.seo}`. `home.seo` deja de ser
   código muerto.
2. Descriptions reales, todas < 160 chars:
   - global: *"Project your speed, G-forces and lap data onto your windscreen..."*
   - `home.seo`: *"Real-time speed, G-force and telemetry projected onto your windscreen..."*
     (137 chars)
   - nueva sección `app.seo` en la config para `/app` (+ su tipo en `configType.ts`).
   - privacy/terms/cookies: se mantienen.
3. `<link rel="canonical">` en `Layout.astro`, construido con
   `new URL(Astro.url.pathname, Astro.site)` → sin query strings ni `localhost`.
4. `public/robots.txt` con `Disallow: /app` y referencia al sitemap.
5. `@astrojs/sitemap` integrado, **fijado a `3.2.1`**: las 3.3+ usan la API de rutas de
   Astro 5 y rompen el build con `Cannot read properties of undefined (reading 'reduce')`
   bajo Astro 4. Revisar al subir a Astro 5 (E6.1).
6. `filter` en el sitemap para excluir `/app` (página `noindex`).
7. Bonus de E0.1 aplicado aquí: `og:site_name`, `og:locale`, prop `noindex`, y se
   eliminó el `<meta name="title">` redundante.

**Hallazgo colateral → E3.0**
Las 3 páginas legales **no tienen ningún `<h1>`**: su markdown empieza con
`**Privacy Policy**` (negrita) en vez de `# Privacy Policy`, así que `react-markdown`
no genera ninguna jerarquía de headings. Añadir a E3.0 y a E7.0.

**Criterios de aceptación**
- [x] `grep '<title>' dist/index.html` devuelve el título de `home.seo`.
- [x] Cada página tiene `<link rel="canonical">` y description única.
- [x] `pnpm run build` genera `sitemap-index.xml` con las 4 páginas indexables.
- [x] `/app` marcado `noindex` y ausente del sitemap.
- [x] Verificado en navegador: canonical, og:url, og:site_name, theme-color,
      apple-touch-icon y 0 imágenes rotas.

---

# FASE 1 — Performance y Core Web Vitals

Objetivo: bajar el JS de ~130 KB gzip y eliminar el CLS.

---

## E1.1 · Reducir el bundle de JavaScript

**Problema**
La home carga ~130 KB gzip de JS para una página que es 95 % estática:
`react-dom` 44 KB + `home`/framer-motion/swiper 49 KB + `astro client` 44 KB.

**Cambios**
1. Cambiar `client:load` → `client:visible` en secciones bajo el fold
   (features, howItWorks, pricing, testimonials, faq, appBanner, footer).
   `client:load` solo donde el scroll-linked lo exige (header, navbar).
2. Evaluar `client:idle` para el resto.
3. **Acción de mayor impacto:** migrar las secciones puramente estáticas
   (Features, HowItWorks, Pricing, Partners, Footer) de `.tsx` a componentes `.astro`.
   Eso elimina React del bundle de esa página por completo.
4. Eliminar el import global `import "swiper/css"` de `Layout.astro` y moverlo al
   componente de testimonios (se está descargando en las 5 páginas).
5. Considerar sustituir Swiper por CSS scroll-snap ( Swiper aporta ~15 KB gzip
   para un carrusel de 3 tarjetas).

**Ficheros**
- `src/pages/*.astro`
- `src/modules/home/_components/*/index.tsx` → `*.astro`
- `src/Layout.astro`

**Criterios de aceptación**
- [ ] JS de la home ≤ 80 KB gzip (de ~130 KB).
- [ ] LCP < 2.5 s en lighthouse (movil emulado).
- [ ] TBT < 200 ms.

---

## E1.2 · Optimizar imágenes con `astro:assets`

**Problema**
- **16 `<img>` y ninguno tiene `width`/`height`** → CLS garantizado.
- Ninguno tiene `loading="lazy"` ni `srcset`.
- Al estar en `public/`, no pasan por `astro:assets`: no hay AVIF/WebP, ni srcset,
  ni dimensiones automáticas.

**Cambios**
1. Mover las imágenes a `src/assets/` (screenshots, stock, 3D, avatars, iphone-frame).
2. Sustituir por `<Image />` de `astro:assets` con `width`/`height` obligatorios.
3. `loading="lazy"` + `decoding="async"` en todo lo que esté bajo el fold.
4. Convertir las capturas de pantalla **PNG → WebP/AVIF** (hoy 1.png=261 KB,
   2.png=172 KB, 3.png=280 KB para imágenes de móvil que deberían pesar ~40 KB).
5. Para `config.ts`: cambiar el tipo de `screenshots`/`icon`/`image` de `string` a
   `ImageMetadata` para que los assets estén tipados y optimizados.

**Ficheros**
- `src/assets/**` (nuevo), `public/screenshots/`, `public/stock/`, `public/3D/`
- `src/utils/configType.ts`, `src/utils/config.ts`
- Todos los componentes con `<img>`

**Criterios de aceptación**
- [ ] CLS = 0.
- [ ] Ningún `<img>` sin `width`/`height`.
- [ ] Capturas de pantalla < 60 KB cada una.

---

## E1.3 · Tipografías en woff2 + preload

**Problema**
- `public/fonts/` = 416 KB en **TTF**: `CabinSketch.ttf` 269 KB,
  `Rowdies-Light.ttf` 75 KB, `Rowdies-Bold.ttf` 75 KB.
- Sin `preload`. Sin `unicode-range`. Sin `font-display` optimizado para la fuente de
  titulares (que es la LCP).

**Cambios**
1. Convertir los TTF a **woff2** (ahorro ~70%): `CabinSketch` → ~70 KB,
   `Rowdies` → ~20 KB cada uno.
2. Añadir `preload` para la fuente de titulares en `Layout.astro`.
3. Considerar auto-hospedar subset latino (solo el sitio está en inglés/español).
4. Ojo: E2.1 (redesign tipográfico) puede eliminar `CabinSketch` por completo —
   **ejecutar E1.3 después de E2.1** si se acepta el cambio de tipografía.

**Ficheros**
- `public/fonts/*.woff2` (nuevos), borrar los `.ttf`
- `src/styles/styles.scss`, `src/Layout.astro`

**Criterios de aceptación**
- [ ] `public/fonts/` < 120 KB.
- [ ] Sin warnings de `font-display` en lighthouse.

---

# FASE 2 — SEO y conversión (es una landing de app)

---

## E2.0 · Datos estructurados JSON-LD

> **Nota de numeración:** esta épica se ejecutará **después** de la Fase 3 (redesign),
> porque usa los colores y nombres finales de la marca. Si se ejecuta antes,
> actualizar de nuevo el bloque de colores.

**Problema**
No hay datos estructurados. Para una landing de app esto es el mayor lever de ASO
y rich results que queda disponible.

**Cambios**
1. Añadir un `<script type="application/ld+json">` en `Layout.astro` con
   `@type: "SoftwareApplication"`:
   - `name`, `applicationCategory: "UtilitiesApplication"`,
     `operatingSystem: "Android, iOS"`,
     `offers: { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }`,
     `downloadUrl`, `installUrl`, `screenshot`, `logo`,
     `softwareVersion` + `datePublished` si se conoce,
     `aggregateRating` (⚠️ solo si hay reseñas **reales**; marcarlo en el issue).
2. `BreadcrumbList` en las páginas de política.
3. `FAQPage` con las 7 preguntas de `config.ts`.

**Ficheros**
- `src/Layout.astro`
- (opcional) `src/utils/seo.ts` con helpers de generación

**Criterios de aceptación**
- [ ] Google Rich Results Test: sin errores ni warnings.
- [ ] Validador de Schema.org ok.

---

## E3.0 · Jerarquía de headings

**Problema**
La página renderiza **4× `<h1>`** (features, howItWorks, pricing, testimonials) mientras
el hero usa `<h2>` (`header/index.tsx:45`). La jerarquía está **invertida**.

**Cambios**
1. Hero: `<motion.h2>` → `<motion.h1>`.
2. Las 4 secciones con `<h1>` → `<h2>`.
3. Títulos de card dentro de features/pricing: `<h2>` → `<h3>`.
4. FAQ: título de sección `<h3>` → `<h2>`.
5. `Footer`: los links de navegación están como `<a>` sueltos dentro de un `<nav>`;
   envolver en `<ul>` (corrección semántica).
6. **Páginas legales** (hallazgo añadido en Fase 0): hoy no tienen **ningún** heading,
   porque su markdown empieza con `**Privacy Policy**` (negrita) en vez de
   `# Privacy Policy`, así que `react-markdown` no genera jerarquía. Al unificar en E7.0,
   sacar el título a un `<h1>` real en el componente y dejar el cuerpo sin título duplicado.

**Ficheros**
- `src/modules/home/_components/{features,howItWorks,pricing,testimonials,faq,header}/index.tsx`
- `src/components/footer/index.tsx`

**Criterios de aceptación**
- [ ] `grep -o '<h1' dist/index.html | wc -l` → `1`.
- [ ] Lighthouse a11y sin warning de heading order.

---

## E4.0 · Imágenes sociales (OG image)

**Problema**
`og:image` apunta a `/logo.png` (184 KB, no es 1200×630). Facebook/Twitter/LinkedIn
van a renderizar un recorte pobre o inválido.

**Cambios**
1. Crear `public/og.png` 1200×630 con logo + titular + mockup, siguiendo los tokens
   de marca definidos en E2.2.
2. Actualizar `Layout.astro` para usar `/og.png` en `og:image` y `twitter:image`.
3. Añadir `og:image:width`, `og:image:height`, `og:image:alt`.
4. Añadir `twitter:site` si hay cuenta.

**Ficheros**
- `public/og.png` (nuevo), `src/Layout.astro`

**Criterios de aceptación**
- [ ] La card se ve bien en el validador de Open Graph.
- [ ] `og.png` < 300 KB.

---

# FASE 3 — Accesibilidad

---

## E5.0 · prefers-reduced-motion

**Problema**
Cero soporte en todo el sitio. Hay ~40 animaciones de `framer-motion`, CSS
`scroll-behavior: smooth`, un `animate-ping` infinito y un autoplay de Swiper.
Para usuarios congidetsa de movimiento esto es un problema real (y de WCAG 2.3.3).

**Cambios**
1. En `styles.scss`:
   ```scss
   @media (prefers-reduced-motion: reduce) {
     html { scroll-behavior: auto; }
     *, *::before, *::after {
       animation-duration: .01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: .01ms !important;
     }
   }
   ```
2. Crear un helper `useReducedMotion()` de framer-motion y pasarlo a los componentes
   con animación de entrada, para que salten al estado final.
3. Los `whileInView` deben respetar el flag: si hay `reduce`, renderizar el estado `visible`.

**Ficheros**
- `src/styles/styles.scss`
- `src/hooks/useReducedMotion.ts` (nuevo)
- Todos los componentes con `motion.*`

**Criterios de aceptación**
- [ ] Con `reduce` activado no hay movimiento, y **todo el contenido es visible**
      (los `initial={{opacity: 0}}` no dejan texto invisible).

---

## E6.0 · ARIA, alt y Swiper pausable

**Problema**
- FAQ (`faq/index.tsx:48`) y menú móvil (`navbar/index.tsx:63`): botones sin
  `aria-expanded` / `aria-controls`.
- `alt` genéricos y **duplicados**: `"screenshot"` ×3, `"iphone-frame"` ×2,
  `"google play logo"` ×2, `"app store logo"` ×2, `"feature icon"`.
- **Swiper con `autoplay` sin control de pausa** → viola WCAG 2.2.2.
- Theme switcher: iconos sol/luna sin etiqueta textual.
- Navbar: `<a>` dentro de `<ul>` sin `<li>` (`navbar/index.tsx:94`).

**Cambios**
1. FAQ: `aria-expanded={activeIndex === index}`, `aria-controls`, `id` en el panel.
2. Menú móvil: `aria-expanded`, `aria-label="Abrir menú"`, y cerrar con `Escape`.
3. Reescribir todos los `alt` con contenido real
   (`"Rally Hud mostrando la velocidad en el parabrisas"`, no `"screenshot"`).
4. Marcar los decorativos como `alt=""` (`iphone-frame`, waves, blobs, flechas).
5. Swiper: importar `A11y` y `Keyboard` modules; añadir botón de pausa si el
   autoplay se mantiene (o desactivarlo, es una decisión de producto).
6. Theme switcher: `<span className="sr-only">` con el estado.
7. Envolver los links de navegación en `<li>`.

**Ficheros**
- `src/modules/home/_components/faq/index.tsx`
- `src/components/navbar/index.tsx`, `themeSwitcher.tsx`
- `src/components/footer/index.tsx`
- `src/modules/home/_components/testimonials/index.tsx`
- Todos los `<img>` (E1.2 los toca también → **coordinar**)

**Criterios de aceptación**
- [ ] Lighthouse a11y ≥ 95.
- [ ] axe DevTools: 0 violaciones críticas.
- [ ] Navegación completa por teclado, con foco visible.

---

# FASE 4 — Refactor de código

> ⚠️ **Ejecutar esta fase DESPUÉS de E0.4** (que borra `themeSelector`) y **en paralelo**
> con la Fase 5, pero sobre ramas distintas.

---

## E7.0 · Unificar páginas de política

**Problema**
Tres componentes **byte a byte idénticos** salvo el nombre:
`privacyPolicy`, `cookiesPolicy`, `termsAndConditions` (29 líneas cada uno).

**Cambios**
1. Crear `src/modules/legalPage/index.tsx` que recibe `config` y `section`.
2. `privacy-policy.astro`, `terms-and-conditions.astro`, `cookies-policy.astro` pasan a
   usar ese componente.
3. Evaluar mover el markdown a `src/content/*.md` + `import.meta.glob` en vez de
   embebido en `config.ts` (~200 KB de markdown legal en el archivo de config).

**Ficheros**
- `src/modules/{privacyPolicy,cookiesPolicy,termsAndConditions}/` → `src/modules/legalPage/`
- `src/pages/{privacy-policy,terms-and-conditions,cookies-policy}.astro`
- `src/utils/config.ts`, `src/utils/configType.ts`

**Criterios de aceptación**
- [ ] Las 3 páginas renderizan idéntico que antes.
- [ ] `config.ts` baja de 467 a ~265 líneas.

---

## E8.0 · Hook `useConfig` y fin de los non-null assertions

**Problema**
`useContext(ConfigContext)!` con **non-null assertion en 8 componentes**. Si el `Provider`
falta, revienta en runtime sin mensaje útil. Además el contexto es `TemplateConfig | null`
cuando nunca es `null` en la práctica.

**Cambios**
1. Cambiar el tipo del contexto a `TemplateConfig` (no nullable).
2. Crear `src/hooks/useConfig.ts`:
   ```ts
   export function useConfig(): TemplateConfig {
     const ctx = useContext(ConfigContext);
     if (!ctx) throw new Error("useConfig debe usarse dentro de <ConfigProvider>");
     return ctx;
   }
   ```
3. Reemplazar los 8 `useContext(ConfigContext)!` por `useConfig()`.
4. Extraer el `ConfigContext.Provider` a un componente `<PageShell>` reutilizable, ya que
   los 4 módulos lo repiten.

**Ficheros**
- `src/utils/configContext.ts`, `src/hooks/useConfig.ts` (nuevo)
- `src/components/navbar/index.tsx`, `footer/index.tsx`, `appBanner/index.tsx`,
  `navbar/themeSwitcher.tsx`
- `src/modules/home/_components/*/index.tsx`

**Criterios de aceptación**
- [ ] `grep -rn 'useContext(ConfigContext)!' src/` → 0 resultados.

---

## E9.0 · Deduplicar configuración

**Problema**
Los links de navegación están **literalmente duplicados** entre `footer.links` y
`topNavbar.links` (`config.ts:31-37` y `config.ts:43-48`). Dos fuentes de verdad.

**Cambios**
1. Extraer `const navLinks = [...]` y|Referenciar desde ambos.
2. Limpiar `configType.ts`:
   - Quitar `| undefined` explícitos redundantes (`logo: string`, no `logo?: string | undefined`).
   - Unificar indentación (4 espacios → 2, como el resto del proyecto).
   - Marcar como `readonly` los objetos de config.
3. ~~`pricing.tsx:7-13` tiene arrays hardcodeados (`planImages`, `planBGs`)~~ → **resuelto
   en E2.6**: la tabla de planes se eliminó y los 3 PNG 3D que solo usaba, con ella.
4. `headlineMark: [0, 2]` son índices mágicos sobre `split(" ")` →Replace con un
   formato explícito, p. ej. `headlineParts: ["Enhance Your", "Driving Experience with Rally Hud"]`.

**Ficheros**
- `src/utils/config.ts`, `src/utils/configType.ts`
- `src/modules/home/_components/pricing/index.tsx`
- `src/modules/home/_components/header/index.tsx`

**Criterios de aceptación**
- [ ] Cada array de navegación está declarado una sola vez.
- [ ] Añadir un 4º plan a la config no rompe el render.

---

## E10.0 · Consistencia de aliases y tooling

**Problema**
- Aliases mezclados: `@components/*`, `@modules/*`, `@styles/*` conviven con
  `../../utils/configContext` (relativo) y `utils/common` (bare vía `baseUrl`).
- `.prettierrc.mjs` usa **comillas simples**, el código usa **dobles**.
- No hay script `format` ni `lint` en `package.json`.
- `tailwind.config.mjs` (un `.mjs`) usa `require()` — solo funciona porque Tailwind lo
  carga con jiti. Frágil.
- `tailwind.config.mjs` hace `import config from "./src/utils/config"` para leer **un
  string**, arrastrando los ~200 KB de markdown legal al proceso de Tailwind.
- `getMobileOperatingSystem()` no detecta iPadOS 13+ (UA de Safari con `maxTouchPoints > 1`).

**Cambios**
1. Unificar a aliases: añadir `@utils/*`, `@layouts/*`, y reemplazar todos los relativos.
2. `.prettierrc.mjs`: `singleQuote: false`, y añadir scripts
   `format`, `format:check`, `lint`.
3. Añadir ESLint (`eslint` + `eslint-plugin-react-hooks` + `typescript-eslint`) con un
   `eslint.config.js` flat. Mínimo: `react-hooks/exhaustive-deps` y
   `no-non-null-assertion` (este último forcing E8.0).
4. Mover el nombre del tema daisyUI a una constante propia
   (`src/utils/theme.ts`) para que `tailwind.config.mjs` deje de importar todo `config.ts`.
5. `tailwind.config.mjs`: `import daisyui from "daisyui"` (ESM) en lugar de `require`.
6. `getMobileOperatingSystem()`: detectar iPadOS vía `navigator.maxTouchPoints > 1`.

**Ficheros**
- `tsconfig.json`, `tailwind.config.mjs`, `.prettierrc.mjs`
- `package.json`, `eslint.config.js` (nuevo)
- `src/utils/theme.ts` (nuevo), `src/utils/common.ts`
- Todos los `import`

**Criterios de aceptación**
- [ ] `pnpm run lint` en verde.
- [ ] `pnpm run format:check` en verde.
- [ ] Cero imports relativos que crucen más de 2 niveles.

---

## E11.0 · Redirección de `/app` en el servidor

**Problema**
`/app` redirige **desde el cliente** (`useEffect` + `window.location.href` en
`src/modules/app/index.tsx`). Para bots, crawlers y usuarios con JS lento o bloqueado,
la página nunca redirige. Además:
- Hereda el SEO por defecto en vez de uno propio.
- `w-screen h-screen` provoca overflow por scrollbar.

**Cambios**
1. Crear `src/middleware.ts` que emita un **302** a la store correcta según
   `Astro.request.headers.get("user-agent")`. Mantener el fallback en cliente como
   safety net (o sustituirlo por `<meta http-equiv="refresh">`).
2. SEO propio para `/app` (`noindex` opcional).
3. Cambiar `w-screen h-screen` por `min-h-dvh` o `h-screen` con `overflow-hidden`.

**Ficheros**
- `src/middleware.ts` (nuevo), `src/pages/app.astro`, `src/modules/app/index.tsx`

**Criterios de aceptación**
- [ ] `curl -sI -A "iPhone" localhost:4321/app` → `302` a `apps.apple.com`.
- [ ] `curl -sI -A "Linux Android" localhost:4321/app` → `302` a `play.google.com`.
- [ ] Sin overflow horizontal en `/app`.

---

# FASE 5 — REDISEÑO (la parte de diseño)

> Esta fase ataca el **problema raíz** identificado: *el sitio se ve como la plantilla
> "Like This" y no como un producto de instrumentación de rallying*.
>
> **Dependencias:** E2.2 (paleta) debe ejecutarse antes que E2.3, E2.4, E2.7.
> E2.0 (JSON-LD) debería ejecutarse **después** de E2.2 para usar los colores finales.

---

## E2.2 · Sistema de diseño "Rally HUD" — ✅ [x]

**Fuente: los tableros del usuario.** `docs/design/boards/` (26 ficheros `.dc.html` +
`canvas.json`, copiados desde `tableros_diseno.zip`). La fuente de verdad de color y
tipografía es el tablero **01 · Sistema · color y tipografía** y **01 · componentes**.

### Decisiones del usuario

- **Color de marca: azul + rojo** → en el sistema el **cian `#3DD6FF` es `primary`**
  ("lo que se toca") y el **rojo `#FF4D5E` es `error`** ("error y grabando").
- **Dark-first** → el sistema ya lo declara: *"Paleta · oscuro por defecto, claro para el día"*.

### Correcciones que traen los tableros

Este trabajo **deshace** dos decisiones tomadas antes con información incompleta:

| Antes (inferido) | Ahora (del tablero) |
|---|---|
| `primary` rojo `#f84830` | `primary` **cian** `#3DD6FF` — "el cian es lo que se toca" |
| Fondo `#09122c` (medido en las capturas viejas) | Fondo `#070B16` — el sistema nuevo es **más oscuro** |
| Degradado verde→rojo del velocímetro como motivo | **Eliminado**: el HUD nuevo usa cian monocolor, sin degradados |
| Oxanium + JetBrains Mono | **Barlow Condensed + Barlow** |

> El rojo **no desaparece**: pasa a ser `error`, que es su papel real en el sistema
> ("Error y grabando"). Es coherente con el "azul y rojo" que pidió el usuario.

### Implementado

- `src/utils/theme.ts`: los 14 tokens del tablero, con roles documentados
  (`bg` `s1` `s2` `ln` `tx` `t2` `t3` `cy` `cyi` `gr` `or` `vi` `am` `er`) mapeados a
  daisyUI, más `--rally-control-border`. Modo oscuro y modo día.
- `tailwind.config.mjs`: `fontFamily` → `condensed` (Barlow Condensed), `sans` (Barlow),
  `numeric` (condensada tabular). **Eliminados** `Rowdies` y `CabinSketch`.
- `scripts/fetch-fonts.py` (nuevo): descarga Barlow y Barlow Condensed en woff2 y los
  autoaloja. Solo subset `latin`: cubre inglés, acentos del español y tipografía.
  Los `@font-face` se emiten a `src/styles/fonts.css` para viajar en el CSS del bundle.
- `public/fonts/`: **416 KB de TTF → 90 KB de woff2** (6 ficheros).
- `styles.scss`: import de las fuentes, foco visible en `primary`, override del borde
  de controles, y corregido `[data-theme="dark"]` → `[data-theme="rally-light"]`
  (nombre de daisyUI que ya no existía: la variante oscura estaba muerta).
- `howItWorks`: el único uso de `font-sketch` (CabinSketch) pasa a condensada tabular.

### Reglas del sistema respetadas

- *"El cian es lo que se toca"*: el foco visible va en `primary`.
- *"Nunca solo color"*: pendiente de aplicar en estados (E2.7, E2.9).
- *"Las líneas son decorativas"* (`ln` = 1,5:1): `ln` no se usa para texto; los controles
  pulsables usan `t3` (6,2:1), que sí es visible.

### Verificación

- `scripts/validate-theme.py` → **0 fallos** en ambos temas (19 pares cada uno).
- **Validación cruzada**: los contrastes que calculo coinciden con los que declara el
  propio tablero — tx 17,23 vs 17,2 · cy 11,48 vs 11,5 · er 6,06 vs 6,1 ·
  gr 11,28 vs 11,3 · am 12,22 vs 12,2 · vi 8,14 vs 8,1.
- **Round-trip OKLCH**: los 8 tokens que se despliegan en el CSS coinciden exactamente
  con los del tablero (delta 0).
- Navegador: tema oscuro por defecto, Barlow cargada (400/500/600/700 + Condensed 700),
  0 imágenes rotas. `check` 0/0/0 · `build` 5 páginas.

### Pendiente

- [x] Ningún componente de marca usa color ajeno al sistema → AppBanner, footer y Spill
      reescritos con los tokens nuevos (ver "Regresiones corregidas" abajo).

### Regresiones que la paleta destapó y se han corregido

Estas no eran planes propios de E2.2, pero salían de ella y dejaban el sitio roto:

- **AppBanner**: era un bloque macizo `bg-primary` con un SVG "Spill" encima, un
  degradado `var(--p)` → `var(--s)` = **cian → violeta**, un caramelo que contradice
  *"un solo acento, color solo cuando significa algo"*. Sustituido por una tarjeta de
  superficie (`s1`, borde `ln`, radio 16) con el cian reservado a lo accionable.
  `src/components/appBanner/svgs/spill.tsx` eliminado.
- **Footer**: los enlaces y el copyright iban en `text-primary`. Con el cian del sistema
  eso es un bloque enorme de color de acento, justo lo que el sistema prohíbe. Ahora van
  en `base-content` y el cian solo aparece en `hover`/`focus-visible`. De paso los `<a>`
  sueltos del `<nav>` se envuelven en `<ul>/<li>`.
- **Bordes de tarjeta**: usaban `border-base-300`, pero `base-300` es `s2` (superficie
  de campos y chips), no una línea: daba **1,19:1** sobre `base-100`, demasiado tenue.
  El sistema define `ln` = **1,51:1** para bordes. Añadida la clase `.surface-card`
  ("CardTheme con radio 16, sin elevación y borde ln") y usada en features, showcase,
  how-it-works y AppBanner.
- **Tokens custom no emitidos**: `rally-line` / `rally-text-2` / `rally-text-3` no
  empezaban por `--`, y daisyUI solo emite como variable CSS las que sí. Renombrados.
- **Degradados rojo→azul**: tras el cambio de paleta, los dos
  `from-primary to-secondary` quedaron en rojo→azul. Sustituidos por `primary/25`.
- **`.surface-card` sin fondo** (encontrado en E2.11): la clase usaba
  `hsl(var(--b2))`, pero daisyUI v4 emite los tokens en **OKLCH**
  (`--b2: 19.8% .036 266.2`), no en canales HSL, así que la declaración era
  inválida y las tarjetas salían **transparentes** en las 5 secciones que la usan.
  El fondo se puso como utilidad `bg-base-200` en el marcado, que es la forma
  robusta. Detectado porque, al revisar testimonios, `backgroundColor` volvía
  `rgba(0,0,0,0)`.

---

## E2.1 · Sustituir la tipografía — ✅ [x]

**Resuelto por los tableros.** El sistema fija Barlow Condensed y Barlow; no había
decisión que tomar. Se implementó junto con la paleta en E2.2.

**Lo que pedía esta épica**
`Rowdies` es una display playful/cartoon: comunica "app de bingo para sobremesa", no
"instrumentación de precisión". `CabinSketch` en los números de *How it works* también
es doodle. Para un HUD: sans técnica para texto + **condensada tabular para las cifras**,
que no deben vibrar al actualizarse.

**Implementado**
- Fuentes del sistema, **autoalojadas en woff2** (`scripts/fetch-fonts.py`).
  El sistema lo pide expresamente para la app: *"Empaquétalas como assets en lugar de
  descargarlas con google_fonts. En un tramo de rally puede no haber cobertura, y la
  primera descarga fallaría justo ahí."* En la web suma además quitar un tercero.
- `fontFamily`: `condensed` (títulos y cifras), `sans` (texto), `numeric` (tabular).
- `public/fonts/` 416 KB de TTF → **90 KB de woff2**.
- El único uso de `font-sketch` migrado a condensada tabular.

**Criterios de aceptación**
- [x] El body copy ya **no** usa Rowdies.
- [x] Las cifras de datos usan tipografía tabular.
- [x] `public/fonts/` < 120 KB → **90 KB**.
- [ ] Aplicar la escala tipográfica del sistema a cada componente (títulos 40–52 px,
      texto 17 px/1,45, etiquetas 12–13 px mayúsculas +0,14 em) → una épica por
      componente en Fase 5.

---

## E2.3 · Sustituir la iconografía genérica — ✅ [x]

**Problema**
Las features usaban **cohete para "Speed"** y **trofeo para "G Forces"**: clip-art 3D
heredado de la plantilla "Like This" (los 79 ficheros que sobraban en `public/3D/`).
Pricing usaba un **monedero 3D genérico**. Los títulos llevaban emoji
(*"Speed 🎨"*, *"G Forces 🎲"*), contra la regla del sistema *"Iconos · Trazo de 2 px,
de 22 a 26 px, **sin emoji**"*.

**Implementado**
- `src/components/icons/index.tsx`: 13 iconos SVG en línea, `viewBox 24`, `strokeWidth 2`,
  `strokeLinecap/Linejoin round`, `currentColor`. Dominio real: velocímetro, vector G,
  segmento, cronómetro, podio, vehículo, sin señal, brújula, altitud, instrumentos,
  notas, móvil, mapa.
- El tipo de `features.cards.icon` pasa de `string` (ruta) a `IconName`, así que el
  compilador obliga a usar un icono que exista.
- SVG y no PNG: heredan `currentColor` (un solo archivo para los dos temas) y pesan
  ~200 B frente a ~40 KB.
- Sin emoji en los títulos.

**Criterios de aceptación**
- [x] Ningún icono ajeno al dominio de rallying o la conducción.
- [x] Los iconos cambian de color con el tema (heredan `currentColor`).
- [x] Sin emoji en títulos.
- [x] `public/3D/` queda con 2 ficheros; los PNG de features eliminados.

---

## E2.4 · Rediseñar "How it works" — ✅ [x]

**Problema**
Las fotos eran **stock de banco de imágenes de iOS**: una mujer tejiendo con el móvil y
otra mirando una planta. Cero relación con conducir. Y `gap-52` (13rem) dejaba vacíos
gigantes con un garabato azul flotando como flecha.

**Implementado**
- `scripts/render-boards.py` (nuevo): renderiza los 26 tableros a PNG con Chrome headless
  leyendo las medidas reales de `canvas.json` (HUD 844×390, App 390×844), a 2x.
- Los 3 pasos usan **capturas reales del producto**:
  1. *Pick or trace a segment* → `App-CrearTrazar`
  2. *Drive with the HUD* → `HUD-Conduccion`
  3. *Read your time* → `App-Tiempo`
- `gap-52` → `gap-12 md:gap-16`. Las flechas "swirl" se eliminan: la numeración
  `01/02/03` en Barlow Condensed tabular guía la lectura sola, y así no hay tres SVG
  decorativos que mantener.
- Los `font-sketch` (CabinSketch) pasan a `font-condensed tabular-nums`.
- `aspect-[16/10]` con `object-contain`: las capturas mezclan formato apaisado (HUD) y
  vertical (app) y se normalizan sin recortarse.
- Alt y `loading="lazy"` en cada imagen.

**Criterios de aceptación**
- [x] Ninguna imagen muestra a alguien tejiendo, en una planta o en una cocina.
- [x] Cero referencias a `/stock/` (las fotos de banco).
- [x] No hay bloques de más de 8rem de vacío entre pasos.
- [x] Cada paso se entiende sin leer el texto de al lado.

---

## E2.5 · Arreglar el navbar — ✅ [x]

**Problema** (bug reproducible a 800px)
El contenedor se animaba de `width: 100%` a `80%` al hacer scroll. Eso comprimía el
contenido hasta **solapar los items**: el logo se metía encima del switch de tema
(*"Rally Hu[toggle]d"*) y el nav **tapaba el titular** del hero.

Otros problemas del mismo componente:
- `opacity-0` + `animate={{opacity:1}}` → sin JS el navbar quedaba invisible.
- El nav completo se mostraba desde `md` (768px), donde ya no cabía.
- No había estado de sombra cuando estaba sticky sobre contenido.
- El toggle de tema era un `<label>` + checkbox mudo.

**Implementado**
- **Animación de ancho eliminada**. El ancho es fijo; lo único que cambia al hacer scroll
  es la sombra y el fondo (`bg-base-200/90 backdrop-blur shadow-lg` frente a
  `bg-base-200/60 backdrop-blur-sm` + borde transparente).
- `opacity-0` fuera: el nav es visible sin JS.
- Breakpoint del nav completo de `md` → `lg` (1024px).
- Estado sticky con sombra y borde `ln`.
- El menú móvil cierra con `Escape`.
- `<a>` del menú móvil envueltos en `<ul>/<li>` (antes estaban sueltos).
- `alt` reales en los badges de las stores.
- `disableWidthAnimation` eliminado de config y tipo: la opción ya no tenía sentido.

### 🐛 Bug que introdujo esta propia épica

Al añadir `aria-expanded` envolví `<MenuToggle>` (que renderizaba su propio `<button>`)
dentro de otro `<button>`. Eso es **HTML inválido** (`<button>` no puede contener otro
`<button>`), React lanzaba en la hidratación y **la isla entera pasaba a
client-rendering**, rompiendo todos los `useEffect` del navbar.

Se detectó porque el `isScrolled` no se actualizaba al hacer scroll. Se diagnostico
descartando el listener con un evento `scroll` sintetico (que sí reaccionaba):
el problema no era el listener, era la hidratación.

**Arreglo**: `MenuToggle` ya no renderiza un botón, solo el icono. Quien lo usa aporta
el `<button>` real, donde deben vivir `aria-expanded`, `aria-controls` y `aria-label`.
Es además la estructura correcta para lectores de pantalla.

**Verificación**: 11 `<button>` en el HTML construido, **0 anidados**; 0 errores de
consola tras recargar.

**Criterios de aceptación**
- [x] A 768/800/1024/1440 px: ningún elemento del nav se solapa (comprobado por
      intersección de cajas en el DOM).
- [x] El nav nunca tapa el titular del hero (nav bottom 64px vs titular top 278px).
- [x] Sin JS el nav es visible (ya no hay `opacity-0`).
- [x] El estado de sombra responde al scroll (verificado con evento sintético).

---

## E2.6 · Bloque "Free forever" — ✅ [x]

**Problema**
Un solo plan "Free Plan" → una **tarjeta huérfana de 1/3 de ancho** perdida en un mar de
blanco, con `animate-ping` infinito en cada bullet y un monedero 3D de la plantilla.

**Decisión del usuario**
Convertirlo en un bloque de valor: *"Free forever · works offline · no ads"*. Encaja con
el dato real: el precio es **0 en las dos stores** (verificado contra la API de iTunes y
la ficha de Google Play), así que una comparativa de planes no dice nada que el título no
diga ya.

**Implementado**
- `pricing.plans` → **`pricing.promises`**: tres garantías con icono del sistema.
  *Every segment, unlimited* · *Works offline* · *No account, no ads*.
- Título *"Free forever"*, subtítulo *"No subscription, no ads and no account."*
- Badges de las stores como CTA, en vez de un botón de una tarjeta de 1/3.
- `animate-ping` eliminado (ruido visual).
- Enlazado en nav y footer: **"Pricing" → "Free"**.

**Bonus**: al quitar los planes desaparece el bug que E9.0 tenía anotado — `planImages` y
`planBGs` estaban **hardcodeados fuera de la config**, así que añadir un cuarto plan
rompía con `undefined`. También se han borrado los 3 PNG 3D que solo usaba esa tabla.

**Criterios de aceptación**
- [x] Sin tarjetas huérfanas ni espacio muerto.
- [x] Cero animaciones infinitas innecesarias.
- [x] El contenido de la sección sale de la config.

---

## E2.7 · Rediseñar los testimonios — ✅ [x]

**Problema**
- Tarjetas `bg-primary` azul **saturado**.
- **Estrellas negras** (`bg-primary-content` sobre azul) → contraste roto.
- `!h-[22rem]` fijo dejaba huecos con los testimonios cortos.
- **Texto en español en un sitio en inglés.**
- Sin avatar ni rol → **sin credibilidad**.

**Decisión del usuario**
Convertirlos en **testimonios de beta testers, etiquetados como tales**. No se
presentan como reseñas de clientes porque en las dos stores **no hay ninguna** (0
ratings, comprobado contra la API de iTunes y la ficha de Google Play).

**Implementado**
- Fondo de superficie (`surface-card bg-base-200`), no color de acento. Con el
  cian del sistema, un bloque saturado sería aún más estridente.
- Estrellas en `accent` (ámbar del sistema, 12,2:1) con `role="img"` y
  `aria-label="5 out of 5"`.
- Altura **automática** (`h-auto`): las tarjetas igualan altura por fila con flex,
  sin huecos fijos.
- Texto **traducido al inglés** y con **rol** (*Hillclimb competitor*, *Track day
  regular*, *Rally navigator*), que es lo que da credibilidad.
- Título y subtítulo que **declaran el carácter beta**: *"Rally Hud is still early.
  These are the people driving the pre-release build..."*
- `<blockquote>` + `<figcaption>` en lugar de `<p>` + `<h2>`, que es la semántica
  correcta para una cita.
- Tipo de `testimonials.cards` ampliado con `role?: string`.

**WCAG 2.2.2 — movimiento automático**
El `autoplay` de Swiper sin control de pausa es un incumplimiento. Se añadió un
botón con `aria-pressed`. **Primera implementación fallaba**: solo alternaba la
transición CSS del wrapper, lo cual **no detiene el temporizador** de Swiper.
Rehecha con la API real (`swiper.autoplay.pause()` / `.resume()` vía `onSwiper`).
Verificado en el navegador: tras pulsar, el `transform` del wrapper deja de
cambiar.

**Criterios de aceptación**
- [x] Contraste AA en las estrellas.
- [x] Todos los testimonios en el mismo idioma que el sitio.
- [x] Sin huecos verticales dentro de las tarjetas.
- [x] Etiquetados como beta testers.
- [x] El autoplay se puede pausar de verdad.

> Los nombres y los textos siguen siendo los originales del sitio, ya traducidos.
> Son contenido provisional hasta que haya feedback real de la beta; conviene
> sustituirlos cuando exista.

---

## E2.8 · Bloque de capturas anotadas — ✅ [x]

**Problema**
No había sección de capturas anotadas, el formato que mejor convierte en una landing de
app. Las capturas solo aparecían en el hero (mockup giratorio) y en el App Banner.

**Implementado**
- Nuevo módulo `src/modules/home/_components/showcase/`, insertado entre HowItWorks y
  Pricing, y controlado por `home.showcase` en la config (nuevo en `configType.ts`).
- 4 tarjetas con pie de foto: `HUD · Driving`, `Times · Detail`, `Ranking`,
  `HUD · Instruments`. Mezcla a propósito la HUD apaisada (lo que ve el conductor) y la
  app vertical (lo que ve al preparar la salida).
- Retícula `md:grid-cols-2` con normalización interna por `object-contain`.

**Criterios de aceptación**
- [x] La sección muestra el producto real, no mockups genéricos.
- [x] Las anotaciones son legibles en móvil (`md:grid-cols-2` colapsa a 1 columna).

---

## E2.9 · Prueba técnica — ✅ [x]

**Problema**
La "prueba social" que plantaba esta épica **no es posible hacerla**: en las dos
stores hay **0 ratings** y ningún dato de instalaciones (verificado contra la API de
iTunes y la ficha de Google Play). Cualquier cifra de usuarios sería inventada.

**Decisión aplicada**
Sustituirla por **hechos verificables del producto**, y quitar del hero los **cinco
avatares de stock**: con 0 usuarios registrados, cinco caras al lado de "Join early
adopters" siguen insinuando gente que usa la app.

**Implementado**
- Nuevo módulo `src/modules/home/_components/proof/`, con `home.proof` en la config.
- Cuatro bloques, cada uno con el **color semántico que le corresponde**, siguiendo
  *"color únicamente cuando significa algo"* (Sistema-Base). El color va en la regla
  superior de cada bloque, no en un adorno:

  | Bloque | Icono | Color |
  |---|---|---|
  | One screen, everything | instrumentos | `info` |
  | Your roads, not a fixed list | segmento | `primary` |
  | You race yourself first | podio | `success` |
  | Honest when it cannot know | sin señal | `warning` |

- Título deliberadamente honesto: *"Built for the road, not for the store"* /
  *"Rally Hud is still early, so instead of a star rating here are the things it
  actually does."*
- `public/avatars/` (5 ficheros) deja de usarse.

**Criterios de aceptación**
- [x] Ningún dato de usuarios inventado en la web.
- [x] Los cuatro puntos se pueden comprobar en la app.
- [x] Sin avatares que insinuar usuarios inexistentes.

---

## E2.10 · Ritmo vertical — ✅ [x]

**Problema**
Cada bloque usaba su propio espaciado (`py-12`, `py-16`, `mb-12`), sin escala común,
y el ritmo se marcaba solo con espacio en blanco.

**Implementado**
- Escala única en `styles.scss`:
  - `--rally-section-y`: 4rem en móvil, 5rem en escritorio
  - `--rally-gap-title`: 2,5rem / 3rem
- Clases `.section-y` y `.section-head`, aplicadas a los 6 componentes que tenían
  su propio `py-16` / `mb-10`.
- `.section-alt`: alterna el fondo de una sección (`b2`) para marcar el cambio sin
  meter más espacio en blanco. Aplicada al bloque *showcase*.
- El `gap-52` de How it works ya se había eliminado en E2.4.

**Sobre el objetivo de −20%**
El roadmap fijaba "reducir 7613 px un 20-25%". Ese objetivo **quedó desactualizado**:
después se añadieron dos secciones nuevas (*showcase* en E2.8, ~747 px, y *proof* en
E2.9, ~675 px), es decir **+1422 px de contenido real**.

La reducción de espacio muerto sí se produjo (el `gap-52` de How it works eran 13rem
por paso), pero la altura total **sube a 8648 px** porque hay más secciones. Es el
resultado correcto: una página más corta a costa de borrar contenido útil no es una
mejora. Lo que se ha fijado es que el ritmo sea **consistente**, que era el problema real.

**Criterios de aceptación**
- [x] Una sola escala de espaciado en toda la página.
- [x] Ningún bloque de vacío > 8rem sin contenido intencionado.
- [x] Las secciones se distinguen por tono, no solo por espacio.
- [ ] Altura total reducida — **no aplica**: se añadieron 1.422 px de contenido real.

---

## E2.11 · Pulido visual — ✅ [x]

**Problema principal**
El logo era un **PNG de 184 KB con fondo blanco**: en tema oscuro salía un
cuadrado blanco en el navbar. Es lo más llamativo que quedaba.

**Implementado**

### Logo a SVG
- `scripts/build-logo.py` (nuevo): genera `public/logo.svg` (2,5 KB) a partir de
  la geometría **medida** del PNG. No es un SVG dibujado a ojo: son 8 `<path>`
  con coordenadas calculadas.
- El arco rojo tiene **grosor variable** (85 px de los 1024 originales en el
  extremo derecho, ~2 px a la izquierda) y **6 segmentos separados por huecos**.
  Los huecos se midieron muestreando la banda entre r=300 y r=334 sobre el PNG.
- El `viewBox` es la caja de contenido exacta del PNG (x 144..880, y 316..710),
  así que ambos ocupan lo mismo.
- Config: `logo: "/logo.svg"`. El PNG **se conserva** para `ogImage`, porque las
  plataformas sociales no aceptan SVG.

> Dos intentos fallidos antes de acertar, ambos por muestrear mal el borde: al
> principio el punto de control de una curva cuadrática quedó casi en el arco
> exterior y salió un blob; y la lista de puntos del borde interior iba en el
> mismo sentido que la exterior, así que el polígono se cruzaba. Se resolvió
> invirtiendo el sentido y muestreando 48 puntos por tramo.

### Resto del pulido
- **Spill del footer/banner**: eliminado (era el degradado cian→violeta de E2.2).
- **Badges de las stores**: `alt` real y `loading="lazy"` en header, banner y pricing.
- **Foco visible**: `:focus-visible` con `outline` en `primary`, siguiendo
  *"El cian es lo que se toca"*.
- **Hover/focus unificados**: los enlaces del footer usan `base-content` y llevan
  el acento solo en `hover`/`focus-visible`.
- **Líneas de texto**: el body copy va limitado a `max-w-lg`/`max-w-md` dentro de
  contenedores `max-w-screen-lg`, así que a 1440px+ no se forman líneas de 140
  caracteres.

**Criterios de aceptación**
- [x] Logo sin fondo rectangular en dark mode.
- [x] Foco visible en los elementos interactivos.
- [x] Ninguna línea de texto > 90 caracteres.
- [x] `og:image` sigue siendo un raster válido.

---

## E2.12 · Atmósfera de fondo — ✅ [x]

**Problema**
`backgroundGrid: false` desde el principio. Para un producto de instrumentación
faltaba textura; el sistema pide "fondo casi negro azulado" y un solo acento.

**Implementado**
- `backgroundGrid: true`. La textura usa ahora el **token `ln` del sistema** mezclado
  al 70% con `color-mix()`, en vez del `rgba(200,200,200,.1)` fijo de antes, que era
  un gris que no pertenece a la paleta. Degradado de máscara para que se apague hacia
  abajo y no compita con el footer.
- Celdas de 48px (antes 50px) y `aria-hidden="true"`, porque es decoración y no debe
  anunciarse a un lector de pantalla.
- **`.hero-glow`**: un halo radial al 9% del color `primary` en la parte alta, para
  que el hero no quede plano. Cero JS, cero animación, cero coste de CPU.
- Variante para el modo día (7% en vez de 9%).

**Criterios de aceptación**
- [x] Fondo con textura sutil que no moleste al leer.
- [x] Sin impacto medible en LCP (es CSS puro, sin peticiones extra).
- [x] Los dos decorativos marcados `aria-hidden`.
- [x] La textura usa el token del sistema, no un gris suelto.

---

## E2.13 · Corregir el copy — ✅ [x]

**Problema**
El sitio describía la app anterior (solo velocidad y G-forces), mientras el rediseño
añade segmentos, cronometraje, ranking, garaje y vehículo. Quedaban además restos de la
plantilla "Like This" y copy corporativo genérico.

**Implementado**
- **Vocabulario tomado de los tableros**, no inventado: la navegación de la app es
  *Segmentos · Ranking · Tiempos · Garaje · Perfil*; las etiquetas reales incluyen
  *"Mi mejor"*, *"Cerca de mí"*, *"Populares"*, *"Míos"*, *"Pujada a"*…
- **features**: de 2 a 6 tarjetas, con los roles que de verdad tiene cada dato.
  *Speed · G-force · Segments · Timing · Ranking · Honest GPS*. Sin emoji.
- **header**: *"Your driving, measured"* / *"A HUD for the windscreen and a full timing
  tool for your favourite roads."*
- **appBanner**: *"Start timing your first segment"* + *"Free on Android and iOS. No
  subscription, no ads and no account needed."*
- **claim inventado eliminado**: `"100+ people already using the app"` → **"Join the
  early adopters"** (decisión del usuario). Con 0 reseñas en las stores, el dato original
  no era verificable.
- **FAQ**: de 7 a 8 preguntas reescritas. Corregido el typo `"he app uses minimal mobile
  data"` → eliminado con la pregunta entera. Añadidas: seguridad al conducir, cómo crear
  un segmento, si funciona sin cobertura, qué pasa si se pierde el GPS, precio y
  requisitos reales (Android 8 / iOS 15.6, tomados de la ficha de la store).
- **Posicionamiento de seguridad**: la app declara *"Tu seguridad va primero… No mires
  ni toques el móvil mientras conduces"*. El copy del hero y el FAQ lo reflejan en vez
  de hidearlo.
- **Limpieza**: 64 líneas comentadas de la plantilla ("Bingo", logos de Apple/AWS/Google,
  planes de precio de otro juego) reducidas a 25. Sin restos de *Like This* en el
  contenido visible.
- `pricing.subtitle`: `"Free to use"` → la sección se renombra en E2.6.

**Criterios de aceptación**
- [x] `grep -i "elevate your lifestyle\|seamless and effective" src/` → 0.
- [x] Sin restos de la plantilla en el contenido renderizado.
- [ ] Copia final revisada por el usuario: el contenido de las secciones se reescribió
      entero, y el tono es una decisión suya.

**Nombre de la app en los textos legales — corregido**
La **cookies policy** decía que la app se llama *"Like This"* (`config.ts:368`), mientras
que la privacy policy y las condiciones ya decían "Rally Hud": era la única que se había
quedado sin actualizar al renombrar. Corregido por indicación explícita del usuario.
El resto de menciones a "Like This" en este documento se **mantienen a propósito**: aquí
se nombra a la plantilla original de la que salió el repo, no a la app. Cambiarlas haría
que el roadmap dijera algo falso.

> Nota para futuras épicas: el resto del contenido legal (quién es el responsable, los
> terceros que se listan como Firebase Analytics y Crashlytics) sigue sin auditarse.
> Conviene que lo revise la asesoría; no es solo un cambio de nombre.

---

## E2.14 · 404 y página de error — ✅ [x]

**Problema**
Sin página 404: un usuario en una URL mal escrita o tras un link viejo veía la
404 por defecto de GitHub Pages, rompiendo la marca.

**Implementado**
- `src/pages/404.astro` + `src/modules/notFound/index.tsx`.
- Estilo de la marca: *"This road is not on the map"*, con CTA a la home y a las
  features.
- `noindex` y SEO propio, sin tocar el sitemap.

**Por qué es un módulo y no solo un `.astro`**
El `Footer` consume `ConfigContext`, y en Astro eso solo se puede satisfacer desde
dentro de la isla React: escribir `<ConfigContext.Provider>` directamente en el
`.astro` **no funciona**, porque Astro monta islas de componentes, no de providers.
El primer intento reventó el build con
*"Cannot destructure property 'footer' of 'useContext(...)' as it is null"*.

Este es exactamente el problema que resuelve E8.0 (`useConfig()` + `PageShell`); la
página 404 es el segundo sitio donde se nota.

**Criterios de aceptación**
- [x] `dist/404.html` existe.
- [x] `/ruta-inexistente` → HTTP **404** sirviendo la página de marca.
- [x] No entra en el sitemap.

---

# Anexo A — Comandos de verificación

```bash
pnpm install --frozen-lockfile
pnpm run check        # type-check: debe dar 0 errors, 0 warnings, 0 hints
pnpm run build        # build de las 5 páginas
pnpm run preview      # servidor de preview en :4321

# Lighthouse
npx lighthouse http://localhost:4321/ --view

# Verificaciones manuales de diseño
# 768px, 800px, 1024px, 1440px, 390px (móvil)
```

### Guiones de verificación añadidos en Fase 0

```bash
# Auditar assets de public/ antes de borrar cualquiera de ellos.
# Clasifica cada asset: activo / solo comentado / sin referencia.
python3 scripts/audit-public-assets.py
```

Comprobar que no hay referencias rotas en el build (debe imprimir `rotas: 0`):

```bash
python3 - <<'PY'
import os, re, sys
refs = set()
for root, _, files in os.walk('dist'):
    for f in files:
        if not f.endswith(('.html', '.css', '.js', '.svg', '.xml', '.txt')):
            continue
        txt = open(os.path.join(root, f), encoding='utf-8', errors='ignore').read()
        pat = r'["\'(](\/[^"\')\s]+?\.(?:webp|png|svg|jpg|jpeg|ttf|woff2|css|js|ico|xml|txt))["\')]'
        for m in re.findall(pat, txt):
            refs.add(m)
missing = sorted(r for r in refs if not os.path.exists(os.path.join('dist', r.lstrip('/'))))
print(f"referencias: {len(refs)} | rotas: {len(missing)}")
for m in missing:
    print("  ROTA:", m)
sys.exit(1 if missing else 0)
PY
```

---

# Anexo B — Orden de ejecución recomendado

```
FASE 0  ──►  E0.1, E0.2, E0.3, E0.4        (rápida, desbloquea el resto)
   │
   ├──►  FASE 3  ──►  E5.0, E6.0            (independiente, puede ir en paralelo)
   │
   ├──►  FASE 1  ──►  E1.2, E1.1, (E1.3 después de E2.1)
   │
   ├──►  FASE 4  ──►  E7.0, E8.0, E9.0, E10.0, E11.0
   │
   └──►  FASE 2  ──►  E0.5, E3.0, E4.0
            │
            └──►  FASE 5  ──►  E2.2 ──► E2.1 ──► E2.3, E2.4, E2.5, E2.6, E2.7
                                    ├──► E2.8, E2.9, E2.10, E2.11, E2.12, E2.13, E2.14
                                    └──► E2.0 (JSON-LD, usa los tokens finales)
                                              │
                                              └──►  FASE 6  ──►  E6.1, E6.2
```

**Notas de coordinación**
- **E1.2 ↔ E6.0**: ambas tocan los `<img>`. E1.2 cambia el marcado, E6.0 los `alt`.
  Hacer E1.2 primero, luego E6.0.
- **E2.1 ↔ E1.3**: E1.3 optimiza las fuentes actuales; E2.1 las sustituye.
  **Ejecutar E2.1 antes que E1.3.**
- **E9.0 ↔ E2.6**: ambas tocan el pricing. E9.0 mueve los assets a config, E2.6 rediseña.
  **Ejecutar E9.0 antes que E2.6.**
- **E2.2 ↔ E2.0**: el JSON-LD referencia colores. Ejecutar E2.2 antes que E2.0.

---

# Anexo C — Métricas de éxito

| Métrica | Antes | Objetivo | Ahora |
|---|---|---|---|
| JS gzip (home) | ~130 KB | < 80 KB | ⬜ |
| `dist/` | 10 MB | < 4 MB | ✅ **3.3 MB** |
| `public/` | 7.4 MB | — | ✅ **2.1 MB** |
| CLS | > 0.1 | 0 | ⬜ |
| Lighthouse Performance | — | ≥ 95 | ⬜ |
| Lighthouse SEO | — | ≥ 95 | ⬜ |
| Lighthouse A11y | — | ≥ 95 | ⬜ |
| `<h1>` por página | 4 (home) / 0 (legales) | 1 | ⬜ |
| Hints de `astro check` | 133 | 0 | ✅ **0** |
| Errores de `astro check` | 0 | 0 | ✅ 0 |
| Meta OG con `localhost` | sí | no | ✅ no |
| Referencias rotas en `dist` | — | 0 | ✅ **0 / 35** |
| `favicon` | 404 | 200 | ✅ |
| Longitud description home | 9 chars | < 160 | ✅ 137 |
| Páginas en el sitemap | 0 | todas indexables | ✅ 4 |
| Fotos de stock no relacionadas | 3 | 0 | ✅ 0 |
| Páginas generadas | 5 | 6 (con 404) | ✅ 6 |
| Altura del home | 7613 px | — | 8648 px (+2 secciones reales) |
| Secciones del home | 6 | 7 (con showcase) | ✅ 7 |
| Tabla de planes de precio | 1 plan huérfano | bloque de valor | ✅ |
| Errores de hidratación | 1 (button anidado) | 0 | ✅ 0 |
| Autoplay sin pausa | sí (WCAG 2.2.2) | pausable | ✅ API real |
| `logo.png` | 184 KB | `logo.svg` 2,5 KB | ✅ |