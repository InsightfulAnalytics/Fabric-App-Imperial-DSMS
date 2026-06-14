import { useCallback, useEffect, useState } from "react";
import { Panel, Button, Icon } from "@/components/ds";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { useAuth } from "@/hooks/auth.context";
import { toDataTable } from "@/lib/to-data-table";
import { budgetByDepartment } from "@/queries/budget/budget-by-department";
import { getDataApi } from "@/lib/data-client";
import {
  buildRows,
  computeTotals,
  groupByDivision,
  credits,
  signedCredits,
  fmtCoverage,
  fmtPctVal,
  type AdjMap,
  type BudgetBaseRow,
  type BudgetRow,
} from "@/lib/budget";

export interface BudgetPageProps {
  /** Selected calendar year from the top-bar slicer (e.g. 2024). */
  year: number;
  /** Full-clearance users may post; everyone else sees a read-only worksheet. */
  canPost: boolean;
}

const POS = "var(--ds-signal-positive)";
const NEG = "var(--ds-signal-negative)";
const IMP = "var(--ds-accent-imperial)";
const MONO = "var(--ds-font-mono)";
const DISP = "var(--ds-font-display)";

/** "HH:MM · 0 BBY" — Imperial-flavoured post timestamp. */
function stampTime(d: Date): string {
  return (
    String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") + " · 0 BBY"
  );
}

export function BudgetPage({ year, canPost }: BudgetPageProps) {
  const { session } = useAuth();
  const postedBy = session?.user?.email ?? "unknown";
  const readOnly = !canPost;

  // --- base budget (read-only, from the semantic model) ---
  const base = budgetByDepartment(year);
  const baseResult = useSemanticModelQuery({ connection: base.connection, query: base.query });

  const baseRows: BudgetBaseRow[] = [];
  if (baseResult.data?.status === "success") {
    const dt = toDataTable(baseResult.data.table, base.columnMetadata);
    const idx = (n: string) => dt.columns.findIndex((c) => c.name === n);
    const iKey = idx("DepartmentKey");
    const iName = idx("Department");
    const iDiv = idx("DivisionGroup");
    const iInc = idx("IncomeBudget");
    const iExp = idx("ExpenseBudget");
    dt.rows.forEach((r) => {
      const incomeBudget = Number(r[iInc]) || 0;
      const expenseBudget = Number(r[iExp]) || 0;
      if (incomeBudget <= 0 && expenseBudget <= 0) return; // drop the unallocated / empty rows
      baseRows.push({
        departmentKey: Number(r[iKey]),
        department: String(r[iName] ?? ""),
        divisionGroup: String(r[iDiv] ?? "—"),
        incomeBudget,
        expenseBudget,
      });
    });
  }

  // --- committed adjustments (posted, from the Fabric SQL Database) ---
  const [committed, setCommitted] = useState<AdjMap>({});
  const [committedId, setCommittedId] = useState<Record<number, string>>({}); // deptKey → row id
  const [adjUnavailable, setAdjUnavailable] = useState(false);

  const loadCommitted = useCallback(async () => {
    try {
      const rows = await getDataApi().BudgetAdjustment.findMany({ year: { eq: year } });
      const map: AdjMap = {};
      const ids: Record<number, string> = {};
      for (const r of rows) {
        map[r.departmentKey] = { income: r.incomePct, expense: r.expensePct };
        ids[r.departmentKey] = r.id;
      }
      setCommitted(map);
      setCommittedId(ids);
      setAdjUnavailable(false);
    } catch {
      // Backend not reachable (e.g. before `rayfin up`) — degrade to base budget.
      setCommitted({});
      setCommittedId({});
      setAdjUnavailable(true);
    }
  }, [year]);

  // --- draft edits (unposted, in-memory; reset when the year changes) ---
  const [drafts, setDrafts] = useState<AdjMap>({});
  const [phase, setPhase] = useState<"idle" | "posting">("idle");
  const [toast, setToast] = useState<{ by: string; at: string; count: number } | null>(null);
  const [postError, setPostError] = useState<string | null>(null);

  useEffect(() => {
    setDrafts({});
    void loadCommitted();
  }, [loadCommitted]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 7000);
    return () => clearTimeout(t);
  }, [toast]);

  // --- derived worksheet ---
  const rows = buildRows(baseRows, committed, drafts);
  const t = computeTotals(rows);
  const grouped = groupByDivision(rows);
  const hasEdits = t.dirtyCount > 0;

  // --- edit / reset / post ---
  const onEdit = (key: number, field: "income" | "expense", value: number) => {
    if (readOnly) return;
    if (postError) setPostError(null);
    setDrafts((prev) => {
      const com = committed[key] ?? { income: 0, expense: 0 };
      const cur = prev[key] ?? { income: com.income, expense: com.expense };
      return { ...prev, [key]: { ...cur, [field]: value } };
    });
  };
  const onReset = () => {
    setDrafts({});
    setPostError(null);
  };

  const onPost = async () => {
    if (phase === "posting" || !hasEdits || readOnly) return;
    setPhase("posting");
    setPostError(null);
    const changed = rows.filter((r) => r.dirty);
    const at = new Date();
    const postedAt = at.toISOString();
    try {
      const api = getDataApi();
      await Promise.all(
        changed.map((r) => {
          const id = committedId[r.departmentKey];
          return id
            ? api.BudgetAdjustment.update(
                { id },
                { incomePct: r.incomeAdjPct, expensePct: r.expenseAdjPct, postedBy, postedAt },
              )
            : api.BudgetAdjustment.create({
                // The id column has no DB-side default (NEWID()), so a missing id
                // fails the NOT NULL primary key. Supply a client-generated UUID.
                id: crypto.randomUUID(),
                year,
                departmentKey: r.departmentKey,
                department: r.department,
                incomePct: r.incomeAdjPct,
                expensePct: r.expenseAdjPct,
                postedBy,
                postedAt,
              });
        }),
      );
      await loadCommitted();
      setDrafts({});
      setToast({ by: postedBy, at: stampTime(at), count: changed.length });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[Budget] post failed:", e);
      setPostError(msg);
    } finally {
      setPhase("idle");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingBottom: 8 }}>
      {/* clearance note bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "8px 12px",
          background: "var(--ds-bg-hull)",
          border: "1px solid var(--ds-line-faint)",
          borderLeft: `2px solid ${readOnly ? "var(--ds-accent-imperial)" : "var(--ds-line-conduit)"}`,
          borderRadius: "var(--ds-radius-xs)",
        }}
      >
        <span style={{ display: "flex", color: readOnly ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-muted)" }}>
          <Icon name={readOnly ? "lock" : "shield"} size={13} />
        </span>
        <span
          style={{
            fontFamily: DISP,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: readOnly ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-muted)",
          }}
        >
          {readOnly ? "Read-only · full clearance required to post" : "Eyes only · full clearance required to post"}
        </span>
      </div>

      {/* summary strip — base vs adjusted */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <SummaryTile label="Total Income Budget" base={t.baseIncome} adj={t.adjIncome} fmt={credits} deltaFmt={signedCredits} year={year} />
        <SummaryTile label="Total Expense Budget" base={t.baseExpense} adj={t.adjExpense} fmt={credits} deltaFmt={signedCredits} year={year} />
        <SummaryTile label="Net Budget" base={t.baseNet} adj={t.adjNet} fmt={signedCredits} deltaFmt={signedCredits} year={year} />
        <SummaryTile
          label="Subsidy Coverage"
          base={t.baseCoverage}
          adj={t.adjCoverage}
          fmt={fmtCoverage}
          deltaFmt={(d) => (d >= 0 ? "+" : "−") + Math.abs(d * 100).toFixed(1) + " pp"}
          year={year}
          pp
        />
      </div>

      {/* worksheet */}
      <Panel
        title="Department Adjustment Worksheet"
        eyebrow={`FY ${year} · ${baseRows.length} Departments · Base Budget Read-Only`}
        padded={false}
        actions={
          <span style={{ fontFamily: MONO, fontSize: 11, color: "var(--ds-text-faint)" }}>
            Adjusted = Base × (1 + Δ%)
          </span>
        }
      >
        {baseResult.isLoading && baseRows.length === 0 ? (
          <Notice tone="muted">Loading base budget…</Notice>
        ) : baseResult.data?.status === "error" ? (
          <Notice tone="negative">Query error: {baseResult.data.error.message}</Notice>
        ) : baseRows.length === 0 ? (
          <Notice tone="muted">No budget figures for FY {year}.</Notice>
        ) : (
          <div style={{ maxHeight: 540, overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={{ ...TH_BASE, textAlign: "left" }}>Department</th>
                  <th style={thR}>Income Budget ₡</th>
                  <th style={thC}>Income Δ%</th>
                  <th style={thR}>Adjusted Income ₡</th>
                  <th style={thR}>Expense Budget ₡</th>
                  <th style={thC}>Expense Δ%</th>
                  <th style={thR}>Adjusted Expense ₡</th>
                  <th style={thR}>Net ₡</th>
                </tr>
              </thead>
              <tbody>
                {grouped.map((g) => {
                  const gNet = g.items.reduce((a, r) => a + r.net, 0);
                  const gDirty = g.items.filter((r) => r.dirty).length;
                  return (
                    <GroupBlock key={g.group} group={g.group} net={gNet} dirty={gDirty}>
                      {g.items.map((r) => (
                        <Row key={r.departmentKey} r={r} readOnly={readOnly} onEdit={onEdit} />
                      ))}
                    </GroupBlock>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ ...tdFoot, textAlign: "left", fontFamily: DISP, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11, color: "var(--ds-text-secondary)" }}>
                    Station Total · {baseRows.length} Depts
                  </td>
                  <td style={tdFoot}><FootBaseAdj base={t.baseIncome} adj={t.baseIncome} /></td>
                  <td style={{ ...tdFoot, textAlign: "center", color: "var(--ds-text-faint)", fontSize: 11 }}>{hasEdits ? `${t.dirtyCount} edited` : "—"}</td>
                  <td style={tdFoot}><FootBaseAdj base={t.baseIncome} adj={t.adjIncome} /></td>
                  <td style={tdFoot}><FootBaseAdj base={t.baseExpense} adj={t.baseExpense} /></td>
                  <td style={{ ...tdFoot, textAlign: "center", color: "var(--ds-text-faint)", fontSize: 11 }}>—</td>
                  <td style={tdFoot}><FootBaseAdj base={t.baseExpense} adj={t.adjExpense} /></td>
                  <td style={{ ...tdFoot, color: t.adjNet >= 0 ? POS : NEG }}><FootBaseAdj base={t.baseNet} adj={t.adjNet} signed /></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </Panel>

      {/* adjustments-store unavailable (non-fatal) */}
      {adjUnavailable && !readOnly && (
        <Notice tone="muted" boxed>
          Posted adjustments are currently unavailable — showing base budget. Posting requires the deployed backend.
        </Notice>
      )}

      {/* read-only note */}
      {readOnly && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            background: "var(--ds-bg-hull)",
            border: "1px solid var(--ds-line-conduit)",
            borderLeft: "2px solid var(--ds-accent-imperial)",
            borderRadius: "var(--ds-radius-md)",
          }}
        >
          <span style={{ color: "var(--ds-accent-imperial-hi)", display: "flex" }}>
            <Icon name="lock" size={15} />
          </span>
          <span style={{ fontSize: 12.5, color: "var(--ds-text-secondary)" }}>
            Read-only — adjustments require full clearance. Δ% inputs are disabled and posting is unavailable for this credential.
          </span>
        </div>
      )}

      {/* posted confirmation toast */}
      {toast && (
        <div style={{ position: "sticky", bottom: 0, zIndex: 20, display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px 12px 16px",
              background: "var(--ds-bg-bay)",
              border: "1px solid var(--ds-line-bright)",
              borderLeft: "2px solid var(--ds-signal-positive)",
              borderRadius: "var(--ds-radius-md)",
              boxShadow: "var(--ds-shadow-popover)",
            }}
          >
            <span style={{ display: "flex", color: POS }}><Icon name="check-circle" size={17} /></span>
            <span style={{ fontSize: 12.5, color: "var(--ds-text-primary)" }}>
              <b style={{ fontWeight: 600 }}>{toast.count} budget adjustment{toast.count === 1 ? "" : "s"} posted</b>
              <span style={{ color: "var(--ds-text-muted)" }}> · stamped by {toast.by} at {toast.at}</span>
            </span>
            <button
              type="button"
              onClick={() => setToast(null)}
              style={{ display: "flex", border: "none", background: "transparent", color: "var(--ds-text-muted)", cursor: "pointer", padding: 2 }}
            >
              <Icon name="x" size={15} />
            </button>
          </div>
        </div>
      )}

      {/* commit bar — only with unsaved edits and clearance to post */}
      {hasEdits && !readOnly && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "12px 16px",
            background: "var(--ds-bg-bay)",
            border: "1px solid var(--ds-line-bright)",
            borderLeft: "2px solid var(--ds-accent-imperial)",
            borderRadius: "var(--ds-radius-md)",
            boxShadow: "var(--ds-shadow-popover)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, minWidth: 0 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: postError ? NEG : IMP, flex: "0 0 auto" }} />
            {postError ? (
              <span style={{ fontSize: 12.5, color: NEG, minWidth: 0 }}>
                <b style={{ fontWeight: 600 }}>Post failed.</b>{" "}
                <span style={{ color: "var(--ds-text-secondary)" }}>{postError}</span>
              </span>
            ) : (
              <span style={{ fontSize: 13, color: "var(--ds-text-primary)" }}>
                <b style={{ fontFamily: MONO, fontWeight: 600 }}>{t.dirtyCount}</b> department{t.dirtyCount === 1 ? "" : "s"} changed
                <span style={{ color: "var(--ds-text-muted)" }}> · draft not yet posted</span>
              </span>
            )}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <Button variant="ghost" size="sm" icon="rotate-ccw" onClick={onReset} disabled={phase === "posting"}>
              Reset
            </Button>
            <Button variant="primary" size="sm" icon={phase === "posting" ? undefined : "check"} onClick={onPost} disabled={phase === "posting"}>
              {phase === "posting" ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                  <span style={{ display: "flex", animation: "dsms-spin 0.7s linear infinite" }}>
                    <Icon name="loader-2" size={14} />
                  </span>
                  Posting…
                </span>
              ) : (
                "Post Adjustments"
              )}
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}

/* ---------------- table header / footer styles ---------------- */
const TH_BASE = {
  fontFamily: DISP,
  fontSize: 9.5,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--ds-text-muted)",
  background: "var(--ds-bg-bay)",
  padding: "10px 14px",
  position: "sticky" as const,
  top: 0,
  zIndex: 3,
  borderBottom: "1px solid var(--ds-line-conduit)",
  whiteSpace: "nowrap" as const,
};
const thR = { ...TH_BASE, textAlign: "right" as const };
const thC = { ...TH_BASE, textAlign: "center" as const };
const numStyle = { fontFamily: MONO, fontVariantNumeric: "tabular-nums" as const, fontSize: 13, letterSpacing: "-0.01em" };
const tdFoot = {
  padding: "12px 14px",
  background: "var(--ds-bg-deck)",
  position: "sticky" as const,
  bottom: 0,
  zIndex: 3,
  borderTop: "2px solid var(--ds-line-bright)",
  ...numStyle,
  textAlign: "right" as const,
  fontWeight: 600,
  color: "var(--ds-text-primary)",
  fontSize: 13.5,
};

/* ---------------- inline Δ% input ---------------- */
function PctInput({
  value,
  dirty,
  readOnly,
  onCommit,
}: {
  value: number;
  dirty: boolean;
  readOnly: boolean;
  onCommit: (v: number) => void;
}) {
  const [text, setText] = useState(fmtPctVal(value));
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    if (!focus) setText(fmtPctVal(value));
  }, [value, focus]);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/−/g, "-");
    setText(e.target.value);
    if (raw === "" || raw === "-" || raw === "+") {
      onCommit(0);
      return;
    }
    const n = parseFloat(raw);
    if (!Number.isNaN(n)) onCommit(n);
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        width: 78,
        justifyContent: "flex-end",
        padding: "3px 8px",
        borderRadius: "var(--ds-radius-xs)",
        background: readOnly ? "var(--ds-bg-hull)" : "var(--ds-bg-deck)",
        border: `1px solid ${focus ? IMP : dirty ? "var(--ds-accent-imperial-lo)" : "var(--ds-line-conduit)"}`,
        boxShadow: focus ? "inset 0 0 0 1px var(--ds-accent-imperial)" : "none",
        opacity: readOnly ? 0.5 : 1,
        transition: "border-color var(--ds-dur-fast) var(--ds-ease-standard)",
      }}
    >
      <input
        type="text"
        inputMode="decimal"
        value={text}
        disabled={readOnly}
        onChange={handle}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        step="0.5"
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          textAlign: "right",
          fontFamily: MONO,
          fontVariantNumeric: "tabular-nums",
          fontSize: 12.5,
          fontWeight: 600,
          color: dirty ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-primary)",
          cursor: readOnly ? "not-allowed" : "text",
        }}
      />
      <span style={{ fontFamily: MONO, fontSize: 11, color: "var(--ds-text-muted)" }}>%</span>
    </span>
  );
}

/* ---------------- adjusted cell (value + delta vs base) ---------------- */
function AdjCell({ base, adjusted }: { base: number; adjusted: number }) {
  const delta = adjusted - base;
  const changed = Math.abs(delta) >= 0.5;
  const up = delta > 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
      <span
        style={{
          fontFamily: MONO,
          fontVariantNumeric: "tabular-nums",
          fontSize: 13,
          fontWeight: 600,
          color: changed ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
          letterSpacing: "-0.01em",
        }}
      >
        {credits(adjusted)}
      </span>
      {changed && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 600,
            color: up ? POS : NEG,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <Icon name={up ? "arrow-up-right" : "arrow-down-right"} size={10} strokeWidth={2.5} />
          {signedCredits(delta)}
        </span>
      )}
    </div>
  );
}

/* ---------------- summary tile (base vs adjusted) ---------------- */
function SummaryTile({
  label,
  base,
  adj,
  fmt,
  deltaFmt,
  year,
  pp,
}: {
  label: string;
  base: number;
  adj: number;
  fmt: (v: number) => string;
  deltaFmt: (v: number) => string;
  year: number;
  pp?: boolean;
}) {
  const delta = adj - base;
  const eps = pp ? 0.00005 : 0.5;
  const changed = Math.abs(delta) >= eps;
  const pos = delta >= 0;
  const chip = pos ? POS : NEG;
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "var(--ds-bg-hull)",
        border: "1px solid var(--ds-line-conduit)",
        borderRadius: "var(--ds-radius-md)",
        padding: "14px 16px",
        overflow: "hidden",
      }}
    >
      <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: changed ? chip : IMP }} />
      <div
        style={{
          fontFamily: DISP,
          fontSize: 9.5,
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--ds-text-secondary)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: MONO, fontVariantNumeric: "tabular-nums", fontSize: 27, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ds-text-primary)", lineHeight: 1 }}>
        {fmt(changed ? adj : base)}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 18 }}>
        {changed ? (
          <>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                padding: "2px 7px",
                borderRadius: "var(--ds-radius-xs)",
                background: pos ? "var(--ds-signal-positive-dim)" : "var(--ds-signal-negative-dim)",
                color: chip,
                fontFamily: MONO,
                fontSize: 11.5,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <Icon name={pos ? "arrow-up-right" : "arrow-down-right"} size={11} strokeWidth={2.5} />
              {deltaFmt(delta)}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: "var(--ds-text-muted)" }}>vs base {fmt(base)}</span>
          </>
        ) : (
          <span style={{ fontFamily: DISP, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ds-text-faint)" }}>
            Base allocation · FY {year}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- group subhead + rows ---------------- */
function GroupBlock({
  group,
  net,
  dirty,
  children,
}: {
  group: string;
  net: number;
  dirty: number;
  children: React.ReactNode;
}) {
  const headCell = {
    padding: "9px 14px",
    background: "var(--ds-bg-hull)",
    borderBottom: "1px solid var(--ds-line-conduit)",
    borderTop: "1px solid var(--ds-line-conduit)",
  };
  return (
    <>
      <tr>
        <td colSpan={7} style={headCell}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 6, height: 6, background: IMP, transform: "rotate(45deg)" }} />
            <span style={{ fontFamily: DISP, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ds-text-secondary)" }}>
              {group}
            </span>
            {dirty > 0 && (
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, color: "var(--ds-accent-imperial-hi)" }}>{dirty} changed</span>
            )}
          </span>
        </td>
        <td
          style={{
            ...headCell,
            textAlign: "right",
            fontFamily: MONO,
            fontVariantNumeric: "tabular-nums",
            fontSize: 12,
            fontWeight: 600,
            color: net >= 0 ? POS : NEG,
          }}
        >
          {signedCredits(net)}
        </td>
      </tr>
      {children}
    </>
  );
}

function Row({
  r,
  readOnly,
  onEdit,
}: {
  r: BudgetRow;
  readOnly: boolean;
  onEdit: (key: number, field: "income" | "expense", value: number) => void;
}) {
  const [hover, setHover] = useState(false);
  const bg = r.dirty ? "var(--ds-accent-imperial-dim)" : hover ? "var(--ds-bg-bay)" : "transparent";
  const cellPad = "8px 14px";
  const border = "1px solid var(--ds-line-faint)";
  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: bg, transition: "background var(--ds-dur-fast) var(--ds-ease-standard)" }}
    >
      <td style={{ padding: cellPad, borderBottom: border, borderLeft: `2px solid ${r.dirty ? IMP : "transparent"}`, whiteSpace: "nowrap" }}>
        <span style={{ fontSize: 13, color: "var(--ds-text-primary)", fontWeight: r.dirty ? 600 : 400 }}>{r.department}</span>
      </td>
      <td style={{ padding: cellPad, borderBottom: border, textAlign: "right", ...numStyle, color: "var(--ds-text-muted)" }}>{credits(r.incomeBudget)}</td>
      <td style={{ padding: "6px 14px", borderBottom: border, textAlign: "right", background: r.incomeDirty ? "var(--ds-accent-imperial-dim)" : "transparent" }}>
        <PctInput value={r.incomeAdjPct} dirty={r.incomeDirty} readOnly={readOnly} onCommit={(v) => onEdit(r.departmentKey, "income", v)} />
      </td>
      <td style={{ padding: cellPad, borderBottom: border, textAlign: "right" }}><AdjCell base={r.incomeBudget} adjusted={r.adjustedIncome} /></td>
      <td style={{ padding: cellPad, borderBottom: border, textAlign: "right", ...numStyle, color: "var(--ds-text-muted)" }}>{credits(r.expenseBudget)}</td>
      <td style={{ padding: "6px 14px", borderBottom: border, textAlign: "right", background: r.expenseDirty ? "var(--ds-accent-imperial-dim)" : "transparent" }}>
        <PctInput value={r.expenseAdjPct} dirty={r.expenseDirty} readOnly={readOnly} onCommit={(v) => onEdit(r.departmentKey, "expense", v)} />
      </td>
      <td style={{ padding: cellPad, borderBottom: border, textAlign: "right" }}><AdjCell base={r.expenseBudget} adjusted={r.adjustedExpense} /></td>
      <td style={{ padding: cellPad, borderBottom: border, textAlign: "right", ...numStyle, fontWeight: 600, color: r.net >= 0 ? POS : NEG }}>{signedCredits(r.net)}</td>
    </tr>
  );
}

function FootBaseAdj({ base, adj, signed }: { base: number; adj: number; signed?: boolean }) {
  const fmt = signed ? signedCredits : credits;
  const changed = Math.abs(adj - base) >= 0.5;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
      <span style={{ color: "var(--ds-text-primary)" }}>{fmt(changed ? adj : base)}</span>
      {changed && <span style={{ fontSize: 10, fontWeight: 500, color: "var(--ds-text-faint)" }}>base {fmt(base)}</span>}
    </div>
  );
}

function Notice({ tone, boxed, children }: { tone: "muted" | "negative"; boxed?: boolean; children: React.ReactNode }) {
  const color = tone === "negative" ? "var(--ds-signal-negative)" : "var(--ds-text-muted)";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: boxed ? "12px 16px" : "28px 16px",
        justifyContent: boxed ? "flex-start" : "center",
        fontSize: 12.5,
        color,
        ...(boxed
          ? {
              background: "var(--ds-bg-hull)",
              border: "1px solid var(--ds-line-conduit)",
              borderLeft: `2px solid ${tone === "negative" ? "var(--ds-signal-negative)" : "var(--ds-line-conduit)"}`,
              borderRadius: "var(--ds-radius-md)",
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}
