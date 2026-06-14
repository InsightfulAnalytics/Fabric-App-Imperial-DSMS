Signed period-over-period change with a directional arrow, coloured by signal. Set `invert` for metrics where down is good (expenses, combat losses).

```jsx
<DeltaIndicator value={0.064} deltaLabel="YoY" />
<DeltaIndicator value={-0.023} invert /> {/* expenses down → green */}
```

Props: `value` (fraction for percent), `format` (`percent`/`number`/`none`), `invert`, `size`.
