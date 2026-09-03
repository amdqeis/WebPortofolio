"use client";

import { motion } from "framer-motion";
import { Code2, Database, GitBranch, ServerCog } from "lucide-react";
import { useRef } from "react";
import { skills } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer, viewportRepeat } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

const skillGroups = [
  {
    label: "Frontend",
    icon: Code2,
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    icon: ServerCog,
    items: ["Flask", "FastAPI", "REST API", "Authentication"],
  },
  {
    label: "Database",
    icon: Database,
    items: ["PostgreSQL", "Database Design"],
  },
  {
    label: "Tools",
    icon: GitBranch,
    items: ["Docker", "GitHub", "Postman"],
  },
];

function SkillsParallaxLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: ref as React.RefObject<HTMLElement | null> });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute right-[5%] top-[8%] hidden h-56 w-56 rounded-full border-2 border-primary/10 will-change-transform transform-gpu lg:block"
        style={{ y: p.far, rotate: p.slowRotate, scale: p.breatheScale }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[12%] left-[8%] hidden h-36 w-36 rounded-[16px] border border-secondary/16 will-change-transform transform-gpu md:block"
        style={{ y: p.mid, rotate: p.reverseRotate, opacity: p.pulseOpacity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[22%] top-[55%] h-8 w-8 rounded-full bg-primary/32 blur-[2px] will-change-transform transform-gpu"
        style={{ y: p.foreground, x: p.midX }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[30%] top-[18%] hidden h-20 w-20 rounded-full border border-primary/16 bg-soft/40 will-change-transform transform-gpu md:block"
        style={{ y: p.near, x: p.farX, opacity: p.fadeInOut }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[6%] right-[14%] hidden h-14 w-14 rounded-full bg-secondary/18 blur-sm will-change-transform transform-gpu lg:block"
        style={{ y: p.midFar, rotate: p.fastRotate }}
      />
    </div>
  );
}

function SkillsContent() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useParallax({ target: ref as React.RefObject<HTMLElement | null> });

  return (
    <div ref={ref} className="section-shell">
      <motion.div
        style={{ y: p.near }}
        className="will-change-transform transform-gpu"
      >
        <SectionHeading
          eyebrow="Tech Stack"
          title="Skills That Support Clean Products"
          description="A compact toolkit for building responsive interfaces, practical backend systems, and data-aware application flows."
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
      >
        {skillGroups.map((group, idx) => {
          const Icon = group.icon;
          const cardParallax = idx % 2 === 0 ? p.near : p.foreground;

          return (
            <motion.article
              key={group.label}
              variants={fadeInUp}
              whileHover={cardHover}
              className="elegant-card rounded-[8px] p-6 will-change-transform transform-gpu"
              style={{ y: cardParallax }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="font-semibold text-foreground">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-secondary/12 bg-soft/70 px-3 py-2 text-xs font-medium text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        className="mt-8 flex flex-wrap gap-3 will-change-transform transform-gpu"
        style={{ y: p.foreground }}
      >
        {skills.map((skill) => (
          <motion.span
            key={skill}
            variants={fadeInUp}
            className="rounded-full border border-secondary/14 bg-cream px-4 py-2 text-sm text-muted shadow-[0_10px_28px_rgba(75,46,43,0.04)]"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <MotionSection
      id="skills"
      className="border-b border-secondary/10"
      parallaxVariant="teal"
    >
      <SkillsParallaxLayer />
      <div className="relative z-10 w-full">
        <SkillsContent />
      </div>
    </MotionSection>
  );
}
