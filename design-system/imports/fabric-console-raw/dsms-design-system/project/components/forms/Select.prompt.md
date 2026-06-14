Native dropdown styled for the console — the date-range and filter control of choice in the top bar.

```jsx
<Select icon="calendar" defaultValue="12m" options={[
  { value: "12m", label: "Last 12 months" },
  { value: "ytd", label: "Year to date" },
]} />
```

Props: `options` (array of `{value,label}` or strings), `icon` (leading Lucide), `size` (`sm`/`md`), `disabled`.
