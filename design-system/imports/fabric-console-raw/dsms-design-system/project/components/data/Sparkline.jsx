import React from "react";

/**
 * Sparkline — compact SVG trend line with subtle area fill, optional min/max
 * dots and an end-value label. Pure SVG, no dependencies. Mirrors the DSMS
 * Vega sparkline spec (area 18% opacity, 1.5px line, max=positive/min=negative dots).
 */
export function Sparkline({
  data = [],            // array of numbers, chronological
  width = 200,
  height = 48,
  color = "var(--ds-signal-info)",
  fillOpacity = 0.16,
  strokeWidth = 1.5,
  showDots = true,
  showEndLabel = false,
  endLabel,             // string override for the end label
  zero = false,         // baseline at 0 vs auto-range
  style = {},
}) {
  const padX = 3;
  const padY = 5;
  const rightPad = showEndLabel ? 40 : padX;
  const n = data.length;

  if (n < 2) {
    return <svg width={width} height={height} style={style} />;
  }

  const min = zero ? 0 : Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const innerW = width - padX - rightPad;
  const innerH = height - padY * 2;

  const x = (i) => padX + (i / (n - 1)) * innerW;
  const y = (v) => padY + (1 - (v - min) / span) * innerH;

  const linePath = data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L${x(n - 1).toFixed(2)},${(height - padY).toFixed(2)} L${x(0).toFixed(2)},${(height - padY).toFixed(2)} Z`;

  const maxIdx = data.indexOf(max);
  const minIdx = data.indexOf(min);
  const lastVal = data[n - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block", overflow: "visible", ...style }}>
      <path d={areaPath} fill={color} fillOpacity={fillOpacity} stroke="none" />
      <path d={linePath} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
      {showDots && (
        <>
          <circle cx={x(maxIdx)} cy={y(max)} r={2.6} fill="var(--ds-signal-positive)" stroke="var(--ds-bg-hull)" strokeWidth={1} />
          <circle cx={x(minIdx)} cy={y(min)} r={2.6} fill="var(--ds-signal-negative)" stroke="var(--ds-bg-hull)" strokeWidth={1} />
        </>
      )}
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
