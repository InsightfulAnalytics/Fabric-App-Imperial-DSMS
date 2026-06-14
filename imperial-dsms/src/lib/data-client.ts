import type { DataApi, TypedDataClients } from "@microsoft/rayfin-data";
import { getRayfinClient } from "./rayfin-client";

/**
 * Client-side row shape for the BudgetAdjustment SQL entity.
 * Mirrors `rayfin/data/BudgetAdjustment.ts` (kept in sync by hand — both are small).
 * `postedAt` arrives from GraphQL as an ISO string.
 */
export interface BudgetAdjustmentRow {
  id: string;
  year: number;
  departmentKey: number;
  department: string;
  incomePct: number;
  expensePct: number;
  postedBy: string;
  postedAt: string;
}

export type BudgetSchema = { BudgetAdjustment: BudgetAdjustmentRow };

/**
 * Typed accessor for the app's Fabric SQL Database (Data API Builder GraphQL).
 *
 * `getRayfinClient().data` is generic (`Record<string, any>`); we narrow it to our
 * schema so `.findMany / .create / .update` are type-checked. Throws if the rayfin
 * env vars are missing (i.e. before `npx rayfin up`) — callers should catch and
 * degrade gracefully.
 */
export function getDataApi(): DataApi<BudgetSchema> & TypedDataClients<BudgetSchema> {
  return getRayfinClient().data as unknown as DataApi<BudgetSchema> &
    TypedDataClients<BudgetSchema>;
}
