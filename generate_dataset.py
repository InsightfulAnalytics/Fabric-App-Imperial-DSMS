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
# ATTACK SCHEDULE + CAUSAL CHAIN  (single source of truth for station attacks)
# --------------------------------------------------------------------------- #
# Attacks are generated HERE, *before* the finance / personnel / maintenance
# tables, so those tables can react to them. One attack drives:
#   combat losses  ->  emergency repair work orders (downtime + repair cost)
#   ->  a battle-damage spend spike in the ledger.
# The Empire's funding increase to cover that spike only flows through
# FUNDING_LAG_MONTHS later (the funding-application delay Command complains about),
# so spending spikes immediately while the subsidy lags - and cash can go negative
# in between. Every link below is tunable; set a factor to 0 to sever that link.
war = random.Random(SEED + 66)


def war_growth(d):
    """War tempo ramp: low during construction, surges hard as Yavin nears."""
    t = (d - START).days / max(1, (END - START).days)
    base = 0.3 + 0.8 * t
    if t > 0.85:
        base += 1.6 * (t - 0.85) / 0.15
    return base


def add_months(dt, n):
    mo = dt.month - 1 + n
    return date(dt.year + mo // 12, mo % 12 + 1, min(dt.day, 28))


# ---- tunable knobs: attack -> losses -> repair -> downtime -> spend, + funding lag
FUNDING_LAG_MONTHS          = 2               # Empire funding-increase delay after an attack
COMBAT_LOSS_PER_CASUALTY    = 0.45            # personnel combat losses per attack casualty (month M)
REPLEN_HIRE_FRACTION        = 0.90            # share of those losses backfilled, LAG months later
REPAIR_CREDITS_PER_SEVERITY = 26_000_000_000  # battle-damage repair spend per unit monthly severity
REPLEN_CREDITS_PER_CASUALTY = 7_500_000       # recruit + re-equip spend per casualty
REPAIR_SPILL_NEXT_MONTH     = 0.40            # share of shock spend that lands in M+1
EMERGENCY_WO_PER_SEVERITY   = 3               # extra emergency work orders per unit monthly severity
SUBSIDY_BASELINE_VAR        = (0.99, 1.03)    # baseline subsidy vs baseline expense (tight; shock lags)

ATTACK_TYPES = ["Fighter Probe", "Sabotage Attempt", "Commando Raid",
                "Boarding Attempt", "Smuggler Incursion", "Capital Ship Skirmish"]
ATTACK_FACTIONS = ["Rebel Alliance", "Saw's Partisans", "Pirate Syndicates",
                   "Smuggling Networks", "Local Insurgents", "Separatist Holdouts"]
SEV_RANK     = {"Low": 1, "Medium": 2, "High": 3, "Critical": 4}
SEV_CASUALTY = {"Low": 3, "Medium": 25, "High": 180, "Critical": 900}
SEV_DUR      = {"Low": 0.5, "Medium": 1.0, "High": 2.0, "Critical": 3.0}

attack_schedule = []   # each entry: full attack attributes + a 'terminal' flag
for d in all_dates:
    t = (d - START).days / max(1, (END - START).days)
    if war.random() >= (0.01 + 0.06 * war_growth(d)):
        continue
    faction = war.choices(ATTACK_FACTIONS,
        weights=[5 + 25 * t, 3 + 6 * t, 14, 8, 9, max(1, 8 - 6 * t)])[0]
    sev_roll = war.random() + 0.3 * t
    severity = ("Low" if sev_roll < 0.5 else "Medium" if sev_roll < 0.8
                else "High" if sev_roll < 0.97 else "Critical")
    shield_held = "No" if (severity in ("High", "Critical") and war.random() < 0.25) else "Yes"
    hull_breach = "Yes" if (shield_held == "No" and war.random() < 0.6) else "No"
    casualties = int(lognorm(SEV_CASUALTY[severity], 1.1) * (0.6 + war_growth(d)))
    attack_schedule.append(dict(
        date=d, dk=datekey(d), faction=faction, sector=war.choice(SECTORS),
        atype=war.choice(ATTACK_TYPES), severity=severity, sev_rank=SEV_RANK[severity],
        shield_held=shield_held, hull_breach=hull_breach, casualties=casualties,
        repelled="Yes", dur=round(war.uniform(0.2, 6) * SEV_DUR[severity], 1),
        name="", terminal=False))

# The Battle of Yavin: the one attack the station does not repel. It is TERMINAL -
# the station is destroyed, so no repair / replenishment / funding follows. It is
# therefore excluded from the monthly shock aggregates that drive the cost chain.
attack_schedule.append(dict(
    date=END, dk=datekey(END), faction="Rebel Alliance", sector="Meridian Trench",
    atype="Starfighter Assault (Trench Run)", severity="Critical", sev_rank=4,
    shield_held="No", hull_breach="Yes", casualties=1_700_000, repelled="No",
    dur=0.5, name="Battle of Yavin", terminal=True))

monthly_attack_sev = {}   # (year, month) -> summed severity rank (drives repairs/spend)
monthly_attack_cas = {}   # (year, month) -> summed casualties (drives losses/replenishment)
for a in attack_schedule:
    if a["terminal"]:
        continue
    ym = (a["date"].year, a["date"].month)
    monthly_attack_sev[ym] = monthly_attack_sev.get(ym, 0) + a["sev_rank"]
    monthly_attack_cas[ym] = monthly_attack_cas.get(ym, 0) + a["casualties"]


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

# ---- ATTACK-DRIVEN SHOCK SPEND (battle damage repair + emergency replenishment) ----
# Tracked in monthly_shock_expense (separate from the baseline monthly_expense) so
# the subsidy below can fund it on a lag. Spend lands in the attack month and spills
# into M+1; the matching funding only arrives FUNDING_LAG_MONTHS later.
monthly_shock_expense = {}   # (year, month) -> attack-driven credits


def add_shock_expense(d, acct_name, amount):
    m = acct_meta[acct_name]
    amt = int(round(amount))
    if amt <= 0:
        return
    dept_name = random.choice(m["prefs"]) if m["prefs"] else \
        random.choice([x[0] for x in DEPARTMENTS[:-1]])
    vendor_k = pick_vendor(m["vtype"]) if m["vtype"] != "Internal" else NA_VENDOR
    expense_rows.append([datekey(d), dept_keys[dept_name], m["key"], vendor_k, amt, "",
                         random.choice(STATUSES)])
    ym = (d.year, d.month)
    monthly_shock_expense[ym] = monthly_shock_expense.get(ym, 0) + amt


REPAIR_ACCTS = ["Hull Plating & Durasteel", "Structural Construction Materials",
                "Systems Installation & Upgrades"]
REPLEN_ACCTS = ["Recruitment & Training", "Equipment & Weapons Procurement",
                "Turbolaser Munitions"]
for ym, sev in monthly_attack_sev.items():
    repair_total = sev * REPAIR_CREDITS_PER_SEVERITY
    replen_total = monthly_attack_cas.get(ym, 0) * REPLEN_CREDITS_PER_CASUALTY
    first = date(ym[0], ym[1], 1)
    for frac, off in ((1 - REPAIR_SPILL_NEXT_MONTH, 0), (REPAIR_SPILL_NEXT_MONTH, 1)):
        pm = add_months(first, off)
        if pm > END:
            continue
        pd_date = min(date(pm.year, pm.month, 15), END)
        for acct_name in REPAIR_ACCTS:
            add_shock_expense(pd_date, acct_name, repair_total * frac / len(REPAIR_ACCTS))
        for acct_name in REPLEN_ACCTS:
            add_shock_expense(pd_date, acct_name, replen_total * frac / len(REPLEN_ACCTS))

# ---- INCOME ----
# Sole income source: the monthly Imperial Treasury subsidy. The BASELINE (routine
# ops) is funded ~in-month; the attack-driven SHOCK is only funded
# FUNDING_LAG_MONTHS later - the funding-application delay. So in an attack month
# expenses spike but the subsidy doesn't, and the catch-up arrives 2 months on.
income_rows = []
for ms in month_starts:
    ym = (ms.year, ms.month)
    baseline = monthly_expense.get(ym, 0)
    if baseline == 0 and monthly_shock_expense.get(ym, 0) == 0:
        continue
    lag = add_months(date(ms.year, ms.month, 1), -FUNDING_LAG_MONTHS)
    catchup = monthly_shock_expense.get((lag.year, lag.month), 0)
    subsidy = int(baseline * random.uniform(*SUBSIDY_BASELINE_VAR) + catchup)
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

# ---- attack-driven combat losses (month M) + lagged replenishment hires (M+LAG) ----
# An attack's casualties become personnel combat losses that month, spread across
# combat roles by headcount. Backfill hires only arrive FUNDING_LAG_MONTHS later -
# the same funding delay that holds up the repair money.
combat_role_keys = {rm["key"] for _n, rm in role_meta.items() if rm["combat"]}
me_key_by_ym = {(me.year, me.month): datekey(me) for me in month_ends}
hc_rows_by_key = {}
for r in fact_hc_rows:
    hc_rows_by_key.setdefault(r[0], []).append(r)
for ym, cas in monthly_attack_cas.items():
    pool = int(cas * COMBAT_LOSS_PER_CASUALTY)
    mk = me_key_by_ym.get(ym)
    if not mk or pool <= 0:
        continue
    crows = [r for r in hc_rows_by_key.get(mk, []) if r[2] in combat_role_keys]
    tot = sum(r[3] for r in crows) or 1
    for r in crows:
        add = int(pool * r[3] / tot)
        r[6] += add     # CombatLosses
        r[5] += add     # Separations (combat losses are separations)
    rep = add_months(date(ym[0], ym[1], 1), FUNDING_LAG_MONTHS)
    rrows = [r for r in hc_rows_by_key.get(me_key_by_ym.get((rep.year, rep.month)), [])
             if r[2] in combat_role_keys]
    rtot = sum(r[3] for r in rrows) or 1
    backfill = int(pool * REPLEN_HIRE_FRACTION)
    for r in rrows:
        r[4] += int(backfill * r[3] / rtot)   # Hires

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

# ---- attack-driven EMERGENCY work orders (battle damage: high downtime + cost) ----
# Spikes in the attack month and spills into M+1, concentrated on the systems an
# attacker actually damages. This is what makes downtime and repair cost rise with
# attacks rather than merely drifting up over time.
battle_depts = ["Structural Integrity & Hull", "Shield Generator Control",
                "Turbolaser Batteries", "Hangar & TIE Flight Ops",
                "Power Distribution", "Main Reactor Core"]
for ym, sev in monthly_attack_sev.items():
    n_wo = int(sev * EMERGENCY_WO_PER_SEVERITY)
    if n_wo <= 0:
        continue
    first = date(ym[0], ym[1], 1)
    for off, share in ((0, 1 - REPAIR_SPILL_NEXT_MONTH), (1, REPAIR_SPILL_NEXT_MONTH)):
        pm = add_months(first, off)
        if pm > END:
            continue
        for _ in range(int(round(n_wo * share))):
            wo_id += 1
            wd = min(date(pm.year, pm.month, 1 + random.randint(0, 25)), END)
            dname = random.choice(battle_depts)
            dur = random.randint(0, 5)
            closed = wd + timedelta(days=dur)
            if closed > END:
                status, closed_key = random.choice(["Open", "In Progress", "Deferred"]), ""
            else:
                status, closed_key = "Closed", datekey(closed)
            downtime = round(random.uniform(18, 80), 1)
            labor = round(random.uniform(20, 120), 1)
            repair_cost = int(lognorm(900_000_000, 1.0) * (0.8 + war_growth(wd)))
            fact_maint_rows.append([
                f"WO{wo_id:07d}", datekey(wd), closed_key, dept_keys[dname],
                random.randint(1, len(LOCATIONS)), item_keys[random.choice(part_items)],
                "Critical", "Emergency", status, downtime, labor, repair_cost,
            ])

FACT_MAINT_HEADER = ["WorkOrderID", "OpenedDateKey", "ClosedDateKey",
                     "DepartmentKey", "LocationKey", "ItemKey", "Priority",
                     "Category", "Status", "DowntimeHours", "LaborHours",
                     "RepairCostCredits"]

# =========================================================================== #
# OPERATIONS COMMAND - WAR-FIGHTING DOMAIN
# =========================================================================== #
# The Death Star is a battle station; its "operations" are acts of war. The
# tables below model engagements (battles fought, underway & planned), attacks
# on the station itself, and a daily readiness / threat board. They share
# DimDate and DimDepartment with the finance/facilities star schema and add
# four new dimensions. The whole arc ramps with the station's build-out and
# climaxes at the Battle of Yavin (END / 0 BBY) - which the station loses.
#
# NOTE: `war` (RNG), `war_growth` and the full `attack_schedule` are now defined
# up top, alongside the causal-chain knobs, because the finance / personnel /
# maintenance tables above react to the attacks. The engagement helpers below
# still use the same `war` RNG.
# --------------------------------------------------------------------------- #


# --------------------------------------------------------------------------- #
# DIM ENEMY FACTION
# --------------------------------------------------------------------------- #
FACTIONS = [
    # (Faction, FactionType, ThreatLevel, HomeRegion)          key 0 = none
    ("No Hostiles",         "None",           "None",     "-"),
    ("Rebel Alliance",      "Insurgency",     "Severe",   "Outer Rim"),
    ("Saw's Partisans",     "Extremist Cell", "High",     "Mid Rim"),
    ("Separatist Holdouts", "Remnant",        "Low",      "Outer Rim"),
    ("Pirate Syndicates",   "Piracy",         "Moderate", "Outer Rim"),
    ("Local Insurgents",    "Insurgency",     "Moderate", "Various"),
    ("Smuggling Networks",  "Criminal",       "Low",      "Outer Rim"),
    ("Hutt Cartel Raiders", "Criminal",       "Low",      "Hutt Space"),
]
dim_faction_rows = []
faction_keys = {}
for i, (name, ftype, threat, region) in enumerate(FACTIONS):   # key 0 = No Hostiles
    faction_keys[name] = i
    dim_faction_rows.append([i, name, ftype, threat, region])
DIM_FACTION_HEADER = ["FactionKey", "Faction", "FactionType",
                      "ThreatLevel", "HomeRegion"]
faction_threat_rank = {
    "No Hostiles": 0, "Smuggling Networks": 1, "Hutt Cartel Raiders": 1,
    "Pirate Syndicates": 2, "Separatist Holdouts": 2, "Local Insurgents": 2,
    "Saw's Partisans": 3, "Rebel Alliance": 4,
}

# --------------------------------------------------------------------------- #
# DIM PLANET  (targets & patrol zones)
# --------------------------------------------------------------------------- #
PLANETS = [
    # (Planet, System, Region, Allegiance, StrategicValue, PopulationMillions)
    ("Deep Space / Patrol Zone", "-",           "-",           "-",                "-",        0),
    ("Despayre",                 "Horuz",        "Outer Rim",   "Imperial",         "Critical", 2),
    ("Jedha",                    "NaJedha",      "Mid Rim",     "Contested",        "High",     90),
    ("Scarif",                   "Abrion",       "Outer Rim",   "Imperial",         "Critical", 5),
    ("Alderaan",                 "Alderaan",     "Core Worlds", "Rebel-Aligned",    "Critical", 2000),
    ("Yavin IV",                 "Yavin",        "Outer Rim",   "Rebel Stronghold", "Critical", 1),
    ("Dantooine",                "Raioballo",    "Outer Rim",   "Rebel-Aligned",    "Medium",   1),
    ("Lothal",                   "Lothal",       "Outer Rim",   "Contested",        "Medium",   40),
    ("Ryloth",                   "Ryloth",       "Outer Rim",   "Contested",        "Medium",   1500),
    ("Mon Cala",                 "Mon Cala",     "Outer Rim",   "Rebel-Aligned",    "High",     27000),
    ("Corellia",                 "Corellian",    "Core Worlds", "Contested",        "High",     3000),
    ("Kessel",                   "Kessel",       "Outer Rim",   "Neutral",          "Medium",   500),
    ("Ord Mantell",              "Bright Jewel", "Mid Rim",     "Neutral",          "Low",      1200),
    ("Tatooine",                 "Tatoo",        "Outer Rim",   "Neutral",          "Low",      200),
    ("Geonosis",                 "Geonosis",     "Outer Rim",   "Imperial",         "High",     100),
    ("Mustafar",                 "Mustafar",     "Outer Rim",   "Imperial",         "Medium",   20),
]
dim_planet_rows = []
planet_keys = {}
for i, (name, system, region, alleg, sv, pop) in enumerate(PLANETS):  # key 0 = Deep Space
    planet_keys[name] = i
    dim_planet_rows.append([i, name, system, region, alleg, sv, pop])
DIM_PLANET_HEADER = ["PlanetKey", "Planet", "System", "Region",
                     "Allegiance", "StrategicValue", "PopulationMillions"]

# --------------------------------------------------------------------------- #
# DIM ENGAGEMENT TYPE
# --------------------------------------------------------------------------- #
ENGAGEMENT_TYPES = [
    # (EngagementType, Domain, IntensityWeight, IsSuperlaser)
    ("Patrol / Picket",      "Patrol",    1, "No"),
    ("Reconnaissance",       "Patrol",    1, "No"),
    ("Fighter Sweep",        "Offensive", 2, "No"),
    ("Interdiction",         "Offensive", 2, "No"),
    ("Blockade",             "Defensive", 2, "No"),
    ("Boarding Action",      "Offensive", 3, "No"),
    ("Orbital Bombardment",  "Offensive", 4, "No"),
    ("Planetary Assault",    "Offensive", 4, "No"),
    ("Superlaser Test Fire", "Test",      5, "Yes"),
    ("Superlaser Strike",    "Offensive", 5, "Yes"),
]
dim_etype_rows = []
etype_keys = {}
etype_meta = {}
for i, (name, domain, intensity, issl) in enumerate(ENGAGEMENT_TYPES, start=1):
    etype_keys[name] = i
    etype_meta[name] = dict(key=i, intensity=intensity, issl=issl)
    dim_etype_rows.append([i, name, domain, intensity, issl])
DIM_ETYPE_HEADER = ["EngagementTypeKey", "EngagementType", "Domain",
                    "IntensityWeight", "IsSuperlaser"]

# owning department per engagement type
TYPE_DEPT = {
    "Superlaser Test Fire": "Superlaser Operations",
    "Superlaser Strike":    "Superlaser Operations",
    "Orbital Bombardment":  "Turbolaser Batteries",
    "Planetary Assault":    "Stormtrooper Garrison",
    "Boarding Action":      "Stormtrooper Garrison",
    "Blockade":             "Tractor Beam Operations",
    "Interdiction":         "Tractor Beam Operations",
    "Fighter Sweep":        "Hangar & TIE Flight Ops",
    "Patrol / Picket":      "Hangar & TIE Flight Ops",
    "Reconnaissance":       "Hangar & TIE Flight Ops",
}

# --------------------------------------------------------------------------- #
# DIM READINESS CONDITION  (the Imperial alert ladder)
# --------------------------------------------------------------------------- #
CONDITIONS = [
    # (ConditionKey, Condition, Posture, AlertColor, SeverityRank, Description)
    (1, "Condition Green",  "Standby",            "Green",  1, "Routine operations; no credible threat"),
    (2, "Condition Blue",   "Elevated",           "Blue",   2, "Increased patrol tempo; minor activity"),
    (3, "Condition Yellow", "High Alert",         "Yellow", 3, "Confirmed hostile activity in sector"),
    (4, "Condition Red",    "Battle Stations",    "Red",    4, "Engagement imminent or underway"),
    (5, "Condition Black",  "Under Direct Attack", "Black",  5, "Station under direct attack"),
]
dim_condition_rows = [list(c) for c in CONDITIONS]
DIM_CONDITION_HEADER = ["ConditionKey", "Condition", "Posture", "AlertColor",
                        "SeverityRank", "Description"]

# --------------------------------------------------------------------------- #
# FACT ENGAGEMENT  (grain = one operation: fought, underway or planned)
# --------------------------------------------------------------------------- #
GENERIC_TYPES = [
    ("Patrol / Picket", 30), ("Reconnaissance", 18), ("Fighter Sweep", 14),
    ("Interdiction", 12), ("Blockade", 8), ("Boarding Action", 9),
    ("Orbital Bombardment", 5), ("Planetary Assault", 4),
]
PATROL_PLANETS = ["Deep Space / Patrol Zone", "Tatooine", "Ord Mantell",
                  "Kessel", "Lothal", "Ryloth"]
TARGET_PLANETS = ["Lothal", "Ryloth", "Dantooine", "Corellia", "Mon Cala",
                  "Kessel", "Ord Mantell", "Tatooine", "Geonosis"]


def pick_faction(t):
    weights = {
        "Rebel Alliance":       5 + 30 * t,
        "Saw's Partisans":      3 + 8 * t,
        "Separatist Holdouts":  max(1, 10 - 8 * t),
        "Pirate Syndicates":    14,
        "Local Insurgents":     10,
        "Smuggling Networks":   8,
        "Hutt Cartel Raiders":  6,
    }
    names = list(weights)
    return war.choices(names, weights=[weights[n] for n in names])[0]


eng_raw = []   # rows without the EngagementID (assigned after date-sort)


def add_engagement(d, t, etype, faction, planet, status_override=None,
                   planned_only=False, superlaser=None, planet_destroyed="No",
                   friendly=None, enemy=None, fcl=None, ecl=None):
    m = etype_meta[etype]
    intensity = m["intensity"]
    sl = m["issl"] if superlaser is None else superlaser
    dept_k = dept_keys[TYPE_DEPT[etype]]
    threat = faction_threat_rank.get(faction, 1)

    if planned_only:
        start_key, end_key = "", ""
        planned_key = datekey(d)
        event_key = planned_key
        status = status_override or "Planned"
        fl = el = fc = ec = ordx = 0
        dur = 0.0
    else:
        start_key = datekey(d)
        event_key = start_key
        planned_d = max(START, d - timedelta(days=war.randint(1, 20)))
        planned_key = datekey(planned_d)
        end_d = d + timedelta(days=war.randint(0, intensity + 1))
        if friendly is None:
            fl = int(lognorm(18 * intensity * (0.5 + 0.4 * threat), 1.0) * (0.6 + war_growth(d)))
            el = int(fl * war.uniform(1.2, 4.0)) if faction != "No Hostiles" else 0
            fc = int(lognorm(1 + intensity, 1.2) * (0.5 + t))
            ec = int(fc * war.uniform(1.0, 3.0)) if faction != "No Hostiles" else 0
        else:
            fl, el, fc, ec = friendly, enemy, fcl, ecl
        ordx = int(lognorm(35 * intensity, 1.1) * (0.5 + war_growth(d)))
        dur = round(war.uniform(1, 8) * intensity, 1)
        if status_override:
            status = status_override
            end_key = datekey(end_d) if end_d <= END else ""
        elif end_d > END:
            status, end_key = "Active", ""
        else:
            r = war.random()
            if faction in ("Rebel Alliance", "Saw's Partisans") and t > 0.8:
                status = "Won" if r < 0.78 else ("Lost" if r < 0.92 else "Aborted")
            else:
                status = "Won" if r < 0.90 else ("Lost" if r < 0.97 else "Aborted")
            end_key = datekey(end_d)

    eng_raw.append([event_key, planned_key, start_key, end_key, dept_k,
                    planet_keys[planet], faction_keys[faction], etype_keys[etype],
                    status, fl, el, fc, ec, ordx, dur, sl, planet_destroyed])


# --- generic engagements across the timeline -------------------------------
for d in all_dates:
    t = (d - START).days / max(1, (END - START).days)
    rate = 0.2 + 1.0 * war_growth(d)
    n = max(0, int(war.gauss(rate, rate * 0.5)))
    for _ in range(n):
        etype = war.choices([x[0] for x in GENERIC_TYPES],
                            weights=[x[1] for x in GENERIC_TYPES])[0]
        if etype in ("Patrol / Picket", "Reconnaissance"):
            planet = war.choice(PATROL_PLANETS)
            faction = war.choice(["Pirate Syndicates", "Smuggling Networks",
                                  "No Hostiles", "Local Insurgents"]) \
                if war.random() < 0.5 else pick_faction(t)
        else:
            planet = war.choice(TARGET_PLANETS)
            faction = pick_faction(t)
        add_engagement(d, t, etype, faction, planet)

# --- canon set-pieces (all 0 BBY / late 2024), climaxing at Yavin ----------
CANON = [
    # (date, type, planet, faction, status, superlaser, destroyed, fl, el, fcl, ecl)
    (date(2024, 9, 15),  "Superlaser Test Fire", "Despayre", "No Hostiles",     "Won",  "Yes", "Partial", 0,       0,          0,  0),
    (date(2024, 11, 10), "Superlaser Test Fire", "Jedha",    "Saw's Partisans", "Won",  "Yes", "No",      120,     80000,      0,  0),
    (date(2024, 11, 28), "Planetary Assault",    "Scarif",   "Rebel Alliance",  "Won",  "Yes", "No",      4200,    9500,       60, 110),
    (date(2024, 12, 23), "Superlaser Strike",    "Alderaan", "Rebel Alliance",  "Won",  "Yes", "Yes",     0,       2000000000, 0,  0),
    (date(2024, 12, 30), "Planetary Assault",    "Yavin IV", "Rebel Alliance",  "Lost", "No",  "No",      1700000, 60,         32, 38),
]
for cdate, etype, planet, faction, status, sl, pd, fr, en, fc_, ec_ in CANON:
    ct = (cdate - START).days / max(1, (END - START).days)
    add_engagement(cdate, ct, etype, faction, planet, status_override=status,
                   superlaser=sl, planet_destroyed=pd,
                   friendly=fr, enemy=en, fcl=fc_, ecl=ec_)

# --- the planned pipeline as of the reporting date (0 BBY) -----------------
PLANNED = [
    ("Superlaser Strike",   "Dantooine", "Rebel Alliance"),
    ("Planetary Assault",   "Mon Cala",  "Rebel Alliance"),
    ("Orbital Bombardment", "Corellia",  "Rebel Alliance"),
    ("Blockade",            "Ryloth",    "Local Insurgents"),
    ("Planetary Assault",   "Lothal",    "Rebel Alliance"),
    ("Interdiction",        "Kessel",    "Smuggling Networks"),
    ("Boarding Action",     "Ord Mantell", "Pirate Syndicates"),
    ("Fighter Sweep",       "Tatooine",  "Local Insurgents"),
    ("Superlaser Strike",   "Mon Cala",  "Rebel Alliance"),
    ("Blockade",            "Corellia",  "Rebel Alliance"),
]
for etype, planet, faction in PLANNED:
    pdate = END - timedelta(days=war.randint(0, 20))
    add_engagement(pdate, 1.0, etype, faction, planet, planned_only=True)

eng_raw.sort(key=lambda r: r[0])
fact_engagement_rows = [[f"ENG{i:07d}"] + r for i, r in enumerate(eng_raw, start=1)]
FACT_ENG_HEADER = ["EngagementID", "EventDateKey", "PlannedDateKey",
                   "StartDateKey", "EndDateKey", "DepartmentKey", "PlanetKey",
                   "FactionKey", "EngagementTypeKey", "Status", "FriendlyLosses",
                   "EnemyLosses", "FriendlyCraftLost", "EnemyCraftLost",
                   "OrdnanceExpended", "DurationHours", "SuperlaserStrike",
                   "PlanetDestroyed"]

# --------------------------------------------------------------------------- #
# FACT STATION ATTACK  (grain = one attack on the station)
# --------------------------------------------------------------------------- #
# Built from the pre-computed attack_schedule (the same shocks that drove the cost
# chain above), so every attack here lines up with its repair / loss / spend spike.
attack_schedule.sort(key=lambda a: a["dk"])
attack_raw = [[a["dk"], faction_keys[a["faction"]], a["sector"], a["atype"],
               a["severity"], a["shield_held"], a["hull_breach"], a["casualties"],
               a["repelled"], a["dur"], a["name"]] for a in attack_schedule]
fact_attack_rows = [[f"ATK{i:06d}"] + r for i, r in enumerate(attack_raw, start=1)]
FACT_ATK_HEADER = ["AttackID", "DateKey", "FactionKey", "AttackSector",
                   "AttackType", "Severity", "ShieldHeld", "HullBreach",
                   "Casualties", "Repelled", "ThreatDurationHours", "AttackName"]

# --------------------------------------------------------------------------- #
# FACT READINESS  (daily readiness / threat board snapshot)
# --------------------------------------------------------------------------- #
attack_by_day = {}
for a in attack_schedule:
    attack_by_day[a["dk"]] = max(attack_by_day.get(a["dk"], 0), a["sev_rank"])
superlaser_strike_days = {datekey(c[0]) for c in CANON if c[5] == "Yes"}

TIE_SQ_START, TIE_SQ_END = 84, 178   # TIE squadrons crewed (12 fighters each)
TL_TOTAL = 5000                      # turbolaser batteries (canon scale)
END_KEY = datekey(END)

fact_readiness_rows = []
charge = 0.0
for d in all_dates:
    t = (d - START).days / max(1, (END - START).days)
    dk = datekey(d)
    atk = attack_by_day.get(dk, 0)

    threat = 12 + 55 * t + (40 * (t - 0.85) / 0.15 if t > 0.85 else 0)
    threat = max(0, min(100, threat + atk * 12 + war.uniform(-6, 6)))

    if dk == END_KEY:
        cond = 5
    elif atk >= 4:
        cond = 5
    elif atk >= 3 or threat >= 80:
        cond = 4
    elif threat >= 55:
        cond = 3
    elif threat >= 30:
        cond = 2
    else:
        cond = 1

    tie_total = int(TIE_SQ_START + (TIE_SQ_END - TIE_SQ_START) * t)
    avail = war.uniform(0.80, 0.96) - 0.10 * (atk / 4)
    tie_op = max(0, int(tie_total * avail))

    if t < 0.82:
        sl_charge = 0.0
    else:
        charge = min(100.0, charge + war.uniform(2.5, 5.0))
        if dk in superlaser_strike_days:
            sl_charge, charge = 100.0, 0.0
        else:
            sl_charge = round(charge, 1)

    shield = 100.0
    if atk >= 2:
        shield = max(0.0, round(war.uniform(60, 95) - atk * 8, 1))
    if dk == END_KEY:
        shield = 0.0

    tl_online = int(TL_TOTAL * war.uniform(0.90, 0.99))
    sorties = max(0, int(war.gauss(40 * (0.5 + war_growth(d)), 12)) + atk * 30)

    fact_readiness_rows.append([
        dk, cond, round(threat, 1), tie_op, tie_total, sl_charge,
        shield, tl_online, TL_TOTAL, sorties,
    ])
FACT_READY_HEADER = ["SnapshotDateKey", "ConditionKey", "ThreatIndex",
                     "TIESquadronsOperational", "TIESquadronsTotal",
                     "SuperlaserChargePct", "ShieldIntegrityPct",
                     "TurbolaserBatteriesOnline", "TurbolaserBatteriesTotal",
                     "SortiesFlown"]

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
# --- Operations Command (war-fighting domain) ---
counts["DimEnemyFaction.csv"] = write_csv("DimEnemyFaction.csv", DIM_FACTION_HEADER, dim_faction_rows)
counts["DimPlanet.csv"] = write_csv("DimPlanet.csv", DIM_PLANET_HEADER, dim_planet_rows)
counts["DimEngagementType.csv"] = write_csv("DimEngagementType.csv", DIM_ETYPE_HEADER, dim_etype_rows)
counts["DimReadinessCondition.csv"] = write_csv("DimReadinessCondition.csv", DIM_CONDITION_HEADER, dim_condition_rows)
counts["FactEngagement.csv"] = write_csv("FactEngagement.csv", FACT_ENG_HEADER, fact_engagement_rows)
counts["FactStationAttack.csv"] = write_csv("FactStationAttack.csv", FACT_ATK_HEADER, fact_attack_rows)
counts["FactReadiness.csv"] = write_csv("FactReadiness.csv", FACT_READY_HEADER, fact_readiness_rows)

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
print("-" * 64)
# Cash-position walk: monthly income - expense, accumulated. The funding lag means
# attack months run a deficit until the subsidy catches up FUNDING_LAG_MONTHS later.
_m_inc, _m_exp = {}, {}
for r in fact_ledger_rows:
    ym = (r[1] // 10000, (r[1] // 100) % 100)
    if r[3] == SUBSIDY_KEY:
        _m_inc[ym] = _m_inc.get(ym, 0) + r[5]
    else:
        _m_exp[ym] = _m_exp.get(ym, 0) + r[5]
_cash, _min_cash, _neg = 0, 0, 0
for ym in sorted(set(_m_inc) | set(_m_exp)):
    _cash += _m_inc.get(ym, 0) - _m_exp.get(ym, 0)
    _min_cash = min(_min_cash, _cash)
    _neg += 1 if _cash < 0 else 0
print(f"  Funding lag           {FUNDING_LAG_MONTHS} months")
print(f"  Months cash negative  {_neg:>20,}  (of {len(set(_m_inc) | set(_m_exp))})")
print(f"  Worst cash position   {_min_cash:>20,} credits")
print("-" * 64)
eng_by_status = {}
for r in fact_engagement_rows:
    eng_by_status[r[9]] = eng_by_status.get(r[9], 0) + 1
print("  OPERATIONS COMMAND (war-fighting domain)")
print(f"    Engagements           {len(fact_engagement_rows):>18,}  "
      + " ".join(f"{k}:{v}" for k, v in sorted(eng_by_status.items())))
print(f"    Station attacks       {len(fact_attack_rows):>18,}  "
      f"(repelled: {sum(1 for r in fact_attack_rows if r[9] == 'Yes')})")
print(f"    Readiness snapshots   {len(fact_readiness_rows):>18,}")
print(f"  Output folder         {OUT}")
print("=" * 64)
