import type { ColumnMetadataMap } from "@/lib/to-data-table";
import query from "./budget-by-department.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDepartment[DepartmentKey]": { name: "DepartmentKey" },
  "DimDepartment[Department]":    { name: "Department" },
  "DimDepartment[DivisionGroup]": { name: "DivisionGroup" },
  "[IncomeBudget]":               { name: "IncomeBudget",  displayName: "Income Budget",  format: "\\$#,0" },
  "[ExpenseBudget]":              { name: "ExpenseBudget", displayName: "Expense Budget", format: "\\$#,0" },
};

/** Base income/expense budget per department for one calendar year (FactBudget). */
export function budgetByDepartment(year: number) {
  return {
    connection,
    query: query.replaceAll("<<YEAR>>", String(year)),
    columnMetadata,
  };
}
