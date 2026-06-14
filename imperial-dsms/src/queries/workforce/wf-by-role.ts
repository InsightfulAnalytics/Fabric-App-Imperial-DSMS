import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./wf-by-role.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimRole[Role]":     { name: "Role",      displayName: "Role" },
  "DimRole[IsCombat]": { name: "IsCombat",  displayName: "Combat" },
  "[Headcount]":       { name: "Headcount", displayName: "Headcount", format: "#,0" },
};

export function wfByRole(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
