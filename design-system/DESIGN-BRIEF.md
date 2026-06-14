# Design Brief — Death Star Management Services (DSMS)

Paste this brief into **Claude Design** when starting the new design system for the DSMS Fabric App. It tells Claude Design *what* to design; the companion file [`spec-templates/INSTRUCTIONS-FOR-CLAUDE-DESIGN.md`](./spec-templates/INSTRUCTIONS-FOR-CLAUDE-DESIGN.md) tells it *how* the HTML must be structured so Claude Code can import it.

---

## 1. Project Context

**Death Star Management Services (DSMS)** is the Imperial contractor responsible for running, maintaining, staffing, fuelling, arming and supplying the DS-1 Orbital Battle Station for the Galactic Empire. This Fabric App is the internal operations console used by Imperial command, DSMS division heads, and procurement officers to monitor the station's financials, supply chain, workforce, and maintenance.

**Audience.** Executives (Grand Moff tier — wants a single screen they can read across the room), division leads (wants drill-downs by department, vendor, location), operations analysts (wants tables, trends, anomalies).

**Tone.** *"What would the Empire's BI tool look like if they actually had one?"* — Austere, authoritative, technical, premium. Closer to a warship's command console than a SaaS dashboard. Confident, not cartoonish — no stormtrooper emoji, no Death Star icons in every corner. The Star Wars connection should feel like a *brand* (Imperial design language) rather than a *theme* (fan service).

**Reference vibes.** Imperial control panels (A New Hope), the Death Star schematic readout from Rogue One, IBCS-style technical clarity, Bloomberg Terminal density, military situational-awareness displays. **Not** Star Tours, not LEGO Star Wars, not the prequels.

---

## 2. Visual Identity

### Mood

- **Dark-first.** The primary theme is dark. A light theme is *not* required at this stage — design dark, design well.
- **Austere & dense.** Information-rich. Generous use of monospace numerics. Thin rules, no rounded chamfers wider than 2 px.
- **Restrained colour.** Most surfaces are near-black, near-white, or neutral grey. Colour is reserved for *signal* (status, accent, focus). The eye should be drawn to data, not chrome.

### Color palette (starting point — refine if you have a better idea)

| Token | Hex | Use |
|---|---|---|
| `--ds-bg-void` | `#0B0D10` | Outermost page background |
| `--ds-bg-hull` | `#14181D` | Card / panel background |
| `--ds-bg-bay` | `#1C2128` | Elevated surface, hover, table headers |
| `--ds-line-conduit` | `#2A323D` | Borders, gridlines, dividers |
| `--ds-text-primary` | `#E8ECEF` | Headings, KPI values |
| `--ds-text-secondary` | `#A6ADB6` | Body, axis labels |
| `--ds-text-muted` | `#6B7480` | Captions, footnotes |
| `--ds-accent-imperial` | `#C8102E` | Primary accent — Imperial red. Use sparingly: active state, focus, primary CTA |
| `--ds-signal-positive` | `#3CB371` | Surplus, on-target, in-stock, closed WO |
| `--ds-signal-negative` | `#E45755` | Deficit, stockout, critical WO, combat losses |
| `--ds-signal-warning` | `#FFAA00` | Reorder needed, overdue, attention |
| `--ds-data-1` … `--ds-data-6` | TBD | Categorical chart ramp — start from `#5BC8F5` (schematic cyan), step through cool greys to `#C8102E`. Six steps. Colour-blind safe. |

Use CSS custom properties throughout. Hard-code hex **only** inside Vega-Lite spec literals (SVG can't read CSS variables at runtime — Claude Code will swap to neutral placeholders per the output conventions).

### Typography

- **Display** (page titles, KPI labels): a strong techno-sans — `Rajdhani`, `Orbitron`, or `Eurostile`-alike. Wide letterforms, geometric. Use SemiBold for KPI labels, Bold for page titles. ALL CAPS for section eyebrows.
- **Body & UI** (everything else): `Inter` or `IBM Plex Sans`. Tight tracking, 14 px base.
- **Numeric** (every number on screen): `JetBrains Mono`, `IBM Plex Mono`, or `Roboto Mono`. **Tabular figures everywhere** — every digit the same width so columns of credits align.
- Use `font-variant-numeric: tabular-nums` on every number element.

### Iconography & motifs

- Stroke-based, 1.5 px, geometric. Lean toward schematic/blueprint glyphs over filled illustrative icons.
- One subtle motif may appear in chrome (e.g., the Imperial cog as a loading spinner, a thin red accent stripe on the active nav item). **One**. Not five.
- No photographic imagery. No 3D renders of the Death Star. No starfields behind charts.

### Surface treatment

- Cards: 1 px border in `--ds-line-conduit`, no shadow, 4 px corner radius.
- Active / focused element: 2 px inset border in `--ds-accent-imperial`.
- Section headers: a 24 px ALL-CAPS eyebrow above the title, with a 1 px red underline beneath the title only.

---

## 3. Pages to Design

Design **five** pages. Every page is 1440 × 900 minimum, responsive down to 1280 wide.

Every page needs:
- A persistent left rail (collapsed icon-only at < 1440) with the page list, an "Imperial Seal" mark at the top, and a system-status pill at the bottom (e.g., *"Subsidy Coverage 94%"*).
- A top bar with the page title, a date-range selector (default: last 12 months ending 0 BBY = Dec 2024), and a "Filed under" breadcrumb.
- A subtle scanline or grid texture in the page background, ≤ 3% opacity. Optional.

### Page 1 — Imperial Executive Briefing  *(P&L)*

The single screen a Grand Moff would read first.

- **KPI strip (six tiles):** Total Income · Total Expenses · Net Surplus · Imperial Subsidy · Subsidy Coverage % · Operating Margin %. Each tile shows the value, the YoY delta with arrow, and a 12-month sparkline.
- **Hero chart:** Income vs Expenses by month, 6-year line chart, with Net Surplus as a filled area or column behind. Highlight the Battle of Yavin (Dec 2024 / 0 BBY) with a vertical red marker.
- **Expense mix donut or treemap** by `AccountCategory` (Personnel / Operations / Capital & Construction / Overhead).
- **Subsidy coverage gauge** — semicircular, showing how much of total expenses the Imperial Treasury subsidy actually covers. Goes red below 70%.

### Page 2 — Operations Command  *(spend & vendors)*

- **Spend by Division Group** (bar) — Combat Systems, Engineering & Power, Habitation & Life Support, Security & Detention, Flight Operations, Logistics & Supply, Command & Administration.
- **Top vendors table** — Vendor, Vendor Type, Home World, Contract Tier, Risk Rating, Total Spend. Sortable. Conditional formatting on Risk Rating (Imperial red for High/Critical).
- **Vendor risk matrix** — scatter of Risk vs Spend, bubble size = number of postings. Quadrant lines.
- **Pending / Disputed ledger callout** — count of postings with `Status = Pending` or `Disputed`, with the top 5 by amount.

### Page 3 — Supply Chain Status  *(inventory)*

- **Inventory Value KPI** + 12-month sparkline.
- **Inventory by category, stacked bar** — Consumable / Munition / Spare Part / Fuel / Droid Part / Medical, segmented by Location Type (Central Depot / Forward Store / Magazine / Cold Storage).
- **Stockouts heat-strip** — items × weeks, cells filled red where `StockStatus = Stockout`. Hover for item + location.
- **Reorder watchlist table** — items at or below reorder point, with on-hand qty, on-order qty, lead time days, preferred vendor. Sort by days-to-stockout.

### Page 4 — Workforce & Personnel  *(headcount)*

- **Total Headcount KPI** with monthly growth sparkline (should climb toward ~1.7 M by 0 BBY).
- **Headcount by Role**, horizontal bar — Stormtrooper, TIE Pilot, Gunner, Reactor Technician, ISB Agent, Service Droid, etc.
- **Attrition & Combat Losses** dual-line chart over time. Pre-warn for the spike near Dec 2024.
- **Droids vs Organics** donut.
- **Payroll cost by Department**, table or bar.

### Page 5 — Maintenance & Reliability  *(work orders)*

- **Open Work Orders KPI** + **Critical WOs** KPI (red if non-zero).
- **WO backlog by Priority**, stacked bar over time (Low / Medium / High / Critical).
- **Downtime hours by Department**, horizontal bar — sortable.
- **Repair cost by Category** (Corrective / Preventive / Inspection / Emergency / Upgrade), bar.
- **Recent critical WOs table** — WorkOrderID, Opened, Department, Location, Item, Downtime, Repair Cost, Status.

---

## 4. Semantic Model — Fields You Can Reference

When filling in the data manifest (see [INSTRUCTIONS-FOR-CLAUDE-DESIGN.md](./spec-templates/INSTRUCTIONS-FOR-CLAUDE-DESIGN.md)), use `dax_hint` values from this list. Names are exact.

**Dimensions**
- `DimDate[Date]` · `DimDate[Year]` · `DimDate[Month & Year]` · `DimDate[MonthOffset]` · `DimDate[Start Of Month]`
- `DimAccount[Account]` · `DimAccount[AccountCategory]` · `DimAccount[AccountType]` · `DimAccount[ImperialSubsidy]`
- `DimDepartment[Department]` · `DimDepartment[DivisionGroup]` · `DimDepartment[CommandingOfficer]` · `DimDepartment[Sector]`
- `DimVendor[Vendor]` · `DimVendor[VendorType]` · `DimVendor[HomeWorld]` · `DimVendor[ContractTier]` · `DimVendor[RiskRating]`
- `DimItem[Item]` · `DimItem[ItemCategory]` · `DimItem[UnitOfMeasure]` · `DimItem[Perishable]` · `DimItem[LeadTimeDays]`
- `DimLocation[Location]` · `DimLocation[Zone]` · `DimLocation[DeckLevel]` · `DimLocation[LocationType]`
- `DimRole[Role]` · `DimRole[RoleType]` · `DimRole[PayGrade]` · `DimRole[IsCombat]`

**Measures** (live in `Measure Table`)
- `[Total Income]` · `[Total Expenses]` · `[Net Surplus]` · `[Operating Margin %]`
- `[Imperial Subsidy]` · `[Subsidy Coverage %]` · `[Expenses YoY %]`
- `[Total Headcount]` · `[Combat Losses]` · `[Attrition %]` · `[Payroll Cost]`
- `[Inventory Value]` · `[Stockout Lines]`
- `[Work Orders]` · `[Open Work Orders]` · `[Total Downtime Hrs]` · `[Repair Cost]`

**Fact tables** (raw — prefer measures when possible)
- `FactLedger` · `FactInventory` · `FactHeadcount` · `FactMaintenance`

---

## 5. Output Requirements

When exporting from Claude Design:

- Every chart must carry `data-visual` and `data-type` attributes per the conventions doc.
- Wrap each page section in `data-section`.
- Include the `<script id="data-manifest" type="application/json">` block in `<head>` with one entry per chart. Use the field reference above for `dax_hint` values.
- For chart colours inside the exported HTML, use the **neutral placeholders** specified in the conventions doc (`steelblue`, `lightsteelblue`, `#eee`, etc.) — Claude Code will swap these for `--ds-*` tokens during import. Save the DSMS palette above for the **CSS theme tokens / `global.css`**, not for the Vega specs.
- Hand back a `tokens.css` (or equivalent) with the full `--ds-*` palette as custom properties, plus typography, spacing, and radius tokens.
- Hand back one `.html` per page plus shared `global.css`. Zip and export.

---

## 6. Out of Scope (for this pass)

- Mobile / sub-1280 layouts. Design for the operations console first.
- Light theme. Dark only.
- Animations beyond hover/focus. Save motion for v2.
- Imperial March audio cues. Tempting, but no.

---

*When in doubt: build it as if the person looking at it has a fleet to run and 90 seconds to decide what to do next.*
