import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * NavStrip — the row of waypoints a header carries below lg.
 *
 * The strip scrolls sideways and hides its scrollbar, so on a phone whatever
 * happens to end inside the right padding looks like the end of the row: on
 * the treatise that was "Sky", with Relation and the two other volumes off
 * the edge and nothing to say so. The strip now fades at whichever edge has
 * more beyond it, and only there — a fade at an edge with nothing past it
 * would cut the last item short — and when the reader's place changes it
 * scrolls the current waypoint into view, so the row follows the reading.
 */
export function NavStrip({ children, current, className = "" }: { children: ReactNode; current?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ l: false, r: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const l = el.scrollLeft > 4;
      const r = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
      setEdge((e) => (e.l === l && e.r === r ? e : { l, r }));
    };
    read();
    el.addEventListener("scroll", read, { passive: true });
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(read);
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", read);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !current) return;
    const a = el.querySelector<HTMLElement>("[aria-current]");
    if (!a) return;
    const r = a.getBoundingClientRect();
    const s = el.getBoundingClientRect();
    if (r.left < s.left + 24 || r.right > s.right - 24) {
      el.scrollTo({ left: el.scrollLeft + (r.left - s.left) - 24, behavior: "smooth" });
    }
  }, [current]);

  const mask = `linear-gradient(to right, ${edge.l ? "transparent 0, black 40px" : "black 0"}, ${edge.r ? "black calc(100% - 40px), transparent 100%" : "black 100%"})`;
  return (
    <div
      ref={ref}
      className={`aoh-navstrip mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 pb-1.5 pt-0.5 font-label text-[10px] uppercase tracking-[0.2em] sm:pb-3 sm:pt-2 ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {children}
    </div>
  );
}
