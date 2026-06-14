import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./maint-recent.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "FactMaintenance[WorkOrderID]":   { name: "WorkOrderID", displayName: "Work Order" },
  "FactMaintenance[OpenedDateKey]": { name: "OpenedKey",   displayName: "Opened", format: "0" },
  "FactMaintenance[Priority]":      { name: "Priority",    displayName: "Priority" },
  "FactMaintenance[Status]":        { name: "Status",      displayName: "Status" },
  "DimDepartment[Department]":      { name: "Department",  displayName: "System" },
  "DimItem[Item]":                  { name: "Item",        displayName: "Component" },
  "[DowntimeHrs]":                  { name: "DowntimeHrs", displayName: "Downtime (h)",   format: "#,0.0" },
  "[RepairCost]":                   { name: "RepairCost",  displayName: "Repair Cost ₡", format: "\\$#,0" },
};

export function maintRecent(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
