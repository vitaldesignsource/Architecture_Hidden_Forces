import { useState } from "react";
import { BackMark } from "@/components/marks";
import { describe } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ToolFrame, ToolBand, Eyebrow } from "@/components/phos/ToolFrame";
import { FigureFrame } from "@/components/phos/FigureFrame";
import { FIGURES, RELATIONS, projections, type Figure, type Relation } from "@/lib/phos/figures";

/**
 * The Diagram Library — the instrument Division XXI describes and the
 * encyclopaedia had not built.
 *
 * XXI · 20 asks two things of a library of diagrams, and both are structural
 * rather than decorative. Every figure must declare the kind of relation it
 * asserts, because a vertical drawing may mean priority rather than height and
 * a reader misled by a ladder has been failed by the drawing. And a teaching
 * drawn only once hardens into its own geometry, so where two figures show one
 * teaching they belong together as alternative projections of it.
 *
 * So this page is organised by those two claims: the projections first, where
 * switching geometry is the whole point, then every figure by the relation it
 * asserts. Each is the live, interactive figure, not a picture of one.
 */
const slug = (k: string) => k.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const Route = createFileRoute("/phos_/tools_/diagrams")({
  validateSearch: (search: Record<string, unknown>): { f?: string } => ({
    f: typeof search.f === "string" && search.f ? search.f : undefined,
  }),
  head: () => ({ meta: describe("Diagram Library — Phōs", "The Diagram Library: every drawing in the three volumes of The Architecture of Hidden Forces, with the page each belongs to.") }),
  component: DiagramLibrary,
});

const ORDER: Relation[] = ["spatial", "hierarchical", "cyclical", "causal", "analogical", "symbolic"];

function DiagramLibrary() {
  const { f } = Route.useSearch();
  const sel = FIGURES.find((x) => slug(x.k) === f) ?? null;
  const pairs = projections();

  return (
    <ToolFrame
      name="Diagram Library"
      title={<>Every figure, and what its geometry <span className="italic text-gold">does not say</span></>}
      lede="A diagram asserts a kind of relation before it asserts anything else, and a reader who takes a ladder for a map of heights has been misled by the drawing rather than by the doctrine. Every figure here declares which of the six relations it draws and what it must not be read as claiming. Where one teaching needs more than one geometry, its drawings are gathered as projections of a single subject."
      backdrop="cutaway-of-tiered-stone-tower"
      position="center 45%"
    >
      {sel && (
        <ToolBand>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <Eyebrow>Figure · {sel.rel}</Eyebrow>
            <Link to="/phos/tools/diagrams" search={{ f: undefined }}
                  className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dim hover:text-gold">
              <BackMark /> all figures
            </Link>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">{sel.d}</p>
          <div className="mt-10"><FigureFrame f={sel} compact /></div>
        </ToolBand>
      )}

      {/* ── the projections: one teaching, more than one geometry ───────── */}
      <ToolBand>
        <Eyebrow>Several drawings for one teaching · {pairs.length} subjects</Eyebrow>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          A ladder reveals gradation; a web reveals reciprocal participation; a cycle reveals
          procession and return. No single geometry should be mistaken for the reality itself, so
          where a teaching is drawn twice, both drawings are kept and the reader switches between
          them. What changes when you switch is not the subject but the claim the picture makes
          about it.
        </p>
        <div className="mt-10 space-y-14">
          {pairs.map((p) => (
            <Projection key={p.teaching} teaching={p.teaching} figures={p.figures} />
          ))}
        </div>
      </ToolBand>

      {/* ── the whole library, by the relation each figure asserts ──────── */}
      <ToolBand>
        <Eyebrow>The library · {FIGURES.length} figures</Eyebrow>
        <div className="mt-10 space-y-12">
          {ORDER.map((rel) => {
            const rows = FIGURES.filter((x) => x.rel === rel);
            return (
              <div key={rel}>
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                  {rel} · {rows.length}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-bone/70">{RELATIONS[rel]}</p>
                <div className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
                  {rows.map((x) => (
                    <Link key={x.k} to="/phos/tools/diagrams" search={{ f: slug(x.k) }}
                          className="group border border-border p-5 transition-colors hover:border-gold/60 hover:bg-gold/5">
                      <p className="font-serif text-lg text-bone transition-colors group-hover:text-gold">{x.k}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                      {x.teaching && (
                        <p className="mt-3 font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
                          {x.teaching}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ToolBand>
    </ToolFrame>
  );
}

/** One teaching, its geometries, and a switch between them. */
function Projection({ teaching, figures }: { teaching: string; figures: Figure[] }) {
  const [i, setI] = useState(0);
  const cur = figures[i];
  return (
    <div className="border-t border-border pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-serif text-2xl text-bone">{teaching}</p>
        <div className="flex flex-wrap gap-2">
          {figures.map((x, n) => (
            <button key={x.k} onClick={() => setI(n)} aria-pressed={n === i}
              title={`${x.k} — ${x.rel}`}
              className={`border px-3 py-1.5 text-left transition-colors ${
                n === i ? "border-gold" : "border-border hover:border-gold/60"}`}>
              <span className={`block font-serif text-sm ${n === i ? "text-gold" : "text-bone/80"}`}>{x.k}</span>
              <span className="mt-0.5 block font-label text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                {x.rel}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Drawn {figures.length === 2 ? "twice" : `${figures.length} ways`} ·{" "}
        {[...new Set(figures.map((x) => x.rel))].join(", ")}
        {figures.length > new Set(figures.map((x) => x.rel)).size &&
          " — more than one figure asserting the same kind of relation, and differing in what they place where"}
      </p>
      <div className="mt-8"><FigureFrame f={cur} compact /></div>
    </div>
  );
}
