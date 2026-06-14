/* DSMS Fabric Console — mock datasets (0 BBY, trailing 12 months).
   Numbers are illustrative Imperial credits (₡). Exposed on window.DSMSData. */
(function () {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const income =   [812, 824, 833, 851, 860, 872, 889, 901, 918, 942, 980, 1041].map((n) => n * 1e6);
  const expenses = [690, 712, 735, 741, 760, 802, 798, 833, 881, 905, 962, 990].map((n) => n * 1e6);
  const surplus = income.map((v, i) => v - expenses[i]);

  const fmtCredits = (n) => {
    const a = Math.abs(n);
    if (a >= 1e9) return "₡ " + (n / 1e9).toFixed(2) + "B";
    if (a >= 1e6) return "₡ " + (n / 1e6).toFixed(0) + "M";
    if (a >= 1e3) return "₡ " + (n / 1e3).toFixed(0) + "K";
    return "₡ " + n;
  };

  window.DSMSData = {
    months,
    fmtCredits,
    finance: {
      income,
      expenses,
      surplus,
      kpis: [
        { label: "Total Income", value: "₡ 10.40B", delta: 0.082, spark: income.map((v) => v / 1e6) },
        { label: "Total Expenses", value: "₡ 9.10B", delta: 0.061, invert: true, spark: expenses.map((v) => v / 1e6), color: "var(--ds-signal-warning)" },
        { label: "Net Surplus", value: "₡ 1.28B", delta: 0.064, accent: true, spark: surplus.map((v) => v / 1e6), color: "var(--ds-signal-positive)" },
        { label: "Imperial Subsidy", value: "₡ 8.55B", delta: 0.011, spark: income.map((v) => v / 1e6 * 0.82), color: "var(--ds-signal-info)" },
        { label: "Subsidy Coverage", value: "94%", delta: -0.018, invert: false, spark: [97, 96, 96, 95, 95, 95, 94, 94, 94, 93, 94, 94] },
        { label: "Operating Margin", value: "12.3%", delta: 0.009, spark: surplus.map((v, i) => (v / income[i]) * 100) },
      ],
      expenseMix: [
        { cat: "Personnel", value: 3.74e9, color: "var(--ds-data-1)" },
        { cat: "Operations", value: 2.61e9, color: "var(--ds-data-2)" },
        { cat: "Capital & Construction", value: 1.98e9, color: "var(--ds-data-5)" },
        { cat: "Overhead", value: 0.77e9, color: "var(--ds-data-3)" },
      ],
    },

    operations: {
      divisionSpend: [
        { group: "Combat Systems", value: 2.84e9 },
        { group: "Engineering & Power", value: 2.21e9 },
        { group: "Flight Operations", value: 1.46e9 },
        { group: "Security & Detention", value: 0.98e9 },
        { group: "Habitation & Life Support", value: 0.74e9 },
        { group: "Logistics & Supply", value: 0.52e9 },
        { group: "Command & Administration", value: 0.35e9 },
      ],
      vendors: [
        { vendor: "Sienar Fleet Systems", type: "Prime", world: "Lianna", tier: "I", risk: "Critical", rs: "negative", spend: "412,900,114" },
        { vendor: "Kuat Drive Yards", type: "Prime", world: "Kuat", tier: "I", risk: "Elevated", rs: "warning", spend: "388,210,556" },
        { vendor: "Imperial Munitions", type: "Sub", world: "Coruscant", tier: "II", risk: "Nominal", rs: "positive", spend: "201,774,300" },
        { vendor: "Corellia Mining Guild", type: "Sub", world: "Corellia", tier: "II", risk: "Elevated", rs: "warning", spend: "164,330,901" },
        { vendor: "Taim & Bak Ordnance", type: "Sub", world: "Naboo", tier: "III", risk: "Nominal", rs: "positive", spend: "98,210,447" },
        { vendor: "Cygnus Spaceworks", type: "Prime", world: "Bespin", tier: "II", risk: "Critical", rs: "negative", spend: "76,884,210" },
      ],
      pending: { count: 47, top: [
        { id: "LDG-88142", vendor: "Sienar Fleet Systems", amount: "44,210,008", status: "Disputed", rs: "negative" },
        { id: "LDG-88090", vendor: "Kuat Drive Yards", amount: "31,775,400", status: "Pending", rs: "warning" },
        { id: "LDG-87994", vendor: "Cygnus Spaceworks", amount: "12,004,118", status: "Disputed", rs: "negative" },
      ] },
    },

    supply: {
      inventoryValue: "₡ 2.41B",
      inventorySpark: [2.1, 2.15, 2.2, 2.18, 2.25, 2.3, 2.28, 2.33, 2.36, 2.38, 2.4, 2.41],
      byCategory: [
        { cat: "Munition", central: 640, forward: 210, magazine: 480, cold: 0 },
        { cat: "Fuel", central: 520, forward: 180, magazine: 0, cold: 0 },
        { cat: "Spare Part", central: 410, forward: 260, magazine: 0, cold: 0 },
        { cat: "Consumable", central: 300, forward: 190, magazine: 0, cold: 220 },
        { cat: "Droid Part", central: 240, forward: 90, magazine: 0, cold: 0 },
        { cat: "Medical", central: 120, forward: 60, magazine: 0, cold: 180 },
      ],
      reorder: [
        { item: "Turbolaser Coolant Cell", onHand: 142, onOrder: 600, lead: 14, days: 6, vendor: "Sienar Fleet Systems", status: "Stockout", rs: "negative" },
        { item: "TIE Solar Panel Array", onHand: 310, onOrder: 0, lead: 21, days: 9, vendor: "Cygnus Spaceworks", status: "Reorder", rs: "warning" },
        { item: "Reactor Shield Plating", onHand: 88, onOrder: 240, lead: 30, days: 11, vendor: "Kuat Drive Yards", status: "Reorder", rs: "warning" },
        { item: "Bacta Tank Fluid (40L)", onHand: 540, onOrder: 0, lead: 9, days: 18, vendor: "Corellia Mining Guild", status: "OK", rs: "positive" },
        { item: "Blaster Gas Canister", onHand: 12, onOrder: 1000, lead: 7, days: 3, vendor: "Taim & Bak Ordnance", status: "Stockout", rs: "negative" },
      ],
    },

    workforce: {
      headcount: "1.71M",
      headcountSpark: [1.42, 1.46, 1.5, 1.53, 1.56, 1.59, 1.62, 1.64, 1.66, 1.68, 1.7, 1.71],
      byRole: [
        { role: "Stormtrooper", count: 612000, combat: true },
        { role: "Service Droid", count: 401000, combat: false },
        { role: "Reactor Technician", count: 188000, combat: false },
        { role: "TIE Pilot", count: 96000, combat: true },
        { role: "Gunner", count: 84000, combat: true },
        { role: "ISB Agent", count: 41000, combat: true },
      ],
      attrition: [3.1, 3.0, 3.2, 3.4, 3.3, 3.6, 3.5, 3.8, 4.0, 4.2, 4.6, 5.4],
      combatLosses: [0.4, 0.3, 0.5, 0.6, 0.5, 0.7, 0.8, 0.9, 1.1, 1.4, 2.0, 3.9],
      droidShare: 0.235,
    },

    maintenance: {
      openWO: 1284,
      criticalWO: 37,
      backlog: {
        low:    [120, 124, 118, 130, 126, 122, 128, 134, 131, 129, 136, 140],
        medium: [88, 92, 95, 90, 96, 99, 101, 98, 104, 108, 112, 118],
        high:   [40, 42, 45, 44, 48, 50, 52, 49, 55, 60, 66, 74],
        crit:   [6, 5, 7, 8, 7, 9, 10, 11, 14, 18, 26, 37],
      },
      downtime: [
        { dept: "Reactor Core", hrs: 884 },
        { dept: "Superlaser Assembly", hrs: 712 },
        { dept: "Hangar Bay 327", hrs: 466 },
        { dept: "Tractor Beam Array", hrs: 358 },
        { dept: "Detention Block AA-23", hrs: 214 },
        { dept: "Waste Compaction", hrs: 142 },
      ],
      recent: [
        { id: "WO-44821", opened: "0 BBY · Dec", dept: "Reactor Core", item: "Coolant Manifold", downtime: "42h", cost: "8,210,400", status: "Critical", rs: "negative" },
        { id: "WO-44810", opened: "0 BBY · Dec", dept: "Superlaser", item: "Focus Lens Coupling", downtime: "31h", cost: "12,004,118", status: "Critical", rs: "negative" },
        { id: "WO-44788", opened: "0 BBY · Nov", dept: "Hangar 327", item: "Magnetic Field Door", downtime: "18h", cost: "2,440,900", status: "In Repair", rs: "warning" },
        { id: "WO-44755", opened: "0 BBY · Nov", dept: "Tractor Beam", item: "Generator Coupling", downtime: "9h", cost: "990,200", status: "Closed", rs: "positive" },
      ],
    },
  };
})();
