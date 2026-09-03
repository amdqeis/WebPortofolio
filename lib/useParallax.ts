"use client";

import {
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type RefObject } from "react";
import { useMediaQuery } from "./useMediaQuery";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyScrollOffset = any;

type UseParallaxOptions = {
  target: RefObject<HTMLElement | null>;
  offset?: AnyScrollOffset;
};

/**
 * Central parallax hook: produces multiple motion values tied to the
 * section's scroll progress. Respects reduced-motion preferences and
 * automatically halves intensity on compact viewports.
 *
 * When shouldReduceMotion is true, multiplier becomes 0 so all values
 * remain locked to 0/1 identity transforms.
 */
export function useParallax({ target, offset }: UseParallaxOptions) {
  const shouldReduceMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 767px)");
  const intensity = isCompact ? 0.45 : 1;
  const m = shouldReduceMotion ? 0 : intensity;

  const { scrollYProgress } = useScroll({
    target,
    offset: offset ?? ["start end", "end start"],
  });

  // vertical layers: far (slowest) -> foreground (fastest)
  const far = useTransform(scrollYProgress, [0, 1], [-96 * m, 96 * m]);
  const midFar = useTransform(scrollYProgress, [0, 1], [72 * m, -72 * m]);
  const mid = useTransform(scrollYProgress, [0, 1], [-48 * m, 48 * m]);
  const near = useTransform(scrollYProgress, [0, 1], [34 * m, -34 * m]);
  const foreground = useTransform(scrollYProgress, [0, 1], [-22 * m, 22 * m]);

  // horizontal drift
  const farX = useTransform(scrollYProgress, [0, 1], [-38 * m, 38 * m]);
  const nearX = useTransform(scrollYProgress, [0, 1], [22 * m, -22 * m]);
  const midX = useTransform(scrollYProgress, [0, 1], [-16 * m, 16 * m]);

  // rotation
  const slowRotate = useTransform(scrollYProgress, [0, 1], [0, 18 * m]);
  const reverseRotate = useTransform(scrollYProgress, [0, 1], [0, -12 * m]);
  const fastRotate = useTransform(scrollYProgress, [0, 1], [0, 32 * m]);

  // scale
  const breatheScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.92, 1.08, 0.95]
  );
  const subtleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.97, 1.03, 0.99]
  );

  // opacity
  const fadeInOut = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.15, 0.85, 0.85, 0.15]
  );
  const pulseOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.3, 1, 0.3]
  );

  return {
    disabled: Boolean(shouldReduceMotion),
    far,
    midFar,
    mid,
    near,
    foreground,
    farX,
    nearX,
    midX,
    slowRotate,
    reverseRotate,
    fastRotate,
    breatheScale,
    subtleScale,
    fadeInOut,
    pulseOpacity,
    scrollYProgress,
  };
}
