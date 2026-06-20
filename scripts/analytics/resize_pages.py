"""Resize every report page to 1920x1080 and scale its visuals proportionally.
All current pages are 16:9, so scaling is uniform (no distortion)."""
import json, glob, os

BASE = "PBI/Death Star Management Services.Report/definition/pages"
TARGET_W, TARGET_H = 1920, 1080

def rd(p): return json.load(open(p, encoding="utf-8"))
def wr(p, j): open(p, "w", encoding="utf-8").write(json.dumps(j, indent=2, ensure_ascii=False) + "\n")

order = rd(f"{BASE}/pages.json")["pageOrder"]
for page in order:
    pj_path = f"{BASE}/{page}/page.json"
    if not os.path.exists(pj_path):
        print(f"  ! {page}: no page.json"); continue
    pj = rd(pj_path)
    ow, oh = pj.get("width", 1280), pj.get("height", 720)
    sx, sy = TARGET_W / ow, TARGET_H / oh
    pj["width"], pj["height"] = TARGET_W, TARGET_H
    wr(pj_path, pj)
    nviz = 0
    if abs(sx - 1) > 1e-9 or abs(sy - 1) > 1e-9:
        for vp in glob.glob(f"{BASE}/{page}/visuals/*/visual.json"):
            vj = rd(vp); pos = vj.get("position")
            if not pos: continue
            pos["x"] = round(pos.get("x", 0) * sx, 2)
            pos["y"] = round(pos.get("y", 0) * sy, 2)
            pos["width"] = round(pos.get("width", 0) * sx, 2)
            pos["height"] = round(pos.get("height", 0) * sy, 2)
            wr(vp, vj); nviz += 1
    print(f"  {page:24s} {ow}x{oh} -> {TARGET_W}x{TARGET_H}  (scale {sx:.3g}x{sy:.3g}, {nviz} visuals)")
print("done")
