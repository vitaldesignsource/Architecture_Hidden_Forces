import { useEffect, type RefObject } from "react";

/**
 * useFormulaRay — the Luminous Formula lit by a ray that descends as it is read.
 *
 * The ray's tip sits at a fixed height in the viewport (a little below the
 * reader's eye line). As the column scrolls up through it, the tip descends the
 * column; each line lights when it passes the tip, and the line most recently
 * reached carries the glow. Nothing is timed: the light only moves when the
 * reader does.
 *
 * Follows the house rule for reveals: the dimming class is applied BY SCRIPT,
 * never in the markup. If the script never runs, or the reader prefers reduced
 * motion, the formula is simply lit in full with the ray at rest along its
 * whole length.
 */
const EYE = 0.56;

export function useFormulaRay(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lines = Array.from(
      host.querySelectorAll<HTMLElement>(
        "[data-formula-line], [data-formula-coda]",
      ),
    );
    if (!lines.length) return;

    host.classList.add("aoh-formula-live");
    host.style.setProperty("--ray-p", "0");
    let raf = 0;
    let last = -1;

    const paint = () => {
      raf = 0;
      const rect = host.getBoundingClientRect();
      const tip = window.innerHeight * EYE;
      // The page may end before the column can climb past the eye line; when
      // the reader has scrolled as far as the page goes, the light has arrived.
      const atEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      const p = atEnd
        ? 1
        : Math.min(1, Math.max(0, (tip - rect.top) / rect.height));
      host.style.setProperty("--ray-p", p.toFixed(4));
      let newest = -1;
      lines.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (atEnd || r.top + r.height * 0.4 <= tip) newest = i;
      });
      if (newest !== last) {
        lines.forEach((el, i) => {
          if (i < newest) el.setAttribute("data-lit", "past");
          else if (i === newest) el.setAttribute("data-lit", "now");
          else el.removeAttribute("data-lit");
        });
        host.toggleAttribute("data-arrived", newest === lines.length - 1);
        last = newest;
      }
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

    // Listen only while the column is anywhere near the viewport.
    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      const m = on ? window.addEventListener : window.removeEventListener;
      m.call(window, "scroll", schedule, {
        passive: true,
      } as AddEventListenerOptions);
      m.call(window, "resize", schedule);
    };
    paint();
    const io =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const e of entries) listen(e.isIntersecting);
              schedule();
            },
            { rootMargin: "120% 0px 120% 0px" },
          );
    if (io) io.observe(host);
    else listen(true);

    return () => {
      io?.disconnect();
      listen(false);
      if (raf) window.cancelAnimationFrame(raf);
      host.classList.remove("aoh-formula-live");
      host.removeAttribute("data-arrived");
      host.style.removeProperty("--ray-p");
      lines.forEach((el) => el.removeAttribute("data-lit"));
    };
  }, [ref]);
}
