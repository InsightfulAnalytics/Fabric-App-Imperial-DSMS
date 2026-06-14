import * as React from "react";

export interface DeltaIndicatorProps {
  /** The change. Fraction (0.064 = +6.4%) for "percent"; raw for "number". */
  value?: number;
  format?: "percent" | "number" | "none";
  /** Flip colour meaning — down is good (expenses, losses). */
  invert?: boolean;
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  style?: React.CSSProperties;
}

export function DeltaIndicator(props: DeltaIndicatorProps): JSX.Element;
