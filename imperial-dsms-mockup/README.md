# Imperial DSMS — Fabric Console mockup

A self-contained, high-fidelity click-through of the **Imperial DSMS** Fabric App — the internal operations console used by Imperial command, division heads, and procurement officers to monitor the DS-1 Orbital Battle Station's financials, supply chain, workforce, and maintenance.

This is the design handed off from Claude Design (see [`../design-system/imports/fabric-console-raw/`](../design-system/imports/fabric-console-raw/) for the full bundle: original source `.jsx`, prompts, foundation specimen cards, chat transcript). `index.html` here is the **self-contained build** — components and screens are inlined so it renders anywhere, no compiler required.

## Run it

Double-click `index.html`, or:

```powershell
start "" "index.html"
```

The first paint pulls Google Fonts (Rajdhani / Inter / JetBrains Mono), React 18, ReactDOM, Babel-standalone, and Lucide icons from CDN; subsequent loads are cached. Click the rail items to move between screens.

## Screens included

| Screen | Covers |
|---|---|
| Imperial Executive Briefing (P&L) | 6-tile KPI strip, Income vs Expenses line w/ Battle-of-Yavin marker, subsidy-coverage gauge, expense-mix donut |
| Operations Command | Spend by Division Group, vendor risk matrix, top-vendors table with conditional risk pills, pending/disputed ledger |
| Supply Chain Status | Inventory-value KPI, category stacked bars, stockouts heat-strip, reorder watchlist |
| Workforce & Personnel | Headcount KPI, headcount-by-role bars, attrition vs combat-losses dual-line, droids-vs-organics donut, payroll by department |
| Maintenance & Reliability | Placeholder — reserved for the next pass |

## File layout

```
imperial-dsms/
├── index.html        ← the self-contained Fabric Console build
├── styles.css        ← global entry; @imports the four token files
├── tokens/
│   ├── colors.css      Imperial palette: surfaces, lines, text, accent, signal, 6-step data ramp
│   ├── typography.css  Rajdhani display · Inter body · JetBrains Mono numeric
│   ├── spacing.css     4 px grid, radii, type-scale spacing
│   └── effects.css     elevation/glow tokens, scanline + grid background textures
└── assets/
    ├── dsms-seal.svg
    └── dsms-wordmark.svg
```

## What was changed vs the original handoff

- App title / `<title>` → **"Imperial DSMS — Fabric Console"**.
- Sidebar wordmark → **"IMPERIAL DSMS"** (was "DSMS"). The "OPERATIONS CONSOLE" eyebrow is unchanged.
- Stylesheet link rewritten from `../../styles.css` to `./styles.css` (the file moved up two folders from the original `ui_kits/fabric-console/` nesting).
- Nothing else. Inlined components, tokens, screens, and mock data are byte-for-byte the handoff build.

## Production path

This mockup is the **visual target**. When the Fabric App is scaffolded next (see [`../CLAUDE.md`](../CLAUDE.md)):

```powershell
npm create @microsoft/rayfin@latest -- "imperial-dsms" --template dataapp --workspace "Bi Nexus"
```

…the React components, Vega-Lite specs, and DAX queries will be authored to reproduce these screens against the published **Death Star Management Services** semantic model. The original `.jsx` source files for every primitive live in [`../design-system/imports/fabric-console-raw/dsms-design-system/project/components/`](../design-system/imports/fabric-console-raw/dsms-design-system/project/components/) — port those into the Rayfin app as the design-system layer.
