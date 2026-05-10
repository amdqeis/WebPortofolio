"use client";

import {
  ChevronDown,
  ExternalLink,
  GitBranch,
  Layers3,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/lib/data";
import { projects } from "@/lib/data";
import { fadeInUp, staggerContainer, viewportRepeat } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  visual: Project["visual"];
  projectTitle: string;
  imageY: MotionValue<number>;
  shapeY: MotionValue<number>;
  scale: MotionValue<number>;
  shouldReduceMotion: boolean;
};

const visualCopy: Record<
  Project["visual"],
  {
    label: string;
    icon: LucideIcon;
    stats: string[];
  }
> = {
  dashboard: {
    label: "Admin Flow",
    icon: Layers3,
    stats: ["Bookings", "Payments", "Tables"],
  },
  database: {
    label: "Data Views",
    icon: Layers3,
    stats: ["Records", "Auth", "Responsive"],
  },
  api: {
    label: "API Suite",
    icon: Layers3,
    stats: ["Requests", "Tokens", "Cases"],
  },
  schema: {
    label: "Schema Map",
    icon: Layers3,
    stats: ["Entities", "Relations", "Queries"],
  },
};

function ProjectVisual({
  visual,
  projectTitle,
  imageY,
  shapeY,
  scale,
  shouldReduceMotion,
}: ProjectVisualProps) {
  const visualMeta = visualCopy[visual];
  const Icon = visualMeta.icon;

  return (
    <motion.div
      aria-label={`${projectTitle} visual preview`}
      className="relative mx-auto aspect-[4/3] w-full max-w-[590px]"
      style={{
        y: shouldReduceMotion ? 0 : imageY,
        scale: shouldReduceMotion ? 1 : scale,
      }}
    >
      <motion.div
        className="absolute -left-3 top-8 hidden h-28 w-24 rounded-[8px] border border-[#1d3b3a]/16 bg-[#1d3b3a]/8 md:block"
        style={{ y: shouldReduceMotion ? 0 : shapeY }}
      />
      <motion.div
        className="absolute -right-4 bottom-10 hidden h-32 w-28 rounded-[8px] border border-primary/18 bg-primary/10 md:block"
        style={{ y: shouldReduceMotion ? 0 : imageY }}
      />

      <div className="absolute inset-0 rounded-[8px] border border-secondary/16 bg-cream/70 shadow-[0_28px_80px_rgba(75,46,43,0.14)] backdrop-blur-xl" />
      <div className="absolute inset-4 overflow-hidden rounded-[8px] border border-secondary/12 bg-[#f8eadf]">
        <div className="flex h-12 items-center justify-between border-b border-secondary/10 bg-cream/84 px-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d96b5f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e6b566]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5f9f88]" />
          </div>
          <div className="h-2 w-24 rounded-full bg-secondary/14" />
        </div>

        <div className="grid h-[calc(100%-3rem)] grid-cols-[0.34fr_0.66fr]">
          <div className="border-r border-secondary/10 bg-cream/56 p-4">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#1d3b3a] text-white">
                <Icon size={18} />
              </div>
              <div>
                <div className="h-2.5 w-20 rounded-full bg-foreground/18" />
                <div className="mt-2 h-2 w-14 rounded-full bg-secondary/14" />
              </div>
            </div>

            <div className="space-y-3">
              {visualMeta.stats.map((stat) => (
                <div
                  key={stat}
                  className="rounded-[8px] border border-secondary/10 bg-white/35 p-3"
                >
                  <div className="h-2 w-16 rounded-full bg-secondary/16" />
                  <div className="mt-3 h-7 rounded-[6px] bg-primary/14" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden p-4 md:p-5">
            <div className="absolute inset-x-5 top-5 h-20 rounded-[8px] bg-[linear-gradient(135deg,#1d3b3a,#5f9f88)] opacity-90" />

            {visual === "dashboard" && (
              <div className="relative mt-24 grid gap-3">
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="h-20 rounded-[8px] bg-cream/88 p-3">
                      <div className="h-2 w-12 rounded-full bg-secondary/18" />
                      <div className="mt-5 h-6 rounded-[6px] bg-primary/20" />
                    </div>
                  ))}
                </div>
                <div className="h-28 rounded-[8px] bg-cream/88 p-4">
                  <div className="mb-4 h-2 w-28 rounded-full bg-secondary/16" />
                  <div className="grid grid-cols-5 items-end gap-2">
                    {[44, 68, 52, 82, 62].map((height) => (
                      <div
                        key={height}
                        className="rounded-t-[5px] bg-[#1d3b3a]/72"
                        style={{ height }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {visual === "database" && (
              <div className="relative mt-24 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[0.4fr_1fr_0.5fr] gap-3 rounded-[8px] bg-cream/88 p-3"
                  >
                    <div className="h-3 rounded-full bg-[#1d3b3a]/24" />
                    <div className="h-3 rounded-full bg-secondary/14" />
                    <div className="h-3 rounded-full bg-primary/18" />
                  </div>
                ))}
              </div>
            )}

            {visual === "api" && (
              <div className="relative mt-24 rounded-[8px] bg-[#243433] p-4 text-cream shadow-2xl">
                <div className="mb-4 flex gap-2">
                  <span className="rounded-full bg-[#5f9f88] px-3 py-1 text-[10px] font-semibold">
                    GET
                  </span>
                  <span className="h-5 flex-1 rounded-full bg-white/12" />
                </div>
                <div className="space-y-2">
                  {["auth", "booking", "status", "response", "edge-case"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#e6b566]" />
                      <span className="h-2 flex-1 rounded-full bg-white/14" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {visual === "schema" && (
              <div className="relative mt-24 grid grid-cols-2 gap-4">
                {["Users", "Orders", "Items", "Reports"].map((item, index) => (
                  <div key={item} className="rounded-[8px] bg-cream/88 p-4">
                    <div className="mb-4 h-3 w-20 rounded-full bg-[#1d3b3a]/26" />
                    <div className="space-y-2">
                      {Array.from({ length: index === 0 ? 4 : 3 }).map((_, row) => (
                        <div key={row} className="h-2 rounded-full bg-secondary/16" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectPanel({
  project,
  index,
  isLast,
}: {
  project: Project;
  index: number;
  isLast: boolean;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const imageY = useTransform(scrollYProgress, [0, 1], [64, -64]);
  const shapeY = useTransform(scrollYProgress, [0, 1], [-34, 42]);
  const contentY = useTransform(scrollYProgress, [0, 1], [28, -26]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.98]);

  const nextTarget = isLast ? "services" : `project-${index + 2}`;
  const nextLabel = isLast ? "Next Section" : "Next Project";

  const handleNextProject = () => {
    const target = document.getElementById(nextTarget);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.article
      ref={panelRef}
      id={`project-${index + 1}`}
      className={cn(
        "snap-section relative flex min-h-[100svh] items-center overflow-hidden border-b border-secondary/10 px-0 pb-28 pt-24",
        index % 2 === 1 && "bg-soft/28"
      )}
      initial="hidden"
      whileInView="visible"
      viewport={viewportRepeat}
      variants={staggerContainer}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[46%] bg-[linear-gradient(180deg,rgba(29,59,58,0.09),rgba(255,248,240,0))]"
        style={{ y: shouldReduceMotion ? 0 : backgroundY }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-24 left-[8%] h-28 w-44 rounded-[8px] border border-secondary/10 bg-cream/40"
        style={{ y: shouldReduceMotion ? 0 : shapeY }}
      />

      <div className="section-shell relative z-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          className="max-w-2xl"
          variants={fadeInUp}
          style={{ y: shouldReduceMotion ? 0 : contentY }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Selected Work {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="display-heading mt-4 text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            {project.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-muted md:text-lg">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-secondary/12 bg-cream/76 px-3.5 py-2 text-xs font-medium text-muted shadow-[0_10px_24px_rgba(75,46,43,0.04)]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Problem
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">{project.problem}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Solution
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">{project.solution}</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-muted">
            <span className="font-semibold text-foreground">My role:</span>{" "}
            {project.role}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={project.liveHref}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(192,133,82,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-secondary"
            >
              Live Demo
              <ExternalLink size={15} />
            </a>
            <a
              href={project.githubHref}
              className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-cream/50 px-5 py-2.5 text-sm font-medium text-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-cream"
            >
              GitHub
              <GitBranch size={15} />
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="min-w-0">
          <ProjectVisual
            visual={project.visual}
            projectTitle={project.title}
            imageY={imageY}
            shapeY={shapeY}
            scale={visualScale}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
        </motion.div>
      </div>

      <button
        type="button"
        aria-label={nextLabel}
        onClick={handleNextProject}
        className="absolute bottom-6 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-secondary/16 bg-cream/54 px-4 py-2 text-xs font-semibold text-foreground shadow-[0_12px_34px_rgba(75,46,43,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-secondary/28 hover:bg-cream/84"
      >
        {nextLabel}
        <ChevronDown size={16} />
      </button>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative border-b border-secondary/10">
      {projects.map((project, index) => (
        <ProjectPanel
          key={project.title}
          project={project}
          index={index}
          isLast={index === projects.length - 1}
        />
      ))}
    </section>
  );
}
