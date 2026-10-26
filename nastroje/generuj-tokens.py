"""Vygeneruje design-system/tokens.css z design-system/tokens.json.
Spuštění ze složky projektu: python3 nastroje/generuj-tokens.py"""
import json, re, pathlib

root = pathlib.Path(__file__).resolve().parent.parent / "design-system"
t = json.loads((root / "tokens.json").read_text(encoding="utf-8"))
themes = [x["id"] for x in t["color"]["themes"]]
first = themes[0]

def val(v, theme):
    if isinstance(v, dict):
        v = v.get(theme, v.get(first))
    m = re.fullmatch(r"\{([A-Za-z0-9_.-]+)\}", str(v))
    return f"var(--{m.group(1)})" if m else v

themed = list(t["color"]["tokens"]) + list(t.get("shadow", {}).get("tokens", []))
def block(theme):
    return "".join(f"  --{x['name']}: {val(x['value'], theme)};\n" for x in themed)

out = [f"/* {t['name']} — generated from tokens.json (nastroje/generuj-tokens.py) */\n"]
out.append(f':root, [data-theme="light"] {{\n  color-scheme: light;\n{block("light")}}}\n')
if "dark" in themes:
    out.append(f'@media (prefers-color-scheme: dark) {{\n  :root:not([data-theme="light"]) {{\n  color-scheme: dark;\n{block("dark")}  }}\n}}\n')
    out.append(f'[data-theme="dark"] {{\n  color-scheme: dark;\n{block("dark")}}}\n')

static = []
for fam in ("spacing", "radius"):
    static += [f"  --{x['name']}: {x['value']};\n" for x in t.get(fam, {}).get("tokens", [])]
static += [f"  --font-{k}: {v};\n" for k, v in t["type"]["families"].items()]
out.append(":root {\n" + "".join(static) + "}\n")

for g in t["type"].get("groups", []):
    fam = g.get("family", "sans")
    for s in g["styles"]:
        props = [f"font-family: var(--font-{s.get('family', fam)})"]
        for k, css in (("fontSize", "font-size"), ("lineHeight", "line-height"), ("fontWeight", "font-weight"), ("letterSpacing", "letter-spacing")):
            if k in s: props.append(f"{css}: {s[k]}")
        out.append(f".{s['name']} {{ " + "; ".join(props) + "; }\n")

(root / "tokens.css").write_text("".join(out), encoding="utf-8")
print("tokens.css hotovo:", len(themed), "barevných tokenů,", len(themes), "motivy")
