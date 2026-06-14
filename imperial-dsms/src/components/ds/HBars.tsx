import type { CSSProperties } from "react";

export interface HBarDatum {
  label: string;
  value: number;
  /** Per-bar colour override. */
  color?: string;
}

export interface HBarsProps {
  data: HBarDatum[];
  /** Value formatter for the right-hand column. */
  format?: (value: number) => string;
  color?: string;
  /** Bar height in px. Default 26. */
  height?: number;
  gap?: number;
  /** Label column width. Default 170. */
  labelWidth?: number;
  style?: CSSProperties;
}

/** Horizontal bar list — label, deck-track bar, mono value. */
export function HBars({
  data,
  format,
  color = "var(--ds-data-1)",
  height = 26,
  gap = 8,
  labelWidth = 170,
  style,
}: HBarsProps) {
  if (!data.length) {
    return (
      <div style={{ color: "var(--ds-text-faint)", fontSize: 12, padding: "12px 0", ...style }}>
        No data
      </div>
    );
  }
  const max = Math.max(...data.map((d) => d.value)) || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: `${labelWidth}px 1fr 92px`,
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 12.5,
              color: "var(--ds-text-secondary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {d.label}
          </span>
          <div
            style={{
              height,
              background: "var(--ds-bg-deck)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(d.value / max) * 100}%`,
                height: "100%",
                background: d.color || color,
                opacity: 0.9,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--ds-font-mono)",
              fontVariantNumeric: "tabular-nums",
              fontSize: 12.5,
              color: "var(--ds-text-primary)",
              textAlign: "right",
            }}
          >
            {format ? format(d.value) : d.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
