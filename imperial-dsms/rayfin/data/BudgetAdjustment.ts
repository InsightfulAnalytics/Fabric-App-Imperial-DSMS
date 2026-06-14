import { entity, authenticated, uuid, int, decimal, text, date } from "@microsoft/rayfin-core";

/**
 * A posted budget adjustment for one department in one financial (calendar) year.
 *
 * The semantic model's FactBudget is import-from-CSV and read-only at runtime, so
 * the Budget Planning page can't mutate the base budget. Instead it stores a
 * percentage nudge per (year × department) here, in the app's Fabric SQL Database,
 * and overlays it on the base numbers at read time:
 *
 *     adjusted = base × (1 + pct / 100)
 *
 * One current row per (year, departmentKey); we maintain it with find-then-update
 * (UUID is the only primary key, so a composite key isn't available). The result is
 * shared — every viewer sees the same posted budget, stamped with who/when.
 *
 * Access: writes are gated to full-clearance users in the UI (see
 * page-access.ts `canPostBudget`). `@authenticated` is the server baseline (a valid
 * Fabric session is required); this mirrors the project's posture that in-app gating
 * is a UX boundary while the Fabric platform owns data enforcement
 * (see access_and_security.md).
 */
@entity()
@authenticated("*")
export class BudgetAdjustment {
  @uuid() id!: string;
  /** Calendar year (DimDate[Year]), e.g. 2024. */
  @int() year!: number;
  /** DimDepartment[DepartmentKey]. */
  @int() departmentKey!: number;
  /** Denormalized department name, for display + audit. */
  @text() department!: string;
  /** Income budget nudge, as a percent: 10.5 = +10.5%. */
  @decimal() incomePct!: number;
  /** Expense budget nudge, as a percent. */
  @decimal() expensePct!: number;
  /** Sign-in email of the poster. */
  @text() postedBy!: string;
  /** When the adjustment was posted. */
  @date() postedAt!: Date;
}
