#!/usr/bin/env node
/**
 * The hieroglyphs the site sets, as a self-hosted font.
 *
 * Egyptian hieroglyphs (U+13000–1342F) have no font on most devices, so the
 * signs the treatise sets are served from a subset of Noto Sans Egyptian
 * Hieroglyphs (SIL Open Font License; the licence sits beside the font). The
 * subset holds only the signs listed in src/lib/hieroglyphs.ts, so it weighs a
 * few kilobytes and is fetched only where a sign is on the page.
 *
 *   npm run hieroglyphs        regenerate public/fonts/hieroglyphs.woff2
 *
 * Needs python3 with fontTools and brotli (pip install fonttools brotli), and
 * the full font, fetched on first use from the google/fonts repository.
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cache = join(root, "node_modules/.cache/phos-hieroglyphs");
const full = join(cache, "NotoSansEgyptianHieroglyphs-Regular.ttf");
mkdirSync(cache, { recursive: true });
if (!existsSync(full)) {
  console.log("fetching Noto Sans Egyptian Hieroglyphs…");
  execFileSync("curl", ["-sSL", "--fail", "-o", full, "https://raw.githubusercontent.com/google/fonts/main/ofl/notosansegyptianhieroglyphs/NotoSansEgyptianHieroglyphs-Regular.ttf"], { stdio: "inherit" });
}
// Every sign named in the registry, read straight out of the source.
const src = readFileSync(join(root, "src/lib/hieroglyphs.ts"), "utf8");
const signs = new Set([...src.matchAll(/U\+([0-9A-F]{5})/g)].map((m) => `U+${m[1]}`));
if (!signs.size) throw new Error("no signs found in src/lib/hieroglyphs.ts");
const out = join(root, "public/fonts/hieroglyphs.woff2");
execFileSync("python3", ["-c", `
from fontTools import subset
subset.main([${JSON.stringify(full)}, "--unicodes=${[...signs].join(",")}", "--flavor=woff2", "--output-file=${out}", "--no-hinting", "--desubroutinize", "--layout-features=*", "--name-IDs=*"])
`], { stdio: "inherit" });
console.log(`public/fonts/hieroglyphs.woff2: ${signs.size} signs`);
