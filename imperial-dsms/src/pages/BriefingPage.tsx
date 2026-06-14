import { useState } from "react";
import {
  Panel,
  BalanceCard,
  VarianceScatter,
  ComboChart,
  Button,
  type LedgerRow,
  type ProportionSegment,
  type ScatterDept,
  type ComboChartDatum,
} from "@/components/ds";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { toDataTable } from "@/lib/to-data-table";
import { briefingBalanceKpis } from "@/queries/briefing/briefing-balance-kpis";
import { briefingMonthlyBars } from "@/queries/briefing/briefing-monthly-bars";
import { briefingExpenseMix } from "@/queries/briefing/briefing-expense-mix";
import { briefingPayrollMix } from "@/queries/briefing/briefing-payroll-mix";
import { briefingDeptVariance } from "@/queries/briefing/briefing-dept-variance";
import { briefingCombatLosses } from "@/queries/briefing/briefing-combat-losses";
import type { BriefingFilters } from "@/lib/dax";

/** Compact credit formatter — Imperial scale (T / B / M / K). */
function fmtCredits(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1e12) return `${sign}${(abs / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(1)}K`;
  return `${sign}${abs.toFixed(0)}`;
}

function fmtCreditsCR(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value < 0 ? "-" : value > 0 ? "+" : "";
  return `${sign}₡ ${fmtCredits(Math.abs(value))}`;
}

function fmtCreditsValue(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  return `₡ ${fmtCredits(value)}`;
}

function fmtCount(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(0)}K`;
  return `${sign}${abs.toFixed(0)}`;
}

function fmtCountSigned(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value < 0 ? "-" : value > 0 ? "+" : "";
  return `${sign}${fmtCount(Math.abs(value))}`;
}

function fmtPctSigned(value: number, digits = 1): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${Math.abs(value * 100).toFixed(digits)}%`;
}

/** YoY delta as a fraction (CY - PY) / |PY|. */
function yoy(cy: number, py: number): number | undefined {
  if (py == null || py === 0 || Number.isNaN(py) || Number.isNaN(cy)) return undefined;
  return (cy - py) / Math.abs(py);
}

const DSMS_DATA_CHART_COLORS = [
  "var(--ds-data-1)",
  "var(--ds-data-2)",
  "var(--ds-signal-info)",
  "var(--ds-data-4)",
  "var(--ds-data-3)",
  "var(--ds-data-5)",
  "var(--ds-data-6)",
];

interface KpiRow {
  Year: number;
  NetSurplusCY: number;          NetSurplusPY: number;          NetSurplusVsBudget: number;
  TotalIncomeCY: number;         TotalIncomePY: number;         IncomeVarPct: number;
  TotalExpensesCY: number;       TotalExpensesPY: number;       ExpenseVarPct: number;
  TotalHeadcountCY: number;      TotalHeadcountPY: number;
  BudgetedHeadcountCY: number;   HeadcountVsBudget: number;     HeadcountVsBudgetPct: number;
  PayrollCostCY: number;         PayrollCostPY: number;         PayrollVsBudgetPct: number;
}

export interface BriefingPageProps {
  /** Selected fiscal year (e.g. 2024). */
  year: number;
  /** Basic-slice filters from the slicer pane ("All …" entries are null). */
  filters?: BriefingFilters;
}

export function BriefingPage({ year, filters = {} }: BriefingPageProps) {
  // Cross-filter: department selected in the scatter or combo chart.
  const [dept, setDept] = useState<string | null>(null);
  const division = filters.division ?? null;

  // The scatter and combo are the cross-filter sources — they take the pane
  // filters but never their own department selection.
  const withDept: BriefingFilters = { ...filters, department: dept };

  const kpis = briefingBalanceKpis(year, withDept);
  const bars = briefingMonthlyBars(year, withDept);
  const expMix = briefingExpenseMix(year, withDept);
  const payMix = briefingPayrollMix(year, withDept);
  const variance = briefingDeptVariance(year, filters);
  const combat = briefingCombatLosses(year, filters);

  // Under a dept/division filter, income is the cost-driver allocation.
  const usesAllocation = Boolean(dept || division);

  const kpiResult = useSemanticModelQuery({ connection: kpis.connection, query: kpis.query });
  const barsResult = useSemanticModelQuery({ connection: bars.connection, query: bars.query });
  const expResult = useSemanticModelQuery({ connection: expMix.connection, query: expMix.query });
  const payResult = useSemanticModelQuery({ connection: payMix.connection, query: payMix.query });
  const varResult = useSemanticModelQuery({ connection: variance.connection, query: variance.query });
  const combatResult = useSemanticModelQuery({ connection: combat.connection, query: combat.query });

  // Unwrap KPI row
  const kpiRow: Partial<KpiRow> = {};
  if (kpiResult.data?.status === "success") {
    const dt = toDataTable(kpiResult.data.table, kpis.columnMetadata);
    const row = dt.rows[0];
    dt.columns.forEach((col, i) => {
      (kpiRow as Record<string, unknown>)[col.name] = row?.[i];
    });
  }
  const loading = kpiResult.isLoading && !kpiResult.data;

  // Unwrap monthly bars → 12 values for each metric, index 0..11
  let netSurplusBars: number[] = [];
  let headcountVsBudgetBars: number[] = [];
  if (barsResult.data?.status === "success") {
    const dt = toDataTable(barsResult.data.table, bars.columnMetadata);
    const monthIdx = dt.columns.findIndex((c) => c.name === "MonthOfYear");
    const surplusIdx = dt.columns.findIndex((c) => c.name === "NetSurplus");
    const hcIdx = dt.columns.findIndex((c) => c.name === "HeadcountVsBudget");
    const surplus = new Array(12).fill(0);
    const hc = new Array(12).fill(0);
    dt.rows.forEach((r) => {
      const m = Number(r[monthIdx]) - 1;
      if (m >= 0 && m < 12) {
        surplus[m] = Number(r[surplusIdx]) || 0;
        hc[m] = Number(r[hcIdx]) || 0;
      }
    });
    netSurplusBars = surplus;
    headcountVsBudgetBars = hc;
  }

  // Unwrap mix tables → ProportionSegment[]
  const expenseMix = mixSegments(expResult, expMix.columnMetadata, "AccountCategory", "ExpenseValue");
  const payrollMix = mixSegments(payResult, payMix.columnMetadata, "RoleType", "PayrollValue");

  // Unwrap dept variance → ScatterDept[]
  const scatterDepts: ScatterDept[] = [];
  if (varResult.data?.status === "success") {
    const dt = toDataTable(varResult.data.table, variance.columnMetadata);
    const idx = (n: string) => dt.columns.findIndex((c) => c.name === n);
    const iDept = idx("Department");
    const iDiv = idx("DivisionGroup");
    const iWeight = idx("CostDriverWeight");
    const iIncVar = idx("IncomeVarPct");
    const iExpVar = idx("ExpenseVarPct");
    const iAlloc = idx("Allocation");
    const iExp = idx("ExpenseActual");
    dt.rows.forEach((r, i) => {
      scatterDepts.push({
        key: i,
        dept: String(r[iDept] ?? ""),
        short: shortenDeptName(String(r[iDept] ?? "")),
        division: String(r[iDiv] ?? ""),
        weight: Number(r[iWeight]) || 0,
        incomeVar: Number(r[iIncVar]) || 0,
        expenseVar: Number(r[iExpVar]) || 0,
        allocation: Number(r[iAlloc]) || 0,
        expenseActual: Number(r[iExp]) || 0,
      });
    });
  }

  // Unwrap combat losses → ComboChartDatum[] (varPct fraction → percentage points)
  const combatDepts: ComboChartDatum[] = [];
  if (combatResult.data?.status === "success") {
    const dt = toDataTable(combatResult.data.table, combat.columnMetadata);
    const iDept = dt.columns.findIndex((c) => c.name === "Department");
    const iLoss = dt.columns.findIndex((c) => c.name === "CombatLosses");
    const iVar = dt.columns.findIndex((c) => c.name === "HeadcountVarPct");
    const iCY = dt.columns.findIndex((c) => c.name === "HeadcountCY");
    const iPY = dt.columns.findIndex((c) => c.name === "HeadcountPY");
    dt.rows.forEach((r) => {
      combatDepts.push({
        dept: String(r[iDept] ?? ""),
        short: shortenDeptLabel(String(r[iDept] ?? "")),
        losses: Number(r[iLoss]) || 0,
        varPct: (Number(r[iVar]) || 0) * 100,
        hcCY: Number(r[iCY]) || undefined,
        hcPY: Number(r[iPY]) || undefined,
      });
    });
  }

  // ── Net Subsidy card ────────────────────────────────────────────────
  const netSurplusYoY = yoy(kpiRow.NetSurplusCY ?? NaN, kpiRow.NetSurplusPY ?? NaN);
  const incomeBudDelta = kpiRow.IncomeVarPct;
  const expenseBudDelta = kpiRow.ExpenseVarPct;
  const incomeYoY = yoy(kpiRow.TotalIncomeCY ?? NaN, kpiRow.TotalIncomePY ?? NaN);
  const expenseYoY = yoy(kpiRow.TotalExpensesCY ?? NaN, kpiRow.TotalExpensesPY ?? NaN);

  const subsidyLedger: LedgerRow[] = [
    {
      sign: "+",
      label: usesAllocation ? "Subsidy Allocation" : "Total Income",
      value: fmtCreditsValue(kpiRow.TotalIncomeCY ?? NaN),
      d1: incomeBudDelta != null ? `${fmtPctSigned(incomeBudDelta)} Bud` : undefined,
      d2: incomeYoY != null ? `${fmtPctSigned(incomeYoY)} YoY` : undefined,
      // Income: more is good — under budget reads negative.
      d1Tone: (incomeBudDelta ?? 0) >= 0 ? "positive" : "negative",
      d2Tone: (incomeYoY ?? 0) >= 0 ? "positive" : "negative",
    },
    {
      sign: "−",
      label: "Total Expenses",
      value: fmtCreditsValue(kpiRow.TotalExpensesCY ?? NaN),
      d1: expenseBudDelta != null ? `${fmtPctSigned(expenseBudDelta)} Bud` : undefined,
      d2: expenseYoY != null ? `${fmtPctSigned(expenseYoY)} YoY` : undefined,
      // Expenses: less is good — over budget / rising YoY read negative.
      d1Tone: (expenseBudDelta ?? 0) <= 0 ? "positive" : "negative",
      d2Tone: (expenseYoY ?? 0) <= 0 ? "positive" : "negative",
    },
  ];

  const netSurplusVsLastValue = (kpiRow.NetSurplusCY ?? 0) - (kpiRow.NetSurplusPY ?? 0);

  // ── Headcount card ───────────────────────────────────────────────────
  const hcYoY = yoy(kpiRow.TotalHeadcountCY ?? NaN, kpiRow.TotalHeadcountPY ?? NaN);
  const payrollYoY = yoy(kpiRow.PayrollCostCY ?? NaN, kpiRow.PayrollCostPY ?? NaN);
  const hcVsLast = (kpiRow.TotalHeadcountCY ?? 0) - (kpiRow.TotalHeadcountPY ?? 0);
  const budgetedHcDeltaPct = budgetedHcDelta(
    kpiRow.BudgetedHeadcountCY,
    kpiRow.TotalHeadcountCY,
  );
  const budgetedHcYoYPct = yoy(kpiRow.BudgetedHeadcountCY ?? NaN, kpiRow.TotalHeadcountPY ?? NaN);

  const headcountLedger: LedgerRow[] = [
    {
      sign: "+",
      label: "Budgeted Headcount",
      value: fmtCount(kpiRow.BudgetedHeadcountCY ?? NaN),
      d1: budgetedHcDeltaPct != null ? `${fmtPctSigned(budgetedHcDeltaPct)} Act` : undefined,
      d2: budgetedHcYoYPct != null ? `${fmtPctSigned(budgetedHcYoYPct)} YoY` : undefined,
      // Staffing at/above budget is good.
      d1Tone: (kpiRow.HeadcountVsBudget ?? 0) >= 0 ? "positive" : "negative",
      d2Tone: (budgetedHcYoYPct ?? 0) >= 0 ? "positive" : "negative",
    },
    {
      sign: "−",
      label: "Actual Payroll",
      value: fmtCreditsValue(kpiRow.PayrollCostCY ?? NaN),
      d1:
        kpiRow.PayrollVsBudgetPct != null
          ? `${fmtPctSigned(kpiRow.PayrollVsBudgetPct)} Bud`
          : undefined,
      d2: payrollYoY != null ? `${fmtPctSigned(payrollYoY)} YoY` : undefined,
      // Payroll: less is good — over budget / rising YoY read negative.
      d1Tone: (kpiRow.PayrollVsBudgetPct ?? 0) <= 0 ? "positive" : "negative",
      d2Tone: (payrollYoY ?? 0) <= 0 ? "positive" : "negative",
    },
  ];

  // Mix segments — paint with the data ramp colours
  const expenseMixColored: ProportionSegment[] = expenseMix.map((s, i) => ({
    ...s,
    color: DSMS_DATA_CHART_COLORS[i % DSMS_DATA_CHART_COLORS.length],
  }));
  const payrollMixColored: ProportionSegment[] = payrollMix.map((s, i) => ({
    ...s,
    color: DSMS_DATA_CHART_COLORS[i % DSMS_DATA_CHART_COLORS.length],
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Cross-filter clear chip — only when a department is selected */}
      {dept && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="sm" variant="secondary" icon="x" onClick={() => setDept(null)}>
            {dept}
          </Button>
        </div>
      )}

      {/* Two balance cards — side-by-side at ≥1120, stacks below */}
      <div
        className="briefing-balance-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        <BalanceCard
          eyebrow={`Net Subsidy · ${kpiRow.Year ?? year}${dept || division ? ` · ${dept ?? division}` : ""}`}
          value={fmtCreditsValue(kpiRow.NetSurplusCY ?? NaN)}
          sublabel="Operating Surplus"
          vsBudget={fmtCreditsCR(kpiRow.NetSurplusVsBudget ?? NaN)}
          vsBudgetTone={(kpiRow.NetSurplusVsBudget ?? 0) >= 0 ? "positive" : "negative"}
          vsLast={fmtCreditsCR(netSurplusVsLastValue)}
          vsLastTone={(netSurplusYoY ?? 0) >= 0 ? "positive" : "negative"}
          ledger={subsidyLedger}
          barTitle="Net Subsidy Actual · by Month"
          bars={netSurplusBars}
          barHasNeg={netSurplusBars.some((v) => v < 0)}
          mixTitle="Where Expenses Go"
          mix={expenseMixColored}
          isLoading={loading}
          data-section="briefing-net-subsidy"
        />
        <BalanceCard
          eyebrow={`Headcount · ${kpiRow.Year ?? year}${dept || division ? ` · ${dept ?? division}` : ""}`}
          value={fmtCount(kpiRow.TotalHeadcountCY ?? NaN)}
          sublabel="Station Complement"
          vsBudget={fmtCountSigned(kpiRow.HeadcountVsBudget ?? NaN)}
          vsBudgetTone={(kpiRow.HeadcountVsBudget ?? 0) >= 0 ? "positive" : "negative"}
          vsLast={fmtCountSigned(hcVsLast)}
          vsLastTone={(hcYoY ?? 0) >= 0 ? "positive" : "negative"}
          ledger={headcountLedger}
          barTitle="Headcount vs Budget · by Month"
          bars={headcountVsBudgetBars}
          barHasNeg={true}
          mixTitle="Where Payroll Goes"
          mix={payrollMixColored}
          isLoading={loading}
          data-section="briefing-headcount"
        />
      </div>

      {/* Variance Scatter + Combat Losses combo */}
      <div
        className="briefing-balance-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        <Panel
          title="Variance Scatter"
          eyebrow="Which Departments Are Performing to Budget?"
          data-section="briefing-variance-scatter"
        >
          {varResult.isLoading && scatterDepts.length === 0 ? (
            <PanelLoading height={340} viewWidth={720} />
          ) : varResult.data?.status === "error" ? (
            <div style={{ padding: 12, color: "var(--ds-signal-negative)" }}>
              Query error: {varResult.data.error.message}
            </div>
          ) : (
            <VarianceScatter
              depts={scatterDepts}
              height={340}
              fmtCredits={fmtCreditsValue}
              selected={dept}
              onSelect={setDept}
            />
          )}
        </Panel>

        <Panel
          title="Combat Losses vs Headcount Variance"
          eyebrow="Are We Replenishing the Departments We're Losing?"
          bodyStyle={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
          data-section="briefing-combat-losses"
        >
          {combatResult.isLoading && combatDepts.length === 0 ? (
            <PanelLoading height={340} />
          ) : combatResult.data?.status === "error" ? (
            <div style={{ padding: 12, color: "var(--ds-signal-negative)" }}>
              Query error: {combatResult.data.error.message}
            </div>
          ) : (
            <ComboChart data={combatDepts} height={340} selected={dept} onSelect={setDept} />
          )}
        </Panel>
      </div>
    </div>
  );
}

function PanelLoading({ height, viewWidth = 760 }: { height: number; viewWidth?: number }) {
  // Sized like the chart it stands in for (width-driven aspect ratio) so the
  // grid row doesn't jump while queries are in flight.
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: `${viewWidth} / ${height}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ds-text-muted)",
        fontFamily: "var(--ds-font-display)",
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      Loading…
    </div>
  );
}

/** Abbreviate department names for the combo x-axis. */
function shortenDeptLabel(s: string): string {
  const map: Record<string, string> = {
    "Stormtrooper Garrison": "Garrison",
    "Turbolaser Batteries": "Turbolasers",
    "Hangar & TIE Flight Ops": "TIE Flight Ops",
    "Ion Cannon Defense": "Ion Cannon",
    "Superlaser Operations": "Superlaser",
    "Detention Block Operations": "Detention",
  };
  return map[s] ?? s;
}

function mixSegments(
  result: ReturnType<typeof useSemanticModelQuery>,
  metadata: Parameters<typeof toDataTable>[1],
  catColumnName: string,
  valueColumnName: string,
): ProportionSegment[] {
  if (result.data?.status !== "success") return [];
  const dt = toDataTable(result.data.table, metadata);
  const ci = dt.columns.findIndex((c) => c.name === catColumnName);
  const vi = dt.columns.findIndex((c) => c.name === valueColumnName);
  if (ci < 0 || vi < 0) return [];
  return dt.rows.map((r) => ({
    name: String(r[ci] ?? ""),
    value: Number(r[vi]) || 0,
    color: "var(--ds-data-3)",
  }));
}

function budgetedHcDelta(budget: number | undefined, actual: number | undefined): number | undefined {
  if (budget == null || actual == null || actual === 0) return undefined;
  return (budget - actual) / actual;
}

/** Shorten dept names for inline labels (e.g. "Combat Systems · Gunnery" → "Gunnery"). */
function shortenDeptName(s: string): string {
  if (!s) return s;
  const parts = s.split(/[·:|/-]/);
  return parts[parts.length - 1].trim() || s;
}
