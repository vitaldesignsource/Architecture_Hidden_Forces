import { createFileRoute } from "@tanstack/react-router";
import { RevealText } from "@/components/RevealText";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Architecture of Hidden Forces" },
      {
        name: "description",
        content:
          "A complete metaphysics of Source, Spirit, Essence, Virtue, Ether, Force, Pattern, Element, Form, Signature, Symbol, and Transformation — how invisible activity becomes visible order.",
      },
      { property: "og:title", content: "The Architecture of Hidden Forces" },
      {
        property: "og:description",
        content:
          "Form is frozen force. Force is liberated form. A metaphysical system tracing the descent of hidden powers into manifest form and the return of form to essence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Principle = {
  num: string;
  greek: string;
  latin: string;
  english: string;
  summary: string;
};

const descent: Principle[] = [
  { num: "I", greek: "Ἀρχή", latin: "Archē · To Hen", english: "Source", summary: "The unconditioned origin. Prior to distinction, polarity, motion, and form — the fountain (pēgē) from which being, spirit, and possibility descend." },
  { num: "II", greek: "Πνεῦμα", latin: "Pneuma", english: "Spirit", summary: "The animating current proceeding from Source. Not identity but life — the invisible breath by which the field of manifestation is awakened." },
  { num: "III", greek: "Οὐσία", latin: "Ousia", english: "Essence", summary: "The inward whatness (to ti estin) of a thing. Its physis — the determining nature and metaphysical seed by which it becomes itself and not another." },
  { num: "IV", greek: "Δύναμις", latin: "Dynamis", english: "Virtue", summary: "The inherent potency of essence — the hidden power by which a thing acts according to its nature. The bridge from essence toward force." },
  { num: "V", greek: "Αἰθήρ", latin: "Aithēr · Pempton Stoicheion", english: "Akasha Prime", summary: "The quintessence — the primordial subtle field, the womb of becoming in which differentiated forces may first arise." },
  { num: "VI", greek: "Αἰθήρ", latin: "Aithēr (Formative)", english: "Ether", summary: "The subtle formative medium — warmth, light, tone, and life — through which hidden virtue becomes transmissible toward force." },
  { num: "VII", greek: "Ῥυθμός", latin: "Rhythmos · Kyma", english: "Etheric Tide", summary: "The rhythmic breathing of the etheric field — waxing and waning, ascent and descent, the timing by which forces open and withdraw." },
  { num: "VIII", greek: "Ποιότης", latin: "Tattva", english: "Vibratory Mode", summary: "The quality (poiotēs) of etheric movement — Akasha, Vayu, Tejas, Apas, Prithivi — by which motion leans toward elemental embodiment." },
  { num: "IX", greek: "Ἐνέργεια", latin: "Energeia · Kinēsis", english: "Force", summary: "Virtue at work. Dynamis entering activity — the moment hidden potency becomes operative and begins to press, radiate, attract, and organize." },
  { num: "X", greek: "Λόγος", latin: "Logos · Eidos", english: "Pattern", summary: "The ordering principle — ratio, number, harmonia, sacred geometry — by which force receives coherence and becomes intelligible." },
  { num: "XI", greek: "Στοιχεῖον", latin: "Stoicheion", english: "Element", summary: "The embodied condition — Pyr, Aēr, Hydōr, Gē — the elemental letters through which patterned force becomes sensible nature." },
  { num: "XII", greek: "Ὕλη", latin: "Hylē", english: "Matter", summary: "Receptive density — not dead substance but spirit under the discipline of form. The form-bearing capacity by which force becomes durable." },
  { num: "XIII", greek: "Μορφή", latin: "Morphē · Eidos", english: "Form", summary: "The visible stabilization of force — pattern embodied through element, received into matter, and held in recognizable configuration. Force brought to rest." },
];

const ret: Principle[] = [
  { num: "XIV", greek: "Ἴχνος", latin: "Ichnos", english: "Trace", summary: "The footprint of formation. The first readable residue by which the hidden may be inferred from the visible — a force has passed here." },
  { num: "XV", greek: "Χαρακτήρ", latin: "Charaktēr · Sphragis", english: "Signature", summary: "The engraved seal — trace recognized as meaningful. The outer writing of inward virtue: gesture, geometry, color, habit made readable." },
  { num: "XVI", greek: "Σύμβολον", latin: "Symbolon", english: "Symbol", summary: "The gathering token — signature awakened in consciousness. Not a sign that points, but a vessel that participates in what it means." },
  { num: "XVII", greek: "Συμπάθεια", latin: "Sympatheia · Analogia", english: "Correspondence", summary: "The secret kinship of forms across levels — planet with metal, plant with organ, ritual with world — organized by hidden proportion." },
  { num: "XVIII", greek: "Μεταμόρφωσις", latin: "Metamorphōsis · Metastoicheiōsis", english: "Transformation", summary: "Lawful reordering. Form loosened, force released, essence purified, pattern renewed. Solve et coagula — the return of form to force and its rebirth as higher form." },
];

const all = [...descent, ...ret];

function GeometryField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.18]"
        width="1400"
        height="1400"
        viewBox="-700 -700 1400 1400"
        aria-hidden
      >
        <defs>
          <radialGradient id="goldFade" cx="0" cy="0" r="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="oklch(0.78 0.13 75)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="680" fill="none" stroke="url(#goldFade)" strokeWidth="0.5" />
        <circle r="520" fill="none" stroke="oklch(0.78 0.13 75 / 0.3)" strokeWidth="0.5" />
        <circle r="360" fill="none" stroke="oklch(0.78 0.13 75 / 0.35)" strokeWidth="0.5" />
        <circle r="200" fill="none" stroke="oklch(0.78 0.13 75 / 0.4)" strokeWidth="0.5" />
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 18;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 200}
              y1={Math.sin(a) * 200}
              x2={Math.cos(a) * 680}
              y2={Math.sin(a) * 680}
              stroke="oklch(0.78 0.13 75 / 0.25)"
              strokeWidth="0.4"
            />
          );
        })}
      </svg>

      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin-reverse opacity-[0.22]"
        width="900"
        height="900"
        viewBox="-450 -450 900 900"
        aria-hidden
      >
        <polygon points="0,-260 225,130 -225,130" fill="none" stroke="oklch(0.78 0.13 75 / 0.45)" strokeWidth="0.6" />
        <polygon points="0,260 -225,-130 225,-130" fill="none" stroke="oklch(0.78 0.13 75 / 0.45)" strokeWidth="0.6" />
        <circle r="260" fill="none" stroke="oklch(0.78 0.13 75 / 0.3)" strokeWidth="0.4" />
        <circle r="130" fill="none" stroke="oklch(0.78 0.13 75 / 0.35)" strokeWidth="0.4" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a1 = (i * Math.PI * 2) / 12;
          const a2 = ((i + 1) * Math.PI * 2) / 12;
          return (
            <line
              key={i}
              x1={Math.cos(a1) * 380}
              y1={Math.sin(a1) * 380}
              x2={Math.cos(a2) * 380}
              y2={Math.sin(a2) * 380}
              stroke="oklch(0.78 0.13 75 / 0.4)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      <svg
        className="absolute -right-32 -top-32 animate-drift opacity-[0.12] sm:opacity-[0.18]"
        width="500"
        height="500"
        viewBox="-250 -250 500 500"
        aria-hidden
      >
        <circle r="240" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        <circle r="180" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        <polygon points="0,-200 190,62 117,162 -117,162 -190,62" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      </svg>

      <svg
        className="absolute -bottom-40 -left-40 animate-drift opacity-[0.1] sm:opacity-[0.16]"
        width="600"
        height="600"
        viewBox="-300 -300 600 600"
        style={{ animationDelay: "-9s" }}
        aria-hidden
      >
        <circle r="280" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 7 - Math.PI / 2;
          return (
            <circle
              key={i}
              cx={Math.cos(a) * 140}
              cy={Math.sin(a) * 140}
              r="140"
              fill="none"
              stroke="oklch(0.78 0.13 75 / 0.5)"
              strokeWidth="0.4"
            />
          );
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}

function SectionGlyph({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.06]"
      width="800"
      height="800"
      viewBox="-400 -400 800 800"
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <circle r="380" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <circle r="260" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <polygon points="0,-340 295,170 -295,170" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
      <polygon points="0,340 -295,-170 295,-170" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
    </svg>
  );
}

function PrincipleCard({ p, accent }: { p: Principle; accent: "descent" | "return" }) {
  return (
    <article className="group relative overflow-hidden border border-border bg-void/40 p-8 backdrop-blur-sm transition-colors hover:bg-clay/40 sm:p-10">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
          {p.num} · {accent === "descent" ? "Descent" : "Return"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {p.english}
        </span>
      </div>
      <h3 className="font-serif text-4xl leading-none text-bone sm:text-5xl">{p.greek}</h3>
      <p className="mt-2 font-serif text-lg italic text-gold/80">{p.latin}</p>
      <div className="my-6 h-px w-12 bg-gold/40 transition-all duration-700 group-hover:w-24" />
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{p.summary}</p>
    </article>
  );
}




function TreeOfLife() {
  // Portrait canvas, 300 × 660. Pillar of Mercy on the right AS DEPICTED.
  const MID = 150;
  const RIGHT = 248; // Pillar of Mercy    — Chochmah · Chesed · Netzach
  const LEFT = 52; //  Pillar of Severity  — Binah · Gevurah · Hod
  const R_NODE = 20;
  const R_HALO = 34;

  // Flash-arrival time per sefirah, in seconds. Derived from cumulative arc length
  // along the flash polyline (total 1401.36u) inverted through the animation's own
  // cubic-bezier(0.65,0,0.35,1), scaled to the 8.8s draw (the 55% keyframe).
  // Previously these were index-linear (0.5 + i*0.85), which made six of ten vessels
  // ignite BEFORE the light reached them — up to 1.21s early at Binah.
  const IGNITE_AT = [0.0, 2.42, 3.41, 4.06, 4.5, 4.78, 5.11, 5.86, 6.71, 8.8];

  // Must match the stacks Tailwind emits for font-serif/font-mono, or the tree's
  // Hebrew resolves to a different face than the byte-identical Hebrew in the
  // cards beside it. (var(--font-serif) does NOT work here: @theme inline inlines
  // into utility classes and never emits the custom property, so it silently
  // falls back to the inherited sans stack.)
  const SERIF = '"EB Garamond", ui-serif, Georgia, serif';
  const MONO =
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

  type Sefirah = {
    id: string;
    rn: string;
    he: string;
    tr: string;
    en: string;
    x: number;
    y: number;
  };

  const nodes: Sefirah[] = [
    { id: "1", rn: "I", he: "כֶּתֶר", tr: "KETER", en: "Crown", x: MID, y: 68 },
    { id: "2", rn: "II", he: "חָכְמָה", tr: "CHOCHMAH", en: "Wisdom", x: RIGHT, y: 148 },
    { id: "3", rn: "III", he: "בִּינָה", tr: "BINAH", en: "Understanding", x: LEFT, y: 148 },
    { id: "4", rn: "IV", he: "חֶסֶד", tr: "CHESED", en: "Mercy", x: RIGHT, y: 262 },
    { id: "5", rn: "V", he: "גְּבוּרָה", tr: "GEVURAH", en: "Severity", x: LEFT, y: 262 },
    { id: "6", rn: "VI", he: "תִּפְאֶרֶת", tr: "TIFERET", en: "Beauty", x: MID, y: 336 },
    { id: "7", rn: "VII", he: "נֶצַח", tr: "NETZACH", en: "Victory", x: RIGHT, y: 416 },
    { id: "8", rn: "VIII", he: "הוֹד", tr: "HOD", en: "Glory", x: LEFT, y: 416 },
    { id: "9", rn: "IX", he: "יְסוֹד", tr: "YESOD", en: "Foundation", x: MID, y: 490 },
    { id: "10", rn: "X", he: "מַלְכוּת", tr: "MALCHUT", en: "Kingdom", x: MID, y: 578 },
  ];

  // The 22 paths of the traditional (Kircher) Tree — Aleph through Tav.
  const paths: [string, string][] = [
    ["1", "2"], ["1", "3"], ["1", "6"], ["2", "3"], ["2", "4"], ["2", "6"],
    ["3", "5"], ["3", "6"], ["4", "5"], ["4", "6"], ["4", "7"], ["5", "6"],
    ["5", "8"], ["6", "7"], ["6", "8"], ["6", "9"], ["7", "8"], ["7", "9"],
    ["7", "10"], ["8", "9"], ["8", "10"], ["9", "10"],
  ];

  const find = (id: string) => nodes.find((n) => n.id === id)!;
  // Da'at sits in the Abyss on the middle pillar. y=182, not the geometric
  // midpoint 205: the flash's Binah->Chesed segment crosses x=150 at y=205, so
  // at 205 a 5px animated glow bisected the ring (clearance 0.86u). Perpendicular
  // clearance needs > 18.5u (r16 + half the 5px glow); y=182 gives 19.88u.
  const daat = { x: MID, y: 182 };

  // The lightning flash — the order of emanation, Keter down to Malchut.
  const flash = nodes.map((n) => `${n.x},${n.y}`).join(" ");

  // Three veils of negative existence, arcing above the Crown.
  const veil = (r: number) => {
    const k = find("1");
    const dx = r * Math.cos(Math.PI / 12);
    const dy = r * Math.sin(Math.PI / 12);
    return `M ${(k.x - dx).toFixed(2)} ${(k.y - dy).toFixed(2)} A ${r} ${r} 0 0 1 ${(k.x + dx).toFixed(2)} ${(k.y - dy).toFixed(2)}`;
  };

  const css = `
.aolt-svg text { paint-order: stroke; stroke-linejoin: round; }
@keyframes aolt-descend {
  0%   { stroke-dashoffset: 1000; opacity: 0; }
  5%   { opacity: 1; }
  55%  { stroke-dashoffset: 0; opacity: 1; }
  82%  { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes aolt-ignite {
  0%   { opacity: 0; }
  4%   { opacity: 1; }
  22%  { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes aolt-pulse {
  0%, 100% { stroke-opacity: 0.20; }
  50%      { stroke-opacity: 0.52; }
}
.aolt-descent { animation: aolt-descend 16s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
.aolt-path    { animation: aolt-pulse 16s ease-in-out infinite; }
.aolt-ignite  { animation: aolt-ignite 16s ease-in-out infinite; }
.aolt-node    { transition: opacity 700ms ease; }
@media (hover: hover) and (pointer: fine) {
  .aolt-svg:hover .aolt-node { opacity: 0.45; }
  .aolt-svg .aolt-node:hover { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .aolt-svg .aolt-descent { animation: none; stroke-dashoffset: 0; opacity: 0.55; }
  .aolt-svg .aolt-path { animation: none; stroke-opacity: 0.32; }
  .aolt-svg .aolt-ignite { animation: none; opacity: 0; }
  .aolt-svg .animate-breathe { animation: none; opacity: 0.5; }
  .aolt-svg .aolt-node { transition: none; }
}
`;

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <style>{css}</style>
      <svg
        viewBox="0 0 300 660"
        className="aolt-svg h-auto w-full"
        role="img"
        aria-labelledby="aolt-title aolt-desc"
      >
        <title id="aolt-title">עֵץ הַחַיִּים — the Kabbalistic Tree of Life</title>
        <desc id="aolt-desc">
          The Kabbalistic Tree of Life. Ten sefirot on three pillars, joined by the
          twenty-two paths. The Pillar of Severity on the left carries Binah
          (Understanding), Gevurah (Severity) and Hod (Glory). The Pillar of Mercy on the
          right carries Chochmah (Wisdom), Chesed (Mercy) and Netzach (Victory). The middle
          Pillar of Equilibrium carries Keter (Crown), Tiferet (Beauty), Yesod (Foundation)
          and Malchut (Kingdom). Above the Crown, three arcs figure the veils of negative
          existence — Ain, Ain Soph, Ain Soph Aur. A dashed horizontal marks the Abyss,
          which separates the supernal triad from the seven below it. On the middle pillar
          within the Abyss, Da&apos;at (Knowledge) is drawn hollow and unconnected by any
          path, because it is not a sefirah. The lightning flash traces the order of
          emanation from Keter down to Malchut, and each vessel kindles as the light
          reaches it.
        </desc>

        <defs>
          <radialGradient id="aolt-halo">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.30" />
            <stop offset="45%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.10" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aolt-core" cx="50%" cy="36%" r="72%">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.14" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aolt-crown">
            <stop offset="0%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.16" />
            <stop offset="60%" style={{ stopColor: "var(--gold)" }} stopOpacity="0.04" />
            <stop offset="100%" style={{ stopColor: "var(--gold)" }} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="aolt-flash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--bone)" }} />
            <stop offset="30%" style={{ stopColor: "var(--gold)" }} />
            <stop offset="100%" style={{ stopColor: "var(--gold-dim)" }} />
          </linearGradient>
        </defs>

        {/* The light beyond the veils. cy must be >= ry or the falloff is cut by the
            top of the viewBox, leaving a hard horizontal edge on flat black.
            (Ein Sof itself is named among the three veils below, not here.) */}
        <ellipse cx={MID} cy="54" rx="96" ry="54" fill="url(#aolt-crown)" />

        {/* Three veils of negative existence */}
        {/* Ain, Ain Soph, Ain Soph Aur — graded outward, the outer more hidden.
            0.9 not 0.5: at 340px, 0.5u = 0.57 CSS px and antialiasing halves it. */}
        <g fill="none" stroke="var(--gold)" strokeWidth="0.9" strokeLinecap="round">
          {[42, 52, 62].map((r, i) => (
            <path
              key={r}
              d={veil(r)}
              strokeOpacity={[0.62, 0.44, 0.28][i]}
              strokeDasharray={i === 0 ? undefined : "3 5"}
              className="animate-breathe"
              style={{ animationDelay: `-${i * 2.6}s` }}
            />
          ))}
        </g>

        {/* The Abyss */}
        <line
          x1="18"
          y1={daat.y}
          x2="282"
          y2={daat.y}
          stroke="var(--gold-dim)"
          strokeOpacity="0.45"
          strokeWidth="0.9"
          strokeDasharray="2 5"
        />

        {/* The twenty-two paths */}
        <g>
          {paths.map(([a, b], i) => {
            const A = find(a);
            const B = find(b);
            return (
              <g key={`aolt-p-${i}`}>
                <line
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="var(--gold)"
                  strokeOpacity="0.05"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <line
                  className="aolt-path"
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="var(--gold-dim)"
                  strokeWidth="0.7"
                  strokeOpacity="0.26"
                  style={{ animationDelay: `${(i * 0.6 - 12.6).toFixed(2)}s` }}
                />
              </g>
            );
          })}
        </g>

        {/* Lightning flash of descent */}
        <g fill="none" strokeLinejoin="round" strokeLinecap="round">
          <polyline points={flash} stroke="var(--gold-dim)" strokeOpacity="0.2" strokeWidth="0.8" />
          <polyline
            className="aolt-descent"
            points={flash}
            pathLength={1000}
            strokeDasharray="1000"
            stroke="var(--gold)"
            strokeOpacity="0.16"
            strokeWidth="5"
            opacity="0"
          />
          <polyline
            className="aolt-descent"
            points={flash}
            pathLength={1000}
            strokeDasharray="1000"
            stroke="url(#aolt-flash)"
            strokeOpacity="0.85"
            strokeWidth="1.4"
            opacity="0"
          />
        </g>

        {/* Da'at — knowledge; shown hollow, not a sefirah */}
        <g>
          <title>Da&apos;at · Knowledge — not a sefirah</title>
          <circle
            cx={daat.x}
            cy={daat.y}
            r="16"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeOpacity="0.5"
            strokeWidth="0.6"
            strokeDasharray="2 4"
          />
          <text
            x={daat.x}
            y={daat.y + 31}
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize="10.5"
            fill="var(--muted-foreground)"
            stroke="var(--void)"
            strokeWidth="2"
          >
            דַּעַת
          </text>
          <text
            x={daat.x}
            y={daat.y + 45}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="8"
            letterSpacing="1.3"
            fill="var(--muted-foreground)"
            fillOpacity="0.75"
            stroke="var(--void)"
            strokeWidth="1.8"
          >
            DA&apos;AT
          </text>
        </g>

        {/* The ten sefirot */}
        {nodes.map((n, i) => {
          const ignite = `${IGNITE_AT[i]}s`;
          return (
            <g className="aolt-node" key={n.id}>
              <title>{`${n.rn} · ${n.tr} · ${n.en}`}</title>
              <circle
                cx={n.x}
                cy={n.y}
                r={R_HALO}
                fill="url(#aolt-halo)"
                className="animate-breathe"
                style={{ animationDelay: `-${(i * 0.9).toFixed(2)}s` }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_HALO}
                fill="url(#aolt-halo)"
                className="aolt-ignite"
                opacity="0"
                style={{ animationDelay: ignite }}
              />
              <circle cx={n.x} cy={n.y} r={R_NODE} fill="var(--void)" />
              <circle cx={n.x} cy={n.y} r={R_NODE} fill="url(#aolt-core)" />
              {n.id === "10" && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={R_NODE + 5.5}
                  fill="none"
                  stroke="var(--gold)"
                  strokeOpacity="0.22"
                  strokeWidth="0.5"
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE}
                fill="none"
                stroke="var(--gold)"
                strokeOpacity="0.62"
                strokeWidth="0.9"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE - 5.5}
                fill="none"
                stroke="var(--gold-dim)"
                strokeOpacity="0.3"
                strokeWidth="0.5"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={R_NODE}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.4"
                className="aolt-ignite"
                opacity="0"
                style={{ animationDelay: ignite }}
              />
              <text
                x={n.x}
                y={n.y + 3}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="9.5"
                letterSpacing="0.6"
                fill="var(--gold-dim)"
              >
                {n.rn}
              </text>
              <text
                x={n.x}
                y={n.y + 32}
                textAnchor="middle"
                fontFamily={SERIF}
                fontSize="12"
                fill="var(--gold)"
                fillOpacity="0.95"
                stroke="var(--void)"
                strokeWidth="2.2"
              >
                {n.he}
              </text>
              <text
                x={n.x}
                y={n.y + 47}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="9"
                letterSpacing="1.3"
                fill="var(--muted-foreground)"
                stroke="var(--void)"
                strokeWidth="2"
              >
                {n.tr}
              </text>
            </g>
          );
        })}

        {/* The three pillars */}
        <g
          fontFamily={MONO}
          fontSize="9"
          letterSpacing="1.4"
          textAnchor="middle"
          fill="var(--gold-dim)"
          fillOpacity="0.75"
        >
          <text x={LEFT} y="644">SEVERITY</text>
          <text x={MID} y="644">EQUILIBRIUM</text>
          <text x={RIGHT} y="644">MERCY</text>
        </g>
      </svg>
    </div>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-bone">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-void/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:flex sm:justify-between">
          <a href="#top" className="min-w-0">
            <div className="truncate font-serif text-base italic tracking-wide sm:text-lg">
              The Architecture of Hidden Forces
            </div>
          </a>
          <div className="hidden shrink-0 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] lg:flex xl:gap-6 xl:tracking-[0.25em]">
            {[
              { id: "terms", label: "Terms" },
              { id: "spine", label: "Spine" },
              { id: "descent", label: "Descent" },
              { id: "fourfold", label: "Ethers" },
              { id: "morphaither", label: "Morphaithēr" },
              { id: "return", label: "Return" },
              { id: "kabbalah", label: "Kabbalah" },
              { id: "extended", label: "Powers" },
              { id: "triad", label: "Triad" },
              { id: "laws", label: "Laws" },
              { id: "astrology", label: "Sky" },
              { id: "formula", label: "Formula" },
            ].map((l) => (
              <a key={l.id} href={`#${l.id}`} className="transition-colors hover:text-gold">
                {l.label}
              </a>
            ))}
          </div>
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim lg:hidden">
            XVIII
          </div>
        </div>

        {/* Below lg the full bar cannot fit, and a 37,000px treatise is unusable
            without navigation. A scrollable strip keeps every section reachable
            without forcing the page itself to scroll horizontally. */}
        <div className="border-t border-border/50 lg:hidden">
          <div className="aoh-navstrip mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 pb-3 pt-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            {[
              { id: "terms", label: "Terms" },
              { id: "spine", label: "Spine" },
              { id: "descent", label: "Descent" },
              { id: "fourfold", label: "Ethers" },
              { id: "morphaither", label: "Morphaithēr" },
              { id: "return", label: "Return" },
              { id: "kabbalah", label: "Kabbalah" },
              { id: "extended", label: "Powers" },
              { id: "flywheel", label: "Flywheel" },
              { id: "triad", label: "Triad" },
              { id: "retentive", label: "Crypt" },
              { id: "laws", label: "Laws" },
              { id: "astrology", label: "Sky" },
              { id: "subtattva", label: "Compounds" },
              { id: "dao", label: "Dao" },
              { id: "books", label: "Books" },
              { id: "grounds", label: "Grounds" },
              { id: "formula", label: "Formula" },
            ].map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="whitespace-nowrap py-1 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative isolate overflow-hidden pb-32 pt-40 sm:pb-48 sm:pt-56">
        <GeometryField />
        <div className="grain" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="animate-rise text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              A Treatise on Metaphysics · MMXXVI
            </p>
            <h1 className="mx-auto mt-10 max-w-5xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl md:text-8xl">
              <RevealText text="The Architecture of" />
              <span className="mt-2 block italic">
                <RevealText text="Hidden Forces" startDelay={0.9} perChar={0.055} shimmer />
              </span>
              <span className="mx-auto mt-6 block h-px w-24 origin-left bg-gold/70 title-underline" />
            </h1>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A complete metaphysics with Greek philosophical correspondences — the architecture
              by which hidden forces become visible forms, and by which visible forms reveal
              hidden forces.
            </p>

            <div className="mx-auto mt-16 h-px w-16 bg-gold/50" />

            <blockquote className="mx-auto mt-16 max-w-3xl font-serif text-xl italic leading-relaxed text-bone/85 sm:text-2xl md:text-3xl">
              “Every visible thing is the stabilization of an invisible activity. Every form is
              the visible arresting of force into pattern. The world is not a collection of
              objects — it is a kosmos, an ordered beauty, an architecture of hidden forces.”
            </blockquote>
          </div>

          {/* Greek chain */}
          <div className="relative mt-32">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-gold-dim">
              Σειρά · The Chain of Manifestation
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-6">
              {all.map((p, i) => (
                <div key={p.latin} className="flex items-center gap-3 sm:gap-5">
                  <span
                    className="font-serif text-xl text-bone/85 transition-colors hover:text-gold sm:text-2xl"
                    title={`${p.latin} — ${p.english}`}
                  >
                    {p.greek}
                  </span>
                  {i < all.length - 1 && (
                    <span className="font-mono text-xs text-gold/40">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* OPENING DOCTRINE */}
      <section id="doctrine" className="relative border-t border-border py-32">
        <SectionGlyph />
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_2fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              § 00 · Central Doctrine
            </p>
            <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">
              Form is dynamis held in morphē
            </h2>
          </aside>
          <div className="space-y-8 font-serif text-lg leading-relaxed text-bone/80 sm:text-xl">
            <p>
              Reality is not divided into dead matter and abstract spirit. It is a
              <em className="text-gold"> continuum of manifestation</em>: the invisible becomes
              visible through ordered degrees, and the visible can be read back toward the
              invisible through trace, signature, symbol, correspondence, and transformation.
            </p>
            <p>
              Every body, symbol, organism, gesture, landscape, ritual, and event is a
              <em className="text-gold"> seal of a hidden operation</em>. Nothing appears as mere
              surface. Every form is the visible arresting of force into pattern.
            </p>
            <p className="border-l border-gold/40 pl-6 italic text-bone/90">
              Ousia bears Dynamis. Dynamis becomes Energeia. Energeia receives Logos. Logos
              descends through Stoicheion. Stoicheion enters Hylē. Hylē receives Morphē. Morphē
              leaves Ichnos. Ichnos reveals Charaktēr. Charaktēr flowers as Symbolon. Symbolon
              opens Sympatheia. Sympatheia makes Metamorphōsis possible.
            </p>
          </div>
        </div>
      </section>

      {/* THE FIVE TERMS */}
      <section id="terms" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § 00·i · The Five Terms
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                What the words <span className="italic text-gold">mean</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                The architecture uses five terms with precision. They are not synonyms, and they
                do not name five substances. They name five aspects of one formative event.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { greek: "ὕλη", latin: "Hylē", english: "Matter", summary: "The current material content — what is presently held." },
                { greek: "Μορφή", latin: "Morphē", english: "Form", summary: "The organization of that content — the arrangement, not the stuff." },
                { greek: "Ἐνέργεια", latin: "Energeia", english: "Force", summary: "The activity maintaining the organization — form held open against dissolution." },
                { greek: "Πεδίον", latin: "Pedion", english: "Field", summary: "The conditions permitting that activity — what must already be true for the form to occur." },
                { greek: "Κέντρον", latin: "Kentron", english: "Center", summary: "The principle preserving coherence through change — what remains itself while its matter is exchanged." },
              ].map((t) => (
                <div
                  key={t.english}
                  className="grid gap-2 border-b border-border pb-6 sm:grid-cols-[1fr_1fr_1fr] sm:gap-6"
                >
                  <div className="font-serif text-xl text-gold">{t.greek}</div>
                  <div className="font-serif italic text-bone/85">{t.latin}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    {t.english}
                  </div>
                  <p className="col-span-full text-sm leading-relaxed text-muted-foreground">
                    {t.summary}
                  </p>
                </div>
              ))}
              <p className="pt-2 text-sm leading-relaxed text-bone/80">
                A whirlpool is the instance. Its water is <span className="text-gold-dim">matter</span>;
                its shape is <span className="text-gold-dim">form</span>; the current is{" "}
                <span className="text-gold-dim">force</span>; the river is{" "}
                <span className="text-gold-dim">field</span>; and whatever keeps it one whirlpool
                while every drop passes through is its <span className="text-gold-dim">center</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE SPINE */}
      <section id="spine" className="relative border-t border-border py-32">
        <SectionGlyph delay={-25} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § 00·ii · The Doctrinal Spine
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Eighteen <span className="italic text-gold">commitments</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            What follows is not a summary of the system but its load-bearing structure — the
            claims everything else depends upon. Reality is composed not primarily of isolated
            things, but of processes, relations, constraints, and recurring organizations that
            temporarily appear as things.
          </p>

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {[
              { n: "I", t: "Field Precedes Form", d: "No formed thing begins entirely within itself. Every body, thought, symbol, and event is a stabilized intersection of prior conditions." },
              { n: "II", t: "Root Ether Is the First Medium", d: "Not merely another subtle substance, but the undifferentiated medium making relation, transmission, and differentiation possible. Not the Absolute — the first manifest field beneath formed existence." },
              { n: "III", t: "Quality Precedes Substance", d: "Formative qualities operate before something becomes fire, water, thought, or body. The tattvas are morphogenic biases — tendencies toward expansion, cohesion, ignition, stabilization, openness." },
              { n: "IV", t: "The Ethers Are Modes of One Field", d: "Not four separate substances but differentiated operations of Root Ether — the Fourfold Veil through which invisible force approaches embodiment." },
              { n: "V", t: "The Morphaithēr Is a Living Atmosphere", d: "Etheric currents, tattvic qualities, elemental tendencies, psychic impressions, and inherited patterns produce a formative atmosphere — less a thing than a changing ecology of influence." },
              { n: "VI", t: "Force Becomes Form Through Measure", d: "Force alone creates nothing enduring. It must be limited, proportioned, polarized, and contained. Number does not merely describe a finished world; it participates in making coherent worlds possible." },
              { n: "VII", t: "Matter Is Stabilized Activity", d: "Not dead substance opposed to spirit, but activity brought into relative stability. A material object is closer to a persistent event than to a motionless thing." },
              { n: "VIII", t: "Causation Includes Resonance", d: "Things affect one another through proximity, shared pattern, resonance, correspondence, and participation in a common field. Genuine correspondence requires an operative relationship, not visual similarity." },
              { n: "IX", t: "The World Inherits Itself", d: "Completed forms vanish as visible unities, but their passage alters the conditions from which later forms arise. The Crypt of Primordial Memory names this ontological inheritance." },
              { n: "X", t: "Forms Die, Formation Continues", d: "Nature preserves no vessel forever, yet begins from nothing. The Ossuary of Living Forms: death is dissolution of a particular vessel, not erasure of what passed through it." },
              { n: "XI", t: "Consciousness Is Participatory", d: "Attention, imagination, desire, and repeated action help organize the atmosphere a person inhabits — yet consciousness participates alongside bodily, historical, and transpersonal forces. Neither spectator nor sovereign." },
              { n: "XII", t: "Repetition Generates Momentum", d: "Coherent repetition produces momentum; momentum alters perception; altered behavior reinforces the pattern. This is the Psychic Flywheel." },
              { n: "XIII", t: "Alchemy Is the Grammar of Transformation", d: "Sulfur initiates, Mercury circulates and joins, Salt embodies and limits. Three recurrent necessities of transformation — not three occult chemicals." },
              { n: "XIV", t: "Dissolution and Reconstitution", d: "The old configuration must be loosened, its forces understood, its viable contents recombined around a more coherent center. Solve without coagula disperses; coagula without solve imprisons." },
              { n: "XV", t: "Coherence Exceeds Intensity", d: "A weaker force organized around a stable center accomplishes more than a stronger force internally divided. Contradiction produces friction and dissipation. But coherence alone is not goodness — a tumor is organized, an obsession is coherent. See § XVI: integral coherence preserves its relations with the greater systems it belongs to; parasitic coherence survives by consuming its host." },
              { n: "XVI", t: "Theurgy Is Alignment, Not Domination", d: "The highest operation is not forcing the cosmos to obey an isolated personality, but reorganizing the person into a vessel able to participate in a greater order." },
              { n: "XVII", t: "Symbols Are Maps of Functions", d: "Kabbalah, tattva doctrine, alchemy, and geometry describe reality from different angles. They integrate where their functions genuinely correspond — complementary instruments, not interchangeable labels." },
              { n: "XVIII", t: "The Ground Is Not One of Its Terms", d: "A ground never appears as a member of the series it grounds. To count it among them is to make the undifferentiated already differentiated, and the category collapses. Root Ether is not a fifth ether; Akasha is not a fifth zodiacal element; the Dao is not Root Ether. One guard, wherever a source would otherwise be flattened into an item of what it sources." },
            ].map((k) => (
              <div
                key={k.n}
                className="group border border-border p-5 transition-colors hover:border-gold/40"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-serif text-lg italic text-bone">{k.t}</div>
                  <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {k.n}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{k.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Reduced to one proposition
            </p>
            <p className="mt-5 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone sm:text-3xl">
              Reality is a living field of formative relations in which qualities become forces,
              forces become patterns, patterns become forms, forms become vessels of experience,
              and their dissolution returns altered possibilities to the field from which future
              forms arise.
            </p>
          </div>
        </div>
      </section>

      {/* DESCENT */}
      <section id="descent" className="relative border-t border-border py-32">
        <SectionGlyph delay={-30} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                Πρόοδος · The First Movement
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The Descent <span className="italic text-gold">into Form</span>
              </h2>
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              XIII Principles
            </div>
          </div>

          <p className="mb-16 max-w-2xl font-serif text-lg italic leading-relaxed text-muted-foreground">
            Source gives being. Spirit gives life. Essence gives nature. Virtue gives potency.
            Akasha Prime opens the field of possibility. Ether carries. Tide moves. Tattva
            qualifies. Force acts. Pattern orders. Element embodies. Matter receives. Form reveals.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {descent.map((p) => (
              <PrincipleCard key={p.latin} p={p} accent="descent" />
            ))}
          </div>
        </div>
      </section>

      {/* INTERLUDE — frozen force */}
      <section className="relative border-t border-border py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin-reverse opacity-[0.1]"
            width="1100"
            height="1100"
            viewBox="-550 -550 1100 1100"
            aria-hidden
          >
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 24;
              return (
                <line
                  key={i}
                  x1={0}
                  y1={0}
                  x2={Math.cos(a) * 520}
                  y2={Math.sin(a) * 520}
                  stroke="oklch(0.78 0.13 75)"
                  strokeWidth="0.3"
                />
              );
            })}
            <circle r="520" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="380" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="240" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
            Δύναμις · Μορφή
          </p>
          <p className="mt-12 font-serif text-4xl leading-tight text-balance sm:text-6xl md:text-7xl">
            Form is <span className="italic text-gold">frozen force</span>.
            <br />
            Force is <span className="italic text-gold">liberated form</span>.
          </p>
          <p className="mx-auto mt-12 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Form is dynamis held in morphē. Force is morphē released back into dynamis. To study
            hidden forces is not merely to study movement, but the invisible nature and order
            behind it.
          </p>
        </div>
      </section>

      {/* LAYERED CORRESPONDENCE */}
      <section className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § IX · Layered Correspondence
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Aithēr <span className="italic text-gold">→</span> Tattva{" "}
                <span className="italic text-gold">→</span> Stoicheion{" "}
                <span className="italic text-gold">→</span> Morphē
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                The ethers are formative fields. The tattvas are vibratory qualities. The
                elements are embodied conditions. They correspond, but they are not identical.
                An ether is a medium — a functional level through which forces operate. A tattva
                is a morphogenic bias — a qualitative tendency directing how those forces will
                behave. One supplies the capacity; the other gives it a direction.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { ether: "Warmth Ether", tattva: "Tejas", element: "Πῦρ · Fire", note: "Activation, ignition, transformation." },
                { ether: "Light Ether", tattva: "Vayu", element: "Ἀήρ · Air", note: "Illumination, direction, breath, transmission." },
                { ether: "Tone / Chemical Ether", tattva: "Apas", element: "Ὕδωρ · Water", note: "Relation, harmony, cohesion, memory." },
                { ether: "Life Ether", tattva: "Prithivi", element: "Γῆ · Earth", note: "Integration, structure, crystallization, durable form." },
              ].map((row) => (
                <div
                  key={row.element}
                  className="grid gap-2 border-b border-border pb-6 sm:grid-cols-[1fr_1fr_1fr] sm:gap-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    {row.ether}
                  </div>
                  <div className="font-serif italic text-bone/85">{row.tattva}</div>
                  <div className="font-serif text-bone/90">{row.element}</div>
                  <p className="col-span-full text-sm leading-relaxed text-muted-foreground">
                    {row.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE FOURFOLD FIELD */}
      <section id="fourfold" className="relative border-t border-border py-32">
        <SectionGlyph delay={-40} />
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § X · The Fourfold Field
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Θερμότης <span className="italic text-gold">→</span> Φῶς{" "}
                <span className="italic text-gold">→</span> Τόνος{" "}
                <span className="italic text-gold">→</span> Ζωή{" "}
                <span className="italic text-gold">↻</span>
              </h2>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-dim">
                Τὸ Τετραμερὲς Πεδίον
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Four functions, one formative circulation. The ethers are not separate substances
                and not successive stages. Every living process carries all four; at any moment
                one predominates. Their tattvic and elemental correspondences stand in § IX — what
                follows is their operation.
              </p>
            </div>
            <div className="space-y-8">
              <p className="font-serif text-2xl italic leading-tight text-bone/90 sm:text-3xl">
                Warmth <span className="text-gold">quickens</span>. Light{" "}
                <span className="text-gold">articulates</span>. Tone{" "}
                <span className="text-gold">coordinates</span>. Life{" "}
                <span className="text-gold">regenerates</span>.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Activation opens possibility. Articulation gives it direction. Affinity gives it
                relation. Integration gives it continuity. Continuity preserves the capacity for
                further activation.
              </p>
              <p className="border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/85">
                This is a circuit, not a ladder. Life is not the last rung of a descent: the living
                whole becomes the vessel of new potential and returns the cycle to Warmth at a more
                developed level.
              </p>
            </div>
          </div>

          {/* Reading key */}
          <div className="mt-20 border-t border-border pt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Κύκλος · The Living Circuit
            </p>
            <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-tight text-bone/85 sm:text-3xl">
              “The interval is as important as the <span className="text-gold">note</span>.”
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Read downward — and read the gaps. Each ether is set out with its measure: deficiency
              on one side, excess on the other, the named virtue between.
            </p>
          </div>

          {/* The ladder — ethers separated by intervals */}
          <div className="mt-16">
            {[
              {
                n: "I",
                greek: "Θερμότης",
                translit: "Thermotēs",
                english: "Warmth Ether",
                verb: "quickens",
                corr: "Tejas · Πῦρ",
                title: "Activation · The Threshold Ether",
                fn: "The first activated condition of Root Ether — the formative gradient through which latent possibility becomes movement, receptivity, will, and the capacity for transformation.",
                quote: "Warmth is what allows knowledge to become participation.",
                lines: [
                  "Before anything can change, something must first become active. A seed holds the possibility of a plant; metal can take a new shape. Neither moves until the conditions around it awaken what is latent.",
                  "Root Ether makes formation possible; Warmth begins it. Warmth is the point at which the neutrality of the field is disturbed — an intensity, a pressure, a stirring. That difference is a gradient, and across a gradient movement becomes possible. It is the first asymmetry of formation.",
                  "Not physical heat. Heat is measurable as temperature and is one material expression of the principle; warmth also appears as growth, desire, enthusiasm, courage, devotion, irritation, and will. Wherever something passes from dormancy into activity, warmth is present.",
                  "Cold wax holds its form and resists reshaping. Warmed, it becomes receptive. The warmth does not decide which image will be pressed into it — it allows the wax to receive a configuration at all.",
                  "Not elemental Fire. Fire is warmth that has acquired direction — consuming, separating, illuminating, purifying. A seed germinating underground is activation without combustion. Warmth is the capacity for ignition; Fire is that capacity assuming one mode.",
                  "Not the tattva Tejas. An ether is a medium through which forces operate; a tattva is a morphogenic bias directing how they behave. Tejas makes warmth radiant and separating — but Apas can make it incubatory, Vayu volatile, Prithivi bound and preserved, Akasha a charged stillness awaiting activation.",
                  "Psychically it is attention. An unnoticed impression stays weak; attention returning to it gathers associations, emotion, and significance until it can shape perception. Attention does not merely observe — it feeds the pattern it rests upon. Fear warms by vigilance, resentment by recollection, a sacred image by devotion.",
                  "It is what carries an understood pattern into the will. Courage is not the absence of fear but sufficient warmth around another purpose; enthusiasm is an idea that has acquired enough warmth to animate the one who receives it.",
                  "It purifies and consecrates by the same power: loosening fixed residues so they can be released, then leaving the opened vessel receptive to a new organizing pattern. Warmth alone cannot tell purification from destruction — Light must disclose the pattern, Salt must fix it.",
                  "It is the Threshold Ether. Felt inwardly as vitality, emotion, and will; appearing outwardly as a measurable condition of bodies. It belongs to both movements — in descent it awakens possibility toward form; in return, embodied warmth opens the living vessel toward subtler activity.",
                ],
                deficiency:
                  "Dormancy. Inertia, rigidity, indifference, alienation, and the inability to turn knowledge into action — the pattern understood but never embodied.",
                virtue: "measured warmth",
                gloss:
                  "Balanced warmth produces vitality, receptivity, courage, and sustained transformation. Warmth becomes constructive only when properly measured.",
                excess:
                  "Fever. Agitation, impulsiveness, obsession, uncontrolled desire, exhaustion, emotional inflammation — the vessel activated faster than it can organize and contain what it releases.",
                into: {
                  to: "Φῶς",
                  passage: "Activation opens possibility; articulation gives it direction.",
                  drift: "Where the interval collapses: quickening arrives before orientation, and activity intensifies without ever becoming clear enough to guide itself.",
                },
              },
              {
                n: "II",
                greek: "Φῶς",
                translit: "Phōs",
                english: "Light Ether",
                verb: "articulates",
                corr: "Vayu · Ἀήρ",
                title: "The Articulation of Difference",
                fn: "Once possibility is active it must acquire distinction. Light is the function through which orientation, contrast, boundary, and intelligible space emerge.",
                quote: "Light gives force a face.",
                lines: [
                  "It does not harden difference into permanent division. It makes difference perceptible enough to enter relation.",
                  "Materially: colour, edge, distance, surface, position — and, through shadow, depth. Plants orient to it; organisms keep time by it.",
                  "Subtler, it is the condition of discernibility: it gives an emerging form an interior geography — centre and circumference, inner and outer, approach and withdrawal.",
                  "Psychically it is attention and discernment. Attention does not merely illuminate a finished inner world; by repeatedly distinguishing impressions it helps establish what becomes significant.",
                  "An invisible tendency becomes approachable when it acquires an image, name, gesture, or diagram. The image does not contain the power; it gives the power a surface through which consciousness can relate to it.",
                  "Illumination always selects. To reveal one relation is to leave another in shadow; every distinction establishes a foreground and a background.",
                ],
                deficiency:
                  "Awakened force without orientation. Activity intensifies, but nothing becomes clear enough to guide it.",
                virtue: "right articulation",
                gloss:
                  "Reveals the differences required for meaningful relation without severing them from the field to which they belong.",
                excess:
                  "The field fragments, oppositions harden, partial visibility is mistaken for understanding. A symbol defined so rigidly it can no longer disclose anything beyond its established reading; experience divided so aggressively that living continuities disappear.",
                into: {
                  to: "Τόνος",
                  passage: "Distinction becomes relation — affinity, interval, proportion.",
                  drift: "Where the interval collapses: differentiation outruns integration, and what has been distinguished can no longer be brought into measure.",
                },
              },
              {
                n: "III",
                greek: "Τόνος",
                translit: "Tonos · Chemical Ether",
                english: "Tone Ether",
                verb: "coordinates",
                corr: "Apas · Ὕδωρ",
                title: "Affinity, Interval, and Proportion",
                fn: "The function through which differentiated powers enter measured relationship — rhythm, interval, ratio, resonance, affinity, combination, separation.",
                quote: "Tone orders through affinity, interval, and proportion.",
                lines: [
                  "If Light reveals that two powers are distinct, Tone determines how — or whether — they can belong together.",
                  "Affinity draws compatible powers toward relation. Interval prevents relation from becoming undifferentiated fusion. Proportion determines how much of each power may enter the whole without destroying balance. Rhythm carries the relation through time.",
                  "No note possesses complete meaning in isolation. A note consonant in one relation is dissonant in another: identity remains, function changes.",
                  "Nor do substances combine indiscriminately. Some unite readily, others resist; some require heat, pressure, catalyst, or exact ratio. Relation is selective — the formative world is not governed by contact alone.",
                  "Tone therefore both joins and divides. It draws together what can form a meaningful compound and holds distance where distinction must be preserved. Dissonance may be necessary to development; separation may protect the integrity of a living whole.",
                  "Health is not all systems doing the same thing. Heart, lung, nerve, and gland keep different rhythms and remain mutually responsive: differentiated activity in viable proportion. In ritual, in law, in calendar and custom, the same ordering arranges difference through interval and proportion.",
                ],
                deficiency:
                  "Incoherence, mistiming, incompatible action, the inability to sustain relation — uncontrolled dissonance that prevents any shared order.",
                virtue: "living proportion",
                gloss:
                  "An order precise enough to coordinate differences, yet flexible enough to be retuned.",
                excess:
                  "Rigidity, overregulation, compulsive repetition. Coordination becomes conformity; harmony is bought by suppressing necessary difference; the system is tuned too tightly to answer change, and false consonance hides conflict beneath uniformity.",
                into: {
                  to: "Ζωή",
                  passage: "Coordination becomes continuity — a whole capable of renewal.",
                  drift: "Where the interval collapses: coordination hardens into mechanical repetition, and order is kept only by refusing change.",
                },
              },
              {
                n: "IV",
                greek: "Ζωή",
                translit: "Zōē",
                english: "Life Ether",
                verb: "regenerates",
                corr: "Prithivi · Γῆ",
                title: "Integration, Renewal, and Regeneration",
                fn: "The function through which differentiated and coordinated relations become an enduring whole capable of renewal.",
                quote: "Life without renewed relation to Source becomes self-perpetuation.",
                lines: [
                  "Life is not the sum of correctly arranged parts. An organism exchanges its substance continually and remains recognisably itself: the matter changes, the relations carry the pattern through time.",
                  "The whole is not imposed from outside. It emerges through participation and then conditions the parts in return — organisation becomes recursive, held by regeneration rather than by static preservation. Organs remain distinct and become functions of one organism.",
                  "Psychically this is integration: not the suppression of contradiction but a centre able to hold diverse powers in meaningful relation, and to metabolise experience without continually fragmenting beneath it.",
                  "Death appears here not as Life’s opposite but as one of its internal operations. Cells die so tissue may form; leaves fall and become nourishment; a habit dissolves so a more adequate participation can emerge. Life preserves itself partly through selective endings.",
                  "A distorted whole can be preserved with remarkable effectiveness — an obsession recruiting thought, memory, and desire into its continuation; an institution defending an identity whose original virtue is long gone.",
                ],
                deficiency:
                  "Fragmentation, exhaustion, the inability to carry gains from one moment into the next.",
                virtue: "regenerative wholeness",
                gloss:
                  "Preserve identity through exchange, incorporate what nourishes, release what obstructs, repair what has been injured, and reopen the whole to further transformation.",
                excess:
                  "Enclosure, assimilation, resistance to necessary transformation — a whole that defends itself against the change it requires.",
                into: {
                  to: "Θερμότης",
                  passage: "Continuity preserves the capacity for further activation.",
                  drift: "Where the interval collapses: a living order is preserved that ought to have been transformed — self-perpetuation standing in for renewal.",
                },
              },
            ].map((e, i) => (
              <div key={e.english}>
                <article className="group border border-border p-5 transition-colors hover:border-gold/40 sm:p-7">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)] lg:gap-10">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                        {e.n} · {e.english}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl leading-none text-bone sm:text-4xl">
                        {e.greek}
                      </h3>
                      <p className="mt-3 font-serif text-lg italic text-gold/80">
                        {e.translit} · {e.verb}
                      </p>
                      <div className="mt-6 h-px w-12 bg-gold/40 transition-all duration-700 group-hover:w-24" />
                      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        § IX · {e.corr}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                        {e.title}
                      </p>
                      <p className="mt-4 font-serif text-base leading-relaxed text-bone/85 sm:text-lg">
                        {e.fn}
                      </p>
                      {e.quote ? (
                        <p className="mt-5 border-l border-gold/40 pl-5 font-serif text-base italic leading-relaxed text-bone/90 sm:text-lg">
                          “{e.quote}”
                        </p>
                      ) : null}
                      <div className="mt-5 space-y-2">
                        {e.lines.map((l) => (
                          <p key={l} className="text-sm leading-relaxed text-muted-foreground">
                            {l}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Measure — deviation on either side of the named virtue */}
                  {e.virtue ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
                      <div className="border-t border-border pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Ἔλλειψις · Deficiency
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {e.deficiency}
                        </p>
                      </div>
                      <div className="border-t border-gold/60 pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                          Μεσότης · Virtue
                        </p>
                        <p className="mt-3 font-serif text-lg italic text-bone/90">“{e.virtue}”</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {e.gloss}
                        </p>
                      </div>
                      <div className="border-t border-border pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Ὑπερβολή · Excess
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {e.excess}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </article>

                {i < 3 ? (
                  <div className="flex flex-col items-center px-2 py-7 text-center">
                    <span className="h-7 w-px bg-gradient-to-b from-transparent to-gold/50" />
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                      Διάστημα {["I", "II", "III"][i]} · {e.greek}{" "}
                      <span className="text-gold">→</span> {e.into.to}
                    </p>
                    <p className="mt-3 max-w-xl font-serif text-base italic leading-relaxed text-bone/85 sm:text-lg">
                      {e.into.passage}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {e.into.drift}
                    </p>
                    <span className="mt-4 h-10 w-px bg-gradient-to-b from-gold/50 to-transparent" />
                  </div>
                ) : (
                  <div className="mt-12 border border-gold/25 p-6 sm:p-10">
                    <div className="grid items-center gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-12">
                      <svg
                        viewBox="0 0 120 120"
                        className="mx-auto h-auto w-32 shrink-0 sm:w-40"
                        aria-hidden
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="var(--border)"
                          strokeWidth="0.8"
                        />
                        <path
                          d="M 67.6 16.7 A 44 44 0 1 1 52.4 16.7"
                          fill="none"
                          stroke="var(--gold)"
                          strokeOpacity="0.55"
                          strokeWidth="1.2"
                        />
                        <polygon
                          points="54.4,16.4 47.2,21.7 45.8,13.9"
                          fill="var(--gold)"
                          fillOpacity="0.8"
                        />
                        <circle
                          cx="60"
                          cy="16"
                          r="16"
                          fill="none"
                          stroke="var(--gold)"
                          strokeOpacity="0.35"
                          strokeWidth="0.6"
                          className="animate-breathe"
                        />
                        {[
                          { t: "Θ", x: 60, y: 16 },
                          { t: "Φ", x: 104, y: 60 },
                          { t: "Τ", x: 60, y: 104 },
                          { t: "Ζ", x: 16, y: 60 },
                        ].map((node) => (
                          <g key={node.t}>
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r="10"
                              fill="var(--background)"
                              stroke="var(--gold)"
                              strokeOpacity="0.5"
                              strokeWidth="0.8"
                            />
                            <text
                              x={node.x}
                              y={node.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontFamily="EB Garamond, serif"
                              fontSize="12"
                              fill="var(--gold)"
                            >
                              {node.t}
                            </text>
                          </g>
                        ))}
                      </svg>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                          Διάστημα IV · The Return to {e.into.to}
                        </p>
                        <p className="mt-6 font-serif text-2xl italic leading-tight text-bone/90 sm:text-3xl">
                          “Life completes the cycle by preserving the power to{" "}
                          <span className="text-gold">begin again</span>.”
                        </p>
                        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                          {e.into.passage} Life bends the Fourfold Field back toward its beginning:
                          the living whole becomes the vessel of new potential, and the circuit
                          reopens at Warmth on more developed ground.
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {e.into.drift}
                        </p>
                        <a
                          href="#fourfold"
                          className="mt-8 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim transition-colors hover:text-gold"
                        >
                          <span className="text-base leading-none">↺</span>
                          Begin again at I · Θερμότης
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Forward pointer */}
          <div className="mx-auto mt-24 max-w-3xl border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/85">
            The cycle does not always run smoothly. Activation may precede orientation;
            differentiation may outrun integration; coordination may harden into repetition; a
            living system may preserve an order that ought to be transformed. Each ether supports
            or distorts the others according to measure, timing, and the condition of the vessel.
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The Fourfold Field describes what the formative field does — not the direction in which
            its operations are inclined. For that, the architecture must turn toward tattva and
            guna, toward the limiting vessel, and toward the traces left by previous formation.
          </p>
        </div>
      </section>

      {/* MORPHAITHER */}
      <section id="morphaither" className="relative border-t border-border py-32">
        <SectionGlyph delay={-15} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § XI · The Morphaithēr
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Μορφαιθήρ
              </h2>
              <p className="mt-4 font-serif text-lg italic text-gold-dim">
                The living formative atmosphere
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Etheric currents, tattvic qualities, elemental tendencies, psychic impressions,
                and inherited patterns do not act separately. Their interaction produces a
                formative atmosphere surrounding and penetrating a being, place, ritual, culture,
                or event.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                It is less a thing than a continuously changing ecology of formative influence.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Where it is felt
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { place: "Courtroom", note: "Posture, register of speech, and the weight given to a sentence." },
                  { place: "Temple", note: "Attention narrows, gesture slows, silence acquires meaning." },
                  { place: "Hospital", note: "Time is measured differently; the body becomes the object of regard." },
                  { place: "Battlefield", note: "Perception sharpens to threat; deliberation collapses into reflex." },
                  { place: "Childhood home", note: "Old postures return unbidden; inherited patterns resume." },
                  { place: "Marketplace", note: "Exchange, appraisal, and the constant estimation of worth." },
                ].map((x) => (
                  <div
                    key={x.place}
                    className="group border border-border p-4 transition-colors hover:border-gold/40"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                      {x.place}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                People behave differently in different environments without consciously deciding
                to. The field inclines the forms arising within it — but it does not compel them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RETURN */}
      <section id="return" className="relative border-t border-border py-32">
        <SectionGlyph delay={-60} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                Ἐπιστροφή · The Second Movement
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The Return <span className="italic text-gold">through Reading</span>
              </h2>
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              V Principles
            </div>
          </div>

          <p className="mb-16 max-w-2xl font-serif text-lg italic leading-relaxed text-muted-foreground">
            Form bears trace. Trace reveals signature. Signature becomes symbol. Symbol discloses
            correspondence. Correspondence opens transformation — the return of visible form to
            hidden origin.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ret.map((p) => (
              <PrincipleCard key={p.latin} p={p} accent="return" />
            ))}
          </div>
        </div>
      </section>

      {/* SEED EXAMPLE */}
      <section className="relative border-t border-border py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              § XII · A Worked Example
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-tight">
              The seed as <span className="italic text-gold">metaphysical event</span>
            </h2>
          </div>
          <div className="space-y-6 font-serif text-lg leading-relaxed text-bone/80">
            <p>
              A seed contains <em className="text-gold">ousia</em> — its inward nature, the physis
              of the plant it may become. That essence bears <em className="text-gold">dynamis</em>:
              the hidden potency to root, rise, leaf, flower, and fruit.
            </p>
            <p>
              But the seed does not manifest at all times. <em>Aithēr</em> gives the field of
              possibility. <em>Rhythmos</em> determines season and activation. <em>Tattvas</em>
              {" "}provide warmth, moisture, expansion. <em>Energeia</em> becomes active in
              germination. <em>Logos</em> guides morphology. <em>Stoicheia</em> provide the
              elemental body. <em>Hylē</em> receives. <em>Morphē</em> appears as the plant.
            </p>
            <p>
              The plant then bears <em className="text-gold">ichnos</em>. These traces reveal
              {" "}<em className="text-gold">charaktēr</em>. Signature flowers as
              {" "}<em className="text-gold">symbolon</em> — rose becomes love, thorn, beauty,
              sacrifice, unfolding. Symbol enters <em className="text-gold">sympatheia</em>: rose
              with Venus, heart, desire, devotion. Through correspondence,
              {" "}<em className="text-gold">metamorphōsis</em> becomes possible — medicine,
              ritual, contemplation, healing.
            </p>
          </div>
        </div>
      </section>

      {/* KABBALAH */}
      <section id="kabbalah" className="relative border-t border-border py-32">
        <SectionGlyph />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § XIII · Kabbalah
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                The sacred grammar of <span className="italic text-gold">emanation</span>
              </h2>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-dim">
                אֵין סוֹף · Ein Sof
              </p>
              <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
                Kabbalah does not replace the system. It reveals one of its deepest symbolic
                skeletons — a sacred alphabet, a tree of descent, a ladder of worlds, and a
                doctrine of vessels.
              </p>
            </div>
            <div className="space-y-6 font-serif text-lg leading-relaxed text-bone/80">
              <p>
                Where the system speaks of <em className="text-gold">Source</em>, Kabbalah speaks
                of <em>Ein Sof</em> — the boundless origin beyond direct comprehension. Where the
                system speaks of the first limitation necessary for form, Kabbalah speaks of
                {" "}<em>tzimtzum</em>, the contraction or concealment that allows finite reality
                to appear. Where the system speaks of virtue, force, and pattern, Kabbalah speaks
                of the <em className="text-gold">sefirot</em>: vessels of divine quality through
                which hidden infinity becomes ordered power.
              </p>
              <p>
                The Tree of Life is therefore not merely a diagram of symbols. It is a map of
                hidden force descending into form and returning through consciousness — light
                enters vessel, force enters pattern, pattern enters element, element becomes form.
              </p>
            </div>
          </div>

          {/* Tree of Life */}
          <div className="mt-24 grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start">
            <TreeOfLife />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                עֵץ הַחַיִּים · The Ten Sefirot
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { n: "I", he: "כֶּתֶר", en: "Keter", g: "Crown", d: "First emergence." },
                  { n: "II", he: "חָכְמָה", en: "Chochmah", g: "Wisdom", d: "The seed-flash." },
                  { n: "III", he: "בִּינָה", en: "Binah", g: "Understanding", d: "Womb of structure." },
                  { n: "IV", he: "חֶסֶד", en: "Chesed", g: "Mercy", d: "The outpouring force." },
                  { n: "V", he: "גְּבוּרָה", en: "Gevurah", g: "Severity", d: "The limiting force." },
                  { n: "VI", he: "תִּפְאֶרֶת", en: "Tiferet", g: "Beauty", d: "Harmonizing center." },
                  { n: "VII", he: "נֶצַח", en: "Netzach", g: "Victory", d: "Emotional channel." },
                  { n: "VIII", he: "הוֹד", en: "Hod", g: "Glory", d: "Intellectual channel." },
                  { n: "IX", he: "יְסוֹד", en: "Yesod", g: "Foundation", d: "The subtle base." },
                  { n: "X", he: "מַלְכוּת", en: "Malchut", g: "Kingdom", d: "Embodied form." },
                ].map((s) => (
                  <div
                    key={s.en}
                    className="group border border-border p-4 transition-colors hover:border-gold/40"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-serif text-2xl text-gold">{s.he}</div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                        {s.n}
                      </div>
                    </div>
                    <div className="mt-2 font-serif text-lg italic text-bone">
                      {s.en} <span className="text-muted-foreground">· {s.g}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Four Worlds */}
          <div className="mt-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              אַרְבָּעָה עוֹלָמוֹת · The Four Worlds
            </p>
            <h3 className="mt-6 font-serif text-3xl leading-tight">
              A vertical scale for the <span className="italic text-gold">architecture</span>
            </h3>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { he: "אֲצִילוּת", en: "Atzilut", g: "Emanation", mapping: "Source · Spirit" },
                { he: "בְּרִיאָה", en: "Beriah", g: "Creation", mapping: "Essence · Virtue" },
                { he: "יְצִירָה", en: "Yetzirah", g: "Formation", mapping: "Ether · Tide · Tattva · Force · Pattern" },
                { he: "עֲשִׂיָּה", en: "Assiah", g: "Action", mapping: "Element · Matter · Form · Trace · Signature" },
              ].map((w, i) => (
                <div key={w.en} className="relative border border-border p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                    World {["I", "II", "III", "IV"][i]}
                  </div>
                  <div className="mt-4 font-serif text-3xl text-gold">{w.he}</div>
                  <div className="mt-2 font-serif text-xl italic">
                    {w.en} <span className="text-muted-foreground">· {w.g}</span>
                  </div>
                  <div className="mt-6 h-px w-8 bg-gold/40" />
                  <p className="mt-4 font-serif text-sm leading-relaxed text-bone/75">
                    {w.mapping}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hebrew Letters */}
          <div className="mt-24 grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                אוֹתִיּוֹת · The Formative Letters
              </p>
              <h3 className="mt-6 font-serif text-3xl leading-tight">
                Not marks — <span className="italic text-gold">cosmic vessels</span>
              </h3>
              <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-bone/80">
                The Hebrew letters deepen the meaning of <em className="text-gold">Pattern</em>
                {" "}and <em className="text-gold">Symbol</em>. They are formative signs — vessels
                of sound, number, shape, and force. Through them, the hidden architecture becomes
                speakable, writable, and operative. Reality is not an accidental heap of objects,
                but a written cosmos: an ordered emanation.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 self-center font-serif text-3xl text-gold sm:text-4xl">
              {"אבגדהוזחטיכלמנסעפצקרשת".split("").map((l, i) => (
                <span
                  key={i}
                  className="opacity-60 transition-all duration-500 hover:scale-125 hover:text-bone hover:opacity-100"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXTENDED — hidden powers */}
      <section id="extended" className="relative border-t border-border py-32">
        <SectionGlyph delay={-45} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                § XIV · The Hidden Powers
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-6xl">
                The extended <span className="italic text-gold">architecture</span>
              </h2>
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              XI Principles
            </div>
          </div>

          <p className="mb-16 max-w-3xl font-serif text-lg italic leading-relaxed text-muted-foreground">
            Between Source and Form, and between Form and Return, the architecture is threaded by
            further hidden principles. They are not additions but articulations — the deeper joints
            by which force becomes intelligible, containable, and transformable.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { greek: "Ἐναντία · Συζυγία", latin: "Enantia · Syzygia", english: "Polarity", summary: "The first tension by which hidden unity becomes dynamic. Not conflict but productive pairing — light and dark, active and receptive, sulfur and mercury — the charged relation from which movement is born." },
              { greek: "Πέρας · Ὅρος", latin: "Peras · Horos", english: "Limit", summary: "The first mercy of form. By boundary, the indefinite becomes definite; nothing can appear without some horizon of containment. Saturn, Gevurah, Salt — the discipline that makes manifestation possible." },
              { greek: "Μέτρον · Ἁρμονία", latin: "Metron · Harmonia", english: "Measure", summary: "Right proportion. The art by which powers are placed into relation — the difference between noise and music, mass and architecture. Too much force breaks the vessel; too little fails to animate it." },
              { greek: "Ἀγγεῖον · Ὑποδοχή", latin: "Angeion · Hypodochē · Keli", english: "Vessel", summary: "The receptacle that shapes what it receives. Body, cup, womb, temple, sigil, organ, soul — a distorted vessel distorts the force; a purified vessel clarifies it; a properly measured vessel reveals it." },
              { greek: "Ψυχή", latin: "Psychē", english: "Soul", summary: "The mediating interior life — animation, image, memory, desire. The bridge between spirit and body where the outer world becomes inwardly alive, and where distortion can enter or be refined." },
              { greek: "Φαντασία · Εἰκών", latin: "Phantasia · Eikōn", english: "Imagination", summary: "Not fantasy but the soul's formative organ. Subtle form — the way invisible powers become inwardly visible through dream, myth, vision, and ritual image, before they become physically obvious." },
              { greek: "Θεουργία", latin: "Theurgia", english: "Theurgy", summary: "The art of right participation in divine order. Disciplined alignment of the human vessel with higher principles — the highest invoked first, so that lower forces are ordered rather than inflated." },
              { greek: "Ὀρθὴ Σχέσις", latin: "Orthē Schesis", english: "Right Relation", summary: "The art of placing each thing according to its nature, scale, and purpose. Harmony of hierarchy without tyranny, polarity without fragmentation, embodiment without imprisonment." },
              { greek: "Κυκλοφορία", latin: "Kyklophoria", english: "Circulation", summary: "Reality is not a one-way descent. Force descends into form; form becomes conscious; consciousness recognizes the hidden force within form; the force is purified and returned toward Source. Solve et coagula." },
              { greek: "Τέλος", latin: "Telos", english: "Fulfillment", summary: "The direction of completion inscribed in every essence. The rose fulfills itself by becoming fully rose; the human by becoming a transparent vessel of rightly ordered spirit, soul, virtue, and action." },
              { greek: "Μέλας Αἰθήρ", latin: "Melas Aithēr", english: "Black Aether", summary: "The apophatic seam. Not darkness as evil but the dark translucency at the edge of manifestation — the mystery of boundary as both concealment and revelation, where the vessel becomes transparent to the ungraspable." },
            ].map((p) => (
              <article
                key={p.latin}
                className="group relative overflow-hidden border border-border bg-void/40 p-8 backdrop-blur-sm transition-colors hover:bg-clay/40 sm:p-10"
              >
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                    Hidden Power
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.english}
                  </span>
                </div>
                <h3 className="font-serif text-3xl leading-tight text-bone sm:text-4xl">
                  {p.greek}
                </h3>
                <p className="mt-2 font-serif text-lg italic text-gold/80">{p.latin}</p>
                <div className="my-6 h-px w-12 bg-gold/40 transition-all duration-700 group-hover:w-24" />
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {p.summary}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/85">
            Distortion occurs when process is interrupted, inverted, or mismeasured. A force
            without measure becomes violence. A vessel without spirit becomes dead structure.
            Spirit without vessel becomes dissipation. Symbol without participation becomes empty
            sign. Transformation without telos becomes mere mutation. Right Relation restores the
            circuit.
          </div>
        </div>
      </section>

      {/* THE PSYCHIC FLYWHEEL */}
      <section id="flywheel" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XIV·i · The Psychic Flywheel
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Repetition becomes <span className="italic text-gold">momentum</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A thought generates an emotional response. The emotion directs attention toward
            confirming perceptions. Those perceptions strengthen the original thought. Repetition
            makes the circuit increasingly automatic.
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-4">
            {[
              { n: "1", t: "Thought", d: "A passing movement arises." },
              { n: "2", t: "Emotion", d: "The movement acquires charge and direction." },
              { n: "3", t: "Attention", d: "Perception is steered toward what confirms it." },
              { n: "4", t: "Momentum", d: "The circuit closes and begins to turn itself." },
            ].map((x) => (
              <div key={x.n} className="group border border-border p-4 transition-colors hover:border-gold/40">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  {x.n}
                </div>
                <div className="mt-2 font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Reservoirs as attractors
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A tattvic reservoir is not a tank of subtle fluid. It is an accumulated condition
                making certain expressions more probable. A room habituated to conflict becomes
                disposed toward fiery reaction; a contemplative chamber toward stillness; a person
                habituated to anxiety toward anxious interpretation. Reservoirs draw fluctuating
                activity toward familiar configurations.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This does not require that thought magically govern outward events. It means
                thought, feeling, attention, body, behavior, and environment become coupled into
                a self-reinforcing system.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Ἥλιος Ἐντός · The Inner Sun
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A divided person disperses force. One part desires what another fears; one part
                imagines what another refuses to enact — several animals pulling a chariot in
                opposing directions.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                When thought, desire, imagination, speech, and embodied action coordinate around a
                shared center, less is lost to internal contradiction. The Inner Sun is that
                organizing center — holding diverse faculties in relation without erasing their
                differences.
              </p>
              <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                Coherence, not intensity, is the measure of causal reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE ALCHEMICAL TRIAD */}
      <section id="triad" className="relative border-t border-border py-32">
        <SectionGlyph delay={-45} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XV·i · The Alchemical Triad
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Something that <span className="italic text-gold">acts</span>, something that{" "}
            <span className="italic text-gold">communicates</span>, something that{" "}
            <span className="italic text-gold">retains</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Sulfur, Mercury, and Salt do not claim that every object contains three occult
            chemicals. They name three recurrent necessities of transformation — in laboratory,
            psyche, body, society, and art alike.
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              { greek: "Θεῖον", latin: "Sulphur", en: "Sulfur", role: "Impulse", d: "The driving difference — desire, heat, pressure, appetite, intention, catalytic intensity. It initiates and intensifies.", without: "Without Sulfur, nothing is initiated." },
              { greek: "Ὑδράργυρος", latin: "Mercurius", en: "Mercury", role: "Mediation", d: "Mobility and exchange — circulation, translation, adaptation, communication. It joins what was separate.", without: "Without Mercury, nothing is transmitted or recombined." },
              { greek: "Ἅλς", latin: "Sal", en: "Salt", role: "Fixation", d: "Stabilization — boundary, embodiment, memory, habit, structure, preservation. It limits and endures.", without: "Without Salt, nothing endures." },
            ].map((x) => (
              <div key={x.en} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-serif text-2xl text-gold">{x.greek}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {x.role}
                  </div>
                </div>
                <div className="mt-3 font-serif text-lg italic text-bone">
                  {x.en} <span className="text-muted-foreground">· {x.latin}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                <p className="mt-4 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                  {x.without}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <div className="border border-border p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Solve
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The old configuration is loosened, its forces separated and understood.
                <span className="mt-3 block text-bone/80">
                  Solve without coagula produces dispersion.
                </span>
              </p>
            </div>
            <div className="border border-border p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Coagula
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Its viable contents are recombined around a more coherent center.
                <span className="mt-3 block text-bone/80">
                  Coagula without solve produces imprisonment.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE RETENTIVE DEPTH */}
      <section id="retentive" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XV·ii · The Retentive Depth
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The world <span className="italic text-gold">inherits itself</span>
          </h2>

          <div className="mt-12 grid gap-16 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Κρύπτη · The Crypt of Primordial Memory
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Not a warehouse of perfect historical images. The retentive depth of causation —
                the persistence of consequences after the originating form has vanished.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Memory exists at more than one level. Organisms preserve developmental histories;
                bodies acquire habits; institutions retain procedures; landscapes bear traces of
                prior activity; languages preserve ancient distinctions; cultures inherit symbols
                whose origins their members no longer understand.
              </p>
              <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                Once something has occurred, the world is no longer identical to the world in
                which it had not occurred.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Ὀστοφυλάκιον · The Ossuary of Living Forms
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Nature retains no obligation to preserve every vessel, yet it does not begin again
                from nothing. Perished forms return their matter, structure, experience, and
                formative consequences to the larger field.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                When an organism dies its unified operation ends, but its components and
                consequences continue. Its matter enters other systems. Its actions remain within
                other lives. Its symbolic effects may outlast its body by centuries.
              </p>
              <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                Death is dissolution of a particular vessel, not erasure of everything that passed
                through it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE LAWS OF FORMATION */}
      <section id="laws" className="relative border-t border-border py-32">
        <SectionGlyph delay={-70} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XVI · The Laws of Formation
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            How forms <span className="italic text-gold">receive</span>, endure, distort, and{" "}
            <span className="italic text-gold">return</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The preceding sections describe how forms arise. These describe what happens
            afterward — how a form takes in influence, holds itself together, goes wrong,
            crosses a threshold, and gives its contents back to the field.
          </p>

          {[
            {
              group: "Boundary and Exchange",
              items: [
                { t: "Selective Permeability", d: "Every enduring form requires a boundary, but no living boundary can be absolutely closed. Complete openness dissolves; complete closure starves. Identity exists through regulated exchange — a vessel is not a container but a gatekeeping intelligence. The cell membrane is the exact image: it distinguishes the cell from its environment while admitting selected substances, signals, and energies. The psyche works the same way — open enough to receive experience, structured enough not to be overwhelmed by it.", note: "Salt establishes the boundary; Mercury governs what crosses; Sulfur supplies the pressure." },
                { t: "Transduction", d: "Influence rarely passes between levels without changing its mode of expression. A principle becomes an image, the image an emotion, the emotion a posture, the posture an act. A subtle pattern does not travel intact like a package — it is re-expressed by each medium it passes through.", note: "Which is why higher influence is so often distorted: a genuine intuition becomes an inaccurate image, the image an inflated emotion, the emotion a destructive act. Every passage admits either clarification or corruption — and the fault may lie in the vessel's translation, not in the originating principle." },
                { t: "Formative Metabolism", d: "Every sustained form must receive, transform, retain, and release. A mind metabolizes perception and memory; a culture metabolizes events into law and story; a ritual space metabolizes what is repeatedly enacted within it.", note: "A fear complex has intake, transformation, self-maintenance, and output. It behaves like an organism because structurally it is one." },
              ],
            },
            {
              group: "Endurance and Change",
              items: [
                { t: "Metastable Form", d: "Forms are not simply stable or unstable. Many endure for long periods while remaining open to reorganization — held in place by feedback that continually restores the familiar arrangement, yet displaceable by sufficient disruption.", note: "Form is not static substance. It is an actively maintained settlement among competing forces." },
                { t: "Accumulation and Threshold", d: "Change accumulates gradually and appears suddenly. Water warms and then boils; tension builds along a fault; a practice seems inert for months and then reorganizes perception — not because the last act was extraordinary, but because the structure had reached readiness.", note: "Transformation is discontinuous in appearance, continuous in preparation." },
                { t: "Formative Inertia", d: "Water flowing repeatedly over land cuts a channel, and later water follows it though the original water is gone. Habits, institutions, traumas, and buildings cut comparable channels.", note: "Memory is not only retained content. It is inherited curvature in the field of becoming." },
                { t: "Irreversibility", d: "Dissolution does not restore what existed before. Ashes hold a book's matter but not its organization; a reconciled relationship is not one that was never damaged. Solve is not a clean reversal of coagula.", note: "Possibility becomes actuality; actuality leaves consequences; consequences modify what is possible next." },
              ],
            },
            {
              group: "Structure and Relation",
              items: [
                { t: "The Ontological Gradient", d: "Between pure possibility and completed actuality lie degrees: abstract possibility, qualitative tendency, latent disposition, emerging configuration, actualized event, stabilized form, residual influence after dissolution.", note: "This is what \u201csubtle\u201d means — not a faint object hidden in space, but direction and structure without full embodiment." },
                { t: "Nested Fields, Relative Centers", d: "Every form is a whole to its parts and a part within a greater whole. No center is wholly isolated; none is merely illusory. Each holds autonomy in proportion to its capacity to maintain organization.", note: "Causation runs both ways: parts sustain wholes, wholes constrain parts. Neither level suffices alone." },
                { t: "Resonance as Selection", d: "Resonance is not a universal solvent for every resemblance. Its coherent function is selective amplification — it does not create the pattern, it strengthens what the vessel can already receive. Genuine operation requires structural compatibility, a channel of coupling, sufficient duration, and receptivity.", note: "This is what keeps correspondence from becoming arbitrary." },
              ],
            },
            {
              group: "Cost and Shadow",
              items: [
                { t: "The Cost of Form", d: "To actualize one form is to exclude others. Carved stone can no longer become every figure it might have been; a word gains precision by surrendering meanings. Every act of formation entails sacrifice.", note: "Not tragic — without exclusion nothing definite could appear. But it explains why manifestation leaves remainder. Alchemy becomes the art of discerning which limitations are necessary vessels and which have become unnecessary prisons: solve loosens a configuration so its excluded contents can be reconsidered, coagula establishes one able to express a wider range." },
                { t: "The Shadow of Selection", d: "Because every form selects, every formation casts a shadow: whatever the established order cannot presently hold. It is not automatically evil. A disciplined identity may exclude spontaneity; a peaceful community may suppress rather than reconcile conflict.", note: "The excluded does not vanish. It gathers at the boundary and returns through dream, symptom, compulsion, or disruption." },
              ],
            },
            {
              group: "Measure and Aim",
              items: [
                { t: "Integral and Parasitic Coherence", d: "Coherence alone is not goodness. A tumor is organized. An obsession is coherent. A destructive ideology coordinates thousands around a stable center. Local coherence organizes a limited structure at its host's expense; integral coherence strengthens the form while preserving its viable relations with the greater systems it belongs to.", note: "A healthy form shows selective permeability, adaptability, generativity, proportion, and the capacity to receive correction." },
                { t: "Proportional Integration", d: "No quality perfects a form by being maximized. Too much stability is rigidity; too much Mercury, dispersion; too much Sulfur, inflammation; too much openness, dissolution. No tattva is superior — each is constructive or destructive by proportion, placement, and timing.", note: "The perfected vessel is not one holding only higher qualities, but one where differentiated powers hold their proper measures." },
                { t: "Telos as Attractor", d: "Purpose need not mean predetermination. A seed contains no miniature tree, yet its development is not directionless — present activity is organized in relation to a possible mature form. The future does not reach backward; an apprehended possibility shapes present selection.", note: "Theurgy becomes the deliberate installation of a higher attractor within the human field." },
              ],
            },
            {
              group: "Operation",
              items: [
                { t: "Symbolic Causation", d: "A symbol is neither decoration nor supernatural machine. It reorganizes perception by compressing many relations into one apprehensible form — a flag coordinating emotion, a ring altering the meaning of behavior, a sacred image reordering attention, posture, memory, and intention at once.", note: "Ritual is engineered symbolic causation. Its power depends on the depth of integration among its factors, not on correct recitation." },
                { t: "Temporal Architecture", d: "Formation depends not only on which forces act but when and in what order. The same intervention heals at one stage and disrupts at another. Every form has rhythms, phases, windows of receptivity, moments of crisis, intervals of consolidation.", note: "This grounds kairos — the qualitative fitness of a moment. Timing is part of structure." },
              ],
            },
          ].map((cluster) => (
            <div key={cluster.group} className="mt-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                {cluster.group}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {cluster.items.map((x) => (
                  <div
                    key={x.t}
                    className="group border border-border p-5 transition-colors hover:border-gold/40"
                  >
                    <div className="font-serif text-lg italic text-bone">{x.t}</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                    <p className="mt-4 border-t border-border pt-3 text-sm italic leading-relaxed text-bone/70">
                      {x.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* The safeguard */}
          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The Safeguard · No Vessel Exhausts the Field
            </p>
            <p className="mt-5 max-w-4xl font-serif text-2xl italic leading-relaxed text-bone">
              No form, symbol, doctrine, institution, or consciousness can completely contain
              the field from which it arises.
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Every vessel reveals something through its particular structure while excluding
              something else — and this applies to metaphysical systems. Root Ether is not the
              Absolute; it is the first intelligible medium within the architecture. The tattvas
              do not exhaust all possible qualities; they supply a grammar of formative
              tendencies. The ethers do not divide reality into compartments; they name
              distinguishable functions within a continuous process.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/80">
              This architecture presents itself as a disciplined symbolic anatomy of formation,
              not as a claim to exhaust the mystery of reality. The principle of inexhaustibility
              makes the system stronger, because it allows precision without pretending to
              totality.
            </p>
          </div>
        </div>
      </section>

      {/* ASTROLOGY */}
      <section id="astrology" className="relative border-t border-border py-32">
        <SectionGlyph delay={-90} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XVII · Celestial Anatomy
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            The clock of <span className="italic text-gold">qualitative time</span>
          </h2>
          <p className="mt-8 max-w-3xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            Astrology does not create the hidden forces. It maps their changing celestial
            configuration.
          </p>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Ordinary clocks measure time quantitatively. Astrology proposes that time also has
            qualitative difference — that one moment favours initiation, another consolidation,
            another dissolution. The configuration marks the character of a moment, not the
            identity of every event within it. This is the study of{" "}
            <span className="text-gold-dim">kairos</span> rather than{" "}
            <span className="text-gold-dim">chronos</span>.
          </p>

          {/* Not the total cause */}
          <div className="mt-14 border border-border p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              One layer of the field, not the whole cause
            </p>
            <p className="mt-5 font-serif text-lg leading-relaxed text-bone/90">
              Celestial timing <span className="text-gold">+</span> inherited history{" "}
              <span className="text-gold">+</span> bodily constitution{" "}
              <span className="text-gold">+</span> environment{" "}
              <span className="text-gold">+</span> local Morphaithēr{" "}
              <span className="text-gold">+</span> personal participation{" "}
              <span className="text-gold">+</span> unpredictable contingency
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A natal chart is closer to a set of initial conditions than to a completed destiny.
              The seed holds developmental tendencies; soil, weather, cultivation, injury, and
              choice all shape what the plant becomes.
            </p>
          </div>

          {/* Components */}
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The components and what each does
            </p>
            <div className="mt-6 space-y-px">
              {[
                { k: "Planet", v: "The formative power or operation", q: "what is operating" },
                { k: "Sign", v: "The qualitative manner in which it operates", q: "how it operates" },
                { k: "House", v: "The vessel or domain in which it becomes expressed", q: "where it is embodied" },
                { k: "Aspect", v: "The geometry relating one operation to another", q: "how it combines or conflicts" },
                { k: "Degree", v: "The specific position within the larger pattern", q: "precisely where" },
                { k: "Transit", v: "The changing celestial pressure upon an existing configuration", q: "what is arriving" },
              ].map((r) => (
                <div
                  key={r.k}
                  className="grid gap-1 border-b border-border py-4 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    {r.k}
                  </div>
                  <div className="text-sm leading-relaxed text-muted-foreground">{r.v}</div>
                  <div className="font-serif text-sm italic text-bone/70">{r.q}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              An aspect is not a third force added to two planets. It is the relationship between
              them functioning as a formative condition — which is why the geometry connecting two
              powers can matter as much as the powers themselves.
            </p>
          </div>

          {/* Planets as functions */}
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The planets as formative functions
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { g: "☉", n: "Sun", d: "Centering, coherence, vitality, illumination — the power around which a system organizes itself." },
                { g: "☾", n: "Moon", d: "Reception, memory, habit, embodiment, fluctuation, and the capacity to contain impressions." },
                { g: "☿", n: "Mercury", d: "Translation, mediation, communication, movement, exchange." },
                { g: "♀", n: "Venus", d: "Attraction, affinity, valuation, harmony, combination." },
                { g: "♂", n: "Mars", d: "Separation, assertion, conflict, cutting, directed force." },
                { g: "♃", n: "Jupiter", d: "Expansion, authorization, synthesis, confidence, increase." },
                { g: "♄", n: "Saturn", d: "Boundary, duration, limitation, responsibility, crystallization, consequence." },
                { g: "⛢ ♆ ♇", n: "The Outer Powers", d: "Slower collective processes reorganizing generations, cultures, institutions, and historical fields." },
              ].map((x) => (
                <div key={x.n} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-serif text-lg italic text-bone">{x.n}</div>
                    <div className="shrink-0 text-lg text-gold">{x.g}</div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              None is good or evil in itself. Each becomes constructive or destructive by
              proportion, placement, relationship, and the vessel receiving it.
            </p>
          </div>

          {/* Where it meets the rest of the architecture */}
          <div className="mt-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Where it meets the architecture
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { t: "The Four Ethers", d: "Warmth activates the transit. Light reveals it. Tone arranges its relationships. Life incorporates its consequences. Not four literal substances carrying influence — a model of how a celestial pattern passes from temporal potential into embodied experience." },
                { t: "The Tattvas", d: "Not a rigid one-to-one correspondence. Mars often expresses Tejas, but Mars in a watery sign carries an Apas modification; Saturn is often Prithivi, yet can produce Akashic separation. Astrology arranges the functions; the tattvas colour their force." },
                { t: "The Morphaithēr", d: "The same transit produces different results in different people because it enters different formative atmospheres. A Mars transit meeting a disciplined field becomes courage and focused labour; meeting a volatile one, conflict and recklessness. The celestial quality is received according to the vessel." },
                { t: "The Psychic Flywheel", d: "A transit may add warmth, pressure, or intensity to a pattern already carrying momentum, and push it across a threshold. Celestial timing can raise the pressure; it does not choose the centre around which that pressure revolves." },
                { t: "The Crypt", d: "No transit acts on an empty field. A Saturn passage activates not only an abstract principle but accumulated histories of authority, fear, discipline, and ancestry. The configuration is a key; what it unlocks was deposited earlier." },
                { t: "Nested Fields", d: "Cities, institutions, nations, and movements arise at particular times within larger cycles. Individuals participate in family fields, families in social fields, societies in historical fields — and all within celestial ones." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modes of reading */}
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Modes of reading
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { t: "Transit", d: "The present configuration forming a meaningful relation with the natal one. It does not insert a foreign event; it activates something already in the architecture — warming a dormant tendency, straining a rigid structure, or exposing a contradiction that had stayed hidden." },
                { t: "Progression", d: "Not a force arriving from outside but the original configuration maturing — the inner clock by which latent structures become available for embodiment. The developmental metabolism of the form." },
                { t: "Election", d: "A beginning is a moment when a new vessel is unusually open, and the conditions present can be incorporated into its structure. Not the art of finding a perfect sky — no sky is perfect for everything — but of matching a configuration's dominant tendencies to the nature of the undertaking." },
                { t: "Synastry", d: "Two configurations in sustained relation form a coupled field with a Morphaithēr of its own, irreducible to either person. Repeated interaction accumulates shared habits, symbols, tensions, and attractors until the relationship becomes a formative vessel with its own momentum." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Recurrence is never exact repetition. When a cycle returns it meets a world altered
              by everything that happened during the last one. The geometry may resemble an
              earlier configuration; the vessel is no longer the same.
            </p>
          </div>

          {/* Freedom */}
          <div className="mt-20 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              And freedom
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Freedom is not acting without conditions. It is the capacity to recognize
              conditions, weigh their pressures, and participate consciously in what they become.
              An unconscious Mars activation becomes impulsive conflict; a conscious one becomes
              courage, disciplined separation, or decisive action. The function stays
              recognizable; the level of expression changes.
            </p>
            <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone">
              The chart describes the architecture of pressure and possibility. It does not issue
              an unavoidable command.
            </p>
          </div>

          {/* Definition + placement */}
          <div className="mt-20 border-t border-border pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Defined
            </p>
            <p className="mt-5 max-w-4xl font-serif text-xl leading-relaxed text-bone/90 sm:text-2xl">
              The symbolic and geometrical anatomy of qualitative time — a system for mapping how
              celestial cycles correspond with the activation, relationship, maturation, and
              transformation of formative tendencies within earthly fields.
            </p>
            <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Root Ether", "supplies the common medium"],
                ["The Fourfold Veil", "transduces influence toward embodiment"],
                ["The tattvas", "give force qualitative direction"],
                ["Astrology", "maps the timing and celestial geometry"],
                ["The Morphaithēr", "describes their local mixture"],
                ["The vessel", "determines how they are received"],
                ["The Flywheel", "gives repeated patterns momentum"],
                ["Participation", "helps determine their expression"],
                ["The Crypt", "preserves the consequences after"],
              ].map(([a, b]) => (
                <div key={a} className="border-b border-border py-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                    {a}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              neither an isolated system nor the master key — the celestial clock and geometrical
              calendar of a universe in formation
            </p>
          </div>
        </div>
      </section>

      {/* SUB-TATTVAS */}
      <section id="subtattva" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XVIII · The Compound Qualities
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            Every letter spoken through{" "}
            <span className="italic text-gold">every other</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Almost nothing exists as a pure expression of one tendency. Fire can spread, flow,
            stabilize, or stay latent. Water can turn volatile, heated, spacious, or solid. Each
            primary tattva contains all five within itself — twenty-five compound expressions,
            relational patterns rather than twenty-five occult substances.
          </p>

          {/* Order matters */}
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Apas–Tejas", d: "Apas dominant, Tejas modifying from within. Something primarily cohesive or fluid carrying an intensifying current — passionate attachment, fermentation, heated emotion, a relationship under transformation." },
              { t: "Tejas–Apas", d: "The reverse. Something primarily fiery whose intensity is moderated, contained, and nourished — incubatory warmth, healing heat, controlled passion, fire held in a fluid medium." },
            ].map((x) => (
              <div key={x.t} className="border border-gold/25 p-5">
                <div className="font-serif text-xl italic text-gold">{x.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-serif text-lg italic text-bone/85">
            The order matters. These are not mixtures whose sides are interchangeable.
          </p>

          {/* The 25 */}
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The twenty-five · dominant down, modifier across
            </p>
            <div className="mt-6 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[52rem] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b border-border pb-3 pr-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gold" />
                    {["Akasha", "Vayu", "Tejas", "Apas", "Prithivi"].map((h) => (
                      <th
                        key={h}
                        className="border-b border-border px-3 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Akasha", "Pure openness and resonance", "Communicating or vibrating space", "Luminous, activated possibility", "Receptive or gestational space", "Bounded or structured space"],
                    ["Vayu", "Diffusion through an open field", "Pure movement and variability", "Accelerated, sharp, heated motion", "Circulation, currents, flowing exchange", "Controlled, patterned, mechanical movement"],
                    ["Tejas", "Radiant potential and revelation", "Spreading heat and rapid excitation", "Concentrated ignition and transformation", "Incubatory, digestive, cohesive warmth", "Fixed heat — forging, tempering, crystallization"],
                    ["Apas", "Open receptivity and subtle continuity", "Oscillation, waves, mobile currents", "Fermentation, passion, heated cohesion", "Deep blending, gestation, union", "Condensation, coagulation, organic density"],
                    ["Prithivi", "Porous, resonant, meaning-bearing form", "Flexible structure, embodied movement", "Activated matter, pressure, tempered form", "Nourishing, plastic, organic embodiment", "Maximum fixation, density, boundary, endurance"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <th className="whitespace-nowrap border-b border-border py-4 pr-4 align-top font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                        {row[0]}
                      </th>
                      {row.slice(1).map((cell, i) => (
                        <td
                          key={i}
                          className={`border-b border-border px-3 py-4 align-top text-sm leading-relaxed ${
                            i === ["Akasha", "Vayu", "Tejas", "Apas", "Prithivi"].indexOf(row[0])
                              ? "text-bone/90"
                              : "text-muted-foreground"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              the diagonal is each tendency in its most direct form
            </p>
          </div>

          {/* The arithmetic */}
          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                Why Root Ether is not multiplied
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The sub-tattvas do not sit beside the ethers as twenty-five further layers. They
                configure how each ether operates — so each of the four can be expressed in
                twenty-five ways.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Root Ether is not counted as a fifth ether here — the common source, not one
                more term. § 00·ii XVIII, applied to the ethers.
              </p>
              <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                Root Ether → four differentiated ethers × twenty-five tattvic configurations.
              </p>
            </div>
            <div className="space-y-px">
              {[
                { l: "4 ethers × 25 sub-tattvas", r: "100 operative modes" },
                { l: "× 3 gunic conditions", r: "300 qualified expressions" },
              ].map((x) => (
                <div key={x.l} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">
                    {x.l}
                  </span>
                  <span className="font-serif text-xl italic text-gold">{x.r}</span>
                </div>
              ))}
              <p className="pt-5 text-sm leading-relaxed text-muted-foreground">
                Not three hundred separate substances — three hundred possible analytical
                descriptions. The system gains resolution; it does not fill the invisible world
                with hundreds of independent fluids.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { g: "Sattvic", d: "Tejas–Vayu as rapid insight, intellectual brilliance, decisive clarity." },
                  { g: "Rajasic", d: "Tejas–Vayu as agitation, heated argument, uncontrolled acceleration." },
                  { g: "Tamasic", d: "Tejas–Vayu as frustrated motion, blocked anger, energy trapped in a destructive circuit." },
                ].map((x) => (
                  <div key={x.g} className="border border-border p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                      {x.g}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* In the sky */}
          <div className="mt-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              Read into the chart
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Sign supplies the dominant tattva by its element; planet supplies the interior
              modifier. Functional correspondences, not identities: Sun and Mars to Tejas, Moon
              and Venus to Apas, Mercury to Vayu, Jupiter to Akasha, Saturn to Prithivi.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { p: "Mars in Cancer", c: "Apas–Tejas", d: "A watery, protective, cohesive field carrying a fiery and separating force." },
                { p: "Moon in Aries", c: "Tejas–Apas", d: "A fiery field inwardly modified by feeling, attachment, and memory." },
                { p: "Mercury in Taurus", c: "Prithivi–Vayu", d: "Stable structure containing movement, language, and exchange." },
                { p: "Saturn in Aquarius", c: "Vayu–Prithivi", d: "An airy, conceptual field containing limitation and durability." },
                { p: "Jupiter in Scorpio", c: "Apas–Akasha", d: "Emotional depth and penetration opened toward meaning and hidden possibility." },
              ].map((x) => (
                <div key={x.p} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                    {x.p}
                  </div>
                  <div className="mt-2 font-serif text-lg italic text-gold">{x.c}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  Akasha is not a fifth zodiacal element
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  It needs no separate group of signs to make the numbers align. Within astrology
                  Akasha is the field in which the zodiacal qualities enter relation — visible
                  through the chart's total geometry, the intervals between planets, the opening
                  of possibility. Not absent from the zodiac: the containing field that lets the
                  zodiacal forms communicate. § 00·ii XVIII again, applied to the elements.
                </p>
              </div>
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  A chart is a chord, not a note
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  One note may dominate, another create tension, another hold rhythm, another
                  stay quiet until a transit wakes it. A strongly Tejasic chart may still carry
                  Apas–Prithivi loyalty, Vayu–Tejas sharpness, and Akasha–Apas receptivity. The
                  point is never to label someone a fire type, but to read the composition and
                  proportion of a formative field. A transit does not replace that chord — it
                  modulates it, as heat added to a fixed substance.
                </p>
              </div>
            </div>
          </div>

          {/* Reservoirs + the fear example */}
          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                What places accumulate
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                A Morphaithēr is never one uniform tattvic substance. A room may hold
                Prithivi–Prithivi in its architecture, Apas–Prithivi in its history of attachment,
                Vayu–Akasha in its circulation of ideas, and Tejas–Vayu in an argument occurring
                inside it. Repetition makes a quality easier to reactivate.
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Library", "Vayu–Akasha", "inquiry, communication, openness to knowledge"],
                  ["Kitchen", "Apas–Prithivi", "nourishment, continuity, bodily care, gathering"],
                  ["Courtroom", "Prithivi–Vayu", "structured speech, codified relation, judgment"],
                  ["Battlefield", "Tejas–Prithivi", "violence fixed into landscape, ruin, memory"],
                ].map(([a, b, c]) => (
                  <div key={a} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-border py-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                      {a}
                    </span>
                    <span>
                      <span className="font-serif italic text-gold">{b}</span>
                      <span className="block text-sm leading-relaxed text-muted-foreground">{c}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                How a fear is built
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The flywheel read as sub-tattvic development — possibility, circulation,
                activation, cohesion, fixation.
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Akasha–Vayu", "An open field of uncertain possibility and diffuse mental movement."],
                  ["Vayu–Tejas", "Thought accelerates; the nervous system takes alarm."],
                  ["Tejas–Apas", "Alarm attaches to emotion, memory, and protective instinct."],
                  ["Apas–Prithivi", "The response coagulates into a stable expectation."],
                  ["Prithivi–Prithivi", "Fixed into posture, avoidance, behaviour, identity."],
                ].map(([a, b], i) => (
                  <div key={a} className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-border py-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="font-serif italic text-gold">{a}</span>
                      <span className="block text-sm leading-relaxed text-muted-foreground">{b}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                Transformation reverses the fixation: Warmth loosens it, Light makes it visible,
                Tone establishes new relations, Life integrates a healthier form.
              </p>
            </div>
          </div>

          <p className="mt-20 max-w-4xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            The primary tattvas give five letters. The sub-tattvas show how every letter can be
            spoken through every other — a qualitative alphabet of compound formation.
          </p>
        </div>
      </section>

      {/* DAOIST DYNAMICS */}
      <section id="dao" className="relative border-t border-border py-32">
        <SectionGlyph delay={-110} />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § XIX · The Dynamics of Return
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            道 · How the forces <span className="italic text-gold">move</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Astrology says when a configuration is emphasized. The tattvas say what qualities
            compose it. The ethers say how it becomes embodied. What remained missing was a
            philosophy of circulation, polarity, timing, and noncoercive change — how a force
            moves, alternates, generates its opposite, reaches excess, and returns.
          </p>

          {/* The Dao is not Root Ether */}
          <div className="mt-14 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The Dao is not Root Ether
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Root Ether is the first formative medium <em>within</em> the architecture — the
              field through which relation, transmission, and embodiment become possible. The Dao
              is not a substance, field, energy, or item in the universe at all. It is the
              inexhaustible Way through which all processes arise, and it belongs beyond the
              architecture rather than at the top of it.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/80">
              Keeping them apart protects Root Ether from being inflated into an absolute
              God-substance, while preserving the apophatic depth beyond it. Wuji likewise names
              the <em>absence of polarity</em>; Root Ether names the continuity through which
              polarity can arise. § 00·ii XVIII a third time — now guarding the whole architecture rather
              than a series inside it.
            </p>
          </div>

          {/* 42 */}
          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              道生一 · From the Way to the ten thousand things
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-5">
              {[
                { n: "道", t: "The Dao", d: "The inexhaustible Way, beyond complete definition." },
                { n: "一", t: "The One", d: "Primordial continuity; undivided possibility." },
                { n: "二", t: "The Two", d: "The first polarity — yin and yang." },
                { n: "三", t: "The Three", d: "Polarity joined by the circulating relation between its poles." },
                { n: "萬", t: "Ten Thousand", d: "The innumerable forms produced through differentiated relationship." },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="font-serif text-2xl text-gold">{x.n}</div>
                  <div className="mt-2 font-serif text-base italic text-bone">{x.t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The Three carries the weight. Two poles alone produce separation or deadlock; the
              third — the mediating breath between them — is what makes polarity generative. It is
              not another object set beside the first two but the living relation through which
              they become capable of producing something beyond themselves.{" "}
              <span className="text-gold-dim">This is precisely Mercury's office</span> between
              Sulfur and Salt.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/80">
              Taiji is the moment that gradient becomes polarized movement — and Warmth Ether can
              be read as the etheric carrier of that first Taijic activation.
            </p>
          </div>

          {/* Yin/yang as modes, and qi */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                陰陽 · Not two more tattvas
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Yin and yang are relational modes that qualify every tattva, sub-tattva, ether,
                planet, and process. Neither is good or evil; neither exists absolutely alone.
                Something may be yin relative to one condition and yang relative to another.
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Yang Tejas", "Outwardly radiant, separating, expressive, rapidly heating, combustible."],
                  ["Yin Tejas", "Banked heat — inward digestion, gestational warmth, smouldering intensity, hidden transformative pressure."],
                  ["Yang Apas", "Overflowing current, emotional expression, outward nourishment."],
                  ["Yin Apas", "Interior gestation, retention, absorption, deep attachment."],
                ].map(([a, b]) => (
                  <div key={a} className="border-b border-border py-4">
                    <div className="font-serif italic text-gold">{a}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-bone/80">
                Applied to the twenty-five, this stops the compounds becoming static personality
                labels. An Apas–Tejas configuration is yang when passion is expressed outward, yin
                when the same heat is held as gestation or silent pressure. Every compound quality
                can expand, contract, emerge, withdraw, or return.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                氣 · Qi is not another name for ether
              </p>
              <div className="mt-6 space-y-px">
                {[
                  ["Ether", "the medium"],
                  ["Qi", "the movement through it"],
                  ["Tattva", "the quality of that movement"],
                  ["Form", "the temporary organization it produces"],
                ].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim">{a}</span>
                    <span className="font-serif text-lg italic text-bone/90">{b}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Warmth activates qi; Light gives it orientation; Tone arranges it into ratios and
                rhythms; Life integrates it into a self-maintaining whole. The Morphaithēr is then
                readable as a local ecology of currents — and Daoist language lets it be diagnosed,
                not merely described.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-bone/80">
                A field may hold abundant activity yet circulate poorly. It may be intensely warm
                and unable to convert warmth into light. Strong Prithivi may preserve stability
                while preventing adaptation; excess Vayu may produce continual movement without
                coherence.
              </p>
            </div>
          </div>

          {/* Five Phases */}
          <div className="mt-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              五行 · The Five Phases are not the five tattvas
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              They must not be mapped onto one another merely because both systems have five
              terms. The tattvas describe the <span className="text-gold-dim">composition</span> of
              a force; the Five Phases describe the{" "}
              <span className="text-gold-dim">stage of transformation</span> it is passing through.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-5">
              {[
                { n: "木", t: "Wood", d: "Initiates growth and outward emergence.", ex: "the idea germinates" },
                { n: "火", t: "Fire", d: "Expands and reaches expression.", ex: "it becomes visible and communicative" },
                { n: "土", t: "Earth", d: "Centers, receives, assimilates.", ex: "it is organized into a workable centre" },
                { n: "金", t: "Metal", d: "Contracts, differentiates, defines.", ex: "it is edited and stripped" },
                { n: "水", t: "Water", d: "Descends, stores, dissolves, prepares renewal.", ex: "it rests and seeds the next cycle" },
              ].map((x) => (
                <div key={x.t} className="group border border-border p-4 transition-colors hover:border-gold/40">
                  <div className="font-serif text-2xl text-gold">{x.n}</div>
                  <div className="mt-2 font-serif text-base italic text-bone">{x.t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                  <p className="mt-3 border-t border-border pt-2 text-sm italic leading-relaxed text-bone/60">
                    {x.ex}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  The generating cycle
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Each phase prepares the next. Growth fuels expression; expression yields what can
                  be assimilated; assimilation yields defined structure; contraction returns
                  substance to storage; storage nourishes new growth.
                </p>
              </div>
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  The regulating cycle
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Each movement limits another so no phase becomes absolute. Regulation is not
                  hostility but the system's way of holding proportion — which is why constraint can
                  preserve life rather than merely oppose it, and how integral coherence differs
                  from parasitic.
                </p>
              </div>
            </div>
          </div>

          {/* Emptiness, wu wei, ziran, de */}
          <div className="mt-20 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Emptiness · 虛", d: "A vessel is thrown from clay, but its usefulness is the space within. Salt gives the vessel its boundary and Prithivi its durability — Akasha gives it interior capacity. A vessel without walls cannot contain; one without opening cannot receive.", q: "Boundary creates identity, but emptiness creates usefulness." },
              { t: "Wu wei · 無為", d: "Not inaction. Action that cooperates with the actual configuration of the field: studying its gradients, timings, channels, and thresholds, then intervening where a small action can redirect a larger movement. Ignore the field and impose form by will, and enormous force is wasted.", q: "The art of minimum coercion and maximum alignment." },
              { t: "Ziran · 自然", d: "Self-so-ness. A limit on externally imposed formation: sometimes the task is not to determine the finished form in advance but to establish conditions and let the inherent telos emerge. A gardener cannot make a seed grow by pulling it.", q: "Self-expression once unnecessary obstruction is removed." },
              { t: "De · 德", d: "Not moral obedience but realized coherence — the efficacy a being holds when its inner organization accords with its own nature and its place in the larger field. A tree shows De by growing according to its nature while participating in soil, season, and ecosystem.", q: "Power arising from right relationship rather than domination." },
            ].map((x) => (
              <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                <p className="mt-4 border-t border-border pt-3 font-serif italic text-gold/90">{x.q}</p>
              </div>
            ))}
          </div>

          {/* Reversal */}
          <div className="mt-16 border-l border-gold/40 pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              反 · The Law of Reversal
            </p>
            <p className="mt-5 max-w-3xl font-serif text-2xl italic leading-relaxed text-bone">
              A force carried beyond its proportion begins to generate the conditions of its own
              transformation into another state.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Excessive heat consumes its fuel and produces exhaustion. Extreme rigidity turns
              brittle. Unlimited expansion disperses the centre that sustained it. Total
              contraction generates the pressure for release. Not that every event flips into its
              opposite — that no expressed tendency stands outside the field's larger
              compensations.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/80">
              Water is the image of this intelligence: it yields without becoming powerless, enters
              low places, conforms to the vessel, circulates around obstacles, and gradually
              reshapes what looks harder than itself. Not Apas alone — Apas supplies cohesion and
              receptivity; Daoist water shows those qualities becoming a strategy of action.
              Mercury moving through an Apas-dominant field under the discipline of wu wei.
            </p>
          </div>

          {/* Internal alchemy */}
          <div className="mt-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              內丹 · The furnace and the cauldron
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { n: "精 · Jing", t: "Essence", d: "Stored and embodied potential. Resonates with Salt, Prithivi, inheritance, the bodily reservoir." },
                { n: "氣 · Qi", t: "Breath", d: "Mobilized, circulating formative activity. Resonates with Mercury, Vayu, Warmth Ether." },
                { n: "神 · Shen", t: "Spirit", d: "Luminous awareness, intelligibility, governing presence. Resonates with Light Ether and the Inner Sun." },
              ].map((x) => (
                <div key={x.n} className="group border border-border p-5 transition-colors hover:border-gold/40">
                  <div className="font-serif text-xl text-gold">{x.n}</div>
                  <div className="mt-2 font-serif text-lg italic text-bone">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Correspondences, not translations — the Daoist terms keep their own historical
              meaning rather than becoming new names for Western principles. The refinement of
              dense potential into circulation, and circulation into luminous awareness, closes by
              returning toward emptiness, which is what stops luminous consciousness hardening into
              one more ego-form.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  Furnace and cauldron
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  The furnace is the regulated production of warmth; the cauldron the vessel that
                  contains transformation. A furnace without a cauldron disperses heat; a cauldron
                  without a furnace stays inert. Too much fire burns the contents, too little fails
                  to transform them. Warmth is not valuable for being intense — it must be timed,
                  contained, circulated, and proportioned to its material.
                </p>
              </div>
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  Fire and Water
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Fire without Water rises, scatters, consumes. Water without Fire sinks, congeals,
                  lies dormant. The aim is never Fire's victory but a vessel in which rising warmth
                  and descending receptivity continually renew one another — the Inner Sun not as a
                  solitary blaze but as the central regulator of ascending and descending currents.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-20 max-w-4xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            The universe is not merely built. It is continually balancing, circulating, emptying,
            filling, transforming, and returning.
          </p>
        </div>
      </section>

      {/* THE SEVEN BOOKS */}
      <section id="books" className="relative border-t border-border py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § XV · The Series
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Seven books, <span className="italic text-gold">one arc</span>
              </h2>
              <p className="mt-8 font-serif text-sm leading-relaxed text-muted-foreground">
                Principle → Field → Pattern → Cosmos → Body → Symbol → Transformation.
              </p>
            </div>
            <ol className="space-y-6">
              {[
                { n: "I", title: "The Architecture of Hidden Forces", note: "First principles: Source, Spirit, Essence, Virtue, Force, Form — and the axiom that form is frozen force." },
                { n: "II", title: "Root Ether and the Fourfold Field", note: "The living medium of formation: Root Ether, the etheric tides, the gunas, tattvas, elements, and the subtle field beneath manifestation." },
                { n: "III", title: "Logos, Number, and the Birth of Form", note: "Measure, pattern, number, geometry, element, vessel, and configuration — the principles by which force becomes structured." },
                { n: "IV", title: "The Celestial Anatomy of Force", note: "Astrology, lunar mansions, planetary virtues, celestial timing, and the cosmic ordering of hidden forces." },
                { n: "V", title: "The Living Vessel", note: "The architecture brought into the body: chakras, meridians, nadis, breath, organs, subtle anatomy — the human being as microcosm." },
                { n: "VI", title: "The Language of Signatures", note: "Trace, imprint, symbol, correspondence, signatures — plants, metals, stones, colors, sounds, and the doctrine of scale." },
                { n: "VII", title: "The Art of Right Relation", note: "Distortion, purification, participation, metamorphōsis, theurgy — and fulfilled actualization: force returned to essence, essence returned to Source." },
              ].map((b) => (
                <li
                  key={b.n}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6 border-b border-border pb-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-dim">
                    Book {b.n}
                  </div>
                  <div>
                    <div className="font-serif text-xl italic text-bone sm:text-2xl">
                      {b.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {b.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* GROUNDS */}
      <section id="grounds" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            § Grounds · Why the Structure Holds
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight">
            A process-relational <span className="italic text-gold">reading</span>
          </h2>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The preceding sections state the architecture. This one argues for it. None of what
            follows proves the whole structure; each shows that its central logic is neither
            arbitrary nor internally incoherent. Reality is composed not primarily of isolated
            things, but of processes, relations, constraints, and recurring organizations that
            temporarily appear as things.
          </p>

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Form is an achievement", d: "Perception presents formed objects first, but every one is the end of an immense developmental process. A tree presupposes soil, climate, inheritance, cellular organization, and a history of prior life." },
              { t: "Relations can precede things", d: "A heart removed from the organism is no longer functioning as a heart. A word removed from its language loses its meaning. A note changes function with the chord around it. Relational fields participate in determining what things are." },
              { t: "Stabilized process avoids dualism", d: "If matter is relatively stabilized activity, spirit and matter need not be unrelated substances. The subtle need not be nonexistent; the material need not be spiritually dead." },
              { t: "Formation requires constraint", d: "To become a triangle, a figure cannot remain every possible figure. A river gains direction through its banks; electricity becomes useful through a circuit; language becomes meaningful through grammar. Limitation is what allows force to become articulate." },
              { t: "Geometry is the trace of constraint", d: "A circle may be drawn in ink, carved in stone, or held in mind. Its material changes; its proportional logic remains. Number and geometry express relational principles, not ghostly objects." },
              { t: "Symmetry breaking births difference", d: "A perfectly uniform field contains no privileged direction, center, or boundary. Manifestation requires that difference arise within unity. Creation is the generation of meaningful difference, not merely the production of matter." },
              { t: "The vessel is causally decisive", d: "The same water assumes the shape of its container; the same light through different lenses yields different images; the same idea in different persons becomes different work. Transformation depends on the condition of the vessel, not only on what enters it." },
              { t: "Causation can be layered", d: "A person lifting a cup can be described through muscular contraction, nervous activity, intention, habit, and purpose. These do not cancel one another — they describe one act at different organizational levels." },
              { t: "Correspondence is structural recurrence", d: "“As above, so below” does not mean each level copies another. Similar relational structures recur at different scales. The heart is not the sun, but both occupy central distributive roles. Valid correspondence preserves function; weak correspondence rests on resemblance." },
              { t: "Participation without omnipotence", d: "Attention, interpretation, and action alter what becomes actual — yet no isolated person creates the universe by believing. Theurgy is the art of increasing the coherence and reach of participation, not of pretending resistance is imaginary." },
              { t: "Higher order includes the lower", d: "A mind without bodily regulation destabilizes; aspiration without emotional integration becomes fantasy. Higher orders do not discard lower ones — they coordinate and transfigure them." },
              { t: "Continuous but not homogeneous", d: "One ocean contains currents, layers, vortices, and ecosystems. Continuity permits interaction; differentiation permits identity. The system affirms both unity and plurality." },
            ].map((x) => (
              <div key={x.t} className="group border border-border p-5 transition-colors hover:border-gold/40">
                <div className="font-serif text-lg italic text-bone">{x.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-14 max-w-3xl border-l border-gold/40 pl-8 font-serif text-2xl italic leading-relaxed text-bone">
            Stability is not the absence of change. It is successfully regulated change.
          </p>
        </div>
      </section>

      {/* LINEAGE */}
      <section className="relative border-t border-border py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                § XVI · Lineage
              </p>
              <h2 className="mt-6 font-serif text-4xl leading-tight">
                Gathered, but <span className="italic text-gold">not repeated</span>
              </h2>
            </div>
            <div className="space-y-6">
              {[
                { from: "The Presocratics", what: "The search for archē — the first principle from which all things arise." },
                { from: "Empedocles", what: "The four elemental roots: fire, air, water, and earth as the alphabet of embodiment." },
                { from: "Plato", what: "Visible forms participate in invisible principles — the eidē through which becoming is intelligible." },
                { from: "Aristotle", what: "Ousia, dynamis, energeia, morphē, hylē — the passage from potency to actuality that structures every being." },
                { from: "The Stoics", what: "Pneuma and cosmic sympatheia — the living tension and affinity that binds the kosmos together." },
                { from: "Neoplatonism", what: "To Hen, proodos, and epistrophē — the One, procession into multiplicity, and contemplative return." },
                { from: "Hermeticism", what: "The living cosmos of analogy and correspondence — microcosm and macrocosm bound in kinship." },
                { from: "Paracelsian Signatures", what: "Visible marks of inward virtue — the outer writing of essence upon nature." },
                { from: "Alchemy", what: "Solve et coagula — transformation as elemental reconfiguration and the release of hidden virtue in matter." },
              ].map((row) => (
                <div
                  key={row.from}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border pb-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dim sm:text-xs">
                    {row.from}
                  </div>
                  <p className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1 sm:text-base">
                    {row.what}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE UNIFIED FORMULA */}
      <section id="unified" className="relative border-t border-border py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            The Unified Formula
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-tight">
            The architecture in <span className="italic text-gold">eight movements</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Root Ether, the Fourfold Veil, the tattvas, the elements, geometry, the alchemical
            triad, the Morphaithēr, the Flywheel, the Crypt, and the Ossuary are not disconnected
            inventions. Each describes a phase of one continuous metaphysics of formation.
          </p>

          <div className="mx-auto mt-14 max-w-3xl space-y-px text-left">
            {[
              "Possibility becomes qualitative tendency.",
              "Qualitative tendency directs force.",
              "Force enters relation.",
              "Relation is measured into pattern.",
              "Pattern is stabilized within a vessel.",
              "The vessel participates in a larger field.",
              "Repetition deepens the pattern into memory.",
              "Dissolution releases the vessel’s contents and consequences back into the conditions of future formation.",
            ].map((line, i) => (
              <div
                key={i}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-border py-5 transition-colors hover:border-gold/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-lg leading-relaxed text-bone/90 sm:text-xl">
                  {line}
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
              The same arc at higher resolution
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The eight movements above name the arc. Read through the laws of maintenance,
              the same arc resolves into ten.
            </p>
            <div className="mt-8 space-y-px">
              {[
                "The field offers possibility.",
                "Tattvic biases give possibility direction.",
                "Boundaries select what can enter.",
                "The ethers transduce influence between levels.",
                "Measure organizes force into pattern.",
                "Metabolism maintains the pattern through exchange.",
                "Repetition deepens it into formative inertia.",
                "Thresholds permit sudden reorganization.",
                "Telos draws the form toward greater integration.",
                "Dissolution releases its contents, while the Crypt preserves the changes its existence made to the field.",
              ].map((line, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-border py-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-base leading-relaxed text-bone/85 sm:text-lg">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            and the field is altered for what comes after
          </p>
        </div>
      </section>

      {/* FINAL FORMULA */}
      <section id="formula" className="relative isolate overflow-hidden border-t border-border py-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-[0.18]"
            width="1300"
            height="1300"
            viewBox="-650 -650 1300 1300"
            aria-hidden
          >
            <circle r="620" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="460" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            <circle r="300" fill="none" stroke="oklch(0.78 0.13 75)" strokeWidth="0.4" />
            {all.map((p, i) => {
              const a = (i * Math.PI * 2) / all.length - Math.PI / 2;
              return (
                <text
                  key={p.latin}
                  x={Math.cos(a) * 560}
                  y={Math.sin(a) * 560}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="EB Garamond, serif"
                  fontSize="22"
                  fontStyle="italic"
                  fill="oklch(0.78 0.13 75 / 0.6)"
                  transform={`rotate(${(i * 360) / all.length + 90} ${Math.cos(a) * 560} ${Math.sin(a) * 560})`}
                >
                  {p.greek}
                </text>
              );
            })}
          </svg>
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
            Μεταμόρφωσις · The Final Formula
          </p>
          <div className="mt-12 space-y-4 font-serif text-lg italic leading-relaxed text-bone/85 sm:text-xl md:text-2xl">
            <p>Source emanates Spirit.</p>
            <p>Spirit animates Essence.</p>
            <p>Essence bears Virtue.</p>
            <p>Virtue becomes Force.</p>
            <p>Force moves through Root Ether.</p>
            <p>Root Ether differentiates through Polarity.</p>
            <p>Polarity requires Limit.</p>
            <p>Limit is harmonized by Measure.</p>
            <p>Measure gives rise to Pattern.</p>
            <p>Pattern prepares the Vessel.</p>
            <p>The Vessel stabilizes Force as Form.</p>
            <p>Form bears Trace.</p>
            <p>Trace becomes Signature.</p>
            <p>Signature opens Symbol.</p>
            <p>Symbol reveals Correspondence.</p>
            <p>Correspondence awakens Soul.</p>
            <p>Soul participates through Image and Imagination.</p>
            <p>Imagination prepares Theurgy.</p>
            <p>Theurgy restores Right Relation.</p>
            <p>Right Relation enables Transformation.</p>
            <p>
              Transformation returns Force toward fulfilled Essence,{" "}
              <span className="not-italic text-gold">and, through Essence, back toward Source</span>.
            </p>
          </div>

          <div className="mx-auto mt-20 h-px w-24 bg-gold/50" />
          <p className="mt-12 font-serif text-xl italic text-bone/80 sm:text-2xl">
            The visible is not the opposite of the invisible.
            <br />
            The visible is the invisible <span className="text-gold">brought to rest</span>.
          </p>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Ω · Kosmos — an ordered beauty — an architecture of hidden forces
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-void py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 sm:flex sm:justify-between">
          <div className="min-w-0 truncate font-serif text-sm italic text-muted-foreground">
            The Architecture of Hidden Forces
          </div>
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.4em] text-gold-dim">
            MMXXVI
          </div>
        </div>
      </footer>
    </div>
  );
}
