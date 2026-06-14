import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

/* ── Content model ───────────────────────────────────────────────────────── */

interface Term {
  term: string;
  def: string;
}
interface InfoSection {
  heading: string;
  icon: string;
  paragraphs?: string[];
  terms?: Term[];
}

/**
 * Report glossary and orientation notes. Plain business language — the same
 * content is shown in the hover preview and the pinned takeover.
 */
const SECTIONS: InfoSection[] = [
  {
    heading: "About This Report",
    icon: "layout-dashboard",
    paragraphs: [
      "The Imperial DSMS Operations Console brings the financial, workforce, supply, and maintenance position of Death Star Management Services together in a single executive view.",
      "Figures respond to the Fiscal Year selector and to any Basic or Detailed Filters applied. Unless filtered, each page reflects the whole organisation for the selected year, with the prior year shown for comparison.",
    ],
  },
  {
    heading: "Financial Metrics",
    icon: "trending-up",
    terms: [
      { term: "Total Income", def: "All revenue recognised for the selected period, before costs." },
      { term: "Total Expenses", def: "All operating costs incurred for the selected period." },
      {
        term: "Net Surplus",
        def: "Total Income less Total Expenses — the operating result for the period. A positive value is a surplus; a negative value is a deficit.",
      },
      {
        term: "Operating Margin %",
        def: "Net Surplus as a percentage of Total Income. A higher margin indicates more efficient operations.",
      },
    ],
  },
  {
    heading: "Subsidy Terms",
    icon: "landmark",
    terms: [
      {
        term: "Imperial Subsidy",
        def: "Central funding provided by the Empire to support operations, recognised separately from earned income.",
      },
      {
        term: "Subsidy Expense",
        def: "The portion of operating costs underwritten by the Imperial Subsidy rather than by earned income.",
      },
      {
        term: "Net Subsidy",
        def: "Imperial Subsidy received less the costs it is applied against — the net benefit of central funding for the period.",
      },
      {
        term: "Subsidy Coverage %",
        def: "The share of Total Expenses met by the Imperial Subsidy. Higher coverage indicates greater reliance on central funding.",
      },
    ],
  },
  {
    heading: "Workforce Metrics",
    icon: "users",
    terms: [
      { term: "Head Count", def: "The number of active personnel for the selected period." },
      {
        term: "Attrition %",
        def: "Separations as a percentage of head count — a measure of workforce turnover.",
      },
      { term: "Payroll Cost", def: "Total cost of personnel compensation for the period." },
      {
        term: "Combat Losses",
        def: "Personnel lost to combat during the period, included within separations.",
      },
    ],
  },
  {
    heading: "Reading the Figures",
    icon: "book-open",
    paragraphs: [
      "All monetary values are expressed in Imperial Credits (Cr). Percentages are rounded for display.",
      "“CY” denotes the selected fiscal year and “PY” the prior year; variances compare the two.",
      "Where a metric cannot be calculated — for example, a division by zero — it is shown as a dash (—).",
    ],
  },
];

/* ── Shared body ─────────────────────────────────────────────────────────── */

function SectionBlock({ section }: { section: InfoSection }) {
  return (
    <section style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span style={{ color: "var(--ds-accent-imperial-hi)", display: "flex" }}>
          <Icon name={section.icon} size={15} />
        </span>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--ds-font-display)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ds-text-primary)",
          }}
        >
          {section.heading}
        </h3>
      </div>

      {section.paragraphs?.map((p, i) => (
        <p
          key={i}
          style={{
            margin: "0 0 8px",
            fontFamily: "var(--ds-font-body)",
            fontSize: 12.5,
            lineHeight: 1.55,
            color: "var(--ds-text-secondary)",
          }}
        >
          {p}
        </p>
      ))}

      {section.terms && (
        <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
          {section.terms.map((t) => (
            <div key={t.term}>
              <dt
                style={{
                  fontFamily: "var(--ds-font-display)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--ds-text-primary)",
                }}
              >
                {t.term}
              </dt>
              <dd
                style={{
                  margin: "2px 0 0",
                  fontFamily: "var(--ds-font-body)",
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "var(--ds-text-muted)",
                }}
              >
                {t.def}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

function ReportInfoBody() {
  return (
    <>
      {SECTIONS.map((s) => (
        <SectionBlock key={s.heading} section={s} />
      ))}
    </>
  );
}

/** Small green "i" badge — mirrors the information glyph used on the rail pill. */
function InfoGlyph({ size = 18 }: { size?: number }) {
  return (
    <span
      style={{
        display: "flex",
        color: "var(--ds-signal-positive)",
        filter: "drop-shadow(0 0 6px var(--ds-signal-positive))",
      }}
    >
      <Icon name="info" size={size} strokeWidth={2} />
    </span>
  );
}

interface ReportInfoProps {
  /** Eyebrow of the page currently in view, e.g. "Finance · P&L". */
  pageEyebrow?: string;
  /** Title of the page currently in view, e.g. "Imperial Executive Briefing". */
  pageTitle?: string;
}

/* ── Hover preview — floating, no scrim ──────────────────────────────────── */

export interface ReportInfoPreviewProps extends ReportInfoProps {
  /** Anchor offset from the left edge (past the sidebar rail). */
  left: number;
  /** Keep the preview open while the pointer is over it. */
  onHoverChange?: (hovering: boolean) => void;
}

export function ReportInfoPreview({
  left,
  pageEyebrow,
  pageTitle,
  onHoverChange,
}: ReportInfoPreviewProps) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <div
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      style={{
        position: "absolute",
        left,
        bottom: 14,
        zIndex: 20,
        width: 360,
        maxHeight: "min(70vh, 560px)",
        display: "flex",
        flexDirection: "column",
        background: "var(--ds-bg-bay)",
        border: "1px solid var(--ds-line-bright)",
        borderRadius: 12,
        boxShadow: "0 24px 70px rgba(0,0,0,.55)",
        overflow: "hidden",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(6px)",
        transition: "opacity .16s, transform .16s cubic-bezier(.2,.7,.3,1)",
      }}
    >
      <PreviewHeader pageEyebrow={pageEyebrow} pageTitle={pageTitle} />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "14px 16px 4px" }}>
        <ReportInfoBody />
      </div>
      <div
        style={{
          flex: "0 0 auto",
          padding: "9px 16px",
          borderTop: "1px solid var(--ds-line-conduit)",
          background: "var(--ds-bg-hull)",
          fontFamily: "var(--ds-font-display)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ds-text-faint)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Icon name="mouse-pointer-click" size={12} /> Click to pin
      </div>
    </div>
  );
}

function PreviewHeader({ pageEyebrow, pageTitle }: ReportInfoProps) {
  return (
    <header
      style={{
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 16px",
        borderBottom: "1px solid var(--ds-line-conduit)",
      }}
    >
      <InfoGlyph size={16} />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 14,
            fontWeight: 700,
            color: "var(--ds-text-primary)",
            lineHeight: 1.1,
          }}
        >
          Report Information
        </div>
        {(pageEyebrow || pageTitle) && (
          <div
            style={{
              fontFamily: "var(--ds-font-body)",
              fontSize: 11,
              color: "var(--ds-text-muted)",
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {[pageEyebrow, pageTitle].filter(Boolean).join(" · ")}
          </div>
        )}
      </div>
    </header>
  );
}

/* ── Pinned takeover — scrim dims the report, click-away / X / Esc closes ─── */

export interface ReportInfoTakeoverProps extends ReportInfoProps {
  onClose?: () => void;
  style?: CSSProperties;
}

export function ReportInfoTakeover({
  pageEyebrow,
  pageTitle,
  onClose,
  style,
}: ReportInfoTakeoverProps) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, overflow: "hidden", ...style }}>
      {/* scrim */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: shown ? "rgba(6,7,9,.5)" : "rgba(6,7,9,0)",
          transition: "background .2s",
        }}
      />

      {/* foreground card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 28,
          pointerEvents: "none",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: 560,
            height: "100%",
            maxHeight: 640,
            display: "flex",
            flexDirection: "column",
            background: "var(--ds-bg-bay)",
            border: "1px solid var(--ds-line-bright)",
            borderRadius: 12,
            boxShadow: "0 32px 90px rgba(0,0,0,.6)",
            overflow: "hidden",
            transform: shown ? "scale(1)" : "scale(.96)",
            opacity: shown ? 1 : 0,
            transition: "transform .2s cubic-bezier(.2,.7,.3,1), opacity .2s",
          }}
        >
          {/* header */}
          <header
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 14px 16px 18px",
              borderBottom: "1px solid var(--ds-line-conduit)",
            }}
          >
            <InfoGlyph size={20} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--ds-font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--ds-text-primary)",
                  lineHeight: 1.1,
                }}
              >
                Report Information
              </div>
              <div
                style={{
                  fontFamily: "var(--ds-font-body)",
                  fontSize: 11.5,
                  color: "var(--ds-text-muted)",
                  marginTop: 2,
                }}
              >
                {[pageEyebrow, pageTitle].filter(Boolean).join(" · ") ||
                  "Definitions and notes for the Imperial DSMS console"}
              </div>
            </div>
            <button onClick={onClose} style={iconBtn} aria-label="Close">
              <Icon name="x" size={20} />
            </button>
          </header>

          {/* body */}
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "18px 20px 4px" }}>
            <ReportInfoBody />
          </div>

          {/* footer */}
          <footer
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 12,
              padding: "12px 16px",
              borderTop: "1px solid var(--ds-line-conduit)",
              background: "var(--ds-bg-hull)",
            }}
          >
            <button onClick={onClose} style={applyBtn}>
              Close
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* ── styles ──────────────────────────────────────────────────────────────── */

const iconBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  border: "none",
  background: "transparent",
  color: "var(--ds-text-muted)",
  cursor: "pointer",
  borderRadius: "var(--ds-radius-xs)",
  flex: "0 0 auto",
};

const applyBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  border: "none",
  background: "var(--ds-accent-imperial)",
  color: "var(--ds-text-on-accent)",
  cursor: "pointer",
  borderRadius: "var(--ds-radius-xs)",
  height: 36,
  padding: "0 20px",
  fontFamily: "var(--ds-font-display)",
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};
