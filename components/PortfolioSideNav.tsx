"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Code2,
  FileText,
  Folder as FolderClosed,
  FolderOpen,
  Home,
  Mail,
  PanelLeftClose,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import {
  File,
  FileHighlight,
  FileIcon,
  FileLabel,
  Files,
  FilesHighlight,
  Folder,
  FolderHeader,
  FolderIcon,
  FolderItem,
  FolderLabel,
  FolderPanel,
  FolderTrigger,
} from "@/components/animate-ui/primitives/base/files";
import { navLinks, profile, projects } from "@/lib/data";
import { smoothEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PortfolioSideNavProps = {
  activeId: string;
  isOpen: boolean;
  onClose: () => void;
};

const mainNavigation = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Projects", href: "#projects", icon: BriefcaseBusiness },
  { label: "Contact", href: "#contact", icon: Mail },
];

function getTargetId(href: string) {
  return href.replace("#", "");
}

function isMainItemActive(activeId: string, href: string) {
  const targetId = getTargetId(href);

  if (targetId === "projects") {
    return activeId === "projects" || activeId.startsWith("project-");
  }

  return activeId === targetId;
}

export function PortfolioSideNav({
  activeId,
  isOpen,
  onClose,
}: PortfolioSideNavProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavigate = (href: string) => {
    const targetId = getTargetId(href);
    const target =
      document.getElementById(targetId) ?? document.getElementById("projects");

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);

    if (window.matchMedia("(max-width: 1023px)").matches) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close side navigation overlay"
            className="fixed inset-0 z-[60] bg-[#2b1712]/24 backdrop-blur-[2px] lg:bg-transparent lg:backdrop-blur-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: smoothEase }}
            onClick={onClose}
          />

          <motion.aside
            aria-label="Portfolio side navigation"
            className="portfolio-side-nav fixed left-3 top-3 z-[70] flex h-[calc(100dvh-1.5rem)] w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[8px] border border-secondary/16 bg-cream/86 shadow-[0_24px_90px_rgba(75,46,43,0.2)] backdrop-blur-2xl md:left-5 md:top-5 md:h-[calc(100dvh-2.5rem)] md:w-[23rem]"
            initial={{ opacity: 0, x: -32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -32, scale: 0.98 }}
            transition={{ duration: 0.36, ease: smoothEase }}
          >
            <div className="flex items-start justify-between gap-5 border-b border-secondary/12 p-5">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Navigator
                </p>
                <h2 className="display-heading mt-2 truncate text-2xl font-semibold text-foreground">
                  {profile.name}
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close side navigation"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary/18 bg-cream/60 text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-soft"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>

            <Files
              defaultOpen={["portfolio", "projects"]}
              className="min-h-0 flex-1 px-4 py-5"
            >
              <FilesHighlight className="space-y-1">
                <FolderItem value="portfolio">
                  <FolderHeader>
                    <FolderTrigger className="group rounded-[8px] px-3 py-2.5 text-left transition duration-300 hover:bg-soft/70 focus-visible:bg-soft">
                      <Folder className="text-foreground">
                        <FolderIcon
                          closeIcon={<FolderClosed size={17} />}
                          openIcon={<FolderOpen size={17} />}
                        />
                        <FolderLabel className="text-sm font-semibold text-foreground">
                          Portfolio
                        </FolderLabel>
                      </Folder>
                    </FolderTrigger>
                  </FolderHeader>

                  <FolderPanel className="pl-4">
                    <div className="ml-2 border-l border-secondary/12 py-1 pl-3">
                      {mainNavigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = isMainItemActive(activeId, item.href);

                        if (item.href === "#projects") {
                          return (
                            <FolderItem key={item.href} value="projects">
                              <FolderHeader>
                                <FolderTrigger
                                  className={cn(
                                    "group mt-1 rounded-[8px] px-3 py-2.5 text-left transition duration-300 hover:bg-soft/70 focus-visible:bg-soft",
                                    isActive && "bg-primary/12 text-foreground"
                                  )}
                                  onClick={() => handleNavigate(item.href)}
                                >
                                  <Folder className="text-muted">
                                    <FolderIcon
                                      closeIcon={<FolderClosed size={16} />}
                                      openIcon={<FolderOpen size={16} />}
                                    />
                                    <FolderLabel className="text-sm font-medium">
                                      Projects
                                    </FolderLabel>
                                  </Folder>
                                </FolderTrigger>
                              </FolderHeader>

                              <FolderPanel className="pl-4">
                                <div className="ml-2 border-l border-secondary/12 py-1 pl-3">
                                  {projects.map((project, index) => {
                                    const projectId = `project-${index + 1}`;
                                    const isProjectActive = activeId === projectId;

                                    return (
                                      <FileHighlight key={project.title}>
                                        <button
                                          type="button"
                                          className={cn(
                                            "group w-full rounded-[8px] px-3 py-2 text-left text-muted transition duration-300 hover:bg-soft/70 hover:text-foreground focus-visible:bg-soft",
                                            isProjectActive &&
                                              "bg-primary/12 text-foreground"
                                          )}
                                          onClick={() =>
                                            handleNavigate(`#${projectId}`)
                                          }
                                        >
                                          <File>
                                            <FileIcon>
                                              <FileText size={14} />
                                            </FileIcon>
                                            <FileLabel className="text-xs font-medium">
                                              {String(index + 1).padStart(2, "0")}{" "}
                                              {project.title}
                                            </FileLabel>
                                          </File>
                                        </button>
                                      </FileHighlight>
                                    );
                                  })}
                                </div>
                              </FolderPanel>
                            </FolderItem>
                          );
                        }

                        return (
                          <FileHighlight key={item.href}>
                            <button
                              type="button"
                              className={cn(
                                "group w-full rounded-[8px] px-3 py-2.5 text-left text-muted transition duration-300 hover:bg-soft/70 hover:text-foreground focus-visible:bg-soft",
                                isActive && "bg-primary/12 text-foreground"
                              )}
                              onClick={() => handleNavigate(item.href)}
                            >
                              <File>
                                <FileIcon>
                                  <Icon size={15} />
                                </FileIcon>
                                <FileLabel className="text-sm font-medium">
                                  {item.label}
                                </FileLabel>
                              </File>
                            </button>
                          </FileHighlight>
                        );
                      })}
                    </div>
                  </FolderPanel>
                </FolderItem>
              </FilesHighlight>
            </Files>

            <div className="border-t border-secondary/12 p-4">
              <div className="rounded-[8px] border border-secondary/12 bg-soft/56 p-3">
                <p className="text-xs font-medium text-foreground">Quick path</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {navLinks.length} sections, {projects.length} selected works
                  indexed from portfolio data.
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close side navigation"
              className="absolute bottom-4 right-4 hidden h-10 w-10 items-center justify-center rounded-full border border-secondary/16 bg-cream/70 text-muted shadow-[0_10px_28px_rgba(75,46,43,0.08)] transition duration-300 hover:-translate-y-0.5 hover:text-foreground lg:inline-flex"
              onClick={onClose}
            >
              <PanelLeftClose size={17} />
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
