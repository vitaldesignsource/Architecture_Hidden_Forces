#!/usr/bin/env node
/**
 * The Atlas's geography, drawn once at build time.
 *
 * Reads the places in src/lib/phos/atlas.json and Natural Earth's coastlines,
 * rivers, and lakes, projects them onto one plane, and writes
 * src/lib/phos/atlas-geo.json: path strings the page can draw without carrying
 * a projection library, the projected position of every place, and a hash of
 * the inputs so the audit can tell when this needs re-running.
 *
 *   npm run atlas              regenerate src/lib/phos/atlas-geo.json
 *   npm run atlas -- --preview write azimuthal and conic previews to scratch/
 *
 * Land comes from the world-atlas package (Natural Earth, 1:50m). Rivers and
 * lakes are fetched from the natural-earth-vector repository on first use and
 * cached under node_modules/.cache/phos-atlas/.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as topojson from "topojson-client";
import { topology } from "topojson-server";
import { presimplify, simplify, quantile } from "topojson-simplify";
import { geoAzimuthalEqualArea, geoConicEqualArea, geoPath, geoGraticule } from "d3-geo";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cache = join(root, "node_modules/.cache/phos-atlas");
const NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson";

function natural(name) {
  mkdirSync(cache, { recursive: true });
  const file = join(cache, `${name}.geojson`);
  if (!existsSync(file)) {
    console.log(`fetching ${name} from Natural Earth…`);
    execFileSync("curl", ["-sSL", "--fail", "-o", file, `${NE}/${name}.geojson`], { stdio: "inherit" });
  }
  return JSON.parse(readFileSync(file, "utf8"));
}

const atlas = JSON.parse(readFileSync(join(root, "src/lib/phos/atlas.json"), "utf8"));
const land = JSON.parse(readFileSync(join(root, "node_modules/world-atlas/land-50m.json"), "utf8"));
/** Half of Natural Earth's 1:50m vertices carry the coast; the other half carry weight. */
function simplified(topo, keep) {
  const pre = presimplify(topo);
  return simplify(pre, quantile(pre, 1 - keep));
}
const landTopo = simplified(land, 0.45);
const landFeature = topojson.feature(landTopo, landTopo.objects.land);
/** Every land polygon, whether the object arrived as one geometry or a collection. */
const landPolygons = (landFeature.type === "FeatureCollection" ? landFeature.features.map((f) => f.geometry) : [landFeature.geometry])
  .flatMap((g) => (g.type === "MultiPolygon" ? g.coordinates : [g.coordinates]));

/** The rivers the ancient world was arranged along, and the inland seas. */
const RIVERS = new Set(["Nile", "White Nile", "Blue Nile", "Tigris", "Euphrates", "Indus", "Ganges", "Brahmaputra",
  "Amu Darya", "Syr Darya", "Helmand", "Jordan", "Huang", "Yangtze", "Danube", "Rhine", "Rhône", "Po", "Thames",
  "Seine", "Loire", "Elbe", "Ebro", "Volga", "Don"]);
const LAKES = new Set(["Caspian Sea", "Aral Sea", "Lake Van", "Lake Urmia", "Lake Balkhash", "Ysyk-Köl", "Issyk Kul",
  "Lake Baikal", "Qinghai Hu", "Dead Sea", "Lake Tuz"]);
const name = (f) => (f.properties.name_en || f.properties.name || "").replace(/\s+/g, " ").trim();
const rivers = natural("ne_50m_rivers_lake_centerlines");
const lakes = natural("ne_50m_lakes");
const riverGeo = { type: "FeatureCollection", features: rivers.features.filter((f) => RIVERS.has(name(f))) };
const lakeTopo = simplified(topology({ lakes: { type: "FeatureCollection", features: lakes.features.filter((f) => LAKES.has(name(f)) || (f.properties.scalerank ?? 9) <= 1) } }), 0.45);
const lakeGeo = topojson.feature(lakeTopo, lakeTopo.objects.lakes);

/** Names set on the map: regions in the register the entries use, seas quietly. */
const LABELS = [
  ["Egypt", 28.5, 27.5, "region"], ["Mesopotamia", 33.2, 44.6, "region"], ["Persia", 32.5, 55.5, "region"],
  ["Hellas", 39.6, 21.6, "region"], ["Italia", 43.4, 12.6, "region"], ["Anatolia", 39.2, 33.0, "region"],
  ["Arabia", 23.5, 45.0, "region"], ["Bactria", 37.4, 65.5, "region"],
  ["India", 22.5, 78.5, "region"], ["Tibet", 32.5, 88.0, "region"], ["China", 35.5, 105.0, "region"],
  ["Britannia", 53.5, -2.5, "region"], ["Gallia", 47.0, 2.4, "region"], ["Germania", 51.5, 10.5, "region"],
  ["Mediterranean Sea", 34.4, 18.0, "sea"], ["Black Sea", 43.3, 34.0, "sea"], ["Arabian Sea", 15.0, 63.0, "sea"],
  ["Bay of Bengal", 13.0, 88.0, "sea"], ["Red Sea", 19.5, 38.5, "sea"], ["Caspian Sea", 42.0, 50.5, "sea"],
  ["Indian Ocean", 5.5, 72.0, "sea"],
];

const W = 1200, H = 720;
// Wound clockwise, as d3 requires of a spherical polygon that means the inside
// of the box rather than everything outside it.
const bbox = { type: "Polygon", coordinates: [[[-12, 62], [124, 62], [124, 3], [-12, 3], [-12, 62]]] };
const PROJECTIONS = {
  azimuthal: () => geoAzimuthalEqualArea().rotate([-52, -30]).clipAngle(75),
  conic: () => geoConicEqualArea().rotate([-52, 0]).parallels([18, 50]),
};

function draw(kind) {
  const proj = PROJECTIONS[kind]().fitExtent([[10, 10], [W - 10, H - 10]], bbox).clipExtent([[0, 0], [W, H]]);
  const path = geoPath(proj).digits(1);
  const graticule = geoGraticule().step([10, 10]);
  // Every islet Natural Earth knows is drawn at 1:50m; those smaller than a
  // couple of pixels on this sheet only add weight.
  const kept = { type: "MultiPolygon", coordinates: landPolygons.filter((poly) => path.area({ type: "Polygon", coordinates: poly }) >= 2) };
  const pt = ([lat, lon]) => { const p = proj([lon, lat]); return p ? [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10] : null; };
  const points = Object.fromEntries(Object.entries(atlas.places).map(([id, p]) => [id, pt([p.lat, p.lon])]));
  const labels = LABELS.map(([t, lat, lon, k]) => ({ t, k, xy: pt([lat, lon]) })).filter((l) => l.xy).map((l) => ({ t: l.t, k: l.k, x: l.xy[0], y: l.xy[1] }));
  return { w: W, h: H, projection: kind, land: path(kept), lakes: path(lakeGeo), rivers: path(riverGeo), graticule: path(graticule()), points, labels };
}

const preview = process.argv.includes("--preview");
if (preview) {
  const dir = process.argv[process.argv.indexOf("--preview") + 1] || join(root, "scratch");
  mkdirSync(dir, { recursive: true });
  for (const kind of Object.keys(PROJECTIONS)) {
    const g = draw(kind);
    const pts = Object.entries(g.points).filter(([, p]) => p).map(([id, [x, y]]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#e0b25c"/>`).join("");
    const labels = g.labels.map((l) => `<text x="${l.x}" y="${l.y}" text-anchor="middle" fill="#e0b25c" fill-opacity="${l.k === "sea" ? 0.45 : 0.75}" font-size="${l.k === "sea" ? 11 : 15}" font-family="serif" font-style="italic" ${l.k === "sea" ? "" : 'letter-spacing="2"'}>${l.t}</text>`).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#0b0a09"/><path d="${g.graticule}" fill="none" stroke="#e0b25c" stroke-opacity="0.12" stroke-width="0.5"/><path d="${g.land}" fill="#1c1a17" stroke="#e0b25c" stroke-opacity="0.55" stroke-width="0.6"/><path d="${g.lakes}" fill="#0b0a09" stroke="#e0b25c" stroke-opacity="0.4" stroke-width="0.5"/><path d="${g.rivers}" fill="none" stroke="#a88a4a" stroke-opacity="0.7" stroke-width="0.7"/>${labels}${pts}</svg>`;
    writeFileSync(join(dir, `geo_${kind}.svg`), svg);
    console.log(`${kind}: land ${(g.land.length / 1024).toFixed(0)} KB, lakes ${(g.lakes.length / 1024).toFixed(0)} KB, rivers ${(g.rivers.length / 1024).toFixed(0)} KB, graticule ${(g.graticule.length / 1024).toFixed(0)} KB; ${Object.values(g.points).filter(Boolean).length}/${Object.keys(g.points).length} places on the sheet`);
  }
} else {
  const kind = "azimuthal";
  const g = draw(kind);
  // The sheet depends on this script (projection, extent, labels) and on the
  // places; the audit recomputes the same hash to know when to redraw.
  const hash = createHash("sha1").update(readFileSync(fileURLToPath(import.meta.url), "utf8")).update(JSON.stringify(atlas.places)).digest("hex").slice(0, 12);
  const off = Object.entries(g.points).filter(([, p]) => !p).map(([id]) => id);
  if (off.length) throw new Error(`places off the sheet: ${off.join(", ")}`);
  writeFileSync(join(root, "src/lib/phos/atlas-geo.json"), JSON.stringify({ hash, ...g }));
  console.log(`atlas-geo.json: ${kind}, ${Object.keys(g.points).length} places, hash ${hash}`);
}
