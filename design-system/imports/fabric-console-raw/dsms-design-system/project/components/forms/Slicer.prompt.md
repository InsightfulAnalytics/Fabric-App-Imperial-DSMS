Single-select segmented control — the DSMS take on a Fabric slicer. Active segment gets the imperial wash + 2px accent underline. Use for year/range selection in the top bar instead of a dropdown when options are few.

```jsx
<Slicer defaultValue="0bby" options={[
  { value: "3bby", label: "3 BBY" },
  { value: "2bby", label: "2 BBY" },
  { value: "1bby", label: "1 BBY" },
  { value: "0bby", label: "0 BBY" },
]} />
<Slicer value={yr} onChange={setYr} options={["FY 0", "FY 1", "FY 2"]} size="sm" />
```

Props: `options` (`{value,label}` or strings), `value`/`defaultValue`, `size` (`sm`/`md`), `onChange(value)`. Keep to ~2–5 short options; use `Select` for longer lists.
