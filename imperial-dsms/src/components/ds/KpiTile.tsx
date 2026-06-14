import type { CSSProperties } from "react";
import { DeltaIndicator, deltaColor } from "./DeltaIndicator";
import { Sparkline } from "./Sparkline";

export interface KpiTileProps {
  label: string;
  /** Preformatted display value, e.g. "₡ 1.28B". */
  value: string;
  /** Optional small unit suffix (e.g. "CR", "%"). */
  unit?: string;
  /** YoY variance — fractional (e.g. 0.064 = +6.4%). */
  delta?: number;
  /** Label next to the delta — defaults to "YoY". */
  deltaLabel?: string;
  /** Delta number format. */
  deltaFormat?: "percent" | "number" | "none";
  /** If true, a negative delta is good (e.g. expenses falling). */
  invertDelta?: boolean;
  /** Optional sparkline values — last 12 months etc. */
  spark?: number[];
  sparkColor?: string;
  /** Imperial accent stripe on the left edge (always-on, regardless of delta). */
  accent?: boolean;
  isLoading?: boolean;
  style?: CSSProperties;
}

/**
 * KPI tile — label, big mono value, delta + YoY label, sparkline on the right.
 * Left edge carries an accent stripe coloured to match the variance (or the
 * imperial accent if `accent` is forced on / no delta is supplied).
 */
export function KpiTile({
  label,
  value,
  unit,
  delta,
  deltaLabel = "YoY",
  deltaFormat = "percent",
  invertDelta = false,
  spark,
  sparkColor,
  accent = true,
  isLoading = false,
  style,
}: KpiTileProps) {
  const stripeColor =
    delta == null || delta === 0
      ? "var(--ds-accent-imperial)"
      : deltaColor(delta, invertDelta);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "14px 16px 12px 18px",
        background: "var(--ds-bg-hull)",
        border: "1px solid var(--ds-line-conduit)",
        borderRadius: "var(--ds-radius-md)",
        minHeight: 110,
        overflow: "hidden",
        ...style,
      }}
    >
      {accent && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 3,
            background: stripeColor,
            borderRadius: 1.5,
          }}
        />
      )}

      <div
        style={{
          fontFamily: "var(--ds-font-display)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ds-text-secondary)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 12,
          minWidth: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, minWidth: 0, flex: 1 }}>
          <span
            className="ds-num"
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "var(--ds-text-primary)",
              lineHeight: 1.05,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {isLoading ? <span style={{ color: "var(--ds-text-faint)" }}>—</span> : value}
          </span>
          {unit && (
            <span
              style={{
                fontFamily: "var(--ds-font-mono)",
                fontSize: 13,
                color: "var(--ds-text-muted)",
              }}
            >
              {unit}
            </span>
          )}
        </div>
        {spark && spark.length > 1 && (
          <div style={{ flex: "0 0 auto" }}>
            <Sparkline
              values={spark}
              width={140}
              height={36}
              color={sparkColor ?? "var(--ds-signal-info)"}
            />
          </div>
        )}
      </div>

      {delta != null && deltaFormat !== "none" && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <DeltaIndicator
            value={delta}
            invert={invertDelta}
            format={deltaFormat}
            size="md"
          />
          {deltaLabel && (
            <span
              style={{
                fontFamily: "var(--ds-font-display)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ds-text-muted)",
              }}
            >
              {deltaLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
