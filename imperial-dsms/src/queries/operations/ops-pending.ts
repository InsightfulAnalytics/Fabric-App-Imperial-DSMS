import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./ops-pending.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "FactLedger[LedgerID]": { name: "LedgerID",  displayName: "Posting" },
  "DimVendor[Vendor]":    { name: "Vendor",    displayName: "Vendor" },
  "FactLedger[Status]":   { name: "Status",    displayName: "Status" },
  "[Amount]":             { name: "Amount",    displayName: "Amount",        format: "\\$#,0" },
  "[OpenCount]":          { name: "OpenCount", displayName: "Open Postings", format: "#,0" },
};

export function opsPending(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
