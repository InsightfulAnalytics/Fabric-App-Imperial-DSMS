import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import query from "./briefing-monthly-pnl.dax?raw";
import spec from "./briefing-monthly-pnl.json";

const connection = "imperialdsms";

const columnMetadata: ColumnMetadataMap = {
  "DimDate[MonthnYear]":     { name: "DimDateMonthnYear",     displayName: "Month (sort)", format: "0" },
  "DimDate[Month & Year]":   { name: "DimDateMonth & Year",   displayName: "Month" },
  "[TotalIncome]":           { name: "TotalIncome",           displayName: "Total Income",   format: "\\$#,0" },
  "[TotalExpenses]":         { name: "TotalExpenses",         displayName: "Total Expenses", format: "\\$#,0" },
  "[NetSurplus]":            { name: "NetSurplus",            displayName: "Net Surplus",    format: "\\$#,0" },
};

export function briefingMonthlyPnl(year: number) {
  return {
    connection,
    query: query.replaceAll("<<YEAR>>", String(year)),
    columnMetadata,
    vegaLiteSpec: spec as unknown as VisualizationSpec,
  };
}
