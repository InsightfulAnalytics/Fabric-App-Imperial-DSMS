import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./briefing-combat-losses.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDepartment[Department]": { name: "Department",      displayName: "Department" },
  "[CombatLosses]":            { name: "CombatLosses",    displayName: "Combat Losses",       format: "#,0" },
  "[HeadcountCY]":             { name: "HeadcountCY",     displayName: "Headcount",           format: "#,0" },
  "[HeadcountPY]":             { name: "HeadcountPY",     displayName: "Headcount (PY)",      format: "#,0" },
  "[HeadcountVarPct]":         { name: "HeadcountVarPct", displayName: "Headcount vs LY %",   format: "0.0%" },
};

export function briefingCombatLosses(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
