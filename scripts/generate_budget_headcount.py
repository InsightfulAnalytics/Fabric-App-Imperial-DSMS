#!/usr/bin/env python3
"""
FactBudgetHeadcount generator
-----------------------------
Derives an annual headcount + payroll budget at the (Month x Department x Role)
grain from the FactHeadcount actuals. Per (Dept, Role, Year), the average
monthly actual headcount and pay rate are taken, scaled by a per-(dept, role,
year) budget ratio drawn from a uniform [0.88, 1.12] distribution (so budgets
fall within +/- 12% of the annual actual average) and then held flat across
the 12 months of that year as a planning baseline.
"""

import csv
import os
import random
from collections import defaultdict

SEED = 1977
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, "data")

random.seed(SEED)

# Load actuals
fact_hc_path = os.path.join(DATA, "FactHeadcount.csv")
rows = []
with open(fact_hc_path, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for r in reader:
        rows.append({
            "MonthDateKey": int(r["MonthDateKey"]),
            "DepartmentKey": int(r["DepartmentKey"]),
            "RoleKey": int(r["RoleKey"]),
            "Headcount": int(r["Headcount"]),
            "AvgPay": int(r["AverageMonthlyPayCredits"]),
        })

# Aggregate per (Dept, Role, Year) -> avg headcount & avg pay rate across months
agg = defaultdict(lambda: {"hc_sum": 0, "pay_sum": 0, "n": 0, "months": set()})
for r in rows:
    yr = r["MonthDateKey"] // 10000
    key = (r["DepartmentKey"], r["RoleKey"], yr)
    a = agg[key]
    a["hc_sum"] += r["Headcount"]
    a["pay_sum"] += r["AvgPay"]
    a["n"] += 1
    a["months"].add(r["MonthDateKey"] // 100 % 100)

# Build per-(dept, role, year) budget targets
# Budget ratio = budgeted / actual in [0.88, 1.12] -> +/- 12%
out_rows = []
for (dept, role, yr), a in sorted(agg.items()):
    avg_hc = a["hc_sum"] / a["n"] if a["n"] else 0
    avg_pay = a["pay_sum"] / a["n"] if a["n"] else 0
    if avg_hc == 0:
        continue
    hc_ratio = random.uniform(0.88, 1.12)
    pay_ratio = random.uniform(0.95, 1.05)
    budgeted_hc = int(round(avg_hc * hc_ratio))
    budgeted_pay = int(round(avg_pay * pay_ratio))
    budgeted_cost = budgeted_hc * budgeted_pay
    # Emit one row per month-of-year that appeared in actuals,
    # using MonthDateKey = YYYYMM01 (start-of-month, matching FactBudget convention)
    for m in sorted(a["months"]):
        mdk = yr * 10000 + m * 100 + 1
        out_rows.append([
            mdk, dept, role,
            budgeted_hc, budgeted_pay, budgeted_cost,
        ])

out_path = os.path.join(DATA, "FactBudgetHeadcount.csv")
with open(out_path, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow([
        "MonthDateKey", "DepartmentKey", "RoleKey",
        "BudgetedHeadcount", "BudgetedAvgMonthlyPayCredits",
        "BudgetedPayrollCostCredits",
    ])
    w.writerows(out_rows)

print(f"Wrote {len(out_rows):,} rows to {out_path}")
