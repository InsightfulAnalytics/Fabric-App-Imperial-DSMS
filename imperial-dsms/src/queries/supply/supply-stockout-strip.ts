import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./supply-stockout-strip.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimItem[Item]":                  { name: "Item",          displayName: "Item" },
  "FactInventory[SnapshotDateKey]": { name: "SnapshotKey",   displayName: "Snapshot", format: "0" },
  "[StockoutLines]":                { name: "StockoutLines", displayName: "Stockouts", format: "#,0" },
  "[LowLines]":                     { name: "LowLines",      displayName: "Low/Reorder", format: "#,0" },
};

export function supplyStockoutStrip(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
