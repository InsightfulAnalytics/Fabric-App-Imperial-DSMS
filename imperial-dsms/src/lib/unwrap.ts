import type { CachedQueryResult } from "@microsoft/fabric-app-data";
import { toDataTable, type ColumnMetadataMap } from "@/lib/to-data-table";

/**
 * Unwraps a successful query result into objects keyed by metadata column name.
 * Returns [] while loading or on error (callers branch on the result status
 * separately for error display).
 */
export function rowsOf(
  result: CachedQueryResult | undefined,
  metadata: ColumnMetadataMap,
): Record<string, unknown>[] {
  if (result?.status !== "success") return [];
  const dt = toDataTable(result.table, metadata);
  return dt.rows.map((r) => {
    const obj: Record<string, unknown> = {};
    dt.columns.forEach((col, i) => {
      obj[col.name] = r[i];
    });
    return obj;
  });
}

export const num = (v: unknown): number => (v == null ? NaN : Number(v));
export const str = (v: unknown): string => (v == null ? "" : String(v));
