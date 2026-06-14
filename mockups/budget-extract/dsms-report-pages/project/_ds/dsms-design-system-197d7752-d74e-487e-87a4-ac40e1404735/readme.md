# DSMS Design System

**Death Star Management Services (DSMS)** — the Imperial design language for the operations console that runs the DS-1 Orbital Battle Station.

> *"What would the Empire's BI tool look like if they actually had one?"*

DSMS is the contractor responsible for running, maintaining, staffing, fuelling, arming and supplying the Death Star for the Galactic Empire. This design system clothes the **DSMS Fabric App** — the internal operations console used by Imperial command (Grand Moff tier), division leads, and procurement/operations analysts to monitor financials, supply chain, workforce, and maintenance.

The brand is **austere, authoritative, technical, premium** — closer to a warship's command console than a SaaS dashboard. The Star Wars connection is a *brand* (Imperial design language), never a *theme* (fan service). No stormtrooper emoji, no Death Star icons in every corner. Reference vibes: Imperial control panels, the Rogue One schematic readout, IBCS technical clarity, Bloomberg Terminal density, military situational-awareness displays.

---

## Products & surfaces

| Surface | What it is | Where |
|---|---|---|
| **Fabric Console** | The operations console — a Microsoft Fabric App (React + Power BI semantic models, charts via Vega-Lite). Five report pages: Executive Briefing (P&L), Operations Command, Supply Chain, Workforce, Maintenance. | `ui_kits/fabric-console/` |

There is a single product at this stage: the dark-first operations console. A light theme is explicitly **out of scope** — design dark, design well.

## Sources

This system was authored from a written brief, not an existing component codebase. Source materials (read-only, mounted under `design-system/` at author time):

- `DESIGN-BRIEF.md` — project context, audience, tone, the full `--ds-*` palette, typography, surface rules, and the five pages to design.
- `INSTRUCTIONS-FOR-CLAUDE-DESIGN.md` — the Fabric App output contract (`data-visual` / `data-type` attributes, `data-section`, the `<script id="data-manifest">` block, neutral chart placeholder colours).
- `HANDOFF-CONTEXT.md` — the Claude Design → Claude Code handoff block for turning exported HTML into Vega-Lite specs.
- `spec-templates/*.vl.json5` — Vega-Lite reference specs (kpi-card, line, bar, bullet, sparkline, heatmap) that production charts are generated from.

No font binaries and no logo were provided — see **Fonts** and **Iconography** below for the substitutions made.

---

## CONTENT FUNDAMENTALS

How DSMS writes copy. The voice is a fleet officer briefing a superior: precise, declarative, unhurried.

- **Tone:** Authoritative and technical. State facts; don't sell. *"Subsidy coverage holding at 94% of total expenses."* not *"Great news — coverage is looking healthy! 🎉"*
- **Person:** Third-person and impersonal. Refer to the station, the division, the vendor — not "you" or "we". Labels are nouns (*Net Surplus*, *Reorder Watchlist*), not calls to action (*Check your surplus!*).
- **Casing:**
  - **Eyebrows / section overlines / pill labels:** ALL CAPS with wide tracking (e.g. `FINANCIAL POSTURE`, `CRITICAL`, `AT OR BELOW REORDER POINT`).
  - **Titles & headings:** Title Case (*Imperial Executive Briefing*, *Spend by Division Group*).
  - **Body & captions:** Sentence case.
- **Numbers are first-class.** Every figure is mono and tabular. Credits use the `₡` glyph (*₡ 1.28B*). Percentages carry one decimal (*94.0%*, *+6.4%*). Counts use thousands separators (*1,284,900,002*).
- **Imperial vocabulary, used straight.** *Division Group*, *Home World*, *Contract Tier*, *Risk Rating*, *Combat Losses*, *Work Order*, *0 BBY* (the in-world "now" — the Battle of Yavin). Dates can read in the Imperial frame (*Ending 0 BBY*, *0 BBY · Dec*). Never wink at the reader.
- **Status language is terse and graded.** *Nominal · Elevated · Critical*; *In Stock · Reorder · Stockout*; *Pending · Disputed · Closed*. One word where possible.
- **No emoji. No exclamation marks. No hedging.** A footnote reads *"Filed under Operations · last refreshed 0 BBY"*, not *"Last updated just now!"*.
- **Density over decoration.** Copy assumes the reader has a fleet to run and 90 seconds to decide. Lead with the number, qualify briefly, stop.

**Examples**
- KPI label → value → delta: `NET SURPLUS` · `₡ 1.28B` · `▲ +6.4% YoY`
- Empty/placeholder: *"Page reserved — not part of this UI-kit pass."*
- Callout: *"Treasury subsidy covers ₡ 8.55B of ₡ 9.10B in total expenses."*

---

## VISUAL FOUNDATIONS

### Colour
- **Dark-first, near-black neutrals.** Four surface steps form "the hull": Void `#0B0D10` (page) → Hull `#14181D` (card) → Bay `#1C2128` (raised / table header / hover) → Deck `#232A33` (wells, active rows). Elevation reads through **surface step + a 1px hairline**, almost never through shadow.
- **Colour is signal, not chrome.** Most of the screen is neutral. Colour is reserved for status and the single accent. Imperial red `#C8102E` is the one brand accent — used *sparingly* for active nav, focus, the primary CTA, and section underlines. Hover brightens to `#E12342`, press darkens to `#8E0B20`, and a 14%-tint wash backs active items.
- **Signal palette:** positive `#3CB371`, negative `#E45755`, warning `#FFAA00`, info / schematic cyan `#5BC8F5`. Each has a ~14% dim tint for soft pill backgrounds.
- **Categorical data ramp** (`--ds-data-1…6`): schematic cyan → cool greys → imperial red. Colour-blind-aware ordering. Charts pull from these.
- The eye should be drawn to **data, not chrome**.

### Typography
- **Display — Rajdhani** (wide geometric techno-sans): page/panel titles, KPI labels, eyebrows. SemiBold for labels, Bold for titles, ALL CAPS for eyebrows.
- **Body / UI — Inter:** everything prose and control. 14px base, tight tracking.
- **Numeric — JetBrains Mono:** *every number on screen*, with `font-variant-numeric: tabular-nums` so columns of credits align. Slight negative tracking (`-0.01em`).
- Scale runs 10 → 64px; KPI values sit at ~30px mono, page titles ~26px display.

### Spacing, radius & borders
- **4px base grid.** Dense and technical; tokens `--ds-space-1…12` (2 → 64px).
- **Austere radii — nothing rounder than 4px.** Cards/panels cap at `--ds-radius-md` (4px); controls/pills use 2px; only status dots are fully round.
- **Borders are structure.** Default 1px in conduit grey `#2A323D`; faint hairlines `#20262E` separate dense table rows; `#3A4452` for hover/bright edges. Active/focused elements take a **2px inset imperial border**; focus adds a soft `--ds-glow-focus` ring.

### Surfaces, cards & elevation
- A **card (Panel)** = Hull surface + 1px conduit border + 4px radius + **no shadow**. Optional header with an eyebrow/title and trailing actions, divided by a hairline rule.
- **Shadows are for overlays only** (`--ds-shadow-popover`, `--ds-shadow-overlay`) — dialogs, menus. In-page elevation is surface-step + hairline, not drop shadow.
- **Section headers:** an ALL-CAPS eyebrow above a display title, with a 1px imperial underline beneath the **title only**.

### Backgrounds & texture
- The page void carries an optional **technical texture at ≤3% opacity** — a 32px blueprint **grid** (`--ds-texture-grid`) or fine **scanlines** (`--ds-texture-scanline`). Subtle, never loud. No photographic imagery, no starfields, no 3D Death Star renders, no gradient hero washes.
- Scroll regions over the void use top/bottom **protection gradients** (`--ds-protect-*`).

### Motion
- **Restrained — hover/focus only.** Fast easing (`--ds-dur-fast` 90ms, `--ds-ease-standard`); the switch knob uses a gentle `--ds-ease-out`. **No bounce, no decorative loops, no entrance animations** beyond the occasional fade. Save motion for v2.

### Interaction states
- **Hover:** surface steps up one level (e.g. transparent → Bay) and/or text brightens to primary; secondary buttons gain a brighter border. No scale changes.
- **Press:** surface steps *down* (darker) — no shrink/scale.
- **Active/selected:** imperial wash background + a 2px imperial **accent stripe** on the leading edge (nav items, icon buttons, KPI tiles). This stripe is *the* signature motif — used once per context, never five times.
- **Focus:** 2px inset imperial border + soft red glow ring.
- **Disabled:** drops to Hull surface, faint text, `not-allowed`.

### Transparency & blur
- Used sparingly: ~14–22% tint washes for status backgrounds and the active-item wash; chart area fills sit at 10–18% opacity. No glassmorphism / backdrop-blur in the console.

### Imagery vibe
- There is essentially **no imagery** — this is an instrument panel. The only "art" is the geometric seal mark and the data itself. Charts read cool (cyan/grey) with imperial red reserved for the worst states and key markers (e.g. the Battle-of-Yavin reference line).

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) — stroke-based, geometric, ~1.5–2px stroke. It matches the brief's call for schematic/blueprint glyphs over filled illustrative icons. *This is a substitution* (no icon set shipped with the brief); Lucide is the closest CDN match to the specified style. **Flag for the user: confirm Lucide or supply the Empire's own glyph set.**
- **Delivery:** the `Icon` component renders **inline SVG** sourced from the Lucide UMD global (`window.lucide`), recoloured via `currentColor`. Pages must load it once: `<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.js"></script>` before the bundle. (Inline SVG is used rather than CSS-mask/img so icons render without per-icon cross-origin fetches and work offline once the UMD is hosted.)
- **Usage:** lean schematic — `activity`, `radar`, `crosshair`, `gauge`, `shield`, `boxes`, `git-branch`, `wrench`, `cpu`, `zap`, `alert-triangle`. Nav uses `layout-dashboard / git-branch / boxes / users / wrench`.
- **No emoji. No unicode-glyph icons.** The one currency glyph `₡` (credits) is treated as type, not an icon.
- **The seal.** An original, austere geometric command seal (`assets/dsms-seal.svg`) + wordmark lockup (`assets/dsms-wordmark.svg`) — a hexagonal command ring, concentric schematic rings, radial spokes, a red core. *This was authored* (no logo provided) and is deliberately not derived from any trademarked Imperial insignia. It appears once, top of the rail. **Flag for the user: replace with an official mark if one exists.**
- **The motif rule:** one subtle motif in chrome — the imperial accent stripe on the active element. One. Not five.

---

## Index — what's in this system

**Global entry**
- `styles.css` — the only file consumers link. `@import`s the Google-Fonts webfonts + every token module.

**Tokens** (`tokens/`)
- `colors.css` — surfaces, lines, text, imperial accent, signal palette, data ramp + semantic aliases.
- `typography.css` — families, scale, weights, tracking, semantic type roles.
- `spacing.css` — 4px spacing scale, radii, borders, elevation, layout dims, motion.
- `effects.css` — grid/scanline textures, accent-stripe & eyebrow helpers, `.ds-num`, base reset.

**Foundation cards** (`guidelines/`) — specimen cards rendered in the Design System tab: Colors (surfaces, imperial, signal, data ramp, text/lines), Type (display, body, numeric, eyebrows), Spacing (scale, radius, elevation), Brand (seal, textures).

**Components** — React primitives (`export function <Name>`), each with `.d.ts`, `.prompt.md`, and a directory `@dsCard` HTML.
- `components/foundation/` — `Icon`
- `components/forms/` — `Button`, `IconButton`, `Input`, `Select`, `Slicer`, `Switch`
- `components/data/` — `KpiTile`, `Sparkline`, `Gauge`, `StatusPill`, `DeltaIndicator`, `DataTable`
- `components/chrome/` — `Panel`, `SectionHeader`, `SidebarRail`, `TopBar`, `SlicerPane`

**UI kit** (`ui_kits/fabric-console/`) — the four-screen interactive console. See its `README.md`. Also exposes the whole console as a single importable component, **`FabricConsole`** (`window.DSMSDesignSystem_197d77.FabricConsole`, props: `startPage` · `collapsed`), so a consuming project mounts the exact report with one `<x-import>`. The console docks a **`SlicerPane`** on the right (collapsible to a 52px rail) whose detailed slices open as popover cards, and a top-bar **"Detailed Filters"** button opens an all-columns takeover that greys the report behind it. `Filter Panel.html` is the side exploration these were chosen from: four slicer side-panel layouts (inline accordion · drill-in · popover · two-pane sheet) plus the open-all takeover (all-columns · tabbed).

**Assets** (`assets/`) — `dsms-seal.svg`, `dsms-wordmark.svg`.

**Starting points** — `Button` (Forms), `KpiTile` (Data), `Panel` (Chrome), `DataTable` (Data), and the full **Fabric Console** screen (also available as the `FabricConsole` component).

**Fonts** — loaded from **Google Fonts** (Rajdhani, Inter, JetBrains Mono) via the `@import` in `styles.css`. No binaries were provided, so these are not self-hosted. **Flag for the user: supply licensed binaries (or confirm Google Fonts) to self-host `@font-face`.**

**Namespace** — components are exposed at `window.DSMSDesignSystem_197d77` in `@dsCard` HTML (load `_ds_bundle.js`, which the compiler generates).
