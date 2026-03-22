"use client";

import { useCart } from "@/lib/cart-store";

export default function Toast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 border border-[--border] bg-[--bg-card] px-4 py-3 font-sans text-xs uppercase tracking-widest text-[--text] shadow-card transition-all duration-300 ${
        toast.visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-live="polite"
    >
      <span className="text-[--accent]">●</span>
      <span className="ml-2">{toast.message}</span>
    </div>
  );
}
