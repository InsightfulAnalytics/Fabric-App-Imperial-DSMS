import React from "react";
import { Icon } from "../foundation/Icon.jsx";

/**
 * Button — primary action control for the DSMS console.
 * Austere: 2px radius, flat fills, hairline borders, no drop shadow.
 */
export function Button({
  children,
  variant = "secondary", // "primary" | "secondary" | "ghost" | "danger"
  size = "md",           // "sm" | "md"
  icon,                  // optional lucide name, leading
  iconTrailing,          // optional lucide name, trailing
  disabled = false,
  block = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    sm: { h: 28, px: 10, font: 12, gap: 6, icon: 14 },
    md: { h: 34, px: 14, font: 13, gap: 7, icon: 16 },
  }[size];

  const palettes = {
    primary: {
      bg: "var(--ds-accent-imperial)",
      bgHover: "var(--ds-accent-imperial-hi)",
      bgActive: "var(--ds-accent-imperial-lo)",
      fg: "var(--ds-text-on-accent)",
      border: "transparent",
    },
    danger: {
      bg: "var(--ds-accent-imperial)",
      bgHover: "var(--ds-accent-imperial-hi)",
      bgActive: "var(--ds-accent-imperial-lo)",
      fg: "var(--ds-text-on-accent)",
      border: "transparent",
    },
    secondary: {
      bg: "var(--ds-bg-bay)",
      bgHover: "var(--ds-bg-deck)",
      bgActive: "var(--ds-bg-hull)",
      fg: "var(--ds-text-primary)",
      border: "var(--ds-line-conduit)",
      borderHover: "var(--ds-line-bright)",
    },
    ghost: {
      bg: "transparent",
      bgHover: "var(--ds-bg-bay)",
      bgActive: "var(--ds-bg-hull)",
      fg: "var(--ds-text-secondary)",
      border: "transparent",
    },
  };
  const p = palettes[variant] || palettes.secondary;
  const bg = disabled ? "var(--ds-bg-hull)" : active ? p.bgActive : hover ? p.bgHover : p.bg;
  const borderColor = disabled
    ? "var(--ds-line-faint)"
    : hover && p.borderHover
    ? p.borderHover
    : p.border;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: sizes.gap,
        height: sizes.h,
        padding: `0 ${sizes.px}px`,
        fontFamily: "var(--ds-font-display)",
        fontSize: sizes.font,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: disabled ? "var(--ds-text-faint)" : p.fg,
        background: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--ds-radius-xs)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--ds-dur-fast) var(--ds-ease-standard), border-color var(--ds-dur-fast) var(--ds-ease-standard)",
        whiteSpace: "nowrap",
        userSelect: "none",
        ...style,
      }}
      {...rest}
    >
      {icon && <Icon name={icon} size={sizes.icon} />}
      {children}
      {iconTrailing && <Icon name={iconTrailing} size={sizes.icon} />}
    </button>
  );
}
