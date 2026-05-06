"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
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

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-secondary/10 bg-cream/82 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <a
          href="#home"
          className="display-heading text-xl font-semibold text-foreground md:text-2xl"
          onClick={() => setIsOpen(false)}
        >
          Ahmad Qeis Ismail
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeId === id;

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

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-secondary/20 text-foreground lg:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-secondary/10 bg-cream/96 transition-[grid-template-rows] duration-300 lg:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div className="section-shell flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-3 text-sm text-muted transition hover:bg-soft hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
