/**
 * Sistema de diseño "Rally HUD" — tokens
 * ───────────────────────────────────────────────────────────────
 * FUENTE: `docs/design/boards/Sistema-Base.dc.html` (tablero 01 · color y
 * tipografía) y `Sistema-Componentes.dc.html`, y los 24 tableros de pantallas.
 * Los valores NO se han inventado: están transcritos del tablero, que a su vez
 * los declara con su ratio de contraste medido.
 *
 * Todos los pares de este fichero se validan con `scripts/validate-theme.py`.
 *
 * Reglas del sistema que condicionan el mapeo a daisyUI:
 *  · El cian `cy` es LO QUE SE TOCA: botón principal, pestaña activa,
 *    selección y estado normal. Nada más lleva cian.
 *  · El color nunca va solo: el récord lleva marca y texto, el error icono y
 *    mensaje, el podio número.
 *  · `ln` (líneas) es decorativo: 1,5:1. Los campos se reconocen por forma y
 *    etiqueta, y al enfocarse pasan a borde cian.
 *  · En Flutter: "ColorScheme.dark y ColorScheme.light con cy como primario
 *    y er como error".
 */

export const THEME_DEFAULT = "rally-dark";
export const THEME_ALTERNATE = "rally-light";

/** Modo día: los mismos roles con valoresLegibles sobre fondo claro. */
export const themes = {
  // ── Oscuro · por defecto ───────────────────────────────────────────
  "rally-dark": {
    "color-scheme": "dark",

    // Superficies
    "base-100": "#070B16", // bg · pantalla
    "base-200": "#0E1526", // s1 · tarjetas y barras
    "base-300": "#151E36", // s2 · campos, chips, pistas
    "base-content": "#EAF0FF", // tx · cifras y títulos · 17,2:1

    // Texto secundario y terciario, expuestos para utilities propias.
    "--rally-text-2": "#A3B0D0", // t2 · descripciones · 9,1:1
    "--rally-text-3": "#8190B5", // t3 · etiquetas y ayudas · 6,2:1
    "--rally-line": "#243050", // ln · bordes decorativos · 1,5:1 (a propósito)

    // PRIMARY = cian. Es lo que se toca.
    "primary": "#3DD6FF",
    "primary-content": "#031520", // cyi · tinta sobre cian

    "secondary": "#B794FF", // vi · fuerza G lateral
    "secondary-content": "#0A1020",

    "accent": "#FFC247", // am · pendiente, podio
    "accent-content": "#0A1020",

    // Semánticos. El rojo NO es marca: es error y grabación.
    "success": "#4ADE80", // gr · mejor tiempo, récord, correcto
    "success-content": "#052e16",
    "warning": "#FF7A45", // or · aviso, frenada, sin permiso
    "warning-content": "#2b1206",
    "error": "#FF4D5E", // er · error y grabando
    "error-content": "#2b0208",
    "info": "#B794FF", // el sistema no define info; se presta el violeta
    "info-content": "#0A1020",

    "neutral": "#0E1526",
    "neutral-content": "#A3B0D0",

    // Borde de controles interactivos. `ln` a 1,5:1 es demasiado tenue para
    // un control pulsable; el sistema resuelve esto por forma + etiqueta y con
    // el foco en cian (11,5:1). Aquí se usa `t3`, color del propio sistema,
    // que sí es visible (6,2:1) sin competir con el acento.
    "--rally-control-border": "#8190B5",
  },

  // ── Día ────────────────────────────────────────────────────────────
  "rally-light": {
    "color-scheme": "light",

    "base-100": "#EEF1F7",
    "base-200": "#FFFFFF",
    "base-300": "#DDE3EF",
    "base-content": "#0A1020", // 16,8:1

    "--rally-text-2": "#3E4A66",
    "--rally-text-3": "#55617E",
    "--rally-line": "#C4CDE0",

    "primary": "#005FA3", // 5,9:1 sobre el fondo de día
    "primary-content": "#FFFFFF",

    "secondary": "#6D3FD4",
    "secondary-content": "#FFFFFF",

    "accent": "#8A5A00",
    "accent-content": "#FFFFFF",

    "success": "#0E7C3A",
    "success-content": "#FFFFFF",
    "warning": "#C2410C",
    "warning-content": "#FFFFFF",
    "error": "#C62835",
    "error-content": "#FFFFFF",
    "info": "#6D3FD4",
    "info-content": "#FFFFFF",

    "neutral": "#FFFFFF",
    "neutral-content": "#3E4A66",

    "--rally-control-border": "#55617E",
  },
} as const;