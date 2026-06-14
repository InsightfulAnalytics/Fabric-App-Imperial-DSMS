import * as React from "react";

export interface SwitchProps {
  /** Controlled on/off. */
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  /** Optional trailing label. */
  label?: string;
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
