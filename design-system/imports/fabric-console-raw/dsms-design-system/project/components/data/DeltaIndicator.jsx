import React from "react";
import { Icon } from "../foundation/Icon.jsx";

/**
 * DeltaIndicator — signed period-over-period change with a directional arrow,
 * coloured by signal. Set `invert` for metrics where down is good (e.g. expenses,
 * combat losses) so the colour reflects desirability, not direction.
 */
export function DeltaIndicator({
  value = 0,            // e.g. 0.064 for +6.4% (fraction) or a raw number
  format = "percent",   // "percent" | "number" | "none"
  invert = false,
  size = "md",          // "sm" | "md"
  showArrow = true,
  style = {},
}) {
  const up = value >= 0;
  const good = invert ? !up : up;
  const color = value === 0 ? "var(--ds-text-muted)" : good ? "var(--ds-signal-positive)" : "var(--ds-signal-negative)";

  let text;
  if (format === "percent") {
    text = `${up ? "+" : "−"}${Math.abs(value * 100).toFixed(1)}%`;
  } else if (format === "number") {
    text = `${up ? "+" : "−"}${Math.abs(value).toLocaleString()}`;
  } else {
    text = `${up ? "+" : "−"}${Math.abs(value)}`;
  }

  const fs = size === "sm" ? 11 : size === "lg" ? 15 : 12.5;
  const is = size === "sm" ? 12 : size === "lg" ? 17 : 14;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        color,
        fontFamily: "var(--ds-font-mono)",
        fontVariantNumeric: "tabular-nums",
        fontSize: fs,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      {showArrow && <Icon name={up ? "arrow-up-right" : "arrow-down-right"} size={is} strokeWidth={2.25} />}
      {text}
    </span>
  );
}
