import * as React from "react";

/**
 * @startingPoint section="Forms" subtitle="Imperial action button — primary, secondary, ghost, danger" viewport="700x150"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual weight. Default "secondary". */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Control height. Default "md". */
  size?: "sm" | "md";
  /** Leading Lucide icon name. */
  icon?: string;
  /** Trailing Lucide icon name. */
  iconTrailing?: string;
  disabled?: boolean;
  /** Full-width block button. */
  block?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
