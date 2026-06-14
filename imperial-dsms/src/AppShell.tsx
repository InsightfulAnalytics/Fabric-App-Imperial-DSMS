import { useState, type ReactNode } from "react";
import { Boxes, GitBranch, LayoutDashboard, LayoutGrid, SlidersHorizontal, Users, Wrench } from "lucide-react";
import {
  SidebarRail,
  TopBar,
  Button,
  Slicer,
  SlicerPane,
  FiltersTakeover,
  ReportInfoPreview,
  ReportInfoTakeover,
  type RailItem,
  type SlicerSelection,
} from "@/components/ds";
import { OverviewPage, type OverviewReport } from "@/pages/OverviewPage";
import { BriefingPage } from "@/pages/BriefingPage";
import { OperationsPage } from "@/pages/OperationsPage";
import { SupplyPage } from "@/pages/SupplyPage";
import { WorkforcePage } from "@/pages/WorkforcePage";
import { MaintenancePage } from "@/pages/MaintenancePage";
import { BudgetPage } from "@/pages/BudgetPage";
import {
  BASIC_SLICES,
  DETAILED_SLICES,
  initialSelection,
  defaultBasicSelection,
  deriveBasicFilters,
  selectionCount,
} from "@/lib/filter-config";
import type { BriefingFilters } from "@/lib/dax";
import { allowedPageIds, canPostBudget } from "@/lib/page-access";
import { useAuth } from "@/hooks/auth.context";

interface PageContext {
  year: number;
  /** Basic-slice filters from the slicer pane ("All …" entries are null). */
  filters: BriefingFilters;
  /** Whether the signed-in user may post budget adjustments. */
  canPost: boolean;
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
  /** Hide the Detailed-Filters button + slicer pane (page doesn't use detailed filters). */
  hideDetailedFilters?: boolean;
  /** Report-library card shown on the Overview landing. Omit for the Overview page itself. */
  card?: Omit<OverviewReport, "id" | "Icon" | "domain" | "title">;
  /** Page body. Omitted for the Overview landing, which AppShell renders directly. */
  render?: (ctx: PageContext) => ReactNode;
}

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];
const DEFAULT_YEAR = 2024;

const PAGES: PageDef[] = [
  {
    id: "overview",
    label: "Overview",
    Icon: LayoutGrid,
    title: "Console Overview",
    crumb: ["Operations", "Library"],
    eyebrow: "Operations · Library",
    // No card (it's the index itself), no year-in-title, no render — AppShell renders the landing.
  },
  {
    id: "briefing",
    label: "Executive Briefing",
    Icon: LayoutDashboard,
    title: "Imperial Executive Briefing",
    crumb: [],
    eyebrow: "Finance · P&L",
    showYearInTitle: true,
    card: {
      blurb:
        "Consolidated financial posture for station command. Trailing-twelve-month surplus, income against expenditure, and the headcount balance — with departmental budget variance at a glance.",
      inside: ["Net Subsidy Balance", "Headcount Balance", "Variance Scatter", "Combat-Loss Replenishment"],
      metric: { label: "Net Surplus", value: "₡ 1.28B", tone: "positive" },
    },
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
    card: {
      blurb:
        "Procurement and vendor oversight. Division-group spend, vendor risk exposure scored against contract value, and the open pending-and-disputed ledger.",
      inside: ["Spend by Division Group", "Vendor Risk Matrix", "Top Vendors", "Pending & Disputed Ledger"],
      metric: { label: "Open Postings", value: "47", tone: "warning" },
    },
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
    card: {
      blurb:
        "Inventory position and replenishment risk. Stock by category and location type, sixteen-week stockout exposure, and the at-or-below reorder watchlist.",
      inside: ["Inventory by Category", "Stockouts Heat-Strip", "Reorder Watchlist"],
      metric: { label: "Inventory Value", value: "₡ 3.41B", tone: "info" },
    },
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
    card: {
      blurb:
        "Personnel strength and attrition. Headcount by role, droid-to-organic composition, and attrition tracked against combat losses through the Battle of Yavin.",
      inside: ["Headcount by Role", "Attrition & Combat Losses", "Droids vs Organics", "Payroll by Department"],
      metric: { label: "Complement", value: "1.71M", tone: "positive" },
    },
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
    card: {
      blurb:
        "Reliability and work-order throughput. Open backlog by priority, downtime by system, and station availability against the 95% threshold.",
      inside: ["Backlog by Priority", "Downtime by System", "Station Availability", "Recent Work Orders"],
      metric: { label: "Availability", value: "97.6%", tone: "warning" },
    },
    render: ({ year, filters }) => <MaintenancePage year={year} filters={filters} />,
  },
  {
    id: "budget",
    label: "Budget Planning",
    Icon: SlidersHorizontal,
    title: "Budget Planning",
    crumb: [],
    eyebrow: "Finance · Budget",
    showYearInTitle: true,
    // The worksheet shows all departments for the selected year — detailed slicers don't apply.
    hideDetailedFilters: true,
    card: {
      blurb:
        "Interactive budget worksheet. Adjust each department's income and expense allocation by a percentage, watch the totals recompute, and post the change to the shared budget of record.",
      inside: ["Department Adjustment Worksheet", "Income & Expense Δ%", "Subsidy Coverage", "Post & Audit"],
      metric: { label: "Subsidy Coverage", value: "94%", tone: "positive" },
    },
    render: ({ year, canPost }) => <BudgetPage year={year} canPost={canPost} />,
  },
];

export function AppShell() {
  // Page-level access (UX layer; RLS in the model is the data enforcement).
  const { session } = useAuth();
  const email = session?.user?.email ?? null;
  const allowedIds = allowedPageIds(email, PAGES.map((p) => p.id));
  // The Overview index is shown to anyone with at least one granted content page —
  // even single-page (restricted) users land on the library first.
  const hasContent = PAGES.some((p) => p.id !== "overview" && allowedIds.includes(p.id));
  const visiblePages = PAGES.filter(
    (p) => allowedIds.includes(p.id) || (p.id === "overview" && hasContent),
  );

  const [active, setActive] = useState<string>(visiblePages[0]?.id ?? "");
  // Both side panes start collapsed — maximum canvas on first paint.
  const [collapsed, setCollapsed] = useState(true);
  const [paneCollapsed, setPaneCollapsed] = useState(true);
  const [takeover, setTakeover] = useState(false);
  // Report-information popout: hover shows it temporarily, click pins it (with scrim).
  const [infoHover, setInfoHover] = useState(false);
  const [infoPinned, setInfoPinned] = useState(false);
  const [selection, setSelection] = useState<SlicerSelection>(initialSelection);
  const [basicSel, setBasicSel] = useState<Record<string, string>>(defaultBasicSelection);
  const [year, setYear] = useState<number>(DEFAULT_YEAR);

  if (visiblePages.length === 0) {
    return <AccessDenied email={email} />;
  }

  const page = visiblePages.find((p) => p.id === active) ?? visiblePages[0];
  const isOverview = page.id === "overview";
  // Year slicer shows on every data page; detailed filters are suppressed where they don't apply.
  const showDetailedFilters = !isOverview && !page.hideDetailedFilters;
  const railItems: RailItem[] = visiblePages.map((p) => ({ id: p.id, label: p.label, Icon: p.Icon }));
  const detCount = selectionCount(selection);

  const basicFilters = deriveBasicFilters(basicSel);
  const canPost = canPostBudget(email);

  // Report-library cards — only pages the user can actually open (excludes the Overview index).
  const overviewReports: OverviewReport[] = visiblePages
    .filter((p) => p.card)
    .map((p) => ({
      id: p.id,
      Icon: p.Icon,
      domain: p.eyebrow,
      title: p.title,
      ...p.card!,
    }));

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
        infoLabel="Report Information"
        onInfoClick={() => setInfoPinned(true)}
        onInfoHoverChange={setInfoHover}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar
          title={page.title}
          breadcrumb={page.crumb}
          meta={page.showYearInTitle ? `Fiscal Year · ${year}` : undefined}
          onToggleRail={() => setCollapsed((c) => !c)}
        >
          {/* The Overview index has no data of its own — hide the year + filter controls. */}
          {!isOverview && (
            <>
              {showDetailedFilters && (
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
              )}
              <Slicer
                size="sm"
                value={String(year)}
                onChange={(v) => setYear(Number(v))}
                options={YEARS.map((y) => ({ value: String(y), label: String(y) }))}
              />
            </>
          )}
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
            {isOverview ? (
              <OverviewPage reports={overviewReports} onNavigate={setActive} />
            ) : (
              page.render?.({ year, filters: basicFilters, canPost })
            )}
          </div>
        </main>
      </div>

      {/* Filter pane is hidden where detailed filters don't apply (Overview, Budget Planning). */}
      {showDetailedFilters && (
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
      )}

      {takeover && showDetailedFilters && (
        <FiltersTakeover
          categories={DETAILED_SLICES}
          selection={selection}
          onSelectionChange={setSelection}
          onClose={() => setTakeover(false)}
          subtitle="Refine Products, Staff Type & Death Star Areas across the report"
        />
      )}

      {/* Report information — temporary on hover, pinned on click (dims the report). */}
      {infoHover && !infoPinned && (
        <ReportInfoPreview
          left={(collapsed ? 60 : 232) + 10}
          pageEyebrow={page.eyebrow}
          pageTitle={page.title}
          onHoverChange={setInfoHover}
        />
      )}
      {infoPinned && (
        <ReportInfoTakeover
          pageEyebrow={page.eyebrow}
          pageTitle={page.title}
          onClose={() => setInfoPinned(false)}
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
