"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/lib/cart-store";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

// Load Stripe outside component to avoid re-instantiation
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

// ── Inner form that uses Stripe hooks ──────────────────────────────────────
function CheckoutForm({
  onSuccess,
  payableTotal,
}: {
  onSuccess: () => void;
  payableTotal: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const router = useRouter();
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    let paymentSucceeded = false;

    const total = Math.round(payableTotal * 100); // cents
    if (total <= 0) {
      setError("Your cart is empty. Add items before paying.");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      setError("Please fill in all shipping details.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call our Next.js API route (runs as a Vercel serverless function)
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error (${res.status})`);
      }

      const { clientSecret } = await res.json();

      if (!clientSecret) throw new Error("No client secret returned.");

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found.");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            phone: formData.phone,
            address: {
              line1: formData.address,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message ?? "Payment failed.");
      } else {
        paymentSucceeded = true;
        clearCart();
        setIsSuccess(true);
        onSuccess(); // ** Notify parent **
        // Automatically redirect to success page after 3 seconds for a smooth flow, or let user click
        redirectTimeoutRef.current = setTimeout(
          () => router.push("/success"),
          3000,
        );
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.",
      );
    } finally {
      if (!paymentSucceeded) setLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="border border-[--border] bg-[--bg-card] p-8 text-center">
        <h3 className="font-display text-4xl italic text-[--accent]">✓</h3>
        <h3 className="mt-4 font-display text-3xl italic text-[--text]">
          Order Confirmed.
        </h3>
        <p className="mt-2 font-sans text-sm text-[--text-muted]">
          Your order is completed successfully. Thank you,{" "}
          {formData.name.split(" ")[0]}!
        </p>
        <p className="mt-4 font-sans text-xs uppercase tracking-widest text-[--text-muted]">
          Redirecting...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-sans text-xs uppercase tracking-widest"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="block w-full border-0 border-b border-[--border] bg-transparent px-0 py-2 font-sans text-sm focus:border-[--text] focus:ring-0"
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block font-sans text-xs uppercase tracking-widest"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="block w-full border-0 border-b border-[--border] bg-transparent px-0 py-2 font-sans text-sm focus:border-[--text] focus:ring-0"
          placeholder="+1 (555) 000-0000"
          required
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="mb-2 block font-sans text-xs uppercase tracking-widest"
        >
          Shipping Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="block w-full border-0 border-b border-[--border] bg-transparent px-0 py-2 font-sans text-sm focus:border-[--text] focus:ring-0"
          placeholder="123 Shoe Street, NY 10001"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-sans text-xs uppercase tracking-widest">
          Credit Card Details
        </label>
        <div id="card-element" className="border-b border-[--border] pb-3 pt-1">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#0e0e0e",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  "::placeholder": { color: "#6b6760" },
                },
                invalid: { color: "#b91c1c" },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div id="card-errors" className="font-sans text-xs text-rose-700">
          {error}
        </div>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
      <div className="text-center font-sans text-xs text-[--text-muted]">
        Your payment is encrypted and secure.
      </div>
    </form>
  );
}

// ── Page component ──────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, cartTotal } = useCart();
  const router = useRouter();
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const originalTotal = items.reduce(
    (sum, item) =>
      sum +
      (item.oldPrice && item.oldPrice > item.price
        ? item.oldPrice
        : item.price),
    0,
  );
  const productDiscount = Math.max(0, originalTotal - cartTotal);
  const couponDiscount = appliedCoupon === "SOLE10" ? cartTotal * 0.1 : 0;
  const finalTotal = Math.max(0, cartTotal - couponDiscount);

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0 && !checkoutCompleted) {
      router.replace("/cart");
    }
  }, [items.length, router, checkoutCompleted]);

  if (!stripePromise) {
    return (
      <section className="mx-auto w-full max-w-[1440px] px-8 py-24">
        <h1 className="font-display text-5xl italic">Secure Checkout</h1>
        <p className="mt-4 font-sans text-sm text-rose-700">
          Checkout is unavailable right now. Stripe publishable key is missing.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1440px] px-8 py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[55%_45%]">
        <div>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-3 font-display text-5xl italic">Secure Checkout</h1>
          <div className="mt-12">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              onSuccess={() => setCheckoutCompleted(true)}
              payableTotal={finalTotal}
            />
          </Elements>
          </div>
        </div>

        <div className="bg-[--bg-card] p-8 lg:sticky lg:top-24">
          <h3 className="font-display text-3xl italic">Order Summary</h3>
          {items.map((item) => (
            <div key={item.cartKey} className="mt-4 flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                sizes="56px"
                quality={70}
                className="h-12 w-12 bg-[--bg] object-cover"
              />
              <div className="min-w-0 flex-1">
                <h5 className="truncate font-sans text-xs uppercase tracking-wide text-[--text]">
                  {item.name}
                </h5>
                <p className="font-sans text-xs text-[--text-muted]">Qty: 1</p>
              </div>
              <div className="text-right">
                <div className="font-sans text-xs text-[--text]">
                  ${item.price.toFixed(2)}
                </div>
                {item.oldPrice && item.oldPrice > item.price && (
                  <div className="font-sans text-[10px] text-[--text-muted] line-through">
                    ${item.oldPrice.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="mt-6 border-b border-[--text] pb-2">
            <label
              htmlFor="coupon"
              className="font-sans text-xs uppercase tracking-widest text-[--text-muted]"
            >
              Coupon code
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="SOLE10"
                className="block w-full border-0 bg-transparent px-0 py-1 font-sans text-sm placeholder:text-[--text-muted] focus:ring-0"
              />
              <button
                type="button"
                className="font-sans text-xs uppercase tracking-widest text-[--text]"
                onClick={() => {
                  if (couponCode.trim() === "SOLE10") {
                    setAppliedCoupon("SOLE10");
                    setCouponError("");
                  } else {
                    setAppliedCoupon("");
                    setCouponError("Invalid coupon code");
                  }
                }}
              >
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <p className="mt-2 font-sans text-xs text-emerald-700">
                Coupon applied: {appliedCoupon}
              </p>
            )}
            {couponError && !appliedCoupon && (
              <p className="mt-2 font-sans text-xs text-rose-700">
                {couponError}
              </p>
            )}
          </div>

          <div className="mt-6 space-y-3 font-sans text-xs uppercase tracking-widest text-[--text-muted]">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="text-[--text]">${originalTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Product discount</span>
              <span className="text-[--text]">
                -${productDiscount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Coupon discount</span>
              <span className="text-[--text]">
                -${couponDiscount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-[--border] pt-5">
            <span>Total</span>
            <span className="font-display text-3xl italic">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

