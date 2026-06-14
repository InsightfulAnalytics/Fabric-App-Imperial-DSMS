import React from "react";
import { Icon } from "../foundation/Icon.jsx";

/**
 * IconButton — square icon-only control. Used in toolbars, table rows,
 * and the collapsed rail. Supports an `active` state with the imperial wash.
 */
export function IconButton({
  icon = "circle",
  size = "md",        // "sm" | "md"
  variant = "ghost",  // "ghost" | "solid"
  active = false,
  disabled = false,
  title,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = { sm: 28, md: 34 }[size];
  const iconSize = { sm: 15, md: 17 }[size];

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
        transition: "background var(--ds-dur-fast) var(--ds-ease-standard), color var(--ds-dur-fast) var(--ds-ease-standard)",
        position: "relative",
        ...style,
      }}
      {...rest}
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
