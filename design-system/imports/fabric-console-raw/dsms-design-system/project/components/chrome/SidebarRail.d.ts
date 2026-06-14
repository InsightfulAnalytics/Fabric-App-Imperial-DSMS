import * as React from "react";

export interface SidebarItem {
  id: string;
  label: string;
  /** Lucide icon name. */
  icon: string;
}

export interface SidebarRailProps {
  items?: SidebarItem[];
  /** id of the active item. */
  active?: string;
  onSelect?: (id: string) => void;
  /** Icon-only 60px rail. */
  collapsed?: boolean;
  statusLabel?: string;
  statusValue?: string;
  statusTone?: "positive" | "warning" | "negative";
  style?: React.CSSProperties;
}

export function SidebarRail(props: SidebarRailProps): JSX.Element;
