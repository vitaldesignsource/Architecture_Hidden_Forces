import { Link } from "@tanstack/react-router";
import { CrossMark } from "@/components/CrossMark";
import { AscentMark, DescentMark, ReturnMark } from "@/components/ecology/EcologyFrame";
import { PROVINCES, TRANSITIONS, station, type StationId } from "@/lib/ecology";

/**
 * Transition — how one station hands the reader to the next.
 *
 * Not a "next" button. The line is the reason the next station exists, in
 * the station's own words, so following the site's navigation is following
 * the argument. From the Crypt the hand-off is a return, and says so; from
 * the Aquifer it is a rising, and leads to the vessel rather than back into
 * the circulation, because what comes up is judged by the body it is given.
 * A province hands on in the same way — to the province its argument opens
 * into, or back to the vessel where every province's question is finally put.
 */
export function Transition({ from }: { from: StationId }) {
  const t = TRANSITIONS[from];
  const next = station(t.to);
  const returning = from === "crypt";
  const rising = from === "aquifer";
  const mark = returning ? <ReturnMark className="text-gold/70" /> : rising ? <AscentMark className="text-gold/70" /> : <CrossMark className="text-gold/70" />;
  return (
    <section className="relative isolate border-t border-gold/30 py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="font-label text-[10px] uppercase tracking-[0.35em] text-gold-dim">
          {t.eyebrow ?? (returning ? "The circulation returns" : "The circulation continues")}
        </p>
        <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone/90 sm:text-3xl">{t.line}</p>
        <Link
          to={next.to}
          className="group mt-10 inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-gold/40 pb-3 transition-colors hover:border-gold"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
            {t.label ?? (returning ? "Return to" : `Station ${next.n}`)}
          </span>
          <span className="font-serif text-3xl text-bone transition-colors group-hover:text-gold sm:text-4xl">
            {next.title}
          </span>
          {mark}
        </Link>
        {returning && (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Not to the Morphaithēr you began in. To the one this whole circulation has altered — which
            is why the layer is a spiral and not a ring.
          </p>
        )}
        {t.note && <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.note}</p>}
      </div>
    </section>
  );
}

/** How a station reaches each province: the eyebrow set over the hand-off,
 *  the verb of the link, and whether the way is a descent. */
const WAYS: Record<string, { eyebrow: string; verb: string; down?: boolean }> = {
  sea: { eyebrow: "Between this station and its effects", verb: "Widen to" },
  nursery: { eyebrow: "Before this station", verb: "Enter" },
  aquifer: { eyebrow: "Beneath this station", verb: "Descend to", down: true },
  catacombs: { eyebrow: "After this station", verb: "Go down among", down: true },
  garden: { eyebrow: "Beside this station", verb: "Walk into" },
  hungry: { eyebrow: "When this station fails", verb: "Turn to" },
};

/**
 * Province — the way from a station into a province of the ecology.
 *
 * Set where a station's own argument reaches the edge of the circulation:
 * the Hydrology when its failures leave the ring, Morphaithēr where its
 * climate proves to have a depth, the vessel where a form begins to feed.
 * Drawn as what it is — a descent, a widening, a turning — and never as the
 * next station.
 */
export function Province({ id, line }: { id: StationId; line: string }) {
  const p = station(id);
  const w = WAYS[id];
  return (
    <section className="relative isolate border-t border-border py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="font-label text-[10px] uppercase tracking-[0.35em] text-gold-dim">{w.eyebrow}</p>
        <p className="mt-5 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/80 sm:text-2xl">{line}</p>
        <Link
          to={p.to}
          className="group mt-8 inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-gold/30 pb-3 transition-colors hover:border-gold"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">{w.verb}</span>
          <span className="font-serif text-2xl text-bone transition-colors group-hover:text-gold sm:text-3xl">{p.title}</span>
          {w.down ? <DescentMark className="text-gold/70" /> : <CrossMark className="text-gold/70" />}
        </Link>
      </div>
    </section>
  );
}

/** The old name for the way beneath, kept for the page that first used it. */
export function Beneath({ line }: { line: string }) {
  return <Province id="aquifer" line={line} />;
}

/**
 * Neighbours — the other provinces, from any province. The provinces are not
 * a sequence; they are regions that touch. This strip says how each touches
 * the one the reader is on, in the region's own words, so a reader can cross
 * without going back to the landing.
 */
export function Neighbours({ of, lines }: { of: StationId; lines: Partial<Record<StationId, string>> }) {
  const rest = PROVINCES.filter((p) => p.id !== of);
  return (
    <section className="relative isolate border-t border-border py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="font-label text-[10px] uppercase tracking-[0.35em] text-gold-dim">The neighbouring provinces</p>
        <div className="mt-6 grid gap-px border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-5">
          {rest.map((p) => (
            <Link key={p.id} to={p.to} className="group flex flex-col bg-void p-5 transition-colors hover:bg-gold/5">
              <span className="font-label text-[9px] uppercase tracking-[0.25em] text-gold-dim">{p.region}</span>
              <span className="mt-3 font-serif text-lg leading-tight text-bone transition-colors group-hover:text-gold">{p.title}</span>
              <span className="mt-3 text-xs leading-relaxed text-muted-foreground">{lines[p.id] ?? p.question}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
