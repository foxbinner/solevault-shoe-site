"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 768px)");
    const updateMedia = () => setIsDesktop(media.matches);
    updateMedia();

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const cursor = document.createElement("div");
    cursor.style.position = "fixed";
    cursor.style.left = "0";
    cursor.style.top = "0";
    cursor.style.width = "8px";
    cursor.style.height = "8px";
    cursor.style.borderRadius = "9999px";
    cursor.style.background = "var(--text)";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";
    cursor.style.transform = "translate3d(-9999px,-9999px,0)";
    cursor.style.transition =
      "width 200ms ease, height 200ms ease, background 200ms ease";

    const setColorFromBackground = () => {
      const element = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!element) {
        cursor.style.background = "var(--text)";
        return;
      }

      const bgColor = getEffectiveBackgroundColor(element);
      const isDark = isBackgroundDark(bgColor);
      cursor.style.background = isDark ? "var(--white)" : "var(--text)";
    };

    const tick = () => {
      cursor.style.transform = `translate3d(${x - cursor.offsetWidth / 2}px, ${y - cursor.offsetHeight / 2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      setColorFromBackground();
    };

    const onHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, .cursor-grow");

      if (interactive) {
        cursor.style.width = "16px";
        cursor.style.height = "16px";
        cursor.style.background = "var(--accent)";
      } else {
        cursor.style.width = "8px";
        cursor.style.height = "8px";
        setColorFromBackground();
      }
    };

    const onMediaChange = () => updateMedia();

    media.addEventListener("change", onMediaChange);

    if (media.matches) {
      document.body.appendChild(cursor);
      setColorFromBackground();
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseover", onHover);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      media.removeEventListener("change", onMediaChange);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHover);
      cancelAnimationFrame(raf);
      cursor.remove();
    };
  }, []);

  if (!isDesktop) return null;

  return null;
}

function getEffectiveBackgroundColor(element: HTMLElement): string {
  let current: HTMLElement | null = element;

  while (current) {
    const bgColor = window.getComputedStyle(current).backgroundColor;
    if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
      return bgColor;
    }
    current = current.parentElement;
  }

  return window.getComputedStyle(document.body).backgroundColor;
}

function isBackgroundDark(bgColor: string): boolean {
  if (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") {
    return false;
  }

  const match = bgColor.match(/\d+/g);
  if (!match || match.length < 3) return false;

  const [r, g, b] = match.slice(0, 3).map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}
