/* Executive Briefing (P&L) — the screen a Grand Moff reads first. */
(function () {
  const { Panel, KpiTile, SectionHeader, Gauge } = window.DSMSDesignSystem_197d77;
  const { LineCompare, Donut, Legend } = window.DSMSCharts;
  const D = window.DSMSData;

  function BriefingScreen() {
    const f = D.finance;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <SectionHeader eyebrow="Financial Posture · Ending 0 BBY" title="Trailing Twelve Months" />

        {/* KPI strip — 6 tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {f.kpis.map((k) => (
            <KpiTile
              key={k.label}
              label={k.label}
              value={k.value}
              delta={k.delta}
              invertDelta={!!k.invert}
              accent
              sparkData={k.spark}
              sparkColor={k.color}
            />
          ))}
        </div>

        {/* Hero chart + coverage gauge */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14, alignItems: "stretch" }}>
          <Panel
            title="Income vs Expenses"
            eyebrow="6-Year Ledger"
            actions={
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <Lg color="var(--ds-signal-info)" label="Income" />
                <Lg color="var(--ds-signal-warning)" label="Expenses" />
                <Lg color="var(--ds-signal-positive)" label="Net Surplus" square />
              </div>
            }
          >
            <LineCompare
              labels={D.months}
              surplus={f.surplus}
              markerIndex={11}
              markerLabel="BATTLE OF YAVIN"
              series={[
                { name: "Income", data: f.income, color: "var(--ds-signal-info)" },
                { name: "Expenses", data: f.expenses, color: "var(--ds-signal-warning)" },
              ]}
            />
          </Panel>

          <Panel title="Subsidy Coverage" eyebrow="Imperial Treasury">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 14 }}>
              <Gauge value={0.94} redBelow={0.7} warnBelow={0.85} label="Of Total Expenses" size={190} />
              <p style={{ margin: 0, fontSize: 12, color: "var(--ds-text-muted)", textAlign: "center", lineHeight: 1.5, maxWidth: 220 }}>
                Treasury subsidy covers <b style={{ color: "var(--ds-text-secondary)" }}>₡ 8.55B</b> of <b style={{ color: "var(--ds-text-secondary)" }}>₡ 9.10B</b> in total expenses.
              </p>
            </div>
          </Panel>
        </div>

        {/* Expense mix */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Panel title="Expense Mix" eyebrow="By Account Category">
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <Donut segments={f.expenseMix} centerValue="₡ 9.1B" centerLabel="Total" />
              <div style={{ flex: 1 }}>
                <Legend segments={f.expenseMix} format={D.fmtCredits} />
              </div>
            </div>
          </Panel>
          <Panel title="Operating Posture" eyebrow="Net Position">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Stat label="Operating Margin" value="12.3%" tone="positive" note="+0.9 pts YoY" />
              <Stat label="Net Surplus" value="₡ 1.28B" tone="positive" note="+6.4% YoY" />
              <Stat label="Expense Growth" value="6.1%" tone="warning" note="Outpacing income in Q4" />
              <Stat label="Days Cash on Hand" value="214" tone="neutral" note="Imperial reserve" />
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  function Lg({ color, label, square }) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: square ? 9 : 12, height: square ? 9 : 3, borderRadius: 1, background: color, opacity: square ? 0.4 : 1 }} />
        <span style={{ fontSize: 11, color: "var(--ds-text-muted)" }}>{label}</span>
      </span>
    );
  }

  function Stat({ label, value, tone, note }) {
    const c = { positive: "var(--ds-signal-positive)", warning: "var(--ds-signal-warning)", negative: "var(--ds-signal-negative)", neutral: "var(--ds-text-primary)" }[tone];
    return (
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, paddingBottom: 12, borderBottom: "1px solid var(--ds-line-faint)" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ds-text-secondary)", whiteSpace: "nowrap" }}>{label}</div>
          <div style={{ fontSize: 11.5, color: "var(--ds-text-muted)", marginTop: 3 }}>{note}</div>
        </div>
        <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: 22, fontWeight: 600, color: c, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      </div>
    );
  }

  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.BriefingScreen = BriefingScreen;
})();
