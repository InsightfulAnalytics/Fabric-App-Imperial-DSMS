import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./wf-monthly.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDate[MonthOfYear]": { name: "MonthOfYear",   displayName: "Month", format: "0" },
  "[Headcount]":          { name: "Headcount",     displayName: "Headcount",      format: "#,0" },
  "[AttritionPct]":       { name: "AttritionPct",  displayName: "Attrition %",    format: "0.0%" },
  "[CombatLossPct]":      { name: "CombatLossPct", displayName: "Combat Loss %",  format: "0.0%" },
};

export function wfMonthly(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
