Schematic stroke glyph from the Lucide set, recoloured via `currentColor` — use anywhere DSMS needs an icon.

```jsx
<Icon name="activity" size={18} />
<span style={{ color: "var(--ds-accent-imperial)" }}><Icon name="alert-triangle" size={16} /></span>
```

Notes:
- `name` is any Lucide icon id (kebab-case). Lean toward schematic/blueprint glyphs over filled ones.
- Colour follows the inherited text colour (`currentColor`); size is a square px value.
- Loaded from the lucide-static CDN — needs network. For production, self-host the SVGs.
