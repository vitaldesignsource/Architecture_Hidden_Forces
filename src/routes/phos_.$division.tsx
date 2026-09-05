import { lazy, Suspense } from "react";
import { ArrowMark, BackMark } from "@/components/marks";
import { describe } from "@/lib/seo";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Backdrop } from "@/components/Backdrop";
import { SectionGlyph } from "@/components/SectionGlyph";
import { ContentsPanel } from "@/components/ContentsPanel";
import { PhosHeader, PhosFooter, useScrollTop } from "@/components/phos/PhosHeader";
import { LabelChips } from "@/components/phos/Labels";
import { EntryBody } from "@/components/phos/EntryBody";
import { Missing } from "@/components/phos/Missing";
import { useStepKeys, KeyHint } from "@/components/phos/StepKeys";
import { ATLAS_DIVISIONS } from "@/lib/phos/atlas-gate";

const DivisionAtlas = lazy(() => import("@/components/phos/DivisionAtlas").then((m) => ({ default: m.DivisionAtlas })));
import type { Entry as Row } from "@/lib/contents";
import { division, entriesOf, neighbourDivisions, progress, divisionLabel, valueSlug } from "@/lib/phos/entries";

/**
 * A division of the encyclopaedia: its entries in order, grouped where the
 * outline groups them, the written ones live and the rest listed as
 * forthcoming. A division may open with an introduction (`_intro.md` in its
 * content directory), which also supplies its backdrop.
 */
export const Route = createFileRoute("/phos_/$division")({
  loader: async ({ params }) => {
    // Imported here, not at the top, so the index of every entry travels with
    // the Portal's pages rather than with the site's first script.
    const index = await import("@/lib/phos/entries");
    const d = index.division(params.division);
    if (!d || d.id === "portal") throw notFound();
    const [intro, coda, groupIntros, groupCodas] = await Promise.all([
      index.loadIntro(d.id), index.loadCoda(d.id), index.loadGroupIntros(d.id), index.loadGroupCodas(d.id),
    ]);
    return {
      intro, coda, groupIntros, groupCodas,
      title: `${index.divisionLabel(d)} — ${d.title} — Phōs`,
      description: intro?.meta.summary ?? `${d.title}: the entries of ${index.divisionLabel(d)} of Phōs, the encyclopaedia of light.`,
    };
  },
  head: ({ loaderData }) => ({ meta: describe(loaderData?.title ?? "Phōs", loaderData?.description ?? "A division of Phōs, the encyclopaedia of light.") }),
  notFoundComponent: () => <Missing what="division" />,
  component: DivisionPage,
});

function DivisionPage() {
  const { division: id } = Route.useParams();
  const { intro, coda, groupIntros, groupCodas } = Route.useLoaderData();
  useScrollTop(id);
  const d = division(id)!;
  const entries = entriesOf(d.id);
  const p = progress(d.id);
  const { prev, next } = neighbourDivisions(d);
  const navigate = useNavigate();
  useStepKeys({
    prev: () => prev && prev.id !== "portal"
      ? navigate({ to: "/phos/$division", params: { division: prev.id } })
      : navigate({ to: "/phos/portal" }),
    next: next ? () => navigate({ to: "/phos/$division", params: { division: next.id } }) : null,
  });
  const rows: Row[] = entries.map((e) => ({
    n: String(e.n), id: e.id, t: e.title, d: e.meta?.summary ?? "", route: { division: d.id, entry: e.slug },
  }));
  const groups = [...new Set(entries.map((e) => e.group).filter(Boolean))] as string[];
  const panelGroups = groups.length
    ? groups.map((g) => ({ at: entries.find((e) => e.group === g)!.id, k: g }))
    : [{ at: entries[0]?.id ?? "", k: divisionLabel(d) }];

  const backdrop = intro?.meta.backdrop ? `/bg/${intro.meta.backdrop}.webp` : "/bg/dark-hall-with-charted-stone-floor.webp";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader
        crumb={<><Link to="/phos/portal" className="hover:text-gold">Portal</Link> · {divisionLabel(d)}</>}
        panel={<ContentsPanel active={null} entries={rows} groups={panelGroups} paths={[]} volume="/phos/portal" />}
      />

      <header id="top" className="relative isolate overflow-hidden pb-16 pt-40 sm:pt-48">
        <Backdrop src={backdrop} opacity={0.3} position={intro?.meta.position ?? "center 50%"} fill />
        <div className="grain" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
            {divisionLabel(d)} · {p.total} entries · {p.written ? `${p.written} written` : "forthcoming"}
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{d.title}</h1>
          {d.note && <p className="mt-4 font-serif text-lg italic text-gold-dim">{d.note}</p>}
          {intro && <EntryBody body={intro.body} className="mt-2" />}
        </div>
      </header>

      {ATLAS_DIVISIONS.has(d.id) && (
        <Suspense fallback={null}>
          <DivisionAtlas division={d.id} />
        </Suspense>
      )}

      <section className="relative isolate border-t border-border py-16">
        <SectionGlyph delay={-260} />
        <div className="relative mx-auto max-w-6xl px-6">
          {(groups.length ? groups : [null]).map((g) => (
            <div key={g ?? "all"} className={g ? "mt-14 first:mt-0" : ""}>
              {g && (
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">{g}</p>
              )}
              {g && groupIntros[valueSlug(g)] && (
                <EntryBody body={groupIntros[valueSlug(g)]} className="mt-4 max-w-3xl" />
              )}
              <div className="mt-4 space-y-px">
                {entries.filter((e) => e.group === g).map((e) => (
                  <Link
                    key={e.id}
                    to="/phos/$division/$entry"
                    params={{ division: d.id, entry: e.slug }}
                    className={`group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-border py-4 transition-colors hover:border-gold/40 ${
                      e.written ? "" : "opacity-60"
                    }`}
                  >
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                      {String(e.n).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-serif text-lg text-bone transition-colors group-hover:text-gold">{e.title}</span>
                        {e.written ? (
                          <LabelChips labels={e.meta?.labels ?? []} size="xs" />
                        ) : (
                          <span className="font-label text-[9px] uppercase tracking-[0.2em] text-muted-foreground">forthcoming</span>
                        )}
                      </span>
                      {e.meta?.summary && (
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{e.meta.summary}</span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
              {g && groupCodas[valueSlug(g)] && (
                <EntryBody body={groupCodas[valueSlug(g)]} className="mt-8 max-w-3xl" />
              )}
            </div>
          ))}

          {coda && (
            <div className="mt-20 border-t border-border pt-4">
              <EntryBody body={coda} />
            </div>
          )}

          <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
            {prev && prev.id !== "portal" ? (
              <Link to="/phos/$division" params={{ division: prev.id }} className="group" aria-keyshortcuts="ArrowLeft [">
                <span className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim"><BackMark /> {divisionLabel(prev)}</span>
                <span className="mt-1 block font-serif text-lg text-bone/85 transition-colors group-hover:text-gold">{prev.title}</span>
              </Link>
            ) : (
              <Link to="/phos/portal" className="group" aria-keyshortcuts="ArrowLeft [">
                <span className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim"><BackMark /> The Portal</span>
                <span className="mt-1 block font-serif text-lg text-bone/85 transition-colors group-hover:text-gold">The Encyclopaedia of Light</span>
              </Link>
            )}
            {next && (
              <Link to="/phos/$division" params={{ division: next.id }} className="group sm:text-right" aria-keyshortcuts="ArrowRight ]">
                <span className="font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">{divisionLabel(next)} <ArrowMark /></span>
                <span className="mt-1 block font-serif text-lg text-bone/85 transition-colors group-hover:text-gold">{next.title}</span>
              </Link>
            )}
          </div>
          <KeyHint between="divisions" />
        </div>
      </section>

      <PhosFooter />
    </div>
  );
}
