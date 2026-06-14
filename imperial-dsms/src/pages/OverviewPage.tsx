import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ReportTone = "positive" | "warning" | "negative" | "info";

export interface OverviewReport {
  /** Page id to navigate to on click. */
  id: string;
  Icon: LucideIcon;
  /** Domain eyebrow, e.g. "Finance · P&L". */
  domain: string;
  title: string;
  blurb: string;
  /** "Inside This Report" chip labels. */
  inside: string[];
  metric: { label: string; value: string; tone: ReportTone };
}

interface OverviewPageProps {
  reports: OverviewReport[];
  onNavigate: (id: string) => void;
  /** Trailing-twelve-month subsidy coverage shown in the masthead meta strip. */
  coverage?: string;
}

const TONE: Record<ReportTone, string> = {
  positive: "var(--ds-signal-positive)",
  warning: "var(--ds-signal-warning)",
  negative: "var(--ds-signal-negative)",
  info: "var(--ds-signal-info)",
};

const EYEBROW = {
  fontFamily: "var(--ds-font-display)",
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: "var(--ds-text-muted)",
};

export function OverviewPage({ reports, onNavigate, coverage = "94%" }: OverviewPageProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Masthead */}
      <div
        style={{
          background: "var(--ds-bg-hull)",
          border: "1px solid var(--ds-line-conduit)",
          borderRadius: "var(--ds-radius-md)",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) auto",
          alignItems: "stretch",
        }}
      >
        <div style={{ padding: "26px 28px" }}>
          <div style={{ ...EYEBROW, fontSize: 10.5, letterSpacing: "0.18em", marginBottom: 14 }}>
            Operations Intelligence · Station DS-1
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--ds-font-display)",
              fontSize: 30,
              fontWeight: 700,
              color: "var(--ds-text-primary)",
              lineHeight: 1.1,
              letterSpacing: "0.005em",
              display: "inline-block",
              paddingBottom: 12,
              borderBottom: "2px solid var(--ds-accent-imperial)",
            }}
          >
            Station Operations Console
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              maxWidth: 620,
              fontSize: 13.5,
              lineHeight: 1.65,
              color: "var(--ds-text-secondary)",
              textWrap: "pretty",
            }}
          >
            Death Star Management Services maintains {reports.length} command report
            {reports.length === 1 ? "" : "s"} covering the financial, procurement, logistics,
            personnel, and reliability posture of the DS-1 Orbital Battle Station. Select a report
            below to open its full readout. All figures are trailing-twelve-month to 0&nbsp;BBY.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "26px 10px",
            borderLeft: "1px solid var(--ds-line-conduit)",
            background: "var(--ds-bg-void)",
            borderTopRightRadius: "var(--ds-radius-md)",
            borderBottomRightRadius: "var(--ds-radius-md)",
          }}
        >
          <MetaItem label="Reports" value={String(reports.length).padStart(2, "0")} />
          <MetaItem label="Refreshed" value="0 BBY" />
          <MetaItem label="Coverage" value={coverage} tone="var(--ds-signal-positive)" />
          <MetaItem label="Clearance" value="EYES ONLY" tone="var(--ds-accent-imperial-hi)" last />
        </div>
      </div>

      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <div>
          <div style={{ ...EYEBROW, fontSize: 10, letterSpacing: "0.16em", marginBottom: 8 }}>
            Available Readouts
          </div>
          <div
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 19,
              fontWeight: 700,
              color: "var(--ds-text-primary)",
              display: "inline-block",
              paddingBottom: 8,
              borderBottom: "1px solid var(--ds-accent-imperial)",
            }}
          >
            Report Library
          </div>
        </div>
        <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-text-faint)" }}>
          Filed under Operations · last refreshed 0 BBY
        </span>
      </div>

      {/* Report grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        {reports.map((r) => (
          <ReportCard key={r.id} report={r} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function ReportCard({
  report: r,
  onNavigate,
}: {
  report: OverviewReport;
  onNavigate: (id: string) => void;
}) {
  const [hover, setHover] = useState(false);
  const tone = TONE[r.metric.tone];
  const Icon = r.Icon;
  return (
    <button
      type="button"
      onClick={() => onNavigate(r.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        padding: "20px 22px",
        gap: 16,
        width: "100%",
        background: hover ? "var(--ds-bg-bay)" : "var(--ds-bg-hull)",
        border: `1px solid ${hover ? "var(--ds-line-bright)" : "var(--ds-line-conduit)"}`,
        borderRadius: "var(--ds-radius-md)",
        transition:
          "background var(--ds-dur-fast) var(--ds-ease-standard), border-color var(--ds-dur-fast) var(--ds-ease-standard)",
        font: "inherit",
        color: "inherit",
      }}
    >
      {/* leading imperial accent stripe — the one motif, on hover */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 16,
          bottom: 16,
          width: 2,
          background: "var(--ds-accent-imperial)",
          borderRadius: 1,
          opacity: hover ? 1 : 0,
          transition: "opacity var(--ds-dur-fast) var(--ds-ease-standard)",
        }}
      />

      {/* header: icon tile + title block + metric chip */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <span
          style={{
            flex: "0 0 auto",
            width: 42,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--ds-bg-deck)",
            border: `1px solid ${hover ? "var(--ds-accent-imperial)" : "var(--ds-line-conduit)"}`,
            borderRadius: "var(--ds-radius-sm)",
            color: hover ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-secondary)",
            transition: "border-color var(--ds-dur-fast), color var(--ds-dur-fast)",
          }}
        >
          <Icon size={20} strokeWidth={1.75} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...EYEBROW, fontSize: 9.5, letterSpacing: "0.14em", marginBottom: 5 }}>
            {r.domain}
          </div>
          <div
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 17,
              fontWeight: 700,
              color: "var(--ds-text-primary)",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}
          >
            {r.title}
          </div>
        </div>
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
            paddingLeft: 8,
          }}
        >
          <span style={{ ...EYEBROW, fontSize: 8.5, letterSpacing: "0.12em" }}>{r.metric.label}</span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--ds-font-mono)",
              fontSize: 15,
              fontWeight: 600,
              color: tone,
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tone, flex: "0 0 auto" }} />
            {r.metric.value}
          </span>
        </div>
      </div>

      {/* blurb */}
      <p
        style={{
          margin: 0,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: "var(--ds-text-secondary)",
          textWrap: "pretty",
        }}
      >
        {r.blurb}
      </p>

      {/* inside chips */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ ...EYEBROW, fontSize: 8.5, letterSpacing: "0.14em" }}>Inside This Report</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {r.inside.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 11,
                color: "var(--ds-text-muted)",
                padding: "3px 8px",
                background: "var(--ds-bg-deck)",
                border: "1px solid var(--ds-line-faint)",
                borderRadius: "var(--ds-radius-xs)",
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* footer: open affordance */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: 14,
          borderTop: "1px solid var(--ds-line-faint)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--ds-font-mono)",
            fontSize: 10.5,
            color: "var(--ds-text-faint)",
            letterSpacing: "0.02em",
          }}
        >
          Filed under {r.domain.split(" · ")[0]}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--ds-font-display)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hover ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-muted)",
            transition: "color var(--ds-dur-fast)",
          }}
        >
          View Report
          <ArrowRight size={14} strokeWidth={2.25} />
        </span>
      </div>
    </button>
  );
}

function MetaItem({
  label,
  value,
  tone,
  last,
}: {
  label: string;
  value: string;
  tone?: string;
  last?: boolean;
}) {
  return (
    <div style={{ padding: "0 18px", borderRight: last ? "none" : "1px solid var(--ds-line-faint)" }}>
      <div style={{ ...EYEBROW, fontSize: 9, letterSpacing: "0.14em", marginBottom: 7 }}>{label}</div>
      <div
        style={{
          fontFamily: "var(--ds-font-mono)",
          fontSize: 15,
          fontWeight: 600,
          color: tone || "var(--ds-text-primary)",
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}
