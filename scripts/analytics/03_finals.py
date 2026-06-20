import pandas as pd, numpy as np
from pathlib import Path
DATA = Path(__file__).resolve().parents[2] / "data"
def load(n): return pd.read_csv(DATA / f"{n}.csv")
dd = load("DimDate"); dkey = dd.set_index("DateKey")
def yr(k): return dkey["Year"].reindex(k).values

led = load("FactLedger").merge(load("DimAccount"),on="AccountKey").merge(load("DimDepartment"),on="DepartmentKey")
exp = led[led["AccountType"]=="Expense"].copy()
tot = exp["AmountCredits"].sum()
print("Total 6yr expense:        $%.2fTn" % (tot/1e12))
div = exp.groupby("DivisionGroup")["AmountCredits"].sum().sort_values(ascending=False)
print("\nSpend by DivisionGroup (share):")
for k,v in div.items(): print(f"  {k:30s} ${v/1e12:6.2f}Tn  {v/tot:5.1%}")
ep = div.get("Engineering & Power",0); cs = div.get("Combat Systems",0)
print(f"\nEngineering & Power + Combat Systems = {(ep+cs)/tot:.1%} of all spend")
reactor = exp[exp["Department"].isin(["Main Reactor Core","Hypermatter Fuel Systems"])]["AmountCredits"].sum()
print(f"Reactor + Fuel only:      ${reactor/1e12:.2f}Tn  {reactor/tot:.1%}")

# Cost per trooper
hc = load("FactHeadcount"); hc["Year"]=yr(hc["MonthDateKey"]); led["Year"]=yr(led["DateKey"])
e19=exp.loc[yr(exp["DateKey"])==2019,"AmountCredits"].sum(); e24=exp.loc[yr(exp["DateKey"])==2024,"AmountCredits"].sum()
h19=hc.loc[hc.Year==2019,"Headcount"].mean(); h24=hc.loc[hc.Year==2024,"Headcount"].mean()
print(f"\nCost per trooper 2019: ${e19/h19/1e6:,.0f}M   2024: ${e24/h24/1e6:,.0f}M   ({(e24/h24)/(e19/h19):.2f}x)")

# Tactical vs propaganda exchange ratio (2024)
eng = load("FactEngagement"); eng["Year"]=yr(eng["EventDateKey"])
e = eng[eng.Year==2024]
def er(df): return df["EnemyLosses"].sum()/max(df["FriendlyLosses"].sum(),1)
prop = er(e); tac = er(e[e["SuperlaserStrike"]=="No"])
print(f"\n2024 exchange ratio: propaganda(all)={prop:,.0f}  tactical(excl superlaser)={tac:.1f}")
print(f"Superlaser civilian toll (enemy losses on SL strikes): {e.loc[e.SuperlaserStrike=='Yes','EnemyLosses'].sum():,.0f}")
