import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./ops-division-spend.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDepartment[DivisionGroup]": { name: "DivisionGroup", displayName: "Division Group" },
  "[Spend]":                      { name: "Spend",         displayName: "Spend", format: "\\$#,0" },
};

export function opsDivisionSpend(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
