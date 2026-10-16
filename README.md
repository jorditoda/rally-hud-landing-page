# Rally Hud — Landing Page

Landing de **Rally Hud**, una app de heads-up display y cronometraje para
Android y iOS. Construida con Astro + React + Tailwind + daisyUI.

## Desarrollo

```bash
pnpm install --frozen-lockfile
pnpm run dev       # servidor de desarrollo en :4321
pnpm run check     # type-check (debe dar 0 errores, 0 warnings, 0 hints)
pnpm run build     # build estatico en dist/
pnpm run preview   # servir el build
```

## Contenido

Todo el contenido editable vive en `src/utils/config.ts`. Los tokens de color y
tipografía están en `src/utils/theme.ts` y salen de los tableros de diseño en
`docs/design/boards/`.

## Scripts de apoyo

```bash
python3 scripts/validate-theme.py      # contraste WCAG de los tokens del tema
python3 scripts/audit-public-assets.py # clasifica los assets de public/
python3 scripts/render-boards.py       # renderiza docs/design/boards a public/screens/board/
python3 scripts/fetch-fonts.py         # descarga y autoaloja Barlow / Barlow Condensed
```

## Créditos

El diseño original de la plantilla es de
[Automatic App Landing Page Repository](https://github.com/sofiyevsr/mobile-app-landing-template).
Los tableros de `docs/design/boards/` y los tokens de `src/utils/theme.ts` son
propios.

## Licencia

[MIT License](LICENSE)