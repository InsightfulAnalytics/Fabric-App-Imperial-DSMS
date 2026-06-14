#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Validate referential integrity of the generated Death Star dataset."""
import csv
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")


def load(name):
    with open(os.path.join(OUT, name), encoding="utf-8") as f:
        return list(csv.DictReader(f))


def keyset(name, col):
    return {row[col] for row in load(name)}


problems = []


def check(fact, fk_col, dim, dim_col, allow_blank=False):
    dim_keys = keyset(dim, dim_col)
    rows = load(fact)
    bad = 0
    for r in rows:
        v = r[fk_col]
        if allow_blank and v == "":
            continue
        if v not in dim_keys:
            bad += 1
    status = "OK" if bad == 0 else f"*** {bad} ORPHANS ***"
    if bad:
        problems.append(f"{fact}.{fk_col} -> {dim}.{dim_col}: {bad} orphans")
    print(f"  {fact:<20} {fk_col:<16} -> {dim:<16} {dim_col:<14} {status}")


print("=" * 78)
print("REFERENTIAL INTEGRITY")
print("=" * 78)
# Ledger
check("FactLedger.csv", "DateKey", "DimDate.csv", "DateKey")
check("FactLedger.csv", "DepartmentKey", "DimDepartment.csv", "DepartmentKey")
check("FactLedger.csv", "AccountKey", "DimAccount.csv", "AccountKey")
check("FactLedger.csv", "VendorKey", "DimVendor.csv", "VendorKey")
# Inventory
check("FactInventory.csv", "SnapshotDateKey", "DimDate.csv", "DateKey")
check("FactInventory.csv", "ItemKey", "DimItem.csv", "ItemKey")
check("FactInventory.csv", "LocationKey", "DimLocation.csv", "LocationKey")
# Headcount
check("FactHeadcount.csv", "MonthDateKey", "DimDate.csv", "DateKey")
check("FactHeadcount.csv", "DepartmentKey", "DimDepartment.csv", "DepartmentKey")
check("FactHeadcount.csv", "RoleKey", "DimRole.csv", "RoleKey")
# Maintenance
check("FactMaintenance.csv", "OpenedDateKey", "DimDate.csv", "DateKey")
check("FactMaintenance.csv", "ClosedDateKey", "DimDate.csv", "DateKey", allow_blank=True)
check("FactMaintenance.csv", "DepartmentKey", "DimDepartment.csv", "DepartmentKey")
check("FactMaintenance.csv", "LocationKey", "DimLocation.csv", "LocationKey")
check("FactMaintenance.csv", "ItemKey", "DimItem.csv", "ItemKey")

print("\n" + "=" * 78)
print("SANITY CHECKS")
print("=" * 78)
# unique PKs
for fact, pk in [("FactLedger.csv", "LedgerID"), ("FactMaintenance.csv", "WorkOrderID")]:
    rows = load(fact)
    ids = [r[pk] for r in rows]
    dup = len(ids) - len(set(ids))
    print(f"  {fact:<20} {pk} unique: {'OK' if dup == 0 else f'*** {dup} dups ***'}")
    if dup:
        problems.append(f"{fact}.{pk}: {dup} duplicate keys")

# amounts non-negative
led = load("FactLedger.csv")
neg = sum(1 for r in led if int(r["AmountCredits"]) < 0)
print(f"  FactLedger negative amounts: {'OK (none)' if neg == 0 else f'*** {neg} ***'}")
if neg:
    problems.append(f"FactLedger has {neg} negative amounts")

# income vs expense split
accts = {r["AccountKey"]: r["AccountType"] for r in load("DimAccount.csv")}
inc = sum(int(r["AmountCredits"]) for r in led if accts[r["AccountKey"]] == "Income")
exp = sum(int(r["AmountCredits"]) for r in led if accts[r["AccountKey"]] == "Expense")
print(f"  Income postings:  {sum(1 for r in led if accts[r['AccountKey']] == 'Income'):>8,}")
print(f"  Expense postings: {sum(1 for r in led if accts[r['AccountKey']] == 'Expense'):>8,}")
print(f"  Total Income:   {inc:>22,} cr")
print(f"  Total Expense:  {exp:>22,} cr")
print(f"  Net:            {inc - exp:>22,} cr")

# date coverage
dd = load("DimDate.csv")
dkeys = [int(r["DateKey"]) for r in dd]
print(f"  DimDate span: {min(dkeys)} .. {max(dkeys)}  ({len(dkeys):,} days)")

print("\n" + "=" * 78)
if problems:
    print(f"RESULT: {len(problems)} PROBLEM(S) FOUND")
    for p in problems:
        print("  - " + p)
else:
    print("RESULT: ALL CHECKS PASSED - dataset is referentially clean")
print("=" * 78)
