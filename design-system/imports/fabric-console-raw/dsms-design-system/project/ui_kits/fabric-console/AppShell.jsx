/* AppShell — composes the rail, top bar and the active screen into the console. */
(function () {
  const { SidebarRail, TopBar, Slicer, Button, IconButton } = window.DSMSDesignSystem_197d77;
  const S = window.DSMSScreens;

  const PAGES = [
    { id: "briefing", label: "Executive Briefing", icon: "layout-dashboard", title: "Imperial Executive Briefing", crumb: ["Finance", "P&L"], Screen: () => S.BriefingScreen },
    { id: "ops", label: "Operations Command", icon: "git-branch", title: "Operations Command", crumb: ["Procurement", "Vendors"], Screen: () => S.OperationsScreen },
    { id: "supply", label: "Supply Chain", icon: "boxes", title: "Supply Chain Status", crumb: ["Logistics", "Inventory"], Screen: () => S.SupplyScreen },
    { id: "workforce", label: "Workforce", icon: "users", title: "Workforce & Personnel", crumb: ["Personnel", "Headcount"], Screen: () => S.WorkforceScreen },
    { id: "maint", label: "Maintenance", icon: "wrench", title: "Maintenance & Reliability", crumb: ["Operations", "Work Orders"] },
  ];

  function AppShell() {
    const [active, setActive] = React.useState("briefing");
    const [collapsed, setCollapsed] = React.useState(false);
    const page = PAGES.find((p) => p.id === active);
    const Screen = page.Screen ? page.Screen() : null;

    return (
      <div style={{ display: "flex", height: "100vh", width: "100%", background: "var(--ds-bg-void)", color: "var(--ds-text-secondary)", fontFamily: "var(--ds-font-body)" }}>
        <SidebarRail
          items={PAGES}
          active={active}
          onSelect={setActive}
          collapsed={collapsed}
          statusLabel="Subsidy Coverage"
          statusValue="94%"
          statusTone="positive"
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <TopBar title={page.title} breadcrumb={page.crumb} onToggleRail={() => setCollapsed((c) => !c)}>
            <Slicer size="sm" defaultValue="2022" options={[
              { value: "2019", label: "2019" },
              { value: "2020", label: "2020" },
              { value: "2021", label: "2021" },
              { value: "2022", label: "2022" },
            ]} />
            <IconButton icon="bell" title="Alerts" />
            <Button variant="secondary" size="sm" icon="download">Export</Button>
          </TopBar>

          <main style={{ flex: 1, overflow: "auto", padding: 24, backgroundColor: "var(--ds-bg-void)", backgroundImage: "var(--ds-texture-grid)", backgroundSize: "var(--ds-texture-grid-size)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              {Screen ? <Screen /> : <Placeholder title={page.title} />}
            </div>
          </main>
        </div>
      </div>
    );
  }

  function Placeholder({ title }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 10, color: "var(--ds-text-muted)" }}>
        <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase" }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--ds-text-faint)" }}>Page reserved — not part of this UI-kit pass.</div>
      </div>
    );
  }

  window.DSMSApp = AppShell;
})();
