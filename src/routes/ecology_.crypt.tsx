import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Province, Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Pointers } from "@/components/ecology/Pointers";
import { StrataOfConsequence } from "@/components/diagrams/StrataOfConsequence";
import { OssuaryAndCrypt } from "@/components/diagrams/OssuaryAndCrypt";
import { LAWS, station } from "@/lib/ecology";

/**
 * Station VI — The Crypt of Primordial Memory. Ontological retention.
 *
 * The treatise gives the Crypt its definition and its refusal in one place:
 * not a warehouse of perfect historical images but the persistence of
 * consequences after the originating form has vanished. This station holds
 * that line against the temptation it exists to resist — the celestial
 * database — and then does the two things the layer needs of it: tells the
 * Crypt apart from the Ossuary, and turns the circulation back to its first
 * station at a different level.
 */
export const Route = createFileRoute("/ecology_/crypt")({
  head: () => ({
    meta: [
      { title: "The Crypt of Primordial Memory — The Hidden Ecology of Formation" },
      { name: "description", content: "The retentive depth of existence: ontological memory, consequence without survival, the world inheriting itself. The Ossuary and the Crypt told apart, and the Crypt beneath Morphaithēr — where the circulation returns one level on." },
    ],
  }),
  component: Crypt,
});

const S = station("crypt");

function Crypt() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the chamber beneath formation ---- */}
      <Band id="eco-c-chamber" backdrop="peat-cliff-above-still-lake" opacity={0.22} position="center 55%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The chamber beneath formation</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Reality <span className="italic text-gold">possesses history</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Not a supernatural database containing perfect recordings of every event. The more
              sophisticated meaning: ontological retention.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The treatise defines the Crypt in the <Arch id="retentive">Retentive Depth</Arch>{" "}
              and defines it by refusal first — not a warehouse of perfect historical images — and
              then by what it is: the retentive depth of causation, the persistence of consequences
              after the originating form has vanished. The Portal's entry on{" "}
              <Entry id="ii-27">light in the Crypt</Entry> adds the phrase this station will use
              throughout: an altered topology of possibility. Past forms change the field. They
              make some developments easier, others more resistant, and some no longer possible in
              precisely the same way.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              That is what it means to say reality possesses history. Not that it keeps a copy of
              its past somewhere, but that its present is the shape its past bent it into. The
              governing question follows: <span className="text-bone/90">what does becoming
              remember?</span> — and the answer is not "everything, faithfully" but "its own
              consequences, as its conditions".
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              Existence is conditioned by having already existed.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <StrataOfConsequence />
          <p className="mt-4 text-center font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            causal · the present surface is laid on a shape the past left
          </p>
        </div>
      </Band>

      {/* ---- ontological memory ---- */}
      <Band id="eco-c-memory" backdrop="glowing-crystal-vein-in-basalt-cliff" opacity={0.22} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Ontological memory</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">
              Memory, and <span className="italic text-gold">information storage</span>, are not the same
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              A record is something separate from what it records: the photograph is not the
              face, and the face can change while the photograph does not. Ontological memory is
              not separate from anything. It is the world being different — the ground bearing the
              river's shape, the body carrying the injury's posture, the language holding the
              distinction a vanished people needed. There is no place where the past is kept apart
              from the present. The present is where it is kept.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The treatise says memory "exists at more than one level" and lists them — organisms
              preserve developmental histories, bodies acquire habits, institutions retain
              procedures, landscapes bear traces, languages preserve ancient distinctions, cultures
              inherit symbols whose origins their members no longer understand. None of those is a
              recording. Each is a structure that is what it is because of what happened to it, and
              the Portal's <Entry id="xix-12">Law of Luminous Memory</Entry> says the same of each
              body: the etheric keeps light as rhythm and habit, the astral as charged image, the
              soul as meaning. Retention, everywhere, is change kept.
            </p>
            <Deeper label="Go deeper · why the database picture is refused">
              <p>
                It is refused because it is false to what the traditions actually claim and
                because it would make the Crypt useless to the ecology. False, because the
                "akashic record" as a perfect archive is a nineteenth-century figure, and even its
                proponents read it through the reader — the treatise's own{" "}
                <Arch id="image">account of image and imagination</Arch> is the reason a
                "recording" retrieved in vision is never simply the event. Useless, because an
                archive does nothing: it sits, and the world proceeds unchanged beside it. The
                Crypt is the opposite of that. It is the world proceeding changed.
              </p>
              <p>
                What the refusal does not deny: that traces can be re-illuminated. The Portal says
                a form's light remains "as a trace that can be re-illuminated under appropriate
                conditions", and this station agrees, on one condition of its own — that what is
                illuminated is understood as the altered field, read from inside the field, and not
                as a tape played back. Reverence and discrimination together, the Portal says. The
                imprint is real; the story told about it must still earn its accuracy.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- consequence without survival ---- */}
      <Band id="eco-c-consequence" backdrop="field-lines-in-black-volcanic-sand" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Consequence without survival</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">A thing need not remain for its existence to go on <span className="italic text-gold">having effect</span></h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The volcano that laid this sand is not here. The sand is the shape its last hour
              gave it, and the next thing to grow here will grow in that shape. This is the
              Crypt's first principle, and it is the one the Ossuary cannot state: something does
              not need to be physically present, or to have left any usable pattern behind, for its
              having existed to continue to matter. The treatise puts it as a law of forms —
              <Arch id="laws">irreversibility</Arch>: possibility becomes actuality, actuality leaves
              consequences, consequences modify what is possible next — and as one sentence in the
              Retentive Depth, which this station adopts as its own:
            </p>
            <p className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              Once something has occurred, the world is no longer identical to the world in which it
              had not occurred.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Survival is not required. Presence is not required. Even memory in the ordinary sense
              is not required — no one need recall the event for the event to have entered the
              conditions of everything after it. That is why this retention is called ontological
              rather than psychological: it is a property of what is, not of anyone's knowing.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the world inherits itself ---- */}
      <Band id="eco-c-inherits" backdrop="cutaway-of-tiered-stone-tower" opacity={0.2} position="center 50%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The world inherits itself</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">The cumulative dimension of becoming</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The treatise's <Arch id="spine">ninth commitment</Arch> is titled with the sentence
              this whole layer is built on: the world inherits itself. Completed forms vanish as
              visible unities, but their passage alters the conditions from which later forms
              arise. Put the Crypt's principle in time and it becomes cumulative. Every occurrence
              enters the conditions of what follows; what follows occurs under those conditions and
              enters them further; the conditions the next descent meets are the sum of every
              previous circulation, none of which is present and none of which is absent.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Which is why the ecology cannot be a ring. A ring returns to conditions it left
              unchanged. But nothing leaves its conditions unchanged: the very passage of the
              circulation is a deposit in the Crypt, and the next circulation begins on it. A tower
              built storey on storey stands on every floor beneath the one you are on, and the
              floor you are on was the roof once.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- memory and future possibility ---- */}
      <Band id="eco-c-future" backdrop="wet-city-square-with-glass-oculus" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Memory and future possibility</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight">Previous becoming alters <span className="italic text-gold">subsequent reception</span></h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Crypt is not only about what is remembered; it is about what can now be
              received. An altered topology of possibility is exactly that — the map of where the
              next current can go, redrawn by the last one. The hydrology station called it
              erosion: repeated currents establish increasingly receptive pathways, and patterns
              become easier to repeat because previous repetitions altered the architecture of
              reception. The treatise called it <Arch id="laws">formative inertia</Arch> — memory
              as inherited curvature in the field of becoming — and, in the person, the{" "}
              <Arch id="flywheel">psychic flywheel</Arch>.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              So the Crypt reaches forward. What it retains is felt not as the past but as the
              ease or difficulty of the future: the groove a practice runs in, the resistance a
              place has to a use it never had, the readiness of a tradition for a form it has
              received before. Memory, in the ontological sense, is the future's shape.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the ossuary and the crypt, told apart ---- */}
      <Band id="eco-c-comparison" backdrop="rotunda-open-to-night-sky" opacity={0.2} position="center 45%">
        <Eyebrow>The Ossuary and the Crypt, told apart</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Two retentions that interact continuously and <span className="italic text-gold">must not be collapsed</span>
        </h2>
        <div className="mt-12 grid gap-px border border-gold/30 bg-border/60 sm:grid-cols-2">
          <div className="bg-void p-8">
            <p className="font-label text-[10px] uppercase tracking-[0.35em] text-gold">The Ossuary</p>
            <p className="mt-6 font-serif text-3xl leading-tight text-bone">remembers architecture.</p>
            <p className="mt-8 font-label text-[9px] uppercase tracking-[0.3em] text-gold-dim">It asks</p>
            <p className="mt-3 font-serif text-xl italic text-bone/90">What pattern remains available?</p>
            <p className="mt-8 font-label text-[9px] uppercase tracking-[0.3em] text-gold-dim">Its concern</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Morphological inheritance. A structure that can be read, quarried, re-set, reused — whether or not anyone does.</p>
          </div>
          <div className="bg-void p-8">
            <p className="font-label text-[10px] uppercase tracking-[0.35em] text-gold">The Crypt</p>
            <p className="mt-6 font-serif text-3xl leading-tight text-bone">remembers consequence.</p>
            <p className="mt-8 font-label text-[9px] uppercase tracking-[0.3em] text-gold-dim">It asks</p>
            <p className="mt-3 font-serif text-xl italic text-bone/90">How is existence different because this happened?</p>
            <p className="mt-8 font-label text-[9px] uppercase tracking-[0.3em] text-gold-dim">Its concern</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Ontological retention. Not available for anything; simply the case, and the condition of everything after.</p>
          </div>
        </div>
        <div className="mt-12">
          <OssuaryAndCrypt />
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The Portal states the distinction in one line — the Ossuary preserves the anatomy of
          completed formation, the Crypt preserves the altered field produced by its passage — and
          the reason the two must be kept apart is practical. A form can go to the Ossuary and take
          a pattern; it cannot go to the Crypt and take anything. It can only find itself already
          standing in what the Crypt holds. Collapse them and you get either a world that keeps
          nothing but blueprints, or a world in which the past is a shop.
        </p>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
          They interact continuously. An inherited architecture is itself a consequence — the fact
          that the arch exists to be quarried is in the Crypt — and every consequence was once the
          passage of a form whose architecture may be in the Ossuary. The interaction is not the
          identity; it is the reason the ecology needs both stations.
        </p>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-bone/60">
          A third retention runs beneath both, and it is hydraulic where the Crypt is archival: the
          Black Aquifer carries what the Crypt contains and the Ossuary preserves, under pressure
          and in motion. The seals of the Crypt are not perfectly impermeable, and the layer says
          so{" "}
          <Link to="/ecology/aquifer" hash="eco-a-three" className="underline-offset-4 transition-colors hover:text-gold hover:underline">beneath the stations</Link>.
        </p>
      </Band>

      {/* ---- the crypt beneath morphaithēr ---- */}
      <Band id="eco-c-beneath" backdrop="folded-strata-under-frozen-plain-at-sunset" opacity={0.24} position="center 60%">
        <Eyebrow>The Crypt beneath Morphaithēr</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Retained consequence becomes <span className="italic text-gold">future formative condition</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The first station said that the persistent conditions of a place are its history become
          its climate, and called that the Crypt felt as present weather. The circulation is now
          back at that sentence from the other side. What the Crypt retains does not stay in the
          Crypt: it rises into Morphaithēr as the condition under which the next descent is
          received. The atmosphere of becoming is, in its persistent part, retained consequence — and
          so the next form emerges in weather the last form made.
        </p>
        <div className="mt-12">
          <Law k={LAWS[0].k} text={LAWS[0].text} size="xl" />
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          This is the law the landing stated and the six stations have been cases of. Read it once
          more with all six behind it: the atmosphere receives the nourishment and is changed by
          the receiving; the circulation cuts channels that decide the next circulation; the form
          takes a body and gives it back altered; the architecture it leaves is quarried and the
          consequence it leaves is inherited; and the world that receives the next Sap of Heaven is
          not the world that received the last.
        </p>
        <Pointers
          arch={["retentive", "spine", "laws", "flywheel", "image", "atmosphere", "morphaither"]}
          portal={["ii-27", "ii-28", "xix-12", "x-7", "iii-30", "xiii-28", "ix-24"]}
        />
      </Band>

      <Province id="catacombs" line="The Crypt's seals are not perfectly impermeable. Where what seeps out was once sacred, it gathers in the passages between the chambers: the afterlife of divine forms." />

      <Transition from="crypt" />
    </EcologyFrame>
  );
}
