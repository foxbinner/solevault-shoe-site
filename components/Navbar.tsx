"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`sticky top-0 z-40 h-16 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[--border] bg-[--bg]/90 backdrop-blur-md"
          : "border-b border-[--border] bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="font-display text-xl uppercase tracking-[0.25em] text-[--text]"
        >
          SOLEVAULT
        </Link>

        <button
          className="inline-flex items-center p-2 text-[--text] lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          )}
        </button>

        <ul
          className={`absolute left-0 top-16 w-full border-b border-[--border] bg-[--bg] px-5 py-4 shadow-card lg:static lg:flex lg:w-auto lg:items-center lg:gap-10 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none ${
            menuOpen ? "block" : "hidden lg:flex"
          }`}
        >
          <li>
            <Link
              href="/#products-section"
              className="block py-1 font-sans text-xs uppercase tracking-widest text-[--text] transition hover:text-[--accent]"
              onClick={() => setMenuOpen(false)}
            >
              Collection
            </Link>
          </li>
          <li>
            <Link
              href="/#materials"
              className="block py-1 font-sans text-xs uppercase tracking-widest text-[--text] transition hover:text-[--accent]"
              onClick={() => setMenuOpen(false)}
            >
              Materials
            </Link>
          </li>
          <li>
            <Link
              href="/#editorial"
              className="block py-1 font-sans text-xs uppercase tracking-widest text-[--text] transition hover:text-[--accent]"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="border-t border-[--border] pt-3 lg:border-0 lg:pt-0">
            <button className="py-1 font-sans text-xs uppercase tracking-widest text-[--text] transition hover:text-[--accent]">
              Search
            </button>
          </li>
          <li>
            <Link
              href="/cart"
              className={`block py-1 font-sans text-xs uppercase tracking-widest transition hover:text-[--accent] ${
                pathname === "/cart" ? "text-[--accent]" : "text-[--text]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              CART ({cartCount})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
