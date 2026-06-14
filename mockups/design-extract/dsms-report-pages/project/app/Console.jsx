/* DSMS Fabric Console — screen composition + shell.
   Pulls primitives (window.DSMSDesignSystem_197d77), charts (window.DSMSCharts),
   data (window.DSMSData) and the built Budget screen (window.DSMSScreens) from the
   design-system bundle loaded in <helmet>. Reproduces the screens where the
   console-level tweaks (dense rows, combat-loss toggle) need to take effect, and
   adds the new Maintenance & Reliability page. Exposes { Console }. */

const PAGES = [
  { id: "overview", label: "Overview", icon: "layout-grid", title: "Console Overview", crumb: ["Operations", "Library"] },
  { id: "briefing", label: "Executive Briefing", icon: "layout-dashboard", title: "Imperial Executive Briefing", crumb: ["Finance", "P&L"] },
  { id: "ops", label: "Operations Command", icon: "git-branch", title: "Operations Command", crumb: ["Procurement", "Vendors"] },
  { id: "budget", label: "Budget Performance", icon: "gauge", title: "Budget Performance", crumb: ["Finance", "Budget"] },
  { id: "supply", label: "Supply Chain", icon: "boxes", title: "Supply Chain Status", crumb: ["Logistics", "Inventory"] },
  { id: "workforce", label: "Workforce", icon: "users", title: "Workforce & Personnel", crumb: ["Personnel", "Headcount"] },
  { id: "maint", label: "Maintenance", icon: "wrench", title: "Maintenance & Reliability", crumb: ["Operations", "Work Orders"] },
];

/* --- small shared legend chip --- */
function Lg({ color, label, line, square, diamond, swatch }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      {swatch ? swatch : diamond ? (
        <span style={{ width: 9, height: 9, background: color, transform: "rotate(45deg)" }} />
      ) : (
        <span style={{ width: square ? 9 : line ? 12 : 9, height: square ? 9 : line ? 3 : 9, borderRadius: 1, background: color, opacity: square ? 0.6 : 1 }} />
      )}
      <span style={{ fontSize: 11, color: "var(--ds-text-muted)" }}>{label}</span>
    </span>
  );
}

/* Variance scatter — local copy (the bundle's window.DSMSCharts.VarianceScatter
   is not attached due to module load order). One dot per dept, sized by weight. */
function VarianceScatter({ depts, band = 0.15, height = 380 }) {
  const { useState } = React;
  const D = window.DSMSData;
  const AXIS = "var(--ds-text-muted)";
  const GOOD = "var(--ds-signal-positive)";
  const BAD = "var(--ds-signal-negative)";
  const fmtPct = (v, d = 1) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v * 100).toFixed(d) + "%";
  const [hover, setHover] = useState(-1);
  const W = 720, H = height;
  const padL = 56, padR = 24, padT = 22, padB = 46;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const dom = 0.21;
  const x = (v) => padL + ((v + dom) / (2 * dom)) * innerW;
  const y = (v) => padT + (1 - (v + dom) / (2 * dom)) * innerH;
  const x0 = x(0), y0 = y(0);
  const maxW = Math.max(...depts.map((d) => d.weight));
  const r = (w) => 5 + Math.sqrt(w / maxW) * 17;
  const ticks = [-0.2, -0.1, 0, 0.1, 0.2];
  const quadrants = [
    { lbl: "Got more, spent more", ax: x0 + 8, ay: padT + 14, anchor: "start", fill: null },
    { lbl: "Crisis", ax: padL + 8, ay: padT + 14, anchor: "start", fill: "var(--ds-signal-negative-dim)", rx: padL, ry: padT, rw: x0 - padL, rh: y0 - padT },
    { lbl: "Surplus", ax: W - padR - 8, ay: H - padB - 10, anchor: "end", fill: "var(--ds-signal-positive-dim)", rx: x0, ry: y0, rw: W - padR - x0, rh: H - padB - y0 },
    { lbl: "Austere", ax: padL + 8, ay: H - padB - 10, anchor: "start", fill: null },
  ];

  function ScatterTip({ d }) {
    const Row = ({ k, v, c }) => (
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18 }}>
        <span style={{ color: "var(--ds-text-muted)" }}>{k}</span>
        <span style={{ fontFamily: "var(--ds-font-mono)", color: c || "var(--ds-text-primary)", fontVariantNumeric: "tabular-nums" }}>{v}</span>
      </div>
    );
    return (
      <div style={{ position: "absolute", top: 10, right: 10, width: 232, padding: "11px 13px", background: "var(--ds-bg-void)", border: "1px solid var(--ds-line-bright)", borderRadius: "var(--ds-radius-sm)", boxShadow: "var(--ds-shadow-popover)", pointerEvents: "none", display: "flex", flexDirection: "column", gap: 5, fontSize: 11.5 }}>
        <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 13, fontWeight: 700, color: "var(--ds-text-primary)" }}>{d.dept}</div>
        <div style={{ fontSize: 10.5, color: "var(--ds-text-muted)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>{d.division} · weight {d.weight}</div>
        <Row k="Income var" v={fmtPct(d.incomeVar)} c={d.incomeVar >= 0 ? GOOD : BAD} />
        <Row k="Expense var" v={fmtPct(d.expenseVar)} c={d.expenseVar <= 0 ? GOOD : BAD} />
        <Row k="Allocated" v={D.fmtCredits(d.allocation)} />
        <Row k="Spent" v={D.fmtCredits(d.expenseActual)} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible", height: "auto" }} onMouseLeave={() => setHover(-1)}>
        {quadrants.filter((q) => q.fill).map((q, i) => (
          <rect key={"q" + i} x={q.rx} y={q.ry} width={q.rw} height={q.rh} fill={q.fill} />
        ))}
        {[-band, band].map((b, i) => (
          <g key={"b" + i}>
            <line x1={x(b)} x2={x(b)} y1={padT} y2={H - padB} stroke="var(--ds-line-bright)" strokeWidth="1" strokeDasharray="2 4" />
            <line x1={padL} x2={W - padR} y1={y(b)} y2={y(b)} stroke="var(--ds-line-bright)" strokeWidth="1" strokeDasharray="2 4" />
          </g>
        ))}
        {ticks.map((t, i) => (
          <g key={"t" + i}>
            <text x={x(t)} y={H - padB + 16} textAnchor="middle" fill={AXIS} style={{ fontFamily: "var(--ds-font-mono)", fontSize: 9.5 }}>{fmtPct(t, 0)}</text>
            <text x={padL - 8} y={y(t) + 3} textAnchor="end" fill={AXIS} style={{ fontFamily: "var(--ds-font-mono)", fontSize: 9.5 }}>{fmtPct(t, 0)}</text>
          </g>
        ))}
        <line x1={x0} x2={x0} y1={padT} y2={H - padB} stroke="var(--ds-line-conduit)" strokeWidth="1.5" />
        <line x1={padL} x2={W - padR} y1={y0} y2={y0} stroke="var(--ds-line-conduit)" strokeWidth="1.5" />
        <text x={(padL + W - padR) / 2} y={H - 6} textAnchor="middle" fill="var(--ds-text-faint)" style={{ fontFamily: "var(--ds-font-display)", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em" }}>INCOME VARIANCE  ·  UNDER-FUNDED ← → OVER-FUNDED</text>
        <text transform={`translate(13 ${(padT + H - padB) / 2}) rotate(-90)`} textAnchor="middle" fill="var(--ds-text-faint)" style={{ fontFamily: "var(--ds-font-display)", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em" }}>EXPENSE VARIANCE  ·  UNDER ← → OVER-SPENT</text>
        {quadrants.map((q, i) => (
          <text key={"ql" + i} x={q.ax} y={q.ay} textAnchor={q.anchor} fill={q.fill ? (q.lbl === "Crisis" ? BAD : GOOD) : "var(--ds-text-faint)"} style={{ fontFamily: "var(--ds-font-display)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", opacity: q.fill ? 0.9 : 0.6 }}>{q.lbl}</text>
        ))}
        {depts.map((d, i) => {
          const crisis = d.incomeVar < 0 && d.expenseVar > 0;
          const surplus = d.incomeVar > 0 && d.expenseVar < 0;
          const c = crisis ? BAD : surplus ? GOOD : "var(--ds-signal-info)";
          const on = hover === i;
          return (
            <g key={d.key} onMouseEnter={() => setHover(i)} style={{ cursor: "default" }}>
              <circle cx={x(d.incomeVar)} cy={y(d.expenseVar)} r={r(d.weight)} fill={c} fillOpacity={on ? 0.4 : 0.2} stroke={c} strokeWidth={on ? 2 : 1.4} />
              {(on || d.weight >= 90) && (
                <text x={x(d.incomeVar)} y={y(d.expenseVar) - r(d.weight) - 4} textAnchor="middle" fill={on ? "var(--ds-text-primary)" : "var(--ds-text-muted)"} style={{ fontFamily: "var(--ds-font-body)", fontSize: 10, fontWeight: on ? 600 : 500 }}>{d.short}</text>
              )}
            </g>
          );
        })}
      </svg>
      {hover >= 0 && <ScatterTip d={depts[hover]} />}
    </div>
  );
}

/* ================================================================= *
 * EXECUTIVE BRIEFING                                                 *
 * ================================================================= */
function Briefing({ showCombat }) {
  const { Panel, Icon } = window.DSMSDesignSystem_197d77;
  const C = window.DSMSCharts, D = window.DSMSData;
  const f = D.finance;

  const EYEBROW = { fontFamily: "var(--ds-font-display)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ds-text-muted)" };

  function Delta({ text, tone, dir = "up" }) {
    const c = tone === "negative" ? "var(--ds-signal-negative)" : "var(--ds-signal-positive)";
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: c, fontFamily: "var(--ds-font-mono)", fontSize: 11, fontWeight: 600, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
        <Icon name={dir === "down" ? "arrow-down-right" : "arrow-up-right"} size={12} strokeWidth={2.25} />{text}
      </span>
    );
  }

  function MiniStat({ label, value }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ ...EYEBROW, fontSize: 9.5, letterSpacing: "0.14em", whiteSpace: "nowrap" }}>{label}</div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "var(--ds-signal-positive)", fontFamily: "var(--ds-font-mono)", fontSize: 14, fontWeight: 600, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
          <Icon name="arrow-up-right" size={14} strokeWidth={2.25} />{value}
        </span>
      </div>
    );
  }

  function LedgerRow({ sign, label, value, d1, d2, tone, last }) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "14px minmax(0,1fr) auto", alignItems: "center", gap: 10, paddingBottom: last ? 0 : 14, marginBottom: last ? 0 : 14, borderBottom: last ? "none" : "1px solid var(--ds-line-faint)" }}>
        <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 22, color: "var(--ds-text-muted)", textAlign: "center", lineHeight: 1 }}>{sign}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, color: "var(--ds-text-secondary)", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
          <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: 18, fontWeight: 600, color: "var(--ds-text-primary)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <Delta text={d1} tone={tone} /><Delta text={d2} tone={tone} />
        </div>
      </div>
    );
  }

  function ChartBlock({ title, children }) {
    return (
      <div>
        <div style={{ ...EYEBROW, fontSize: 9.5, letterSpacing: "0.14em", marginBottom: 12 }}>{title}</div>
        {children}
      </div>
    );
  }

  function MiniBars({ data, hasNeg, posColor = "var(--ds-signal-positive)", negColor = "var(--ds-signal-negative)" }) {
    const W = 300, H = 108, padT = 6, padB = 16;
    const innerH = H - padT - padB;
    const maxAbs = Math.max(...data.map((d) => Math.abs(d))) || 1;
    const minV = hasNeg ? -maxAbs : 0;
    const span = maxAbs - minV || 1;
    const n = data.length, band = W / n, bw = band * 0.52;
    const y = (v) => padT + (1 - (v - minV) / span) * innerH;
    const y0 = y(0);
    const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block", overflow: "visible" }}>
        {hasNeg && <line x1={0} x2={W} y1={y0} y2={y0} stroke="var(--ds-line-conduit)" strokeWidth="1" />}
        {data.map((v, i) => {
          const cx = band * i + band / 2;
          const top = Math.min(y(v), y0);
          const h = Math.max(1, Math.abs(y(v) - y0));
          return (
            <g key={i}>
              <rect x={cx - bw / 2} y={top} width={bw} height={h} fill={v >= 0 ? posColor : negColor} opacity="0.85" rx="1" />
              <text x={cx} y={H - 4} textAnchor="middle" fill="var(--ds-text-faint)" style={{ fontFamily: "var(--ds-font-mono)", fontSize: 8 }}>{months[i] || ""}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  function ProportionBar({ segments }) {
    const total = segments.reduce((a, s) => a + s.value, 0) || 1;
    let acc = 0;
    const segs = segments.map((s) => {
      const start = acc / total; acc += s.value; const end = acc / total;
      return { ...s, c: ((start + end) / 2) * 100, pct: Math.round((s.value / total) * 100), w: (s.value / total) * 100 };
    });
    const H = 118, barTop = 52, barH = 14;
    return (
      <div style={{ position: "relative", height: H }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: barTop, height: barH, display: "flex", borderRadius: 2, overflow: "hidden", background: "var(--ds-bg-deck)" }}>
          {segs.map((s, i) => (
            <div key={i} style={{ width: `${s.w}%`, background: s.color, opacity: 0.92, borderRight: i < segs.length - 1 ? "1px solid var(--ds-bg-hull)" : "none" }} title={`${s.name} ${s.pct}%`} />
          ))}
        </div>
        {segs.map((s, i) => {
          const above = i % 2 === 0;
          const far = (i % 4) >= 2;
          const labelTop = above ? (far ? 0 : 24) : (far ? barTop + barH + 32 : barTop + barH + 9);
          const lineTop = above ? labelTop + 15 : barTop + barH;
          const lineH = above ? barTop - labelTop - 15 : labelTop - barTop - barH - 2;
          const tx = s.c <= 12 ? "0%" : s.c >= 88 ? "-100%" : "-50%";
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: `${s.c}%`, width: 1, background: s.color, opacity: 0.85, top: lineTop, height: Math.max(0, lineH) }} />
              <div style={{ position: "absolute", left: `${s.c}%`, transform: `translateX(${tx})`, top: labelTop, whiteSpace: "nowrap", fontSize: 10, lineHeight: "13px" }}>
                <span style={{ fontFamily: "var(--ds-font-mono)", fontWeight: 600, color: "var(--ds-text-primary)", fontVariantNumeric: "tabular-nums" }}>{s.pct}%</span>
                <span style={{ color: "var(--ds-text-muted)", marginLeft: 5 }}>{s.name}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  function BalanceCard({ eyebrow, value, sublabel, vsBudget, vsLast, ledger, barTitle, bars, barHasNeg, mixTitle, mix }) {
    return (
      <Panel padded={false} style={{ height: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gridTemplateRows: "1fr auto", height: "100%", containerType: "inline-size" }}>
          {/* top-left — hero value + vs-stats strip */}
          <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid var(--ds-line-conduit)", minWidth: 0 }}>
            <div style={{ padding: "16px 18px 14px", flex: 1, minWidth: 0 }}>
              <div style={{ ...EYEBROW, letterSpacing: "0.13em" }}>{eyebrow}</div>
              <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: "clamp(24px, 7cqw, 38px)", fontWeight: 600, color: "var(--ds-text-primary)", lineHeight: 1, marginTop: 14, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
              <div style={{ ...EYEBROW, fontSize: 11, letterSpacing: "0.14em", color: "var(--ds-text-secondary)", marginTop: 10 }}>{sublabel}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--ds-line-faint)" }}>
              <div style={{ padding: "12px 18px 14px" }}><MiniStat label="Vs Budget" value={vsBudget} /></div>
              <div style={{ padding: "12px 18px 14px", borderLeft: "1px solid var(--ds-line-faint)" }}><MiniStat label="Vs Last Year" value={vsLast} /></div>
            </div>
          </div>
          {/* top-right — ledger */}
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
            {ledger.map((r, i) => <LedgerRow key={i} {...r} last={i === ledger.length - 1} />)}
          </div>
          {/* bottom-left — monthly bars */}
          <div style={{ padding: "14px 18px 16px", borderTop: "1px solid var(--ds-line-conduit)", borderRight: "1px solid var(--ds-line-conduit)", minWidth: 0 }}>
            <ChartBlock title={barTitle}><MiniBars data={bars} hasNeg={barHasNeg} /></ChartBlock>
          </div>
          {/* bottom-right — proportion mix */}
          <div style={{ padding: "14px 18px 16px", borderTop: "1px solid var(--ds-line-conduit)", minWidth: 0 }}>
            <ChartBlock title={mixTitle}><ProportionBar segments={mix} /></ChartBlock>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="briefing-balance-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "stretch" }}>
        <BalanceCard
          eyebrow="Net Subsidy · Trailing Twelve Months"
          value="₡ 1.28B"
          sublabel="Operating Surplus"
          vsBudget="+₡ 0.07B"
          vsLast="+₡ 0.08B"
          ledger={[
            { sign: "+", label: "Total Income", value: "₡ 10.40B", d1: "+2.0% Bud", d2: "+8.2% YoY", tone: "positive" },
            { sign: "−", label: "Total Expenses", value: "₡ 9.10B", d1: "+1.7% Bud", d2: "+6.1% YoY", tone: "negative" },
          ]}
          barTitle="Net Subsidy Actual · by Month"
          bars={f.surplus}
          barHasNeg={false}
          mixTitle="Where Expenses Go"
          mix={f.expenseMix.map((s) => ({ name: s.cat, value: s.value, color: s.color }))}
        />
        <BalanceCard
          eyebrow="Headcount · Trailing Twelve Months"
          value="1.71M"
          sublabel="Station Complement"
          vsBudget="+30K"
          vsLast="+63K"
          ledger={[
            { sign: "+", label: "Budgeted Headcount", value: "1.68M", d1: "+1.8% Act", d2: "+3.8% YoY", tone: "positive" },
            { sign: "−", label: "Actual Payroll", value: "₡ 7.42B", d1: "+1.6% Bud", d2: "+6.8% YoY", tone: "negative" },
          ]}
          barTitle="Net Headcount Actual vs Budget · by Month"
          bars={[22, 20, 19, 17, 16, 14, 12, 10, 8, 5, -3, -6]}
          barHasNeg={true}
          mixTitle="Where Payroll Goes"
          mix={[
            { name: "Troopers", value: 32, color: "var(--ds-data-1)" },
            { name: "Officers", value: 24, color: "var(--ds-data-2)" },
            { name: "Technicians", value: 22, color: "var(--ds-signal-info)" },
            { name: "Support", value: 12, color: "var(--ds-data-4)" },
            { name: "Other", value: 10, color: "var(--ds-data-3)" },
          ]}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: showCombat ? "1fr 1fr" : "1fr", gap: 14, alignItems: "stretch" }}>
        <Panel title="Variance Scatter" eyebrow="Which Departments Are Performing to Budget?">
          <VarianceScatter depts={D.budget.depts.filter((d) => d.weight > 0)} band={D.budget.bands} height={340} />
        </Panel>
        {showCombat ? (
          <Panel title="Combat Losses vs Headcount Variance" eyebrow="Are We Replenishing the Departments We're Losing?">
            <C.ComboChart data={D.workforce.combatDepts} height={300} />
          </Panel>
        ) : null}
      </div>
    </div>
  );
}

/* ================================================================= *
 * OPERATIONS COMMAND                                                 *
 * ================================================================= */
function Operations({ dense }) {
  const { Panel, SectionHeader, DataTable, StatusPill, Button } = window.DSMSDesignSystem_197d77;
  const C = window.DSMSCharts, D = window.DSMSData;
  const o = D.operations;

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
        <line x1={x(2)} y1={pad} x2={x(2)} y2={H - pad} stroke="var(--ds-line-faint)" strokeDasharray="3 3" />
        <text x={W - pad} y={H - pad + 16} textAnchor="end" fill="var(--ds-text-faint)" style={{ fontSize: 10, fontFamily: "var(--ds-font-mono)" }}>RISK →</text>
        <text x={pad - 6} y={pad + 2} textAnchor="end" fill="var(--ds-text-faint)" style={{ fontSize: 10, fontFamily: "var(--ds-font-mono)" }}>₡</text>
        {vendors.map((v, i) => {
          const c = v.rs === "negative" ? "var(--ds-signal-negative)" : v.rs === "warning" ? "var(--ds-signal-warning)" : "var(--ds-signal-positive)";
          const sp = parseFloat(v.spend.replace(/,/g, ""));
          return <circle key={i} cx={x(riskScore[v.risk])} cy={y(sp)} r={Math.max(6, (sp / maxSpend) * 18)} fill={c} fillOpacity="0.22" stroke={c} strokeWidth="1.5" />;
        })}
      </svg>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <SectionHeader eyebrow="Procurement & Vendors" title="Operations Command" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 14 }}>
        <Panel title="Spend by Division Group" eyebrow="Trailing 12 Months">
          <C.HBars data={o.divisionSpend} format={D.fmtCredits} color="var(--ds-data-2)" />
        </Panel>
        <Panel title="Vendor Risk Matrix" eyebrow="Risk × Spend">
          <RiskMatrix vendors={o.vendors} />
        </Panel>
      </div>

      <Panel title="Top Vendors" eyebrow="By Total Spend" padded={false} actions={<Button size="sm" variant="ghost" iconTrailing="chevron-down">All Tiers</Button>}>
        <DataTable
          rowKey="vendor"
          dense={dense}
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

/* ================================================================= *
 * SUPPLY CHAIN STATUS                                                *
 * ================================================================= */
const STOCK_KEYS = [
  { key: "central", label: "Central Depot", color: "var(--ds-signal-info)" },
  { key: "forward", label: "Forward Store", color: "var(--ds-signal-positive)" },
  { key: "magazine", label: "Magazine", color: "var(--ds-signal-warning)" },
  { key: "cold", label: "Cold Storage", color: "var(--ds-data-3)" },
];

function Supply({ dense }) {
  const { Panel, SectionHeader, DataTable, StatusPill, KpiTile } = window.DSMSDesignSystem_197d77;
  const C = window.DSMSCharts, D = window.DSMSData;
  const s = D.supply;

  function HeatStrip() {
    const items = ["Turbolaser Coolant", "TIE Solar Array", "Reactor Plating", "Bacta Fluid", "Blaster Gas"];
    const weeks = 16;
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
                  const st = cell(r, c);
                  return <div key={c} title={`Week ${c + 1}: ${st}`} style={{ height: 16, borderRadius: 1, background: color[st], opacity: st === "ok" ? 0.6 : 0.9 }} />;
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <SectionHeader eyebrow="Inventory & Logistics" title="Supply Chain Status" />

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 14, alignItems: "stretch" }}>
        <KpiTile label="Inventory Value" value={s.inventoryValue} delta={0.052} sparkData={s.inventorySpark} sparkColor="var(--ds-signal-info)" accent style={{ justifyContent: "center" }} />
        <Panel title="Inventory by Category" eyebrow="Units by Location Type">
          <C.StackedBars rows={s.byCategory} keys={STOCK_KEYS} />
          <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
            {STOCK_KEYS.map((k) => <Lg key={k.key} color={k.color} label={k.label} square={false} />)}
          </div>
        </Panel>
      </div>

      <Panel title="Stockouts Heat-Strip" eyebrow="Items × Last 16 Weeks">
        <HeatStrip />
      </Panel>

      <Panel title="Reorder Watchlist" eyebrow="At or Below Reorder Point" padded={false}>
        <DataTable
          rowKey="item"
          dense={dense}
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

/* ================================================================= *
 * WORKFORCE & PERSONNEL                                              *
 * ================================================================= */
function Workforce({ showCombat }) {
  const { Panel, SectionHeader, KpiTile } = window.DSMSDesignSystem_197d77;
  const C = window.DSMSCharts, D = window.DSMSData;
  const w = D.workforce;
  const roleData = w.byRole.map((r) => ({ label: r.role, value: r.count, color: r.combat ? "var(--ds-data-5)" : "var(--ds-data-2)" }));
  const droidSeg = [
    { cat: "Service Droids", value: w.droidShare, color: "var(--ds-data-1)" },
    { cat: "Organic Personnel", value: 1 - w.droidShare, color: "var(--ds-data-4)" },
  ];
  const series = showCombat
    ? [
        { name: "Attrition", data: w.attrition, color: "var(--ds-signal-warning)" },
        { name: "Combat Losses", data: w.combatLosses, color: "var(--ds-signal-negative)" },
      ]
    : [{ name: "Attrition", data: w.attrition, color: "var(--ds-signal-warning)" }];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <SectionHeader eyebrow="Personnel & Headcount" title="Workforce" />

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 14 }}>
        <KpiTile label="Total Headcount" value={w.headcount} delta={0.038} sparkData={w.headcountSpark} sparkColor="var(--ds-signal-positive)" accent style={{ justifyContent: "center" }} />
        <Panel title="Headcount by Role" eyebrow="Active Assignments">
          <C.HBars data={roleData} format={(n) => (n / 1000).toFixed(0) + "K"} />
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            <Lg color="var(--ds-data-5)" label="Combat" />
            <Lg color="var(--ds-data-2)" label="Non-combat" />
          </div>
        </Panel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>
        <Panel
          title={showCombat ? "Attrition & Combat Losses" : "Attrition"}
          eyebrow="% of Headcount · Monthly"
          actions={
            <div style={{ display: "flex", gap: 14 }}>
              <Lg color="var(--ds-signal-warning)" label="Attrition" line />
              {showCombat ? <Lg color="var(--ds-signal-negative)" label="Combat Losses" line /> : null}
            </div>
          }
        >
          <C.LineCompare labels={D.months} height={210} markerIndex={11} markerLabel="BATTLE OF YAVIN" yFormat={(v) => v.toFixed(1) + "%"} series={series} />
        </Panel>

        <Panel title="Droids vs Organics" eyebrow="Workforce Composition">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <C.Donut segments={droidSeg} centerValue="23.5%" centerLabel="Droids" />
            <div style={{ width: "100%" }}>
              <C.Legend segments={droidSeg} format={(v) => (v * 100).toFixed(1) + "%"} />
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Payroll Cost by Department" eyebrow="Trailing 12 Months">
        <C.HBars
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

/* ================================================================= *
 * MAINTENANCE & RELIABILITY  (new)                                   *
 * ================================================================= */
function Maintenance({ dense }) {
  const { Panel, SectionHeader, KpiTile, DataTable, StatusPill, Gauge } = window.DSMSDesignSystem_197d77;
  const C = window.DSMSCharts, D = window.DSMSData;
  const m = D.maintenance;

  // Current-month backlog snapshot (last point of each priority series).
  const last = (a) => a[a.length - 1];
  const backlogSeg = [
    { cat: "Low", value: last(m.backlog.low), color: "var(--ds-data-2)" },
    { cat: "Medium", value: last(m.backlog.medium), color: "var(--ds-signal-info)" },
    { cat: "High", value: last(m.backlog.high), color: "var(--ds-signal-warning)" },
    { cat: "Critical", value: last(m.backlog.crit), color: "var(--ds-signal-negative)" },
  ];
  const backlogTotal = backlogSeg.reduce((a, s) => a + s.value, 0);
  const downtimeData = m.downtime.map((d) => ({ label: d.dept, value: d.hrs }));

  const kpis = [
    { label: "Open Work Orders", value: m.openWO.toLocaleString(), delta: 0.041, invert: true, spark: m.backlog.low.map((v, i) => v + m.backlog.medium[i] + m.backlog.high[i] + m.backlog.crit[i]), color: "var(--ds-signal-info)" },
    { label: "Critical Open", value: String(m.criticalWO), danger: true, delta: 11, deltaFormat: "number", invert: true, spark: m.backlog.crit, color: "var(--ds-signal-negative)" },
    { label: "Mean Time to Repair", value: "18.4", unit: "h", delta: 0.067, invert: true, spark: [14.1, 14.8, 15.0, 15.6, 15.2, 16.1, 16.4, 16.9, 17.2, 17.8, 18.0, 18.4], color: "var(--ds-signal-warning)" },
    { label: "Station Availability", value: "97.6%", delta: -0.004, spark: [98.9, 98.8, 98.7, 98.6, 98.5, 98.4, 98.3, 98.1, 98.0, 97.9, 97.7, 97.6], color: "var(--ds-signal-positive)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <SectionHeader eyebrow="Reliability & Work Orders" title="Maintenance & Reliability" />

      {/* KPI strip — 4 tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {kpis.map((k) => (
          <KpiTile
            key={k.label}
            label={k.label}
            value={k.danger ? <span style={{ color: "var(--ds-signal-negative)" }}>{k.value}</span> : k.value}
            unit={k.unit}
            delta={k.delta}
            deltaFormat={k.deltaFormat || "percent"}
            invertDelta={!!k.invert}
            accent
            sparkData={k.spark}
            sparkColor={k.color}
          />
        ))}
      </div>

      {/* Backlog trend + availability gauge */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14, alignItems: "stretch" }}>
        <Panel
          title="Backlog by Priority"
          eyebrow="Open Work Orders · Trailing 12 Months"
          actions={
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Lg color="var(--ds-data-2)" label="Low" line />
              <Lg color="var(--ds-signal-info)" label="Medium" line />
              <Lg color="var(--ds-signal-warning)" label="High" line />
              <Lg color="var(--ds-signal-negative)" label="Critical" line />
            </div>
          }
        >
          <C.LineCompare
            labels={D.months}
            height={250}
            markerIndex={11}
            markerLabel="BATTLE OF YAVIN"
            yFormat={(v) => Math.round(v).toString()}
            series={[
              { name: "Low", data: m.backlog.low, color: "var(--ds-data-2)" },
              { name: "Medium", data: m.backlog.medium, color: "var(--ds-signal-info)" },
              { name: "High", data: m.backlog.high, color: "var(--ds-signal-warning)" },
              { name: "Critical", data: m.backlog.crit, color: "var(--ds-signal-negative)" },
            ]}
          />
        </Panel>

        <Panel title="Station Availability" eyebrow="Uptime / Scheduled Hours">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 14 }}>
            <Gauge value={0.976} redBelow={0.9} warnBelow={0.95} label="Threshold 95%" size={180} />
            <p style={{ margin: 0, fontSize: 12, color: "var(--ds-text-muted)", textAlign: "center", lineHeight: 1.5, maxWidth: 220 }}>
              Reactor and superlaser downtime drag availability; <b style={{ color: "var(--ds-text-secondary)" }}>{m.criticalWO}</b> critical work orders open.
            </p>
            <div style={{ width: "100%", paddingTop: 12, borderTop: "1px solid var(--ds-line-faint)" }}>
              <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 9.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ds-text-muted)", marginBottom: 9, textAlign: "center" }}>Open Backlog · {backlogTotal.toLocaleString()} WOs</div>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 7 }}>
                <StatusPill status="negative" size="sm">Critical {last(m.backlog.crit)}</StatusPill>
                <StatusPill status="warning" size="sm">High {last(m.backlog.high)}</StatusPill>
                <StatusPill status="positive" size="sm">Low {last(m.backlog.low)}</StatusPill>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Downtime ranking + backlog mix donut */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14, alignItems: "stretch" }}>
        <Panel title="Downtime by System" eyebrow="Lost Hours · Trailing 12 Months">
          <C.HBars data={downtimeData} format={(v) => v.toLocaleString() + " h"} color="var(--ds-data-5)" />
        </Panel>
        <Panel title="Backlog Mix" eyebrow="Open WOs by Priority">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <C.Donut segments={backlogSeg} centerValue={backlogTotal.toLocaleString()} centerLabel="Open" />
            <div style={{ width: "100%" }}>
              <C.Legend segments={backlogSeg} format={(v) => v.toLocaleString()} />
            </div>
          </div>
        </Panel>
      </div>

      {/* Recent work orders */}
      <Panel title="Recent Work Orders" eyebrow="Latest Postings" padded={false}>
        <DataTable
          rowKey="id"
          dense={dense}
          columns={[
            { key: "id", label: "Work Order", numeric: true },
            { key: "opened", label: "Opened" },
            { key: "dept", label: "System" },
            { key: "item", label: "Component" },
            { key: "downtime", label: "Downtime", numeric: true },
            { key: "cost", label: "Repair Cost ₡", numeric: true, render: (r) => <span>₡ {r.cost}</span> },
            { key: "status", label: "Status", render: (r) => <StatusPill status={r.rs} size="sm">{r.status}</StatusPill> },
          ]}
          rows={m.recent}
        />
      </Panel>
    </div>
  );
}

/* ================================================================= *
 * CONSOLE OVERVIEW — report library / navigation landing            *
 * ================================================================= */
const REPORTS = [
  {
    id: "briefing",
    icon: "layout-dashboard",
    domain: "Finance · P&L",
    title: "Imperial Executive Briefing",
    blurb: "Consolidated financial posture for station command. Trailing-twelve-month surplus, income against expenditure, and the headcount balance — with departmental budget variance at a glance.",
    inside: ["Net Subsidy Balance", "Headcount Balance", "Variance Scatter", "Combat-Loss Replenishment"],
    metric: { label: "Net Surplus", value: "₡ 1.28B", tone: "positive" },
  },
  {
    id: "ops",
    icon: "git-branch",
    domain: "Procurement · Vendors",
    title: "Operations Command",
    blurb: "Procurement and vendor oversight. Division-group spend, vendor risk exposure scored against contract value, and the open pending-and-disputed ledger.",
    inside: ["Spend by Division Group", "Vendor Risk Matrix", "Top Vendors", "Pending & Disputed Ledger"],
    metric: { label: "Open Postings", value: "47", tone: "warning" },
  },
  {
    id: "budget",
    icon: "gauge",
    domain: "Finance · Budget",
    title: "Budget Performance",
    blurb: "Allocation against actuals across every division. Variance bands flag over- and under-spend, with adherence ranked by department weight.",
    inside: ["Budget vs Actual", "Variance Bands", "Adherence by Division"],
    metric: { label: "Subsidy Coverage", value: "94%", tone: "positive" },
  },
  {
    id: "supply",
    icon: "boxes",
    domain: "Logistics · Inventory",
    title: "Supply Chain Status",
    blurb: "Inventory position and replenishment risk. Stock by category and location type, sixteen-week stockout exposure, and the at-or-below reorder watchlist.",
    inside: ["Inventory by Category", "Stockouts Heat-Strip", "Reorder Watchlist"],
    metric: { label: "Inventory Value", value: "₡ 3.41B", tone: "info" },
  },
  {
    id: "workforce",
    icon: "users",
    domain: "Personnel · Headcount",
    title: "Workforce & Personnel",
    blurb: "Personnel strength and attrition. Headcount by role, droid-to-organic composition, and attrition tracked against combat losses through the Battle of Yavin.",
    inside: ["Headcount by Role", "Attrition & Combat Losses", "Droids vs Organics", "Payroll by Department"],
    metric: { label: "Complement", value: "1.71M", tone: "positive" },
  },
  {
    id: "maint",
    icon: "wrench",
    domain: "Operations · Work Orders",
    title: "Maintenance & Reliability",
    blurb: "Reliability and work-order throughput. Open backlog by priority, downtime by system, and station availability against the 95% threshold.",
    inside: ["Backlog by Priority", "Downtime by System", "Station Availability", "Recent Work Orders"],
    metric: { label: "Availability", value: "97.6%", tone: "warning" },
  },
];

const TONE = {
  positive: "var(--ds-signal-positive)",
  warning: "var(--ds-signal-warning)",
  negative: "var(--ds-signal-negative)",
  info: "var(--ds-signal-info)",
};

function Overview({ onNavigate }) {
  const { Icon } = window.DSMSDesignSystem_197d77;
  const EYEBROW = { fontFamily: "var(--ds-font-display)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ds-text-muted)" };

  function ReportCard({ r }) {
    const [hover, setHover] = React.useState(false);
    const tone = TONE[r.metric.tone];
    return (
      <button
        type="button"
        onClick={() => onNavigate(r.id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column",
          padding: "20px 22px", gap: 16, width: "100%",
          background: hover ? "var(--ds-bg-bay)" : "var(--ds-bg-hull)",
          border: `1px solid ${hover ? "var(--ds-line-bright)" : "var(--ds-line-conduit)"}`,
          borderRadius: "var(--ds-radius-md)",
          transition: "background var(--ds-dur-fast) var(--ds-ease-standard), border-color var(--ds-dur-fast) var(--ds-ease-standard)",
          font: "inherit", color: "inherit",
        }}
      >
        {/* leading imperial accent stripe — the one motif, on hover */}
        <span style={{ position: "absolute", left: 0, top: 16, bottom: 16, width: 2, background: "var(--ds-accent-imperial)", borderRadius: 1, opacity: hover ? 1 : 0, transition: "opacity var(--ds-dur-fast) var(--ds-ease-standard)" }} />

        {/* header: icon tile + title block + metric chip */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <span style={{
            flex: "0 0 auto", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--ds-bg-deck)", border: `1px solid ${hover ? "var(--ds-accent-imperial)" : "var(--ds-line-conduit)"}`,
            borderRadius: "var(--ds-radius-sm)", color: hover ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-secondary)",
            transition: "border-color var(--ds-dur-fast), color var(--ds-dur-fast)",
          }}>
            <Icon name={r.icon} size={20} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...EYEBROW, fontSize: 9.5, letterSpacing: "0.14em", marginBottom: 5 }}>{r.domain}</div>
            <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 17, fontWeight: 700, color: "var(--ds-text-primary)", lineHeight: 1.2, letterSpacing: "0.01em" }}>{r.title}</div>
          </div>
          <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, paddingLeft: 8 }}>
            <span style={{ ...EYEBROW, fontSize: 8.5, letterSpacing: "0.12em" }}>{r.metric.label}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--ds-font-mono)", fontSize: 15, fontWeight: 600, color: tone, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: tone, flex: "0 0 auto" }} />
              {r.metric.value}
            </span>
          </div>
        </div>

        {/* blurb */}
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "var(--ds-text-secondary)", textWrap: "pretty" }}>{r.blurb}</p>

        {/* inside chips */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ ...EYEBROW, fontSize: 8.5, letterSpacing: "0.14em" }}>Inside This Report</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {r.inside.map((s) => (
              <span key={s} style={{ fontSize: 11, color: "var(--ds-text-muted)", padding: "3px 8px", background: "var(--ds-bg-deck)", border: "1px solid var(--ds-line-faint)", borderRadius: "var(--ds-radius-xs)", whiteSpace: "nowrap" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* footer: open affordance */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--ds-line-faint)" }}>
          <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 10.5, color: "var(--ds-text-faint)", letterSpacing: "0.02em" }}>Filed under {r.domain.split(" · ")[0]}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--ds-font-display)", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: hover ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-muted)", transition: "color var(--ds-dur-fast)" }}>
            View Report
            <Icon name="arrow-right" size={14} strokeWidth={2.25} />
          </span>
        </div>
      </button>
    );
  }

  function MetaItem({ label, value, tone, last }) {
    return (
      <div style={{ padding: "0 18px", borderRight: last ? "none" : "1px solid var(--ds-line-faint)" }}>
        <div style={{ ...EYEBROW, fontSize: 9, letterSpacing: "0.14em", marginBottom: 7 }}>{label}</div>
        <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: 15, fontWeight: 600, color: tone || "var(--ds-text-primary)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{value}</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Masthead */}
      <div style={{ background: "var(--ds-bg-hull)", border: "1px solid var(--ds-line-conduit)", borderRadius: "var(--ds-radius-md)", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", alignItems: "stretch" }}>
        <div style={{ padding: "26px 28px" }}>
          <div style={{ ...EYEBROW, fontSize: 10.5, letterSpacing: "0.18em", marginBottom: 14 }}>Operations Intelligence · Station DS-1</div>
          <h1 style={{ margin: 0, fontFamily: "var(--ds-font-display)", fontSize: 30, fontWeight: 700, color: "var(--ds-text-primary)", lineHeight: 1.1, letterSpacing: "0.005em", display: "inline-block", paddingBottom: 12, borderBottom: "2px solid var(--ds-accent-imperial)" }}>
            Station Operations Console
          </h1>
          <p style={{ margin: "18px 0 0", maxWidth: 620, fontSize: 13.5, lineHeight: 1.65, color: "var(--ds-text-secondary)", textWrap: "pretty" }}>
            Death Star Management Services maintains six command reports covering the financial, procurement, logistics, personnel, and reliability posture of the DS-1 Orbital Battle Station. Select a report below to open its full readout. All figures are trailing-twelve-month to 0&nbsp;BBY.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "26px 10px", borderLeft: "1px solid var(--ds-line-conduit)", background: "var(--ds-bg-void)", borderTopRightRadius: "var(--ds-radius-md)", borderBottomRightRadius: "var(--ds-radius-md)" }}>
          <MetaItem label="Reports" value="06" />
          <MetaItem label="Refreshed" value="0 BBY" />
          <MetaItem label="Coverage" value="94%" tone="var(--ds-signal-positive)" />
          <MetaItem label="Clearance" value="EYES ONLY" tone="var(--ds-accent-imperial-hi)" last />
        </div>
      </div>

      {/* Section header */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 4 }}>
        <div>
          <div style={{ ...EYEBROW, fontSize: 10, letterSpacing: "0.16em", marginBottom: 8 }}>Available Readouts</div>
          <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 19, fontWeight: 700, color: "var(--ds-text-primary)", display: "inline-block", paddingBottom: 8, borderBottom: "1px solid var(--ds-accent-imperial)" }}>Report Library</div>
        </div>
        <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "var(--ds-text-faint)" }}>Filed under Operations · last refreshed 0 BBY</span>
      </div>

      {/* Report grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "stretch" }}>
        {REPORTS.map((r) => <ReportCard key={r.id} r={r} />)}
      </div>
    </div>
  );
}

/* ================================================================= *
 * CONSOLE SHELL                                                      *
 * ================================================================= */
function Console(props) {
  const { SidebarRail, TopBar, Slicer, Button, IconButton } = window.DSMSDesignSystem_197d77;
  const { useState, useEffect } = React;

  const [active, setActive] = useState(props.startPage || "overview");
  const [collapsed, setCollapsed] = useState(!!props.collapsed);
  useEffect(() => { if (props.startPage) setActive(props.startPage); }, [props.startPage]);
  useEffect(() => { setCollapsed(!!props.collapsed); }, [props.collapsed]);

  const dense = !!props.dense;
  const showCombat = props.showCombat !== false; // default on

  const page = PAGES.find((p) => p.id === active) || PAGES[0];

  let Screen = null;
  if (active === "overview") Screen = <Overview onNavigate={setActive} />;
  else if (active === "briefing") Screen = <Briefing showCombat={showCombat} />;
  else if (active === "ops") Screen = <Operations dense={dense} />;
  else if (active === "budget") {
    const B = window.DSMSScreens && window.DSMSScreens.BudgetScreen;
    Screen = B ? <B /> : null;
  } else if (active === "supply") Screen = <Supply dense={dense} />;
  else if (active === "workforce") Screen = <Workforce showCombat={showCombat} />;
  else if (active === "maint") Screen = <Maintenance dense={dense} />;

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", background: "var(--ds-bg-void)", color: "var(--ds-text-secondary)", fontFamily: "var(--ds-font-body)" }}>
      <SidebarRail items={PAGES} active={active} onSelect={setActive} collapsed={collapsed} statusLabel="Subsidy Coverage" statusValue="94%" statusTone="positive" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar title={page.title} breadcrumb={page.crumb} onToggleRail={() => setCollapsed((c) => !c)}>
          {active === "overview" ? null : (
            <React.Fragment>
              <Slicer size="sm" defaultValue="2022" options={[
                { value: "2019", label: "2019" },
                { value: "2020", label: "2020" },
                { value: "2021", label: "2021" },
                { value: "2022", label: "2022" },
              ]} />
              <IconButton icon="bell" title="Alerts" />
              <Button variant="secondary" size="sm" icon="download">Export</Button>
            </React.Fragment>
          )}
        </TopBar>

        <main style={{ flex: 1, overflow: "auto", padding: 24, backgroundColor: "var(--ds-bg-void)", backgroundImage: "var(--ds-texture-grid)", backgroundSize: "var(--ds-texture-grid-size)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>{Screen}</div>
        </main>
      </div>
    </div>
  );
}

module.exports = { Console };
