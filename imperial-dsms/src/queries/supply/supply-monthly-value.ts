import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./supply-monthly-value.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDate[MonthOfYear]": { name: "MonthOfYear",    displayName: "Month", format: "0" },
  "[InventoryValue]":     { name: "InventoryValue", displayName: "Inventory Value", format: "\\$#,0" },
};

export function supplyMonthlyValue(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
