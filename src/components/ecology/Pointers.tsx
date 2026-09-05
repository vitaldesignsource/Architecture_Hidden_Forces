import { Fragment, type ReactNode } from "react";
import { ArrowMark } from "@/components/marks";
import { Link } from "@tanstack/react-router";
import toc from "@/lib/phos/toc.json";

/**
 * Pointers — where this layer touches the two volumes it belongs to.
 *
 * "In the Architecture" goes to a section of the treatise by its hash, so the
 * audit can prove the section exists; the § labels live here, in a shared
 * component, because a "§ N" written in a route file is a promise about that
 * route's own sections. "In the Portal" resolves entry ids through the outline
 * registry, so a title can never drift from the entry it names.
 */

/** The treatise sections this layer leans on, by their hash. */
export const ARCH = {
  terms: "§ I · The Five Terms",
  spine: "§ II · The Doctrinal Spine",
  correspondence: "§ III · Layered Correspondence",
  fourfold: "§ IV · The Fourfold Field",
  morphaither: "§ V · The Morphaithēr",
  extended: "§ VIII · The Hidden Powers",
  flywheel: "§ IX · The Psychic Flywheel",
  triad: "§ X · The Alchemical Triad",
  retentive: "§ XI · The Retentive Depth",
  laws: "§ XII · The Laws of Formation",
  subtattva: "§ XIV · The Compound Qualities",
  celestial: "§ XIX · Celestial Correspondence",
  channels: "§ XX · Nadis, Meridians, and Channels",
  centers: "§ XXI · Chakras and Centres",
  axis: "§ XXIII · Head, Heart, and Hara",
  image: "§ XXV · Image and Imagination",
  symbol: "§ XXVI · Symbol",
  mediation: "§ XXIX · Vertical Chains of Mediation",
  theurgy: "§ XXX · Greek Metaphysics and Theurgic Engineering",
  tradition: "§ XXXIII · Tradition",
  lineage: "§ XXXIV · Lineage",
  forceform: "§ XXXV · The Law of Force and Form",
  tides: "§ XXXVI · Etheric Tides",
  mansions: "§ XXXVII · Lunar Mansions and Nakshatras",
  ritual: "§ XXVII · Ritual",
  taxonomy: "§ XXVIII · Taxonomy of Forces",
  daimons: "§ XXXI · Daimons and Mediating Orders",
  rightrelation: "§ XXXIX · The Art of Right Relation",
  mortality: "§ XL · Death, Suffering, and the Cost of Form",
  heka: "§ XLVIII · Heka",
  sophia: "§ XLVI · Sophia and the Divine Feminine",
  atmosphere: "§ XLI · Morphaithēr",
  transduction: "§ XLIII · The Fourfold Veil",
  relation: "§ XLIV · The Law of Right Relation",
  matter: "§ XLV · Spiritualising Matter",
  transformation: "§ XLVII · Transformation",
  etheric: "§ L · The Etheric Body",
  astral: "§ LI · The Astral and Psychic Layers",
  soul: "§ LII · Soul and Interior Life",
} as const;
export type ArchId = keyof typeof ARCH;

const PORTAL = new Map(
  toc.divisions.flatMap((d) => d.entries.map((e) => [e.id, { ...e, division: d.id, numeral: d.numeral || "Portal" }])),
);
function ref(id: string) {
  const r = PORTAL.get(id);
  if (!r) throw new Error(`ecology: "${id}" is not a registered entry`);
  return r;
}

/** An inline link into the treatise, for prose. */
export function Arch({ id, children, className = "" }: { id: ArchId; children?: ReactNode; className?: string }) {
  return (
    <Link to="/" hash={id} className={`underline-offset-4 transition-colors hover:text-gold hover:underline ${className}`} title={ARCH[id]}>
      {children ?? ARCH[id]}
    </Link>
  );
}

/** An inline link into the Portal, for prose. */
export function Entry({ id, children, className = "" }: { id: string; children?: ReactNode; className?: string }) {
  const r = ref(id);
  return (
    <Link to="/phos/$division/$entry" params={{ division: r.division, entry: r.slug }}
          className={`underline-offset-4 transition-colors hover:text-gold hover:underline ${className}`} title={r.title}>
      {children ?? r.title}
    </Link>
  );
}

/** The block at the foot of a station: what it rests on in both volumes. */
export function Pointers({ arch = [], portal = [] }: { arch?: ArchId[]; portal?: string[] }) {
  if (!arch.length && !portal.length) return null;
  return (
    <div className="mt-16 grid gap-10 border-t border-border pt-8 lg:grid-cols-2">
      {arch.length > 0 && (
        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">In the Architecture</p>
          <ul className="mt-4 space-y-2">
            {arch.map((id) => (
              <li key={id}>
                <Link to="/" hash={id} className="group grid grid-cols-[4.2rem_1fr] gap-3 text-sm leading-relaxed text-bone/80 transition-colors hover:text-gold">
                  <span className="whitespace-nowrap font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{ARCH[id].split(" · ")[0]}</span>
                  <span>{ARCH[id].split(" · ")[1]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {portal.length > 0 && (
        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">In the Portal</p>
          <ul className="mt-4 space-y-2">
            {portal.map((id) => {
              const r = ref(id);
              return (
                <li key={id}>
                  <Link to="/phos/$division/$entry" params={{ division: r.division, entry: r.slug }}
                        className="group grid grid-cols-[4.2rem_1fr] gap-3 text-sm leading-relaxed text-bone/80 transition-colors hover:text-gold">
                    <span className="whitespace-nowrap font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{r.numeral} {r.n}</span>
                    <span>{r.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Ordered, parallel items — the layer's lists, set the way the treatise sets them. */
export function Items({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-8 max-w-4xl">
      {items.map(([a, b]) => (
        <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-4 sm:grid-cols-[11rem_1fr] sm:gap-5">
          <span className="font-serif text-lg text-bone/90">{a}</span>
          <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
        </div>
      ))}
    </div>
  );
}

/** A run of short phrases with a mark between, for sequences read across. */
export function Sequence({ steps, sep = <ArrowMark className="text-gold/50" /> }: { steps: string[]; sep?: ReactNode }) {
  return (
    <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-label text-[11px] uppercase tracking-[0.18em] text-bone/85">
      {steps.map((s, i) => (
        <Fragment key={s + i}>
          {i > 0 && <span className="text-gold/50" aria-hidden>{sep}</span>}
          <span>{s}</span>
        </Fragment>
      ))}
    </p>
  );
}
