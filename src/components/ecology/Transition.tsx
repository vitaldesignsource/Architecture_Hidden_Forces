import { Link } from "@tanstack/react-router";
import { CrossMark } from "@/components/CrossMark";
import { AscentMark, DescentMark, ReturnMark } from "@/components/ecology/EcologyFrame";
import { AQUIFER, TRANSITIONS, station, type StationId } from "@/lib/ecology";

/**
 * Transition — how one station hands the reader to the next.
 *
 * Not a "next" button. The line is the reason the next station exists, in
 * the station's own words, so following the site's navigation is following
 * the argument. From the Crypt the hand-off is a return, and says so; from
 * the Aquifer it is a rising, and leads to the vessel rather than back into
 * the circulation, because what comes up is judged by the body it is given.
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
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold-dim">
          {t.eyebrow ?? (returning ? "The circulation returns" : "The circulation continues")}
        </p>
        <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone/90 sm:text-3xl">{t.line}</p>
        <Link
          to={next.to}
          className="group mt-10 inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-gold/40 pb-3 transition-colors hover:border-gold"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
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

/**
 * Beneath — the way down from a station to the stratum under the circulation.
 *
 * Set where a station's own argument reaches the waterline: the Hydrology
 * when its failures leave the ring, the Crypt when its seals prove porous.
 * A descent, drawn as one, and never offered as the next station.
 */
export function Beneath({ line }: { line: string }) {
  return (
    <section className="relative isolate border-t border-border py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold-dim">Beneath this station</p>
        <p className="mt-5 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/80 sm:text-2xl">{line}</p>
        <Link
          to={AQUIFER.to}
          className="group mt-8 inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-gold/30 pb-3 transition-colors hover:border-gold"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">Descend to</span>
          <span className="font-serif text-2xl text-bone transition-colors group-hover:text-gold sm:text-3xl">{AQUIFER.title}</span>
          <DescentMark className="text-gold/70" />
        </Link>
      </div>
    </section>
  );
}
