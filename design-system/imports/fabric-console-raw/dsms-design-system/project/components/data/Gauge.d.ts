import * as React from "react";

export interface GaugeProps {
  /** 0..1 coverage value. */
  value?: number;
  /** Turns negative-signal below this fraction. Default 0.7. */
  redBelow?: number;
  /** Turns warning below this fraction. Default 0.85. */
  warnBelow?: number;
  label?: string;
  size?: number;
  thickness?: number;
  style?: React.CSSProperties;
}

export function Gauge(props: GaugeProps): JSX.Element;
