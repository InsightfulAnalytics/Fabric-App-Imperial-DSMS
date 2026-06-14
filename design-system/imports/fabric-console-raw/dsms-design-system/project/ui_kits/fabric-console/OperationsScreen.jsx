/* Operations Command — spend by division, vendors, risk matrix, pending ledger. */
(function () {
  const { Panel, SectionHeader, DataTable, StatusPill, Button } = window.DSMSDesignSystem_197d77;
  const { HBars } = window.DSMSCharts;
  const D = window.DSMSData;

  function RiskMatrix({ vendors }) {
    const W = 360, H = 230, pad = 34;
    const riskScore = { Nominal: 1, Elevated: 2, Critical: 3 };
    const spendVals = vendors.map((v) => parseFloat(v.spend.replace(/,/g, "")));
    const maxSpend = Math.max(...spendVals);
    const x = (s) => pad + (s / 3.4) * (W - pad * 2);
    const y = (sp) => H - pad - (sp / maxSpend) * (H - pad * 2);
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H}>
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--ds-line-conduit)" />
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--ds-line-conduit)" />
        {/* quadrant divider */}
        <line x1={x(2)} y1={pad} x2={x(2)} y2={H - pad} stroke="var(--ds-line-faint)" strokeDasharray="3 3" />
        <text x={W - pad} y={H - pad + 16} textAnchor="end" fill="var(--ds-text-faint)" style={{ fontSize: 10, fontFamily: "var(--ds-font-mono)" }}>RISK →</text>
        <text x={pad - 6} y={pad + 2} textAnchor="end" fill="var(--ds-text-faint)" style={{ fontSize: 10, fontFamily: "var(--ds-font-mono)" }}>₡</text>
        {vendors.map((v, i) => {
          const c = v.rs === "negative" ? "var(--ds-signal-negative)" : v.rs === "warning" ? "var(--ds-signal-warning)" : "var(--ds-signal-positive)";
          const sp = parseFloat(v.spend.replace(/,/g, ""));
          return (
            <g key={i}>
              <circle cx={x(riskScore[v.risk])} cy={y(sp)} r={Math.max(6, (sp / maxSpend) * 18)} fill={c} fillOpacity="0.22" stroke={c} strokeWidth="1.5" />
            </g>
          );
        })}
      </svg>
    );
  }

  function OperationsScreen() {
    const o = D.operations;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <SectionHeader eyebrow="Procurement & Vendors" title="Operations Command" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 14 }}>
          <Panel title="Spend by Division Group" eyebrow="Trailing 12 Months">
            <HBars data={o.divisionSpend} format={D.fmtCredits} color="var(--ds-data-2)" />
          </Panel>
          <Panel title="Vendor Risk Matrix" eyebrow="Risk × Spend">
            <RiskMatrix vendors={o.vendors} />
          </Panel>
        </div>

        <Panel
          title="Top Vendors"
          eyebrow="By Total Spend"
          padded={false}
          actions={<Button size="sm" variant="ghost" iconTrailing="chevron-down">All Tiers</Button>}
        >
          <DataTable
            rowKey="vendor"
            columns={[
              { key: "vendor", label: "Vendor" },
              { key: "type", label: "Type" },
              { key: "world", label: "Home World" },
              { key: "tier", label: "Tier", align: "center" },
              { key: "risk", label: "Risk Rating", render: (r) => <StatusPill status={r.rs} size="sm">{r.risk}</StatusPill> },
              { key: "spend", label: "Total Spend ₡", numeric: true },
            ]}
            rows={o.vendors}
          />
        </Panel>

        <Panel title="Pending & Disputed Ledger" eyebrow={`${o.pending.count} Open Postings`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {o.pending.top.map((p) => (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr 120px 110px", alignItems: "center", gap: 14, padding: "8px 10px", background: "var(--ds-bg-deck)", borderRadius: 2, border: "1px solid var(--ds-line-faint)" }}>
                <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 12, color: "var(--ds-text-secondary)" }}>{p.id}</span>
                <span style={{ fontSize: 13, color: "var(--ds-text-primary)" }}>{p.vendor}</span>
                <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 13, color: "var(--ds-text-primary)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>₡ {p.amount}</span>
                <div style={{ justifySelf: "end" }}><StatusPill status={p.rs} size="sm">{p.status}</StatusPill></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  }

  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.OperationsScreen = OperationsScreen;
})();
