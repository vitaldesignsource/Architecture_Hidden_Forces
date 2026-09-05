import { useState } from "react";
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
  // a chip's gloss lived in its title, which a finger never sees; a chip is now
  // a button that opens its gloss beneath the row, for a tap or a keyboard alike
  const [open, setOpen] = useState<string | null>(null);
  if (!labels.length && !confidence.length) return null;
  const base = size === "xs"
    ? "px-1.5 py-0.5 font-label text-[9px] uppercase tracking-[0.14em]"
    : "px-2 py-1 font-label text-[9px] uppercase tracking-[0.16em]";
  const glossOf = (k: string) => labelDef(k)?.gloss ?? CONFIDENCE.find((x) => x.name === k)?.gloss;
  const chip = (k: string, cls: string) => (
    <button
      key={k}
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((o) => (o === k ? null : k)); }}
      aria-expanded={open === k}
      className={`${base} border transition-colors ${cls} ${open === k ? "border-gold text-gold" : ""}`}
      title={glossOf(k)}
    >
      {k}
    </button>
  );
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {labels.map((l) => chip(l, "border-gold/40 text-gold-dim hover:border-gold/70"))}
      {confidence.map((c) => chip(c, "border-bone/25 text-bone/60 hover:border-bone/50"))}
      {open && glossOf(open) && (
        <span className="basis-full pt-1 font-sans text-xs normal-case leading-relaxed tracking-normal text-muted-foreground">
          <span className="text-gold-dim">{open}</span> — {glossOf(open)}
        </span>
      )}
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
          <dt className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim sm:pt-0.5">{f.name}</dt>
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
