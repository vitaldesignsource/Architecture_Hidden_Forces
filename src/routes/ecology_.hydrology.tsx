import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Province, Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers, Sequence } from "@/components/ecology/Pointers";
import { HydrologicalSequence } from "@/components/diagrams/HydrologicalSequence";
import { EthericWatershed } from "@/components/diagrams/EthericWatershed";
import { ErosionSeries } from "@/components/diagrams/ErosionSeries";
import { LAWS, station } from "@/lib/ecology";

/**
 * Station III — Etheric Hydrology. Circulation, distribution.
 *
 * The most developed station, because it is nearly a science inside the
 * system: it has a vocabulary, a healthy sequence, a set of pathologies, and
 * two sub-doctrines — erosion and sedimentation — that are the bridge to the
 * two retentions at the end of the circulation. Every page of it says the
 * same thing about itself: hydrology is the model, and the current is not
 * water.
 */
export const Route = createFileRoute("/ecology_/hydrology")({
  head: () => ({
    meta: [
      { title: "Etheric Hydrology — The Hidden Ecology of Formation" },
      { name: "description", content: "How formative influence moves: reception, channelling, accumulation, obstruction, filtration, transformation, release and return. Etheric watersheds, formative topology, the hydrological vocabulary, etheric erosion and etheric sedimentation." },
    ],
  }),
  component: Hydrology,
});

const S = station("hydrology");

const STUDIES = ["movement", "reception", "distribution", "concentration", "accumulation", "obstruction", "filtration", "transformation", "release", "return"];

const DECIDES: [string, string][] = [
  ["What can enter", "the aperture: what the system's boundary admits at all"],
  ["Where it travels", "the channels: the paths that were cut before this current came"],
  ["What is retained", "the reservoirs: where it slows, pools, and is held against time"],
  ["What is filtered", "the passages that change what passes — a rite, a membrane, a discipline"],
  ["What accumulates", "the sinks: where it gathers whether or not it should"],
  ["What becomes blocked", "the dams: obstruction that is sometimes design and sometimes failure"],
  ["What is transformed", "the confluences and thresholds where it becomes another mode"],
  ["What is released", "the outlets: what the system gives back, and where"],
];

const VOCAB: [string, string][] = [
  ["Channel", "Conducts influence. A channel is where flow has been, made into where flow will go."],
  ["Reservoir", "Stores or concentrates influence. A temple, a practice, a symbol held over time; a store that serves a later use, or none."],
  ["Threshold", "Regulates passage. A door, a weir, a rite of entry, a night's sleep: nothing crosses at the rate it arrived."],
  ["Filter", "Modifies what passes through. The difference between what entered and what left, made by the passage itself."],
  ["Dam", "Obstructs or accumulates. Sometimes built on purpose to hold a head of influence; sometimes simply where the channel failed."],
  ["Spring", "Hidden influence emerging into expression. What surfaces here was moving under the ground before it was visible."],
  ["Confluence", "Currents meeting — two histories of movement becoming one current with both in it."],
  ["Delta", "One current differentiating into many expressions as it slows and spreads. The Sap's own figure."],
  ["Watershed", "The total architecture governing circulation. Not the water: the reason the water goes where it goes."],
  ["Drought", "Insufficient formative nourishment. The channels are there; nothing moves in them."],
  ["Flood", "More influence than a structure can integrate. Not abundance — what the vessel could not take up, going where it should not."],
  ["Stagnation", "Accumulation without healthy circulation. A pool the current reached and never left."],
];

const SEDIMENT: [string, string][] = [
  ["Habits", "the body's sediment: what repeated flow left in posture, rhythm and reflex"],
  ["Associations", "the mind's: what arrived together and now arrives together"],
  ["Symbolic residues", "what a sign accumulated from every use it was put to"],
  ["Emotional dispositions", "the mood that settled where a feeling ran often"],
  ["Structural modifications", "an institution's procedures, a building's worn steps"],
  ["Inherited patterns", "sediment laid by lives before this one and received with the ground"],
  ["Cultural assumptions", "what a whole people no longer notices it thinks"],
  ["Ritual accumulations", "the deposit a rite leaves in its place, which is what makes the place a shrine"],
];

function Hydrology() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the model ---- */}
      <Band id="eco-h-model" backdrop="river-delta-braided-in-grey-silt" opacity={0.22} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>A metaphysical science, by analogy</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              How does formative influence <span className="italic text-gold">move</span>?
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Hydrology is the model. Etheric influence is not being claimed to be water, and no
              page of this station forgets it.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The first two stations established that becoming has weather and is fed. Neither
              said how the nourishment gets from where it descends to where it is taken up, why it
              reaches some places and not others, what holds it and what blocks it, or where it
              goes when a form is done with it. That is a question about movement, and the science
              of the movement of a fluid through a landscape — its catchment, its channels, its
              storage and its loss — happens to be the most exactly worked-out account of movement
              through architecture that anyone has. So it is borrowed, as a model, for a thing that
              is not a fluid.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              What Etheric Hydrology studies, then, is the following, in the formative field:
            </p>
            <Sequence steps={STUDIES} sep="·" />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The treatise already reaches for this vocabulary without naming it: the Morphaithēr
              is drawn in <Arch id="atmosphere">its own field diagram</Arch> as a terrain with a
              current, a tide, a gradient, a reservoir and a threshold, and the{" "}
              <Arch id="channels">nadis and meridians</Arch> are described as channels of exactly
              this kind. The station gathers the usage into a discipline and gives it its rules.
            </p>
            <Deeper label="Go deeper · what the analogy licenses, and what it does not">
              <p>
                It licenses relations. Where influence moves, whether it can be held, what happens
                when more arrives than can be taken up, why the same influence goes to different
                places in two systems — these are questions with the same shape for water and for
                formative current, and hydrology has answered them for water with great care. The
                model transfers the shape of the answers.
              </p>
              <p>
                It does not license quantities, conservation laws, or the claim that anyone has
                measured a current. Nothing here is conventional hydrology or experimentally
                established physics, and a reader who wants the physical science should read the
                Portal's entries on <Entry id="xvi-20">photosynthesis</Entry> and light in
                astronomy, which are about measurable light and say so. This station is about
                the architecture of reception, and the current it describes is the one the treatise
                describes everywhere else — formative, subtle, real, and not water.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- the core sequence ---- */}
      <Band id="eco-h-sequence" backdrop="terraced-reservoirs-fed-by-waterfall" opacity={0.2} position="center 50%" portrait>
        <Eyebrow>The core sequence</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          What a healthy circulation does, <span className="italic text-gold">and how it fails</span>
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Sequence steps={["Descent", "Reception", "Channelling", "Accumulation", "Saturation", "Overflow", "Transformation", "Release", "Return"]} />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Nine stages, and the ninth is the first again: what returns to the field is received
              by it. Accumulation and saturation are not failures — a system that never fills never
              overflows into transformation, and the treatise's law of{" "}
              <Arch id="laws">accumulation and threshold</Arch> says that change is discontinuous in
              appearance and continuous in preparation for exactly this reason. Overflow is the
              threshold crossed. Transformation is what the crossing does.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">The dysfunctional possibilities</p>
            <Sequence steps={["Obstruction", "Stagnation", "Leakage", "Flooding", "Depletion"]} />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              These are not stages; they are exits. A current obstructed at the channel stagnates
              behind the block; a stagnant store leaks by whatever way is left to it; what leaks
              floods what was never built to receive it; and the system downstream of all this is
              depleted, its channels dry, while the current that should have fed it stands still
              behind a dam. The pathologies of the etheric body the treatise describes — depletion
              that is not an empty tank, stimulation that agitates without vitalising — are these
              exits, read in a body. Dead ends for the circulation are not dead ends for the charge:
              what leaves the ring by them settles beneath the threshold, into the{" "}
              <Link to="/ecology/aquifer" className="underline-offset-4 transition-colors hover:text-gold hover:underline">Black Aquifer</Link>,
              which the drawing marks under the bar.
            </p>
          </div>
          <div>
            <HydrologicalSequence />
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              cyclical · the failures leave the ring; beneath the last, the waterline
            </p>
          </div>
        </div>
      </Band>

      {/* ---- watersheds ---- */}
      <Band id="eco-h-watershed" backdrop="braided-glacial-river-from-above" opacity={0.18} position="center 50%">
        <Eyebrow>Etheric watersheds</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          A watershed is not the water. It is the architecture that decides{" "}
          <span className="italic text-gold">where water moves</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Stand anywhere in a landscape and the rain that falls on you has already been decided
          for: which river it will join, which sea it will reach, which ground it will soak and
          which it will run off. Nothing about the rain decides this. The land does. Model an
          organism, a temple, a city, a rite, a symbolic system, perhaps a culture, as an
          architecture of this kind — a watershed — and the same becomes true of the current that
          descends on it. The architecture determines:
        </p>
        <Items items={DECIDES} />
        <div className="mt-16">
          <EthericWatershed />
        </div>
        <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
          spatial · analogical · one landscape carrying the whole vocabulary
        </p>
      </Band>

      {/* ---- formative topology ---- */}
      <Band id="eco-h-topology" backdrop="column-of-water-falling-into-well" opacity={0.2} position="center 45%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Formative topology</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              Identical influence <span className="text-gold/70">+</span> different topology{" "}
              <span className="text-gold">=</span> <span className="italic text-gold">different manifestation</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Formative topology is the watershed considered abstractly: the structure of pathways,
              boundaries, centres, gradients, reservoirs and thresholds that determines how
              influence moves through a system. It is the third statement of the layer's one
              principle. Morphaithēr said the condition decides a force's first tendency; the Sap
              said the vessel decides what nourishment becomes; topology says the architecture
              between them decides where the nourishment can get to at all.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The treatise's account of the body is a formative topology already written. The{" "}
              <Arch id="channels">nadis and meridians</Arch> are pathways; the{" "}
              <Arch id="centers">chakras and centres</Arch> are reservoirs and thresholds; the{" "}
              <Arch id="axis">three centres of head, heart and hara</Arch> are a gradient. Read
              them as one watershed and the doctrine of the subtle body becomes the doctrine of
              where the Sap can go in a person — and of why the same descent, received by two
              people, makes a saint of one and a symptom in the other.
            </p>
            <Deeper label="Go deeper · topology is inherited, and altered by use">
              <p>
                A system's topology is not given once. Most of it is inherited — the body's channels
                from the species, a city's from its founders, a rite's from the rite before — which
                is the Ossuary showing in the hydrology. And all of it is altered by what runs
                through it, which is the subject of the next section. The consequence is that no
                two systems, and no system at two times, have the same topology, and the principle
                stated in the heading has to be read with that in mind: the influence may be
                identical, but the topology never quite is, and the manifestation records the
                difference.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- vocabulary ---- */}
      <Band id="eco-h-vocabulary">
        <Eyebrow>The hydrological vocabulary</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Twelve terms, each a relation — <span className="italic text-gold">none of them the current</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Defined once, for use across the layer. Each names something the current has to the
          architecture it moves through. Not one is to be over-literalised: there is no etheric
          spring one could drink from, and a formative dam is a relation of obstruction, not a wall
          in the sky.
        </p>
        <div className="mt-10 grid gap-x-12 gap-y-px lg:grid-cols-2">
          {VOCAB.map(([a, b]) => (
            <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-4">
              <span className="font-serif text-xl text-bone/90">{a}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
            </div>
          ))}
        </div>
      </Band>

      {/* ---- erosion ---- */}
      <Band id="eco-h-erosion" backdrop="folded-rock-strata-above-water" opacity={0.24} position="center 50%">
        <Eyebrow>Etheric erosion</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          A canyon is the memory of water <span className="italic text-gold">written into stone</span>
        </h2>
        <div className="mt-10">
          <Law k={LAWS[1].k} text={LAWS[1].text} />
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A river passing repeatedly through a landscape alters the landscape. Where it ran it
              runs more easily; where it ran often, it cuts; and eventually the landscape itself
              records the history of the river so exactly that a geologist can read the flow from
              the stone after the water is gone. Apply this to the formative field and it becomes
              the treatise's law of <Arch id="laws">formative inertia</Arch> — water flowing
              repeatedly over land cuts a channel, and later water follows it though the original
              water is gone — generalised to everything a current does to what it moves through.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Repeated formative currents establish increasingly receptive pathways. Patterns become
              easier to repeat because previous repetitions have altered the architecture of
              reception. In a person the treatise calls this the{" "}
              <Arch id="flywheel">psychic flywheel</Arch>; in a place, a shrine; in a culture, a
              tradition. The mechanism is one: flow, channel, more flow.
            </p>
          </div>
          <div>
            <ErosionSeries />
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              causal · the water is identical in every frame
            </p>
          </div>
        </div>
        <p className="mt-10 max-w-3xl border-l-2 border-gold pl-6 text-base leading-relaxed text-bone/85">
          This is where the hydrology first touches the Crypt. A channel is a consequence that has
          become an architecture: the past of the flow, present as the shape of the ground. The
          layer's phrase for it is exact —{" "}
          <span className="text-gold">a channel can become memory embodied as architecture</span> —
          and the sixth station will say what kind of memory that is.
        </p>
      </Band>

      {/* ---- sedimentation ---- */}
      <Band id="eco-h-sedimentation" backdrop="rimstone-pools-in-limestone-cave" opacity={0.22} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Etheric sedimentation</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              Currents do not merely pass through. <span className="italic text-gold">They leave residues.</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Erosion is what a current takes from the architecture. Sedimentation is what it
              leaves. Water that slows drops what it carried, and the rimstone pools in the margin
              were built by nothing but that — a deposit laid on a deposit until the shape of the
              water is a shape in stone. Formative currents deposit too, and what they deposit in a
              system is, analogically:
            </p>
            <Items items={SEDIMENT} />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Sedimentation is not automatically negative. Some sediment is the most fertile ground a
              system has — the delta is nothing else — and a rite with no accumulated deposit is a
              rehearsal, not a rite. Other sediment fills the channel it was laid in until nothing
              moves there; the same accumulation that made the shrine can make the shrine a museum.
              Which yields the principle the two retentions will need:
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl leading-relaxed text-bone/90">
              Inheritance is neither automatically sacred nor automatically pathological. It must be
              evaluated by whether it continues to serve right relation and living circulation.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The <Arch id="relation">law of right relation</Arch> is the criterion, here as
              everywhere in the system. What the sediment is for decides whether it is soil or
              silt.
            </p>
            <Pointers
              arch={["atmosphere", "laws", "flywheel", "channels", "centers", "axis", "etheric", "relation"]}
              portal={["ix-18", "ii-18", "iii-29", "xiii-22", "v-19", "xvi-20"]}
            />
          </div>
        </div>
      </Band>

      <Province id="sea" line="Etheric Hydrology studies one great water. The field in which its currents meet astral images, spiritual orientations, material limits and living acts of choice is wider than the etheric, and it has a name." />

      <Province id="aquifer" line="No hydrology is complete that studies only rain, rivers and visible springs. Beneath every open current lies another order of water — older, slower, pressurised, and largely untouched by the light." />

      <Transition from="hydrology" />
    </EcologyFrame>
  );
}
