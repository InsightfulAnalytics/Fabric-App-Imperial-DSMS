import * as React from "react";

export interface IconButtonProps {
  /** Lucide icon name. */
  icon?: string;
  size?: "sm" | "md";
  /** "ghost" (transparent) or "solid" (bay surface + hairline). */
  variant?: "ghost" | "solid";
  /** Active/selected — shows imperial wash + accent stripe. */
  active?: boolean;
  disabled?: boolean;
  /** Accessible label + tooltip. */
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
