/* Workforce & Personnel — headcount, roles, attrition vs combat losses, droids vs organics. */
(function () {
  const { Panel, SectionHeader, KpiTile, StatusPill } = window.DSMSDesignSystem_197d77;
  const { HBars, LineCompare, Donut, Legend } = window.DSMSCharts;
  const D = window.DSMSData;

  function WorkforceScreen() {
    const w = D.workforce;
    const roleData = w.byRole.map((r) => ({ label: r.role, value: r.count, color: r.combat ? "var(--ds-data-5)" : "var(--ds-data-2)" }));
    const droidSeg = [
      { cat: "Service Droids", value: w.droidShare, color: "var(--ds-data-1)" },
      { cat: "Organic Personnel", value: 1 - w.droidShare, color: "var(--ds-data-4)" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <SectionHeader eyebrow="Personnel & Headcount" title="Workforce" />

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 14 }}>
          <KpiTile label="Total Headcount" value={w.headcount} delta={0.038} sparkData={w.headcountSpark} sparkColor="var(--ds-signal-positive)" accent style={{ justifyContent: "center" }} />
          <Panel title="Headcount by Role" eyebrow="Active Assignments">
            <HBars data={roleData} format={(n) => (n / 1000).toFixed(0) + "K"} />
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <Lg color="var(--ds-data-5)" label="Combat" />
              <Lg color="var(--ds-data-2)" label="Non-combat" />
            </div>
          </Panel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>
          <Panel
            title="Attrition & Combat Losses"
            eyebrow="% of Headcount · Monthly"
            actions={
              <div style={{ display: "flex", gap: 14 }}>
                <Lg color="var(--ds-signal-warning)" label="Attrition" line />
                <Lg color="var(--ds-signal-negative)" label="Combat Losses" line />
              </div>
            }
          >
            <LineCompare
              labels={D.months}
              height={210}
              markerIndex={11}
              markerLabel="BATTLE OF YAVIN"
              yFormat={(v) => v.toFixed(1) + "%"}
              series={[
                { name: "Attrition", data: w.attrition, color: "var(--ds-signal-warning)" },
                { name: "Combat Losses", data: w.combatLosses, color: "var(--ds-signal-negative)" },
              ]}
            />
          </Panel>

          <Panel title="Droids vs Organics" eyebrow="Workforce Composition">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <Donut segments={droidSeg} centerValue="23.5%" centerLabel="Droids" />
              <div style={{ width: "100%" }}>
                <Legend segments={droidSeg} format={(v) => (v * 100).toFixed(1) + "%"} />
              </div>
            </div>
          </Panel>
        </div>

        <Panel title="Payroll Cost by Department" eyebrow="Trailing 12 Months">
          <HBars
            color="var(--ds-data-3)"
            format={D.fmtCredits}
            data={[
              { label: "Combat Systems", value: 1.42e9 },
              { label: "Engineering & Power", value: 0.98e9 },
              { label: "Flight Operations", value: 0.74e9 },
              { label: "Security & Detention", value: 0.41e9 },
              { label: "Habitation & Life Support", value: 0.19e9 },
            ]}
          />
        </Panel>
      </div>
    );
  }

  function Lg({ color, label, line }) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: line ? 12 : 9, height: line ? 3 : 9, borderRadius: 1, background: color }} />
        <span style={{ fontSize: 11, color: "var(--ds-text-muted)" }}>{label}</span>
      </span>
    );
  }

  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.WorkforceScreen = WorkforceScreen;
})();
