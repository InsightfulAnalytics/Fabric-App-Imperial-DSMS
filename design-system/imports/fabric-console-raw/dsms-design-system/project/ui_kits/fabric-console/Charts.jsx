/* DSMS Fabric Console — presentational SVG charts (kit internals, brand-styled).
   Exposed on window.DSMSCharts. Cosmetic recreations, not data-bound. */
(function () {
  const { useState } = React;
  const AXIS = "var(--ds-text-muted)";
  const GRID = "var(--ds-line-faint)";

  /* Horizontal bar list */
  function HBars({ data, format, color = "var(--ds-data-1)", height = 26, gap = 8 }) {
    const max = Math.max(...data.map((d) => d.value));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "170px 1fr 92px", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12.5, color: "var(--ds-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.label || d.group || d.dept || d.role}</span>
            <div style={{ height, background: "var(--ds-bg-deck)", borderRadius: 1, overflow: "hidden" }}>
              <div style={{ width: `${(d.value / max) * 100}%`, height: "100%", background: d.color || color, opacity: 0.9 }} />
            </div>
            <span style={{ fontFamily: "var(--ds-font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 12.5, color: "var(--ds-text-primary)", textAlign: "right" }}>
              {format ? format(d.value) : d.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }

  /* Multi-series line chart with axes, optional vertical marker */
  function LineCompare({ series, labels, height = 230, markerIndex, markerLabel, surplus, yFormat }) {
    const [hover, setHover] = useState(-1);
    const padL = 52, padR = 16, padT = 14, padB = 26;
    const W = 760, H = height;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const all = series.flatMap((s) => s.data);
    const maxV = Math.max(...all) * 1.08;
    const n = labels.length;
    const x = (i) => padL + (i / (n - 1)) * innerW;
    const y = (v) => padT + (1 - v / maxV) * innerH;
    const ticks = 4;
    const fmtY = yFormat || ((v) => (v / 1e9).toFixed(1) + "B");

    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block", overflow: "visible" }}
        onMouseLeave={() => setHover(-1)}>
        {Array.from({ length: ticks + 1 }).map((_, t) => {
          const v = (maxV / ticks) * t;
          return (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke={GRID} strokeWidth="1" />
              <text x={padL - 8} y={y(v) + 3} textAnchor="end" fill={AXIS} style={{ fontFamily: "var(--ds-font-mono)", fontSize: 10 }}>
                {fmtY(v)}
              </text>
            </g>
          );
        })}
        {/* surplus columns behind */}
        {surplus && surplus.map((v, i) => (
          <rect key={i} x={x(i) - 7} y={y(v)} width={14} height={y(0) - y(v)} fill="var(--ds-signal-positive)" opacity="0.1" />
        ))}
        {/* Battle of Yavin marker */}
        {markerIndex != null && (
          <g>
            <line x1={x(markerIndex)} x2={x(markerIndex)} y1={padT} y2={H - padB} stroke="var(--ds-accent-imperial)" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x={x(markerIndex) - 6} y={padT + 10} textAnchor="end" fill="var(--ds-accent-imperial-hi)" style={{ fontFamily: "var(--ds-font-display)", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em" }}>
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
            <rect x={x(i) - innerW / (2 * (n - 1))} y={padT} width={innerW / (n - 1)} height={innerH} fill="transparent" />
            <text x={x(i)} y={H - 8} textAnchor="middle" fill={AXIS} style={{ fontFamily: "var(--ds-font-mono)", fontSize: 10 }}>{lb}</text>
            {hover === i && <line x1={x(i)} x2={x(i)} y1={padT} y2={H - padB} stroke="var(--ds-line-bright)" strokeWidth="1" />}
            {hover === i && series.map((s, si) => (
              <circle key={si} cx={x(i)} cy={y(s.data[i])} r="3.5" fill={s.color} stroke="var(--ds-bg-hull)" strokeWidth="1.5" />
            ))}
          </g>
        ))}
      </svg>
    );
  }

  /* Donut chart */
  function Donut({ segments, size = 168, thickness = 26, centerLabel, centerValue }) {
    const total = segments.reduce((a, s) => a + s.value, 0);
    const r = (size - thickness) / 2;
    const c = size / 2;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    return (
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          {segments.map((s, i) => {
            const frac = s.value / total;
            const dash = frac * circ;
            const el = (
              <circle key={i} cx={c} cy={c} r={r} fill="none" stroke={s.color} strokeWidth={thickness}
                strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset} />
            );
            offset += dash;
            return el;
          })}
        </svg>
        {centerValue && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 22, fontWeight: 600, color: "var(--ds-text-primary)", fontVariantNumeric: "tabular-nums" }}>{centerValue}</span>
            <span style={{ fontFamily: "var(--ds-font-display)", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ds-text-muted)" }}>{centerLabel}</span>
          </div>
        )}
      </div>
    );
  }

  function Legend({ segments, format }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 9, height: 9, borderRadius: 1, background: s.color, flex: "0 0 auto" }} />
            <span style={{ fontSize: 12.5, color: "var(--ds-text-secondary)", flex: 1, whiteSpace: "nowrap" }}>{s.cat || s.label}</span>
            <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 12.5, color: "var(--ds-text-primary)", fontVariantNumeric: "tabular-nums" }}>{format ? format(s.value) : s.value}</span>
          </div>
        ))}
      </div>
    );
  }

  /* Stacked horizontal bars */
  function StackedBars({ rows, keys }) {
    const totals = rows.map((r) => keys.reduce((a, k) => a + (r[k.key] || 0), 0));
    const max = Math.max(...totals);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 56px", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12.5, color: "var(--ds-text-secondary)", whiteSpace: "nowrap" }}>{r.cat}</span>
            <div style={{ display: "flex", height: 22, width: `${(totals[i] / max) * 100}%`, borderRadius: 1, overflow: "hidden", background: "var(--ds-bg-deck)" }}>
              {keys.map((k, ki) => {
                const v = r[k.key] || 0;
                return v > 0 ? <div key={ki} style={{ width: `${(v / totals[i]) * 100}%`, background: k.color }} title={`${k.label}: ${v}`} /> : null;
              })}
            </div>
            <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 12, color: "var(--ds-text-primary)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{totals[i].toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }

  window.DSMSCharts = { HBars, LineCompare, Donut, Legend, StackedBars };
})();
