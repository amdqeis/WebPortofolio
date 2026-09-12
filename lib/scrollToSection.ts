/**
 * scrollToSection – programmatic smooth scroll that works correctly with
 * `scroll-snap-type: y mandatory`.
 *
 * Native anchor links are blocked by snap-stop so we bypass them entirely
 * and call `scrollIntoView` directly.
 */
export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
