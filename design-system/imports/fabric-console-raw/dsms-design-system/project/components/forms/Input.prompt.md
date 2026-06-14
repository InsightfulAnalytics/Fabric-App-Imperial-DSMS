Single-line text field on the input-well surface, with a 2px imperial focus inset. Set `numeric` for amounts/IDs so they render in mono tabular figures.

```jsx
<Input icon="search" placeholder="Filter vendors…" />
<Input numeric defaultValue="1284900002" />
<Input invalid placeholder="Required" />
```

Props: `icon` (leading Lucide), `size` (`sm`/`md`), `numeric`, `invalid`, `disabled`, plus native input props.
