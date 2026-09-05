#!/usr/bin/env node
/**
 * The sitemap: every page of the three volumes, for the crawlers.
 *
 *   SITE_ORIGIN=https://example.org npm run sitemap
 *
 * A sitemap has to carry absolute addresses, so it is written only when the
 * site's origin is known. The site lives at thearchitectureofhiddenforces.com, which
 * is the default; set SITE_ORIGIN in the environment the build runs to point a
 * mirror or a staging copy elsewhere.
 * in. Without it this prints a note and writes nothing, and the build goes on;
 * with it, public/sitemap.xml is (re)written and robots.txt points at it. The
 * pages come from the sources of truth: the routes for the static pages, the
 * table of contents for the encyclopaedia's divisions and entries, and the
 * entries' own front matter for the facet values that have a browse page.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseEntry } from "./lib/frontmatter.mjs";
import { entryFiles } from "./lib/graph.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const origin = (process.env.SITE_ORIGIN ?? "https://thearchitectureofhiddenforces.com").replace(/\/+$/, "");
const out = join(root, "public/sitemap.xml");
const robots = join(root, "public/robots.txt");

if (!origin) {
  console.log("sitemap: SITE_ORIGIN is not set, so no sitemap.xml is written (robots.txt allows all).");
  writeFileSync(robots, "User-agent: *\nAllow: /\n");
  process.exit(0);
}
if (!/^https?:\/\/[^/]+$/.test(origin)) {
  console.error(`sitemap: SITE_ORIGIN must be an origin like https://example.org, not "${origin}"`);
  process.exit(1);
}

/** The same rule as valueSlug in src/lib/phos/vocab.ts, for facet values in URLs. */
const valueSlug = (v) =>
  v.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’'"“”]/g, "").replace(/&/g, " and ")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// the static pages: every route file that is not a parameter route
const routes = readdirSync(join(root, "src/routes"))
  .filter((f) => f.endsWith(".tsx") && !f.startsWith("__") && !f.includes("$"))
  .map((f) => f.slice(0, -4).replace(/_\./g, "/").replace(/_$/, ""))
  .map((f) => (f === "index" ? "/" : "/" + f.replace(/\./g, "/")));

// the encyclopaedia: divisions and entries from the table of contents
const toc = JSON.parse(readFileSync(join(root, "src/lib/phos/toc.json"), "utf8"));
const divisions = toc.divisions.map((d) => (d.id === "portal" ? "/phos/portal" : `/phos/${d.id}`));
const entries = toc.divisions.flatMap((d) => d.entries.map((e) => `/phos/${d.id}/${e.slug}`));

// the browse pages: one for every facet value some entry actually names
const schema = JSON.parse(readFileSync(join(root, "src/lib/phos/schema.json"), "utf8"));
const seen = new Map();
for (const f of entryFiles(join(root, "src/content/phos"))) {
  const { meta } = parseEntry(readFileSync(f, "utf8"), schema);
  for (const facet of schema.facets) {
    for (const v of meta.facets?.[facet.key] ?? meta[facet.key] ?? []) seen.set(`/phos/browse/${facet.key}/${valueSlug(v)}`, true);
  }
}
const browse = [...seen.keys()].sort();

const urls = [...new Set([...routes, ...divisions, ...entries, ...browse])];
const priority = (u) => (u === "/" || u === "/phos" || u === "/ecology" ? "1.0" : /^\/phos\/browse\//.test(u) ? "0.4" : "0.7");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url><loc>${origin}${u}</loc><priority>${priority(u)}</priority></url>`)
  .join("\n")}\n</urlset>\n`;
writeFileSync(out, xml);
writeFileSync(robots, `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`sitemap: ${urls.length} pages — ${routes.length} static, ${divisions.length} divisions, ${entries.length} entries, ${browse.length} browse pages — written to public/sitemap.xml${existsSync(out) ? "" : " (?)"}`);
