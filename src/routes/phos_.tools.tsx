import { createFileRoute, Link } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { TOOLS } from "@/lib/phos/vocab";
import { TOOL_ROUTES } from "@/lib/phos/tool-routes";

/**
 * Instruments — the views over the facets the outline promised, and the ones
 * the encyclopaedia grew once it was whole. Each live one is a page that asks
 * one question of the whole encyclopaedia; the rest wait for the entries that
 * would feed them.
 */
export const Route = createFileRoute("/phos_/tools")({
  head: () => ({ meta: [{ title: "Instruments — Phōs" }] }),
  component: Tools,
});

function Tools() {
  return (
    <ToolFrame
      eyebrow="Portal"
      title={<>Ten ways to ask the encyclopaedia a <span className="italic text-gold">question</span></>}
      lede="An encyclopaedia is a long collection of articles until it can be asked questions. Each instrument reads the same facets every entry carries and answers one question with them. Seven are live; three wait on the facets that would feed them — qualities and texts — being carried by enough entries to answer with."
      backdrop="mountain-observatory-above-cloud"
      position="center 40%"
    >
      <ToolBand>
        <Eyebrow>Instruments · seven of ten live</Eyebrow>
        <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => {
            const to = TOOL_ROUTES[t.k];
            return to ? (
              <Link key={t.k} to={to} className="group border border-gold/40 p-6 transition-colors hover:border-gold hover:bg-gold/5">
                <p className="font-serif text-2xl text-bone transition-colors group-hover:text-gold">{t.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                <p className="mt-4 font-label text-[9px] uppercase tracking-[0.2em] text-gold">Open →</p>
              </Link>
            ) : (
              <div key={t.k} className="border border-border p-6 opacity-70">
                <p className="font-serif text-2xl text-bone">{t.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                <p className="mt-4 font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">Forthcoming</p>
              </div>
            );
          })}
        </div>
        <div className="mt-14 border-t border-border pt-10">
          <Eyebrow>Beside the ten · a register</Eyebrow>
          <Link
            to="/phos/tools/beings"
            className="group mt-6 block border border-gold/40 p-6 transition-colors hover:border-gold hover:bg-gold/5 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="shrink-0 font-serif text-3xl text-gold" aria-hidden>𒀭 𓊹 מַלְאָךְ</span>
              <span>
                <span className="block font-serif text-2xl text-bone transition-colors group-hover:text-gold">
                  The Register of Beings
                </span>
                <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                  A hundred and sixty gods, messengers, daimons, adversaries, ancestors and
                  personified powers, each in the script it was written in and classed as its own
                  tradition classes it — drawn as a field so you can see at a glance which
                  tradition&rsquo;s middle is crowded and which is bare.
                </span>
              </span>
            </div>
            <p className="mt-5 font-label text-[9px] uppercase tracking-[0.2em] text-gold">Open →</p>
          </Link>
        </div>

        <div className="mt-10 border-t border-border pt-10">
          <Eyebrow>Beside the ten · a demonstration</Eyebrow>
          <Link
            to="/phos/tools/flashing"
            className="group mt-6 block border border-gold/40 p-6 transition-colors hover:border-gold hover:bg-gold/5 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="flex h-14 w-28 shrink-0 overflow-hidden border border-bone/15" aria-hidden>
                {["#d0201f", "#0f9d58", "#1f4fb5", "#ef7d18", "#f2c230", "#7b3fa0"].map((c) => (
                  <span key={c} className="flex-1" style={{ background: c }} />
                ))}
              </span>
              <span>
                <span className="block font-serif text-2xl text-bone transition-colors group-hover:text-gold">
                  Flashing Colours
                </span>
                <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                  The Golden Dawn&rsquo;s four colour scales, the complementary pairs they painted
                  their implements in, and the demonstrations that show what the eye is actually
                  doing at the edge between them.
                </span>
              </span>
            </div>
            <p className="mt-5 font-label text-[9px] uppercase tracking-[0.2em] text-gold">Open →</p>
          </Link>
        </div>

        <p className="mt-12 max-w-3xl border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
          The deepest thing the instruments show is that light is not higher when brighter. Its signature is
          its unity, purity, coherence, stability, medium, purpose, formative effect, and truthfulness.
        </p>
      </ToolBand>
    </ToolFrame>
  );
}
