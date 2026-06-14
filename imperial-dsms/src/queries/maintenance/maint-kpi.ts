import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./maint-kpi.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "[OpenWOCY]":       { name: "OpenWOCY",       displayName: "Open Work Orders",      format: "#,0" },
  "[OpenWOPY]":       { name: "OpenWOPY",       displayName: "Open Work Orders (PY)", format: "#,0" },
  "[CriticalCY]":     { name: "CriticalCY",     displayName: "Critical Open",         format: "#,0" },
  "[CriticalPY]":     { name: "CriticalPY",     displayName: "Critical Open (PY)",    format: "#,0" },
  "[MttrCY]":         { name: "MttrCY",         displayName: "MTTR (h)",              format: "0.0" },
  "[MttrPY]":         { name: "MttrPY",         displayName: "MTTR (h) (PY)",         format: "0.0" },
  "[AvailabilityCY]": { name: "AvailabilityCY", displayName: "Availability",          format: "0.0%" },
  "[AvailabilityPY]": { name: "AvailabilityPY", displayName: "Availability (PY)",     format: "0.0%" },
};

export function maintKpi(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
