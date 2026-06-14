import * as React from "react";

export interface SparklineProps {
  /** Chronological numeric series. */
  data?: number[];
  width?: number;
  height?: number;
  /** Line + area colour (any CSS colour or var). */
  color?: string;
  fillOpacity?: number;
  strokeWidth?: number;
  /** Green max-dot + red min-dot. */
  showDots?: boolean;
  /** Mono end-value label to the right of the line. */
  showEndLabel?: boolean;
  endLabel?: string;
  /** Baseline at 0 vs auto-range. */
  zero?: boolean;
  style?: React.CSSProperties;
}

export function Sparkline(props: SparklineProps): JSX.Element;
