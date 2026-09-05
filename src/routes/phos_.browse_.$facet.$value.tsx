import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { describe } from "@/lib/seo";
import { Backdrop } from "@/components/Backdrop";
import { ContentsPanel } from "@/components/ContentsPanel";
import { PhosHeader, PhosFooter, useScrollTop } from "@/components/phos/PhosHeader";
import { LabelChips } from "@/components/phos/Labels";
import { DIVISIONS, entriesWith, divisionLabel } from "@/lib/phos/entries";

/** Every written entry carrying one value of one facet, grouped by division. */
export const Route = createFileRoute("/phos_/browse_/$facet/$value")({
  loader: async ({ params }) => {
    // Imported here, not at the top, for the same reason as the entry route.
    const index = await import("@/lib/phos/entries");
    const f = index.FACETS.find((x) => x.key === params.facet);
    if (!f) throw notFound();
    const { value } = index.entriesWith(f.key, params.value);
    if (value === null) throw notFound();
    return { facet: f, value };
  },
  head: ({ loaderData }) => ({
    meta: describe(
      loaderData ? `${loaderData.value} — ${loaderData.facet.name} — Phōs` : "Phōs",
      loaderData ? `The entries of Phōs that name ${loaderData.value} under ${loaderData.facet.name.toLowerCase()}.` : "A facet of Phōs, the encyclopaedia of light.",
    ),
  }),
  notFoundComponent: () => (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader panel={<ContentsPanel active={null} entries={[]} groups={[]} paths={[]} volume="/phos/portal" />} />
      <div className="mx-auto max-w-3xl px-6 pt-48 pb-32">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">Not a facet value</p>
        <h1 className="mt-6 font-serif text-4xl leading-tight">Nothing is filed under that</h1>
        <Link to="/phos/browse" className="mt-10 inline-block font-label text-[10px] uppercase tracking-[0.25em] text-gold hover:underline">
          ← Browse
        </Link>
      </div>
      <PhosFooter />
    </div>
  ),
  component: FacetValue,
});

function FacetValue() {
  const params = Route.useParams();
  const { facet, value } = Route.useLoaderData();
  useScrollTop(`${params.facet}/${params.value}`);
  const { entries } = entriesWith(facet.key, params.value);
  const byDivision = DIVISIONS.map((d) => ({ d, rows: entries.filter((e) => e.division.id === d.id) })).filter((x) => x.rows.length);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader
        crumb={<><Link to="/phos/browse" className="hover:text-gold">Browse</Link> · {facet.name} · {value}</>}
        panel={<ContentsPanel active={null} entries={[]} groups={[]} paths={[]} volume="/phos/portal" />}
      />

      <header id="top" className="relative isolate overflow-hidden pb-12 pt-40 sm:pt-48">
        <Backdrop src="/bg/dark-hall-with-charted-stone-floor.webp" opacity={0.26} position="center 50%" fill />
        <div className="grain" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            <Link to="/phos/browse" className="hover:underline">Browse</Link> · {facet.name}
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{value}</h1>
          <p className="mt-4 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
            {entries.length ? `${entries.length} written ${entries.length === 1 ? "entry" : "entries"}` : "no written entries yet"}
          </p>
        </div>
      </header>

      <section className="relative isolate border-t border-border py-16">
        <div className="relative mx-auto max-w-6xl px-6">
          {byDivision.length === 0 && (
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
              The value is in the vocabulary; no written entry carries it yet. As entries are written and
              name it in their front matter, they collect here.
            </p>
          )}
          {byDivision.map(({ d, rows }) => (
            <div key={d.id} className="mt-12 first:mt-0">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                <Link to="/phos/$division" params={{ division: d.id }} className="hover:text-gold">
                  {divisionLabel(d)}{d.numeral ? ` · ${d.title}` : ""}
                </Link>
              </p>
              <div className="mt-4 space-y-px">
                {rows.map((e) => (
                  <Link
                    key={e.id}
                    to="/phos/$division/$entry"
                    params={{ division: d.id, entry: e.slug }}
                    className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-border py-4 transition-colors hover:border-gold/40"
                  >
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">{String(e.n).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-serif text-lg text-bone transition-colors group-hover:text-gold">{e.title}</span>
                        <LabelChips labels={e.meta?.labels ?? []} size="xs" />
                      </span>
                      {e.meta?.summary && <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{e.meta.summary}</span>}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <PhosFooter />
    </div>
  );
}
