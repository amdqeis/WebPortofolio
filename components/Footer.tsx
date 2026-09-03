"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { contactLinks, profile } from "@/lib/data";
import { useParallax } from "@/lib/useParallax";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const p = useParallax({ target: ref });

  return (
    <footer
      ref={ref}
      className="scroll-mt-24 snap-start relative overflow-hidden bg-soft/50 py-12"
    >
      {/* Parallax decorative elements */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-8 h-48 w-48 rounded-full border border-primary/10 will-change-transform transform-gpu"
        style={{ y: p.far, rotate: p.slowRotate, opacity: p.fadeInOut }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 left-[10%] h-36 w-36 rounded-full border border-secondary/12 will-change-transform transform-gpu"
        style={{ y: p.midFar, rotate: p.reverseRotate }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[50%] top-[20%] h-8 w-8 rounded-full bg-primary/22 blur-sm will-change-transform transform-gpu"
        style={{ y: p.foreground, x: p.nearX }}
      />

      <div className="section-shell relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <a
          href="#home"
          className="display-heading text-2xl font-semibold text-foreground"
        >
          {profile.name}
        </a>
        <div className="flex flex-wrap gap-5 text-sm text-muted">
          {contactLinks.slice(1, 4).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-muted">
           2026 Ahmad Qeis Ismail. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
