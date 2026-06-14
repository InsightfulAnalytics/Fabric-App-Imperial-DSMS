# Add-on Brief — Headcount & Payroll Budget for Imperial DSMS

Paste this into **Claude Design** *after* the existing DSMS handoff and the Budget Performance add-on. It is incremental — chrome, tokens, and the existing Fabric Console screens stay in place. This brief asks for **one new headline KPI panel** (the "Workforce Briefing" tile cluster) plus a supporting workforce screen that drills in.

The original brief lives at `design-system/DESIGN-BRIEF.md`; the prior follow-up at `design-system/BUDGET-ADDITIONS-BRIEF.md`. Output conventions are still at `design-system/spec-templates/INSTRUCTIONS-FOR-CLAUDE-DESIGN.md`.

---

## 1. What changed in the model

One substantive change since the Budget Performance pass:

### Headcount is now planned and budgeted

There is a new fact table **`FactBudgetHeadcount`** at grain = Month × Department × Role (8,208 rows: 24 depts × ~17 active roles × 72 months — sparse, only role/dept pairs that appear in actuals are budgeted). Three amounts per row:

- `BudgetedHeadcount` — planned heads for that dept/role in that month
- `BudgetedAvgMonthlyPayCredits` — planned per-head monthly pay rate (do not sum; use the measure)
- `BudgetedPayrollCostCredits` — pre-computed product `BudgetedHeadcount × BudgetedAvgMonthlyPayCredits`, additive

Budget is set annually as a planning baseline (held flat across the 12 months of each year) and calibrated against actuals so:

- **Annual headcount variance per dept/role stays within roughly ±12%**
- **Annual average-pay variance stays within roughly ±5%**

Monthly swings in headcount (combat losses, hiring waves) drive nearly all of the actual variance. Pay rates barely move.

Relationships are the standard star — `FactBudgetHeadcount` joins `DimDate.DateInt`, `DimDepartment.DepartmentKey`, `DimRole.RoleKey` exactly like `FactHeadcount` does.

## 2. New measures available

Add these to the `dax_hint` reference (all live in `Measure Table`, folder `Headcount\Budget vs Actual`):

| Measure | Purpose |
|---|---|
| `[Budgeted Headcount]` | `SUM(FactBudgetHeadcount[BudgetedHeadcount])` |
| `[Headcount vs Budget]` | `[Total Headcount] − [Budgeted Headcount]` — positive = over plan |
| `[Headcount vs Budget %]` | `[Headcount vs Budget] / [Budgeted Headcount]` |
| `[Budgeted Avg Monthly Pay]` | Weighted: `SUM(BudgetedPayrollCostCredits) / SUM(BudgetedHeadcount)` |
| `[Budgeted Payroll Cost]` | `SUM(FactBudgetHeadcount[BudgetedPayrollCostCredits])` |
| `[Payroll Cost vs Budget]` | `[Payroll Cost] − [Budgeted Payroll Cost]` — positive = over budget (bad) |
| `[Payroll Cost vs Budget %]` | `[Payroll Cost vs Budget] / [Budgeted Payroll Cost]` |

The existing `[Total Headcount]`, `[Payroll Cost]`, `[Headcount Last Year]`, `[Headcount Variance to LY]`, `[Headcount Var to LY %]`, `[Combat Losses]`, `[Attrition %]` are unchanged and re-organised into folder `Headcount\Actuals` / `Headcount\Year over Year`.

### Also: the measure model is now folder-organised

All measures in the model now carry a `displayFolder` so the field pane is tidy. The folder tree is:

```
Financials
  Actuals            — Total Income, Total Expenses, Net Surplus, Imperial Subsidy, Subsidy Income, Operating Margin %, Subsidy Coverage %
  Allocation         — Department Subsidy Allocation
  Budget vs Actual   — Income Budget, Expense Budget, Income Variance, Income Variance %, Expense Variance, Expense Variance %, Net Surplus vs Budget
  Year over Year     — Expenses YoY %
Headcount
  Actuals            — Total Headcount, Combat Losses, Attrition %
  Payroll            — Payroll Cost
  Year over Year     — Headcount Last Year, Headcount Variance to LY, Headcount Var to LY %
  Budget vs Actual   — (the seven new measures above)
Operations
  Inventory          — Inventory Value, Stockout Lines
  Maintenance        — Work Orders, Open Work Orders, Total Downtime Hrs, Repair Cost
Time Intelligence
                     — Dates Selected
```

When labelling field-list affordances in mockups, use these folder paths.

---

## 3. New panel to design — **Workforce Briefing** (headline KPI cluster)

This is the priority deliverable. **Match the layout pattern of the Net Surplus briefing tile that already ships on the Executive Briefing screen** (reference screenshot attached separately — the four-quadrant card with the trailing-twelve-months hero, the income/expense ladder, the monthly bars and the "Where Expenses Go" stacked allocation). The composition is the same — only the data changes.

Place this on the **Executive Briefing** screen, replacing the second-row right-hand panel (or stacked beneath the Net Surplus tile if the row already feels full). Same `BriefingPanel` chrome, same dark surface, same eyebrow/value/delta typography.

### Quadrant layout (single tile, four cells, ~720 × 320)

```
┌───────────────────────────────────┬─────────────────────────────────────┐
│ HEADCOUNT · CURRENT MONTH         │ + Budgeted Headcount   ↗ +x.x% Bud  │
│                                   │   1.42M                ↗ +x.x% YoY  │
│   1.38M                           │                                     │
│ STATION COMPLEMENT                │ − Actual Payroll       ↘ −x.x% Bud  │
│                                   │   ¢ 7.42B              ↗ +x.x% YoY  │
│ VS BUDGET    │ VS LAST YEAR       │                                     │
│ ↘ −38K       │ ↗ +12K             │                                     │
├───────────────────────────────────┼─────────────────────────────────────┤
│ HEADCOUNT ACTUAL VS BUDGET · MTH  │ WHERE PAYROLL GOES                  │
│ ▁▂▃▃▄▄▅▅▆▆▇█  (12 bars, paired or │ ████ ▓▓▓ ░░░ ▒▒                     │
│ overlapped: actual filled, budget │ Officers ¢ 1.8B  Troopers ¢ 2.4B    │
│ outlined)                         │ Technicians ¢ 1.6B  Support ¢ 0.9B  │
└───────────────────────────────────┴─────────────────────────────────────┘
```

### Cell-by-cell spec

**Top-left — Workforce hero (~50% width)**

- Eyebrow: `HEADCOUNT · CURRENT MONTH` (or `TRAILING TWELVE MONTHS` if you want to match the Net Surplus panel exactly — pick one consistent framing).
- Hero value: `[Total Headcount]` for the selected period.
  - Format: compact with `K` / `M` suffix (1,381,402 → `1.38M`). Colour `--ds-signal-positive` if `[Headcount vs Budget] >= 0`, else `--ds-text-primary` (don't paint understaffing red — that's not necessarily bad).
- Sublabel under hero: `STATION COMPLEMENT` (caps, muted, `--ds-text-muted`).
- Two stacked mini-stats at the bottom (same shape as the Net Surplus tile's *VS BUDGET / VS LAST YEAR* pair):
  - `VS BUDGET` → `[Headcount vs Budget]`, compact format, with arrow.
  - `VS LAST YEAR` → `[Headcount Variance to LY]`, compact format, with arrow.
- Arrow colour rules:
  - Headcount delta arrows are **neutral by default** (`--ds-text-primary`). Tint green only if the headcount delta moves *toward* budget; tint red only if it moves *away* from budget by more than 5%. The story isn't "more heads = good" — it's "are we on plan".

**Top-right — Budget / Payroll ladder (~50% width)**

Two rows stacked, same ladder pattern as the existing `+ Total Income / − Total Expenses` block:

- Row 1: `+ Budgeted Headcount` — value = `[Budgeted Headcount]`, compact format. Right-side deltas:
  - `[Headcount vs Budget %]` labelled `Act` (or `Var` — use whatever matches the existing tile)
  - `[Headcount Var to LY %]` labelled `YoY`
- Row 2: `− Actual Payroll` — value = `[Payroll Cost]`, compact `¢` format. Right-side deltas:
  - `[Payroll Cost vs Budget %]` labelled `Bud`, **`invertDelta`** — over budget reads red
  - YoY equivalent of payroll (we don't ship a measure for this yet; in the mockup show it as a placeholder labelled `YoY` and the data binder will compute or skip it)

Arrow logic for this cell follows the income/expense ladder rules: revenue-shaped quantities (Budgeted Headcount, framed as the plan) read positive on rises; cost-shaped quantities (Actual Payroll) read negative on rises.

**Bottom-left — Headcount actual-vs-budget by month**

- A 12-bar monthly chart, one bar pair per month (Jan–Dec of selected year).
- Two encodings, pick the cleaner one:
  - **Option A (preferred):** filled bar = `[Total Headcount]`, outlined ghost bar overlaid behind = `[Budgeted Headcount]`. Single colour `--ds-chart-1` for actuals.
  - **Option B:** clustered pair, budget on left in `--ds-chart-2-muted`, actual on right in `--ds-chart-1`.
- Eyebrow: `HEADCOUNT ACTUAL VS BUDGET · BY MONTH`.
- No axis labels in the tile-sized version; tooltip carries the values.

**Bottom-right — "Where Payroll Goes" stacked allocation**

- Single horizontal stacked bar, full width of the cell, broken out by `DimRole[RoleType]`.
- Categories (in the model): Officer, Trooper, Enlisted, Technician, Specialist, Support, Droid, Contractor.
- Show the top 4 by `[Payroll Cost]` as labelled segments; remaining roll up into one muted `Other` segment.
- Below the bar, a 2-column legend grid showing the four named segments with their credit amounts in `¢` compact format. Match the Expenses tile exactly — same chip shape, same legend density.
- Eyebrow: `WHERE PAYROLL GOES`.
- Colour ramp: `--ds-chart-1` through `--ds-chart-4` for the four named segments; `--ds-text-muted-bg` for `Other`.

### Currency / number formatting recap

- Credits headline values → `¢ <compact>` (e.g. `¢ 1.28B`, `¢ 776M`).
- Headcount headline → bare compact (`1.38M`, `47K`).
- Delta absolute values use the same compact pattern with a leading sign and currency where appropriate (`+¢ 0.07B`, `−38K`).
- Delta % values → one decimal, leading sign (`+2.0%`, `−1.7%`).

---

## 4. Supporting screen — **Workforce** (sidebar item #7)

The KPI panel above lives on the Executive Briefing. The full workforce screen sits behind it as a drill destination.

Add as a **seventh navigation item** in the sidebar rail, between "Budget Performance" and "Supply Chain" (icon: `users` or `id-card`). Standard chrome: top bar breadcrumb `People · Workforce`, year + division slicers in the toolbar.

### Hero KPI strip (six tiles)

1. **Total Headcount** — period total, YoY delta, 12-month sparkline.
2. **Budgeted Headcount** — same shape, ghost sparkline (dashed) for budget vs actual.
3. **Headcount vs Budget %** — actual/budget ratio − 1.
4. **Payroll Cost** — period total, YoY delta, sparkline.
5. **Payroll Cost vs Budget %** — `invertDelta` so over-budget reads red.
6. **Attrition %** — existing measure, narrative context.

### Hero visual — **Department × Role variance heatmap**

A 24 × 18 grid (departments down, roles across — only cells where the dept/role pair is budgeted). Cell fill = `[Headcount vs Budget %]` on a diverging red↔green ramp centred at 0, with ±12% endpoints saturating. Cell label = the absolute `[Headcount vs Budget]` (compact). On hover: full tooltip with both HC and payroll variance.

This is the screen's diagnostic visual — one glance shows which dept-role combinations are over- or under-staffed against plan.

### Secondary — **Workforce composition stacked bars**

Two stacked horizontal bars, one above the other:

- **Budgeted composition** — one bar, segmented by `RoleType`, length = `[Budgeted Headcount]`.
- **Actual composition** — one bar, same segmentation, length = `[Total Headcount]`.

Aligned baselines, identical scales. The shift in segment widths between the two bars tells the composition story: "we're under-staffed on Technicians and over-staffed on Troopers".

### Detail — **Payroll waterfall: Budget → Actual**

A standard waterfall starting at `[Budgeted Payroll Cost]`, with one ± bar per `DivisionGroup` showing its `[Payroll Cost vs Budget]` contribution, ending at `[Payroll Cost]`. Positive bars in `--ds-signal-negative-dim` (over budget); negative bars in `--ds-signal-positive-dim` (under budget).

### Detail — **Headcount budget vs actual monthly trend**

Full-width line chart, two series:

- Solid line = `[Total Headcount]` in `--ds-chart-1`.
- Dashed line = `[Budgeted Headcount]` in `--ds-chart-1-muted`.

Optional shaded band between the lines, tinted by sign (positive variance → green wash, negative → red wash, opacity 0.15).

---

## 5. Out of scope (still)

- Light theme.
- Sub-1280 layouts.
- Touch interactions.
- Forecasting / projections / what-if hiring scenarios.
- Per-individual employee detail (the model is at role grain, not person grain).

---

## 6. Output requirements (unchanged)

Follow [`INSTRUCTIONS-FOR-CLAUDE-DESIGN.md`](./spec-templates/INSTRUCTIONS-FOR-CLAUDE-DESIGN.md):

- `data-visual` and `data-type` on every chart.
- `data-section` on each section wrapper.
- `<script id="data-manifest">` in `<head>` listing every visual with the `dax_hint` values from §2 above (use the full `Headcount\Budget vs Actual\Budgeted Headcount` folder path in tooltips/labels if you reference the folder tree).
- Neutral chart placeholder colours inside Vega specs (`steelblue`, `lightsteelblue`, `#e45755`, `#54a24b`, `#eee`); the runtime swaps these for `--ds-*` tokens during import.
- Hand back: one `.html` for the updated Executive Briefing (with the new Workforce panel slotted in), one `.html` for the new Workforce screen, plus any additions to `global.css` (only add tokens if a new visual type genuinely requires one — the existing `--ds-chart-*` and `--ds-signal-*` palette should cover everything here).

---

*The story for this pass: budgeted heads × planned pay = projected payroll. Compare to actuals. Surface the dept-role cells that are drifting, and let an officer see at one glance whether the station is under- or over-manned and where the credits are leaking.*
