# Add-on Brief — Budget Performance for Imperial DSMS

Paste this into **Claude Design** *after* the existing DSMS handoff project, as a follow-up. It is incremental — the dark Imperial design system, components, and the four already-built Fabric Console screens stay in place. This brief asks for **one new screen plus a handful of supporting tiles** that take advantage of model changes we shipped after the first pass.

The original brief lives at `design-system/DESIGN-BRIEF.md`; the output conventions are at `design-system/spec-templates/INSTRUCTIONS-FOR-CLAUDE-DESIGN.md`. Both still apply.

---

## 1. What changed in the model

Three substantive changes since the first design pass:

### a) Income is now Subsidy-only

The Death Star has no organic revenue. The original ledger included five narrative "income" line items (Tribute, Levies, Seizures, Internal Cross-Charges, Salvage) — those have been **removed**. The chart of accounts is now 1 income line (Imperial Treasury Subsidy) + 25 expense lines.

- `[Total Income]` now equals `[Imperial Subsidy]` numerically.
- The new preferred name in reporting is **`[Subsidy Income]`** (alias for clarity of intent).
- Conceptually: the Empire wires a subsidy each month; that's the only credit DSMS ever sees.

### b) Subsidy is allocated to departments via a cost driver

`DimDepartment` no longer carries a static `AnnualBudgetCredits` column. Instead each department has a **`CostDriverWeight`** (dimensionless integer). The new measure **`[Department Subsidy Allocation]`** apportions the total Treasury subsidy across departments by `weight / SUM(weight)`. The "Station-Wide (Unallocated)" dept (key 25) has weight 0 and gets no allocation.

### c) Budgets are now a fact table

New table **`FactBudget`** at grain = Department × Month (1,728 rows: 24 depts × 6 years × 12 months). Two amounts per row:

- `IncomeBudgetCredits` — budgeted allocated subsidy
- `ExpenseBudgetCredits` — budgeted expenses

Budgets are calibrated against actuals so the **annual variance per department is within roughly ±15%** in both directions, for both income and expenses. Monthly variance is wider.

## 2. New measures available

Add these to the `dax_hint` reference (all live in `Measure Table`):

| Measure | Purpose |
|---|---|
| `[Subsidy Income]` | Canonical income — alias of `[Imperial Subsidy]` |
| `[Department Subsidy Allocation]` | Allocated share of subsidy per dept (uses `CostDriverWeight`) |
| `[Income Budget]` | `SUM(FactBudget[IncomeBudgetCredits])` |
| `[Expense Budget]` | `SUM(FactBudget[ExpenseBudgetCredits])` |
| `[Income Variance]` | Allocation − Income Budget (positive = good) |
| `[Income Variance %]` | `[Income Variance] / [Income Budget]` |
| `[Expense Variance]` | Total Expenses − Expense Budget (positive = bad) |
| `[Expense Variance %]` | `[Expense Variance] / [Expense Budget]` |
| `[Net Surplus vs Budget]` | Actual net minus budgeted net |

New column on the dimension side:

- `DimDepartment[CostDriverWeight]` — integer per department, used as the apportionment key.

## 3. New screen to design — **Budget Performance**

Add this as a **sixth navigation item** in the sidebar rail, between "Operations Command" and "Supply Chain" (icon: `target` or `gauge`). Same chrome as the existing screens: top bar with breadcrumb (`Finance · Budget`), year slicer, page void with grid texture.

### Hero KPIs (strip across the top, six tiles, same `KpiTile` component)

1. **Subsidy Income** — period total, YoY delta, 12-month sparkline.
2. **Total Expenses** — same shape, `invertDelta` so rising expenses read red.
3. **Income vs Budget %** — actual subsidy as % of income budget.
4. **Expense vs Budget %** — actual expenses as % of expense budget, `invertDelta`.
5. **Depts within ±5% on expenses** — count out of 24. Quick health gauge.
6. **Depts over budget on expenses** — count out of 24, red if > 6.

### Hero visual — **Variance scatter**

A 2-D scatter, one dot per department, sized by `[CostDriverWeight]`.

- **X axis**: `[Income Variance %]` — left = under-funded, right = over-funded.
- **Y axis**: `[Expense Variance %]` — bottom = under-spent, top = over-spent.
- **Quadrant gridlines** at 0/0, with quadrant labels:
  - Top-right: *"Got more, spent more"*
  - Top-left: *"Crisis"* — paint this quadrant background `--ds-signal-negative-dim`
  - Bottom-right: *"Surplus"* — `--ds-signal-positive-dim`
  - Bottom-left: *"Austere"*
- ±15% bands as dashed reference lines on both axes.
- Hover: dept name, division, weight, both variance %s, allocated income, actual expenses.

This is the screen's story-telling visual — one glance tells command who's on track and who isn't.

### Secondary block — **Bullet chart matrix**

Two columns of bullet charts, 12 rows visible (scrollable to 24). Each row = one department, two bullets side by side:

- **Income bullet**: actual `[Department Subsidy Allocation]` vs `[Income Budget]` target marker, ±15% qualitative bands behind the bar.
- **Expense bullet**: actual `[Total Expenses]` vs `[Expense Budget]` target marker, same band shape.

Bar fill colour follows the variance direction (green when good, red when bad). Sort by `[Expense Variance %]` descending so the worst offenders bubble up.

### Tertiary block — **Cost driver treemap**

Each department a rectangle sized by `[CostDriverWeight]`, coloured by `[Net Surplus vs Budget]` (diverging red↔green centred on zero). Labels: dept name, allocation in credits. One look = "who gets the most subsidy, and are they spending it well?"

### Detail block — **Monthly variance ribbon** (for selected dept or all)

A small-multiples band chart: one row per division group, x = month, y = `[Expense Variance %]`. Line in the middle, ±15% shaded band behind. Spikes outside the band are immediately visible.

If selecting a single department, replace with that department's full 12-month timeline: income actual vs budget (one chart), expense actual vs budget (one chart), as overlaid line + columns.

---

## 4. Optional tiles to add to the **existing** Executive Briefing screen

If room allows on the briefing page, add one or both:

- **Subsidy Coverage gauge** — replace the existing one with `[Subsidy Income] / [Total Expenses]` (the variance is now ~99%, swings month-to-month). Threshold tick at 100%, red below 90%.
- **Budget compliance pill row** — three small status pills showing "On Budget", "At Risk (>±10%)", "Off Budget (>±15%)" with the count of depts in each bucket for the current year.

These are optional. Don't redesign the briefing screen.

---

## 5. Out of scope (still)

- Light theme.
- Sub-1280 layouts.
- Touch interactions.
- Forecasting / projections.
- "What would it cost to deliver budget?" scenario panels.

---

## 6. Output requirements (unchanged)

Follow [`INSTRUCTIONS-FOR-CLAUDE-DESIGN.md`](./spec-templates/INSTRUCTIONS-FOR-CLAUDE-DESIGN.md):

- `data-visual` and `data-type` on every chart.
- `data-section` on each section wrapper.
- `<script id="data-manifest">` in `<head>` listing every visual with the `dax_hint` values from §2 above.
- Neutral chart placeholder colours inside Vega specs (`steelblue`, `lightsteelblue`, `#e45755`, `#54a24b`, `#eee`); the runtime swaps these for `--ds-*` tokens during import.
- Hand back: one `.html` per new/changed screen, plus any additions to `global.css` (the `--ds-*` palette already covers what you need — only add tokens if a new visual type genuinely requires one).

---

*The story for this pass: subsidy in, allocated by cost driver, spent (or not) per budget. Show the variance, surface the outliers, let an officer make a decision in 90 seconds.*
