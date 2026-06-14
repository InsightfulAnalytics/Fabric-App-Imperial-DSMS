# Fabric Console — UI Kit

A high-fidelity, click-through recreation of the **DSMS Fabric App** — the internal Imperial operations console used by command, division heads, and procurement officers to monitor the DS-1 Orbital Battle Station's financials, supply chain, workforce, and maintenance.

This is a **Microsoft Fabric App** surface: a React web app that queries Power BI semantic models and renders charts via Vega-Lite at runtime. This kit recreates the *visual + interaction design* — the charts here are cosmetic SVG (kit internals in `Charts.jsx`), not data-bound.

## Run it

Open `index.html`. It loads the design-system bundle (`_ds_bundle.js`), then the screen modules. Click the rail to move between the four built screens. The "Maintenance" page is a reserved placeholder for a later pass.

## Screens

| Screen | File | Covers |
|---|---|---|
| Imperial Executive Briefing (P&L) | `BriefingScreen.jsx` | 6-tile KPI strip, Income vs Expenses line chart w/ Battle-of-Yavin marker, subsidy-coverage gauge, expense-mix donut |
| Operations Command (spend & vendors) | `OperationsScreen.jsx` | Spend by Division Group, vendor risk matrix, top-vendors table w/ conditional risk pills, pending/disputed ledger |
| Supply Chain Status (inventory) | `SupplyScreen.jsx` | Inventory-value KPI, category stacked bars, stockouts heat-strip, reorder watchlist |
| Workforce & Personnel (headcount) | `WorkforceScreen.jsx` | Headcount KPI, headcount-by-role bars, attrition vs combat-losses dual-line, droids-vs-organics donut, payroll by department |

## Files

- `index.html` — loader + mount (`@dsCard` + `@startingPoint`)
- `AppShell.jsx` — composes `SidebarRail` + `TopBar` + active screen; exposes `window.DSMSApp`
- `*Screen.jsx` — one file per screen; each IIFE registers on `window.DSMSScreens`
- `Charts.jsx` — presentational SVG charts (`HBars`, `LineCompare`, `Donut`, `Legend`, `StackedBars`) → `window.DSMSCharts`
- `data.js` — mock Imperial datasets (0 BBY, trailing 12 months) → `window.DSMSData`

## How it composes the system

Screens read primitives from the bundle namespace — `const { Panel, KpiTile, DataTable, … } = window.DSMSDesignSystem_197d77` — and never re-implement them. Each screen/chart file is wrapped in an IIFE so destructured names don't collide across the Babel global scope. The charts are kit-local because the real app draws them with Vega-Lite; everything else (cards, tables, tiles, chrome, status pills) is a real design-system component.

## Mapping back to production (Vega-Lite)

When handing off to Claude Code, each cosmetic chart corresponds to a `data-type` from `design-system/spec-templates/`: `LineCompare` → `line`, `HBars` → `bar`, `StackedBars` → `bar-stacked`, `Donut` → a donut/treemap, the heat-strip → `heatmap`, `Gauge` → a semicircular gauge, `KpiTile` → `kpi-card`. See `design-system/INSTRUCTIONS-FOR-CLAUDE-DESIGN.md` for the `data-visual` / `data-manifest` conventions the production export requires.
