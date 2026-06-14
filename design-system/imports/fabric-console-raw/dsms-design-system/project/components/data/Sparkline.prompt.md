Compact SVG trend line with area fill, optional green-max / red-min dots and an end-value label. Pure SVG, no deps — use inline in tiles and table cells.

```jsx
<Sparkline data={[12,14,13,18,17,21,24]} width={120} height={36} />
<Sparkline data={series} color="var(--ds-signal-positive)" showEndLabel />
```

Props: `data` (numbers), `width`/`height`, `color`, `showDots`, `showEndLabel`, `zero` (baseline at 0).
