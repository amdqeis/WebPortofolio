"use client";

import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

type FilesContextType = {
  open: string[];
  setOpen: (open: string[]) => void;
};

type FolderContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const FilesContext = React.createContext<FilesContextType | null>(null);
const FolderContext = React.createContext<FolderContextType | null>(null);

function useFiles() {
  const context = React.useContext(FilesContext);
  if (!context) {
    throw new Error("useFiles must be used within Files");
  }
  return context;
}

function useFolder() {
  const context = React.useContext(FolderContext);
  if (!context) {
    throw new Error("useFolder must be used within FolderItem");
  }
  return context;
}

type FilesProps = React.ComponentProps<"div"> & {
  defaultOpen?: string[];
  open?: string[];
  onOpenChange?: (open: string[]) => void;
};

function Files({
  children,
  defaultOpen = [],
  open,
  onOpenChange,
  className,
  ...props
}: FilesProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const openValue = open ?? internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: string[]) => {
      if (open === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [open, onOpenChange]
  );

  return (
    <FilesContext.Provider value={{ open: openValue, setOpen }}>
      <div
        data-slot="files"
        className={cn("relative overflow-auto", className)}
        {...props}
      >
        {children}
      </div>
    </FilesContext.Provider>
  );
}

type FilesHighlightProps = React.ComponentProps<"div">;

function FilesHighlight({ className, ...props }: FilesHighlightProps) {
  return (
    <div
      data-slot="files-highlight"
      className={cn("relative space-y-1", className)}
      {...props}
    />
  );
}

type FolderItemProps = React.ComponentProps<"div"> & {
  value: string;
};

function FolderItem({ value, className, ...props }: FolderItemProps) {
  const { open, setOpen } = useFiles();
  const isOpen = open.includes(value);

  const toggle = React.useCallback(() => {
    setOpen(isOpen ? open.filter((item) => item !== value) : [...open, value]);
  }, [isOpen, open, setOpen, value]);

  return (
    <FolderContext.Provider value={{ isOpen, toggle }}>
      <div
        data-slot="folder-item"
        data-open={isOpen}
        className={className}
        {...props}
      />
    </FolderContext.Provider>
  );
}

type FolderHeaderProps = React.ComponentProps<"div">;

function FolderHeader(props: FolderHeaderProps) {
  return <div data-slot="folder-header" {...props} />;
}

type FolderTriggerProps = React.ComponentProps<"button">;

function FolderTrigger({
  type = "button",
  onClick,
  className,
  ...props
}: FolderTriggerProps) {
  const { isOpen, toggle } = useFolder();

  return (
    <button
      data-slot="folder-trigger"
      type={type}
      aria-expanded={isOpen}
      className={cn("w-full", className)}
      onClick={(event) => {
        toggle();
        onClick?.(event);
      }}
      {...props}
    />
  );
}

type FolderPanelProps = HTMLMotionProps<"div"> & {
  keepRendered?: boolean;
};

function FolderPanel({
  children,
  className,
  transition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  keepRendered = false,
  ...props
}: FolderPanelProps) {
  const { isOpen } = useFolder();

  if (keepRendered) {
    return (
      <motion.div
        data-slot="folder-panel"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1, y: 0 },
          closed: { height: 0, opacity: 0, y: -4 },
        }}
        transition={transition}
        className={cn("overflow-hidden", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          data-slot="folder-panel"
          initial={{ height: 0, opacity: 0, y: -4 }}
          animate={{ height: "auto", opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -4 }}
          transition={transition}
          className={cn("overflow-hidden", className)}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type FileHighlightProps = React.ComponentProps<"div">;

function FileHighlight({ className, ...props }: FileHighlightProps) {
  return (
    <div
      data-slot="file-highlight"
      className={cn("relative rounded-[8px]", className)}
      {...props}
    />
  );
}

type FileProps = React.ComponentProps<"div">;

function File({ className, ...props }: FileProps) {
  return (
    <div
      data-slot="file"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

type FileIconProps = React.ComponentProps<"span">;

function FileIcon({ className, ...props }: FileIconProps) {
  return (
    <span
      data-slot="file-icon"
      className={cn("inline-flex shrink-0 items-center", className)}
      {...props}
    />
  );
}

type FileLabelProps = React.ComponentProps<"span">;

function FileLabel({ className, ...props }: FileLabelProps) {
  return (
    <span
      data-slot="file-label"
      className={cn("min-w-0 truncate", className)}
      {...props}
    />
  );
}

type FolderHighlightProps = React.ComponentProps<"div">;

function FolderHighlight({ className, ...props }: FolderHighlightProps) {
  return (
    <div
      data-slot="folder-highlight"
      className={cn("relative rounded-[8px]", className)}
      {...props}
    />
  );
}

type FolderProps = React.ComponentProps<"div">;

function Folder({ className, ...props }: FolderProps) {
  return (
    <div
      data-slot="folder"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

type FolderIconProps = HTMLMotionProps<"span"> & {
  closeIcon: React.ReactNode;
  openIcon: React.ReactNode;
  transition?: Transition;
};

function FolderIcon({
  closeIcon,
  openIcon,
  transition = { duration: 0.15 },
  ...props
}: FolderIconProps) {
  const { isOpen } = useFolder();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={isOpen ? "open" : "close"}
        data-slot="folder-icon"
        className="inline-flex shrink-0 items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={transition}
        {...props}
      >
        {isOpen ? openIcon : closeIcon}
      </motion.span>
    </AnimatePresence>
  );
}

type FolderLabelProps = React.ComponentProps<"span">;

function FolderLabel({ className, ...props }: FolderLabelProps) {
  return (
    <span
      data-slot="folder-label"
      className={cn("min-w-0 truncate", className)}
      {...props}
    />
  );
}

export {
  Files,
  FilesHighlight,
  FolderItem,
  FolderHeader,
  FolderTrigger,
  FolderPanel,
  FileHighlight,
  File,
  FileIcon,
  FileLabel,
  FolderHighlight,
  Folder,
  FolderIcon,
  FolderLabel,
  useFiles,
  useFolder,
  type FilesProps,
  type FilesHighlightProps,
  type FolderItemProps,
  type FolderHeaderProps,
  type FolderTriggerProps,
  type FolderPanelProps,
  type FileHighlightProps,
  type FileProps,
  type FileIconProps,
  type FileLabelProps,
  type FolderHighlightProps,
  type FolderProps,
  type FolderIconProps,
  type FolderLabelProps,
  type FilesContextType,
  type FolderContextType,
};
