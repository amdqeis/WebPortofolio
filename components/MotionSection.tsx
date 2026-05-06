"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MotionSectionProps = HTMLMotionProps<"section"> & {
  children: ReactNode;
};

export function MotionSection({
  children,
  className,
  ...props
}: MotionSectionProps) {
  return (
    <motion.section
      className={cn("scroll-mt-24 py-20 md:py-28", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
      {...props}
    >
      {children}
    </motion.section>
  );
}
