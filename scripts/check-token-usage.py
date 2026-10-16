"""
Comprueba que nadie use hsl(var(--...)) con los tokens de daisyUI v4.

Motivo: daisyUI v4 emite los tokens en **OKLCH**, no en canales HSL
(`--b2: 19.8% .036 266.2`). Escribir `hsl(var(--b2))` es una declaración
invalida: el navegador la descarta en silencio y la propiedad se queda sin
aplicar. Sin error, sin aviso, solo un color que no sale.

Ya pasó por esto tres veces en este repo (`.surface-card`, `.section-alt`
y los bordes de `proof`), asi que queda automatizado.

Uso:  python3 scripts/check-token-usage.py
Salida: 1 si hay usos de hsl() con tokens de daisyUI.
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
TARGETS = list((ROOT / "src").rglob("*.scss")) + list(
    (ROOT / "src").rglob("*.tsx")
) + list((ROOT / "src").rglob("*.astro")) + list((ROOT / "src").rglob("*.css"))

# Tokens que emite daisyUI v4. Todos en OKLCH.
DAISY_TOKENS = (
    "b1", "b2", "b3", "bc", "p", "pc", "s", "sc", "a", "ac",
    "n", "nc", "in", "inc", "su", "suc", "wa", "wac", "er", "erc",
)

BAD = re.compile(r"hsl\(\s*var\(\s*--(" + "|".join(DAISY_TOKENS) + r")\s*\)")


def main() -> int:
    found = []
    for f in TARGETS:
        if not f.exists():
            continue
        for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            # las lineas de comentario/documentacion no cuentan
            stripped = line.strip()
            if stripped.startswith(("//", "*", "/*")):
                continue
            if BAD.search(line):
                found.append((f.relative_to(ROOT), n, stripped))

    if not found:
        print("OK: ningun uso de hsl() con tokens de daisyUI.")
        print("     daisyUI v4 los emite en OKLCH; usa oklch(var(--...)).")
        return 0

    print(f"FALLO: {len(found)} uso(s) de hsl() con un token de daisyUI v4.\n")
    print("  daisyUI v4 emite los tokens en OKLCH, no en canales HSL.")
    print("  hsl(var(--b2)) es una declaracion invalida y el navegador la")
    print("  descarta en silencio: la propiedad se queda sin aplicar.\n")
    for f, n, line in found:
        print(f"  {f}:{n}")
        print(f"    {line[:90]}")
    print("\n  Cambia hsl(var(--x)) por oklch(var(--x)),")
    print("  o usa la utilidad de Tailwind (bg-base-200, text-primary...).")
    return 1


if __name__ == "__main__":
    sys.exit(main())