import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./maint-monthly-priority.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDate[MonthOfYear]":      { name: "MonthOfYear", displayName: "Month", format: "0" },
  "FactMaintenance[Priority]": { name: "Priority",    displayName: "Priority" },
  "[WorkOrders]":              { name: "WorkOrders",  displayName: "Work Orders", format: "#,0" },
  "[OpenWO]":                  { name: "OpenWO",      displayName: "Open WOs",    format: "#,0" },
};

export function maintMonthlyPriority(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
