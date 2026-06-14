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
