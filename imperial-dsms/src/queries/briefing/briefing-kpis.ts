import type { ColumnMetadataMap } from "@/lib/to-data-table";
import query from "./briefing-kpis.dax?raw";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "[LatestYear]":         { name: "LatestYear",         displayName: "Latest Year",          format: "0" },
  "[TotalIncomeCY]":      { name: "TotalIncomeCY",      displayName: "Total Income",         format: "\\$#,0" },
  "[TotalIncomePY]":      { name: "TotalIncomePY",      displayName: "Total Income (PY)",    format: "\\$#,0" },
  "[TotalExpensesCY]":    { name: "TotalExpensesCY",    displayName: "Total Expenses",       format: "\\$#,0" },
  "[TotalExpensesPY]":    { name: "TotalExpensesPY",    displayName: "Total Expenses (PY)",  format: "\\$#,0" },
  "[NetSurplusCY]":       { name: "NetSurplusCY",       displayName: "Net Surplus",          format: "\\$#,0" },
  "[NetSurplusPY]":       { name: "NetSurplusPY",       displayName: "Net Surplus (PY)",     format: "\\$#,0" },
  "[ImperialSubsidyCY]":  { name: "ImperialSubsidyCY",  displayName: "Imperial Subsidy",     format: "\\$#,0" },
  "[ImperialSubsidyPY]":  { name: "ImperialSubsidyPY",  displayName: "Imperial Subsidy (PY)",format: "\\$#,0" },
  "[SubsidyCoverageCY]":  { name: "SubsidyCoverageCY",  displayName: "Subsidy Coverage %",   format: "0.0%" },
  "[SubsidyCoveragePY]":  { name: "SubsidyCoveragePY",  displayName: "Subsidy Coverage % (PY)",format:"0.0%" },
  "[OperatingMarginCY]":  { name: "OperatingMarginCY",  displayName: "Operating Margin %",   format: "0.0%" },
  "[OperatingMarginPY]":  { name: "OperatingMarginPY",  displayName: "Operating Margin % (PY)",format:"0.0%" },
};

export function briefingKpis(year: number) {
  return {
    connection,
    query: query.replaceAll("<<YEAR>>", String(year)),
    columnMetadata,
  };
}
