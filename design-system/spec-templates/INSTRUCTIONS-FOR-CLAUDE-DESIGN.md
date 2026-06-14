# Instructions for Claude Design — Fabric Apps Output Format

Paste this document into Claude Design at the start of a new project to ensure its HTML output can be automatically translated into working Vega-Lite visuals in a Microsoft Fabric App.

---

## What You Are Designing For

You are designing report pages for a **Microsoft Fabric App** — a React web application that queries Power BI semantic models and renders charts using Vega-Lite v6 via the `VegaVisual` component. Every chart on the page will be backed by a DAX query against a live semantic model.

---

## Required HTML Conventions

### 1. Annotate every chart with `data-visual` and `data-type`

Every chart/visual element must carry two HTML attributes:

```html
<div data-visual="bullet-by-product" data-type="bullet">
  <!-- chart placeholder -->
</div>
```

`data-type` must be one of: `bar` `bar-grouped` `bar-stacked` `line` `area` `sparkline` `scatter` `bullet` `kpi-card` `table` `heatmap`

### 2. Name page sections with `data-section`

Wrap logical page sections in containers with `data-section`. These become React component names.

```html
<section data-section="sales-overview">
  <!-- visuals for this section -->
</section>
```

### 3. Include a data manifest in every exported HTML file

Embed a JSON block inside a `<script id="data-manifest" type="application/json">` tag in the `<head>`. This is the machine-readable contract that Claude Code uses to scaffold DAX queries and column metadata.

```html
<script id="data-manifest" type="application/json">
{
  "page": "Sales Overview",
  "sections": ["sales-overview"],
  "visuals": [
    {
      "id": "bullet-by-product",
      "section": "sales-overview",
      "type": "bullet",
      "title": "Sales vs Budget by Product",
      "fields": [
        { "name": "product",        "type": "string",  "role": "dimension", "dax_hint": "Product[Product]" },
        { "name": "sales_total",    "type": "number",  "role": "measure",   "dax_hint": "[Sales Total]" },
        { "name": "budget_total",   "type": "number",  "role": "measure",   "dax_hint": "[Budget Total]" },
        { "name": "sales_ly",       "type": "number",  "role": "measure",   "dax_hint": "[Sales LY]" },
        { "name": "range_max",      "type": "number",  "role": "measure",   "dax_hint": "[X Axis Max Value]" }
      ]
    },
    {
      "id": "kpi-total-sales",
      "section": "sales-overview",
      "type": "kpi-card",
      "title": "Total Sales",
      "fields": [
        { "name": "metric_value", "type": "number", "role": "measure",   "dax_hint": "[Sales Total]" },
        { "name": "metric_label", "type": "string", "role": "dimension", "dax_hint": "\"Total Sales\"" }
      ]
    }
  ]
}
</script>
```

**Field rules:**
- `name` — snake_case identifier; Claude Code uses this as the Vega-Lite field name
- `type` — `string` | `number` | `date`
- `role` — `dimension` (axis/color/facet) or `measure` (quantitative value)
- `dax_hint` — the DAX table/column or measure name Claude Code should use when writing the query

---

## Visual Design Rules

### Colors
Use neutral placeholder colors only. The Fabric App applies a live theme at runtime:
- **Primary accent**: use `steelblue`
- **Secondary / comparative**: use `lightsteelblue`
- **Negative/bad**: use `#e45755`
- **Positive/good**: use `#54a24b`
- **Neutral bands/backgrounds**: use `#eee`, `#ddd`, `#ccc`

Do **not** use brand-specific hex values — they will be replaced by the app's `global.css` theme tokens.

### Sizing
Every chart must be **responsive**. Use `width: "container"` and `height: "container"` in Vega-Lite specs, and size chart containers with percentage widths + explicit heights in CSS.

### Titles
Chart titles go **outside** the Vega-Lite spec in the React card wrapper — do not put them inside the spec's `title` property. Use the `"title"` field in the data manifest for the card heading.

### Axes and labels
- Minimal axes for sparklines (hidden entirely)
- Standard axes for bar/line charts
- No redundant axis titles when the chart title already conveys the unit

---

## Vega-Lite Spec Output Format

When Claude Code requests a spec for a visual, output a `.vl.json5` file (JSON with `//` comments) using this structure:

```json5
// DATA BINDING
// field_name   : type     — role       — dax_hint
// product      : string   — dimension  — Product[Product]
// sales_total  : number   — measure    — [Sales Total]

{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": { "name": "table" },   // ← always use this; never inline values
  "width": "container",
  "height": "container",
  // ... spec body
}
```

**Critical rules for specs:**
- Always `"data": { "name": "table" }` — never `"data": { "values": [...] }`
- Always `"width": "container"` and `"height": "container"`
- No `title` property inside the spec
- Field names in `encoding` must exactly match the `name` values in the data manifest
- Use `"type": "quantitative"` for numbers, `"type": "nominal"` for strings, `"type": "temporal"` for dates

---

## Export Checklist

Before exporting the ZIP from Claude Design, verify:

- [ ] Every chart has `data-visual` and `data-type` attributes
- [ ] Every page section has `data-section`
- [ ] The `<script id="data-manifest">` block is present in `<head>` with all visuals listed
- [ ] All field `name` values are snake_case
- [ ] All `dax_hint` values reference real table/column names from the semantic model
- [ ] Colors use only the neutral palette above
- [ ] No chart has a `title` property inside its Vega-Lite spec
