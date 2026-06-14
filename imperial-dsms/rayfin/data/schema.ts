import { BudgetAdjustment } from "./BudgetAdjustment.js";

/**
 * Entity-name → class map (type) used by the SDK client for type-safe
 * `client.data.<Entity>` access.
 */
export type AppSchema = {
  BudgetAdjustment: BudgetAdjustment;
};

/** Runtime registration — the Rayfin CLI discovers entities from this array. */
export const schema = [BudgetAdjustment];
