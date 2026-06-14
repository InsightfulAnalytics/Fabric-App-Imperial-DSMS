import * as React from "react";

/**
 * @startingPoint section="Data" subtitle="Briefing KPI tile — eyebrow, mono value, YoY delta, sparkline" viewport="700x180"
 */
export interface KpiTileProps {
  label: string;
  /** Preformatted display value, e.g. "₡ 1.28B". */
  value: string;
  /** Optional small unit suffix. */
  unit?: string;
  /** YoY change. Fraction for percent format. Omit to hide. */
  delta?: number;
  deltaLabel?: string;
  deltaFormat?: "percent" | "number" | "none";
  /** Flip delta colour — down is good. */
  invertDelta?: boolean;
  /** 12-month series for the inline sparkline. Omit to hide. */
  sparkData?: number[];
  sparkColor?: string;
  /** Imperial accent stripe on the left edge. */
  accent?: boolean;
  style?: React.CSSProperties;
}

export function KpiTile(props: KpiTileProps): JSX.Element;
