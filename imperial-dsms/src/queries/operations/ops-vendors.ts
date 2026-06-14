import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { filterClauses, type BriefingFilters } from "@/lib/dax";
import query from "./ops-vendors.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimVendor[Vendor]":       { name: "Vendor",       displayName: "Vendor" },
  "DimVendor[VendorType]":   { name: "VendorType",   displayName: "Type" },
  "DimVendor[HomeWorld]":    { name: "HomeWorld",    displayName: "Home World" },
  "DimVendor[ContractTier]": { name: "ContractTier", displayName: "Tier" },
  "DimVendor[RiskRating]":   { name: "RiskRating",   displayName: "Risk Rating" },
  "[Spend]":                 { name: "Spend",        displayName: "Total Spend", format: "\\$#,0" },
};

export function opsVendors(year: number, filters: BriefingFilters = {}) {
  return {
    connection,
    query: query
      .replaceAll("<<YEAR>>", String(year))
      .replaceAll("<<FILTERS>>", filterClauses(filters)),
    columnMetadata,
  };
}
