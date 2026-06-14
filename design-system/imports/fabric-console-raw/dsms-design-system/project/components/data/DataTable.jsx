import React from "react";

/**
 * DataTable — dense console table. Header on the bay surface, hairline rows,
 * tabular numerics for numeric columns, row hover highlight. Columns may
 * supply a `render(row)` for conditional formatting (e.g. a StatusPill).
 */
export function DataTable({
  columns = [], // [{ key, label, align?: "left"|"right", numeric?: bool, width?, render?: (row)=>node }]
  rows = [],
  rowKey = "id",
  dense = false,
  onRowClick,
  style = {},
}) {
  const [hover, setHover] = React.useState(-1);
  const cellPad = dense ? "6px 12px" : "9px 12px";

  return (
    <div style={{ border: "1px solid var(--ds-line-conduit)", borderRadius: "var(--ds-radius-md)", overflow: "hidden", ...style }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--ds-font-body)" }}>
        <thead>
          <tr style={{ background: "var(--ds-bg-bay)" }}>
            {columns.map((c) => (
              <th
                key={c.key}
                style={{
                  textAlign: c.align || (c.numeric ? "right" : "left"),
                  padding: "8px 12px",
                  width: c.width,
                  fontFamily: "var(--ds-font-display)",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ds-text-muted)",
                  borderBottom: "1px solid var(--ds-line-conduit)",
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row[rowKey] != null ? row[rowKey] : i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              onClick={onRowClick ? () => onRowClick(row, i) : undefined}
              style={{
                background: hover === i ? "var(--ds-bg-bay)" : "transparent",
                cursor: onRowClick ? "pointer" : "default",
                transition: "background var(--ds-dur-fast) var(--ds-ease-standard)",
              }}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  style={{
                    textAlign: c.align || (c.numeric ? "right" : "left"),
                    padding: cellPad,
                    borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--ds-line-faint)",
                    fontFamily: c.numeric ? "var(--ds-font-mono)" : "var(--ds-font-body)",
                    fontVariantNumeric: c.numeric ? "tabular-nums" : "normal",
                    letterSpacing: c.numeric ? "-0.01em" : "0",
                    fontSize: 13,
                    color: c.numeric ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
