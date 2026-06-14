import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./briefing-expense-mix.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimAccount[AccountCategory]": { name: "AccountCategory", displayName: "Category" },
  "[ExpenseValue]":              { name: "ExpenseValue",    displayName: "Expense", format: "\\$#,0" },
};

export function briefingExpenseMix(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
