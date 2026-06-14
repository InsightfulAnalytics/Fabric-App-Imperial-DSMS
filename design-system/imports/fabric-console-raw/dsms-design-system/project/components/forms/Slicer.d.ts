import * as React from "react";

export interface SlicerOption {
  value: string;
  label: string;
}

export interface SlicerProps {
  /** Options as `{value,label}` objects or plain strings. */
  options?: Array<SlicerOption | string>;
  /** Controlled selected value. */
  value?: string;
  defaultValue?: string;
  size?: "sm" | "md";
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export function Slicer(props: SlicerProps): JSX.Element;
