import { SectionHeader } from "@/components/ds";

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
}

export function PlaceholderPage({ eyebrow, title }: PlaceholderPageProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          gap: 12,
          background: "var(--ds-bg-hull)",
          border: "1px solid var(--ds-line-conduit)",
          borderRadius: "var(--ds-radius-md)",
          color: "var(--ds-text-muted)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 14,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 12, color: "var(--ds-text-faint)" }}>
          Page reserved — next implementation pass.
        </div>
      </div>
    </div>
  );
}
