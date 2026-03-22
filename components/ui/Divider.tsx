import React from "react";

interface DividerProps {
  label?: string;
  className?: string;
}

export default function Divider({ label, className = "" }: DividerProps) {
  if (label) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="h-px flex-1 bg-[--border]" />
        <span className="font-sans text-[10px] uppercase tracking-widest text-[--text-muted]">
          {label}
        </span>
        <div className="h-px flex-1 bg-[--border]" />
      </div>
    );
  }

  return <div className={`h-px w-full bg-[--border] ${className}`} />;
}
