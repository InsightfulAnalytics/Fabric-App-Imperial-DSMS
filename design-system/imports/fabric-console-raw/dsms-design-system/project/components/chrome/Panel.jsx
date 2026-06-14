import React from "react";

/**
 * Panel — the standard console card: hull surface, 1px conduit border, 4px
 * radius, no shadow. Optional header row with an eyebrow/title and trailing
 * actions, separated by a hairline rule.
 */
export function Panel({
  title,
  eyebrow,
  actions,
  padded = true,
  children,
  style = {},
  bodyStyle = {},
}) {
  const hasHeader = title || eyebrow || actions;
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--ds-bg-hull)",
        border: "1px solid var(--ds-line-conduit)",
        borderRadius: "var(--ds-radius-md)",
        overflow: "hidden",
        ...style,
      }}
    >
      {hasHeader && (
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 16px",
            borderBottom: "1px solid var(--ds-line-conduit)",
          }}
        >
          <div style={{ minWidth: 0, flex: "1 1 auto" }}>
            {eyebrow && (
              <div
                style={{
                  fontFamily: "var(--ds-font-display)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ds-text-muted)",
                  marginBottom: title ? 3 : 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {eyebrow}
              </div>
            )}
            {title && (
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--ds-font-display)",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  color: "var(--ds-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </h3>
            )}
          </div>
          {actions && <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>{actions}</div>}
        </header>
      )}
      <div style={{ padding: padded ? 16 : 0, flex: 1, minHeight: 0, ...bodyStyle }}>{children}</div>
    </section>
  );
}
