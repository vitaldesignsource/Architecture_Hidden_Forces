import { createFileRoute } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers } from "@/components/ecology/Pointers";
import { Spolia } from "@/components/diagrams/Spolia";
import { station } from "@/lib/ecology";

/**
 * Station V — The Ossuary of Living Forms. Morphological inheritance.
 *
 * The treatise placed the Ossuary in the Retentive Depth and gave it its one
 * sentence: death is dissolution of a particular vessel, not erasure of what
 * passed through it. This station develops the half of that sentence that
 * is about architecture — what remains available for reuse — and leaves the
 * other half, consequence, to the Crypt, which is the distinction the whole
 * layer turns on.
 */
export const Route = createFileRoute("/ecology_/ossuary")({
  head: () => ({
    meta: [
      { title: "The Ossuary of Living Forms — The Hidden Ecology of Formation" },
      { name: "description", content: "The morphological inheritance of becoming: graveyard, library, workshop and quarry at once. Dead forms and living patterns, the morphological library, the quarry of becoming, the ancestry of form, and when inheritance becomes a prison." },
    ],
  }),
  component: Ossuary,
});

const S = station("ossuary");

const SURVIVORS: [string, string][] = [
  ["Biological structures", "the vertebrate limb in the fin, the wing and the hand; the same bones, another life"],
  ["Languages", "a dead tongue's grammar carried in a living one's, its case-endings worn to prepositions"],
  ["Symbols", "a sign outliving the cult that made it, available to the next"],
  ["Myths", "a story's architecture retold with new names in the old places"],
  ["Rituals", "a gesture kept after its first meaning has gone, and given another"],
  ["Institutions", "an office surviving the order that created it, refilled"],
  ["Architectural forms", "the arch, the dome, the colonnade: quarried, literally, from the buildings before"],
  ["Technologies", "the shape of a tool persisting in the shape of the tool that replaced it"],
  ["Cultural patterns", "a calendar, a courtesy, a way of mourning, inherited past its reasons"],
];

function Ossuary() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the bones of becoming ---- */}
      <Band id="eco-o-bones" backdrop="quarried-blocks-in-mason-yard" opacity={0.22} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The bones of becoming</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Forms perish. <span className="italic text-gold">Architectures remain available.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              The Ossuary is not a metaphysical graveyard. It is a graveyard, a morphological
              library, a workshop of inheritance and a quarry of becoming at once.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The treatise sets the Ossuary in the <Arch id="retentive">Retentive Depth</Arch> and
              says what it holds: when an organism dies its unified operation ends, but its
              components and consequences continue — its matter enters other systems, its actions
              remain within other lives, its symbolic effects may outlast its body by centuries. The
              ecology asks the narrower and more useful question. Of all that continues, what is
              <span className="italic text-bone/85"> architecture</span> — what remains not as
              effect but as pattern, available to be built with again?
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              An ossuary in the plain sense is where bones are kept after the flesh is gone, and
              the image is chosen for what bones are: not the life, but the structure the life was
              organised on, which outlasts it and can be read. The Ossuary of Living Forms is the
              ecology's store of such structures — the morphological inheritance of becoming. Its
              governing question is not what happened to the dead but{" "}
              <span className="text-bone/90">what architectures does previous life leave behind?</span>
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              The future scavenges the past.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Nature and culture very rarely make unprecedented forms. They modify inherited
              architectures — rework a limb, repurpose a word, re-set a column into a wall. The
              treatise's own <Arch id="spine">spine</Arch> puts it as a commitment: nature preserves
              no vessel forever, yet begins from nothing.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <Spolia />
          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            analogical · the gold blocks are the same blocks
          </p>
        </div>
      </Band>

      {/* ---- dead forms and living patterns ---- */}
      <Band id="eco-o-patterns" backdrop="colonnade-ruins-at-coloured-dawn" opacity={0.2} position="center 50%">
        <Eyebrow>Dead forms and living patterns</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Architectures survive the organisms and cultures <span className="italic text-gold">that produced them</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The distinction the station rests on is between a form and its architecture. The form
          is the living whole — this animal, this language as spoken, this temple in use. The
          architecture is the pattern the whole was organised on, and the pattern is the part that
          can go on without it. Nine cases, each the same fact:
        </p>
        <Items items={SURVIVORS} />
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-bone/60">
          The Portal's entry on <Entry id="ii-28">residual light in the Ossuary</Entry> adds the
          caution this station keeps: a surviving architecture is not a surviving consciousness, a
          trace is not a person, and an inherited pattern is not a perfect recording. The Ossuary
          concerns the structure — which is the reason it can be built with.
        </p>
      </Band>

      {/* ---- the morphological library ---- */}
      <Band id="eco-o-library" backdrop="sapling-growing-from-fallen-log" opacity={0.2} position="center 55%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The morphological library</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">Reusable patterns</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A library is the second thing the Ossuary is: the patterns are not only kept but
              legible, and a form that is forming can read them. This is what the treatise means
              when it says that "field before form" needs no warehouse of perfect templates —
              patterns may descend from higher logoi, emerge through feedback, or{" "}
              <Arch id="atmosphere">inherit previous structures</Arch>. The third source is the
              library. A seedling on a nurse log is not consulting a blueprint of trees; it is
              growing in an architecture a tree left, on the pattern the tree's decay set for it.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              What makes a pattern reusable is that it was a solution to a relation, and relations
              recur. The arch solved the problem of a span; the myth of descent and return solved
              the problem of telling what a death is for. Any later form facing the same relation
              finds the solution in the library, already made, and pays for it in the coin every
              inheritance costs: the solution comes with the assumptions of the world that made it.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the quarry ---- */}
      <Band id="eco-o-quarry">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The quarry of becoming</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">Appropriation and <span className="italic text-gold">transformation</span></h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A library is read; a quarry is worked. Future forms do not merely consult the past's
              architectures, they take them apart and set the pieces into something the past did
              not intend — the drum of a column laid on its side as a threshold, the gesture of an
              older rite given a meaning the older rite would not have recognised. The Ossuary is a
              workshop because inheritance is always also alteration: what is taken is fitted, and
              the fitting changes it.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is the station's answer to a sentimental view of tradition. The past is not
              honoured by being kept whole; it is honoured by being used, which means cut. The
              builder who sets an old capital into a new corner is doing exactly what the
              tradition that carved it did with the one before. Which does not make every cut
              right — the last section of this station is about the wrong ones — but it puts the
              question where it belongs: not whether to quarry, but what to build.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- ancestry of form ---- */}
      <Band id="eco-o-ancestry" backdrop="ruined-arch-in-rain-lit-court" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Ancestry of form</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">Chains of formal inheritance</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Because every form quarries the Ossuary, every form has an ancestry — a chain of
              architectures each of which was quarried from the one before. The treatise's
              account of <Arch id="lineage">lineage</Arch> and of{" "}
              <Arch id="tradition">tradition</Arch> describes this for the transmission of
              practice; the ecology generalises it to form as such. A word has ancestors. A ritual
              has ancestors. A body has ancestors in a sense older than genealogy: the bones it is
              organised on were solutions found in creatures that had no name.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Ancestry is read backwards from the present form, and it is read in the form's
              anomalies — the part that makes no sense for what the form does now and perfect sense
              for what its ancestor did. The vestigial is the Ossuary showing through the living.
              It is also where the chain can be traced honestly, since a form's own account of its
              origins is usually the one it prefers.
            </p>
            <Deeper label="Go deeper · what the Ossuary is not">
              <p>
                It is not the Crypt, and the next station exists to say why. Briefly: the Ossuary
                keeps patterns, which are available for reuse whether or not anyone reuses them;
                the Crypt keeps consequence, which is not available for anything — it is simply the
                case, and the world is different for it. A column can be quarried. The fact that a
                temple once stood there, and what happened in it, cannot be quarried; it can only
                be inherited as the condition of the ground.
              </p>
              <p>
                And it is not an afterlife. The Portal's caution stands: residual light is real, and
                it is trace, not tenant. Whether spirit and soul continue beyond the dissolved vessel
                is a question the treatise answers elsewhere and answers in the affirmative; the
                Ossuary is silent about it, because its subject is what the vessel leaves in the
                world, not where the vessel's life goes.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- when inheritance becomes a prison ---- */}
      <Band id="eco-o-prison" backdrop="burned-forest-slope-regrowing" opacity={0.2} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>When inheritance becomes a prison</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              Neither automatically sacred <span className="italic text-gold">nor automatically pathological</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              An inherited architecture is a gift and a constraint in the same act. The solution
              it offers was found under conditions that no longer hold, and a form that adopts it
              adopts the conditions with it. Most of the time that is the price of not beginning
              from nothing, and it is a good price. Sometimes the inherited pattern is exactly what
              prevents the form from conducting its current — the institution whose procedures were
              designed for a purpose it no longer has, the rite whose every gesture is kept and
              whose meaning is not. Then the Ossuary has become the thing the previous station
              named: a structure preserving itself, and <Entry id="xix-11">captive light</Entry>{" "}
              inside it.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The layer refuses both easy verdicts. Inherited forms are not sacred because they are
              old, and novelty is not superior because it is new; a burned slope regrows on the
              architecture of the forest that burned, and both the fire and the regrowth are the
              ecology working. The criterion is the same everywhere in this system:
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl leading-relaxed text-bone/90">
              Does the architecture maintain right relation with the force it exists to mediate?
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Where it does, keep it, and quarry it gratefully. Where it does not, the treatise's{" "}
              <Arch id="relation">law of right relation</Arch> and the Portal's{" "}
              <Entry id="xiii-27">account of liberation</Entry> say what to do, and neither of them
              says demolish.
            </p>
            <Pointers
              arch={["retentive", "spine", "laws", "lineage", "tradition", "atmosphere", "relation"]}
              portal={["ii-28", "ix-24", "v-19", "xix-11", "xiii-27", "vi-25"]}
            />
          </div>
        </div>
      </Band>

      <Transition from="ossuary" />
    </EcologyFrame>
  );
}
