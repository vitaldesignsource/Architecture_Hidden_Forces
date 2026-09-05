import { describe } from "@/lib/seo";
import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { EntryRows } from "@/components/phos/EntryRows";
import { ConceptGraph } from "@/components/phos/ConceptGraph";
import { entryById } from "@/lib/phos/entries";
import { TRACE_SEEDS, graphAround, searchTitles } from "@/lib/phos/tools";

/**
 * Trace a Concept — stand at an entry and see what it is related to, then
 * step to one of those and see what it is related to, keeping the path. The
 * `related` lists in the front matter are the edges; the instrument only
 * draws them. Where a relation names an entry not yet written, the graph shows
 * the gap rather than closing it.
 */
type Search = { at?: string; path?: string };

export const Route = createFileRoute("/phos_/tools_/trace")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    at: typeof search.at === "string" && search.at ? search.at : undefined,
    path: typeof search.path === "string" && search.path ? search.path : undefined,
  }),
  head: () => ({ meta: describe("Trace a Concept — Phōs", "Trace a Concept: follow an entry's related entries through Phōs, with a breadcrumb of the path taken.") }),
  component: Trace,
});

function Trace() {
  const { at, path } = Route.useSearch();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const id = at && entryById(at)?.written ? at : "vii-6";
  const graph = graphAround(id);
  const trail = (path ? path.split(",") : []).map(entryById).filter((e): e is NonNullable<typeof e> => !!e);
  const hits = searchTitles(q);

  const go = (next: string, keep = true) =>
    navigate({
      to: "/phos/tools/trace",
      search: { at: next, path: keep && graph ? [...trail.map((e) => e.id), graph.centre.id].slice(-12).join(",") || undefined : undefined },
    });

  const ring1 = graph ? graph.nodes.filter((n) => n.ring === 1).map((n) => n.e) : [];
  const ring2 = graph ? graph.nodes.filter((n) => n.ring === 2).map((n) => n.e) : [];

  return (
    <ToolFrame
      name="Trace a Concept"
      title={<>Follow a concept through its <span className="italic text-gold">relations</span></>}
      lede="Every entry names the entries it is related to. Stand at one and the instrument draws that neighbourhood: what it names in the first ring, what those name in the second. Step to any written entry to stand there instead; the path you have walked is kept above the map."
      backdrop="dew-covered-web-in-dark-woodland"
    >
      <ToolBand>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <div>
            <Eyebrow>Begin from</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {TRACE_SEEDS.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => go(e.id, false)}
                  className={`border px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.15em] transition-colors ${
                    graph?.centre.id === e.id ? "border-gold bg-gold/10 text-gold" : "border-gold/40 text-bone/85 hover:border-gold/70 hover:text-gold"
                  }`}
                >
                  {e.title}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Or find an entry</Eyebrow>
            <input
              value={q}
              onChange={(ev) => setQ(ev.target.value)}
              placeholder="Search titles…"
              className="mt-4 w-full border border-border bg-transparent px-3 py-2 font-sans text-sm text-bone placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none"
            />
            {q.trim() && (
              <div className="mt-2 border border-border">
                {hits.length ? (
                  hits.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      disabled={!e.written}
                      onClick={() => { go(e.id, false); setQ(""); }}
                      className="flex w-full items-baseline gap-3 border-b border-border px-3 py-2 text-left last:border-b-0 hover:bg-gold/5 disabled:opacity-50"
                    >
                      <span className="font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">{e.division.numeral || "P"}.{e.n}</span>
                      <span className="font-serif text-base text-bone">{e.title}</span>
                      {!e.written && <span className="font-label text-[8px] uppercase tracking-[0.14em] text-muted-foreground">forthcoming</span>}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-muted-foreground">No title contains that.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </ToolBand>

      {graph && (
        <ToolBand>
          {trail.length > 0 && (
            <p className="mb-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              <span className="text-muted-foreground">Path</span>
              {trail.map((e, i) => (
                <span key={`${e.id}-${i}`} className="contents">
                  <Link
                    to="/phos/tools/trace"
                    search={{ at: e.id, path: trail.slice(0, i).map((x) => x.id).join(",") || undefined }}
                    className="hover:text-gold"
                  >
                    {e.title}
                  </Link>
                  <span className="text-muted-foreground">→</span>
                </span>
              ))}
              <span className="text-gold">{graph.centre.title}</span>
            </p>
          )}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:items-start">
            <ConceptGraph graph={graph} onCentre={(next) => go(next)} />
            <div>
              <Eyebrow>Standing at</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl leading-tight">
                <Link to="/phos/$division/$entry" params={{ division: graph.centre.division.id, entry: graph.centre.slug }} className="hover:text-gold">
                  {graph.centre.title}
                </Link>
              </h2>
              {graph.centre.meta?.summary && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{graph.centre.meta.summary}</p>}
              <p className="mt-6 font-label text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                {ring1.length} related · {ring2.length} beyond them · {[...ring1, ...ring2].filter((e) => !e.written).length} not yet written
              </p>
              <div className="mt-6">
                <EntryRows entries={ring1} grouped={false} />
              </div>
            </div>
          </div>
        </ToolBand>
      )}
    </ToolFrame>
  );
}
