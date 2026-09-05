import { createFileRoute } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers } from "@/components/ecology/Pointers";
import { OneCurrentManyExpressions } from "@/components/diagrams/OneCurrentManyExpressions";
import { station } from "@/lib/ecology";

/**
 * Station II — The Sap of Heaven. Nourishment, descent.
 *
 * The one station with no foothold in the treatise, so the page is careful
 * about what the term is: not a fluid, not an energy, but higher influence
 * considered functionally, as what feeds. The tree is the analogy, used
 * carefully; the delta is the doctrine — one according to procession, many
 * according to reception.
 */
export const Route = createFileRoute("/ecology_/sap")({
  head: () => ({
    meta: [
      { title: "The Sap of Heaven — The Hidden Ecology of Formation" },
      { name: "description", content: "The nutritive dimension of procession: what feeds becoming. One current, many expressions; celestial nourishment; the Sap and the four ethers; the Sap and living form; captive sap." },
    ],
  }),
  component: Sap,
});

const S = station("sap");

const EXPRESSIONS: [string, string][] = [
  ["Etheric vitality", "in a living body: the current as life, felt as warmth, rhythm and readiness"],
  ["Organic growth", "in a plant or a tissue: the current as increase along an inherited plan"],
  ["Psychic image", "in the astral: the current arriving as picture, mood, dream"],
  ["Intellectual insight", "in a mind prepared for it: the current as the sudden fit of a pattern"],
  ["Artistic inspiration", "in a maker: the current as what must be made, before it is known how"],
  ["Social coherence", "in a community: the current as the sense that holds many wills together"],
  ["Ritual presence", "in a rite done rightly: the current as what is there in the room"],
  ["Symbolic vitality", "in a symbol still alive: the current as what the sign can still do"],
  ["Consciousness", "in a person: the current as awareness itself, at whatever pitch the vessel allows"],
  ["Meaning", "in a life: the current as the sense that this is for something"],
];

function Sap() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the nutritive descent ---- */}
      <Band id="eco-s-descent" backdrop="seed-roots-lit-beneath-the-soil" opacity={0.22} position="center 55%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The nutritive descent</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              What feeds <span className="italic text-gold">becoming</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Higher formative influence, considered in so far as it becomes available as
              nourishment to the orders beneath it.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Every account of procession says that the higher gives to the lower. Fewer say what
              the giving is <span className="italic text-bone/85">for</span> from the lower's side.
              The Sap of Heaven is that: the same descent the treatise describes as the{" "}
              <Arch id="mediation">vertical chain of mediation</Arch> and Phōs describes as the
              self-diffusion of the Good, taken not as a doctrine of source but as a doctrine of
              food. It represents higher possibility in so far as it becomes life-bearing
              contribution — the manner in which what is above becomes usable below.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Two refusals define it. The Sap is not a literal supernatural fluid: nothing flows
              down a pipe from a reservoir in the sky, and the pages that follow will say so every
              time the analogy tempts them. And the Sap is not simply "energy": that word explains
              nothing, names no relation, and lets every distinction this layer keeps dissolve
              into a glow. The Sap is treated functionally and relationally — by what it does and
              to whom — or it is not treated at all.
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 text-base leading-relaxed text-muted-foreground">
              The governing question is <span className="text-bone/90">what feeds becoming?</span>{" "}
              — and the answer has two halves. What descends is one. What is taken up is many.
            </p>
            <Deeper label="Go deeper · the tree, used carefully">
              <p>
                Sap is the analogy, and it is a good one for a precise reason: sap participates in a
                living economy that connects root, trunk, branch, leaf, flower and fruit, and no part
                of that economy is a sealed floor. Root and crown are not two buildings; they are one
                organism communicating, and what the root draws up becomes leaf in the leaf and
                fruit in the fruit without ceasing to have been one sap.
              </p>
              <p>
                That is what the higher and lower orders of existence are being compared to. Not
                isolated metaphysical storeys with a lift between them, but a living economy in
                which they communicate — and the Sap of Heaven is that communication, considered as
                nourishment. Where the analogy stops: a tree's sap rises from the ground and the Sap
                descends from above; a tree has one sap and the receiving orders make many things of
                one descent; and no botanist would call a tree's sap the tree's meaning. Keep the
                economy, drop the plumbing.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- one current, many expressions ---- */}
      <Band id="eco-s-expressions" backdrop="mycelium-threading-forest-litter" opacity={0.16} position="center 50%">
        <Eyebrow>One current, many expressions</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          One according to procession, <span className="italic text-gold">many according to reception</span>
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A relatively unified higher influence becomes differentiated below — not because the
              source divides but because the receivers differ. The same descent, arriving at a body,
              a plant, a psyche, a mind, a maker, a community, a rite, a symbol, a person and a life,
              becomes ten things, and the ten are listed here in the order the ecology meets them,
              from the most bodily to the most inward. The receiving vessel helps determine the
              manifestation. Nothing about the current does.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is the Sap's version of the previous station's principle, and it should be read
              with it. Morphaithēr said the condition decides a force's first tendency. The Sap
              says the vessel decides what nourishment becomes — and that a single nourishment
              becomes consciousness in one vessel and growth in another without either being a
              degraded copy of the other.
            </p>
          </div>
          <div>
            <OneCurrentManyExpressions />
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
              analogical · the forks are differences in the receiver, not decisions in the source
            </p>
          </div>
        </div>
        <Items items={EXPRESSIONS} />
      </Band>

      {/* ---- celestial nourishment ---- */}
      <Band id="eco-s-celestial" backdrop="sunbeam-on-leaves-above-dark-soil" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Celestial nourishment</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">Mediated, <span className="italic text-gold">not dictated</span></h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The treatise's <Arch id="celestial">celestial correspondence</Arch> and its account of
              the Moon as a <Arch id="mansions">mobile mediator</Arch> already refuse the
              astrological picture in which the sky compels. The Sap keeps the refusal and adds the
              positive claim: the heavens are among the mediators through which nourishment reaches
              the lower orders, and their configuration is a condition of that mediation. A
              planetary hour is not a command. It is a state of the medium the Sap descends through —
              and, since the medium changes what passes through it, a state of the nourishment that
              arrives.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Determinism would say the sky decides the form. Differential reception says the form
              is decided at the vessel. Celestial nourishment sits between: the sky is one of the
              conditions through which the one current is already many by the time it arrives, and
              the traditions that tracked it were tracking the nourishment's weather, not its
              verdict.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- sap and the four ethers ---- */}
      <Band id="eco-s-ethers">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The Sap and the four ethers</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">How nourishment is <span className="italic text-gold">differentiated</span> on the way</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The <Arch id="transduction">Fourfold Veil</Arch> is a structure of transmission: what
              crosses it is quickened by Warmth, articulated by Light, coordinated by Tone and
              regenerated by Life. The Sap is what crosses. So the four ethers are not four kinds of
              Sap and the Sap is not a fifth ether; the ethers are the modes in which one nourishment
              is received into embodiment, and the Portal's entry on{" "}
              <Entry id="ii-7">the four ethers as modes of luminous mediation</Entry> already says
              this of light. The ecology says it of food.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Which is where etheric differentiation begins to matter for the next station. Warmth
              quickens the Sap; Light articulates it; Tone sets it in proportion; Life gives it a
              body that renews itself. The nourishment that reaches a form has been through four
              operations before it arrives, and each of the four can be done well or badly — which is
              the whole subject of circulation.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- sap and living form ---- */}
      <Band id="eco-s-form" backdrop="lit-oak-rooted-over-rift" opacity={0.2} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The Sap and living form</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">How nourishment becomes <span className="italic text-gold">embodied</span></h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Nourishment is not embodied by arriving. It is embodied by being taken up into a
              structure that can hold it, metabolise it and give it back changed — what the
              treatise calls <Arch id="laws">formative metabolism</Arch>: every sustained form must
              receive, transform, retain and release. A form that only receives is a reservoir; a
              form that only releases is a channel; a form that does both in measure is alive, and
              the Sap in it has become vitality rather than merely being present.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So the fourth station will describe the vessel, and this one has only to say what the
              vessel does with the Sap: it makes of one nourishment the particular life it is.
              Embodiment is differentiation completed — the last fork in the delta above, where
              "consciousness" becomes this consciousness and "meaning" becomes the meaning of this
              life.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- captive sap ---- */}
      <Band id="eco-s-captive" backdrop="rain-vessels-among-plants-on-terrace" opacity={0.18} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Captive sap · captive light</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              A form may capture the current it was made <span className="italic text-gold">to transmit</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Portal states the <Entry id="xix-11">Law of Captive Light</Entry>: light whose
              power remains enclosed, fragmented, appropriated, or forced to sustain an architecture
              opposed to its original purpose. Read as nourishment the law is exact. A vessel is
              built to receive the Sap and pass it on as life; a vessel can instead hold what it
              receives and spend it on its own continuation — the institution that feeds itself
              rather than its purpose, the habit that consumes the vitality it was formed to
              channel, the symbol that draws attention and returns nothing.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Captive sap is still sap. The nourishment has not been destroyed; it has been
              subordinated. Which is why the remedy the Portal gives —{" "}
              <Entry id="xiii-27">liberating captive light</Entry> — is never demolition alone.
              What was captured must be released into circulation again, and circulation is the
              next station's whole subject.
            </p>
            <Pointers
              arch={["mediation", "celestial", "transduction", "laws", "forceform", "matter"]}
              portal={["ii-7", "ii-8", "xix-11", "xiii-27", "ix-2", "xvi-20"]}
            />
          </div>
        </div>
      </Band>

      <Transition from="sap" />
    </EcologyFrame>
  );
}
