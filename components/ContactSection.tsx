"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { contactLinks } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

const inputClass =
  "w-full rounded-[8px] border border-secondary/16 bg-cream px-4 py-3 text-sm text-foreground placeholder:text-secondary/55 transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10";

export function ContactSection() {
  return (
    <MotionSection id="contact" className="border-b border-secondary/10">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Useful"
          description="Reach out for portfolio websites, landing pages, backend API work, CRUD apps, database design, or collaboration opportunities."
        />

        <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr]">
          <motion.form
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="elegant-card rounded-[8px] p-6 md:p-8"
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
                <input className={inputClass} placeholder="you@example.com" type="email" />
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
            viewport={viewportOnce}
            className="space-y-4"
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
                    <span className="mt-1 block truncate text-sm text-secondary">
                      {link.value}
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
