The standard console card — hull surface, 1px conduit border, 4px radius, no shadow. Optional header with eyebrow/title + actions. Set `padded={false}` for flush tables/charts.

```jsx
<Panel title="Top Vendors" eyebrow="Operations" actions={<IconButton icon="more-horizontal" />}>
  …
</Panel>
<Panel padded={false}><DataTable …/></Panel>
```

Props: `title`, `eyebrow`, `actions`, `padded`, `bodyStyle`.
