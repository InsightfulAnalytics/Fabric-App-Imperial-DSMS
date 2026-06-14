Dense console table — bay-surface header, hairline rows, tabular numerics, hover highlight. Columns can supply `render(row)` for conditional formatting (e.g. a StatusPill).

```jsx
<DataTable
  rowKey="vendor"
  columns={[
    { key: "vendor", label: "Vendor" },
    { key: "world", label: "Home World" },
    { key: "risk", label: "Risk", render: (r) => <StatusPill status={r.riskStatus}>{r.risk}</StatusPill> },
    { key: "spend", label: "Total Spend", numeric: true },
  ]}
  rows={vendors}
/>
```

Props: `columns` (`{key,label,align,numeric,width,render}`), `rows`, `rowKey`, `dense`, `onRowClick`.
