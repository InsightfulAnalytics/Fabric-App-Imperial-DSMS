import { useState } from "react";
import type { CSSProperties } from "react";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  style?: CSSProperties;
}

/** Toggle — square-ish track (2px radius), imperial red when on. */
export function Switch({
  checked,
  defaultChecked = false,
  disabled = false,
  label,
  onChange,
  style,
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        ...style,
      }}
    >
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={toggle}
        style={{
          position: "relative",
          width: 38,
          height: 20,
          padding: 0,
          flex: "0 0 auto",
          background: on ? "var(--ds-accent-imperial)" : "var(--ds-bg-deck)",
          border: `1px solid ${on ? "var(--ds-accent-imperial)" : "var(--ds-line-bright)"}`,
          borderRadius: "var(--ds-radius-xs)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition:
            "background var(--ds-dur-normal) var(--ds-ease-standard), border-color var(--ds-dur-normal) var(--ds-ease-standard)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: on ? 20 : 2,
            width: 14,
            height: 14,
            background: on ? "var(--ds-text-on-accent)" : "var(--ds-text-secondary)",
            borderRadius: 1,
            transition: "left var(--ds-dur-normal) var(--ds-ease-out)",
          }}
        />
      </button>
      {label && (
        <span
          style={{
            fontFamily: "var(--ds-font-body)",
            fontSize: 13,
            color: "var(--ds-text-secondary)",
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
}
