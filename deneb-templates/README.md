# Deneb / Vega-Lite Templates

60 reference chart templates copied from `B:\VS Code Files\Deneb-Templates\templates` (2026-06-07).

These are starting points — pick the one closest to your target chart, copy it into [`../mockups/`](../mockups/), rename to `.vl.json5` or `.jsonc`, adapt the data binding, and the watcher (`npm run mockups:watch`) will compile a live preview.

## What's here

A mix of practical and exotic chart types — bars, slopes, scatter, raincloud, hex maps, comet charts, deviation icicles, image-trail marks, redial trees, square plots, jittered scatters, lemons / balloons / floral specimens for inspiration, plus a `deneb-template-usermeta-v1.json` reference for the Deneb template envelope itself.

## Notes

- Most are pure Vega-Lite v5/v6 specs. A few (e.g. `Compact Bar Chart with Cross-Highlight and Cross-Filter.deneb.json`) include the Deneb-specific envelope with `usermeta`, `dataset` role bindings, and Power BI conditional formatting hooks.
- For use inside the Fabric App's `VegaVisual`, strip the Deneb envelope (keep only the `vega-lite` spec body) and replace `dataset` with `{ "name": "table" }` to feed it via the React data prop.
- For use inside an actual Deneb visual in Power BI Desktop, keep the envelope intact and import via the Create / Import dialog.
- See [`../design-system/spec-templates/`](../design-system/spec-templates/) for the brand-themed templates with full DATA BINDING comments — those are the production templates; the files here are the wider chart-type library.
