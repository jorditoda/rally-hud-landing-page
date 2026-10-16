"""
Genera la imagen social de Open Graph (1200x630) -> public/og.png

Por qué un script y no editar el PNG a mano: la imagen tiene que llevar la
paleta del sistema de diseño, y esa paleta vive en src/utils/theme.ts. Si se
genera aparte, se queda obsoleta en cuanto cambie un token.

Los tokens se EXTRAEN del CSS compilado, con el mismo round-trip OKLCH que se
uso al validar el tema, de modo que lo que sale en la imagen es literalmente lo
que se despliega.

Uso:  python3 scripts/build-og-image.py
"""

import html
import json
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
THEME_TS = ROOT / "src" / "utils" / "theme.ts"
OUT = ROOT / "public" / "og.png"

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    shutil.which("chromium") or "",
]


def find_chrome() -> str:
    for c in CHROME_CANDIDATES:
        if c and pathlib.Path(c).exists():
            return c
    raise SystemExit("No se encuentra Chrome para renderizar la imagen OG.")


def parse_theme() -> dict[str, str]:
    """Tokens del tema oscuro tal cual estan escritos en theme.ts."""
    src = THEME_TS.read_text(encoding="utf-8")
    block = re.search(r'"rally-dark":\s*\{(.*?)\n  \}', src, re.S).group(1)
    return dict(re.findall(r'"(--?[\w-]+)":\s*"(#[0-9a-fA-F]{3,8})"', block))


def main() -> int:
    t = parse_theme()
    bg = t.get("base-100", "#070B16")
    surface = t.get("base-200", "#0E1526")
    line = t.get("--rally-line", "#243050")
    fg = t.get("base-content", "#EAF0FF")
    fg2 = t.get("--rally-text-2", "#A3B0D0")
    fg3 = t.get("--rally-text-3", "#8190B5")
    cy = t.get("primary", "#3DD6FF")

    cfg = (ROOT / "src" / "utils" / "config.ts").read_text(encoding="utf-8")
    headline = re.search(r'headline: "([^"]+)"', cfg).group(1)
    subtitle = re.search(
        r'headline: "[^"]+",\s*subtitle:\s*"([^"]+)"', cfg
    ).group(1)

    logo_svg = (ROOT / "public" / "logo.svg").read_text(encoding="utf-8")
    # el viewBox del logo es "144 316 736 394"
    inner = re.sub(r"^.*?<svg[^>]*>", "", logo_svg, flags=re.S)
    inner = re.sub(r"</svg>\s*$", "", inner, flags=re.S)

    marks = f"""
      .grid {{
        position:absolute; inset:0;
        background-image:
          linear-gradient(color-mix(in srgb, {line} 70%, transparent) 1px, transparent 1px),
          linear-gradient(to right, color-mix(in srgb, {line} 70%, transparent) 1px, transparent 1px);
        background-size:48px 48px;
        -webkit-mask-image:linear-gradient(to bottom, #000 0%, transparent 72%);
      }}
      .glow {{
        position:absolute; inset:0;
        background:radial-gradient(55% 50% at 22% 0%,
          color-mix(in srgb, {cy} 12%, transparent), transparent 70%);
      }}
      .phone {{
        position:absolute; right:70px; top:118px; width:284px; height:394px;
        border-radius:34px; background:{surface};
        border:2px solid {line};
        box-shadow:0 24px 60px rgba(0,0,0,.55);
        display:flex; flex-direction:column; align-items:center;
        justify-content:center; gap:18px; overflow:hidden;
      }}
      .big {{
        font-family:'Barlow Condensed',sans-serif; font-weight:700;
        font-size:104px; line-height:.86; color:{fg};
        font-variant-numeric:tabular-nums;
      }}
      .row {{
        display:flex; gap:12px; font-family:'Barlow Condensed',sans-serif;
        font-weight:600; font-size:26px; color:{fg2};
        font-variant-numeric:tabular-nums;
      }}
      .cell {{
        background:{bg}; border:1px solid {line}; border-radius:10px;
        padding:6px 14px;
      }}
      .label {{
        font-size:20px; letter-spacing:.14em; text-transform:uppercase;
        color:{fg3}; font-weight:600;
      }}
      h1 {{
        font-family:'Barlow Condensed',sans-serif; font-weight:700;
        font-size:78px; line-height:1; color:{fg}; margin:0;
        position:relative; max-width:660px;
      }}
      p.sub {{
        font-size:26px; line-height:1.4; color:{fg2}; margin:26px 0 0;
        position:relative; max-width:600px;
      }}
      .brand {{
        position:absolute; left:80px; top:64px; display:flex; align-items:center;
        gap:16px;
      }}
      .brand span {{
        font-family:'Barlow Condensed',sans-serif; font-weight:700;
        font-size:44px; color:{fg}; line-height:1;
      }}
      /* Regla fina con el degradado del velocimetro: motivo de marca sin
         tapar texto, a diferencia del bloque solido que se probo primero. */
      .rule {{
        position:absolute; left:80px; top:150px; width:420px; height:5px;
        border-radius:3px;
        background:linear-gradient(90deg,#4ADE80 0%,#FFC247 33%,#FF7A45 66%,#FF4D5E 100%);
      }}
      .stores {{
        position:absolute; left:80px; bottom:56px; display:flex; gap:14px;
      }}
      .store {{
        display:flex; align-items:center; gap:10px; padding:12px 20px;
        border:1px solid {line}; border-radius:12px; background:{surface};
        color:{fg2}; font-size:20px; font-weight:600;
      }}
      .dot {{ width:10px; height:10px; border-radius:50%; background:{cy}; }}
    """

    doc = f"""<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet">
<style>
  html,body{{margin:0;padding:0;width:1200px;height:630px;overflow:hidden}}
  body{{background:{bg};color:{fg};font-family:'Barlow',sans-serif;position:relative}}
  *{{box-sizing:border-box}}
{marks}
</style></head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="rule"></div>

  <div class="brand">
    <svg viewBox="144 316 736 394" height="40" width="75" aria-hidden="true">{inner}</svg>
    <span>{html.escape("Rally Hud")}</span>
  </div>

  <div style="position:absolute; left:80px; top:212px;">
    <h1>{html.escape(headline)}</h1>
    <p class="sub">{html.escape(subtitle)}</p>
  </div>

  <div class="phone">
    <div class="label">Velocidad</div>
    <div class="big">118</div>
    <div class="row">
      <span class="cell">Trip 12:48.3</span>
      <span class="cell">0,5 G</span>
    </div>
  </div>

  <div class="stores">
    <span class="store"><span class="dot"></span>App Store</span>
    <span class="store"><span class="dot"></span>Google Play</span>
  </div>
</body></html>
"""

    with tempfile.TemporaryDirectory() as td:
        html_path = pathlib.Path(td) / "og.html"
        html_path.write_text(doc, encoding="utf-8")
        subprocess.run(
            [
                find_chrome(),
                "--headless",
                "--disable-gpu",
                "--hide-scrollbars",
                "--force-device-scale-factor=1",
                "--window-size=1200,630",
                f"--screenshot={OUT}",
                "--virtual-time-budget=10000",
                f"file://{html_path}",
            ],
            check=True,
            capture_output=True,
        )

    kb = OUT.stat().st_size / 1024
    print(f"escrito {OUT.relative_to(ROOT)} ({OUT.stat().st_size} bytes, {kb:.0f} KB)")
    if kb > 300:
        print("AVISO: por encima de 300 KB; algunas plataformas lo recortan.")
    return 0


if __name__ == "__main__":
    sys.exit(main())