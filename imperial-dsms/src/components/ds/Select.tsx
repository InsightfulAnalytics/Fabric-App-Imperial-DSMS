import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

export interface SelectOption {
  value: string;
  label: string;
}

/** Synthetic change event — keeps the former native-select call shape. */
export interface SelectChangeEvent {
  target: { value: string };
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  options?: Array<SelectOption | string>;
  size?: "sm" | "md";
  /** Optional leading Lucide icon name. */
  icon?: string;
  disabled?: boolean;
  /** Fired on selection. Receives a synthetic `{ target: { value } }`. */
  onChange?: (e: SelectChangeEvent) => void;
  style?: CSSProperties;
  className?: string;
}

/**
 * Select — single-select dropdown styled for the console. Renders a custom
 * themed menu (NOT a native OS dropdown) so the options surface matches the
 * Imperial vocabulary: a dark, hairline-bordered card that opens flush under the
 * trigger, the active option washed in imperial with a check. The whole control —
 * label and chevron alike — toggles the menu; click-outside / Esc close it, and
 * it flips above the trigger when there isn't room below. Controlled (`value`)
 * or uncontrolled (`defaultValue`).
 */
export function Select({
  value,
  defaultValue,
  options = [],
  size = "md",
  icon,
  disabled = false,
  onChange,
  style,
  className,
}: SelectProps) {
  const norm: SelectOption[] = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string | undefined>(
    defaultValue !== undefined ? defaultValue : norm[0]?.value,
  );
  const current = isControlled ? value : internal;
  const selectedOpt = norm.find((o) => o.value === current) ?? norm[0];

  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const h = size === "sm" ? 30 : 36;
  const fs = size === "sm" ? 12 : 13;

  useEffect(() => {
    if (!open) return;
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      const below = window.innerHeight - r.bottom;
      setUp(below < 260 && r.top > below);
    }
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.({ target: { value: v } });
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "stretch",
        ...style,
      }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: h,
          padding: "0 8px 0 10px",
          textAlign: "left",
          cursor: disabled ? "not-allowed" : "pointer",
          background: disabled ? "var(--ds-bg-hull)" : "var(--ds-bg-deck)",
          border: `1px solid ${open ? "var(--ds-accent-imperial)" : "var(--ds-line-conduit)"}`,
          boxShadow: open ? "inset 0 0 0 1px var(--ds-accent-imperial)" : "none",
          borderRadius: "var(--ds-radius-xs)",
          opacity: disabled ? 0.55 : 1,
          transition:
            "border-color var(--ds-dur-fast) var(--ds-ease-standard), box-shadow var(--ds-dur-fast) var(--ds-ease-standard)",
        }}
      >
        {icon && (
          <span style={{ flex: "0 0 auto", color: "var(--ds-text-muted)", display: "flex" }}>
            <Icon name={icon} size={15} />
          </span>
        )}
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: "var(--ds-font-body)",
            fontSize: fs,
            color: "var(--ds-text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {selectedOpt ? selectedOpt.label : ""}
        </span>
        <span
          style={{
            flex: "0 0 auto",
            color: open ? "var(--ds-accent-imperial-hi)" : "var(--ds-text-muted)",
            display: "flex",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform var(--ds-dur-normal) var(--ds-ease-standard)",
          }}
        >
          <Icon name="chevron-down" size={15} />
        </span>
      </button>

      {open && !disabled && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: 50,
            ...(up ? { bottom: "calc(100% + 4px)" } : { top: "calc(100% + 4px)" }),
            background: "var(--ds-bg-bay)",
            border: "1px solid var(--ds-line-bright)",
            borderRadius: "var(--ds-radius-xs)",
            boxShadow: "0 16px 38px rgba(0,0,0,.5)",
            padding: 4,
            maxHeight: 246,
            overflowY: "auto",
          }}
        >
          {norm.map((o) => {
            const on = o.value === current;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => choose(o.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "7px 8px",
                  border: "none",
                  borderRadius: "var(--ds-radius-xs)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "var(--ds-font-body)",
                  fontSize: 12.5,
                  color: on ? "var(--ds-text-primary)" : "var(--ds-text-secondary)",
                  background: on ? "var(--ds-accent-imperial-dim)" : "transparent",
                  transition: "background var(--ds-dur-fast) var(--ds-ease-standard)",
                }}
                onMouseEnter={(e) => {
                  if (!on) e.currentTarget.style.background = "var(--ds-bg-deck)";
                }}
                onMouseLeave={(e) => {
                  if (!on) e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    flex: 1,
                    minWidth: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {o.label}
                </span>
                {on && (
                  <span
                    style={{
                      flex: "0 0 auto",
                      color: "var(--ds-accent-imperial-hi)",
                      display: "flex",
                    }}
                  >
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
