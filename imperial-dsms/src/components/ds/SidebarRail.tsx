import { useState } from "react";
import { Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RailItem {
  id: string;
  label: string;
  Icon: LucideIcon;
}

interface SidebarRailProps {
  items: RailItem[];
  active: string;
  onSelect: (id: string) => void;
  collapsed?: boolean;
  /** Label on the information pill at the foot of the rail. */
  infoLabel?: string;
  /** Pin the report-information takeover (click). */
  onInfoClick?: () => void;
  /** Show / hide the temporary information preview (hover). */
  onInfoHoverChange?: (hovering: boolean) => void;
}

export function SidebarRail({
  items,
  active,
  onSelect,
  collapsed = false,
  infoLabel = "Report Information",
  onInfoClick,
  onInfoHoverChange,
}: SidebarRailProps) {
  const width = collapsed ? 60 : 232;

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
      }}
    >
      {/* Seal lockup */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 56,
          padding: collapsed ? 0 : "0 16px",
          justifyContent: collapsed ? "center" : "flex-start",
          borderBottom: "1px solid var(--ds-line-conduit)",
        }}
      >
        <Seal size={28} />
        {!collapsed && (
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontFamily: "var(--ds-font-display)",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--ds-text-primary)",
                whiteSpace: "nowrap",
              }}
            >
              IMPERIAL DSMS
            </div>
            <div
              style={{
                fontFamily: "var(--ds-font-display)",
                fontSize: 8.5,
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: "var(--ds-text-faint)",
                marginTop: 3,
              }}
            >
              OPERATIONS CONSOLE
            </div>
          </div>
        )}
      </div>

      {/* Items */}
      <div style={{ flex: 1, padding: 8, overflowY: "auto" }}>
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={item.id === active}
            collapsed={collapsed}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>

      {/* Information pill */}
      <div
        style={{
          padding: collapsed ? 8 : 12,
          borderTop: "1px solid var(--ds-line-conduit)",
        }}
      >
        <InfoPill
          label={infoLabel}
          collapsed={collapsed}
          onClick={onInfoClick}
          onHoverChange={onInfoHoverChange}
        />
      </div>
    </nav>
  );
}

function InfoPill({
  label,
  collapsed,
  onClick,
  onHoverChange,
}: {
  label: string;
  collapsed: boolean;
  onClick?: () => void;
  onHoverChange?: (hovering: boolean) => void;
}) {
  const [hover, setHover] = useState(false);
  const green = "var(--ds-signal-positive)";
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => {
        setHover(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        onHoverChange?.(false);
      }}
      title={label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        width: "100%",
        minHeight: 40,
        justifyContent: collapsed ? "center" : "flex-start",
        padding: collapsed ? "10px 0" : "10px 12px",
        background: hover ? "var(--ds-bg-bay)" : "var(--ds-bg-deck)",
        border: `1px solid ${hover ? "var(--ds-line-bright)" : "var(--ds-line-conduit)"}`,
        borderRadius: "var(--ds-radius-xs)",
        cursor: "pointer",
        transition: "background var(--ds-dur-fast) var(--ds-ease-standard), border-color var(--ds-dur-fast) var(--ds-ease-standard)",
      }}
    >
      {/* Green lower-case "i" — information */}
      <span
        style={{
          display: "flex",
          flex: "0 0 auto",
          color: green,
          filter: `drop-shadow(0 0 6px ${green})`,
        }}
      >
        <Info size={16} strokeWidth={2} />
      </span>
      {!collapsed && (
        <span
          style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ds-text-secondary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}

function NavItem({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: RailItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const Icon = item.Icon;
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
        background: active
          ? "var(--ds-accent-imperial-dim)"
          : hover
            ? "var(--ds-bg-bay)"
            : "transparent",
        border: "none",
        borderRadius: "var(--ds-radius-xs)",
        cursor: "pointer",
        color: active ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
        transition: "background var(--ds-dur-fast) var(--ds-ease-standard)",
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 7,
            bottom: 7,
            width: 2,
            background: "var(--ds-accent-imperial)",
            borderRadius: 1,
          }}
        />
      )}
      <span
        style={{
          color: active ? "var(--ds-accent-imperial-hi)" : "inherit",
          display: "flex",
        }}
      >
        <Icon size={18} strokeWidth={1.75} />
      </span>
      {!collapsed && (
        <span
          style={{
            fontFamily: "var(--ds-font-body)",
            fontSize: 13,
            fontWeight: active ? 600 : 500,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {item.label}
        </span>
      )}
    </button>
  );
}

function Seal({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{ flex: "0 0 auto" }}
    >
      <path
        d="M24 2 L43 13 L43 35 L24 46 L5 35 L5 13 Z"
        stroke="var(--ds-accent-imperial)"
        strokeWidth="1.6"
      />
      <circle cx="24" cy="24" r="13" stroke="var(--ds-line-bright)" strokeWidth="1" />
      <circle cx="24" cy="24" r="4.6" stroke="var(--ds-accent-imperial)" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="1.7" fill="var(--ds-accent-imperial)" />
    </svg>
  );
}
