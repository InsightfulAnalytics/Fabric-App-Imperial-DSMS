Compact status / risk tag for vendor Risk Rating, work-order status, stock status. Soft tint by default; `solid` for the loudest critical states.

```jsx
<StatusPill status="negative" variant="solid">Critical</StatusPill>
<StatusPill status="warning">Reorder</StatusPill>
<StatusPill status="positive">In Stock</StatusPill>
<StatusPill status="neutral" dot={false}>Tier III</StatusPill>
```

Props: `status` (`positive`/`negative`/`warning`/`info`/`neutral`), `variant` (`soft`/`solid`/`outline`), `dot`, `size`.
