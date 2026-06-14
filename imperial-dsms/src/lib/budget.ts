/**
 * Imperial-credit formatting + budget-overlay math for the Budget Planning page.
 *
 * The base income/expense budget comes from the semantic model (read-only). The
 * user nudges each department by a percentage; the displayed figure is the overlay
 *   adjusted = base × (1 + pct / 100)
 * of the committed (posted, from SQL) and draft (unposted, in-memory) adjustments.
 */

/** Compact credit formatter — Imperial scale (T / B / M / K). */
export function fmtCredits(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1e12) return `${sign}${(abs / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(1)}K`;
  return `${sign}${abs.toFixed(0)}`;
}

/** "₡ 1.28B" */
export const credits = (n: number): string => `₡ ${fmtCredits(Math.round(n))}`;

/** "+₡ 94M" / "−₡ 53M" / "₡ 0" (uses a true minus sign for negatives). */
export function signedCredits(n: number): string {
  const r = Math.round(n);
  const sign = r > 0 ? "+" : r < 0 ? "−" : "";
  return `${sign}₡ ${fmtCredits(Math.abs(r))}`;
}

/** Subsidy coverage as a percentage string, e.g. "99.7%". */
export const fmtCoverage = (v: number): string => (v * 100).toFixed(1) + "%";

/** Format a Δ% value for an input field: "+10", "−5", "0", "12.5". */
export function fmtPctVal(v: number): string {
  const a = Math.abs(v);
  const s = a % 1 === 0 ? a.toFixed(0) : a.toFixed(1);
  return (v > 0 ? "+" : v < 0 ? "-" : "") + s;
}

/** Apply a percentage nudge to a base figure. */
export const applyPct = (base: number, pct: number): number => base * (1 + pct / 100);

/** A single department's adjustment (income/expense percentages). */
export interface Adjustment {
  income: number;
  expense: number;
}
/** Map of departmentKey → committed/draft adjustment. */
export type AdjMap = Record<number, Adjustment>;

/** Base budget for a department, as returned by the DAX query. */
export interface BudgetBaseRow {
  departmentKey: number;
  department: string;
  divisionGroup: string;
  incomeBudget: number;
  expenseBudget: number;
}

/** A fully computed worksheet row (base + overlay). */
export interface BudgetRow extends BudgetBaseRow {
  incomeAdjPct: number;
  expenseAdjPct: number;
  adjustedIncome: number;
  adjustedExpense: number;
  net: number;
  incomeDirty: boolean;
  expenseDirty: boolean;
  dirty: boolean;
}

const ZERO: Adjustment = { income: 0, expense: 0 };

/**
 * Build worksheet rows from base budget + committed + draft adjustments.
 * A draft (if present for a department) overrides its committed value; "dirty"
 * means the draft differs from what's committed.
 */
export function buildRows(base: BudgetBaseRow[], committed: AdjMap, drafts: AdjMap): BudgetRow[] {
  return base.map((d) => {
    const com = committed[d.departmentKey] ?? ZERO;
    const dr = drafts[d.departmentKey];
    const incomeAdjPct = dr ? dr.income : com.income;
    const expenseAdjPct = dr ? dr.expense : com.expense;
    const adjustedIncome = applyPct(d.incomeBudget, incomeAdjPct);
    const adjustedExpense = applyPct(d.expenseBudget, expenseAdjPct);
    return {
      ...d,
      incomeAdjPct,
      expenseAdjPct,
      adjustedIncome,
      adjustedExpense,
      net: adjustedIncome - adjustedExpense,
      incomeDirty: incomeAdjPct !== com.income,
      expenseDirty: expenseAdjPct !== com.expense,
      dirty: !!dr && (dr.income !== com.income || dr.expense !== com.expense),
    };
  });
}

export interface BudgetTotals {
  baseIncome: number;
  baseExpense: number;
  adjIncome: number;
  adjExpense: number;
  baseNet: number;
  adjNet: number;
  baseCoverage: number;
  adjCoverage: number;
  dirtyCount: number;
}

/** Aggregate base-vs-adjusted totals across all rows. */
export function computeTotals(rows: BudgetRow[]): BudgetTotals {
  let baseIncome = 0;
  let baseExpense = 0;
  let adjIncome = 0;
  let adjExpense = 0;
  let dirtyCount = 0;
  for (const r of rows) {
    baseIncome += r.incomeBudget;
    baseExpense += r.expenseBudget;
    adjIncome += r.adjustedIncome;
    adjExpense += r.adjustedExpense;
    if (r.dirty) dirtyCount += 1;
  }
  return {
    baseIncome,
    baseExpense,
    adjIncome,
    adjExpense,
    baseNet: baseIncome - baseExpense,
    adjNet: adjIncome - adjExpense,
    baseCoverage: baseExpense ? baseIncome / baseExpense : 0,
    adjCoverage: adjExpense ? adjIncome / adjExpense : 0,
    dirtyCount,
  };
}

/** Division-group display order (groups not listed here are appended, sorted). */
export const DIVISION_ORDER = [
  "Combat Systems",
  "Engineering & Power",
  "Flight Operations",
  "Security & Detention",
  "Habitation & Life Support",
  "Logistics & Supply",
  "Command & Administration",
];

/** Group rows by divisionGroup, ordered by DIVISION_ORDER then any extras. */
export function groupByDivision(rows: BudgetRow[]): { group: string; items: BudgetRow[] }[] {
  const seen = new Set(rows.map((r) => r.divisionGroup));
  const ordered = [
    ...DIVISION_ORDER.filter((g) => seen.has(g)),
    ...[...seen].filter((g) => !DIVISION_ORDER.includes(g)).sort(),
  ];
  return ordered
    .map((group) => ({ group, items: rows.filter((r) => r.divisionGroup === group) }))
    .filter((g) => g.items.length > 0);
}
