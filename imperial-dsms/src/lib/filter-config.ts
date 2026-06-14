import type { SlicerBasic, SlicerCategory, SlicerSelection } from "@/components/ds";
import type { BriefingFilters } from "@/lib/dax";

/**
 * Filter configuration for the DSMS Fabric Console.
 *
 * Lists the dimensions that the console's right-docked SlicerPane and the
 * "Detailed Filters" takeover expose. Selection state lives in `AppShell`.
 * Every basic slice maps 1:1 to a model column — see `deriveBasicFilters`.
 */

/** Basic-slice labels — AppShell reads their values to filter pages. */
export const DIVISION_GROUP_LABEL = "Division Group";
export const ZONE_LABEL = "Zone";
export const ACCOUNT_CATEGORY_LABEL = "Account Category";
export const COMBAT_ROLE_LABEL = "Combat Role";
export const ROLE_TYPE_LABEL = "Role Type";

/** The "no filter" options. */
export const ALL_DIVISIONS = "All Divisions";
export const ALL_ZONES = "All Zones";
export const ALL_CATEGORIES = "All Categories";
export const ALL_COMBAT_ROLES = "All Roles";
export const ALL_ROLE_TYPES = "All Types";

// Fiscal Year is deliberately absent — the year Slicer lives in the top bar.
// Values mirror the published model exactly (DimDepartment / DimLocation /
// DimAccount / DimRole).
export const BASIC_SLICES: SlicerBasic[] = [
  {
    label: DIVISION_GROUP_LABEL,
    icon: "git-branch",
    value: ALL_DIVISIONS,
    options: [
      ALL_DIVISIONS,
      "Combat Systems",
      "Engineering & Power",
      "Flight Operations",
      "Security & Detention",
      "Habitation & Life Support",
      "Logistics & Supply",
      "Command & Administration",
    ],
  },
  {
    label: ZONE_LABEL,
    icon: "globe",
    value: ALL_ZONES,
    options: [ALL_ZONES, "Core", "Equatorial", "Northern Hemisphere", "Southern Hemisphere"],
  },
  {
    label: ACCOUNT_CATEGORY_LABEL,
    icon: "wallet",
    value: ALL_CATEGORIES,
    options: [
      ALL_CATEGORIES,
      "Capital & Construction",
      "Imperial Funding",
      "Operations",
      "Overhead",
      "Personnel",
    ],
  },
  {
    label: COMBAT_ROLE_LABEL,
    icon: "crosshair",
    value: ALL_COMBAT_ROLES,
    options: [ALL_COMBAT_ROLES, "Combat", "Non-combat"],
  },
  {
    label: ROLE_TYPE_LABEL,
    icon: "users",
    value: ALL_ROLE_TYPES,
    options: [
      ALL_ROLE_TYPES,
      "Contractor",
      "Droid",
      "Enlisted",
      "Officer",
      "Specialist",
      "Support",
      "Technician",
      "Trooper",
    ],
  },
];

/** Maps the basic-slice values to query filters — "All …" become null (no filter). */
export function deriveBasicFilters(basicSel: Record<string, string>): BriefingFilters {
  const pick = (label: string, allValue: string): string | null => {
    const v = basicSel[label];
    return v && v !== allValue ? v : null;
  };
  const combat = pick(COMBAT_ROLE_LABEL, ALL_COMBAT_ROLES);
  return {
    division: pick(DIVISION_GROUP_LABEL, ALL_DIVISIONS),
    zone: pick(ZONE_LABEL, ALL_ZONES),
    accountCategory: pick(ACCOUNT_CATEGORY_LABEL, ALL_CATEGORIES),
    combatRole: combat === "Combat" || combat === "Non-combat" ? combat : null,
    roleType: pick(ROLE_TYPE_LABEL, ALL_ROLE_TYPES),
  };
}

export const DETAILED_SLICES: SlicerCategory[] = [
  {
    id: "products",
    label: "Products",
    icon: "package",
    groups: [
      {
        name: "Munitions",
        items: [
          "Turbolaser Coolant Cell",
          "Blaster Gas Canister",
          "Proton Torpedo",
          "Concussion Missile",
          "Ion Charge Pack",
        ],
      },
      {
        name: "Fuel & Power",
        items: [
          "Hypermatter Fuel Cell",
          "Reactor Shield Plating",
          "Power Coupling",
          "Coolant Manifold",
        ],
      },
      {
        name: "Spare Parts",
        items: [
          "TIE Solar Panel Array",
          "Tractor Beam Coil",
          "Magnetic Field Door",
          "Servo Actuator",
        ],
      },
      {
        name: "Consumables",
        items: ["Bacta Tank Fluid (40L)", "Ration Pack", "Droid Lubricant", "Med Kit"],
      },
    ],
  },
  {
    id: "staff",
    label: "Staff Type",
    icon: "users",
    groups: [
      {
        name: "Combat",
        items: ["Stormtrooper", "TIE Pilot", "Gunner", "ISB Agent", "Death Trooper"],
      },
      {
        name: "Technical",
        items: ["Reactor Technician", "Shield Operator", "Comms Officer", "Sensor Tech"],
      },
      {
        name: "Droids",
        items: ["Service Droid", "Astromech", "Security Droid", "Probe Droid"],
      },
      { name: "Command", items: ["Bridge Officer", "Division Chief", "Quartermaster"] },
    ],
  },
  {
    id: "areas",
    label: "Death Star Areas",
    icon: "radar",
    groups: [
      {
        name: "Core Systems",
        items: [
          "Reactor Core",
          "Superlaser Assembly",
          "Hypermatter Reactor",
          "Shield Generator",
        ],
      },
      {
        name: "Flight",
        items: ["Hangar Bay 327", "Hangar Bay 12", "Tractor Beam Array", "Docking Control"],
      },
      {
        name: "Security",
        items: ["Detention Block AA-23", "Garrison Barracks", "ISB Field Office"],
      },
      {
        name: "Operations",
        items: ["Bridge Command", "Waste Compaction", "Life Support", "Comms Tower"],
      },
    ],
  },
];

export function initialSelection(): SlicerSelection {
  const sel: SlicerSelection = {};
  DETAILED_SLICES.forEach((c) => {
    sel[c.id] = [];
  });
  return sel;
}

/** Default values for the basic slices, keyed by label. */
export function defaultBasicSelection(): Record<string, string> {
  return Object.fromEntries(BASIC_SLICES.map((b) => [b.label, b.value]));
}

export function selectionCount(sel: SlicerSelection): number {
  return Object.values(sel).reduce((n, a) => n + (a?.length ?? 0), 0);
}
