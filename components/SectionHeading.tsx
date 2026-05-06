import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      <div
        className={cn(
          "mt-4 h-px w-12 bg-secondary/50",
          align === "center" && "mx-auto"
        )}
      />
      {description ? (
        <p className="mt-5 text-sm leading-7 text-muted md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
