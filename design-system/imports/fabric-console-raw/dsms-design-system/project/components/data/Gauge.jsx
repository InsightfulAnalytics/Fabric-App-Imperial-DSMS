import React from "react";

/* polar point on the gauge arc (180° sweep, left→right) */
function pt(cx, cy, r, frac) {
  const a = Math.PI * (1 - frac); // frac 0 → 180° (left), 1 → 0° (right)
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}
function arc(cx, cy, r, f0, f1) {
  const [x0, y0] = pt(cx, cy, r, f0);
  const [x1, y1] = pt(cx, cy, r, f1);
  const large = f1 - f0 > 0.5 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/**
 * Gauge — semicircular coverage gauge. Reads as a warship dial: the value arc
 * is signal-coloured against a track, and turns negative below `redBelow`.
 * Built for "Subsidy Coverage %" (goes red below 70%).
 */
export function Gauge({
  value = 0.94,         // 0..1
  redBelow = 0.7,
  warnBelow = 0.85,
  label = "Coverage",
  size = 180,
  thickness = 12,
  style = {},
}) {
  const v = Math.max(0, Math.min(1, value));
  const pad = thickness / 2 + 3;           // headroom so stroke + round caps never clip
  const cx = size / 2;
  const r = size / 2 - thickness / 2 - pad;
  const cy = pad + r + thickness / 2;
  const height = cy + thickness / 2 + pad;

  const color =
    v < redBelow ? "var(--ds-signal-negative)" : v < warnBelow ? "var(--ds-signal-warning)" : "var(--ds-signal-positive)";

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", ...style }}>
      <svg width={size} height={height} viewBox={`0 0 ${size} ${height}`} style={{ display: "block", overflow: "visible" }}>
        <path d={arc(cx, cy, r, 0, 1)} fill="none" stroke="var(--ds-bg-deck)" strokeWidth={thickness} strokeLinecap="round" />
        {/* threshold tick at redBelow */}
        <path d={arc(cx, cy, r, Math.max(0, redBelow - 0.004), redBelow + 0.004)} fill="none" stroke="var(--ds-line-bright)" strokeWidth={thickness + 4} />
        <path d={arc(cx, cy, r, 0, v || 0.0001)} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--ds-text-primary)" style={{ fontFamily: "var(--ds-font-mono)", fontSize: size * 0.22, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {Math.round(v * 100)}%
        </text>
      </svg>
      <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ds-text-muted)", marginTop: -2 }}>
        {label}
      </div>
    </div>
  );
}
