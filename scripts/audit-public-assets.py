import os, subprocess

PAT = r'[A-Za-z0-9_./ -]+\.(?:webp|png|svg|jpg|jpeg|ttf|woff2)'

def cited(extra_filter=None):
    if extra_filter:
        cmd = (
            "grep -rhn '' src/ | grep -vE '^[0-9]+:\\s*(//|\\*)' | "
            f"grep -oE '/{PAT}'"
        )
    else:
        cmd = f"grep -rhoE '/{PAT}' src/"
    out = subprocess.run(['bash', '-c', cmd], capture_output=True, text=True).stdout
    return set(out.split())

all_cited = cited()
active = cited(extra_filter=True)
active.add('/favicon.svg')
active.add('/favicon.png')
active.add('/apple-touch-icon.png')

# El header renderiza /avatars/${index + 1}.webp para index 0..4 -> 1..5.
AVATAR_COUNT = 5
for i in range(1, AVATAR_COUNT + 1):
    active.add(f'/avatars/{i}.webp')

dead, commented_only, kept = [], [], []
for root, _, files in os.walk('public'):
    for f in files:
        p = '/' + os.path.relpath(os.path.join(root, f), 'public')
        if p in active:
            kept.append(p)
        elif p in all_cited:
            commented_only.append(p)
        else:
            dead.append(p)

print(f"ACTIVOS ({len(kept)}):")
for p in sorted(kept):
    print("   ", p)
print(f"\nSOLO-COMENTADOS -> conservar ({len(commented_only)}):")
for p in sorted(commented_only):
    print("   ", p)
print(f"\nBORRABLES: referencia 0 ({len(dead)}):")
for p in sorted(dead):
    print("   ", p)