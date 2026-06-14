/* @ds-bundle: {"format":3,"namespace":"DSMSDesignSystem_197d77","components":[{"name":"Panel","sourcePath":"components/chrome/Panel.jsx"},{"name":"SectionHeader","sourcePath":"components/chrome/SectionHeader.jsx"},{"name":"SidebarRail","sourcePath":"components/chrome/SidebarRail.jsx"},{"name":"SlicerPane","sourcePath":"components/chrome/SlicerPane.jsx"},{"name":"TopBar","sourcePath":"components/chrome/TopBar.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"DeltaIndicator","sourcePath":"components/data/DeltaIndicator.jsx"},{"name":"Gauge","sourcePath":"components/data/Gauge.jsx"},{"name":"KpiTile","sourcePath":"components/data/KpiTile.jsx"},{"name":"Sparkline","sourcePath":"components/data/Sparkline.jsx"},{"name":"StatusPill","sourcePath":"components/data/StatusPill.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Slicer","sourcePath":"components/forms/Slicer.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Icon","sourcePath":"components/foundation/Icon.jsx"},{"name":"FabricConsole","sourcePath":"ui_kits/fabric-console/FabricConsole.jsx"}],"sourceHashes":{"components/chrome/Panel.jsx":"19c149b43f6b","components/chrome/SectionHeader.jsx":"162641103968","components/chrome/SidebarRail.jsx":"3eaeea80bda0","components/chrome/SlicerPane.jsx":"55c4bac556e9","components/chrome/TopBar.jsx":"fb7b6a40873d","components/data/DataTable.jsx":"5fc07cfb26f8","components/data/DeltaIndicator.jsx":"e31d3c717a6d","components/data/Gauge.jsx":"e0a0fd5f8f11","components/data/KpiTile.jsx":"e9038071704c","components/data/Sparkline.jsx":"aad29f6eb980","components/data/StatusPill.jsx":"24ecd0709cab","components/forms/Button.jsx":"3289859a746e","components/forms/IconButton.jsx":"5ec50639e2f4","components/forms/Input.jsx":"d18fca02701f","components/forms/Select.jsx":"51fb783381ee","components/forms/Slicer.jsx":"31dd60bc68f0","components/forms/Switch.jsx":"328b9a2d9878","components/foundation/Icon.jsx":"bcf7ae9248a6","ui_kits/fabric-console/AppShell.jsx":"50a507717e0a","ui_kits/fabric-console/BriefingScreen.jsx":"b93c56c3f034","ui_kits/fabric-console/BudgetScreen.jsx":"7a82205a4aba","ui_kits/fabric-console/Charts.jsx":"4df7062cd181","ui_kits/fabric-console/FabricConsole.jsx":"c3c18dacccc8","ui_kits/fabric-console/OperationsScreen.jsx":"f3f668074c33","ui_kits/fabric-console/SupplyScreen.jsx":"21cf6566327e","ui_kits/fabric-console/WorkforceScreen.jsx":"a3f192768ab1","ui_kits/fabric-console/console-filters.jsx":"4e16fc214c97","ui_kits/fabric-console/data.js":"5bfc896a628a","ui_kits/fabric-console/design-canvas.jsx":"bd8746af6e58","ui_kits/fabric-console/filter-panels.jsx":"2b5e3fa7a054","ui_kits/fabric-console/filter-takeover.jsx":"68a2aef3fa24","ui_kits/fabric-console/filter-variants.jsx":"c4f6d2cb3581","ui_kits/fabric-console/kpi-cards.jsx":"51ac36b95135"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DSMSDesignSystem_197d77 = window.DSMSDesignSystem_197d77 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/chrome/Panel.jsx
try { (() => {
/**
 * Panel — the standard console card: hull surface, 1px conduit border, 4px
 * radius, no shadow. Optional header row with an eyebrow/title and trailing
 * actions, separated by a hairline rule.
 */
function Panel({
  title,
  eyebrow,
  actions,
  padded = true,
  children,
  style = {},
  bodyStyle = {}
}) {
  const hasHeader = title || eyebrow || actions;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--ds-bg-hull)",
      border: "1px solid var(--ds-line-conduit)",
      borderRadius: "var(--ds-radius-md)",
      overflow: "hidden",
      ...style
    }
  }, hasHeader && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "12px 16px",
      borderBottom: "1px solid var(--ds-line-conduit)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: "1 1 auto"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--ds-text-muted)",
      marginBottom: title ? 3 : 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--ds-font-display)",
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: "0.01em",
      color: "var(--ds-text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, title)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flex: "0 0 auto"
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: padded ? 16 : 0,
      flex: 1,
      minHeight: 0,
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/Panel.jsx", error: String((e && e.message) || e) }); }

// components/chrome/SectionHeader.jsx
try { (() => {
/**
 * SectionHeader — page/section heading. ALL-CAPS eyebrow above a display title,
 * with a 1px imperial underline beneath the title only. Optional trailing actions.
 */
function SectionHeader({
  eyebrow,
  title,
  actions,
  size = "md",
  // "sm" | "md" | "lg"
  style = {}
}) {
  const fs = {
    sm: 16,
    md: 20,
    lg: 26
  }[size];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: "1 1 auto"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--ds-text-muted)",
      marginBottom: 6
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      display: "inline-block",
      paddingBottom: 6,
      borderBottom: "1px solid var(--ds-accent-imperial)",
      fontFamily: "var(--ds-font-display)",
      fontSize: fs,
      fontWeight: 700,
      letterSpacing: "-0.005em",
      color: "var(--ds-text-primary)",
      lineHeight: 1.1,
      whiteSpace: "nowrap"
    }
  }, title)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      paddingBottom: 2
    }
  }, actions));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
/**
 * DataTable — dense console table. Header on the bay surface, hairline rows,
 * tabular numerics for numeric columns, row hover highlight. Columns may
 * supply a `render(row)` for conditional formatting (e.g. a StatusPill).
 */
function DataTable({
  columns = [],
  // [{ key, label, align?: "left"|"right", numeric?: bool, width?, render?: (row)=>node }]
  rows = [],
  rowKey = "id",
  dense = false,
  onRowClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(-1);
  const cellPad = dense ? "6px 12px" : "9px 12px";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--ds-line-conduit)",
      borderRadius: "var(--ds-radius-md)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--ds-font-body)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--ds-bg-bay)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || (c.numeric ? "right" : "left"),
      padding: "8px 12px",
      width: c.width,
      fontFamily: "var(--ds-font-display)",
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--ds-text-muted)",
      borderBottom: "1px solid var(--ds-line-conduit)",
      whiteSpace: "nowrap"
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row[rowKey] != null ? row[rowKey] : i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(-1),
    onClick: onRowClick ? () => onRowClick(row, i) : undefined,
    style: {
      background: hover === i ? "var(--ds-bg-bay)" : "transparent",
      cursor: onRowClick ? "pointer" : "default",
      transition: "background var(--ds-dur-fast) var(--ds-ease-standard)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || (c.numeric ? "right" : "left"),
      padding: cellPad,
      borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--ds-line-faint)",
      fontFamily: c.numeric ? "var(--ds-font-mono)" : "var(--ds-font-body)",
      fontVariantNumeric: c.numeric ? "tabular-nums" : "normal",
      letterSpacing: c.numeric ? "-0.01em" : "0",
      fontSize: 13,
      color: c.numeric ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
      whiteSpace: "nowrap"
    }
  }, c.render ? c.render(row) : row[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/Gauge.jsx
try { (() => {
/* polar point on the gauge arc (180° sweep, left→right) */
function pt(cx, cy, r, frac) {
  const a = Math.PI * (1 - frac); // frac 0 → 180° (left), 1 → 0° (right)
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}
function arc(cx, cy, r, f0, f1) {
  const [x0, y0] = pt(cx, cy, r, f0);
  const [x1, y1] = pt(cx, cy, r, f1);
  const large = f1 - f0 > 0.5 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/**
 * Gauge — semicircular coverage gauge. Reads as a warship dial: the value arc
 * is signal-coloured against a track, and turns negative below `redBelow`.
 * Built for "Subsidy Coverage %" (goes red below 70%).
 */
function Gauge({
  value = 0.94,
  // 0..1
  redBelow = 0.7,
  warnBelow = 0.85,
  label = "Coverage",
  size = 180,
  thickness = 12,
  style = {}
}) {
  const v = Math.max(0, Math.min(1, value));
  const pad = thickness / 2 + 3; // headroom so stroke + round caps never clip
  const cx = size / 2;
  const r = size / 2 - thickness / 2 - pad;
  const cy = pad + r + thickness / 2;
  const height = cy + thickness / 2 + pad;
  const color = v < redBelow ? "var(--ds-signal-negative)" : v < warnBelow ? "var(--ds-signal-warning)" : "var(--ds-signal-positive)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: height,
    viewBox: `0 0 ${size} ${height}`,
    style: {
      display: "block",
      overflow: "visible"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: arc(cx, cy, r, 0, 1),
    fill: "none",
    stroke: "var(--ds-bg-deck)",
    strokeWidth: thickness,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: arc(cx, cy, r, Math.max(0, redBelow - 0.004), redBelow + 0.004),
    fill: "none",
    stroke: "var(--ds-line-bright)",
    strokeWidth: thickness + 4
  }), /*#__PURE__*/React.createElement("path", {
    d: arc(cx, cy, r, 0, v || 0.0001),
    fill: "none",
    stroke: color,
    strokeWidth: thickness,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - 4,
    textAnchor: "middle",
    fill: "var(--ds-text-primary)",
    style: {
      fontFamily: "var(--ds-font-mono)",
      fontSize: size * 0.22,
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums"
    }
  }, Math.round(v * 100), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--ds-text-muted)",
      marginTop: -2
    }
  }, label));
}
Object.assign(__ds_scope, { Gauge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Gauge.jsx", error: String((e && e.message) || e) }); }

// components/data/Sparkline.jsx
try { (() => {
/**
 * Sparkline — compact SVG trend line with subtle area fill, optional min/max
 * dots and an end-value label. Pure SVG, no dependencies. Mirrors the DSMS
 * Vega sparkline spec (area 18% opacity, 1.5px line, max=positive/min=negative dots).
 */
function Sparkline({
  data = [],
  // array of numbers, chronological
  width = 200,
  height = 48,
  color = "var(--ds-signal-info)",
  fillOpacity = 0.16,
  strokeWidth = 1.5,
  showDots = true,
  showEndLabel = false,
  endLabel,
  // string override for the end label
  zero = false,
  // baseline at 0 vs auto-range
  style = {}
}) {
  const padX = 3;
  const padY = 5;
  const rightPad = showEndLabel ? 40 : padX;
  const n = data.length;
  if (n < 2) {
    return /*#__PURE__*/React.createElement("svg", {
      width: width,
      height: height,
      style: style
    });
  }
  const min = zero ? 0 : Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const innerW = width - padX - rightPad;
  const innerH = height - padY * 2;
  const x = i => padX + i / (n - 1) * innerW;
  const y = v => padY + (1 - (v - min) / span) * innerH;
  const linePath = data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L${x(n - 1).toFixed(2)},${(height - padY).toFixed(2)} L${x(0).toFixed(2)},${(height - padY).toFixed(2)} Z`;
  const maxIdx = data.indexOf(max);
  const minIdx = data.indexOf(min);
  const lastVal = data[n - 1];
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: "block",
      overflow: "visible",
      ...style
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: areaPath,
    fill: color,
    fillOpacity: fillOpacity,
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: linePath,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), showDots && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: x(maxIdx),
    cy: y(max),
    r: 2.6,
    fill: "var(--ds-signal-positive)",
    stroke: "var(--ds-bg-hull)",
    strokeWidth: 1
  }), /*#__PURE__*/React.createElement("circle", {
    cx: x(minIdx),
    cy: y(min),
    r: 2.6,
    fill: "var(--ds-signal-negative)",
    stroke: "var(--ds-bg-hull)",
    strokeWidth: 1
  })), showEndLabel && /*#__PURE__*/React.createElement("text", {
    x: x(n - 1) + 6,
    y: y(lastVal),
    dominantBaseline: "middle",
    fill: "var(--ds-text-secondary)",
    style: {
      fontFamily: "var(--ds-font-mono)",
      fontSize: 10,
      fontWeight: 600
    }
  }, endLabel != null ? endLabel : Math.round(lastVal).toLocaleString()));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusPill.jsx
try { (() => {
/**
 * StatusPill — compact status / risk tag. Used for vendor Risk Rating,
 * work-order status, stock status. Soft tint by default; `solid` for the
 * loudest critical states, `outline` for quiet ones.
 */
function StatusPill({
  children,
  status = "neutral",
  // "positive" | "negative" | "warning" | "info" | "neutral"
  variant = "soft",
  // "soft" | "solid" | "outline"
  dot = true,
  size = "md",
  // "sm" | "md"
  style = {}
}) {
  const map = {
    positive: {
      fg: "var(--ds-signal-positive)",
      dim: "var(--ds-signal-positive-dim)"
    },
    negative: {
      fg: "var(--ds-signal-negative)",
      dim: "var(--ds-signal-negative-dim)"
    },
    warning: {
      fg: "var(--ds-signal-warning)",
      dim: "var(--ds-signal-warning-dim)"
    },
    info: {
      fg: "var(--ds-signal-info)",
      dim: "var(--ds-signal-info-dim)"
    },
    neutral: {
      fg: "var(--ds-text-secondary)",
      dim: "var(--ds-bg-bay)"
    }
  };
  const c = map[status] || map.neutral;
  const s = size === "sm" ? {
    h: 18,
    px: 6,
    fs: 10,
    gap: 4,
    d: 5
  } : {
    h: 22,
    px: 8,
    fs: 11,
    gap: 5,
    d: 6
  };
  let bg = c.dim;
  let fg = c.fg;
  let border = "transparent";
  if (variant === "solid") {
    bg = c.fg;
    fg = status === "warning" ? "#1A1206" : "var(--ds-text-on-accent)";
  } else if (variant === "outline") {
    bg = "transparent";
    border = "color-mix(in srgb, " + "currentColor 40%, transparent)";
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: s.gap,
      height: s.h,
      padding: `0 ${s.px}px`,
      background: bg,
      color: fg,
      border: variant === "outline" ? `1px solid ${c.fg}` : `1px solid ${border}`,
      borderRadius: "var(--ds-radius-xs)",
      fontFamily: "var(--ds-font-display)",
      fontSize: s.fs,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.d,
      height: s.d,
      borderRadius: "999px",
      background: variant === "solid" ? fg : c.fg,
      flex: "0 0 auto"
    }
  }), children);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slicer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Slicer — single-select segmented control, the DSMS take on a Power BI / Fabric
 * slicer. A hairline-bordered track of segments; the active one takes the imperial
 * wash + a 2px accent underline. Use for year/range selection in the top bar.
 */
function Slicer({
  options = [],
  // [{ value, label }] or [string]
  value,
  // controlled selected value
  defaultValue,
  size = "md",
  // "sm" | "md"
  onChange,
  style = {},
  ...rest
}) {
  const norm = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue !== undefined ? defaultValue : norm[0] && norm[0].value);
  const selected = isControlled ? value : internal;
  const h = {
    sm: 28,
    md: 34
  }[size];
  const fs = {
    sm: 11.5,
    md: 12.5
  }[size];
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    style: {
      display: "inline-flex",
      alignItems: "stretch",
      height: h,
      padding: 2,
      gap: 2,
      background: "var(--ds-bg-deck)",
      border: "1px solid var(--ds-line-conduit)",
      borderRadius: "var(--ds-radius-xs)",
      ...style
    }
  }, rest), norm.map(o => {
    const on = o.value === selected;
    return /*#__PURE__*/React.createElement(Segment, {
      key: o.value,
      on: on,
      fs: fs,
      label: o.label,
      onClick: () => select(o.value)
    });
  }));
}
function Segment({
  on,
  fs,
  label,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "radio",
    "aria-checked": on,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 12px",
      background: on ? "var(--ds-accent-imperial-dim)" : hover ? "var(--ds-bg-bay)" : "transparent",
      border: "none",
      borderRadius: "var(--ds-radius-xs)",
      cursor: "pointer",
      color: on ? "var(--ds-text-primary)" : "var(--ds-text-muted)",
      fontFamily: "var(--ds-font-display)",
      fontSize: fs,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      transition: "background var(--ds-dur-fast) var(--ds-ease-standard), color var(--ds-dur-fast) var(--ds-ease-standard)"
    }
  }, label, on && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 8,
      right: 8,
      bottom: 2,
      height: 2,
      background: "var(--ds-accent-imperial)",
      borderRadius: 1
    }
  }));
}
Object.assign(__ds_scope, { Slicer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slicer.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — toggle control. Square-ish track (2px radius) in keeping with the
 * austere chrome; imperial red when on. Used for view options and filters.
 */
function Switch({
  checked,
  defaultChecked = false,
  disabled = false,
  label,
  onChange,
  style = {},
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      userSelect: "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    style: {
      position: "relative",
      width: 38,
      height: 20,
      padding: 0,
      flex: "0 0 auto",
      background: on ? "var(--ds-accent-imperial)" : "var(--ds-bg-deck)",
      border: `1px solid ${on ? "var(--ds-accent-imperial)" : "var(--ds-line-bright)"}`,
      borderRadius: "var(--ds-radius-xs)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--ds-dur-normal) var(--ds-ease-standard), border-color var(--ds-dur-normal) var(--ds-ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: on ? 20 : 2,
      width: 14,
      height: 14,
      background: on ? "var(--ds-text-on-accent)" : "var(--ds-text-secondary)",
      borderRadius: "1px",
      transition: "left var(--ds-dur-normal) var(--ds-ease-out)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-body)",
      fontSize: 13,
      color: "var(--ds-text-secondary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Icon.jsx
try { (() => {
/* kebab-case lucide name -> PascalCase key used by the UMD global */
function toPascal(name) {
  return String(name).split(/[-_]/).filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

/* lucide UMD attrs are kebab-case; React needs camelCase for a few */
function camelAttrs(attrs) {
  const out = {};
  for (const k in attrs) {
    const ck = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[ck] = attrs[k];
  }
  return out;
}

/**
 * Icon — schematic stroke glyph from the Lucide set (geometric, 2px stroke),
 * recoloured via `currentColor`. Renders inline SVG from the Lucide UMD global
 * (`window.lucide`), which must be loaded on the page:
 *   <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.js"></script>
 *
 * @example <Icon name="activity" size={18} />
 */
function Icon({
  name = "circle",
  size = 16,
  strokeWidth = 1.75,
  style = {},
  className
}) {
  const lucide = typeof window !== "undefined" ? window.lucide : null;
  const pascal = toPascal(name);
  let nodes = null;
  if (lucide) {
    const def = lucide.icons && lucide.icons[pascal] || lucide[pascal];
    // def may be the children array, or [tag, attrs, children]
    if (Array.isArray(def)) {
      nodes = Array.isArray(def[0]) ? def : def[2];
    }
  }
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: "img",
    "aria-label": name,
    className: className,
    style: {
      flex: "0 0 auto",
      display: "inline-block",
      ...style
    }
  }, nodes && nodes.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...camelAttrs(attrs || {})
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Icon.jsx", error: String((e && e.message) || e) }); }

// components/chrome/SidebarRail.jsx
try { (() => {
/**
 * SidebarRail — the persistent left navigation. Imperial seal mark at top,
 * a page list with an accent-stripe active state, and a system-status pill at
 * the bottom. Collapses to an icon-only rail.
 */
function SidebarRail({
  items = [],
  // [{ id, label, icon }]
  active,
  onSelect,
  collapsed = false,
  statusLabel = "Subsidy Coverage",
  statusValue = "94%",
  statusTone = "positive",
  // "positive" | "warning" | "negative"
  style = {}
}) {
  const width = collapsed ? 60 : 232;
  const toneColor = {
    positive: "var(--ds-signal-positive)",
    warning: "var(--ds-signal-warning)",
    negative: "var(--ds-signal-negative)"
  }[statusTone];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      width,
      flex: `0 0 ${width}px`,
      height: "100%",
      background: "var(--ds-bg-hull)",
      borderRight: "1px solid var(--ds-line-conduit)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: 56,
      padding: collapsed ? "0" : "0 16px",
      justifyContent: collapsed ? "center" : "flex-start",
      borderBottom: "1px solid var(--ds-line-conduit)"
    }
  }, /*#__PURE__*/React.createElement(Seal, {
    size: 28
  }), !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: "0.14em",
      color: "var(--ds-text-primary)"
    }
  }, "DSMS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 8.5,
      fontWeight: 600,
      letterSpacing: "0.22em",
      color: "var(--ds-text-faint)",
      marginTop: 3
    }
  }, "OPERATIONS CONSOLE"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: collapsed ? "8px 8px" : "8px 8px",
      overflowY: "auto"
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement(NavItem, {
      key: it.id,
      item: it,
      active: on,
      collapsed: collapsed,
      onClick: () => onSelect && onSelect(it.id)
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: collapsed ? 8 : 12,
      borderTop: "1px solid var(--ds-line-conduit)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      justifyContent: collapsed ? "center" : "flex-start",
      padding: collapsed ? "8px 0" : "8px 10px",
      background: "var(--ds-bg-deck)",
      border: "1px solid var(--ds-line-conduit)",
      borderRadius: "var(--ds-radius-xs)"
    },
    title: `${statusLabel} ${statusValue}`
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: toneColor,
      flex: "0 0 auto",
      boxShadow: `0 0 8px ${toneColor}`
    }
  }), !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--ds-text-muted)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, statusLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-mono)",
      fontSize: 14,
      fontWeight: 600,
      color: toneColor,
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1.2
    }
  }, statusValue)))));
}
function NavItem({
  item,
  active,
  collapsed,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    title: item.label,
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 11,
      width: "100%",
      height: 38,
      padding: collapsed ? 0 : "0 12px",
      justifyContent: collapsed ? "center" : "flex-start",
      marginBottom: 2,
      background: active ? "var(--ds-accent-imperial-dim)" : hover ? "var(--ds-bg-bay)" : "transparent",
      border: "none",
      borderRadius: "var(--ds-radius-xs)",
      cursor: "pointer",
      color: active ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
      transition: "background var(--ds-dur-fast) var(--ds-ease-standard)"
    }
  }, active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 7,
      bottom: 7,
      width: 2,
      background: "var(--ds-accent-imperial)",
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: active ? "var(--ds-accent-imperial-hi)" : "inherit",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: item.icon,
    size: 18
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-body)",
      fontSize: 13,
      fontWeight: active ? 600 : 500,
      letterSpacing: "0.01em",
      whiteSpace: "nowrap"
    }
  }, item.label));
}

/* Inline seal mark (matches assets/dsms-seal.svg) */
function Seal({
  size = 28
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    style: {
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 2 L43 13 L43 35 L24 46 L5 35 L5 13 Z",
    stroke: "var(--ds-accent-imperial)",
    strokeWidth: "1.6",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "13",
    stroke: "var(--ds-line-bright)",
    strokeWidth: "1",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "4.6",
    stroke: "var(--ds-accent-imperial)",
    strokeWidth: "1.6",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "1.7",
    fill: "var(--ds-accent-imperial)"
  }));
}
Object.assign(__ds_scope, { SidebarRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/SidebarRail.jsx", error: String((e && e.message) || e) }); }

// components/chrome/TopBar.jsx
try { (() => {
/**
 * TopBar — persistent page header: the page title, a "Filed under" breadcrumb,
 * and a slot on the right for the date-range selector and other controls.
 */
function TopBar({
  title,
  breadcrumb,
  // string or array of strings — "Filed under" path
  children,
  // right-aligned controls
  onToggleRail,
  style = {}
}) {
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : breadcrumb ? [breadcrumb] : [];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      height: 56,
      flex: "0 0 56px",
      padding: "0 20px",
      background: "var(--ds-bg-hull)",
      borderBottom: "1px solid var(--ds-line-conduit)",
      ...style
    }
  }, onToggleRail && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleRail,
    "aria-label": "Toggle navigation",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
      background: "transparent",
      border: "none",
      borderRadius: "var(--ds-radius-xs)",
      color: "var(--ds-text-muted)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "panel-left",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--ds-font-display)",
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: "0.01em",
      color: "var(--ds-text-primary)",
      lineHeight: 1.1,
      whiteSpace: "nowrap"
    }
  }, title), crumbs.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-body)",
      fontSize: 10.5,
      color: "var(--ds-text-faint)",
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    }
  }, "Filed under"), crumbs.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 11,
    style: {
      color: "var(--ds-text-faint)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-body)",
      fontSize: 11,
      color: "var(--ds-text-muted)"
    }
  }, c))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flex: "0 0 auto"
    }
  }, children));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/data/DeltaIndicator.jsx
try { (() => {
/**
 * DeltaIndicator — signed period-over-period change with a directional arrow,
 * coloured by signal. Set `invert` for metrics where down is good (e.g. expenses,
 * combat losses) so the colour reflects desirability, not direction.
 */
function DeltaIndicator({
  value = 0,
  // e.g. 0.064 for +6.4% (fraction) or a raw number
  format = "percent",
  // "percent" | "number" | "none"
  invert = false,
  size = "md",
  // "sm" | "md"
  showArrow = true,
  style = {}
}) {
  const up = value >= 0;
  const good = invert ? !up : up;
  const color = value === 0 ? "var(--ds-text-muted)" : good ? "var(--ds-signal-positive)" : "var(--ds-signal-negative)";
  let text;
  if (format === "percent") {
    text = `${up ? "+" : "−"}${Math.abs(value * 100).toFixed(1)}%`;
  } else if (format === "number") {
    text = `${up ? "+" : "−"}${Math.abs(value).toLocaleString()}`;
  } else {
    text = `${up ? "+" : "−"}${Math.abs(value)}`;
  }
  const fs = size === "sm" ? 11 : size === "lg" ? 15 : 12.5;
  const is = size === "sm" ? 12 : size === "lg" ? 17 : 14;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      color,
      fontFamily: "var(--ds-font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: fs,
      fontWeight: 600,
      letterSpacing: "-0.01em",
      ...style
    }
  }, showArrow && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: up ? "arrow-up-right" : "arrow-down-right",
    size: is,
    strokeWidth: 2.25
  }), text);
}
Object.assign(__ds_scope, { DeltaIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DeltaIndicator.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiTile.jsx
try { (() => {
/**
 * KpiTile — the signature briefing tile: an ALL-CAPS eyebrow label, a large
 * mono value, a YoY delta, and an optional 12-month sparkline. Composes
 * DeltaIndicator + Sparkline. Use in the KPI strip across the top of a page.
 */
function KpiTile({
  label,
  value,
  // preformatted string, e.g. "₡ 1.28B"
  unit,
  // optional small unit suffix
  delta,
  // number, e.g. 0.064 (fraction) — omit to hide
  deltaLabel = "YoY",
  deltaFormat = "percent",
  invertDelta = false,
  sparkData,
  // array of numbers — omit to hide
  sparkColor = "var(--ds-signal-info)",
  accent = false,
  // imperial accent stripe on the left edge
  style = {}
}) {
  // Accent stripe matches the variance (delta) colour.
  const up = (delta || 0) >= 0;
  const good = invertDelta ? !up : up;
  const stripeColor = delta == null || delta === 0 ? "var(--ds-accent-imperial)" : good ? "var(--ds-signal-positive)" : "var(--ds-signal-negative)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      background: "var(--ds-bg-hull)",
      border: "1px solid var(--ds-line-conduit)",
      borderRadius: "var(--ds-radius-md)",
      padding: "14px 16px 14px",
      overflow: "hidden",
      ...style
    }
  }, accent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 2,
      background: stripeColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--ds-text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: 30,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--ds-text-primary)",
      lineHeight: 1
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-mono)",
      fontSize: 13,
      color: "var(--ds-text-muted)"
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flex: "0 0 auto"
    }
  }, delta != null && /*#__PURE__*/React.createElement(__ds_scope.DeltaIndicator, {
    value: delta,
    format: deltaFormat,
    invert: invertDelta,
    size: "lg"
  }), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-body)",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--ds-text-secondary)"
    }
  }, deltaLabel)), sparkData && sparkData.length > 1 && /*#__PURE__*/React.createElement(__ds_scope.Sparkline, {
    data: sparkData,
    width: 180,
    height: 36,
    color: sparkColor,
    showDots: false,
    style: {
      flex: "0 0 50%",
      maxWidth: "50%"
    }
  })));
}
Object.assign(__ds_scope, { KpiTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KpiTile.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action control for the DSMS console.
 * Austere: 2px radius, flat fills, hairline borders, no drop shadow.
 */
function Button({
  children,
  variant = "secondary",
  // "primary" | "secondary" | "ghost" | "danger"
  size = "md",
  // "sm" | "md"
  icon,
  // optional lucide name, leading
  iconTrailing,
  // optional lucide name, trailing
  disabled = false,
  block = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      h: 28,
      px: 10,
      font: 12,
      gap: 6,
      icon: 14
    },
    md: {
      h: 34,
      px: 14,
      font: 13,
      gap: 7,
      icon: 16
    }
  }[size];
  const palettes = {
    primary: {
      bg: "var(--ds-accent-imperial)",
      bgHover: "var(--ds-accent-imperial-hi)",
      bgActive: "var(--ds-accent-imperial-lo)",
      fg: "var(--ds-text-on-accent)",
      border: "transparent"
    },
    danger: {
      bg: "var(--ds-accent-imperial)",
      bgHover: "var(--ds-accent-imperial-hi)",
      bgActive: "var(--ds-accent-imperial-lo)",
      fg: "var(--ds-text-on-accent)",
      border: "transparent"
    },
    secondary: {
      bg: "var(--ds-bg-bay)",
      bgHover: "var(--ds-bg-deck)",
      bgActive: "var(--ds-bg-hull)",
      fg: "var(--ds-text-primary)",
      border: "var(--ds-line-conduit)",
      borderHover: "var(--ds-line-bright)"
    },
    ghost: {
      bg: "transparent",
      bgHover: "var(--ds-bg-bay)",
      bgActive: "var(--ds-bg-hull)",
      fg: "var(--ds-text-secondary)",
      border: "transparent"
    }
  };
  const p = palettes[variant] || palettes.secondary;
  const bg = disabled ? "var(--ds-bg-hull)" : active ? p.bgActive : hover ? p.bgHover : p.bg;
  const borderColor = disabled ? "var(--ds-line-faint)" : hover && p.borderHover ? p.borderHover : p.border;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: block ? "flex" : "inline-flex",
      width: block ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: sizes.gap,
      height: sizes.h,
      padding: `0 ${sizes.px}px`,
      fontFamily: "var(--ds-font-display)",
      fontSize: sizes.font,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: disabled ? "var(--ds-text-faint)" : p.fg,
      background: bg,
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--ds-radius-xs)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--ds-dur-fast) var(--ds-ease-standard), border-color var(--ds-dur-fast) var(--ds-ease-standard)",
      whiteSpace: "nowrap",
      userSelect: "none",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: sizes.icon
  }), children, iconTrailing && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconTrailing,
    size: sizes.icon
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square icon-only control. Used in toolbars, table rows,
 * and the collapsed rail. Supports an `active` state with the imperial wash.
 */
function IconButton({
  icon = "circle",
  size = "md",
  // "sm" | "md"
  variant = "ghost",
  // "ghost" | "solid"
  active = false,
  disabled = false,
  title,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = {
    sm: 28,
    md: 34
  }[size];
  const iconSize = {
    sm: 15,
    md: 17
  }[size];
  let bg = "transparent";
  let fg = "var(--ds-text-secondary)";
  let border = "transparent";
  if (variant === "solid") {
    bg = "var(--ds-bg-bay)";
    border = "var(--ds-line-conduit)";
  }
  if (hover && !disabled) {
    bg = "var(--ds-bg-bay)";
    fg = "var(--ds-text-primary)";
  }
  if (active) {
    bg = "var(--ds-accent-imperial-dim)";
    fg = "var(--ds-accent-imperial-hi)";
    border = "transparent";
  }
  if (disabled) {
    fg = "var(--ds-text-faint)";
    bg = "transparent";
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    title: title,
    "aria-label": title || icon,
    "aria-pressed": active,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      color: fg,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: "var(--ds-radius-xs)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--ds-dur-fast) var(--ds-ease-standard), color var(--ds-dur-fast) var(--ds-ease-standard)",
      position: "relative",
      ...style
    }
  }, rest), active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 5,
      bottom: 5,
      width: 2,
      background: "var(--ds-accent-imperial)",
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — single-line text field for the console. Input well surface,
 * hairline border, 2px imperial focus inset. Optional leading icon.
 */
function Input({
  value,
  defaultValue,
  placeholder,
  icon,
  // optional leading lucide name
  type = "text",
  size = "md",
  // "sm" | "md"
  disabled = false,
  invalid = false,
  numeric = false,
  // mono + tabular figures
  onChange,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = {
    sm: 30,
    md: 36
  }[size];
  const borderColor = invalid ? "var(--ds-signal-negative)" : focus ? "var(--ds-accent-imperial)" : "var(--ds-line-conduit)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: h,
      padding: "0 10px",
      background: disabled ? "var(--ds-bg-hull)" : "var(--ds-bg-deck)",
      border: `1px solid ${borderColor}`,
      boxShadow: focus ? "inset 0 0 0 1px var(--ds-accent-imperial)" : "none",
      borderRadius: "var(--ds-radius-xs)",
      transition: "border-color var(--ds-dur-fast) var(--ds-ease-standard), box-shadow var(--ds-dur-fast) var(--ds-ease-standard)",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: focus ? "var(--ds-text-secondary)" : "var(--ds-text-muted)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  })), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      height: "100%",
      border: "none",
      outline: "none",
      background: "transparent",
      color: "var(--ds-text-primary)",
      fontFamily: numeric ? "var(--ds-font-mono)" : "var(--ds-font-body)",
      fontVariantNumeric: numeric ? "tabular-nums" : "normal",
      fontSize: size === "sm" ? 12 : 13,
      letterSpacing: numeric ? "-0.01em" : "0"
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — native dropdown styled for the console. Used heavily for the
 * date-range selector and filter controls in the top bar.
 */
function Select({
  value,
  defaultValue,
  options = [],
  // [{ value, label }] or [string]
  size = "md",
  // "sm" | "md"
  icon,
  // optional leading lucide name
  disabled = false,
  onChange,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = {
    sm: 30,
    md: 36
  }[size];
  const norm = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: h,
      padding: "0 8px 0 10px",
      background: disabled ? "var(--ds-bg-hull)" : "var(--ds-bg-deck)",
      border: `1px solid ${focus ? "var(--ds-accent-imperial)" : "var(--ds-line-conduit)"}`,
      boxShadow: focus ? "inset 0 0 0 1px var(--ds-accent-imperial)" : "none",
      borderRadius: "var(--ds-radius-xs)",
      transition: "border-color var(--ds-dur-fast) var(--ds-ease-standard)",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ds-text-muted)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  })), /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      border: "none",
      outline: "none",
      background: "transparent",
      color: "var(--ds-text-primary)",
      fontFamily: "var(--ds-font-body)",
      fontSize: size === "sm" ? 12 : 13,
      paddingRight: 18,
      cursor: disabled ? "not-allowed" : "pointer",
      height: "100%"
    }
  }, rest), norm.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value,
    style: {
      background: "var(--ds-bg-bay)",
      color: "var(--ds-text-primary)"
    }
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 8,
      color: "var(--ds-text-muted)",
      pointerEvents: "none",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 15
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/chrome/SlicerPane.jsx
try { (() => {
/**
 * SlicerPane — the docked, collapsible filter pane for the console. A hull
 * surface with a left imperial edge: a header with an active-filter count, a
 * stack of "basic" single-select slices (dropdowns), and a list of "detailed"
 * multi-select slices. Each detailed slice opens a POPOVER CARD over the dimmed
 * pane — a searchable, grouped checkbox list with select-all / clear. Collapses
 * to a 52px icon rail. Fully controllable (selection + collapsed) or self-driven.
 *
 *   <SlicerPane
 *     basics={[{ label:"Fiscal Year", icon:"calendar", value:"0 BBY", options:[...] }]}
 *     categories={[{ id:"products", label:"Products", icon:"package",
 *                    groups:[{ name:"Munitions", items:["Proton Torpedo", ...] }] }]}
 *     defaultSelection={{ products:["Proton Torpedo"] }}
 *     onOpenAll={() => openTakeover()}
 *   />
 */
function SlicerPane({
  title = "Filters",
  subtitle = "Slicer Pane",
  basics = [],
  // [{ label, icon?, value, options:[string|{value,label}] }]
  categories = [],
  // [{ id, label, icon, groups:[{ name, items:[string] }] }]
  selection,
  // controlled: { [catId]: string[] }
  defaultSelection,
  // uncontrolled initial selection
  onSelectionChange,
  collapsed,
  // controlled collapse
  defaultCollapsed = false,
  onCollapsedChange,
  onOpenAll,
  // optional — renders an "Open all" affordance on the detailed header
  width = 320,
  style = {}
}) {
  // ── selection state (controlled / uncontrolled) ───────────────────────
  const initSel = React.useMemo(() => {
    const base = {};
    categories.forEach(c => {
      base[c.id] = [];
    });
    return {
      ...base,
      ...(defaultSelection || {})
    };
  }, [categories, defaultSelection]);
  const selControlled = selection !== undefined;
  const [internalSel, setInternalSel] = React.useState(initSel);
  const sel = selControlled ? selection : internalSel;
  const commitSel = next => {
    const value = typeof next === "function" ? next(sel) : next;
    if (!selControlled) setInternalSel(value);
    onSelectionChange && onSelectionChange(value);
  };
  const selFor = id => sel[id] || [];

  // ── collapse state (controlled / uncontrolled) ────────────────────────
  const collControlled = collapsed !== undefined;
  const [internalColl, setInternalColl] = React.useState(defaultCollapsed);
  const isCollapsed = collControlled ? collapsed : internalColl;
  const setCollapsed = v => {
    if (!collControlled) setInternalColl(v);
    onCollapsedChange && onCollapsedChange(v);
  };
  const [pop, setPop] = React.useState(null); // open category id

  const toggle = (catId, it) => commitSel(s => {
    const a = s[catId] || [];
    return {
      ...s,
      [catId]: a.includes(it) ? a.filter(x => x !== it) : [...a, it]
    };
  });
  const setCat = (catId, arr) => commitSel(s => ({
    ...s,
    [catId]: arr
  }));
  const reset = () => commitSel(initSel);
  const catById = React.useMemo(() => Object.fromEntries(categories.map(c => [c.id, c])), [categories]);
  const detCount = categories.reduce((n, c) => n + selFor(c.id).length, 0);
  const activeCount = categories.filter(c => selFor(c.id).length > 0).length + basics.filter(b => b.value && !/^all\b/i.test(String(b.value))).length;

  // ── collapsed rail ─────────────────────────────────────────────────────
  if (isCollapsed) {
    return /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        width: 52,
        flex: "0 0 52px",
        height: "100%",
        padding: "12px 0",
        background: "var(--ds-bg-hull)",
        borderLeft: "3px solid var(--ds-accent-imperial)",
        ...style
      }
    }, /*#__PURE__*/React.createElement(RailButton, {
      icon: "panel-right-open",
      title: "Expand filters",
      onClick: () => setCollapsed(false)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(RailButton, {
      icon: "sliders-horizontal",
      title: `${activeCount} active filters`,
      onClick: () => setCollapsed(false),
      accent: true
    }), activeCount > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: -3,
        right: -3,
        minWidth: 16,
        height: 16,
        padding: "0 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ds-accent-imperial)",
        color: "var(--ds-text-on-accent)",
        borderRadius: 999,
        fontFamily: "var(--ds-font-mono)",
        fontSize: 9.5,
        fontWeight: 700,
        lineHeight: 1,
        border: "1.5px solid var(--ds-bg-hull)"
      }
    }, activeCount)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), categories.map(c => /*#__PURE__*/React.createElement(RailButton, {
      key: c.id,
      icon: c.icon,
      title: c.label,
      onClick: () => {
        setCollapsed(false);
      },
      on: selFor(c.id).length > 0
    })));
  }

  // ── expanded pane ───────────────────────────────────────────────────────
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width,
      flex: `0 0 ${width}px`,
      height: "100%",
      background: "var(--ds-bg-hull)",
      borderLeft: "3px solid var(--ds-accent-imperial)",
      fontFamily: "var(--ds-font-body)",
      color: "var(--ds-text-secondary)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: 52,
      padding: "0 8px 0 14px",
      borderBottom: "1px solid var(--ds-line-conduit)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ds-accent-imperial-hi)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sliders-horizontal",
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.06em",
      color: "var(--ds-text-primary)",
      lineHeight: 1.1
    }
  }, title.toUpperCase()), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 8.5,
      fontWeight: 600,
      letterSpacing: "0.2em",
      color: "var(--ds-text-faint)",
      marginTop: 2
    }
  }, subtitle.toUpperCase())), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-mono)",
      fontSize: 11,
      fontWeight: 600,
      color: "var(--ds-accent-imperial-hi)",
      background: "var(--ds-accent-imperial-dim)",
      padding: "3px 7px",
      borderRadius: "var(--ds-radius-xs)",
      fontVariantNumeric: "tabular-nums"
    }
  }, activeCount, " active"), /*#__PURE__*/React.createElement(RailButton, {
    icon: "panel-right-close",
    title: "Collapse filters",
    onClick: () => setCollapsed(true)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto"
    }
  }, basics.length > 0 && /*#__PURE__*/React.createElement(Block, {
    style: {
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    right: /*#__PURE__*/React.createElement(ResetLink, {
      onClick: reset
    })
  }, "Basic Slices"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 14px",
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, basics.map(b => /*#__PURE__*/React.createElement(BasicField, {
    key: b.label,
    f: b
  })))), basics.length > 0 && categories.length > 0 && /*#__PURE__*/React.createElement(Divider, null), categories.length > 0 && /*#__PURE__*/React.createElement(Block, null, /*#__PURE__*/React.createElement(SectionLabel, {
    right: onOpenAll ? /*#__PURE__*/React.createElement(OpenAllLink, {
      onClick: onOpenAll
    }) : undefined
  }, "Detailed Slices"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, categories.map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat.id
  }, /*#__PURE__*/React.createElement(DetailRow, {
    cat: cat,
    sel: selFor(cat.id),
    open: pop === cat.id,
    onClick: () => setPop(cat.id)
  }), selFor(cat.id).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 4px 2px"
    }
  }, /*#__PURE__*/React.createElement(Chips, {
    items: selFor(cat.id),
    max: 4,
    onRemove: it => toggle(cat.id, it)
  }))))))), /*#__PURE__*/React.createElement(FooterBar, {
    count: detCount,
    onReset: reset
  }), pop && catById[pop] && /*#__PURE__*/React.createElement(PopoverCard, {
    cat: catById[pop],
    sel: selFor(pop),
    onToggle: it => toggle(pop, it),
    setSel: arr => setCat(pop, arr),
    onClose: () => setPop(null)
  }));
}

/* ── helpers ─────────────────────────────────────────────────────────────── */
const totalItems = cat => cat.groups.reduce((n, g) => n + g.items.length, 0);
const summarize = (cat, arr) => {
  const n = arr.length,
    all = totalItems(cat);
  if (n === 0) return "None";
  if (n >= all) return "All " + all;
  return n + " selected";
};
function RailButton({
  icon,
  title,
  onClick,
  accent,
  on
}) {
  const [hover, setHover] = React.useState(false);
  const color = accent || on ? "var(--ds-accent-imperial-hi)" : hover ? "var(--ds-text-primary)" : "var(--ds-text-muted)";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: title,
    "aria-label": title,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 34,
      height: 34,
      border: "none",
      borderRadius: "var(--ds-radius-xs)",
      cursor: "pointer",
      color,
      background: hover || on ? "var(--ds-bg-bay)" : "transparent",
      transition: "background .12s, color .12s"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 17
  }));
}
function Divider() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--ds-line-conduit)",
      margin: "0 14px"
    }
  });
}
function Block({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 0 4px",
      ...style
    }
  }, children);
}
function SectionLabel({
  children,
  right,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      padding: "0 14px",
      marginBottom: 9,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--ds-text-muted)"
    }
  }, children), right);
}
function ResetLink({
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      border: "none",
      background: "transparent",
      color: hover ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-faint)",
      cursor: "pointer",
      fontFamily: "var(--ds-font-display)",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "rotate-ccw",
    size: 11
  }), " Reset");
}
function OpenAllLink({
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      border: "none",
      background: "transparent",
      color: hover ? "var(--ds-accent-imperial)" : "var(--ds-accent-imperial-hi)",
      cursor: "pointer",
      fontFamily: "var(--ds-font-display)",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "maximize-2",
    size: 11
  }), " Open all");
}
function BasicField({
  f
}) {
  const [v, setV] = React.useState(f.value);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 9.5,
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--ds-text-faint)"
    }
  }, f.label), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    size: "sm",
    value: v,
    icon: f.icon,
    options: f.options,
    onChange: e => setV(e.target.value),
    style: {
      width: "100%",
      display: "flex"
    }
  }));
}
function DetailRow({
  cat,
  sel,
  open,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const border = open || hover ? "var(--ds-line-bright)" : "var(--ds-line-conduit)";
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      width: "100%",
      padding: "11px 12px",
      border: "1px solid " + border,
      borderRadius: "var(--ds-radius-xs)",
      cursor: "pointer",
      background: open ? "var(--ds-bg-bay)" : "var(--ds-bg-deck)",
      color: "var(--ds-text-primary)",
      textAlign: "left",
      fontFamily: "var(--ds-font-body)",
      transition: "border-color .12s, background .12s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      width: 30,
      height: 30,
      borderRadius: "var(--ds-radius-xs)",
      background: "var(--ds-bg-hull)",
      border: "1px solid var(--ds-line-conduit)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--ds-accent-imperial-hi)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: cat.icon,
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ds-text-primary)",
      lineHeight: 1.2
    }
  }, cat.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--ds-font-mono)",
      fontSize: 10.5,
      color: sel.length ? "var(--ds-signal-info)" : "var(--ds-text-faint)",
      marginTop: 2,
      fontVariantNumeric: "tabular-nums"
    }
  }, summarize(cat, sel))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      color: "var(--ds-text-muted)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "square-arrow-out-up-right",
    size: 16
  })));
}
function Chips({
  items,
  onRemove,
  max
}) {
  const shown = max ? items.slice(0, max) : items;
  const extra = items.length - shown.length;
  if (!items.length) return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-body)",
      fontSize: 11.5,
      color: "var(--ds-text-faint)",
      fontStyle: "italic"
    }
  }, "Nothing selected");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5
    }
  }, shown.map(it => /*#__PURE__*/React.createElement("span", {
    key: it,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 6px 3px 8px",
      background: "var(--ds-bg-deck)",
      border: "1px solid var(--ds-line-conduit)",
      borderRadius: "var(--ds-radius-xs)",
      fontFamily: "var(--ds-font-body)",
      fontSize: 11,
      color: "var(--ds-text-secondary)",
      maxWidth: 150
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, it), onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(it),
    style: {
      display: "flex",
      border: "none",
      background: "transparent",
      color: "var(--ds-text-faint)",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 11
  })))), extra > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 7px",
      fontFamily: "var(--ds-font-mono)",
      fontSize: 11,
      color: "var(--ds-text-muted)",
      background: "var(--ds-bg-bay)",
      borderRadius: "var(--ds-radius-xs)"
    }
  }, "+", extra));
}
function CheckRow({
  label,
  on,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      width: "100%",
      padding: "6px 8px",
      border: "none",
      borderRadius: "var(--ds-radius-xs)",
      background: hover ? "var(--ds-bg-bay)" : "transparent",
      cursor: "pointer",
      color: on ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
      textAlign: "left",
      fontFamily: "var(--ds-font-body)",
      fontSize: 12.5,
      transition: "background .12s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      width: 15,
      height: 15,
      borderRadius: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: on ? "var(--ds-accent-imperial)" : "transparent",
      border: "1.5px solid " + (on ? "var(--ds-accent-imperial)" : "var(--ds-line-bright)"),
      color: "var(--ds-text-on-accent)",
      transition: "background .12s, border-color .12s"
    }
  }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 10,
    strokeWidth: 3.5
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, label));
}
function GroupedList({
  cat,
  sel,
  onToggle,
  query
}) {
  const q = (query || "").trim().toLowerCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, cat.groups.map(g => {
    const items = g.items.filter(it => !q || it.toLowerCase().includes(q));
    if (!items.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: g.name,
      style: {
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 9.5,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ds-text-faint)",
        padding: "6px 8px 4px"
      }
    }, g.name), items.map(it => /*#__PURE__*/React.createElement(CheckRow, {
      key: it,
      label: it,
      on: sel.includes(it),
      onClick: () => onToggle(it)
    })));
  }));
}
function ListTools({
  cat,
  sel,
  setSel
}) {
  const all = totalItems(cat);
  const allItems = cat.groups.flatMap(g => g.items);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2px 2px 8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-mono)",
      fontSize: 11,
      color: "var(--ds-text-muted)",
      fontVariantNumeric: "tabular-nums"
    }
  }, sel.length, " / ", all), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(MiniBtn, {
    onClick: () => setSel(allItems.slice())
  }, "All"), /*#__PURE__*/React.createElement(MiniBtn, {
    onClick: () => setSel([])
  }, "Clear")));
}
function MiniBtn({
  children,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      border: "1px solid " + (hover ? "var(--ds-line-bright)" : "var(--ds-line-conduit)"),
      background: "var(--ds-bg-bay)",
      color: hover ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
      cursor: "pointer",
      borderRadius: "var(--ds-radius-xs)",
      padding: "3px 9px",
      fontFamily: "var(--ds-font-display)",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      transition: "border-color .12s, color .12s"
    }
  }, children);
}
function FooterBar({
  count,
  onReset
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      padding: "12px 14px",
      borderTop: "1px solid var(--ds-line-conduit)",
      background: "var(--ds-bg-hull)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onReset,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      border: "1px solid var(--ds-line-conduit)",
      background: "transparent",
      color: "var(--ds-text-muted)",
      cursor: "pointer",
      borderRadius: "var(--ds-radius-xs)",
      padding: "0 12px",
      height: 32,
      fontFamily: "var(--ds-font-display)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "rotate-ccw",
    size: 13
  }), " Reset"), /*#__PURE__*/React.createElement("button", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      flex: 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      border: "none",
      background: hover ? "var(--ds-accent-imperial-hi)" : "var(--ds-accent-imperial)",
      color: "var(--ds-text-on-accent)",
      cursor: "pointer",
      borderRadius: "var(--ds-radius-xs)",
      height: 32,
      fontFamily: "var(--ds-font-display)",
      fontSize: 11.5,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, "Apply Filters ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--ds-font-mono)",
      opacity: 0.85
    }
  }, "\xB7 ", count)));
}
function PopoverCard({
  cat,
  sel,
  onToggle,
  setSel,
  onClose
}) {
  const [q, setQ] = React.useState("");
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 6,
      background: shown ? "rgba(8,9,11,.62)" : "rgba(8,9,11,0)",
      transition: "background .18s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxHeight: "82%",
      display: "flex",
      flexDirection: "column",
      background: "var(--ds-bg-bay)",
      border: "1px solid var(--ds-line-bright)",
      borderRadius: "var(--ds-radius-md)",
      boxShadow: "0 24px 60px rgba(0,0,0,.5)",
      overflow: "hidden",
      transform: shown ? "scale(1)" : "scale(.94)",
      opacity: shown ? 1 : 0,
      transition: "transform .18s cubic-bezier(.2,.7,.3,1), opacity .18s"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 10px 12px 14px",
      borderBottom: "1px solid var(--ds-line-conduit)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ds-accent-imperial-hi)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: cat.icon,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 13.5,
      fontWeight: 700,
      color: "var(--ds-text-primary)",
      lineHeight: 1.1
    }
  }, cat.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-mono)",
      fontSize: 10,
      color: "var(--ds-text-muted)",
      marginTop: 1
    }
  }, sel.length, " of ", totalItems(cat), " selected")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: popIconBtn
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 12px 4px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    size: "sm",
    icon: "search",
    placeholder: "Search " + cat.label.toLowerCase() + "…",
    value: q,
    onChange: e => setQ(e.target.value),
    style: {
      width: "100%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(ListTools, {
    cat: cat,
    sel: sel,
    setSel: setSel
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "0 10px 6px"
    }
  }, /*#__PURE__*/React.createElement(GroupedList, {
    cat: cat,
    sel: sel,
    query: q,
    onToggle: onToggle
  })), /*#__PURE__*/React.createElement("footer", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      gap: 10,
      padding: "10px 12px",
      borderTop: "1px solid var(--ds-line-conduit)",
      background: "var(--ds-bg-hull)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSel([]),
    style: popGhostBtn
  }, "Clear"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: popPrimaryBtn
  }, "Apply \xB7 ", sel.length))));
}
const popIconBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  border: "none",
  background: "transparent",
  color: "var(--ds-text-muted)",
  cursor: "pointer",
  borderRadius: "var(--ds-radius-xs)",
  flex: "0 0 auto"
};
const popPrimaryBtn = {
  flex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  border: "none",
  background: "var(--ds-accent-imperial)",
  color: "var(--ds-text-on-accent)",
  cursor: "pointer",
  borderRadius: "var(--ds-radius-xs)",
  height: 34,
  fontFamily: "var(--ds-font-display)",
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase"
};
const popGhostBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--ds-line-conduit)",
  background: "transparent",
  color: "var(--ds-text-muted)",
  cursor: "pointer",
  borderRadius: "var(--ds-radius-xs)",
  height: 34,
  padding: "0 16px",
  fontFamily: "var(--ds-font-display)",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase"
};
Object.assign(__ds_scope, { SlicerPane });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/SlicerPane.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/AppShell.jsx
try { (() => {
/* AppShell — composes the rail, top bar and the active screen into the console. */
(function () {
  const {
    SidebarRail,
    TopBar,
    Slicer,
    Button,
    IconButton
  } = window.DSMSDesignSystem_197d77;
  const S = window.DSMSScreens;
  const PAGES = [{
    id: "briefing",
    label: "Executive Briefing",
    icon: "layout-dashboard",
    title: "Imperial Executive Briefing",
    crumb: ["Finance", "P&L"],
    Screen: () => S.BriefingScreen
  }, {
    id: "ops",
    label: "Operations Command",
    icon: "git-branch",
    title: "Operations Command",
    crumb: ["Procurement", "Vendors"],
    Screen: () => S.OperationsScreen
  }, {
    id: "budget",
    label: "Budget Performance",
    icon: "gauge",
    title: "Budget Performance",
    crumb: ["Finance", "Budget"],
    Screen: () => S.BudgetScreen
  }, {
    id: "supply",
    label: "Supply Chain",
    icon: "boxes",
    title: "Supply Chain Status",
    crumb: ["Logistics", "Inventory"],
    Screen: () => S.SupplyScreen
  }, {
    id: "workforce",
    label: "Workforce",
    icon: "users",
    title: "Workforce & Personnel",
    crumb: ["Personnel", "Headcount"],
    Screen: () => S.WorkforceScreen
  }, {
    id: "maint",
    label: "Maintenance",
    icon: "wrench",
    title: "Maintenance & Reliability",
    crumb: ["Operations", "Work Orders"]
  }];
  function AppShell() {
    const [active, setActive] = React.useState("briefing");
    const [collapsed, setCollapsed] = React.useState(false);
    const page = PAGES.find(p => p.id === active);
    const Screen = page.Screen ? page.Screen() : null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "var(--ds-bg-void)",
        color: "var(--ds-text-secondary)",
        fontFamily: "var(--ds-font-body)"
      }
    }, /*#__PURE__*/React.createElement(SidebarRail, {
      items: PAGES,
      active: active,
      onSelect: setActive,
      collapsed: collapsed,
      statusLabel: "Subsidy Coverage",
      statusValue: "94%",
      statusTone: "positive"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(TopBar, {
      title: page.title,
      breadcrumb: page.crumb,
      onToggleRail: () => setCollapsed(c => !c)
    }, /*#__PURE__*/React.createElement(Slicer, {
      size: "sm",
      defaultValue: "2022",
      options: [{
        value: "2019",
        label: "2019"
      }, {
        value: "2020",
        label: "2020"
      }, {
        value: "2021",
        label: "2021"
      }, {
        value: "2022",
        label: "2022"
      }]
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "bell",
      title: "Alerts"
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: "download"
    }, "Export")), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        overflow: "auto",
        padding: 24,
        backgroundColor: "var(--ds-bg-void)",
        backgroundImage: "var(--ds-texture-grid)",
        backgroundSize: "var(--ds-texture-grid-size)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: "0 auto"
      }
    }, Screen ? /*#__PURE__*/React.createElement(Screen, null) : /*#__PURE__*/React.createElement(Placeholder, {
      title: page.title
    })))));
  }
  function Placeholder({
    title
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 400,
        gap: 10,
        color: "var(--ds-text-muted)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 14,
        letterSpacing: "0.16em",
        textTransform: "uppercase"
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--ds-text-faint)"
      }
    }, "Page reserved \u2014 not part of this UI-kit pass."));
  }
  window.DSMSApp = AppShell;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/BriefingScreen.jsx
try { (() => {
/* Executive Briefing (P&L) — the screen a Grand Moff reads first. */
(function () {
  function BriefingScreen() {
    // Read shared globals at RENDER time. In the compiled _ds_bundle.js these
    // (namespace primitives, DSMSCharts, DSMSData) are populated after this file
    // evaluates, so capturing them at module scope would grab undefined.
    const {
      Panel,
      KpiTile,
      SectionHeader,
      Gauge,
      StatusPill
    } = window.DSMSDesignSystem_197d77;
    const {
      ComboChart
    } = window.DSMSCharts;
    const D = window.DSMSData;
    const f = D.finance;
    const VarianceScatter = window.DSMSCharts.VarianceScatter;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      eyebrow: "Financial Posture \xB7 Ending 0 BBY",
      title: "Trailing Twelve Months"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12
      }
    }, f.kpis.map(k => /*#__PURE__*/React.createElement(KpiTile, {
      key: k.label,
      label: k.label,
      value: k.value,
      delta: k.delta,
      invertDelta: !!k.invert,
      accent: true,
      sparkData: k.spark,
      sparkColor: k.color
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: 14,
        alignItems: "stretch"
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Combat Losses vs Headcount Variance",
      eyebrow: "Are We Replenishing the Departments We're Losing?",
      actions: /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 14,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement(Lg, {
        color: "var(--ds-data-3)",
        label: "Combat Losses",
        square: true
      }), /*#__PURE__*/React.createElement(Lg, {
        color: "var(--ds-signal-info)",
        label: "Headcount \u25B2 vs LY",
        diamond: true
      }), /*#__PURE__*/React.createElement(Lg, {
        color: "var(--ds-signal-negative)",
        label: "Headcount \u25BC vs LY",
        diamond: true
      }))
    }, /*#__PURE__*/React.createElement(ComboChart, {
      data: D.workforce.combatDepts,
      height: 250
    })), /*#__PURE__*/React.createElement(Panel, {
      title: "Subsidy Coverage",
      eyebrow: "Subsidy Income / Total Expenses"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Gauge, {
      value: 0.94,
      redBelow: 0.9,
      warnBelow: 1.0,
      label: "Threshold 100%",
      size: 180
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 12,
        color: "var(--ds-text-muted)",
        textAlign: "center",
        lineHeight: 1.5,
        maxWidth: 220
      }
    }, "Subsidy covers ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ds-text-secondary)"
      }
    }, "\u20A1 8.55B"), " of ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ds-text-secondary)"
      }
    }, "\u20A1 9.10B"), " expenses. Swings month-to-month; red below 90%."), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        paddingTop: 12,
        borderTop: "1px solid var(--ds-line-faint)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 9.5,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ds-text-muted)",
        marginBottom: 9,
        textAlign: "center"
      }
    }, "Budget Compliance \xB7 24 Depts"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 7
      }
    }, /*#__PURE__*/React.createElement(StatusPill, {
      status: "positive",
      size: "sm"
    }, "On Budget ", D.budget.compliance.onBudget), /*#__PURE__*/React.createElement(StatusPill, {
      status: "warning",
      size: "sm"
    }, "At Risk ", D.budget.compliance.atRisk), /*#__PURE__*/React.createElement(StatusPill, {
      status: "negative",
      size: "sm"
    }, "Off Budget ", D.budget.compliance.offBudget)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: 14,
        alignItems: "stretch"
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Variance Scatter",
      eyebrow: "Income vs Expense Variance \xB7 sized by cost-driver weight"
    }, VarianceScatter ? /*#__PURE__*/React.createElement(VarianceScatter, {
      depts: D.budget.depts.filter(d => d.weight > 0),
      band: D.budget.bands,
      height: 360
    }) : null), /*#__PURE__*/React.createElement(Panel, {
      title: "Operating Posture",
      eyebrow: "Net Position"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Stat, {
      label: "Operating Margin",
      value: "12.3%",
      tone: "positive",
      note: "+0.9 pts YoY"
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Net Surplus",
      value: "\u20A1 1.28B",
      tone: "positive",
      note: "+6.4% YoY"
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Expense Growth",
      value: "6.1%",
      tone: "warning",
      note: "Outpacing income in Q4"
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Days Cash on Hand",
      value: "214",
      tone: "neutral",
      note: "Imperial reserve"
    })))));
  }
  function Lg({
    color,
    label,
    square,
    diamond
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, diamond ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        background: color,
        transform: "rotate(45deg)"
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        width: square ? 9 : 12,
        height: square ? 9 : 3,
        borderRadius: 1,
        background: color,
        opacity: square ? 0.6 : 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--ds-text-muted)"
      }
    }, label));
  }
  function Stat({
    label,
    value,
    tone,
    note
  }) {
    const c = {
      positive: "var(--ds-signal-positive)",
      warning: "var(--ds-signal-warning)",
      negative: "var(--ds-signal-negative)",
      neutral: "var(--ds-text-primary)"
    }[tone];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 12,
        paddingBottom: 12,
        borderBottom: "1px solid var(--ds-line-faint)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--ds-text-secondary)",
        whiteSpace: "nowrap"
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--ds-text-muted)",
        marginTop: 3
      }
    }, note)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 22,
        fontWeight: 600,
        color: c,
        fontVariantNumeric: "tabular-nums"
      }
    }, value));
  }
  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.BriefingScreen = BriefingScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/BriefingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/BudgetScreen.jsx
try { (() => {
/* Budget Performance — subsidy in, allocated by cost driver, spent (or not) per budget.
   Variance scatter + bullet matrix + cost-driver treemap + monthly variance ribbon.
   Registers on window.DSMSScreens.BudgetScreen. */
(function () {
  const {
    useState
  } = React;
  const AXIS = "var(--ds-text-muted)";
  const GRID = "var(--ds-line-faint)";
  const GOOD = "var(--ds-signal-positive)";
  const BAD = "var(--ds-signal-negative)";
  const fmtPct = (v, d = 1) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v * 100).toFixed(d) + "%";

  /* ---------------------------------------------------------------- *
   * Variance scatter — one dot per dept, sized by CostDriverWeight.   *
   * X = income variance %, Y = expense variance %. Quadrants + bands. *
   * ---------------------------------------------------------------- */
  function VarianceScatter({
    depts,
    band = 0.15,
    height = 380
  }) {
    const [hover, setHover] = useState(-1);
    const W = 720,
      H = height;
    const padL = 56,
      padR = 24,
      padT = 22,
      padB = 46;
    const innerW = W - padL - padR,
      innerH = H - padT - padB;
    const dom = 0.21; // ± domain
    const x = v => padL + (v + dom) / (2 * dom) * innerW;
    const y = v => padT + (1 - (v + dom) / (2 * dom)) * innerH;
    const x0 = x(0),
      y0 = y(0);
    const maxW = Math.max(...depts.map(d => d.weight));
    const r = w => 5 + Math.sqrt(w / maxW) * 17;
    const ticks = [-0.2, -0.1, 0, 0.1, 0.2];
    const quadrants = [{
      lbl: "Got more, spent more",
      ax: x0 + 8,
      ay: padT + 14,
      anchor: "start",
      fill: null
    }, {
      lbl: "Crisis",
      ax: padL + 8,
      ay: padT + 14,
      anchor: "start",
      fill: "var(--ds-signal-negative-dim)",
      rx: padL,
      ry: padT,
      rw: x0 - padL,
      rh: y0 - padT
    }, {
      lbl: "Surplus",
      ax: W - padR - 8,
      ay: H - padB - 10,
      anchor: "end",
      fill: "var(--ds-signal-positive-dim)",
      rx: x0,
      ry: y0,
      rw: W - padR - x0,
      rh: H - padB - y0
    }, {
      lbl: "Austere",
      ax: padL + 8,
      ay: H - padB - 10,
      anchor: "start",
      fill: null
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      style: {
        display: "block",
        overflow: "visible",
        height: "auto"
      },
      onMouseLeave: () => setHover(-1)
    }, quadrants.filter(q => q.fill).map((q, i) => /*#__PURE__*/React.createElement("rect", {
      key: "q" + i,
      x: q.rx,
      y: q.ry,
      width: q.rw,
      height: q.rh,
      fill: q.fill
    })), [-band, band].map((b, i) => /*#__PURE__*/React.createElement("g", {
      key: "b" + i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x(b),
      x2: x(b),
      y1: padT,
      y2: H - padB,
      stroke: "var(--ds-line-bright)",
      strokeWidth: "1",
      strokeDasharray: "2 4"
    }), /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: y(b),
      y2: y(b),
      stroke: "var(--ds-line-bright)",
      strokeWidth: "1",
      strokeDasharray: "2 4"
    }))), ticks.map((t, i) => /*#__PURE__*/React.createElement("g", {
      key: "t" + i
    }, /*#__PURE__*/React.createElement("text", {
      x: x(t),
      y: H - padB + 16,
      textAnchor: "middle",
      fill: AXIS,
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 9.5
      }
    }, fmtPct(t, 0)), /*#__PURE__*/React.createElement("text", {
      x: padL - 8,
      y: y(t) + 3,
      textAnchor: "end",
      fill: AXIS,
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 9.5
      }
    }, fmtPct(t, 0)))), /*#__PURE__*/React.createElement("line", {
      x1: x0,
      x2: x0,
      y1: padT,
      y2: H - padB,
      stroke: "var(--ds-line-conduit)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: y0,
      y2: y0,
      stroke: "var(--ds-line-conduit)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: (padL + W - padR) / 2,
      y: H - 6,
      textAnchor: "middle",
      fill: "var(--ds-text-faint)",
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.16em"
      }
    }, "INCOME VARIANCE  \xB7  UNDER-FUNDED \u2190 \u2192 OVER-FUNDED"), /*#__PURE__*/React.createElement("text", {
      transform: `translate(13 ${(padT + H - padB) / 2}) rotate(-90)`,
      textAnchor: "middle",
      fill: "var(--ds-text-faint)",
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.16em"
      }
    }, "EXPENSE VARIANCE  \xB7  UNDER \u2190 \u2192 OVER-SPENT"), quadrants.map((q, i) => /*#__PURE__*/React.createElement("text", {
      key: "ql" + i,
      x: q.ax,
      y: q.ay,
      textAnchor: q.anchor,
      fill: q.fill ? q.lbl === "Crisis" ? BAD : GOOD : "var(--ds-text-faint)",
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity: q.fill ? 0.9 : 0.6
      }
    }, q.lbl)), depts.map((d, i) => {
      const crisis = d.incomeVar < 0 && d.expenseVar > 0;
      const surplus = d.incomeVar > 0 && d.expenseVar < 0;
      const c = crisis ? BAD : surplus ? GOOD : "var(--ds-signal-info)";
      const on = hover === i;
      return /*#__PURE__*/React.createElement("g", {
        key: d.key,
        onMouseEnter: () => setHover(i),
        style: {
          cursor: "default"
        }
      }, /*#__PURE__*/React.createElement("circle", {
        cx: x(d.incomeVar),
        cy: y(d.expenseVar),
        r: r(d.weight),
        fill: c,
        fillOpacity: on ? 0.4 : 0.2,
        stroke: c,
        strokeWidth: on ? 2 : 1.4
      }), (on || d.weight >= 90) && /*#__PURE__*/React.createElement("text", {
        x: x(d.incomeVar),
        y: y(d.expenseVar) - r(d.weight) - 4,
        textAnchor: "middle",
        fill: on ? "var(--ds-text-primary)" : "var(--ds-text-muted)",
        style: {
          fontFamily: "var(--ds-font-body)",
          fontSize: 10,
          fontWeight: on ? 600 : 500
        }
      }, d.short));
    })), hover >= 0 && /*#__PURE__*/React.createElement(ScatterTip, {
      d: depts[hover]
    }));
  }
  function ScatterTip({
    d
  }) {
    const D = window.DSMSData;
    const Row = ({
      k,
      v,
      c
    }) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ds-text-muted)"
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        color: c || "var(--ds-text-primary)",
        fontVariantNumeric: "tabular-nums"
      }
    }, v));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 232,
        padding: "11px 13px",
        background: "var(--ds-bg-void)",
        border: "1px solid var(--ds-line-bright)",
        borderRadius: "var(--ds-radius-sm)",
        boxShadow: "var(--ds-shadow-popover)",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        fontSize: 11.5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 13,
        fontWeight: 700,
        color: "var(--ds-text-primary)"
      }
    }, d.dept), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: "var(--ds-text-muted)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        marginBottom: 4
      }
    }, d.division, " \xB7 weight ", d.weight), /*#__PURE__*/React.createElement(Row, {
      k: "Income var",
      v: fmtPct(d.incomeVar),
      c: d.incomeVar >= 0 ? GOOD : BAD
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Expense var",
      v: fmtPct(d.expenseVar),
      c: d.expenseVar <= 0 ? GOOD : BAD
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Allocated",
      v: D.fmtCredits(d.allocation)
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Spent",
      v: D.fmtCredits(d.expenseActual)
    }));
  }

  /* ---------------------------------------------------------------- *
   * Bullet — actual measure bar vs target marker, ±band behind.       *
   * ---------------------------------------------------------------- */
  function Bullet({
    actual,
    target,
    varc,
    goodWhenUnder,
    band = 0.15
  }) {
    const good = goodWhenUnder ? actual <= target : actual >= target;
    const fill = good ? GOOD : BAD;
    const max = Math.max(actual, target) * 1.18;
    const pct = v => `${Math.max(0, Math.min(100, v / max * 100))}%`;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 18,
        background: "var(--ds-bg-deck)",
        borderRadius: 1,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: pct(target * (1 - band)),
        width: `calc(${pct(target * (1 + band))} - ${pct(target * (1 - band))})`,
        top: 0,
        bottom: 0,
        background: "var(--ds-bg-bay)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 4,
        height: 10,
        width: pct(actual),
        background: fill,
        opacity: 0.92,
        borderRadius: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: pct(target),
        top: 1,
        bottom: 1,
        width: 2,
        background: "var(--ds-text-primary)"
      },
      title: "Budget target"
    }));
  }
  function BulletRow({
    d
  }) {
    const cell = {
      fontFamily: "var(--ds-font-mono)",
      fontSize: 11,
      fontVariantNumeric: "tabular-nums",
      textAlign: "right",
      whiteSpace: "nowrap"
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "138px 1fr 58px 1fr 58px",
        alignItems: "center",
        gap: 12,
        padding: "7px 0",
        borderBottom: "1px solid var(--ds-line-faint)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--ds-text-secondary)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, d.dept), /*#__PURE__*/React.createElement(Bullet, {
      actual: d.allocation,
      target: d.incomeBudget,
      varc: d.incomeVar,
      goodWhenUnder: false
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        ...cell,
        color: d.incomeVar >= 0 ? GOOD : BAD
      }
    }, fmtPct(d.incomeVar)), /*#__PURE__*/React.createElement(Bullet, {
      actual: d.expenseActual,
      target: d.expenseBudget,
      varc: d.expenseVar,
      goodWhenUnder: true
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        ...cell,
        color: d.expenseVar <= 0 ? GOOD : BAD
      }
    }, fmtPct(d.expenseVar)));
  }
  function BulletMatrix({
    depts
  }) {
    const sorted = [...depts].filter(d => d.weight > 0).sort((a, b) => b.expenseVar - a.expenseVar);
    const head = {
      fontFamily: "var(--ds-font-display)",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--ds-text-muted)"
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "138px 1fr 58px 1fr 58px",
        alignItems: "end",
        gap: 12,
        paddingBottom: 8,
        borderBottom: "1px solid var(--ds-line-conduit)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: head
    }, "Department"), /*#__PURE__*/React.createElement("span", {
      style: head
    }, "Income \xB7 allocation vs budget"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...head,
        textAlign: "right"
      }
    }, "Var"), /*#__PURE__*/React.createElement("span", {
      style: head
    }, "Expense \xB7 actual vs budget"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...head,
        textAlign: "right"
      }
    }, "Var")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: 372,
        overflowY: "auto",
        paddingRight: 4
      }
    }, sorted.map(d => /*#__PURE__*/React.createElement(BulletRow, {
      key: d.key,
      d: d
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 18,
        marginTop: 12,
        alignItems: "center",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Lg, {
      swatch: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 2,
          height: 12,
          background: "var(--ds-text-primary)"
        }
      }),
      label: "Budget target"
    }), /*#__PURE__*/React.createElement(Lg, {
      swatch: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 14,
          height: 6,
          borderRadius: 1,
          background: "var(--ds-bg-bay)",
          border: "1px solid var(--ds-line-bright)"
        }
      }),
      label: "\xB115% band"
    }), /*#__PURE__*/React.createElement(Lg, {
      swatch: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 12,
          height: 9,
          borderRadius: 1,
          background: GOOD
        }
      }),
      label: "On / under target"
    }), /*#__PURE__*/React.createElement(Lg, {
      swatch: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 12,
          height: 9,
          borderRadius: 1,
          background: BAD
        }
      }),
      label: "Off target"
    })));
  }

  /* ---------------------------------------------------------------- *
   * Cost-driver treemap — rect per dept, size = weight, colour = net  *
   * surplus vs budget (diverging red↔green centred on zero).          *
   * ---------------------------------------------------------------- */
  function squarify(items, x, y, w, h) {
    // items: [{value, ...}] sorted desc. returns rects [{x,y,w,h,...}]
    const out = [];
    let nodes = items.slice();
    let area = {
      x,
      y,
      w,
      h
    };
    const total = nodes.reduce((a, n) => a + n.value, 0);
    let scale = w * h / total;
    nodes = nodes.map(n => ({
      ...n,
      area: n.value * scale
    }));
    function worst(row, len) {
      const sum = row.reduce((a, n) => a + n.area, 0);
      const max = Math.max(...row.map(n => n.area));
      const min = Math.min(...row.map(n => n.area));
      return Math.max(len * len * max / (sum * sum), sum * sum / (len * len * min));
    }
    function layoutRow(row, len, horizontal, a) {
      const sum = row.reduce((acc, n) => acc + n.area, 0);
      const thick = sum / len;
      let pos = horizontal ? a.y : a.x;
      row.forEach(n => {
        const cellLen = n.area / thick;
        if (horizontal) {
          out.push({
            ...n,
            x: a.x,
            y: pos,
            w: thick,
            h: cellLen
          });
          pos += cellLen;
        } else {
          out.push({
            ...n,
            x: pos,
            y: a.y,
            w: cellLen,
            h: thick
          });
          pos += cellLen;
        }
      });
      if (horizontal) {
        a.x += thick;
        a.w -= thick;
      } else {
        a.y += thick;
        a.h -= thick;
      }
    }
    let row = [];
    while (nodes.length) {
      const horizontal = area.w < area.h;
      const len = horizontal ? area.h : area.w;
      const next = nodes[0];
      if (row.length === 0 || worst(row, len) >= worst([...row, next], len)) {
        row.push(next);
        nodes.shift();
      } else {
        layoutRow(row, len, horizontal, area);
        row = [];
      }
    }
    if (row.length) layoutRow(row, area.w < area.h ? area.h : area.w, area.w < area.h, area);
    return out;
  }
  function Treemap({
    depts,
    height = 320
  }) {
    const D = window.DSMSData;
    const [hover, setHover] = useState(-1);
    const W = 720,
      H = height;
    const items = depts.filter(d => d.weight > 0).sort((a, b) => b.weight - a.weight).map(d => ({
      value: d.weight,
      d
    }));
    const rects = squarify(items, 0, 0, W, H);
    const maxNet = Math.max(...items.map(i => Math.abs(i.d.netVsBudget))) || 1;
    const colorFor = net => {
      const t = Math.max(-1, Math.min(1, net / maxNet));
      if (t >= 0) return `color-mix(in oklab, var(--ds-signal-positive) ${20 + t * 55}%, var(--ds-bg-deck))`;
      return `color-mix(in oklab, var(--ds-signal-negative) ${20 + -t * 55}%, var(--ds-bg-deck))`;
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      height: H,
      style: {
        display: "block"
      },
      onMouseLeave: () => setHover(-1)
    }, rects.map((rt, i) => {
      const d = rt.d;
      const big = rt.w > 92 && rt.h > 38;
      const med = rt.w > 60 && rt.h > 24;
      const on = hover === i;
      return /*#__PURE__*/React.createElement("g", {
        key: d.key,
        onMouseEnter: () => setHover(i),
        style: {
          cursor: "default"
        }
      }, /*#__PURE__*/React.createElement("rect", {
        x: rt.x + 1,
        y: rt.y + 1,
        width: Math.max(0, rt.w - 2),
        height: Math.max(0, rt.h - 2),
        fill: colorFor(d.netVsBudget),
        stroke: on ? "var(--ds-text-primary)" : "var(--ds-line-conduit)",
        strokeWidth: on ? 1.5 : 1,
        rx: "2"
      }), med && /*#__PURE__*/React.createElement("text", {
        x: rt.x + 9,
        y: rt.y + 18,
        fill: "var(--ds-text-primary)",
        style: {
          fontFamily: "var(--ds-font-display)",
          fontSize: big ? 12 : 10.5,
          fontWeight: 600
        }
      }, big ? d.dept : d.short), big && /*#__PURE__*/React.createElement("text", {
        x: rt.x + 9,
        y: rt.y + 34,
        fill: "var(--ds-text-secondary)",
        style: {
          fontFamily: "var(--ds-font-mono)",
          fontSize: 10.5
        }
      }, D.fmtCredits(d.allocation)));
    })), hover >= 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 8,
        left: 8,
        padding: "9px 12px",
        background: "var(--ds-bg-void)",
        border: "1px solid var(--ds-line-bright)",
        borderRadius: "var(--ds-radius-sm)",
        boxShadow: "var(--ds-shadow-popover)",
        pointerEvents: "none",
        fontSize: 11.5,
        display: "flex",
        flexDirection: "column",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontWeight: 700,
        color: "var(--ds-text-primary)",
        fontSize: 12.5
      }
    }, rects[hover].d.dept), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ds-text-muted)"
      }
    }, "Allocation ", D.fmtCredits(rects[hover].d.allocation), " \xB7 weight ", rects[hover].d.weight), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        color: rects[hover].d.netVsBudget >= 0 ? GOOD : BAD
      }
    }, "Net vs budget ", rects[hover].d.netVsBudget >= 0 ? "+" : "−", D.fmtCredits(Math.abs(rects[hover].d.netVsBudget)).replace("₡ ", "₡ "))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        color: "var(--ds-text-muted)",
        fontFamily: "var(--ds-font-display)",
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }
    }, "Net vs budget"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: BAD
      }
    }, "Deficit"), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        maxWidth: 220,
        height: 8,
        borderRadius: 2,
        background: "linear-gradient(90deg, var(--ds-signal-negative), var(--ds-bg-deck), var(--ds-signal-positive))"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: GOOD
      }
    }, "Surplus")));
  }

  /* ---------------------------------------------------------------- *
   * Monthly variance ribbon — small multiples by division group.      *
   * ---------------------------------------------------------------- */
  function RibbonRow({
    group,
    values,
    band = 0.15
  }) {
    const W = 620,
      H = 56,
      padL = 4,
      padR = 4,
      padT = 8,
      padB = 8;
    const innerW = W - padL - padR,
      innerH = H - padT - padB;
    const dom = 0.35;
    const x = i => padL + i / (values.length - 1) * innerW;
    const y = v => padT + (1 - (v + dom) / (2 * dom)) * innerH;
    const path = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    const breaches = values.filter(v => Math.abs(v) > band).length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "172px 1fr 54px",
        alignItems: "center",
        gap: 12,
        padding: "4px 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--ds-text-secondary)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, group), /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      height: H,
      preserveAspectRatio: "none",
      style: {
        display: "block",
        background: "var(--ds-bg-deck)",
        borderRadius: 2
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: padL,
      y: y(band),
      width: innerW,
      height: y(-band) - y(band),
      fill: "var(--ds-signal-positive-dim)"
    }), /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: y(0),
      y2: y(0),
      stroke: "var(--ds-line-bright)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: y(band),
      y2: y(band),
      stroke: "var(--ds-line-conduit)",
      strokeWidth: "1",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: y(-band),
      y2: y(-band),
      stroke: "var(--ds-line-conduit)",
      strokeWidth: "1",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("path", {
      d: path,
      fill: "none",
      stroke: "var(--ds-signal-info)",
      strokeWidth: "1.75",
      strokeLinejoin: "round",
      vectorEffect: "non-scaling-stroke"
    }), values.map((v, i) => Math.abs(v) > band ? /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: x(i),
      cy: y(v),
      r: "3",
      fill: BAD
    }) : null)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 11,
        textAlign: "right",
        color: breaches > 0 ? BAD : "var(--ds-text-muted)",
        fontVariantNumeric: "tabular-nums"
      }
    }, breaches, " \u2691"));
  }

  /* Single-dept timeline: monthly actual vs budget (income + expense). */
  function DeptTimeline({
    d
  }) {
    const D = window.DSMSData;
    const months = D.months;
    // synthesise monthly series from annual totals with a rising 0-BBY curve
    const curve = [0.072, 0.074, 0.077, 0.079, 0.081, 0.083, 0.084, 0.085, 0.086, 0.089, 0.094, 0.096];
    const cs = curve.reduce((a, b) => a + b, 0);
    const mInc = curve.map(c => c / cs * d.allocation);
    const mIncB = curve.map(c => c / cs * d.incomeBudget);
    const mExp = curve.map(c => c / cs * d.expenseActual);
    const mExpB = curve.map(c => c / cs * d.expenseBudget);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(ActualVsBudget, {
      title: "Income \xB7 allocation vs budget",
      actual: mInc,
      budget: mIncB,
      months: months,
      barColor: "var(--ds-signal-info)",
      goodWhenUnder: false
    }), /*#__PURE__*/React.createElement(ActualVsBudget, {
      title: "Expense \xB7 actual vs budget",
      actual: mExp,
      budget: mExpB,
      months: months,
      barColor: "var(--ds-data-5)",
      goodWhenUnder: true
    }));
  }
  function ActualVsBudget({
    title,
    actual,
    budget,
    months,
    barColor,
    goodWhenUnder
  }) {
    const D = window.DSMSData;
    const W = 360,
      H = 200,
      padL = 44,
      padR = 10,
      padT = 16,
      padB = 24;
    const innerW = W - padL - padR,
      innerH = H - padT - padB;
    const max = Math.max(...actual, ...budget) * 1.1;
    const n = actual.length;
    const band = innerW / n;
    const cx = i => padL + band * (i + 0.5);
    const y = v => padT + (1 - v / max) * innerH;
    const colW = band * 0.5;
    const bPath = budget.map((v, i) => `${i === 0 ? "M" : "L"}${cx(i)},${y(v)}`).join(" ");
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--ds-text-muted)",
        marginBottom: 6
      }
    }, title), /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      height: H,
      style: {
        display: "block",
        overflow: "visible"
      }
    }, [0, 0.5, 1].map((t, i) => /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: y(max * t),
      y2: y(max * t),
      stroke: GRID
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 6,
      y: y(max * t) + 3,
      textAnchor: "end",
      fill: AXIS,
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 9
      }
    }, D.fmtCredits(max * t)))), actual.map((v, i) => {
      const good = goodWhenUnder ? v <= budget[i] : v >= budget[i];
      return /*#__PURE__*/React.createElement("rect", {
        key: i,
        x: cx(i) - colW / 2,
        y: y(v),
        width: colW,
        height: y(0) - y(v),
        fill: good ? GOOD : BAD,
        opacity: "0.55",
        rx: "1"
      });
    }), /*#__PURE__*/React.createElement("path", {
      d: bPath,
      fill: "none",
      stroke: "var(--ds-text-primary)",
      strokeWidth: "1.75",
      strokeDasharray: "4 3"
    }), months.map((m, i) => i % 2 === 0 ? /*#__PURE__*/React.createElement("text", {
      key: i,
      x: cx(i),
      y: H - 8,
      textAnchor: "middle",
      fill: AXIS,
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 8.5
      }
    }, m) : null)));
  }
  function Lg({
    swatch,
    label,
    color
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, swatch || /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 1,
        background: color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--ds-text-muted)"
      }
    }, label));
  }

  /* ---------------------------------------------------------------- *
   * Screen                                                            *
   * ---------------------------------------------------------------- */
  function BudgetScreen() {
    // Globals read at render time (see note in BriefingScreen.jsx).
    const {
      Panel,
      SectionHeader,
      KpiTile,
      StatusPill,
      Select
    } = window.DSMSDesignSystem_197d77;
    const D = window.DSMSData;
    const b = D.budget;
    const [dept, setDept] = useState("all");
    const deptOpts = [{
      value: "all",
      label: "All divisions"
    }, ...b.depts.filter(d => d.weight > 0).map(d => ({
      value: String(d.key),
      label: d.dept
    }))];
    const selected = dept === "all" ? null : b.depts.find(d => String(d.key) === dept);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      eyebrow: "Subsidy \xB7 Allocation \xB7 Variance",
      title: "Budget Performance"
    }), /*#__PURE__*/React.createElement("section", {
      "data-section": "budget-kpis",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 12
      }
    }, b.kpis.map(k => /*#__PURE__*/React.createElement("div", {
      key: k.label,
      "data-visual": "kpi-" + k.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      "data-type": "kpi-card"
    }, /*#__PURE__*/React.createElement(KpiTile, {
      label: k.label,
      value: k.danger ? /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ds-signal-negative)"
        }
      }, k.value) : k.value,
      unit: k.unit,
      delta: k.delta,
      deltaFormat: k.deltaFormat || "percent",
      invertDelta: !!k.invert,
      accent: true,
      sparkData: k.spark,
      sparkColor: k.color,
      style: {
        height: "100%"
      }
    })))), /*#__PURE__*/React.createElement("section", {
      "data-section": "budget-variance"
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Variance Scatter",
      eyebrow: "Income vs Expense Variance \xB7 sized by cost-driver weight",
      actions: /*#__PURE__*/React.createElement(StatusPill, {
        status: "negative",
        size: "sm"
      }, "3 in crisis")
    }, /*#__PURE__*/React.createElement("div", {
      "data-visual": "variance-scatter",
      "data-type": "scatter"
    }, /*#__PURE__*/React.createElement(VarianceScatter, {
      depts: b.depts.filter(d => d.weight > 0),
      band: b.bands
    })))), /*#__PURE__*/React.createElement("section", {
      "data-section": "budget-bullets"
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Budget vs Actual by Department",
      eyebrow: "Sorted by expense variance \u2014 worst first"
    }, /*#__PURE__*/React.createElement("div", {
      "data-visual": "bullet-matrix",
      "data-type": "bullet"
    }, /*#__PURE__*/React.createElement(BulletMatrix, {
      depts: b.depts
    })))), /*#__PURE__*/React.createElement("section", {
      "data-section": "budget-treemap"
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Cost-Driver Treemap",
      eyebrow: "Size = weight \xB7 Colour = net surplus vs budget"
    }, /*#__PURE__*/React.createElement("div", {
      "data-visual": "cost-driver-treemap",
      "data-type": "treemap"
    }, /*#__PURE__*/React.createElement(Treemap, {
      depts: b.depts
    })))), /*#__PURE__*/React.createElement("section", {
      "data-section": "budget-monthly"
    }, /*#__PURE__*/React.createElement(Panel, {
      title: selected ? selected.dept + " — Monthly Timeline" : "Monthly Expense Variance",
      eyebrow: selected ? "Actual vs budget · trailing 12 months" : "Expense variance % by division group · ±15% band",
      actions: /*#__PURE__*/React.createElement(Select, {
        size: "sm",
        value: dept,
        onChange: e => setDept(e.target.value),
        options: deptOpts,
        icon: "filter"
      })
    }, selected ? /*#__PURE__*/React.createElement("div", {
      "data-visual": "dept-monthly-timeline",
      "data-type": "bar-grouped"
    }, /*#__PURE__*/React.createElement(DeptTimeline, {
      d: selected
    })) : /*#__PURE__*/React.createElement("div", {
      "data-visual": "monthly-variance-ribbon",
      "data-type": "line"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "172px 1fr 54px",
        gap: 12,
        paddingBottom: 6,
        borderBottom: "1px solid var(--ds-line-conduit)",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--ds-text-muted)"
      }
    }, "Division Group"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, D.months.filter((_, i) => i % 2 === 0).map(m => /*#__PURE__*/React.createElement("span", {
      key: m,
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 9,
        color: "var(--ds-text-faint)"
      }
    }, m))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--ds-text-muted)",
        textAlign: "right"
      }
    }, "Breach")), b.ribbon.map(r => /*#__PURE__*/React.createElement(RibbonRow, {
      key: r.group,
      group: r.group,
      values: r.values,
      band: b.bands
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 18,
        marginTop: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Lg, {
      swatch: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 14,
          height: 8,
          background: "var(--ds-signal-positive-dim)"
        }
      }),
      label: "Inside \xB115%"
    }), /*#__PURE__*/React.createElement(Lg, {
      swatch: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 12,
          height: 2,
          background: "var(--ds-signal-info)"
        }
      }),
      label: "Expense variance"
    }), /*#__PURE__*/React.createElement(Lg, {
      color: BAD,
      label: "Month outside band"
    }))))));
  }
  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.BudgetScreen = BudgetScreen;

  // Expose the scatter so other screens (e.g. Executive Briefing) can embed it.
  // Create-or-extend (not gated on a prior DSMSCharts) so this works whether this
  // file evaluates before or after Charts.jsx in the bundle.
  window.DSMSCharts = window.DSMSCharts || {};
  window.DSMSCharts.VarianceScatter = VarianceScatter;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/BudgetScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/Charts.jsx
try { (() => {
/* DSMS Fabric Console — presentational SVG charts (kit internals, brand-styled).
   Exposed on window.DSMSCharts. Cosmetic recreations, not data-bound. */
(function () {
  const {
    useState
  } = React;
  const AXIS = "var(--ds-text-muted)";
  const GRID = "var(--ds-line-faint)";

  /* Horizontal bar list */
  function HBars({
    data,
    format,
    color = "var(--ds-data-1)",
    height = 26,
    gap = 8
  }) {
    const max = Math.max(...data.map(d => d.value));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap
      }
    }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "grid",
        gridTemplateColumns: "170px 1fr 92px",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: "var(--ds-text-secondary)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, d.label || d.group || d.dept || d.role), /*#__PURE__*/React.createElement("div", {
      style: {
        height,
        background: "var(--ds-bg-deck)",
        borderRadius: 1,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${d.value / max * 100}%`,
        height: "100%",
        background: d.color || color,
        opacity: 0.9
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontVariantNumeric: "tabular-nums",
        fontSize: 12.5,
        color: "var(--ds-text-primary)",
        textAlign: "right"
      }
    }, format ? format(d.value) : d.value.toLocaleString()))));
  }

  /* Multi-series line chart with axes, optional vertical marker */
  function LineCompare({
    series,
    labels,
    height = 230,
    markerIndex,
    markerLabel,
    surplus,
    yFormat
  }) {
    const [hover, setHover] = useState(-1);
    const padL = 52,
      padR = 16,
      padT = 14,
      padB = 26;
    const W = 760,
      H = height;
    const innerW = W - padL - padR,
      innerH = H - padT - padB;
    const all = series.flatMap(s => s.data);
    const maxV = Math.max(...all) * 1.08;
    const n = labels.length;
    const x = i => padL + i / (n - 1) * innerW;
    const y = v => padT + (1 - v / maxV) * innerH;
    const ticks = 4;
    const fmtY = yFormat || (v => (v / 1e9).toFixed(1) + "B");
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      height: H,
      style: {
        display: "block",
        overflow: "visible"
      },
      onMouseLeave: () => setHover(-1)
    }, Array.from({
      length: ticks + 1
    }).map((_, t) => {
      const v = maxV / ticks * t;
      return /*#__PURE__*/React.createElement("g", {
        key: t
      }, /*#__PURE__*/React.createElement("line", {
        x1: padL,
        x2: W - padR,
        y1: y(v),
        y2: y(v),
        stroke: GRID,
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: padL - 8,
        y: y(v) + 3,
        textAnchor: "end",
        fill: AXIS,
        style: {
          fontFamily: "var(--ds-font-mono)",
          fontSize: 10
        }
      }, fmtY(v)));
    }), surplus && surplus.map((v, i) => /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: x(i) - 7,
      y: y(v),
      width: 14,
      height: y(0) - y(v),
      fill: "var(--ds-signal-positive)",
      opacity: "0.1"
    })), markerIndex != null && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: x(markerIndex),
      x2: x(markerIndex),
      y1: padT,
      y2: H - padB,
      stroke: "var(--ds-accent-imperial)",
      strokeWidth: "1.5",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: x(markerIndex) - 6,
      y: padT + 10,
      textAnchor: "end",
      fill: "var(--ds-accent-imperial-hi)",
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.1em"
      }
    }, markerLabel)), series.map((s, si) => {
      const d = s.data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
      return /*#__PURE__*/React.createElement("path", {
        key: si,
        d: d,
        fill: "none",
        stroke: s.color,
        strokeWidth: "2",
        strokeLinejoin: "round"
      });
    }), labels.map((lb, i) => /*#__PURE__*/React.createElement("g", {
      key: i,
      onMouseEnter: () => setHover(i)
    }, /*#__PURE__*/React.createElement("rect", {
      x: x(i) - innerW / (2 * (n - 1)),
      y: padT,
      width: innerW / (n - 1),
      height: innerH,
      fill: "transparent"
    }), /*#__PURE__*/React.createElement("text", {
      x: x(i),
      y: H - 8,
      textAnchor: "middle",
      fill: AXIS,
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 10
      }
    }, lb), hover === i && /*#__PURE__*/React.createElement("line", {
      x1: x(i),
      x2: x(i),
      y1: padT,
      y2: H - padB,
      stroke: "var(--ds-line-bright)",
      strokeWidth: "1"
    }), hover === i && series.map((s, si) => /*#__PURE__*/React.createElement("circle", {
      key: si,
      cx: x(i),
      cy: y(s.data[i]),
      r: "3.5",
      fill: s.color,
      stroke: "var(--ds-bg-hull)",
      strokeWidth: "1.5"
    })))));
  }

  /* Donut chart */
  function Donut({
    segments,
    size = 168,
    thickness = 26,
    centerLabel,
    centerValue
  }) {
    const total = segments.reduce((a, s) => a + s.value, 0);
    const r = (size - thickness) / 2;
    const c = size / 2;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: size,
        height: size
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      style: {
        transform: "rotate(-90deg)"
      }
    }, segments.map((s, i) => {
      const frac = s.value / total;
      const dash = frac * circ;
      const el = /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: c,
        cy: c,
        r: r,
        fill: "none",
        stroke: s.color,
        strokeWidth: thickness,
        strokeDasharray: `${dash} ${circ - dash}`,
        strokeDashoffset: -offset
      });
      offset += dash;
      return el;
    })), centerValue && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 22,
        fontWeight: 600,
        color: "var(--ds-text-primary)",
        fontVariantNumeric: "tabular-nums"
      }
    }, centerValue), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--ds-text-muted)"
      }
    }, centerLabel)));
  }
  function Legend({
    segments,
    format
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, segments.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 1,
        background: s.color,
        flex: "0 0 auto"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: "var(--ds-text-secondary)",
        flex: 1,
        whiteSpace: "nowrap"
      }
    }, s.cat || s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 12.5,
        color: "var(--ds-text-primary)",
        fontVariantNumeric: "tabular-nums"
      }
    }, format ? format(s.value) : s.value))));
  }

  /* Stacked horizontal bars */
  function StackedBars({
    rows,
    keys
  }) {
    const totals = rows.map(r => keys.reduce((a, k) => a + (r[k.key] || 0), 0));
    const max = Math.max(...totals);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "grid",
        gridTemplateColumns: "110px 1fr 56px",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: "var(--ds-text-secondary)",
        whiteSpace: "nowrap"
      }
    }, r.cat), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        height: 22,
        width: `${totals[i] / max * 100}%`,
        borderRadius: 1,
        overflow: "hidden",
        background: "var(--ds-bg-deck)"
      }
    }, keys.map((k, ki) => {
      const v = r[k.key] || 0;
      return v > 0 ? /*#__PURE__*/React.createElement("div", {
        key: ki,
        style: {
          width: `${v / totals[i] * 100}%`,
          background: k.color
        },
        title: `${k.label}: ${v}`
      }) : null;
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 12,
        color: "var(--ds-text-primary)",
        textAlign: "right",
        fontVariantNumeric: "tabular-nums"
      }
    }, totals[i].toLocaleString()))));
  }

  // Merge (don't overwrite) so a VarianceScatter another file attached first —
  // bundle load order is alphabetical, so BudgetScreen.jsx may run before this —
  // isn't clobbered.
  window.DSMSCharts = Object.assign(window.DSMSCharts || {}, {
    HBars,
    LineCompare,
    Donut,
    Legend,
    StackedBars,
    ComboChart
  });

  /* Combo: combat-losses COLUMNS (lower zone) + a headcount variance-to-LY %
     band ABOVE them — a horizontal reference line with stems + diamonds rising
     above (positive) or dropping below (negative). Markers never touch columns. */
  function ComboChart({
    data,
    height = 268,
    colW = 30,
    posColor = "var(--ds-signal-info)",
    negColor = "var(--ds-signal-negative)",
    colColor = "var(--ds-data-3)"
  }) {
    const [hover, setHover] = useState(-1);
    const padL = 64,
      padR = 60,
      padT = 24,
      padB = 44;
    const W = 760,
      H = height;
    const n = data.length;
    const innerW = W - padL - padR;
    const band = innerW / n;
    const cx = i => padL + band * (i + 0.5);
    const maxLoss = Math.max(...data.map(d => d.losses));
    const lossTop = niceCeil(maxLoss);
    const maxAbs = Math.max(...data.map(d => Math.abs(d.varPct)), 1);
    const amp = 22; // max stem length from the reference line
    const zeroLineY = padT + amp + 14; // horizontal reference line (room for + markers above)
    const yVar = v => zeroLineY - v / maxAbs * amp;
    const colTopY = zeroLineY + amp + 26; // columns start below the lowest possible marker
    const colBaseY = H - padB;
    const yL = v => colBaseY - v / lossTop * (colBaseY - colTopY);
    const lossTicks = 3;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      style: {
        display: "block",
        overflow: "visible",
        height: "auto"
      },
      onMouseLeave: () => setHover(-1)
    }, Array.from({
      length: lossTicks + 1
    }).map((_, t) => {
      const v = lossTop / lossTicks * t;
      return /*#__PURE__*/React.createElement("g", {
        key: "l" + t
      }, /*#__PURE__*/React.createElement("line", {
        x1: padL,
        x2: W - padR,
        y1: yL(v),
        y2: yL(v),
        stroke: GRID,
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: padL - 8,
        y: yL(v) + 3,
        textAnchor: "end",
        fill: AXIS,
        style: {
          fontFamily: "var(--ds-font-mono)",
          fontSize: 10
        }
      }, v >= 1000 ? (v / 1000).toFixed(0) + "K" : v));
    }), data.map((d, i) => {
      const top = yL(d.losses);
      const on = hover === i;
      return /*#__PURE__*/React.createElement("g", {
        key: "c" + i,
        onMouseEnter: () => setHover(i)
      }, /*#__PURE__*/React.createElement("rect", {
        x: cx(i) - band / 2,
        y: colTopY,
        width: band,
        height: colBaseY - colTopY,
        fill: on ? "rgba(255,255,255,0.03)" : "transparent"
      }), /*#__PURE__*/React.createElement("rect", {
        x: cx(i) - colW / 2,
        y: top,
        width: colW,
        height: colBaseY - top,
        fill: colColor,
        opacity: on ? 1 : 0.85,
        rx: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: cx(i),
        y: colBaseY + 16,
        textAnchor: "middle",
        fill: on ? "var(--ds-text-secondary)" : AXIS,
        style: {
          fontFamily: "var(--ds-font-body)",
          fontSize: 11
        }
      }, d.short || d.dept), on && /*#__PURE__*/React.createElement("text", {
        x: cx(i),
        y: top - 6,
        textAnchor: "middle",
        fill: "var(--ds-text-secondary)",
        style: {
          fontFamily: "var(--ds-font-mono)",
          fontSize: 10
        }
      }, (d.losses / 1000).toFixed(1) + "K"));
    }), /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: zeroLineY,
      y2: zeroLineY,
      stroke: "var(--ds-line-bright)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: W - padR + 6,
      y: zeroLineY + 3,
      textAnchor: "start",
      fill: AXIS,
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 8.5,
        fontWeight: 600,
        letterSpacing: "0.08em"
      }
    }, "vs LY"), data.map((d, i) => {
      const x = cx(i),
        y = yVar(d.varPct);
      const up = d.varPct >= 0;
      const c = up ? posColor : negColor;
      const r = hover === i ? 7 : 5.5;
      const ly = up ? y - r - 9 : y + r + 9;
      const label = (d.varPct > 0 ? "+" : "") + d.varPct.toFixed(1) + "%";
      const chipW = label.length * 6.6 + 10;
      return /*#__PURE__*/React.createElement("g", {
        key: "m" + i,
        onMouseEnter: () => setHover(i),
        style: {
          cursor: "default"
        }
      }, /*#__PURE__*/React.createElement("line", {
        x1: x,
        y1: zeroLineY,
        x2: x,
        y2: y,
        stroke: c,
        strokeWidth: "1.5",
        opacity: "0.7"
      }), /*#__PURE__*/React.createElement("path", {
        d: `M${x},${y - r} L${x + r},${y} L${x},${y + r} L${x - r},${y} Z`,
        fill: c,
        stroke: "var(--ds-bg-hull)",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("rect", {
        x: x - chipW / 2,
        y: ly - 9,
        width: chipW,
        height: 16,
        rx: "2",
        fill: "var(--ds-bg-void)",
        stroke: c,
        strokeOpacity: "0.45",
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: x,
        y: ly + 3,
        textAnchor: "middle",
        fill: c,
        style: {
          fontFamily: "var(--ds-font-mono)",
          fontSize: 11,
          fontWeight: 600
        }
      }, label));
    }), /*#__PURE__*/React.createElement("text", {
      transform: `translate(15 ${(colTopY + colBaseY) / 2}) rotate(-90)`,
      textAnchor: "middle",
      fill: AXIS,
      style: {
        fontFamily: "var(--ds-font-display)",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.16em"
      }
    }, "COMBAT LOSSES"));
  }
  function niceCeil(v) {
    if (v <= 0) return 1;
    const mag = Math.pow(10, Math.floor(Math.log10(v)));
    const norm = v / mag;
    const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
    return step * mag;
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/Charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/FabricConsole.jsx
try { (() => {
/**
 * FabricConsole — the full DSMS Imperial operations console as a single
 * importable component: SidebarRail + TopBar + the active dashboard screen.
 *
 * It composes the bundle's own pieces at render time — the screen modules
 * (window.DSMSScreens), charts (window.DSMSCharts), data (window.DSMSData) and
 * primitives (window.DSMSDesignSystem_197d77) — all of which ship in
 * _ds_bundle.js. So any consumer of this design system can mount the exact
 * `index.html` console with one <x-import>, no local re-composition needed.
 *
 * Props:
 *   startPage  — page active on first render (and whenever the prop changes)
 *   collapsed  — start with the nav rail collapsed
 *   dense / showCombat — accepted for drop-in API parity with prop-driven hosts;
 *                        the bundled screens render at their standard density.
 */
function FabricConsole({
  startPage = "briefing",
  collapsed = false,
  dense = false,
  // eslint-disable-line no-unused-vars
  showCombat = true // eslint-disable-line no-unused-vars
} = {}) {
  const NS = typeof window !== "undefined" && window.DSMSDesignSystem_197d77 || {};
  const {
    SidebarRail,
    TopBar,
    Slicer,
    Button,
    IconButton
  } = NS;
  const S = typeof window !== "undefined" && window.DSMSScreens || {};
  const {
    useState,
    useEffect
  } = React;
  const PAGES = [{
    id: "briefing",
    label: "Executive Briefing",
    icon: "layout-dashboard",
    title: "Imperial Executive Briefing",
    crumb: ["Finance", "P&L"],
    screen: "BriefingScreen"
  }, {
    id: "ops",
    label: "Operations Command",
    icon: "git-branch",
    title: "Operations Command",
    crumb: ["Procurement", "Vendors"],
    screen: "OperationsScreen"
  }, {
    id: "budget",
    label: "Budget Performance",
    icon: "gauge",
    title: "Budget Performance",
    crumb: ["Finance", "Budget"],
    screen: "BudgetScreen"
  }, {
    id: "supply",
    label: "Supply Chain",
    icon: "boxes",
    title: "Supply Chain Status",
    crumb: ["Logistics", "Inventory"],
    screen: "SupplyScreen"
  }, {
    id: "workforce",
    label: "Workforce",
    icon: "users",
    title: "Workforce & Personnel",
    crumb: ["Personnel", "Headcount"],
    screen: "WorkforceScreen"
  }, {
    id: "maint",
    label: "Maintenance",
    icon: "wrench",
    title: "Maintenance & Reliability",
    crumb: ["Operations", "Work Orders"]
  }];
  const [active, setActive] = useState(startPage || "briefing");
  const [isCollapsed, setIsCollapsed] = useState(!!collapsed);
  useEffect(() => {
    if (startPage) setActive(startPage);
  }, [startPage]);
  useEffect(() => {
    setIsCollapsed(!!collapsed);
  }, [collapsed]);

  // Primitives not loaded yet (bundle still evaluating) — render nothing rather
  // than throw; the consumer loads _ds_bundle.js in <helmet> before mounting.
  if (!SidebarRail || !TopBar) return null;
  const page = PAGES.find(p => p.id === active) || PAGES[0];
  const Screen = page.screen ? S[page.screen] : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      width: "100%",
      background: "var(--ds-bg-void)",
      color: "var(--ds-text-secondary)",
      fontFamily: "var(--ds-font-body)"
    }
  }, /*#__PURE__*/React.createElement(SidebarRail, {
    items: PAGES,
    active: active,
    onSelect: setActive,
    collapsed: isCollapsed,
    statusLabel: "Subsidy Coverage",
    statusValue: "94%",
    statusTone: "positive"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: page.title,
    breadcrumb: page.crumb,
    onToggleRail: () => setIsCollapsed(c => !c)
  }, /*#__PURE__*/React.createElement(Slicer, {
    size: "sm",
    defaultValue: "2022",
    options: [{
      value: "2019",
      label: "2019"
    }, {
      value: "2020",
      label: "2020"
    }, {
      value: "2021",
      label: "2021"
    }, {
      value: "2022",
      label: "2022"
    }]
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    title: "Alerts"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "download"
  }, "Export")), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: 24,
      backgroundColor: "var(--ds-bg-void)",
      backgroundImage: "var(--ds-texture-grid)",
      backgroundSize: "var(--ds-texture-grid-size)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, Screen ? /*#__PURE__*/React.createElement(Screen, null) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: 400,
      gap: 10,
      color: "var(--ds-text-muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--ds-font-display)",
      fontSize: 14,
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    }
  }, page.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--ds-text-faint)"
    }
  }, "Page reserved \u2014 not part of this UI-kit pass."))))));
}
Object.assign(__ds_scope, { FabricConsole });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/FabricConsole.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/OperationsScreen.jsx
try { (() => {
/* Operations Command — spend by division, vendors, risk matrix, pending ledger. */
(function () {
  function RiskMatrix({
    vendors
  }) {
    const W = 360,
      H = 230,
      pad = 34;
    const riskScore = {
      Nominal: 1,
      Elevated: 2,
      Critical: 3
    };
    const spendVals = vendors.map(v => parseFloat(v.spend.replace(/,/g, "")));
    const maxSpend = Math.max(...spendVals);
    const x = s => pad + s / 3.4 * (W - pad * 2);
    const y = sp => H - pad - sp / maxSpend * (H - pad * 2);
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      height: H
    }, /*#__PURE__*/React.createElement("line", {
      x1: pad,
      y1: H - pad,
      x2: W - pad,
      y2: H - pad,
      stroke: "var(--ds-line-conduit)"
    }), /*#__PURE__*/React.createElement("line", {
      x1: pad,
      y1: pad,
      x2: pad,
      y2: H - pad,
      stroke: "var(--ds-line-conduit)"
    }), /*#__PURE__*/React.createElement("line", {
      x1: x(2),
      y1: pad,
      x2: x(2),
      y2: H - pad,
      stroke: "var(--ds-line-faint)",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: W - pad,
      y: H - pad + 16,
      textAnchor: "end",
      fill: "var(--ds-text-faint)",
      style: {
        fontSize: 10,
        fontFamily: "var(--ds-font-mono)"
      }
    }, "RISK \u2192"), /*#__PURE__*/React.createElement("text", {
      x: pad - 6,
      y: pad + 2,
      textAnchor: "end",
      fill: "var(--ds-text-faint)",
      style: {
        fontSize: 10,
        fontFamily: "var(--ds-font-mono)"
      }
    }, "\u20A1"), vendors.map((v, i) => {
      const c = v.rs === "negative" ? "var(--ds-signal-negative)" : v.rs === "warning" ? "var(--ds-signal-warning)" : "var(--ds-signal-positive)";
      const sp = parseFloat(v.spend.replace(/,/g, ""));
      return /*#__PURE__*/React.createElement("g", {
        key: i
      }, /*#__PURE__*/React.createElement("circle", {
        cx: x(riskScore[v.risk]),
        cy: y(sp),
        r: Math.max(6, sp / maxSpend * 18),
        fill: c,
        fillOpacity: "0.22",
        stroke: c,
        strokeWidth: "1.5"
      }));
    }));
  }
  function OperationsScreen() {
    // Globals read at render time (see note in BriefingScreen.jsx).
    const {
      Panel,
      SectionHeader,
      DataTable,
      StatusPill,
      Button
    } = window.DSMSDesignSystem_197d77;
    const {
      HBars
    } = window.DSMSCharts;
    const D = window.DSMSData;
    const o = D.operations;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      eyebrow: "Procurement & Vendors",
      title: "Operations Command"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Spend by Division Group",
      eyebrow: "Trailing 12 Months"
    }, /*#__PURE__*/React.createElement(HBars, {
      data: o.divisionSpend,
      format: D.fmtCredits,
      color: "var(--ds-data-2)"
    })), /*#__PURE__*/React.createElement(Panel, {
      title: "Vendor Risk Matrix",
      eyebrow: "Risk \xD7 Spend"
    }, /*#__PURE__*/React.createElement(RiskMatrix, {
      vendors: o.vendors
    }))), /*#__PURE__*/React.createElement(Panel, {
      title: "Top Vendors",
      eyebrow: "By Total Spend",
      padded: false,
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        iconTrailing: "chevron-down"
      }, "All Tiers")
    }, /*#__PURE__*/React.createElement(DataTable, {
      rowKey: "vendor",
      columns: [{
        key: "vendor",
        label: "Vendor"
      }, {
        key: "type",
        label: "Type"
      }, {
        key: "world",
        label: "Home World"
      }, {
        key: "tier",
        label: "Tier",
        align: "center"
      }, {
        key: "risk",
        label: "Risk Rating",
        render: r => /*#__PURE__*/React.createElement(StatusPill, {
          status: r.rs,
          size: "sm"
        }, r.risk)
      }, {
        key: "spend",
        label: "Total Spend ₡",
        numeric: true
      }],
      rows: o.vendors
    })), /*#__PURE__*/React.createElement(Panel, {
      title: "Pending & Disputed Ledger",
      eyebrow: `${o.pending.count} Open Postings`
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, o.pending.top.map(p => /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: "grid",
        gridTemplateColumns: "120px 1fr 120px 110px",
        alignItems: "center",
        gap: 14,
        padding: "8px 10px",
        background: "var(--ds-bg-deck)",
        borderRadius: 2,
        border: "1px solid var(--ds-line-faint)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 12,
        color: "var(--ds-text-secondary)"
      }
    }, p.id), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--ds-text-primary)"
      }
    }, p.vendor), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--ds-font-mono)",
        fontSize: 13,
        color: "var(--ds-text-primary)",
        textAlign: "right",
        fontVariantNumeric: "tabular-nums"
      }
    }, "\u20A1 ", p.amount), /*#__PURE__*/React.createElement("div", {
      style: {
        justifySelf: "end"
      }
    }, /*#__PURE__*/React.createElement(StatusPill, {
      status: p.rs,
      size: "sm"
    }, p.status)))))));
  }
  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.OperationsScreen = OperationsScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/OperationsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/SupplyScreen.jsx
try { (() => {
/* Supply Chain Status — inventory value, category mix, stockout heat-strip, reorder watchlist. */
(function () {
  const STOCK_KEYS = [{
    key: "central",
    label: "Central Depot",
    color: "var(--ds-signal-info)"
  }, {
    key: "forward",
    label: "Forward Store",
    color: "var(--ds-signal-positive)"
  }, {
    key: "magazine",
    label: "Magazine",
    color: "var(--ds-signal-warning)"
  }, {
    key: "cold",
    label: "Cold Storage",
    color: "var(--ds-data-3)"
  }];

  /* Stockouts heat-strip: items × weeks */
  function HeatStrip() {
    const items = ["Turbolaser Coolant", "TIE Solar Array", "Reactor Plating", "Bacta Fluid", "Blaster Gas"];
    const weeks = 16;
    // deterministic pseudo pattern
    const cell = (r, c) => {
      const v = (r * 7 + c * 3) % 11;
      if (v === 0 || r === 0 && c > 11 || r === 4 && c > 13) return "stockout";
      if (v < 3) return "low";
      return "ok";
    };
    const color = {
      stockout: "var(--ds-signal-negative)",
      low: "var(--ds-signal-warning)",
      ok: "var(--ds-bg-deck)"
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 5
      }
    }, items.map((it, r) => /*#__PURE__*/React.createElement("div", {
      key: r,
      style: {
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: "var(--ds-text-secondary)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, it), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${weeks}, 1fr)`,
        gap: 3
      }
    }, Array.from({
      length: weeks
    }).map((_, c) => {
      const s = cell(r, c);
      return /*#__PURE__*/React.createElement("div", {
        key: c,
        title: `Week ${c + 1}: ${s}`,
        style: {
          height: 16,
          borderRadius: 1,
          background: color[s],
          opacity: s === "ok" ? 0.6 : 0.9
        }
      });
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        marginTop: 14,
        paddingLeft: 150
      }
    }, [["stockout", "Stockout"], ["low", "Low"], ["ok", "In Stock"]].map(([k, l]) => /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "var(--ds-text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 1,
        background: color[k],
        opacity: k === "ok" ? 0.6 : 0.9
      }
    }), l))));
  }
  function SupplyScreen() {
    // Globals read at render time (see note in BriefingScreen.jsx).
    const {
      Panel,
      SectionHeader,
      DataTable,
      StatusPill,
      KpiTile
    } = window.DSMSDesignSystem_197d77;
    const {
      StackedBars
    } = window.DSMSCharts;
    const D = window.DSMSData;
    const s = D.supply;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      eyebrow: "Inventory & Logistics",
      title: "Supply Chain Status"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: 14,
        alignItems: "stretch"
      }
    }, /*#__PURE__*/React.createElement(KpiTile, {
      label: "Inventory Value",
      value: s.inventoryValue,
      delta: 0.052,
      sparkData: s.inventorySpark,
      sparkColor: "var(--ds-signal-info)",
      accent: true,
      style: {
        justifyContent: "center"
      }
    }), /*#__PURE__*/React.createElement(Panel, {
      title: "Inventory by Category",
      eyebrow: "Units by Location Type"
    }, /*#__PURE__*/React.createElement(StackedBars, {
      rows: s.byCategory,
      keys: STOCK_KEYS
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        marginTop: 14
      }
    }, STOCK_KEYS.map(k => /*#__PURE__*/React.createElement("span", {
      key: k.key,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "var(--ds-text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 1,
        background: k.color
      }
    }), k.label))))), /*#__PURE__*/React.createElement(Panel, {
      title: "Stockouts Heat-Strip",
      eyebrow: "Items \xD7 Last 16 Weeks"
    }, /*#__PURE__*/React.createElement(HeatStrip, null)), /*#__PURE__*/React.createElement(Panel, {
      title: "Reorder Watchlist",
      eyebrow: "At or Below Reorder Point",
      padded: false
    }, /*#__PURE__*/React.createElement(DataTable, {
      rowKey: "item",
      columns: [{
        key: "item",
        label: "Item"
      }, {
        key: "onHand",
        label: "On Hand",
        numeric: true
      }, {
        key: "onOrder",
        label: "On Order",
        numeric: true
      }, {
        key: "lead",
        label: "Lead (d)",
        numeric: true
      }, {
        key: "days",
        label: "Days to Stockout",
        numeric: true,
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            color: r.days <= 5 ? "var(--ds-signal-negative)" : r.days <= 10 ? "var(--ds-signal-warning)" : "var(--ds-text-primary)",
            fontFamily: "var(--ds-font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 600
          }
        }, r.days)
      }, {
        key: "vendor",
        label: "Preferred Vendor"
      }, {
        key: "status",
        label: "Status",
        render: r => /*#__PURE__*/React.createElement(StatusPill, {
          status: r.rs,
          size: "sm"
        }, r.status)
      }],
      rows: s.reorder
    })));
  }
  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.SupplyScreen = SupplyScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/SupplyScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/WorkforceScreen.jsx
try { (() => {
/* Workforce & Personnel — headcount, roles, attrition vs combat losses, droids vs organics. */
(function () {
  function WorkforceScreen() {
    // Globals read at render time (see note in BriefingScreen.jsx).
    const {
      Panel,
      SectionHeader,
      KpiTile,
      StatusPill
    } = window.DSMSDesignSystem_197d77;
    const {
      HBars,
      LineCompare,
      Donut,
      Legend
    } = window.DSMSCharts;
    const D = window.DSMSData;
    const w = D.workforce;
    const roleData = w.byRole.map(r => ({
      label: r.role,
      value: r.count,
      color: r.combat ? "var(--ds-data-5)" : "var(--ds-data-2)"
    }));
    const droidSeg = [{
      cat: "Service Droids",
      value: w.droidShare,
      color: "var(--ds-data-1)"
    }, {
      cat: "Organic Personnel",
      value: 1 - w.droidShare,
      color: "var(--ds-data-4)"
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      eyebrow: "Personnel & Headcount",
      title: "Workforce"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(KpiTile, {
      label: "Total Headcount",
      value: w.headcount,
      delta: 0.038,
      sparkData: w.headcountSpark,
      sparkColor: "var(--ds-signal-positive)",
      accent: true,
      style: {
        justifyContent: "center"
      }
    }), /*#__PURE__*/React.createElement(Panel, {
      title: "Headcount by Role",
      eyebrow: "Active Assignments"
    }, /*#__PURE__*/React.createElement(HBars, {
      data: roleData,
      format: n => (n / 1000).toFixed(0) + "K"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(Lg, {
      color: "var(--ds-data-5)",
      label: "Combat"
    }), /*#__PURE__*/React.createElement(Lg, {
      color: "var(--ds-data-2)",
      label: "Non-combat"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "Attrition & Combat Losses",
      eyebrow: "% of Headcount \xB7 Monthly",
      actions: /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 14
        }
      }, /*#__PURE__*/React.createElement(Lg, {
        color: "var(--ds-signal-warning)",
        label: "Attrition",
        line: true
      }), /*#__PURE__*/React.createElement(Lg, {
        color: "var(--ds-signal-negative)",
        label: "Combat Losses",
        line: true
      }))
    }, /*#__PURE__*/React.createElement(LineCompare, {
      labels: D.months,
      height: 210,
      markerIndex: 11,
      markerLabel: "BATTLE OF YAVIN",
      yFormat: v => v.toFixed(1) + "%",
      series: [{
        name: "Attrition",
        data: w.attrition,
        color: "var(--ds-signal-warning)"
      }, {
        name: "Combat Losses",
        data: w.combatLosses,
        color: "var(--ds-signal-negative)"
      }]
    })), /*#__PURE__*/React.createElement(Panel, {
      title: "Droids vs Organics",
      eyebrow: "Workforce Composition"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Donut, {
      segments: droidSeg,
      centerValue: "23.5%",
      centerLabel: "Droids"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(Legend, {
      segments: droidSeg,
      format: v => (v * 100).toFixed(1) + "%"
    }))))), /*#__PURE__*/React.createElement(Panel, {
      title: "Payroll Cost by Department",
      eyebrow: "Trailing 12 Months"
    }, /*#__PURE__*/React.createElement(HBars, {
      color: "var(--ds-data-3)",
      format: D.fmtCredits,
      data: [{
        label: "Combat Systems",
        value: 1.42e9
      }, {
        label: "Engineering & Power",
        value: 0.98e9
      }, {
        label: "Flight Operations",
        value: 0.74e9
      }, {
        label: "Security & Detention",
        value: 0.41e9
      }, {
        label: "Habitation & Life Support",
        value: 0.19e9
      }]
    })));
  }
  function Lg({
    color,
    label,
    line
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: line ? 12 : 9,
        height: line ? 3 : 9,
        borderRadius: 1,
        background: color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--ds-text-muted)"
      }
    }, label));
  }
  window.DSMSScreens = window.DSMSScreens || {};
  window.DSMSScreens.WorkforceScreen = WorkforceScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/WorkforceScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/console-filters.jsx
try { (() => {
// Production filter surfaces for the Fabric Console, wiring the two approved
// slicer explorations into the live app:
//   • ConsoleSlicerPane      — right-docked filter pane. Basic slices (dropdowns)
//                              + detailed slices that open as a POPOVER CARD over
//                              the dimmed pane (exploration C).
//   • DetailedFiltersTakeover — one "Detailed Filters" button opens ALL three
//                              detailed slicers side-by-side in COLUMNS over the
//                              greyed-out console (exploration E).
// Both read/write a single shared selection object owned by the AppShell, so the
// pane, the popover and the takeover all stay in sync. Consumes window.DSMSFilter
// (shared atoms + data) and the published namespace.

(function () {
  const F = window.DSMSFilter;
  const NS = window.DSMSDesignSystem_197d77 || {};
  const {
    Icon
  } = NS;
  const {
    T,
    DETAILED,
    catById,
    totalItems,
    initSel
  } = F;
  const {
    useState,
    useEffect
  } = React;
  const detCount = sel => Object.values(sel).reduce((n, a) => n + a.length, 0);
  const activeCats = sel => DETAILED.filter(d => sel[d.id].length > 0).length;
  const toggleItem = setSel => (cat, it) => setSel(s => {
    const a = s[cat.id];
    return {
      ...s,
      [cat.id]: a.includes(it) ? a.filter(x => x !== it) : [...a, it]
    };
  });
  function Divider() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: T.conduit,
        margin: "0 14px"
      }
    });
  }

  // shared button styles ----------------------------------------------------
  const iconBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    border: "none",
    background: "transparent",
    color: T.muted,
    cursor: "pointer",
    borderRadius: T.rx,
    flex: "0 0 auto"
  };
  const primaryBtn = {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    border: "none",
    background: T.accent,
    color: T.onAccent,
    cursor: "pointer",
    borderRadius: T.rx,
    height: 34,
    fontFamily: T.fD,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase"
  };
  const ghostBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid " + T.conduit,
    background: "transparent",
    color: T.muted,
    cursor: "pointer",
    borderRadius: T.rx,
    height: 34,
    padding: "0 16px",
    fontFamily: T.fD,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase"
  };

  // ═══════════════════════════════════════════════════════════════════════
  // POPOVER CARD  (exploration C) — floats over the dimmed pane
  // ═══════════════════════════════════════════════════════════════════════
  function PopoverCard({
    cat,
    sel,
    onToggle,
    setSel,
    onClose
  }) {
    const [q, setQ] = useState("");
    const [shown, setShown] = useState(false);
    useEffect(() => {
      const r = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 6,
        background: shown ? "rgba(8,9,11,.62)" : "rgba(8,9,11,0)",
        transition: "background .18s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        width: "100%",
        maxHeight: "82%",
        display: "flex",
        flexDirection: "column",
        background: T.bay,
        border: "1px solid " + T.bright,
        borderRadius: T.rmd,
        boxShadow: "0 24px 60px rgba(0,0,0,.5)",
        overflow: "hidden",
        transform: shown ? "scale(1)" : "scale(.94)",
        opacity: shown ? 1 : 0,
        transition: "transform .18s cubic-bezier(.2,.7,.3,1), opacity .18s"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 10px 12px 14px",
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.accentHi,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat.icon,
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 13.5,
        fontWeight: 700,
        color: T.pri,
        lineHeight: 1.1
      }
    }, cat.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fM,
        fontSize: 10,
        color: T.muted,
        marginTop: 1
      }
    }, sel.length, " of ", totalItems(cat), " selected")), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: iconBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 17
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 12px 4px"
      }
    }, /*#__PURE__*/React.createElement(F.SearchBox, {
      value: q,
      onChange: setQ,
      placeholder: "Search " + cat.label.toLowerCase() + "…"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(F.ListTools, {
      cat: cat,
      sel: sel,
      setSel: setSel
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "0 10px 6px"
      }
    }, /*#__PURE__*/React.createElement(F.GroupedList, {
      cat: cat,
      sel: sel,
      query: q,
      onToggle: onToggle
    })), /*#__PURE__*/React.createElement("footer", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        gap: 10,
        padding: "10px 12px",
        borderTop: "1px solid " + T.conduit,
        background: T.hull
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setSel([]),
      style: ghostBtn
    }, "Clear"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: primaryBtn
    }, "Apply \xB7 ", sel.length))));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CONSOLE SLICER PANE — right-docked. Basic slices + detailed (popover).
  // ═══════════════════════════════════════════════════════════════════════
  function RailBtn({
    icon,
    title,
    onClick,
    accent,
    on
  }) {
    const [hover, setHover] = useState(false);
    const color = accent || on ? T.accentHi : hover ? T.pri : T.muted;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      title: title,
      "aria-label": title,
      onClick: onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        border: "none",
        borderRadius: T.rx,
        cursor: "pointer",
        color,
        background: hover || on ? T.bay : "transparent",
        transition: "background .12s, color .12s"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 17
    }));
  }
  function ConsoleSlicerPane({
    sel,
    setSel,
    onOpenAll,
    collapsed,
    onCollapsedChange
  }) {
    const [pop, setPop] = useState(null);
    const toggle = toggleItem(setSel);
    const activeCount = F.activeCount(sel);
    if (collapsed) {
      return /*#__PURE__*/React.createElement("nav", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          width: 52,
          flex: "0 0 52px",
          height: "100%",
          padding: "12px 0",
          background: T.hull,
          borderLeft: "3px solid " + T.accent
        }
      }, /*#__PURE__*/React.createElement(RailBtn, {
        icon: "panel-right-open",
        title: "Expand filters",
        onClick: () => onCollapsedChange(false)
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "relative"
        }
      }, /*#__PURE__*/React.createElement(RailBtn, {
        icon: "sliders-horizontal",
        title: activeCount + " active filters",
        accent: true,
        onClick: () => onCollapsedChange(false)
      }), activeCount > 0 && /*#__PURE__*/React.createElement("span", {
        style: {
          position: "absolute",
          top: -3,
          right: -3,
          minWidth: 16,
          height: 16,
          padding: "0 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: T.accent,
          color: T.onAccent,
          borderRadius: 999,
          fontFamily: T.fM,
          fontSize: 9.5,
          fontWeight: 700,
          lineHeight: 1,
          border: "1.5px solid " + T.hull
        }
      }, activeCount)), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }), DETAILED.map(c => /*#__PURE__*/React.createElement(RailBtn, {
        key: c.id,
        icon: c.icon,
        title: c.label,
        on: sel[c.id].length > 0,
        onClick: () => onCollapsedChange(false)
      })));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 320px",
        width: 320,
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(F.PanelChrome, null, /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 52,
        padding: "0 8px 0 14px",
        borderBottom: "1px solid " + T.conduit,
        background: T.hull
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.accentHi,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sliders-horizontal",
      size: 17
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.06em",
        color: T.pri,
        lineHeight: 1.1
      }
    }, "FILTERS"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 8.5,
        fontWeight: 600,
        letterSpacing: "0.2em",
        color: T.faintT,
        marginTop: 2
      }
    }, "SLICER PANE")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fM,
        fontSize: 11,
        fontWeight: 600,
        color: T.accentHi,
        background: T.accentDim,
        padding: "3px 7px",
        borderRadius: T.rx,
        fontVariantNumeric: "tabular-nums"
      }
    }, activeCount, " active"), /*#__PURE__*/React.createElement(RailBtn, {
      icon: "panel-right-close",
      title: "Collapse filters",
      onClick: () => onCollapsedChange(true)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement(F.BasicSlices, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.Block, null, /*#__PURE__*/React.createElement(F.SectionLabel, {
      right: /*#__PURE__*/React.createElement("button", {
        onClick: onOpenAll,
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          border: "none",
          background: "transparent",
          color: T.accentHi,
          cursor: "pointer",
          fontFamily: T.fD,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: 0
        },
        onMouseEnter: e => e.currentTarget.style.color = T.accent,
        onMouseLeave: e => e.currentTarget.style.color = T.accentHi
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "maximize-2",
        size: 11
      }), " Open all")
    }, "Detailed Slices"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, DETAILED.map(cat => /*#__PURE__*/React.createElement("div", {
      key: cat.id
    }, /*#__PURE__*/React.createElement(F.DetailRow, {
      cat: cat,
      sel: sel[cat.id],
      open: pop === cat.id,
      arrow: "square-arrow-out-up-right",
      onClick: () => setPop(cat.id)
    }), sel[cat.id].length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 4px 2px"
      }
    }, /*#__PURE__*/React.createElement(F.Chips, {
      items: sel[cat.id],
      max: 4,
      onRemove: it => toggle(cat, it)
    }))))))), /*#__PURE__*/React.createElement(F.FooterBar, {
      count: detCount(sel),
      onReset: () => setSel(initSel())
    }), pop && /*#__PURE__*/React.createElement(PopoverCard, {
      cat: catById[pop],
      sel: sel[pop],
      onToggle: it => toggle(catById[pop], it),
      setSel: arr => setSel(s => ({
        ...s,
        [pop]: arr
      })),
      onClose: () => setPop(null)
    })));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // DETAILED FILTERS TAKEOVER  (exploration E) — all columns over the console
  // ═══════════════════════════════════════════════════════════════════════
  function SlicerColumn({
    cat,
    sel,
    onToggle,
    setSel,
    query,
    setQuery
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        background: T.hull,
        border: "1px solid " + T.conduit,
        borderRadius: T.rmd,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "12px 12px 10px",
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        width: 30,
        height: 30,
        borderRadius: T.rx,
        background: T.bay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: T.accentHi
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat.icon,
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 13,
        fontWeight: 700,
        color: T.pri,
        lineHeight: 1.1
      }
    }, cat.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fM,
        fontSize: 10,
        color: sel.length ? T.info : T.faintT,
        marginTop: 1
      }
    }, sel.length, " / ", totalItems(cat), " selected"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 auto",
        padding: "10px 10px 4px"
      }
    }, /*#__PURE__*/React.createElement(F.SearchBox, {
      value: query,
      onChange: setQuery,
      placeholder: "Search " + cat.label.toLowerCase() + "…"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(F.ListTools, {
      cat: cat,
      sel: sel,
      setSel: setSel
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "0 8px 8px"
      }
    }, /*#__PURE__*/React.createElement(F.GroupedList, {
      cat: cat,
      sel: sel,
      query: query,
      onToggle: onToggle
    })));
  }
  function DetailedFiltersTakeover({
    sel,
    setSel,
    onClose
  }) {
    const [shown, setShown] = useState(false);
    const [q, setQ] = useState({});
    const toggle = toggleItem(setSel);
    const setCat = (id, arr) => setSel(s => ({
      ...s,
      [id]: arr
    }));
    const setQuery = (id, v) => setQ(s => ({
      ...s,
      [id]: v
    }));
    useEffect(() => {
      const r = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 1000,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "absolute",
        inset: 0,
        background: shown ? "rgba(6,7,9,.62)" : "rgba(6,7,9,0)",
        transition: "background .2s"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        pointerEvents: "auto",
        width: "100%",
        maxWidth: 1040,
        height: "100%",
        maxHeight: 680,
        display: "flex",
        flexDirection: "column",
        background: T.bay,
        border: "1px solid " + T.bright,
        borderRadius: 12,
        boxShadow: "0 32px 90px rgba(0,0,0,.6)",
        overflow: "hidden",
        transform: shown ? "scale(1)" : "scale(.96)",
        opacity: shown ? 1 : 0,
        transition: "transform .2s cubic-bezier(.2,.7,.3,1), opacity .2s"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 14px 16px 18px",
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.accentHi,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "list-filter",
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 17,
        fontWeight: 700,
        color: T.pri,
        lineHeight: 1.1
      }
    }, "Detailed Filters"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fB,
        fontSize: 11.5,
        color: T.muted,
        marginTop: 2
      }
    }, "Refine Products, Staff Type & Death Star Areas across the report")), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        ...iconBtn,
        width: 34,
        height: 34
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 20
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14,
        padding: 16
      }
    }, DETAILED.map(cat => /*#__PURE__*/React.createElement(SlicerColumn, {
      key: cat.id,
      cat: cat,
      sel: sel[cat.id],
      query: q[cat.id] || "",
      setQuery: v => setQuery(cat.id, v),
      onToggle: it => toggle(cat, it),
      setSel: a => setCat(cat.id, a)
    }))), /*#__PURE__*/React.createElement("footer", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderTop: "1px solid " + T.conduit,
        background: T.hull
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fB,
        fontSize: 12,
        color: T.muted
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontFamily: T.fM,
        color: T.pri
      }
    }, detCount(sel)), " across ", /*#__PURE__*/React.createElement("b", {
      style: {
        fontFamily: T.fM,
        color: T.pri
      }
    }, activeCats(sel)), " slicers"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setSel(initSel()),
      style: {
        marginLeft: "auto",
        border: "none",
        background: "transparent",
        color: T.faintT,
        cursor: "pointer",
        fontFamily: T.fD,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase"
      }
    }, "Clear all"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        ...ghostBtn,
        height: 36
      }
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        border: "none",
        background: T.accent,
        color: T.onAccent,
        cursor: "pointer",
        borderRadius: T.rx,
        height: 36,
        padding: "0 20px",
        fontFamily: T.fD,
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      }
    }, "Apply Filters")))));
  }
  window.ConsoleFilters = {
    ConsoleSlicerPane,
    DetailedFiltersTakeover,
    detCount
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/console-filters.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/data.js
try { (() => {
/* DSMS Fabric Console — mock datasets (0 BBY, trailing 12 months).
   Numbers are illustrative Imperial credits (₡). Exposed on window.DSMSData. */
(function () {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const income = [812, 824, 833, 851, 860, 872, 889, 901, 918, 942, 980, 1041].map(n => n * 1e6);
  const expenses = [690, 712, 735, 741, 760, 802, 798, 833, 881, 905, 962, 990].map(n => n * 1e6);
  const surplus = income.map((v, i) => v - expenses[i]);
  const fmtCredits = n => {
    const a = Math.abs(n);
    if (a >= 1e9) return "₡ " + (n / 1e9).toFixed(2) + "B";
    if (a >= 1e6) return "₡ " + (n / 1e6).toFixed(0) + "M";
    if (a >= 1e3) return "₡ " + (n / 1e3).toFixed(0) + "K";
    return "₡ " + n;
  };
  window.DSMSData = {
    months,
    fmtCredits,
    finance: {
      income,
      expenses,
      surplus,
      kpis: [{
        label: "Total Income",
        value: "₡ 10.40B",
        delta: 0.082,
        spark: income.map(v => v / 1e6)
      }, {
        label: "Total Expenses",
        value: "₡ 9.10B",
        delta: 0.061,
        invert: true,
        spark: expenses.map(v => v / 1e6),
        color: "var(--ds-signal-warning)"
      }, {
        label: "Net Surplus",
        value: "₡ 1.28B",
        delta: 0.064,
        accent: true,
        spark: surplus.map(v => v / 1e6),
        color: "var(--ds-signal-positive)"
      }, {
        label: "Imperial Subsidy",
        value: "₡ 8.55B",
        delta: 0.011,
        spark: income.map(v => v / 1e6 * 0.82),
        color: "var(--ds-signal-info)"
      }, {
        label: "Subsidy Coverage",
        value: "94%",
        delta: -0.018,
        invert: false,
        spark: [97, 96, 96, 95, 95, 95, 94, 94, 94, 93, 94, 94]
      }, {
        label: "Operating Margin",
        value: "12.3%",
        delta: 0.009,
        spark: surplus.map((v, i) => v / income[i] * 100)
      }],
      expenseMix: [{
        cat: "Personnel",
        value: 3.74e9,
        color: "var(--ds-data-1)"
      }, {
        cat: "Operations",
        value: 2.61e9,
        color: "var(--ds-data-2)"
      }, {
        cat: "Capital & Construction",
        value: 1.98e9,
        color: "var(--ds-data-5)"
      }, {
        cat: "Overhead",
        value: 0.77e9,
        color: "var(--ds-data-3)"
      }]
    },
    operations: {
      divisionSpend: [{
        group: "Combat Systems",
        value: 2.84e9
      }, {
        group: "Engineering & Power",
        value: 2.21e9
      }, {
        group: "Flight Operations",
        value: 1.46e9
      }, {
        group: "Security & Detention",
        value: 0.98e9
      }, {
        group: "Habitation & Life Support",
        value: 0.74e9
      }, {
        group: "Logistics & Supply",
        value: 0.52e9
      }, {
        group: "Command & Administration",
        value: 0.35e9
      }],
      vendors: [{
        vendor: "Sienar Fleet Systems",
        type: "Prime",
        world: "Lianna",
        tier: "I",
        risk: "Critical",
        rs: "negative",
        spend: "412,900,114"
      }, {
        vendor: "Kuat Drive Yards",
        type: "Prime",
        world: "Kuat",
        tier: "I",
        risk: "Elevated",
        rs: "warning",
        spend: "388,210,556"
      }, {
        vendor: "Imperial Munitions",
        type: "Sub",
        world: "Coruscant",
        tier: "II",
        risk: "Nominal",
        rs: "positive",
        spend: "201,774,300"
      }, {
        vendor: "Corellia Mining Guild",
        type: "Sub",
        world: "Corellia",
        tier: "II",
        risk: "Elevated",
        rs: "warning",
        spend: "164,330,901"
      }, {
        vendor: "Taim & Bak Ordnance",
        type: "Sub",
        world: "Naboo",
        tier: "III",
        risk: "Nominal",
        rs: "positive",
        spend: "98,210,447"
      }, {
        vendor: "Cygnus Spaceworks",
        type: "Prime",
        world: "Bespin",
        tier: "II",
        risk: "Critical",
        rs: "negative",
        spend: "76,884,210"
      }],
      pending: {
        count: 47,
        top: [{
          id: "LDG-88142",
          vendor: "Sienar Fleet Systems",
          amount: "44,210,008",
          status: "Disputed",
          rs: "negative"
        }, {
          id: "LDG-88090",
          vendor: "Kuat Drive Yards",
          amount: "31,775,400",
          status: "Pending",
          rs: "warning"
        }, {
          id: "LDG-87994",
          vendor: "Cygnus Spaceworks",
          amount: "12,004,118",
          status: "Disputed",
          rs: "negative"
        }]
      }
    },
    supply: {
      inventoryValue: "₡ 2.41B",
      inventorySpark: [2.1, 2.15, 2.2, 2.18, 2.25, 2.3, 2.28, 2.33, 2.36, 2.38, 2.4, 2.41],
      byCategory: [{
        cat: "Munition",
        central: 640,
        forward: 210,
        magazine: 480,
        cold: 0
      }, {
        cat: "Fuel",
        central: 520,
        forward: 180,
        magazine: 0,
        cold: 0
      }, {
        cat: "Spare Part",
        central: 410,
        forward: 260,
        magazine: 0,
        cold: 0
      }, {
        cat: "Consumable",
        central: 300,
        forward: 190,
        magazine: 0,
        cold: 220
      }, {
        cat: "Droid Part",
        central: 240,
        forward: 90,
        magazine: 0,
        cold: 0
      }, {
        cat: "Medical",
        central: 120,
        forward: 60,
        magazine: 0,
        cold: 180
      }],
      reorder: [{
        item: "Turbolaser Coolant Cell",
        onHand: 142,
        onOrder: 600,
        lead: 14,
        days: 6,
        vendor: "Sienar Fleet Systems",
        status: "Stockout",
        rs: "negative"
      }, {
        item: "TIE Solar Panel Array",
        onHand: 310,
        onOrder: 0,
        lead: 21,
        days: 9,
        vendor: "Cygnus Spaceworks",
        status: "Reorder",
        rs: "warning"
      }, {
        item: "Reactor Shield Plating",
        onHand: 88,
        onOrder: 240,
        lead: 30,
        days: 11,
        vendor: "Kuat Drive Yards",
        status: "Reorder",
        rs: "warning"
      }, {
        item: "Bacta Tank Fluid (40L)",
        onHand: 540,
        onOrder: 0,
        lead: 9,
        days: 18,
        vendor: "Corellia Mining Guild",
        status: "OK",
        rs: "positive"
      }, {
        item: "Blaster Gas Canister",
        onHand: 12,
        onOrder: 1000,
        lead: 7,
        days: 3,
        vendor: "Taim & Bak Ordnance",
        status: "Stockout",
        rs: "negative"
      }]
    },
    workforce: {
      headcount: "1.71M",
      headcountSpark: [1.42, 1.46, 1.5, 1.53, 1.56, 1.59, 1.62, 1.64, 1.66, 1.68, 1.7, 1.71],
      byRole: [{
        role: "Stormtrooper",
        count: 612000,
        combat: true
      }, {
        role: "Service Droid",
        count: 401000,
        combat: false
      }, {
        role: "Reactor Technician",
        count: 188000,
        combat: false
      }, {
        role: "TIE Pilot",
        count: 96000,
        combat: true
      }, {
        role: "Gunner",
        count: 84000,
        combat: true
      }, {
        role: "ISB Agent",
        count: 41000,
        combat: true
      }],
      attrition: [3.1, 3.0, 3.2, 3.4, 3.3, 3.6, 3.5, 3.8, 4.0, 4.2, 4.6, 5.4],
      combatLosses: [0.4, 0.3, 0.5, 0.6, 0.5, 0.7, 0.8, 0.9, 1.1, 1.4, 2.0, 3.9],
      droidShare: 0.235,
      /* Departments that took combat losses this year — columns = losses (headcount),
         line = headcount variance to last year (%). Positive = replenishing, negative = bleeding. */
      combatDepts: [{
        dept: "Combat Systems",
        short: "Combat Sys.",
        losses: 18400,
        varPct: 2.1
      }, {
        dept: "Flight Operations",
        short: "Flight Ops",
        losses: 12600,
        varPct: -4.3
      }, {
        dept: "Gunnery",
        short: "Gunnery",
        losses: 8800,
        varPct: -1.9
      }, {
        dept: "Security & Detention",
        short: "Security",
        losses: 6100,
        varPct: 0.8
      }, {
        dept: "Engineering & Power",
        short: "Engineering",
        losses: 3400,
        varPct: 1.6
      }, {
        dept: "ISB Field Ops",
        short: "ISB Field",
        losses: 2200,
        varPct: -2.7
      }]
    },
    maintenance: {
      openWO: 1284,
      criticalWO: 37,
      backlog: {
        low: [120, 124, 118, 130, 126, 122, 128, 134, 131, 129, 136, 140],
        medium: [88, 92, 95, 90, 96, 99, 101, 98, 104, 108, 112, 118],
        high: [40, 42, 45, 44, 48, 50, 52, 49, 55, 60, 66, 74],
        crit: [6, 5, 7, 8, 7, 9, 10, 11, 14, 18, 26, 37]
      },
      downtime: [{
        dept: "Reactor Core",
        hrs: 884
      }, {
        dept: "Superlaser Assembly",
        hrs: 712
      }, {
        dept: "Hangar Bay 327",
        hrs: 466
      }, {
        dept: "Tractor Beam Array",
        hrs: 358
      }, {
        dept: "Detention Block AA-23",
        hrs: 214
      }, {
        dept: "Waste Compaction",
        hrs: 142
      }],
      recent: [{
        id: "WO-44821",
        opened: "0 BBY · Dec",
        dept: "Reactor Core",
        item: "Coolant Manifold",
        downtime: "42h",
        cost: "8,210,400",
        status: "Critical",
        rs: "negative"
      }, {
        id: "WO-44810",
        opened: "0 BBY · Dec",
        dept: "Superlaser",
        item: "Focus Lens Coupling",
        downtime: "31h",
        cost: "12,004,118",
        status: "Critical",
        rs: "negative"
      }, {
        id: "WO-44788",
        opened: "0 BBY · Nov",
        dept: "Hangar 327",
        item: "Magnetic Field Door",
        downtime: "18h",
        cost: "2,440,900",
        status: "In Repair",
        rs: "warning"
      }, {
        id: "WO-44755",
        opened: "0 BBY · Nov",
        dept: "Tractor Beam",
        item: "Generator Coupling",
        downtime: "9h",
        cost: "990,200",
        status: "Closed",
        rs: "positive"
      }]
    },
    /* Budget Performance — FactBudget (Dept × Month) rolled to Dept × Year.
       Subsidy is allocated to depts by CostDriverWeight (weight / Σweight).
       Station-Wide (Unallocated), key 25, has weight 0 and no allocation.
       allocation     = [Department Subsidy Allocation]  (income actual)
       incomeBudget   = [Income Budget];   incomeVar  = [Income Variance %]  (+ = over-funded = good)
       expenseActual  = [Total Expenses];  expenseBudget = [Expense Budget]
       expenseVar     = [Expense Variance %]  (+ = over-spent = bad)
       netVsBudget    = [Net Surplus vs Budget]. */
    budget: {
      subsidyTotal: 8.55e9,
      // [Subsidy Income] == [Imperial Subsidy]
      totalExpenses: 9.10e9,
      // [Total Expenses]
      bands: 0.15,
      // ±15% calibration band
      kpis: [{
        label: "Subsidy Income",
        value: "₡ 8.55B",
        delta: 0.011,
        spark: [665, 678, 690, 702, 712, 720, 728, 738, 748, 762, 790, 862],
        color: "var(--ds-signal-info)"
      }, {
        label: "Total Expenses",
        value: "₡ 9.10B",
        delta: 0.061,
        invert: true,
        spark: [690, 712, 735, 741, 760, 802, 798, 833, 881, 905, 962, 990],
        color: "var(--ds-signal-warning)"
      }, {
        label: "Income vs Budget",
        value: "99.8%",
        delta: -0.003,
        spark: [101, 100, 99, 100, 98, 99, 100, 101, 99, 100, 99, 100],
        color: "var(--ds-signal-info)"
      }, {
        label: "Expense vs Budget",
        value: "105.9%",
        delta: 0.031,
        invert: true,
        spark: [101, 102, 103, 104, 103, 105, 106, 105, 107, 109, 111, 112],
        color: "var(--ds-signal-negative)"
      }, {
        label: "Within ±5% Expense",
        value: "12",
        unit: "/ 24",
        delta: -2,
        deltaFormat: "number"
      }, {
        label: "Over Budget Expense",
        value: "14",
        unit: "/ 24",
        delta: 3,
        deltaFormat: "number",
        invert: true,
        danger: true
      }],
      depts: [{
        key: 1,
        dept: "Superlaser Battery",
        short: "Superlaser",
        division: "Combat Systems",
        weight: 118,
        allocation: 844974874,
        incomeBudget: 812475841,
        incomeVar: 0.04,
        expenseActual: 816233866,
        expenseBudget: 697635783,
        expenseVar: 0.17,
        netVsBudget: -86099049
      }, {
        key: 2,
        dept: "Turbolaser Batteries",
        short: "Turbolaser",
        division: "Combat Systems",
        weight: 96,
        allocation: 687437186,
        incomeBudget: 673958025,
        incomeVar: 0.02,
        expenseActual: 688179243,
        expenseBudget: 631357104,
        expenseVar: 0.09,
        netVsBudget: -43342979
      }, {
        key: 3,
        dept: "Ion Cannon Control",
        short: "Ion Cannon",
        division: "Combat Systems",
        weight: 54,
        allocation: 386683417,
        incomeBudget: 398642698,
        incomeVar: -0.03,
        expenseActual: 380473805,
        expenseBudget: 369392043,
        expenseVar: 0.03,
        netVsBudget: -23041042
      }, {
        key: 4,
        dept: "Targeting & Fire Control",
        short: "Fire Control",
        division: "Combat Systems",
        weight: 38,
        allocation: 272110553,
        incomeBudget: 256708069,
        incomeVar: 0.06,
        expenseActual: 308564933,
        expenseBudget: 321421805,
        expenseVar: -0.04,
        netVsBudget: 28259356
      }, {
        key: 5,
        dept: "Reactor Core",
        short: "Reactor Core",
        division: "Engineering & Power",
        weight: 110,
        allocation: 787688442,
        incomeBudget: 829145729,
        incomeVar: -0.05,
        expenseActual: 815778008,
        expenseBudget: 721927441,
        expenseVar: 0.13,
        netVsBudget: -135307854
      }, {
        key: 6,
        dept: "Hypermatter Supply",
        short: "Hypermatter",
        division: "Engineering & Power",
        weight: 72,
        allocation: 515577889,
        incomeBudget: 510473158,
        incomeVar: 0.01,
        expenseActual: 577976371,
        expenseBudget: 545260728,
        expenseVar: 0.06,
        netVsBudget: -27610912
      }, {
        key: 7,
        dept: "Power Distribution",
        short: "Power Dist.",
        division: "Engineering & Power",
        weight: 48,
        allocation: 343718593,
        incomeBudget: 333707372,
        incomeVar: 0.03,
        expenseActual: 319896327,
        expenseBudget: 326424823,
        expenseVar: -0.02,
        netVsBudget: 16539718
      }, {
        key: 8,
        dept: "Shield Systems",
        short: "Shields",
        division: "Engineering & Power",
        weight: 58,
        allocation: 415326633,
        incomeBudget: 423802687,
        incomeVar: -0.02,
        expenseActual: 453899150,
        expenseBudget: 408918153,
        expenseVar: 0.11,
        netVsBudget: -53457051
      }, {
        key: 9,
        dept: "TIE Wing Command",
        short: "TIE Wing",
        division: "Flight Operations",
        weight: 84,
        allocation: 601507538,
        incomeBudget: 653812541,
        incomeVar: -0.08,
        expenseActual: 745341007,
        expenseBudget: 642535351,
        expenseVar: 0.16,
        netVsBudget: -155110659
      }, {
        key: 10,
        dept: "Hangar Operations",
        short: "Hangar Ops",
        division: "Flight Operations",
        weight: 46,
        allocation: 329396985,
        incomeBudget: 322938221,
        incomeVar: 0.02,
        expenseActual: 408505514,
        expenseBudget: 404460904,
        expenseVar: 0.01,
        netVsBudget: 2414155
      }, {
        key: 11,
        dept: "Tractor Beam Control",
        short: "Tractor Beam",
        division: "Flight Operations",
        weight: 30,
        allocation: 214824121,
        incomeBudget: 204594401,
        incomeVar: 0.05,
        expenseActual: 241134571,
        expenseBudget: 256526140,
        expenseVar: -0.06,
        netVsBudget: 25621288
      }, {
        key: 12,
        dept: "Stormtrooper Garrison",
        short: "Garrison",
        division: "Security & Detention",
        weight: 90,
        allocation: 644472362,
        incomeBudget: 650982184,
        incomeVar: -0.01,
        expenseActual: 745221975,
        expenseBudget: 696469136,
        expenseVar: 0.07,
        netVsBudget: -55262661
      }, {
        key: 13,
        dept: "Detention Block Ops",
        short: "Detention",
        division: "Security & Detention",
        weight: 26,
        allocation: 186180905,
        incomeBudget: 170808169,
        incomeVar: 0.09,
        expenseActual: 178197505,
        expenseBudget: 195821434,
        expenseVar: -0.09,
        netVsBudget: 32996664
      }, {
        key: 14,
        dept: "ISB Field Office",
        short: "ISB Field",
        division: "Security & Detention",
        weight: 22,
        allocation: 157537688,
        incomeBudget: 177008639,
        incomeVar: -0.11,
        expenseActual: 184058632,
        expenseBudget: 155981891,
        expenseVar: 0.18,
        netVsBudget: -47547691
      }, {
        key: 15,
        dept: "Life Support",
        short: "Life Support",
        division: "Habitation & Life Support",
        weight: 64,
        allocation: 458291457,
        incomeBudget: 458291457,
        incomeVar: 0,
        expenseActual: 453095722,
        expenseBudget: 444211492,
        expenseVar: 0.02,
        netVsBudget: -8884230
      }, {
        key: 16,
        dept: "Habitation & Mess",
        short: "Habitation",
        division: "Habitation & Life Support",
        weight: 40,
        allocation: 286432161,
        incomeBudget: 275415539,
        incomeVar: 0.04,
        expenseActual: 268742370,
        expenseBudget: 277053990,
        expenseVar: -0.03,
        netVsBudget: 19328241
      }, {
        key: 17,
        dept: "Medical & Bacta",
        short: "Medical",
        division: "Habitation & Life Support",
        weight: 28,
        allocation: 200502513,
        incomeBudget: 187385526,
        incomeVar: 0.07,
        expenseActual: 202593283,
        expenseBudget: 213256088,
        expenseVar: -0.05,
        netVsBudget: 23779791
      }, {
        key: 18,
        dept: "Quartermaster Corps",
        short: "Quartermaster",
        division: "Logistics & Supply",
        weight: 36,
        allocation: 257788945,
        incomeBudget: 268530151,
        incomeVar: -0.04,
        expenseActual: 295145343,
        expenseBudget: 281090803,
        expenseVar: 0.05,
        netVsBudget: -24795746
      }, {
        key: 19,
        dept: "Cargo & Freight",
        short: "Cargo",
        division: "Logistics & Supply",
        weight: 30,
        allocation: 214824121,
        incomeBudget: 210611883,
        incomeVar: 0.02,
        expenseActual: 225118473,
        expenseBudget: 227392397,
        expenseVar: -0.01,
        netVsBudget: 6486162
      }, {
        key: 20,
        dept: "Munitions Depot",
        short: "Munitions",
        division: "Logistics & Supply",
        weight: 34,
        allocation: 243467337,
        incomeBudget: 259007805,
        incomeVar: -0.06,
        expenseActual: 265483699,
        expenseBudget: 241348817,
        expenseVar: 0.1,
        netVsBudget: -39675350
      }, {
        key: 21,
        dept: "Bridge Command",
        short: "Bridge",
        division: "Command & Administration",
        weight: 24,
        allocation: 171859296,
        incomeBudget: 166853686,
        incomeVar: 0.03,
        expenseActual: 171312092,
        expenseBudget: 174808257,
        expenseVar: -0.02,
        netVsBudget: 8501776
      }, {
        key: 22,
        dept: "Comms & Signals",
        short: "Comms",
        division: "Command & Administration",
        weight: 18,
        allocation: 128894472,
        incomeBudget: 122756640,
        incomeVar: 0.05,
        expenseActual: 155239015,
        expenseBudget: 149268284,
        expenseVar: 0.04,
        netVsBudget: 167101
      }, {
        key: 23,
        dept: "Imperial Records",
        short: "Records",
        division: "Command & Administration",
        weight: 12,
        allocation: 85929648,
        incomeBudget: 79564489,
        incomeVar: 0.08,
        expenseActual: 82351594,
        expenseBudget: 88550102,
        expenseVar: -0.07,
        netVsBudget: 12563666
      }, {
        key: 24,
        dept: "Sanitation & Waste",
        short: "Sanitation",
        division: "Command & Administration",
        weight: 16,
        allocation: 114572864,
        incomeBudget: 116911086,
        incomeVar: -0.02,
        expenseActual: 117457503,
        expenseBudget: 122351566,
        expenseVar: -0.04,
        netVsBudget: 2555841
      }, {
        key: 25,
        dept: "Station-Wide (Unallocated)",
        short: "Unallocated",
        division: "Command & Administration",
        weight: 0,
        allocation: 0,
        incomeBudget: 0,
        incomeVar: 0,
        expenseActual: 0,
        expenseBudget: 0,
        expenseVar: 0,
        netVsBudget: 0
      }],
      /* Compliance buckets for the current year (24 allocated depts). */
      compliance: {
        onBudget: 19,
        atRisk: 2,
        offBudget: 3
      },
      /* Monthly [Expense Variance %] by division group — small-multiples ribbon. */
      ribbon: [{
        group: "Combat Systems",
        values: [0.015, 0.082, 0.131, 0.15, 0.072, 0.116, 0.121, 0.056, 0.108, 0.147, 0.245, 0.324]
      }, {
        group: "Engineering & Power",
        values: [0.033, 0.062, 0.162, 0.212, 0.071, 0.014, 0.054, 0.064, 0.016, 0.155, 0.169, 0.256]
      }, {
        group: "Flight Operations",
        values: [0.083, -0.004, 0.041, 0.03, 0.139, 0.173, 0.113, 0.037, 0.117, 0.171, 0.227, 0.247]
      }, {
        group: "Security & Detention",
        values: [0.053, 0, 0.043, 0.14, 0.122, 0.159, 0.119, 0.046, 0.108, 0.054, 0.079, 0.186]
      }, {
        group: "Habitation & Life Support",
        values: [0.003, -0.025, 0.035, -0.021, 0.005, -0.062, 0.001, 0.049, 0.056, 0.047, -0.041, -0.019]
      }, {
        group: "Logistics & Supply",
        values: [-0.014, 0.096, 0.108, 0.049, 0.137, 0.078, -0.013, -0.037, -0.039, 0.095, 0.129, 0.144]
      }, {
        group: "Command & Administration",
        values: [-0.038, -0.026, 0.005, -0.097, -0.062, -0.009, -0.009, -0.065, 0.022, 0.068, -0.028, 0.031]
      }]
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/data.js", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/filter-panels.jsx
try { (() => {
// Filter / slicer side-panel explorations for the DSMS Fabric Console.
// Four interactive mock-ups of the same panel (page navigator + Basic Slices +
// Detailed Slices) that differ in HOW the detailed slices expand into a larger
// selection: A inline accordion · B drill-in · C popover card · D two-pane sheet.
// Reuses the Imperial visual vocabulary + a few bundle primitives (Icon, Select,
// Input). Registers each panel on window for the host HTML.

(function () {
  const NS = window.DSMSDesignSystem_197d77 || {};
  const {
    Icon,
    Select,
    Input
  } = NS;
  const {
    useState
  } = React;

  // ── tokens ───────────────────────────────────────────────────────────
  const T = {
    void: "var(--ds-bg-void)",
    hull: "var(--ds-bg-hull)",
    bay: "var(--ds-bg-bay)",
    deck: "var(--ds-bg-deck)",
    conduit: "var(--ds-line-conduit)",
    faint: "var(--ds-line-faint)",
    bright: "var(--ds-line-bright)",
    pri: "var(--ds-text-primary)",
    sec: "var(--ds-text-secondary)",
    muted: "var(--ds-text-muted)",
    faintT: "var(--ds-text-faint)",
    accent: "var(--ds-accent-imperial)",
    accentHi: "var(--ds-accent-imperial-hi)",
    accentDim: "var(--ds-accent-imperial-dim)",
    onAccent: "var(--ds-text-on-accent)",
    info: "var(--ds-signal-info)",
    fD: "var(--ds-font-display)",
    fB: "var(--ds-font-body)",
    fM: "var(--ds-font-mono)",
    rx: "var(--ds-radius-xs)",
    rmd: "var(--ds-radius-md)"
  };

  // ── data ─────────────────────────────────────────────────────────────
  const PAGES = [{
    id: "briefing",
    label: "Executive Briefing",
    icon: "layout-dashboard"
  }, {
    id: "ops",
    label: "Operations Command",
    icon: "git-branch"
  }, {
    id: "budget",
    label: "Budget Performance",
    icon: "gauge"
  }, {
    id: "supply",
    label: "Supply Chain",
    icon: "boxes"
  }, {
    id: "workforce",
    label: "Workforce",
    icon: "users"
  }, {
    id: "maint",
    label: "Maintenance",
    icon: "wrench"
  }];
  const BASIC = [{
    label: "Fiscal Year",
    icon: "calendar",
    value: "0 BBY",
    options: ["0 BBY", "1 BBY", "2 BBY", "3 BBY"]
  }, {
    label: "Division Group",
    icon: "git-branch",
    value: "All Divisions",
    options: ["All Divisions", "Combat Systems", "Engineering & Power", "Flight Operations", "Security & Detention", "Habitation & Life Support", "Logistics & Supply", "Command & Administration"]
  }, {
    label: "Sector",
    icon: "globe",
    value: "All Sectors",
    options: ["All Sectors", "Core Worlds", "Inner Rim", "Mid Rim", "Outer Rim"]
  }, {
    label: "Cost Center",
    icon: "wallet",
    value: "All Centers",
    options: ["All Centers", "CC-1000 · Command", "CC-2000 · Combat", "CC-3000 · Engineering", "CC-4000 · Logistics"]
  }, {
    label: "Scenario",
    icon: "git-compare",
    value: "Actual",
    options: ["Actual", "Budget", "Forecast", "Actual vs Budget"]
  }, {
    label: "Currency",
    icon: "coins",
    value: "Imperial Credits (₡)",
    options: ["Imperial Credits (₡)", "Galactic Standard"]
  }];
  const DETAILED = [{
    id: "products",
    label: "Products",
    icon: "package",
    selected: ["Turbolaser Coolant Cell", "TIE Solar Panel Array", "Reactor Shield Plating"],
    groups: [{
      name: "Munitions",
      items: ["Turbolaser Coolant Cell", "Blaster Gas Canister", "Proton Torpedo", "Concussion Missile", "Ion Charge Pack"]
    }, {
      name: "Fuel & Power",
      items: ["Hypermatter Fuel Cell", "Reactor Shield Plating", "Power Coupling", "Coolant Manifold"]
    }, {
      name: "Spare Parts",
      items: ["TIE Solar Panel Array", "Tractor Beam Coil", "Magnetic Field Door", "Servo Actuator"]
    }, {
      name: "Consumables",
      items: ["Bacta Tank Fluid (40L)", "Ration Pack", "Droid Lubricant", "Med Kit"]
    }]
  }, {
    id: "staff",
    label: "Staff Type",
    icon: "users",
    selected: ["Stormtrooper", "TIE Pilot"],
    groups: [{
      name: "Combat",
      items: ["Stormtrooper", "TIE Pilot", "Gunner", "ISB Agent", "Death Trooper"]
    }, {
      name: "Technical",
      items: ["Reactor Technician", "Shield Operator", "Comms Officer", "Sensor Tech"]
    }, {
      name: "Droids",
      items: ["Service Droid", "Astromech", "Security Droid", "Probe Droid"]
    }, {
      name: "Command",
      items: ["Bridge Officer", "Division Chief", "Quartermaster"]
    }]
  }, {
    id: "areas",
    label: "Death Star Areas",
    icon: "radar",
    selected: ["Reactor Core", "Superlaser Assembly", "Hangar Bay 327"],
    groups: [{
      name: "Core Systems",
      items: ["Reactor Core", "Superlaser Assembly", "Hypermatter Reactor", "Shield Generator"]
    }, {
      name: "Flight",
      items: ["Hangar Bay 327", "Hangar Bay 12", "Tractor Beam Array", "Docking Control"]
    }, {
      name: "Security",
      items: ["Detention Block AA-23", "Garrison Barracks", "ISB Field Office"]
    }, {
      name: "Operations",
      items: ["Bridge Command", "Waste Compaction", "Life Support", "Comms Tower"]
    }]
  }];
  const catById = Object.fromEntries(DETAILED.map(d => [d.id, d]));
  const totalItems = cat => cat.groups.reduce((n, g) => n + g.items.length, 0);
  const initSel = () => Object.fromEntries(DETAILED.map(d => [d.id, d.selected.slice()]));
  const summarize = (cat, arr) => {
    const n = arr.length,
      all = totalItems(cat);
    if (n === 0) return "None";
    if (n >= all) return "All " + all;
    return n + " selected";
  };

  // ═══════════════════════════════════════════════════════════════════════
  // Shared atoms
  // ═══════════════════════════════════════════════════════════════════════
  function PanelChrome({
    children,
    accent
  }) {
    // The panel container — fills the artboard, hull surface, left conduit edge.
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: T.hull,
        borderLeft: "3px solid " + (accent || T.accent),
        fontFamily: T.fB,
        color: T.sec,
        overflow: "hidden"
      }
    }, children);
  }
  function PanelHeader({
    activeCount
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 52,
        padding: "0 14px",
        borderBottom: "1px solid " + T.conduit,
        background: T.hull
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.accentHi,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sliders-horizontal",
      size: 17
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.06em",
        color: T.pri,
        lineHeight: 1.1
      }
    }, "FILTERS"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 8.5,
        fontWeight: 600,
        letterSpacing: "0.2em",
        color: T.faintT,
        marginTop: 2
      }
    }, "SLICER PANE")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fM,
        fontSize: 11,
        fontWeight: 600,
        color: T.accentHi,
        background: T.accentDim,
        padding: "3px 7px",
        borderRadius: T.rx,
        fontVariantNumeric: "tabular-nums"
      }
    }, activeCount, " active"));
  }
  function SectionLabel({
    children,
    right,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: "0 14px",
        marginBottom: 9,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fD,
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: T.muted
      }
    }, children), right);
  }

  // Body section spacing wrapper
  function Block({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 0 4px",
        ...style
      }
    }, children);
  }

  // ── Page navigator ───────────────────────────────────────────────────
  function PageNav() {
    const [active, setActive] = useState("briefing");
    return /*#__PURE__*/React.createElement(Block, {
      style: {
        paddingTop: 14
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Report Pages"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 8px",
        display: "flex",
        flexDirection: "column",
        gap: 1
      }
    }, PAGES.map(p => {
      const on = p.id === active;
      return /*#__PURE__*/React.createElement("button", {
        key: p.id,
        onClick: () => setActive(p.id),
        style: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          height: 32,
          padding: "0 10px",
          border: "none",
          borderRadius: T.rx,
          cursor: "pointer",
          background: on ? T.accentDim : "transparent",
          color: on ? T.pri : T.sec,
          textAlign: "left",
          fontFamily: T.fB,
          transition: "background .12s"
        },
        onMouseEnter: e => {
          if (!on) e.currentTarget.style.background = T.bay;
        },
        onMouseLeave: e => {
          if (!on) e.currentTarget.style.background = "transparent";
        }
      }, on && /*#__PURE__*/React.createElement("span", {
        style: {
          position: "absolute",
          left: 0,
          top: 6,
          bottom: 6,
          width: 2,
          background: T.accent,
          borderRadius: 1
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: on ? T.accentHi : T.faintT,
          display: "flex"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: p.icon,
        size: 15
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12.5,
          fontWeight: on ? 600 : 500,
          whiteSpace: "nowrap"
        }
      }, p.label));
    })));
  }

  // ── Basic slices (dropdowns) ───────────────────────────────────────────
  function BasicField({
    f
  }) {
    const [v, setV] = useState(f.value);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontFamily: T.fD,
        fontSize: 9.5,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: T.faintT
      }
    }, f.label), /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      value: v,
      icon: f.icon,
      options: f.options,
      onChange: e => setV(e.target.value),
      style: {
        width: "100%",
        display: "flex"
      }
    }));
  }
  function BasicSlices() {
    return /*#__PURE__*/React.createElement(Block, null, /*#__PURE__*/React.createElement(SectionLabel, {
      right: /*#__PURE__*/React.createElement(ResetLink, null)
    }, "Basic Slices"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px",
        display: "flex",
        flexDirection: "column",
        gap: 11
      }
    }, BASIC.map(f => /*#__PURE__*/React.createElement(BasicField, {
      key: f.label,
      f: f
    }))));
  }
  function ResetLink({
    onClick
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        border: "none",
        background: "transparent",
        color: T.faintT,
        cursor: "pointer",
        fontFamily: T.fD,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: 0
      },
      onMouseEnter: e => e.currentTarget.style.color = T.accentHi,
      onMouseLeave: e => e.currentTarget.style.color = T.faintT
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "rotate-ccw",
      size: 11
    }), " Reset");
  }

  // ── Multi-select list (grouped checkboxes) ─────────────────────────────
  function SearchBox({
    value,
    onChange,
    placeholder
  }) {
    return /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      icon: "search",
      placeholder: placeholder || "Search…",
      value: value,
      onChange: e => onChange(e.target.value),
      style: {
        width: "100%"
      }
    });
  }
  function CheckRow({
    label,
    on,
    onClick
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9,
        width: "100%",
        padding: "6px 8px",
        border: "none",
        borderRadius: T.rx,
        background: "transparent",
        cursor: "pointer",
        color: on ? T.pri : T.sec,
        textAlign: "left",
        fontFamily: T.fB,
        fontSize: 12.5,
        transition: "background .12s"
      },
      onMouseEnter: e => e.currentTarget.style.background = T.bay,
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        width: 15,
        height: 15,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: on ? T.accent : "transparent",
        border: "1.5px solid " + (on ? T.accent : T.bright),
        color: T.onAccent,
        transition: "background .12s, border-color .12s"
      }
    }, on && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 10,
      strokeWidth: 3.5
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, label));
  }
  function GroupedList({
    cat,
    sel,
    onToggle,
    query
  }) {
    const q = (query || "").trim().toLowerCase();
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, cat.groups.map(g => {
      const items = g.items.filter(it => !q || it.toLowerCase().includes(q));
      if (!items.length) return null;
      return /*#__PURE__*/React.createElement("div", {
        key: g.name,
        style: {
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: T.fD,
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: T.faintT,
          padding: "6px 8px 4px"
        }
      }, g.name), items.map(it => /*#__PURE__*/React.createElement(CheckRow, {
        key: it,
        label: it,
        on: sel.includes(it),
        onClick: () => onToggle(it)
      })));
    }));
  }

  // selected chips row
  function Chips({
    items,
    onRemove,
    max
  }) {
    const shown = max ? items.slice(0, max) : items;
    const extra = items.length - shown.length;
    if (!items.length) return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fB,
        fontSize: 11.5,
        color: T.faintT,
        fontStyle: "italic"
      }
    }, "Nothing selected");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5
      }
    }, shown.map(it => /*#__PURE__*/React.createElement("span", {
      key: it,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 6px 3px 8px",
        background: T.deck,
        border: "1px solid " + T.conduit,
        borderRadius: T.rx,
        fontFamily: T.fB,
        fontSize: 11,
        color: T.sec,
        maxWidth: 150
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, it), onRemove && /*#__PURE__*/React.createElement("button", {
      onClick: () => onRemove(it),
      style: {
        display: "flex",
        border: "none",
        background: "transparent",
        color: T.faintT,
        cursor: "pointer",
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 11
    })))), extra > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 7px",
        fontFamily: T.fM,
        fontSize: 11,
        color: T.muted,
        background: T.bay,
        borderRadius: T.rx
      }
    }, "+", extra));
  }

  // select-all / clear control for a category list
  function ListTools({
    cat,
    sel,
    setSel
  }) {
    const all = totalItems(cat);
    const allItems = cat.groups.flatMap(g => g.items);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2px 2px 8px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fM,
        fontSize: 11,
        color: T.muted,
        fontVariantNumeric: "tabular-nums"
      }
    }, sel.length, " / ", all), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(MiniBtn, {
      onClick: () => setSel(allItems.slice())
    }, "All"), /*#__PURE__*/React.createElement(MiniBtn, {
      onClick: () => setSel([])
    }, "Clear")));
  }
  function MiniBtn({
    children,
    onClick
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        border: "1px solid " + T.conduit,
        background: T.bay,
        color: T.sec,
        cursor: "pointer",
        borderRadius: T.rx,
        padding: "3px 9px",
        fontFamily: T.fD,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        transition: "border-color .12s, color .12s"
      },
      onMouseEnter: e => {
        e.currentTarget.style.borderColor = T.bright;
        e.currentTarget.style.color = T.pri;
      },
      onMouseLeave: e => {
        e.currentTarget.style.borderColor = T.conduit;
        e.currentTarget.style.color = T.sec;
      }
    }, children);
  }

  // detail-row trigger (icon · label · summary · chevron)
  function DetailRow({
    cat,
    sel,
    open,
    onClick,
    arrow = "chevron-down"
  }) {
    const isOpen = open === true;
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        padding: "11px 12px",
        border: "1px solid " + (isOpen ? T.bright : T.conduit),
        borderRadius: T.rx,
        cursor: "pointer",
        background: isOpen ? T.bay : T.deck,
        color: T.pri,
        textAlign: "left",
        fontFamily: T.fB,
        transition: "border-color .12s, background .12s"
      },
      onMouseEnter: e => {
        if (!isOpen) e.currentTarget.style.borderColor = T.bright;
      },
      onMouseLeave: e => {
        if (!isOpen) e.currentTarget.style.borderColor = T.conduit;
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        width: 30,
        height: 30,
        borderRadius: T.rx,
        background: T.hull,
        border: "1px solid " + T.conduit,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: T.accentHi
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat.icon,
      size: 15
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        color: T.pri,
        lineHeight: 1.2
      }
    }, cat.label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: T.fM,
        fontSize: 10.5,
        color: sel.length ? T.info : T.faintT,
        marginTop: 2,
        fontVariantNumeric: "tabular-nums"
      }
    }, summarize(cat, sel))), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        color: T.muted,
        display: "flex",
        transform: isOpen && arrow === "chevron-down" ? "rotate(180deg)" : "none",
        transition: "transform .18s"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: arrow,
      size: 16
    })));
  }
  function FooterBar({
    count,
    onReset
  }) {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "12px 14px",
        borderTop: "1px solid " + T.conduit,
        background: T.hull
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onReset,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: "1px solid " + T.conduit,
        background: "transparent",
        color: T.muted,
        cursor: "pointer",
        borderRadius: T.rx,
        padding: "0 12px",
        height: 32,
        fontFamily: T.fD,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "rotate-ccw",
      size: 13
    }), " Reset"), /*#__PURE__*/React.createElement("button", {
      style: {
        flex: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        border: "none",
        background: T.accent,
        color: T.onAccent,
        cursor: "pointer",
        borderRadius: T.rx,
        height: 32,
        fontFamily: T.fD,
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      },
      onMouseEnter: e => e.currentTarget.style.background = T.accentHi,
      onMouseLeave: e => e.currentTarget.style.background = T.accent
    }, "Apply Filters ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fM,
        opacity: 0.85
      }
    }, "\xB7 ", count)));
  }

  // active basic + detailed count helper (basics that aren't "All …" + detailed cats with selections)
  const activeCount = sel => {
    const det = DETAILED.filter(d => sel[d.id].length > 0 && sel[d.id].length < totalItems(d)).length + DETAILED.filter(d => sel[d.id].length >= totalItems(d) ? 0 : 0).length;
    // count categories with a non-empty, non-full selection as "active"
    const detActive = DETAILED.filter(d => sel[d.id].length > 0 && sel[d.id].length < totalItems(d)).length;
    return 3 + detActive; // 3 illustrative basic slices engaged
  };

  // expose shared bits for the variant file
  window.DSMSFilter = {
    T,
    PAGES,
    BASIC,
    DETAILED,
    catById,
    totalItems,
    initSel,
    summarize,
    activeCount,
    PanelChrome,
    PanelHeader,
    SectionLabel,
    Block,
    PageNav,
    BasicSlices,
    ResetLink,
    SearchBox,
    CheckRow,
    GroupedList,
    Chips,
    ListTools,
    MiniBtn,
    DetailRow,
    FooterBar
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/filter-panels.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/filter-takeover.jsx
try { (() => {
// "Open all detailed slicers" takeover, shown IN CONTEXT over a report page.
// One button ("Detailed Filters") opens every detailed slicer (Products · Staff
// Type · Death Star Areas) at once in the foreground while the report page sits
// greyed-out behind a scrim. Two foreground arrangements:
//   mode="columns" — all three slicers visible side by side
//   mode="tabbed"  — one large slicer area, tabs switch between the three
// Consumes window.DSMSFilter (shared atoms + data). Registers on window.

(function () {
  const F = window.DSMSFilter;
  const {
    T,
    DETAILED,
    catById,
    totalItems,
    initSel
  } = F;
  const {
    useState,
    useEffect
  } = React;
  const {
    Icon
  } = window.DSMSDesignSystem_197d77;
  const detCount = sel => Object.values(sel).reduce((n, a) => n + a.length, 0);
  const toggleIn = setSel => (cat, it) => setSel(s => {
    const a = s[cat.id];
    return {
      ...s,
      [cat.id]: a.includes(it) ? a.filter(x => x !== it) : [...a, it]
    };
  });

  // ── faux report page (the greyed-out background) ───────────────────────
  function MockReport({
    onOpen,
    activeCount,
    dim
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        background: T.void,
        fontFamily: T.fB
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 56px",
        background: T.hull,
        borderRight: "1px solid " + T.conduit,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "14px 0",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Seal, null), ["layout-dashboard", "git-branch", "gauge", "boxes", "users", "wrench"].map((ic, i) => /*#__PURE__*/React.createElement("span", {
      key: ic,
      style: {
        width: 34,
        height: 34,
        borderRadius: T.rx,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: i === 0 ? T.accentHi : T.faintT,
        background: i === 0 ? T.accentDim : "transparent"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 17
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 56px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "0 20px",
        background: T.hull,
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 18,
        fontWeight: 700,
        color: T.pri,
        lineHeight: 1.1
      }
    }, "Imperial Executive Briefing"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fB,
        fontSize: 10.5,
        color: T.faintT,
        marginTop: 2,
        letterSpacing: "0.04em"
      }
    }, "FILED UNDER \xB7 Finance \u203A P&L")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: onOpen,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 36,
        padding: "0 14px",
        background: T.accent,
        color: T.onAccent,
        border: "none",
        borderRadius: T.rx,
        cursor: "pointer",
        fontFamily: T.fD,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        boxShadow: dim ? "none" : "0 0 0 4px " + T.accentDim
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "list-filter",
      size: 16
    }), " Detailed Filters", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fM,
        fontSize: 11,
        background: "rgba(255,255,255,.22)",
        borderRadius: 4,
        padding: "1px 6px"
      }
    }, activeCount))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        backgroundImage: "var(--ds-texture-grid)",
        backgroundSize: "var(--ds-texture-grid-size)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14
      }
    }, [["Total Income", "₡ 10.40B", T.info], ["Total Expenses", "₡ 9.10B", "var(--ds-signal-warning)"], ["Net Surplus", "₡ 1.28B", "var(--ds-signal-positive)"], ["Subsidy Coverage", "94%", T.accentHi]].map(([l, v, c]) => /*#__PURE__*/React.createElement(Card, {
      key: l,
      h: 108
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: T.muted
      }
    }, l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fM,
        fontSize: 26,
        fontWeight: 600,
        color: T.pri,
        marginTop: 12,
        letterSpacing: "-0.02em"
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 3,
        width: 56,
        background: c,
        borderRadius: 2,
        marginTop: 12,
        opacity: 0.85
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr",
        gap: 16,
        flex: 1,
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Income vs Expenses \xB7 Trailing 12"
    }, /*#__PURE__*/React.createElement(FauxLine, null)), /*#__PURE__*/React.createElement(Card, {
      title: "Expense Mix"
    }, /*#__PURE__*/React.createElement(FauxDonut, null))))));
  }
  function Seal() {
    return /*#__PURE__*/React.createElement("svg", {
      width: "26",
      height: "26",
      viewBox: "0 0 48 48",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M24 2 L43 13 L43 35 L24 46 L5 35 L5 13 Z",
      stroke: "var(--ds-accent-imperial)",
      strokeWidth: "1.6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "13",
      stroke: "var(--ds-line-bright)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "4.6",
      stroke: "var(--ds-accent-imperial)",
      strokeWidth: "1.6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "1.7",
      fill: "var(--ds-accent-imperial)"
    }));
  }
  function Card({
    children,
    title,
    h
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: T.hull,
        border: "1px solid " + T.conduit,
        borderRadius: T.rmd,
        padding: 16,
        height: h,
        display: "flex",
        flexDirection: "column",
        minHeight: 0
      }
    }, title && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 13,
        fontWeight: 600,
        color: T.pri,
        marginBottom: 12
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0
      }
    }, children));
  }
  function FauxLine() {
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 180",
      preserveAspectRatio: "none",
      style: {
        width: "100%",
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "0,140 40,132 80,128 120,118 160,112 200,104 240,96 280,84 320,70 360,46 400,18",
      fill: "none",
      stroke: T.info,
      strokeWidth: "2.5"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "0,150 40,146 80,140 120,138 160,132 200,118 240,120 280,108 320,92 360,70 400,58",
      fill: "none",
      stroke: "var(--ds-signal-warning)",
      strokeWidth: "2.5"
    }));
  }
  function FauxDonut() {
    const segs = [["var(--ds-data-1)", 0.42], ["var(--ds-data-2)", 0.28], ["var(--ds-data-5)", 0.20], ["var(--ds-data-3)", 0.10]];
    let a = -Math.PI / 2;
    const cx = 60,
      cy = 60,
      r = 46;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120"
    }, segs.map(([c, frac], i) => {
      const a0 = a,
        a1 = a + frac * Math.PI * 2;
      a = a1;
      const x0 = cx + r * Math.cos(a0),
        y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1),
        y1 = cy + r * Math.sin(a1);
      const large = a1 - a0 > Math.PI ? 1 : 0;
      return /*#__PURE__*/React.createElement("path", {
        key: i,
        d: `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`,
        fill: c
      });
    }), /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: "27",
      fill: T.hull
    })));
  }

  // ── one detailed slicer "column" ───────────────────────────────────────
  function SlicerColumn({
    cat,
    sel,
    onToggle,
    setSel,
    query,
    setQuery
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        background: T.hull,
        border: "1px solid " + T.conduit,
        borderRadius: T.rmd,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "12px 12px 10px",
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        width: 30,
        height: 30,
        borderRadius: T.rx,
        background: T.bay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: T.accentHi
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat.icon,
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 13,
        fontWeight: 700,
        color: T.pri,
        lineHeight: 1.1
      }
    }, cat.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fM,
        fontSize: 10,
        color: sel.length ? T.info : T.faintT,
        marginTop: 1
      }
    }, sel.length, " / ", totalItems(cat), " selected"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 auto",
        padding: "10px 10px 4px"
      }
    }, /*#__PURE__*/React.createElement(F.SearchBox, {
      value: query,
      onChange: setQuery,
      placeholder: "Search " + cat.label.toLowerCase() + "…"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(F.ListTools, {
      cat: cat,
      sel: sel,
      setSel: setSel
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "0 8px 8px"
      }
    }, /*#__PURE__*/React.createElement(F.GroupedList, {
      cat: cat,
      sel: sel,
      query: query,
      onToggle: onToggle
    })));
  }

  // ── the takeover ───────────────────────────────────────────────────────
  function ReportTakeover({
    mode = "columns"
  }) {
    const [sel, setSel] = useState(initSel);
    const [open, setOpen] = useState(true); // default open so the greyed state shows
    const [shown, setShown] = useState(false);
    const [q, setQ] = useState({});
    const [tab, setTab] = useState(DETAILED[0].id);
    const toggle = toggleIn(setSel);
    const setCat = (id, arr) => setSel(s => ({
      ...s,
      [id]: arr
    }));
    const setQuery = (id, v) => setQ(s => ({
      ...s,
      [id]: v
    }));
    useEffect(() => {
      if (!open) {
        setShown(false);
        return;
      }
      const r = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r);
    }, [open]);
    const activeCats = DETAILED.filter(d => sel[d.id].length > 0).length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: T.void
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        filter: open ? "grayscale(0.5) brightness(0.42)" : "none",
        transition: "filter .2s",
        pointerEvents: open ? "none" : "auto"
      }
    }, /*#__PURE__*/React.createElement(MockReport, {
      onOpen: () => setOpen(true),
      activeCount: detCount(sel),
      dim: open
    })), open && /*#__PURE__*/React.createElement("div", {
      onClick: () => setOpen(false),
      style: {
        position: "absolute",
        inset: 0,
        background: shown ? "rgba(6,7,9,.5)" : "rgba(6,7,9,0)",
        transition: "background .2s",
        zIndex: 1
      }
    }), open && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        zIndex: 2,
        ...(mode === "columns" ? {
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 28
        } : {
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 28
        }),
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        pointerEvents: "auto",
        width: mode === "columns" ? "100%" : 560,
        maxWidth: mode === "columns" ? 1040 : 560,
        height: "100%",
        maxHeight: 680,
        display: "flex",
        flexDirection: "column",
        background: T.bay,
        border: "1px solid " + T.bright,
        borderRadius: 12,
        boxShadow: "0 32px 90px rgba(0,0,0,.6)",
        overflow: "hidden",
        transform: shown ? "scale(1)" : "scale(.96)",
        opacity: shown ? 1 : 0,
        transition: "transform .2s cubic-bezier(.2,.7,.3,1), opacity .2s"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 14px 16px 18px",
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.accentHi,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "list-filter",
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 17,
        fontWeight: 700,
        color: T.pri,
        lineHeight: 1.1
      }
    }, "Detailed Filters"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fB,
        fontSize: 11.5,
        color: T.muted,
        marginTop: 2
      }
    }, "Refine Products, Staff Type & Death Star Areas across the report")), /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(false),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        border: "none",
        background: "transparent",
        color: T.muted,
        cursor: "pointer",
        borderRadius: T.rx
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 20
    }))), mode === "columns" ? /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14,
        padding: 16
      }
    }, DETAILED.map(cat => /*#__PURE__*/React.createElement(SlicerColumn, {
      key: cat.id,
      cat: cat,
      sel: sel[cat.id],
      query: q[cat.id] || "",
      setQuery: v => setQuery(cat.id, v),
      onToggle: it => toggle(cat, it),
      setSel: a => setCat(cat.id, a)
    }))) : /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        padding: 16,
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        background: T.deck,
        border: "1px solid " + T.conduit,
        borderRadius: T.rx,
        padding: 3
      }
    }, DETAILED.map(cat => {
      const on = cat.id === tab;
      return /*#__PURE__*/React.createElement("button", {
        key: cat.id,
        onClick: () => setTab(cat.id),
        style: {
          flex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          padding: "8px 6px",
          border: "none",
          borderRadius: T.rx,
          cursor: "pointer",
          background: on ? T.accentDim : "transparent",
          color: on ? T.pri : T.muted,
          fontFamily: T.fD,
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: "0.04em"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: cat.icon,
        size: 15
      }), " ", cat.label, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: T.fM,
          fontSize: 10,
          color: sel[cat.id].length ? T.info : T.faintT
        }
      }, sel[cat.id].length));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement(SlicerColumn, {
      cat: catById[tab],
      sel: sel[tab],
      query: q[tab] || "",
      setQuery: v => setQuery(tab, v),
      onToggle: it => toggle(catById[tab], it),
      setSel: a => setCat(tab, a)
    }))), /*#__PURE__*/React.createElement("footer", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderTop: "1px solid " + T.conduit,
        background: T.hull
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: T.fB,
        fontSize: 12,
        color: T.muted
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontFamily: T.fM,
        color: T.pri
      }
    }, detCount(sel)), " across ", /*#__PURE__*/React.createElement("b", {
      style: {
        fontFamily: T.fM,
        color: T.pri
      }
    }, activeCats), " slicers"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setSel(initSel()),
      style: {
        marginLeft: "auto",
        border: "none",
        background: "transparent",
        color: T.faintT,
        cursor: "pointer",
        fontFamily: T.fD,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase"
      }
    }, "Clear all"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(false),
      style: {
        border: "1px solid " + T.conduit,
        background: "transparent",
        color: T.muted,
        cursor: "pointer",
        borderRadius: T.rx,
        height: 36,
        padding: "0 16px",
        fontFamily: T.fD,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase"
      }
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(false),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        border: "none",
        background: T.accent,
        color: T.onAccent,
        cursor: "pointer",
        borderRadius: T.rx,
        height: 36,
        padding: "0 20px",
        fontFamily: T.fD,
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      }
    }, "Apply Filters")))));
  }
  window.DSMSFilterTakeover = {
    ReportTakeover
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/filter-takeover.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/filter-variants.jsx
try { (() => {
// The four slicer-panel variants. Each consumes window.DSMSFilter (shared atoms
// + data) and registers itself on window for the host HTML.
//   A · Inline accordion   — detailed slices expand in place
//   B · Drill-in           — panel slides to a full-height dedicated slicer
//   C · Popover card       — a floating card opens over the dimmed panel
//   D · Two-pane sheet      — full takeover: category rail + options pane

(function () {
  const F = window.DSMSFilter;
  const {
    T,
    DETAILED,
    catById,
    totalItems,
    initSel
  } = F;
  const {
    useState,
    useEffect
  } = React;
  const {
    Icon
  } = window.DSMSDesignSystem_197d77;
  const detCount = sel => Object.values(sel).reduce((n, a) => n + a.length, 0);
  const makeToggle = setSel => (cat, it) => setSel(s => {
    const a = s[cat.id];
    return {
      ...s,
      [cat.id]: a.includes(it) ? a.filter(x => x !== it) : [...a, it]
    };
  });
  function Divider() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: T.conduit,
        margin: "0 14px"
      }
    });
  }
  function DetailHead({
    children
  }) {
    return /*#__PURE__*/React.createElement(F.SectionLabel, {
      right: /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: T.fD,
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: T.faintT
        }
      }, children)
    }, "Detailed Slices");
  }

  // ═══════════════════════════════════════════════════════════════════════
  // A · INLINE ACCORDION
  // ═══════════════════════════════════════════════════════════════════════
  function PanelA() {
    const [sel, setSel] = useState(initSel);
    const [open, setOpen] = useState({});
    const [q, setQ] = useState({});
    const toggle = makeToggle(setSel);
    const setCat = (id, arr) => setSel(s => ({
      ...s,
      [id]: arr
    }));
    return /*#__PURE__*/React.createElement(F.PanelChrome, null, /*#__PURE__*/React.createElement(F.PanelHeader, {
      activeCount: F.activeCount(sel)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement(F.PageNav, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.BasicSlices, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.Block, null, /*#__PURE__*/React.createElement(DetailHead, null, "Expand in place"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, DETAILED.map(cat => {
      const isOpen = !!open[cat.id];
      return /*#__PURE__*/React.createElement("div", {
        key: cat.id
      }, /*#__PURE__*/React.createElement(F.DetailRow, {
        cat: cat,
        sel: sel[cat.id],
        open: isOpen,
        onClick: () => setOpen(o => ({
          ...o,
          [cat.id]: !o[cat.id]
        }))
      }), isOpen && /*#__PURE__*/React.createElement("div", {
        style: {
          border: "1px solid " + T.conduit,
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          marginTop: -2,
          padding: "10px 10px 8px",
          background: T.hull
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement(F.SearchBox, {
        value: q[cat.id] || "",
        onChange: v => setQ(s => ({
          ...s,
          [cat.id]: v
        })),
        placeholder: "Search " + cat.label.toLowerCase() + "…"
      })), /*#__PURE__*/React.createElement(F.ListTools, {
        cat: cat,
        sel: sel[cat.id],
        setSel: a => setCat(cat.id, a)
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          maxHeight: 198,
          overflowY: "auto",
          margin: "0 -2px"
        }
      }, /*#__PURE__*/React.createElement(F.GroupedList, {
        cat: cat,
        sel: sel[cat.id],
        query: q[cat.id],
        onToggle: it => toggle(cat, it)
      }))));
    })))), /*#__PURE__*/React.createElement(F.FooterBar, {
      count: detCount(sel),
      onReset: () => {
        setSel(initSel());
        setOpen({});
      }
    }));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // B · DRILL-IN  (master → detail, full-panel)
  // ═══════════════════════════════════════════════════════════════════════
  function PanelB() {
    const [sel, setSel] = useState(initSel);
    const [drill, setDrill] = useState(null);
    const toggle = makeToggle(setSel);
    return /*#__PURE__*/React.createElement(F.PanelChrome, null, /*#__PURE__*/React.createElement(F.PanelHeader, {
      activeCount: F.activeCount(sel)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement(F.PageNav, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.BasicSlices, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.Block, null, /*#__PURE__*/React.createElement(DetailHead, null, "Tap to drill in"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, DETAILED.map(cat => /*#__PURE__*/React.createElement(F.DetailRow, {
      key: cat.id,
      cat: cat,
      sel: sel[cat.id],
      open: false,
      arrow: "chevron-right",
      onClick: () => setDrill(cat.id)
    }))))), /*#__PURE__*/React.createElement(F.FooterBar, {
      count: detCount(sel),
      onReset: () => setSel(initSel())
    }), drill && /*#__PURE__*/React.createElement(DrillView, {
      cat: catById[drill],
      sel: sel[drill],
      onToggle: it => toggle(catById[drill], it),
      setSel: arr => setSel(s => ({
        ...s,
        [drill]: arr
      })),
      onBack: () => setDrill(null)
    }));
  }
  function DrillView({
    cat,
    sel,
    onToggle,
    setSel,
    onBack
  }) {
    const [q, setQ] = useState("");
    const [shown, setShown] = useState(false);
    useEffect(() => {
      const r = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: T.hull,
        display: "flex",
        flexDirection: "column",
        transform: shown ? "translateX(0)" : "translateX(100%)",
        transition: "transform .24s cubic-bezier(.2,.7,.3,1)",
        boxShadow: "-12px 0 32px rgba(0,0,0,.35)",
        zIndex: 5
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 52,
        padding: "0 10px 0 6px",
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: iconBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        width: 28,
        height: 28,
        borderRadius: T.rx,
        background: T.bay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: T.accentHi
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat.icon,
      size: 15
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 14,
        fontWeight: 700,
        color: T.pri,
        lineHeight: 1.1
      }
    }, cat.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fM,
        fontSize: 10,
        color: T.muted,
        marginTop: 1
      }
    }, sel.length, " of ", totalItems(cat), " selected"))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 12px 6px"
      }
    }, /*#__PURE__*/React.createElement(F.SearchBox, {
      value: q,
      onChange: setQ,
      placeholder: "Search " + cat.label.toLowerCase() + "…"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(F.ListTools, {
      cat: cat,
      sel: sel,
      setSel: setSel
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "0 10px 10px"
      }
    }, /*#__PURE__*/React.createElement(F.GroupedList, {
      cat: cat,
      sel: sel,
      query: q,
      onToggle: onToggle
    })), /*#__PURE__*/React.createElement("footer", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        gap: 10,
        padding: "12px 14px",
        borderTop: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: primaryBtn
    }, "Done \xB7 ", sel.length)));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // C · POPOVER CARD  (floating over dimmed panel)
  // ═══════════════════════════════════════════════════════════════════════
  function PanelC() {
    const [sel, setSel] = useState(initSel);
    const [pop, setPop] = useState(null);
    const toggle = makeToggle(setSel);
    return /*#__PURE__*/React.createElement(F.PanelChrome, null, /*#__PURE__*/React.createElement(F.PanelHeader, {
      activeCount: F.activeCount(sel)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement(F.PageNav, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.BasicSlices, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.Block, null, /*#__PURE__*/React.createElement(DetailHead, null, "Opens a popover"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, DETAILED.map(cat => /*#__PURE__*/React.createElement("div", {
      key: cat.id
    }, /*#__PURE__*/React.createElement(F.DetailRow, {
      cat: cat,
      sel: sel[cat.id],
      open: pop === cat.id,
      arrow: "square-arrow-out-up-right",
      onClick: () => setPop(cat.id)
    }), sel[cat.id].length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 4px 2px"
      }
    }, /*#__PURE__*/React.createElement(F.Chips, {
      items: sel[cat.id],
      max: 4,
      onRemove: it => toggle(cat, it)
    }))))))), /*#__PURE__*/React.createElement(F.FooterBar, {
      count: detCount(sel),
      onReset: () => setSel(initSel())
    }), pop && /*#__PURE__*/React.createElement(PopoverCard, {
      cat: catById[pop],
      sel: sel[pop],
      onToggle: it => toggle(catById[pop], it),
      setSel: arr => setSel(s => ({
        ...s,
        [pop]: arr
      })),
      onClose: () => setPop(null)
    }));
  }
  function PopoverCard({
    cat,
    sel,
    onToggle,
    setSel,
    onClose
  }) {
    const [q, setQ] = useState("");
    const [shown, setShown] = useState(false);
    useEffect(() => {
      const r = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 6,
        background: shown ? "rgba(8,9,11,.62)" : "rgba(8,9,11,0)",
        transition: "background .18s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        width: "100%",
        maxHeight: "82%",
        display: "flex",
        flexDirection: "column",
        background: T.bay,
        border: "1px solid " + T.bright,
        borderRadius: T.rmd,
        boxShadow: "0 24px 60px rgba(0,0,0,.5)",
        overflow: "hidden",
        transform: shown ? "scale(1)" : "scale(.94)",
        opacity: shown ? 1 : 0,
        transition: "transform .18s cubic-bezier(.2,.7,.3,1), opacity .18s"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 10px 12px 14px",
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.accentHi,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat.icon,
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fD,
        fontSize: 13.5,
        fontWeight: 700,
        color: T.pri,
        lineHeight: 1.1
      }
    }, cat.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: T.fM,
        fontSize: 10,
        color: T.muted,
        marginTop: 1
      }
    }, sel.length, " of ", totalItems(cat), " selected")), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: iconBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 17
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 12px 4px"
      }
    }, /*#__PURE__*/React.createElement(F.SearchBox, {
      value: q,
      onChange: setQ,
      placeholder: "Search " + cat.label.toLowerCase() + "…"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(F.ListTools, {
      cat: cat,
      sel: sel,
      setSel: setSel
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "0 10px 6px"
      }
    }, /*#__PURE__*/React.createElement(F.GroupedList, {
      cat: cat,
      sel: sel,
      query: q,
      onToggle: onToggle
    })), /*#__PURE__*/React.createElement("footer", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        gap: 10,
        padding: "10px 12px",
        borderTop: "1px solid " + T.conduit,
        background: T.hull
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setSel([]),
      style: ghostBtn
    }, "Clear"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: primaryBtn
    }, "Apply \xB7 ", sel.length))));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // D · TWO-PANE SHEET  (full takeover: category rail + options pane)
  // ═══════════════════════════════════════════════════════════════════════
  function PanelD() {
    const [sel, setSel] = useState(initSel);
    const [sheet, setSheet] = useState(false);
    const [active, setActive] = useState(DETAILED[0].id);
    const toggle = makeToggle(setSel);
    const open = id => {
      setActive(id);
      setSheet(true);
    };
    return /*#__PURE__*/React.createElement(F.PanelChrome, null, /*#__PURE__*/React.createElement(F.PanelHeader, {
      activeCount: F.activeCount(sel)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement(F.PageNav, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.BasicSlices, null), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(F.Block, null, /*#__PURE__*/React.createElement(F.SectionLabel, {
      right: /*#__PURE__*/React.createElement("button", {
        onClick: () => open(DETAILED[0].id),
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          border: "none",
          background: "transparent",
          color: T.accentHi,
          cursor: "pointer",
          fontFamily: T.fD,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: 0
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "maximize-2",
        size: 11
      }), " Open")
    }, "Detailed Slices"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, DETAILED.map(cat => /*#__PURE__*/React.createElement(F.DetailRow, {
      key: cat.id,
      cat: cat,
      sel: sel[cat.id],
      open: false,
      arrow: "chevron-right",
      onClick: () => open(cat.id)
    }))))), /*#__PURE__*/React.createElement(F.FooterBar, {
      count: detCount(sel),
      onReset: () => setSel(initSel())
    }), sheet && /*#__PURE__*/React.createElement(TwoPaneSheet, {
      sel: sel,
      active: active,
      setActive: setActive,
      onToggle: toggle,
      setCat: (id, arr) => setSel(s => ({
        ...s,
        [id]: arr
      })),
      onClose: () => setSheet(false)
    }));
  }
  function TwoPaneSheet({
    sel,
    active,
    setActive,
    onToggle,
    setCat,
    onClose
  }) {
    const [q, setQ] = useState("");
    const [shown, setShown] = useState(false);
    useEffect(() => {
      const r = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r);
    }, []);
    const cat = catById[active];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 7,
        background: T.hull,
        display: "flex",
        flexDirection: "column",
        transform: shown ? "translateY(0)" : "translateY(8px)",
        opacity: shown ? 1 : 0,
        transition: "transform .2s ease, opacity .2s ease"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 52,
        padding: "0 8px 0 14px",
        borderBottom: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: T.accentHi,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sliders-horizontal",
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontFamily: T.fD,
        fontSize: 14,
        fontWeight: 700,
        color: T.pri
      }
    }, "Detailed Slices"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: iconBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 18
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 100px",
        borderRight: "1px solid " + T.conduit,
        background: T.void,
        padding: "8px 6px",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, DETAILED.map(c => {
      const on = c.id === active;
      return /*#__PURE__*/React.createElement("button", {
        key: c.id,
        onClick: () => {
          setActive(c.id);
          setQ("");
        },
        style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 5,
          width: "100%",
          padding: "9px 8px",
          border: "1px solid " + (on ? T.bright : "transparent"),
          borderRadius: T.rx,
          cursor: "pointer",
          background: on ? T.bay : "transparent",
          color: on ? T.pri : T.muted,
          textAlign: "left"
        }
      }, on && /*#__PURE__*/React.createElement("span", {
        style: {
          position: "absolute",
          left: 0,
          top: 8,
          bottom: 8,
          width: 2,
          background: T.accent,
          borderRadius: 1
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: on ? T.accentHi : T.faintT,
          display: "flex"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: c.icon,
        size: 16
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: T.fD,
          fontSize: 10.5,
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: "0.02em"
        }
      }, c.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: T.fM,
          fontSize: 9.5,
          color: sel[c.id].length ? T.info : T.faintT
        }
      }, sel[c.id].length, "/", totalItems(c)));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 auto",
        padding: "10px 10px 6px",
        borderBottom: "1px solid " + T.faint
      }
    }, /*#__PURE__*/React.createElement(F.SearchBox, {
      value: q,
      onChange: setQ,
      placeholder: "Search " + cat.label.toLowerCase() + "…"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(F.Chips, {
      items: sel[active],
      max: 3,
      onRemove: it => onToggle(cat, it)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(F.ListTools, {
      cat: cat,
      sel: sel[active],
      setSel: a => setCat(active, a)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "4px 8px 8px"
      }
    }, /*#__PURE__*/React.createElement(F.GroupedList, {
      cat: cat,
      sel: sel[active],
      query: q,
      onToggle: it => onToggle(cat, it)
    })))), /*#__PURE__*/React.createElement("footer", {
      style: {
        flex: "0 0 auto",
        display: "flex",
        gap: 10,
        padding: "12px 14px",
        borderTop: "1px solid " + T.conduit
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: ghostBtn
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: primaryBtn
    }, "Apply \xB7 ", detCount(sel))));
  }

  // ── shared button styles ──────────────────────────────────────────────
  const iconBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    border: "none",
    background: "transparent",
    color: T.muted,
    cursor: "pointer",
    borderRadius: T.rx,
    flex: "0 0 auto"
  };
  const primaryBtn = {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    border: "none",
    background: T.accent,
    color: T.onAccent,
    cursor: "pointer",
    borderRadius: T.rx,
    height: 34,
    fontFamily: T.fD,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase"
  };
  const ghostBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid " + T.conduit,
    background: "transparent",
    color: T.muted,
    cursor: "pointer",
    borderRadius: T.rx,
    height: 34,
    padding: "0 16px",
    fontFamily: T.fD,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase"
  };
  window.DSMSFilterPanels = {
    PanelA,
    PanelB,
    PanelC,
    PanelD
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/filter-variants.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fabric-console/kpi-cards.jsx
try { (() => {
// KPI concept cards for the Budget Performance screen.
// Reuses the DSMS Imperial visual vocabulary (Rajdhani display, JetBrains mono
// numerals, signal palette, hairline conduits). Two families:
//   1. Detail tiles — each metric carries TWO comparisons: vs Budget + vs Last Year.
//   2. Consolidated Net-Surplus summary cards — headline + income/expense legs.
// Exports every card + the shared FIN data object to window.

(function () {
  const C = {
    void: "var(--ds-bg-void)",
    hull: "var(--ds-bg-hull)",
    bay: "var(--ds-bg-bay)",
    deck: "var(--ds-bg-deck)",
    conduit: "var(--ds-line-conduit)",
    faint: "var(--ds-line-faint)",
    bright: "var(--ds-line-bright)",
    pri: "var(--ds-text-primary)",
    sec: "var(--ds-text-secondary)",
    muted: "var(--ds-text-muted)",
    faintT: "var(--ds-text-faint)",
    accent: "var(--ds-accent-imperial)",
    pos: "var(--ds-signal-positive)",
    neg: "var(--ds-signal-negative)",
    warn: "var(--ds-signal-warning)",
    info: "var(--ds-signal-info)",
    posDim: "var(--ds-signal-positive-dim)",
    negDim: "var(--ds-signal-negative-dim)",
    fDisplay: "var(--ds-font-display)",
    fBody: "var(--ds-font-body)",
    fMono: "var(--ds-font-mono)"
  };

  // ---- shared formatting -------------------------------------------------
  const fmtCredits = n => {
    const a = Math.abs(n);
    const sign = n < 0 ? "−" : "";
    if (a >= 1e9) return sign + "₡ " + (a / 1e9).toFixed(2) + "B";
    if (a >= 1e6) return sign + "₡ " + (a / 1e6).toFixed(0) + "M";
    if (a >= 1e3) return sign + "₡ " + (a / 1e3).toFixed(0) + "K";
    return sign + "₡ " + a;
  };
  const fmtSignedCredits = n => (n >= 0 ? "+" : "−") + "₡ " + (Math.abs(n) / 1e9).toFixed(2) + "B";
  const fmtPct = (f, d = 1) => (f > 0 ? "+" : f < 0 ? "−" : "") + Math.abs(f * 100).toFixed(d) + "%";

  // Canonical FY 0 BBY budget picture (subsidy-only income model).
  const FIN = {
    period: "FY 0 BBY",
    subsidy: {
      key: "subsidy",
      label: "Subsidy Income",
      invert: false,
      actual: 8.55e9,
      budget: 8.57e9,
      ly: 8.46e9,
      spark: [665, 678, 690, 702, 712, 720, 728, 738, 748, 762, 790, 862]
    },
    expense: {
      key: "expense",
      label: "Total Expenses",
      invert: true,
      actual: 9.10e9,
      budget: 8.59e9,
      ly: 8.58e9,
      spark: [690, 712, 735, 741, 760, 802, 798, 833, 881, 905, 962, 990]
    },
    net: {
      key: "net",
      label: "Net Surplus",
      invert: false,
      actual: -0.55e9,
      budget: -0.02e9,
      ly: -0.12e9,
      spark: [-25, -34, -45, -39, -48, -82, -70, -95, -133, -143, -172, -128]
    },
    mix: [{
      cat: "Personnel",
      value: 3.74e9,
      color: "var(--ds-data-1)"
    }, {
      cat: "Operations",
      value: 2.61e9,
      color: "var(--ds-data-2)"
    }, {
      cat: "Capital & Construction",
      value: 1.98e9,
      color: "var(--ds-data-5)"
    }, {
      cat: "Overhead",
      value: 0.77e9,
      color: "var(--ds-data-3)"
    }]
  };
  // derived variances
  const vbudget = m => (m.actual - m.budget) / Math.abs(m.budget);
  const vly = m => (m.actual - m.ly) / Math.abs(m.ly);

  // ---- primitives --------------------------------------------------------
  function Eyebrow({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.fDisplay,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: C.muted,
        whiteSpace: "nowrap",
        ...style
      }
    }, children);
  }
  function Arrow({
    up,
    size = 13,
    color
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        flex: "0 0 auto"
      }
    }, up ? /*#__PURE__*/React.createElement("path", {
      d: "M7 17 L17 7 M9 7 h8 v8"
    }) : /*#__PURE__*/React.createElement("path", {
      d: "M7 7 L17 17 M17 9 v8 h-8"
    }));
  }

  // Direction-aware delta. mode 'percent' uses the fraction; 'credits' uses raw value.
  function Delta({
    pct,
    value,
    invert = false,
    mode = "percent",
    size = "md",
    showArrow = true,
    style
  }) {
    const basis = mode === "percent" ? pct : value;
    const up = basis >= 0;
    const nearZero = mode === "percent" && Math.abs(pct) < 0.005;
    const good = invert ? !up : up;
    const color = nearZero ? C.muted : good ? C.pos : C.neg;
    const text = mode === "percent" ? fmtPct(pct) : fmtSignedCredits(value);
    const fs = size === "sm" ? 11.5 : size === "lg" ? 16 : 13;
    const is = size === "sm" ? 12 : size === "lg" ? 16 : 14;
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        color,
        fontFamily: C.fMono,
        fontVariantNumeric: "tabular-nums",
        fontSize: fs,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        ...style
      }
    }, showArrow && !nearZero && /*#__PURE__*/React.createElement(Arrow, {
      up: up,
      size: is,
      color: color
    }), text);
  }
  function Spark({
    data,
    width = 150,
    height = 30,
    color = C.info,
    fill = true,
    sw = 1.5
  }) {
    const n = data.length;
    if (n < 2) return /*#__PURE__*/React.createElement("svg", {
      width: width,
      height: height
    });
    const min = Math.min(...data),
      max = Math.max(...data);
    const span = max - min || 1;
    const padY = 3;
    const x = i => i / (n - 1) * width;
    const y = v => padY + (1 - (v - min) / span) * (height - padY * 2);
    const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    const area = `${line} L${width},${height} L0,${height} Z`;
    return /*#__PURE__*/React.createElement("svg", {
      width: width,
      height: height,
      style: {
        display: "block",
        overflow: "visible"
      }
    }, fill && /*#__PURE__*/React.createElement("path", {
      d: area,
      fill: color,
      fillOpacity: "0.13"
    }), /*#__PURE__*/React.createElement("path", {
      d: line,
      fill: "none",
      stroke: color,
      strokeWidth: sw,
      strokeLinejoin: "round",
      strokeLinecap: "round"
    }));
  }

  // Bullet: actual fill + budget target marker + last-year ghost marker.
  function BudgetBar({
    m,
    height = 16,
    showLy = true
  }) {
    const max = Math.max(m.actual, m.budget, m.ly) * 1.12;
    const pct = v => `${Math.max(0, Math.min(100, v / max * 100))}%`;
    const f = vbudget(m);
    const nz = Math.abs(f) < 0.005;
    const good = m.invert ? f <= 0 : f >= 0;
    const fill = nz ? C.info : good ? C.pos : C.neg;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height,
        background: C.deck,
        borderRadius: 1,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 3,
        bottom: 3,
        width: pct(m.actual),
        background: fill,
        opacity: 0.9,
        borderRadius: 1
      }
    }), showLy && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: pct(m.ly),
        top: 0,
        bottom: 0,
        width: 2,
        background: C.faintT
      },
      title: "Last year"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: pct(m.budget),
        top: -1,
        bottom: -1,
        width: 2,
        background: C.pri
      },
      title: "Budget"
    }));
  }

  // Monthly column chart — net surplus actual per month. Values hang from a
  // zero line; negative = deficit (red), positive = surplus (green).
  function MonthlyColumns({
    data,
    height = 64,
    labels
  }) {
    const months = labels || ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    const maxUp = Math.max(0, ...data);
    const maxDn = Math.max(0, ...data.map(v => -v));
    const span = maxUp + maxDn || 1;
    const zeroY = maxUp / span * height;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "stretch",
        gap: 4,
        height,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: zeroY,
        height: 1,
        background: C.faint
      }
    }), data.map((v, i) => {
      const h = Math.abs(v) / span * height;
      const up = v >= 0;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          flex: 1,
          position: "relative"
        },
        title: fmtCredits(v * 1e6)
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: "16%",
          right: "16%",
          top: up ? zeroY - h : zeroY,
          height: Math.max(1, h),
          background: up ? C.pos : C.neg,
          opacity: 0.85,
          borderRadius: 1
        }
      }));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        marginTop: 5
      }
    }, months.map((mo, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        textAlign: "center",
        fontFamily: C.fMono,
        fontSize: 9.5,
        color: C.faintT,
        letterSpacing: "0.04em"
      }
    }, mo))));
  }
  const Value = ({
    children,
    size = 30,
    color = C.pri
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: C.fMono,
      fontVariantNumeric: "tabular-nums",
      fontSize: size,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color,
      lineHeight: 1
    }
  }, children);
  function Shell({
    children,
    accent,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        background: C.hull,
        border: `1px solid ${C.conduit}`,
        borderRadius: "var(--ds-radius-md)",
        overflow: "hidden",
        ...style
      }
    }, accent && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 2,
        background: accent
      }
    }), children);
  }
  const statusOf = (m, f) => {
    const up = f >= 0;
    const nz = Math.abs(f) < 0.005;
    return nz ? C.muted : (m.invert ? !up : up) ? C.pos : C.neg;
  };

  // ======================================================================
  // VARIANT 1 — Stacked rails. Value on top; two labelled comparison rows.
  // ======================================================================
  function TileRails({
    m
  }) {
    const vb = vbudget(m),
      vl = vly(m);
    const accent = statusOf(m, m.invert ? -vb : vb);
    return /*#__PURE__*/React.createElement(Shell, {
      accent: accent,
      style: {
        padding: "15px 17px"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 11,
        marginBottom: 13
      }
    }, /*#__PURE__*/React.createElement(Value, null, fmtCredits(m.actual))), /*#__PURE__*/React.createElement(Row, {
      label: "vs Budget",
      sub: fmtCredits(m.budget)
    }, /*#__PURE__*/React.createElement(Delta, {
      pct: vb,
      invert: m.invert,
      size: "sm"
    })), /*#__PURE__*/React.createElement(Row, {
      label: "vs Last Year",
      sub: fmtCredits(m.ly),
      last: true
    }, /*#__PURE__*/React.createElement(Delta, {
      pct: vl,
      invert: m.invert,
      size: "sm"
    })));
    function Row({
      label,
      sub,
      children,
      last
    }) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          padding: "8px 0",
          borderTop: `1px solid ${C.faint}`,
          ...(last ? {} : {})
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: C.fBody,
          fontSize: 12.5,
          color: C.sec,
          whiteSpace: "nowrap"
        }
      }, label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: C.fMono,
          fontSize: 11,
          color: C.faintT,
          fontVariantNumeric: "tabular-nums"
        }
      }, sub)), children);
    }
  }

  // ======================================================================
  // VARIANT 2 — Split footer. Value + spark; two equal cells, ruled divider.
  // ======================================================================
  function TileSplit({
    m
  }) {
    const vb = vbudget(m),
      vl = vly(m);
    const accent = statusOf(m, m.invert ? -vb : vb);
    const Cell = ({
      label,
      frac,
      abs,
      edge
    }) => /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: "11px 14px",
        borderLeft: edge ? `1px solid ${C.faint}` : "none"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        marginBottom: 6
      }
    }, label), /*#__PURE__*/React.createElement(Delta, {
      pct: frac,
      invert: m.invert,
      size: "md"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.fMono,
        fontSize: 10.5,
        color: C.faintT,
        marginTop: 3,
        fontVariantNumeric: "tabular-nums"
      }
    }, abs));
    return /*#__PURE__*/React.createElement(Shell, {
      accent: accent
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        padding: "15px 17px 13px"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 11
      }
    }, /*#__PURE__*/React.createElement(Value, null, fmtCredits(m.actual)))), /*#__PURE__*/React.createElement(Spark, {
      data: m.spark,
      width: 120,
      height: 40,
      color: accent === C.muted ? C.info : accent
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        borderTop: `1px solid ${C.conduit}`,
        background: C.bay
      }
    }, /*#__PURE__*/React.createElement(Cell, {
      label: "vs Budget",
      frac: vb,
      abs: fmtCredits(m.budget)
    }), /*#__PURE__*/React.createElement(Cell, {
      label: "vs Last Year",
      frac: vl,
      abs: fmtCredits(m.ly),
      edge: true
    })));
  }

  // ======================================================================
  // VARIANT 3 — Budget bar + YoY chip. Bullet vs budget, YoY as a chip.
  // ======================================================================
  function TileBar({
    m
  }) {
    const vb = vbudget(m),
      vl = vly(m);
    const accent = statusOf(m, m.invert ? -vb : vb);
    return /*#__PURE__*/React.createElement(Shell, {
      accent: accent,
      style: {
        padding: "15px 17px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 7px",
        background: C.bay,
        border: `1px solid ${C.conduit}`,
        borderRadius: "var(--ds-radius-xs)"
      }
    }, /*#__PURE__*/React.createElement(Delta, {
      pct: vl,
      invert: m.invert,
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.fBody,
        fontSize: 10.5,
        color: C.muted,
        letterSpacing: "0.04em"
      }
    }, "YoY"))), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "12px 0 14px"
      }
    }, /*#__PURE__*/React.createElement(Value, null, fmtCredits(m.actual))), /*#__PURE__*/React.createElement(BudgetBar, {
      m: m
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: C.fBody,
        fontSize: 11.5,
        color: C.sec
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 2,
        background: C.pri
      }
    }), "Budget ", fmtCredits(m.budget)), /*#__PURE__*/React.createElement(Delta, {
      pct: vb,
      invert: m.invert,
      size: "sm"
    })));
  }

  // ======================================================================
  // VARIANT 4 — Micro-table. Actual / Budget / Last Year columns.
  // ======================================================================
  function TileTable({
    m
  }) {
    const vb = vbudget(m),
      vl = vly(m);
    const accent = statusOf(m, m.invert ? -vb : vb);
    const Col = ({
      head,
      val,
      delta,
      strong
    }) => /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        marginBottom: 7
      }
    }, head), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.fMono,
        fontVariantNumeric: "tabular-nums",
        fontSize: strong ? 20 : 15,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: strong ? C.pri : C.sec,
        lineHeight: 1
      }
    }, val), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        minHeight: 16
      }
    }, delta != null ? /*#__PURE__*/React.createElement(Delta, {
      pct: delta,
      invert: m.invert,
      size: "sm"
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.fMono,
        fontSize: 11,
        color: C.faintT
      }
    }, "\u2014")));
    return /*#__PURE__*/React.createElement(Shell, {
      accent: accent,
      style: {
        padding: "15px 17px"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginTop: 13
      }
    }, /*#__PURE__*/React.createElement(Col, {
      head: "Actual",
      val: fmtCredits(m.actual),
      strong: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        background: C.faint,
        alignSelf: "stretch"
      }
    }), /*#__PURE__*/React.createElement(Col, {
      head: "Budget",
      val: fmtCredits(m.budget),
      delta: vb
    }), /*#__PURE__*/React.createElement(Col, {
      head: "Last Year",
      val: fmtCredits(m.ly),
      delta: vl
    })));
  }

  // Helper to render a labelled pair of (expense=bad, subsidy=on-plan) tiles.
  function TilePair({
    Comp
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Comp, {
      m: FIN.expense
    }), /*#__PURE__*/React.createElement(Comp, {
      m: FIN.subsidy
    }));
  }

  // ======================================================================
  // CONSOLIDATED A — Net-Surplus hero + P&L ledger of the legs.
  // ======================================================================
  function NetLedger() {
    const net = FIN.net;
    const nb = net.actual - net.budget,
      nl = net.actual - net.ly;
    const LegRow = ({
      m,
      op
    }) => {
      const vb = vbudget(m),
        vl = vly(m);
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "20px 1fr auto 92px 92px",
          alignItems: "center",
          gap: 10,
          padding: "10px 0",
          borderTop: `1px solid ${C.faint}`
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: C.fMono,
          fontSize: 16,
          color: C.muted,
          textAlign: "center"
        }
      }, op), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: C.fBody,
          fontSize: 13.5,
          color: C.sec
        }
      }, m.label), /*#__PURE__*/React.createElement(Value, {
        size: 17
      }, fmtCredits(m.actual)), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement(Delta, {
        pct: vb,
        invert: m.invert,
        size: "sm"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement(Delta, {
        pct: vl,
        invert: m.invert,
        size: "sm"
      })));
    };
    return /*#__PURE__*/React.createElement(Shell, {
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "18px 22px",
        borderBottom: `1px solid ${C.conduit}`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Net Surplus \xB7 ", FIN.period), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex",
        alignItems: "baseline",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Value, {
      size: 44,
      color: C.neg
    }, fmtCredits(net.actual)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.fDisplay,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: C.neg
      }
    }, "Deficit"))), /*#__PURE__*/React.createElement(Spark, {
      data: net.spark,
      width: 150,
      height: 48,
      color: C.neg,
      sw: 1.75
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 0,
        padding: "12px 22px",
        borderBottom: `1px solid ${C.conduit}`,
        background: C.bay
      }
    }, /*#__PURE__*/React.createElement(Compare, {
      label: "vs Budget",
      sub: fmtCredits(net.budget),
      pct: nb / FIN.subsidy.actual,
      invert: false
    }, /*#__PURE__*/React.createElement(Delta, {
      value: nb,
      mode: "credits",
      invert: false,
      size: "md"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        background: C.faint,
        margin: "2px 18px"
      }
    }), /*#__PURE__*/React.createElement(Compare, {
      label: "vs Last Year",
      sub: fmtCredits(net.ly),
      pct: nl / FIN.subsidy.actual,
      invert: false
    }, /*#__PURE__*/React.createElement(Delta, {
      value: nl,
      mode: "credits",
      invert: false,
      size: "md"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "4px 22px 14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "20px 1fr auto 92px 92px",
        gap: 10,
        padding: "10px 0 2px"
      }
    }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        textAlign: "right"
      }
    }, "Actual"), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        textAlign: "right"
      }
    }, "vs Bud"), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        textAlign: "right"
      }
    }, "vs LY")), /*#__PURE__*/React.createElement(LegRow, {
      m: FIN.subsidy,
      op: "+"
    }), /*#__PURE__*/React.createElement(LegRow, {
      m: FIN.expense,
      op: "\u2212"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "20px 1fr auto 92px 92px",
        alignItems: "center",
        gap: 10,
        padding: "11px 0 2px",
        borderTop: `2px solid ${C.bright}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.fMono,
        fontSize: 16,
        color: C.muted,
        textAlign: "center"
      }
    }, "="), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.fDisplay,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: C.pri
      }
    }, "Net Surplus"), /*#__PURE__*/React.createElement(Value, {
      size: 17,
      color: C.neg
    }, fmtCredits(net.actual)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement(Delta, {
      value: nb,
      mode: "credits",
      invert: false,
      size: "sm",
      showArrow: false
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement(Delta, {
      value: nl,
      mode: "credits",
      invert: false,
      size: "sm",
      showArrow: false
    })))), /*#__PURE__*/React.createElement(Footnote, null));
  }
  function Footnote() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "11px 22px 15px",
        borderTop: `1px solid ${C.faint}`,
        background: C.void
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontFamily: C.fBody,
        fontSize: 12,
        lineHeight: 1.5,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.sec,
        fontWeight: 600
      }
    }, "Net Surplus = Subsidy Income \u2212 Total Expenses."), " The Empire wires a fixed monthly Treasury subsidy \u2014 DSMS's only credit. When expenses outrun it, the station runs a structural deficit."));
  }
  function Compare({
    label,
    sub,
    children,
    pct,
    invert
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        marginBottom: 6
      }
    }, label), children, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.fMono,
        fontSize: 10.5,
        color: C.faintT,
        marginTop: 4,
        fontVariantNumeric: "tabular-nums"
      }
    }, "budget\xB7ly ", sub));
  }

  // ======================================================================
  // CONSOLIDATED B — Net-Surplus hero + horizontal bridge (waterfall).
  // ======================================================================
  function NetBridge() {
    const net = FIN.net;
    const nb = net.actual - net.budget,
      nl = net.actual - net.ly;
    const W = 516,
      H = 150,
      base = 112,
      top = 16;
    const maxv = FIN.subsidy.actual * 1.05;
    const scaleH = v => v / maxv * (base - top);
    const colW = 120,
      gap = 48;
    const sub = FIN.subsidy.actual,
      exp = FIN.expense.actual;
    const x0 = 24;
    return /*#__PURE__*/React.createElement(Shell, {
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "18px 22px 14px",
        borderBottom: `1px solid ${C.conduit}`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Net Surplus \xB7 ", FIN.period), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex",
        alignItems: "baseline",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Value, {
      size: 44,
      color: C.neg
    }, fmtCredits(net.actual)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.fDisplay,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: C.neg
      }
    }, "Deficit"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(MiniCompare, {
      label: "vs Budget",
      value: nb,
      pct: nb / FIN.subsidy.actual
    }), /*#__PURE__*/React.createElement(MiniCompare, {
      label: "vs Last Year",
      value: nl,
      pct: nl / FIN.subsidy.actual
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 22px 6px"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      height: H,
      style: {
        display: "block",
        overflow: "visible"
      }
    }, /*#__PURE__*/React.createElement("line", {
      x1: x0,
      x2: W - 8,
      y1: base,
      y2: base,
      stroke: C.conduit,
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement(Bar, {
      x: x0,
      label: "Subsidy Income",
      val: sub,
      color: C.info,
      h: scaleH(sub),
      base: base,
      budget: FIN.subsidy.budget,
      maxv: maxv,
      top: top,
      w: colW
    }), /*#__PURE__*/React.createElement(Bar, {
      x: x0 + colW + gap,
      label: "Total Expenses",
      val: exp,
      color: C.warn,
      h: scaleH(exp),
      base: base,
      budget: FIN.expense.budget,
      maxv: maxv,
      top: top,
      w: colW,
      minus: true
    }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: x0 + (colW + gap) * 2,
      y: base,
      width: colW,
      height: Math.abs(scaleH(net.actual)),
      fill: C.neg,
      fillOpacity: "0.85",
      rx: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: x0 + (colW + gap) * 2 + colW / 2,
      y: base + Math.abs(scaleH(net.actual)) + 15,
      textAnchor: "middle",
      fill: C.neg,
      style: {
        fontFamily: C.fMono,
        fontSize: 12,
        fontWeight: 600
      }
    }, fmtCredits(net.actual)), /*#__PURE__*/React.createElement("text", {
      x: x0 + (colW + gap) * 2 + colW / 2,
      y: base - 7,
      textAnchor: "middle",
      fill: C.muted,
      style: {
        fontFamily: C.fDisplay,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.1em"
      }
    }, "NET")), /*#__PURE__*/React.createElement("text", {
      x: x0 + colW + gap / 2,
      y: base - 34,
      textAnchor: "middle",
      fill: C.muted,
      style: {
        fontFamily: C.fMono,
        fontSize: 20
      }
    }, "\u2212"), /*#__PURE__*/React.createElement("text", {
      x: x0 + (colW + gap) * 2 - gap / 2,
      y: base - 34,
      textAnchor: "middle",
      fill: C.muted,
      style: {
        fontFamily: C.fMono,
        fontSize: 20
      }
    }, "="))), /*#__PURE__*/React.createElement(Footnote, null));
    function Bar({
      x,
      label,
      val,
      color,
      h,
      base,
      budget,
      maxv,
      top,
      w,
      minus
    }) {
      const by = base - budget / maxv * (base - top);
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: base - h,
        width: w,
        height: h,
        fill: color,
        fillOpacity: "0.85",
        rx: "1"
      }), /*#__PURE__*/React.createElement("line", {
        x1: x - 3,
        x2: x + w + 3,
        y1: by,
        y2: by,
        stroke: C.pri,
        strokeWidth: "1.5",
        strokeDasharray: "3 2"
      }), /*#__PURE__*/React.createElement("text", {
        x: x + w / 2,
        y: base - h - 8,
        textAnchor: "middle",
        fill: C.pri,
        style: {
          fontFamily: C.fMono,
          fontSize: 12,
          fontWeight: 600
        }
      }, (minus ? "−" : "+") + fmtCredits(val).replace("₡ ", "₡")), /*#__PURE__*/React.createElement("text", {
        x: x + w / 2,
        y: base + 15,
        textAnchor: "middle",
        fill: C.sec,
        style: {
          fontFamily: C.fBody,
          fontSize: 10.5
        }
      }, label));
    }
    function MiniCompare({
      label,
      value,
      pct
    }) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement(Eyebrow, {
        style: {
          fontSize: 9.5,
          marginBottom: 5
        }
      }, label), /*#__PURE__*/React.createElement(Delta, {
        value: value,
        mode: "credits",
        invert: false,
        size: "md"
      }));
    }
  }

  // ======================================================================
  // CONSOLIDATED C — Two-panel: hero + narrative | expense composition.
  // ======================================================================
  function NetSplit() {
    const net = FIN.net;
    const nb = net.actual - net.budget,
      nl = net.actual - net.ly;
    const total = FIN.expense.actual;
    return /*#__PURE__*/React.createElement(Shell, {
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1px 1fr"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "18px 20px 16px"
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Net Surplus \xB7 ", FIN.period), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "11px 0 4px",
        display: "flex",
        alignItems: "baseline",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement(Value, {
      size: 42,
      color: C.neg
    }, fmtCredits(net.actual))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.fDisplay,
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: C.neg
      }
    }, "Structural deficit"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 0,
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        marginBottom: 6
      }
    }, "vs Budget"), /*#__PURE__*/React.createElement(Delta, {
      value: nb,
      mode: "credits",
      invert: false,
      size: "md"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        background: C.faint,
        margin: "0 14px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        marginBottom: 6
      }
    }, "vs Last Year"), /*#__PURE__*/React.createElement(Delta, {
      value: nl,
      mode: "credits",
      invert: false,
      size: "md"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        paddingTop: 15,
        borderTop: `1px solid ${C.faint}`
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        marginBottom: 10
      }
    }, "Net Surplus actual \xB7 by month"), /*#__PURE__*/React.createElement(MonthlyColumns, {
      data: net.spark
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.conduit
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "18px 20px 16px"
      }
    }, /*#__PURE__*/React.createElement(LegLine, {
      m: FIN.subsidy,
      op: "+"
    }), /*#__PURE__*/React.createElement(LegLine, {
      m: FIN.expense,
      op: "\u2212"
    }), /*#__PURE__*/React.createElement(Eyebrow, {
      style: {
        fontSize: 9.5,
        margin: "16px 0 9px"
      }
    }, "Where expenses go"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        height: 12,
        borderRadius: 2,
        overflow: "hidden",
        gap: 1.5
      }
    }, FIN.mix.map(s => /*#__PURE__*/React.createElement("div", {
      key: s.cat,
      style: {
        width: `${s.value / total * 100}%`,
        background: s.color
      },
      title: `${s.cat} ${fmtCredits(s.value)}`
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5px 14px",
        marginTop: 10
      }
    }, FIN.mix.map(s => /*#__PURE__*/React.createElement("span", {
      key: s.cat,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: C.fBody,
        fontSize: 10.5,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 1,
        background: s.color
      }
    }), s.cat, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: C.fMono,
        color: C.sec
      }
    }, fmtCredits(s.value))))))));
    function LegLine({
      m,
      op
    }) {
      const vb = vbudget(m),
        vl = vly(m);
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "9px 0",
          borderBottom: `1px solid ${C.faint}`
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: C.fMono,
          fontSize: 15,
          color: C.muted,
          width: 12,
          textAlign: "center"
        }
      }, op), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: C.fBody,
          fontSize: 12.5,
          color: C.sec
        }
      }, m.label), /*#__PURE__*/React.createElement(Value, {
        size: 17
      }, fmtCredits(m.actual))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 3
        }
      }, /*#__PURE__*/React.createElement(Delta, {
        pct: vb,
        invert: m.invert,
        size: "sm"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4
        }
      }, /*#__PURE__*/React.createElement(Delta, {
        pct: vl,
        invert: m.invert,
        size: "sm"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: C.fBody,
          fontSize: 9.5,
          color: C.faintT
        }
      }, "YoY"))));
    }
  }
  Object.assign(window, {
    KPI_FIN: FIN,
    TileRails,
    TileSplit,
    TileBar,
    TileTable,
    TilePair,
    NetLedger,
    NetBridge,
    NetSplit
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fabric-console/kpi-cards.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.SidebarRail = __ds_scope.SidebarRail;

__ds_ns.SlicerPane = __ds_scope.SlicerPane;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.DeltaIndicator = __ds_scope.DeltaIndicator;

__ds_ns.Gauge = __ds_scope.Gauge;

__ds_ns.KpiTile = __ds_scope.KpiTile;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slicer = __ds_scope.Slicer;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.FabricConsole = __ds_scope.FabricConsole;

})();
