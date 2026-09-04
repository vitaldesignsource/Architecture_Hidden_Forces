import { useId, useState, type ReactNode } from "react";

/**
 * Deeper — the half-hour layer, folded beneath the five-minute one.
 *
 * Every station reads at three speeds: the card in the header, the sections,
 * and these. A reader who opens one is asking for the argument in full, so it
 * is prose and not a summary; a reader who does not is not shown a wall.
 */
export function Deeper({ label = "Go deeper", children }: { label?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mt-8 max-w-3xl border-l border-gold/30 pl-5">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="group flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim transition-colors hover:text-gold"
      >
        <span className="inline-block w-3 text-center transition-transform group-hover:text-gold" aria-hidden>
          {open ? "−" : "+"}
        </span>
        {label}
      </button>
      {open && (
        <div id={id} className="aoh-pop mt-5 space-y-5 text-base leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
