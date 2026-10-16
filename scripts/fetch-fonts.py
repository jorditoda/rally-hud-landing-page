"""
Descarga y autoaloja Barlow / Barlow Condensed (woff2) para la web.

Uso:  python3 scripts/fetch-fonts.py

Por qué autoalojar y no usar el CDN de Google Fonts:
  · El sistema de diseño (Sistema-Componentes.dc.html) lo pide expresamente para
    la app: "Empaquétalas como assets en lugar de descargarlas con google_fonts.
    En un tramo de rally puede no haber cobertura, y la primera descarga fallaría
    justo ahí." En la web el mismo razonamiento aplica, y además se ahorra una
    conexión a un tercero y se elimina el salto de fuente.
  · Solo se descargan los subsets que el sitio usa (latin y latin-ext), no los
    100+ del paquete completo.

Salida: public/fonts/*.woff2 + public/fonts/fonts.css
"""

import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "fonts"

GOOGLE_CSS = (
    "https://fonts.googleapis.com/css2"
    "?family=Barlow:wght@400;500;600;700"
    "&family=Barlow+Condensed:wght@600;700"
    "&display=swap"
)
# Fuente moderna para que Google devuelva woff2 en vez de ttf.
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
# Solo `latin`: cubre inglés, los acentos del español (U+0000-00FF) y la
# tipografía (U+2000-206F: raya, comillas curvas). `latin-ext` añade 65 KB que
# este sitio no carga nunca.
KEEP_SUBSETS = ("latin",)


def get(url: str) -> bytes:
    """Descarga con curl: el urllib de este entorno no valida el certificado
    (falta el issuer del store del sistema). curl usa el llavero de macOS."""
    r = subprocess.run(
        ["curl", "-sSfL", "--max-time", "60", "-A", UA, url],
        capture_output=True,
        check=True,
    )
    return r.stdout


def slug(family: str, weight: str, subset: str) -> str:
    fam = family.lower().replace(" ", "-")
    return f"{fam}-{weight}-{subset}.woff2"


def main() -> int:
    css = get(GOOGLE_CSS).decode("utf-8")

    OUT.mkdir(parents=True, exist_ok=True)

    faces = []
    downloaded = 0
    cached = 0

    # Cada bloque empieza con un comentario /* subset */ seguido de un @font-face.
    parts = re.split(r"/\*\s*([a-z\-]+)\s*\*/", css)
    for i in range(1, len(parts), 2):
        subset, body = parts[i], parts[i + 1]
        if subset not in KEEP_SUBSETS:
            continue

        fam = re.search(r"font-family:\s*'([^']+)'", body).group(1)
        weight = re.search(r"font-weight:\s*(\d+)", body).group(1)
        url = re.search(r"url\((https://[^)]+\.woff2)\)", body).group(1)
        urange = re.search(r"unicode-range:\s*([^;]+);", body).group(1).strip()

        name = slug(fam, weight, subset)
        dest = OUT / name

        if dest.exists():
            cached += 1
            state = "cache"
        else:
            dest.write_bytes(get(url))
            downloaded += 1
            state = "nuevo"

        faces.append(
            "@font-face {\n"
            f"  font-family: '{fam}';\n"
            "  font-style: normal;\n"
            f"  font-weight: {weight};\n"
            "  font-display: swap;\n"
            f"  src: url('/fonts/{name}') format('woff2');\n"
            f"  unicode-range: {urange};\n"
            "}"
        )
        print(f"  {state:6s} {name}")

    (OUT / "fonts.css").write_text(
        "/* Generado por scripts/fetch-fonts.py. No editar a mano. */\n"
        + "\n".join(faces)
        + "\n",
        encoding="utf-8",
    )
    # Copia al bundle de estilos: así los @font-face van dentro del CSS que Astro
    # emite (una sola peticion, con hash) en vez de un .css aparte en /fonts/.
    bundled = ROOT / "src" / "styles" / "fonts.css"
    bundled.write_text((OUT / "fonts.css").read_text(encoding="utf-8"), encoding="utf-8")

    total = sum(f.stat().st_size for f in OUT.glob("*.woff2"))
    print(f"\n@font-face escritos: {len(faces)}")
    print(f"descargados ahora: {downloaded} | ya en cache: {cached}")
    print(f"peso total woff2: {total/1024:.1f} KB")
    print("antes: public/fonts/ eran 416 KB de TTF (3 ficheros, sin subsets)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())