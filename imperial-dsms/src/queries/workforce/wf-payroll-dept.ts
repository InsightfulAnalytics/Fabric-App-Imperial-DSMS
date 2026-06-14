import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./wf-payroll-dept.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDepartment[DivisionGroup]": { name: "DivisionGroup", displayName: "Division Group" },
  "[Payroll]":                    { name: "Payroll",       displayName: "Payroll", format: "\\$#,0" },
};

export function wfPayrollDept(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
