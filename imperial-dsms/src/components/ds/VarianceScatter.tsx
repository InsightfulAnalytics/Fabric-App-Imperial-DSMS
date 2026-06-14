import { useState } from "react";
import type { CSSProperties } from "react";

export interface ScatterDept {
  key: string | number;
  dept: string;
  short?: string;
  division: string;
  weight: number;
  /** Income variance as a fraction, e.g. 0.08 for +8%. */
  incomeVar: number;
  /** Expense variance as a fraction. */
  expenseVar: number;
  /** Allocation in credits (number for tooltip). */
  allocation?: number;
  /** Actual expenses in credits (number for tooltip). */
  expenseActual?: number;
}

export interface VarianceScatterProps {
  depts: ScatterDept[];
  /** Reference band on both axes (±band shown as dashed lines). Default 0.15. */
  band?: number;
  height?: number;
  /** Domain on both axes — default ±0.21. */
  domain?: number;
  /** Compact credit formatter for tooltips. */
  fmtCredits?: (value: number) => string;
  /** Cross-filter: dept name of the current selection. */
  selected?: string | null;
  /** Cross-filter: called with the dept name, or null when toggled off. */
  onSelect?: (dept: string | null) => void;
  style?: CSSProperties;
}

const AXIS = "var(--ds-text-muted)";
const GOOD = "var(--ds-signal-positive)";
const BAD = "var(--ds-signal-negative)";

function fmtPct(v: number, d = 1): string {
  const sign = v > 0 ? "+" : v < 0 ? "−" : "";
  return `${sign}${Math.abs(v * 100).toFixed(d)}%`;
}

/**
 * VarianceScatter — one dot per department, sized by `weight`, positioned by
 * Income Variance × Expense Variance. Crisis (low income / high expense) sits
 * top-left; Surplus (high income / low expense) bottom-right.
 */
export function VarianceScatter({
  depts,
  band = 0.15,
  height = 360,
  domain = 0.21,
  fmtCredits,
  selected = null,
  onSelect,
  style,
}: VarianceScatterProps) {
  const [hover, setHover] = useState(-1);
  const click = (dept: string) => onSelect?.(selected === dept ? null : dept);
  const W = 720;
  const H = height;
  const padL = 56;
  const padR = 24;
  const padT = 22;
  const padB = 46;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  if (!depts.length) {
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
          fontSize: 12,
          ...style,
        }}
      >
        No department variance data
      </div>
    );
  }

  const x = (v: number) => padL + ((v + domain) / (2 * domain)) * innerW;
  const y = (v: number) => padT + (1 - (v + domain) / (2 * domain)) * innerH;
  const x0 = x(0);
  const y0 = y(0);
  const maxW = Math.max(...depts.map((d) => d.weight));
  const r = (w: number) => 5 + Math.sqrt(w / maxW) * 17;
  const ticks = [-0.2, -0.1, 0, 0.1, 0.2];

  const quadrants = [
    { lbl: "Got more, spent more", ax: x0 + 8, ay: padT + 14, anchor: "start" as const, fill: null },
    {
      lbl: "Crisis",
      ax: padL + 8,
      ay: padT + 14,
      anchor: "start" as const,
      fill: "var(--ds-signal-negative-dim)",
      rx: padL,
      ry: padT,
      rw: x0 - padL,
      rh: y0 - padT,
    },
    {
      lbl: "Surplus",
      ax: W - padR - 8,
      ay: H - padB - 10,
      anchor: "end" as const,
      fill: "var(--ds-signal-positive-dim)",
      rx: x0,
      ry: y0,
      rw: W - padR - x0,
      rh: H - padB - y0,
    },
    { lbl: "Austere", ax: padL + 8, ay: H - padB - 10, anchor: "start" as const, fill: null },
  ];

  return (
    <div style={{ position: "relative", ...style }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block", overflow: "visible", height: "auto" }}
        onMouseLeave={() => setHover(-1)}
      >
        {quadrants
          .filter((q) => q.fill)
          .map((q, i) => (
            <rect
              key={`q${i}`}
              x={q.rx}
              y={q.ry}
              width={q.rw}
              height={q.rh}
              fill={q.fill ?? "transparent"}
            />
          ))}
        {[-band, band].map((b, i) => (
          <g key={`b${i}`}>
            <line
              x1={x(b)}
              x2={x(b)}
              y1={padT}
              y2={H - padB}
              stroke="var(--ds-line-bright)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <line
              x1={padL}
              x2={W - padR}
              y1={y(b)}
              y2={y(b)}
              stroke="var(--ds-line-bright)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          </g>
        ))}
        {ticks.map((t, i) => (
          <g key={`t${i}`}>
            <text
              x={x(t)}
              y={H - padB + 16}
              textAnchor="middle"
              fill={AXIS}
              style={{ fontFamily: "var(--ds-font-mono)", fontSize: 9.5 }}
            >
              {fmtPct(t, 0)}
            </text>
            <text
              x={padL - 8}
              y={y(t) + 3}
              textAnchor="end"
              fill={AXIS}
              style={{ fontFamily: "var(--ds-font-mono)", fontSize: 9.5 }}
            >
              {fmtPct(t, 0)}
            </text>
          </g>
        ))}
        <line x1={x0} x2={x0} y1={padT} y2={H - padB} stroke="var(--ds-line-conduit)" strokeWidth="1.5" />
        <line x1={padL} x2={W - padR} y1={y0} y2={y0} stroke="var(--ds-line-conduit)" strokeWidth="1.5" />
        <text
          x={(padL + W - padR) / 2}
          y={H - 6}
          textAnchor="middle"
          fill="var(--ds-text-faint)"
          style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.16em",
          }}
        >
          INCOME VARIANCE  ·  UNDER-FUNDED ← → OVER-FUNDED
        </text>
        <text
          transform={`translate(13 ${(padT + H - padB) / 2}) rotate(-90)`}
          textAnchor="middle"
          fill="var(--ds-text-faint)"
          style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.16em",
          }}
        >
          EXPENSE VARIANCE  ·  UNDER ← → OVER-SPENT
        </text>
        {quadrants.map((q, i) => (
          <text
            key={`ql${i}`}
            x={q.ax}
            y={q.ay}
            textAnchor={q.anchor}
            fill={q.fill ? (q.lbl === "Crisis" ? BAD : GOOD) : "var(--ds-text-faint)"}
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: q.fill ? 0.9 : 0.6,
            }}
          >
            {q.lbl}
          </text>
        ))}
        {depts.map((d, i) => {
          const crisis = d.incomeVar < 0 && d.expenseVar > 0;
          const surplus = d.incomeVar > 0 && d.expenseVar < 0;
          const c = crisis ? BAD : surplus ? GOOD : "var(--ds-signal-info)";
          const on = hover === i;
          const isSel = selected === d.dept;
          const dim = selected != null && !isSel;
          const radius = r(d.weight);
          return (
            <g
              key={d.key}
              onMouseEnter={() => setHover(i)}
              onClick={() => click(d.dept)}
              style={{ cursor: onSelect ? "pointer" : "default" }}
              opacity={dim ? 0.25 : 1}
            >
              <circle
                cx={x(d.incomeVar)}
                cy={y(d.expenseVar)}
                r={radius}
                fill={c}
                fillOpacity={on || isSel ? 0.4 : 0.2}
                stroke={c}
                strokeWidth={on || isSel ? 2.4 : 1.4}
              />
              {(on || isSel || d.weight >= 90) && (
                <text
                  x={x(d.incomeVar)}
                  y={y(d.expenseVar) - radius - 4}
                  textAnchor="middle"
                  fill={on || isSel ? "var(--ds-text-primary)" : "var(--ds-text-muted)"}
                  style={{
                    fontFamily: "var(--ds-font-body)",
                    fontSize: 10,
                    fontWeight: on || isSel ? 600 : 500,
                  }}
                >
                  {d.short ?? d.dept}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {hover >= 0 && (
        <ScatterTip
          d={depts[hover]}
          fmtCredits={fmtCredits}
          // Tooltip sits opposite the hovered dot so it never covers it.
          side={x(depts[hover].incomeVar) > W / 2 ? "left" : "right"}
        />
      )}
    </div>
  );
}

function ScatterTip({
  d,
  fmtCredits,
  side,
}: {
  d: ScatterDept;
  fmtCredits?: (value: number) => string;
  side: "left" | "right";
}) {
  const fmt = fmtCredits ?? ((v) => String(Math.round(v)));
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        ...(side === "left" ? { left: 10 } : { right: 10 }),
        width: 232,
        padding: "11px 13px",
        background: "var(--ds-bg-void)",
        border: "1px solid var(--ds-line-bright)",
        borderRadius: "var(--ds-radius-sm)",
        boxShadow: "var(--ds-shadow-popover)",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        fontSize: 11.5,
      }}
    >
      <div
        style={{
          fontFamily: "var(--ds-font-display)",
          fontSize: 13,
          fontWeight: 700,
          color: "var(--ds-text-primary)",
        }}
      >
        {d.dept}
      </div>
      <div
        style={{
          fontSize: 10.5,
          color: "var(--ds-text-muted)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {d.division} · weight {d.weight}
      </div>
      <Row k="Income var" v={fmtPct(d.incomeVar)} c={d.incomeVar >= 0 ? GOOD : BAD} />
      <Row k="Expense var" v={fmtPct(d.expenseVar)} c={d.expenseVar <= 0 ? GOOD : BAD} />
      {d.allocation != null && <Row k="Allocated" v={fmt(d.allocation)} />}
      {d.expenseActual != null && <Row k="Spent" v={fmt(d.expenseActual)} />}
    </div>
  );
}

function Row({ k, v, c }: { k: string; v: string; c?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 18 }}>
      <span style={{ color: "var(--ds-text-muted)" }}>{k}</span>
      <span
        style={{
          fontFamily: "var(--ds-font-mono)",
          color: c ?? "var(--ds-text-primary)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {v}
      </span>
    </div>
  );
}
