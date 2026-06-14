import * as React from "react";

export interface InputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** Optional leading Lucide icon name. */
  icon?: string;
  type?: string;
  size?: "sm" | "md";
  disabled?: boolean;
  /** Negative-signal border. */
  invalid?: boolean;
  /** Render value in mono with tabular figures. */
  numeric?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
