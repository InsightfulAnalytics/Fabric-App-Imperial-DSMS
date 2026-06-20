# DSMS — Insight Pass & Visualization Recommendations

*Produced via the Analytics library (`Learning Resources/Analytics`) — analysis loop:
Frame → Profile → Explore → Test → Synthesise. Tool-agnostic; run on the local CSVs in
`./data`. Stats report effect size + interval, not bare p-values.*

> **⚠ Data regenerated 2026-06-19 (causal rewire).** The headline figures in §1–§7 below
> were computed on the *original* dataset. The generator has since been rewired so attacks
> mechanically drive losses/repairs/spend with a 2-month funding lag (see the **Causal Chain
> & Funding Lag** addendum at the foot of this doc). Totals shifted (6-yr expense
> ~$82.5T → ~$89.6T as battle-damage spend was added); the *qualitative* insights still hold,
> but re-run `scripts/analytics/02_analysis.py` before quoting exact numbers.

**The dataset is a story.** Six years of Death Star Management Services telemetry
(5 BBY → 0 BBY), and **the Battle of Yavin is the very last day in the model** (31 Dec 2024).
Read end-to-end, the data is the rise-and-fall arc of the station: spend explodes, the
superlaser comes online, the threat board goes red — and a flawless defensive record ends
in a single catastrophic breach. Every insight below ladders up to that arc.

---

## Headline

> The Empire spent six years and **$82.5 trillion** building an unstoppable station, poured
> **half its budget into the one system that holds the fatal flaw**, posted a **near-perfect
> 99% defensive record** — and lost everything in the **one attack that record never
> stress-tested**. The warning signs were all in the data; none were in a single number.

---

## Ranked insights (impact × confidence)

### 1. The Reactor Paradox — half the budget went into the fatal flaw  `[Confidence: High]`
- **Evidence:** The **Engineering & Power** division (reactor core, hypermatter fuel, power,
  structural) consumed **$41.5Tn = 50.3%** of all six-year spend; the reactor + fuel pair
  alone is **$36.7Tn (44.5%)**. Spend concentration is steep — **7 of 24 departments = 83%**
  (Pareto).
- **So what:** Investment was overwhelmingly directed at the energy core — the exact
  subsystem whose thermal-exhaust vulnerability ended the station. Maximum spend, maximum
  single-point-of-failure.
- **Action:** Track **Reactor Complex Spend %** as a concentration-risk KPI; pair budget with
  a resilience/redundancy measure, not just throughput.
- **Visual:** Pareto (sorted bar + cumulative % line) of spend by department, Engineering &
  Power highlighted; or a treemap by DivisionGroup.

### 2. A textbook spend explosion — and it was *authorized*  `[Confidence: High]`
- **Evidence:** Annual expense **$7.5Tn → $24.1Tn**, **26.2% CAGR**, with a final-year
  (0 BBY) jump of **+53.7% YoY**. Yet actuals stayed within **±5.5% of budget every single
  year** (−3.1% in 0 BBY).
- **So what:** This wasn't runaway overspend — it was a *planned* wartime ramp. The risk
  isn't financial control; it's strategic concentration (see #1).
- **Action:** Show budget *adherence* (good) and spend *trajectory* (the real story) side by
  side so the headline isn't "on budget = healthy."
- **Visual:** Column (actual) + line (budget) combo over time with a YoY% ribbon; reference
  band at ±5%.

### 3. The threat board went red — and stayed red  `[Confidence: High]`
- **Evidence:** Threat Index rises almost monotonically with time (**Spearman ρ = 0.97**).
  The final **90 days averaged 98.5 vs a 40.9 baseline — Cohen's d = +4.2** (an enormous,
  unambiguous shift). The superlaser charged from **0% (pre-2023) to 88% in 0 BBY**.
- **So what:** Operational telemetry was screaming. The escalation was gradual enough to
  normalize and abrupt enough at the end to be decisive.
- **Action:** A **Threat Index YoY Change** KPI with a red threshold band; alert on
  sustained escalation, not single-day spikes.
- **Visual:** Line chart of daily Threat Index with a LOESS/trend overlay and the last-90-day
  window shaded; superlaser-charge as a second muted line.

### 4. Don't average the war — two events swamp 1,180 battles  `[Confidence: High]`
- **Evidence:** Headline 2024 exchange ratio reads **1,126 : 1** — but that's **one
  superlaser shot on Alderaan (~2.0 billion "enemy losses")**. Strip the superlaser *and*
  the single catastrophic self-loss (the station's own destruction, logged as
  **1.7M friendly losses** in one "Lost" engagement) and the routine exchange ratio is a
  **steady 2.51 : 1 across all six years**.
- **So what:** The aggregate is meaningless — a propaganda number (Alderaan) and a disaster
  number (Yavin) dominate 1,180 routine skirmishes. This is a Simpson's-paradox-class trap:
  *the mean lies; the segments tell the truth.*
- **Action:** Report a **Superlaser Civilian Toll** measure separately from tactical combat;
  show the routine exchange ratio with superlaser strikes excluded.
- **Visual:** A distribution view (box/strip plot of per-engagement losses, log scale) with
  the two outliers annotated — far more honest than any single ratio.

### 5. A perfect record that was never the right test  `[Confidence: High]`
- **Evidence:** **126 of 127 attacks repelled (99%)**, shields held 91% of the time. But
  the repel rate is **100% for Low/Medium/High severity and only 96% (24/25) for Critical**.
  The single failure — *Battle of Yavin, Meridian Trench, Starfighter Assault (Trench Run),
  Critical severity, shield NOT held, 1.7M casualties* — is the entire story.
- **So what:** A green KPI built on survivorship. The defense was optimised against the
  attacks it kept facing (capital-ship assaults), not the one-shot exploit that mattered.
  *Base rates hid the only tail risk that counted.*
- **Action:** Never show "Attacks Repelled %" alone — pair it with **Critical Attacks
  Repelled %** and an **Attacks Breached** count so the tail is visible.
- **Visual:** KPI card "99% repelled" deliberately paired with a small-multiple by severity,
  the single Critical breach flagged red.

### 6. Capital, not crew — the station stopped being about people  `[Confidence: Medium]`
- **Evidence:** Average headcount grew **9.4k → 15.0k (~10%/yr)** while spend grew at
  **26%/yr**, so **cost per trooper doubled: ~$0.8Bn → ~$1.6Bn (2.0×)**. Combat personnel
  losses also **doubled in the final year (8.9k/yr → 26.5k)**, rising from ~8% to **14% of
  all separations**.
- **So what:** The marginal credit went to hardware, not headcount — a capital-intensity
  shift — even as human attrition from combat spiked at the end.
- **Action:** Track **Cost per Trooper** and combat-loss share of attrition as
  efficiency/strain indicators.
- **Visual:** Dual-indexed line (spend vs headcount, both = 100 at 2019) to show the diverging
  slopes; small KPI for cost-per-trooper with sparkline.

### 7. Operational strain was building quietly  `[Confidence: Medium]`
- **Evidence:** Maintenance work orders opened rose **8.6k → 14.7k/yr**; six-year downtime
  **393.8k hours**, repair cost **$16.0Bn**. Backlog stayed low (**0.7% open**) and stockouts
  rare (**0.4%**) — the machine kept up, but the load curve only pointed up.
- **So what:** Supporting evidence for the ramp; no acute failure here, but the trend is
  consistent with a system running ever hotter.
- **Action:** Monitor work-order open-rate trend and Engineering & Power downtime share;
  useful context, not a headline.
- **Visual:** Area chart of WOs opened by year, split by Priority; small stockout-rate gauge.

---

## To investigate (high-impact, not yet confident)
- **Did Alderaan radicalize the galaxy?** Attacks jumped to **45 in 0 BBY** (vs ~12–22/yr).
  Test whether attack frequency steps up *after* the first superlaser strike — a causal
  read would need an interrupted-time-series design, not just the correlation.
- **Disputed ledger value:** 2,122 disputed transactions ($0.79Tn, 0.5% of value) — worth a
  vendor/account breakdown for a "financial controls" angle.

## Caveats (honesty over narrative)
- "Enemy/friendly losses" mix civilian (Alderaan) and military casualties — never aggregate
  them into one ratio (insight #4). The model now separates them via **Superlaser Civilian Toll**.
- Cost-per-trooper mixes a flow (expenses) with a stock (headcount); read it as a ratio
  trend, not an accounting figure.
- Readiness/attack causation is associational; the final-90-day shift is descriptive of the
  run-up, not proof of cause.
- This pass is on the **local CSVs**; figures should be reconciled against the published
  model once refreshed.

---

## Semantic-model additions (implemented)

Added to `Measure Table` under display folder **`Narrative & Risk`** (safe to remove as a
group; lineage tags `d3000000-…`):

| Measure | Surfaces insight |
|---|---|
| `Days to Battle of Yavin` | Narrative countdown / reference line |
| `Reactor Complex Spend` / `Reactor Complex Spend %` | #1 reactor paradox |
| `Reactor Complex Downtime Hrs` | #1 / #7 critical-system strain |
| `Avg Monthly Headcount` | correct per-capita denominator |
| `Cost per Trooper` | #6 capital intensity |
| `Superlaser Civilian Toll` | #4 propaganda-vs-tactical split |
| `Critical Attacks Repelled %` / `Attacks Breached` | #5 the hidden tail |
| `Threat Index YoY Change` | #3 escalation |

**Validate next:** reload the model in Power BI Desktop (or `te`/Modeling MCP) and confirm
the pack evaluates — DAX was authored against the TMDL but not engine-tested.

### Suggested further model work
- A **`Posture`** calc column / field-parameter banding on Threat Index (Calm / Elevated /
  Critical) for conditional formatting.
- A **DivisionGroup "Criticality"** flag to generalise the reactor-complex measures.
- A small **field parameter** to swap the headline KPI between propaganda and tactical
  exchange ratios — let the user feel the difference.

---

## Addendum — Causal Chain & Funding Lag (v2, 2026-06-19)

The dataset now has **engineered cause-and-effect**, not just a shared time trend. The
generator computes the `attack_schedule` first, then the dependent tables react to it.

### The chain (tunable in `generate_dataset.py`, top of file)
```
attack (severity, casualties)
   ├─► personnel COMBAT LOSSES        (month M, spread across combat roles)
   ├─► emergency MAINTENANCE WOs       (month M & M+1: high downtime + repair cost)
   ├─► battle-damage LEDGER SPEND      (month M & M+1: repair + replenishment)
   └─► replenishment HIRES + SUBSIDY   (arrive M + FUNDING_LAG_MONTHS = 2)
```
Knobs: `FUNDING_LAG_MONTHS`, `COMBAT_LOSS_PER_CASUALTY`, `REPAIR_CREDITS_PER_SEVERITY`,
`REPLEN_CREDITS_PER_CASUALTY`, `REPAIR_SPILL_NEXT_MONTH`, `EMERGENCY_WO_PER_SEVERITY`,
`REPLEN_HIRE_FRACTION`, `SUBSIDY_BASELINE_VAR`. Set any factor to 0 to sever that link.
The Battle of Yavin is `terminal` → excluded from the chain (the station is gone).

### Verified (detrended ρ — survives the Yavin trend)
| Link | Before rewire | After rewire |
|---|---|---|
| Combat losses ↔ station attacks | −0.18 (none) | **+0.35 [+0.11, +0.56]** |
| Combat losses ↔ threat level | −0.01 | **+0.50** |
| Spend ↔ threat level | 0.00 | **+0.38** |
| Attacks ↔ shield integrity | — | **−0.68** (attacks damage shields) |

### The funding-lag pain point (what Command wants to fix)
Baseline ops are funded ~in-month, but the **attack-driven shock is funded 2 months late**.
So spend spikes immediately and the subsidy catch-up arrives at M+2 — the station borrows in
between. Result: **cash goes negative in 10 of 72 months, worst ≈ −$137 Bn**. The
income↔expense cross-correlation peaks again at **lag +2 months**, confirming the delay.

- **New measures** (`Financials\Cash` folder): `Net Cash Flow`, `Cumulative Cash Position`
  (dips negative), `Months Cash Negative` (the KPI to drive down).
- **Visual:** line of `Cumulative Cash Position` over time with a zero reference line and the
  area below zero shaded red; a `Days Since Last Attack` / attack markers overlay makes the
  attack → dip → 2-month-recovery rhythm obvious. To *address* the delay, model a scenario
  with `FUNDING_LAG_MONTHS = 0` and compare `Months Cash Negative`.
- Verify scripts: `scripts/analytics/04_causeeffect.py`, `scripts/analytics/05_fundinglag.py`.
