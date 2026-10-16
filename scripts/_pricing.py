import pathlib, re

# ── tipo ────────────────────────────────────────────────────────────────
p = pathlib.Path('src/utils/configType.ts'); s = p.read_text(encoding='utf-8')
m = re.search(r"        pricing\?: \{.*?\n        \} \| undefined;", s, re.S)
assert m, "no encuentro pricing en configType.ts"
s = s[: m.start()] + '''        /**
         * Bloque de precio. La app es gratuita (precio 0 confirmado en ambas
         * stores), asi que esto no es una comparativa de planes sino el
         * argumento de venta de lo que incluye. ROADMAP.md E2.6.
         */
        pricing?: {
            id?: string | undefined;
            title: string;
            actionText?: string | undefined;
            subtitle?: string | undefined;
            promises?: {
                icon: import("../components/icons").IconName;
                title: string;
                subtitle: string;
            }[] | undefined;
        } | undefined;''' + s[m.end():]
p.write_text(s, encoding='utf-8')
print("configType.ts: pricing.plans -> pricing.promises")

# ── config ──────────────────────────────────────────────────────────────
p = pathlib.Path('src/utils/config.ts'); s = p.read_text(encoding='utf-8')
m = re.search(r"    pricing: \{.*?\n    \},\n(?=    showcase: \{)", s, re.S)
assert m, "no encuentro pricing en config.ts"
s = s[: m.start()] + '''    pricing: {
      id: "pricing",
      title: "Free forever",
      subtitle:
        "No subscription, no ads and no account. Your vehicle and your times stay on your device.",
      promises: [
        {
          icon: "timer",
          title: "Every segment, unlimited",
          subtitle:
            "Trace as many segments as you want and run each of them as many times as you like.",
        },
        {
          icon: "noSignal",
          title: "Works offline",
          subtitle:
            "The HUD reads your phone's GPS, so a stretch with no coverage does not stop the timing.",
        },
        {
          icon: "phone",
          title: "No account, no ads",
          subtitle:
            "Nothing to sign up for and nothing to watch over your shoulder. Download it and drive.",
        },
      ],
      actionText: "Download the app",
    },
''' + s[m.end():]
p.write_text(s, encoding='utf-8')
print("config.ts: pricing -> Free forever")

# ── nav/footer labels ───────────────────────────────────────────────────
for f in ['src/utils/config.ts']:
    p = pathlib.Path(f); s = p.read_text(encoding='utf-8')
    s = s.replace('{ href: "/#pricing", title: "Pricing" }', '{ href: "/#pricing", title: "Free" }')
    p.write_text(s, encoding='utf-8')
print("nav y footer: 'Pricing' -> 'Free'")