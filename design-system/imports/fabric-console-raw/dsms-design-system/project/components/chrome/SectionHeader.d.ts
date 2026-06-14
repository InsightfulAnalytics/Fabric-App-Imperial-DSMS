import * as React from "react";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export function SectionHeader(props: SectionHeaderProps): JSX.Element;
