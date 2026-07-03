"""Regenerate a race's `profilePath` (src/config/race.ts) from its GPX track.

Usage: python3 scripts/gpx-profile.py data/gpx/<race>.gpx [...]

Prints distance, elevation gain (5 m hysteresis, suppresses GPS noise) and an
SVG path resampled to 48 points, normalized to the card viewBox 0 0 200 48
(y 6 = course high point, y 44 = low point). Paste the path into the race's
`profilePath` in src/config/race.ts.
"""
import math
import re
import sys


def haversine(lat1, lon1, lat2, lon2):
    R = 6371000.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(a))


def parse(path):
    data = open(path).read()
    pts = re.findall(
        r'<trkpt lat="([\d.eE+-]+)" lon="([\d.eE+-]+)">.*?<ele>([\d.eE+-]+)</ele>',
        data,
        re.S,
    )
    return [(float(a), float(b), float(e)) for a, b, e in pts]


def stats(pts):
    dist = 0.0
    cum = [0.0]
    for i in range(1, len(pts)):
        dist += haversine(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1])
        cum.append(dist)
    gain = 0.0
    ref = pts[0][2]
    for _, _, e in pts:
        if e > ref + 5:
            gain += e - ref
            ref = e
        elif e < ref - 5:
            ref = e
    return dist, gain, cum


def profile_path(pts, cum, n=48, y_top=6.0, y_base=44.0):
    total = cum[-1]
    xs = [total * i / (n - 1) for i in range(n)]
    eles = []
    j = 0
    for x in xs:
        while j < len(cum) - 2 and cum[j + 1] < x:
            j += 1
        seg = cum[j + 1] - cum[j]
        f = 0 if seg == 0 else (x - cum[j]) / seg
        eles.append(pts[j][2] + f * (pts[j + 1][2] - pts[j][2]))
    # 3-tap smoothing keeps the silhouette as calm as the hand-drawn ones
    sm = [
        (eles[max(0, i - 1)] + eles[i] + eles[min(n - 1, i + 1)]) / 3
        for i in range(n)
    ]
    lo, hi = min(sm), max(sm)
    span = hi - lo or 1.0
    parts = []
    for i, e in enumerate(sm):
        x = 200 * i / (n - 1)
        y = y_base - (e - lo) / span * (y_base - y_top)
        parts.append(f"{'M' if i == 0 else 'L'}{x:.1f} {y:.1f}")
    return " ".join(parts)


for path in sys.argv[1:]:
    pts = parse(path)
    dist, gain, cum = stats(pts)
    print(f"== {path}")
    print(f"points: {len(pts)}  distance: {dist / 1000:.2f} km  gain: {gain:.0f} m")
    print(f"ele min/max: {min(p[2] for p in pts):.0f}/{max(p[2] for p in pts):.0f} m")
    print(f"profilePath:\n{profile_path(pts, cum)}\n")
