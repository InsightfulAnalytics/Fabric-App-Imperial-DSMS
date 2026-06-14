import * as React from "react";

export interface TopBarProps {
  title: string;
  /** "Filed under" path — a string or array of crumbs. */
  breadcrumb?: string | string[];
  /** Right-aligned controls (date-range Select, buttons). */
  children?: React.ReactNode;
  onToggleRail?: () => void;
  style?: React.CSSProperties;
}

export function TopBar(props: TopBarProps): JSX.Element;
