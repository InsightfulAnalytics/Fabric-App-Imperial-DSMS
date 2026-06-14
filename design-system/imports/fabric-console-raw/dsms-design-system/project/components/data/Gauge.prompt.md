Semicircular coverage gauge that reads like a warship dial — the value arc is signal-coloured and turns red below a threshold. Built for "Subsidy Coverage %".

```jsx
<Gauge value={0.94} label="Subsidy Coverage" />
<Gauge value={0.62} redBelow={0.7} warnBelow={0.85} label="Coverage" />
```

Props: `value` (0..1), `redBelow`, `warnBelow`, `label`, `size`, `thickness`.
