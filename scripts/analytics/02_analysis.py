"""
DSMS analytics — Stage 2: Explore, test, quantify.
Each block ends with a printed FINDING (number + comparison + uncertainty) per the
insight-synthesis skill. Stats use effect-size + interval, not bare p-values.
"""
import pandas as pd, numpy as np
from scipy import stats
from pathlib import Path

DATA = Path(__file__).resolve().parents[2] / "data"
def load(n): return pd.read_csv(DATA / f"{n}.csv")

YN = {"Yes":1,"No":0,"Partial":1}
def yn(s): return s.map(YN).fillna(0).astype(int)
dd = load("DimDate"); dd["Date"] = pd.to_datetime(dd["Date"])
dkey = dd.set_index("DateKey")
def yymm(k): return dkey["YearMonth"].reindex(k).values
def yr(k):   return dkey["Year"].reindex(k).values

YAVIN_KEY = int(dd.loc[dd["IsBattleOfYavin"]==1, "DateKey"].iloc[0])
print(f"Battle of Yavin DateKey = {YAVIN_KEY} ({dd.loc[dd.DateKey==YAVIN_KEY,'Date'].dt.date.iloc[0]})\n")

# ============================================================ FINANCIALS
print("="*70, "\nFINANCIALS (Ledger + Budget)\n", "="*70)
led = load("FactLedger"); acc = load("DimAccount"); dept = load("DimDepartment")
led = led.merge(acc, on="AccountKey").merge(dept, on="DepartmentKey")
led["Year"] = yr(led["DateKey"]); led["YearMonth"] = yymm(led["DateKey"])
exp = led[led["AccountType"]=="Expense"]

annual = exp.groupby("Year")["AmountCredits"].sum()
print("\nAnnual expense (trillions):")
print((annual/1e12).round(2).to_string())
cagr = (annual.iloc[-1]/annual.iloc[0])**(1/(len(annual)-1)) - 1
print(f"Expense CAGR 2019->2024: {cagr:6.1%}")
yoy_final = annual.iloc[-1]/annual.iloc[-2]-1
print(f"Final-year (0 BBY) YoY:  {yoy_final:6.1%}")

# Budget variance
bud = load("FactBudget")
bud["Year"] = yr(bud["MonthDateKey"])
bud_exp = bud.groupby("Year")["ExpenseBudgetCredits"].sum()
var = (annual - bud_exp)/bud_exp
print("\nExpense vs budget (overrun %):")
print((var*100).round(1).to_string())

disp = led.groupby("Status")["AmountCredits"].agg(["count","sum"])
print("\nLedger by Status (count, credits-Tn):")
disp["sum"] = (disp["sum"]/1e12).round(2)
print(disp.to_string())
disp_share = led.loc[led.Status=="Disputed","AmountCredits"].sum()/led["AmountCredits"].sum()
print(f"Disputed share of value: {disp_share:.1%}")

# Spend concentration by department (Pareto)
deptspend = exp.groupby("Department")["AmountCredits"].sum().sort_values(ascending=False)
top = deptspend.cumsum()/deptspend.sum()
n80 = int((top<=0.8).sum())+1
print(f"\nPareto: top {n80} of {len(deptspend)} departments = "
      f"{top.iloc[n80-1]:.0%} of spend. Top 3:")
print((deptspend.head(3)/1e12).round(2).to_string())

# ============================================================ READINESS
print("\n", "="*70, "\nREADINESS (daily station telemetry)\n", "="*70)
rd = load("FactReadiness"); rd["Date"] = dkey["Date"].reindex(rd["SnapshotDateKey"]).values
rd["Year"] = yr(rd["SnapshotDateKey"])
rd["sl_ratio"] = rd["TIESquadronsOperational"]/rd["TIESquadronsTotal"]
ann_rd = rd.groupby("Year")[["ThreatIndex","ShieldIntegrityPct","SuperlaserChargePct","sl_ratio"]].mean()
print("\nAnnual mean readiness:")
print(ann_rd.round(3).to_string())

# Trend test: ThreatIndex vs time (Spearman, robust)
rho, p = stats.spearmanr(rd["SnapshotDateKey"], rd["ThreatIndex"])
print(f"\nThreatIndex vs time: Spearman rho={rho:.2f} (p={p:.1e}) -> "
      f"{'RISING' if rho>0 else 'falling'} over the 6 years")
# Shield integrity trend
rho2,p2 = stats.spearmanr(rd["SnapshotDateKey"], rd["ShieldIntegrityPct"])
print(f"ShieldIntegrity vs time: Spearman rho={rho2:.2f} (p={p2:.1e})")

# Last 90 days vs prior baseline (the run-up to Yavin)
rd_sorted = rd.sort_values("SnapshotDateKey")
last90 = rd_sorted.tail(90); base = rd_sorted.iloc[:-90]
for col in ["ThreatIndex","ShieldIntegrityPct","SuperlaserChargePct"]:
    a, b = last90[col].dropna(), base[col].dropna()
    t,pp = stats.ttest_ind(a,b,equal_var=False)
    d = (a.mean()-b.mean())/np.sqrt((a.var(ddof=1)+b.var(ddof=1))/2)
    print(f"  {col:20s} last90={a.mean():7.2f} vs base={b.mean():7.2f}  "
          f"d={d:+.2f}  p={pp:.1e}")

# ============================================================ ENGAGEMENTS
print("\n", "="*70, "\nENGAGEMENTS\n", "="*70)
eng = load("FactEngagement"); fac = load("DimEnemyFaction")
eng = eng.merge(fac, on="FactionKey")
eng["Year"] = yr(eng["EventDateKey"])
tot_fl, tot_el = eng["FriendlyLosses"].sum(), eng["EnemyLosses"].sum()
print(f"Total losses: friendly={tot_fl:,}  enemy={tot_el:,}  "
      f"exchange ratio (enemy/friendly)={tot_el/tot_fl:.2f}")
exch = eng.groupby("Year").apply(
    lambda g: g["EnemyLosses"].sum()/max(g["FriendlyLosses"].sum(),1), include_groups=False)
print("\nExchange ratio by year (higher=better for Empire):")
print(exch.round(2).to_string())
# By faction
fl = eng.groupby("Faction").agg(n=("EngagementID","count"),
        fl=("FriendlyLosses","sum"), el=("EnemyLosses","sum"))
fl["exch"] = (fl["el"]/fl["fl"].clip(lower=1)).round(2)
print("\nBy faction:")
print(fl.sort_values("n",ascending=False).to_string())
print("\nSuperlaser strikes:", int(yn(eng["SuperlaserStrike"]).sum()),
      "| Planets destroyed (full):", int((eng["PlanetDestroyed"]=="Yes").sum()),
      "| partial:", int((eng["PlanetDestroyed"]=="Partial").sum()))
# Superlaser engagements detail
sl = eng[eng["SuperlaserStrike"]=="Yes"]
if len(sl):
    print("Superlaser-strike engagements:")
    print(sl[["Year","Faction","EnemyLosses","PlanetDestroyed"]].to_string(index=False))

# ============================================================ STATION ATTACKS
print("\n", "="*70, "\nSTATION ATTACKS\n", "="*70)
att = load("FactStationAttack"); att["Year"]=yr(att["DateKey"])
att = att.merge(fac, on="FactionKey", how="left")
for c in ["ShieldHeld","HullBreach","Repelled"]: att[c]=yn(att[c])
print(f"Total attacks={len(att)}  repelled={att['Repelled'].sum()} "
      f"({att['Repelled'].mean():.0%})  shield-held={att['ShieldHeld'].mean():.0%}")
print("\nRepel rate by year:")
print(att.groupby("Year")["Repelled"].agg(["count","mean"]).round(2).to_string())
print("\nRepel rate by severity:")
print(att.groupby("Severity")["Repelled"].agg(["count","mean"]).round(2).to_string())
# The final attack
final = att.sort_values("DateKey").iloc[-1]
print(f"\nFINAL attack: {final.get('AttackName','(unnamed)')} | sector={final['AttackSector']} "
      f"| type={final['AttackType']} | severity={final['Severity']} "
      f"| shieldHeld={final['ShieldHeld']} | repelled={final['Repelled']} "
      f"| casualties={final['Casualties']:,}")

# Does shield holding predict repelling? (2x2 association)
ct = pd.crosstab(att["ShieldHeld"], att["Repelled"])
chi2,pc,_,_ = stats.chi2_contingency(ct)
n=ct.values.sum(); v=np.sqrt(chi2/(n*(min(ct.shape)-1)))
print(f"\nShieldHeld vs Repelled: Cramer's V={v:.2f} (p={pc:.1e})")
print(ct.to_string())

# ============================================================ MAINTENANCE
print("\n", "="*70, "\nMAINTENANCE\n", "="*70)
mnt = load("FactMaintenance")
mnt["OpenYear"]=yr(mnt["OpenedDateKey"])
open_wo = mnt[mnt["Status"]!="Closed"]
print(f"Work orders={len(mnt):,}  open/backlog={len(open_wo):,} ({len(open_wo)/len(mnt):.1%})")
print(f"Total downtime hours={mnt['DowntimeHours'].sum():,.0f}  "
      f"repair cost={mnt['RepairCostCredits'].sum()/1e9:.1f}Bn credits")
print("\nDowntime by priority:")
print(mnt.groupby("Priority")[["DowntimeHours","RepairCostCredits"]].mean().round(1).to_string())
print("\nWork orders opened by year:")
print(mnt.groupby("OpenYear").size().to_string())

# ============================================================ INVENTORY
print("\n", "="*70, "\nINVENTORY\n", "="*70)
inv = load("FactInventory")
print("Stock status mix:")
print((inv["StockStatus"].value_counts(normalize=True)*100).round(1).to_string())
stockout = (inv["StockStatus"]=="Stockout").mean() if "Stockout" in inv["StockStatus"].values else (inv["OnHandQty"]==0).mean()
print(f"Total inventory value (latest snapshot)...")
latest = inv[inv["SnapshotDateKey"]==inv["SnapshotDateKey"].max()]
print(f"  latest snapshot value = {latest['InventoryValueCredits'].sum()/1e9:.1f}Bn credits")

# ============================================================ HEADCOUNT
print("\n", "="*70, "\nHEADCOUNT / PERSONNEL\n", "="*70)
hc = load("FactHeadcount"); hc["Year"]=yr(hc["MonthDateKey"])
ann_hc = hc.groupby("Year").agg(hc=("Headcount","mean"), hires=("Hires","sum"),
        sep=("Separations","sum"), combat=("CombatLosses","sum"),
        payroll=("PayrollCostCredits","sum"))
ann_hc["payroll"]=(ann_hc["payroll"]/1e9).round(1)
print(ann_hc.round(0).to_string())
print(f"\nTotal combat losses (personnel) 6yr: {hc['CombatLosses'].sum():,}")
attrition = hc["Separations"].sum()/hc["Headcount"].mean()
print("Combat losses by year share of separations:")
print((hc.groupby("Year").apply(lambda g: g['CombatLosses'].sum()/max(g['Separations'].sum(),1), include_groups=False)).round(2).to_string())
