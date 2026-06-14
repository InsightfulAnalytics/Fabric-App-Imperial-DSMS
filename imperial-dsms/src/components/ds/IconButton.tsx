import { useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

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
  style?: CSSProperties;
}

/** Square icon-only control — toolbars, table rows, collapsed rail. */
export function IconButton({
  icon = "circle",
  size = "md",
  variant = "ghost",
  active = false,
  disabled = false,
  title,
  onClick,
  style,
}: IconButtonProps) {
  const [hover, setHover] = useState(false);
  const dim = size === "sm" ? 28 : 34;
  const iconSize = size === "sm" ? 15 : 17;

  let bg = "transparent";
  let fg = "var(--ds-text-secondary)";
  let border = "transparent";

  if (variant === "solid") {
    bg = "var(--ds-bg-bay)";
    border = "var(--ds-line-conduit)";
  }
  if (hover && !disabled) {
    bg = "var(--ds-bg-bay)";
    fg = "var(--ds-text-primary)";
  }
  if (active) {
    bg = "var(--ds-accent-imperial-dim)";
    fg = "var(--ds-accent-imperial-hi)";
    border = "transparent";
  }
  if (disabled) {
    fg = "var(--ds-text-faint)";
    bg = "transparent";
  }

  return (
    <button
      type="button"
      title={title}
      aria-label={title || icon}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        color: fg,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "var(--ds-radius-xs)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition:
          "background var(--ds-dur-fast) var(--ds-ease-standard), color var(--ds-dur-fast) var(--ds-ease-standard)",
        position: "relative",
        ...style,
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 5,
            bottom: 5,
            width: 2,
            background: "var(--ds-accent-imperial)",
            borderRadius: 1,
          }}
        />
      )}
      <Icon name={icon} size={iconSize} />
    </button>
  );
}
