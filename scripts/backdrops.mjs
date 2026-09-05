#!/usr/bin/env node
/**
 * Narrower siblings of every backdrop.
 *
 * The sources under public/bg are 1600–2000px wide. A band is drawn across
 * a phone at three device pixels per CSS pixel — 1170 of them — and a
 * portrait panel on a desktop at a third of its source, so the full file was
 * bytes spent on pixels never shown: a read of the treatise fetched fifteen
 * megabytes of backdrops at every width. This writes each source at 800 and
 * 1320 pixels wide, under public/bg/w800 and public/bg/w1320 with the SAME
 * file name, and Backdrop.tsx offers the three as a srcset. A source narrower
 * than a target is copied unchanged, so every candidate the page names exists.
 *
 *   npm run backdrops        (the build runs it first; so does `vite dev`)
 *
 * The variants are not committed — .gitignore holds both directories — and a
 * variant newer than its source is left alone, so a rerun costs nothing.
 *
 * The resizing is done by sharp, which installs with the package and runs
 * wherever Node does, including a hosting service's build machine. Where
 * sharp cannot load, python3 with Pillow is tried; where neither is there,
 * the sources are copied under both names unchanged and the build goes on —
 * a page that names three candidates must find three files, and a build
 * must never fail for want of a smaller picture.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bg = join(root, "public/bg");
const WIDTHS = [800, 1320];

const files = readdirSync(bg).filter((f) => f.endsWith(".webp"));
for (const w of WIDTHS) mkdirSync(join(bg, `w${w}`), { recursive: true });

const jobs = [];
for (const f of files)
  for (const w of WIDTHS) {
    const src = join(bg, f), dst = join(bg, `w${w}`, f);
    if (!existsSync(dst) || statSync(dst).mtimeMs < statSync(src).mtimeMs) jobs.push([src, dst, w]);
  }

async function withSharp() {
  const { default: sharp } = await import("sharp");
  for (const [src, dst, w] of jobs) {
    const meta = await sharp(src).metadata();
    if (meta.width > w * 1.1) await sharp(src).resize({ width: w }).webp({ quality: 80, effort: 4 }).toFile(dst);
    else copyFileSync(src, dst);
  }
  return "sharp";
}

const PY = `
import json, shutil, sys
from PIL import Image
jobs = json.loads(sys.argv[1])
for src, dst, w in jobs:
    im = Image.open(src)
    if im.width > w * 1.1:
        h = round(im.height * w / im.width)
        im.convert("RGB").resize((w, h), Image.LANCZOS).save(dst, "WEBP", quality=80, method=4)
    else:
        shutil.copyfile(src, dst)
`;
function withPillow() {
  // in batches, so the argument list stays well under the OS limit
  for (let i = 0; i < jobs.length; i += 120)
    execFileSync("python3", ["-c", PY, JSON.stringify(jobs.slice(i, i + 120))], { stdio: ["ignore", "inherit", "pipe"] });
  return "pillow";
}
function byCopy() {
  for (const [src, dst] of jobs) copyFileSync(src, dst);
  return "copy";
}

let how = "none";
if (jobs.length) {
  try {
    how = await withSharp();
  } catch (e1) {
    try {
      how = withPillow();
    } catch (e2) {
      console.warn(`backdrops: neither sharp nor Pillow could resize (${(e1 && e1.message) || e1}); copying sources unchanged`);
      how = byCopy();
    }
  }
}
console.log(`backdrops: ${files.length} sources, ${jobs.length} variants written${jobs.length ? ` by ${how}` : ""}`);
