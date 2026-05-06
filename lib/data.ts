import {
  BadgeCheck,
  BriefcaseBusiness,
  Braces,
  Camera,
  Code2,
  Database,
  GitBranch,
  Globe2,
  GraduationCap,
  Layers3,
  Mail,
  MessageCircle,
  ServerCog,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Project = {
  title: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  role: string;
  liveHref: string;
  githubHref: string;
  visual: "dashboard" | "database" | "api" | "schema";
};

export type Service = {
  name: string;
  description: string;
  price: string;
  features: string[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

export const profile = {
  name: "Ahmad Qeis Ismail",
  role: "Web Developer & Backend Enthusiast",
  intro:
    "I build responsive, functional, and user-friendly web applications with a focus on clean design, reliable backend systems, and thoughtful user experience.",
  cvHref: "/Ahmad-Qeis-Ismail-CV.pdf",
};

export const aboutHighlights: Highlight[] = [
  {
    title: "Fast learner",
    description: "Comfortable adapting to new stacks, patterns, and project needs.",
    icon: Sparkles,
  },
  {
    title: "Backend-focused",
    description: "Interested in APIs, authentication, data flow, and service reliability.",
    icon: ServerCog,
  },
  {
    title: "Clean UI oriented",
    description: "I like interfaces that feel calm, readable, and purposeful.",
    icon: Layers3,
  },
  {
    title: "Photography eye",
    description: "Photography keeps my sense of composition and detail sharp.",
    icon: Camera,
  },
];

export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Flask",
  "FastAPI",
  "PostgreSQL",
  "REST API",
  "Authentication",
  "Database Design",
  "Docker",
  "GitHub",
  "Postman",
];

export const projects: Project[] = [
  {
    title: "SiBooking",
    description:
      "Web reservation system for billiard table booking with availability, secure payments, and an administrative dashboard.",
    problem:
      "Manual reservation flow made table availability hard to track and slowed down customer confirmations.",
    solution:
      "A structured booking interface with clear availability states, payment flow, and admin management tools.",
    techStack: ["Flask", "PostgreSQL", "REST API", "Authentication"],
    role: "Full-stack developer focused on backend architecture and dashboard flow.",
    liveHref: "#",
    githubHref: "#",
    visual: "dashboard",
  },
  {
    title: "Responsive CRUD Web App",
    description:
      "A full-stack responsive application demonstrating robust data handling, protected routes, and seamless UI updates.",
    problem:
      "Teams need simple internal tools that remain readable and reliable across desktop and mobile devices.",
    solution:
      "Built reusable CRUD views with authentication, validation-minded UI states, and responsive layouts.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Auth"],
    role: "Frontend and backend integration, UI structure, and authentication flow.",
    liveHref: "#",
    githubHref: "#",
    visual: "database",
  },
  {
    title: "API Testing Collection",
    description:
      "Postman collection for validating REST endpoints, authentication scenarios, and common API failure states.",
    problem:
      "Backend changes can introduce regressions when request flows and edge cases are not documented clearly.",
    solution:
      "Organized endpoint collections with environment variables, examples, and repeatable test cases.",
    techStack: ["Postman", "REST API", "FastAPI", "Auth"],
    role: "API tester and documentation owner for request scenarios.",
    liveHref: "#",
    githubHref: "#",
    visual: "api",
  },
  {
    title: "Database Modeling Project",
    description:
      "Relational database model designed around clean entities, relationships, constraints, and query-friendly structure.",
    problem:
      "A weak data model can make features difficult to extend and reporting queries expensive to maintain.",
    solution:
      "Mapped entities, normalized relationships, and documented schema choices for maintainable implementation.",
    techStack: ["PostgreSQL", "Database Design", "ERD", "SQL"],
    role: "Database designer responsible for schema modeling and relationship mapping.",
    liveHref: "#",
    githubHref: "#",
    visual: "schema",
  },
];

export const services: Service[] = [
  {
    name: "Portfolio Website",
    description: "A refined personal website for developers, creatives, or professionals.",
    price: "Start from IDR 750K",
    features: ["Responsive pages", "Smooth section motion", "Contact form UI"],
  },
  {
    name: "Landing Page",
    description: "A focused page for products, services, campaigns, or online presence.",
    price: "Start from IDR 650K",
    features: ["Premium layout", "CTA sections", "Mobile optimization"],
  },
  {
    name: "CRUD Web Application",
    description: "A structured web app for managing records, users, and internal workflows.",
    price: "Start from IDR 1.5M",
    features: ["Dashboard UI", "CRUD flow", "Authentication-ready structure"],
  },
  {
    name: "Backend API Development",
    description: "Reliable REST API foundations for data-driven web applications.",
    price: "Start from IDR 1M",
    features: ["Endpoint structure", "Auth flow", "API testing support"],
  },
  {
    name: "Database Design",
    description: "Clean relational schema planning for scalable and maintainable products.",
    price: "Start from IDR 600K",
    features: ["Entity mapping", "Relationship design", "Query-minded structure"],
  },
];

export const cv = {
  summary:
    "Web Developer and Backend Enthusiast with interest in clean interfaces, reliable backend systems, database design, and user-focused web experiences.",
  education: "Informatics / Software Development learning path with practical project experience.",
  experience:
    "Built web application concepts around reservation workflows, CRUD systems, API testing, and relational database modeling.",
  skills: ["Frontend UI", "Backend API", "Database Design", "Authentication", "Responsive Web"],
};

export const contactLinks = [
  { label: "Email", value: "ahmad.qeis@example.com", href: "mailto:ahmad.qeis@example.com", icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/ahmadqeis", href: "#", icon: BriefcaseBusiness },
  { label: "GitHub", value: "github.com/ahmadqeis", href: "#", icon: GitBranch },
  { label: "Instagram", value: "@ahmadqeis", href: "#", icon: Globe2 },
  { label: "WhatsApp", value: "+62 812-0000-0000", href: "#", icon: MessageCircle },
];

export const quickStats = [
  { label: "Core focus", value: "Backend" },
  { label: "Design taste", value: "Clean UI" },
  { label: "Workflow", value: "API first" },
];

export const skillIconMap = {
  frontend: Code2,
  backend: Braces,
  database: Database,
  quality: BadgeCheck,
  education: GraduationCap,
};
