import React from "react";
import { Icon } from "../foundation/Icon.jsx";

/**
 * Select — native dropdown styled for the console. Used heavily for the
 * date-range selector and filter controls in the top bar.
 */
export function Select({
  value,
  defaultValue,
  options = [],     // [{ value, label }] or [string]
  size = "md",      // "sm" | "md"
  icon,             // optional leading lucide name
  disabled = false,
  onChange,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = { sm: 30, md: 36 }[size];
  const norm = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: h,
        padding: "0 8px 0 10px",
        background: disabled ? "var(--ds-bg-hull)" : "var(--ds-bg-deck)",
        border: `1px solid ${focus ? "var(--ds-accent-imperial)" : "var(--ds-line-conduit)"}`,
        boxShadow: focus ? "inset 0 0 0 1px var(--ds-accent-imperial)" : "none",
        borderRadius: "var(--ds-radius-xs)",
        transition: "border-color var(--ds-dur-fast) var(--ds-ease-standard)",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
    >
      {icon && (
        <span style={{ color: "var(--ds-text-muted)", display: "flex" }}>
          <Icon name={icon} size={15} />
        </span>
      )}
      <select
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          border: "none",
          outline: "none",
          background: "transparent",
          color: "var(--ds-text-primary)",
          fontFamily: "var(--ds-font-body)",
          fontSize: size === "sm" ? 12 : 13,
          paddingRight: 18,
          cursor: disabled ? "not-allowed" : "pointer",
          height: "100%",
        }}
        {...rest}
      >
        {norm.map((o) => (
          <option key={o.value} value={o.value} style={{ background: "var(--ds-bg-bay)", color: "var(--ds-text-primary)" }}>
            {o.label}
          </option>
        ))}
      </select>
      <span style={{ position: "absolute", right: 8, color: "var(--ds-text-muted)", pointerEvents: "none", display: "flex" }}>
        <Icon name="chevron-down" size={15} />
      </span>
    </div>
  );
}
