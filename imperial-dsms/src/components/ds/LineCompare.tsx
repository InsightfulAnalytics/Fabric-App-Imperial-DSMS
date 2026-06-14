import { useState } from "react";
import type { CSSProperties } from "react";

export interface LineSeries {
  name: string;
  data: number[];
  color: string;
}

export interface LineCompareProps {
  series: LineSeries[];
  labels: string[];
  height?: number;
  /** Vertical dashed imperial marker at this label index. */
  markerIndex?: number;
  markerLabel?: string;
  /** Faint positive columns rendered behind the lines. */
  surplus?: number[];
  yFormat?: (value: number) => string;
  style?: CSSProperties;
}

const AXIS = "var(--ds-text-muted)";
const GRID = "var(--ds-line-faint)";

/** Multi-series line chart with axes, hover crosshair and an optional event marker. */
export function LineCompare({
  series,
  labels,
  height = 230,
  markerIndex,
  markerLabel,
  surplus,
  yFormat,
  style,
}: LineCompareProps) {
  const [hover, setHover] = useState(-1);
  const padL = 52;
  const padR = 16;
  const padT = 14;
  const padB = 26;
  const W = 760;
  const H = height;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  if (!series.length || labels.length < 2) {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: `${W} / ${H}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ds-text-faint)",
          fontSize: 12,
          ...style,
        }}
      >
        No data
      </div>
    );
  }

  const all = series.flatMap((s) => s.data);
  const maxV = (Math.max(...all) || 1) * 1.08;
  const n = labels.length;
  const x = (i: number) => padL + (i / (n - 1)) * innerW;
  const y = (v: number) => padT + (1 - v / maxV) * innerH;
  const ticks = 4;
  const fmtY = yFormat ?? ((v: number) => `${(v / 1e9).toFixed(1)}B`);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", overflow: "visible", height: "auto", ...style }}
      onMouseLeave={() => setHover(-1)}
    >
      {Array.from({ length: ticks + 1 }).map((_, t) => {
        const v = (maxV / ticks) * t;
        return (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke={GRID} strokeWidth="1" />
            <text
              x={padL - 8}
              y={y(v) + 3}
              textAnchor="end"
              fill={AXIS}
              style={{ fontFamily: "var(--ds-font-mono)", fontSize: 10 }}
            >
              {fmtY(v)}
            </text>
          </g>
        );
      })}
      {surplus &&
        surplus.map((v, i) => (
          <rect
            key={i}
            x={x(i) - 7}
            y={y(v)}
            width={14}
            height={Math.max(0, y(0) - y(v))}
            fill="var(--ds-signal-positive)"
            opacity="0.1"
          />
        ))}
      {markerIndex != null && markerIndex >= 0 && markerIndex < n && (
        <g>
          <line
            x1={x(markerIndex)}
            x2={x(markerIndex)}
            y1={padT}
            y2={H - padB}
            stroke="var(--ds-accent-imperial)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x={x(markerIndex) - 6}
            y={padT + 10}
            textAnchor="end"
            fill="var(--ds-accent-imperial-hi)"
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            {markerLabel}
          </text>
        </g>
      )}
      {series.map((s, si) => {
        const d = s.data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
        return <path key={si} d={d} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />;
      })}
      {labels.map((lb, i) => (
        <g key={i} onMouseEnter={() => setHover(i)}>
          <rect
            x={x(i) - innerW / (2 * (n - 1))}
            y={padT}
            width={innerW / (n - 1)}
            height={innerH}
            fill="transparent"
          />
          <text
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            fill={AXIS}
            style={{ fontFamily: "var(--ds-font-mono)", fontSize: 10 }}
          >
            {lb}
          </text>
          {hover === i && (
            <line x1={x(i)} x2={x(i)} y1={padT} y2={H - padB} stroke="var(--ds-line-bright)" strokeWidth="1" />
          )}
          {hover === i &&
            series.map((s, si) => (
              <circle
                key={si}
                cx={x(i)}
                cy={y(s.data[i])}
                r="3.5"
                fill={s.color}
                stroke="var(--ds-bg-hull)"
                strokeWidth="1.5"
              />
            ))}
        </g>
      ))}
    </svg>
  );
}
