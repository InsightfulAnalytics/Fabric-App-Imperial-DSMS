import { describe, it, expect } from "vitest";
import {
  applyPct,
  buildRows,
  computeTotals,
  groupByDivision,
  signedCredits,
  fmtPctVal,
  type BudgetBaseRow,
} from "@/lib/budget";

const base: BudgetBaseRow[] = [
  { departmentKey: 1, department: "Superlaser Battery", divisionGroup: "Combat Systems", incomeBudget: 1000, expenseBudget: 800 },
  { departmentKey: 6, department: "Reactor Core", divisionGroup: "Engineering & Power", incomeBudget: 600, expenseBudget: 500 },
];

describe("applyPct", () => {
  it("nudges a base figure by a percentage", () => {
    expect(applyPct(1000, 10)).toBe(1100);
    expect(applyPct(1000, -5)).toBe(950);
    expect(applyPct(1000, 0)).toBe(1000);
  });
});

describe("buildRows", () => {
  it("uses committed values when there is no draft, and marks them clean", () => {
    const rows = buildRows(base, { 1: { income: 10, expense: 0 } }, {});
    const r = rows.find((x) => x.departmentKey === 1)!;
    expect(r.incomeAdjPct).toBe(10);
    expect(r.adjustedIncome).toBe(1100);
    expect(r.incomeDirty).toBe(false); // matches committed → not dirty
    expect(r.dirty).toBe(false);
  });

  it("draft overrides committed and flags dirty", () => {
    const rows = buildRows(base, { 1: { income: 10, expense: 0 } }, { 1: { income: 25, expense: 0 } });
    const r = rows.find((x) => x.departmentKey === 1)!;
    expect(r.incomeAdjPct).toBe(25);
    expect(r.adjustedIncome).toBe(1250);
    expect(r.incomeDirty).toBe(true);
    expect(r.dirty).toBe(true);
  });

  it("net = adjusted income − adjusted expense", () => {
    const rows = buildRows(base, {}, { 6: { income: 0, expense: -10 } });
    const r = rows.find((x) => x.departmentKey === 6)!;
    expect(r.adjustedExpense).toBe(450);
    expect(r.net).toBe(150); // 600 − 450
  });
});

describe("computeTotals", () => {
  it("aggregates base vs adjusted and counts dirty rows", () => {
    const rows = buildRows(base, {}, { 1: { income: 10, expense: 0 } });
    const t = computeTotals(rows);
    expect(t.baseIncome).toBe(1600);
    expect(t.adjIncome).toBe(1700); // 1100 + 600
    expect(t.baseExpense).toBe(1300);
    expect(t.dirtyCount).toBe(1);
    expect(t.baseCoverage).toBeCloseTo(1600 / 1300);
    expect(t.adjCoverage).toBeCloseTo(1700 / 1300);
  });
});

describe("groupByDivision", () => {
  it("orders known groups by DIVISION_ORDER", () => {
    const rows = buildRows(base, {}, {});
    const groups = groupByDivision(rows).map((g) => g.group);
    expect(groups).toEqual(["Combat Systems", "Engineering & Power"]);
  });
});

describe("formatters", () => {
  it("signedCredits prefixes sign and ₡", () => {
    expect(signedCredits(94_000_000)).toBe("+₡ 94.00M");
    expect(signedCredits(-53_000_000)).toBe("−₡ 53.00M");
    expect(signedCredits(0)).toBe("₡ 0");
  });

  it("fmtPctVal shows sign and trims integers", () => {
    expect(fmtPctVal(10)).toBe("+10");
    expect(fmtPctVal(-5)).toBe("-5");
    expect(fmtPctVal(12.5)).toBe("+12.5");
    expect(fmtPctVal(0)).toBe("0");
  });
});
