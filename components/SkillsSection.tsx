"use client";

import { motion } from "framer-motion";
import { Code2, Database, GitBranch, ServerCog } from "lucide-react";
import { skills } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
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

export function SkillsSection() {
  return (
    <MotionSection id="skills" className="border-b border-secondary/10">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Skills That Support Clean Products"
          description="A compact toolkit for building responsive interfaces, practical backend systems, and data-aware application flows."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {skillGroups.map((group) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.label}
                variants={fadeInUp}
                whileHover={cardHover}
                className="elegant-card rounded-[8px] p-6"
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
                      className="rounded-full border border-secondary/12 bg-soft/70 px-3 py-2 text-xs font-medium text-secondary"
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
          viewport={viewportOnce}
          className="mt-8 flex flex-wrap gap-3"
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={fadeInUp}
              className="rounded-full border border-secondary/14 bg-cream px-4 py-2 text-sm text-secondary shadow-[0_10px_28px_rgba(75,46,43,0.04)]"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
