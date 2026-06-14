---
name: dsms-design
description: Use this skill to generate well-branded interfaces and assets for DSMS (Death Star Management Services), the Imperial operations-console design language — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and the Fabric Console UI kit components for prototyping a dark, austere, Bloomberg-Terminal-meets-warship BI console.
user-invocable: true
---

# DSMS Design System Skill

Read `readme.md` first — it is the full design guide (context, content fundamentals, visual foundations, iconography, and a file index). Then explore the other files as needed.

## What this is
DSMS is the dark-first, austere Imperial operations console for the Death Star: near-black neutral surfaces, imperial red `#C8102E` used only for signal, mono tabular numerics everywhere, schematic Lucide icons, no emoji, no imagery. Think warship command console with Bloomberg density.

## How to use it
- **Visual artifacts (slides, mocks, throwaway prototypes):** copy the assets you need out of `assets/`, link `styles.css` for tokens, and build static HTML files for the user to view. Pull real component markup from the `ui_kits/fabric-console/` screens and `components/**` sources.
- **Production code:** read the rules here to become an expert in the brand. Copy tokens from `tokens/`, follow the component contracts in each `*.d.ts` + `*.prompt.md`, and compose screens the way `ui_kits/fabric-console/` does.

## Key files
- `styles.css` — link this; it imports the fonts + all tokens.
- `tokens/` — colors, typography, spacing, effects (CSS custom properties).
- `components/**` — `Button, IconButton, Input, Select, Switch, KpiTile, Sparkline, Gauge, StatusPill, DeltaIndicator, DataTable, Panel, SectionHeader, SidebarRail, TopBar, Icon`. Each has a `.prompt.md` with usage.
- `ui_kits/fabric-console/` — full four-screen console recreation (Briefing / Operations / Supply / Workforce) + cosmetic `Charts.jsx`.
- `assets/` — `dsms-seal.svg`, `dsms-wordmark.svg`.

## Setup notes for rendering
- Load icons via the Lucide UMD before any component script: `<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.js"></script>`. The `Icon` component reads `window.lucide`.
- Fonts come from Google Fonts via `styles.css`. If working offline or in production, self-host Rajdhani / Inter / JetBrains Mono.
- In a design-system-tab context, components are on `window.DSMSDesignSystem_197d77` and load via the generated `_ds_bundle.js`. When building a standalone HTML deliverable, inline the component source you need (the `.jsx` files) rather than depending on that bundle.

## House rules (do not violate)
- Dark only. Colour is signal — reserve imperial red for active/focus/primary/critical. Most surfaces stay neutral.
- Every number is mono + `tabular-nums`. Credits use `₡`.
- Nothing rounder than 4px. Elevation = surface step + 1px hairline, not shadow.
- Eyebrows ALL-CAPS wide-tracked; titles Title Case; body sentence case.
- No emoji. No gradient hero washes. No photographic imagery. One accent-stripe motif per context.

## If invoked with no other guidance
Ask the user what they want to build or design, ask a few focused questions (surface, audience, fidelity, which screens/components, variations), then act as an expert DSMS designer — outputting HTML artifacts **or** production code depending on the need.
