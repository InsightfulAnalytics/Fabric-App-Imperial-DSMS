import type { CSSProperties, ReactNode } from "react";

export interface PanelProps {
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
  /** Right-aligned slot inside the panel header. Alias: `actions`. */
  action?: ReactNode;
  /** Right-aligned slot inside the panel header. */
  actions?: ReactNode;
  /** Subtle inline note shown next to the title. */
  note?: string;
  /** Body padding. Number = px; set `false` for flush content (tables, charts). */
  pad?: number | boolean;
  /** Backwards-compat alias for `pad`. */
  padded?: boolean;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}

/** Imperial card surface — hairline border, no shadow, 4 px corners. */
export function Panel({
  eyebrow,
  title,
  children,
  action,
  actions,
  note,
  pad,
  padded,
  style,
  bodyStyle,
}: PanelProps) {
  const trailing = actions ?? action;
  const hasHeader = Boolean(eyebrow || title || trailing);

  // Resolve padding from any of (pad | padded | default 16).
  let bodyPad = 16;
  let headerPad = 16;
  if (typeof pad === "number") {
    bodyPad = headerPad = pad;
  } else if (pad === false || padded === false) {
    bodyPad = 0;
  }

  return (
    <section
      style={{
        background: "var(--ds-bg-hull)",
        border: "1px solid var(--ds-line-conduit)",
        borderRadius: "var(--ds-radius-md)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {hasHeader && (
        <header
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 12,
            padding: `${headerPad}px ${headerPad}px 10px ${headerPad}px`,
            borderBottom: "1px solid var(--ds-line-faint)",
          }}
        >
          <div style={{ minWidth: 0 }}>
            {eyebrow && (
              <div className="ds-eyebrow" style={{ marginBottom: 4 }}>
                {eyebrow}
              </div>
            )}
            {title && (
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--ds-font-display)",
                  fontSize: "var(--ds-text-lg)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  color: "var(--ds-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
                {note && (
                  <span
                    style={{
                      marginLeft: 10,
                      fontFamily: "var(--ds-font-body)",
                      fontWeight: 400,
                      fontSize: "var(--ds-text-xs)",
                      color: "var(--ds-text-muted)",
                    }}
                  >
                    {note}
                  </span>
                )}
              </h3>
            )}
          </div>
          {trailing && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
              {trailing}
            </div>
          )}
        </header>
      )}
      <div style={{ padding: bodyPad, flex: 1, minHeight: 0, ...bodyStyle }}>{children}</div>
    </section>
  );
}
