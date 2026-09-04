/**
 * The colour maths the Flashing Colours instrument runs on, and the Golden
 * Dawn's own tables as this site renders them.
 *
 * One decision governs everything here. "Flashing" colours are complements on
 * the painter's wheel — the red–yellow–blue wheel a nineteenth-century adept
 * mixed pigment on — and not the complements a screen produces by inverting
 * RGB. On the painter's wheel red faces green, blue faces orange and yellow
 * faces violet, which are the pairs the Order actually used; invert red in RGB
 * and you get cyan, which is not a pair anyone painted. So the wheel below is
 * built from twelve pigment anchors — the red–yellow–blue wheel in twelve
 * steps, which is exactly what the King scale of the signs is — and every
 * complement on the page is read across it.
 *
 * The hexes attached to the colour names are this site's renderings of words
 * like "amber" and "russet". The originals were pigment on card, editions of
 * the tables disagree about wording, and no screen value is authoritative.
 */

export type RGB = [number, number, number];

// ── conversions ────────────────────────────────────────────────────────────

export const clamp = (v: number, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);

export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export const rgbToHex = ([r, g, b]: RGB) =>
  "#" + [r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("");

export function rgbToHsl([r, g, b]: RGB): [number, number, number] {
  const R = r / 255, G = g / 255, B = b / 255;
  const max = Math.max(R, G, B), min = Math.min(R, G, B), d = max - min;
  const l = (max + min) / 2;
  if (!d) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h =
    max === R ? 60 * (((G - B) / d) % 6) : max === G ? 60 * ((B - R) / d + 2) : 60 * ((R - G) / d + 4);
  return [(h + 360) % 360, s, l];
}

export function hslToRgb([h, s, l]: [number, number, number]): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const [r, g, b] =
    hp < 1 ? [c, x, 0] : hp < 2 ? [x, c, 0] : hp < 3 ? [0, c, x] : hp < 4 ? [0, x, c] : hp < 5 ? [x, 0, c] : [c, 0, x];
  const m = l - c / 2;
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

// ── the painter's wheel ────────────────────────────────────────────────────

/**
 * The twelve anchors of the painter's wheel, in the Order's own colour names
 * for the King scale of the signs. They are set as saturated pigment colours
 * rather than derived by mixing through the RYB cube, because that mixture
 * runs through the cube's white corner and comes out chalky — a wheel of
 * pastels, which is not what anyone painted an implement in.
 */
const ANCHORS: { a: number; hex: string }[] = [
  { a: 0, hex: "#e01b24" }, // scarlet
  { a: 30, hex: "#e8531d" }, // red-orange
  { a: 60, hex: "#ee7f12" }, // orange
  { a: 90, hex: "#efa80b" }, // amber
  { a: 120, hex: "#dfd016" }, // greenish yellow
  { a: 150, hex: "#9dbe1e" }, // yellowish green
  { a: 180, hex: "#17a05b" }, // emerald green
  { a: 210, hex: "#12938d" }, // green-blue
  { a: 240, hex: "#1e5fc0" }, // blue
  { a: 270, hex: "#3a3597" }, // indigo
  { a: 300, hex: "#7b34a8" }, // violet
  { a: 330, hex: "#c21d63" }, // crimson
];

/**
 * The wheel itself: the twelve anchors, interpolated between neighbours, so
 * that every colour stands opposite the one a painter would call its
 * complement — red against green, blue against orange, yellow against violet.
 */
export function wheelRgb(angle: number): RGB {
  const a = ((angle % 360) + 360) % 360;
  const i = Math.floor(a / 30) % 12;
  const t = (a % 30) / 30;
  const c0 = hexToRgb(ANCHORS[i].hex);
  const c1 = hexToRgb(ANCHORS[(i + 1) % 12].hex);
  return [0, 1, 2].map((k) => c0[k] * (1 - t) + c1[k] * t) as RGB;
}

export const wheelHex = (angle: number) => rgbToHex(wheelRgb(angle));

// The inverse: which angle of the painter's wheel a given colour sits at. The
// wheel is sampled once and the nearest hue wins, which is exact enough for a
// figure whose whole point is that the eye, not the arithmetic, does the work.
const SAMPLES: { a: number; h: number }[] = Array.from({ length: 360 }, (_, a) => ({
  a,
  h: rgbToHsl(wheelRgb(a))[0],
}));

export function wheelAngleOf(hex: string): number {
  const [h, s] = rgbToHsl(hexToRgb(hex));
  if (s < 0.06) return NaN; // a neutral has no place on the wheel
  let best = 0, bestD = Infinity;
  for (const smp of SAMPLES) {
    const d = Math.abs(((smp.h - h + 540) % 360) - 180);
    if (d < bestD) { bestD = d; best = smp.a; }
  }
  return best;
}

/**
 * The flashing partner of a colour: the wheel's opposite, carrying the
 * original's saturation and a lightness reflected about the middle, so a deep
 * colour flashes against a light one as pigment does.
 */
export function flashOf(hex: string): string {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  if (Number.isNaN(wheelAngleOf(hex))) {
    // Neutrals flash against their own opposite end: white against black.
    return rgbToHex(hslToRgb([h, 0, l > 0.5 ? clamp(0.06 + (1 - l) * 0.3) : clamp(0.94 - l * 0.3)]));
  }
  const opp = wheelRgb(wheelAngleOf(hex) + 180);
  const [oh, os, ol] = rgbToHsl(opp);
  // The partner keeps the wheel's own pigment, leaning light against a dark
  // colour and dark against a light one so the pair reads as paint on card.
  const lightness = clamp(ol + (0.5 - l) * 0.45, 0.16, 0.86);
  return rgbToHex(hslToRgb([oh, clamp(Math.max(os, s) * 0.95, 0.25, 1), lightness]));
}

/** WCAG relative luminance, used to say how far apart a pair stands in light. */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const contrastRatio = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** How near two colours stand to being one another's flash, 0 to 1. */
export function flashStrength(a: string, b: string): number {
  const aa = wheelAngleOf(a), bb = wheelAngleOf(b);
  if (Number.isNaN(aa) || Number.isNaN(bb)) return 0;
  const apart = Math.abs(((aa - bb + 540) % 360) - 180); // 180 = opposite
  const hue = clamp(1 - Math.abs(180 - apart) / 90);
  const [, sa] = rgbToHsl(hexToRgb(a));
  const [, sb] = rgbToHsl(hexToRgb(b));
  // The shimmer needs saturation on both sides and no great gulf of lightness.
  const lightGap = Math.abs(luminance(a) - luminance(b));
  return clamp(hue * Math.min(sa, sb) * (1 - clamp(lightGap * 1.15)));
}

// ── the tables ─────────────────────────────────────────────────────────────

export type Named = { name: string; hex: string };

/**
 * The King scale of the twelve signs is the wheel in twelve steps from Aries.
 * The names are the Order's; the hexes are the wheel's own, which is the
 * honest way to draw a scale that was defined as the spectrum divided by
 * twelve.
 */
export const ZODIAC: { sign: string; name: string; hex: string; angle: number }[] = [
  ["Aries", "scarlet"], ["Taurus", "red-orange"], ["Gemini", "orange"], ["Cancer", "amber"],
  ["Leo", "greenish yellow"], ["Virgo", "yellowish green"], ["Libra", "emerald green"],
  ["Scorpio", "green-blue"], ["Sagittarius", "blue"], ["Capricorn", "indigo"],
  ["Aquarius", "violet"], ["Pisces", "crimson"],
].map(([sign, name], i) => ({ sign, name, angle: i * 30, hex: wheelHex(i * 30) }));

/** The four worlds, and the letter of the Name each answers to. */
export const WORLDS = [
  { k: "King", world: "Atziluth", letter: "י", gloss: "emanation — the colour as pure impulse" },
  { k: "Queen", world: "Briah", letter: "ה", gloss: "creation — the colour as received light" },
  { k: "Emperor", world: "Yetzirah", letter: "ו", gloss: "formation — the colour as it takes shape" },
  { k: "Empress", world: "Assiah", letter: "ה", gloss: "action — the colour as it is embodied, and flecked" },
] as const;

export type Sephirah = {
  n: number;
  name: string;
  /** King, Queen, Emperor, Empress */
  scales: [Named, Named, Named, Named];
  /** Malkuth is painted in four colours at once, so it is drawn quartered. */
  quarters?: string[];
};

/**
 * The ten sephiroth in the four scales, following the tables printed in
 * Crowley's 777 and in Regardie's edition of the Golden Dawn papers. Wording
 * differs slightly between printings; where it does, the commoner form is set.
 */
export const SEPHIROTH: Sephirah[] = [
  { n: 1, name: "Kether", scales: [
    { name: "brilliance", hex: "#f7f4ea" }, { name: "white brilliance", hex: "#ffffff" },
    { name: "white brilliance", hex: "#f6f6f4" }, { name: "white, flecked gold", hex: "#f2ead2" }] },
  { n: 2, name: "Chokmah", scales: [
    { name: "pure soft blue", hex: "#a8c8e8" }, { name: "grey", hex: "#8d8d8f" },
    { name: "blue pearl grey", hex: "#b9c2c9" }, { name: "white, flecked red, blue and yellow", hex: "#efe7dd" }] },
  { n: 3, name: "Binah", scales: [
    { name: "crimson", hex: "#9b1436" }, { name: "black", hex: "#0d0d0f" },
    { name: "dark brown", hex: "#3b2a20" }, { name: "grey, flecked pink", hex: "#8f8184" }] },
  { n: 4, name: "Chesed", scales: [
    { name: "deep violet", hex: "#4b2a8c" }, { name: "blue", hex: "#1f5fc4" },
    { name: "deep purple", hex: "#452a6b" }, { name: "deep azure, flecked yellow", hex: "#1e6fae" }] },
  { n: 5, name: "Geburah", scales: [
    { name: "orange", hex: "#e2711d" }, { name: "scarlet red", hex: "#cf2029" },
    { name: "bright scarlet", hex: "#e03227" }, { name: "red, flecked black", hex: "#8f1f1c" }] },
  { n: 6, name: "Tiphareth", scales: [
    { name: "clear pink rose", hex: "#f2a5b5" }, { name: "yellow", hex: "#f2c230" },
    { name: "rich salmon", hex: "#f08a5d" }, { name: "golden amber", hex: "#d99b1c" }] },
  { n: 7, name: "Netzach", scales: [
    { name: "amber", hex: "#e6a413" }, { name: "emerald", hex: "#0f9d58" },
    { name: "bright yellow-green", hex: "#8dc63f" }, { name: "olive, flecked gold", hex: "#6b7a2a" }] },
  { n: 8, name: "Hod", scales: [
    { name: "violet purple", hex: "#6b3fa0" }, { name: "orange", hex: "#ef7d18" },
    { name: "red-russet", hex: "#9c4a2a" }, { name: "yellow-brown, flecked white", hex: "#7d6231" }] },
  { n: 9, name: "Yesod", scales: [
    { name: "indigo", hex: "#31307e" }, { name: "violet", hex: "#7b3fa0" },
    { name: "very dark purple", hex: "#2c1b45" }, { name: "citrine, flecked azure", hex: "#9aa03a" }] },
  { n: 10, name: "Malkuth", scales: [
    { name: "yellow", hex: "#e8c73a" }, { name: "citrine, olive, russet, black", hex: "#7c7a2e" },
    { name: "citrine, olive, russet, black, flecked gold", hex: "#6f6a34" },
    { name: "black rayed with yellow", hex: "#1a1a12" }],
    quarters: ["#a8a13a", "#5c6b2a", "#7a3f22", "#121212"] },
];

/** The elements as the Order painted them, and the fifth that is no colour. */
export const ELEMENTS: (Named & { k: string })[] = [
  { k: "Fire", name: "red", hex: "#d0201f" },
  { k: "Water", name: "blue", hex: "#1f4fb5" },
  { k: "Air", name: "yellow", hex: "#eccb27" },
  { k: "Earth", name: "black, and the four earth colours", hex: "#141414" },
  { k: "Spirit", name: "white", hex: "#f4f2ea" },
];

/** The canonical pairs the Order named, before any arithmetic. */
export const CANONICAL_PAIRS: [string, string][] = [
  ["red", "green"], ["blue", "orange"], ["yellow", "violet"], ["white", "black"],
];
