"""Textures des thèmes (fichiers SVG dans mockups/themes/assets/).

Usage : python3 mockups/tools/gen_textures.py
"""
import math
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'themes', 'assets')


def halftone(path, w, h, step, color, opacity, tone_max, reach, bands=12):
    """Trame de points à 45° dont le diamètre décroît depuis le coin haut droit.

    Une vraie trame (taille de point variable) en quelques Ko : des anneaux concentriques,
    chacun rempli d'un motif de points de diamètre fixe, tous calés sur la même grille.
    """
    p = step * math.sqrt(2)  # maille du motif tourné à 45°
    defs, layers = [], []
    for k in range(bands):
        d = (k + 0.5) / bands
        tone = tone_max * (1 - d) ** 1.6
        r = step * 0.62 * math.sqrt(tone)
        if r < 0.3:
            continue
        c = ''.join(f'<circle cx="{x:.3f}" cy="{y:.3f}" r="{r:.2f}"/>' for x, y in ((0, 0), (p, 0), (0, p), (p, p), (p / 2, p / 2)))
        defs.append(f'<pattern id="p{k}" width="{p:.3f}" height="{p:.3f}" patternUnits="userSpaceOnUse">{c}</pattern>')
        r0, r1 = reach * k / bands, reach * (k + 1) / bands
        ring = f'M{w - r1:.1f},0 a{r1:.1f},{r1:.1f} 0 1,0 {2 * r1:.1f},0 a{r1:.1f},{r1:.1f} 0 1,0 {-2 * r1:.1f},0Z'
        if r0 > 0:
            ring += f'M{w - r0:.1f},0 a{r0:.1f},{r0:.1f} 0 1,0 {2 * r0:.1f},0 a{r0:.1f},{r0:.1f} 0 1,0 {-2 * r0:.1f},0Z'
        layers.append(f'<path d="{ring}" fill-rule="evenodd" fill="url(#p{k})"/>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
           f'<defs>{"".join(defs)}</defs><g fill="{color}" fill-opacity="{opacity}">{"".join(layers)}</g></svg>')
    with open(os.path.join(OUT, path), 'w') as f:
        f.write(svg)
    return len(svg)


def verriere(path, w, h, rib_step, color):
    """Verrière vue d'en dessous : nervures qui fuient vers un point bas, pannes de plus en plus serrées."""
    cx, vy = w / 2, h * 1.35  # point de fuite, sous l'image
    lines = []
    n = int(w / 2 / rib_step) + 3
    for i in range(-n, n + 1):
        x0 = cx + i * rib_step
        t = h / vy  # on coupe chaque nervure à la ligne d'horizon de l'image
        x1 = x0 + (cx - x0) * t
        lines.append(f'<path d="M{x0:.1f},0L{x1:.1f},{h}" stroke-width="1.4" stroke-opacity=".24"/>')
    k, prev = 0, -100
    while True:
        y = h * (1 - 1 / (1 + 0.2 * k))
        if y - prev < 7:
            break
        lines.append(f'<path d="M0,{y:.1f}H{w}" stroke-width="1" stroke-opacity=".15"/>')
        prev, k = y, k + 1
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
           f'<defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/>'
           f'<stop offset=".45" stop-color="#fff" stop-opacity=".35"/><stop offset=".85" stop-color="#fff" stop-opacity="0"/></linearGradient>'
           f'<mask id="m"><rect width="{w}" height="{h}" fill="url(#f)"/></mask></defs>'
           f'<g mask="url(#m)" stroke="{color}" fill="none">{"".join(lines)}</g></svg>')
    with open(os.path.join(OUT, path), 'w') as f:
        f.write(svg)
    return len(svg)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    print('2a-trame.svg :', halftone('2a-trame.svg', 760, 520, 6, '#24509A', 0.17, 0.45, 510, bands=12), 'octets')
    print('2b-verriere.svg :', verriere('2b-verriere.svg', 2600, 420, 170, '#3F5B4C'), 'octets')
