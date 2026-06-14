Persistent page header: page title, a "Filed under" breadcrumb, and a right-side slot for the date-range Select and controls.

```jsx
<TopBar title="Imperial Executive Briefing" breadcrumb={["Finance", "P&L"]}>
  <Select icon="calendar" defaultValue="12m" options={ranges} />
  <Button variant="secondary" icon="download" size="sm">Export</Button>
</TopBar>
```

Props: `title`, `breadcrumb` (string or array), `children` (right controls), `onToggleRail`.
