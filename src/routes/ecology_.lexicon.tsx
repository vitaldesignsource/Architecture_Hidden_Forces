import { createFileRoute, Link } from "@tanstack/react-router";
import { Backdrop } from "@/components/Backdrop";
import { RevealText } from "@/components/RevealText";
import { EcologyFrame, Band, Eyebrow } from "@/components/ecology/EcologyFrame";
import { Arch } from "@/components/ecology/Pointers";
import { PROVINCES, STATIONS } from "@/lib/ecology";

/**
 * The Lexicon — the layer's coined vocabulary, each term defined once.
 *
 * The Architecture names processes that esoteric language leaves vague, and
 * the names are made to interlock: Cryptodynamis is what secretly has
 * power; Katadynamis is that power descending; Morphoflux is formative
 * movement; Aitherostasis its stabilisation; Hieropyrosis sacred ignition;
 * Hierostasis sacred persistence; a Morphorelic what form leaves actively
 * behind; and Vestigia the traces by which the whole hidden process becomes
 * partly knowable. Grouped by root, so the grammar shows, with the page
 * where each term is put to work.
 */
export const Route = createFileRoute("/ecology_/lexicon")({
  head: () => ({
    meta: [
      { title: "The Lexicon — The Hidden Ecology of Formation" },
      { name: "description", content: "The coined vocabulary of the Hidden Ecology, defined once and grouped by root: the morph-, aither-, pneum-, hier- and crypt- families, descent and return, and the whole condition called Ontic Weather." },
    ],
  }),
  component: Lexicon,
});

type Where = { to: (typeof STATIONS)[number]["to"] | "/ecology" | "/phos"; hash?: string; label: string };
type Term = { k: string; root?: string; d: string; at?: Where };

const FAMILIES: { id: string; k: string; root: string; note: string; backdrop?: string; portrait?: boolean; terms: Term[] }[] = [
  {
    id: "eco-lx-morph", k: "The morph- family", root: "μορφή · form", backdrop: "scribe-at-work-by-lamplight",
    note: "Formation: the medium, the movement within it, the pressures and saturations that decide what becomes, and what form leaves behind.",
    terms: [
      { k: "Morphaithēr", root: "μορφή + αἰθήρ", d: "The formative aether: the intermediary medium through which force, pattern, tendency and possibility are organised toward manifestation. Not itself finished form, but the field in which the conditions of form are assembled — the interval between what can be and what has actually become.", at: { to: "/ecology/morphaither", label: "Station I" } },
      { k: "Morphoflux", root: "μορφή + fluxus", d: "Formative potential in motion: pattern before stabilisation, while formative tendencies are still moving, combining, competing, differentiating and seeking viable organisation. If Morphaithēr is the medium, Morphoflux is the movement within it.", at: { to: "/ecology/nursery", hash: "eco-n-conception", label: "The Nursery" } },
      { k: "Morphogenic Pressure", d: "The accumulated tendency of formative forces toward organisation and embodiment, developing when patterns, correspondences, conditions or repeated influences converge strongly enough that manifestation is pressed toward a particular outcome. Pressure does not guarantee formation; it can gather around something that never manifests.", at: { to: "/ecology/aquifer", hash: "eco-a-saturated", label: "The Aquifer" } },
      { k: "Morphal Saturation", d: "A field deeply impregnated with a particular formative pattern. Repetition increases the pattern's dominance until subsequent manifestations become ever likelier to follow it: how repetition changes the probability landscape of formation.", at: { to: "/ecology/hungry", hash: "eco-hf-birth", label: "Hungry Forms" } },
      { k: "Morphal Inheritance", d: "The transmission of formative conditions from earlier forms into later ones. New forms do not arise on a blank surface; they meet fields already conditioned by previous organisms, events, structures, symbols, environments and histories. How the past participates in the architecture of what becomes possible next.", at: { to: "/ecology/aquifer", hash: "eco-a-holds", label: "The Aquifer" } },
      { k: "Morphocrypt", root: "μορφή + κρυπτός", d: "The hidden depth of unrealised formation: trajectories interrupted, abandoned, suppressed, rendered dormant, extinguished, or never supplied with the conditions for complete manifestation. What has formative significance while remaining beneath the threshold of completed form.", at: { to: "/ecology/catacombs", hash: "eco-cat-three", label: "The Catacombs" } },
      { k: "Morphorelic", d: "A formative remainder persisting after its originating form has dissolved or failed to reach completion. More than evidence that something occurred: some element of formative organisation itself remains able to condition the surrounding field, long after its embodiment has gone.", at: { to: "/ecology/aquifer", hash: "eco-a-holds", label: "The Aquifer" } },
      { k: "Morphokyēsis", root: "μορφή + κύησις", d: "The gestation of form: the provisional arrangement of force, memory, relation and possibility an unborn form undergoes before it is enough itself to live.", at: { to: "/ecology/nursery", hash: "eco-n-third", label: "The Nursery" } },
      { k: "Vestigium · Vestigia", root: "Latin vestigium · a footprint", d: "The trace through which an absent form, force, event or hidden operation becomes knowable; Vestigia are such traces collectively. Hidden forces need not be approached only through claims of direct perception: they may be investigated through the traces their operations leave. A Vestigium is evidentiary; a Morphorelic is formative. A Morphorelic can be a Vestigium; most Vestigia are not Morphorelics.", at: { to: "/ecology/sea", hash: "eco-sea-memory", label: "The Sea" } },
      { k: "Formwake", d: "The immediate disturbance trailing behind a form that has passed — stories, gestures, fears, blessings, festival dates, place-names, taboos, expectations — still moving after the institution that generated them has gone. Also the disturbance a form moving beneath the threshold leaves ahead of itself in experience.", at: { to: "/ecology/catacombs", hash: "eco-cat-descent", label: "The Catacombs" } },
    ],
  },
  {
    id: "eco-lx-aither", k: "The aither- family", root: "αἰθήρ · the upper air",
    note: "The etheric: how organised etheric activity arises, holds, meets, and is scarred.",
    terms: [
      { k: "Aitherogenesis", root: "αἰθήρ + γένεσις", d: "The generation or emergence of organised etheric activity: how etheric structures, circulations and formative conditions arise, rather than how existing ones behave.", at: { to: "/ecology/nursery", hash: "eco-n-conception", label: "The Nursery" } },
      { k: "Aitherostasis", root: "αἰθήρ + στάσις", d: "The stabilisation of etheric activity into a persistent formative condition. Movement alone does not produce enduring organisation; currents must acquire enough coherence to remain. The stage between etheric activity and sustained formation.", at: { to: "/ecology/nursery", hash: "eco-n-conception", label: "The Nursery" } },
      { k: "Aitheric Confluence", d: "A point or region in which several etheric currents meet, and may combine, redirect, intensify, weaken, interfere with or transform one another. Within Etheric Hydrology, a site of exchange and of unusual formative activity.", at: { to: "/ecology/hydrology", hash: "eco-h-watershed", label: "Etheric Hydrology" } },
      { k: "Aitheric Scar", d: "A persistent deformation or altered condition remaining in an etheric field after an intense, disruptive or repeatedly reinforced event. Not every difficult experience produces one; the term is for a field that fails to return completely to its previous configuration. A Vestigium merely remains; a scar continues to bias what later becomes possible around it.", at: { to: "/ecology/sea", hash: "eco-sea-memory", label: "The Sea" } },
      { k: "Aitheric Silt · Formative Sediment", d: "The residue of a form's wake as it loses explicit context and settles through locations, bodies, customs and collective atmospheres; and that residue compressed by repetition, trauma, beauty, longing and devotion until it shapes later imagination without needing to be remembered.", at: { to: "/ecology/catacombs", hash: "eco-cat-descent", label: "The Catacombs" } },
    ],
  },
  {
    id: "eco-lx-pneum", k: "The pneum- family", root: "πνεῦμα · breath, spirit", backdrop: "steaming-volcanic-crater-at-sunrise", portrait: true,
    note: "Spirit in movement: why it moves, how slowly it penetrates, how it crosses a boundary, and how it is kindled.",
    terms: [
      { k: "Pneumotension", root: "πνεῦμα + tensio", d: "A difference in pneumatic or spiritual potential between beings, regions, states or ontological levels. Such differences make movement or transmission possible — a way to say why spiritual influence moves, rather than merely that it does. In an unborn form, the inward pressure by which it strains toward fuller expression.", at: { to: "/ecology/aquifer", hash: "eco-a-formed", label: "The Aquifer" } },
      { k: "Pneumic Percolation", d: "The slow penetration of pneumatic influence through successive layers of a being, structure or field — not instantaneous appearance at every level but gradual transmission through media of differing receptivity.", at: { to: "/ecology/aquifer", hash: "eco-a-formed", label: "The Aquifer" } },
      { k: "Pneumosmosis", root: "πνεῦμα + ὠσμός", d: "The gradual passage of pneumatic influence across a boundary through differential receptivity. Not violent influx or sudden irruption: subtle, cumulative, hard to identify at any single moment, apparent through accumulation." },
      { k: "Pneumapyrosis", root: "πνεῦμα + πύρωσις", d: "Pneumatic ignition: the awakening of spiritual activity within a receptive structure. Something previously latent becomes active. Activation, rather than reception." },
    ],
  },
  {
    id: "eco-lx-hier", k: "The hier- family", root: "ἱερός · sacred",
    note: "The sacred as ignition, as a presence held, and as a slow saturation — and the flowering that claims a sacredness it does not have.",
    terms: [
      { k: "Hieropyrosis", root: "ἱερός + πύρωσις", d: "Sacred ignition: a receptive vessel enkindled by a higher or consecrating potency. Of persons, ritual structures, images, places, symbols, or any vessel able to take part in a higher-order influence. The moment of ignition, not the duration of what follows.", at: { to: "/ecology/catacombs", hash: "eco-cat-return", label: "The Catacombs" } },
      { k: "Hierostasis · Hierostatic", root: "ἱερός + στάσις", d: "The stabilisation of sacred presence within a receptive vessel. Something may undergo Hieropyrosis and fail to achieve Hierostasis — receive the fire and prove unable to keep it. A Hierostatic structure has the organisation to sustain such presence with relative stability: the concern of temples, consecration, ensoulment, relics, theurgy and sacred objects.", at: { to: "/ecology/catacombs", hash: "eco-cat-architecture", label: "The Catacombs" } },
      { k: "Hierosmosis", root: "ἱερός + ὠσμός", d: "The gradual penetration of sacred influence across the boundaries between conditions or orders of being. Where Hieropyrosis emphasises ignition, Hierosmosis is slow saturation: repeated ritual, contemplation, consecration, participation, prolonged proximity to a sacred centre. A consecrated form as a selective membrane.", at: { to: "/ecology/aquifer", hash: "eco-a-ritual", label: "The Aquifer" } },
      { k: "False Anthesis", root: "ἄνθησις · flowering", d: "The flowering of a form before it possesses, or after it has lost, the inner relation its appearance implies. The condition of the counterfeit.", at: { to: "/ecology/garden", hash: "eco-g-counterfeit", label: "The Garden" } },
    ],
  },
  {
    id: "eco-lx-crypt", k: "The crypt- family", root: "κρυπτός · hidden", backdrop: "pale-root-threads-in-wet-forest-ravine", portrait: true,
    note: "The hidden as power, as order, as a way, as a course, and as an ignition beneath the threshold.",
    terms: [
      { k: "Cryptodynamis", root: "κρυπτός + δύναμις", d: "Hidden potency: a force whose existence is not directly apparent and becomes inferable through its operations and effects. Not simply something invisible — an operative potency whose nature must be reconstructed through what it causes, often through its Vestigia. The term nearest the central premise of the Architecture.", at: { to: "/ecology/sea", hash: "eco-sea-waters", label: "The Sea" } },
      { k: "Cryptaxis", root: "κρυπτός + τάξις", d: "The hidden ordering principle by which forces, currents and formative processes acquire direction or arrangement. Where Cryptodynamis concerns hidden power, Cryptaxis concerns hidden order: the existence of potency told apart from the architecture governing what it does.", at: { to: "/ecology/garden", hash: "eco-g-grow", label: "The Garden" } },
      { k: "Cryptodos", root: "κρυπτός + ὁδός", d: "A hidden way or passage connecting otherwise separated regions, conditions or orders. The possibility of passage, not the movement through it: a Cryptodos can exist without being continuously active." },
      { k: "Cryptodrome", root: "κρυπτός + δρόμος", d: "The concealed course or channel through which hidden forces actually move. The Cryptodos is the hidden way; the Cryptodrome is the established course of movement through it.", at: { to: "/ecology/sea", hash: "eco-sea-refraction", label: "The Sea" } },
      { k: "Cryptopyrosis", root: "κρυπτός + πύρωσις", d: "Hidden ignition: activation beneath the threshold of outward manifestation. A process has begun whose consequences are not yet apparent — one origin of the interval between hidden causation and visible event. In the Aquifer, the hidden fire of occluded light; in the Catacombs, the flare of a form from below, kindled by stored charge, which is not the same as Hieropyrosis.", at: { to: "/ecology/aquifer", hash: "eco-a-light", label: "The Aquifer" } },
    ],
  },
  {
    id: "eco-lx-kata", k: "Descent and return", root: "κάθοδος · ἄνοδος",
    note: "The direction of manifestation, the potency that travels it, the way back, and the coming-forth of light.",
    terms: [
      { k: "Kathodos", root: "κάθοδος · the way down", d: "The principle of descent: movement from subtler, more unified or less determinate conditions toward differentiation, density, multiplicity and embodiment. The metaphysical direction, within which Katadynamis occurs.", at: { to: "/ecology/sea", hash: "eco-sea-passage", label: "The Sea" } },
      { k: "Katadynamis · Katadynamic", root: "κατά + δύναμις", d: "The downward procession of potency toward determination and manifestation. Potency does not leap into material expression; it passes through mediations, meets resistance, is differentiated, and takes forms fit for increasingly determinate levels. In the Aquifer, the settling of force beneath the threshold of active expression.", at: { to: "/ecology/aquifer", hash: "eco-a-formed", label: "The Aquifer" } },
      { k: "Anodos", root: "ἄνοδος · the way up", d: "The complementary movement of ascent: from differentiated or embodied conditions toward subtler integration, liberation, reunification or return. Not Kathodos played backward — what returns may have been transformed by manifestation, and ascent can integrate what was acquired through descent.", at: { to: "/ecology/aquifer", hash: "eco-a-light", label: "The Aquifer" } },
      { k: "Photogenesis", root: "φῶς + γένεσις", d: "The generation or emergence of luminous activity — physical, etheric, psychic, symbolic, visionary or spiritual, as context distinguishes. The coming-forth of luminosity, which belongs to the doctrine of the luminous architecture.", at: { to: "/phos", label: "Phōs" } },
    ],
  },
  {
    id: "eco-lx-weather", k: "The whole condition", root: "and the forms that fail it", backdrop: "dark-hall-with-charted-stone-floor",
    note: "The total weather of a moment, the memory-bearing aether, and the names the layer gives to forms whose circulation has failed.",
    terms: [
      { k: "Ontic Weather", d: "The temporary configuration of forces, tensions, cycles, correspondences, receptivities, currents, environments and mediatory conditions affecting a place, organism, event or period. Not a favourable or unfavourable energy: a shifting total condition produced by intersecting hidden influences, under which some formations flourish and others become impossible — and certain events become possible only when the necessary conditions converge.", at: { to: "/ecology/aquifer", hash: "eco-a-weather", label: "The Aquifer" } },
      { k: "Mnēmaithēr · the Retentive Deep", root: "μνήμη + αἰθήρ", d: "The memory-bearing aether the system associates with the deepest residue of a sacred form: not a warehouse of complete personalities but a depth in which formative consequence persists after biography and name have been stripped away.", at: { to: "/ecology/catacombs", hash: "eco-cat-descent", label: "The Catacombs" } },
      { k: "Hungry Form", d: "A subtle formation that cannot sustain itself through right relation and so seeks repeated nourishment without achieving completion. Hunger is not a species of entity but a disorder of relationship: a pathology of mediation, circulation and return.", at: { to: "/ecology/hungry", hash: "eco-hf-appetite", label: "Hungry Forms" } },
      { k: "Egregore", root: "ἐγρήγοροι · the watchers — a later borrowing", d: "A collectively sustained form that has acquired continuity, memory, atmosphere and some reciprocal influence over the group associated with it. Usable, as the treatise says, as a personification of a highly organised collective pattern, without implying a literally independent invisible entity. Not automatically a god; not automatically hungry.", at: { to: "/ecology/hungry", hash: "eco-hf-appetite", label: "Hungry Forms" } },
      { k: "Spiritual necrosis", d: "The persistence of sacred anatomy after circulation has ceased: a form that retains command after losing communion. A dead form can continue issuing living imperatives.", at: { to: "/ecology/catacombs", hash: "eco-cat-egregores", label: "The Catacombs" } },
    ],
  },
];

function Lexicon() {
  const count = FAMILIES.reduce((n, f) => n + f.terms.length, 0);
  return (
    <EcologyFrame
      page="lexicon"
      title={
        <header id="top" className="relative isolate overflow-hidden pb-24 pt-40 sm:pb-32 sm:pt-52">
          <Backdrop src="/bg/spiral-apothecary-of-lit-vials.webp" opacity={0.3} position="center 50%" scrim={0.28} fill />
          <div className="grain" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="animate-rise">
              <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
                The Hidden Ecology of Formation · Apparatus
              </p>
              <h1 className="mt-8 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
                <RevealText text="The Lexicon" shimmer />
              </h1>
              <p className="mt-6 font-label text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                {count} coined terms · defined once · grouped by root
              </p>
              <p className="mt-10 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone/90 sm:text-3xl">
                A language of hidden potency, descent, transmission, formation, stabilisation,
                persistence, memory and return.
              </p>
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
                The terms are made to interlock, which is what makes them a vocabulary rather than a
                collection of neologisms. Cryptodynamis concerns what secretly possesses power;
                Katadynamis describes power descending toward manifestation; Morphoflux describes
                formative movement; Aitherostasis its stabilisation; Hieropyrosis sacred ignition;
                Hierostasis sacred persistence; a Morphorelic what form leaves actively behind; and
                Vestigia are the traces through which the whole hidden process becomes partly
                knowable. Each entry says where in the layer the term is put to work. Coinages from
                Greek roots are marked as such, as the treatise marks Morphaithēr: technical, modern,
                and not attested ancient terms.
              </p>
            </div>
          </div>
        </header>
      }
    >
      {FAMILIES.map((f) => (
        <Band key={f.id} id={f.id} backdrop={f.backdrop} opacity={f.portrait ? 0.18 : 0.14} position="center 50%" portrait={f.portrait}>
          <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{f.k}</Eyebrow>
              <p className="mt-4 font-serif text-2xl text-gold/80" lang="grc">{f.root}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
            </div>
            <div className="border-t border-border">
              {f.terms.map((t) => (
                <div key={t.k} className="grid gap-3 border-b border-border py-6 lg:grid-cols-[13rem_1fr] lg:gap-8">
                  <div>
                    <p className="font-serif text-xl text-bone">{t.k}</p>
                    {t.root && <p className="mt-1 font-serif text-sm italic text-gold/70">{t.root}</p>}
                    {t.at && (
                      <p className="mt-3 font-label text-[9px] uppercase tracking-[0.2em] text-gold-dim">
                        <Link to={t.at.to} hash={t.at.hash} className="transition-colors hover:text-gold">
                          at work · {t.at.label}
                        </Link>
                      </p>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Band>
      ))}

      {/* ---- where the words belong ---- */}
      <Band id="eco-lx-where">
        <Eyebrow>Where the words belong</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
          Six stations, six provinces, <span className="italic text-gold">one vocabulary</span>
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The treatise's own <Arch id="terms">five terms</Arch> — matter, form, force, field, centre —
          stand beneath all of these; the lexicon names what happens between them. Every station and
          province of the layer uses the vocabulary above, and each is the place where a handful of its
          words are put to work.
        </p>
        <div className="mt-10 grid gap-px border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {[...STATIONS, ...PROVINCES].map((s) => (
            <Link key={s.id} to={s.to} className="group flex flex-col bg-void p-5 transition-colors hover:bg-gold/5">
              <span className="font-label text-[9px] uppercase tracking-[0.25em] text-gold-dim">{s.region ?? `Station ${s.n}`}</span>
              <span className="mt-3 font-serif text-lg leading-tight text-bone transition-colors group-hover:text-gold">{s.title}</span>
              <span className="mt-2 font-label text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{s.shorthand}</span>
            </Link>
          ))}
        </div>
      </Band>
    </EcologyFrame>
  );
}
