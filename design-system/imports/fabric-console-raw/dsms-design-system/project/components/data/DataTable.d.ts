import * as React from "react";

export interface DataTableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  /** Mono + tabular figures + primary text colour. */
  numeric?: boolean;
  width?: number | string;
  /** Custom cell renderer for conditional formatting (e.g. a StatusPill). */
  render?: (row: any) => React.ReactNode;
}

/**
 * @startingPoint section="Data" subtitle="Dense console table with conditional formatting" viewport="700x320"
 */
export interface DataTableProps {
  columns: DataTableColumn[];
  rows: any[];
  /** Field used as the React row key. Default "id". */
  rowKey?: string;
  dense?: boolean;
  onRowClick?: (row: any, index: number) => void;
  style?: React.CSSProperties;
}

export function DataTable(props: DataTableProps): JSX.Element;
