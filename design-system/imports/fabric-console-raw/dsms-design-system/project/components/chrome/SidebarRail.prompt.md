The persistent left navigation: imperial seal at top, page list with accent-stripe active state, system-status pill at the bottom. Collapses to 60px icon-only.

```jsx
<SidebarRail
  active="briefing"
  onSelect={setPage}
  items={[
    { id: "briefing", label: "Executive Briefing", icon: "layout-dashboard" },
    { id: "ops", label: "Operations Command", icon: "git-branch" },
    { id: "supply", label: "Supply Chain", icon: "boxes" },
  ]}
  statusLabel="Subsidy Coverage" statusValue="94%" statusTone="positive"
/>
```

Props: `items` (`{id,label,icon}`), `active`, `onSelect`, `collapsed`, `statusLabel/Value/Tone`.
