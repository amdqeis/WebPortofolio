"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import { useRef } from "react";
import { profile, quickStats } from "@/lib/data";
import { fadeInUp, smoothEase, staggerContainer, textReveal } from "@/lib/motion";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const decorativeY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const decorativeRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden border-b border-secondary/10 pt-24"
    >
      <motion.div
        aria-hidden="true"
        className="absolute right-0 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        style={{ y: decorativeY }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-16 left-8 h-52 w-52 rounded-full bg-secondary/10 blur-3xl"
        style={{ y: decorativeY }}
      />

      <div className="section-shell grid items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.78fr] lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-secondary"
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
            className="mt-6 text-2xl font-medium text-foreground md:text-3xl"
          >
            {profile.role}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg"
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
              href={profile.cvHref}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/30 px-7 py-3.5 text-sm font-medium text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-soft"
            >
              Download CV
              <Download size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-secondary transition duration-300 hover:-translate-y-0.5 hover:bg-soft hover:text-foreground"
            >
              Contact Me
              <Mail size={16} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: smoothEase, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[430px] lg:ml-auto"
          style={{ y: decorativeY, rotate: decorativeRotate }}
        >
          {/* Future profile photo placeholder:
            <Image
              src="/profile.jpg"
              alt="Ahmad Qeis Ismail"
              width={560}
              height={680}
              priority
              className="h-full w-full rounded-[8px] object-cover"
            />
          */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-secondary/15 bg-[linear-gradient(145deg,#f8eadf_0%,#fff8f0_38%,#e8cdb7_100%)] shadow-[0_28px_80px_rgba(75,46,43,0.14)]">
            <div className="absolute inset-8 rounded-[8px] border border-white/50" />
            <div className="absolute left-10 top-12 h-28 w-28 rounded-full bg-primary/25 blur-sm" />
            <div className="absolute bottom-12 right-10 h-36 w-36 rounded-full border border-secondary/25" />
            <div className="absolute bottom-24 left-12 h-24 w-24 rounded-full bg-secondary/20" />
            <div className="absolute right-12 top-14 h-40 w-24 rounded-full bg-white/34 blur-xl" />
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />
            <div className="absolute inset-x-10 bottom-9 grid grid-cols-3 gap-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[8px] border border-white/50 bg-cream/70 p-3 backdrop-blur"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-secondary">
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
