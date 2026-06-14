// Foundation
export { Icon } from "./Icon";
export type { IconProps } from "./Icon";

// Forms
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
export { IconButton } from "./IconButton";
export type { IconButtonProps } from "./IconButton";
export { Input } from "./Input";
export type { InputProps } from "./Input";
export { Select } from "./Select";
export type { SelectProps, SelectOption } from "./Select";
export { Slicer } from "./Slicer";
export type { SlicerProps, SlicerOption } from "./Slicer";
export { Switch } from "./Switch";
export type { SwitchProps } from "./Switch";

// Data
export { KpiTile } from "./KpiTile";
export type { KpiTileProps } from "./KpiTile";
export { Sparkline } from "./Sparkline";
export type { SparklineProps } from "./Sparkline";
export { DeltaIndicator, deltaColor } from "./DeltaIndicator";
export { StatusPill } from "./StatusPill";
export type { StatusPillProps } from "./StatusPill";
export { Gauge } from "./Gauge";
export type { GaugeProps } from "./Gauge";
export { DataTable } from "./DataTable";
export type { DataTableProps, DataTableColumn } from "./DataTable";
export { BalanceCard } from "./BalanceCard";
export type { BalanceCardProps, LedgerRow, ProportionSegment } from "./BalanceCard";
export { VarianceScatter } from "./VarianceScatter";
export type { VarianceScatterProps, ScatterDept } from "./VarianceScatter";
export { ComboChart } from "./ComboChart";
export type { ComboChartProps, ComboChartDatum } from "./ComboChart";
export { HBars } from "./HBars";
export type { HBarsProps, HBarDatum } from "./HBars";
export { LineCompare } from "./LineCompare";
export type { LineCompareProps, LineSeries } from "./LineCompare";
export { Donut, ChartLegend } from "./Donut";
export type { DonutProps, DonutSegment, ChartLegendProps } from "./Donut";
export { StackedBars } from "./StackedBars";
export type { StackedBarsProps, StackedBarKey, StackedBarRow } from "./StackedBars";

// Chrome
export { Panel } from "./Panel";
export type { PanelProps } from "./Panel";
export { SectionHeader } from "./SectionHeader";
export type { SectionHeaderProps } from "./SectionHeader";
export { SidebarRail } from "./SidebarRail";
export type { RailItem } from "./SidebarRail";
export { TopBar } from "./TopBar";
export { SlicerPane } from "./SlicerPane";
export type {
  SlicerPaneProps,
  SlicerBasic,
  SlicerCategory,
  SlicerGroup,
  SlicerSelection,
} from "./SlicerPane";
export { DetailedFiltersTakeover } from "./DetailedFiltersTakeover";
export type { DetailedFiltersTakeoverProps } from "./DetailedFiltersTakeover";
export { ReportInfoPreview, ReportInfoTakeover } from "./ReportInfo";
export type { ReportInfoPreviewProps, ReportInfoTakeoverProps } from "./ReportInfo";
// Back-compat alias — superseded by DetailedFiltersTakeover in the v5 design system.
export { DetailedFiltersTakeover as FiltersTakeover } from "./DetailedFiltersTakeover";
export type { DetailedFiltersTakeoverProps as FiltersTakeoverProps } from "./DetailedFiltersTakeover";
