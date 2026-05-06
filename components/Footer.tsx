import { contactLinks, profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-soft/50 py-12">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <a
          href="#home"
          className="display-heading text-2xl font-semibold text-foreground"
        >
          {profile.name}
        </a>
        <div className="flex flex-wrap gap-5 text-sm text-secondary">
          {contactLinks.slice(1, 4).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-secondary">
          © 2026 Ahmad Qeis Ismail. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
