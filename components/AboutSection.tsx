"use client";

import { motion } from "framer-motion";
import { aboutHighlights } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/motion";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <MotionSection id="about" className="border-b border-secondary/10">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
        <SectionHeading eyebrow="Introduction" title="About Me" />

        <div>
          <motion.div variants={staggerContainer} className="space-y-5">
            <motion.p variants={fadeInUp} className="text-base leading-8 text-secondary">
              With a strong interest in web development and backend development,
              I enjoy building systems that are practical, readable, and useful.
              I like connecting clean interfaces with reliable data flow so every
              feature feels simple for the user and maintainable behind the
              scenes.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base leading-8 text-secondary">
              My focus includes backend development, database design, REST API
              structure, authentication, and responsive UI. Outside of code,
              photography keeps me close to composition, light, and visual
              storytelling.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {aboutHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={cardHover}
                  className="elegant-card rounded-[8px] p-5"
                >
                  <Icon className="mb-5 text-primary" size={22} strokeWidth={1.8} />
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-secondary">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
