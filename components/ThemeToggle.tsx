"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type ThemeName = "coffee" | "dark-coffee";

const STORAGE_KEY = "portfolio-theme";

function getNextTheme(theme: ThemeName): ThemeName {
  return theme === "coffee" ? "dark-coffee" : "coffee";
}

export function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [switching, setSwitching] = useState(false);

  const applyTheme = useCallback((theme: ThemeName) => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage unavailable — visual theme still works.
    }
  }, []);

  const handleToggleTheme = useCallback(() => {
    if (switching) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const currentTheme =
      document.documentElement.dataset.theme === "dark-coffee"
        ? "dark-coffee"
        : "coffee";
    const nextTheme = getNextTheme(currentTheme);

    // Skip animation if user prefers reduced motion or API unavailable
    if (
      prefersReduced ||
      !document.startViewTransition
    ) {
      applyTheme(nextTheme);
      return;
    }

    setSwitching(true);

    // ----- Calculate circle geometry from button center -----
    const rect = buttonRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // Max distance to any corner → the circle radius that covers the viewport
    const maxDist = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );
    const endRadius = Math.ceil(maxDist * 1.1);

    // ----- View Transition: screenshot old → clip-reveal new -----
    const transition = document.startViewTransition(() => {
      applyTheme(nextTheme);
    });

    transition.ready.then(() => {
      // Animate the NEW pseudo-element with a hard-edge clip-path circle
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${cx}px ${cy}px)`,
            `circle(${endRadius}px at ${cx}px ${cy}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    transition.finished.then(() => {
      setSwitching(false);
    });
  }, [switching, applyTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Switch color theme"
      className="theme-toggle fixed right-3 top-1/2 z-[100] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/18 bg-cream/72 text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/35 hover:bg-cream/92 disabled:cursor-wait md:right-4"
      data-switching={switching ? "true" : "false"}
      disabled={switching}
      onClick={handleToggleTheme}
    >
      <span aria-hidden="true" className="theme-toggle-orbit" />
      <Moon className="theme-toggle-moon absolute" size={17} />
      <Sun className="theme-toggle-sun absolute" size={17} />
    </button>
  );
}
