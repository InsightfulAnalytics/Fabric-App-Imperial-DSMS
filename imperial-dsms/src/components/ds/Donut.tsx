import type { CSSProperties } from "react";

export interface DonutSegment {
  cat: string;
  value: number;
  color: string;
}

export interface DonutProps {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
  style?: CSSProperties;
}

/** Donut chart with optional mono centre value + eyebrow label. */
export function Donut({
  segments,
  size = 168,
  thickness = 26,
  centerLabel,
  centerValue,
  style,
}: DonutProps) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size, ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        {segments.map((s, i) => {
          const frac = s.value / total;
          const dash = frac * circ;
          const el = (
            <circle
              key={i}
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      {centerValue && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ds-font-mono)",
              fontSize: 22,
              fontWeight: 600,
              color: "var(--ds-text-primary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {centerValue}
          </span>
          <span
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ds-text-muted)",
            }}
          >
            {centerLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export interface ChartLegendProps {
  segments: DonutSegment[];
  format?: (value: number) => string;
  style?: CSSProperties;
}

/** Swatch + label + mono value rows, pairs with Donut / StackedBars. */
export function ChartLegend({ segments, format, style }: ChartLegendProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      {segments.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 1,
              background: s.color,
              flex: "0 0 auto",
            }}
          />
          <span
            style={{
              fontSize: 12.5,
              color: "var(--ds-text-secondary)",
              flex: 1,
              whiteSpace: "nowrap",
            }}
          >
            {s.cat}
          </span>
          <span
            style={{
              fontFamily: "var(--ds-font-mono)",
              fontSize: 12.5,
              color: "var(--ds-text-primary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {format ? format(s.value) : s.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
