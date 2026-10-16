"""
Genera public/logo.svg trazando el velocímetro del logo real.

Por qué no a mano: el arco rojo tiene grosor variable (unos 85 px de los 1024
originales en el extremo derecho, hasta ~2 px en el izquierdo). Con una curva
cuadrática a ojo el resultado era un blob; hay que muestrear el borde.

Geometría medida sobre public/logo.png con PIL (ver ROADMAP.md E0.1):
  centro del arco      (512, 683)
  radio arco negro     367 exterior  ·  grosor 12
  radio exterior rojo  335
  cubo                 (458.5, 679) r 31
  aguja                 46° sobre la horizontal, longitud 178

Uso:  python3 scripts/build-logo.py
"""

import math
import pathlib

PUBLIC = pathlib.Path(__file__).resolve().parent.parent / "public"
OUT = PUBLIC / "logo.svg"
# Variante para fondos oscuros: el arco del logo es casi negro (#1a1a1a) y sobre
# el navy del tema oscuro solo daba 1,13:1, o sea invisible. En lugar de cambiar
# el color de marca se generan dos versiones y se elige segun el fondo.
OUT_DARK = PUBLIC / "logo-on-dark.svg"

CX, CY = 512.0, 683.0
R_BLACK_OUT = 367.0
STROKE_BLACK = 12.0
R_RED_OUT = 335.0
# Grosor del arco rojo: máximo a la derecha, casi nulo a la izquierda.
RED_MAX_THICK = 85.0
THETA_START, THETA_END = 5.0, 170.0
# Huecos entre segmentos, medidos sobre el PNG original muestreando la banda
# entre r=300 y r=334. Dividen el arco en seis tramos, como un velocímetro
# segmentado clásico.
SEGMENT_GAPS = [
    (36.0, 37.9),
    (70.6, 72.1),
    (102.0, 103.5),
    (129.7, 131.4),
    (154.3, 156.7),
]
HUB = (458.5, 679.0)
HUB_R = 31.0
NEEDLE_DEG = 46.0
NEEDLE_LEN = 178.0
# Caja de contenido medida del PNG original, para que SVG y PNG ocupen lo mismo.
VIEWBOX = "144 316 736 394"
# Arco del logo: casi negro de marca para fondos claros, y un gris azulado que
# si se ve sobre navy (3,4:1) sin perder la identidad en fondo claro (5,9:1).
ARC_LIGHT = "#1a1a1a"
ARC_DARK = "#5a6484"


def pt(radius: float, deg: float) -> tuple[float, float]:
    """Punto en coordenadas del PNG: y crece hacia abajo."""
    a = math.radians(deg)
    return (CX + radius * math.cos(a), CY - radius * math.sin(a))


def band_segment(a0: float, a1: float, steps: int = 10) -> str:
    """Un tramo de la banda cónica entre dos angulos."""
    # El borde exterior se recorre de derecha a izquierda pasando por arriba.
    # El interior tiene que volver al reves: si no, el poligono se cruza y
    # sale un blob lleno en vez de una banda.
    outer = [pt(R_RED_OUT, a0 + (a1 - a0) * i / steps) for i in range(steps + 1)]
    inner = []
    for i in range(steps, -1, -1):
        t = i / steps
        deg = a0 + (a1 - a0) * t
        # El grosor depende del angulo absoluto, no del tramo.
        gt = (deg - THETA_START) / (THETA_END - THETA_START)
        thickness = RED_MAX_THICK + (2.0 - RED_MAX_THICK) * gt
        inner.append(pt(R_RED_OUT - thickness, deg))
    pts = outer + inner
    d = f"M{pts[0][0]:.1f} {pts[0][1]:.1f} "
    d += " ".join(f"L{x:.1f} {y:.1f}" for x, y in pts[1:])
    return d + " Z"


def red_band_paths() -> list[str]:
    """Los seis tramos, separados por los huecos medidos en el original."""
    bounds = [THETA_START]
    for g0, g1 in SEGMENT_GAPS:
        bounds += [g0, g1]
    bounds.append(THETA_END)
    return [band_segment(bounds[i], bounds[i + 1])
            for i in range(0, len(bounds), 2)]


def needle_path() -> str:
    a = math.radians(NEEDLE_DEG)
    ux, uy = math.cos(a), -math.sin(a)
    px, py = -uy, ux
    tip = (HUB[0] + ux * NEEDLE_LEN, HUB[1] + uy * NEEDLE_LEN)
    # Base ensanchada en la raiz, punta afilada.
    base_l = (HUB[0] - px * 26, HUB[1] - py * 26)
    base_r = (HUB[0] + px * 26, HUB[1] + py * 26)
    return (
        f"M{base_l[0]:.1f} {base_l[1]:.1f} "
        f"L{tip[0]:.1f} {tip[1]:.1f} "
        f"L{base_r[0]:.1f} {base_r[1]:.1f} Z"
    )


def build(arc: str) -> str:
    r_black_center = R_BLACK_OUT - STROKE_BLACK / 2
    black = (
        f"M{CX - r_black_center:.1f} {CY:.1f} "
        f"A{r_black_center:.1f} {r_black_center:.1f} 0 0 1 "
        f"{CX + r_black_center:.1f} {CY:.1f}"
    )

    segs = "\n".join(
        f'    <path d="{d}"/>' for d in red_band_paths()
    )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEWBOX}" role="img" aria-label="Rally Hud">
  <!--
    Logotipo de Rally Hud en SVG, para no arrastrar el fondo blanco del PNG
    (en tema oscuro salia un cuadrado blanco en el navbar).
    Generado por scripts/build-logo.py a partir de la geometria medida de
    public/logo.png. No editar a mano: regenerar con el script.
  -->
  <title>Rally Hud</title>

  <path d="{black}" fill="none" stroke="{arc}" stroke-width="{STROKE_BLACK:g}"/>

  <g fill="#ff0000">
{segs}
  </g>

  <path d="{needle_path()}" fill="#ff0000"/>

  <circle cx="{HUB[0]:g}" cy="{HUB[1]:g}" r="{HUB_R:g}" fill="#ff0000"/>
</svg>
'''


def main() -> int:
    OUT.write_text(build(ARC_LIGHT), encoding="utf-8")
    OUT_DARK.write_text(build(ARC_DARK), encoding="utf-8")
    for p in (OUT, OUT_DARK):
        print(f"escrito {p.name} ({p.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
