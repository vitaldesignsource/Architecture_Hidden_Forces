import { createFileRoute, Link } from "@tanstack/react-router";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Deeper } from "@/components/ecology/Deeper";
import { Law } from "@/components/ecology/Law";
import { Neighbours, Transition } from "@/components/ecology/Transition";
import { Arch, Entry, Items, Pointers } from "@/components/ecology/Pointers";
import { SeaBetweenCauses } from "@/components/diagrams/SeaBetweenCauses";
import { DifferentialReception } from "@/components/diagrams/DifferentialReception";
import { station } from "@/lib/ecology";

/**
 * A province — The Sea Between Causes. The field of mediation.
 *
 * The widest of the provinces: not a plane between planes but the total
 * condition through which orders become able to affect one another. The
 * stations and the other provinces all lie in it. It is reached from
 * Etheric Hydrology, which studies its waters, and hands on to the Nursery,
 * where what the sea holds in suspension first acquires enough enclosure
 * to gestate.
 */
export const Route = createFileRoute("/ecology_/sea")({
  head: () => ({
    meta: [
      { title: "The Sea Between Causes — The Hidden Ecology of Formation" },
      { name: "description", content: "The missing middle of causation: the field in which causes meet, are refracted by their media, gather at confluences, leave sediment, and arrive together at one shore. Every effect is an estuary." },
    ],
  }),
  component: Sea,
});

const S = station("sea");
const L = "underline-offset-4 transition-colors hover:text-gold hover:underline";

function Sea() {
  return (
    <EcologyFrame station={S}>
      {/* ---- the missing middle ---- */}
      <Band id="eco-sea-middle" backdrop="waves-in-narrow-sea-inlet" opacity={0.2} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The missing middle</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              A cause does not pass <span className="italic text-gold">untouched into its effect</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Not a space between cause and effect. The sea among causes themselves.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Between intention and manifestation, seed and flower, invocation and response, there
              extends an obscure interval in which forces mingle, forms compete, inherited patterns
              wake, and the receiving world answers according to its own capacity. The layer gives
              that field of mediation a name: the Sea Between Causes.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              It is called a sea because causation does not proceed only as a straight chain. It
              moves as currents, tides, undertows, confluences, dispersals and returns. A force may
              descend toward manifestation and be deflected by another force, absorbed into an older
              pattern, divided among several forms, or held in suspension until a suitable condition
              appears. What becomes visible is rarely the pure expression of a single cause. It is
              more often the shoreline deposit of many invisible movements.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The name refers not merely to a space between cause and effect but to the sea among
              causes themselves. Before an event emerges its contributing causes encounter one
              another. They reinforce, diminish, refract, wake, conceal or appropriate one another.
              The between is not an empty distance through which causation travels. It is a
              productive medium that participates in what the cause will become.
            </p>
            <Deeper label="Go deeper · what the name refuses">
              <p>
                Not another plane set mechanically between the planes the treatise already gives,
                and not another substance added to the cosmology. The Sea is the total condition of
                mediation: every station and every province of this layer lies in it, and Etheric
                Hydrology is the study of one great water within it, the formative water, not of the
                whole. Nor is it a name for vagueness. The whole province is an argument for greater
                causal precision than either a single hidden explanation or a world in which only the
                nearest measurable antecedent is real.
              </p>
            </Deeper>
          </div>
        </div>
      </Band>

      {/* ---- causation as passage ---- */}
      <Band id="eco-sea-passage" backdrop="sandstorm-pouring-through-desert-arches" opacity={0.16} position="center 45%">
        <Eyebrow>Causation as passage</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Every cause must find a vehicle, <span className="italic text-gold">and no vehicle is transparent</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            The ordinary imagination treats causation as impact: one thing strikes another and a
            result follows. That is adequate for certain physical descriptions and insufficient for
            psychic, etheric, symbolic, biological, ritual and spiritual processes. In those domains
            the same apparent cause produces different outcomes in different people, places, times
            and states of receptivity, and very different causes converge on remarkably similar
            effects. The reason is that every cause must find a vehicle — material, etheric, astral,
            psychic, symbolic, social or spiritual — and every medium selects, colours, magnifies,
            weakens, delays or reorganises what passes through it.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            A cause entering the astral field is clothed in image, emotion, attraction and aversion.
            Entering the etheric field it meets vitality, rhythm, growth, resistance and formative
            capacity. Entering material conditions it meets weight, duration, limitation and the
            accumulated consequences of previous structures. Causation is therefore a form of
            translation: what begins as spiritual orientation may become psychic conviction, etheric
            organisation, bodily action and finally material consequence. The descending movement is
            a Kathodos; the return of experience, meaning and transformed force toward subtler levels
            is an Anodos. Between the two lies no empty corridor. There lies the sea.
          </p>
        </div>
        <div className="mt-14">
          <SeaBetweenCauses />
          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-gold-dim">
            analogical · six currents, three media, one shore
          </p>
        </div>
      </Band>

      {/* ---- an oceanic metaxy ---- */}
      <Band id="eco-sea-metaxy" backdrop="sea-stack-in-pale-tide" opacity={0.18} position="center 50%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>An oceanic metaxy</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The between that participates <span className="italic text-gold">in more than one order</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Greek thought offers the word metaxy — the between, the intermediary, that which
              participates in more than one order without being reducible to either. The treatise
              uses it of the <Arch id="soul">soul</Arch>, an active between. The Sea may be understood
              as an oceanic metaxy: not a separate plane positioned mechanically between other planes,
              nor a substance added to the cosmology, but the total condition of mediation through
              which different orders become capable of affecting one another.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-21">Aristotle's</Entry> four causes give a powerful grammar for asking why
              something exists: what it is made from, what form it takes, what brings it about, toward
              what end it moves. The Architecture complements that grammar with another question: what
              happens when these modes of causation enter one another? A final cause may call a form
              toward fulfilment while material resistance deforms its expression. A formal cause may
              organise matter while inherited pattern diverts the organisation. An efficient cause may
              trigger an event without being its deepest source. Aristotle distinguishes the
              contributing principles; the Sea describes their encounter, negotiation and transmission.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The <Entry id="xv-25">Stoics</Entry> approached an oceanic conception through pneuma and
              cosmic sympathy. <Entry id="xv-28">Plotinus</Entry> and <Entry id="xv-31">Proclus</Entry>{" "}
              described procession, participation and ordered chains through which higher principles
              become present in lower realities. These remain invaluable vertical maps. The present
              system adds attention to the turbulent middle: lateral interference, accumulated residue,
              delayed awakening, competing formation, differential receptivity, and the hidden ecology
              through which a descending force reaches one destination rather than another.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- the waters of the sea ---- */}
      <Band id="eco-sea-waters" backdrop="tidal-pool-below-sea-cliff" opacity={0.18} position="center 50%">
        <Eyebrow>The waters of the sea</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Exact in function, <span className="italic text-gold">symbolic in appearance</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The hydrological language of this layer is exact in what it does even where it looks
              like figure. The Sea's own words:
            </p>
            <Items
              items={[
                ["A current", "A sustained direction of influence."],
                ["A tide", "A periodic increase or withdrawal of availability."],
                ["A confluence", "Where previously distinct causal streams meet."],
                ["An eddy", "A self-reinforcing pattern that captures new force and turns it repeatedly through an old circuit."],
                ["Sediment", "Causal memory: the vestigia left by former events."],
                ["A storm", "A period of unstable Ontic Weather in which many forces are amplified at once and ordinary relations are hard to keep."],
              ]}
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Depth indicates removal from immediate sensible appearance. Surface causes are readily
              visible: a spoken word, a decision, a bodily action, an environmental pressure. Beneath
              them move psychic and astral causes — desire, memory, imagination, identification, fear.
              Deeper still are etheric processes of vitality, rhythm, transmission and formative
              organisation. In the abyssal regions lie the dormant configurations of the Morphocrypt,
              the Cryptodynamis of unexpressed powers, and the vestigia of patterns whose visible
              embodiments vanished long ago.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This does not make the deeper causes the more important. A small physical intervention
              may interrupt a vast psychic cycle, and a simple kindness may dissolve an inherited
              pattern that elaborate ritual could not reach. Depth describes mode and distance from
              manifestation, not moral or causal superiority.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              <Link to="/ecology/morphaither" className={L}>Morphaithēr</Link> moves within this sea as
              its formative capacity: the subtle continuity through which force acquires, remembers,
              transmits and revises form.{" "}
              <Link to="/ecology/hydrology" className={L}>Etheric Hydrology</Link> studies the movement
              of those formative waters; the Sea names the wider field in which etheric currents meet
              astral images, spiritual orientations, material limits, ancestral vestigia and living
              acts of choice. It is broader than the etheric. It is not another name for aether,
              astral light or universal vitality. It is the relational ocean through which all such
              media enter causal composition.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- confluence and the birth of effects ---- */}
      <Band id="eco-sea-estuary" backdrop="confluence-of-blue-and-gold-rivers" opacity={0.2} position="center 55%">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Confluence and the birth of effects</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              An effect <span className="italic text-gold">is an estuary</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              The place where several currents become visible together.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              What appears to be the consequence of one intention may contain personal desire,
              inherited form, environmental pressure, collective expectation, etheric condition and
              the independent agency of other beings. The resulting event belongs wholly to none of
              them. It is a confluence. This does not abolish responsibility; it makes responsibility
              more exact. One did not create the sea, the weather, or every current within it, and one
              remains responsible for the force one introduces, the direction one strengthens, and the
              forms one knowingly feeds.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              This is the Aitheric Confluence of the{" "}
              <Link to="/ecology/hydrology" hash="eco-h-watershed" className={L}>watershed</Link>{" "}
              extended into a general theory of mediated causation. When forces meet they do not
              merely add themselves together. Their encounter may generate a third tendency present
              in neither. Opposing pressures may produce equilibrium, paralysis, rupture or an
              unforeseen form. Similar forces may reach Morphal Saturation, after which a slight
              additional impulse precipitates manifestation — so that a minor event seems
              disproportionately powerful because it was not the whole cause but the final drop in an
              already saturated field.
            </p>
            <div className="mt-8">
              <Law k="Why beginnings are misidentified" text="The event nearest to an outcome is often only the gate through which older causes emerged." />
            </div>
          </div>
        </div>
      </Band>

      {/* ---- causal refraction ---- */}
      <Band id="eco-sea-refraction" backdrop="cloud-wall-crystallising-over-salt-flat" opacity={0.16} position="center 50%">
        <Eyebrow>Causal refraction</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Reception <span className="italic text-gold">is itself causal</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Portal's <Entry id="xix-2">Law of Differential Reception</Entry> is one of the
              principal laws governing the Sea, and the{" "}
              <Link to="/ecology/morphaither" hash="eco-m-reception" className={L}>first station</Link>{" "}
              drew it. Nothing receives a force merely as that force is in itself. Every being
              receives according to constitution, history, capacity, condition and degree of openness.
              Two people may stand in the same symbolic or ritual field and undergo very different
              consequences, and the difference proves neither that the force was unreal nor that one of
              them resisted. Reception is itself causal.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Here the Architecture adds what older doctrines of correspondence leave out.
              Correspondence does not guarantee transmission. A relationship may exist without
              sufficient capacity, proper timing, adequate vitality or compatible form. Symbolic
              likeness opens a possible route, and a route is not a completed passage. Between
              correspondence and manifestation lie the viscosity of the medium, the strength of
              competing currents, the condition of the receiver and the Ontic Weather around the act.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Pneumic Percolation is one mode of that passage. A subtle influence may not descend in a
              single ray. It may seep through psychic, etheric, social and material layers, appearing
              first as an intuition, then a repeated image, then a change of inclination, and at last
              an outward act. Because its stages are separated in time, the visible effect may no
              longer be associated with its original impulse. The cause has nevertheless continued
              through a hidden Cryptodrome, altering its vehicle at every depth.
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

      {/* ---- renaissance intimations ---- */}
      <Band id="eco-sea-intimations" backdrop="web-strung-across-ruined-rotunda-oculus" opacity={0.2} position="center 40%" portrait>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Renaissance intimations</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              One great water, <span className="italic text-gold">not the whole sea</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-85">Ficino's</Entry> spiritus mundi offers a mediating substance through
              which celestial and embodied life enter relation. Agrippa's occult sympathies and
              virtues describe a universe bound together through concealed affinity; the treatise
              sets them out under <Arch id="celestial">celestial correspondence</Arch>.{" "}
              <Entry id="xv-86">Paracelsian</Entry> thought approaches disease, healing, stars,
              imagination and natural signature as participants in a living causal order rather than
              isolated mechanisms.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Architecture keeps what is powerful in these conceptions and gives their mediating
              world a more differentiated anatomy. Sympathy alone does not explain why an affinity
              activates at one time and stays dormant at another. Occult virtue does not by itself
              describe interference, saturation, exhaustion, inheritance or residue. The Sea supplies
              the missing ecology: how virtues travel, where they gather, what interrupts them, what
              memories they wake, what forms they inhabit, and how the medium is altered by their
              passage.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              <Entry id="xv-91">Lévi's</Entry> astral light is another close relative: a universal
              agent receiving and transmitting images, desires and magical impressions. Dion Fortune
              later gave useful accounts of intermediary worlds, group minds and the patterned forces
              behind visible life. The present system does not place all hidden causation in one
              astral reservoir. It distinguishes astral image from etheric formation, psychic
              interpretation from pneumic orientation, and spiritual procession from morphic
              inheritance. The astral light is one great water within the Sea. It is not the whole
              sea.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- causal memory and the aitheric scar ---- */}
      <Band id="eco-sea-memory" backdrop="sea-cave-glowing-orange-at-dusk" opacity={0.2} position="center 50%">
        <Eyebrow>Causal memory and the aitheric scar</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          No force crosses the sea <span className="italic text-gold">without leaving a trace</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            Passage modifies the pathway of passage. Repeated anger makes future anger easier to
            conduct. Repeated devotion deepens a channel through which devotion can return. A
            building, a landscape, a family, an institution, a symbol or a rite may accumulate
            vestigia until it conditions everything later introduced into it. When such residue
            grows concentrated enough it forms an Aitheric Scar: a persistent deformation in the
            formative field, neither merely a memory nor an independent being but a path of altered
            receptivity. New force tends to follow its curvature. This is how the past acts without
            repeating itself visibly: its form of passage remains. The{" "}
            <Link to="/ecology/hydrology" hash="eco-h-erosion" className={L}>erosion series</Link>{" "}
            drew the same law from the surface.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            More constructive accumulations are possible. Through repeated right action,
            consecration, truthfulness and coherent use a field may attain Hierostasis: a stabilised
            condition capable of retaining and transmitting sacred order without severe distortion.
            The Sea holds both wounds and sanctuaries. It remembers predation, and it also remembers
            fidelity — which is why the{" "}
            <Link to="/ecology/catacombs" className={L}>Catacombs</Link> can hold a desecrated
            sanctuary and a consecrated one in the same passage, and why the two must be told apart.
          </p>
        </div>
      </Band>

      {/* ---- counterfeit causes ---- */}
      <Band id="eco-sea-counterfeit">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Counterfeit causes</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              Perception sees the wake <span className="italic text-gold">and invents a ship</span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Sea also explains the prevalence of counterfeit causation. Perception notices the
              final trigger and mistakes it for the originating power. It discovers a symbolic
              correspondence and assumes that correspondence alone produced the event. It feels an
              intense image and supposes the image came from the highest level. An astral image may
              appropriate a deeper spiritual impulse and present itself as that impulse's author. An
              egregore may capture available emotional currents and redirect them toward its own
              preservation. A dormant pattern may be woken by a trivial encounter, and the encounter
              blamed for everything that follows. A person may appear to cause an event while serving
              as the final conductor of pressures gathered elsewhere.
            </p>
            <div className="mt-8">
              <Law k="Three refusals, kept at the shore" text="Brightness is not proof of height. Proximity is not proof of origin. Sequence is not proof of causal sufficiency." />
            </div>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              The doctrine must therefore be joined to the Portal's{" "}
              <Entry id="xix-17">Law of Truthful Architecture</Entry>. Invisible mediation is no
              excuse for careless attribution. A hidden cause should be proposed only where timing,
              recurrence, proportion, correspondence, transmission and observable consequence form a
              coherent pattern. The Sea introduces humility into causal judgement: it teaches that
              causes may be concealed, and it does not permit every preferred explanation to be
              declared occult and thereby protected from correction. The{" "}
              <Link to="/ecology/garden" className={L}>Garden</Link> is where that discipline is
              practised on the forms that claim a cause they do not have.
            </p>
          </div>
        </div>
      </Band>

      {/* ---- magic as navigation ---- */}
      <Band id="eco-sea-navigation" backdrop="lighthouse-beam-across-storm-sea" opacity={0.22} position="center 50%">
        <Eyebrow>Magic as navigation</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Not the command of reality — <span className="italic text-gold">passage within a populated sea</span>
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              From this perspective magic is not the arbitrary command of reality. It is navigation
              within a populated and conditioned sea. <Arch id="ritual">Ritual</Arch> establishes
              direction, builds a vessel, selects a current, and attempts to create sufficient
              coherence for passage. Symbols orient forces; timing places the operation within a
              favourable tide; consecration reduces contamination; repetition deepens a channel;
              imagination supplies astral clothing; etheric vitality gives the operation formative
              pressure; and material action provides a harbour in which the force can become
              embodied.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Failure may come because the intended force was weak, the vehicle unsuitable, the
              receiver unreceptive, the field saturated by another pattern, or the chosen
              correspondence merely superficial. Success may produce unintended consequences if the
              operator understands the desired destination but not the currents crossed to reach it.
              Power without causal literacy launches an effective force into waters whose return
              movements have not been considered.
            </p>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              For this reason the <Arch id="relation">Law of Right Relation</Arch> stands above mere
              effectiveness. No operation remains wholly local. Every introduced force enters a shared
              medium, touches existing currents, and leaves vestigia. The question is never only
              whether an effect can be produced.
            </p>
            <div className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-bone/85">
              What pathways must be strengthened to produce it, what other lives participate in those
              pathways, and what will return when the current turns?
            </div>
          </div>
        </div>
      </Band>

      {/* ---- the original contribution ---- */}
      <Band id="eco-sea-adds" backdrop="sunset-through-sea-cave-arch" opacity={0.2} position="center 50%">
        <Eyebrow>What the Sea adds</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Depth, motion, memory, weather, ecology and structure <span className="italic text-gold">for the middle</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Older systems describe the heights from which forces descend, the correspondences binding
          worlds together, or the invisible agents through which effects are produced. Modern causal
          models excel at isolating measurable relationships. Between these approaches remains an
          insufficiently described middle: the field in which multiple orders of causation mingle
          before becoming experience. The Architecture gives that middle its anatomy in five
          propositions.
        </p>
        <Items
          items={[
            ["Vehicle", "Every cause requires a vehicle, and every vehicle transforms what it carries."],
            ["Reception", "Every receiver participates in what it receives."],
            ["Confluence", "Every confluence can generate more than the sum of its currents."],
            ["Vestigia", "Every passage leaves vestigia."],
            ["Remainder", "No visible effect necessarily exhausts the force from which it arose."],
          ]}
        />
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The Sea Between Causes is not a doctrine of vagueness. It is an argument for greater causal
          precision, refusing both the simplicity of a single invisible explanation and the flatness
          of a world in which only the nearest measurable antecedent is real. It reveals
          manifestation as a negotiated arrival. Every event is a shore. Upon it wash the currents of
          intention, memory, vitality, image, matter, environment, inheritance and choice. Some
          waters come from luminous heights. Others rise from the{" "}
          <Link to="/ecology/aquifer" className={L}>Black Aquifer</Link> of forgotten depths. Some
          carry the Sap of Heaven; others the sediment of ruined forms. They cross, mingle and alter
          one another before anything becomes visible.
        </p>
        <div className="mt-12">
          <Law k="The last line of the sea" text="What we call an effect is what the Sea has, for a moment, agreed to reveal." size="xl" />
        </div>
        <Pointers
          arch={["soul", "celestial", "correspondence", "image", "ritual", "relation", "laws", "morphaither", "flywheel", "mediation"]}
          portal={["xix-2", "xix-17", "xv-21", "xv-25", "xv-28", "xv-31", "xv-85", "xv-86", "xv-91"]}
        />
      </Band>

      <Neighbours
        of="sea"
        lines={{
          nursery: "Where what the sea holds in suspension first acquires enough enclosure to gestate.",
          aquifer: "The depth beneath the sea's floor, where force settles when no form carries it.",
          catacombs: "The sea's sediment where it was sacred: the wakes of gods, and their scars.",
          garden: "Where counterfeit causes bloom — the wake taken for the ship, and made beautiful.",
          hungry: "An eddy that has learned to feed: a self-reinforcing pattern turning force through an old circuit.",
        }}
      />
      <Transition from="sea" />
    </EcologyFrame>
  );
}
