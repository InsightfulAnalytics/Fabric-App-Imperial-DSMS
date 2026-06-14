import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./briefing-payroll-mix.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimRole[RoleType]":  { name: "RoleType",     displayName: "Role" },
  "[PayrollValue]":     { name: "PayrollValue", displayName: "Payroll", format: "\\$#,0" },
};

export function briefingPayrollMix(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
