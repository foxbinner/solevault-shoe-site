"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-store";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Divider from "@/components/ui/Divider";
import SectionLabel from "@/components/ui/SectionLabel";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeSize, setActiveSize] = useState("9");
  const [openPanel, setOpenPanel] = useState<string | null>("Details");
  const hasDiscount =
    typeof product.oldPrice === "number" && product.oldPrice > product.price;
  const similarProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const gallery = [
    product.image,
    product.hoverImage ?? product.image,
  ];

  const accordion: Record<string, string> = {
    Details:
      "Engineered shape and balanced cushioning for all-day wear. Built with a lightweight inner frame that keeps structure without stiffness.",
    Materials:
      "Vegetable-tanned leather upper, natural cork insole, and reclaimed rubber outsole. Each material is selected for durability and low-impact sourcing.",
    Shipping:
      "Orders ship within 1-2 business days. Free domestic shipping over $150 and free returns within 30 days.",
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-8 py-24">
      <div className="grid gap-12 lg:grid-cols-[55%_45%]">
        <div>
          <div className="relative aspect-square bg-[--bg-card]">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              quality={82}
              className="object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {gallery.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                className={`relative aspect-square bg-[--bg-card] ${activeImage === img ? "border border-[--text]" : "border border-[--border]"}`}
                onClick={() => setActiveImage(img)}
                aria-label={`Select image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="(min-width: 1024px) 27vw, 50vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          {hasDiscount && <Badge>SALE</Badge>}
          <h1 className="mt-4 font-display text-4xl italic">{product.name}</h1>
          <div className="mt-5 flex items-end gap-3">
            <span className="font-sans text-3xl text-[--text]">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="font-sans text-sm text-[--text-muted] line-through">
                ${product.oldPrice!.toFixed(2)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-3 font-sans text-sm leading-relaxed text-[--text-muted]">
              {product.description}
            </p>
          )}

          <Divider className="my-8" />

          <SectionLabel className="mb-4">Select Size</SectionLabel>
          <div className="grid grid-cols-5 gap-2">
            {["6", "7", "8", "9", "10"].map((size) => (
              <button
                key={size}
                className={`h-11 border font-sans text-sm uppercase tracking-widest transition ${
                  activeSize === size
                    ? "border-[--text] bg-[--text] text-[--bg]"
                    : "border-[--border] text-[--text] hover:border-[--text]"
                }`}
                onClick={() => setActiveSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-8"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>

          <div className="mt-10 border-t border-[--border]">
            {Object.entries(accordion).map(([title, content]) => {
              const isOpen = openPanel === title;
              return (
                <div key={title} className="border-b border-[--border] py-4">
                  <button
                    className="flex w-full items-center justify-between font-sans text-xs uppercase tracking-widest"
                    onClick={() => setOpenPanel(isOpen ? null : title)}
                  >
                    <span>{title}</span>
                    <span>{isOpen ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 font-sans text-sm leading-relaxed text-[--text-muted]">
                          {content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[--text-muted] transition hover:text-[--accent]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 3L5 8l5 5" />
            </svg>
            Back to Shop
          </Link>
        </div>
      </div>

      <section className="mt-24">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>You May Also Like</SectionLabel>
            <h2 className="mt-3 font-display text-4xl italic">
              More from SoleVault
            </h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {similarProducts.map((similar, i) => (
            <ProductCard key={similar.id} product={similar} index={i} />
          ))}
        </div>
      </section>
    </section>
  );
}
