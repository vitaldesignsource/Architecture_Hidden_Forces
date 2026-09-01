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

  const SERIF = "'EB Garamond', Georgia, 'Times New Roman', serif";
  const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

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
  const daat = { x: MID, y: 204 };

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
          Ten sefirot on three pillars — Severity on the left, Equilibrium in the centre, Mercy
          on the right — joined by the twenty-two paths. Da&apos;at appears hollow on the middle
          pillar as a non-sefirah, and the lightning flash of descent traces the order of
          emanation from Keter down to Malchut.
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

        {/* Ein Sof — the light above the Crown */}
        <ellipse cx={MID} cy="30" rx="98" ry="64" fill="url(#aolt-crown)" />

        {/* Three veils of negative existence */}
        <g fill="none" stroke="var(--gold)" strokeWidth="0.5" strokeLinecap="round">
          {[42, 52, 62].map((r, i) => (
            <path
              key={r}
              d={veil(r)}
              strokeOpacity="0.55"
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
          strokeOpacity="0.22"
          strokeWidth="0.5"
          strokeDasharray="1 6"
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
            y={daat.y + 41}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="6"
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
          const ignite = `${(0.5 + i * 0.85).toFixed(2)}s`;
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
                fontSize="8"
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
                y={n.y + 43}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="6.6"
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
          fontSize="6.2"
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
          <div className="hidden shrink-0 items-center gap-5 font-mono text-[10px] uppercase tracking-[0.25em] lg:flex xl:gap-7">
            {[
              { id: "spine", label: "Spine" },
              { id: "descent", label: "Descent" },
              { id: "fourfold", label: "Ethers" },
              { id: "morphaither", label: "Morphaithēr" },
              { id: "return", label: "Return" },
              { id: "kabbalah", label: "Kabbalah" },
              { id: "extended", label: "Powers" },
              { id: "triad", label: "Triad" },
              { id: "books", label: "Books" },
              { id: "formula", label: "Formula" },
            ].map((l) => (
              <a key={l.id} href={`#${l.id}`} className="transition-colors hover:text-gold">
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden shrink-0 gap-6 font-mono text-[10px] uppercase tracking-[0.25em] sm:flex lg:hidden">
            {[
              { id: "spine", label: "Spine" },
              { id: "descent", label: "Descent" },
              { id: "return", label: "Return" },
              { id: "kabbalah", label: "Kabbalah" },
              { id: "formula", label: "Formula" },
            ].map((l) => (
              <a key={l.id} href={`#${l.id}`} className="transition-colors hover:text-gold">
                {l.label}
              </a>
            ))}
          </div>
          <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim sm:hidden">
            XVIII
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
            Seventeen <span className="italic text-gold">commitments</span>
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
              { n: "XV", t: "Coherence Exceeds Intensity", d: "A weaker force organized around a stable center accomplishes more than a stronger force internally divided. Contradiction produces friction and dissipation." },
              { n: "XVI", t: "Theurgy Is Alignment, Not Domination", d: "The highest operation is not forcing the cosmos to obey an isolated personality, but reorganizing the person into a vessel able to participate in a greater order." },
              { n: "XVII", t: "Symbols Are Maps of Functions", d: "Kabbalah, tattva doctrine, alchemy, and geometry describe reality from different angles. They integrate where their functions genuinely correspond — complementary instruments, not interchangeable labels." },
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
          <div className="mt-28 border-t border-border pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Κύκλος · The Living Circuit
            </p>
            <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-tight text-bone/85 sm:text-3xl">
              “The interval is as important as the <span className="text-gold">note</span>.”
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Read downward — and read the gaps. Each ether is set out with its measure: deficiency
              on one side, excess on the other, the named virtue between. Warmth’s measure is not
              named in this section, and is not supplied here.
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
                title: "Activation",
                fn: "The function by which possibility ceases to be merely possible. Warmth makes potential active, makes formation active, and releases power.",
                quote: "",
                lines: [
                  "Warmth is the quickening — the moment latent virtue becomes operative activity.",
                  "It supplies force, not orientation. What Warmth releases, Light must articulate as direction.",
                ],
                deficiency: "",
                virtue: "",
                gloss: "",
                excess: "",
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
                <article className="group border border-border p-6 transition-colors hover:border-gold/40 sm:p-10">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-12">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                        {e.n} · {e.english}
                      </p>
                      <h3 className="mt-4 font-serif text-4xl leading-none text-bone sm:text-5xl">
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
                      <p className="mt-5 font-serif text-lg leading-relaxed text-bone/85 sm:text-xl">
                        {e.fn}
                      </p>
                      {e.quote ? (
                        <p className="mt-6 border-l border-gold/40 pl-6 font-serif text-lg italic leading-relaxed text-bone/90">
                          “{e.quote}”
                        </p>
                      ) : null}
                      <div className="mt-6 space-y-3">
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
                    <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
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
                  ) : (
                    <div className="mt-10 border-t border-dashed border-gold/30 pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                        Μεσότης · Virtue — forthcoming
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        This section does not name Warmth’s virtue, nor its excess or deficiency.
                        That measure belongs to the treatment of Warmth itself. The slot is held
                        open rather than filled.
                      </p>
                    </div>
                  )}
                </article>

                {i < 3 ? (
                  <div className="flex flex-col items-center px-2 py-10 text-center">
                    <span className="h-10 w-px bg-gradient-to-b from-transparent to-gold/50" />
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                      Διάστημα {["I", "II", "III"][i]} · {e.greek}{" "}
                      <span className="text-gold">→</span> {e.into.to}
                    </p>
                    <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-bone/85">
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
