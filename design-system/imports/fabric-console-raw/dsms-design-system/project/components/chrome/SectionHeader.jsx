import React from "react";

/**
 * SectionHeader — page/section heading. ALL-CAPS eyebrow above a display title,
 * with a 1px imperial underline beneath the title only. Optional trailing actions.
 */
export function SectionHeader({
  eyebrow,
  title,
  actions,
  size = "md",        // "sm" | "md" | "lg"
  style = {},
}) {
  const fs = { sm: 16, md: 20, lg: 26 }[size];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, ...style }}>
      <div style={{ minWidth: 0, flex: "1 1 auto" }}>
        {eyebrow && (
          <div
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ds-text-muted)",
              marginBottom: 6,
            }}
          >
            {eyebrow}
          </div>
        )}
        <h2
          style={{
            margin: 0,
            display: "inline-block",
            paddingBottom: 6,
            borderBottom: "1px solid var(--ds-accent-imperial)",
            fontFamily: "var(--ds-font-display)",
            fontSize: fs,
            fontWeight: 700,
            letterSpacing: "-0.005em",
            color: "var(--ds-text-primary)",
            lineHeight: 1.1,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
      </div>
      {actions && <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 2 }}>{actions}</div>}
    </div>
  );
}
