"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  type HTMLMotionProps,
  type TargetAndTransition,
} from "framer-motion";
import * as React from "react";

type UseIsInViewOptions = {
  inView?: boolean;
  inViewMargin?: string;
  inViewOnce?: boolean;
};

function segmentGraphemes(text: string): string[] {
  if (typeof Intl.Segmenter === "function") {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  }

  return Array.from(text);
}

type MorphingTextProps = Omit<HTMLMotionProps<"span">, "children"> & {
  delay?: number;
  loop?: boolean;
  holdDelay?: number;
  text: string | string[];
} & UseIsInViewOptions;

function MorphingText({
  text,
  initial = { opacity: 0, y: 5, scale: 0.96, filter: "blur(4px)" },
  animate = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit = { opacity: 0, y: -5, scale: 0.96, filter: "blur(4px)" },
  transition = { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  delay = 0,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  loop = false,
  holdDelay = 2500,
  ...props
}: MorphingTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  const isElementInView = useInView(localRef, {
    margin: inViewMargin as `${number}px`,
    once: inViewOnce,
  });
  const shouldRun = inView ? isElementInView : true;
  const uniqueId = React.useId();

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  const currentText = React.useMemo(() => {
    if (Array.isArray(text)) return text[currentIndex] ?? text[0] ?? "";
    return text;
  }, [currentIndex, text]);

  const chars = React.useMemo(() => {
    const graphemes = segmentGraphemes(currentText);

    return graphemes.map((raw, index) => {
      const key = raw.normalize("NFC");

      return {
        key: `${currentIndex}-${index}-${key}`,
        label: key === " " ? "\u00A0" : key,
      };
    });
  }, [currentIndex, currentText]);

  React.useEffect(() => {
    if (!shouldRun) return;

    const timeoutId = window.setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, shouldRun]);

  React.useEffect(() => {
    if (!started || !Array.isArray(text) || text.length < 2) return;

    let nextIndex = currentIndex;
    const interval = window.setInterval(() => {
      nextIndex += 1;

      if (nextIndex >= text.length) {
        if (!loop) {
          window.clearInterval(interval);
          return;
        }

        nextIndex = 0;
      }

      setCurrentIndex(nextIndex);
    }, holdDelay);

    return () => window.clearInterval(interval);
  }, [currentIndex, holdDelay, loop, started, text]);

  const initialState = initial as TargetAndTransition;
  const visibleState = animate as TargetAndTransition;
  const hiddenState = exit as TargetAndTransition;

  return (
    <motion.span ref={localRef} aria-label={currentText} {...props}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${uniqueId}-${currentIndex}`}
          aria-hidden="true"
          className="inline-block whitespace-nowrap"
          initial="hidden"
          animate={started ? "visible" : "hidden"}
          exit="hidden"
          variants={{
            hidden: {
              transition: {
                staggerChildren: 0.012,
                staggerDirection: -1,
              },
            },
            visible: {
              transition: {
                staggerChildren: 0.018,
              },
            },
          }}
        >
          {chars.map((char) => (
            <motion.span
              key={char.key}
              variants={{
                hidden: hiddenState,
                visible: visibleState,
              }}
              initial={initialState}
              transition={transition}
              style={{
                display: "inline-block",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity, filter",
              }}
            >
              {char.label}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

export { MorphingText, type MorphingTextProps };
