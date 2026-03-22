"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-store";
import Badge from "@/components/ui/Badge";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasDiscount =
    typeof product.oldPrice === "number" && product.oldPrice > product.price;
  const discountAmount = hasDiscount ? product.oldPrice! - product.price : 0;
  const secondaryImage = product.hoverImage ?? product.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden bg-[--bg-card]">
        {product.badge && (
          <Badge className="absolute left-3 top-3 z-20">{product.badge}</Badge>
        )}
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          quality={75}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        {secondaryImage && secondaryImage !== product.image && (
          <Image
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            width={400}
            height={400}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            quality={75}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        )}
        <Link
          href={`/product/${product.id}`}
          className="absolute inset-0 z-30"
          aria-label={`View ${product.name}`}
        >
          <span className="sr-only">View Details</span>
        </Link>
      </div>

      <div className="pt-3">
        <h3 className="font-sans text-sm uppercase tracking-wide text-[--text]">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center">
          <span className="font-sans text-sm font-medium text-[--text]">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="ml-2 font-sans text-xs text-[--text-muted] line-through">
              ${product.oldPrice!.toFixed(2)}
            </span>
          )}
        </div>
        {hasDiscount && (
          <div className="mt-2">
            <Badge>SAVE ${discountAmount.toFixed(0)}</Badge>
          </div>
        )}
        <button
          className="mt-4 inline-flex h-8 items-center border border-[--border] px-4 font-sans text-[10px] uppercase tracking-widest text-[--text] transition duration-200 hover:border-[--text] hover:bg-[--text] hover:text-[--bg] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--text]"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
