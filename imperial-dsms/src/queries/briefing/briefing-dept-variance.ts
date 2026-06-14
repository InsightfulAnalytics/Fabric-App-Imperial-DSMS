import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./briefing-dept-variance.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDepartment[Department]":         { name: "Department",         displayName: "Department" },
  "DimDepartment[DivisionGroup]":      { name: "DivisionGroup",      displayName: "Division Group" },
  "DimDepartment[CostDriverWeight]":   { name: "CostDriverWeight",   displayName: "Weight", format: "0" },
  "[IncomeVarPct]":                    { name: "IncomeVarPct",       displayName: "Income Var %",  format: "0.0%" },
  "[ExpenseVarPct]":                   { name: "ExpenseVarPct",      displayName: "Expense Var %", format: "0.0%" },
  "[Allocation]":                      { name: "Allocation",         displayName: "Allocation",    format: "\\$#,0" },
  "[ExpenseActual]":                   { name: "ExpenseActual",      displayName: "Expenses",      format: "\\$#,0" },
};

export function briefingDeptVariance(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
