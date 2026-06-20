# Tooling — which tool for which semantic-model / DAX job

This project has several overlapping ways to act on a semantic model and author DAX. They sit at
different layers; this is the decision guide for picking the right one.

## Defaults (when the prompt is ambiguous)

Two routing defaults apply unless the prompt says otherwise:

1. **Target = the local PBIP (`./PBI/`), not the live Fabric model.** When both exist and the request
   doesn't specify, act on the local PBIP project. Only touch the live model (Death Star Management
   Services in Bi Nexus) when explicitly told — e.g. *"on the live Fabric model"*.
2. **Authoring mode = direct TMDL text edit** (`tmdl` skill), not an engine round-trip. Only load the
   model into an engine (Modeling MCP `ConnectFolder` / `te`) when validation is explicitly requested —
   e.g. *"validate it through the engine"*.

State which target/mode is being used before acting, so the choice can be redirected.

## The layers

- **Power BI Modeling MCP** (`powerbi-modeling-mcp` in `.mcp.json`) — an *execution engine*. Structured
  tool API (TOM over MCP) that acts on a model **loaded into an engine**: live Fabric (`ConnectFabric`),
  Power BI Desktop (`Connect`), or a PBIP folder (`ConnectFolder`). Because there's a real engine, it can
  **validate and run DAX** (`dax_query_operations`). First connect triggers interactive Entra sign-in.

- **Data-goblin plugins** — *methodology + multiple backends*. Skills carrying best-practice knowledge and
  workflows that can drive several execution paths. The `semantic-models:semantic-model` skill explicitly
  routes: **`te` CLI first → a model MCP or TOM (connect-pbid) → TMDL authoring (`tmdl` skill)**. So
  data-goblin treats the Modeling MCP as *one of its backends* — they're complementary, not rivals.

## Decision table

| Job | Use | Why |
|---|---|---|
| Change/query the **live Fabric model** (Death Star Management Services), test DAX against real data | **Modeling MCP** (`ConnectFabric`) | Already wired; real engine = DAX validation + query results |
| Edit the **PBIP under `./PBI/`** — structural changes, renames, format-stable authoring under source control | **`pbip` + `tmdl` skills** (direct text edit) | Offline, format-preserving, clean git diffs; no engine needed |
| **Validate DAX** authored offline in a PBIP | One pass via **Modeling MCP `ConnectFolder`** or **`te` CLI**, or open in Desktop | Offline TMDL text has no engine, so DAX isn't checked until loaded |
| **Best-practice / BPA, naming standardization, model audit, DAX *performance* tuning** | **data-goblin `semantic-models` / `tabular-editor` skills** | This is data-goblin's value-add; the MCP only does raw operations |
| **Bulk refactors** across many objects | Modeling MCP (transactions) or `tabular-editor:c-sharp-scripting` | Both handle scale; pick by whether model is live or file-based |

## The gotcha (PBIP)

There are two genuinely different ways to author DAX in a PBIP and **they don't mix cleanly**:

1. **Direct TMDL text** (`tmdl` skill): offline, format-preserving, clean diffs — but **no DAX validation**.
2. **Engine round-trip** (Modeling MCP `ConnectFolder` / `te`): validates DAX — but **TOM serialization can
   reorder/reformat TMDL**, producing noisy diffs.

Don't ping-pong the *same* PBIP between the two casually. Pick one primary mode per task; if you author
offline, do a single validation pass at the end rather than round-tripping repeatedly.

**Default when unspecified: direct TMDL text edit** (mode 1). Switch to the engine round-trip only when
validation is explicitly asked for.

## Out of scope (deliberately not installed)

- **Microsoft "Skills for Fabric" `powerbi-authoring` plugin** (Report Authoring / Design / Planner skills).
  Decided NOT to install: it overlaps directly with data-goblin's `reports`/`pbip` plugins for the PBIR
  report layer (two competing playbooks → ping-pong/noisy-diff risk), and it does not cover this project's
  Deneb/R/Python/SVG custom visuals. data-goblin `reports`/`pbip` remain primary for report authoring. (Its
  one unique strength — the Desktop Bridge screenshot-verification loop — wasn't worth the overlap.) Note the
  Modeling MCP it references is the *same* `powerbi-modeling-mcp` already installed.

## Fabric App charts — visualization as code

A Fabric App is code-only (TypeScript, no drag-drop canvas). Charts are authored as code. Fabric Apps
natively support **Vega, Vega-Lite, and D3.js**.

- **Default = Vega-Lite**, via Microsoft's helper package **`@microsoft/fabric-visuals`** (it is the
  Vega-Lite "host" — the Fabric App equivalent of Deneb in a Power BI report; same spec language, different
  host). This is what the `imperial-dsms` app is built on.
- **Three-file pattern per chart** (in `imperial-dsms/src/queries/<domain>/`): `.dax` (semantic-model
  query) + `.json` (Vega-Lite v6 spec) + `.ts` (glue that imports both and returns
  `{ connection, query, columnMetadata, vegaLiteSpec }`). Matches the `mockups`/`wire-spec` workflow.
- `deneb-templates/` are just Vega-Lite specs → reusable as the `.json` here.
- **Not everything is Vega-Lite.** The app mixes three render techniques: (1) **full charts** (lines, combos,
  scatter) = Vega-Lite via `@microsoft/fabric-visuals` (`.ts` returns a `vegaLiteSpec`); (2) **KPI / number
  tiles** (e.g. `BalanceCard`, `KpiTile`) = **pure React + CSS**, no Vega-Lite (the `.ts` returns only
  `{connection, query, columnMetadata}` — no `vegaLiteSpec`); (3) **tiny inline glyphs** (mini bar strips,
  proportion bars inside cards) **up to full bespoke charts** = **hand-rolled raw `<svg>` in JSX** with
  manual scales/axes (e.g. `ComboChart`: columns + stemmed diamond markers over a reference line, with its
  own cross-filter selection and hover tooltip). Tell: if the query `.ts` has no `vegaLiteSpec` (and there's
  no `.json` spec), its visual is React/CSS or hand-rolled SVG, not Vega-Lite. The team hand-rolls bespoke
  visuals in SVG rather than reaching for D3 — another reason D3 is rarely needed here.
- **D3.js is a supported escape hatch** for bespoke visuals Vega-Lite/Vega genuinely can't do
  (force-directed networks, custom radial/chord layouts, heavy custom interactions). **Do NOT reach for D3
  unless Tim confirms it himself** — recommend it when Vega/Vega-Lite hits a wall, then wait for his go-ahead
  before installing the [d3 skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill).

## Rule of thumb

- Live engine work + DAX validation/query → **Modeling MCP** (or `te` CLI).
- Offline PBIP authoring under git → **`pbip`/`tmdl` skills**.
- Quality/methodology (BPA, naming, perf, audit) → **data-goblin `semantic-models`/`tabular-editor`**.
