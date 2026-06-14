import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./supply-reorder.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimItem[Item]":         { name: "Item",          displayName: "Item" },
  "DimItem[ItemCategory]": { name: "ItemCategory",  displayName: "Category" },
  "DimItem[LeadTimeDays]": { name: "LeadTimeDays",  displayName: "Lead (d)", format: "0" },
  "[OnHand]":              { name: "OnHand",        displayName: "On Hand",  format: "#,0" },
  "[OnOrder]":             { name: "OnOrder",       displayName: "On Order", format: "#,0" },
  "[ReorderLines]":        { name: "ReorderLines",  displayName: "Reorder Lines",  format: "#,0" },
  "[StockoutLines]":       { name: "StockoutLines", displayName: "Stockout Lines", format: "#,0" },
  "[Vendor]":              { name: "Vendor",        displayName: "Preferred Vendor" },
};

export function supplyReorder(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
