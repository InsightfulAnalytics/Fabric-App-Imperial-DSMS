# Star Wars — Fabric App

## Project Goal

Build a React-based Fabric App on top of the **Star Wars** semantic model. The PBIP and dataset generator live in this directory; this file describes the scaffolding for the *Fabric App* that consumes the published semantic model.

---

## First-Time Setup

### 1. Scaffold the Rayfin app (one-time)

Run from the `B:\VS Code Files\PBI Project\Star Wars` directory:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
npm create @microsoft/rayfin@latest -- "star-wars-app" --template dataapp --workspace "Bi Nexus"
```

This creates a `star-wars-app/` subdirectory with the full Vite + React + Tailwind project.

### 2. Publish the semantic model

The PBIP under `./PBI/` is local. Publish it to the **Bi Nexus** workspace in Fabric before the app can connect:

1. Open `PBI/Star Wars.pbip` in Power BI Desktop
2. Publish to Fabric → **Bi Nexus** workspace
3. Copy the published model's URL from the Fabric portal

### 3. Register the connection

```powershell
$env:NODE_OPTIONS='--use-system-ca'
npx fabric-app-data add starwars --from-url "<Fabric portal URL>"
npx fabric-app-data generate -o src/fabric.generated.ts
```

Use `starwars` as the connection alias throughout the codebase.

---

## Project Structure (after scaffolding)

```
Star Wars/
├── PBI/                       # Power BI project (.pbip + .SemanticModel + .Report)
├── data/                      # Generated CSV / Parquet inputs to the model
├── generate_dataset.py        # Builds the synthetic Star Wars dataset
├── validate_dataset.py
├── design-system/             # Brand tokens + Vega-Lite spec templates (carried over from Sparklines)
│   ├── HANDOFF-CONTEXT.md
│   └── spec-templates/        # 7 annotated Vega-Lite templates
├── deneb-templates/           # 60 reference Deneb / Vega-Lite chart templates (community)
├── d3-templates/              # 33 standalone D3 v7 reference charts (open index.html)
├── .claude/skills/d3-viz/     # D3.js skill (patterns + references) for bespoke visuals
├── mockups/                   # Hand-authored .vl.json5 / .jsonc specs (preview before wiring)
│   ├── .preview/              # Watcher output — compiled .vl.json files
│   └── data/                  # Inline preview data
├── scripts/
│   ├── watch-mockups.mjs      # Live-compile mockups → .preview/
│   ├── import-design.mjs      # Process Claude Design ZIP exports
│   └── wire-spec.mjs          # Scaffold .dax/.ts/.json from an approved mockup
├── star-wars-app/             # The Fabric App (created by rayfin in step 1)
├── AGENTS.md                  # Workflow + project conventions
├── CLAUDE.md                  # This file
├── LEARNINGS.md               # Hard-won gotchas from previous Fabric Apps
├── TOOLING.md                 # Which tool for which semantic-model / DAX job
├── CHARTING.md                # Which tool/skill for which chart (read before building visuals)
└── README.md
```

---

## Key Rules

1. **Never use mock data.** All data must come from the published Star Wars semantic model.
2. **Connection alias is `starwars`** — set in `fabric.yaml`, used in every `useSemanticModelQuery` call.
3. **Never inline DAX.** All queries go in `.dax` files under `src/queries/`, imported with `?raw` or via the factory pattern.
4. **Confirm column names from CLI output.** Run `npx fabric-app-data query starwars --query '...'` and use exact column names as `columnMetadata` keys.
5. **Always deploy after changes.** Run `npx rayfin up` after every set of changes.
6. **Read [LEARNINGS.md](./LEARNINGS.md) before fighting Vega-Lite, the Fabric CLI, or DAX discovery** — many of the obvious-looking traps are documented there.
7. **Read [TOOLING.md](./TOOLING.md) before semantic-model or DAX work** — which tool for which job (Modeling MCP vs `te`/data-goblin skills vs direct TMDL), and the PBIP authoring-mode gotcha. **Defaults when unspecified: target the local PBIP (`./PBI/`), not the live Fabric model; and author via direct TMDL text edit, not an engine round-trip.**
8. **Read [CHARTING.md](./CHARTING.md) before building any chart/visual** — routes by surface (report vs Fabric App vs analysis) and need to the right skill/technique (Vega-Lite via `@microsoft/fabric-visuals` / hand-rolled SVG / Deneb / D3). **Default to Vega-Lite (app) or Deneb (reports); only use D3 (the `d3-viz` skill + `d3-templates/`) when Vega/Vega-Lite genuinely can't, and only after Tim confirms.**
8. **Route analytics & visualization *method* questions through the Analytics library** (see below) — it governs *how* to analyse and *which chart*; Power BI tooling governs *how to build it here*.

---

## Analytics Library (method routing)

A portable, tool-agnostic **analysis brain** lives at
`B:\VS Code Files\Learning Resources\Analytics\`. It governs *how* to turn a table into
correct, well-quantified insights and *which* visual proves them — independent of Power BI.

**When the task is** profiling a dataset, choosing a statistical test/model, deciding a
chart type, or synthesising findings into ranked insights → **read
`B:\VS Code Files\Learning Resources\Analytics\CLAUDE.md` first** and follow its routing
table. It points to four skills (`exploratory-data-analysis`, `statistical-method-selection`,
`visualization-design`, `insight-synthesis`) plus `reference/` depth and `templates/`.

The Analytics library stops at "I have a defensible, visualised insight." Wiring that
insight into this repo (TMDL measures, DAX, Deneb/PBIR visuals, the Fabric App) is governed
by [TOOLING.md](./TOOLING.md), [LEARNINGS.md](./LEARNINGS.md), and the Key Rules above.

---

## Environment Notes

Every `npm`/`npx` command requires:
```powershell
$env:NODE_OPTIONS='--use-system-ca'
```

The `query`, `add --from-url`, and `rayfin up` commands also require **AVG Web/Mail Shield HTTPS scanning to be disabled**.

---

## Design System

A corporate-blue + yellow design system is carried over from the Sparklines app in `design-system/`:

- `design-system/HANDOFF-CONTEXT.md` — the copy-paste block that triggers a Claude Code handoff from Claude Design
- `design-system/spec-templates/` — 7 annotated Vega-Lite v6 templates: `kpi-card`, `kpi-card-conditional`, `bullet-chart`, `bar-chart`, `sparkline`, `line-chart`, `line-chart-multi-series`

**Brand at a glance:**
- Primary: `--ds-blue-700` `#1F4E8C` (corporate blue)
- Accent: `--ds-yellow-500` `#FFC20E` (signal yellow — active nav, logo)
- Positive `#1E7C36` / Negative `#C62F2F`
- Chart ramp: `--ds-chart-1` → `--ds-chart-6` (blue-led, single yellow accent)
- Always use `--ds-*` variables in components; never hardcode hex except inside Vega specs (SVG can't resolve CSS vars at runtime)

---

## Deneb Templates

`deneb-templates/` contains **60 reference templates** copied from `B:\VS Code Files\Deneb-Templates\templates`. Use these as starting points when authoring specs in `mockups/`. They cover everything from simple bars to enhanced waterfalls, comet charts, raincloud plots, hex maps, slope charts, deviation icicle, etc.

To use one: copy a file from `deneb-templates/` into `mockups/`, rename to `.vl.json5` or `.jsonc`, adapt to your data shape, and the watcher will compile a preview.

---

## Mockups Workflow

```powershell
$env:NODE_OPTIONS='--use-system-ca'
npm run mockups:watch
```

- Edit `.jsonc` or `.vl.json5` files in `mockups/`
- Watcher compiles each into `mockups/.preview/<name>_nc.vl.json` (clean JSON for Vega Viewer / vega-embed)
- Once a mockup is approved, run `npm run wire-spec -- mockups/<name>.vl.json5 --domain <domain> --name <name>` to scaffold the production `.dax`/`.ts`/`.json` triplet in `src/queries/<domain>/`

---

## Microsoft Documentation

| Topic | URL |
|---|---|
| Fabric Apps overview | https://learn.microsoft.com/en-gb/fabric/apps/data-apps-template |
| Fabric Apps quickstart | https://learn.microsoft.com/en-gb/fabric/apps/create-data-app |
| fabric-app-data SDK | https://learn.microsoft.com/en-gb/fabric/apps/fabric-app-data |
| Power BI semantic models | https://learn.microsoft.com/en-us/power-bi/connect-data/service-datasets-understand |
| DAX reference | https://learn.microsoft.com/en-us/dax/dax-function-reference |
| Vega-Lite docs | https://vega.github.io/vega-lite/docs/ |
| Vega-Lite v6 examples | https://vega.github.io/vega-lite/examples/ |
| Power BI embed | https://learn.microsoft.com/en-us/power-bi/developer/embedded/ |

---

## Workspace Reference

- **Fabric Workspace**: Bi Nexus (`6c6afb09-761b-4ef5-9f5f-e8f91c228680`)
- **Tenant**: `8a0f87d8-f522-4f9b-8f4e-cf9d2f11c784`
- **Semantic model item ID**: TBD — set after publishing the PBIP
