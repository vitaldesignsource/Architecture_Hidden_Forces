import { Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { RELATIONS, type Figure } from "@/lib/phos/figures";

/**
 * A figure set into an entry, with the legend Division XXI requires of every
 * diagram: what kind of relation it asserts, and what its geometry must not be
 * read as saying. The caution is not an afterthought — XXI · 20 holds that a
 * drawing without one "silently asserts more than it was drawn to say", and
 * that where a reader is misled by a ladder the drawing is at fault.
 */
export function FigureFrame({ f, compact = false }: { f: Figure; compact?: boolean }) {
  return (
    <figure className={compact ? "" : "my-14 border-t border-border pt-8"}>
      <figcaption className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Figure</span>
        <span className="font-serif text-xl text-bone">{f.k}</span>
        <span className="border border-gold/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
          {f.rel}
        </span>
      </figcaption>

      <Suspense
        fallback={
          <div
            aria-busy
            className="flex h-48 items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim/70"
          >
            Drawing the figure
          </div>
        }
      >
        <f.C />
      </Suspense>

      <div className="mt-8 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-dim">
            Reading — {f.rel}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{RELATIONS[f.rel]}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-dim">
            What it does not say
          </p>
          <p className="mt-2 text-sm leading-relaxed text-bone/70">{f.not}</p>
        </div>
      </div>

      {!compact && (
        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
          <Link to="/phos/tools/diagrams" search={{ f: undefined }} className="hover:text-gold">
            The Diagram Library →
          </Link>
        </p>
      )}
    </figure>
  );
}
