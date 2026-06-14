import type { CSSProperties } from "react";

export interface StackedBarKey {
  key: string;
  label: string;
  color: string;
}

export interface StackedBarRow {
  cat: string;
  [key: string]: string | number;
}

export interface StackedBarsProps {
  rows: StackedBarRow[];
  keys: StackedBarKey[];
  /** Total formatter for the right-hand column. */
  format?: (value: number) => string;
  labelWidth?: number;
  style?: CSSProperties;
}

/** Stacked horizontal bars — category label, segmented bar scaled to the max total, mono total. */
export function StackedBars({ rows, keys, format, labelWidth = 110, style }: StackedBarsProps) {
  if (!rows.length) {
    return (
      <div style={{ color: "var(--ds-text-faint)", fontSize: 12, padding: "12px 0", ...style }}>
        No data
      </div>
    );
  }
  const totals = rows.map((r) => keys.reduce((a, k) => a + (Number(r[k.key]) || 0), 0));
  const max = Math.max(...totals) || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, ...style }}>
      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: `${labelWidth}px 1fr 76px`,
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12.5, color: "var(--ds-text-secondary)", whiteSpace: "nowrap" }}>
            {r.cat}
          </span>
          <div
            style={{
              display: "flex",
              height: 22,
              width: `${(totals[i] / max) * 100}%`,
              borderRadius: 1,
              overflow: "hidden",
              background: "var(--ds-bg-deck)",
            }}
          >
            {keys.map((k, ki) => {
              const v = Number(r[k.key]) || 0;
              return v > 0 ? (
                <div
                  key={ki}
                  style={{ width: `${(v / totals[i]) * 100}%`, background: k.color }}
                  title={`${k.label}: ${v.toLocaleString()}`}
                />
              ) : null;
            })}
          </div>
          <span
            style={{
              fontFamily: "var(--ds-font-mono)",
              fontSize: 12,
              color: "var(--ds-text-primary)",
              textAlign: "right",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {format ? format(totals[i]) : totals[i].toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
