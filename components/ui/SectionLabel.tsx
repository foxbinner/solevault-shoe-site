import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({
  children,
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`font-sans text-xs uppercase tracking-[0.2em] text-[--text-muted] ${className}`}
    >
      {children}
    </p>
  );
}
