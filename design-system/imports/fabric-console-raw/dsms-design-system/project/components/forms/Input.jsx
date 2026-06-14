import React from "react";
import { Icon } from "../foundation/Icon.jsx";

/**
 * Input — single-line text field for the console. Input well surface,
 * hairline border, 2px imperial focus inset. Optional leading icon.
 */
export function Input({
  value,
  defaultValue,
  placeholder,
  icon,           // optional leading lucide name
  type = "text",
  size = "md",    // "sm" | "md"
  disabled = false,
  invalid = false,
  numeric = false, // mono + tabular figures
  onChange,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = { sm: 30, md: 36 }[size];

  const borderColor = invalid
    ? "var(--ds-signal-negative)"
    : focus
    ? "var(--ds-accent-imperial)"
    : "var(--ds-line-conduit)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: h,
        padding: "0 10px",
        background: disabled ? "var(--ds-bg-hull)" : "var(--ds-bg-deck)",
        border: `1px solid ${borderColor}`,
        boxShadow: focus ? "inset 0 0 0 1px var(--ds-accent-imperial)" : "none",
        borderRadius: "var(--ds-radius-xs)",
        transition: "border-color var(--ds-dur-fast) var(--ds-ease-standard), box-shadow var(--ds-dur-fast) var(--ds-ease-standard)",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
    >
      {icon && (
        <span style={{ color: focus ? "var(--ds-text-secondary)" : "var(--ds-text-muted)", display: "flex" }}>
          <Icon name={icon} size={15} />
        </span>
      )}
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          color: "var(--ds-text-primary)",
          fontFamily: numeric ? "var(--ds-font-mono)" : "var(--ds-font-body)",
          fontVariantNumeric: numeric ? "tabular-nums" : "normal",
          fontSize: size === "sm" ? 12 : 13,
          letterSpacing: numeric ? "-0.01em" : "0",
        }}
        {...rest}
      />
    </div>
  );
}
