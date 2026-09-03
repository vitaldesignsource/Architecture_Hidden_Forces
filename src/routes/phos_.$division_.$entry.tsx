import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Backdrop } from "@/components/Backdrop";
import { SectionGlyph } from "@/components/SectionGlyph";
import { ContentsPanel } from "@/components/ContentsPanel";
import { PhosHeader, PhosFooter, useScrollTop } from "@/components/phos/PhosHeader";
import { LabelChips, FacetLines } from "@/components/phos/Labels";
import { EntryBody } from "@/components/phos/EntryBody";
import { Missing } from "@/components/phos/Missing";
import type { Entry as Row } from "@/lib/contents";
import { entry, entriesOf, entryById, introMeta, loadBody, neighbours, divisionLabel } from "@/lib/phos/entries";

/**
 * One entry of the encyclopaedia. Registered but unwritten entries have a page
 * too — it says the entry is forthcoming and offers the division — so a
 * cross-reference never lands on nothing, and a reader can see the shape of
 * what is coming.
 */
export const Route = createFileRoute("/phos_/$division_/$entry")({
  loader: async ({ params }) => {
    const e = entry(params.division, params.entry);
    if (!e) throw notFound();
    return { body: e.written ? await loadBody(e) : null };
  },
  head: ({ params }) => {
    const e = entry(params.division, params.entry);
    return { meta: [{ title: e ? `${e.title} — ${divisionLabel(e.division)} — Phōs` : "Phōs" }] };
  },
  notFoundComponent: () => <Missing what="entry" />,
  component: EntryPage,
});

function EntryPage() {
  const params = Route.useParams();
  const { body } = Route.useLoaderData();
  useScrollTop(`${params.division}/${params.entry}`);
  const e = entry(params.division, params.entry)!;
  const d = e.division;
  const siblings = entriesOf(d.id);
  const { prev, next } = neighbours(e);
  const rows: Row[] = siblings.map((s) => ({
    n: String(s.n), id: s.id, t: s.title, d: s.meta?.summary ?? "", route: { division: d.id, entry: s.slug },
  }));
  const groups = [...new Set(siblings.map((s) => s.group).filter(Boolean))] as string[];
  const panelGroups = groups.length
    ? groups.map((g) => ({ at: siblings.find((s) => s.group === g)!.id, k: g }))
    : [{ at: siblings[0]?.id ?? "", k: divisionLabel(d) }];

  const meta = e.meta;
  const intro = introMeta(d.id);
  const bd = meta?.backdrop || intro?.backdrop || null;
  const related = (meta?.related ?? []).map(entryById).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader
        crumb={
          <>
            <Link to="/phos/portal" className="hover:text-gold">Portal</Link> ·{" "}
            <Link to="/phos/$division" params={{ division: d.id }} className="hover:text-gold">{divisionLabel(d)}</Link>{" "}
            · {String(e.n).padStart(2, "0")}
          </>
        }
        panel={<ContentsPanel active={e.id} entries={rows} groups={panelGroups} paths={[]} volume="/phos/portal" />}
      />

      <article>
        <header id="top" className="relative isolate overflow-hidden pb-12 pt-40 sm:pt-48">
          {bd && <Backdrop src={`/bg/${bd}.webp`} opacity={0.3} position={meta?.position ?? "center 50%"} fill />}
          <div className="grain" />
          <div className="relative mx-auto max-w-6xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              <Link to="/phos/$division" params={{ division: d.id }} className="hover:underline">
                {divisionLabel(d)}
              </Link>{" "}
              · Entry {e.n} of {siblings.length}
              {e.group && <span className="text-gold-dim"> · {e.group}</span>}
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{e.title}</h1>
            {meta && (
              <div className="mt-6">
                <LabelChips labels={meta.labels} />
              </div>
            )}
            {meta?.epigraph && (
              <blockquote className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
                <p className="font-serif text-2xl leading-relaxed text-bone/90">{meta.epigraph}</p>
                {meta.attribution && (
                  <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                    — {meta.attribution}
                  </footer>
                )}
              </blockquote>
            )}
          </div>
        </header>

        <section className="relative isolate border-t border-border py-16">
          <SectionGlyph delay={-(e.n * 37) % 700} />
          <div className="relative mx-auto max-w-6xl px-6">
            {body !== null ? (
              <EntryBody body={body} />
            ) : (
              <div className="max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">Forthcoming</p>
                <p className="mt-6 font-serif text-2xl leading-relaxed text-bone/90">
                  This entry is registered in the outline and not yet written.
                </p>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  The encyclopaedia lists what it will hold before it holds it, so that its shape can be
                  seen whole and every cross-reference has somewhere to land. What is not yet written is
                  marked as such rather than filled in.
                </p>
              </div>
            )}

            {meta && Object.values(meta.facets).some((v) => v.length) && (
              <div className="mt-16 border-t border-border pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">Facets</p>
                <div className="mt-4">
                  <FacetLines facets={meta.facets} />
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div className="mt-16 border-t border-border pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">Related entries</p>
                <div className="mt-4 grid gap-x-12 gap-y-px lg:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to="/phos/$division/$entry"
                      params={{ division: r.division.id, entry: r.slug }}
                      className={`group grid grid-cols-[6rem_1fr] items-baseline gap-4 border-b border-border py-4 transition-colors hover:border-gold/40 ${r.written ? "" : "opacity-60"}`}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                        {r.division.numeral || "Portal"} · {String(r.n).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-serif text-lg text-bone transition-colors group-hover:text-gold">{r.title}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                          {r.written ? r.meta?.summary : "forthcoming"}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {prev ? (
                <Link to="/phos/$division/$entry" params={{ division: d.id, entry: prev.slug }} className="group">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">← {String(prev.n).padStart(2, "0")}</span>
                  <span className="mt-1 block font-serif text-lg text-bone/85 transition-colors group-hover:text-gold">{prev.title}</span>
                </Link>
              ) : (
                <Link to="/phos/$division" params={{ division: d.id }} className="group">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">← {divisionLabel(d)}</span>
                  <span className="mt-1 block font-serif text-lg text-bone/85 transition-colors group-hover:text-gold">{d.title}</span>
                </Link>
              )}
              {next ? (
                <Link to="/phos/$division/$entry" params={{ division: d.id, entry: next.slug }} className="group sm:text-right">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{String(next.n).padStart(2, "0")} →</span>
                  <span className="mt-1 block font-serif text-lg text-bone/85 transition-colors group-hover:text-gold">{next.title}</span>
                </Link>
              ) : (
                <Link to="/phos/$division" params={{ division: d.id }} className="group sm:text-right">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">{divisionLabel(d)} →</span>
                  <span className="mt-1 block font-serif text-lg text-bone/85 transition-colors group-hover:text-gold">Back to the division</span>
                </Link>
              )}
            </div>
          </div>
        </section>
      </article>

      <PhosFooter />
    </div>
  );
}
