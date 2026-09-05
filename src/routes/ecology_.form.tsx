import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Province, Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers } from "@/components/ecology/Pointers";
import { FormAtTheIntersection } from "@/components/diagrams/FormAtTheIntersection";
import { CaptiveLightProgression } from "@/components/diagrams/CaptiveLightProgression";
import { station } from "@/lib/ecology";

/**
 * Station IV — Living Form. Embodiment, participation.
 *
 * The intersection of the whole ecology, and so the page where it turns:
 * form is where the descent becomes a body, and dissolution is where the
 * body gives the ecology back what it held. The strongest philosophical
 * claim of the layer is here — that fidelity to a force may require
 * breaking fidelity with the form built to carry it.
 */
export const Route = createFileRoute("/ecology_/form")({
  head: () => ({
    meta: [
      { title: "Living Form — The Hidden Ecology of Formation" },
      { name: "description", content: "Form at the intersection of the ecology: a temporary architecture of participation. Right limitation and right permeability, dissolution and death as part of circulation, captive light and failed architecture." },
    ],
  }),
  component: Form,
});

const S = station("form");

const HEALTHY: [string, string][] = [
  ["Receives", "takes up the nourishment its condition and its aptitude allow — neither refusing it nor drowning in it"],
  ["Contains", "holds what it received long enough for it to become something; a form without containment is a channel"],
  ["Differentiates", "makes of the one current the particular thing this form is: this life, this work, this meaning"],
  ["Transmits", "passes on what it was built to pass on — to its parts, to what depends on it, to what comes after"],
  ["Transforms", "returns what it received in another mode: nourishment as act, act as consequence"],
  ["Releases", "lets go what it can no longer hold, including, at the last, itself"],
];

const ENDINGS: [string, string][] = [
  ["The organism", "dies: its unified operation ends, its matter and its consequences continue"],
  ["The institution", "loses its purpose, and either finds another or begins to exist for its own continuation"],
  ["The temple", "collapses, or stands as a building the current has left"],
  ["The symbol", "empties: the sign remains, and can no longer do what it did"],
  ["The ritual", "becomes mechanical — performed exactly, and conducting nothing"],
  ["The architecture", "can no longer properly conduct the current for which it was made"],
];

function Form() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the intersection ---- */}
      <Band id="eco-f-intersection" backdrop="stone-arch-under-construction" opacity={0.2} position="center 50%">
        <Eyebrow>Form as the intersection</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Where the whole ecology <span className="italic text-gold">meets</span>
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="font-serif text-xl leading-relaxed text-bone/90 sm:text-2xl">
              A form emerges within Morphaithēr, fed by the Sap, through an Etheric Hydrology, using
              architectures inherited from the Ossuary, within a world already conditioned by the
              Crypt.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Which makes form neither the goal of the ecology nor its by-product but its meeting
              place — the one station where all five dimensions are present at once and have to be
              held together by something. The something is temporary. That is not a defect; it is
              the definition. A living form is a temporary architecture of participation: a
              structure that exists for as long as it can sustain the relation it exists for, and
              that ends when it cannot.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The treatise's <Arch id="forceform">law of force and form</Arch> says that force
              alone creates nothing enduring — it must be limited, proportioned, polarised and
              contained. This station says what the container is inside the ecology: the place
              where the current becomes a body, for a while.
            </p>
          </div>
          <div>
            <FormAtTheIntersection />
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              spatial · the vessel is open above and below on purpose
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the healthy form ---- */}
      <Band id="eco-f-healthy">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>What a healthy form does</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">Six verbs, <span className="italic text-gold">in measure</span></h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A form is judged by what it does with what passes through it, and the treatise's{" "}
              <Arch id="laws">laws of formation</Arch> already supply the criteria — selective
              permeability, formative metabolism, proportional integration. Read as one ecology,
              the criteria come to six verbs. None is good maximised; a form that only receives is
              a sink, and one that only releases is a leak.
            </p>
            <Items items={HEALTHY} />
          </div>
        </div>
      </Band>

      {/* ---- right limitation ---- */}
      <Band id="eco-f-limitation" backdrop="crystal-suspended-in-glass-sphere" opacity={0.2} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Right limitation, right permeability</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              Neither a prison <span className="italic text-gold">nor an illusion</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Two errors about form recur in every spiritual literature. One says the body, the
              institution, the word, the rite are prisons the spirit must escape. The other says
              they are illusions the spirit need not take seriously. The ecology refuses both,
              because both misdescribe what limitation does.
            </p>
            <div className="mt-8 grid gap-px border border-border bg-border/60 sm:grid-cols-2">
              {[["A river", "needs banks."], ["A melody", "needs intervals."], ["A body", "needs membranes."], ["A word", "needs boundaries."]].map(([a, b]) => (
                <div key={a} className="bg-void p-6">
                  <p className="font-serif text-2xl text-bone/90">{a} <span className="text-gold">{b}</span></p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Limitation is what makes particular manifestation possible at all; the treatise
              names <Arch id="laws">the cost of form</Arch> — to actualise one form is to exclude
              others — and calls it not tragic but necessary, since without exclusion nothing
              definite could appear. So the metaphysical problem is never simply limitation. It is{" "}
              <span className="text-bone/90">right limitation and right permeability</span>: banks
              that hold the river without stopping it, a membrane that distinguishes the cell
              without sealing it. The same law that makes form possible makes captivity possible,
              and the difference between them is a matter of measure, not of kind.
            </p>
            <Deeper label="Go deeper · the vessel as gatekeeping intelligence">
              <p>
                The treatise's law of selective permeability puts it in one image: a vessel is not
                a container but a gatekeeping intelligence, and the cell membrane is the exact
                picture — distinguishing the cell from its environment while admitting selected
                substances, signals and energies. Complete openness dissolves; complete closure
                starves. Identity exists through regulated exchange.
              </p>
              <p>
                Right permeability is therefore not a compromise between openness and closure. It is
                a third thing: the form's ongoing judgement about what it is for, enacted at its
                boundary. A form whose boundary has stopped judging — admitting everything, or
                nothing — has already begun to fail, whatever its walls look like from outside.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- dissolution ---- */}
      <Band id="eco-f-dissolution" backdrop="cracked-vessel-mended-with-gold-light" opacity={0.26} position="center 50%">
        <Eyebrow>Dissolution and death</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          When a form can no longer sustain the relation <span className="italic text-gold">for which it exists</span>
        </h2>
        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div>
            <Items items={ENDINGS} />
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Every one of these is the same event at a different scale: the architecture can no
              longer conduct its animating current. The ecology treats that as a part of
              circulation, not merely as catastrophe — and the treatise's{" "}
              <Arch id="mortality">account of death and suffering</Arch> is the reason it can,
              since that account already refuses to make death intrinsically evil while refusing
              just as firmly to pretend it is secretly good. Dissolution is what the vessel's ending
              looks like from inside the vessel. From inside the ecology it is a release.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The vessel ends. The larger economy continues. And what the vessel held goes three
              ways: some of its architecture passes into the Ossuary, where it remains available;
              some of its consequence enters the Crypt, where it conditions what follows; and some
              possibility it had captured — the sap it held for its own continuation — becomes
              available for new circulation. That last is why the alchemists' <Arch id="triad">solve</Arch>{" "}
              is not destruction: it is the release of what a configuration could no longer use.
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 text-base leading-relaxed text-bone/85">
              Death is dissolution of a particular vessel, not erasure of what passed through it —
              the treatise's own sentence, from the <Arch id="retentive">Retentive Depth</Arch>.
              The two stations after this one are what that sentence commits the ecology to.
            </p>
            <Deeper label="Go deeper · irreversibility, and why the release is not a reset">
              <p>
                Dissolution does not restore what existed before. The treatise's law of
                irreversibility is exact about it: ashes hold a book's matter but not its
                organisation; a reconciled relationship is not one that was never damaged; solve is
                not a clean reversal of coagula. What is released into circulation is released from
                a particular history and carries it. Possibility becomes actuality; actuality leaves
                consequences; consequences modify what is possible next — which is the Crypt,
                stated as a law of forms.
              </p>
              <p>
                It follows that grief is not a failure to release. The treatise's account of{" "}
                <Arch id="mortality">grief as the labour by which love changes form</Arch> is the
                human case of what this station describes in general: a relation that cannot
                continue in its former mode and cannot be erased has to be transformed — into
                memory, inheritance, symbolic presence. That is dissolution done rightly, and it is
                slow because it is real.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- captive light and failed architecture ---- */}
      <Band id="eco-f-captive" backdrop="ember-glow-inside-glacier-ice-wall" opacity={0.22} position="center 45%" portrait>
        <Eyebrow>Captive light and failed architecture</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          A structure built to conduct a current may come <span className="italic text-gold">to preserve itself instead</span>
        </h2>
        <div className="mt-12">
          <CaptiveLightProgression />
          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            causal · one closure separates the frames
          </p>
        </div>
        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-serif text-xl leading-relaxed text-bone/90">
              The architecture serves the current.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">then, potentially</p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-bone/90">
              The current becomes subordinated to the architecture.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              At that point living form has become a mechanism of captivity. Nothing visible need
              have changed: the temple stands, the rite is performed exactly, the institution is
              busier than ever. What has changed is the direction of service. The Portal's{" "}
              <Entry id="xix-11">Law of Captive Light</Entry> names the condition; the ecology
              supplies the progression that leads to it, which is the same progression the erosion
              of a channel follows — a structure deepened by what it carried until it carries only
              itself.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This produces the layer's sharpest principle, and it belongs here rather than in a
              softer place because the ecology has earned it: if form is a temporary architecture
              of participation, then a form's claim on loyalty was always conditional on the
              participation.
            </p>
            <div className="mt-8">
              <Law k="The principle of failed architecture" text="When a form no longer conducts the force for which it was created, fidelity to the original force may require breaking fidelity with the inherited form." />
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The Portal's closing question — <Entry id="xix-20">whether the architecture remains truthful when form fails</Entry> —
              is this principle put to a dying vessel, and its answer is a set of questions the
              vessel must ask rather than a verdict: what light was entrusted to this form, what has
              become captive within it, what must be released, what remembered, what allowed to
              die, and what new body could carry the truth more faithfully. A false architecture
              cannot ask them. A truthful one contains the wisdom of its own transformation.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              Not a licence for demolition. The Portal's{" "}
              <Entry id="xix-11">Law of Captive Light</Entry> is equally clear that liberation is
              not demolition: a form may need to be opened, purified, mourned, translated, fulfilled
              or consciously dissolved, and liberation without reformation may scatter what has been
              recovered. Its entry on <Entry id="xiii-27">liberating captive light</Entry> puts the
              aim in a sentence: not simply to break the vessel but to recover what within it
              remains capable of truth. Breaking fidelity with a form is a last act of fidelity to
              what it was for, and it is judged by the one criterion this layer keeps everywhere —
              does the architecture maintain <Arch id="relation">right relation</Arch> with the
              force it exists to mediate? — which, put to a dying vessel, asks whether the current
              circulates again.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              A captive form has a relative beneath the waterline. A form that keeps its organising
              appetite after losing its rightful source, and feeds on whatever living systems are
              near, is what the layer calls a Hungry Form; the groove such a form cuts beneath
              itself, and what nourishes it there, are the{" "}
              <Link to="/ecology/aquifer" hash="eco-a-hungry" className="underline-offset-4 transition-colors hover:text-gold hover:underline">Aquifer's</Link>{" "}
              subject.
            </p>
            <Pointers
              arch={["forceform", "laws", "mortality", "triad", "transformation", "relation", "retentive"]}
              portal={["xix-11", "xiii-27", "xix-20", "xiii-22", "v-20", "xiii-25"]}
            />
          </div>
        </div>
      </Band>

      <Province id="garden" line="A form's claim about itself is an argument its anatomy makes — colour, fragrance, nectar, thorns. Only the fruit reveals the plant, and there is a region where forms compete by allure alone." />

      <Province id="hungry" line="A form that keeps its appetite after losing its rightful source, and feeds on whatever living systems are near, has undergone a metabolic inversion. The ecology of that inversion has a province of its own." />

      <Transition from="form" />
    </EcologyFrame>
  );
}
