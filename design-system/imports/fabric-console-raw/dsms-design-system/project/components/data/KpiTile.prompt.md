The signature briefing tile: ALL-CAPS eyebrow, large mono value, YoY delta, optional 12-month sparkline. Use across the KPI strip at the top of a page.

```jsx
<KpiTile label="Net Surplus" value="₡ 1.28B" delta={0.064}
         sparkData={[8,9,11,10,13,16,18]} accent />
<KpiTile label="Total Expenses" value="₡ 9.10B" delta={-0.021} invertDelta
         deltaLabel="YoY" sparkColor="var(--ds-signal-warning)" sparkData={exp} />
```

Props: `label`, `value` (preformatted string), `delta` (fraction), `invertDelta`, `sparkData`, `accent` (imperial stripe).
