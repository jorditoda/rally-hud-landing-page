"""
Renderiza los tableros de diseño a PNG para usarlos en la web.

Uso:  python3 scripts/render-boards.py [--only HUD-Conduccion,App-Tiempo] [--scale 2]

Lee las medidas reales de cada tablero en `docs/design/boards/canvas.json`
(HUD 844x390 apaisado, App 390x844 vertical) y renderiza con Chrome headless
exactamente a ese tamaño, para que las capturas no salgan recortadas.

Salida: public/screens/board/<nombre>.png
"""

import argparse
import json
import pathlib
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
BOARDS = ROOT / "docs" / "design" / "boards"
OUT = ROOT / "public" / "screens" / "board"

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    shutil.which("chromium") or "",
    shutil.which("google-chrome") or "",
]


def find_chrome() -> str:
    for c in CHROME_CANDIDATES:
        if c and pathlib.Path(c).exists():
            return c
    raise SystemExit("No se encuentra Chrome/Chromium para renderizar.")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma list of board file names, sin .dc.html")
    ap.add_argument("--scale", type=int, default=2, help="device scale factor")
    ap.add_argument("--prefix", default="", help="filtro por prefijo, p.ej. HUD")
    args = ap.parse_args()

    canvas = json.loads((BOARDS / "canvas.json").read_text(encoding="utf-8"))
    boards = canvas["boards"]

    wanted = []
    if args.only:
        names = {n.strip() for n in args.only.split(",")}
        wanted = [n for n in boards if n.removesuffix(".dc.html") in names]
    elif args.prefix:
        wanted = [n for n in boards if n.startswith(args.prefix)]
    else:
        wanted = list(boards)

    if not wanted:
        raise SystemExit("Ningun tablero coincide con el filtro.")

    chrome = find_chrome()
    OUT.mkdir(parents=True, exist_ok=True)
    ok, fail = 0, []

    with tempfile.TemporaryDirectory() as tmp:
        for name in wanted:
            meta = boards[name]
            w, h = meta["w"], meta["h"]
            src = BOARDS / name
            if not src.exists():
                fail.append(f"{name}: no existe")
                continue

            # --window-size va en pixeles fisicos: con --force-device-scale-factor
            # el viewport CSS sigue siendo w x h y la imagen sale a 2x.
            dest = pathlib.Path(tmp) / (src.name.removesuffix(".dc.html") + ".png")
            cmd = [
                chrome,
                "--headless",
                "--disable-gpu",
                "--hide-scrollbars",
                "--no-sandbox",
                f"--force-device-scale-factor={args.scale}",
                f"--window-size={w},{h}",
                f"--screenshot={dest}",
                "--virtual-time-budget=8000",
                f"file://{src}",
            ]
            r = subprocess.run(cmd, capture_output=True, text=True)
            if not dest.exists():
                fail.append(f"{name}: Chrome no genero imagen (rc={r.returncode})")
                continue

            out = OUT / dest.name
            shutil.copy2(dest, out)
            kb = out.stat().st_size / 1024
            stem = src.name.removesuffix('.dc.html')
            print(f"  {stem:26s} {w}x{h} @{args.scale}x  -> {out.name} ({kb:.0f} KB)")
            ok += 1

    print(f"\nrenderizados: {ok}/{len(wanted)}")
    for f in fail:
        print(f"  ERROR {f}")
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())