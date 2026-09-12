"use client";

import { motion } from "framer-motion";
import { Download, GraduationCap, Layers3, UserRound } from "lucide-react";
import { useRef } from "react";
import { cv, profile } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

function CVParallaxLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: ref as React.RefObject<HTMLElement | null> });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute right-[6%] top-[10%] hidden h-52 w-52 rounded-full border border-primary/12 will-change-transform transform-gpu lg:block"
        style={{ y: p.far, rotate: p.slowRotate, scale: p.breatheScale }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-8 bottom-[14%] hidden h-40 w-40 rounded-[16px] border border-secondary/14 bg-soft/30 will-change-transform transform-gpu md:block"
        style={{ y: p.mid, rotate: p.reverseRotate, opacity: p.fadeInOut }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[38%] top-[6%] h-10 w-10 rounded-full bg-primary/28 blur-sm will-change-transform transform-gpu"
        style={{ y: p.foreground, x: p.nearX }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[8%] right-[28%] hidden h-16 w-16 rounded-full border border-primary/18 will-change-transform transform-gpu md:block"
        style={{ y: p.near, x: p.midX, rotate: p.fastRotate }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[14%] top-[38%] hidden h-12 w-12 rounded-full bg-secondary/14 blur-sm will-change-transform transform-gpu lg:block"
        style={{ y: p.midFar, rotate: p.slowRotate }}
      />
    </div>
  );
}

function CVContent() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: ref as React.RefObject<HTMLElement | null> });

  return (
    <div ref={ref} className="section-shell grid items-start gap-10 lg:grid-cols-[0.42fr_0.58fr]">
      <motion.div
        style={{ y: p.near }}
        className="will-change-transform transform-gpu"
      >
        <SectionHeading
          eyebrow="Resume"
          title="A Concise View of My Background"
          description="A resume-style section for quick scanning, with a document preview visual and a placeholder download button for the final CV file."
        />
        <a
          href={process.env.NEXT_PUBLIC_CV_URL ?? profile.cvHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(192,133,82,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-secondary"
        >
          Download CV
          <Download size={16} />
        </a>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="rounded-[8px] border border-secondary/14 bg-soft/48 p-4 shadow-[0_24px_70px_rgba(75,46,43,0.08)] md:p-6 will-change-transform transform-gpu"
        style={{ y: p.mid }}
      >
        <motion.div
          variants={fadeInUp}
          whileHover={cardHover}
          className="rounded-[8px] border border-secondary/12 bg-cream p-7 md:p-9"
        >
          <div className="flex items-start justify-between gap-6 border-b border-secondary/12 pb-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                Curriculum Vitae
              </p>
              <h3 className="display-heading mt-2 text-4xl font-semibold text-foreground">
                {profile.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{profile.role}</p>
            </div>
            <span className="hidden h-14 w-14 items-center justify-center rounded-full bg-primary/12 text-primary sm:inline-flex">
              <UserRound size={24} />
            </span>
          </div>

          <div className="mt-7 space-y-7">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <Layers3 size={18} className="text-primary" />
                <h4 className="font-semibold text-foreground">Summary</h4>
              </div>
              <p className="text-sm leading-7 text-muted">{cv.summary}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <GraduationCap size={18} className="text-primary" />
                  <h4 className="font-semibold text-foreground">Education</h4>
                </div>
                <p className="text-sm leading-7 text-muted">{cv.education}</p>
              </div>
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <UserRound size={18} className="text-primary" />
                  <h4 className="font-semibold text-foreground">Experience</h4>
                </div>
                <p className="text-sm leading-7 text-muted">{cv.experience}</p>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-foreground">Core Skills</h4>
              <div className="flex flex-wrap gap-2">
                {cv.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-soft px-3 py-2 text-xs font-medium text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CVSection() {
  return (
    <MotionSection
      id="cv"
      className="border-b border-secondary/10"
      parallaxVariant="teal"
    >
      <CVParallaxLayer />
      <div className="relative z-10 w-full">
        <CVContent />
      </div>
    </MotionSection>
  );
}
