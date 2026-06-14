import React from "react";
import { Icon } from "../foundation/Icon.jsx";

/**
 * TopBar — persistent page header: the page title, a "Filed under" breadcrumb,
 * and a slot on the right for the date-range selector and other controls.
 */
export function TopBar({
  title,
  breadcrumb,          // string or array of strings — "Filed under" path
  children,            // right-aligned controls
  onToggleRail,
  style = {},
}) {
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : breadcrumb ? [breadcrumb] : [];
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 56,
        flex: "0 0 56px",
        padding: "0 20px",
        background: "var(--ds-bg-hull)",
        borderBottom: "1px solid var(--ds-line-conduit)",
        ...style,
      }}
    >
      {onToggleRail && (
        <button
          type="button"
          onClick={onToggleRail}
          aria-label="Toggle navigation"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "transparent", border: "none", borderRadius: "var(--ds-radius-xs)", color: "var(--ds-text-muted)", cursor: "pointer" }}
        >
          <Icon name="panel-left" size={18} />
        </button>
      )}

      <div style={{ minWidth: 0 }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--ds-font-display)",
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: "0.01em",
            color: "var(--ds-text-primary)",
            lineHeight: 1.1,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h1>
        {crumbs.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <span style={{ fontFamily: "var(--ds-font-body)", fontSize: 10.5, color: "var(--ds-text-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Filed under
            </span>
            {crumbs.map((c, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Icon name="chevron-right" size={11} style={{ color: "var(--ds-text-faint)" }} />}
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: 11, color: "var(--ds-text-muted)" }}>{c}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>{children}</div>
    </header>
  );
}
