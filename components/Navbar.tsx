"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { navLinks, projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PortfolioSideNav } from "./PortfolioSideNav";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  useEffect(() => {
    const sectionIds = [
      ...navLinks.map((link) => link.href.replace("#", "")),
      ...projects.map((_, index) => `project-${index + 1}`),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSideNav = useCallback(() => {
    setIsSideNavOpen((value) => !value);
  }, []);
  const closeSideNav = useCallback(() => setIsSideNavOpen(false), []);
  const ToggleIcon = isSideNavOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-secondary/10 bg-cream/82 backdrop-blur-xl">
        <nav className="section-shell flex h-20 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center">
            <a
              href="#home"
              className="display-heading truncate text-xl font-semibold text-foreground md:text-2xl"
              onClick={closeSideNav}
            >
              Ahmad Qeis Ismail
            </a>
          </div>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive =
                activeId === id ||
                (id === "projects" && activeId.startsWith("project-"));

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm text-muted transition-colors duration-300 hover:text-foreground",
                    isActive && "text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300",
                      isActive && "scale-x-100",
                      "group-hover:scale-x-100"
                    )}
                  />
                </a>
              );
            })}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_10px_28px_rgba(192,133,82,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-secondary lg:inline-flex"
          >
            Hire Me
          </a>
        </nav>
      </header>

      {!isSideNavOpen && (
        <button
          type="button"
          className="fixed left-3 top-1/2 z-[80] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/18 bg-cream/72 text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/35 hover:bg-cream/92 md:left-4"
          aria-label="Open side navigation"
          aria-expanded={isSideNavOpen}
          onClick={toggleSideNav}
        >
          <ToggleIcon size={18} />
        </button>
      )}

      <PortfolioSideNav
        activeId={activeId}
        isOpen={isSideNavOpen}
        onClose={closeSideNav}
      />
      <ThemeToggle />
    </>
  );
}
