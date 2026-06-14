import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./wf-kpi.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "[HeadcountCY]":  { name: "HeadcountCY",  displayName: "Total Headcount",      format: "#,0" },
  "[HeadcountPY]":  { name: "HeadcountPY",  displayName: "Total Headcount (PY)", format: "#,0" },
  "[DroidShareCY]": { name: "DroidShareCY", displayName: "Droid Share",          format: "0.0%" },
};

export function wfKpi(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
