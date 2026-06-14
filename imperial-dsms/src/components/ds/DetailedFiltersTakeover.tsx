import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import { Input } from "./Input";
import type { SlicerCategory, SlicerSelection } from "./SlicerPane";

export interface DetailedFiltersTakeoverProps {
  /** Multi-select slicers to show, each a searchable grouped checkbox list. */
  categories: SlicerCategory[];
  /** Controlled selection: `{ [categoryId]: string[] }`. */
  selection?: SlicerSelection;
  defaultSelection?: SlicerSelection;
  onSelectionChange?: (selection: SlicerSelection) => void;
  /** `columns` shows every slicer side-by-side; `tabbed` shows one with tabs. Default `columns`. */
  mode?: "columns" | "tabbed";
  title?: string;
  subtitle?: string;
  /** Close (scrim click, Cancel, X). */
  onClose?: () => void;
  /** Apply button. Falls back to `onClose` when omitted. */
  onApply?: () => void;
  style?: CSSProperties;
}

/**
 * DetailedFiltersTakeover — a full-surface modal that opens every "detailed"
 * multi-select slicer at once over a dimmed report. Pairs with SlicerPane: the
 * pane's detailed rows / "Open all" link call its `onOpenAll`, the host opens
 * this. Render inside a `position: relative` container (it fills with
 * `position: absolute; inset: 0`). Controlled (`selection`) or uncontrolled.
 */
export function DetailedFiltersTakeover({
  categories = [],
  selection,
  defaultSelection,
  onSelectionChange,
  mode = "columns",
  title = "Detailed Filters",
  subtitle = "Refine every detailed slicer across the report",
  onClose,
  onApply,
  style,
}: DetailedFiltersTakeoverProps) {
  const initSel = useMemo<SlicerSelection>(() => {
    const base: SlicerSelection = {};
    categories.forEach((c) => {
      base[c.id] = [];
    });
    return { ...base, ...(defaultSelection ?? {}) };
  }, [categories, defaultSelection]);

  const controlled = selection !== undefined;
  const [internal, setInternal] = useState<SlicerSelection>(initSel);
  const sel = controlled ? selection! : internal;
  const commit = (next: SlicerSelection | ((s: SlicerSelection) => SlicerSelection)) => {
    const v = typeof next === "function" ? next(sel) : next;
    if (!controlled) setInternal(v);
    onSelectionChange?.(v);
  };
  const selFor = (id: string): string[] => sel[id] ?? [];
  const toggle = (cat: SlicerCategory, it: string) =>
    commit((s) => {
      const a = s[cat.id] ?? [];
      return { ...s, [cat.id]: a.includes(it) ? a.filter((x) => x !== it) : [...a, it] };
    });
  const setCat = (id: string, arr: string[]) => commit((s) => ({ ...s, [id]: arr }));
  const clearAll = () => commit(Object.fromEntries(categories.map((c) => [c.id, []])));

  const catById = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, SlicerCategory>,
    [categories],
  );
  const [shown, setShown] = useState(false);
  const [q, setQ] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<string | null>(categories[0]?.id ?? null);
  const setQuery = (id: string, v: string) => setQ((s) => ({ ...s, [id]: v }));
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const total = categories.reduce((n, c) => n + selFor(c.id).length, 0);
  const activeCats = categories.filter((c) => selFor(c.id).length > 0).length;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, overflow: "hidden", ...style }}>
      {/* scrim */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: shown ? "rgba(6,7,9,.5)" : "rgba(6,7,9,0)",
          transition: "background .2s",
        }}
      />

      {/* foreground card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 28,
          pointerEvents: "none",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: "auto",
            width: mode === "columns" ? "100%" : 560,
            maxWidth: mode === "columns" ? 1040 : 560,
            height: "100%",
            maxHeight: 680,
            display: "flex",
            flexDirection: "column",
            background: "var(--ds-bg-bay)",
            border: "1px solid var(--ds-line-bright)",
            borderRadius: 12,
            boxShadow: "0 32px 90px rgba(0,0,0,.6)",
            overflow: "hidden",
            transform: shown ? "scale(1)" : "scale(.96)",
            opacity: shown ? 1 : 0,
            transition: "transform .2s cubic-bezier(.2,.7,.3,1), opacity .2s",
          }}
        >
          {/* header */}
          <header
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 14px 16px 18px",
              borderBottom: "1px solid var(--ds-line-conduit)",
            }}
          >
            <span style={{ color: "var(--ds-accent-imperial-hi)", display: "flex" }}>
              <Icon name="list-filter" size={20} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--ds-font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--ds-text-primary)",
                  lineHeight: 1.1,
                }}
              >
                {title}
              </div>
              {subtitle && (
                <div
                  style={{
                    fontFamily: "var(--ds-font-body)",
                    fontSize: 11.5,
                    color: "var(--ds-text-muted)",
                    marginTop: 2,
                  }}
                >
                  {subtitle}
                </div>
              )}
            </div>
            <button onClick={onClose} style={iconBtn}>
              <Icon name="x" size={20} />
            </button>
          </header>

          {/* body */}
          {mode === "columns" ? (
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "grid",
                gridTemplateColumns: `repeat(${Math.max(1, categories.length)}, 1fr)`,
                gap: 14,
                padding: 16,
              }}
            >
              {categories.map((cat) => (
                <SlicerColumn
                  key={cat.id}
                  cat={cat}
                  sel={selFor(cat.id)}
                  query={q[cat.id] || ""}
                  setQuery={(v) => setQuery(cat.id, v)}
                  onToggle={(it) => toggle(cat, it)}
                  setSel={(a) => setCat(cat.id, a)}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                padding: 16,
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  background: "var(--ds-bg-deck)",
                  border: "1px solid var(--ds-line-conduit)",
                  borderRadius: "var(--ds-radius-xs)",
                  padding: 3,
                }}
              >
                {categories.map((cat) => {
                  const on = cat.id === tab;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setTab(cat.id)}
                      style={{
                        flex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 7,
                        padding: "8px 6px",
                        border: "none",
                        borderRadius: "var(--ds-radius-xs)",
                        cursor: "pointer",
                        background: on ? "var(--ds-accent-imperial-dim)" : "transparent",
                        color: on ? "var(--ds-text-primary)" : "var(--ds-text-muted)",
                        fontFamily: "var(--ds-font-display)",
                        fontSize: 11.5,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      <Icon name={cat.icon} size={15} /> {cat.label}
                      <span
                        style={{
                          fontFamily: "var(--ds-font-mono)",
                          fontSize: 10,
                          color: selFor(cat.id).length
                            ? "var(--ds-signal-info)"
                            : "var(--ds-text-faint)",
                        }}
                      >
                        {selFor(cat.id).length}
                      </span>
                    </button>
                  );
                })}
              </div>
              {tab && catById[tab] && (
                <div style={{ flex: 1, minHeight: 0 }}>
                  <SlicerColumn
                    cat={catById[tab]}
                    sel={selFor(tab)}
                    query={q[tab] || ""}
                    setQuery={(v) => setQuery(tab, v)}
                    onToggle={(it) => toggle(catById[tab], it)}
                    setSel={(a) => setCat(tab, a)}
                  />
                </div>
              )}
            </div>
          )}

          {/* footer */}
          <footer
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderTop: "1px solid var(--ds-line-conduit)",
              background: "var(--ds-bg-hull)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--ds-font-body)",
                fontSize: 12,
                color: "var(--ds-text-muted)",
              }}
            >
              <b style={{ fontFamily: "var(--ds-font-mono)", color: "var(--ds-text-primary)" }}>
                {total}
              </b>{" "}
              across{" "}
              <b style={{ fontFamily: "var(--ds-font-mono)", color: "var(--ds-text-primary)" }}>
                {activeCats}
              </b>{" "}
              slicers
            </span>
            <button onClick={clearAll} style={clearAllBtn}>
              Clear all
            </button>
            <button onClick={onClose} style={ghostBtn}>
              Cancel
            </button>
            <button onClick={onApply ?? onClose} style={applyBtn}>
              Apply Filters
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* ── helpers ─────────────────────────────────────────────────────────────── */

const totalItems = (cat: SlicerCategory) => cat.groups.reduce((n, g) => n + g.items.length, 0);

function SlicerColumn({
  cat,
  sel,
  onToggle,
  setSel,
  query,
  setQuery,
}: {
  cat: SlicerCategory;
  sel: string[];
  onToggle: (item: string) => void;
  setSel: (arr: string[]) => void;
  query: string;
  setQuery: (v: string) => void;
}) {
  const allItems = cat.groups.flatMap((g) => g.items);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        height: "100%",
        background: "var(--ds-bg-hull)",
        border: "1px solid var(--ds-line-conduit)",
        borderRadius: "var(--ds-radius-md)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "12px 12px 10px",
          borderBottom: "1px solid var(--ds-line-conduit)",
        }}
      >
        <span
          style={{
            flex: "0 0 auto",
            width: 30,
            height: 30,
            borderRadius: "var(--ds-radius-xs)",
            background: "var(--ds-bg-bay)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ds-accent-imperial-hi)",
          }}
        >
          <Icon name={cat.icon} size={16} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--ds-text-primary)",
              lineHeight: 1.1,
            }}
          >
            {cat.label}
          </div>
          <div
            style={{
              fontFamily: "var(--ds-font-mono)",
              fontSize: 10,
              color: sel.length ? "var(--ds-signal-info)" : "var(--ds-text-faint)",
              marginTop: 1,
            }}
          >
            {sel.length} / {totalItems(cat)} selected
          </div>
        </div>
      </div>
      <div style={{ flex: "0 0 auto", padding: "10px 10px 4px" }}>
        <Input
          size="sm"
          icon="search"
          placeholder={`Search ${cat.label.toLowerCase()}…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 2px 8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ds-font-mono)",
              fontSize: 11,
              color: "var(--ds-text-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {sel.length} / {totalItems(cat)}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <MiniBtn onClick={() => setSel(allItems.slice())}>All</MiniBtn>
            <MiniBtn onClick={() => setSel([])}>Clear</MiniBtn>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 8px 8px" }}>
        <GroupedList cat={cat} sel={sel} query={query} onToggle={onToggle} />
      </div>
    </div>
  );
}

function MiniBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: `1px solid ${hover ? "var(--ds-line-bright)" : "var(--ds-line-conduit)"}`,
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
        transition: "border-color .12s, color .12s",
      }}
    >
      {children}
    </button>
  );
}

function GroupedList({
  cat,
  sel,
  onToggle,
  query,
}: {
  cat: SlicerCategory;
  sel: string[];
  onToggle: (item: string) => void;
  query?: string;
}) {
  const qq = (query ?? "").trim().toLowerCase();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {cat.groups.map((g) => {
        const items = g.items.filter((it) => !qq || it.toLowerCase().includes(qq));
        if (!items.length) return null;
        return (
          <div key={g.name} style={{ marginBottom: 4 }}>
            <div
              style={{
                fontFamily: "var(--ds-font-display)",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ds-text-faint)",
                padding: "6px 8px 4px",
              }}
            >
              {g.name}
            </div>
            {items.map((it) => (
              <CheckRow key={it} label={it} on={sel.includes(it)} onClick={() => onToggle(it)} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function CheckRow({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
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
        transition: "background .12s",
      }}
    >
      <span
        style={{
          flex: "0 0 auto",
          width: 15,
          height: 15,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: on ? "var(--ds-accent-imperial)" : "transparent",
          border: `1.5px solid ${on ? "var(--ds-accent-imperial)" : "var(--ds-line-bright)"}`,
          color: "var(--ds-text-on-accent)",
          transition: "background .12s, border-color .12s",
        }}
      >
        {on && <Icon name="check" size={10} strokeWidth={3.5} />}
      </span>
      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </span>
    </button>
  );
}

const iconBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  border: "none",
  background: "transparent",
  color: "var(--ds-text-muted)",
  cursor: "pointer",
  borderRadius: "var(--ds-radius-xs)",
  flex: "0 0 auto",
};

const ghostBtn: CSSProperties = {
  border: "1px solid var(--ds-line-conduit)",
  background: "transparent",
  color: "var(--ds-text-muted)",
  cursor: "pointer",
  borderRadius: "var(--ds-radius-xs)",
  height: 36,
  padding: "0 16px",
  fontFamily: "var(--ds-font-display)",
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const applyBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  border: "none",
  background: "var(--ds-accent-imperial)",
  color: "var(--ds-text-on-accent)",
  cursor: "pointer",
  borderRadius: "var(--ds-radius-xs)",
  height: 36,
  padding: "0 20px",
  fontFamily: "var(--ds-font-display)",
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const clearAllBtn: CSSProperties = {
  marginLeft: "auto",
  border: "none",
  background: "transparent",
  color: "var(--ds-text-faint)",
  cursor: "pointer",
  fontFamily: "var(--ds-font-display)",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};
