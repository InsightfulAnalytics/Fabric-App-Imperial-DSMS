import { useState } from "react";
import { Boxes, GitBranch, LayoutDashboard, Users, Wrench } from "lucide-react";
import {
  SidebarRail,
  TopBar,
  Button,
  Slicer,
  SlicerPane,
  FiltersTakeover,
  type RailItem,
  type SlicerSelection,
} from "@/components/ds";
import { BriefingPage } from "@/pages/BriefingPage";
import { OperationsPage } from "@/pages/OperationsPage";
import { SupplyPage } from "@/pages/SupplyPage";
import { WorkforcePage } from "@/pages/WorkforcePage";
import { MaintenancePage } from "@/pages/MaintenancePage";
import {
  BASIC_SLICES,
  DETAILED_SLICES,
  initialSelection,
  defaultBasicSelection,
  deriveBasicFilters,
  selectionCount,
} from "@/lib/filter-config";
import type { BriefingFilters } from "@/lib/dax";
import { allowedPageIds } from "@/lib/page-access";
import { useAuth } from "@/hooks/auth.context";

interface PageContext {
  year: number;
  /** Basic-slice filters from the slicer pane ("All …" entries are null). */
  filters: BriefingFilters;
}

interface PageDef {
  id: string;
  label: string;
  Icon: RailItem["Icon"];
  title: string;
  crumb: string[];
  eyebrow: string;
  /** Show "Fiscal Year · YYYY" beside the title in the top bar. */
  showYearInTitle?: boolean;
  render: (ctx: PageContext) => JSX.Element;
}

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];
const DEFAULT_YEAR = 2024;

const PAGES: PageDef[] = [
  {
    id: "briefing",
    label: "Executive Briefing",
    Icon: LayoutDashboard,
    title: "Imperial Executive Briefing",
    crumb: [],
    eyebrow: "Finance · P&L",
    showYearInTitle: true,
    render: ({ year, filters }) => <BriefingPage year={year} filters={filters} />,
  },
  {
    id: "ops",
    label: "Operations Command",
    Icon: GitBranch,
    title: "Operations Command",
    crumb: [],
    eyebrow: "Procurement · Vendors",
    showYearInTitle: true,
    render: ({ year, filters }) => <OperationsPage year={year} filters={filters} />,
  },
  {
    id: "supply",
    label: "Supply Chain",
    Icon: Boxes,
    title: "Supply Chain Status",
    crumb: [],
    eyebrow: "Logistics · Inventory",
    showYearInTitle: true,
    render: ({ year, filters }) => <SupplyPage year={year} filters={filters} />,
  },
  {
    id: "workforce",
    label: "Workforce",
    Icon: Users,
    title: "Workforce & Personnel",
    crumb: [],
    eyebrow: "Personnel · Headcount",
    showYearInTitle: true,
    render: ({ year, filters }) => <WorkforcePage year={year} filters={filters} />,
  },
  {
    id: "maint",
    label: "Maintenance",
    Icon: Wrench,
    title: "Maintenance & Reliability",
    crumb: [],
    eyebrow: "Operations · Work Orders",
    showYearInTitle: true,
    render: ({ year, filters }) => <MaintenancePage year={year} filters={filters} />,
  },
];

export function AppShell() {
  // Page-level access (UX layer; RLS in the model is the data enforcement).
  const { session } = useAuth();
  const email = session?.user?.email ?? null;
  const allowedIds = allowedPageIds(email, PAGES.map((p) => p.id));
  const visiblePages = PAGES.filter((p) => allowedIds.includes(p.id));

  const [active, setActive] = useState<string>(visiblePages[0]?.id ?? "");
  // Both side panes start collapsed — maximum canvas on first paint.
  const [collapsed, setCollapsed] = useState(true);
  const [paneCollapsed, setPaneCollapsed] = useState(true);
  const [takeover, setTakeover] = useState(false);
  const [selection, setSelection] = useState<SlicerSelection>(initialSelection);
  const [basicSel, setBasicSel] = useState<Record<string, string>>(defaultBasicSelection);
  const [year, setYear] = useState<number>(DEFAULT_YEAR);

  if (visiblePages.length === 0) {
    return <AccessDenied email={email} />;
  }

  const page = visiblePages.find((p) => p.id === active) ?? visiblePages[0];
  const railItems: RailItem[] = visiblePages.map((p) => ({ id: p.id, label: p.label, Icon: p.Icon }));
  const detCount = selectionCount(selection);

  const basicFilters = deriveBasicFilters(basicSel);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "var(--ds-bg-void)",
        color: "var(--ds-text-secondary)",
        fontFamily: "var(--ds-font-body)",
      }}
    >
      <SidebarRail
        items={railItems}
        active={active}
        onSelect={setActive}
        collapsed={collapsed}
        statusLabel="Subsidy Coverage"
        statusValue="—"
        statusTone="positive"
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar
          title={page.title}
          breadcrumb={page.crumb}
          meta={page.showYearInTitle ? `Fiscal Year · ${year}` : undefined}
          onToggleRail={() => setCollapsed((c) => !c)}
        >
          <Button
            variant="secondary"
            size="sm"
            icon="list-filter"
            onClick={() => setTakeover(true)}
            style={{
              // Match the year Slicer (size="sm"): 28px track, 11.5px segment text.
              height: 28,
              fontSize: 11.5,
              letterSpacing: "0.08em",
              ...(detCount
                ? {
                    background: "var(--ds-signal-info-dim)",
                    borderColor: "transparent",
                    color: "var(--ds-text-primary)",
                    boxShadow: "inset 0 -2px 0 var(--ds-signal-info)",
                  }
                : {}),
            }}
          >
            {detCount > 0 ? `Detailed Filters · ${detCount}` : "Detailed Filters"}
          </Button>
          <Slicer
            size="sm"
            value={String(year)}
            onChange={(v) => setYear(Number(v))}
            options={YEARS.map((y) => ({ value: String(y), label: String(y) }))}
          />
        </TopBar>
        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: 24,
            backgroundColor: "var(--ds-bg-void)",
            backgroundImage: "var(--ds-texture-grid)",
            backgroundSize: "var(--ds-texture-grid-size)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {page.render({ year, filters: basicFilters })}
          </div>
        </main>
      </div>

      <SlicerPane
        basics={BASIC_SLICES}
        basicValues={basicSel}
        onBasicChange={(label, value) => setBasicSel((s) => ({ ...s, [label]: value }))}
        categories={DETAILED_SLICES}
        selection={selection}
        onSelectionChange={setSelection}
        collapsed={paneCollapsed}
        onCollapsedChange={setPaneCollapsed}
        onOpenAll={() => setTakeover(true)}
      />

      {takeover && (
        <FiltersTakeover
          categories={DETAILED_SLICES}
          selection={selection}
          onSelectionChange={setSelection}
          onClose={() => setTakeover(false)}
          subtitle="Refine Products, Staff Type & Death Star Areas across the report"
        />
      )}
    </div>
  );
}

/** Full-page notice for signed-in users with no provisioned pages (default deny). */
function AccessDenied({ email }: { email: string | null }) {
  return (
    <div
      className="ds-bg-grid"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        gap: 14,
        color: "var(--ds-text-secondary)",
        fontFamily: "var(--ds-font-body)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--ds-font-display)",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ds-text-primary)",
        }}
      >
        Access Not Provisioned
      </div>
      <div style={{ fontSize: 13, color: "var(--ds-text-muted)", maxWidth: 420, textAlign: "center", lineHeight: 1.5 }}>
        {email ? (
          <>
            <span className="ds-num" style={{ color: "var(--ds-text-secondary)" }}>{email}</span>{" "}
            has no console pages assigned. Contact station command to request clearance.
          </>
        ) : (
          "No signed-in identity was provided by the Fabric session."
        )}
      </div>
    </div>
  );
}
