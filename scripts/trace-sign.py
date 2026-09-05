#!/usr/bin/env python3
"""Trace a flat two-colour mark into stroked SVG paths.

The ether signs arrive as artwork: a coloured figure on black. Setting them as
images would put them at the mercy of a colour they cannot change and a raster
they cannot scale; tracing the outline of the ink gives a shape whose edges
stair-step. So this reads each stroke instead — its centre-line and the width it
was drawn at — and emits cubic paths to be stroked in the ink of the page.

Some marks are strokes of an even width, and read best that way. Others are
built of tapered points, straight edges or curved blades, where an even width
would throw the taper away; those are traced as an outline instead. An outline
is simplified and then rebuilt as curves, with a real corner left sharp, so a
curved edge does not arrive as a row of facets. Hence two modes:

    python3 scripts/trace-sign.py design/ethers/<name>.webp                 # strokes
    python3 scripts/trace-sign.py design/ethers/<name>.webp --mode fill     # outline

Prints the entries for src/components/diagrams/EtherSigns.tsx.
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


def outline(m, w, h, eps):
    """Marching-squares boundary loops of the ink, simplified."""
    def on(x, y):
        return 0 <= x < w and 0 <= y < h and m[y][x]

    corners = {0: ((0, 0), (1, 0)), 1: ((1, 0), (1, 1)), 2: ((1, 1), (0, 1)), 3: ((0, 1), (0, 0))}
    step = {0: (0, -1), 1: (1, 0), 2: (0, 1), 3: (-1, 0)}
    edges = {}
    for y in range(h):
        for x in range(w):
            if not m[y][x]:
                continue
            for d in range(4):
                dx, dy = step[d]
                if not on(x + dx, y + dy):
                    (ax, ay), (bx, by) = corners[d]
                    edges.setdefault((x + ax, y + ay), []).append((x + bx, y + by))
    loops = []
    while edges:
        start = next(iter(edges))
        loop, cur = [start], start
        while True:
            nxt = edges.get(cur)
            if not nxt:
                break
            step_to = nxt.pop()
            if not nxt:
                del edges[cur]
            loop.append(step_to)
            cur = step_to
            if cur == start:
                break
        if len(loop) > 16:
            loops.append(rdp(loop, eps))
    return [l for l in loops if len(l) > 3]


def curve_loop(pts, corner_deg, to_box):
    """A closed loop of points as cubics: smooth through gentle turns, sharp at corners."""
    p = [to_box(q) for q in pts]
    if p[0] == p[-1]:
        p = p[:-1]
    n = len(p)
    if n < 3:
        return ""

    def turn(i):
        a, b, c = p[(i - 1) % n], p[i], p[(i + 1) % n]
        u = math.atan2(b[1] - a[1], b[0] - a[0])
        v = math.atan2(c[1] - b[1], c[0] - b[0])
        return abs(math.degrees(math.atan2(math.sin(v - u), math.cos(v - u))))

    sharp = [turn(i) > corner_deg for i in range(n)]

    def out_t(i):
        """tangent leaving point i"""
        a, b, c = p[(i - 1) % n], p[i], p[(i + 1) % n]
        if sharp[i]:
            return ((c[0] - b[0]) / 3, (c[1] - b[1]) / 3)
        return ((c[0] - a[0]) / 6, (c[1] - a[1]) / 6)

    def in_t(i):
        """tangent arriving at point i"""
        a, b, c = p[(i - 1) % n], p[i], p[(i + 1) % n]
        if sharp[i]:
            return ((b[0] - a[0]) / 3, (b[1] - a[1]) / 3)
        return ((c[0] - a[0]) / 6, (c[1] - a[1]) / 6)

    def straight(a, b, c1, c2):
        """the controls sit on the segment, so a line says the same thing in less"""
        dx, dy = b[0] - a[0], b[1] - a[1]
        n = math.hypot(dx, dy)
        if n < 1e-9:
            return True
        return all(abs(dy * (c[0] - a[0]) - dx * (c[1] - a[1])) / n < 0.06 for c in (c1, c2))

    d = [f"M{p[0][0]:.2f} {p[0][1]:.2f}"]
    for i in range(n):
        j = (i + 1) % n
        t1, t2 = out_t(i), in_t(j)
        c1 = (p[i][0] + t1[0], p[i][1] + t1[1])
        c2 = (p[j][0] - t2[0], p[j][1] - t2[1])
        if straight(p[i], p[j], c1, c2):
            d.append(f"L{p[j][0]:.2f} {p[j][1]:.2f}")
        else:
            d.append(f"C{c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p[j][0]:.2f} {p[j][1]:.2f}")
    return "".join(d) + "Z"


def rdp(pts, eps):
    """Ramer-Douglas-Peucker, iteratively so a long boundary cannot blow the stack."""
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    work = [(0, len(pts) - 1)]
    while work:
        i, j = work.pop()
        if j <= i + 1:
            continue
        a, b = pts[i], pts[j]
        dx, dy = b[0] - a[0], b[1] - a[1]
        n = math.hypot(dx, dy)
        worst, wi = -1.0, i
        for k in range(i + 1, j):
            p = pts[k]
            d = (abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / n) if n else math.hypot(p[0] - a[0], p[1] - a[1])
            if d > worst:
                worst, wi = d, k
        if worst > eps:
            keep[wi] = True
            work.append((i, wi)); work.append((wi, j))
    return [p for p, k in zip(pts, keep) if k]


def main():
    src = sys.argv[1]
    step = 10.0
    if "--step" in sys.argv:
        step = float(sys.argv[sys.argv.index("--step") + 1])
    mode = sys.argv[sys.argv.index("--mode") + 1] if "--mode" in sys.argv else "stroke"
    eps = float(sys.argv[sys.argv.index("--eps") + 1]) if "--eps" in sys.argv else 1.1
    corner = float(sys.argv[sys.argv.index("--corner") + 1]) if "--corner" in sys.argv else 55.0
    m, w, h = load_mask(src)
    xs = [x for y in range(h) for x in range(w) if m[y][x]]
    ys = [y for y in range(h) for x in range(w) if m[y][x]]
    if not xs:
        sys.exit("no ink found")
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
    rmax = max(max(xs) - min(xs), max(ys) - min(ys)) / 2

    if mode == "fill":
        loops = outline(m, w, h, eps)
        span = max(max(xs) - min(xs), max(ys) - min(ys))
        k = 100.0 / span

        def to_box(q):
            return (50 + (q[0] - cx) * k, 50 + (q[1] - cy) * k)

        d = "".join(curve_loop(loop, corner, to_box) for loop in loops)
        print(f"    // outline of {len(loops)} shapes traced from {src}")
        print(f'    {{ d: "{d}" }},')
        return

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
