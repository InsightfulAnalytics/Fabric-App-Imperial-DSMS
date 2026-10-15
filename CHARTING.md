# CHARTING.md — which tool/skill for which chart

The initial reference for *building a chart* in this project. Read this first when a request is
"make a chart / visual / graph." It routes by **where the chart lives** and **what it needs**, then
points at the right skill, library, or technique. Companion to [TOOLING.md](./TOOLING.md) (model/DAX tooling)
and [LEARNINGS.md](./LEARNINGS.md).

---

## Step 1 — Where does the chart live? (the biggest fork)

| Surface | Primary tools | Notes |
|---|---|---|
| **Power BI report** (PBIR / `.pbip` report under `./PBI/`) | data-goblin `reports:deneb-visuals` (Vega/Vega-Lite **in Deneb**), `reports:svg-visuals` (DAX SVG), `reports:python-visuals`, `reports:r-visuals`, native visuals via `reports:pbir-cli`; theme via `reports:modifying-theme-json` | Deneb is the Vega/Vega-Lite **host** inside reports. `deneb-templates/` specs are reusable here. |
| **Fabric App** (`imperial-dsms`, React) | See Step 2 | This is where most app work happens. |
| **Exploration / analysis** (just prove an insight, tool-agnostic) | Analytics library `visualization-design` skill (`B:\VS Code Files\Learning Resources\Analytics\`) + a quick `d3-templates/` or Vega mockup | Decides *which* chart proves the point before any wiring. |

---

## Step 2 — Inside the Fabric App, which render technique?

The app supports three techniques (see [TOOLING.md](./TOOLING.md) "Fabric App charts"). Route by need:

| Need | Technique | How |
|---|---|---|
| Standard chart: bar, line, area, scatter, combo, KPI trend | **Vega-Lite** (DEFAULT) | `@microsoft/fabric-visuals`, three-file pattern (`.dax` + `.json` spec + `.ts` glue). Start from `deneb-templates/` or `mockups/`. |
| KPI / number tile, bespoke card layout | **React + CSS** | Hand-built component (e.g. `BalanceCard`, `KpiTile`). No `vegaLiteSpec`. |
| Tiny inline glyph (sparkline, mini bars in a card) | **Hand-rolled `<svg>`** | Raw SVG in JSX with manual scales (e.g. `MiniBars`). |
| Bespoke visual Vega-Lite/Vega genuinely can't express | **D3** | `d3-viz` skill + `d3-templates/`. Prefer the **D3-math-only hybrid** (D3 computes scales/shapes/layouts, React renders the SVG). **Only after Tim confirms** (see rule below). |

---

## Step 3 — Chart type → technique quick lookup

| Chart type | In a Power BI report | In the Fabric App |
|---|---|---|
| Bar / column / grouped / stacked / diverging | Deneb (Vega-Lite) or native | Vega-Lite (`fabric-visuals`) |
| Line / multi-line / area / stacked area | Deneb or native | Vega-Lite |
| Scatter / bubble / histogram / box plot | Deneb | Vega-Lite |
| Pie / donut / treemap | Deneb or native | Vega-Lite (treemap may need D3) |
| KPI card / number tile | native card / SVG measure | React + CSS |
| Sparkline / inline bar | `reports:svg-visuals` (DAX SVG) | hand-rolled SVG |
| Waterfall / lollipop / slope | Deneb | Vega-Lite (or D3 if fiddly) |
| Gauge / radial bar / radar | Deneb or SVG measure | D3 (`d3-templates/radial/`) |
| Sunburst / icicle / dendrogram | Deneb (limited) | **D3** (`d3-templates/part-to-whole/`, `hierarchy-network/`) |
| Force-directed network | not practical | **D3** (`d3-templates/hierarchy-network/force-network.html`) |
| Chord / Sankey | not practical | **D3** (`d3-templates/hierarchy-network/`) |
| Choropleth / bubble map / geo | Deneb (limited) | **D3** (`d3-templates/maps/`) |
| Heatmap / calendar heatmap | Deneb | Vega-Lite or D3 (`d3-templates/matrix/`) |

Rule of thumb: the further down this table, the more likely **D3** is the right (or only) tool.

---

## Resources index

- **`d3-viz`** skill — `.claude/skills/d3-viz/` — D3 patterns + `references/` (patterns, scales, colour) + `assets/` templates. For bespoke visuals.
- **`d3-templates/`** — 33 standalone D3 v7 reference charts (this repo), DSMS-themed. Open `d3-templates/index.html`. Copy a file as a starting point.
- **data-goblin `reports:*`** — Deneb / SVG / Python / R visuals + theming for Power BI **reports**.
- **Analytics library `visualization-design`** — tool-agnostic "which chart proves this insight."
- **`@microsoft/fabric-visuals`** — the Fabric App's Vega-Lite host (a dependency, not a skill).
- **`deneb-templates/`** — 60 reference Vega-Lite specs (reusable in reports *and* the app's `.json`).

---

## The D3 rule (non-negotiable)

Default to **Vega-Lite** (app) / **Deneb** (reports) / **hand-rolled SVG** (glyphs & bespoke cards). The team
hand-rolls bespoke SVG (e.g. `ComboChart`) rather than defaulting to D3. **Reach for D3 only when
Vega/Vega-Lite genuinely can't do it — and only after Tim confirms it himself.** Recommend it, explain why,
then wait for his go-ahead. See [[fabric-app-viz-stack]] memory and [TOOLING.md](./TOOLING.md).
