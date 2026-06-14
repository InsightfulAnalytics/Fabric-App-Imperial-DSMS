import { useState } from "react";
import type { CSSProperties } from "react";

export interface SlicerOption {
  value: string;
  label: string;
}

export interface SlicerProps {
  options?: Array<SlicerOption | string>;
  /** Controlled selected value. */
  value?: string;
  defaultValue?: string;
  size?: "sm" | "md";
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

/**
 * Segmented single-select control — DSMS take on a Power BI slicer.
 * Active segment carries the imperial wash + a 2px accent underline.
 */
export function Slicer({
  options = [],
  value,
  defaultValue,
  size = "md",
  onChange,
  style,
}: SlicerProps) {
  const norm: SlicerOption[] = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string | undefined>(
    defaultValue !== undefined ? defaultValue : norm[0]?.value,
  );
  const selected = isControlled ? value : internal;

  const h = size === "sm" ? 28 : 34;
  const fs = size === "sm" ? 11.5 : 12.5;

  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      role="radiogroup"
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        height: h,
        padding: 2,
        gap: 2,
        background: "var(--ds-bg-deck)",
        border: "1px solid var(--ds-line-conduit)",
        borderRadius: "var(--ds-radius-xs)",
        ...style,
      }}
    >
      {norm.map((o) => (
        <Segment
          key={o.value}
          on={o.value === selected}
          fs={fs}
          label={o.label}
          onClick={() => select(o.value)}
        />
      ))}
    </div>
  );
}

function Segment({
  on,
  fs,
  label,
  onClick,
}: {
  on: boolean;
  fs: number;
  label: string;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 12px",
        background: on
          ? "var(--ds-accent-imperial-dim)"
          : hover
            ? "var(--ds-bg-bay)"
            : "transparent",
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
        transition:
          "background var(--ds-dur-fast) var(--ds-ease-standard), color var(--ds-dur-fast) var(--ds-ease-standard)",
      }}
    >
      {label}
      {on && (
        <span
          style={{
            position: "absolute",
            left: 8,
            right: 8,
            bottom: 2,
            height: 2,
            background: "var(--ds-accent-imperial)",
            borderRadius: 1,
          }}
        />
      )}
    </button>
  );
}
