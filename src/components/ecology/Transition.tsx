import { Link } from "@tanstack/react-router";
import { CrossMark } from "@/components/CrossMark";
import { ReturnMark } from "@/components/ecology/EcologyFrame";
import { TRANSITIONS, station, type StationId } from "@/lib/ecology";

/**
 * Transition — how one station hands the reader to the next.
 *
 * Not a "next" button. The line is the reason the next station exists, in
 * the station's own words, so following the site's navigation is following
 * the argument. From the Crypt the hand-off is a return, and says so.
 */
export function Transition({ from }: { from: StationId }) {
  const t = TRANSITIONS[from];
  const next = station(t.to);
  const returning = from === "crypt";
  return (
    <section className="relative isolate border-t border-gold/30 py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold-dim">
          {returning ? "The circulation returns" : "The circulation continues"}
        </p>
        <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone/90 sm:text-3xl">{t.line}</p>
        <Link
          to={next.to}
          className="group mt-10 inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-gold/40 pb-3 transition-colors hover:border-gold"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
            {returning ? "Return to" : `Station ${next.n}`}
          </span>
          <span className="font-serif text-3xl text-bone transition-colors group-hover:text-gold sm:text-4xl">
            {next.title}
          </span>
          {returning ? <ReturnMark className="text-gold/70" /> : <CrossMark className="text-gold/70" />}
        </Link>
        {returning && (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Not to the Morphaithēr you began in. To the one this whole circulation has altered — which
            is why the layer is a spiral and not a ring.
          </p>
        )}
      </div>
    </section>
  );
}
