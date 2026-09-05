import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "node:path";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { parseEntry } from "./scripts/lib/frontmatter.mjs";
import schema from "./src/lib/phos/schema.json";
import toc from "./src/lib/phos/toc.json";

/**
 * The encyclopaedia's entries are markdown files under src/content/phos. A page
 * needs two things from one of them, at two different times: the front matter
 * of EVERY entry at once, to draw a division's list or a facet's results, and
 * the body of ONE entry, when it is opened. So each file answers two queries —
 * `?frontmatter`, small and imported eagerly, `?links`, the ids its body cites,
 * also eager, and `?body`, imported on demand —
 * and the parsing happens here, once, in Node, with the same parser the audit
 * uses. The page never sees raw markdown text it has to split itself.
 */
function phosContent() {
  return {
    name: "phos-content",
    load(id: string) {
      const m = id.match(/^(.*\.md)\?(frontmatter|body|links)$/);
      if (!m) return;
      const { meta, body } = parseEntry(readFileSync(m[1], "utf8"), schema);
      // `?links` — the ids an entry's body cross-references with [[id]] or
      // [[id|text]], as a small eager list, so a page can know who cites whom
      // without loading any body.
      if (m[2] === "links") {
        const ids = [...new Set([...body.matchAll(/\[\[([a-z]+-\d+)(?:\|[^\]]*)?\]\]/g)].map((x) => x[1]))];
        return `export default ${JSON.stringify(ids)};`;
      }
      return `export default ${JSON.stringify(m[2] === "body" ? body : meta)};`;
    },
  };
}

/**
 * The Portal's own data: how many entries each division has written, and the
 * ten rows of the Portal Entrance. The Portal used to import the whole index
 * to count them — seven hundred kilobytes of front matter for twenty-two
 * numbers — so the counts are taken here, at build, from the content
 * directory, with the same slug rule entries.ts applies.
 */
function phosPortal(): Plugin {
  const V = "virtual:phos-portal";
  const R = "\0" + V;
  return {
    name: "phos-portal",
    resolveId(id) {
      if (id === V) return R;
    },
    load(id) {
      if (id !== R) return;
      const root = path.resolve(import.meta.dirname, "src/content/phos");
      this.addWatchFile(root);
      const written: Record<string, number> = {};
      let entrance: unknown[] = [];
      for (const d of toc.divisions) {
        const dir = path.join(root, d.id);
        const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "README.md" && !f.startsWith("_")) : [];
        const bySlug = new Map(files.map((f) => [f.replace(/^\d+-/, "").replace(/\.md$/, ""), f]));
        written[d.id] = d.entries.filter((e) => bySlug.has(e.slug)).length;
        if (d.id === "portal")
          entrance = d.entries.map((e) => {
            const f = bySlug.get(e.slug);
            const meta = f ? parseEntry(readFileSync(path.join(dir, f), "utf8"), schema).meta : null;
            return { n: e.n, id: e.id, slug: e.slug, title: e.title, written: !!f, labels: meta?.labels ?? [], summary: meta?.summary ?? "" };
          });
      }
      return `export default ${JSON.stringify({ written, entrance })};`;
    },
  };
}

export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    phosContent(),
    phosPortal(),
  ],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  server: process.env.PORT ? { port: Number(process.env.PORT), strictPort: true } : {},
});
