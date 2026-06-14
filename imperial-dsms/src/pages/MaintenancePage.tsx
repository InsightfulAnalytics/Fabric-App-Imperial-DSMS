import {
  Panel,
  KpiTile,
  DataTable,
  StatusPill,
  Gauge,
  HBars,
  LineCompare,
  Donut,
  ChartLegend,
  type HBarDatum,
  type DonutSegment,
  type DataTableColumn,
} from "@/components/ds";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { rowsOf, num, str } from "@/lib/unwrap";
import { maintKpi } from "@/queries/maintenance/maint-kpi";
import { maintMonthlyPriority } from "@/queries/maintenance/maint-monthly-priority";
import { maintDowntime } from "@/queries/maintenance/maint-downtime";
import { maintRecent } from "@/queries/maintenance/maint-recent";
import type { BriefingFilters } from "@/lib/dax";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const PRIORITIES = [
  { key: "Low", color: "var(--ds-data-2)" },
  { key: "Medium", color: "var(--ds-signal-info)" },
  { key: "High", color: "var(--ds-signal-warning)" },
  { key: "Critical", color: "var(--ds-signal-negative)" },
] as const;

function fmtCredits(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1e9) return `₡ ${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `₡ ${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `₡ ${(abs / 1e3).toFixed(1)}K`;
  return `₡ ${abs.toFixed(0)}`;
}

/** 20240115 → "2024-01-15". */
function fmtDateKey(key: number): string {
  if (!key || Number.isNaN(key)) return "—";
  const s = String(key);
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
}

function woStatus(status: string): "positive" | "warning" | "negative" | "info" | "neutral" {
  if (status === "Closed") return "positive";
  if (status === "Open") return "warning";
  if (status === "In Progress") return "info";
  if (status === "Deferred") return "negative";
  return "neutral";
}

export interface MaintenancePageProps {
  year: number;
  filters?: BriefingFilters;
}

export function MaintenancePage({ year, filters = {} }: MaintenancePageProps) {
  const kpi = maintKpi(year, filters);
  const monthly = maintMonthlyPriority(year, filters);
  const downtime = maintDowntime(year, filters);
  const recent = maintRecent(year, filters);

  const kpiResult = useSemanticModelQuery({ connection: kpi.connection, query: kpi.query });
  const monthlyResult = useSemanticModelQuery({ connection: monthly.connection, query: monthly.query });
  const downtimeResult = useSemanticModelQuery({ connection: downtime.connection, query: downtime.query });
  const recentResult = useSemanticModelQuery({ connection: recent.connection, query: recent.query });

  const k = rowsOf(kpiResult.data, kpi.columnMetadata)[0] ?? {};
  const loading = kpiResult.isLoading && !kpiResult.data;
  const yoy = (cy: number, py: number) =>
    py && !Number.isNaN(cy) && !Number.isNaN(py) ? (cy - py) / Math.abs(py) : undefined;

  const openCY = num(k.OpenWOCY);
  const critCY = num(k.CriticalCY);
  const mttrCY = num(k.MttrCY);
  const availCY = num(k.AvailabilityCY);

  // Monthly × priority → 4 line series + per-month totals for KPI sparks
  const monthlyRows = rowsOf(monthlyResult.data, monthly.columnMetadata);
  const monthSet = Array.from(new Set(monthlyRows.map((r) => num(r.MonthOfYear)))).sort(
    (a, b) => a - b,
  );
  const monthLabels = monthSet.map((m) => MONTHS[m - 1] ?? "");
  const seriesByPriority = PRIORITIES.map((p) => ({
    name: p.key,
    color: p.color,
    data: monthSet.map((m) => {
      const row = monthlyRows.find((r) => num(r.MonthOfYear) === m && str(r.Priority) === p.key);
      return row ? num(row.WorkOrders) || 0 : 0;
    }),
  }));
  const totalSpark = monthSet.map((m) =>
    monthlyRows
      .filter((r) => num(r.MonthOfYear) === m)
      .reduce((s, r) => s + (num(r.WorkOrders) || 0), 0),
  );
  const critSpark = monthSet.map((m) => {
    const row = monthlyRows.find((r) => num(r.MonthOfYear) === m && str(r.Priority) === "Critical");
    return row ? num(row.WorkOrders) || 0 : 0;
  });

  // Open backlog by priority (donut + pills)
  const openByPriority: DonutSegment[] = PRIORITIES.map((p) => ({
    cat: p.key,
    color: p.color,
    value: monthlyRows
      .filter((r) => str(r.Priority) === p.key)
      .reduce((s, r) => s + (num(r.OpenWO) || 0), 0),
  })).filter((s) => s.value > 0);
  const backlogTotal = openByPriority.reduce((a, s) => a + s.value, 0);

  const downtimeData: HBarDatum[] = rowsOf(downtimeResult.data, downtime.columnMetadata).map(
    (r) => ({ label: str(r.Department), value: num(r.DowntimeHrs) || 0 }),
  );

  interface RecentRow extends Record<string, unknown> {
    WorkOrderID: string;
    Opened: string;
    Department: string;
    Item: string;
    DowntimeHrs: number;
    RepairCostFmt: string;
    Status: string;
  }
  const recentRows: RecentRow[] = rowsOf(recentResult.data, recent.columnMetadata).map((r) => ({
    WorkOrderID: str(r.WorkOrderID),
    Opened: fmtDateKey(num(r.OpenedKey)),
    Department: str(r.Department),
    Item: str(r.Item),
    DowntimeHrs: num(r.DowntimeHrs) || 0,
    RepairCostFmt: fmtCredits(num(r.RepairCost)),
    Status: str(r.Status),
  }));

  const recentColumns: DataTableColumn<RecentRow>[] = [
    { key: "WorkOrderID", label: "Work Order", numeric: true },
    { key: "Opened", label: "Opened" },
    { key: "Department", label: "System" },
    { key: "Item", label: "Component" },
    {
      key: "DowntimeHrs",
      label: "Downtime (h)",
      numeric: true,
      render: (r) => r.DowntimeHrs.toLocaleString(undefined, { maximumFractionDigits: 1 }),
    },
    { key: "RepairCostFmt", label: "Repair Cost ₡", numeric: true },
    {
      key: "Status",
      label: "Status",
      render: (r) => (
        <StatusPill status={woStatus(r.Status)} size="sm">
          {r.Status}
        </StatusPill>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* KPI strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        <KpiTile
          label="Open Work Orders"
          value={Number.isNaN(openCY) ? "—" : openCY.toLocaleString()}
          delta={yoy(openCY, num(k.OpenWOPY))}
          invertDelta
          spark={totalSpark.length > 1 ? totalSpark : undefined}
          sparkColor="var(--ds-signal-info)"
          isLoading={loading}
        />
        <KpiTile
          label="Critical Open"
          value={Number.isNaN(critCY) ? "—" : critCY.toLocaleString()}
          delta={yoy(critCY, num(k.CriticalPY))}
          invertDelta
          spark={critSpark.length > 1 ? critSpark : undefined}
          sparkColor="var(--ds-signal-negative)"
          isLoading={loading}
        />
        <KpiTile
          label="Mean Time to Repair"
          value={Number.isNaN(mttrCY) ? "—" : mttrCY.toFixed(1)}
          unit="h"
          delta={yoy(mttrCY, num(k.MttrPY))}
          invertDelta
          isLoading={loading}
        />
        <KpiTile
          label="Station Availability"
          value={Number.isNaN(availCY) ? "—" : `${(availCY * 100).toFixed(1)}%`}
          delta={yoy(availCY, num(k.AvailabilityPY))}
          isLoading={loading}
        />
      </div>

      {/* Work orders by priority + availability gauge */}
      <div
        className="briefing-balance-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14, alignItems: "stretch" }}
      >
        <Panel
          title="Work Orders by Priority"
          eyebrow="Opened · by Month"
          actions={
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              {PRIORITIES.map((p) => (
                <span key={p.key} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 12, height: 3, borderRadius: 1, background: p.color }} />
                  <span style={{ fontSize: 11, color: "var(--ds-text-muted)" }}>{p.key}</span>
                </span>
              ))}
            </div>
          }
          data-section="maint-backlog"
        >
          {monthlyResult.data?.status === "error" ? (
            <QueryError message={monthlyResult.data.error.message} />
          ) : (
            <LineCompare
              labels={monthLabels}
              height={250}
              yFormat={(v) => Math.round(v).toString()}
              series={seriesByPriority}
            />
          )}
        </Panel>

        <Panel title="Station Availability" eyebrow="Uptime / Scheduled Hours" data-section="maint-availability">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 14,
            }}
          >
            <Gauge
              value={Number.isNaN(availCY) ? 0 : availCY}
              redBelow={0.9}
              warnBelow={0.95}
              label="Threshold 95%"
              size={180}
            />
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "var(--ds-text-muted)",
                textAlign: "center",
                lineHeight: 1.5,
                maxWidth: 220,
              }}
            >
              Reactor and superlaser downtime drag availability;{" "}
              <b style={{ color: "var(--ds-text-secondary)" }}>
                {Number.isNaN(critCY) ? "—" : critCY.toLocaleString()}
              </b>{" "}
              critical work orders open.
            </p>
            <div style={{ width: "100%", paddingTop: 12, borderTop: "1px solid var(--ds-line-faint)" }}>
              <div
                style={{
                  fontFamily: "var(--ds-font-display)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ds-text-muted)",
                  marginBottom: 9,
                  textAlign: "center",
                }}
              >
                Open Backlog · {backlogTotal.toLocaleString()} WOs
              </div>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 7 }}>
                {openByPriority
                  .filter((s) => s.cat === "Critical" || s.cat === "High" || s.cat === "Low")
                  .map((s) => (
                    <StatusPill
                      key={s.cat}
                      status={s.cat === "Critical" ? "negative" : s.cat === "High" ? "warning" : "positive"}
                      size="sm"
                    >
                      {s.cat} {s.value.toLocaleString()}
                    </StatusPill>
                  ))}
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Downtime ranking + backlog mix */}
      <div
        className="briefing-balance-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14, alignItems: "stretch" }}
      >
        <Panel title="Downtime by System" eyebrow="Lost Hours" data-section="maint-downtime">
          {downtimeResult.data?.status === "error" ? (
            <QueryError message={downtimeResult.data.error.message} />
          ) : (
            <HBars
              data={downtimeData}
              format={(v) => `${Math.round(v).toLocaleString()} h`}
              color="var(--ds-data-5)"
            />
          )}
        </Panel>
        <Panel title="Backlog Mix" eyebrow="Open WOs by Priority" data-section="maint-backlog-mix">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <Donut
              segments={openByPriority}
              centerValue={backlogTotal.toLocaleString()}
              centerLabel="Open"
            />
            <div style={{ width: "100%" }}>
              <ChartLegend segments={openByPriority} format={(v) => v.toLocaleString()} />
            </div>
          </div>
        </Panel>
      </div>

      {/* Recent work orders */}
      <Panel title="Recent Work Orders" eyebrow="Latest Postings" padded={false} data-section="maint-recent">
        {recentResult.data?.status === "error" ? (
          <QueryError message={recentResult.data.error.message} />
        ) : (
          <DataTable rowKey="WorkOrderID" columns={recentColumns} rows={recentRows} dense />
        )}
      </Panel>
    </div>
  );
}

function QueryError({ message }: { message: string }) {
  return <div style={{ padding: 12, color: "var(--ds-signal-negative)" }}>Query error: {message}</div>;
}
