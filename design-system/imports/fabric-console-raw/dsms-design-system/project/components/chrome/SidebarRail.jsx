import React from "react";
import { Icon } from "../foundation/Icon.jsx";

/**
 * SidebarRail — the persistent left navigation. Imperial seal mark at top,
 * a page list with an accent-stripe active state, and a system-status pill at
 * the bottom. Collapses to an icon-only rail.
 */
export function SidebarRail({
  items = [],        // [{ id, label, icon }]
  active,
  onSelect,
  collapsed = false,
  statusLabel = "Subsidy Coverage",
  statusValue = "94%",
  statusTone = "positive", // "positive" | "warning" | "negative"
  style = {},
}) {
  const width = collapsed ? 60 : 232;
  const toneColor = {
    positive: "var(--ds-signal-positive)",
    warning: "var(--ds-signal-warning)",
    negative: "var(--ds-signal-negative)",
  }[statusTone];

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        width,
        flex: `0 0 ${width}px`,
        height: "100%",
        background: "var(--ds-bg-hull)",
        borderRight: "1px solid var(--ds-line-conduit)",
        ...style,
      }}
    >
      {/* Seal lockup */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 56,
          padding: collapsed ? "0" : "0 16px",
          justifyContent: collapsed ? "center" : "flex-start",
          borderBottom: "1px solid var(--ds-line-conduit)",
        }}
      >
        <Seal size={28} />
        {!collapsed && (
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 17, fontWeight: 700, letterSpacing: "0.14em", color: "var(--ds-text-primary)" }}>
              DSMS
            </div>
            <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 8.5, fontWeight: 600, letterSpacing: "0.22em", color: "var(--ds-text-faint)", marginTop: 3 }}>
              OPERATIONS CONSOLE
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: collapsed ? "8px 8px" : "8px 8px", overflowY: "auto" }}>
        {items.map((it) => {
          const on = it.id === active;
          return (
            <NavItem key={it.id} item={it} active={on} collapsed={collapsed} onClick={() => onSelect && onSelect(it.id)} />
          );
        })}
      </div>

      {/* Status pill */}
      <div style={{ padding: collapsed ? 8 : 12, borderTop: "1px solid var(--ds-line-conduit)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? "8px 0" : "8px 10px",
            background: "var(--ds-bg-deck)",
            border: "1px solid var(--ds-line-conduit)",
            borderRadius: "var(--ds-radius-xs)",
          }}
          title={`${statusLabel} ${statusValue}`}
        >
          <span style={{ width: 7, height: 7, borderRadius: 999, background: toneColor, flex: "0 0 auto", boxShadow: `0 0 8px ${toneColor}` }} />
          {!collapsed && (
            <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ds-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {statusLabel}
              </div>
              <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: 14, fontWeight: 600, color: toneColor, fontVariantNumeric: "tabular-nums", lineHeight: 1.2 }}>
                {statusValue}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavItem({ item, active, collapsed, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={item.label}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        height: 38,
        padding: collapsed ? 0 : "0 12px",
        justifyContent: collapsed ? "center" : "flex-start",
        marginBottom: 2,
        background: active ? "var(--ds-accent-imperial-dim)" : hover ? "var(--ds-bg-bay)" : "transparent",
        border: "none",
        borderRadius: "var(--ds-radius-xs)",
        cursor: "pointer",
        color: active ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
        transition: "background var(--ds-dur-fast) var(--ds-ease-standard)",
      }}
    >
      {active && (
        <span style={{ position: "absolute", left: 0, top: 7, bottom: 7, width: 2, background: "var(--ds-accent-imperial)", borderRadius: 1 }} />
      )}
      <span style={{ color: active ? "var(--ds-accent-imperial-hi)" : "inherit", display: "flex" }}>
        <Icon name={item.icon} size={18} />
      </span>
      {!collapsed && (
        <span style={{ fontFamily: "var(--ds-font-body)", fontSize: 13, fontWeight: active ? 600 : 500, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
          {item.label}
        </span>
      )}
    </button>
  );
}

/* Inline seal mark (matches assets/dsms-seal.svg) */
function Seal({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ flex: "0 0 auto" }}>
      <path d="M24 2 L43 13 L43 35 L24 46 L5 35 L5 13 Z" stroke="var(--ds-accent-imperial)" strokeWidth="1.6" fill="none" />
      <circle cx="24" cy="24" r="13" stroke="var(--ds-line-bright)" strokeWidth="1" fill="none" />
      <circle cx="24" cy="24" r="4.6" stroke="var(--ds-accent-imperial)" strokeWidth="1.6" fill="none" />
      <circle cx="24" cy="24" r="1.7" fill="var(--ds-accent-imperial)" />
    </svg>
  );
}
