import { Link } from "@tanstack/react-router";
import { CONFIDENCE, FACETS, labelDef, valueSlug } from "@/lib/phos/vocab";

/**
 * The evidence labels an entry carries, as chips. Every entry has at least one,
 * so a reader always knows what kind of claim they are reading before they
 * read it — which is the whole point of the labels.
 */
export function LabelChips({
  labels,
  confidence = [],
  size = "sm",
}: {
  labels: string[];
  /** The degree-of-confidence markers, set in bone rather than gold so a
   *  reader can tell the kind of claim from how firmly it is held. */
  confidence?: string[];
  size?: "sm" | "xs";
}) {
  if (!labels.length && !confidence.length) return null;
  const base = size === "xs"
    ? "px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em]"
    : "px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em]";
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {labels.map((l) => (
        <span key={l} className={`${base} border border-gold/40 text-gold-dim`} title={labelDef(l)?.gloss}>
          {l}
        </span>
      ))}
      {confidence.map((c) => (
        <span key={c} className={`${base} border border-bone/25 text-bone/60`} title={CONFIDENCE.find((x) => x.name === c)?.gloss}>
          {c}
        </span>
      ))}
    </span>
  );
}

/** "Tradition · Neoplatonic, Israelite" lines, each value a link into browse. */
export function FacetLines({ facets }: { facets: Record<string, string[]> }) {
  const rows = FACETS.filter((f) => (facets[f.key] ?? []).length);
  if (!rows.length) return null;
  return (
    <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-[auto_1fr]">
      {rows.map((f) => (
        <div key={f.key} className="contents">
          <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim sm:pt-0.5">{f.name}</dt>
          <dd className="text-sm leading-relaxed text-bone/80">
            {facets[f.key].map((v, i) => (
              <span key={v}>
                {i > 0 && <span className="text-muted-foreground">, </span>}
                <Link
                  to="/phos/browse/$facet/$value"
                  params={{ facet: f.key, value: valueSlug(v) }}
                  className="underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  {v}
                </Link>
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
