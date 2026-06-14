import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Select } from "./Select";

export interface SlicerBasic {
  label: string;
  /** Leading Lucide icon name. */
  icon?: string;
  value: string;
  options: Array<string | { value: string; label: string }>;
}

export interface SlicerGroup {
  name: string;
  items: string[];
}

export interface SlicerCategory {
  id: string;
  label: string;
  /** Lucide icon name. */
  icon: string;
  groups: SlicerGroup[];
}

export type SlicerSelection = Record<string, string[]>;

export interface SlicerPaneProps {
  title?: string;
  subtitle?: string;
  basics?: SlicerBasic[];
  /** Controlled values for basic slices, keyed by the basic's label. */
  basicValues?: Record<string, string>;
  /** Change handler for basic slices. */
  onBasicChange?: (label: string, value: string) => void;
  categories?: SlicerCategory[];
  /** Controlled selection. */
  selection?: SlicerSelection;
  defaultSelection?: SlicerSelection;
  onSelectionChange?: (selection: SlicerSelection) => void;
  /** Controlled collapse — true = 52px icon rail. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * When set, the detailed-slice rows and the "Open all" link both open the
   * shared all-columns DetailedFiltersTakeover instead of per-slice popovers.
   */
  onOpenAll?: () => void;
  /** Expanded width in px. Default 320. */
  width?: number;
  style?: CSSProperties;
}

/**
 * SlicerPane — docked, collapsible filter pane. Hull surface, left imperial edge.
 * Basic single-select dropdowns at top, detailed multi-select categories below
 * (each opens a searchable popover-card with grouped checkboxes). Collapses to a
 * 52px icon rail. Fully controllable (selection + collapsed) or self-driven.
 */
export function SlicerPane({
  title = "Filters",
  subtitle = "Slicer Pane",
  basics = [],
  basicValues,
  onBasicChange,
  categories = [],
  selection,
  defaultSelection,
  onSelectionChange,
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  onOpenAll,
  width = 320,
  style,
}: SlicerPaneProps) {
  const initSel = useMemo<SlicerSelection>(() => {
    const base: SlicerSelection = {};
    categories.forEach((c) => {
      base[c.id] = [];
    });
    return { ...base, ...(defaultSelection ?? {}) };
  }, [categories, defaultSelection]);

  const selControlled = selection !== undefined;
  const [internalSel, setInternalSel] = useState<SlicerSelection>(initSel);
  const sel = selControlled ? selection! : internalSel;

  const commitSel = (next: SlicerSelection | ((s: SlicerSelection) => SlicerSelection)) => {
    const value = typeof next === "function" ? next(sel) : next;
    if (!selControlled) setInternalSel(value);
    onSelectionChange?.(value);
  };
  const selFor = (id: string): string[] => sel[id] ?? [];

  const collControlled = collapsed !== undefined;
  const [internalColl, setInternalColl] = useState(defaultCollapsed);
  const isCollapsed = collControlled ? collapsed! : internalColl;
  const setCollapsed = (v: boolean) => {
    if (!collControlled) setInternalColl(v);
    onCollapsedChange?.(v);
  };

  const [pop, setPop] = useState<string | null>(null);

  const toggle = (catId: string, it: string) =>
    commitSel((s) => {
      const a = s[catId] ?? [];
      return { ...s, [catId]: a.includes(it) ? a.filter((x) => x !== it) : [...a, it] };
    });
  const setCat = (catId: string, arr: string[]) => commitSel((s) => ({ ...s, [catId]: arr }));
  const reset = () => {
    commitSel(initSel);
    if (onBasicChange) basics.forEach((b) => onBasicChange(b.label, b.value));
  };

  const basicValue = (b: SlicerBasic) => basicValues?.[b.label] ?? b.value;

  const catById = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, SlicerCategory>,
    [categories],
  );
  const detCount = categories.reduce((n, c) => n + selFor(c.id).length, 0);
  // A basic counts as active when it deviates from its configured default.
  const activeCount =
    categories.filter((c) => selFor(c.id).length > 0).length +
    basics.filter((b) => basicValue(b) !== b.value).length;

  if (isCollapsed) {
    return (
      <nav
        style={{
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
          ...style,
        }}
      >
        <RailButton icon="panel-right-open" title="Expand filters" onClick={() => setCollapsed(false)} />
        <div style={{ position: "relative" }}>
          <RailButton
            icon="sliders-horizontal"
            title={`${activeCount} active filters`}
            accent
            onClick={() => setCollapsed(false)}
          />
          {activeCount > 0 && <Badge count={activeCount} />}
        </div>
        <div style={{ flex: 1 }} />
        {categories.map((c) => (
          <RailButton
            key={c.id}
            icon={c.icon}
            title={c.label}
            on={selFor(c.id).length > 0}
            onClick={() => setCollapsed(false)}
          />
        ))}
      </nav>
    );
  }

  return (
    <section
      style={{
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
        ...style,
      }}
    >
      <header
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 52,
          padding: "0 8px 0 14px",
          borderBottom: "1px solid var(--ds-line-conduit)",
        }}
      >
        <span style={{ color: "var(--ds-accent-imperial-hi)", display: "flex" }}>
          <Icon name="sliders-horizontal" size={17} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--ds-text-primary)",
              lineHeight: 1.1,
            }}
          >
            {title.toUpperCase()}
          </div>
          {subtitle && (
            <div
              style={{
                fontFamily: "var(--ds-font-display)",
                fontSize: 8.5,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "var(--ds-text-faint)",
                marginTop: 2,
              }}
            >
              {subtitle.toUpperCase()}
            </div>
          )}
        </div>
        <span
          style={{
            fontFamily: "var(--ds-font-mono)",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--ds-accent-imperial-hi)",
            background: "var(--ds-accent-imperial-dim)",
            padding: "3px 7px",
            borderRadius: "var(--ds-radius-xs)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {activeCount} active
        </span>
        <RailButton icon="panel-right-close" title="Collapse filters" onClick={() => setCollapsed(true)} />
      </header>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        {basics.length > 0 && (
          <Block style={{ paddingTop: 16 }}>
            <SectionLabel right={<ResetLink onClick={reset} />}>Basic Slices</SectionLabel>
            <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 11 }}>
              {basics.map((b) => (
                <BasicField
                  key={b.label}
                  f={b}
                  value={basicValues?.[b.label]}
                  onChange={onBasicChange ? (v) => onBasicChange(b.label, v) : undefined}
                />
              ))}
            </div>
          </Block>
        )}

        {basics.length > 0 && categories.length > 0 && <Divider />}

        {categories.length > 0 && (
          <Block>
            <SectionLabel right={onOpenAll ? <OpenAllLink onClick={onOpenAll} /> : undefined}>
              Detailed Slices
            </SectionLabel>
            <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              {categories.map((cat) => (
                <div key={cat.id}>
                  <DetailRow
                    cat={cat}
                    sel={selFor(cat.id)}
                    open={onOpenAll ? false : pop === cat.id}
                    onClick={() => (onOpenAll ? onOpenAll() : setPop(cat.id))}
                  />
                  {selFor(cat.id).length > 0 && (
                    <div style={{ padding: "8px 4px 2px" }}>
                      <Chips
                        items={selFor(cat.id)}
                        max={4}
                        onRemove={(it) => toggle(cat.id, it)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Block>
        )}
      </div>

      <FooterBar count={detCount} onReset={reset} />

      {pop && catById[pop] && !onOpenAll && (
        <PopoverCard
          cat={catById[pop]}
          sel={selFor(pop)}
          onToggle={(it) => toggle(pop, it)}
          setSel={(arr) => setCat(pop, arr)}
          onClose={() => setPop(null)}
        />
      )}
    </section>
  );
}

/* ── helpers ─────────────────────────────────────────────────────────────── */
const totalItems = (cat: SlicerCategory) => cat.groups.reduce((n, g) => n + g.items.length, 0);
const summarize = (cat: SlicerCategory, arr: string[]) => {
  const n = arr.length;
  const all = totalItems(cat);
  if (n === 0) return "None";
  if (n >= all) return `All ${all}`;
  return `${n} selected`;
};

function Badge({ count }: { count: number }) {
  return (
    <span
      style={{
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
        border: "1.5px solid var(--ds-bg-hull)",
      }}
    >
      {count}
    </span>
  );
}

function RailButton({
  icon,
  title,
  onClick,
  accent,
  on,
}: {
  icon: string;
  title: string;
  onClick: () => void;
  accent?: boolean;
  on?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const color =
    accent || on
      ? "var(--ds-accent-imperial-hi)"
      : hover
        ? "var(--ds-text-primary)"
        : "var(--ds-text-muted)";
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
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
        transition: "background .12s, color .12s",
      }}
    >
      <Icon name={icon} size={17} />
    </button>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--ds-line-conduit)", margin: "0 14px" }} />;
}

function Block({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return <div style={{ padding: "16px 0 4px", ...style }}>{children}</div>;
}

function SectionLabel({
  children,
  right,
  style,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: "0 14px",
        marginBottom: 9,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--ds-font-display)",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ds-text-muted)",
        }}
      >
        {children}
      </span>
      {right}
    </div>
  );
}

function ResetLink({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
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
        padding: 0,
      }}
    >
      <Icon name="rotate-ccw" size={11} /> Reset
    </button>
  );
}

function OpenAllLink({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
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
        padding: 0,
      }}
    >
      <Icon name="maximize-2" size={11} /> Open all
    </button>
  );
}

function BasicField({
  f,
  value,
  onChange,
}: {
  f: SlicerBasic;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [internal, setInternal] = useState(f.value);
  const v = value ?? internal;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label
        style={{
          fontFamily: "var(--ds-font-display)",
          fontSize: 9.5,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ds-text-faint)",
        }}
      >
        {f.label}
      </label>
      <Select
        size="sm"
        value={v}
        icon={f.icon}
        options={f.options}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
          else setInternal(e.target.value);
        }}
        style={{ width: "100%", display: "flex" }}
      />
    </div>
  );
}

function DetailRow({
  cat,
  sel,
  open,
  onClick,
}: {
  cat: SlicerCategory;
  sel: string[];
  open: boolean;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const border = open || hover ? "var(--ds-line-bright)" : "var(--ds-line-conduit)";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        padding: "11px 12px",
        border: `1px solid ${border}`,
        borderRadius: "var(--ds-radius-xs)",
        cursor: "pointer",
        background: open ? "var(--ds-bg-bay)" : "var(--ds-bg-deck)",
        color: "var(--ds-text-primary)",
        textAlign: "left",
        fontFamily: "var(--ds-font-body)",
        transition: "border-color .12s, background .12s",
      }}
    >
      <span
        style={{
          flex: "0 0 auto",
          width: 30,
          height: 30,
          borderRadius: "var(--ds-radius-xs)",
          background: "var(--ds-bg-hull)",
          border: "1px solid var(--ds-line-conduit)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ds-accent-imperial-hi)",
        }}
      >
        <Icon name={cat.icon} size={15} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ds-text-primary)",
            lineHeight: 1.2,
          }}
        >
          {cat.label}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--ds-font-mono)",
            fontSize: 10.5,
            color: sel.length ? "var(--ds-signal-info)" : "var(--ds-text-faint)",
            marginTop: 2,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {summarize(cat, sel)}
        </span>
      </span>
      <span style={{ flex: "0 0 auto", color: "var(--ds-text-muted)", display: "flex" }}>
        <Icon name="square-arrow-out-up-right" size={16} />
      </span>
    </button>
  );
}

function Chips({
  items,
  onRemove,
  max,
}: {
  items: string[];
  onRemove?: (item: string) => void;
  max?: number;
}) {
  const shown = max ? items.slice(0, max) : items;
  const extra = items.length - shown.length;
  if (!items.length) {
    return (
      <span
        style={{
          fontFamily: "var(--ds-font-body)",
          fontSize: 11.5,
          color: "var(--ds-text-faint)",
          fontStyle: "italic",
        }}
      >
        Nothing selected
      </span>
    );
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
      {shown.map((it) => (
        <span
          key={it}
          style={{
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
            maxWidth: 150,
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {it}
          </span>
          {onRemove && (
            <button
              onClick={() => onRemove(it)}
              style={{
                display: "flex",
                border: "none",
                background: "transparent",
                color: "var(--ds-text-faint)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <Icon name="x" size={11} />
            </button>
          )}
        </span>
      ))}
      {extra > 0 && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 7px",
            fontFamily: "var(--ds-font-mono)",
            fontSize: 11,
            color: "var(--ds-text-muted)",
            background: "var(--ds-bg-bay)",
            borderRadius: "var(--ds-radius-xs)",
          }}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}

function CheckRow({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
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
  const q = (query ?? "").trim().toLowerCase();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {cat.groups.map((g) => {
        const items = g.items.filter((it) => !q || it.toLowerCase().includes(q));
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

function ListTools({
  cat,
  sel,
  setSel,
}: {
  cat: SlicerCategory;
  sel: string[];
  setSel: (arr: string[]) => void;
}) {
  const all = totalItems(cat);
  const allItems = cat.groups.flatMap((g) => g.items);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2px 2px 8px",
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
        {sel.length} / {all}
      </span>
      <div style={{ display: "flex", gap: 4 }}>
        <MiniBtn onClick={() => setSel(allItems.slice())}>All</MiniBtn>
        <MiniBtn onClick={() => setSel([])}>Clear</MiniBtn>
      </div>
    </div>
  );
}
function MiniBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
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

function FooterBar({ count, onReset }: { count: number; onReset: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <footer
      style={{
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "12px 14px",
        borderTop: "1px solid var(--ds-line-conduit)",
        background: "var(--ds-bg-hull)",
      }}
    >
      <button
        onClick={onReset}
        style={{
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
          textTransform: "uppercase",
        }}
      >
        <Icon name="rotate-ccw" size={13} /> Reset
      </button>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
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
          textTransform: "uppercase",
        }}
      >
        Apply Filters
        <span style={{ fontFamily: "var(--ds-font-mono)", opacity: 0.85 }}>· {count}</span>
      </button>
    </footer>
  );
}

function PopoverCard({
  cat,
  sel,
  onToggle,
  setSel,
  onClose,
}: {
  cat: SlicerCategory;
  sel: string[];
  onToggle: (item: string) => void;
  setSel: (arr: string[]) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 6,
        background: shown ? "rgba(8,9,11,.62)" : "rgba(8,9,11,0)",
        transition: "background .18s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
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
          transition: "transform .18s cubic-bezier(.2,.7,.3,1), opacity .18s",
        }}
      >
        <header
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 10px 12px 14px",
            borderBottom: "1px solid var(--ds-line-conduit)",
          }}
        >
          <span style={{ color: "var(--ds-accent-imperial-hi)", display: "flex" }}>
            <Icon name={cat.icon} size={16} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--ds-font-display)",
                fontSize: 13.5,
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
                color: "var(--ds-text-muted)",
                marginTop: 1,
              }}
            >
              {sel.length} of {totalItems(cat)} selected
            </div>
          </div>
          <button onClick={onClose} style={popIconBtn}>
            <Icon name="x" size={17} />
          </button>
        </header>
        <div style={{ padding: "12px 12px 4px" }}>
          <Input
            size="sm"
            icon="search"
            placeholder={`Search ${cat.label.toLowerCase()}…`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ width: "100%" }}
          />
          <div style={{ marginTop: 4 }}>
            <ListTools cat={cat} sel={sel} setSel={setSel} />
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 10px 6px" }}>
          <GroupedList cat={cat} sel={sel} query={q} onToggle={onToggle} />
        </div>
        <footer
          style={{
            flex: "0 0 auto",
            display: "flex",
            gap: 10,
            padding: "10px 12px",
            borderTop: "1px solid var(--ds-line-conduit)",
            background: "var(--ds-bg-hull)",
          }}
        >
          <button onClick={() => setSel([])} style={popGhostBtn}>
            Clear
          </button>
          <button onClick={onClose} style={popPrimaryBtn}>
            Apply · {sel.length}
          </button>
        </footer>
      </div>
    </div>
  );
}

const popIconBtn: CSSProperties = {
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
  flex: "0 0 auto",
};
const popPrimaryBtn: CSSProperties = {
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
  textTransform: "uppercase",
};
const popGhostBtn: CSSProperties = {
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
  textTransform: "uppercase",
};
