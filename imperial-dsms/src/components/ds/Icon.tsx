import type { CSSProperties } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "activity", "alert-triangle". */
  name?: string;
  /** Square size in px. Default 16. */
  size?: number;
  strokeWidth?: number;
  style?: CSSProperties;
  className?: string;
}

function toPascal(name: string): string {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

/** Schematic stroke glyph (Lucide), recoloured via `currentColor`. */
export function Icon({
  name = "circle",
  size = 16,
  strokeWidth = 1.75,
  style,
  className,
}: IconProps) {
  const pascal = toPascal(name);
  const Cmp = (LucideIcons as unknown as Record<string, LucideIcon | undefined>)[pascal];
  if (!Cmp) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ flex: "0 0 auto", display: "inline-block", ...style }}
        className={className}
        aria-label={name}
        role="img"
      />
    );
  }
  return (
    <Cmp
      size={size}
      strokeWidth={strokeWidth}
      style={{ flex: "0 0 auto", display: "inline-block", ...style }}
      className={className}
      aria-label={name}
      role="img"
    />
  );
}
