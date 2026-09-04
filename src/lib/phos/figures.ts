import { lazy, type LazyExoticComponent } from "react";

type Drawing = () => React.JSX.Element;

/**
 * A drawing is fetched the first time a page shows it, not with the page.
 * Thirteen entries carry a figure; the other six hundred should not pay for
 * fifty drawings they never open, and the treatises keep their own.
 */
const MODULES = import.meta.glob<Record<string, Drawing>>("/src/components/diagrams/*.tsx");
function drawing(name: string): LazyExoticComponent<Drawing> {
  const load = MODULES[`/src/components/diagrams/${name}.tsx`];
  if (!load) throw new Error(`No drawing is filed as ${name}`);
  return lazy(async () => ({ default: (await load())[name] }));
}

/**
 * The Diagram Library, as a registry.
 *
 * Division XXI's own entry on the Diagram Library sets two requirements that a
 * bare gallery of drawings would fail. First, "every diagram includes a legend
 * stating whether its relations are spatial, causal, symbolic, hierarchical,
 * cyclical, or analogical" — because a vertical drawing may mean ontological
 * priority rather than height, and without the legend the drawing silently
 * asserts more than it was made to say. Second, "multiple diagrams may be
 * needed for the same teaching" — a ladder reveals gradation, a web reciprocal
 * participation, a cycle procession and return.
 *
 * So a figure here is never just a component. It carries the kind of relation
 * it draws, what it refuses to say, and the teaching it belongs to; and where
 * two figures share a teaching they are offered as alternative projections of
 * it rather than as two separate pictures.
 */

/** The six kinds of relation a diagram may assert, from XXI · 20. */
export const RELATIONS = {
  spatial: "Position on the page stands for position in fact — what encloses, adjoins, or lies between what.",
  causal: "An arrow means one thing brings another about, in the direction drawn.",
  symbolic: "The figure is a condensed architecture, read the way a symbol is read, not measured.",
  hierarchical: "Height means ontological priority — what depends on what — and never physical altitude.",
  cyclical: "The order is a return, not a queue. It has no first term, and it does not end where it began.",
  analogical: "Two structures are set side by side because they behave alike, which is a resemblance and not an identity.",
} as const;

export type Relation = keyof typeof RELATIONS;

export type Figure = {
  /** The name an entry uses in `::figure <name>`, and the name shown. */
  k: string;
  C: LazyExoticComponent<Drawing>;
  rel: Relation;
  /** What the drawing shows. */
  d: string;
  /** What the geometry must not be read as saying. Every figure has one. */
  not: string;
  /** Figures sharing a teaching are alternative projections of it. */
  teaching?: string;
};

export const FIGURES: Figure[] = [
  // ── the Fourfold Veil, in two geometries ────────────────────────────────
  { k: "Fourfold Veil", C: drawing("FourfoldVeil"), rel: "spatial", teaching: "The Fourfold Veil",
    d: "The four ethers as nested membranes: Warmth enclosing Light, enclosing Tone, enclosing Life, enclosing CHON, with one channel crossing all four in both directions.",
    not: "Not four floors. Nothing here is ever switched off — every embodied act involves all four at once." },
  { k: "Ether Circuit", C: drawing("EtherCircuit"), rel: "cyclical", teaching: "The Fourfold Veil",
    d: "The same four as a closed circuit with a return path, which is what the doctrine says they are.",
    not: "Not a ladder, and not a sequence a reader may enter at the top and leave at the bottom." },

  // ── right relation, in two geometries ───────────────────────────────────
  { k: "Right Relation", C: drawing("RightRelation"), rel: "cyclical", teaching: "Right relation",
    d: "Potency to fruit as a cycle with exits at every stage.",
    not: "Not four automatic steps. Participation does not inevitably produce measure." },
  { k: "Right Measure", C: drawing("RightMeasure"), rel: "spatial", teaching: "Right relation",
    d: "The eight principles drawn as beams meeting, rather than as a list to be worked through.",
    not: "Not stages. The beams are simultaneous conditions, and a relation fails by any of them." },

  // ── the triad, in two geometries ────────────────────────────────────────
  { k: "The Triad", C: drawing("TheTriad"), rel: "spatial", teaching: "The alchemical triad",
    d: "Sulfur above, Salt below, Mercury circulating between — deliberately not an equilateral triangle.",
    not: "The third is not another object beside the first two. It is the relation between them." },
  { k: "Three Treasures", C: drawing("ThreeTreasures"), rel: "cyclical", teaching: "The alchemical triad",
    d: "Jing, Qi and Shen as a circuit of four named relations and no others.",
    not: "Not a ladder from coarse to fine. Shen directs Qi as surely as Qi nourishes Shen." },

  // ── the five phases, in two geometries ──────────────────────────────────
  { k: "Wuxing Cycles", C: drawing("WuxingCycles"), rel: "cyclical", teaching: "The Five Phases",
    d: "Generating round the rim, regulating cutting across as a pentagram.",
    not: "Not five substances. They are phases of one transformation." },
  { k: "Phase Organs", C: drawing("PhaseOrgans"), rel: "analogical", teaching: "The Five Phases",
    d: "The same five carrying their organ networks, virtues, emotions and spirits.",
    not: "The correspondences are traditional and functional, not anatomical claims in the modern sense." },

  // ── the etheric tides, at two scales ────────────────────────────────────
  { k: "Etheric Tides", C: drawing("EthericTides"), rel: "cyclical", teaching: "Etheric rhythm",
    d: "Three nested cycles at different periods, read at one instant; the composite is the field.",
    not: "No single cycle gives the condition of a moment." },
  { k: "Etheric Tide Scales", C: drawing("EthericTideScales"), rel: "cyclical", teaching: "Etheric rhythm",
    d: "The same alternation at five wavelengths, from the breath to the year.",
    not: "Vitality is rhythmic rather than quantitative. This is a tide, not a battery level." },

  // ── the vertical chain, in several geometries ───────────────────────────
  { k: "Vertical Chain", C: drawing("VerticalChain"), rel: "hierarchical", teaching: "Vertical mediation",
    d: "The chain drawn radially: the Name as governing centre, the Archangel as the circumference of an ordered field, Angels as its differentiation.",
    not: "Radial, not vertical, because the doctrine states its own geometry — the centre is not above." },
  { k: "Hypostases", C: drawing("Hypostases"), rel: "hierarchical", teaching: "Vertical mediation",
    d: "The three Plotinian levels with the Proclan rhythm around them; the core never dims as the pulses leave it.",
    not: "Height is ontological priority. The One is not further up." },
  { k: "Ladder of Lights", C: drawing("LadderOfLights"), rel: "hierarchical", teaching: "Vertical mediation",
    d: "Suhrawardī's hierarchy with its two directions of traffic, differing in intensity and not in kind.",
    not: "Not a staircase of separate substances. One light, at differing degrees." },
  { k: "Four Offices", C: drawing("FourOffices"), rel: "hierarchical", teaching: "Vertical mediation",
    d: "Vertical in order, reciprocal in operation.",
    not: "Not four floors. Pneuma reaches awareness only through the capacities beneath it." },
  { k: "Daimonic Chain", C: drawing("DaimonicChain"), rel: "causal", teaching: "Vertical mediation",
    d: "Divine virtue down to embodied consequence, with consequence returning to character rather than to the source.",
    not: "The loop closes partially, on purpose. Consequence does not run back up the chain." },

  // ── the three lights ────────────────────────────────────────────────────
  { k: "Three Lights", C: drawing("ThreeLights"), rel: "spatial", teaching: "Lux, lumen, splendor",
    d: "Light in its source, in the medium, and in the thing seen — three words medieval optics kept apart.",
    not: "Not three intensities of one thing. Three different events." },
  { k: "Lux Sphere", C: drawing("LuxSphere"), rel: "causal", teaching: "Lux, lumen, splendor",
    d: "Grosseteste's De Luce: a point multiplies itself in every direction, and the sphere it generates is the first body.",
    not: "Extension is the consequence here, not the container. The sphere is made, not entered." },
  { k: "Lumen Field", C: drawing("LumenField"), rel: "symbolic",
    d: "The volume's emblem: a source and what leaves it, rays thinning with distance.",
    not: "An emblem, not a measurement." },

  // ── the vessel ──────────────────────────────────────────────────────────
  { k: "Vessel and Measure", C: drawing("VesselAndMeasure"), rel: "causal", teaching: "The vessel",
    d: "Or Yashar and Or Chozer: the straight light descending, the returning light the vessel gives back, and what happens at the rim.",
    not: "The rim is a real limit. Past the measure the vessel does not stretch, it breaks." },
  { k: "Sophianic Chalice", C: drawing("SophianicChalice"), rel: "symbolic", teaching: "The vessel",
    d: "A star descends, its light turns fluid on entering, the cup receives it, roots carry it further.",
    not: "Emblem rather than mechanism: read it as a symbol reads." },

  // ── colour ──────────────────────────────────────────────────────────────
  { k: "Boundary Colour", C: drawing("BoundaryColour"), rel: "causal", teaching: "Where colour arises",
    d: "Goethe's primal phenomenon as the single polarity it is: light through a turbid medium warms, darkness through a lit one cools.",
    not: "Not a rival account of the spectrum. A description of the boundary, not a physics of dispersion." },

  // ── the field ───────────────────────────────────────────────────────────
  { k: "Morphaitheric Field", C: drawing("MorphaithericField"), rel: "spatial", teaching: "Morphaithēr",
    d: "The eight behaviours of the field drawn in one terrain.",
    not: "Closer to an ecosystem than to a fluid. Not one more substance added to the world." },
  { k: "CHON", C: drawing("Chon"), rel: "spatial", teaching: "Morphaithēr",
    d: "Carbon, hydrogen, oxygen and nitrogen as a crucible of relations.",
    not: "Refuses the building-block image: none of the four suffices alone." },
  { k: "The Recursion", C: drawing("TheRecursion"), rel: "cyclical", teaching: "Morphaithēr",
    d: "Field to form to modified field to new form — a loop that does not close.",
    not: "The field a form returns to is not the field it came from." },

  // ── the interior ────────────────────────────────────────────────────────
  { k: "The Chariot", C: drawing("TheChariot"), rel: "cyclical", teaching: "Ignisophia",
    d: "Hod and Netzach as two wheels, the Inner Sun at the centre; divided, the wheels counter-rotate and the Sun goes nowhere.",
    not: "The toggle is the doctrine, not decoration." },
  { k: "Sophianic Faces", C: drawing("SophianicFaces"), rel: "symbolic", teaching: "Ignisophia",
    d: "Five faces over a shared depth.",
    not: "None of the five is the complete feminine, and the Dark Feminine is not a sixth beside them." },
  { k: "The Axis", C: drawing("TheAxis"), rel: "spatial", teaching: "The interior axis",
    d: "Head, Heart and Hara as a line that can break, and what each pair loses when it does.",
    not: "Not three centres in a series. A line under tension." },
  { k: "Centers Axis", C: drawing("CentersAxis"), rel: "hierarchical", teaching: "The interior axis",
    d: "Six centres on the axis with the crown above them, which is the traditional arrangement.",
    not: "Not seven identical wheels in a series." },
  { k: "Three Nadis", C: drawing("ThreeNadis"), rel: "spatial", teaching: "The interior axis",
    d: "Ida and Pingala crossing a central Sushumna, their zero-crossings landing exactly on the nodes.",
    not: "The nodes are where the crossings fall, not decorations placed along a line." },

  // ── image, symbol, and the imaginal ─────────────────────────────────────
  { k: "Imaginal Bridge", C: drawing("ImaginalBridge"), rel: "causal", teaching: "The imaginal",
    d: "Six stages between an unrepresented force and an embodied response, running both ways.",
    not: "A bridge, so it carries traffic in both directions; reversing it reverses the meaning." },
  { k: "Symbolon", C: drawing("Symbolon"), rel: "symbolic", teaching: "The imaginal",
    d: "The tally: one half the visible form, the other whichever level it fits, consciousness the third party that recognises the fit.",
    not: "The fit is recognised, not invented — and not every half finds its match." },
  { k: "The Interval", C: drawing("TheInterval"), rel: "spatial", teaching: "The imaginal",
    d: "Five things usually collapsed into one, and the four gaps between them.",
    not: "A discipline of not answering too early, rather than a claim about what subtle experience is." },

  // ── operations ──────────────────────────────────────────────────────────
  { k: "Solve Coagula", C: drawing("SolveCoagula"), rel: "cyclical", teaching: "Solve et coagula",
    d: "One cycle, two movements, three principles that exchange roles.",
    not: "Not simply dissolution before reformation. The principles do different work in each phase." },
  { k: "Wheel of Transelementation", C: drawing("WheelOfTranselementation"), rel: "cyclical", teaching: "Transformation",
    d: "The elements reorder; the centre does not move.",
    not: "A static classification would be the wrong figure, so the ring turns." },
  { k: "Force and Form", C: drawing("ForceAndForm"), rel: "causal", teaching: "Force and form",
    d: "Potency into visible structure, with the threshold of visibility crossed only at the last step.",
    not: "Everything before that threshold has already happened, invisibly." },
  { k: "Force Registers", C: drawing("ForceRegisters"), rel: "spatial", teaching: "Force and form",
    d: "Six categories drawn as three different kinds of thing, because they are not six equivalent substances.",
    not: "Transcendent, formative and material are registers, not shelves." },
  { k: "Rite Sequence", C: drawing("RiteSequence"), rel: "cyclical", teaching: "Ritual",
    d: "Five stages inside a threshold, each feeding the object at the centre.",
    not: "Switching to a displaced object changes nothing about the sequence, which is the point." },
  { k: "Heka and Ma'at", C: drawing("HekaAndMaat"), rel: "spatial", teaching: "Ritual",
    d: "Efficacy and rightness as two axes rather than one.",
    not: "A rite may be wholly effective and wholly wrong. The axes are independent." },

  // ── persistence, memory, tradition ──────────────────────────────────────
  { k: "Persistence", C: drawing("Persistence"), rel: "spatial", teaching: "What persists",
    d: "Four kinds of persistence after a death, and where the evidence stops for each.",
    not: "The four are distinguished precisely so they are not argued for together." },
  { k: "Carriers", C: drawing("Carriers"), rel: "spatial", teaching: "Tradition",
    d: "Tradition as a redundant constellation: any carrier can be lost and the pattern stays triangulable.",
    not: "No single carrier contains the tradition, so no single loss ends it." },

  // ── celestial ───────────────────────────────────────────────────────────
  { k: "Zodiac Grid", C: drawing("ZodiacGrid"), rel: "spatial", teaching: "The celestial pattern",
    d: "The twelve as a complete four-by-three of element and modality.",
    not: "Not a list of twelve things. Every cell is one element in one phase." },
  { k: "One Layer of Seven", C: drawing("OneLayerOfSeven"), rel: "analogical", teaching: "The celestial pattern",
    d: "Celestial timing shown as one contributing layer among seven, not as the cause.",
    not: "A chart is a layer. It is not the reason." },
  { k: "Planetary Family", C: drawing("PlanetaryFamily"), rel: "analogical", teaching: "The celestial pattern",
    d: "One virtue recurring through unlike vessels.",
    not: "Only the three planets the doctrine develops in full carry chains; the rest are marked as such." },
  { k: "Lunar Clocks", C: drawing("LunarClocks"), rel: "cyclical", teaching: "The celestial pattern",
    d: "Sidereal and synodic months run against each other — 27.3 days against 29.5.",
    not: "Two clocks, not one clock with an error." },

  // ── elements and matter ─────────────────────────────────────────────────
  { k: "Elemental Pairs", C: drawing("ElementalPairs"), rel: "spatial", teaching: "The elements",
    d: "The six minglings as the six edges of a complete graph on four elements, the diagonals crossing at Ākāśa.",
    not: "Ākāśa is the interval in which the others meet, not a fifth element beside them." },
  { k: "Sub-Tattva Matrix", C: drawing("SubTattvaMatrix"), rel: "analogical", teaching: "The elements",
    d: "The twenty-five compounds as something to operate rather than read, with a transpose.",
    not: "Apas-Tejas and Tejas-Apas are not the same cell, which the swap is there to make felt." },
  { k: "Geometry Field", C: drawing("GeometryField"), rel: "symbolic", teaching: "The elements",
    d: "The Architecture's emblem: circles, triangles, a twelvefold ring.",
    not: "An emblem, not a diagram of anything in particular." },

  // ── the tree ────────────────────────────────────────────────────────────
  { k: "Tree of Life", C: drawing("TreeOfLife"), rel: "hierarchical", teaching: "The Tree",
    d: "The Tree and the ten cards sharing one selection, each reading the other.",
    not: "Height is emanative order, not altitude, and the paths are relations rather than routes." },

  // ── the counterfeits ────────────────────────────────────────────────────
  { k: "False Spiritualization", C: drawing("FalseSpiritualization"), rel: "analogical", teaching: "The counterfeits",
    d: "Six operations that imitate the work without doing it — each a near-miss, all failing the same way.",
    not: "Diagnostic, not condemnatory. The likeness is what makes them hard to see." },
  { k: "Five Architectures of Fear", C: drawing("FiveArchitecturesOfFear"), rel: "analogical", teaching: "The counterfeits",
    d: "One named emotion, five formative behaviours.",
    not: "Naming an emotion is often insufficient: two people reporting the same fear may be in different architectures." },
];

export const figure = (k: string) => FIGURES.find((f) => f.k.toLowerCase() === k.toLowerCase()) ?? null;
export const figureNames = () => FIGURES.map((f) => f.k);

/** Teachings drawn more than once — the alternative projections of XXI · 20. */
export function projections() {
  const by = new Map<string, Figure[]>();
  for (const f of FIGURES) if (f.teaching) (by.get(f.teaching) ?? by.set(f.teaching, []).get(f.teaching)!).push(f);
  return [...by.entries()].filter(([, fs]) => fs.length > 1).map(([teaching, fs]) => ({ teaching, figures: fs }));
}
