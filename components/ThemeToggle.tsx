"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useRef, useState } from "react";
import { smoothEase } from "@/lib/motion";

type ThemeName = "coffee" | "dark-coffee";

type RevealState = {
  id: number;
  x: number;
  y: number;
  radius: number;
  background: string;
  accent: string;
};

const STORAGE_KEY = "portfolio-theme";

const themes: Record<
  ThemeName,
  {
    background: string;
    accent: string;
  }
> = {
  coffee: {
    background: "#fff8f0",
    accent: "rgba(192, 133, 82, 0.24)",
  },
  "dark-coffee": {
    background: "#1e1412",
    accent: "rgba(217, 154, 95, 0.28)",
  },
};

function getNextTheme(theme: ThemeName): ThemeName {
  return theme === "coffee" ? "dark-coffee" : "coffee";
}

export function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [reveal, setReveal] = useState<RevealState | null>(null);

  const handleToggleTheme = () => {
    const currentTheme =
      document.documentElement.dataset.theme === "dark-coffee"
        ? "dark-coffee"
        : "coffee";
    const nextTheme = getNextTheme(currentTheme);
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    const originX = buttonRect ? buttonRect.left + buttonRect.width / 2 : 0;
    const originY = buttonRect ? buttonRect.top + buttonRect.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    const revealId = Date.now();
    const nextThemeMeta = themes[nextTheme];

    setReveal({
      id: revealId,
      x: originX,
      y: originY,
      radius: radius + 80,
      background: nextThemeMeta.background,
      accent: nextThemeMeta.accent,
    });

    window.setTimeout(() => {
      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    }, 360);

    window.setTimeout(() => {
      setReveal((currentReveal) =>
        currentReveal?.id === revealId ? null : currentReveal
      );
    }, 820);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Toggle color theme"
        className="fixed right-3 top-1/2 z-[80] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/18 bg-cream/72 text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/35 hover:bg-cream/92 md:right-4"
        disabled={Boolean(reveal)}
        onClick={handleToggleTheme}
      >
        <Moon className="theme-toggle-moon absolute" size={17} />
        <Sun className="theme-toggle-sun absolute" size={17} />
      </button>

      <AnimatePresence>
        {reveal && (
          <motion.div
            key={reveal.id}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
            initial={{
              opacity: 1,
              clipPath: `circle(0px at ${reveal.x}px ${reveal.y}px)`,
            }}
            animate={{
              opacity: 1,
              clipPath: `circle(${reveal.radius}px at ${reveal.x}px ${reveal.y}px)`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: smoothEase }}
            style={{
              background: `
                radial-gradient(circle at ${reveal.x}px ${reveal.y}px, ${reveal.accent}, transparent 34%),
                conic-gradient(from 38deg at ${reveal.x}px ${reveal.y}px, ${reveal.background}, ${reveal.accent}, ${reveal.background}, ${reveal.background})
              `,
            }}
          >
            <motion.div
              className="absolute inset-[-18%]"
              animate={{ rotate: 28 }}
              transition={{ duration: 0.62, ease: smoothEase }}
              style={{
                background: `
                  radial-gradient(circle at ${reveal.x}px ${reveal.y}px, transparent 0 18%, ${reveal.accent} 22%, transparent 42%),
                  ${reveal.background}
                `,
                opacity: 0.92,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
