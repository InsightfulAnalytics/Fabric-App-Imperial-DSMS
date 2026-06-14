import type { CSSProperties } from "react";

export interface SparklineProps {
  /** Chronological numeric series. */
  values: number[];
  width?: number;
  height?: number;
  /** Line + area colour (any CSS colour or var). */
  color?: string;
  /** Area-fill opacity behind the line. 0 to hide. */
  fillOpacity?: number;
  strokeWidth?: number;
  /** Green max-dot + red min-dot. */
  showMinMaxDots?: boolean;
  /** Solid end-of-series dot in the line colour. */
  showEndDot?: boolean;
  /** Mono end-value label to the right of the line. */
  showEndLabel?: boolean;
  endLabel?: string;
  /** Baseline at 0 vs auto-range. */
  zero?: boolean;
  style?: CSSProperties;
}

/** Compact SVG trend line with subtle area fill, min/max dots, optional end label. */
export function Sparkline({
  values,
  width = 200,
  height = 48,
  color = "var(--ds-signal-info)",
  fillOpacity = 0.16,
  strokeWidth = 1.5,
  showMinMaxDots = true,
  showEndDot = false,
  showEndLabel = false,
  endLabel,
  zero = false,
  style,
}: SparklineProps) {
  if (!values || values.length < 2) {
    return <svg width={width} height={height} style={style} />;
  }

  const padX = 3;
  const padY = 5;
  const rightPad = showEndLabel ? 40 : padX;
  const n = values.length;

  const min = zero ? 0 : Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const innerW = width - padX - rightPad;
  const innerH = height - padY * 2;

  const x = (i: number) => padX + (i / (n - 1)) * innerW;
  const y = (v: number) => padY + (1 - (v - min) / span) * innerH;

  const linePath = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`)
    .join(" ");
  const areaPath = `${linePath} L${x(n - 1).toFixed(2)},${(height - padY).toFixed(
    2,
  )} L${x(0).toFixed(2)},${(height - padY).toFixed(2)} Z`;

  const maxIdx = values.indexOf(max);
  const minIdx = values.indexOf(min);
  const lastVal = values[n - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block", overflow: "visible", ...style }}
    >
      {fillOpacity > 0 && (
        <path d={areaPath} fill={color} fillOpacity={fillOpacity} stroke="none" />
      )}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {showMinMaxDots && (
        <>
          <circle
            cx={x(maxIdx)}
            cy={y(max)}
            r={2.6}
            fill="var(--ds-signal-positive)"
            stroke="var(--ds-bg-hull)"
            strokeWidth={1}
          />
          <circle
            cx={x(minIdx)}
            cy={y(min)}
            r={2.6}
            fill="var(--ds-signal-negative)"
            stroke="var(--ds-bg-hull)"
            strokeWidth={1}
          />
        </>
      )}
      {showEndDot && <circle cx={x(n - 1)} cy={y(lastVal)} r={2.5} fill={color} />}
      {showEndLabel && (
        <text
          x={x(n - 1) + 6}
          y={y(lastVal)}
          dominantBaseline="middle"
          fill="var(--ds-text-secondary)"
          style={{ fontFamily: "var(--ds-font-mono)", fontSize: 10, fontWeight: 600 }}
        >
          {endLabel != null ? endLabel : Math.round(lastVal).toLocaleString()}
        </text>
      )}
    </svg>
  );
}
