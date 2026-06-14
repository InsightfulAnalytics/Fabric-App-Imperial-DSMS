import React from "react";

/**
 * Slicer — single-select segmented control, the DSMS take on a Power BI / Fabric
 * slicer. A hairline-bordered track of segments; the active one takes the imperial
 * wash + a 2px accent underline. Use for year/range selection in the top bar.
 */
export function Slicer({
  options = [],          // [{ value, label }] or [string]
  value,                 // controlled selected value
  defaultValue,
  size = "md",           // "sm" | "md"
  onChange,
  style = {},
  ...rest
}) {
  const norm = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(
    defaultValue !== undefined ? defaultValue : norm[0] && norm[0].value
  );
  const selected = isControlled ? value : internal;

  const h = { sm: 28, md: 34 }[size];
  const fs = { sm: 11.5, md: 12.5 }[size];

  const select = (v) => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };

  return (
    <div
      role="radiogroup"
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        height: h,
        padding: 2,
        gap: 2,
        background: "var(--ds-bg-deck)",
        border: "1px solid var(--ds-line-conduit)",
        borderRadius: "var(--ds-radius-xs)",
        ...style,
      }}
      {...rest}
    >
      {norm.map((o) => {
        const on = o.value === selected;
        return <Segment key={o.value} on={on} fs={fs} label={o.label} onClick={() => select(o.value)} />;
      })}
    </div>
  );
}

function Segment({ on, fs, label, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 12px",
        background: on ? "var(--ds-accent-imperial-dim)" : hover ? "var(--ds-bg-bay)" : "transparent",
        border: "none",
        borderRadius: "var(--ds-radius-xs)",
        cursor: "pointer",
        color: on ? "var(--ds-text-primary)" : "var(--ds-text-muted)",
        fontFamily: "var(--ds-font-display)",
        fontSize: fs,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        transition: "background var(--ds-dur-fast) var(--ds-ease-standard), color var(--ds-dur-fast) var(--ds-ease-standard)",
      }}
    >
      {label}
      {on && (
        <span
          style={{
            position: "absolute",
            left: 8,
            right: 8,
            bottom: 2,
            height: 2,
            background: "var(--ds-accent-imperial)",
            borderRadius: 1,
          }}
        />
      )}
    </button>
  );
}
