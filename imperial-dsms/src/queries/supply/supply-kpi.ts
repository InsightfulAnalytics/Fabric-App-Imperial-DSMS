import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./supply-kpi.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "[InventoryValueCY]": { name: "InventoryValueCY", displayName: "Inventory Value",      format: "\\$#,0" },
  "[InventoryValuePY]": { name: "InventoryValuePY", displayName: "Inventory Value (PY)", format: "\\$#,0" },
  "[StockoutLinesCY]":  { name: "StockoutLinesCY",  displayName: "Stockout Lines",       format: "#,0" },
};

export function supplyKpi(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
