import type { CSSProperties, ReactNode } from "react";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  actions?: ReactNode;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}

const SIZES: Record<NonNullable<SectionHeaderProps["size"]>, number> = {
  sm: 16,
  md: 20,
  lg: 26,
};

/** ALL-CAPS eyebrow + display title with a 1 px red underline beneath the title only. */
export function SectionHeader({
  eyebrow,
  title,
  actions,
  size = "md",
  style,
}: SectionHeaderProps) {
  const fs = SIZES[size];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 16,
        ...style,
      }}
    >
      <div style={{ minWidth: 0, flex: "1 1 auto" }}>
        {eyebrow && (
          <div className="ds-eyebrow" style={{ marginBottom: 6 }}>
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
      {actions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingBottom: 2,
            flex: "0 0 auto",
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
