import { ArrowDown, ArrowUp } from "lucide-react";

interface DeltaIndicatorProps {
  /** Fractional value (e.g. 0.064 = +6.4%) or raw number. */
  value: number;
  format?: "percent" | "number" | "none";
  /** If true, negative is "good" (e.g. expenses falling). */
  invert?: boolean;
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
}

const SIZES = {
  sm: { font: 11, arrow: 11 },
  md: { font: 13, arrow: 13 },
  lg: { font: 16, arrow: 16 },
};

export function DeltaIndicator({
  value,
  format = "percent",
  invert = false,
  size = "md",
  showArrow = true,
}: DeltaIndicatorProps) {
  const up = value >= 0;
  const good = invert ? !up : up;
  const color = good ? "var(--ds-signal-positive)" : "var(--ds-signal-negative)";
  const { font, arrow } = SIZES[size];

  const text =
    format === "percent"
      ? `${(value * 100).toFixed(1)}%`
      : format === "number"
        ? Math.abs(value).toLocaleString()
        : "";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        color,
        fontFamily: "var(--ds-font-mono)",
        fontSize: font,
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "-0.01em",
        lineHeight: 1,
      }}
    >
      {showArrow && (up ? <ArrowUp size={arrow} strokeWidth={2} /> : <ArrowDown size={arrow} strokeWidth={2} />)}
      {format !== "none" && text}
    </span>
  );
}

/** Maps the same good/bad logic so other components can colour the accent stripe. */
export function deltaColor(value: number, invert = false): string {
  const up = value >= 0;
  const good = invert ? !up : up;
  return good ? "var(--ds-signal-positive)" : "var(--ds-signal-negative)";
}
