"""
DSMS analytics — Stage 1: Profile.
Follows the Analytics library EDA workflow: shape, grain, quality, time coverage.
Tool-agnostic; reads the local CSVs in ../data.
"""
import pandas as pd
import numpy as np
from pathlib import Path

DATA = Path(__file__).resolve().parents[2] / "data"
pd.set_option("display.width", 160)
pd.set_option("display.max_columns", 40)

def load(name):
    return pd.read_csv(DATA / f"{name}.csv")

# --- DimDate gives us the spine ---
dim_date = load("DimDate")
dim_date["Date"] = pd.to_datetime(dim_date["Date"])
print("=== Time coverage (DimDate) ===")
print(f"{dim_date['Date'].min().date()} -> {dim_date['Date'].max().date()}  "
      f"({len(dim_date):,} days, {dim_date['Year'].nunique()} years)")
print("GalacticEra values:", dim_date["GalacticEra"].unique().tolist())
print("Battle of Yavin rows:", int(dim_date["IsBattleOfYavin"].sum()),
      "| date:", dim_date.loc[dim_date["IsBattleOfYavin"]==1, "Date"].dt.date.tolist()[:3])

facts = ["FactLedger","FactMaintenance","FactInventory","FactEngagement","FactReadiness",
         "FactStationAttack","FactHeadcount","FactBudget","FactBudgetHeadcount"]

print("\n=== Fact table grain & size ===")
for f in facts:
    df = load(f)
    print(f"\n[{f}]  {len(df):,} rows x {df.shape[1]} cols")
    miss = (df.isna().mean()*100).round(1)
    miss = miss[miss > 0]
    if len(miss):
        print("  missing%:", miss.to_dict())
    else:
        print("  missing%: none")

# --- Ledger: the big one. P&L shape ---
print("\n\n=== FactLedger deep profile ===")
led = load("FactLedger")
acc = load("DimAccount")
dept = load("DimDepartment")
led = led.merge(acc, on="AccountKey", how="left").merge(dept, on="DepartmentKey", how="left")
led = led.merge(dim_date[["DateKey","Date","Year","Month","YearMonth","GalacticEra"]], on="DateKey", how="left")
print("Status values:", led["Status"].value_counts().to_dict())
print("AccountCategory:", led["AccountCategory"].value_counts().to_dict())
print("AccountType:", led["AccountType"].value_counts().to_dict())
print("Amount range:", round(led.AmountCredits.min(),1), "->", round(led.AmountCredits.max(),1))
print("NaturalSign values:", led["NaturalSign"].unique().tolist())
led.to_parquet(DATA.parent/"scripts"/"analytics"/"_ledger_enriched.parquet")
print("\n(enriched ledger cached)")
