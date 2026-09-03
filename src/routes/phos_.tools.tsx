import { createFileRoute, Link } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { TOOLS } from "@/lib/phos/entries";
import { TOOL_ROUTES } from "@/lib/phos/tools";

/**
 * Instruments — the seven views over the facets the outline promised, four of
 * them live. Each live one is a page that asks one question of the whole
 * encyclopaedia; the other three wait for the entries that would feed them.
 */
export const Route = createFileRoute("/phos_/tools")({
  head: () => ({ meta: [{ title: "Instruments — Phōs" }] }),
  component: Tools,
});

function Tools() {
  return (
    <ToolFrame
      eyebrow="Portal"
      title={<>Seven ways to ask the encyclopaedia a <span className="italic text-gold">question</span></>}
      lede="An encyclopaedia is a long collection of articles until it can be asked questions. Each instrument reads the same facets every entry carries and answers one question with them. Four are live; three wait on the facets that would feed them — qualities and texts — being carried by enough entries to answer with."
      backdrop="observatory"
      position="center 40%"
    >
      <ToolBand>
        <Eyebrow>Instruments · four of seven live</Eyebrow>
        <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => {
            const to = TOOL_ROUTES[t.k];
            return to ? (
              <Link key={t.k} to={to} className="group border border-gold/40 p-6 transition-colors hover:border-gold hover:bg-gold/5">
                <p className="font-serif text-2xl text-bone transition-colors group-hover:text-gold">{t.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Open →</p>
              </Link>
            ) : (
              <div key={t.k} className="border border-border p-6 opacity-70">
                <p className="font-serif text-2xl text-bone">{t.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">Forthcoming</p>
              </div>
            );
          })}
        </div>
        <p className="mt-12 max-w-3xl border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
          The deepest thing the instruments show is that light is not higher when brighter. Its signature is
          its unity, purity, coherence, stability, medium, purpose, formative effect, and truthfulness.
        </p>
      </ToolBand>
    </ToolFrame>
  );
}
