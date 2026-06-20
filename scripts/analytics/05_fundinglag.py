"""
Verify the funding-lag mechanic: attack-month spend spikes, subsidy catches up
~FUNDING_LAG_MONTHS later, cash dips negative in between.
"""
import pandas as pd, numpy as np
from scipy import stats
from pathlib import Path
DATA = Path(__file__).resolve().parents[2] / "data"
def load(n): return pd.read_csv(DATA / f"{n}.csv")

led = load("FactLedger").merge(load("DimAccount"), on="AccountKey")
led["ym"] = (led["DateKey"]//100).astype(int)   # YYYYMM
inc = led[led["AccountType"]=="Income"].groupby("ym")["AmountCredits"].sum()
exp = led[led["AccountType"]=="Expense"].groupby("ym")["AmountCredits"].sum()
m = pd.DataFrame({"income": inc, "expense": exp}).fillna(0).sort_index()
m["net"] = m["income"] - m["expense"]
m["cash"] = m["net"].cumsum()

att = load("FactStationAttack"); att["ym"] = (att["DateKey"]//100).astype(int)
att = att[att["AttackName"]!="Battle of Yavin"]
m["attacks"] = att.groupby("ym").size().reindex(m.index).fillna(0)

print("Months with NEGATIVE cash position (the 'borrowing' the user described):")
neg = m[m["cash"] < 0]
print(neg[["expense","income","net","cash","attacks"]].assign(
    expense=lambda d:(d.expense/1e9).round(1), income=lambda d:(d.income/1e9).round(1),
    net=lambda d:(d.net/1e9).round(1), cash=lambda d:(d.cash/1e9).round(1)).to_string())
print(f"\nWorst cash: {m['cash'].min()/1e9:,.1f}Bn  |  {(m['cash']<0).sum()} of {len(m)} months negative")

# Cross-correlation: does subsidy (income) lag expense? Detrend first.
de = m["expense"].diff().dropna(); di = m["income"].diff().dropna()
print("\nLag analysis: corr(expense[t], income[t+k]) on month-on-month change")
print("(a peak at k=+2 means the subsidy follows the spend by 2 months)")
for k in range(0, 5):
    a = de.iloc[:len(de)-k].values
    b = di.iloc[k:].values
    r = stats.spearmanr(a, b).correlation
    bar = "#" * int(max(0, r)*40)
    print(f"  income lag +{k} mo:  rho={r:+.2f}  {bar}")

# Show one concrete attack -> spike -> delayed catch-up episode
print("\nExample episode (first big attack month and the 3 months after):")
big = m[m["attacks"]>0].index
if len(big):
    start = big[3] if len(big) > 3 else big[0]
    win = m.loc[start:].head(4)
    print(win[["attacks","expense","income","net","cash"]].assign(
        expense=lambda d:(d.expense/1e9).round(1), income=lambda d:(d.income/1e9).round(1),
        net=lambda d:(d.net/1e9).round(1), cash=lambda d:(d.cash/1e9).round(1)).to_string())
