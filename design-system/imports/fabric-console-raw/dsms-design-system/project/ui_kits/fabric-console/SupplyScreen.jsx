/* Supply Chain Status — inventory value, category mix, stockout heat-strip, reorder watchlist. */
(function () {
  const { Panel, SectionHeader, DataTable, StatusPill, KpiTile } = window.DSMSDesignSystem_197d77;
  const { StackedBars } = window.DSMSCharts;
  const D = window.DSMSData;

  const STOCK_KEYS = [
    { key: "central", label: "Central Depot", color: "var(--ds-signal-info)" },
    { key: "forward", label: "Forward Store", color: "var(--ds-signal-positive)" },
    { key: "magazine", label: "Magazine", color: "var(--ds-signal-warning)" },
    { key: "cold", label: "Cold Storage", color: "var(--ds-data-3)" },
  ];

  /* Stockouts heat-strip: items × weeks */
  function HeatStrip() {
    const items = ["Turbolaser Coolant", "TIE Solar Array", "Reactor Plating", "Bacta Fluid", "Blaster Gas"];
    const weeks = 16;
    // deterministic pseudo pattern
    const cell = (r, c) => {
      const v = (r * 7 + c * 3) % 11;
      if (v === 0 || (r === 0 && c > 11) || (r === 4 && c > 13)) return "stockout";
      if (v < 3) return "low";
      return "ok";
    };
    const color = { stockout: "var(--ds-signal-negative)", low: "var(--ds-signal-warning)", ok: "var(--ds-bg-deck)" };
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {items.map((it, r) => (
            <div key={r} style={{ display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11.5, color: "var(--ds-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it}</span>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${weeks}, 1fr)`, gap: 3 }}>
                {Array.from({ length: weeks }).map((_, c) => {
                  const s = cell(r, c);
                  return <div key={c} title={`Week ${c + 1}: ${s}`} style={{ height: 16, borderRadius: 1, background: color[s], opacity: s === "ok" ? 0.6 : 0.9 }} />;
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 14, paddingLeft: 150 }}>
          {[["stockout", "Stockout"], ["low", "Low"], ["ok", "In Stock"]].map(([k, l]) => (
            <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--ds-text-muted)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 1, background: color[k], opacity: k === "ok" ? 0.6 : 0.9 }} />{l}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function SupplyScreen() {
    const s = D.supply;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <SectionHeader eyebrow="Inventory & Logistics" title="Supply Chain Status" />

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 14, alignItems: "stretch" }}>
          <KpiTile label="Inventory Value" value={s.inventoryValue} delta={0.052} sparkData={s.inventorySpark} sparkColor="var(--ds-signal-info)" accent style={{ justifyContent: "center" }} />
          <Panel title="Inventory by Category" eyebrow="Units by Location Type">
            <StackedBars rows={s.byCategory} keys={STOCK_KEYS} />
            <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
              {STOCK_KEYS.map((k) => (
                <span key={k.key} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--ds-text-muted)" }}>
                  <span style={{ width: 9, height: 9, borderRadius: 1, background: k.color }} />{k.label}
                </span>
              ))}
            </div>
          </Panel>
        </div>

        <Panel title="Stockouts Heat-Strip" eyebrow="Items × Last 16 Weeks">
          <HeatStrip />
        </Panel>

        <Panel title="Reorder Watchlist" eyebrow="At or Below Reorder Point" padded={false}>
          <DataTable
            rowKey="item"
            columns={[
              { key: "item", label: "Item" },
              { key: "onHand", label: "On Hand", numeric: true },
              { key: "onOrder", label: "On Order", numeric: true },
              { key: "lead", label: "Lead (d)", numeric: true },
              { key: "days", label: "Days to Stockout", numeric: true, render: (r) => (
                <span style={{ color: r.days <= 5 ? "var(--ds-signal-negative)" : r.days <= 10 ? "var(--ds-signal-warning)" : "var(--ds-text-primary)", fontFamily: "var(--ds-font-mono)", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>{r.days}</span>
              ) },
              { key: "vendor", label: "Preferred Vendor" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.rs} size="sm">{r.status}</StatusPill> },
            ]}
            rows={s.reorder}
          />
        </Panel>
      </div>
    );
  }

  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.SupplyScreen = SupplyScreen;
})();
