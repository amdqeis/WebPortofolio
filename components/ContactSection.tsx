"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Send, XCircle } from "lucide-react";
import { useRef, useState } from "react";
import { contactLinks } from "@/lib/data";
import { cardHover, fadeInUp, staggerContainer, viewportRepeat } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import { MotionSection } from "./MotionSection";
import { SectionHeading } from "./SectionHeading";

const inputClass =
  "w-full rounded-[8px] border border-secondary/16 bg-cream px-4 py-3 text-sm text-foreground placeholder:text-muted/55 transition duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none";

type FormStatus = "idle" | "loading" | "success" | "error";

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

function ContactForm({ parallaxY }: { parallaxY: ReturnType<typeof useParallax>["mid"] }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send message.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportRepeat}
      className="elegant-card rounded-[8px] p-6 md:p-8 will-change-transform transform-gpu"
      style={{ y: parallaxY }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <motion.label variants={fadeInUp} className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your name"
            type="text"
            required
            disabled={status === "loading"}
          />
        </motion.label>
        <motion.label variants={fadeInUp} className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">Email</span>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="you@example.com"
            type="email"
            required
            disabled={status === "loading"}
          />
        </motion.label>
      </div>

      <motion.label variants={fadeInUp} className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-foreground">Subject</span>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
          placeholder="Project inquiry"
          type="text"
          required
          disabled={status === "loading"}
        />
      </motion.label>

      <motion.label variants={fadeInUp} className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-foreground">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} min-h-40 resize-none`}
          placeholder="Tell me about your project, goals, timeline, or idea."
          required
          disabled={status === "loading"}
        />
      </motion.label>

      {/* Status feedback */}
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex items-center gap-2 text-sm text-green-600"
          >
            <CheckCircle size={16} />
            Message sent! I&apos;ll get back to you soon.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex items-center gap-2 text-sm text-red-500"
          >
            <XCircle size={16} />
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        variants={fadeInUp}
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white shadow-[0_14px_34px_rgba(192,133,82,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            Sending…
            <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            Send Message
            <Send size={16} />
          </>
        )}
      </motion.button>
    </motion.form>
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
        <ContactForm parallaxY={p.mid} />

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
