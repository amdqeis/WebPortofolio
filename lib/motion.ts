import type { Variants } from "framer-motion";

export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const viewportRepeat = {
  once: false,
  amount: 0.08,
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: smoothEase,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.82,
      ease: smoothEase,
    },
  },
};

export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: 0.45,
    ease: smoothEase,
  },
};

export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};
