import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./supply-by-category.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimItem[ItemCategory]":     { name: "ItemCategory", displayName: "Category" },
  "DimLocation[LocationType]": { name: "LocationType", displayName: "Location Type" },
  "[Units]":                   { name: "Units",        displayName: "Units", format: "#,0" },
};

export function supplyByCategory(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
