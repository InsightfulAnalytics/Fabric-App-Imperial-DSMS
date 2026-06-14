import * as React from "react";

/**
 * @startingPoint section="Chrome" subtitle="Standard console card — hull surface, hairline border" viewport="700x300"
 */
export interface PanelProps {
  title?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  /** 16px body padding. Set false for flush content (tables, charts). */
  padded?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export function Panel(props: PanelProps): JSX.Element;
