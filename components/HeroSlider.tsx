"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { bannerProducts } from "@/lib/products";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";

const bannerData = [
  {
    tag: "New Season — 2025",
    headline: "Built for the ground beneath you.",
    cta: "Shop Collection",
  },
  {
    tag: "New Season — 2025",
    headline: "Form follows motion in every step.",
    cta: "Shop Collection",
  },
  {
    tag: "New Season — 2025",
    headline: "Crafted to move through every city hour.",
    cta: "Shop Collection",
  },
  {
    tag: "New Season — 2025",
    headline: "A quieter silhouette. A stronger stride.",
    cta: "Shop Collection",
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalSlides = bannerProducts.length;
  const activeProduct = bannerProducts[current];
  const activeData = bannerData[current];

  const goTo = useCallback(
    (index: number) => {
      let i = index;
      if (i >= totalSlides) i = 0;
      if (i < 0) i = totalSlides - 1;
      setCurrent(i);
    },
    [totalSlides],
  );

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, totalSlides]);

  return (
    <section
      id="hero-slider"
      className="grain-overlay relative overflow-hidden" style={{ minHeight: "calc(100vh - 96px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-y-0 right-0 hidden w-[60%] md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeProduct.image}
              alt={activeProduct.name}
              fill
              priority
              sizes="60vw"
              quality={80}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 md:w-[40%]" />

      <div className="relative flex h-full items-center px-8 pb-24 pt-28 md:w-[40%] md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-xl"
          >
            <motion.div variants={fadeInUp} transition={{ delay: 0 }}>
              <SectionLabel>{activeData.tag}</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              transition={{ delay: 0.15 }}
              className="mt-4 font-display text-5xl italic leading-tight md:text-6xl"
            >
              {activeData.headline}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-md font-sans text-sm leading-relaxed text-[--text-muted]"
            >
              {activeProduct.description}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.45 }}
              className="mt-10"
            >
              <Button variant="outline" href={`/product/${activeProduct.id}`}>
                {activeData.cta}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-8 z-30 flex items-center gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center border border-[--border] text-[--text] transition hover:border-[--accent] hover:text-[--accent]"
          onClick={() => goTo(current - 1)}
          aria-label="Previous"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center border border-[--border] text-[--text] transition hover:border-[--accent] hover:text-[--accent]"
          onClick={() => goTo(current + 1)}
          aria-label="Next"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-8 right-8 z-30 font-sans text-xs uppercase tracking-widest text-[--text-muted]">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(totalSlides).padStart(2, "0")}
      </div>

      <div className="absolute inset-0 -z-10 md:hidden">
        <Image
          src={activeProduct.image}
          alt={activeProduct.name}
          fill
          sizes="100vw"
          quality={70}
          className="object-cover opacity-15"
        />
      </div>

      <div className="absolute inset-y-0 right-[60%] hidden w-px bg-[--border] md:block" />

      <Link
        href="#products-section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.2em] text-[--text-muted] transition hover:text-[--accent] md:block"
      >
        Scroll for Collection
      </Link>
    </section>
  );
}
