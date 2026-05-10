"use client";

import { motion } from "framer-motion";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { CVSection } from "@/components/CVSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SkillsSection } from "@/components/SkillsSection";
import { pageTransition } from "@/lib/motion";

export default function Home() {
  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <CVSection />
      <ContactSection />
      <Footer />
    </motion.main>
  );
}
