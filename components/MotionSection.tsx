"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { fadeInUp, viewportRepeat } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ParallaxBackdrop } from "./ParallaxBackdrop";

type MotionSectionProps = HTMLMotionProps<"section"> & {
  children: ReactNode;
  /** Parallax visual variant forwarded to ParallaxBackdrop */
  parallaxVariant?: "default" | "warm" | "teal" | "dark";
};

export function MotionSection({
  children,
  className,
  parallaxVariant = "default",
  ...props
}: MotionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "snap-section relative isolate flex scroll-mt-24 items-center overflow-hidden py-20 md:py-28",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={viewportRepeat}
      variants={fadeInUp}
      {...props}
    >
      <ParallaxBackdrop target={sectionRef} variant={parallaxVariant} />
      <div className="relative z-10 w-full">{children}</div>
    </motion.section>
  );
}
