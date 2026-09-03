import { createFileRoute, Link } from "@tanstack/react-router";
import { RevealText } from "@/components/RevealText";
import { Backdrop } from "@/components/Backdrop";
import { SectionGlyph } from "@/components/SectionGlyph";
import { ContentsPanel } from "@/components/ContentsPanel";
import { LumenField } from "@/components/diagrams";
import { PhosHeader, PhosFooter, useScrollTop } from "@/components/phos/PhosHeader";
import { LabelChips } from "@/components/phos/Labels";
import { useActiveSection, usePauseOffscreen, useReveal } from "@/hooks/useSectionEffects";
import {
  DIVISIONS, TOTAL, LABELS, CONFIDENCE, FACETS, MOVEMENT, TOOLS, entriesOf, progress, divisionLabel,
} from "@/lib/phos/entries";
import { TOOL_ROUTES } from "@/lib/phos/tools";

/**
 * The Portal — the entrance to the encyclopaedia of light.
 *
 * The volume at /phos states a doctrine in twelve sections. This page opens onto
 * what the doctrine answers to: twenty-one divisions, some six hundred and fifty
 * entries, every one labelled by the kind of claim it makes and browsable by
 * seven facets. It is being written entry by entry, and this page says so:
 * each division shows how much of it exists, and what does not yet exist is
 * listed as forthcoming rather than hidden — the same rule the Architecture set
 * for itself on its first page.
 */

const SECTIONS = [
  { n: "", id: "movement", t: "The central movement", d: "Source to Return, in eight steps." },
  { n: "", id: "entrance", t: "Portal Entrance", d: "Ten entries that open the work." },
  { n: "", id: "divisions", t: "The twenty-one divisions", d: "Where everything is, and how much of it is written." },
  { n: "", id: "browse", t: "Browse by facet", d: "Tradition, quality, plane, operation, symbol, text, period." },
  { n: "", id: "labels", t: "Evidence labels", d: "The seven kinds of claim an entry can make." },
  { n: "", id: "instruments", t: "Instruments", d: "Seven tools the facets drive — four of them live." },
];
const GROUPS = [{ at: "movement", k: "The Portal" }];

export const Route = createFileRoute("/phos_/portal")({
  head: () => ({
    meta: [
      { title: "The Portal — Phōs" },
      {
        name: "description",
        content:
          "The encyclopaedia of light, radiance, illumination, and darkness within The Architecture of Hidden Forces — twenty-one divisions, every entry labelled by the kind of claim it makes.",
      },
      { property: "og:title", content: "The Portal — Phōs: The Luminous Architecture" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portal,
});

function Portal() {
  const active = useActiveSection();
  useReveal();
  usePauseOffscreen();
  useScrollTop("portal");

  const all = progress();
  const begun = DIVISIONS.filter((d) => progress(d.id).written > 0).length;
  const entrance = entriesOf("portal");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      <PhosHeader
        panel={<ContentsPanel active={active} entries={SECTIONS} groups={GROUPS} paths={[]} volume="/phos/portal" />}
      />

      {/* ENTRANCE */}
      <header id="top" className="relative isolate overflow-hidden pb-24 pt-40 sm:pb-32 sm:pt-52">
        <Backdrop src="/bg/gorgedawn.webp" opacity={0.34} position="center 45%" fill />
        <LumenField />
        <div className="grain" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="animate-rise text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              Phōs · The Portal
            </p>
            <h1 className="mx-auto mt-10 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
              <RevealText text="The Encyclopaedia" />
              <span className="mt-2 block italic">
                <RevealText text="of Light" startDelay={0.8} perChar={0.06} shimmer />
              </span>
              <span className="mx-auto mt-6 block h-px w-24 origin-left bg-gold/70 title-underline" />
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Light, radiance, illumination, and darkness within The Architecture of Hidden Forces —
              read by tradition, quality, plane, operation, symbol, text, or period, with every entry
              labelled by the kind of claim it makes.
            </p>
            <p className="mx-auto mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              {all.written} of {TOTAL} entries written · {begun} of {DIVISIONS.length} divisions begun
            </p>
          </div>
        </div>
      </header>

      {/* THE MOVEMENT */}
      <section id="movement" className="relative isolate border-t border-border py-24">
        <SectionGlyph delay={-140} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Κίνησις · The Central Movement
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Light followed from Source to <span className="italic text-gold">Return</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The divisions can be read in any order. This is the order the material itself has: the
            path a light takes from where it originates to where it is seen, and back.
          </p>
          <ol className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {MOVEMENT.map((m, i) => (
              <li key={m.k} className="border border-border p-5 transition-colors hover:border-gold/40">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-serif text-2xl text-bone">{m.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.gloss}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PORTAL ENTRANCE */}
      <section id="entrance" className="relative isolate border-t border-border py-24">
        <Backdrop src="/bg/threshold.webp" opacity={0.22} position="center 50%" scrim={0.3} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Portal Entrance</p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Ten entries that <span className="italic text-gold">open the work</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            What is meant by light, why it stands at the centre of the system, how the encyclopaedia is
            arranged, and how to tell a historical doctrine from a scientific finding from a position
            the system itself holds.
          </p>
          <blockquote className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Light is not merely what appears. Light is the relation through which appearance
              becomes possible.
            </p>
            <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
              — The threshold statement
            </footer>
          </blockquote>
          <EntryRows entries={entrance} />
        </div>
      </section>

      {/* THE DIVISIONS */}
      <section id="divisions" className="relative isolate border-t border-border py-24">
        <SectionGlyph delay={-320} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Divisions</p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Twenty-one divisions, <span className="italic text-gold">{TOTAL - entrance.length} entries</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Each division is a room of the encyclopaedia. The hairline under each shows how much of it
            has been written; a division with nothing yet written still lists every entry it will hold.
          </p>
          <div className="mt-12 grid gap-x-12 gap-y-px lg:grid-cols-2">
            {DIVISIONS.filter((d) => d.id !== "portal").map((d) => {
              const p = progress(d.id);
              const pct = p.total ? (p.written / p.total) * 100 : 0;
              return (
                <Link
                  key={d.id}
                  to="/phos/$division"
                  params={{ division: d.id }}
                  className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-b border-border py-5 transition-colors hover:border-gold/40"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">{d.numeral}</span>
                  <span className="min-w-0">
                    <span className="block font-serif text-lg text-bone transition-colors group-hover:text-gold">
                      {d.title}
                    </span>
                    <span className="mt-1 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      <span>{p.total} entries</span>
                      <span className={p.written ? "text-gold-dim" : ""}>
                        {p.written ? `${p.written} written` : "forthcoming"}
                      </span>
                    </span>
                    <span className="mt-2 block h-px w-full bg-border">
                      <span className="block h-px bg-gold/70" style={{ width: `${pct}%` }} />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BROWSE */}
      <section id="browse" className="relative isolate border-t border-border py-24">
        <Backdrop src="/bg/cartography.webp" opacity={0.26} position="center 50%" scrim={0.3} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Browse</p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Seven ways <span className="italic text-gold">across</span> the divisions
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The divisions arrange the material by subject. Facets cut across them: every entry names the
            traditions it draws on, the qualities and planes of light it concerns, the operations it
            describes, the symbols and texts it reads, and the period it belongs to.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {FACETS.map((f) => (
              <Link
                key={f.key}
                to="/phos/browse"
                className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                {f.name}
                {f.controlled && <span className="ml-2 text-gold-dim">{f.values.length}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LABELS */}
      <section id="labels" className="relative isolate border-t border-border py-24">
        <SectionGlyph delay={-505} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Evidence Labels</p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Seven kinds of claim, <span className="italic text-gold">never mixed unmarked</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Every entry carries one or more of these. A passage of Plotinus, a measurement of ultraweak
            photon emission, a report of what a meditator saw, and a law the system proposes are four
            different things, and the reader is told which they are holding before they read it.
          </p>
          <div className="mt-12 grid gap-px sm:grid-cols-2">
            {LABELS.map((l) => (
              <div key={l.key} className="border border-border p-5 transition-colors hover:border-gold/40">
                <LabelChips labels={[l.name]} />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.gloss}</p>
              </div>
            ))}
          </div>

          <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
            And a degree of confidence
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            A claim may also say how firmly it is held. The markers are set in bone rather than gold,
            so the kind of a claim and the confidence in it are never confused for each other.
          </p>
          <div className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-5">
            {CONFIDENCE.map((c) => (
              <div key={c.key} className="border border-border p-4">
                <LabelChips labels={[]} confidence={[c.name]} />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.gloss}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
            These labels are not interruptions of the mystery. They are part of the portal’s ethical
            structure.
          </p>
        </div>
      </section>

      {/* INSTRUMENTS */}
      <section id="instruments" className="relative isolate border-t border-border py-24">
        <Backdrop src="/bg/observatory.webp" opacity={0.3} position="center 40%" scrim={0.25} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Instruments · Four of Seven Live</p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            What the facets will <span className="italic text-gold">drive</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            An encyclopaedia is a long collection of articles until it can be asked questions. These
            seven instruments are views over the same facets every entry carries. Four are live; the
            other three come online as the entries that feed them are written.
          </p>
          <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => {
              const to = TOOL_ROUTES[t.k];
              return to ? (
                <Link key={t.k} to={to} className="group border border-gold/40 p-5 transition-colors hover:border-gold hover:bg-gold/5">
                  <p className="font-serif text-xl text-bone transition-colors group-hover:text-gold">{t.k}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">open →</p>
                </Link>
              ) : (
                <div key={t.k} className="border border-border p-5 opacity-80">
                  <p className="font-serif text-xl text-bone">{t.k}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">forthcoming</p>
                </div>
              );
            })}
          </div>
          <p className="mt-12 max-w-3xl border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
            The deepest thing the instruments will show is that light is not higher when brighter. Its
            signature is its unity, purity, coherence, stability, medium, purpose, formative effect, and
            truthfulness.
          </p>
        </div>
      </section>

      <PhosFooter />
    </div>
  );
}

/** Rows for the Portal Entrance — the same shape a division page uses. */
function EntryRows({ entries }: { entries: ReturnType<typeof entriesOf> }) {
  return (
    <div className="mt-10 space-y-px">
      {entries.map((e) => (
        <Link
          key={e.id}
          to="/phos/$division/$entry"
          params={{ division: e.division.id, entry: e.slug }}
          className={`group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-border py-4 transition-colors hover:border-gold/40 ${
            e.written ? "" : "opacity-60"
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
            {String(e.n).padStart(2, "0")}
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-lg text-bone transition-colors group-hover:text-gold">{e.title}</span>
              {e.written ? (
                <LabelChips labels={e.meta?.labels ?? []} size="xs" />
              ) : (
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">forthcoming</span>
              )}
            </span>
            {e.meta?.summary && (
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{e.meta.summary}</span>
            )}
            <span className="sr-only">{divisionLabel(e.division)}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
