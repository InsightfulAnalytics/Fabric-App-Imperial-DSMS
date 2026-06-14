import {
  Panel,
  KpiTile,
  HBars,
  LineCompare,
  Donut,
  ChartLegend,
  type HBarDatum,
  type DonutSegment,
} from "@/components/ds";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { rowsOf, num, str } from "@/lib/unwrap";
import { wfKpi } from "@/queries/workforce/wf-kpi";
import { wfMonthly } from "@/queries/workforce/wf-monthly";
import { wfByRole } from "@/queries/workforce/wf-by-role";
import { wfPayrollDept } from "@/queries/workforce/wf-payroll-dept";
import type { BriefingFilters } from "@/lib/dax";

function fmtCount(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1e6) return `${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${(abs / 1e3).toFixed(0)}K`;
  return abs.toFixed(0);
}

function fmtCredits(value: number): string {
  if (value == null || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1e12) return `₡ ${(abs / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `₡ ${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `₡ ${(abs / 1e6).toFixed(2)}M`;
  return `₡ ${abs.toFixed(0)}`;
}

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export interface WorkforcePageProps {
  year: number;
  filters?: BriefingFilters;
}

export function WorkforcePage({ year, filters = {} }: WorkforcePageProps) {
  const kpi = wfKpi(year, filters);
  const monthly = wfMonthly(year, filters);
  const byRole = wfByRole(year, filters);
  const payroll = wfPayrollDept(year, filters);

  const kpiResult = useSemanticModelQuery({ connection: kpi.connection, query: kpi.query });
  const monthlyResult = useSemanticModelQuery({ connection: monthly.connection, query: monthly.query });
  const roleResult = useSemanticModelQuery({ connection: byRole.connection, query: byRole.query });
  const payrollResult = useSemanticModelQuery({ connection: payroll.connection, query: payroll.query });

  const kpiRow = rowsOf(kpiResult.data, kpi.columnMetadata)[0] ?? {};
  const hcCY = num(kpiRow.HeadcountCY);
  const hcPY = num(kpiRow.HeadcountPY);
  const droidShare = num(kpiRow.DroidShareCY);
  const delta = hcPY ? (hcCY - hcPY) / Math.abs(hcPY) : undefined;

  const monthlyRows = rowsOf(monthlyResult.data, monthly.columnMetadata);
  const hcSpark = monthlyRows.map((r) => num(r.Headcount)).filter((v) => !Number.isNaN(v));
  const attritionSeries = monthlyRows.map((r) => (num(r.AttritionPct) || 0) * 100);
  const combatSeries = monthlyRows.map((r) => (num(r.CombatLossPct) || 0) * 100);
  const monthLabels = monthlyRows.map((r) => MONTHS[num(r.MonthOfYear) - 1] ?? "");

  const roleData: HBarDatum[] = rowsOf(roleResult.data, byRole.columnMetadata).map((r) => ({
    label: str(r.Role),
    value: num(r.Headcount) || 0,
    color: str(r.IsCombat) === "Yes" ? "var(--ds-data-5)" : "var(--ds-data-2)",
  }));

  const droidSeg: DonutSegment[] = Number.isNaN(droidShare)
    ? []
    : [
        { cat: "Service Droids", value: droidShare, color: "var(--ds-data-1)" },
        { cat: "Organic Personnel", value: 1 - droidShare, color: "var(--ds-data-4)" },
      ];

  const payrollData: HBarDatum[] = rowsOf(payrollResult.data, payroll.columnMetadata).map((r) => ({
    label: str(r.DivisionGroup),
    value: num(r.Payroll) || 0,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      <div
        className="briefing-balance-grid"
        style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 14, alignItems: "stretch" }}
      >
        <KpiTile
          label="Total Headcount"
          value={fmtCount(hcCY)}
          delta={delta}
          spark={hcSpark.length > 1 ? hcSpark : undefined}
          sparkColor="var(--ds-signal-positive)"
          isLoading={kpiResult.isLoading && !kpiResult.data}
          style={{ justifyContent: "center" }}
        />
        <Panel title="Headcount by Role" eyebrow="Active Assignments" data-section="wf-by-role">
          {roleResult.data?.status === "error" ? (
            <QueryError message={roleResult.data.error.message} />
          ) : (
            <>
              <HBars data={roleData} format={(n) => fmtCount(n)} />
              <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                <LegendChip color="var(--ds-data-5)" label="Combat" />
                <LegendChip color="var(--ds-data-2)" label="Non-combat" />
              </div>
            </>
          )}
        </Panel>
      </div>

      <div
        className="briefing-balance-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}
      >
        <Panel
          title="Attrition & Combat Losses"
          eyebrow="% of Headcount · Monthly"
          actions={
            <div style={{ display: "flex", gap: 14 }}>
              <LegendChip color="var(--ds-signal-warning)" label="Attrition" line />
              <LegendChip color="var(--ds-signal-negative)" label="Combat Losses" line />
            </div>
          }
          data-section="wf-attrition"
        >
          {monthlyResult.data?.status === "error" ? (
            <QueryError message={monthlyResult.data.error.message} />
          ) : (
            <LineCompare
              labels={monthLabels}
              height={210}
              yFormat={(v) => `${v.toFixed(1)}%`}
              series={[
                { name: "Attrition", data: attritionSeries, color: "var(--ds-signal-warning)" },
                { name: "Combat Losses", data: combatSeries, color: "var(--ds-signal-negative)" },
              ]}
            />
          )}
        </Panel>

        <Panel title="Droids vs Organics" eyebrow="Workforce Composition" data-section="wf-droids">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <Donut
              segments={droidSeg}
              centerValue={Number.isNaN(droidShare) ? "—" : `${(droidShare * 100).toFixed(1)}%`}
              centerLabel="Droids"
            />
            <div style={{ width: "100%" }}>
              <ChartLegend segments={droidSeg} format={(v) => `${(v * 100).toFixed(1)}%`} />
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Payroll Cost by Division" eyebrow={`Fiscal Year · ${year}`} data-section="wf-payroll">
        {payrollResult.data?.status === "error" ? (
          <QueryError message={payrollResult.data.error.message} />
        ) : (
          <HBars color="var(--ds-data-3)" format={fmtCredits} data={payrollData} />
        )}
      </Panel>
    </div>
  );
}

function LegendChip({ color, label, line }: { color: string; label: string; line?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: line ? 12 : 9,
          height: line ? 3 : 9,
          borderRadius: 1,
          background: color,
        }}
      />
      <span style={{ fontSize: 11, color: "var(--ds-text-muted)" }}>{label}</span>
    </span>
  );
}

function QueryError({ message }: { message: string }) {
  return <div style={{ padding: 12, color: "var(--ds-signal-negative)" }}>Query error: {message}</div>;
}
