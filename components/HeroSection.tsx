"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import { useRef } from "react";
import { profile, quickStats } from "@/lib/data";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useParallax } from "@/lib/useParallax";
import { MorphingHeadline } from "./MorphingHeadline";
import {
  fadeInUp,
  smoothEase,
  staggerContainer,
  textReveal,
  viewportRepeat,
} from "@/lib/motion";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCompactViewport = useMediaQuery("(max-width: 767px)");
  const intensity = isCompactViewport ? 0.45 : 1;

  /* use the central hook for hero (enter-from-start offset) */
  const p = useParallax({ target: ref, offset: ["start start", "end start"] });

  /* legacy hero-specific transforms */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const farY = useTransform(scrollYProgress, [0, 1], [0, 76 * intensity]);
  const middleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -42 * intensity]
  );
  const foregroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 34 * intensity]
  );
  const decorativeRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -7 * intensity]
  );
  const heroTextY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 52 * intensity]
  );
  const heroBlobX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -28 * intensity]
  );
  const ringScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.22 * (shouldReduceMotion ? 0 : 1)]
  );
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 38 * intensity]);

  const off = shouldReduceMotion ? 0 : 1;

  return (
    <section
      id="home"
      ref={ref}
      className="snap-section relative flex items-center overflow-hidden border-b border-secondary/10 pt-24"
    >
      {/* -- Parallax decorative layer (8 elements) -------------------- */}

      {/* Far blob  top right */}
      <motion.div
        aria-hidden="true"
        className="absolute right-0 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl will-change-transform transform-gpu"
        style={{ y: off ? farY : 0, x: off ? heroBlobX : 0 }}
      />

      {/* Mid blob  bottom left */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-16 left-8 h-72 w-72 rounded-full bg-secondary/12 blur-3xl will-change-transform transform-gpu"
        style={{ y: off ? middleY : 0 }}
      />

      {/* Small foreground dot  center right */}
      <motion.div
        aria-hidden="true"
        className="absolute right-[38%] top-[24%] hidden h-32 w-32 rounded-full border border-primary/14 bg-cream/16 will-change-transform transform-gpu md:block"
        style={{ y: off ? foregroundY : 0 }}
      />

      {/* Extra ring  far behind, top center */}
      <motion.div
        aria-hidden="true"
        className="absolute left-[28%] top-[10%] hidden h-52 w-52 rounded-full border border-secondary/10 will-change-transform transform-gpu md:block"
        style={{
          y: off ? p.far : 0,
          rotate: off ? p.slowRotate : 0,
          scale: off ? ringScale : 1,
          opacity: off ? p.fadeInOut : 1,
        }}
      />

      {/* Small accent square  left mid */}
      <motion.div
        aria-hidden="true"
        className="absolute left-[6%] top-[44%] hidden h-16 w-16 rounded-[8px] border border-primary/20 bg-primary/6 will-change-transform transform-gpu lg:block"
        style={{
          y: off ? p.near : 0,
          rotate: off ? p.reverseRotate : 0,
          opacity: off ? p.pulseOpacity : 1,
        }}
      />

      {/* Large ring far  bottom right */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-20 right-[10%] hidden h-80 w-80 rounded-full border border-primary/8 will-change-transform transform-gpu lg:block"
        style={{
          y: off ? p.midFar : 0,
          rotate: off ? p.slowRotate : 0,
          opacity: off ? p.fadeInOut : 1,
        }}
      />

      {/* Tiny dot cluster  upper left */}
      <motion.div
        aria-hidden="true"
        className="absolute left-[14%] top-[18%] h-8 w-8 rounded-full bg-primary/30 blur-sm will-change-transform transform-gpu"
        style={{ y: off ? p.foreground : 0, x: off ? p.nearX : 0 }}
      />

      {/* Grid overlay  very subtle */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 will-change-transform transform-gpu opacity-[0.028]"
        style={{
          y: off ? gridY : 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--secondary) 0px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, var(--secondary) 0px, transparent 1px, transparent 64px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="section-shell grid items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.78fr] lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="max-w-3xl"
          style={{ y: off ? heroTextY : 0 }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-muted"
          >
            Welcome
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              variants={textReveal}
              className="display-heading max-w-4xl text-6xl font-semibold leading-[0.95] text-foreground sm:text-7xl lg:text-8xl"
            >
              Hi, I&apos;m Ahmad Qeis Ismail
            </motion.h1>
          </div>
          <motion.p
            variants={fadeInUp}
            className="mt-6 flex min-h-10 items-center overflow-hidden"
          >
            <MorphingHeadline />
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-base leading-8 text-muted md:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white shadow-[0_14px_34px_rgba(192,133,82,0.26)] transition duration-300 hover:-translate-y-0.5 hover:bg-secondary"
            >
              View Projects
              <ArrowDownRight size={17} />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_CV_URL ?? profile.cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/30 px-7 py-3.5 text-sm font-medium text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-soft"
            >
              Download CV
              <Download size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-muted transition duration-300 hover:-translate-y-0.5 hover:bg-soft hover:text-foreground"
            >
              Contact Me
              <Mail size={16} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportRepeat}
          transition={{ duration: 0.85, ease: smoothEase, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[430px] will-change-transform transform-gpu lg:ml-auto"
          style={{
            y: off ? foregroundY : 0,
            rotate: off ? decorativeRotate : 0,
          }}
        >
          {/* Profile photo */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-secondary/15 shadow-[0_28px_80px_rgba(75,46,43,0.14)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Profile.jpeg"
              alt="Ahmad Qeis Ismail"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            {/* subtle gradient overlay so stat cards stay readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-x-10 bottom-9 grid grid-cols-3 gap-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[8px] border border-white/50 bg-cream/70 p-3 backdrop-blur"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
