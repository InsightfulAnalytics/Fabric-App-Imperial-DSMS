"""
DSMS analytics — Stage 4: Cross-domain cause-and-effect.
Builds a MONTHLY panel joining every fact table on the shared time dimension, then asks:
does X move with Y? Critically, everything trends toward the Battle of Yavin, so a raw
correlation is confounded by time. We therefore also DETREND (first differences = MoM
change) so a correlation reflects genuine co-movement, not a shared ramp.
Per the stats skill: report effect size (rho), flag the confounder, don't claim causation.
"""
import pandas as pd, numpy as np
from scipy import stats
from pathlib import Path

DATA = Path(__file__).resolve().parents[2] / "data"
def load(n): return pd.read_csv(DATA / f"{n}.csv")
dd = load("DimDate"); dd["Date"] = pd.to_datetime(dd["Date"])
dk = dd.set_index("DateKey")
def ym(keys): return pd.to_datetime(dk["Date"].reindex(keys).values).to_period("M")

YN = {"Yes":1,"No":0,"Partial":1}

# ---- assemble monthly series from each fact ----
panel = {}

hc = load("FactHeadcount"); hc["M"] = ym(hc["MonthDateKey"])
g = hc.groupby("M")
panel["combat_losses"] = g["CombatLosses"].sum()
panel["separations"]   = g["Separations"].sum()
panel["headcount"]     = g["Headcount"].sum()

att = load("FactStationAttack"); att["M"] = ym(att["DateKey"])
panel["attacks"]        = att.groupby("M").size()
panel["attack_cas"]     = att.groupby("M")["Casualties"].sum()
panel["crit_attacks"]   = att[att["Severity"]=="Critical"].groupby("M").size()

eng = load("FactEngagement"); eng["M"] = ym(eng["EventDateKey"])
ge = eng.groupby("M")
panel["engagements"]    = ge.size()
panel["friendly_loss"]  = ge["FriendlyLosses"].sum()
panel["enemy_loss"]     = ge["EnemyLosses"].sum()
panel["sl_strikes"]     = eng.assign(s=eng["SuperlaserStrike"].map(YN)).groupby("M")["s"].sum()

rd = load("FactReadiness"); rd["M"] = ym(rd["SnapshotDateKey"])
gr = rd.groupby("M")
panel["threat_index"]   = gr["ThreatIndex"].mean()
panel["shield_pct"]     = gr["ShieldIntegrityPct"].mean()
panel["sl_charge"]      = gr["SuperlaserChargePct"].mean()
panel["sorties"]        = gr["SortiesFlown"].sum()

led = load("FactLedger").merge(load("DimAccount"),on="AccountKey").merge(load("DimDepartment"),on="DepartmentKey")
led["M"] = ym(led["DateKey"]); exp = led[led["AccountType"]=="Expense"]
panel["expense"]        = exp.groupby("M")["AmountCredits"].sum()
panel["reactor_spend"]  = exp[exp["DivisionGroup"]=="Engineering & Power"].groupby("M")["AmountCredits"].sum()

mnt = load("FactMaintenance"); mnt["M"] = ym(mnt["OpenedDateKey"])
gm = mnt.groupby("M")
panel["downtime"]       = gm["DowntimeHours"].sum()
panel["repair_cost"]    = gm["RepairCostCredits"].sum()
panel["work_orders"]    = gm.size()

P = pd.DataFrame(panel).fillna(0).sort_index()
print(f"Monthly panel: {P.shape[0]} months x {P.shape[1]} series "
      f"({P.index.min()} -> {P.index.max()})\n")

def rho_ci(x, y, n_boot=2000, seed=7):
    r = stats.spearmanr(x, y).correlation
    rng = np.random.default_rng(seed); n = len(x); bs = []
    xv, yv = np.asarray(x), np.asarray(y)
    for _ in range(n_boot):
        idx = rng.integers(0, n, n)
        c = stats.spearmanr(xv[idx], yv[idx]).correlation
        if not np.isnan(c): bs.append(c)
    lo, hi = np.percentile(bs, [2.5, 97.5])
    return r, lo, hi

# ---- the user's specific hypotheses ----
print("="*78)
print("HYPOTHESES — raw (confounded by the Yavin ramp) vs DETRENDED (MoM change)")
print("="*78)
D = P.diff().dropna()   # first differences = month-on-month change
pairs = [
    ("combat_losses","attacks",      "Combat losses rise when the station is attacked?"),
    ("combat_losses","friendly_loss","Combat losses track battlefield (engagement) losses?"),
    ("combat_losses","threat_index", "Combat losses rise with the threat level?"),
    ("attacks","threat_index",       "More attacks when threat index is high?"),
    ("attack_cas","crit_attacks",    "Casualties driven by CRITICAL-severity attacks?"),
    ("expense","threat_index",       "Spend rises with the threat level?"),
    ("downtime","reactor_spend",     "Reactor downtime tracks reactor spend?"),
    ("sl_charge","attacks",          "Attacks ramp as the superlaser charges?"),
]
print(f"\n{'hypothesis':52s} {'raw rho':>8} {'detrended rho [95% CI]':>26}")
print("-"*88)
for a,b,label in pairs:
    raw = stats.spearmanr(P[a], P[b]).correlation
    r,lo,hi = rho_ci(D[a], D[b])
    flag = "  <-- real co-movement" if lo>0.15 or hi<-0.15 else ("  (vanishes when detrended)" if abs(raw)>0.5 and abs(r)<0.3 else "")
    print(f"{label:52s} {raw:8.2f} {r:7.2f} [{lo:+.2f},{hi:+.2f}]{flag}")

# ---- conformed-dimension reach: which facts share which dims ----
print("\n" + "="*78)
print("Strongest DETRENDED links (|rho|, MoM) — the genuine cause-effect signals")
print("="*78)
C = D.corr(method="spearman")
pairs_all = [(C.index[i], C.columns[j], C.iloc[i,j])
             for i in range(len(C)) for j in range(i+1, len(C))]
for a,b,r in sorted(pairs_all, key=lambda t: -abs(t[2]))[:12]:
    print(f"  {r:+.2f}   {a:16s} <-> {b}")
