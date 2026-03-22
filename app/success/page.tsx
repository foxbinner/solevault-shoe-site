"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import Button from "@/components/ui/Button";

export default function SuccessPage() {
  const { clearCart } = useCart();

  // Ensure cart is cleared on success
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-200px)] max-w-lg flex-col items-center justify-center px-8 py-16 text-center">
      <div className="w-full border border-[--border] bg-[--bg-card] px-10 py-14">
        <div className="font-display text-6xl text-[--accent]">✓</div>
        <h1 className="mt-4 font-display text-4xl italic">Order Confirmed.</h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-[--text-muted]">
          Thank you for your purchase. Your payment was successful and your
          order is on its way. You&apos;ll receive a confirmation email shortly.
        </p>
        <Button href="/" variant="outline" className="mt-10">
          Continue Shopping
        </Button>
        <Link
          href="/"
          className="mt-4 block font-sans text-xs uppercase tracking-widest text-[--text-muted] transition hover:text-[--accent]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
