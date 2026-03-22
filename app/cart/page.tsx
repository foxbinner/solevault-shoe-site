"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";

export default function CartPage() {
  const { items, cartTotal, removeFromCart, addToCart } = useCart();

  const groupedItems = Object.values(
    items.reduce(
      (acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = { product: item, cartKeys: [] as string[] };
        }
        acc[item.id].cartKeys.push(item.cartKey);
        return acc;
      },
      {} as Record<
        number,
        { product: (typeof items)[number]; cartKeys: string[] }
      >,
    ),
  );

  const originalTotal = items.reduce(
    (sum, item) =>
      sum +
      (item.oldPrice && item.oldPrice > item.price
        ? item.oldPrice
        : item.price),
    0,
  );
  const productDiscount = Math.max(0, originalTotal - cartTotal);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-8 py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[60%_40%]">
        <div>
          <SectionLabel>Checkout Flow</SectionLabel>
          <h1 className="mt-3 font-display text-5xl italic">Cart</h1>
          <div className="mt-12 space-y-3">
          {items.length === 0 ? (
            <div className="border border-[--border] bg-[--bg-card] px-8 py-16 text-center">
              <h3 className="font-display text-3xl italic text-[--text]">
                Your cart is empty
              </h3>
              <p className="mt-3 font-sans text-sm text-[--text-muted]">
                Looks like you haven&apos;t added anything yet.
              </p>
              <Button href="/" className="mt-8">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {groupedItems.map(({ product, cartKeys }) => {
                const qty = cartKeys.length;
                const unitOldPrice =
                  product.oldPrice && product.oldPrice > product.price
                    ? product.oldPrice
                    : null;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, x: 24, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-[--border] pb-4 pt-2"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 bg-[--bg-card]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="96px"
                          quality={70}
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-sans text-sm uppercase tracking-wide text-[--text]">
                          {product.name}
                        </h4>
                        <div className="mt-2 flex items-end gap-2">
                          <span className="font-sans text-sm text-[--text]">
                            ${(product.price * qty).toFixed(2)}
                          </span>
                          {unitOldPrice && (
                            <span className="font-sans text-xs text-[--text-muted] line-through">
                              ${(unitOldPrice * qty).toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className="mt-3 flex items-center gap-4 font-sans text-sm">
                          <button
                            onClick={() =>
                              removeFromCart(cartKeys[cartKeys.length - 1])
                            }
                            className="text-[--text] transition hover:text-[--accent]"
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            −
                          </button>
                          <span>{qty}</span>
                          <button
                            onClick={() => addToCart(product)}
                            className="text-[--text] transition hover:text-[--accent]"
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="mt-3 font-sans text-xs text-[--text-muted] transition hover:text-[--accent]"
                          onClick={() =>
                            cartKeys.forEach((key) => removeFromCart(key))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          </div>
        </div>

        {items.length > 0 && (
          <aside className="bg-[--bg-card] p-8 lg:sticky lg:top-24">
            <h3 className="font-display text-3xl italic">Order Summary</h3>
            <div className="mt-8 space-y-4 font-sans text-xs uppercase tracking-widest text-[--text-muted]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="text-[--text]">
                  ${originalTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span className="text-[--text]">
                  -${productDiscount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span>Total</span>
              <span className="font-display text-3xl italic">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <Button
              href="/checkout"
              variant="primary"
              size="lg"
              fullWidth
              className="mt-8"
            >
              Proceed to Checkout
            </Button>
          </aside>
        )}
      </div>
    </section>
  );
}
