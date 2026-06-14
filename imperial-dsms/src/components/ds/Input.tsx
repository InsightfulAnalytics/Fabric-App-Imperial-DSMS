import { useState } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** Optional leading Lucide icon name. */
  icon?: string;
  type?: string;
  size?: "sm" | "md";
  disabled?: boolean;
  /** Negative-signal border. */
  invalid?: boolean;
  /** Render value in mono with tabular figures. */
  numeric?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}

/** Single-line text field — input-well surface, 2px imperial focus inset. */
export function Input({
  value,
  defaultValue,
  placeholder,
  icon,
  type = "text",
  size = "md",
  disabled = false,
  invalid = false,
  numeric = false,
  onChange,
  style,
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const h = size === "sm" ? 30 : 36;

  const borderColor = invalid
    ? "var(--ds-signal-negative)"
    : focus
      ? "var(--ds-accent-imperial)"
      : "var(--ds-line-conduit)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: h,
        padding: "0 10px",
        background: disabled ? "var(--ds-bg-hull)" : "var(--ds-bg-deck)",
        border: `1px solid ${borderColor}`,
        boxShadow: focus ? "inset 0 0 0 1px var(--ds-accent-imperial)" : "none",
        borderRadius: "var(--ds-radius-xs)",
        transition:
          "border-color var(--ds-dur-fast) var(--ds-ease-standard), box-shadow var(--ds-dur-fast) var(--ds-ease-standard)",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
    >
      {icon && (
        <span
          style={{
            color: focus ? "var(--ds-text-secondary)" : "var(--ds-text-muted)",
            display: "flex",
          }}
        >
          <Icon name={icon} size={15} />
        </span>
      )}
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
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
          letterSpacing: numeric ? "-0.01em" : "0",
        }}
        {...rest}
      />
    </div>
  );
}
