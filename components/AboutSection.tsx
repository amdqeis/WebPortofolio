"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { aboutHighlights } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

/**
 * Extra parallax decorative layer  uses its own ref tied to the wrapping
 * div so scroll progress is always correct regardless of section position.
 */
function AboutParallaxLayer() {
  const layerRef = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: layerRef as React.RefObject<HTMLElement | null> });

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute right-[4%] top-[12%] hidden h-48 w-48 rounded-full border border-primary/14 will-change-transform transform-gpu lg:block"
        style={{ y: p.far, rotate: p.slowRotate, opacity: p.fadeInOut }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[10%] left-[2%] hidden h-32 w-32 rounded-[12px] border border-secondary/16 bg-primary/5 will-change-transform transform-gpu md:block"
        style={{
          y: p.midFar,
          x: p.midX,
          rotate: p.reverseRotate,
          opacity: p.pulseOpacity,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[40%] top-[6%] h-10 w-10 rounded-full bg-primary/28 blur-sm will-change-transform transform-gpu"
        style={{ y: p.foreground, x: p.nearX }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[22%] bottom-[16%] hidden h-24 w-24 rounded-full border border-primary/10 will-change-transform transform-gpu md:block"
        style={{ y: p.mid, rotate: p.slowRotate, scale: p.breatheScale }}
      />
    </div>
  );
}

function AboutContentLayer() {
  const contentRef = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: contentRef as React.RefObject<HTMLElement | null> });

  return (
    <div ref={contentRef} className="section-shell grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
      <motion.div
        style={{ y: p.near }}
        className="will-change-transform transform-gpu"
      >
        <SectionHeading eyebrow="Introduction" title="About Me" />
      </motion.div>

      <div>
        <motion.div variants={staggerContainer} className="space-y-5">
          <motion.p variants={fadeInUp} className="text-base leading-8 text-muted">
            With a strong interest in web development and backend development,
            I enjoy building systems that are practical, readable, and useful.
            I like connecting clean interfaces with reliable data flow so every
            feature feels simple for the user and maintainable behind the
            scenes.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-base leading-8 text-muted">
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
          {aboutHighlights.map((item, idx) => {
            const Icon = item.icon;
            const cardY = [p.near, p.mid, p.foreground, p.near][idx % 4];

            return (
              <motion.article
                key={item.title}
                variants={fadeInUp}
                whileHover={cardHover}
                className="elegant-card rounded-[8px] p-5 will-change-transform transform-gpu"
                style={{ y: cardY }}
              >
                <Icon className="mb-5 text-primary" size={22} strokeWidth={1.8} />
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <MotionSection
      id="about"
      className="border-b border-secondary/10"
      parallaxVariant="warm"
    >
      <AboutParallaxLayer />
      <div className="relative z-10 w-full">
        <AboutContentLayer />
      </div>
    </MotionSection>
  );
}
