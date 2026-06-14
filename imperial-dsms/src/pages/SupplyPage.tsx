import {
  Panel,
  KpiTile,
  DataTable,
  StatusPill,
  StackedBars,
  type StackedBarRow,
  type DataTableColumn,
} from "@/components/ds";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { rowsOf, num, str } from "@/lib/unwrap";
import { supplyKpi } from "@/queries/supply/supply-kpi";
import { supplyMonthlyValue } from "@/queries/supply/supply-monthly-value";
import { supplyByCategory } from "@/queries/supply/supply-by-category";
import { supplyStockoutStrip } from "@/queries/supply/supply-stockout-strip";
import { supplyReorder } from "@/queries/supply/supply-reorder";
import type { BriefingFilters } from "@/lib/dax";

function fmtCredits(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1e12) return `${sign}${(abs / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(1)}K`;
  return `${sign}${abs.toFixed(0)}`;
}
const fmtCreditsCR = (v: number) => `₡ ${fmtCredits(v)}`;

const STOCK_KEYS = [
  { key: "Central Depot", label: "Central Depot", color: "var(--ds-signal-info)" },
  { key: "Forward Store", label: "Forward Store", color: "var(--ds-signal-positive)" },
  { key: "Magazine", label: "Magazine", color: "var(--ds-signal-warning)" },
  { key: "Cold Storage", label: "Cold Storage", color: "var(--ds-data-3)" },
];

export interface SupplyPageProps {
  year: number;
  filters?: BriefingFilters;
}

export function SupplyPage({ year, filters = {} }: SupplyPageProps) {
  const kpi = supplyKpi(year, filters);
  const monthly = supplyMonthlyValue(year, filters);
  const byCat = supplyByCategory(year, filters);
  const strip = supplyStockoutStrip(year, filters);
  const reorder = supplyReorder(year, filters);

  const kpiResult = useSemanticModelQuery({ connection: kpi.connection, query: kpi.query });
  const monthlyResult = useSemanticModelQuery({ connection: monthly.connection, query: monthly.query });
  const catResult = useSemanticModelQuery({ connection: byCat.connection, query: byCat.query });
  const stripResult = useSemanticModelQuery({ connection: strip.connection, query: strip.query });
  const reorderResult = useSemanticModelQuery({ connection: reorder.connection, query: reorder.query });

  const kpiRow = rowsOf(kpiResult.data, kpi.columnMetadata)[0] ?? {};
  const invCY = num(kpiRow.InventoryValueCY);
  const invPY = num(kpiRow.InventoryValuePY);
  const delta = invPY ? (invCY - invPY) / Math.abs(invPY) : undefined;
  const spark = rowsOf(monthlyResult.data, monthly.columnMetadata)
    .map((r) => num(r.InventoryValue))
    .filter((v) => !Number.isNaN(v) && v > 0);

  // Pivot category × location-type rows into StackedBars shape
  const catRows: StackedBarRow[] = [];
  {
    const byCategory = new Map<string, StackedBarRow>();
    rowsOf(catResult.data, byCat.columnMetadata).forEach((r) => {
      const cat = str(r.ItemCategory);
      const loc = str(r.LocationType);
      const units = num(r.Units) || 0;
      if (!byCategory.has(cat)) byCategory.set(cat, { cat });
      const row = byCategory.get(cat)!;
      row[loc] = (Number(row[loc]) || 0) + units;
    });
    byCategory.forEach((row) => catRows.push(row));
    catRows.sort(
      (a, b) =>
        STOCK_KEYS.reduce((s, k) => s + (Number(b[k.key]) || 0), 0) -
        STOCK_KEYS.reduce((s, k) => s + (Number(a[k.key]) || 0), 0),
    );
  }

  // Heat strip: item rows × snapshot-week cells
  const stripRows = rowsOf(stripResult.data, strip.columnMetadata);
  const heatItems = new Map<string, Map<number, "stockout" | "low" | "ok">>();
  const snapKeys = new Set<number>();
  stripRows.forEach((r) => {
    const item = str(r.Item);
    const snap = num(r.SnapshotKey);
    snapKeys.add(snap);
    const status = num(r.StockoutLines) > 0 ? "stockout" : num(r.LowLines) > 0 ? "low" : "ok";
    if (!heatItems.has(item)) heatItems.set(item, new Map());
    heatItems.get(item)!.set(snap, status);
  });
  const weeks = Array.from(snapKeys).sort((a, b) => a - b).slice(-16);

  // Reorder watchlist
  interface ReorderRow extends Record<string, unknown> {
    Item: string;
    ItemCategory: string;
    LeadTimeDays: number;
    OnHand: number;
    OnOrder: number;
    StockoutLines: number;
    Vendor: string;
    status: string;
    rs: "negative" | "warning";
  }
  const reorderRows: ReorderRow[] = rowsOf(reorderResult.data, reorder.columnMetadata).map((r) => {
    const stockouts = num(r.StockoutLines) || 0;
    return {
      Item: str(r.Item),
      ItemCategory: str(r.ItemCategory),
      LeadTimeDays: num(r.LeadTimeDays) || 0,
      OnHand: num(r.OnHand) || 0,
      OnOrder: num(r.OnOrder) || 0,
      StockoutLines: stockouts,
      Vendor: str(r.Vendor),
      status: stockouts > 0 ? "Stockout" : "Reorder",
      rs: stockouts > 0 ? "negative" : "warning",
    };
  });

  const reorderColumns: DataTableColumn<ReorderRow>[] = [
    { key: "Item", label: "Item" },
    { key: "ItemCategory", label: "Category" },
    {
      key: "OnHand",
      label: "On Hand",
      numeric: true,
      render: (r) => r.OnHand.toLocaleString(),
    },
    {
      key: "OnOrder",
      label: "On Order",
      numeric: true,
      render: (r) => r.OnOrder.toLocaleString(),
    },
    { key: "LeadTimeDays", label: "Lead (d)", numeric: true },
    { key: "Vendor", label: "Preferred Vendor" },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <StatusPill status={r.rs} size="sm">
          {r.status}
        </StatusPill>
      ),
    },
  ];

  const heatColor: Record<string, string> = {
    stockout: "var(--ds-signal-negative)",
    low: "var(--ds-signal-warning)",
    ok: "var(--ds-bg-deck)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      <div
        className="briefing-balance-grid"
        style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 14, alignItems: "stretch" }}
      >
        <KpiTile
          label="Inventory Value"
          value={fmtCreditsCR(invCY)}
          delta={delta}
          spark={spark.length > 1 ? spark : undefined}
          sparkColor="var(--ds-signal-info)"
          isLoading={kpiResult.isLoading && !kpiResult.data}
          style={{ justifyContent: "center" }}
        />
        <Panel title="Inventory by Category" eyebrow="Units by Location Type" data-section="supply-by-category">
          {catResult.data?.status === "error" ? (
            <QueryError message={catResult.data.error.message} />
          ) : (
            <>
              <StackedBars rows={catRows} keys={STOCK_KEYS} />
              <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
                {STOCK_KEYS.map((k) => (
                  <span key={k.key} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 1, background: k.color }} />
                    <span style={{ fontSize: 11, color: "var(--ds-text-muted)" }}>{k.label}</span>
                  </span>
                ))}
              </div>
            </>
          )}
        </Panel>
      </div>

      <Panel
        title="Stockouts Heat-Strip"
        eyebrow="Highest-Stockout Items × Last 16 Snapshots"
        data-section="supply-stockouts"
      >
        {stripResult.data?.status === "error" ? (
          <QueryError message={stripResult.data.error.message} />
        ) : heatItems.size === 0 ? (
          <div style={{ color: "var(--ds-text-faint)", fontSize: 12, padding: "12px 0" }}>
            No stockouts recorded
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {Array.from(heatItems.entries()).map(([item, cells]) => (
                <div
                  key={item}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "170px 1fr",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11.5,
                      color: "var(--ds-text-secondary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item}
                  </span>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
                      gap: 3,
                    }}
                  >
                    {weeks.map((w) => {
                      const st = cells.get(w) ?? "ok";
                      return (
                        <div
                          key={w}
                          title={`${item} · ${String(w)}: ${st}`}
                          style={{
                            height: 16,
                            borderRadius: 1,
                            background: heatColor[st],
                            opacity: st === "ok" ? 0.6 : 0.9,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 14, paddingLeft: 180 }}>
              {(
                [
                  ["stockout", "Stockout"],
                  ["low", "Low / Reorder"],
                  ["ok", "In Stock"],
                ] as const
              ).map(([k, l]) => (
                <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--ds-text-muted)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 1, background: heatColor[k], opacity: k === "ok" ? 0.6 : 0.9 }} />
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}
      </Panel>

      <Panel
        title="Reorder Watchlist"
        eyebrow="At or Below Reorder Point"
        padded={false}
        data-section="supply-reorder"
      >
        {reorderResult.data?.status === "error" ? (
          <QueryError message={reorderResult.data.error.message} />
        ) : (
          <DataTable rowKey="Item" columns={reorderColumns} rows={reorderRows} dense />
        )}
      </Panel>
    </div>
  );
}

function QueryError({ message }: { message: string }) {
  return <div style={{ padding: 12, color: "var(--ds-signal-negative)" }}>Query error: {message}</div>;
}
