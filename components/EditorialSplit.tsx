"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export default function EditorialSplit() {
  return (
    <section id="editorial" className="scroll-mt-20 grid min-h-[600px] md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative min-h-[320px]"
      >
        <Image
          src="/images/shoe-2.jpg"
          alt="Brand story"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col justify-center bg-[--bg-card] px-8 py-20 md:px-16"
      >
        <SectionLabel>Our Philosophy</SectionLabel>
        <h2 className="mt-3 font-display text-4xl italic leading-snug md:text-5xl">
          Every pair begins with a single decision.
        </h2>
        <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-[--text-muted]">
          We source only what the earth offers willingly — vegetable-tanned
          leather, natural cork, reclaimed rubber. Nothing synthetic. Nothing
          rushed.
        </p>
        <Button variant="ghost" className="mt-10 w-fit">
          Our Process →
        </Button>
      </motion.div>
    </section>
  );
}
