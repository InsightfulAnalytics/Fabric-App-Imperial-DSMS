import {
  Panel,
  DataTable,
  StatusPill,
  HBars,
  type HBarDatum,
  type DataTableColumn,
} from "@/components/ds";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { toDataTable } from "@/lib/to-data-table";
import { opsDivisionSpend } from "@/queries/operations/ops-division-spend";
import { opsVendors } from "@/queries/operations/ops-vendors";
import { opsPending } from "@/queries/operations/ops-pending";
import type { BriefingFilters } from "@/lib/dax";

/** Compact credit formatter — Imperial scale (T / B / M / K). */
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

type RiskStatus = "positive" | "warning" | "negative" | "neutral";

/** Maps DimVendor[RiskRating] to a signal pill status. */
function riskStatus(risk: string): RiskStatus {
  if (risk === "Low") return "positive";
  if (risk === "Medium") return "warning";
  if (risk === "High") return "negative";
  return "neutral";
}

interface VendorRow extends Record<string, unknown> {
  Vendor: string;
  VendorType: string;
  HomeWorld: string;
  ContractTier: string;
  RiskRating: string;
  Spend: number;
  SpendFmt: string;
}

interface PendingRow {
  id: string;
  vendor: string;
  status: string;
  amount: number;
}

export interface OperationsPageProps {
  /** Selected fiscal year (e.g. 2024). */
  year: number;
  /** Basic-slice filters from the slicer pane ("All …" entries are null). */
  filters?: BriefingFilters;
}

export function OperationsPage({ year, filters = {} }: OperationsPageProps) {
  const spend = opsDivisionSpend(year, filters);
  const vendors = opsVendors(year, filters);
  const pending = opsPending(year, filters);

  const spendResult = useSemanticModelQuery({ connection: spend.connection, query: spend.query });
  const vendorResult = useSemanticModelQuery({ connection: vendors.connection, query: vendors.query });
  const pendingResult = useSemanticModelQuery({ connection: pending.connection, query: pending.query });

  // Division spend → HBars
  const spendData: HBarDatum[] = [];
  if (spendResult.data?.status === "success") {
    const dt = toDataTable(spendResult.data.table, spend.columnMetadata);
    const iDiv = dt.columns.findIndex((c) => c.name === "DivisionGroup");
    const iVal = dt.columns.findIndex((c) => c.name === "Spend");
    dt.rows.forEach((r) => {
      const v = Number(r[iVal]) || 0;
      if (v > 0) spendData.push({ label: String(r[iDiv] ?? ""), value: v });
    });
  }

  // Vendors → table + risk matrix
  const vendorRows: VendorRow[] = [];
  if (vendorResult.data?.status === "success") {
    const dt = toDataTable(vendorResult.data.table, vendors.columnMetadata);
    const idx = (n: string) => dt.columns.findIndex((c) => c.name === n);
    const iV = idx("Vendor");
    const iT = idx("VendorType");
    const iW = idx("HomeWorld");
    const iTier = idx("ContractTier");
    const iR = idx("RiskRating");
    const iS = idx("Spend");
    dt.rows.forEach((r) => {
      const spendVal = Number(r[iS]) || 0;
      vendorRows.push({
        Vendor: String(r[iV] ?? ""),
        VendorType: String(r[iT] ?? ""),
        HomeWorld: String(r[iW] ?? ""),
        ContractTier: String(r[iTier] ?? ""),
        RiskRating: String(r[iR] ?? ""),
        Spend: spendVal,
        SpendFmt: fmtCreditsCR(spendVal),
      });
    });
  }

  // Pending & disputed postings
  const pendingRows: PendingRow[] = [];
  let openCount: number | null = null;
  if (pendingResult.data?.status === "success") {
    const dt = toDataTable(pendingResult.data.table, pending.columnMetadata);
    const idx = (n: string) => dt.columns.findIndex((c) => c.name === n);
    const iId = idx("LedgerID");
    const iV = idx("Vendor");
    const iSt = idx("Status");
    const iA = idx("Amount");
    const iC = idx("OpenCount");
    dt.rows.forEach((r) => {
      pendingRows.push({
        id: String(r[iId] ?? ""),
        vendor: String(r[iV] ?? ""),
        status: String(r[iSt] ?? ""),
        amount: Number(r[iA]) || 0,
      });
      if (openCount == null && r[iC] != null) openCount = Number(r[iC]);
    });
  }

  const vendorColumns: DataTableColumn<VendorRow>[] = [
    { key: "Vendor", label: "Vendor" },
    { key: "VendorType", label: "Type" },
    { key: "HomeWorld", label: "Home World" },
    { key: "ContractTier", label: "Tier", align: "center" },
    {
      key: "RiskRating",
      label: "Risk Rating",
      render: (r) => (
        <StatusPill status={riskStatus(r.RiskRating)} size="sm">
          {r.RiskRating}
        </StatusPill>
      ),
    },
    { key: "SpendFmt", label: "Total Spend ₡", numeric: true },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      <div
        className="briefing-balance-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 14 }}
      >
        <Panel
          title="Spend by Division Group"
          eyebrow={`Fiscal Year · ${year}`}
          data-section="ops-division-spend"
        >
          {spendResult.isLoading && spendData.length === 0 ? (
            <PanelLoading height={220} />
          ) : spendResult.data?.status === "error" ? (
            <QueryError message={spendResult.data.error.message} />
          ) : (
            <HBars data={spendData} format={fmtCreditsCR} color="var(--ds-data-2)" />
          )}
        </Panel>

        <Panel title="Vendor Risk Matrix" eyebrow="Risk × Spend" data-section="ops-risk-matrix">
          {vendorResult.isLoading && vendorRows.length === 0 ? (
            <PanelLoading height={220} />
          ) : (
            <RiskMatrix vendors={vendorRows} />
          )}
        </Panel>
      </div>

      <Panel
        title="Top Vendors"
        eyebrow="By Total Spend"
        padded={false}
        data-section="ops-top-vendors"
      >
        {vendorResult.isLoading && vendorRows.length === 0 ? (
          <PanelLoading height={300} />
        ) : vendorResult.data?.status === "error" ? (
          <QueryError message={vendorResult.data.error.message} />
        ) : (
          <DataTable rowKey="Vendor" columns={vendorColumns} rows={vendorRows} />
        )}
      </Panel>

      <Panel
        title="Pending & Disputed Ledger"
        eyebrow={openCount != null ? `${Number(openCount).toLocaleString()} Open Postings` : "Open Postings"}
        data-section="ops-pending-ledger"
      >
        {pendingResult.isLoading && pendingRows.length === 0 ? (
          <PanelLoading height={220} />
        ) : pendingResult.data?.status === "error" ? (
          <QueryError message={pendingResult.data.error.message} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pendingRows.map((p) => (
              <div
                key={p.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr 140px 110px",
                  alignItems: "center",
                  gap: 14,
                  padding: "8px 10px",
                  background: "var(--ds-bg-deck)",
                  borderRadius: 2,
                  border: "1px solid var(--ds-line-faint)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ds-font-mono)",
                    fontSize: 12,
                    color: "var(--ds-text-secondary)",
                  }}
                >
                  {p.id}
                </span>
                <span style={{ fontSize: 13, color: "var(--ds-text-primary)" }}>{p.vendor}</span>
                <span
                  style={{
                    fontFamily: "var(--ds-font-mono)",
                    fontSize: 13,
                    color: "var(--ds-text-primary)",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {fmtCreditsCR(p.amount)}
                </span>
                <div style={{ justifySelf: "end" }}>
                  <StatusPill status={p.status === "Disputed" ? "negative" : "warning"} size="sm">
                    {p.status}
                  </StatusPill>
                </div>
              </div>
            ))}
            {pendingRows.length === 0 && (
              <div style={{ color: "var(--ds-text-faint)", fontSize: 12, padding: "12px 0" }}>
                No open postings
              </div>
            )}
          </div>
        )}
      </Panel>
    </div>
  );
}

/** Risk × Spend scatter — x = risk band, y = spend, bubble area by spend. */
function RiskMatrix({ vendors }: { vendors: VendorRow[] }) {
  const W = 360;
  const H = 230;
  const pad = 34;
  const riskScore: Record<string, number> = { Low: 1, Medium: 2, High: 3 };
  const plotted = vendors.filter((v) => riskScore[v.RiskRating] != null && v.Spend > 0);
  if (!plotted.length) {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: `${W} / ${H}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ds-text-faint)",
          fontSize: 12,
        }}
      >
        No vendor data
      </div>
    );
  }
  const maxSpend = Math.max(...plotted.map((v) => v.Spend));
  const x = (s: number) => pad + (s / 3.4) * (W - pad * 2);
  const y = (sp: number) => H - pad - (sp / maxSpend) * (H - pad * 2);
  const color = (risk: string) =>
    risk === "High"
      ? "var(--ds-signal-negative)"
      : risk === "Medium"
        ? "var(--ds-signal-warning)"
        : "var(--ds-signal-positive)";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", height: "auto" }}>
      <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--ds-line-conduit)" />
      <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--ds-line-conduit)" />
      <line
        x1={x(2)}
        y1={pad}
        x2={x(2)}
        y2={H - pad}
        stroke="var(--ds-line-faint)"
        strokeDasharray="3 3"
      />
      <text
        x={W - pad}
        y={H - pad + 16}
        textAnchor="end"
        fill="var(--ds-text-faint)"
        style={{ fontSize: 10, fontFamily: "var(--ds-font-mono)" }}
      >
        RISK →
      </text>
      <text
        x={pad - 6}
        y={pad + 2}
        textAnchor="end"
        fill="var(--ds-text-faint)"
        style={{ fontSize: 10, fontFamily: "var(--ds-font-mono)" }}
      >
        ₡
      </text>
      {plotted.map((v, i) => {
        const c = color(v.RiskRating);
        return (
          <circle
            key={i}
            cx={x(riskScore[v.RiskRating])}
            cy={y(v.Spend)}
            r={Math.max(6, (v.Spend / maxSpend) * 18)}
            fill={c}
            fillOpacity="0.22"
            stroke={c}
            strokeWidth="1.5"
          >
            <title>{`${v.Vendor} · ${v.RiskRating} · ${fmtCreditsCR(v.Spend)}`}</title>
          </circle>
        );
      })}
    </svg>
  );
}

function PanelLoading({ height }: { height: number }) {
  return (
    <div
      style={{
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ds-text-muted)",
        fontFamily: "var(--ds-font-display)",
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      Loading…
    </div>
  );
}

function QueryError({ message }: { message: string }) {
  return <div style={{ padding: 12, color: "var(--ds-signal-negative)" }}>Query error: {message}</div>;
}
