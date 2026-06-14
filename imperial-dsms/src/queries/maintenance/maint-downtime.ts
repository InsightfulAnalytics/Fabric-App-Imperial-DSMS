import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./maint-downtime.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDepartment[Department]": { name: "Department",  displayName: "System" },
  "[DowntimeHrs]":             { name: "DowntimeHrs", displayName: "Downtime (h)", format: "#,0.0" },
};

export function maintDowntime(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
