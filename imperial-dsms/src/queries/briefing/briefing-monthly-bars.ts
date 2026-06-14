import type { ColumnMetadataMap } from "@/lib/to-data-table";
import {
  filterClauses,
  isDeptScoped,
  netSurplusMeasureExpr,
  type BriefingFilters,
} from "@/lib/dax";
import query from "./briefing-monthly-bars.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDate[MonthOfYear]":   { name: "MonthOfYear",       displayName: "Month",     format: "0" },
  "[NetSurplus]":           { name: "NetSurplus",        displayName: "Net Surplus",        format: "\\$#,0" },
  "[HeadcountVsBudget]":    { name: "HeadcountVsBudget", displayName: "Headcount vs Budget", format: "#,0" },
};

export function briefingMonthlyBars(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<NET>>", netSurplusMeasureExpr(isDeptScoped(filters)))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
