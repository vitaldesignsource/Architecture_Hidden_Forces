#!/usr/bin/env node
/**
 * The scripts the site sets, served as subsets.
 *
 * The volumes quote in Egyptian hieroglyphs, cuneiform, Hebrew, Arabic,
 * Devanagari, Coptic, Tibetan, Avestan and Chinese. Almost none of those have a
 * font on an ordinary phone — macOS and iOS ship nothing for hieroglyphs or
 * cuneiform, and an unfonted run renders as nothing at all — while a full Noto
 * face runs from hundreds of kilobytes to ten megabytes. So each script is
 * served as a subset holding exactly the characters the source actually uses.
 *
 *   npm run fonts        rebuild every subset under public/fonts
 *
 * The character list is read from the source itself: every file under src is
 * scanned for characters in each script's Unicode ranges, and for `U+XXXXX`
 * codepoint literals, so a term added to a page is covered by the next run and
 * nothing is carried that no page sets. Needs python3 with fontTools and brotli
 * (pip install fonttools brotli); the upstream faces are fetched once from the
 * google/fonts repository and cached under node_modules.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cache = join(root, "node_modules/.cache/phos-fonts");
const outDir = join(root, "public/fonts");

/** family: the CSS family name declared in styles.css; ranges: what to keep. */
const SCRIPTS = [
  { key: "hieroglyphs", family: "Noto Sans Egyptian Hieroglyphs", file: "NotoSansEgyptianHieroglyphs-Regular.ttf",
    url: "ofl/notosansegyptianhieroglyphs/NotoSansEgyptianHieroglyphs-Regular.ttf",
    ranges: [[0x13000, 0x1342f]] },
  { key: "cuneiform", family: "Noto Sans Cuneiform", file: "NotoSansCuneiform-Regular.ttf",
    url: "ofl/notosanscuneiform/NotoSansCuneiform-Regular.ttf",
    ranges: [[0x12000, 0x123ff], [0x12400, 0x1247f]] },
  { key: "hebrew", family: "Noto Serif Hebrew", file: "NotoSerifHebrew.ttf",
    url: "ofl/notoserifhebrew/NotoSerifHebrew%5Bwdth,wght%5D.ttf",
    ranges: [[0x0590, 0x05ff], [0xfb1d, 0xfb4f]] },
  { key: "arabic", family: "Noto Naskh Arabic", file: "NotoNaskhArabic.ttf",
    url: "ofl/notonaskharabic/NotoNaskhArabic%5Bwght%5D.ttf",
    ranges: [[0x0600, 0x06ff], [0x0750, 0x077f], [0xfb50, 0xfdff], [0xfe70, 0xfeff]] },
  { key: "devanagari", family: "Noto Serif Devanagari", file: "NotoSerifDevanagari.ttf",
    url: "ofl/notoserifdevanagari/NotoSerifDevanagari%5Bwdth,wght%5D.ttf",
    ranges: [[0x0900, 0x097f], [0xa8e0, 0xa8ff]] },
  { key: "coptic", family: "Noto Sans Coptic", file: "NotoSansCoptic-Regular.ttf",
    url: "ofl/notosanscoptic/NotoSansCoptic-Regular.ttf",
    ranges: [[0x03e2, 0x03ef], [0x2c80, 0x2cff]] },
  { key: "tibetan", family: "Noto Serif Tibetan", file: "NotoSerifTibetan.ttf",
    url: "ofl/notoseriftibetan/NotoSerifTibetan%5Bwght%5D.ttf",
    ranges: [[0x0f00, 0x0fff]] },
  { key: "avestan", family: "Noto Sans Avestan", file: "NotoSansAvestan-Regular.ttf",
    url: "ofl/notosansavestan/NotoSansAvestan-Regular.ttf",
    ranges: [[0x10b00, 0x10b3f]] },
  { key: "hanzi", family: "Noto Serif SC", file: "NotoSerifSC.ttf",
    url: "ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf",
    ranges: [[0x2e80, 0x2eff], [0x3000, 0x303f], [0x3400, 0x4dbf], [0x4e00, 0x9fff], [0xf900, 0xfaff]] },
];

// ── which characters the source actually sets ──────────────────────────────
const SKIP = new Set(["node_modules", ".git", "dist", ".tanstack"]);
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if ([".ts", ".tsx", ".md", ".json", ".css", ".html"].includes(extname(p))) files.push(p);
  }
})(join(root, "src"));

const used = new Map(SCRIPTS.map((s) => [s.key, new Set()]));
const place = (cp) => {
  for (const s of SCRIPTS) {
    if (s.ranges.some(([lo, hi]) => cp >= lo && cp <= hi)) return used.get(s.key).add(cp);
  }
};
for (const f of files) {
  const text = readFileSync(f, "utf8");
  for (const ch of text) place(ch.codePointAt(0));
  // `U+13093` literals, which is how the sign registries carry their codepoints
  for (const m of text.matchAll(/\bU\+([0-9A-Fa-f]{4,5})\b/g)) place(parseInt(m[1], 16));
}

// ── build ──────────────────────────────────────────────────────────────────
mkdirSync(cache, { recursive: true });
mkdirSync(outDir, { recursive: true });
let built = 0;
for (const s of SCRIPTS) {
  const cps = [...used.get(s.key)].sort((a, b) => a - b);
  if (!cps.length) {
    console.log(`${s.key.padEnd(12)} — no character set in the source, skipped`);
    continue;
  }
  const full = join(cache, s.file);
  if (!existsSync(full)) {
    console.log(`fetching ${s.family}…`);
    execFileSync("curl", ["-sSL", "--fail", "-o", full, `https://raw.githubusercontent.com/google/fonts/main/${s.url}`], { stdio: "inherit" });
  }
  // A variable face carries its axes in every subset, which for Devanagari is
  // four times the weight of the glyphs themselves. Pin the default instance
  // first; the site sets one weight.
  const flat = join(cache, `static-${s.file}`);
  if (!existsSync(flat)) {
    try {
      execFileSync("python3", ["-c", `
from fontTools.varLib import instancer
from fontTools.ttLib import TTFont
f = TTFont(${JSON.stringify(full)})
if "fvar" in f:
    axes = {a.axisTag: a.defaultValue for a in f["fvar"].axes}
    f = instancer.instantiateVariableFont(f, axes, inplace=True, updateFontNames=False)
f.save(${JSON.stringify(flat)})
`], { stdio: "inherit" });
    } catch {
      // A face with no axes needs nothing done to it.
    }
  }
  const source = existsSync(flat) ? flat : full;
  const out = join(outDir, `${s.key}.woff2`);
  execFileSync("python3", ["-c", `
from fontTools import subset
subset.main([${JSON.stringify(source)},
  "--unicodes=${cps.map((c) => `U+${c.toString(16).toUpperCase()}`).join(",")}",
  "--flavor=woff2", "--output-file=${out}",
  "--no-hinting", "--desubroutinize", "--layout-features=*", "--name-IDs=*"])
`], { stdio: "inherit" });
  const kb = (statSync(out).size / 1024).toFixed(1);
  console.log(`${s.key.padEnd(12)} ${String(cps.length).padStart(4)} characters → ${kb} KB`);
  built++;
}
console.log(`\n${built} subsets in public/fonts`);
