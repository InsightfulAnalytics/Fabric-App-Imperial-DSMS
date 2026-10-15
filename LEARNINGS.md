# Learnings — Hard-Won Gotchas from Previous Fabric Apps

Things that cost real time on the Sparklines / Bullet projects. Read this **before** you start fighting Vega-Lite, the Fabric CLI, or DAX discovery — the obvious-looking trap probably already burned someone.

---

## DAX & Semantic Model Discovery

### `INFO.MEASURES()` requires write access — use `INFO.VIEW.*` for read-only discovery

```dax
-- ❌ Fails with "Failed to execute the DAX query" if you're a Reader/Viewer
EVALUATE INFO.MEASURES()

-- ✅ Works for any role
EVALUATE INFO.VIEW.MEASURES()
EVALUATE INFO.VIEW.TABLES()
EVALUATE INFO.VIEW.COLUMNS()
```

The `INFO.VIEW.*` family is the read-only counterpart and returns only a subset of columns (notably no `Expression` — you can't introspect measure DAX without write access).

---

## TMDL Authoring

### A `///` description comment must attach directly to an object — no blank line after it

Triple-slash lines in TMDL are **descriptions**, not free comments: the parser binds them to the *next* object (measure/column/table). A standalone `///` banner followed by a blank line is a "dangling description" and PBI Desktop refuses to open the project:

```
TMDL Format Error: Unexpected line type: Empty!
Document - './tables/Measure Table'  Line Number - 635
```

```tmdl
    // ❌ breaks file-open — blank line orphans the description
    /// ============ NARRATIVE & RISK PACK ============

    /// Countdown to the Battle of Yavin.
    measure 'Days to Battle of Yavin' = ...

    // ✅ every /// line sits immediately above the measure it describes
    /// NARRATIVE & RISK pack (lineage d3000000-*).
    /// Countdown to the Battle of Yavin.
    measure 'Days to Battle of Yavin' = ...
```

Blank lines *between* finished objects (after a `lineageTag`, before the next `///`) are fine — it's only a blank line **after a `///` and before its object** that's illegal. Note `////` (4+ slashes) inside a ```` ``` ```` expression block is just a DAX comment and is unaffected.

**Validate without Power BI Desktop:** load the model headlessly in Tabular Editor 2 (same TMDL deserializer) — if it reaches script execution, the TMDL parsed:
```bash
"C:\Program Files (x86)\Tabular Editor\TabularEditor.exe" \
  "PBI/<model>.SemanticModel/definition/model.tmdl" -S validate.csx
# "Loading model..." -> "Executing script" == deserialized OK
```

### LY / period-shift comparisons — inline `CALCULATE` beats stored measures

If your date table is properly marked and you only need vs-LY for one query, **don't ask the user to add stored `[X LY]` measures**. Inline the calculation:

```dax
EVALUATE
SUMMARIZECOLUMNS(
    DimDate[Year],
    DIM_Customers[Country],
    "Revenue", [Revenue],
    "RevenueLY", CALCULATE([Revenue], SAMEPERIODLASTYEAR(DimDate[Date]))
)
```

Adds zero round-trips for the user (no PBIP republish) and keeps the variance logic local to the query that needs it.

### Aggregating ratios on the client — need numerator AND denominator

For correct weighted averages across selected filters, don't query the derived measure — query the components and divide on the client. Otherwise you get `sum(GP%)` not `sum(GP)/sum(Revenue)`.

```ts
// Wrong: averaging per-country GP% gives the unweighted mean
const gpPct = countries.reduce((s, r) => s + r.gpPct, 0) / countries.length;

// Right: aggregate from components
const gpPct = sumGP / sumRevenue;
```

Same pattern for AOV: query `Revenue` + `Volume`, then `aov = sumRevenue / sumVolume`. Never sum `[Average Order Value]` directly.

---

## Vega-Lite Specs

### Ordinal sort by a string array often fails — use a numeric field + `labelExpr`

This **looks like it should work** but Vega-Lite ignored it for the Sparklines line chart and the x-axis sorted alphabetically (Apr, Aug, Dec, Feb, Jan, …):

```ts
// ❌ Looks right, didn't sort
x: { field: "monthShort", type: "ordinal", sort: ["Jan", "Feb", ..., "Dec"] }
```

The bulletproof fix is to use the **numeric** `monthOfYear` field directly (ordinal scales sort numerically by default for numeric data) and re-label the ticks with `labelExpr`:

```ts
x: {
    field: "monthOfYear", type: "ordinal",
    axis: {
        labelExpr: "['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][datum.value]",
        // ...
    },
}
```

This also avoids the `sort: { field, op: "min" }` rabbit hole — same fix works for any "string label sorted by a hidden numeric" axis.

### Multi-series tooltip — `tooltip` encoding alone gets overridden

For a line chart with multiple series and inline `point: true`, Vega's nearest-x default tooltip kicks in and shows ALL series at once with raw field names. Your custom `tooltip: [...]` on the layer is **silently ignored**.

The fix is the canonical multi-series tooltip pattern: add an **invisible wide rule layer** with a `pivot` transform that owns the tooltip:

```ts
{
    transform: [
        { pivot: "businessLine", value: "revenueLabel", groupby: ["monthOfYear", "monthShort"] }
    ],
    mark: { type: "rule", opacity: 0, strokeWidth: 32 },
    encoding: {
        color: { value: "transparent" },
        tooltip: [
            { field: "monthShort", title: "Month" },
            ...seriesNames.map(name => ({ field: name, title: name })),
        ],
    },
}
```

The rule is invisible but its hover region is 32px wide so it picks up cursor events across the whole chart. Series names are passed in from React (`Array.from(byLine.keys())`) — don't hardcode.

### Pre-format tooltip values in JS, not d3-format SI suffixes

`format: "$,.2s"` auto-picks SI suffixes — you get a mix of `$420k` and `$1.2M` in the same tooltip. For consistent millions/thousands formatting, **pre-compute a string column** in the React data table:

```ts
const fmtMillions = (v: number) => "$" + (v / 1_000_000).toFixed(2) + "M";

// Data table
{ columns: [..., { name: "revenueLabel" }], rows: [..., fmtMillions(r.revenue)] }

// Tooltip references the string field
tooltip: [{ field: "revenueLabel", title: "Revenue" }]
```

The d3-format `~s` notation is the wrong tool when the user said "in millions" — it's a "smart" notation that *won't* stay in millions.

### `VegaVisual`'s SVG output cannot resolve `var(--ds-*)` — hardcode chart colors

CSS variables work fine in DOM nodes but Vega writes the resolved SVG and CSS vars become empty strings. Inside any Vega spec, use literal hex values:

```ts
// ❌ "color is not a valid CSS color" or just renders nothing
color: "var(--ds-blue-700)"

// ✅
const BLUE_700 = "#1F4E8C";
mark: { type: "bar", color: BLUE_700 }
```

Keep a small palette object at the top of the page module that mirrors the design tokens so you only maintain the values in one place per page.

### Theming bridge — `--color-brand` must be in `@theme static`

`VegaVisual` and `DataGrid` call `useCssTheme()` which reads `--color-brand` at runtime. If you only set it via `@theme { … }`, Tailwind tree-shakes it out when no utility consumes it and the chart loses its primary color.

```css
@theme static {
  --color-brand: #1F4E8C;
  --color-brand-foreground: #1F4E8C;
  --color-hover: #F1F6FC;
}
```

### Card/container clipping eats your axis labels

If a `ChartCard` body uses `overflow: hidden` plus a fixed `height`, Vega's bottom axis labels disappear silently. Switch to `minHeight` and let the chart's natural SVG size determine the container — the card grows to fit:

```tsx
// Trap
<div style={{ padding: 16, height: bodyHeight, overflow: "hidden" }}>

// Fix
<div style={{ padding: 16, minHeight: bodyMinHeight }}>
```

### KPI card layout — use absolute pixel positions, prefer Vega for the spec

KPI cards with a label, big value, and a conditionally-coloured pill are well-suited to Vega-Lite layered text/rect marks with literal pixel coordinates (`x: { value: 0 }, y: { value: 30 }`). Pre-format the metric value as a string (`nominal` type) so each card can choose its own currency / percent format without baking d3-format codes into the spec.

---

## Sparkline Component

When reusing the Sparkline across pages with different value scales:

- Add a `labelTitle?: string` prop (default `"Period"`) so each consumer can rename the tooltip x-axis label without breaking others
- Add a `tooltipFormat?: (value: number) => string` prop — if supplied, pre-compute a `valueTip` string in the data table and reference that as a `nominal` field in the tooltip. Avoids the d3-format mixed-units problem entirely.

---

## Fabric CLI / Rayfin

### `NODE_OPTIONS='--use-system-ca'` is required for every npm/npx call

```powershell
$env:NODE_OPTIONS='--use-system-ca'
```

Without this, the Fabric SDK's HTTPS requests fail certificate validation against corporate-CA-signed endpoints.

### AVG Web/Mail Shield HTTPS scanning breaks `query`, `add --from-url`, and `rayfin up`

If you get TLS errors despite the NODE_OPTIONS above, AVG is MITM-ing the HTTPS connection. Disable Web/Mail Shield (or whitelist the Fabric endpoints) before running the affected commands.

### `fabric-app-data query` syntax

```powershell
# ❌ Wrong — "too many arguments for 'query'"
npx fabric-app-data query starwars --query "EVALUATE ..."

# ✅ Right
npx fabric-app-data query semanticModel starwars -q "EVALUATE ..."
npx fabric-app-data query semanticModel starwars -f path/to/query.dax
```

The CLI expects `<sourceType> <alias>` positionals; query text goes in `-q` or a file in `-f`.

### Enabling the data service (writeback) on a project scaffolded WITHOUT it

The `imperial-dsms` app was created with `data: { enabled: false }`, so it lacked the
whole data-service scaffold. Turning on writeback (a Fabric SQL Database via DAB
GraphQL) needed **five** edits the template would otherwise have generated — miss any
one and `rayfin up` / `db apply` fails with a cryptic error:

1. **`rayfin.yml` needs a dialect.** `data: { enabled: true }` alone → `rayfin up`
   fails `400 … Dialect is required when Data module is enabled`. Add `dialect: mssql`
   (Fabric SQL DB is T-SQL).
2. **`rayfin/tsconfig.json` must exist.** Without it, `db apply` prints
   "TypeScript compilation successful" then `❌ No rayfin/.temp/compiled/data/*.js files
   found`. Copy the template's: `extends ../tsconfig.json`, `outDir .temp/compiled`,
   `composite: true`, `noEmit: false`, `module/moduleResolution: nodenext`.
3. **Root `tsconfig.json` must reference it:** `"references": [{ "path": "./rayfin" }]`.
4. **Distinct `tsBuildInfoFile`.** Our root tsconfig sets `tsBuildInfoFile`; `rayfin`
   `extends` it and inherits the *same* path → `tsc -b` fails **TS6377** ("will overwrite
   .tsbuildinfo generated by referenced project"). Override it in `rayfin/tsconfig.json`
   (e.g. `".temp/rayfin.tsbuildinfo"`).
5. **`rayfin/data/schema.ts` needs a runtime array, not just a type.** The CLI discovers
   entities from `export const schema = [BudgetAdjustment]` (value import of the class) —
   a type-only `export type AppSchema = {...}` compiles but registers nothing.

Deploy order: `npx rayfin up` (provisions the SQL DB child item + applies settings +
static) — it runs the schema apply itself; if that step fails, fix the above and re-run
`npx rayfin up db apply`. The standalone `db apply` is **remote-only** and needs the
compiled artifacts to already exist.

### UUID primary keys have NO `DEFAULT NEWID()` — supply `id` client-side on create

The docs claim "the server generates a UUID if you omit `id`." **Not true here.** Rayfin's
DDL only emits a column default when the decorator sets one (`@uuid({ default: … })`), and
`@uuid() id` doesn't — so the column is `UNIQUEIDENTIFIER NOT NULL` with no default and a
`create()` that omits `id` fails the PK constraint. The DAB client *catches nothing* for
you, so a `try/catch` around the mutation swallows it and the row silently never lands
(table stays empty, the draft "won't post"). Fix: pass your own id.

```ts
await api.BudgetAdjustment.create({ id: crypto.randomUUID(), year, /* … */ });
```

Corollary: **never let a writeback `catch` be silent** — surface the error in the UI and
`console.error` it. A "nothing happens on click" write bug is otherwise invisible.

✅ **Confirmed end-to-end** on the Budget Planning page: with a client-supplied `id`, the
row lands in `dbo.BudgetAdjustments` and re-reads correctly. This also clears the two
things you might otherwise suspect — both are fine:

- **`postedAt` as an ISO-8601 string** (`new Date().toISOString()`, trailing `Z`) is
  accepted by the `DATETIME2` column. No need to strip the `Z` or pass a `Date` object.
- **`@authenticated('*')` writes** succeed under the app's Fabric brokered session — the
  data client (`getRayfinClient().data`) shares the same authenticated `RayfinClient`
  singleton that `initEmbeddedAuth(client.auth, …)` signs in, so `.data` calls carry the
  user token automatically. Auth is *not* the thing to chase when a write fails; check the
  PK/`id` first.

---

## Project Workflow

### Single-DAX-file pattern for queries

Each visual gets a triplet under `src/queries/<domain>/`:
- `<name>.dax` — the raw DAX
- `<name>.json` — the Vega-Lite spec
- `<name>.ts` — factory exporting `{ connection, query, columnMetadata, vegaLiteSpec }`

The factory is where you parameterize the spec or the query (e.g. take a `categories?: string[]` and inject a `FILTER` clause). Components consume the factory function, not the raw files.

### Mockups → wire-spec → production

1. Hand-author a `.vl.json5` (or `.jsonc`) in `mockups/` using inline preview data
2. `npm run mockups:watch` compiles each to `mockups/.preview/<name>_nc.vl.json` for Vega Viewer
3. Once the spec looks right, `npm run wire-spec -- mockups/<name>.vl.json5 --domain <d> --name <n>` scaffolds the `.dax`/`.ts`/`.json` triplet
4. Fill in the DAX and the `columnMetadata` keys from a CLI query output

### Claude Design handoff

For a Claude Design HTML/CSS prototype:
1. Save the export ZIP anywhere on disk
2. `npm run import-design -- --zip "path/to/export.zip"` extracts to `design-imports/<name>/` and generates a `manifest.json`
3. Process the manifest: each `<script id="data-manifest">` visual becomes a mockup spec + DAX query
4. See `design-system/HANDOFF-CONTEXT.md` for the full copy-paste block

---

## Misc UI gotchas

- **Table layout for matrices**: `tableLayout: "fixed"` with explicit `width` on every `<th>` is the only reliable way to control column widths. Mix pixel and percent widths cautiously.
- **Tweaking column positions**: instead of resizing columns, often easier to add `paddingLeft`/`paddingRight` to the `<td>` (and the matching `<th>`) — pushes content within the column without breaking layout math.
- **`replace_all` for code edits respects indentation**: if the same line appears at two different indent levels (e.g. per-row vs total-row cells), the `old_string` only matches one. Always grep after a `replace_all` to confirm both got hit.
- **Vega tooltip multi-series workarounds break with `params: { name: "hover", … }`** — re-rendering the same selection name triggers "Duplicate signal name: hover_tuple". The invisible-rule + pivot pattern above is selection-free and side-steps this.
