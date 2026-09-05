import { createFileRoute, Link } from "@tanstack/react-router";
import { describe } from "@/lib/seo";
import { Backdrop } from "@/components/Backdrop";
import { ContentsPanel } from "@/components/ContentsPanel";
import { PhosHeader, PhosFooter, useScrollTop } from "@/components/phos/PhosHeader";
import { FACETS, facetValues } from "@/lib/phos/entries";

/**
 * Browse — the seven facets and every value each can take, with a count of the
 * written entries carrying it. A controlled facet shows its whole vocabulary,
 * the empty values dimmed, so the taxonomy is visible before the entries that
 * will fill it exist. A free facet shows only what is in use.
 */
export const Route = createFileRoute("/phos_/browse")({
  head: () => ({ meta: describe("Browse — Phōs", "Browse Phōs, the encyclopaedia of light, by tradition, quality, plane, operation, symbol, text or period.") }),
  component: Browse,
});

function Browse() {
  useScrollTop("browse");
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader
        crumb={<><Link to="/phos/portal" className="hover:text-gold">Portal</Link> · Browse</>}
        panel={
          <ContentsPanel
            active={null}
            entries={FACETS.map((f) => ({ n: "", id: f.key, t: f.name, d: "" }))}
            groups={[{ at: FACETS[0].key, k: "Facets" }]}
            paths={[]}
            volume="/phos/portal"
          />
        }
      />

      <header id="top" className="relative isolate overflow-hidden pb-12 pt-40 sm:pt-48">
        <Backdrop src="/bg/dark-hall-with-charted-stone-floor.webp" opacity={0.3} position="center 50%" fill />
        <div className="grain" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">Browse</p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
            Across the divisions, <span className="italic text-gold">by facet</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Each value below is a door into every entry that carries it. A count of nought is a door not
            yet opened: the vocabulary is set before the entries are, so the shape of the whole can be
            seen from the start.
          </p>
        </div>
      </header>

      {FACETS.map((f) => {
        const values = facetValues(f.key);
        return (
          <section key={f.key} id={f.key} className="relative isolate border-t border-border py-16">
            <div className="relative mx-auto max-w-6xl px-6">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                {f.name} · {f.controlled ? `${values.length} values` : "open vocabulary"}
              </p>
              {values.length ? (
                <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {values.map((v) => (
                    <li key={v.slug}>
                      <Link
                        to="/phos/browse/$facet/$value"
                        params={{ facet: f.key, value: v.slug }}
                        className={`flex h-full items-baseline justify-between gap-3 border px-3 py-2.5 font-label text-[10px] uppercase leading-[1.6] tracking-[0.15em] transition-colors hover:border-gold/60 hover:bg-bone/[0.03] hover:text-gold ${
                          v.count ? "border-gold/40 bg-bone/[0.015] text-bone/85" : "border-border text-muted-foreground opacity-70"
                        }`}
                      >
                        <span className="min-w-0">{v.value}</span>
                        <span className={`shrink-0 tabular-nums ${v.count ? "text-gold-dim" : "text-muted-foreground"}`}>{v.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  No entry names a {f.name.toLowerCase()} yet. Values appear here as entries are written.
                </p>
              )}
            </div>
          </section>
        );
      })}

      <PhosFooter />
    </div>
  );
}
