import { Menu } from "lucide-react";
import type { ReactNode } from "react";

interface TopBarProps {
  title: string;
  breadcrumb?: string[];
  /** Optional label shown inline after the title, divided by a hairline rule. */
  meta?: ReactNode;
  onToggleRail?: () => void;
  children?: ReactNode;
}

export function TopBar({ title, breadcrumb = [], meta, onToggleRail, children }: TopBarProps) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: "var(--ds-topbar-height)",
        padding: "0 24px",
        background: "var(--ds-bg-hull)",
        borderBottom: "1px solid var(--ds-line-conduit)",
        flex: "0 0 auto",
      }}
    >
      {onToggleRail && (
        <button
          type="button"
          onClick={onToggleRail}
          aria-label="Toggle navigation rail"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            background: "transparent",
            color: "var(--ds-text-secondary)",
            border: "1px solid var(--ds-line-conduit)",
            borderRadius: "var(--ds-radius-xs)",
            cursor: "pointer",
          }}
        >
          <Menu size={16} strokeWidth={1.75} />
        </button>
      )}

      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        {breadcrumb.length > 0 && (
          <div
            className="ds-eyebrow"
            style={{
              fontSize: 9,
              letterSpacing: "0.18em",
              color: "var(--ds-text-muted)",
            }}
          >
            {breadcrumb.map((c, i) => (
              <span key={i}>
                {c}
                {i < breadcrumb.length - 1 && (
                  <span style={{ margin: "0 6px", color: "var(--ds-text-faint)" }}>/</span>
                )}
              </span>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, minWidth: 0 }}>
          <span
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "0.01em",
              color: "var(--ds-text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </span>
          {meta && (
            <>
              <span
                aria-hidden
                style={{
                  alignSelf: "center",
                  flex: "0 0 auto",
                  width: 1,
                  height: 15,
                  background: "var(--ds-line-bright)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--ds-font-display)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ds-text-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {meta}
              </span>
            </>
          )}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>{children}</div>
    </header>
  );
}
