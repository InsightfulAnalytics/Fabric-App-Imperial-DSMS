import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";
import { Panel } from "./Panel";

type Tone = "positive" | "negative" | "neutral";

export interface LedgerRow {
  sign: "+" | "−";
  label: string;
  value: string;
  d1?: string;
  d2?: string;
  /** Fallback sentiment for both deltas when per-delta tones are omitted. */
  tone?: Tone;
  /** Sentiment of the first delta (e.g. vs Budget). Overrides `tone`. */
  d1Tone?: Tone;
  /** Sentiment of the second delta (e.g. YoY). Overrides `tone`. */
  d2Tone?: Tone;
}

export interface ProportionSegment {
  name: string;
  value: number;
  color: string;
}

export interface BalanceCardProps {
  eyebrow: string;
  value: string;
  sublabel: string;
  vsBudget?: string;
  vsBudgetTone?: "positive" | "negative" | "neutral";
  vsLast?: string;
  vsLastTone?: "positive" | "negative" | "neutral";
  ledger: LedgerRow[];
  barTitle: string;
  bars: number[];
  barHasNeg?: boolean;
  mixTitle: string;
  mix: ProportionSegment[];
  isLoading?: boolean;
  style?: CSSProperties;
}

const EYEBROW: CSSProperties = {
  fontFamily: "var(--ds-font-display)",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--ds-text-muted)",
};

/**
 * BalanceCard — quad-pane briefing surface: hero value + vs-stats (top-left),
 * +/− ledger (top-right), monthly bars (bottom-left), proportion mix (bottom-right).
 */
export function BalanceCard({
  eyebrow,
  value,
  sublabel,
  vsBudget,
  vsBudgetTone = "positive",
  vsLast,
  vsLastTone = "positive",
  ledger,
  barTitle,
  bars,
  barHasNeg = false,
  mixTitle,
  mix,
  isLoading = false,
  style,
}: BalanceCardProps) {
  return (
    <Panel padded={false} style={{ height: "100%", ...style }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gridTemplateRows: "1fr auto",
          height: "100%",
          containerType: "inline-size",
        }}
      >
        {/* top-left — hero value + vs-stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid var(--ds-line-conduit)",
            minWidth: 0,
          }}
        >
          <div style={{ padding: "16px 18px 14px", flex: 1, minWidth: 0 }}>
            <div style={{ ...EYEBROW, letterSpacing: "0.13em" }}>{eyebrow}</div>
            <div
              style={{
                fontFamily: "var(--ds-font-mono)",
                fontSize: "clamp(24px, 7cqw, 38px)",
                fontWeight: 600,
                color: "var(--ds-text-primary)",
                lineHeight: 1,
                marginTop: 14,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {isLoading ? <span style={{ color: "var(--ds-text-faint)" }}>—</span> : value}
            </div>
            <div
              style={{
                ...EYEBROW,
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--ds-text-secondary)",
                marginTop: 10,
              }}
            >
              {sublabel}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderTop: "1px solid var(--ds-line-faint)",
            }}
          >
            <div style={{ padding: "12px 18px 14px" }}>
              <MiniStat label="Vs Budget" value={vsBudget} tone={vsBudgetTone} loading={isLoading} />
            </div>
            <div
              style={{
                padding: "12px 18px 14px",
                borderLeft: "1px solid var(--ds-line-faint)",
              }}
            >
              <MiniStat label="Vs Last Year" value={vsLast} tone={vsLastTone} loading={isLoading} />
            </div>
          </div>
        </div>

        {/* top-right — ledger */}
        <div
          style={{
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          {ledger.map((r, i) => (
            <LedgerRowView key={i} {...r} last={i === ledger.length - 1} loading={isLoading} />
          ))}
        </div>

        {/* bottom-left — monthly bars */}
        <div
          style={{
            padding: "14px 18px 16px",
            borderTop: "1px solid var(--ds-line-conduit)",
            borderRight: "1px solid var(--ds-line-conduit)",
            minWidth: 0,
          }}
        >
          <ChartBlock title={barTitle}>
            <MiniBars data={bars} hasNeg={barHasNeg} />
          </ChartBlock>
        </div>

        {/* bottom-right — proportion mix */}
        <div
          style={{
            padding: "14px 18px 16px",
            borderTop: "1px solid var(--ds-line-conduit)",
            minWidth: 0,
          }}
        >
          <ChartBlock title={mixTitle}>
            <ProportionBar segments={mix} />
          </ChartBlock>
        </div>
      </div>
    </Panel>
  );
}

function MiniStat({
  label,
  value,
  tone,
  loading,
}: {
  label: string;
  value?: string;
  tone?: "positive" | "negative" | "neutral";
  loading?: boolean;
}) {
  const color =
    tone === "negative"
      ? "var(--ds-signal-negative)"
      : tone === "neutral"
        ? "var(--ds-text-primary)"
        : "var(--ds-signal-positive)";
  const direction = tone === "negative" ? "down" : "up";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          ...EYEBROW,
          letterSpacing: "0.14em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 3,
          color,
          fontFamily: "var(--ds-font-mono)",
          fontSize: 14,
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
        }}
      >
        {!loading && (
          <Icon
            name={direction === "down" ? "arrow-down-right" : "arrow-up-right"}
            size={14}
            strokeWidth={2.25}
          />
        )}
        {loading ? <span style={{ color: "var(--ds-text-faint)" }}>—</span> : value ?? "—"}
      </span>
    </div>
  );
}

function LedgerRowView({
  sign,
  label,
  value,
  d1,
  d2,
  tone,
  d1Tone,
  d2Tone,
  last,
  loading,
}: LedgerRow & { last?: boolean; loading?: boolean }) {
  const toneColor = (t?: Tone) =>
    (t ?? tone) === "negative"
      ? "var(--ds-signal-negative)"
      : (t ?? tone) === "neutral"
        ? "var(--ds-text-secondary)"
        : "var(--ds-signal-positive)";
  const c1 = toneColor(d1Tone);
  const c2 = toneColor(d2Tone);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "14px minmax(0,1fr) auto",
        alignItems: "center",
        gap: 10,
        paddingBottom: last ? 0 : 14,
        marginBottom: last ? 0 : 14,
        borderBottom: last ? "none" : "1px solid var(--ds-line-faint)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--ds-font-mono)",
          fontSize: 22,
          color: "var(--ds-text-muted)",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {sign}
      </span>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 12.5,
            color: "var(--ds-text-secondary)",
            marginBottom: 3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--ds-font-mono)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--ds-text-primary)",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {loading ? <span style={{ color: "var(--ds-text-faint)" }}>—</span> : value}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
        }}
      >
        {!loading && d1 && <DeltaText text={d1} color={c1} />}
        {!loading && d2 && <DeltaText text={d2} color={c2} />}
      </div>
    </div>
  );
}

function DeltaText({ text, color }: { text: string; color: string }) {
  const isDown = text.trim().startsWith("-") || text.includes("▼");
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        color,
        fontFamily: "var(--ds-font-mono)",
        fontSize: 11,
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
      }}
    >
      <Icon name={isDown ? "arrow-down-right" : "arrow-up-right"} size={12} strokeWidth={2.25} />
      {text}
    </span>
  );
}

function ChartBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div style={{ ...EYEBROW, letterSpacing: "0.14em", marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function MiniBars({
  data,
  hasNeg,
  posColor = "var(--ds-signal-positive)",
  negColor = "var(--ds-signal-negative)",
}: {
  data: number[];
  hasNeg?: boolean;
  posColor?: string;
  negColor?: string;
}) {
  const W = 300;
  const H = 108;
  const padT = 6;
  const padB = 16;
  const innerH = H - padT - padB;
  if (!data.length) {
    return <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} />;
  }
  const maxAbs = Math.max(...data.map((d) => Math.abs(d))) || 1;
  const minV = hasNeg ? -maxAbs : 0;
  const span = maxAbs - minV || 1;
  const n = data.length;
  const band = W / n;
  const bw = band * 0.52;
  const y = (v: number) => padT + (1 - (v - minV) / span) * innerH;
  const y0 = y(0);
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      style={{ display: "block", overflow: "visible" }}
    >
      {hasNeg && (
        <line
          x1={0}
          x2={W}
          y1={y0}
          y2={y0}
          stroke="var(--ds-line-conduit)"
          strokeWidth="1"
        />
      )}
      {data.map((v, i) => {
        const cx = band * i + band / 2;
        const top = Math.min(y(v), y0);
        const h = Math.max(1, Math.abs(y(v) - y0));
        return (
          <g key={i}>
            <rect
              x={cx - bw / 2}
              y={top}
              width={bw}
              height={h}
              fill={v >= 0 ? posColor : negColor}
              opacity="0.85"
              rx="1"
            />
            <text
              x={cx}
              y={H - 4}
              textAnchor="middle"
              fill="var(--ds-text-faint)"
              style={{ fontFamily: "var(--ds-font-mono)", fontSize: 8 }}
            >
              {months[i] || ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ProportionBar({ segments }: { segments: ProportionSegment[] }) {
  if (!segments.length) {
    return <div style={{ height: 118, color: "var(--ds-text-faint)", fontSize: 11 }}>—</div>;
  }
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let acc = 0;
  const segs = segments.map((s) => {
    const start = acc / total;
    acc += s.value;
    const end = acc / total;
    return {
      ...s,
      c: ((start + end) / 2) * 100,
      pct: Math.round((s.value / total) * 100),
      w: (s.value / total) * 100,
    };
  });
  const H = 118;
  const barTop = 52;
  const barH = 14;
  return (
    <div style={{ position: "relative", height: H }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: barTop,
          height: barH,
          display: "flex",
          borderRadius: 2,
          overflow: "hidden",
          background: "var(--ds-bg-deck)",
        }}
      >
        {segs.map((s, i) => (
          <div
            key={i}
            style={{
              width: `${s.w}%`,
              background: s.color,
              opacity: 0.92,
              borderRight: i < segs.length - 1 ? "1px solid var(--ds-bg-hull)" : "none",
            }}
            title={`${s.name} ${s.pct}%`}
          />
        ))}
      </div>
      {segs.map((s, i) => {
        const above = i % 2 === 0;
        const far = i % 4 >= 2;
        const labelTop = above ? (far ? 0 : 24) : far ? barTop + barH + 32 : barTop + barH + 9;
        const lineTop = above ? labelTop + 15 : barTop + barH;
        const lineH = above ? barTop - labelTop - 15 : labelTop - barTop - barH - 2;
        const tx = s.c <= 12 ? "0%" : s.c >= 88 ? "-100%" : "-50%";
        return (
          <span key={i}>
            <span
              style={{
                position: "absolute",
                left: `${s.c}%`,
                width: 1,
                background: s.color,
                opacity: 0.85,
                top: lineTop,
                height: Math.max(0, lineH),
              }}
            />
            <span
              style={{
                position: "absolute",
                left: `${s.c}%`,
                transform: `translateX(${tx})`,
                top: labelTop,
                whiteSpace: "nowrap",
                fontSize: 10,
                lineHeight: "13px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--ds-font-mono)",
                  fontWeight: 600,
                  color: "var(--ds-text-primary)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.pct}%
              </span>
              <span style={{ color: "var(--ds-text-muted)", marginLeft: 5 }}>{s.name}</span>
            </span>
          </span>
        );
      })}
    </div>
  );
}
