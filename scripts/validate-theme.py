"""
Valida el sistema de diseño de Rally Hud contra WCAG.

Uso:  python3 scripts/validate-theme.py

Extrae los temas de src/utils/theme.ts, comprueba los pares de color que
daisyUI va a generar realmente y devuelve código de salida 1 si algo falla.

Los pares se eligen según los usos REALES del código (verificados con grep):
  - neutral-content solo se usa sobre bg-neutral (footer, partners)
  - base-300 no se usa en src/  -> no se exige contraste de texto
  - el único control interactivo es `toggle toggle-sm` (themeSwitcher)
"""

import re
import sys
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
THEME_TS = ROOT / "src" / "utils" / "theme.ts"

# (etiqueta, token_fg, token_bg, minimo, norma)
TEXT_PAIR = 4.5  # WCAG AA texto normal
UI_PAIR = 3.0  # WCAG 1.4.11 componentes de UI


def _srgb(c: float) -> float:
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _srgb(r) + 0.7152 * _srgb(g) + 0.0722 * _srgb(b)


def contrast(a: str, b: str) -> float:
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def parse_themes(src: str) -> dict[str, dict[str, str]]:
    """Extrae los bloques de tema del TS sin ejecutarlo."""
    themes: dict[str, dict[str, str]] = {}
    # Cada tema empieza con  "nombre": {  y termina en  },
    for match in re.finditer(r'"([a-z-]+)":\s*\{(.*?)\n  \}', src, re.S):
        name, body = match.group(1), match.group(2)
        tokens = dict(re.findall(r'"([\w-]+)":\s*"(#[0-9a-fA-F]{3,8})"', body))
        themes[name] = tokens
    return themes


# Comprobaciones por rol. Cada una refleja un uso real en el código.
CHECKS = [
    # texto del cuerpo sobre las tres superficies
    ("cuerpo/base-100", "base-content", "base-100", TEXT_PAIR),
    ("cuerpo/base-200", "base-content", "base-200", TEXT_PAIR),
    ("cuerpo/base-300", "base-content", "base-300", TEXT_PAIR),
    # neutral-content SOLO aparece sobre bg-neutral
    ("neutral-content/ neutral", "neutral-content", "neutral", TEXT_PAIR),
    # colores de marca sobre el fondo (UI no textual: 3:1)
    ("primary/base-100", "primary", "base-100", UI_PAIR),
    ("secondary/base-100", "secondary", "base-100", UI_PAIR),
    ("accent/base-100", "accent", "base-100", UI_PAIR),
    ("info/base-100", "info", "base-100", UI_PAIR),
    ("success/base-100", "success", "base-100", UI_PAIR),
    ("warning/base-100", "warning", "base-100", UI_PAIR),
    ("error/base-100", "error", "base-100", UI_PAIR),
    # texto dentro de botones y superficies
    ("texto boton primary", "primary-content", "primary", TEXT_PAIR),
    ("texto boton secondary", "secondary-content", "secondary", TEXT_PAIR),
    ("texto boton accent", "accent-content", "accent", TEXT_PAIR),
    ("texto error", "error-content", "error", TEXT_PAIR),
    ("texto info", "info-content", "info", TEXT_PAIR),
    ("texto success", "success-content", "success", TEXT_PAIR),
    ("texto warning", "warning-content", "warning", TEXT_PAIR),
    ("texto neutral", "neutral-content", "neutral", TEXT_PAIR),
    # borde del control interactivo (el toggle del tema)
    ("borde control/base-100", "--rally-control-border", "base-100", UI_PAIR),
]


def main() -> int:
    if not THEME_TS.exists():
        print(f"No existe {THEME_TS}")
        return 2

    themes = parse_themes(THEME_TS.read_text(encoding="utf-8"))
    if not themes:
        print("No se pudo extraer ningun tema de theme.ts")
        return 2

    total_failures = 0
    for name, tokens in themes.items():
        print(f"\n===== {name} =====")
        for label, fg, bg, minimum in CHECKS:
            if fg not in tokens:
                print(f"  SKIP  {label}: token '{fg}' ausente")
                total_failures += 1
                continue
            if bg not in tokens:
                print(f"  SKIP  {label}: token '{bg}' ausente")
                total_failures += 1
                continue
            ratio = contrast(tokens[fg], tokens[bg])
            ok = ratio >= minimum
            if not ok:
                total_failures += 1
            flag = "OK  " if ok else "FAIL"
            norm = "AA" if minimum >= 4.5 else "UI"
            print(
                f"  {flag} {ratio:5.2f}  (min {minimum} {norm})  {label}"
            )
        print(f"  --> {'OK' if total_failures == 0 else 'con fallos'}")

    print(f"\nTOTAL FALLOS: {total_failures}")
    if total_failures:
        print("Ajusta los tokens en src/utils/theme.ts")
    return 1 if total_failures else 0


if __name__ == "__main__":
    sys.exit(main())