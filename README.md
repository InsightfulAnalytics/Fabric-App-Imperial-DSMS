# Death Star Management Services — Power BI demo dataset

A **synthetic, star-schema dataset** modelling the operation of the first Death Star
as if it were a real facilities-and-operations business that bills the Galactic Empire
for keeping the battle station running.

> **Scenario.** *Death Star Management Services (DSMS)* is the Imperial contractor
> responsible for running, maintaining, staffing, fuelling, arming and supplying the
> DS-1 Orbital Battle Station. It receives a monthly **subsidy from the Imperial
> Treasury** (plus tribute, asset seizures, internal recharges and scrap salvage) and
> incurs the colossal **expenses** of operating a moon-sized weapon. The data runs
> 6 years, **2019-01-01 → 2024-12-31**, mapped in-universe to **5 BBY → 0 BBY**
> (the timeline ends at the Battle of Yavin).

Everything is fictional and procedurally generated — no real or canon financials.

---

## Files

```
Star Wars/
├─ generate_dataset.py     # the generator (stdlib only, seeded — re-run to reproduce)
├─ validate_dataset.py     # referential-integrity + sanity checks
├─ README.md               # this file
└─ data/
   ├─ DimDate.csv          ├─ FactLedger.csv        (income + expenses)
   ├─ DimDepartment.csv    ├─ FactInventory.csv     (weekly stock snapshots)
   ├─ DimAccount.csv       ├─ FactHeadcount.csv     (monthly, dept × rank)
   ├─ DimVendor.csv        └─ FactMaintenance.csv   (work orders)
   ├─ DimItem.csv
   ├─ DimLocation.csv
   └─ DimRole.csv
```

**~318,000 rows total.** The model is a *galaxy schema*: four fact tables sharing
conformed dimensions (`DimDate`, `DimDepartment`, `DimItem`, `DimLocation`).

---

## Star schema

```
                          ┌──────────────┐
                          │   DimDate     │
                          └──────┬────────┘
        ┌────────────────┬───────┼───────────────┬──────────────┐
        │                │       │               │              │
 ┌──────┴─────┐   ┌──────┴────┐  │        ┌──────┴─────┐  ┌──────┴──────┐
 │ DimAccount │   │DimDepartmt│  │        │  DimItem   │  │ DimLocation │
 └──────┬─────┘   └──┬───┬───┬┘  │        └──┬──────┬──┘  └───┬─────┬───┘
        │            │   │   │   │           │      │         │     │
   ┌────┴────────────┴┐  │   │ ┌─┴───────────┴┐  ┌──┴─────────┴───┐ │
   │   FactLedger     │  │   │ │FactInventory │  │ FactMaintenance├─┘
   └──────────────────┘  │   │ └──────────────┘  └────────┬───────┘
                  ┌───────┴┐  └──────────┐                │
                  │FactHead│             │   DimRole ─────┘ (DimRole→FactHeadcount)
                  │ count  ├── DimRole   │
                  └────────┘             │
```

### Relationships to create in Power BI

| From (fact)                         | To (dimension)              | Notes |
|-------------------------------------|-----------------------------|-------|
| `FactLedger[DateKey]`               | `DimDate[DateKey]`          | active |
| `FactLedger[DepartmentKey]`         | `DimDepartment[DepartmentKey]` | |
| `FactLedger[AccountKey]`            | `DimAccount[AccountKey]`    | drives the P&L |
| `FactLedger[VendorKey]`             | `DimVendor[VendorKey]`      | key 0 = *Not Applicable* (income/payroll) |
| `FactInventory[SnapshotDateKey]`    | `DimDate[DateKey]`          | active |
| `FactInventory[ItemKey]`            | `DimItem[ItemKey]`          | |
| `FactInventory[LocationKey]`        | `DimLocation[LocationKey]`  | |
| `FactHeadcount[MonthDateKey]`       | `DimDate[DateKey]`          | active |
| `FactHeadcount[DepartmentKey]`      | `DimDepartment[DepartmentKey]` | |
| `FactHeadcount[RoleKey]`            | `DimRole[RoleKey]`          | |
| `FactMaintenance[OpenedDateKey]`    | `DimDate[DateKey]`          | **active** |
| `FactMaintenance[ClosedDateKey]`    | `DimDate[DateKey]`          | **inactive** — use `USERELATIONSHIP` |
| `FactMaintenance[DepartmentKey]`    | `DimDepartment[DepartmentKey]` | |
| `FactMaintenance[LocationKey]`      | `DimLocation[LocationKey]`  | |
| `FactMaintenance[ItemKey]`          | `DimItem[ItemKey]`          | key 0 = *Not Applicable* |

Mark **`DimDate`** as the date table (`Date` column). All keys are integers; `DateKey`
is `yyyymmdd`.

---

## Data dictionary

### DimDate (2,192 rows, grain = 1 day)
`DateKey` · `Date` · `Year` · `Quarter` · `QuarterName` · `YearQuarter` · `Month` ·
`MonthName` · `MonthShort` · `YearMonth` · `MonthYear` · `Day` · `DayOfWeek` · `DayName` ·
`WeekOfYear` · `DayOfYear` · `IsWeekend` · `IsMonthEnd` · `FiscalYear` ·
`GalacticEra` (e.g. *"3 BBY"*) · `IsBattleOfYavin` (1 on the final day).

### DimDepartment (25 rows)
`DepartmentKey` · `Department` · `DivisionGroup` (Combat Systems / Engineering & Power /
Habitation & Life Support / Security & Detention / Flight Operations / Logistics & Supply /
Command & Administration) · `CommandingOfficer` · `Sector` · `AnnualBudgetCredits` ·
`HeadcountWeight`. *Key 25 = “Station-Wide (Unallocated)” — used for income postings.*

### DimAccount (31 rows) — the chart of accounts
`AccountKey` · `Account` · `AccountCategory` · `AccountType` (**Income** / **Expense**) ·
`NaturalSign` (+1 / −1) · `ImperialSubsidy` (Yes for the Treasury subsidy).
Income: Imperial Treasury Subsidy, Superlaser Operations Levy, Planetary Tribute,
Asset Seizure Proceeds, Internal Cross-Charge Recovery, Salvage & Scrap.
Expense categories: **Personnel**, **Operations**, **Capital & Construction**, **Overhead**.

### DimVendor (21 rows)
`VendorKey` · `Vendor` (Sienar Fleet Systems, Kuat Drive Yards, BlasTech, Merr-Sonn,
Arakyd, …) · `VendorType` · `HomeWorld` · `ContractTier` (Prime/Preferred/Standard/Spot) ·
`RiskRating`. *Key 0 = Not Applicable.*

### DimItem (41 rows)
`ItemKey` · `Item` · `ItemCategory` (Consumable / Munition / Spare Part / Fuel /
Droid Part / Medical) · `UnitOfMeasure` · `UnitCostCredits` · `Perishable` ·
`LeadTimeDays` · `PreferredVendorKey`. *Key 0 = Not Applicable.*

### DimLocation (14 rows)
`LocationKey` · `Location` (incl. *Hangar Bay 327 Stores* 😏) · `Zone` · `DeckLevel` ·
`LocationType` (Central Depot / Forward Store / Magazine / Cold Storage).

### DimRole (18 rows)
`RoleKey` · `Role` (Stormtrooper, TIE Pilot, Gunner, Reactor Technician, ISB Agent,
Service Droid, …) · `RoleType` · `PayGrade` · `BaseMonthlyPayCredits` · `IsCombat`.

### FactLedger (~217k rows, grain = 1 posting)
`LedgerID` (PK) · `DateKey` · `DepartmentKey` · `AccountKey` · `VendorKey` ·
`AmountCredits` (**always positive** — sign comes from `DimAccount`) · `Quantity` ·
`Status` (Posted / Reconciled / Pending / Disputed).

### FactInventory (~25k rows, grain = item × location × week)
`SnapshotDateKey` · `ItemKey` · `LocationKey` · `OnHandQty` · `OnOrderQty` ·
`ReorderPoint` · `UnitCostCredits` · `InventoryValueCredits` · `StockStatus`
(In Stock / Low / Reorder / Stockout / Overstock).

### FactHeadcount (~8k rows, grain = department × role × month)
`MonthDateKey` · `DepartmentKey` · `RoleKey` · `Headcount` · `Hires` · `Separations` ·
`CombatLosses` · `AverageMonthlyPayCredits` · `PayrollCostCredits`.

### FactMaintenance (~65k rows, grain = 1 work order)
`WorkOrderID` (PK) · `OpenedDateKey` · `ClosedDateKey` (blank if still open) ·
`DepartmentKey` · `LocationKey` · `ItemKey` · `Priority` (Low/Medium/High/Critical) ·
`Category` (Corrective/Preventive/Inspection/Emergency/Upgrade) · `Status` ·
`DowntimeHours` · `LaborHours` · `RepairCostCredits`.

---

## Starter DAX measures

```dax
-- P&L
Total Income   = CALCULATE ( SUM ( FactLedger[AmountCredits] ), DimAccount[AccountType] = "Income" )
Total Expenses = CALCULATE ( SUM ( FactLedger[AmountCredits] ), DimAccount[AccountType] = "Expense" )
Net Surplus    = [Total Income] - [Total Expenses]
Operating Margin % = DIVIDE ( [Net Surplus], [Total Income] )

-- Subsidy reliance
Imperial Subsidy = CALCULATE ( SUM ( FactLedger[AmountCredits] ), DimAccount[ImperialSubsidy] = "Yes" )
Subsidy Coverage % = DIVIDE ( [Imperial Subsidy], [Total Expenses] )

-- Time intelligence (DimDate marked as date table)
Expenses YoY %  = DIVIDE ( [Total Expenses] - CALCULATE ( [Total Expenses], DATEADD ( DimDate[Date], -1, YEAR ) ),
                           CALCULATE ( [Total Expenses], DATEADD ( DimDate[Date], -1, YEAR ) ) )

-- Workforce
Total Headcount = CALCULATE ( SUM ( FactHeadcount[Headcount] ),
                              FactHeadcount[MonthDateKey] = MAX ( FactHeadcount[MonthDateKey] ) )  -- latest snapshot
Combat Losses   = SUM ( FactHeadcount[CombatLosses] )
Attrition %     = DIVIDE ( SUM ( FactHeadcount[Separations] ), SUM ( FactHeadcount[Headcount] ) )
Payroll Cost    = SUM ( FactHeadcount[PayrollCostCredits] )

-- Inventory (semi-additive — take the latest snapshot)
Inventory Value =
VAR LastSnap = CALCULATE ( MAX ( FactInventory[SnapshotDateKey] ), ALLSELECTED ( DimDate ) )
RETURN CALCULATE ( SUM ( FactInventory[InventoryValueCredits] ), FactInventory[SnapshotDateKey] = LastSnap )
Stockout Lines  = CALCULATE ( COUNTROWS ( FactInventory ), FactInventory[StockStatus] = "Stockout" )

-- Maintenance
Work Orders        = COUNTROWS ( FactMaintenance )
Open Work Orders   = CALCULATE ( COUNTROWS ( FactMaintenance ), FactMaintenance[Status] <> "Closed" )
Total Downtime Hrs = SUM ( FactMaintenance[DowntimeHours] )
Repair Cost        = SUM ( FactMaintenance[RepairCostCredits] )
```

---

## Report ideas

- **Executive P&L** — subsidy vs. expenses, net surplus trend, expense mix by category,
  Subsidy Coverage % gauge (it dips during construction-heavy quarters).
- **Operations** — spend by Department / Division, top vendors, vendor risk exposure.
- **Supply chain** — inventory value by category & depot, stockouts and reorder alerts,
  lead-time vs. stock-status heatmap.
- **Workforce** — headcount growth to ~1.7M, payroll by rank, attrition & **combat losses**
  (watch the spike near 0 BBY), droids vs. organics.
- **Maintenance & reliability** — work-order backlog, downtime by system, critical WOs,
  repair cost by department.

---

## Regenerating / rescaling

The generator is deterministic (`SEED = 1977`). Edit the **CONFIG** block at the top of
`generate_dataset.py` to change the date range, volume, etc., then:

```powershell
python generate_dataset.py     # rebuilds data/*.csv
python validate_dataset.py     # confirms referential integrity
```

Key knobs: `START` / `END` (date range & BBY mapping), `AVG_DAILY_OPERATING_POSTINGS`
(FactLedger size), `TOTAL_START_HC` / `TOTAL_END_HC` (workforce ramp).
```
```
*Fun bits baked in: a `GalacticEra` BBY calendar, the trash-compaction department headed
by an “acting Dianoga”, Hangar Bay 327 as a storeroom, combat-loss spikes near the Battle
of Yavin, and the superlaser only drawing charging costs once it comes online late in the
timeline.*
