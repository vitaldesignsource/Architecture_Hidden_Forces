import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "node:path";
import { readFileSync } from "node:fs";
import { parseEntry } from "./scripts/lib/frontmatter.mjs";
import schema from "./src/lib/phos/schema.json";

/**
 * The encyclopaedia's entries are markdown files under src/content/phos. A page
 * needs two things from one of them, at two different times: the front matter
 * of EVERY entry at once, to draw a division's list or a facet's results, and
 * the body of ONE entry, when it is opened. So each file answers two queries —
 * `?frontmatter`, small and imported eagerly, and `?body`, imported on demand —
 * and the parsing happens here, once, in Node, with the same parser the audit
 * uses. The page never sees raw markdown text it has to split itself.
 */
function phosContent() {
  return {
    name: "phos-content",
    load(id: string) {
      const m = id.match(/^(.*\.md)\?(frontmatter|body)$/);
      if (!m) return;
      const { meta, body } = parseEntry(readFileSync(m[1], "utf8"), schema);
      return `export default ${JSON.stringify(m[2] === "body" ? body : meta)};`;
    },
  };
}

export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    phosContent(),
  ],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  server: process.env.PORT ? { port: Number(process.env.PORT), strictPort: true } : {},
});
