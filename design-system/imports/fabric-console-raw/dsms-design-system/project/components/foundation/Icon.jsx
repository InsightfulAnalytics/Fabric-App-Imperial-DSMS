import React from "react";

/* kebab-case lucide name -> PascalCase key used by the UMD global */
function toPascal(name) {
  return String(name)
    .split(/[-_]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
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
export function Icon({ name = "circle", size = 16, strokeWidth = 1.75, style = {}, className }) {
  const lucide = typeof window !== "undefined" ? window.lucide : null;
  const pascal = toPascal(name);
  let nodes = null;
  if (lucide) {
    const def = (lucide.icons && lucide.icons[pascal]) || lucide[pascal];
    // def may be the children array, or [tag, attrs, children]
    if (Array.isArray(def)) {
      nodes = Array.isArray(def[0]) ? def : def[2];
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={name}
      className={className}
      style={{ flex: "0 0 auto", display: "inline-block", ...style }}
    >
      {nodes &&
        nodes.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...camelAttrs(attrs || {}) }))}
    </svg>
  );
}
