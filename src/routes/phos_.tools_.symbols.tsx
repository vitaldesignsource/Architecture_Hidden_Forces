import { createFileRoute, Link } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { EntryRows } from "@/components/phos/EntryRows";
import { SymbolGlyph } from "@/components/phos/SymbolGlyph";
import { SYMBOL_MEANINGS, symbolValues, withFacet } from "@/lib/phos/tools";

/**
 * Symbol Atlas — the symbol facet's whole vocabulary drawn as glyphs, each
 * with its meaning in the system's terms and the entries that carry it. A
 * symbol with no entries yet is drawn dim, not hidden: the atlas is the
 * vocabulary, and the vocabulary was set before the entries were.
 */
export const Route = createFileRoute("/phos_/tools_/symbols")({
  validateSearch: (search: Record<string, unknown>): { s?: string } => ({
    s: typeof search.s === "string" && search.s ? search.s : undefined,
  }),
  head: () => ({ meta: [{ title: "Symbol Atlas — Phōs" }] }),
  component: SymbolAtlas,
});

function SymbolAtlas() {
  const { s } = Route.useSearch();
  const values = symbolValues();
  const sel = values.find((v) => v.slug === s) ?? null;
  const entries = sel ? withFacet("symbol", sel.value) : [];
  const carried = values.filter((v) => v.count).length;

  return (
    <ToolFrame
      name="Symbol Atlas"
      title={<>The symbols of light, <span className="italic text-gold">drawn and read</span></>}
      lede={`${values.length} symbols recur through the traditions of light. Each is drawn below with its meaning in the system's own terms; choose one to see every entry that carries it. ${carried} are carried by written entries so far.`}
      backdrop="keystone"
    >
      <ToolBand>
        <Eyebrow>Vocabulary · {values.length} symbols</Eyebrow>
        <div className="mt-8 grid grid-cols-3 gap-px sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {values.map((v) => {
            const on = sel?.slug === v.slug;
            return (
              <Link
                key={v.slug}
                to="/phos/tools/symbols"
                search={{ s: on ? undefined : v.slug }}
                className={`group flex flex-col items-center gap-2 border p-4 text-center transition-colors ${
                  on ? "border-gold bg-gold/10" : v.count ? "border-gold/30 hover:border-gold/70" : "border-border opacity-55 hover:opacity-90"
                }`}
                title={SYMBOL_MEANINGS[v.value]}
              >
                <SymbolGlyph name={v.value} size={44} className={on ? "" : "opacity-85 transition-opacity group-hover:opacity-100"} />
                <span className={`font-mono text-[9px] uppercase tracking-[0.14em] ${on ? "text-gold" : "text-bone/80"}`}>{v.value}</span>
                <span className="font-mono text-[9px] text-gold-dim">{v.count}</span>
              </Link>
            );
          })}
        </div>
      </ToolBand>

      {sel && (
        <ToolBand>
          <div className="grid gap-10 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:items-start">
            <div className="flex flex-col items-start gap-4">
              <SymbolGlyph name={sel.value} size={140} />
              <Link
                to="/phos/browse/$facet/$value"
                params={{ facet: "symbol", value: sel.slug }}
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim hover:text-gold"
              >
                In browse →
              </Link>
            </div>
            <div>
              <Eyebrow>Symbol</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl leading-tight">{sel.value}</h2>
              <p className="mt-4 max-w-2xl font-serif text-xl italic leading-relaxed text-bone/85">{SYMBOL_MEANINGS[sel.value]}</p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                {entries.length ? `${entries.length} written ${entries.length === 1 ? "entry carries" : "entries carry"} it` : "no written entry carries it yet"}
              </p>
              <div className="mt-6">
                <EntryRows entries={entries} />
              </div>
            </div>
          </div>
        </ToolBand>
      )}
    </ToolFrame>
  );
}
