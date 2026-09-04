import { Fragment, useRef, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import toc from "@/lib/phos/toc.json";
import { ZODIAC } from "@/lib/phos/colour";
import { GirihBand, NicheLamp } from "@/components/IslamicDevices";
import { GlossTerm, TermRegister, Term, type TermData } from "@/components/Term";
import { RevealText } from "@/components/RevealText";
import { useActiveSection, usePauseOffscreen, useReveal } from "@/hooks/useSectionEffects";
import { useFormulaRay } from "@/hooks/useFormulaRay";
import { Backdrop } from "@/components/Backdrop";
import { SectionGlyph } from "@/components/SectionGlyph";
import { ContentsPanel } from "@/components/ContentsPanel";
import { CrossMark } from "@/components/CrossMark";
import {
  BoundaryColour,
  EdgeColours,
  GoetheCircle,
  LadderOfLights,
  LumenField,
  LuxSphere,
  ThreeLights,
  TurbidMedium,
  VesselAndMeasure,
} from "@/components/diagrams";

/**
 * Phōs: The Luminous Architecture — the second volume.
 *
 * The Architecture names Light as one of four ethers and moves on, because in
 * that book Light is a function among functions: it articulates. But the
 * traditions the Architecture reads from do not treat light as one term among
 * others. For the Neoplatonists it is how the One gives without diminishing;
 * for Grosseteste it is the first corporeal form, and extension is what it does;
 * for the Lurianic Kabbalists everything turns on what a vessel can hold of it;
 * for Suhrawardī it is the single substance of which every degree of being is a
 * greater or lesser intensity; for Goethe it is one pole of the polarity out of
 * which colour arises at a boundary.
 *
 * Read together, those are not five metaphors for the same thing. They are five
 * angles on one operation: something that is what it is by giving itself away,
 * that is invisible in itself and visible only in what it reaches, and that is
 * measured at the far end by the vessel rather than at the near end by the
 * source. This volume follows that operation through twelve sections.
 *
 * It is a separate route rather than more sections on the first page for the
 * plain reason that the first page is already 31,000px tall. The two share
 * everything mechanical — palette, hooks, Backdrop, SectionGlyph, the Contents
 * panel — and the panel lists both volumes so either can reach the other.
 */

/** Waypoints through the arc, not a table of contents — the same rule the
 *  Architecture’s header follows. Everything finer is in the Contents panel. */
const NAV = [
  { id: "registers", label: "Registers" },
  { id: "deluce", label: "Source" },
  { id: "medium", label: "Medium" },
  { id: "vessel", label: "Vessel" },
  { id: "ladder", label: "Ladder" },
  { id: "colour", label: "Colour" },
  { id: "reading", label: "Reading" },
];

// Every pointer from this volume into the Portal resolves through the outline
// registry, so a title can never drift from the entry it names.
const PORTAL = new Map(
  toc.divisions.flatMap((d) => d.entries.map((e) => [e.id, { ...e, division: d.id, numeral: d.numeral || "Portal" }])),
);
function ref(id: string) {
  const r = PORTAL.get(id);
  if (!r) throw new Error(`phos: "${id}" is not a registered entry`);
  return r;
}
function EntryLink({ id, children, className }: { id: string; children?: ReactNode; className?: string }) {
  const r = ref(id);
  return (
    <Link to="/phos/$division/$entry" params={{ division: r.division, entry: r.slug }} className={className} title={r.title}>
      {children ?? r.title}
    </Link>
  );
}
function LawTag({ id }: { id: string }) {
  const r = ref(id);
  return (
    <EntryLink
      id={id}
      className="ml-3 inline-block whitespace-nowrap align-middle font-mono text-[9px] not-italic uppercase tracking-[0.25em] text-gold/50 transition-colors hover:text-gold"
    >
      {r.numeral} · {r.title.replace(/^The Law of /, "")}
    </EntryLink>
  );
}

function PortalPointers({ ids }: { ids: string[] }) {
  return (
    <div data-portal-pointers className="mt-12 max-w-3xl border-t border-border pt-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">In the Portal</p>
      <p className="mt-3 text-sm leading-relaxed text-bone/70">
        {ids.map((id, i) => {
          const r = ref(id);
          return (
            <Fragment key={id}>
              {i > 0 && <span className="mx-2 text-bone/30">·</span>}
              <EntryLink id={id} className="underline-offset-4 hover:text-gold hover:underline">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold-dim">{r.numeral} {r.n}</span>{" "}
                {r.title}
              </EntryLink>
            </Fragment>
          );
        })}
      </p>
    </div>
  );
}

/** The Ishrāqī vocabulary § VII sets, transliterated in the IJMES scheme. The
 *  vowel marks are the dictionary's, not a manuscript's. */
const ISHRAQ_TERMS: TermData[] = [
  { script: "arabic", orig: "نُورُ الأَنْوَار", tr: "nūr al-anwār", gloss: "the Light of Lights — the first principle, from which everything that is, is by being lit." },
  { script: "arabic", orig: "النُّورُ الْمُجَرَّد", tr: "al-nūr al-mujarrad", gloss: "the immaterial light: light in and for itself, needing nothing to shine in." },
  { script: "arabic", orig: "الأَنْوَارُ الْقَاهِرَة", tr: "al-anwār al-qāhira", gloss: "the dominating lights — Corbin's “victorial lights”: the higher order, which the lower cannot look at without being overcome.", note: "Walbridge and Ziai render them “dominating”; the vertical order descends from the Light of Lights, the horizontal order stands beside it as the lords of the species." },
  { script: "arabic", orig: "الْقَهْرُ وَالْمَحَبَّة", tr: "al-qahr wa-l-maḥabba", gloss: "domination and love — the two directions of traffic that hold the hierarchy together: the higher dominates, the lower loves." },
  { script: "arabic", orig: "بَرْزَخ", tr: "barzakh · pl. barāzikh", gloss: "an isthmus. In Suhrawardī, a body: the dark thing that does not manifest of itself." },
  { script: "arabic", orig: "الْجَوْهَرُ الْغَاسِق", tr: "al-jawhar al-ghāsiq", gloss: "the dusky substance — body considered as darkness that subsists, rather than as evil." },
  { script: "arabic", orig: "النُّورُ الإِسْفَهْبَد", tr: "al-nūr al-isfahbad", gloss: "the commanding light: the human soul, named after the Persian word for a general.", note: "A Persian word in Arabic dress; the manuscripts vary between إسفهبد and إسفهبذ." },
  { script: "arabic", orig: "الْعِلْمُ الْحُضُورِيّ", tr: "al-ʿilm al-ḥuḍūrī", gloss: "knowledge by presence — knowing with no image standing between the knower and the known.", note: "The fixed pairing with al-ʿilm al-ḥuṣūlī, knowledge by acquisition, hardens later, in Mullā Ṣadrā and after." },
  { script: "arabic", orig: "الْمُثُلُ الْمُعَلَّقَة", tr: "al-muthul al-muʿallaqa", gloss: "the suspended images — forms that are neither in a mind nor in a body, and have a place of their own.", note: "The label ʿālam al-mithāl, “the world of image”, is later Persian usage and Corbin's; it is not Suhrawardī's habitual phrase." },
  { script: "arabic", orig: "هَيَاكِلُ النُّور", tr: "hayākil al-nūr", gloss: "the temples of light — bodies as the edifices a light inhabits, and the title of his short summary." },
  { script: "arabic", orig: "التَّأَلُّه", tr: "al-taʾalluh", gloss: "deiformity: becoming godlike. The sage who has it is al-ḥakīm al-mutaʾallih, and in this system he outranks the one who merely reasons well." },
];

const ENTRIES = [
  { n: "I", id: "registers", t: "Three Registers of Light", d: "Lux, lumen, splendor — light in its source, on its way, and arrived." },
  { n: "II", id: "diffusion", t: "The Self-Diffusion of the Good", d: "Why a source that keeps itself is not a source. Giving without diminishment." },
  { n: "III", id: "deluce", t: "De Luce", d: "Grosseteste’s proposition: extension is what light does, and body is where it stopped." },
  { n: "IV", id: "medium", t: "The Diaphanous", d: "What a medium owes: to carry without colouring, and to be invisible in transit." },
  { n: "V", id: "shadow", t: "Shadow", d: "Not the absence of light but the consequence of a body. Every illumination selects." },
  { n: "VI", id: "vessel", t: "The Vessel and the Measure", d: "Or Yashar and Or Chozer — and what the breaking of the vessels is about." },
  { n: "VII", id: "ladder", t: "The Ladder of Lights", d: "Suhrawardī's hierarchy: one light thinning, held by domination and longing." },
  { n: "VIII", id: "colour", t: "The Boundary Where Colour Arises", d: "Goethe’s primal phenomenon — colour as what happens at an edge, in a medium." },
  { n: "IX", id: "eye", t: "The Sunlike Eye", d: "Why the organ must be of the same nature as what it receives — and what that does not license." },
  { n: "X", id: "counterfeits", t: "The Counterfeits of Light", d: "Glare, glamour, the borrowed shine, and four more ways brightness imitates illumination." },
  { n: "XI", id: "reading", t: "The Discipline of Reading Light", d: "Seven questions to put to any luminous experience, before it is believed." },
  { n: "XII", id: "restoration", t: "The Returning Light", d: "The circuit closed: what illumination is for, and why it is not the end of the work." },
  { n: "—", id: "luxlexicon", t: "Lexicon of Light", d: "Every term this volume defines, and the section that defines it." },
  { n: "—", id: "encyclopaedia", t: "The Portal", d: "The encyclopaedia of light this volume opens onto — twenty-one divisions, browsable by facet." },
  { n: "", id: "luminous", t: "The Luminous Formula", d: "The volume in twelve lines.", movement: true },
];

/** The panel groups rows by movement; each group is keyed to its first entry. */
const GROUPS = [
  { at: "registers", k: "What light is" },
  { at: "medium", k: "What it passes through" },
  { at: "vessel", k: "What receives it" },
  { at: "eye", k: "Discernment" },
  { at: "luxlexicon", k: "Apparatus" },
];

export const Route = createFileRoute("/phos")({
  head: () => ({
    meta: [
      { title: "Phōs: The Luminous Architecture" },
      {
        name: "description",
        content:
          "A companion volume to The Architecture of Hidden Forces — light as lux, lumen and splendor; self-diffusion, the medium, shadow, the vessel and its measure, the ladder of lights, and the boundary where colour arises.",
      },
      { property: "og:title", content: "Phōs: The Luminous Architecture" },
      {
        property: "og:description",
        content:
          "Light is not seen. What is seen is what light has already given away. Twelve sections on the one operation that gives itself without diminishing, and is measured at the far end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Phos,
});

function Phos() {
  const active = useActiveSection();
  useReveal();
  usePauseOffscreen();
  const formulaRef = useRef<HTMLDivElement>(null);
  useFormulaRay(formulaRef);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-void/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:flex sm:justify-between">
          <a href="#top" className="min-w-0">
            <div className="truncate font-serif text-base italic tracking-wide sm:text-lg">
              Phōs · The Luminous Architecture
            </div>
          </a>
          <div className="flex shrink-0 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] xl:gap-6 xl:tracking-[0.25em]">
            <div className="hidden items-center gap-4 lg:flex xl:gap-6">
              {NAV.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`transition-colors hover:text-gold ${
                    active === l.id ? "text-gold" : ""
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/phos/portal"
                className="whitespace-nowrap border-l border-border pl-4 text-gold-dim transition-colors hover:text-gold xl:pl-6"
              >
                Portal <CrossMark className="text-gold/70" />
              </Link>
            </div>
            <Link
              to="/"
              className="hidden shrink-0 border-l border-border pl-4 font-serif text-sm normal-case tracking-normal text-bone/80 transition-colors hover:text-gold lg:block xl:pl-6"
            >
              The Architecture <CrossMark className="text-gold/70" />
            </Link>
            <ContentsPanel
              active={active}
              entries={ENTRIES}
              groups={GROUPS}
              paths={[]}
              indexHref="#contents"
              volume="/phos"
            />
          </div>
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim lg:hidden">
            ΦΩΣ
          </div>
        </div>

        <div className="border-t border-border/50 lg:hidden">
          <div className="aoh-navstrip mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 pb-3 pt-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            {NAV.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`whitespace-nowrap py-1 transition-colors hover:text-gold ${
                  active === l.id ? "text-gold" : ""
                }`}
              >
                {l.label}
              </a>
            ))}
            <Link to="/phos/portal" className="whitespace-nowrap py-1 text-gold-dim transition-colors hover:text-gold">
              Portal <CrossMark className="text-gold/70" />
            </Link>
            <Link
              to="/"
              className="ml-auto whitespace-nowrap border-l border-border py-1 pl-4 font-serif text-xs normal-case tracking-normal text-bone/80 transition-colors hover:text-gold"
            >
              Architecture <CrossMark className="text-gold/70" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative isolate overflow-hidden pb-32 pt-40 sm:pb-48 sm:pt-56">
        <Backdrop src="/bg/lightdoor.webp" opacity={0.4} position="68% 50%" scrim={0.28} fill />
        <LumenField />
        <div className="grain" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="animate-rise text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              The Second Volume · MMXXVI
            </p>
            <h1 className="mx-auto mt-10 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl md:text-8xl">
              <RevealText text="Phōs" />
              <span className="mt-2 block italic">
                <RevealText text="The Luminous Architecture" startDelay={0.9} perChar={0.045} shimmer />
              </span>
              <span className="mx-auto mt-6 block h-px w-24 origin-left bg-gold/70 title-underline" />
            </h1>
            <p className="mx-auto mt-10 max-w-2xl font-serif text-lg leading-relaxed text-bone/90 sm:text-xl md:text-2xl" data-hero-lede>
              A companion volume to{" "}
              <Link to="/" className="text-gold/90 underline decoration-gold/35 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold">
                The Architecture of Hidden Forces
              </Link>
              . The same structure, <span className="italic">read by its own light</span> — what it means
              that the first thing every tradition reaches for, when it wants to say how the invisible
              becomes visible, <span className="italic text-gold">is a lamp</span>.
            </p>

            <div className="mx-auto mt-16 h-px w-16 bg-gold/50" />

            <blockquote className="mx-auto mt-16 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85 sm:text-2xl md:text-3xl">
              “Light is never what is seen. Look into a lit room and you do not see the light — you
              see the wall it reached. What is visible is always what the source has already given
              away, carried by something that did not keep it, to something that did.”
            </blockquote>
          </div>

          <div className="relative mt-32">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-gold-dim">
              ΦΩΣ · The Chain of Illumination
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-6">
              {[
                { g: "Πηγή", t: "Source" },
                { g: "Δόσις", t: "Giving" },
                { g: "Διαφανές", t: "Medium" },
                { g: "Σκιά", t: "Shadow" },
                { g: "Ἀγγεῖον", t: "Vessel" },
                { g: "Χρῶμα", t: "Colour" },
                { g: "Ὄψις", t: "Sight" },
                { g: "Ἐπιστροφή", t: "Return" },
              ].map((p, i, a) => (
                <div key={p.g} className="flex items-center gap-3 sm:gap-5">
                  <span
                    className="font-serif text-xl text-bone/85 transition-colors hover:text-gold sm:text-2xl"
                    title={p.t}
                  >
                    {p.g}
                  </span>
                  {i < a.length - 1 && <span className="font-mono text-xs text-gold/40">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* STANDING OF THE VOLUME */}
      <section className="relative border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] text-gold">
              ΔΕΥΤΕΡΟΣ ΤΟΜΟΣ
              <span className="mt-2 block text-gold-dim">On the standing of this volume</span>
            </p>
            <div className="max-w-3xl">
              <p className="font-serif text-xl leading-relaxed text-bone/90 sm:text-2xl">
                Not a summary of the first book, and not a replacement for it.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The Architecture treats Light as one of four ethers — the function that{" "}
                <span className="text-gold-dim">articulates</span>, giving activated force an
                orientation, a contrast, a boundary. That placement is correct there, and this
                volume does not revise it. What it does is take up a separate question the first
                book had no room for: the traditions it reads from do not use light as one term
                among many. They use it as the model case of how anything hidden becomes anything
                visible, and they largely agree about how that works.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                So this is a monograph, not a supplement. Where it needs the first book it links to
                it rather than restating it, on the same principle the{" "}
                <Link to="/" hash="lexicon" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                  Lexicon
                </Link>{" "}
                follows there: one line and a pointer, never a second copy of an argument that
                already has a home.
              </p>
              <p className="mt-5 font-serif text-lg italic leading-relaxed text-bone/75">
                Where the two books disagree, the disagreement is marked rather than smoothed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENTS */}
      <section id="contents" className="relative isolate border-t border-border py-24">
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § Contents · The Twelve
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            One operation, in <span className="italic text-gold">twelve passes</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The order is not arbitrary and it is not a ladder. § I to § III establish what light is
            and what it does; § IV and § V the conditions it passes through; § VI to § VIII what
            happens where it arrives; § IX to § XI the discipline of reading it; § XII closes the
            circuit. Read in sequence, or take any single section — each is written to stand.
          </p>
          <div className="mt-10 grid gap-x-12 gap-y-px lg:grid-cols-2">
            {ENTRIES.map((x) => (
              <a
                key={x.id}
                href={`#${x.id}`}
                className="group grid grid-cols-[3.25rem_1fr] items-baseline gap-4 border-b border-border py-4 transition-all hover:border-gold/40"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                    x.movement ? "text-gold/40" : "text-gold-dim"
                  }`}
                >
                  {x.movement ? "·" : `§ ${x.n}`}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block font-serif text-lg transition-colors group-hover:text-gold ${
                      x.movement ? "italic text-bone/80" : "text-bone"
                    }`}
                  >
                    {x.t}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {x.d}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* § I — REGISTERS */}
      <section id="registers" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-12} />
        <Backdrop src="/bg/sunravine.webp" opacity={0.4} position="center 40%" scrim={0.26} portrait />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § I · Three Registers of Light
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">
            Lux <span className="italic text-gold">→</span> Lumen{" "}
            <span className="italic text-gold">→</span> Splendor
          </h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            Light in its source, on its way, and arrived
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              A thirteenth-century optician would not have used one word for the lamp, the air, and
              the wall. Three words did three jobs, and the distinction is the beginning of every
              argument in this volume.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            <span className="text-bone/90">Lux</span> is light as it is in the luminary — undivided,
            self-possessed, and by itself unseen.{" "}
            <span className="text-bone/90">Lumen</span> is light in transit through what is
            transparent, and it is invisible in transit: what crosses a lit room is not what the eye
            reports. <span className="text-bone/90">Splendor</span> is light received by a bounded
            body and given back, as sheen where the surface is polished and as colour where it is
            not. Only in the third register does light become a property of things.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            English lost the distinction and inherited the confusions. Calling a person luminous,
            calling a doctrine illuminating, calling an experience light-filled — each of these
            names a register without saying which, and the whole difference between a source, a
            medium and a surface is what gets dropped.
          </p>

          <div className="mt-24">
            <ThreeLights />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Why the three cannot be collapsed
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Collapse lux into splendor and every shining thing becomes a source: this is how a
              teacher, a text, or a beautiful object comes to be worshipped for light it is
              returning rather than originating. Collapse lumen into lux and the medium starts
              taking credit — the tradition, the language, the lineage claiming to be the origin of
              what it was built to carry. Collapse splendor into lumen and the particular thing
              disappears into the transmission, which is the error of every account that treats
              individual beings as mere occasions for a general force.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Three registers, one light. Which is exactly why keeping them apart is work and not
              pedantry: nothing in the phenomenon itself announces which register you are looking
              at.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              The Architecture&rsquo;s{" "}
              <Link to="/" hash="mediation" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                vertical chains of mediation
              </Link>{" "}
              make the same distinction in a different vocabulary — source, intermediary, vessel —
              and give it the rule this volume assumes throughout: never confuse the vessel with
              what it mediates.
            </p>
          </div>
          <PortalPointers ids={["i-3", "i-6", "v-27", "xxi-3"]} />
        </div>
      </section>

      {/* § II — DIFFUSION */}
      <section id="diffusion" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-96} />
        <Backdrop src="/bg/lamplines.webp" opacity={0.34} position="center 60%" scrim={0.28} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § II · The Self-Diffusion of the Good
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">Bonum diffusivum sui</h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            A source that keeps itself is not a source
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              The Neoplatonic proposition is not that the Good chooses to give. It is that giving is
              what the Good is, in the way that shining is what a light is — not a decision the lamp
              makes but the description of a lamp.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Plotinus reaches for the sun because he needs a case where giving costs nothing. Fire
            gives heat and cools; a spring gives water and empties; but the sun is not depleted by
            what falls on the earth, and a candle lighting a second candle keeps its own flame
            entire. Emanation is modelled on the class of gift that does not subtract from the giver.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            That is the analogy&rsquo;s whole work, and also its limit. It licenses one claim — that
            what proceeds does not diminish what it proceeds from — and it licenses nothing else. It
            does not establish that the giving is intentional, or benevolent, or addressed to
            anyone. Those are further questions, and the metaphor cannot settle them; it only clears
            the ground of the objection that a source giving endlessly must run out.
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What follows, and what does not
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Three things follow. First, that a source is known by its giving and not otherwise —
              there is no inspecting a luminary directly. Second, that what proceeds is genuinely
              distinct from what it proceeds from, since something that stayed inside the source
              would not have been given. Third, that the further from the source, the less
              concentrated the gift, which is not a moral fall but an account of distance.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              What does not follow is the sentiment usually attached: that the giving is for us,
              that being nearer the source is being better, or that the proper response to a
              hierarchy of distance is the ambition to climb it. § VII takes up how one tradition
              structured that ladder, and § X how the ambition to climb it becomes its own
              counterfeit.
            </p>
            <p className="mt-8 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              A source that withholds is not being careful with a limited store. It is failing at
              the one thing that makes it a source — which is why hoarding, in this architecture, is
              not stinginess but a category error about what one is.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              The Architecture states the same movement without the optics, as{" "}
              <Link to="/" hash="theurgy" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                procession and return
              </Link>{" "}
              — proodos outward and epistrophē back. This volume is that arc with the lamp left in.
            </p>
          </div>
          <PortalPointers ids={["i-11", "i-15", "xix-3", "xv-28"]} />
        </div>
      </section>

      {/* § III — DE LUCE */}
      <section id="deluce" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-210} />
        <Backdrop src="/bg/crystalhall.webp" opacity={0.34} position="center 50%" scrim={0.22} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § III · De Luce
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">
            Extension is what <span className="italic text-gold">light does</span>
          </h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            Robert Grosseteste, c. 1225 — the first corporeal form
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              The boldest sentence in the medieval optical tradition: a body is not a thing that
              light happens to fall on. A body is what a point of light produced by multiplying
              itself in every direction at once.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Grosseteste starts from a puzzle. Matter, taken by itself, has no size; form, taken by
            itself, has no size; so extension cannot be explained by either, and something must
            account for there being anything spread out at all. His answer is that light is the
            first corporeal form, and that its nature is instantaneous self-multiplication. A single
            point diffuses itself spherically, drags matter with it, and the sphere so generated is
            the first body. The cosmos is what one point did.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The consequences are severe and consistent. Light is denser where it began and rarer as
            it travels, so the outermost sphere is where the self-diffusion is still most itself,
            and the four elements are found near the centre, where it has nearly spent itself.
            Density and rarity are not two substances but two conditions of one; and matter is not
            the opposite of light but its companion, carried outward by it and never independent.
          </p>

          <div className="mt-24 grid gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-center">
            <LuxSphere />
            <div>
              <p className="max-w-2xl font-serif text-2xl italic leading-tight text-bone/85 sm:text-3xl">
                “The first form cannot leave matter behind, because matter cannot be left behind by
                the only thing that gave it extension.”
              </p>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Which forecloses, at the root, the reading that treats light as spirit escaping
                body. In De Luce there is no light that has got away from matter; there is only
                light at various densities, and body is one of them.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                The figure spaces its rings by the same law: wider and fainter as they leave the
                point, the four inner ones drawn heavier than the nine outer, because that is where
                the treatise puts the elements and the heavens.
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What the proposition is worth now
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              As physics it is superseded, and this volume does not defend it as physics. As a
              metaphysical proposition it remains the sharpest statement available of a claim the
              whole architecture depends on: that extension, distinction and embodiment are not
              obstacles placed in the way of a formative power but the visible record of that power
              having acted.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Body is not where light failed to reach. Body is where light arrived and stopped.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              Which is the first volume&rsquo;s founding proposition stated in optical terms — form
              as{" "}
              <Link to="/" hash="forceform" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                force given memory
              </Link>
              , the visible as the invisible brought to rest.
            </p>
          </div>
          <PortalPointers ids={["xv-83", "xv-84", "xix-5", "xvi-4"]} />
        </div>
      </section>

      {/* § IV — MEDIUM */}
      <section id="medium" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-330} />
        <Backdrop src="/bg/shafthall.webp" opacity={0.34} position="center 50%" scrim={0.24} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § IV · The Diaphanous
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">Διαφανές</h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            What a medium owes, and how a medium fails
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Aristotle&rsquo;s word for the transparent is not the name of a substance. Water, air
              and glass are all diaphanous, and what they share is not a material but a capacity: to
              be crossed without keeping what crosses.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A medium is defined by a discipline of self-effacement. It must be present enough to
            carry, and absent enough not to be seen carrying — and the two demands pull against each
            other, which is why every real medium is a compromise and none is perfect. Glass has a
            faint green in it. Air scatters the blue out of what passes through it. There is no
            transmission without an alteration, and the honest question is never whether a medium
            adds something but how much, in which direction, and whether the addition is declared.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The Architecture calls this the{" "}
            <Link to="/" hash="reciprocal" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
              Law of Remainder
            </Link>
            : every mediator keeps part, alters part, and loses part. Optics gives the law its
            clearest instance, because with light the keeping, the altering and the losing can each
            be seen separately — absorption, refraction, scatter.
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Four ways a medium fails
            </p>
            <div className="mt-8 space-y-px">
              {[
                {
                  k: "Turbidity",
                  d: "The medium clouds, and what arrives is coloured by the crossing rather than by the source. Every teacher, translation and tradition risks this, and the risk grows precisely as the medium gets more distinctive.",
                },
                {
                  k: "Opacity",
                  d: "The medium stops carrying and starts blocking. It is not always a failure — a wall is opaque on purpose — but a mediator that has become opaque while still claiming to mediate is the most common institutional failure there is.",
                },
                {
                  k: "Luminescence",
                  d: "The medium begins to glow on its own account, and what it emits is taken for what it was given. This is the failure that flatters: the intermediary is not lying, it has genuinely become interesting, and that is the problem.",
                },
                {
                  k: "Refusal of measure",
                  d: "The medium admits everything without proportion, so that source, noise and its own emission arrive indistinguishably. Openness without discernment is not transparency — it is turbidity that has stopped keeping track.",
                },
              ].map((f) => (
                <div
                  key={f.k}
                  className="group grid grid-cols-1 items-baseline gap-2 border-b border-border py-5 transition-colors hover:border-gold/40 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {f.k}
                  </span>
                  <span className="text-base leading-relaxed text-muted-foreground">{f.d}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              None of the four is cured by removing the medium. There is no unmediated light in this
              architecture — nothing reaches anything except across something. What can be done is
              to know which medium is in use, what it characteristically adds, and to correct for it,
              which is the whole method of § XI.
            </p>
          </div>
          <PortalPointers ids={["xv-21", "iii-8", "xix-1", "iv-5"]} />
        </div>
      </section>

      {/* § V — SHADOW */}
      <section id="shadow" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-455} />
        <Backdrop src="/bg/eclipse.webp" opacity={0.48} position="center 40%" scrim={0.18} anchor="left" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § V · Shadow
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">Σκιά</h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            Not the absence of light but the presence of a body
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              A shadow is evidence. It says that light came from a particular direction and that
              something stood in the way with a particular shape — which is more than the lit
              surface alone reports.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Treating shadow as mere privation is the error that makes the whole optical vocabulary
            unusable for ethics. Nothing is subtracted where a shadow falls; something is added — a
            body — and the shadow is that body&rsquo;s report of itself in the terms of the light.
            Remove the body and there is no shadow, and also no thing.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Draughtsmen know the consequence: form is legible only through shading. A face lit flat
            from the front has no depth at all, and a photographer wanting to show the shape of
            something moves the light off-axis to get shadow back. Modelling — the perception of
            volume — is not interrupted illumination. It is illumination that has met something with
            a shape.
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Every illumination selects
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A lamp placed to reveal one relation puts another in shade, and moving it does not
              abolish the cost but relocates it. This is not a defect in the lamp. It is what it
              means to illuminate from somewhere, and there is no illuminating from nowhere.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So a doctrine that claims to have cast light on everything at once has almost
              certainly not: either it is lighting less than it claims, or it has flattened its
              subject until nothing casts a shadow. The reliable sign of a real illumination is that
              it can say what it has put in shade — and the surest sign of a false one is that the
              question has no answer.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              Ask of any revelation what it darkened in order to show what it showed. A revelation
              that cannot answer has not looked at its own geometry.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              The first volume states this as a rule for maps in{" "}
              <Link to="/" hash="image" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                Image and Imagination
              </Link>{" "}
              — to reveal one relation is to leave another in shadow — and here it is the geometry
              rather than the maxim: the shade has a direction, and the direction points back at
              where you were standing.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Umbra and penumbra
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A point source casts a hard shadow; an extended one casts a core of full shade
              surrounded by a graded margin where the source is only partly hidden. Almost every
              real shadow has that soft edge, and the width of the margin is a measure of how large
              the source is relative to the body.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The margin is where most of the interesting cases live. Partial occlusion, partial
              disclosure, a thing neither shown nor hidden — this is the ordinary condition of
              understanding something, and the hard-edged shadow is the rarity. A tradition that
              recognises only full light and full dark has mistaken a limiting case for the rule.
            </p>
          </div>
          <PortalPointers ids={["vi-27", "vi-9", "xix-10", "vi-26"]} />
        </div>
      </section>

      {/* § VI — VESSEL */}
      <section id="vessel" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-580} />
        <Backdrop src="/bg/crackedvessel.webp" opacity={0.34} position="center 50%" scrim={0.22} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § VI · The Vessel and the Measure
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">
            Or Yashar <span className="italic text-gold">·</span> Or Chozer
          </h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            The straight light and the returning light
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Lurianic Kabbalah counts two lights where the optical tradition counts one, and the
              second is the one that matters: not what descends from the source but what the vessel
              gives back.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Or Yashar is the straight light, descending. Or Chozer is the returning light, and it is
            not a reflection in the trivial sense — it is the vessel&rsquo;s own act, the response
            that makes reception a relation rather than an event. A vessel that only received would
            be a container. A vessel that returns is a participant, and the returning light is what
            can be measured, because the descending light cannot.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The system begins with a withdrawal rather than an outpouring. Tzimtzum is the
            contraction by which the infinite makes room for something that is not itself: before
            anything can be given, a space has to be cleared in which a recipient can exist at all.
            Which reverses the intuition that generosity means filling. The first gift is the room.
          </p>

          <div className="mt-24">
            <VesselAndMeasure />
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The breaking of the vessels
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Shevirat ha-kelim is the doctrine that the early vessels received more than their
              structure could return, and shattered. What makes it more than a cautionary tale is
              where the light went: not back to the source, and not out of existence, but into the
              shards — sparks caught in fragments, scattered through everything that came after.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Two consequences follow, and they are the reason this section sits at the centre of
              the volume. First, that the ordinary world is not the absence of the light but its
              dispersal, so the work is gathering rather than escaping. Second, that a vessel is a
              measure — a real constraint with a real value, not a limitation to be overcome by
              enthusiasm.
            </p>
            <p className="mt-8 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              A source that ignores the measure does not give more. It gives elsewhere, and in
              pieces — which is why intensity is never on its own evidence that a transmission went
              well.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              The first volume reaches the same conclusion from the side of force, in the{" "}
              <Link to="/" hash="relation" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                Law of Right Relation
              </Link>
              : right measure is not moderation but the amount that leaves the vessel able to
              receive again.
            </p>
          </div>
          <PortalPointers ids={["v-28", "v-29", "xix-9", "xix-11", "xiii-27"]} />
        </div>
      </section>

      {/* § VII — LADDER */}
      <section id="ladder" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-700} />
        <Backdrop src="/bg/spherehall.webp" opacity={0.36} position="center 32%" scrim={0.22} portrait />
        <div className="relative mx-auto max-w-6xl px-6">
          <GirihBand className="mb-12" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § VII · The Ladder of Lights
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-7 gap-y-3">
            <Term script="arabic" orig="إِشْرَاق" label="ishrāq — illumination, the first light over the horizon"
                  className="text-5xl text-gold" />
            <h2 className="font-serif text-4xl leading-tight">Ishrāq</h2>
          </div>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            Suhrawardī — one substance, differing only in intensity
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone/60">
            The word is the sunrise: not light in general but the moment light comes over an edge.
            Transliterations here follow the scheme of the{" "}
            <span className="italic">International Journal of Middle East Studies</span>, and the
            vowel marks are set where a dictionary would set them, which is not how the words appear
            in a manuscript.
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              The philosophy of illumination makes a claim no other tradition here makes so
              plainly: the degrees of being do not differ in kind. They differ in intensity of one
              light, and nothing else.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            To be light, in this system, is to be manifest to oneself with nothing withheld — so
            self-awareness and luminosity are the same property, and a being is more real exactly in
            proportion as it is more present to itself. Bodies are the isthmuses: dark in
            themselves, visible only by what falls on them, and not for that reason evil. An isthmus
            is what a light must stand on to be somewhere rather than everywhere.
          </p>

          <div className="mt-24">
            <LadderOfLights />
          </div>

          {/* the verse the whole vocabulary answers to */}
          <div className="mt-24 grid gap-12 border-t border-border pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,13rem)] lg:items-start">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                The verse the vocabulary answers to
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                No Islamic philosophy of light begins from nothing. It begins from one verse, and
                from three centuries of argument about how literally to take it — whether God is
                called light because light is the least inadequate thing to call Him, or whether
                everything else is called light only by borrowing.
              </p>
              <blockquote className="mt-8 border-l-2 border-gold pl-6">
                <p dir="rtl" lang="ar" className="scr scr-arabic text-3xl leading-loose text-gold">
                  اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ
                </p>
                <p className="mt-5 font-serif text-2xl leading-relaxed text-bone/90">
                  God is the Light of the heavens and the earth; the likeness of His Light is as a
                  niche wherein is a lamp — the lamp in a glass, the glass as it were a glittering
                  star — kindled from a Blessed Tree, an olive that is neither of the East nor of the
                  West, whose oil wellnigh would shine, even if no fire touched it.{" "}
                  <span className="text-gold">Light upon Light.</span>
                </p>
                <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dim">
                  Qur&rsquo;ān 24:35, the Light Verse · Arberry&rsquo;s rendering
                </footer>
              </blockquote>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Al-Ghazālī took the verse apart in{" "}
                <span className="italic">Mishkāt al-Anwār</span>, the Niche of Lights, and reached
                the strict conclusion: the real light is God, and the name light applied to anything
                else is{" "}
                <Term script="arabic" orig="مَجَاز" label="majāz — metaphor, trope" className="text-gold/90" />{" "}
                — <span className="italic">majāz</span>, metaphor, with no reality in it. Everything
                that shines does so from what stands above it and not from itself.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Suhrawardī, a century later, is not writing a commentary on the verse, and this
                volume should not pretend otherwise. But he inherits its problem and answers it the
                other way: light is not a metaphor for being — being{" "}
                <span className="text-bone/90">is</span> light, in degrees, and what the verse calls
                Light upon Light his system draws as a hierarchy of intensities with nothing
                borrowed anywhere in it.
              </p>
            </div>
            <div className="flex justify-center lg:sticky lg:top-32">
              <div>
                <NicheLamp className="w-full max-w-[13rem]" />
                <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.15em] text-muted-foreground">
                  The niche, the glass, the lamp — the figures of the verse, drawn. The mihrab of a
                  mosque takes its shape from the same sentence.
                </p>
              </div>
            </div>
          </div>

          {/* the vocabulary */}
          <div className="mt-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The vocabulary, in its own script
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Eight words carry the system. Read in Arabic they are less abstract than they look in
              English: an isthmus is a strip of land between two seas before it is a body, and a
              commander of an army before it is a soul.
            </p>
            <div className="mt-4 max-w-4xl">
              <TermRegister terms={ISHRAQ_TERMS} />
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
              One caution about the most portable of them.{" "}
              <span className="italic">Barzakh</span> in Ibn ʿArabī and in ordinary Sufi usage names
              the intermediate world between spirit and body — the imaginal realm. In Suhrawardī it
              names the body itself, the dark thing a light must stand on. The same word sits at
              opposite ends of the same scale, and a reader who carries one sense into the other
              text will read it exactly backwards.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The man, and the books
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Shihāb al-Dīn Yaḥyā al-Suhrawardī wrote the{" "}
              <span className="italic">Ḥikmat al-Ishrāq</span> in 1186 and was executed at Aleppo in
              1191, in his mid-thirties, at the order of Saladin — which is why the tradition calls
              him <span className="italic">al-maqtūl</span>, the killed. The philosophy of
              illumination is therefore a young man&rsquo;s last book, and it is deliberately built
              against the Peripatetic system it comes out of: he had written Avicennan philosophy
              competently before deciding that definition by genus and difference cannot reach the
              things that matter, and that a knowing which needs no definition is available.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              He also revives, on purpose, a vocabulary older than Islamic philosophy: the{" "}
              <Term script="arabic" orig="خُرَّه" label="khurra — the divine glory of kings" className="text-gold/90" />{" "}
              of the Persian kings, the Glory that legitimates a ruler, and{" "}
              <span className="italic">arbāb al-anwāʿ</span>, the lords of the species, which he
              connects with the Zoroastrian archetypes. Whether those lords are the yazatas in
              philosophical dress, as Corbin argued, is contested — and the identification is
              Corbin&rsquo;s more than Suhrawardī&rsquo;s.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The line does not end there. The Ishrāqī vocabulary is what Mullā Ṣadrā and the school
              of Isfahan build on four centuries later, and it is through that line, not directly,
              that most of it reaches European readers.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Knowledge by presence
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The epistemology follows from the ontology. If a light is manifest to itself, then it
              knows itself without an image standing between — not by representation, not by
              inference, but by presence. Everything else it knows by illuminating, which means
              knowledge is a kind of giving rather than a kind of taking.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is the most attractive doctrine in the volume and the one most easily misused.
              Knowledge by presence is offered as an account of how a light knows its own existing —
              a narrow claim, and defensible. It is regularly borrowed as a warrant for something
              far wider: that a vivid inner conviction is self-certifying, and needs no test because
              testing belongs to the lower faculties.
            </p>
            <p className="mt-8 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              That does not follow, and Suhrawardī does not claim it. Knowing that one is present to
              oneself settles nothing whatever about the content of what one then believes. The
              distinction is the difference between § VII and § X.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              The Architecture&rsquo;s{" "}
              <Link to="/" hash="soul" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                interval
              </Link>{" "}
              is the same guardrail in psychological terms: the reality of an experience does not
              establish the correctness of its interpretation.
            </p>
          </div>
          <PortalPointers ids={["xv-80", "xv-81", "xii-20", "xv-55"]} />
        </div>
      </section>

      {/* § VIII — COLOUR */}
      <section id="colour" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-820} />
        <Backdrop src="/bg/spectralvalley.webp" opacity={0.36} position="center 50%" scrim={0.2} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § VIII · The Boundary Where Colour Arises
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">Urphänomen</h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            Goethe — the deeds and sufferings of light
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Colour is not in the light and not in the dark. It arises where they meet, in a
              medium, and it arises as a pair — which is a claim about boundaries, and only
              incidentally a claim about colour.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The primal phenomenon is one observation read in two directions. Light seen through a
            turbid medium warms: the sun at noon is white through little air, and red at the horizon
            through much. Darkness seen through a lit turbid medium cools: space is black, the air
            in front of it is lit, and the sky is blue. The same medium, the same pair of poles, and
            the colours belong to neither end but to the boundary between them.
          </p>

          <div className="mt-24">
            <BoundaryColour />
          </div>

          {/* the experiment, and what it is doing */}
          <div className="mt-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The experiment he put in place of the spectrum
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Newton&rsquo;s prism sits in a beam in a dark room and throws a spectrum on a screen.
              Goethe&rsquo;s is held to the eye and pointed at the world. Look through it at an
              evenly lit wall and the wall is displaced without colouring; the colour appears only
              where the wall meets a window frame — at an edge.{" "}
              <span className="text-bone/90">
                So the fringes are the phenomenon, and the spectrum is a special case of them:
                what happens when the lit band is narrow enough for its two edges to overlap.
              </span>
            </p>
            <div className="mt-12">
              <EdgeColours />
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-bone/60">
              The demonstration above is built the way modern optics explains it — the band laid
              down once for each of twenty-four wavelengths and displaced by its own refraction,
              then added together. Goethe&rsquo;s phenomena come out of the dispersion he denied,
              which is the honest position: he was right about what appears and wrong about why.
              Green is not in either fringe, and magenta is in no spectrum at all; both are what
              two fringes make when they meet.
            </p>
          </div>

          {/* the turbid medium */}
          <div className="mt-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Trübe Medien · the load-bearing doctrine
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A medium between transparent and opaque — cloudy, smoky, dusty, watery — is what
              Goethe calls turbid, and it is where his whole account is anchored. Look through it at
              a light and the light warms. Let it stand lit in front of darkness and the darkness
              cools. One medium, two directions of looking.
            </p>
            <div className="mt-12">
              <TurbidMedium />
            </div>
          </div>

          {/* the circle */}
          <div className="mt-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The Farbenkreis, and what the eye demands
            </p>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Goethe puts the physiological colours first in the book, and the placement is the
              argument: what the eye does of itself is not a nuisance to be subtracted from the real
              colours, it is the ground the rest is read on. Shown yellow and then taken from it,
              the eye produces violet; shown blue, orange; shown purple, green.{" "}
              <span className="text-bone/90">
                The circle is drawn from those demands, not from mixing pigments.
              </span>
            </p>
            <div className="mt-12">
              <GoetheCircle />
            </div>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-bone/60">
              The Order of the Golden Dawn took the same fact — that the eye supplies the opposite —
              and put it to work on painted implements; that is the{" "}
              <Link to="/phos/tools/flashing" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                Flashing Colours
              </Link>{" "}
              instrument, and its pairs are the painter&rsquo;s rather than Goethe&rsquo;s: on the
              paintbox wheel red faces green, where on this one it is magenta that does.
            </p>
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              What this volume takes, and what it leaves
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Goethe intended the theory as a refutation of Newton, and as physics it is not one:
              spectral decomposition is real, and the polemic was wrong. Nothing here defends that
              part. What survives is a method — attend to the conditions under which a phenomenon
              first appears, and resist explaining it by something behind it before it has been
              adequately described.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Applied here, the method yields a claim that does not compete with optics at all:
              qualities arise at boundaries, in media, between poles — and they are properties of
              relations rather than of either relatum. That is the same structure Tone gives to
              force in the first volume, where relation is what organises differentiated powers into
              proportion.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              What Light distinguishes, Tone must proportion. Colour is what that proportioning looks
              like when the two powers being related are brightness and its absence.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              The fourfold ether — warmth, light, tone and life — is set out at length in{" "}
              <Link to="/" hash="fourfold" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                The Fourfold Field
              </Link>
              , with the interval each one carries into the next.
            </p>
          </div>
          {/* the instrument this section opens onto */}
          <Link
            to="/phos/tools/flashing"
            className="group mt-24 block overflow-hidden border border-gold/40 transition-colors hover:border-gold"
          >
            <span className="flex h-3 w-full" aria-hidden>
              {ZODIAC.map((z) => (
                <span key={z.sign} className="flex-1 transition-[flex] duration-500" style={{ background: z.hex }} />
              ))}
            </span>
            <span className="block bg-void/40 p-7 transition-colors group-hover:bg-gold/5 sm:p-9">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Instrument · Flashing Colours
              </span>
              <span className="mt-4 block max-w-2xl font-serif text-3xl leading-tight text-bone transition-colors group-hover:text-gold">
                The colour that will not hold still
              </span>
              <span className="mt-4 block max-w-2xl text-base leading-relaxed text-muted-foreground">
                The Golden Dawn took the same edge Goethe described and put it to work: four scales
                of colour for the four worlds, implements painted in one colour and lettered in its
                complement, tablets whose every square stands against its own opposite. The
                instrument sets out the tables, lets the pairs be tested against near misses, and
                separates what the eye is doing from what the tradition claims it means.
              </span>
              <span className="mt-6 block font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                Open the demonstration &rarr;
              </span>
            </span>
            <span className="flex h-3 w-full" aria-hidden>
              {ZODIAC.map((z, i) => (
                <span key={z.sign} className="flex-1" style={{ background: ZODIAC[(i + 6) % 12].hex }} />
              ))}
            </span>
          </Link>

          <PortalPointers ids={["xv-90", "iv-15", "xvi-6", "xix-6"]} />
        </div>
      </section>

      {/* § IX — EYE */}
      <section id="eye" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-940} />
        <Backdrop src="/bg/lampshaft.webp" opacity={0.52} position="center 60%" scrim={0.18} portrait anchor="left" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § IX · The Sunlike Eye
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">Ὄψις</h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            The receiver must be of the same nature as what it receives
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              “Were the eye not sunlike, it could never see the sun.” Plotinus states the principle,
              Goethe gives it the line everyone quotes, and it is the most abused sentence in the
              whole tradition.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The defensible reading is narrow and true. Reception is never passive: an organ receives
            only what it is constituted to receive, and the constitution is a real precondition, not
            a metaphor. An ear cannot hear light. An untrained eye does not see the distinctions a
            trained one sees, and the training is a genuine change in the organ rather than in the
            attention paid by an unchanged one. Capacity is formed, and forming it is work.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The abuse is the inference that the organ therefore supplies what it perceives. From
            &ldquo;only a sunlike eye sees the sun&rdquo; it does not follow that the eye makes the
            sun, that seeing proves kinship with divinity, or that whoever fails to see is deficient
            in being rather than in position, instruction, or luck. Each of those is a further claim
            and each needs its own argument.
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Three things the principle establishes
            </p>
            <div className="mt-8 space-y-px">
              {[
                {
                  k: "Formation",
                  d: "Capacity to perceive is built rather than issued. Which makes discipline meaningful and makes the absence of an experience uninformative about whether there was anything to have.",
                },
                {
                  k: "Correspondence",
                  d: "Perception is a meeting of two constitutions, so what is perceived is neither purely given nor purely made. The first volume calls this the reciprocal field, and it is the reason no perception is a neutral report.",
                },
                {
                  k: "Accountability",
                  d: "If the organ is a variable, then the organ can be examined — its history, its habits, its distortions. An account that treats perception as immediate has removed the one thing that could be checked.",
                },
              ].map((f) => (
                <div
                  key={f.k}
                  className="group grid grid-cols-1 items-baseline gap-2 border-b border-border py-5 transition-colors hover:border-gold/40 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {f.k}
                  </span>
                  <span className="text-base leading-relaxed text-muted-foreground">{f.d}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              The third is the point. Treating the eye as sunlike is not a licence for confidence —
              it is what makes the eye part of the evidence, and therefore something that can be
              wrong in describable ways.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              How field and form make each other is worked out at length in{" "}
              <Link to="/" hash="reciprocal" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                The Reciprocal Field
              </Link>
              .
            </p>
          </div>
          <PortalPointers ids={["xv-19", "xvi-2", "iii-17", "xix-2"]} />
        </div>
      </section>

      {/* § X — COUNTERFEITS */}
      <section id="counterfeits" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-1060} />
        <Backdrop src="/bg/mirrorcascade.webp" opacity={0.3} position="center 46%" scrim={0.26} portrait />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § X · The Counterfeits of Light
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">
            Brightness is not <span className="italic text-gold">illumination</span>
          </h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            Seven ways the vocabulary of light is used to avoid being checked
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              Every one of these is available to someone entirely sincere. None requires deceit, and
              that is what makes the list worth having — the counterfeits are not lies about light,
              they are true statements in the wrong register.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The vocabulary of illumination carries an unusual rhetorical privilege: to have seen the
            light is to have arrived somewhere the unilluminated cannot follow, and any objection can
            be reclassified as blindness. A system that hands itself that privilege has stopped being
            answerable to anything, which is why this section exists before § XI and not after it.
          </p>

          <div className="mt-20 grid gap-px sm:grid-cols-2">
            {[
              {
                n: "I",
                k: "Glare",
                d: "Intensity that prevents sight rather than enabling it. A source bright enough to dominate the field leaves the eye unable to make out anything else — and the experience is nevertheless one of overwhelming light.",
                t: "Did it make more visible, or only make more impression?",
              },
              {
                n: "II",
                k: "Glamour",
                d: "The surface loved as a source. A face, an object, a teacher or an image shines with borrowed light and is taken for where the light began. § I is the whole of the diagnosis: splendor mistaken for lux.",
                t: "Where did this get its light, and does it say so?",
              },
              {
                n: "III",
                k: "The self-lit medium",
                d: "An intermediary that has begun emitting on its own account while still presenting itself as transmission. Traditions, translators and institutions drift into this without a decision ever being made.",
                t: "Could it distinguish what it received from what it has added?",
              },
              {
                n: "IV",
                k: "Transparency as claim",
                d: "The assertion of having no position, no medium, no colour of one’s own — announced rather than demonstrated. § IV’s answer holds: there is no unmediated transmission, so the claim to be pure medium is always false and usually unexamined.",
                t: "What does it characteristically add, by its own account?",
              },
              {
                n: "V",
                k: "The unshadowed doctrine",
                d: "A system that claims to have lit everything and can name nothing it left in shade. Either it lights less than it says, or it has flattened its subject until nothing has volume.",
                t: "What did it darken in order to show what it showed?",
              },
              {
                n: "VI",
                k: "Certified by presence",
                d: "The vividness of an inner experience treated as its own verification, usually with a borrowed warrant from § VII. But knowing that one is present to oneself establishes nothing about the content of what one then believes.",
                t: "What would count as this being mistaken?",
              },
              {
                n: "VII",
                k: "The light that will not go out",
                d: "An illumination that has outlived its occasion and is maintained past its usefulness, because ending it would mean admitting the season is over. The first volume names the general form of this telestic inertia.",
                t: "Is this still doing work, or is it being kept lit?",
              },
            ].map((c) => (
              <article
                key={c.k}
                className="group border border-border p-5 transition-colors hover:border-gold/40 sm:p-7"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  {c.n} · {c.k}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.d}</p>
                <p className="mt-5 border-l-2 border-gold/40 pl-4 font-serif text-lg italic leading-relaxed text-bone/85">
                  {c.t}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-16 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The common structure is a register error. Each takes something real in one register —
            an intensity, a surface, a medium, an inner presence — and treats it as though it
            belonged to another, where it would carry an authority it has not earned. Which is why
            § I is the working instrument of this section: nearly every counterfeit dissolves once
            you can say which of the three you are looking at.
          </p>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-bone/60">
            The first volume&rsquo;s parallel list, for spirit rather than light, is the six
            counterfeits in{" "}
            <Link to="/" hash="matter" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
              Spiritualising Matter
            </Link>
            .
          </p>
          <PortalPointers ids={["xii-22", "xx-10", "xix-19", "iv-1"]} />
        </div>
      </section>

      {/* § XI — READING */}
      <section id="reading" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-1185} />
        <Backdrop src="/bg/opticstable.webp" opacity={0.34} position="center 50%" scrim={0.2} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XI · The Discipline of Reading Light
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">
            Seven questions, before <span className="italic text-gold">anything is believed</span>
          </h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            A method, not a test of authenticity
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              None of these asks whether an experience was real. They ask what it was an experience
              of, which is a different question, and the only one that can actually be worked on.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Someone reports an inner light: a brightness in meditation, a lucid dream, a room that
            seemed lit from within, a face that shone. The temptation is to rule immediately on
            whether it was genuine. The discipline is to decline that ruling for as long as
            possible, and to ask instead a series of questions that can each be answered without it.
          </p>

          <div className="mt-20 max-w-4xl space-y-px">
            {[
              {
                n: "01",
                q: "Which register?",
                d: "Source, medium, or surface — lux, lumen, or splendor. Nearly every confusion in this vocabulary is settled here, and nothing further can be asked well until it is answered.",
              },
              {
                n: "02",
                q: "What is the medium, and what does it add?",
                d: "Nothing arrives unmediated. Language, tradition, expectation, physiology, the state of the body — name the medium and its characteristic colouring, and correct for it rather than pretending it away.",
              },
              {
                n: "03",
                q: "What did it put in shade?",
                d: "Every illumination selects. An experience or a doctrine that can name nothing it obscured has not examined its own geometry, which is § V’s charge.",
              },
              {
                n: "04",
                q: "What was returned?",
                d: "Or Chozer, not Or Yashar. The descending light cannot be measured and the returning light can — so the question is never how much was received but what the receiver did with it afterward.",
              },
              {
                n: "05",
                q: "Was it within measure?",
                d: "Did the vessel come away more able to receive again, or less? Overwhelm that leaves someone depleted, destabilised, or dependent has failed the test regardless of how it felt at the time.",
              },
              {
                n: "06",
                q: "What would count as being wrong?",
                d: "If nothing would, the claim is not being held as a claim. This is the single question that most reliably separates a discernment from a conviction.",
              },
              {
                n: "07",
                q: "Does it improve relation?",
                d: "Not intensity, not certainty, not the sense of having been chosen — coherence among experience, evidence, responsibility, and the people actually involved. Meaning earns trust by producing more of that, and by nothing else.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-border py-6 transition-colors hover:border-gold/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  {s.n}
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-xl leading-snug text-bone/90 sm:text-2xl">
                    {s.q}
                  </span>
                  <span className="mt-2 block text-base leading-relaxed text-muted-foreground">
                    {s.d}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-20 max-w-3xl">
            <p className="mt-8 border-l-2 border-bone/40 pl-5 text-base leading-relaxed text-bone/80">
              The seven do not decide whether anything metaphysical occurred, and they are not
              designed to. What they do is keep the question open long enough for evidence,
              consequence and other people to have a say — which is the only thing that has ever
              distinguished a discipline from a certainty.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-bone/60">
              The staged version of this — sensation, image, interpretation, belief, claim, and the
              four intervals between them — is the figure in{" "}
              <Link to="/" hash="soul" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
                Soul and Interior Life
              </Link>
              .
            </p>
          </div>
          <PortalPointers ids={["xx-1", "xx-11", "xix-16", "xix-18"]} />
        </div>
      </section>

      {/* § XII — RESTORATION */}
      <section id="restoration" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-1300} />
        <Backdrop src="/bg/altarflame.webp" opacity={0.36} position="center 55%" scrim={0.2} portrait />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XII · The Returning Light
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">Ἐπιστροφή</h2>
          <p className="mt-4 font-serif text-lg italic text-gold-dim">
            What illumination is for, and why it is not the end of the work
          </p>
          <div className="mt-10 max-w-3xl border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-relaxed text-bone/90">
              The volume closes where the first one does: not at the top of a ladder but at the
              point where a circuit closes and can run again.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Every strand gathered here agrees on the shape and disagrees about almost everything
            else. The Neoplatonists have procession completed by return. Lurianic Kabbalah has the
            scattered sparks gathered — a restoration performed in the world rather than away from
            it. Suhrawardī has longing ascending as the exact complement of illumination descending.
            None of them ends with arrival at the source, and all of them end with something sent
            back.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            So the last question the volume asks is not whether someone has been illuminated. It is
            what the light was for. An illumination that terminates in the person who had it has
            failed by the standard of every tradition assembled here — not because private
            experience is worthless, but because a vessel that receives without returning has
            stopped being a vessel and become a container.
          </p>

          <div className="mt-24 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The circuit, restated
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              A source gives because giving is what it is. What is given crosses something that must
              not keep it. It meets a body, and the meeting produces both the visible thing and its
              shadow. The body returns what it can, and the return is the only part that can be
              measured. Where the return exceeds the vessel it breaks it, and the light scatters
              into what comes after — which is not the end of the story but the condition of the
              next one.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Read that way, illumination is not a state anyone attains. It is a position in a
              circulation, occupied for a while, and the appropriate response to occupying it is to
              pass something on rather than to be photographed in it.
            </p>
            <p className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-xl leading-relaxed text-bone/85">
              The measure of light received is light returned. Nothing else in this volume is
              measurable, and nothing else needs to be.
            </p>
          </div>

          <div className="mx-auto mt-24 h-px w-24 bg-gold/40" />
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            Which leaves the volume where it began, with the observation that the eye never sees the
            light and only ever sees what the light reached. That is not a limitation to be
            transcended. It is the structure of visibility itself, and the reason there is anything
            to look at.
          </p>
          <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl leading-relaxed text-bone/90">
            Nothing here asks you to become light. It asks you to be{" "}
            <span className="italic text-gold">a vessel that returns what it was given</span>, and
            to know your own measure before you ask for more.
          </p>
          <PortalPointers ids={["xiii-31", "xix-14", "xviii-21", "xix-20"]} />
        </div>
      </section>

      {/* LEXICON */}
      <section id="luxlexicon" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-1420} />
        <Backdrop src="/bg/archive.webp" opacity={0.46} position="center 50%" scrim={0.22} portrait anchor="left" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § Lexicon · The Terms of This Volume
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The vocabulary, and its <span className="italic text-gold">home sections</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            One line each, a pointer to the section that does the work, and where the Portal has an entry that treats the word, a pointer there too. The first
            volume&rsquo;s terms are not repeated here; its own{" "}
            <Link to="/" hash="lexicon" className="text-gold-dim underline-offset-4 hover:text-gold hover:underline">
              Lexicon
            </Link>{" "}
            carries them, and restating a definition in two places is how the two of them would
            start to disagree.
          </p>
          <div className="mt-10 grid gap-x-12 gap-y-px lg:grid-cols-2">
            {[
              { term: "Lux", script: "Πηγή", at: "registers", n: "I", portal: "xxi-3", gloss: "Light in its source — self-possessed, undivided, and by itself never seen." },
              { term: "Lumen", script: "Διαφανές", at: "registers", n: "I", portal: "xxi-3", gloss: "Light in transit through what is transparent, and invisible while in transit." },
              { term: "Splendor", script: "Χρῶμα", at: "registers", n: "I", portal: "xxi-3", gloss: "Light received by a bounded body and given back — as sheen, or as colour." },
              { term: "Bonum diffusivum sui", at: "diffusion", n: "II", portal: "i-15", gloss: "The Good is self-diffusing: giving is what it is, not something it decides, and the giving costs it nothing." },
              { term: "Multiplication of species", at: "deluce", n: "III", portal: "xv-84", gloss: "Grosseteste’s term for the instantaneous self-propagation by which a point of light generates a sphere — and thereby the first body." },
              { term: "Rarefaction", at: "deluce", n: "III", portal: "xv-83", gloss: "Densest at the point, thinnest at the rim. Distance from the source is a difference of degree, never of substance." },
              { term: "Diaphanes", script: "διαφανές", at: "medium", n: "IV", portal: "xv-21", gloss: "The transparent — not a material but a capacity: to be crossed without keeping what crosses." },
              { term: "Turbidity", at: "medium", n: "IV", portal: "xv-90", gloss: "A medium that colours what it carries and takes the colour for its own. The characteristic failure of every intermediary." },
              { term: "Umbra and penumbra", at: "shadow", n: "V", portal: "vi-27", gloss: "Full shade and its graded margin. Most real shadows have the margin, and most real understanding lives in it." },
              { term: "Or Yashar", at: "vessel", n: "VI", gloss: "The straight light, descending from the source. It cannot be measured, because measurement happens at the far end." },
              { term: "Or Chozer", at: "vessel", n: "VI", portal: "xviii-21", gloss: "The returning light — the vessel’s own act, and the only part of the exchange that can be measured." },
              { term: "Tzimtzum", at: "vessel", n: "VI", gloss: "The contraction that clears a space in which something not-itself can exist. The first gift is the room." },
              { term: "Shevirat ha-kelim", at: "vessel", n: "VI", portal: "xix-11", gloss: "The breaking of the vessels: light past the measure is not returned but scattered, with sparks caught in the shards." },
              { term: "Ishrāq", at: "ladder", n: "VII", portal: "xxi-10", gloss: "Illumination as the single substance of being — degrees differing in intensity, never in kind." },
              { term: "Barzakh", at: "ladder", n: "VII", gloss: "The isthmus: body, dark in itself, and what a light must stand on to be somewhere rather than everywhere." },
              { term: "Knowledge by presence", at: "ladder", n: "VII", portal: "xv-80", gloss: "A light knows itself without an image standing between. A narrow claim about self-awareness, routinely borrowed as a warrant for far wider ones." },
              { term: "Urphänomen", at: "colour", n: "VIII", portal: "xv-90", gloss: "The primal phenomenon: light through turbidity warms, darkness through lit turbidity cools, and colour belongs to the boundary." },
              { term: "The sunlike eye", at: "eye", n: "IX", gloss: "An organ receives only what it is constituted to receive — which makes the organ part of the evidence, and therefore checkable." },
              { term: "Glare", at: "counterfeits", n: "X", portal: "v-29", gloss: "Intensity that prevents sight rather than enabling it, and is experienced as overwhelming light." },
              { term: "Glamour", at: "counterfeits", n: "X", portal: "xii-22", gloss: "A surface loved as a source. Splendor mistaken for lux — the commonest counterfeit, and the most sincere." },
            ].map((e: { term: string; script?: string; at: string; n: string; gloss: string; portal?: string }) => (
              <div
                key={e.term}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-4 transition-colors hover:border-gold/40"
              >
                <a href={`#${e.at}`} className="min-w-0">
                  <span className="block font-serif text-lg text-bone transition-colors group-hover:text-gold">
                    {e.term}
                    {e.script && <span className="ml-2 text-base text-gold-dim">{e.script}</span>}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {e.gloss}
                  </span>
                </a>
                <span className="flex shrink-0 flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                  <a href={`#${e.at}`}>§ {e.n}</a>
                  {e.portal && (
                    <EntryLink id={e.portal} className="text-gold/50 transition-colors hover:text-gold">
                      Portal · {ref(e.portal).numeral} {ref(e.portal).n}
                    </EntryLink>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PORTAL */}
      <section id="encyclopaedia" className="relative isolate border-t border-border py-32">
        <SectionGlyph delay={-612} />
        <Backdrop src="/bg/shaftvault.webp" opacity={0.36} position="center 55%" scrim={0.2} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § The Portal · Beyond This Volume
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The encyclopaedia this volume <span className="italic text-gold">opens onto</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Twelve sections can state a doctrine of light. They cannot hold what the doctrine has to
            answer to. The Portal does: twenty-one divisions — first principles, the anatomy of an
            illumination, fifty-nine luminous qualities, the orders of light and of darkness, the sky,
            the elements, the organism, the soul, visionary phenomena, the mediating orders, the
            operations, the rites, a global history, the science, the symbols, the laws, the
            practices, and a reference library — with every entry labelled by the kind of claim it
            makes, and browsable by tradition, quality, plane, operation, symbol, text, and period.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            It was written entry by entry, and said so as it went: what was not yet written was
            listed as forthcoming rather than filled in — the rule the Architecture set for itself on
            its first page, kept. Every entry is now written. Each of the twelve sections above closes
            on the entries that carry its argument further, and the Formula below names, line by line,
            the laws it compresses.
          </p>
          <Link
            to="/phos/portal"
            className="mt-10 inline-block border border-gold/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold/10"
          >
            Enter the Portal →
          </Link>
        </div>
      </section>

      {/* THE LUMINOUS FORMULA */}
      <section id="luminous" className="relative isolate overflow-hidden border-t border-border py-40">
        <Backdrop src="/bg/nightterrace.webp" opacity={0.44} position="center 50%" scrim={0.16} portrait />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.16]"
            width="1300"
            height="1300"
            viewBox="-650 -650 1300 1300"
            aria-hidden
          >
            <circle r="620" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="440" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="280" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            {["Πηγή", "Δόσις", "Διαφανές", "Σκιά", "Ἀγγεῖον", "Μέτρον", "Χρῶμα", "Ὄψις", "Ἐπιστροφή"].map(
              (g, i, a) => {
                const ang = (i * Math.PI * 2) / a.length - Math.PI / 2;
                return (
                  <text
                    key={g}
                    x={Math.cos(ang) * 550}
                    y={Math.sin(ang) * 550}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="EB Garamond, serif"
                    fontSize="22"
                    fontStyle="italic"
                    fill="oklch(0.78 0.13 75 / 0.6)"
                    transform={`rotate(${(i * 360) / a.length + 90} ${Math.cos(ang) * 550} ${Math.sin(ang) * 550})`}
                  >
                    {g}
                  </text>
                );
              },
            )}
          </svg>
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
            ΦΩΣ · The Luminous Formula
          </p>
          <div ref={formulaRef} className="aoh-formula relative mt-12">
            <div className="aoh-formula-beam" aria-hidden />
            <div className="aoh-formula-tip" aria-hidden />
            <div className="relative space-y-4 font-serif text-lg italic leading-relaxed text-bone/85 sm:text-xl md:text-2xl">
            <p data-formula-line>
              The Source gives, because giving is what it is.
              <LawTag id="xix-3" />
            </p>
            <p data-formula-line>
              What is given is not the Source, and the Source is not diminished.
              <LawTag id="xix-3" />
            </p>
            <p data-formula-line>
              The giving extends, and extension is the first body.
              <LawTag id="xix-5" />
            </p>
            <p data-formula-line>
              What extends must cross a medium.
              <LawTag id="xix-1" />
            </p>
            <p data-formula-line>
              The medium keeps part, alters part, and loses part.
              <LawTag id="xix-7" />
            </p>
            <p data-formula-line>
              What arrives meets a body, and the body casts a shadow.
              <LawTag id="xix-10" />
            </p>
            <p data-formula-line>
              The shadow is not absence — it is the body&rsquo;s report of its own shape.
              <LawTag id="xix-10" />
            </p>
            <p data-formula-line>
              The body holds what its measure allows.
              <LawTag id="xix-9" />
            </p>
            <p data-formula-line>
              Past the measure the vessel breaks, and the light scatters into the shards.
              <LawTag id="xix-8" />
              <LawTag id="xix-11" />
            </p>
            <p data-formula-line>
              Within the measure the vessel returns, and the return is what can be known.
              <LawTag id="xix-14" />
            </p>
            <p data-formula-line>
              At the boundary between what is returned and what is not, colour arises.
              <LawTag id="xix-6" />
            </p>
            <p data-formula-line>
              And the eye, being of the same nature, receives it —{" "}
              <span className="not-italic text-gold">and owes what it received</span>.
              <LawTag id="xix-15" />
            </p>
            </div>

            <div data-formula-rule className="relative mx-auto mt-20 h-px w-24 bg-gold/50" />
            <p data-formula-coda className="relative mt-12 font-serif text-xl italic text-bone/80 sm:text-2xl">
              Light is not seen.
              <br />
              What is seen is light <span className="text-gold">arrived</span>.
            </p>
          </div>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Ω · Phōs — the architecture read by its own light
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-void py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 sm:flex sm:justify-between">
          <div className="min-w-0 truncate font-serif text-sm italic text-muted-foreground">
            Phōs · The Luminous Architecture —{" "}
            <Link to="/" className="underline-offset-4 hover:text-gold hover:underline">
              the first volume
            </Link>
          </div>
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.4em] text-gold-dim">
            MMXXVI
          </div>
        </div>
      </footer>
    </div>
  );
}
