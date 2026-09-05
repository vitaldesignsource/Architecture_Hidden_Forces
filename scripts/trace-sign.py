#!/usr/bin/env python3
"""Trace a flat two-colour mark into stroked SVG paths.

The ether signs arrive as artwork: a coloured figure on black. Setting them as
images would put them at the mercy of a colour they cannot change and a raster
they cannot scale; tracing the outline of the ink gives a shape whose edges
stair-step. So this reads each stroke instead — its centre-line and the width it
was drawn at — and emits cubic paths to be stroked in the ink of the page.

    python3 scripts/trace-sign.py design/ethers/<name>.webp [--step 10]

Prints the `{ d, w }` entries for src/components/diagrams/EtherSigns.tsx.
Needs Pillow, which scripts/backdrops.mjs already requires.
"""
from PIL import Image
from collections import deque
import math, sys

SCALE = 2          # work at half size: fast, and finer than the stroke widths
MIN_RUN = 2.5      # a radial run shorter than this is noise, not a stroke
MIN_BLOB = 60      # pixels; smaller components are specks


def load_mask(path):
    im = Image.open(path).convert("RGB")
    im = im.resize((im.width // SCALE, im.height // SCALE), Image.LANCZOS)
    px = im.load()

    def ink(x, y):
        r, g, b = px[x, y]
        # the mark is whatever is not the black ground: a strong hue, or near-white
        return max(r, g, b) > 100 and (max(r, g, b) - min(r, g, b) > 40 or min(r, g, b) > 150)

    return [[ink(x, y) for x in range(im.width)] for y in range(im.height)], im.width, im.height


def components(m, w, h):
    seen = [[False] * w for _ in range(h)]
    out = []
    for y in range(h):
        for x in range(w):
            if not m[y][x] or seen[y][x]:
                continue
            q = deque([(x, y)]); seen[y][x] = True; pts = []
            while q:
                a, b = q.popleft(); pts.append((a, b))
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)):
                    nx, ny = a + dx, b + dy
                    if 0 <= nx < w and 0 <= ny < h and m[ny][nx] and not seen[ny][nx]:
                        seen[ny][nx] = True; q.append((nx, ny))
            if len(pts) >= MIN_BLOB:
                out.append(set(pts))
    return sorted(out, key=len, reverse=True)


def walk(comp, cx, cy, rmax):
    """Follow one stroke from just after its break, keeping to the same band."""
    angs = sorted(math.degrees(math.atan2(y - cy, x - cx)) % 360 for x, y in comp)
    gaps = [(angs[i + 1] - angs[i], angs[i + 1]) for i in range(len(angs) - 1)]
    gaps.append((angs[0] + 360 - angs[-1], angs[0]))
    gap, start = max(gaps)
    if gap <= 3:
        start = 0.0

    def bands(deg):
        th = math.radians(deg); c, s = math.cos(th), math.sin(th)
        out, inb, run = [], False, 0.0
        r = 2.0
        while r < rmax + 6:
            on = (int(round(cx + r * c)), int(round(cy + r * s))) in comp
            if on and not inb:
                inb, run = True, r
            elif not on and inb:
                inb = False
                if r - run > MIN_RUN:
                    out.append((run, r - 0.25))
            r += 0.25
        if inb:
            out.append((run, rmax))
        return out

    first = bands(start + 1)
    if not first:
        return []
    prev = (first[0][0] + first[0][1]) / 2
    pts, miss, t = [], 0, 0.0
    while t < 360 * 4:
        deg = start + 1 + t
        best, bd = None, 1e9
        for a, b in bands(deg % 360):
            mid = (a + b) / 2
            d = abs(mid - prev)
            if d < 7 and d < bd:
                best, bd = (mid, b - a), d
        if best is None:
            miss += 1
            if miss > 3:
                break
        else:
            miss = 0
            prev = best[0]
            pts.append((deg, best[0], best[1]))
        t += 1.0
    return pts


def catmull(p):
    d = [f"M{p[0][0]:.2f} {p[0][1]:.2f}"]
    for i in range(len(p) - 1):
        p0 = p[i - 1] if i else p[0]
        p1, p2 = p[i], p[i + 1]
        p3 = p[i + 2] if i + 2 < len(p) else p[-1]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d.append(f"C{c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p2[0]:.2f} {p2[1]:.2f}")
    return "".join(d)


def main():
    src = sys.argv[1]
    step = 10.0
    if "--step" in sys.argv:
        step = float(sys.argv[sys.argv.index("--step") + 1])
    m, w, h = load_mask(src)
    xs = [x for y in range(h) for x in range(w) if m[y][x]]
    ys = [y for y in range(h) for x in range(w) if m[y][x]]
    if not xs:
        sys.exit("no ink found")
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
    rmax = max(max(xs) - min(xs), max(ys) - min(ys)) / 2

    strokes = []
    for comp in components(m, w, h):
        pts = walk(comp, cx, cy, rmax)
        if len(pts) < 20:
            continue
        widths = sorted(p[2] for p in pts)
        med = widths[len(widths) // 2]
        kept = [p for p in pts if p[2] > med * 0.55]   # drop the tapered ends
        if len(kept) > 20:
            strokes.append((kept, med))

    extent = max(p[1] + med / 2 for pts, med in strokes for p in pts)
    k = 50.0 / extent

    def xy(deg, r):
        th = math.radians(deg)
        return (50 + k * r * math.cos(th), 50 + k * r * math.sin(th))

    rows = []
    for pts, med in strokes:
        knots, last = [], None
        for deg, r, _ in pts:
            if last is None or abs(deg - last) >= step:
                knots.append(xy(deg, r)); last = deg
        if pts[-1][0] - last > 1.5:
            knots.append(xy(pts[-1][0], pts[-1][1]))
        rows.append((catmull(knots), round(med * k, 2)))

    rows.sort(key=lambda r: -r[1])
    print(f"    // {len(rows)} strokes traced from {src}")
    for d, width in rows:
        print(f'    {{ d: "{d}", w: {width} }},')


if __name__ == "__main__":
    main()
