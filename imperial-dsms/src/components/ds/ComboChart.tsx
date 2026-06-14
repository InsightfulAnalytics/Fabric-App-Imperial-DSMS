import { useState } from "react";
import type { CSSProperties } from "react";

export interface ComboChartDatum {
  dept: string;
  short?: string;
  /** Column value (e.g. combat losses). */
  losses: number;
  /** Marker value in percentage points (e.g. 2.1 = +2.1%). */
  varPct: number;
  /** Headcount this year — shown in the tooltip when provided. */
  hcCY?: number;
  /** Headcount previous year — shown in the tooltip when provided. */
  hcPY?: number;
}

export interface ComboChartProps {
  data: ComboChartDatum[];
  height?: number;
  colW?: number;
  posColor?: string;
  negColor?: string;
  colColor?: string;
  /** Left-axis title. Default "COMBAT LOSSES". */
  axisTitle?: string;
  /** Eyebrow rendered inside the chart above the variance markers. */
  topLabel?: string;
  /** Cross-filter: dept name of the current selection. */
  selected?: string | null;
  /** Cross-filter: called with the dept name, or null when toggled off. */
  onSelect?: (dept: string | null) => void;
  style?: CSSProperties;
}

const AXIS = "var(--ds-text-muted)";
const GRID = "var(--ds-line-faint)";

function niceCeil(v: number): number {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * mag;
}

function fmtK(v: number): string {
  return v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K` : String(Math.round(v));
}

/**
 * ComboChart — columns (losses) below a horizontal reference line carrying
 * stemmed diamond markers with % chips (headcount variance vs last year).
 * Hovering a department raises a tooltip with its column value.
 */
export function ComboChart({
  data,
  height = 268,
  colW = 30,
  posColor = "var(--ds-signal-info)",
  negColor = "var(--ds-signal-negative)",
  colColor = "var(--ds-data-3)",
  axisTitle = "COMBAT LOSSES",
  topLabel = "Change in Headcount to Last Year",
  selected = null,
  onSelect,
  style,
}: ComboChartProps) {
  const [hover, setHover] = useState(-1);
  const click = (dept: string) => onSelect?.(selected === dept ? null : dept);
  const dimmed = (dept: string) => selected != null && selected !== dept;

  const W = 760;
  const H = height;

  if (!data.length) {
    // Mirror the SVG's responsive sizing (width-driven aspect ratio) so the
    // empty state occupies exactly the same height as a populated chart and
    // never stretches the surrounding grid row.
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: `${W} / ${H}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ds-text-faint)",
          fontSize: 13,
          ...style,
        }}
      >
        No combat-loss data
      </div>
    );
  }

  const padL = 64;
  const padR = 24;
  const padT = topLabel ? 44 : 24;
  const padB = 30;
  const n = data.length;
  const innerW = W - padL - padR;
  const band = innerW / n;
  const cx = (i: number) => padL + band * (i + 0.5);

  const maxLoss = Math.max(...data.map((d) => d.losses));
  const lossTop = niceCeil(maxLoss);
  const maxAbs = Math.max(...data.map((d) => Math.abs(d.varPct)), 1);

  const amp = 22;
  const zeroLineY = padT + amp + 14;
  const yVar = (v: number) => zeroLineY - (v / maxAbs) * amp;

  const colTopY = zeroLineY + amp + 26;
  const colBaseY = H - padB;
  const yL = (v: number) => colBaseY - (v / lossTop) * (colBaseY - colTopY);
  const lossTicks = 3;

  return (
    <div style={{ position: "relative", ...style }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block", overflow: "visible", height: "auto" }}
        onMouseLeave={() => setHover(-1)}
      >
        {/* in-chart eyebrow above the variance markers */}
        {topLabel && (
          <text
            x={padL}
            y={10}
            textAnchor="start"
            fill="var(--ds-text-muted)"
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {topLabel}
          </text>
        )}

        {/* column-zone gridlines + left axis */}
        {Array.from({ length: lossTicks + 1 }).map((_, t) => {
          const v = (lossTop / lossTicks) * t;
          return (
            <g key={`l${t}`}>
              <line x1={padL} x2={W - padR} y1={yL(v)} y2={yL(v)} stroke={GRID} strokeWidth="1" />
              <text
                x={padL - 8}
                y={yL(v) + 3}
                textAnchor="end"
                fill={AXIS}
                style={{ fontFamily: "var(--ds-font-mono)", fontSize: 11 }}
              >
                {v >= 1000 ? `${(v / 1000).toFixed(0)}K` : Math.round(v)}
              </text>
            </g>
          );
        })}

        {/* columns */}
        {data.map((d, i) => {
          const top = yL(d.losses);
          const on = hover === i;
          const dim = dimmed(d.dept);
          const isSel = selected === d.dept;
          return (
            <g
              key={`c${i}`}
              onMouseEnter={() => setHover(i)}
              onClick={() => click(d.dept)}
              style={{ cursor: onSelect ? "pointer" : "default" }}
            >
              <rect
                x={cx(i) - band / 2}
                y={colTopY}
                width={band}
                height={colBaseY - colTopY}
                fill={on ? "rgba(255,255,255,0.03)" : "transparent"}
              />
              <rect
                x={cx(i) - colW / 2}
                y={top}
                width={colW}
                height={colBaseY - top}
                fill={colColor}
                opacity={dim ? 0.25 : on || isSel ? 1 : 0.85}
                stroke={isSel ? "var(--ds-text-secondary)" : "none"}
                strokeWidth={isSel ? 1.5 : 0}
                rx="1"
              />
              <text
                x={cx(i)}
                y={colBaseY + 17}
                textAnchor="middle"
                fill={
                  isSel
                    ? "var(--ds-text-primary)"
                    : dim
                      ? "var(--ds-text-faint)"
                      : on
                        ? "var(--ds-text-secondary)"
                        : AXIS
                }
                style={{
                  fontFamily: "var(--ds-font-body)",
                  fontSize: 12,
                  fontWeight: isSel ? 600 : 400,
                }}
              >
                {d.short || d.dept}
              </text>
            </g>
          );
        })}

        {/* reference line */}
        <line
          x1={padL}
          x2={W - padR}
          y1={zeroLineY}
          y2={zeroLineY}
          stroke="var(--ds-line-bright)"
          strokeWidth="1.5"
        />

        {/* stems + diamonds + % chips */}
        {data.map((d, i) => {
          const x = cx(i);
          const y = yVar(d.varPct);
          const up = d.varPct >= 0;
          const c = up ? posColor : negColor;
          const r = hover === i ? 7 : 5.5;
          const ly = up ? y - r - 10 : y + r + 10;
          const label = `${d.varPct > 0 ? "+" : ""}${d.varPct.toFixed(1)}%`;
          const chipW = label.length * 7.2 + 11;
          const dim = dimmed(d.dept);
          return (
            <g
              key={`m${i}`}
              onMouseEnter={() => setHover(i)}
              onClick={() => click(d.dept)}
              style={{ cursor: onSelect ? "pointer" : "default" }}
              opacity={dim ? 0.3 : 1}
            >
              <line x1={x} y1={zeroLineY} x2={x} y2={y} stroke={c} strokeWidth="1.5" opacity="0.7" />
              <path
                d={`M${x},${y - r} L${x + r},${y} L${x},${y + r} L${x - r},${y} Z`}
                fill={c}
                stroke="var(--ds-bg-hull)"
                strokeWidth="1.5"
              />
              <rect
                x={x - chipW / 2}
                y={ly - 10}
                width={chipW}
                height={18}
                rx="2"
                fill="var(--ds-bg-void)"
                stroke={c}
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <text
                x={x}
                y={ly + 4}
                textAnchor="middle"
                fill={c}
                style={{ fontFamily: "var(--ds-font-mono)", fontSize: 12, fontWeight: 600 }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* left axis title */}
        <text
          transform={`translate(15 ${(colTopY + colBaseY) / 2}) rotate(-90)`}
          textAnchor="middle"
          fill={AXIS}
          style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.16em",
          }}
        >
          {axisTitle}
        </text>
      </svg>

      {hover >= 0 && (
        <ComboTip
          d={data[hover]}
          leftPct={(cx(hover) / W) * 100}
          topPct={(colTopY / H) * 100}
          flip={cx(hover) > W / 2}
        />
      )}
    </div>
  );
}

function fmtCount(v?: number): string {
  if (v == null || Number.isNaN(v)) return "—";
  const abs = Math.abs(v);
  if (abs >= 1e6) return `${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${(abs / 1e3).toFixed(0)}K`;
  return abs.toFixed(0);
}

/**
 * Hover tooltip — anchored beside the hovered column, flipping to whichever
 * side keeps it clear of the cursor. Percentage anchors so it tracks the
 * responsive SVG scaling.
 */
function ComboTip({
  d,
  leftPct,
  topPct,
  flip,
}: {
  d: ComboChartDatum;
  leftPct: number;
  topPct: number;
  flip: boolean;
}) {
  const up = d.varPct >= 0;
  const sentiment = up ? "var(--ds-signal-positive)" : "var(--ds-signal-negative)";
  return (
    <div
      style={{
        position: "absolute",
        top: `${topPct}%`,
        left: `${leftPct}%`,
        transform: flip ? "translateX(calc(-100% - 14px))" : "translateX(14px)",
        minWidth: 190,
        padding: "11px 13px",
        background: "var(--ds-bg-void)",
        border: "1px solid var(--ds-line-bright)",
        borderRadius: "var(--ds-radius-sm)",
        boxShadow: "var(--ds-shadow-popover)",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        fontSize: 12.5,
      }}
    >
      <div
        style={{
          fontFamily: "var(--ds-font-display)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--ds-text-primary)",
        }}
      >
        {d.dept}
      </div>
      <TipRow label="Combat losses" value={fmtK(d.losses)} />
      <TipRow label="Headcount LY" value={fmtCount(d.hcPY)} />
      <TipRow label="Headcount CY" value={fmtCount(d.hcCY)} />
      <TipRow
        label="Change vs LY"
        value={`${up ? "+" : ""}${d.varPct.toFixed(1)}%`}
        color={sentiment}
      />
    </div>
  );
}

function TipRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 18 }}>
      <span style={{ color: "var(--ds-text-muted)" }}>{label}</span>
      <span
        style={{
          fontFamily: "var(--ds-font-mono)",
          color: color ?? "var(--ds-text-primary)",
          fontVariantNumeric: "tabular-nums",
          fontWeight: color ? 600 : 400,
        }}
      >
        {value}
      </span>
    </div>
  );
}
