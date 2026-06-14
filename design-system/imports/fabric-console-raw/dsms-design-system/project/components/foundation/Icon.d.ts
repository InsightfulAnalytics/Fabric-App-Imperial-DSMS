import * as React from "react";

export interface IconProps {
  /** Lucide icon name, e.g. "activity", "alert-triangle", "chevron-down". */
  name?: string;
  /** Square size in px. Default 16. */
  size?: number;
  /** Reserved for future stroke control; Lucide masks ignore it. */
  strokeWidth?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Schematic stroke glyph (Lucide), recoloured via `currentColor`.
 */
export function Icon(props: IconProps): JSX.Element;
