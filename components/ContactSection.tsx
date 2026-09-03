"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useRef } from "react";
import { contactLinks } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer, viewportRepeat } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

const inputClass =
  "w-full rounded-[8px] border border-secondary/16 bg-cream px-4 py-3 text-sm text-foreground placeholder:text-muted/55 transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10";

function ContactParallaxLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: ref as React.RefObject<HTMLElement | null> });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute right-[4%] top-[8%] hidden h-60 w-60 rounded-full border-2 border-primary/10 will-change-transform transform-gpu lg:block"
        style={{ y: p.far, rotate: p.slowRotate, scale: p.breatheScale }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-10 top-[32%] hidden h-44 w-44 rounded-full border border-secondary/14 bg-soft/20 will-change-transform transform-gpu md:block"
        style={{ y: p.midFar, x: p.midX, rotate: p.reverseRotate }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[34%] top-[4%] h-10 w-10 rounded-full bg-primary/26 blur-sm will-change-transform transform-gpu"
        style={{ y: p.foreground, x: p.nearX }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[12%] right-[16%] hidden h-20 w-20 rounded-[12px] border border-primary/16 will-change-transform transform-gpu md:block"
        style={{ y: p.near, rotate: p.fastRotate, opacity: p.pulseOpacity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[28%] left-[20%] hidden h-12 w-12 rounded-full border border-secondary/20 bg-cream/40 will-change-transform transform-gpu lg:block"
        style={{ y: p.mid, x: p.farX, rotate: p.reverseRotate }}
      />
    </div>
  );
}

function ContactContent() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: ref as React.RefObject<HTMLElement | null> });

  return (
    <div ref={ref} className="section-shell">
      <motion.div
        style={{ y: p.near }}
        className="will-change-transform transform-gpu"
      >
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Useful"
          description="Reach out for portfolio websites, landing pages, backend API work, CRUD apps, database design, or collaboration opportunities."
        />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr]">
        <motion.form
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="elegant-card rounded-[8px] p-6 md:p-8 will-change-transform transform-gpu"
          style={{ y: p.mid }}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <motion.label variants={fadeInUp} className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                Name
              </span>
              <input className={inputClass} placeholder="Your name" type="text" />
            </motion.label>
            <motion.label variants={fadeInUp} className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                Email
              </span>
              <input
                className={inputClass}
                placeholder="you@example.com"
                type="email"
              />
            </motion.label>
          </div>

          <motion.label variants={fadeInUp} className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              Subject
            </span>
            <input className={inputClass} placeholder="Project inquiry" type="text" />
          </motion.label>

          <motion.label variants={fadeInUp} className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              Message
            </span>
            <textarea
              className={`${inputClass} min-h-40 resize-none`}
              placeholder="Tell me about your project, goals, timeline, or idea."
            />
          </motion.label>

          <motion.button
            variants={fadeInUp}
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white shadow-[0_14px_34px_rgba(192,133,82,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-secondary"
          >
            Send Message
            <Send size={16} />
          </motion.button>
        </motion.form>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="space-y-4 will-change-transform transform-gpu"
          style={{ y: p.near }}
        >
          {contactLinks.map((link) => {
            const Icon = link.icon;

            return (
              <motion.a
                key={link.label}
                href={link.href}
                variants={fadeInUp}
                whileHover={cardHover}
                className="flex items-center gap-4 rounded-[8px] border border-secondary/14 bg-soft/50 p-5 transition duration-300 hover:bg-cream"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {link.label}
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted">
                    {link.value}
                  </span>
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <MotionSection
      id="contact"
      className="border-b border-secondary/10"
      parallaxVariant="warm"
    >
      <ContactParallaxLayer />
      <div className="relative z-10 w-full">
        <ContactContent />
      </div>
    </MotionSection>
  );
}
