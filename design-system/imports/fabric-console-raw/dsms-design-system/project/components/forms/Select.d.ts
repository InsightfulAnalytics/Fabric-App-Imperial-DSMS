import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  /** Options as `{value,label}` objects or plain strings. */
  options?: Array<SelectOption | string>;
  size?: "sm" | "md";
  /** Optional leading Lucide icon name. */
  icon?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
