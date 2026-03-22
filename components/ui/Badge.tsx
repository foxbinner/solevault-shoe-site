import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center bg-[--accent] px-2 py-1 font-sans text-[10px] uppercase tracking-widest text-[--text] rounded-none ${className}`}
    >
      {children}
    </span>
  );
}
