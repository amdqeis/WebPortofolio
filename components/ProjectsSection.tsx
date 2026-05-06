"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import type { Project } from "@/lib/data";
import { projects } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer, viewportRepeat } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  if (visual === "dashboard") {
    return (
      <div className="relative h-64 overflow-hidden rounded-t-[8px] bg-[linear-gradient(145deg,#8c6a55,#d9b08f)]">
        <div className="absolute bottom-0 left-1/2 h-40 w-[78%] -translate-x-1/2 rounded-t-[14px] bg-[#2f2f2f] p-3 shadow-2xl">
          <div className="h-full rounded-t-[10px] bg-cream p-4">
            <div className="mb-4 h-5 w-28 rounded-full bg-primary/20" />
            <div className="grid grid-cols-[0.35fr_0.65fr] gap-3">
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-4 rounded-full bg-secondary/12" />
                ))}
              </div>
              <div className="rounded-[8px] bg-soft p-3">
                <div className="mb-3 h-16 rounded-[6px] bg-secondary/18" />
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-4 rounded-full bg-primary/18" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const shapes = {
    database: ["h-24 w-24", "h-16 w-16", "h-12 w-12"],
    api: ["h-20 w-40", "h-14 w-28", "h-12 w-32"],
    schema: ["h-20 w-20", "h-16 w-32", "h-14 w-24"],
  }[visual];

  return (
    <div className="relative h-64 overflow-hidden rounded-t-[8px] bg-[linear-gradient(145deg,#f0d8bf,#fff2e4)]">
      <div className="absolute left-8 top-8 h-24 w-14 rounded-[4px] bg-secondary/80" />
      <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full border border-secondary/20" />
      {shapes.map((shape, index) => (
        <div
          key={shape}
          className={cn(
            "absolute rounded-full bg-primary shadow-[0_16px_30px_rgba(140,90,60,0.22)]",
            shape,
            index === 0 && "left-[38%] top-[28%]",
            index === 1 && "right-[12%] top-[48%]",
            index === 2 && "left-[18%] bottom-[18%]"
          )}
        />
      ))}
      <div className="absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 rounded-full border-[10px] border-secondary/45" />
    </div>
  );
}

export function ProjectsSection() {
  return (
    <MotionSection id="projects" className="border-b border-secondary/10">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Selected Works"
          title="Case Study Style Projects"
          description="Each project is framed around the problem, solution, tech choices, and role so the work reads as practical product thinking, not only screenshots."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="grid gap-6 lg:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={fadeInUp}
              whileHover={cardHover}
              className={cn(
                "group overflow-hidden rounded-[8px] border border-secondary/14 bg-soft/44 shadow-[0_18px_48px_rgba(75,46,43,0.06)]",
                index === 0 && "lg:row-span-2"
              )}
            >
              <ProjectVisual visual={project.visual} />
              <div className="p-6 md:p-7">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-cream px-3 py-1.5 text-[11px] font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="display-heading text-3xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {project.description}
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Problem
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Solution
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {project.solution}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-muted">
                  <span className="font-semibold text-foreground">My role:</span>{" "}
                  {project.role}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.liveHref}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-secondary"
                  >
                    Live Demo
                    <ExternalLink size={15} />
                  </a>
                  <a
                    href={project.githubHref}
                    className="inline-flex items-center gap-2 rounded-full border border-secondary/24 px-5 py-2.5 text-sm font-medium text-foreground transition duration-300 hover:bg-cream"
                  >
                    GitHub
                    <GitBranch size={15} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
