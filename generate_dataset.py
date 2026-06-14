#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Death Star Management Services - synthetic data generator
=========================================================
Generates a star-schema dataset (CSV) modelling the operation of the first
Death Star as if it were a real facilities / operations business that bills
the Galactic Empire for keeping the battle station running.

Zero dependencies - Python standard library only. Seeded for reproducibility,
so re-running produces byte-identical files. Tune the CONFIG block to rescale.

Output: ./data/*.csv  +  a row-count summary printed to stdout.
"""

import csv
import os
import math
import random
from datetime import date, timedelta

# --------------------------------------------------------------------------- #
# CONFIG
# --------------------------------------------------------------------------- #
SEED = 1977                       # A New Hope, theatrical release
START = date(2019, 1, 1)          # mapped to "5 BBY" in the Galactic Era column
END = date(2024, 12, 31)         # ends "0 BBY" - the Battle of Yavin
AVG_DAILY_OPERATING_POSTINGS = 95 # drives FactLedger volume
BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "data")

random.seed(SEED)
os.makedirs(OUT, exist_ok=True)

CR = 1  # credits are the unit; amounts stored as plain integers


def write_csv(name, header, rows):
    path = os.path.join(OUT, name)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)
    return len(rows)


def datekey(d):
    return d.year * 10000 + d.month * 100 + d.day


def lognorm(mean, cv):
    """Lognormal draw with target mean and coefficient of variation."""
    sigma = math.sqrt(math.log(1 + cv * cv))
    mu = math.log(mean) - 0.5 * sigma * sigma
    return math.exp(random.gauss(mu, sigma))


# --------------------------------------------------------------------------- #
# DATE SPINE
# --------------------------------------------------------------------------- #
MONTHS = ["", "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"]
MONTHS_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday", "Sunday"]
# 2019 -> 5 BBY ... 2024 -> 0 BBY
BBY = {2019: "5 BBY", 2020: "4 BBY", 2021: "3 BBY",
       2022: "2 BBY", 2023: "1 BBY", 2024: "0 BBY"}

all_dates = []
d = START
while d <= END:
    all_dates.append(d)
    d += timedelta(days=1)

month_ends = []
quarter_ends = []
month_starts = []
seen_m, seen_q = set(), set()
for i, d in enumerate(all_dates):
    nxt = d + timedelta(days=1)
    if d.day == 1:
        month_starts.append(d)
    if nxt.month != d.month:
        month_ends.append(d)
        if d.month in (3, 6, 9, 12):
            quarter_ends.append(d)

dim_date_rows = []
for d in all_dates:
    q = (d.month - 1) // 3 + 1
    nxt = d + timedelta(days=1)
    is_month_end = nxt.month != d.month
    dim_date_rows.append([
        datekey(d),
        d.isoformat(),
        d.year,
        q,
        f"Q{q}",
        f"{d.year}-Q{q}",
        d.month,
        MONTHS[d.month],
        MONTHS_SHORT[d.month],
        f"{d.year}-{d.month:02d}",
        f"{MONTHS_SHORT[d.month]} {d.year}",
        d.day,
        d.weekday() + 1,
        DAYS[d.weekday()],
        d.isocalendar()[1],
        d.timetuple().tm_yday,
        int(d.weekday() >= 5),
        int(is_month_end),
        d.year,                       # FiscalYear (aligned to calendar)
        BBY[d.year],
        int(d == END),                # IsBattleOfYavin (symbolic end)
    ])

DIM_DATE_HEADER = [
    "DateKey", "Date", "Year", "Quarter", "QuarterName", "YearQuarter",
    "Month", "MonthName", "MonthShort", "YearMonth", "MonthYear", "Day",
    "DayOfWeek", "DayName", "WeekOfYear", "DayOfYear", "IsWeekend",
    "IsMonthEnd", "FiscalYear", "GalacticEra", "IsBattleOfYavin",
]

# --------------------------------------------------------------------------- #
# DIM DEPARTMENT
# --------------------------------------------------------------------------- #
# (Department, DivisionGroup, CommandingOfficer, hc_weight, cost_driver_weight)
#
# cost_driver_weight is the per-department weight used to apportion the
# Imperial Treasury subsidy across departments (see FactBudget below). The
# weights are dimensionless; a department's share = weight / sum(weights).
DEPARTMENTS = [
    ("Superlaser Operations",        "Combat Systems",            "Cmdr. Tarrin Vause",    4, 10),
    ("Turbolaser Batteries",         "Combat Systems",            "Lt. Cmdr. Hela Dox",    6,  6),
    ("Ion Cannon Defense",           "Combat Systems",            "Lt. Cmdr. Orlok Vane",  4,  4),
    ("Shield Generator Control",     "Combat Systems",            "Cmdr. Pell Sorano",     3,  5),
    ("Tractor Beam Operations",      "Combat Systems",            "Lt. Marek Quan",        3,  3),
    ("Main Reactor Core",            "Engineering & Power",        "Chief Eng. Brunin",    7, 12),
    ("Hypermatter Fuel Systems",     "Engineering & Power",        "Eng. Sora Teppin",     4,  6),
    ("Power Distribution",           "Engineering & Power",        "Eng. Dav Holox",       5,  4),
    ("Sublight Propulsion",          "Engineering & Power",        "Eng. Kalla Wren",      4,  5),
    ("Hyperdrive Engineering",       "Engineering & Power",        "Eng. Tovan Reece",     3,  5),
    ("Structural Integrity & Hull",  "Engineering & Power",        "Eng. Mara Voll",       6,  8),
    ("Life Support & Atmosphere",    "Habitation & Life Support", "Supt. Greel Ankin",     5,  3),
    ("Sanitation & Waste Compaction","Habitation & Life Support", "Supt. Dianoga (acting)",6,  1),
    ("Food Services & Mess",         "Habitation & Life Support", "Supt. Olia Fenn",       7,  2),
    ("Medical & Bacta Bay",          "Habitation & Life Support", "Dr. Senna Korr",        5,  3),
    ("Stormtrooper Garrison",        "Security & Detention",      "Cmdr. TK-7340",        12,  7),
    ("Detention Block Operations",   "Security & Detention",      "Lt. Shann Mott",        4,  1),
    ("Internal Security (ISB)",      "Security & Detention",      "Col. Yularen Jr.",      3,  2),
    ("Hangar & TIE Flight Ops",      "Flight Operations",         "Cmdr. Jix Daro",        8,  6),
    ("Docking & Traffic Control",    "Flight Operations",         "Lt. Pora Vess",         3,  2),
    ("Procurement & Logistics",      "Logistics & Supply",        "Q.M. Bron Tagge",       5,  4),
    ("Droid Maintenance Pool",       "Logistics & Supply",        "Tech. Lead IT-O",       4,  2),
    ("Command & Overbridge",         "Command & Administration",  "Grand Moff Tarkin",     3,  3),
    ("Personnel & Recruitment",      "Command & Administration",  "Adj. Lira Penn",        4,  2),
    ("Station-Wide (Unallocated)",   "Command & Administration",  "Office of the Moff",    0,  0),
]
SECTORS = ["Sector M-19", "Sector N-7", "Trench 7", "Trench 12", "Overbridge",
           "Core Shaft", "North Pole Cluster", "Equatorial Ring", "Sector L-3",
           "Sector H-22", "Sector R-9", "Quadrant 5", "Sublevel 14", "Sector A-1"]

dim_dept_rows = []
dept_keys = {}
dept_cost_driver = {}    # dept_key -> cost_driver_weight
for i, (name, group, officer, hc_w, cd_w) in enumerate(DEPARTMENTS, start=1):
    dept_keys[name] = i
    dept_cost_driver[i] = cd_w
    dim_dept_rows.append([
        i, name, group, officer,
        random.choice(SECTORS),
        hc_w,
        cd_w,
    ])
DIM_DEPT_HEADER = ["DepartmentKey", "Department", "DivisionGroup",
                   "CommandingOfficer", "Sector", "HeadcountWeight",
                   "CostDriverWeight"]
UNALLOC = dept_keys["Station-Wide (Unallocated)"]

# --------------------------------------------------------------------------- #
# DIM ACCOUNT  (chart of accounts -> drives the P&L)
# --------------------------------------------------------------------------- #
# (Account, Category, Type, weight, mean_amt, cv, cadence, vendor_type, pref_depts)
# cadence: daily | payroll | capital | sporadic | (income handled separately)
ACCOUNTS = [
    # ---- INCOME ----
    # The Death Star has no organic revenue. ALL income is the monthly subsidy
    # from the Imperial Treasury. Earlier scaffolds also included Levies,
    # Tribute, Seizures, Internal Cross-Charges and Salvage but those were
    # narrative window-dressing for a cost centre; they have been removed so
    # [Total Income] = [Imperial Subsidy] = [Subsidy Income].
    ("Imperial Treasury Subsidy",      "Imperial Funding",     "Income",  None, None, None, "income", "Internal", None),
    # ---- PERSONNEL EXPENSE (posted at month-end as payroll) ----
    ("Officer Salaries",               "Personnel",            "Expense", 9,  None, None, "payroll", "Internal", None),
    ("Stormtrooper Wages",             "Personnel",            "Expense", 14, None, None, "payroll", "Internal", None),
    ("Technician & Crew Wages",        "Personnel",            "Expense", 16, None, None, "payroll", "Internal", None),
    ("Droid Lease & Operation",        "Personnel",            "Expense", 6,  None, None, "payroll", "Droids",   None),
    ("Recruitment & Training",         "Personnel",            "Expense", 4,  220_000_000, 0.7, "daily", "Services",
        ["Personnel & Recruitment", "Stormtrooper Garrison"]),
    ("Personnel Benefits & Rations",   "Personnel",            "Expense", 7,  None, None, "payroll", "Consumables", None),
    # ---- OPERATIONS EXPENSE (daily) ----
    ("Hypermatter Fuel",               "Operations",           "Expense", 13, 900_000_000, 0.9, "daily", "Energy",
        ["Main Reactor Core", "Hypermatter Fuel Systems"]),
    ("Reactor Coolant & Maintenance",  "Operations",           "Expense", 7,  420_000_000, 0.8, "daily", "Materials",
        ["Main Reactor Core", "Power Distribution"]),
    ("Turbolaser Munitions",           "Operations",           "Expense", 8,  380_000_000, 1.0, "daily", "Munitions",
        ["Turbolaser Batteries", "Ion Cannon Defense"]),
    ("Superlaser Charging Costs",      "Operations",           "Expense", 6,  1_400_000_000, 1.1, "sporadic", "Energy",
        ["Superlaser Operations"]),
    ("Life Support Consumables",       "Operations",           "Expense", 6,  180_000_000, 0.6, "daily", "Consumables",
        ["Life Support & Atmosphere"]),
    ("Medical & Bacta Supplies",       "Operations",           "Expense", 4,  140_000_000, 0.7, "daily", "Consumables",
        ["Medical & Bacta Bay"]),
    ("Food & Catering",                "Operations",           "Expense", 5,  95_000_000, 0.5, "daily", "Consumables",
        ["Food Services & Mess"]),
    ("Waste Disposal & Compaction",    "Operations",           "Expense", 3,  60_000_000, 0.6, "daily", "Services",
        ["Sanitation & Waste Compaction"]),
    ("TIE Fighter Maintenance",        "Operations",           "Expense", 7,  260_000_000, 0.8, "daily", "Ships",
        ["Hangar & TIE Flight Ops"]),
    ("Droid Spare Parts",              "Operations",           "Expense", 4,  120_000_000, 0.7, "daily", "Droids",
        ["Droid Maintenance Pool"]),
    # ---- CAPITAL & CONSTRUCTION (quarterly mega-postings + some daily) ----
    ("Structural Construction Materials","Capital & Construction","Expense", 12, 2_600_000_000, 0.9, "capital", "Materials",
        ["Structural Integrity & Hull"]),
    ("Hull Plating & Durasteel",       "Capital & Construction","Expense", 9,  1_800_000_000, 0.9, "capital", "Materials",
        ["Structural Integrity & Hull"]),
    ("Systems Installation & Upgrades","Capital & Construction","Expense", 8,  1_500_000_000, 1.0, "capital", "Services",
        ["Power Distribution", "Shield Generator Control"]),
    ("Equipment & Weapons Procurement","Capital & Construction","Expense", 7,  640_000_000, 0.9, "daily", "Weapons",
        ["Stormtrooper Garrison", "Turbolaser Batteries"]),
    # ---- OVERHEAD (daily) ----
    ("Communications & Holonet",       "Overhead",             "Expense", 3,  70_000_000, 0.6, "daily", "Services",
        ["Command & Overbridge"]),
    ("Transport & Shuttle Services",   "Overhead",             "Expense", 4,  130_000_000, 0.7, "daily", "Ships",
        ["Docking & Traffic Control"]),
    ("Security Operations",            "Overhead",             "Expense", 4,  150_000_000, 0.7, "daily", "Services",
        ["Internal Security (ISB)", "Detention Block Operations"]),
    ("Administrative Overhead",        "Overhead",             "Expense", 4,  90_000_000, 0.5, "daily", "Services",
        ["Command & Overbridge", "Personnel & Recruitment"]),
    ("Contingency & Misc",             "Overhead",             "Expense", 3,  110_000_000, 1.2, "sporadic", "Services",
        None),
]
dim_acct_rows = []
acct = {}            # name -> key
acct_meta = {}       # name -> dict
for i, row in enumerate(ACCOUNTS, start=1):
    name, cat, typ, weight, mean_amt, cv, cadence, vtype, prefs = row
    acct[name] = i
    acct_meta[name] = dict(key=i, category=cat, type=typ, weight=weight,
                           mean=mean_amt, cv=cv, cadence=cadence,
                           vtype=vtype, prefs=prefs)
    dim_acct_rows.append([
        i, name, cat, typ,
        1 if typ == "Income" else -1,        # NaturalSign
        "Yes" if name == "Imperial Treasury Subsidy" else "No",  # Subsidized
    ])
DIM_ACCT_HEADER = ["AccountKey", "Account", "AccountCategory", "AccountType",
                   "NaturalSign", "ImperialSubsidy"]

# --------------------------------------------------------------------------- #
# DIM VENDOR
# --------------------------------------------------------------------------- #
# (Vendor, VendorType, HomeWorld, ContractTier, RiskRating)
VENDORS = [
    ("Not Applicable",                       "Internal",    "-",         "-",        "-"),
    ("Sienar Fleet Systems",                 "Ships",       "Lianna",    "Prime",    "Low"),
    ("Kuat Drive Yards",                     "Materials",   "Kuat",      "Prime",    "Low"),
    ("BlasTech Industries",                  "Weapons",     "Coruscant", "Preferred","Low"),
    ("Merr-Sonn Munitions",                  "Munitions",   "Capella",   "Preferred","Medium"),
    ("Arakyd Industries",                    "Droids",      "Coruscant", "Preferred","Medium"),
    ("Industrial Automaton",                 "Droids",      "Coruscant", "Standard", "Low"),
    ("Corellia Engineering Corp",            "Ships",       "Corellia",  "Preferred","Medium"),
    ("SoroSuub Corporation",                 "Energy",      "Sullust",   "Preferred","Medium"),
    ("Tagge Company (TaggeCo)",              "Materials",   "Tepasi",    "Prime",    "Low"),
    ("Czerka Corporation",                   "Weapons",     "Livien",    "Standard", "High"),
    ("Imperial Dept. of Military Research",  "Services",    "Coruscant", "Prime",    "Low"),
    ("Santhe / Sienar Technologies",         "Services",    "Lianna",    "Preferred","Low"),
    ("Cygnus Spaceworks",                    "Ships",       "Cygnus",    "Standard", "Medium"),
    ("Loronar Corporation",                  "Materials",   "Loronar",   "Standard", "High"),
    ("Rendili StarDrive",                    "Materials",   "Rendili",   "Preferred","Medium"),
    ("Quartermaster Corps (Imperial)",       "Consumables", "Coruscant", "Prime",    "Low"),
    ("Xucphra Bacta Corp",                   "Consumables", "Thyferra",  "Preferred","High"),
    ("Greater Plooriod Mining Guild",        "Materials",   "Plooriod",  "Spot",     "High"),
    ("Tibanna Gas Collective",               "Energy",      "Bespin",    "Standard", "Medium"),
    ("Outer Rim Hydrospanner & Tool Co.",    "Services",    "Tatooine",  "Spot",     "Medium"),
]
dim_vendor_rows = []
vendor_keys = {}
vendors_by_type = {}
for i, (name, vtype, world, tier, risk) in enumerate(VENDORS):  # key 0 = Not Applicable
    vendor_keys[name] = i
    dim_vendor_rows.append([i, name, vtype, world, tier, risk])
    vendors_by_type.setdefault(vtype, []).append(i)
DIM_VENDOR_HEADER = ["VendorKey", "Vendor", "VendorType", "HomeWorld",
                     "ContractTier", "RiskRating"]
NA_VENDOR = 0


def pick_vendor(vtype):
    pool = vendors_by_type.get(vtype)
    if not pool:
        return NA_VENDOR
    return random.choice(pool)


# --------------------------------------------------------------------------- #
# DIM LOCATION  (inventory storage)
# --------------------------------------------------------------------------- #
# (Location, Zone, DeckLevel, LocationType)
LOCATIONS = [
    ("Primary Quartermaster Depot",   "Equatorial",          "Deck 04",  "Central Depot"),
    ("Northern Hangar Stores",        "Northern Hemisphere", "Deck 11",  "Forward Store"),
    ("Hangar Bay 327 Stores",         "Equatorial",          "Deck 09",  "Forward Store"),
    ("Equatorial Trench Depot",       "Equatorial",          "Deck 02",  "Central Depot"),
    ("Reactor Core Supply Cache",     "Core",                "Deck 00",  "Central Depot"),
    ("Detention Block Stores",        "Northern Hemisphere", "Deck 05",  "Forward Store"),
    ("Medical Bay Stores",            "Equatorial",          "Deck 06",  "Cold Storage"),
    ("Mess Hall Pantry A",            "Northern Hemisphere", "Deck 07",  "Cold Storage"),
    ("Mess Hall Pantry B",            "Southern Hemisphere", "Deck 07",  "Cold Storage"),
    ("Overbridge Equipment Locker",   "Northern Hemisphere", "Deck 12",  "Forward Store"),
    ("Sublight Engineering Stores",   "Southern Hemisphere", "Deck 03",  "Forward Store"),
    ("Superlaser Maintenance Bay",    "Equatorial",          "Deck 08",  "Forward Store"),
    ("Waste Compaction Sublevel",     "Core",                "Sublevel 14","Forward Store"),
    ("Forward Munitions Magazine",    "Southern Hemisphere", "Deck 10",  "Magazine"),
]
dim_loc_rows = []
loc_keys = {}
for i, (name, zone, deck, ltype) in enumerate(LOCATIONS, start=1):
    loc_keys[name] = i
    dim_loc_rows.append([i, name, zone, deck, ltype])
DIM_LOC_HEADER = ["LocationKey", "Location", "Zone", "DeckLevel", "LocationType"]

# --------------------------------------------------------------------------- #
# DIM ITEM  (inventory parts / consumables)
# --------------------------------------------------------------------------- #
# (Item, Category, UoM, UnitCost, Perishable, LeadTimeDays, vendor_type, store_types)
ITEMS = [
    ("Ration Packs",                "Consumable",  "Crate",   180,    "Yes", 7,  "Consumables", ["Cold Storage"]),
    ("Water Reserves",              "Consumable",  "Drum",    90,     "No",  5,  "Consumables", ["Cold Storage", "Central Depot"]),
    ("Oxygen Scrubber Cartridges",  "Consumable",  "Each",    640,    "No",  10, "Consumables", ["Central Depot", "Forward Store"]),
    ("Air Filter Units",            "Consumable",  "Each",    420,    "No",  12, "Consumables", ["Central Depot", "Forward Store"]),
    ("Caf Supplies",                "Consumable",  "Crate",   75,     "Yes", 6,  "Consumables", ["Cold Storage"]),
    ("Medical Bacta",              "Consumable",  "Liter",   1_200,  "Yes", 14, "Consumables", ["Cold Storage"]),
    ("Stimpacks",                   "Consumable",  "Pack",    320,    "Yes", 9,  "Consumables", ["Cold Storage"]),
    ("Synthflesh Dressings",        "Consumable",  "Pack",    140,    "Yes", 9,  "Consumables", ["Cold Storage"]),
    ("Cleaning Solvent",            "Consumable",  "Drum",    60,     "No",  6,  "Consumables", ["Central Depot", "Forward Store"]),
    ("Compactor Lubricant",         "Consumable",  "Drum",    110,    "No",  8,  "Consumables", ["Forward Store"]),
    ("Turbolaser Gas Canisters",    "Munition",    "Canister",4_800,  "No",  16, "Munitions",   ["Magazine"]),
    ("Ion Cannon Cells",            "Munition",    "Each",    3_100,  "No",  16, "Munitions",   ["Magazine"]),
    ("Concussion Missiles",         "Munition",    "Each",    9_500,  "No",  21, "Munitions",   ["Magazine"]),
    ("Proton Torpedoes",            "Munition",    "Each",    12_400, "No",  21, "Munitions",   ["Magazine"]),
    ("Blaster Power Packs (E-11)",  "Munition",    "Pack",    240,    "No",  10, "Munitions",   ["Magazine", "Forward Store"]),
    ("Thermal Detonators",          "Munition",    "Each",    1_900,  "No",  18, "Munitions",   ["Magazine"]),
    ("TIE Solar Collector Panels",  "Spare Part",  "Each",    7_300,  "No",  20, "Ships",       ["Forward Store"]),
    ("TIE Ion Engine Units",        "Spare Part",  "Each",    18_600, "No",  25, "Ships",       ["Forward Store"]),
    ("Repulsorlift Coils",          "Spare Part",  "Each",    5_400,  "No",  18, "Materials",   ["Forward Store", "Central Depot"]),
    ("Servo Motors",                "Spare Part",  "Each",    860,    "No",  12, "Materials",   ["Central Depot", "Forward Store"]),
    ("Hydrospanners",               "Spare Part",  "Each",    140,    "No",  8,  "Services",    ["Central Depot", "Forward Store"]),
    ("Power Couplings",             "Spare Part",  "Each",    980,    "No",  12, "Materials",   ["Central Depot", "Forward Store"]),
    ("Capacitor Banks",             "Spare Part",  "Each",    6_200,  "No",  18, "Materials",   ["Forward Store"]),
    ("Tractor Beam Emitters",       "Spare Part",  "Each",    44_000, "No",  30, "Materials",   ["Forward Store"]),
    ("Sensor Arrays",               "Spare Part",  "Each",    21_500, "No",  24, "Services",    ["Forward Store"]),
    ("Comlink Units",               "Spare Part",  "Each",    310,    "No",  9,  "Services",    ["Central Depot", "Forward Store"]),
    ("Durasteel Plating Sheets",    "Spare Part",  "Sheet",   2_700,  "No",  20, "Materials",   ["Central Depot"]),
    ("Transparisteel Viewports",    "Spare Part",  "Sheet",   8_900,  "No",  22, "Materials",   ["Central Depot"]),
    ("Cabling Spools",              "Spare Part",  "Spool",   430,    "No",  10, "Materials",   ["Central Depot", "Forward Store"]),
    ("Fusion Cutters",              "Spare Part",  "Each",    520,    "No",  9,  "Services",    ["Central Depot", "Forward Store"]),
    ("Hypermatter Fuel Rods",       "Fuel",        "Each",    96_000, "No",  28, "Energy",      ["Central Depot"]),
    ("Reactor Coolant Drums",       "Fuel",        "Drum",    3_400,  "No",  16, "Materials",   ["Central Depot"]),
    ("Tibanna Gas Cylinders",       "Fuel",        "Canister",5_900,  "No",  18, "Energy",      ["Magazine", "Central Depot"]),
    ("Coaxium Vials",               "Fuel",        "Each",    72_000, "Yes", 26, "Energy",      ["Central Depot"]),
    ("Droid Restraining Bolts",     "Droid Part",  "Each",    45,     "No",  7,  "Droids",      ["Central Depot", "Forward Store"]),
    ("Droid Memory Cores",          "Droid Part",  "Each",    2_300,  "No",  15, "Droids",      ["Forward Store"]),
    ("Droid Servo Arms",            "Droid Part",  "Each",    1_100,  "No",  13, "Droids",      ["Forward Store"]),
    ("Motivator Units",             "Droid Part",  "Each",    1_650,  "No",  14, "Droids",      ["Forward Store"]),
    ("Bacta Tanks",                 "Medical",     "Each",    58_000, "No",  30, "Consumables", ["Cold Storage"]),
    ("Surgical Droid Parts",        "Medical",     "Each",    3_900,  "No",  20, "Droids",      ["Cold Storage", "Forward Store"]),
]
dim_item_rows = [[0, "Not Applicable", "-", "-", 0, "-", 0, NA_VENDOR]]
item_keys = {"Not Applicable": 0}
item_meta = {}
for i, row in enumerate(ITEMS, start=1):
    name, cat, uom, cost, perish, lead, vtype, store_types = row
    item_keys[name] = i
    pref_vendor = pick_vendor(vtype)
    item_meta[name] = dict(key=i, category=cat, cost=cost,
                           store_types=store_types, vtype=vtype)
    dim_item_rows.append([i, name, cat, uom, cost, perish, lead, pref_vendor])
DIM_ITEM_HEADER = ["ItemKey", "Item", "ItemCategory", "UnitOfMeasure",
                   "UnitCostCredits", "Perishable", "LeadTimeDays",
                   "PreferredVendorKey"]

# --------------------------------------------------------------------------- #
# DIM ROLE  (headcount)
# --------------------------------------------------------------------------- #
# (Role, RoleType, PayGrade, BaseMonthlyPay, IsCombat)
ROLES = [
    ("Senior Command",          "Officer",     "O-9", 42_000, "No"),
    ("Fleet Officer",           "Officer",     "O-7", 28_000, "No"),
    ("Commander",               "Officer",     "O-5", 19_000, "No"),
    ("Lieutenant",              "Officer",     "O-3", 12_500, "No"),
    ("Stormtrooper",            "Trooper",     "E-3", 4_200,  "Yes"),
    ("TIE Pilot",               "Trooper",     "E-4", 5_600,  "Yes"),
    ("Gunner",                  "Enlisted",    "E-4", 5_100,  "Yes"),
    ("Sensor / Comms Operator", "Enlisted",    "E-3", 4_400,  "No"),
    ("Reactor Technician",      "Technician",  "T-4", 7_800,  "No"),
    ("Maintenance Technician",  "Technician",  "T-3", 6_400,  "No"),
    ("Medical Officer",         "Specialist",  "S-4", 9_200,  "No"),
    ("Mess Crew",               "Support",     "C-2", 3_100,  "No"),
    ("Sanitation Crew",         "Support",     "C-1", 2_800,  "No"),
    ("Detention Officer",       "Enlisted",    "E-3", 4_600,  "No"),
    ("ISB Agent",               "Specialist",  "S-5", 11_500, "No"),
    ("Service Droid",           "Droid",       "D-1", 600,    "No"),
    ("Protocol Droid",          "Droid",       "D-2", 900,    "No"),
    ("Civilian Contractor",     "Contractor",  "X-1", 8_500,  "No"),
]
dim_role_rows = []
role_keys = {}
role_meta = {}
for i, (name, rtype, grade, pay, combat) in enumerate(ROLES, start=1):
    role_keys[name] = i
    role_meta[name] = dict(key=i, pay=pay, combat=(combat == "Yes"), rtype=rtype)
    dim_role_rows.append([i, name, rtype, grade, pay, combat])
DIM_ROLE_HEADER = ["RoleKey", "Role", "RoleType", "PayGrade",
                   "BaseMonthlyPayCredits", "IsCombat"]

# role mix per department: {Department: [(Role, weight), ...]}
DEPT_ROLE_MIX = {
    "Stormtrooper Garrison":        [("Stormtrooper", 80), ("Commander", 3), ("Lieutenant", 6), ("Maintenance Technician", 4), ("Service Droid", 7)],
    "Hangar & TIE Flight Ops":      [("TIE Pilot", 45), ("Maintenance Technician", 30), ("Service Droid", 15), ("Lieutenant", 5), ("Commander", 2), ("Gunner", 3)],
    "Main Reactor Core":            [("Reactor Technician", 60), ("Maintenance Technician", 20), ("Service Droid", 12), ("Commander", 3), ("Lieutenant", 5)],
    "Superlaser Operations":        [("Gunner", 50), ("Reactor Technician", 20), ("Commander", 4), ("Lieutenant", 8), ("Service Droid", 18)],
    "Turbolaser Batteries":         [("Gunner", 70), ("Maintenance Technician", 15), ("Lieutenant", 8), ("Service Droid", 7)],
    "Ion Cannon Defense":           [("Gunner", 65), ("Maintenance Technician", 18), ("Lieutenant", 9), ("Service Droid", 8)],
    "Medical & Bacta Bay":          [("Medical Officer", 45), ("Mess Crew", 10), ("Service Droid", 25), ("Maintenance Technician", 12), ("Lieutenant", 8)],
    "Food Services & Mess":         [("Mess Crew", 78), ("Service Droid", 14), ("Lieutenant", 4), ("Civilian Contractor", 4)],
    "Sanitation & Waste Compaction":[("Sanitation Crew", 74), ("Service Droid", 18), ("Maintenance Technician", 6), ("Lieutenant", 2)],
    "Detention Block Operations":   [("Detention Officer", 62), ("Stormtrooper", 22), ("Service Droid", 10), ("Lieutenant", 6)],
    "Internal Security (ISB)":      [("ISB Agent", 70), ("Lieutenant", 12), ("Sensor / Comms Operator", 12), ("Commander", 6)],
    "Command & Overbridge":         [("Senior Command", 8), ("Fleet Officer", 22), ("Commander", 30), ("Sensor / Comms Operator", 30), ("Protocol Droid", 10)],
    "Droid Maintenance Pool":       [("Maintenance Technician", 40), ("Service Droid", 40), ("Protocol Droid", 12), ("Lieutenant", 8)],
}
DEFAULT_MIX = [("Maintenance Technician", 40), ("Sensor / Comms Operator", 25),
               ("Lieutenant", 15), ("Service Droid", 15), ("Commander", 5)]

# --------------------------------------------------------------------------- #
# GROWTH / SEASONALITY
# --------------------------------------------------------------------------- #
N_DAYS = len(all_dates)


def growth(d):
    """0.55 -> ~1.7 construction ramp, with an operational surge near the end."""
    t = (d - START).days / max(1, (END - START).days)
    base = 0.55 + 1.05 * t
    if t > 0.85:                       # superlaser online; ops surge
        base += 1.1 * (t - 0.85) / 0.15
    season = 1 + 0.06 * math.sin(2 * math.pi * (d.timetuple().tm_yday / 365.0))
    weekend = 0.86 if d.weekday() >= 5 else 1.0
    return base * season * weekend


# --------------------------------------------------------------------------- #
# FACT LEDGER  (income + expenses)
# --------------------------------------------------------------------------- #
expense_rows = []     # (date, dept_key, acct_key, vendor_key, amount, qty, status)
monthly_expense = {}  # (year, month) -> total expense

daily_accts = [a for a in ACCOUNTS if a[6] == "daily"]
sporadic_accts = [a for a in ACCOUNTS if a[6] == "sporadic"]
daily_weights = [a[3] for a in daily_accts]
STATUSES = (["Posted"] * 90) + (["Reconciled"] * 6) + (["Pending"] * 3) + (["Disputed"] * 1)


def add_expense(d, acct_name, amount, qty=""):
    m = acct_meta[acct_name]
    if m["prefs"]:
        dept_name = random.choice(m["prefs"])
    else:
        dept_name = random.choice([x[0] for x in DEPARTMENTS[:-1]])
    dept_k = dept_keys[dept_name]
    vendor_k = pick_vendor(m["vtype"]) if m["vtype"] != "Internal" else NA_VENDOR
    amt = int(round(amount))
    expense_rows.append([datekey(d), dept_k, m["key"], vendor_k, amt, qty,
                         random.choice(STATUSES)])
    ym = (d.year, d.month)
    monthly_expense[ym] = monthly_expense.get(ym, 0) + amt


for d in all_dates:
    g = growth(d)
    # operating (daily) postings
    n = max(10, int(random.gauss(AVG_DAILY_OPERATING_POSTINGS, 16)))
    chosen = random.choices(daily_accts, weights=daily_weights, k=n)
    for a in chosen:
        name = a[0]
        m = acct_meta[name]
        amt = lognorm(m["mean"], m["cv"]) * g
        add_expense(d, name, amt)
    # sporadic postings (a few per day, sometimes none)
    for a in sporadic_accts:
        name = a[0]
        prob = 0.10 if name == "Superlaser Charging Costs" else 0.4
        if name == "Superlaser Charging Costs" and (d - START).days / N_DAYS < 0.82:
            prob = 0.005   # superlaser not yet chargeable
        if random.random() < prob:
            m = acct_meta[name]
            amt = lognorm(m["mean"], m["cv"]) * g
            add_expense(d, name, amt)

# payroll at month-end (per department x personnel account)
payroll_accts = [a for a in ACCOUNTS if a[6] == "payroll"]
for me in month_ends:
    g = growth(me)
    for a in payroll_accts:
        name = a[0]
        m = acct_meta[name]
        for (dname, dgroup, *_rest, hc_w) in DEPARTMENTS[:-1]:
            if hc_w == 0:
                continue
            # account-specific department affinity
            if name == "Officer Salaries":
                factor = 0.4 + 0.06 * hc_w
            elif name == "Stormtrooper Wages" and "Garrison" not in dname and "Detention" not in dname:
                factor = 0.05
            elif name == "Droid Lease & Operation":
                factor = 0.25 + 0.04 * hc_w
            else:
                factor = 0.3 + 0.05 * hc_w
            base = 9_000_000 * factor
            amt = lognorm(base, 0.35) * g
            if amt < 250_000:
                continue
            dept_k = dept_keys[dname]
            vendor_k = pick_vendor(m["vtype"]) if m["vtype"] != "Internal" else NA_VENDOR
            amt = int(round(amt))
            expense_rows.append([datekey(me), dept_k, m["key"], vendor_k, amt, "",
                                 random.choice(STATUSES)])
            ym = (me.year, me.month)
            monthly_expense[ym] = monthly_expense.get(ym, 0) + amt

# capital mega-postings at quarter-end
capital_accts = [a for a in ACCOUNTS if a[6] == "capital"]
for qe in quarter_ends:
    g = growth(qe)
    for a in capital_accts:
        name = a[0]
        m = acct_meta[name]
        for _ in range(random.randint(2, 5)):
            amt = lognorm(m["mean"], m["cv"]) * g
            qty = random.randint(50, 4000)
            add_expense(qe, name, amt, qty)

# ---- INCOME ----
# Sole income source: the monthly Imperial Treasury subsidy. Sized to roughly
# fund expenses, with month-to-month variance so the Subsidy Coverage % KPI
# moves around. The Empire underfunds slightly in lean months and overshoots
# slightly in others; on average DSMS runs close to break-even.
income_rows = []
for ms in month_starts:
    ym = (ms.year, ms.month)
    exp = monthly_expense.get(ym, 0)
    if exp == 0:
        continue
    subsidy = int(exp * random.uniform(0.92, 1.08))
    income_rows.append([datekey(ms), UNALLOC, acct["Imperial Treasury Subsidy"],
                        NA_VENDOR, subsidy, "", "Posted"])

# assemble ledger sorted by date, assign LedgerID
ledger_all = expense_rows + income_rows
ledger_all.sort(key=lambda r: r[0])
fact_ledger_rows = []
for i, r in enumerate(ledger_all, start=1):
    fact_ledger_rows.append([f"GL{i:08d}", r[0], r[1], r[2], r[3], r[4], r[5], r[6]])
FACT_LEDGER_HEADER = ["LedgerID", "DateKey", "DepartmentKey", "AccountKey",
                      "VendorKey", "AmountCredits", "Quantity", "Status"]


# --------------------------------------------------------------------------- #
# FACT BUDGET  (monthly expense + income budgets per department)
# --------------------------------------------------------------------------- #
# Premise: the Death Star generates no organic revenue. Imperial Treasury
# Subsidy is the sole income source. The total monthly subsidy is apportioned
# across departments by `DimDepartment[CostDriverWeight]`. Each department
# also runs an expense budget. Budget data is back-calculated from the
# generated FactLedger actuals so that the *annual* variance per department
# is within roughly +/- 15% for both income and expenses.
SUBSIDY_KEY = acct["Imperial Treasury Subsidy"]

# Total monthly subsidy ledger amount (income leg only — Imperial Treasury).
monthly_subsidy_total = {}   # (year, month) -> subsidy credits
for r in fact_ledger_rows:
    if r[3] == SUBSIDY_KEY:
        ym = (r[1] // 10000, (r[1] // 100) % 100)
        monthly_subsidy_total[ym] = monthly_subsidy_total.get(ym, 0) + r[5]

# Sum of cost-driver weights across ALL departments that participate
# (UNALLOC dept has weight 0, so it gets nothing).
total_cd_weight = sum(dept_cost_driver.values())

# Per-department, per-month *expense* actuals (excluding income rows).
income_key_set = {acct_meta[a[0]]["key"] for a in ACCOUNTS if a[2] == "Income"}
dept_monthly_expense = {}   # (dept_key, year, month) -> credits
for r in fact_ledger_rows:
    if r[3] in income_key_set:
        continue
    dk = r[2]
    if dk == UNALLOC:
        continue
    ym = (r[1] // 10000, (r[1] // 100) % 100)
    key = (dk, ym[0], ym[1])
    dept_monthly_expense[key] = dept_monthly_expense.get(key, 0) + r[5]

# Per-department, per-month *income* actuals = share of monthly subsidy.
dept_monthly_income = {}    # (dept_key, year, month) -> credits
for dk, cd_w in dept_cost_driver.items():
    if cd_w == 0:
        continue
    share = cd_w / total_cd_weight
    for ym, subsidy in monthly_subsidy_total.items():
        dept_monthly_income[(dk, ym[0], ym[1])] = int(round(subsidy * share))

# Aggregate to annual buckets so we can pick a per-year variance, then
# distribute the annual budget across 12 months with mild monthly jitter.
years = sorted({d.year for d in all_dates})

fact_budget_rows = []
for dk, cd_w in dept_cost_driver.items():
    if cd_w == 0:
        continue
    for yr in years:
        months_in_yr = [m for m in range(1, 13)
                        if (dk, yr, m) in dept_monthly_expense
                        or (dk, yr, m) in dept_monthly_income]
        if not months_in_yr:
            continue

        annual_expense_actual = sum(
            dept_monthly_expense.get((dk, yr, m), 0) for m in months_in_yr
        )
        annual_income_actual = sum(
            dept_monthly_income.get((dk, yr, m), 0) for m in months_in_yr
        )
        if annual_expense_actual == 0 and annual_income_actual == 0:
            continue

        # ratio = actual / budget. Drawing ratio in [0.85, 1.15] keeps the
        # annual variance ((actual - budget) / budget) within roughly +/- 15%.
        exp_ratio = random.uniform(0.85, 1.15)
        inc_ratio = random.uniform(0.85, 1.15)
        annual_expense_budget = int(round(annual_expense_actual / exp_ratio)) if exp_ratio else 0
        annual_income_budget = int(round(annual_income_actual / inc_ratio)) if inc_ratio else 0

        # Distribute the annual budget across the months we actually saw,
        # with small monthly jitter so each month's budget isn't identical.
        # We use a Dirichlet-flavoured trick: random weights, normalise.
        m_weights = [random.uniform(0.9, 1.1) for _ in months_in_yr]
        m_total = sum(m_weights)
        # Allocate monthly amounts so they sum to the annual exactly
        # (handle the last month as a balancing item to absorb rounding).
        exp_alloc = []
        inc_alloc = []
        running_exp = 0
        running_inc = 0
        for j, _ in enumerate(months_in_yr):
            if j < len(months_in_yr) - 1:
                e = int(round(annual_expense_budget * m_weights[j] / m_total))
                i_ = int(round(annual_income_budget * m_weights[j] / m_total))
            else:
                e = annual_expense_budget - running_exp
                i_ = annual_income_budget - running_inc
            exp_alloc.append(e)
            inc_alloc.append(i_)
            running_exp += e
            running_inc += i_

        for m, e, i_ in zip(months_in_yr, exp_alloc, inc_alloc):
            month_datekey = yr * 10000 + m * 100 + 1   # 1st of month
            fact_budget_rows.append([month_datekey, dk, i_, e])

FACT_BUDGET_HEADER = ["MonthDateKey", "DepartmentKey",
                      "IncomeBudgetCredits", "ExpenseBudgetCredits"]

# --------------------------------------------------------------------------- #
# FACT INVENTORY  (weekly snapshots)
# --------------------------------------------------------------------------- #
# build item -> eligible locations
item_locations = {}
for name, meta in item_meta.items():
    eligible = [loc_keys[lname] for (lname, _z, _d, ltype) in LOCATIONS
                if ltype in meta["store_types"]]
    if not eligible:
        eligible = [loc_keys["Primary Quartermaster Depot"]]
    # each item lives in 1-3 of its eligible locations
    k = min(len(eligible), random.randint(1, 3))
    item_locations[name] = random.sample(eligible, k)

snapshot_days = [d for d in all_dates if d.weekday() == 0]   # Mondays
fact_inventory_rows = []
inv_state = {}   # (item, loc) -> current on hand
for name, meta in item_meta.items():
    cost = meta["cost"]
    for loc_k in item_locations[name]:
        # scale typical level inversely with unit cost (cheap = many, dear = few)
        tier = 4000 if cost < 200 else 1200 if cost < 2000 else 250 if cost < 20000 else 40
        reorder = max(5, int(tier * random.uniform(0.18, 0.32)))
        cap = int(tier * random.uniform(1.0, 1.5))
        inv_state[(name, loc_k)] = random.randint(reorder, cap)
        # store params for the walk
        item_locations.setdefault("_params", {})[(name, loc_k)] = (reorder, cap, tier)

for d in snapshot_days:
    g = growth(d)
    for name, meta in item_meta.items():
        cost = meta["cost"]
        for loc_k in item_locations[name]:
            reorder, cap, tier = item_locations["_params"][(name, loc_k)]
            on_hand = inv_state[(name, loc_k)]
            # weekly consumption scaled by station growth
            consume = int(tier * random.uniform(0.08, 0.22) * g)
            on_hand -= consume
            on_order = 0
            if on_hand <= reorder:
                on_order = int(cap - on_hand + tier * random.uniform(0, 0.3))
            if on_hand < 0:           # received a replenishment
                on_hand = int(cap * random.uniform(0.7, 1.0))
                on_order = 0
            # occasional replenishment landing
            if on_order == 0 and on_hand < reorder * 1.3 and random.random() < 0.4:
                on_hand = min(cap, on_hand + int(tier * random.uniform(0.4, 0.9)))
            inv_state[(name, loc_k)] = on_hand
            if on_hand <= 0:
                status = "Stockout"
            elif on_hand <= reorder:
                status = "Reorder"
            elif on_hand <= reorder * 1.3:
                status = "Low"
            elif on_hand > cap:
                status = "Overstock"
            else:
                status = "In Stock"
            value = max(0, on_hand) * cost
            fact_inventory_rows.append([
                datekey(d), meta["key"], loc_k, max(0, on_hand), on_order,
                reorder, cost, value, status,
            ])
FACT_INV_HEADER = ["SnapshotDateKey", "ItemKey", "LocationKey", "OnHandQty",
                   "OnOrderQty", "ReorderPoint", "UnitCostCredits",
                   "InventoryValueCredits", "StockStatus"]

# --------------------------------------------------------------------------- #
# FACT HEADCOUNT  (monthly snapshot, dept x role)
# --------------------------------------------------------------------------- #
TOTAL_START_HC = 1_020_000
TOTAL_END_HC = 1_720_000
fact_hc_rows = []
# precompute department headcount share
dept_hc_weight = {dname: hc_w for (dname, _g, *_r, hc_w) in DEPARTMENTS[:-1] if hc_w > 0}
tot_w = sum(dept_hc_weight.values())

prev_hc = {}    # (dept, role) -> headcount
for idx, me in enumerate(month_ends):
    t = idx / max(1, len(month_ends) - 1)
    total_hc = TOTAL_START_HC + (TOTAL_END_HC - TOTAL_START_HC) * t
    # surge near the end (final crewing)
    if t > 0.85:
        total_hc *= 1 + 0.05 * (t - 0.85) / 0.15
    for dname, dweight in dept_hc_weight.items():
        dept_total = total_hc * dweight / tot_w
        mix = DEPT_ROLE_MIX.get(dname, DEFAULT_MIX)
        mix_tot = sum(w for _r, w in mix)
        for rname, rw in mix:
            rm = role_meta[rname]
            base = dept_total * rw / mix_tot
            hc = int(base * random.uniform(0.95, 1.05))
            if hc <= 0:
                continue
            key = (dname, rname)
            prev = prev_hc.get(key, int(hc * 0.97))
            delta = hc - prev
            # separations incl. combat / industrial losses (the station is hazardous)
            sep_rate = random.uniform(0.004, 0.012)
            combat = 0
            if rm["combat"]:
                combat = int(hc * random.uniform(0.001, 0.006))
            if t > 0.92 and rm["combat"]:        # late-stage skirmishes
                combat += int(hc * random.uniform(0.002, 0.01))
            separations = int(hc * sep_rate) + combat
            hires = max(0, delta + separations)
            avg_pay = rm["pay"]
            payroll = int(hc * avg_pay)
            prev_hc[key] = hc
            fact_hc_rows.append([
                datekey(me), dept_keys[dname], rm["key"], hc, hires,
                separations, combat, avg_pay, payroll,
            ])
FACT_HC_HEADER = ["MonthDateKey", "DepartmentKey", "RoleKey", "Headcount",
                  "Hires", "Separations", "CombatLosses",
                  "AverageMonthlyPayCredits", "PayrollCostCredits"]

# --------------------------------------------------------------------------- #
# FACT MAINTENANCE  (work orders)
# --------------------------------------------------------------------------- #
PRIORITIES = (["Low"] * 35) + (["Medium"] * 40) + (["High"] * 18) + (["Critical"] * 7)
CATEGORIES = (["Corrective"] * 40) + (["Preventive"] * 30) + (["Inspection"] * 18) + \
             (["Emergency"] * 7) + (["Upgrade"] * 5)
maint_depts = [d[0] for d in DEPARTMENTS[:-1]]
# items that plausibly get consumed in repairs
part_items = [n for n, m in item_meta.items()
              if m["category"] in ("Spare Part", "Droid Part", "Fuel") and n != "Not Applicable"]
fact_maint_rows = []
wo_id = 0
for d in all_dates:
    g = growth(d)
    n = max(0, int(random.gauss(26 * (0.6 + 0.5 * g), 6)))
    for _ in range(n):
        wo_id += 1
        dname = random.choice(maint_depts)
        dept_k = dept_keys[dname]
        loc_k = random.randint(1, len(LOCATIONS))
        priority = random.choice(PRIORITIES)
        category = random.choice(CATEGORIES)
        uses_part = random.random() < 0.7
        item_k = item_keys[random.choice(part_items)] if uses_part else 0
        # lifecycle
        if priority == "Critical":
            dur = random.randint(0, 3)
            downtime = round(random.uniform(2, 36), 1)
        elif priority == "High":
            dur = random.randint(0, 6)
            downtime = round(random.uniform(1, 18), 1)
        else:
            dur = random.randint(0, 21)
            downtime = round(random.uniform(0, 8), 1)
        closed = d + timedelta(days=dur)
        if closed > END:
            status = random.choice(["Open", "In Progress", "Deferred"])
            closed_key = ""
        else:
            status = "Closed"
            closed_key = datekey(closed)
        labor = round(random.uniform(0.5, 40), 1)
        repair_cost = int(lognorm(180_000, 1.3) * (3 if priority == "Critical" else 1) * g)
        fact_maint_rows.append([
            f"WO{wo_id:07d}", datekey(d), closed_key, dept_k, loc_k, item_k,
            priority, category, status, downtime, labor, repair_cost,
        ])
FACT_MAINT_HEADER = ["WorkOrderID", "OpenedDateKey", "ClosedDateKey",
                     "DepartmentKey", "LocationKey", "ItemKey", "Priority",
                     "Category", "Status", "DowntimeHours", "LaborHours",
                     "RepairCostCredits"]

# --------------------------------------------------------------------------- #
# WRITE
# --------------------------------------------------------------------------- #
counts = {}
counts["DimDate.csv"] = write_csv("DimDate.csv", DIM_DATE_HEADER, dim_date_rows)
counts["DimDepartment.csv"] = write_csv("DimDepartment.csv", DIM_DEPT_HEADER, dim_dept_rows)
counts["DimAccount.csv"] = write_csv("DimAccount.csv", DIM_ACCT_HEADER, dim_acct_rows)
counts["DimVendor.csv"] = write_csv("DimVendor.csv", DIM_VENDOR_HEADER, dim_vendor_rows)
counts["DimItem.csv"] = write_csv("DimItem.csv", DIM_ITEM_HEADER, dim_item_rows)
counts["DimLocation.csv"] = write_csv("DimLocation.csv", DIM_LOC_HEADER, dim_loc_rows)
counts["DimRole.csv"] = write_csv("DimRole.csv", DIM_ROLE_HEADER, dim_role_rows)
counts["FactLedger.csv"] = write_csv("FactLedger.csv", FACT_LEDGER_HEADER, fact_ledger_rows)
counts["FactInventory.csv"] = write_csv("FactInventory.csv", FACT_INV_HEADER, fact_inventory_rows)
counts["FactHeadcount.csv"] = write_csv("FactHeadcount.csv", FACT_HC_HEADER, fact_hc_rows)
counts["FactMaintenance.csv"] = write_csv("FactMaintenance.csv", FACT_MAINT_HEADER, fact_maint_rows)
counts["FactBudget.csv"] = write_csv("FactBudget.csv", FACT_BUDGET_HEADER, fact_budget_rows)

# --------------------------------------------------------------------------- #
# SUMMARY
# --------------------------------------------------------------------------- #
income_keys = {acct_meta[a[0]]["key"] for a in ACCOUNTS if a[2] == "Income"}
total_income = sum(r[5] for r in fact_ledger_rows if r[3] in income_keys)
total_expense = sum(r[5] for r in fact_ledger_rows if r[3] not in income_keys)

print("=" * 64)
print("DEATH STAR MANAGEMENT SERVICES - dataset generated")
print("=" * 64)
total_rows = 0
for k in sorted(counts):
    print(f"  {k:<22} {counts[k]:>10,} rows")
    total_rows += counts[k]
print("-" * 64)
print(f"  {'TOTAL':<22} {total_rows:>10,} rows")
print("-" * 64)
print(f"  Date range            {START}  ..  {END}")
total_income_budget = sum(r[2] for r in fact_budget_rows)
total_expense_budget = sum(r[3] for r in fact_budget_rows)
subsidy_total = sum(r[5] for r in fact_ledger_rows if r[3] == SUBSIDY_KEY)
print(f"  Total Income          {total_income:>20,} credits")
print(f"  Imperial Subsidy      {subsidy_total:>20,} credits")
print(f"  Total Expenses        {total_expense:>20,} credits")
print(f"  Net Surplus/(Deficit) {total_income - total_expense:>20,} credits")
print(f"  Income Budget (sum)   {total_income_budget:>20,} credits")
print(f"  Expense Budget (sum)  {total_expense_budget:>20,} credits")
print(f"  Output folder         {OUT}")
print("=" * 64)
