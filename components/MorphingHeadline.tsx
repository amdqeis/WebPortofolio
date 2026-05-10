"use client";

import { MorphingText } from "@/components/animate-ui/primitives/texts/morphing";

const headlineWords = [
  "Web Developer",
  "Backend Enthusiast",
  "Creative Portfolio",
  "Fullstack Learner",
];

export function MorphingHeadline() {
  return (
    <MorphingText
      text={headlineWords}
      loop
      holdDelay={2800}
      className="inline-block min-h-[1.25em] max-w-full whitespace-nowrap text-2xl font-medium leading-tight text-foreground md:text-3xl"
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
