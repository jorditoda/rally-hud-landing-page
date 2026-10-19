/**
 * "Rally HUD" design system — tokens
 * ───────────────────────────────────────────────────────────────
 * SOURCE: `docs/design/boards/Sistema-Base.dc.html` (board 01 · color and
 * typography) and `Sistema-Componentes.dc.html`, plus the 24 screen boards.
 * The values are NOT invented: they are transcribed from the board, which
 * declares them with their measured contrast ratio.
 *
 * Every pair in this file is validated by `scripts/validate-theme.py`.
 *
 * System rules that constrain the daisyUI mapping:
 *  · Cyan `cy` is WHAT GETS TOUCHED: primary button, active tab, selection
 *    and normal state. Nothing else carries cyan.
 *  · Color never goes alone: the record carries mark and text, the error
 *    icon and message, the podium number.
 *  · `ln` (lines) is decorative: 1.5:1. Fields are recognized by shape and
 *    label, and on focus they switch to a cyan border.
 *  · In Flutter: "ColorScheme.dark and ColorScheme.light with cy as primary
 *    and er as error".
 */

export const THEME_DEFAULT = "rally-dark";
export const THEME_ALTERNATE = "rally-light";

/** Day mode: the same roles with readable values on a light background. */
export const themes = {
  // Dark by default
  "rally-dark": {
    "color-scheme": "dark",

    // Surfaces
    "base-100": "#070B16", // bg · screen
    "base-200": "#0E1526", // s1 · cards and bars
    "base-300": "#151E36", // s2 · fields, chips, tracks
    "base-content": "#EAF0FF", // tx · numbers and titles · 17.2:1

    // Secondary and tertiary text, exposed for own utilities
    "--rally-text-2": "#A3B0D0", // t2 · descriptions · 9.1:1
    "--rally-text-3": "#8190B5", // t3 · labels and help · 6.2:1
    "--rally-line": "#243050", // ln · decorative borders · 1.5:1 (on purpose)

    // PRIMARY = cyan. This is what gets touched.
    "primary": "#3DD6FF",
    "primary-content": "#031520", // cyi · ink over cyan

    "secondary": "#B794FF", // vi · lateral G force
    "secondary-content": "#0A1020",

    "accent": "#FFC247", // am · pending, podium
    "accent-content": "#0A1020",

    // Semantics. Red is not a mark: it's error and recording.
    "success": "#4ADE80", // gr · best time, record, correct
    "success-content": "#052e16",
    "warning": "#FF7A45", // or · warning, braking, no permission
    "warning-content": "#2b1206",
    "error": "#FF4D5E", // er · error and recording
    "error-content": "#2b0208",
    "info": "#B794FF", // the system doesn't define info; lends the violet
    "info-content": "#0A1020",

    "neutral": "#0E1526",
    "neutral-content": "#A3B0D0",

    // Interactive control border. `ln` at 1.5:1 is too faint for
    // interactive control; the system resolves this via shape + label and with
    // the focus in cyan (11.5:1). Here we use `t3`, the system's own color,
    // which IS visible (6.2:1) without competing with the accent.
    "--rally-control-border": "#8190B5",
  },

  // Day
  "rally-light": {
    "color-scheme": "light",

    "base-100": "#EEF1F7",
    "base-200": "#FFFFFF",
    "base-300": "#DDE3EF",
    "base-content": "#0A1020", // 16.8:1

    "--rally-text-2": "#3E4A66",
    "--rally-text-3": "#55617E",
    "--rally-line": "#C4CDE0",

    "primary": "#005FA3", // 5.9:1 over the day background
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