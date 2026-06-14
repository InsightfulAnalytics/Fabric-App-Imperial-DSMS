/**
 * Filters injected into briefing queries at the `<<FILTERS>>` placeholder.
 * Each set field becomes one CALCULATETABLE/CALCULATE filter argument. Filters
 * only move measures whose fact tables relate to the dimension (star schema):
 *   - department / division → DimDepartment (all facts)
 *   - zone                  → DimLocation   (FactInventory, FactMaintenance)
 *   - accountCategory       → DimAccount    (FactLedger)
 *   - combatRole / roleType → DimRole       (FactHeadcount, FactBudgetHeadcount)
 */
export interface BriefingFilters {
  department?: string | null;
  division?: string | null;
  zone?: string | null;
  accountCategory?: string | null;
  /** Display value — maps to DimRole[IsCombat] = "Yes" / "No". */
  combatRole?: "Combat" | "Non-combat" | null;
  roleType?: string | null;
}

function clause(column: string, value: string): string {
  const escaped = value.replace(/"/g, '""');
  return `,\n    ${column} = "${escaped}"`;
}

/** Builds the concatenated filter clauses for `<<FILTERS>>`. Empty when nothing set. */
export function filterClauses(filters: BriefingFilters = {}): string {
  let out = "";
  if (filters.department) out += clause("DimDepartment[Department]", filters.department);
  if (filters.division) out += clause("DimDepartment[DivisionGroup]", filters.division);
  if (filters.zone) out += clause("DimLocation[Zone]", filters.zone);
  if (filters.accountCategory) out += clause("DimAccount[AccountCategory]", filters.accountCategory);
  if (filters.combatRole)
    out += clause("DimRole[IsCombat]", filters.combatRole === "Combat" ? "Yes" : "No");
  if (filters.roleType) out += clause("DimRole[RoleType]", filters.roleType);
  return out;
}

/** True when any filter narrows DimDepartment — drives the allocation income swap. */
export function isDeptScoped(filters: BriefingFilters = {}): boolean {
  return Boolean(filters.department || filters.division);
}

/**
 * Income measure for the briefing — injected at `<<INCOME>>`.
 * Station-wide, income is the ledger's Treasury subsidy ([Total Income]).
 * Under a department/division filter the subsidy is booked elsewhere, so the
 * cost-driver-weighted [Department Subsidy Allocation] is the meaningful line.
 */
export function incomeMeasureExpr(filtered: boolean): string {
  return filtered ? "[Department Subsidy Allocation]" : "[Total Income]";
}

/**
 * Net-surplus measure for the briefing — injected at `<<NET>>`.
 * Mirrors the income swap: allocation − expenses when filtered.
 */
export function netSurplusMeasureExpr(filtered: boolean): string {
  return filtered
    ? "( [Department Subsidy Allocation] - [Total Expenses] )"
    : "[Net Surplus]";
}
