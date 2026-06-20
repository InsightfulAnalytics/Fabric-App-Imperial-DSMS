"""(a) Scale Operations Command visuals 1.5x to fill its (already 1920x1080) canvas.
(b) Scale textbox fonts 1.5x on every page that was enlarged from 1280x720 -> 1920x1080."""
import json, glob, os

RB = "PBI/Death Star Management Services.Report/definition/pages"
def rd(p): return json.load(open(p, encoding="utf-8"))
def wr(p, j): open(p, "w", encoding="utf-8").write(json.dumps(j, indent=2, ensure_ascii=False) + "\n")

# (a) Ops Command: scale visual GEOMETRY 1.5x (page is already 1920x1080)
n = 0
for vp in glob.glob(f"{RB}/opscommandwar00a0001/visuals/*/visual.json"):
    vj = rd(vp); pos = vj.get("position")
    if pos:
        for k in ("x", "y", "width", "height"):
            pos[k] = round(pos.get(k, 0) * 1.5, 2)
        wr(vp, vj); n += 1
print(f"  Ops Command: scaled {n} visuals geometry 1.5x")

# (b) Textbox FONTS 1.5x on the pages designed at 1280x720 (now 1920x1080)
FONT_PAGES = ["opscommandwar00a0001", "insightwatch0a0001", "hcbudgetreview0a0001",
              "e1c2d3f4a5b6c7d8e9f0", "budgetreview000a0001"]
def scale_fonts(obj, changed):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == "fontSize" and isinstance(v, str) and v.endswith("pt"):
                obj[k] = f"{round(float(v[:-2]) * 1.5)}pt"; changed.append(1)
            else:
                scale_fonts(v, changed)
    elif isinstance(obj, list):
        for it in obj:
            scale_fonts(it, changed)
tot = 0
for pg in FONT_PAGES:
    for vp in glob.glob(f"{RB}/{pg}/visuals/*/visual.json"):
        vj = rd(vp)
        if vj.get("visual", {}).get("visualType") == "textbox":
            changed = []; scale_fonts(vj, changed)
            if changed:
                wr(vp, vj); tot += len(changed)
print(f"  Textbox fonts scaled 1.5x: {tot} fontSize values across {len(FONT_PAGES)} pages")
print("done")
