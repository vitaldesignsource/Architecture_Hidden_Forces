import { useEffect, useState } from "react";

/**
 * useActiveSection — which section the reader is actually in.
 * A thin detector band near the top of the viewport; whichever observed section
 * occupies it wins, resolved in document order so overlaps are deterministic.
 */
export function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("section[id], header[id]"));
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const order = new Map(els.map((el, i) => [el.id, i]));
    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        let best = "";
        let bestIdx = Infinity;
        inBand.forEach((id) => {
          const i = order.get(id) ?? Infinity;
          if (i < bestIdx) { bestIdx = i; best = id; }
        });
        if (best) setActive(best);
      },
      { rootMargin: "-18% 0px -76% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/**
 * useReveal — sections settle in as they are reached.
 * The hiding class is added BY SCRIPT, never in the markup, so if the observer
 * never runs the page is simply visible rather than blank. Anything already on
 * screen at load is left alone, and a timeout un-hides anything stranded.
 */


/**
 * useReveal — sections settle in as they are reached.
 * The hiding class is added BY SCRIPT, never in the markup, so if the observer
 * never runs the page is simply visible rather than blank. Anything already on
 * screen at load is left alone, and a timeout un-hides anything stranded.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("section[id] > div"),
    ).filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    if (!targets.length) return;
    targets.forEach((el) => el.classList.add("aoh-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.04 },
    );
    targets.forEach((el) => io.observe(el));
    const t = window.setTimeout(() => {
      document.querySelectorAll(".aoh-reveal:not(.is-in)").forEach((el) => el.classList.add("is-in"));
    }, 6000);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
}

/**
 * usePauseOffscreen — ambient motion costs nothing when nobody is looking at it.
 * Only DECORATIVE animations are paused. Content-revealing ones (rise,
 * letter-coalesce, the title underline) are deliberately excluded: pausing an
 * animation with `both` fill before it runs would strand its element invisible,
 * which is the failure mode this file has already been bitten by twice.
 */


/**
 * usePauseOffscreen — ambient motion costs nothing when nobody is looking at it.
 * Only DECORATIVE animations are paused. Content-revealing ones (rise,
 * letter-coalesce, the title underline) are deliberately excluded: pausing an
 * animation with `both` fill before it runs would strand its element invisible,
 * which is the failure mode this file has already been bitten by twice.
 */
export function usePauseOffscreen() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("section[id], header[id]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("aoh-still", !e.isIntersecting);
      },
      { rootMargin: "250px 0px 250px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => el.classList.remove("aoh-still"));
    };
  }, []);
}
