import { createFileRoute } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers } from "@/components/ecology/Pointers";
import { DifferentialReception } from "@/components/diagrams/DifferentialReception";
import { station } from "@/lib/ecology";

/**
 * Station I — Morphaithēr. Condition, atmosphere.
 *
 * The treatise defines the term twice — first as the living formative
 * atmosphere, later as the retentive field of mediation — and both definitions
 * stand: this page does not redefine it, it asks its governing question —
 * under what conditions does becoming occur — and follows the answer through
 * weather, reception, climate, place, and the Veil it must not be confused
 * with. The one new thing here is the equation.
 */
export const Route = createFileRoute("/ecology_/morphaither")({
  head: () => ({
    meta: [
      { title: "Morphaithēr — The Hidden Ecology of Formation" },
      { name: "description", content: "The living qualitative atmosphere of becoming: under what conditions formation occurs. Tattvic weather, differential reception, climate, places, and how Morphaithēr differs from the Fourfold Veil." },
    ],
  }),
  component: Morphaither,
});

const S = station("morphaither");

const ENCOMPASSES: [string, string][] = [
  ["Tattvic qualities", "which of the five predominates, and in what mixture, in this place at this hour"],
  ["Etheric conditions", "the state of the formative field itself — charged, depleted, coherent, turbulent"],
  ["Psychic atmosphere", "what the people present are carrying, and have carried in"],
  ["Collective emotion", "the mood of a crowd, a household, a nation, which outlasts any member's"],
  ["Temporal rhythms", "the hour, the tide, the season, the phase — every tide the treatise names"],
  ["Symbolic saturation", "how much a place already means, and to whom"],
  ["Terrestrial influences", "ground, water, weather, the living things already there"],
  ["Celestial relationships", "the configuration overhead, as a condition of reception and not a command"],
  ["Inherited residues", "what earlier formation left in the field — the Crypt, felt as present weather"],
];

const PLACES: [string, string][] = [
  ["Forest", "Slow, layered, indifferent to the visitor; a condition that was there before you and will be after. Formation here is patient and mostly unseen."],
  ["City", "Dense, fast, symbolically saturated to the point of noise; countless standing patterns competing for the same current."],
  ["Temple", "A condition made on purpose and kept by repetition, so that the descent which scatters in the street outside sets, here, into form."],
  ["Home", "Inherited residue at its thickest: nourishment that would make something new elsewhere is received here on the old pattern, and resumes it."],
  ["Battlefield", "Whatever descends here is received as threat and spent as reflex; afterwards the field keeps a scar that outlasts the grass, and the next thing to form there forms on it."],
  ["Ritual chamber", "A place whose entire architecture exists to set one condition of reception, and to exclude the others for the duration."],
  ["Landscape", "Weather in the plain sense, and the subtle weather it sets: a coast, a plateau and a valley do not receive the same descent alike."],
  ["Community", "A shared atmosphere maintained by many bodies at once, which is why it is so hard to change from inside and so easy to feel from outside."],
];

function Morphaither() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the atmosphere of becoming ---- */}
      <Band id="eco-m-atmosphere" backdrop="summit-above-sea-of-cloud" opacity={0.2} position="center 40%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The atmosphere of becoming</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Nothing manifests in a <span className="italic text-gold">vacuum</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Every formative influence encounters an environment that is already conditioned.
              Morphaithēr is that environment, named.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              It is the weather of the invisible world. Not one more substance beside the others,
              and not the space they occupy: the total qualitative condition under which any force
              arriving here will have to become something — the temperature and pressure and
              humidity of formation, if those words are read as the analogies they are. The
              treatise introduced it as{" "}
              <Arch id="morphaither">the living formative atmosphere</Arch> and later gave it its
              full definition as{" "}
              <Arch id="atmosphere">the dynamic and retentive field of mediation</Arch>; this
              station keeps both and asks only the one question the ecology needs answered first.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Under what conditions does becoming occur? The answer is never "none". Before the
              Sap descends, before anything circulates, before a vessel is even possible, there is a
              condition of reception — and the condition is made of relationships among things the
              treatise treats separately elsewhere:
            </p>
            <Items items={ENCOMPASSES} />
            <p className="mt-8 border-l-2 border-gold pl-6 text-base leading-relaxed text-muted-foreground">
              None of these is Morphaithēr. Their interaction is. Which is why the treatise calls it{" "}
              <span className="text-bone/90">a configuration, not a substance</span>, and why this
              layer calls it an atmosphere: you cannot point at weather, but nothing that happens
              outdoors happens without it.
            </p>
            <Deeper label="Go deeper · the word, and what it is not">
              <p>
                The word joins <span className="italic text-bone/85">morphē</span>, form, to aether
                in its capacity to carry formation. It is a modern technical coinage from Greek
                roots and not an attested ancient term, and the treatise says so where it is
                defined. The Portal's{" "}
                <Entry id="viii-4">entry on aether as a luminous medium</Entry> describes the medium
                as such; Morphaithēr is not that medium but the condition the medium is in here and
                now — the difference between air and weather.
              </p>
              <p>
                The distinction earns its keep against a temptation that runs through the whole
                occult literature: to let one word absorb the others until "aether", "the
                atmosphere", "the ethers" and "the current" all mean the same faintly glowing
                stuff. This layer keeps four things four. Aether is the medium. Morphaithēr is its
                condition. The Sap of Heaven is what descends into it. The four ethers are the modes
                in which the field operates. A page that lets any two of them collapse has lost
                the ecology and kept a mood.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- the equation ---- */}
      <Band id="eco-m-equation" backdrop="caldera-lake-at-sunrise" opacity={0.18} position="center 50%">
        <Eyebrow>The essential principle</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          The same force does not produce the same manifestation{" "}
          <span className="italic text-gold">under different conditions of reception</span>
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The simplest model of influence is an arrow: a force acts, an effect follows. It is
              also wrong, and its wrongness is what this whole layer is built to correct. Nothing
              in the treatise's account of formation permits a force to arrive anywhere as itself.
              It arrives through a medium, into a condition, at a vessel, onto a pattern that is
              already there — and what appears is the product of all five, not the signature of the
              first.
            </p>
            <div className="mt-8 border border-gold/30 p-6 sm:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Refused</p>
              <p className="mt-3 font-serif text-xl text-bone/50 line-through decoration-gold/50">Force → Effect</p>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Kept</p>
              <p className="mt-3 font-serif text-xl leading-relaxed text-bone sm:text-2xl">
                Force <span className="text-gold/70">+</span> Medium <span className="text-gold/70">+</span> Condition{" "}
                <span className="text-gold/70">+</span> Vessel <span className="text-gold/70">+</span> Existing pattern{" "}
                <span className="text-gold">→</span> Manifestation
              </p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-bone/60">
              The treatise states the same thing as a law of formation —{" "}
              <Arch id="laws">transduction</Arch>: influence rarely passes between levels without
              changing its mode of expression — and as the doctrine of{" "}
              <Arch id="forceform">force and form</Arch>. Here it is stated as weather.
            </p>
          </div>
          <div>
            <DifferentialReception />
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              causal · the force is drawn identical on purpose
            </p>
          </div>
        </div>
      </Band>

      {/* ---- tattvic weather ---- */}
      <Band id="eco-m-weather" backdrop="night-terrace-above-cloud-sea" opacity={0.2} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Tattvic weather</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">Predominance and mixture</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The five tattvas are not five weathers; they are the qualities weather is made of.
              The treatise gives them as morphogenic biases — the tendency of a moment or a place
              toward the fixed, the fluid, the ardent, the mobile or the spacious — and gives their{" "}
              <Arch id="subtattva">compound qualities</Arch> as the finer mixtures that actually
              occur, since a pure tattva is as rare as a pure element. Morphaithēr at any moment
              carries a predominance and a mixture, and both change: with the hour, as the old
              tattvic tide-tables claim; with the season and the place; with what is being done
              there and by whom.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Read as weather, the point is practical. A formative influence arriving into a
              predominantly fixed condition will tend to set; into a fluid one, to spread; into an
              ardent one, to intensify; into a mobile one, to scatter; into a spacious one, to
              thin. The influence is the same. The condition decides its first tendency, before
              any vessel has received it at all.
            </p>
            <p className="mt-6 border-l-2 border-gold pl-6 text-base leading-relaxed text-muted-foreground">
              Which is why the treatise's <Arch id="tides">etheric tides</Arch> belong here rather
              than in a separate doctrine of timing. A tide is Morphaithēr changing on a schedule.
              Timing is choosing the weather one works in.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- differential reception ---- */}
      <Band id="eco-m-reception">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Differential reception</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              Why identical influences produce <span className="italic text-gold">different</span> manifestations
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Take the same current and pass it into two vessels. One is open, coherent and
              unsaturated; the other is closed, fragmented and full. The first produces a clear
              form; the second, overflow, distortion, or nothing. Neither result says anything
              about the current. Both say everything about reception. The Neoplatonists had a word
              for the receiving side of this — <span className="italic text-bone/85">epitēdeiotēs</span>,
              fitness, aptitude for receiving — and the treatise keeps it among the{" "}
              <Arch id="theurgy">terms of theurgy</Arch> because without it every failure of a rite
              would have to be blamed on the god.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Differential reception is the ecology's answer to a question that troubles every
              account of higher influence: if the source is one and good, why is what arrives so
              various, and so often not good? Because arrival is not delivery. What arrives is
              what the condition, the vessel and the existing pattern make of what descended — and
              they were different before it came.
            </p>
            <Deeper label="Go deeper · what this rules out">
              <p>
                It rules out reading a manifestation backwards to its force as though the force
                could be inferred from the effect. A destructive outcome does not prove a
                destructive influence; a radiant outcome does not prove a high one — the treatise's
                own catalogue of the <Arch id="extended">hidden powers</Arch> and Phōs's account of
                the counterfeits of light both turn on that. And it rules out the reverse
                consolation: that a good source guarantees a good result if only the source is
                good enough. It does not. The world it arrives into has weather.
              </p>
              <p>
                What it does not rule out is judgement. Reception can be prepared. A vessel can be
                cleared, coherent, proportioned, and set in a condition chosen for the work — which
                is what ritual, discipline and consecration are for, and why the treatise treats
                them as engineering rather than as petition.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- climate ---- */}
      <Band id="eco-m-climate" backdrop="bristlecone-pine-above-the-clouds" opacity={0.2} position="center 45%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Morphaithēric climate</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">Weather, and what weather settles into</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Weather is a state; climate is what the states settle into over time. The distinction
              is worth keeping in the subtle case. A room after an argument has weather: a
              temporary condition that the next hour, or the next honest conversation, will change.
              A house in which arguments have been the weather for thirty years has climate: a
              persistent condition that new weather arrives into and is shaped by, and that a single
              good hour does not alter.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Climate is where this station first touches the last. Persistent conditions are not
              made by present weather alone; they are the retained consequence of past weather —
              the Crypt, felt as the present atmosphere. A place's climate is its history become
              its condition. The tree in the margin has grown for five thousand years into the
              shape of the wind, and now the wind meets a shape.
            </p>
            <div className="mt-8 grid gap-px border border-border bg-border/60 sm:grid-cols-2">
              <div className="bg-void p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Temporary state</p>
                <p className="mt-3 text-sm leading-relaxed text-bone/85">
                  Changes with the hour and the act. Can be set on purpose and lost by neglect.
                  Responds to a single intervention.
                </p>
              </div>
              <div className="bg-void p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-dim">Persistent condition</p>
                <p className="mt-3 text-sm leading-relaxed text-bone/85">
                  Accumulated from many states. Shapes the states that arrive into it. Responds only
                  to sustained change, and slowly, because it is partly memory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Band>

      {/* ---- places ---- */}
      <Band id="eco-m-places" backdrop="cliff-road-vanishing-into-fog" opacity={0.16} position="center 50%">
        <Eyebrow>Places and atmospheres</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Different places hold <span className="italic text-gold">different conditions of formation</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The treatise's first account of the Morphaithēr listed{" "}
          <Arch id="morphaither">where it is felt</Arch> — the courtroom, the hospital, the
          childhood home. Here the same observation is turned toward formation: not only that
          places feel different, but that the same descent does not become the same thing in them.
        </p>
        <div className="mt-10 grid gap-x-10 gap-y-px lg:grid-cols-2">
          {PLACES.map(([a, b]) => (
            <div key={a} className="grid grid-cols-[1fr] gap-1 border-b border-border py-4 sm:grid-cols-[8rem_1fr] sm:gap-5">
              <span className="font-serif text-lg text-bone/90">{a}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{b}</span>
            </div>
          ))}
        </div>
      </Band>

      {/* ---- the veil ---- */}
      <Band id="eco-m-veil">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Morphaithēr and the Fourfold Veil</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              Connected, and <span className="italic text-gold">not the same thing</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The treatise's <Arch id="fourfold">Fourfold Field</Arch> and its{" "}
              <Arch id="transduction">Fourfold Veil</Arch> describe what the formative field does:
              Warmth quickens, Light articulates, Tone coordinates, Life regenerates, in a circuit
              that every embodied act involves at once. Morphaithēr does not add a fifth ether and
              does not replace the four. It is the condition the four operate in — the measure,
              timing and condition of the vessel according to which, the treatise says, each ether
              "supports or distorts the others": the state under which activation comes before
              orientation, or differentiation outruns integration.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So the relation is that of operation to condition. The ethers are verbs. Morphaithēr
              is the weather they are conjugated in. Collapse them and the ecology loses the
              distinction it was built for: you could no longer say that the same fourfold
              operation, in two atmospheres, produced two forms.
            </p>
            <Pointers
              arch={["morphaither", "atmosphere", "fourfold", "transduction", "subtattva", "tides", "laws"]}
              portal={["viii-4", "ii-6", "ii-7", "ii-8", "viii-9"]}
            />
          </div>
        </div>
      </Band>

      <Transition from="morphaither" />
    </EcologyFrame>
  );
}
