import { DIVISIONS, ENTRIES, entryById, facetValues, valueSlug, type Division, type PhosEntry } from "./entries";

/**
 * The instruments — views over the facets every entry already carries.
 *
 * Nothing here is a second index. Each tool reads the same ENTRIES the browse
 * pages read and asks a different question of them: which entries share a
 * symbol, which traditions meet on which subjects, what an entry's relations
 * lead to, and which entries belong to which station of the luminous anatomy.
 * A tool that needs more than the front matter provides is not ready to exist.
 */

/** Which of the seven planned instruments are live, and where. */
export const TOOL_ROUTES: Record<string, "/phos/tools/symbols" | "/phos/tools/traditions" | "/phos/tools/trace" | "/phos/tools/anatomy" | "/phos/tools/diagrams"> = {
  "Symbol Atlas": "/phos/tools/symbols",
  "Compare Traditions": "/phos/tools/traditions",
  "Trace a Concept": "/phos/tools/trace",
  "Luminous Anatomy": "/phos/tools/anatomy",
  "Diagram Library": "/phos/tools/diagrams",
};

/** Written entries grouped by the division they sit in, empty divisions dropped. */
export function groupByDivision(entries: PhosEntry[]): { d: Division; rows: PhosEntry[] }[] {
  return DIVISIONS.map((d) => ({ d, rows: entries.filter((e) => e.division.id === d.id) })).filter((x) => x.rows.length);
}

export const withFacet = (key: string, value: string) => ENTRIES.filter((e) => e.meta?.facets[key]?.includes(value));

// ------------------------------------------------------------------ symbols

/** One line each, in the encyclopaedia's own terms, for the symbol facet's
 *  vocabulary. The entries carrying a symbol say the rest. */
export const SYMBOL_MEANINGS: Record<string, string> = {
  Point: "The source before extension — light as origin, from which every ray and circle proceeds.",
  Ray: "Luminosity given a path: orientation from source to receiver.",
  Circle: "Completeness and return — a radiance that closes upon its own centre.",
  "Solar Disc": "Centred, generative sovereignty — the visible sign of the inner and the outer Sun.",
  Sphere: "Centred totality: every point of the surface in one relation to the centre.",
  Triangle: "Procession and mediation — three terms holding one relation.",
  Vesica: "The lens where two fields overlap — the place of passage between orders.",
  Spiral: "Return with difference — the same centre passed again at a new level.",
  Prism: "Multiplicity revealed within unity — one light articulated into colours.",
  Rainbow: "Differentiated unity — colour as the articulation of one current through mediation.",
  Eye: "Reception made sunlike — at once the organ and the act of revelation.",
  Lamp: "Kindled and tended light — consciousness sustained by a vessel.",
  Torch: "Light carried and handed on — the flame of teaching and initiation.",
  Flame: "Transformation — force liberated from form and consecrated to a higher order.",
  "Lightning Bolt": "Sudden, penetrating disclosure — revelation that exceeds preparation.",
  Crown: "Sovereignty received from above — the head kept open to a higher source.",
  Halo: "Luminosity concentrated around consciousness — presence intensified at a centre.",
  Mandorla: "The almond of glory — a being shown within the overlap of two worlds.",
  Star: "Distinct light within an ordered heaven — orientation, destiny, and ancestry.",
  "Winged Solar Disc": "Solar power in motion and under protection — sovereignty that travels.",
  "Solar Barque": "The Sun's passage through darkness and its return — the vessel of the night journey.",
  Lotus: "Form opening from dark water toward light — emergence and purity.",
  Menorah: "One flame in seven branches — unity articulated into ordered lights.",
  "Cross of Light": "Vertical meeting horizontal — descent and extension in one figure.",
  "Radiant Heart": "The centre that sends itself outward without leaving its source.",
  Mirror: "Reception and reflection — the surface that must know itself to reveal truly.",
  Crystal: "Condensed transparency — matter made optically articulate.",
  Gold: "Captured solar quality — radiance given durable, incorruptible embodiment.",
  "Black Sun": "The dark centre of radiance — the source beyond visibility, and the shadow the solar casts.",
  Cave: "Protected darkness — the chamber where forms gestate and light is interiorised.",
  Crypt: "The retentive depth — where the world inherits what has passed.",
  Temple: "Bounded, consecrated space — architecture ordered to receive presence.",
};

export const symbolValues = () => facetValues("symbol");

// --------------------------------------------------------------- traditions

/** Every tradition but the system's own, which nearly every entry carries and
 *  so compares with nothing. */
export const traditionValues = () =>
  facetValues("tradition").filter((v) => v.value !== "Architecture of Hidden Forces");

export const traditionBySlug = (slug: string) => traditionValues().find((v) => v.slug === slug) ?? null;

/** Entries carrying at least `min` of the given traditions. */
export function sharedBetween(traditions: string[], min = 2) {
  return ENTRIES.filter((e) => {
    const has = e.meta?.facets.tradition ?? [];
    return traditions.filter((t) => has.includes(t)).length >= min;
  });
}

// -------------------------------------------------------------------- trace

export type GraphNode = { e: PhosEntry; ring: 0 | 1 | 2; parent: string | null; angle: number };
export type Graph = { centre: PhosEntry; nodes: GraphNode[]; edges: [string, string][] };

/** The neighbourhood of an entry: its related entries as a first ring, and
 *  theirs as a second, each second-ring node kept near the parent it came
 *  through. Unwritten entries are kept — the outline names them, and a trace
 *  should show where it runs off the written map. */
export function graphAround(id: string, secondRingCap = 28): Graph | null {
  const centre = entryById(id);
  if (!centre) return null;
  const ring1 = (centre.meta?.related ?? []).map(entryById).filter((e): e is PhosEntry => !!e && e.id !== centre.id);
  const seen = new Set<string>([centre.id, ...ring1.map((e) => e.id)]);
  const nodes: GraphNode[] = [{ e: centre, ring: 0, parent: null, angle: 0 }];
  const edges: [string, string][] = [];
  const n1 = ring1.length || 1;
  ring1.forEach((e, i) => {
    const angle = (i / n1) * Math.PI * 2 - Math.PI / 2;
    nodes.push({ e, ring: 1, parent: centre.id, angle });
    edges.push([centre.id, e.id]);
  });
  // Second ring: budget spread across parents so one well-connected entry
  // cannot crowd the others out.
  const per = Math.max(1, Math.floor(secondRingCap / n1));
  ring1.forEach((p, i) => {
    const kids = (p.meta?.related ?? [])
      .map(entryById)
      .filter((e): e is PhosEntry => !!e && !seen.has(e.id))
      .slice(0, per);
    const base = (i / n1) * Math.PI * 2 - Math.PI / 2;
    const span = (Math.PI * 2) / n1;
    kids.forEach((k, j) => {
      seen.add(k.id);
      const t = kids.length === 1 ? 0.5 : (j + 0.5) / kids.length;
      nodes.push({ e: k, ring: 2, parent: p.id, angle: base - span / 2 + span * t });
      edges.push([p.id, k.id]);
    });
  });
  return { centre, nodes, edges };
}

/** Title search over the whole outline, written entries first. */
export function searchTitles(q: string, limit = 12): PhosEntry[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const hits = ENTRIES.filter((e) => e.title.toLowerCase().includes(needle));
  hits.sort((a, b) => Number(b.written) - Number(a.written) || a.title.localeCompare(b.title));
  return hits.slice(0, limit);
}

/** The concepts the outline named for this instrument, resolved to entries. */
export const TRACE_SEEDS = ["vii-6", "v-20", "ii-22", "x-8", "iii-4", "viii-23"]
  .map(entryById)
  .filter((e): e is PhosEntry => !!e);

// ------------------------------------------------------------------ anatomy

export type Station = {
  key: string;
  name: string;
  /** The line of the governing formula this station enacts. */
  line: string;
  /** What the station is, in the system's terms. */
  d: string;
  /** The plane facet values that place an entry here. */
  planes: string[];
};

/** Spirit, soul, astral field, etheric body, organism, and material
 *  environment — the order the instrument was specified to move through,
 *  read off the plane facet. An entry on two planes appears at two stations,
 *  as it should: a boundary is a place. */
export const STATIONS: Station[] = [
  {
    key: "spirit",
    name: "Spirit",
    line: "Spirit illuminates and animates. Essence determines.",
    d: "The fontal and noetic light, and the orders that mediate it downward — divine, superessential, noetic, angelic, daimonic, theurgic, archetypal.",
    planes: ["Divine", "Superessential", "Noetic", "Angelic", "Daimonic", "Theurgic", "Archetypal"],
  },
  {
    key: "soul",
    name: "Soul",
    line: "Soul mediates.",
    d: "The chamber of luminous mediation, where force becomes meaning — the psychic plane.",
    planes: ["Psychic"],
  },
  {
    key: "astral",
    name: "Astral field",
    line: "The astral body images and moves.",
    d: "The theatre of luminous images — desire, sensation, emotion, dream, and the imaginal.",
    planes: ["Astral", "Imaginal"],
  },
  {
    key: "etheric",
    name: "Etheric body",
    line: "The etheric body vitalises and organises.",
    d: "The real vital-formative dimension of the organism — the etheric and vital planes.",
    planes: ["Etheric", "Vital"],
  },
  {
    key: "organism",
    name: "Organism",
    line: "The physical body embodies.",
    d: "Anatomy, physiology, and the measurable interaction of light with living matter — the physical plane.",
    planes: ["Physical"],
  },
  {
    key: "environment",
    name: "Material environment",
    line: "Morphaithēr retains and relates.",
    d: "The living formative atmosphere and the elements through which force becomes embodied behaviour — the formative and elemental planes.",
    planes: ["Formative", "Elemental"],
  },
];

export const stationByKey = (key: string) => STATIONS.find((s) => s.key === key) ?? null;
export const stationEntries = (s: Station) =>
  ENTRIES.filter((e) => (e.meta?.facets.plane ?? []).some((p) => s.planes.includes(p)));

export { valueSlug };
