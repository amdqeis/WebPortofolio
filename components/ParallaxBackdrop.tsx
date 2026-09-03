"use client";

import { motion } from "framer-motion";
import type { RefObject } from "react";
import { useParallax } from "@/lib/useParallax";

type ParallaxBackdropProps = {
  target: RefObject<HTMLElement | null>;
  /** Visual variant that controls which decorative shapes appear */
  variant?: "default" | "warm" | "teal" | "dark";
};

/**
 * Multi-layer parallax backdrop.
 * Each decorative element moves at a different speed/direction,
 * creating a strong sense of depth as the user scrolls.
 */
export function ParallaxBackdrop({
  target,
  variant = "default",
}: ParallaxBackdropProps) {
  const p = useParallax({ target });

  const isWarm = variant === "warm";
  const isTeal = variant === "teal";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Layer 1: large far blob (top-right) */}
      <motion.div
        className="absolute -right-32 -top-16 h-[480px] w-[480px] rounded-full will-change-transform transform-gpu"
        style={{
          y: p.far,
          x: p.farX,
          scale: p.breatheScale,
          background: isTeal
            ? "radial-gradient(circle, rgba(29,59,58,0.13) 0%, transparent 72%)"
            : isWarm
              ? "radial-gradient(circle, rgba(192,133,82,0.14) 0%, transparent 72%)"
              : "radial-gradient(circle, rgba(192,133,82,0.11) 0%, transparent 72%)",
        }}
      />

      {/* Layer 2: mid-far blob (bottom-left) */}
      <motion.div
        className="absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full will-change-transform transform-gpu"
        style={{
          y: p.midFar,
          x: p.nearX,
          scale: p.subtleScale,
          background: isTeal
            ? "radial-gradient(circle, rgba(95,159,136,0.12) 0%, transparent 70%)"
            : isWarm
              ? "radial-gradient(circle, rgba(140,90,60,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(140,90,60,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Layer 3: mid ring (upper-center) */}
      <motion.div
        className="absolute left-[18%] top-[8%] hidden h-40 w-40 rounded-full border will-change-transform transform-gpu md:block"
        style={{
          y: p.mid,
          x: p.midX,
          rotate: p.slowRotate,
          opacity: p.fadeInOut,
          borderColor: isTeal
            ? "rgba(29,59,58,0.18)"
            : "rgba(192,133,82,0.18)",
        }}
      />

      {/* Layer 4: near floating square (right-center) */}
      <motion.div
        className="absolute right-[8%] top-[28%] hidden h-24 w-24 rounded-[12px] border will-change-transform transform-gpu md:block"
        style={{
          y: p.near,
          x: p.farX,
          rotate: p.reverseRotate,
          opacity: p.pulseOpacity,
          borderColor: isTeal
            ? "rgba(95,159,136,0.22)"
            : "rgba(140,90,60,0.22)",
          backgroundColor: isTeal
            ? "rgba(29,59,58,0.06)"
            : "rgba(255,248,240,0.18)",
        }}
      />

      {/* Layer 5: foreground small dot (bottom-right) */}
      <motion.div
        className="absolute bottom-[14%] right-[22%] hidden h-12 w-12 rounded-full will-change-transform transform-gpu md:block"
        style={{
          y: p.foreground,
          rotate: p.fastRotate,
          backgroundColor: isTeal
            ? "rgba(95,159,136,0.2)"
            : "rgba(192,133,82,0.22)",
        }}
      />

      {/* Layer 6: subtle horizontal gradient band */}
      <motion.div
        className="absolute inset-x-0 top-[35%] h-[30%] will-change-transform transform-gpu"
        style={{
          y: p.mid,
          opacity: p.fadeInOut,
          background: isTeal
            ? "linear-gradient(90deg, transparent 0%, rgba(29,59,58,0.06) 50%, transparent 100%)"
            : isWarm
              ? "linear-gradient(90deg, transparent 0%, rgba(192,133,82,0.07) 50%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(192,133,82,0.05) 50%, transparent 100%)",
        }}
      />

      {/* Layer 7: large ring (far bottom-left) */}
      <motion.div
        className="absolute -bottom-16 left-[32%] hidden h-72 w-72 rounded-full border will-change-transform transform-gpu lg:block"
        style={{
          y: p.midFar,
          rotate: p.slowRotate,
          scale: p.subtleScale,
          opacity: p.fadeInOut,
          borderColor: isTeal
            ? "rgba(29,59,58,0.10)"
            : "rgba(140,90,60,0.10)",
        }}
      />

      {/* Layer 8: tiny accent dot (top-left) */}
      <motion.div
        className="absolute left-[6%] top-[18%] h-6 w-6 rounded-full will-change-transform transform-gpu"
        style={{
          y: p.far,
          x: p.nearX,
          rotate: p.fastRotate,
          opacity: p.pulseOpacity,
          backgroundColor: isTeal
            ? "rgba(95,159,136,0.4)"
            : "rgba(192,133,82,0.38)",
        }}
      />
    </div>
  );
}
