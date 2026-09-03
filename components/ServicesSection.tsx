"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useRef } from "react";
import { services } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer, viewportRepeat } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

function ServicesParallaxLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: ref as React.RefObject<HTMLElement | null> });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute -right-16 top-[15%] hidden h-64 w-64 rounded-full border border-primary/12 will-change-transform transform-gpu lg:block"
        style={{ y: p.far, rotate: p.slowRotate, opacity: p.fadeInOut }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-12 bottom-[18%] hidden h-48 w-48 rounded-full border border-secondary/14 bg-primary/4 will-change-transform transform-gpu md:block"
        style={{ y: p.midFar, x: p.midX, rotate: p.reverseRotate }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[18%] top-[8%] h-12 w-12 rounded-full bg-primary/26 blur-sm will-change-transform transform-gpu"
        style={{ y: p.foreground, x: p.nearX }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[42%] bottom-[8%] hidden h-20 w-20 rounded-[12px] border border-primary/16 will-change-transform transform-gpu md:block"
        style={{ y: p.near, rotate: p.fastRotate, opacity: p.pulseOpacity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[8%] top-[30%] hidden h-16 w-16 rounded-full border border-secondary/12 bg-cream/20 will-change-transform transform-gpu lg:block"
        style={{ y: p.mid, rotate: p.slowRotate, scale: p.breatheScale }}
      />
    </div>
  );
}

function ServicesContent() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: ref as React.RefObject<HTMLElement | null> });

  return (
    <div ref={ref} className="section-shell">
      <motion.div
        style={{ y: p.near }}
        className="will-change-transform transform-gpu"
      >
        <SectionHeading
          eyebrow="Services"
          title="Rate Card for Focused Web Work"
          description="Simple service packages for polished websites, backend foundations, and database planning. Prices are placeholders and can be adjusted by scope."
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
      >
        {services.map((service, idx) => {
          const cardY = [p.near, p.foreground, p.mid, p.near, p.foreground][idx % 5];

          return (
            <motion.article
              key={service.name}
              variants={fadeInUp}
              whileHover={cardHover}
              className="flex min-h-[360px] flex-col rounded-[8px] border border-secondary/14 bg-cream p-6 shadow-[0_18px_46px_rgba(75,46,43,0.06)] will-change-transform transform-gpu"
              style={{ y: cardY }}
            >
              <h3 className="display-heading text-2xl font-semibold leading-tight text-foreground">
                {service.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted">
                {service.description}
              </p>
              <p className="mt-5 text-sm font-semibold text-primary">
                {service.price}
              </p>

              <div className="my-6 h-px bg-secondary/12" />

              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-muted">
                    <Check
                      className="mt-1 shrink-0 text-primary"
                      size={15}
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-auto inline-flex items-center justify-between gap-3 rounded-full border border-secondary/20 px-4 py-3 text-sm font-medium text-foreground transition duration-300 hover:border-primary hover:bg-soft"
              >
                Contact for Project
                <ArrowUpRight size={16} />
              </a>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <MotionSection
      id="services"
      className="border-b border-secondary/10 bg-soft/35"
      parallaxVariant="warm"
    >
      <ServicesParallaxLayer />
      <div className="relative z-10 w-full">
        <ServicesContent />
      </div>
    </MotionSection>
  );
}
