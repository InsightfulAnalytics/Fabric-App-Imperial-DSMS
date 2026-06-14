import * as React from "react";

export interface StatusPillProps {
  children?: React.ReactNode;
  status?: "positive" | "negative" | "warning" | "info" | "neutral";
  variant?: "soft" | "solid" | "outline";
  /** Leading status dot. */
  dot?: boolean;
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

export function StatusPill(props: StatusPillProps): JSX.Element;
