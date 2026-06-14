import type { ColumnMetadataMap } from "@/lib/to-data-table";
import {
  filterClauses,
  isDeptScoped,
  incomeMeasureExpr,
  netSurplusMeasureExpr,
  type BriefingFilters,
} from "@/lib/dax";
import query from "./briefing-balance-kpis.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "[Year]":                  { name: "Year",                  displayName: "Year",                    format: "0" },
  "[NetSurplusCY]":          { name: "NetSurplusCY",          displayName: "Net Surplus",             format: "\\$#,0" },
  "[NetSurplusPY]":          { name: "NetSurplusPY",          displayName: "Net Surplus (PY)",        format: "\\$#,0" },
  "[NetSurplusVsBudget]":    { name: "NetSurplusVsBudget",    displayName: "Net Surplus vs Budget",   format: "\\$#,0" },
  "[TotalIncomeCY]":         { name: "TotalIncomeCY",         displayName: "Total Income",            format: "\\$#,0" },
  "[TotalIncomePY]":         { name: "TotalIncomePY",         displayName: "Total Income (PY)",       format: "\\$#,0" },
  "[IncomeVarPct]":          { name: "IncomeVarPct",          displayName: "Income Variance %",       format: "0.0%" },
  "[TotalExpensesCY]":       { name: "TotalExpensesCY",       displayName: "Total Expenses",          format: "\\$#,0" },
  "[TotalExpensesPY]":       { name: "TotalExpensesPY",       displayName: "Total Expenses (PY)",     format: "\\$#,0" },
  "[ExpenseVarPct]":         { name: "ExpenseVarPct",         displayName: "Expense Variance %",      format: "0.0%" },
  "[TotalHeadcountCY]":      { name: "TotalHeadcountCY",      displayName: "Total Headcount",         format: "#,0" },
  "[TotalHeadcountPY]":      { name: "TotalHeadcountPY",      displayName: "Total Headcount (PY)",    format: "#,0" },
  "[BudgetedHeadcountCY]":   { name: "BudgetedHeadcountCY",   displayName: "Budgeted Headcount",      format: "#,0" },
  "[HeadcountVsBudget]":     { name: "HeadcountVsBudget",     displayName: "Headcount vs Budget",     format: "#,0" },
  "[HeadcountVsBudgetPct]":  { name: "HeadcountVsBudgetPct",  displayName: "Headcount vs Budget %",   format: "0.0%" },
  "[PayrollCostCY]":         { name: "PayrollCostCY",         displayName: "Payroll Cost",            format: "\\$#,0" },
  "[PayrollCostPY]":         { name: "PayrollCostPY",         displayName: "Payroll Cost (PY)",       format: "\\$#,0" },
  "[PayrollVsBudgetPct]":    { name: "PayrollVsBudgetPct",    displayName: "Payroll vs Budget %",     format: "0.0%" },
};

export function briefingBalanceKpis(year: number, filters: BriefingFilters = {}) {
  const allocation = isDeptScoped(filters);
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<INCOME>>", incomeMeasureExpr(allocation))
      .replaceAll("<<NET>>", netSurplusMeasureExpr(allocation))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
