import React from "react";

/**
 * StatusPill — compact status / risk tag. Used for vendor Risk Rating,
 * work-order status, stock status. Soft tint by default; `solid` for the
 * loudest critical states, `outline` for quiet ones.
 */
export function StatusPill({
  children,
  status = "neutral",   // "positive" | "negative" | "warning" | "info" | "neutral"
  variant = "soft",     // "soft" | "solid" | "outline"
  dot = true,
  size = "md",          // "sm" | "md"
  style = {},
}) {
  const map = {
    positive: { fg: "var(--ds-signal-positive)", dim: "var(--ds-signal-positive-dim)" },
    negative: { fg: "var(--ds-signal-negative)", dim: "var(--ds-signal-negative-dim)" },
    warning:  { fg: "var(--ds-signal-warning)",  dim: "var(--ds-signal-warning-dim)" },
    info:     { fg: "var(--ds-signal-info)",      dim: "var(--ds-signal-info-dim)" },
    neutral:  { fg: "var(--ds-text-secondary)",   dim: "var(--ds-bg-bay)" },
  };
  const c = map[status] || map.neutral;
  const s = size === "sm" ? { h: 18, px: 6, fs: 10, gap: 4, d: 5 } : { h: 22, px: 8, fs: 11, gap: 5, d: 6 };

  let bg = c.dim;
  let fg = c.fg;
  let border = "transparent";
  if (variant === "solid") {
    bg = c.fg;
    fg = status === "warning" ? "#1A1206" : "var(--ds-text-on-accent)";
  } else if (variant === "outline") {
    bg = "transparent";
    border = "color-mix(in srgb, " + "currentColor 40%, transparent)";
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        height: s.h,
        padding: `0 ${s.px}px`,
        background: bg,
        color: fg,
        border: variant === "outline" ? `1px solid ${c.fg}` : `1px solid ${border}`,
        borderRadius: "var(--ds-radius-xs)",
        fontFamily: "var(--ds-font-display)",
        fontSize: s.fs,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: s.d,
            height: s.d,
            borderRadius: "999px",
            background: variant === "solid" ? fg : c.fg,
            flex: "0 0 auto",
          }}
        />
      )}
      {children}
    </span>
  );
}
