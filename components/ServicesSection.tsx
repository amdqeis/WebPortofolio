"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer, viewportRepeat } from "@/lib/motion";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

export function ServicesSection() {
  return (
    <MotionSection id="services" className="border-b border-secondary/10 bg-soft/35">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="Rate Card for Focused Web Work"
          description="Simple service packages for polished websites, backend foundations, and database planning. Prices are placeholders and can be adjusted by scope."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        >
          {services.map((service) => (
            <motion.article
              key={service.name}
              variants={fadeInUp}
              whileHover={cardHover}
              className="flex min-h-[360px] flex-col rounded-[8px] border border-secondary/14 bg-cream p-6 shadow-[0_18px_46px_rgba(75,46,43,0.06)]"
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
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
