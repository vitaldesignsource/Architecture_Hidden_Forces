import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { EntryRows } from "@/components/phos/EntryRows";
import { AnatomyAxis } from "@/components/phos/AnatomyAxis";
import { valueSlug } from "@/lib/phos/entries";
import { STATIONS, stationByKey, stationEntries } from "@/lib/phos/tools";

/**
 * Luminous Anatomy — spirit, soul, astral field, etheric body, organism, and
 * material environment, moved through in order. Each station is a set of
 * planes from the plane facet; the entries that stand on those planes are its
 * contents. The formula the station enacts is quoted at its head, because the
 * walk is the doctrine's own: spirit illuminates, soul mediates, the astral
 * body images, the etheric body vitalises, the physical body embodies.
 */
export const Route = createFileRoute("/phos_/tools_/anatomy")({
  validateSearch: (search: Record<string, unknown>): { station?: string } => ({
    station: typeof search.station === "string" && search.station ? search.station : undefined,
  }),
  head: () => ({ meta: [{ title: "Luminous Anatomy — Phōs" }] }),
  component: Anatomy,
});

function Anatomy() {
  const { station } = Route.useSearch();
  const navigate = useNavigate();
  const cur = (station && stationByKey(station)) || STATIONS[0];
  const i = STATIONS.findIndex((s) => s.key === cur.key);
  const prev = STATIONS[i - 1] ?? null, next = STATIONS[i + 1] ?? null;
  const entries = stationEntries(cur);
  const go = (key: string) => navigate({ to: "/phos/tools/anatomy", search: { station: key } });

  return (
    <ToolFrame
      name="Luminous Anatomy"
      title={<>From spirit to the material environment, <span className="italic text-gold">in order</span></>}
      lede="Six stations on one axis. Each gathers the entries that stand on its planes, and quotes the line of the governing formula it enacts. Walk downward and the same light is followed into embodiment; walk upward and it is followed home."
      backdrop="overgrown-cistern-tower-interior"
    >
      <ToolBand>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start">
          <AnatomyAxis current={cur.key} onSelect={go} />
          <div>
            <Eyebrow>Station {i + 1} of {STATIONS.length}</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight">{cur.name}</h2>
            <p className="mt-4 border-l-2 border-gold/40 pl-5 font-serif text-xl italic leading-relaxed text-bone/85">{cur.line}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{cur.d}</p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              Planes ·{" "}
              {cur.planes.map((p, k) => (
                <span key={p}>
                  {k > 0 && " · "}
                  <Link to="/phos/browse/$facet/$value" params={{ facet: "plane", value: valueSlug(p) }} className="hover:text-gold">{p}</Link>
                </span>
              ))}
            </p>
            <div className="mt-6 flex gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
              {prev ? (
                <button type="button" onClick={() => go(prev.key)} className="border border-gold/40 px-3 py-1.5 text-bone/85 hover:border-gold hover:text-gold">↑ {prev.name}</button>
              ) : (
                <span className="border border-border px-3 py-1.5 text-muted-foreground">Source</span>
              )}
              {next ? (
                <button type="button" onClick={() => go(next.key)} className="border border-gold/40 px-3 py-1.5 text-bone/85 hover:border-gold hover:text-gold">↓ {next.name}</button>
              ) : (
                <span className="border border-border px-3 py-1.5 text-muted-foreground">Embodiment</span>
              )}
            </div>
          </div>
        </div>
      </ToolBand>

      <ToolBand>
        <Eyebrow>{entries.length} {entries.length === 1 ? "entry stands" : "entries stand"} at this station</Eyebrow>
        <div className="mt-6">
          <EntryRows entries={entries} />
        </div>
      </ToolBand>
    </ToolFrame>
  );
}
