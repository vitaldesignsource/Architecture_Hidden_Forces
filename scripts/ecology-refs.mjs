#!/usr/bin/env node
/**
 * Writes src/lib/ecology-refs.json: the Portal entries the Ecology's pointers
 * name, resolved to the fields a pointer renders. Run after `npm run toc`
 * (the toc script chains it), since a retitled outline entry retitles the
 * pointer; the audit fails until the file matches what the sources yield.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildRefs, render } from "./lib/ecology-refs.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const toc = JSON.parse(readFileSync(join(root, "src/lib/phos/toc.json"), "utf8"));
const refs = buildRefs(root, toc);
writeFileSync(join(root, "src/lib/ecology-refs.json"), render(refs));
console.log(`ecology refs: ${Object.keys(refs).length} entries named by the Ecology`);
