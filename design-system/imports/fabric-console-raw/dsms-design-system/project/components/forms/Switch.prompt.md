Toggle control with a square-ish track (austere 2px radius), imperial red when on. Controlled or uncontrolled.

```jsx
<Switch label="Show combat losses" defaultChecked />
<Switch checked={dense} onChange={setDense} label="Dense rows" />
```

Props: `checked` (controlled) or `defaultChecked`, `label`, `disabled`, `onChange(checked)`.
