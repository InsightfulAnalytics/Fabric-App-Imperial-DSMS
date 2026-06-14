import React from "react";
import { DeltaIndicator } from "./DeltaIndicator.jsx";
import { Sparkline } from "./Sparkline.jsx";

/**
 * KpiTile — the signature briefing tile: an ALL-CAPS eyebrow label, a large
 * mono value, a YoY delta, and an optional 12-month sparkline. Composes
 * DeltaIndicator + Sparkline. Use in the KPI strip across the top of a page.
 */
export function KpiTile({
  label,
  value,                // preformatted string, e.g. "₡ 1.28B"
  unit,                 // optional small unit suffix
  delta,                // number, e.g. 0.064 (fraction) — omit to hide
  deltaLabel = "YoY",
  deltaFormat = "percent",
  invertDelta = false,
  sparkData,            // array of numbers — omit to hide
  sparkColor = "var(--ds-signal-info)",
  accent = false,       // imperial accent stripe on the left edge
  style = {},
}) {
  // Accent stripe matches the variance (delta) colour.
  const up = (delta || 0) >= 0;
  const good = invertDelta ? !up : up;
  const stripeColor =
    delta == null || delta === 0
      ? "var(--ds-accent-imperial)"
      : good
      ? "var(--ds-signal-positive)"
      : "var(--ds-signal-negative)";
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "var(--ds-bg-hull)",
        border: "1px solid var(--ds-line-conduit)",
        borderRadius: "var(--ds-radius-md)",
        padding: "14px 16px 14px",
        overflow: "hidden",
        ...style,
      }}
    >
      {accent && (
        <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: stripeColor }} />
      )}
      <div
        style={{
          fontFamily: "var(--ds-font-display)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ds-text-secondary)",
        }}
      >
        {label}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span
          style={{
            fontFamily: "var(--ds-font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--ds-text-primary)",
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {unit && (
          <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 13, color: "var(--ds-text-muted)" }}>{unit}</span>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
          {delta != null && <DeltaIndicator value={delta} format={deltaFormat} invert={invertDelta} size="lg" />}
          {delta != null && (
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: 13, fontWeight: 500, color: "var(--ds-text-secondary)" }}>{deltaLabel}</span>
          )}
        </div>
        {sparkData && sparkData.length > 1 && (
          <Sparkline data={sparkData} width={180} height={36} color={sparkColor} showDots={false} style={{ flex: "0 0 50%", maxWidth: "50%" }} />
        )}
      </div>
    </div>
  );
}
