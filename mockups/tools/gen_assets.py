"""Génère les visuels de substitution des maquettes (logos, drapeaux, photos) en SVG.

Les vrais visuels (img/) ne sont pas versionnés : les maquettes utilisent ces
illustrations neutres, assez proches en tonalité de vraies photos d'archives
pour juger l'habillage. Usage : python3 mockups/tools/gen_assets.py
"""
import json
import os
import random

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')

# --------------------------------------------------------------------------
# Drapeaux (3:2)
# --------------------------------------------------------------------------

def vstripes(*cols):
    w = 30 / len(cols)
    return ''.join(f'<rect x="{i * w}" width="{w + 0.1}" height="20" fill="{c}"/>' for i, c in enumerate(cols))


def hstripes(*cols):
    h = 20 / len(cols)
    return ''.join(f'<rect y="{i * h}" width="30" height="{h + 0.1}" fill="{c}"/>' for i, c in enumerate(cols))


FLAGS = {
    'FR': vstripes('#0055A4', '#FFFFFF', '#EF4135'),
    'IT': vstripes('#009246', '#FFFFFF', '#CE2B37'),
    'BE': vstripes('#111111', '#FDDA24', '#EF3340'),
    'DE': hstripes('#111111', '#DD0000', '#FFCE00'),
    'NL': hstripes('#AE1C28', '#FFFFFF', '#21468B'),
    'AT': hstripes('#C8102E', '#FFFFFF', '#C8102E'),
    'ES': '<rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/>',
    'SE': '<rect width="30" height="20" fill="#006AA7"/><rect x="9" width="4" height="20" fill="#FECC00"/><rect y="8" width="30" height="4" fill="#FECC00"/>',
    'CH': '<rect width="30" height="20" fill="#DA291C"/><rect x="13" y="4" width="4" height="12" fill="#fff"/><rect x="9" y="8" width="12" height="4" fill="#fff"/>',
    'JP': '<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/>',
    'CZ': '<rect width="30" height="20" fill="#fff"/><rect y="10" width="30" height="10" fill="#D7141A"/><path d="M0 0L15 10L0 20z" fill="#11457E"/>',
    'GB': ('<rect width="30" height="20" fill="#012169"/>'
           '<path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/>'
           '<path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.5"/>'
           '<path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/>'
           '<path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="3.4"/>'),
    'US': (''.join(f'<rect y="{i * 20 / 13}" width="30" height="{20 / 13 + 0.05}" fill="{"#B22234" if i % 2 == 0 else "#fff"}"/>' for i in range(13))
           + '<rect width="13" height="10.8" fill="#3C3B6E"/>'),
}


def write(path, svg):
    with open(os.path.join(ROOT, path), 'w') as f:
        f.write(svg)


def gen_flags():
    for code, body in FLAGS.items():
        write(f'flags/{code}.svg', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" width="30" height="20">{body}</svg>')


# --------------------------------------------------------------------------
# Logos (fond blanc, comme les PNG d'origine)
# --------------------------------------------------------------------------

def initials(name):
    letters = [c for c in name if c.isalpha()]
    words = [w for w in name.replace('-', ' ').split() if w[0].isalpha()]
    if len(words) > 1:
        return (words[0][0] + words[1][0]).upper()
    return ''.join(letters[:2]).upper()


def logo_svg(name, style, color):
    ini = initials(name)
    sans = "font-family=\"'Helvetica Neue',Arial,sans-serif\""
    serif = "font-family=\"Georgia,'Times New Roman',serif\""
    body = ''
    if style == 'badge':
        body = (f'<circle cx="100" cy="100" r="78" fill="#fff" stroke="{color}" stroke-width="12"/>'
                f'<circle cx="100" cy="100" r="62" fill="none" stroke="{color}" stroke-width="2"/>'
                f'<text x="100" y="118" text-anchor="middle" {sans} font-weight="800" font-size="52" fill="{color}">{ini}</text>')
    elif style == 'shield':
        body = (f'<path d="M100 22 L164 42 L160 112 Q154 156 100 180 Q46 156 40 112 L36 42 Z" fill="{color}"/>'
                f'<path d="M100 36 L150 52 L147 110 Q142 145 100 165 Q58 145 53 110 L50 52 Z" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>'
                f'<text x="100" y="122" text-anchor="middle" {serif} font-weight="700" font-size="50" fill="#fff">{ini}</text>')
    elif style == 'oval':
        body = (f'<ellipse cx="100" cy="100" rx="88" ry="52" fill="{color}"/>'
                f'<ellipse cx="100" cy="100" rx="80" ry="44" fill="none" stroke="#fff" stroke-width="2.5"/>'
                f'<text x="100" y="112" text-anchor="middle" {serif} font-style="italic" font-weight="700" font-size="34" fill="#fff">{name.split()[0][:9]}</text>')
    elif style == 'word':
        size = 46 if len(name) <= 6 else (36 if len(name) <= 9 else 28)
        body = (f'<text x="100" y="{100 + size * 0.34:.0f}" text-anchor="middle" {sans} font-weight="900" font-size="{size}" letter-spacing="1" fill="{color}">{name.upper()}</text>'
                f'<rect x="30" y="{122 + size * 0.1:.0f}" width="140" height="5" fill="{color}"/>')
    elif style == 'script':
        size = 46 if len(name) <= 7 else 34
        body = (f'<text x="100" y="{100 + size * 0.3:.0f}" text-anchor="middle" {serif} font-style="italic" font-size="{size}" fill="{color}">{name}</text>')
    elif style == 'diamond':
        body = (f'<rect x="52" y="52" width="96" height="96" transform="rotate(45 100 100)" fill="{color}"/>'
                f'<text x="100" y="116" text-anchor="middle" {sans} font-weight="800" font-size="44" fill="#fff">{ini}</text>')
    elif style == 'wings':
        body = (f'<path d="M100 80 C70 62 40 62 12 74 C40 80 62 92 76 108 Z" fill="{color}"/>'
                f'<path d="M100 80 C130 62 160 62 188 74 C160 80 138 92 124 108 Z" fill="{color}"/>'
                f'<circle cx="100" cy="100" r="30" fill="#fff" stroke="{color}" stroke-width="6"/>'
                f'<text x="100" y="112" text-anchor="middle" {sans} font-weight="800" font-size="30" fill="{color}">{ini}</text>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#fff"/>{body}</svg>'


LOGO_COLORS = ['#1B2A4A', '#8E1B1B', '#111111', '#0E4C92', '#2C5530', '#9C6B12', '#5A1A3A', '#333333', '#B3260E', '#1D5C77']
LOGO_STYLES = ['badge', 'shield', 'oval', 'word', 'script', 'diamond', 'wings']


# --------------------------------------------------------------------------
# Photos : voitures stylisées sur fonds variés
# --------------------------------------------------------------------------

def car_modern(p, color, dark):
    """Profil 3 volumes / coupé / break, avant à gauche. Boîte 400 x 160, sol à 152."""
    x0, x1 = p['x0'], p['x1']
    nose, belt, roof, tail = p['nose'], p['belt'], p['roof'], p['tail']
    xa, xr1, xr2, xc = p['xa'], p['xr1'], p['xr2'], p['xc']
    wf, wr, r = p['wf'], p['wr'], p.get('r', 23)
    sill = 132
    body = (f'M{x0},{sill} L{x0},{nose + 8} Q{x0},{nose} {x0 + 10},{nose - 2} '
            f'L{xa - 30},{belt + 2} Q{xa - 8},{belt} {xa},{belt - 3} '
            f'C{xa + 16},{roof + 18} {xr1 - 12},{roof + 2} {xr1},{roof} '
            f'Q{(xr1 + xr2) / 2},{roof - 4} {xr2},{roof} '
            f'C{xr2 + 14},{roof + 3} {xc - 10},{belt - 14} {xc},{belt - 3} '
            f'L{x1 - 12},{tail} Q{x1},{tail + 1} {x1},{tail + 10} L{x1},{sill} Z')
    gl = (f'M{xa + 9},{belt - 5} C{xa + 22},{roof + 20} {xr1 - 6},{roof + 7} {xr1 + 3},{roof + 6} '
          f'L{xr2 - 2},{roof + 6} C{xr2 + 10},{roof + 9} {xc - 16},{belt - 14} {xc - 9},{belt - 5} Z')
    bx = (xr1 + xr2) / 2 + p.get('b', 0)
    s = (f'<path d="{body}" fill="url(#body)"/>'
         f'<path d="{gl}" fill="#1E2630" opacity=".88"/>'
         f'<path d="{gl}" fill="url(#glass)"/>'
         f'<rect x="{bx - 3}" y="{roof + 4}" width="6" height="{belt - roof - 6}" fill="{color}"/>'
         f'<path d="M{x0 + 6},{belt + 14} L{x1 - 6},{belt + 12}" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>'
         f'<path d="M{x0},{sill - 6} L{x1},{sill - 6}" stroke="{dark}" stroke-width="5" opacity=".7"/>'
         f'<rect x="{x0 + 2}" y="{nose + 6}" width="12" height="7" rx="3" fill="#F6F1DE"/>'
         f'<rect x="{x1 - 9}" y="{tail + 6}" width="8" height="8" rx="2" fill="#B3261E"/>')
    for wx in (wf, wr):
        s += wheel(wx, 152 - r, r, dark)
    return s


def wheel(x, y, r, dark, spokes=False):
    s = (f'<circle cx="{x}" cy="{y - 1}" r="{r + 5}" fill="{dark}"/>'
         f'<circle cx="{x}" cy="{y}" r="{r}" fill="#15171A"/>'
         f'<circle cx="{x}" cy="{y}" r="{r * 0.58:.1f}" fill="#C9CCCF"/>'
         f'<circle cx="{x}" cy="{y}" r="{r * 0.2:.1f}" fill="#7C8085"/>')
    if spokes:
        s = (f'<circle cx="{x}" cy="{y}" r="{r}" fill="#15171A"/>'
             f'<circle cx="{x}" cy="{y}" r="{r - 5}" fill="#E9E4D8"/>'
             + ''.join(f'<path d="M{x},{y} L{x + (r - 5) * c:.1f},{y + (r - 5) * sn:.1f}" stroke="#4A4A4A" stroke-width="1.5"/>'
                       for c, sn in [(1, 0), (0.5, 0.87), (-0.5, 0.87), (-1, 0), (-0.5, -0.87), (0.5, -0.87), (0.87, 0.5), (0, 1), (-0.87, 0.5), (-0.87, -0.5), (0, -1), (0.87, -0.5)])
             + f'<circle cx="{x}" cy="{y}" r="5" fill="#3A3A3A"/>')
    return s


def car_vintage(color, dark):
    s = (
        # caisse : capot long + habitacle haut
        f'<path d="M64,118 L64,84 Q64,80 70,79 L190,76 L204,44 Q206,38 214,38 L300,38 Q318,38 324,52 L334,84 L340,118 Z" fill="url(#body)"/>'
        f'<path d="M216,48 L250,48 L250,76 L210,76 Z M258,48 L300,48 Q312,48 316,58 L322,76 L258,76 Z" fill="#1E2630" opacity=".85"/>'
        # calandre et phare
        f'<rect x="54" y="74" width="14" height="44" rx="3" fill="#B8B2A2" stroke="{dark}" stroke-width="2"/>'
        f'<circle cx="60" cy="68" r="9" fill="#EDE6CF" stroke="{dark}" stroke-width="2"/>'
        # ailes et marchepied
        f'<path d="M34,134 Q44,96 96,96 Q140,96 152,128 L152,134 Z" fill="{dark}"/>'
        f'<path d="M262,128 Q276,96 318,96 Q360,96 372,134 L262,134 Z" fill="{dark}"/>'
        f'<rect x="146" y="124" width="122" height="6" rx="2" fill="{dark}"/>'
        f'<path d="M80,96 L330,92" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>'
    )
    s += wheel(96, 126, 26, dark, spokes=True) + wheel(318, 126, 26, dark, spokes=True)
    return s


CAR_SHAPES = {
    'berline': dict(x0=26, x1=378, nose=100, belt=90, roof=48, tail=86, xa=148, xr1=186, xr2=286, xc=330, wf=98, wr=308),
    'coupe': dict(x0=18, x1=384, nose=110, belt=100, roof=66, tail=96, xa=184, xr1=224, xr2=262, xc=344, wf=94, wr=318, b=40),
    'fastback': dict(x0=22, x1=382, nose=104, belt=94, roof=56, tail=92, xa=160, xr1=198, xr2=246, xc=360, wf=96, wr=312),
    'compacte': dict(x0=50, x1=356, nose=96, belt=86, roof=40, tail=72, xa=144, xr1=180, xr2=314, xc=348, wf=112, wr=302, r=24),
    'break': dict(x0=24, x1=380, nose=100, belt=88, roof=46, tail=60, xa=144, xr1=182, xr2=352, xc=376, wf=100, wr=312),
}


BACKGROUNDS = {
    'studio': lambda w, h: (f'<radialGradient id="bg" cx=".5" cy=".38" r=".75"><stop offset="0" stop-color="#F4F2EE"/><stop offset="1" stop-color="#BDB7AC"/></radialGradient>',
                            f'<rect width="{w}" height="{h}" fill="url(#bg)"/><rect y="{h * 0.68}" width="{w}" height="{h * 0.32}" fill="#000" opacity=".06"/>'),
    'plein-air': lambda w, h: (f'<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9DBBD0"/><stop offset=".62" stop-color="#E7ECE6"/><stop offset=".62" stop-color="#8E9A7C"/><stop offset="1" stop-color="#6F7766"/></linearGradient>',
                               f'<rect width="{w}" height="{h}" fill="url(#bg)"/><path d="M0 {h * 0.62} Q{w * 0.25} {h * 0.5} {w * 0.5} {h * 0.58} T{w} {h * 0.55} V{h * 0.62} H0Z" fill="#7F9273" opacity=".8"/><rect y="{h * 0.74}" width="{w}" height="{h * 0.26}" fill="#76726A"/>'),
    'crepuscule': lambda w, h: (f'<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5D6B8C"/><stop offset=".55" stop-color="#E7B489"/><stop offset=".7" stop-color="#C98F6A"/><stop offset="1" stop-color="#3D3734"/></linearGradient>',
                                f'<rect width="{w}" height="{h}" fill="url(#bg)"/>'),
    'salon': lambda w, h: (f'<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2F3A"/><stop offset=".6" stop-color="#585C66"/><stop offset="1" stop-color="#9A968E"/></linearGradient>'
                           f'<radialGradient id="spot"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>',
                           f'<rect width="{w}" height="{h}" fill="url(#bg)"/>'
                           + ''.join(f'<circle cx="{w * x}" cy="{h * 0.12}" r="{h * 0.1}" fill="url(#spot)"/>' for x in (0.15, 0.38, 0.62, 0.85))
                           + f'<ellipse cx="{w / 2}" cy="{h * 0.86}" rx="{w * 0.42}" ry="{h * 0.07}" fill="#D9D4C8" opacity=".55"/>'),
    'papier': lambda w, h: (f'<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1E7CF"/><stop offset="1" stop-color="#E2D3B1"/></linearGradient>',
                            f'<rect width="{w}" height="{h}" fill="url(#bg)"/>'),
}


def photo_svg(w, h, bg, shape, color, dark, mode='couleur', brochure=None, seed=0):
    rnd = random.Random(seed)
    defs, back = BACKGROUNDS[bg](w, h)
    defs += (f'<linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{lighten(color, .28)}"/>'
             f'<stop offset=".55" stop-color="{color}"/><stop offset="1" stop-color="{dark}"/></linearGradient>'
             '<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/>'
             '<stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>')
    car = car_vintage(color, dark) if shape == 'vintage' else car_modern(CAR_SHAPES[shape], color, dark)
    extra = ''
    if brochure:
        # mise en page de prospectus : bandeau titre + lignes de texte
        defs += ''
        extra = (f'<rect x="{w * 0.07}" y="{h * 0.06}" width="{w * 0.86}" height="{h * 0.1}" fill="{brochure}"/>'
                 f'<rect x="{w * 0.1}" y="{h * 0.09}" width="{w * 0.4}" height="{h * 0.04}" fill="#F6EEDC"/>')
        for i in range(5):
            lw = w * (0.5 + rnd.random() * 0.33)
            extra += f'<rect x="{w * 0.1}" y="{h * (0.78 + i * 0.035)}" width="{lw}" height="{h * 0.012}" fill="#5C5245" opacity=".45"/>'
        cw, cy = w * 0.8, h * 0.3
    else:
        cw, cy = w * 0.82, h * 0.6 - (w * 0.82) * 0.4 * 0.62
    scale = cw / 400
    cx = (w - cw) / 2 + rnd.uniform(-0.03, 0.03) * w
    if brochure:
        cy = h * 0.32
    shadow = f'<ellipse cx="{cx + 200 * scale}" cy="{cy + 152 * scale}" rx="{180 * scale}" ry="{9 * scale}" fill="#000" opacity=".28"/>'
    group = f'{shadow}<g transform="translate({cx:.1f} {cy:.1f}) scale({scale:.3f})">{car}</g>'
    filt = ''
    wrap_open, wrap_close = '', ''
    if mode in ('nb', 'sepia'):
        matrix = ('0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0' if mode == 'nb'
                  else '0.39 0.45 0.12 0 0.04 0.33 0.4 0.1 0 0.02 0.25 0.3 0.08 0 0 0 0 0 1 0')
        defs += (f'<filter id="tone"><feColorMatrix type="matrix" values="{matrix}"/></filter>'
                 '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/>'
                 '<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .35 0"/></filter>')
        wrap_open, wrap_close = '<g filter="url(#tone)">', '</g>'
        filt = f'<rect width="{w}" height="{h}" filter="url(#grain)" opacity=".5"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs>{defs}</defs>'
            f'{wrap_open}{back}{extra}{group}{wrap_close}{filt}</svg>')


def lighten(hexc, k):
    c = [int(hexc[i:i + 2], 16) for i in (1, 3, 5)]
    c = [round(v + (255 - v) * k) for v in c]
    return '#' + ''.join(f'{v:02X}' for v in c)


def darken(hexc, k):
    c = [int(hexc[i:i + 2], 16) for i in (1, 3, 5)]
    c = [round(v * (1 - k)) for v in c]
    return '#' + ''.join(f'{v:02X}' for v in c)


BODY = ['#8C1C13', '#1F3A5F', '#E6DECB', '#2E4D3A', '#C9A227', '#6E7277', '#14181C', '#9DBCCD', '#B5562B', '#5B2333', '#D8D3C4', '#3E5C76']


def gen_photos():
    rnd = random.Random(7)
    specs = []
    # (nom, w, h, fond, forme, mode, prospectus)
    plan = [
        ('m01', 800, 600, 'plein-air', 'vintage', 'sepia', None),
        ('m02', 800, 560, 'studio', 'vintage', 'nb', None),
        ('m03', 800, 600, 'studio', 'berline', 'nb', None),
        ('m04', 900, 600, 'plein-air', 'compacte', 'couleur', None),
        ('m05', 800, 600, 'studio', 'fastback', 'couleur', None),
        ('m06', 800, 600, 'crepuscule', 'coupe', 'couleur', None),
        ('m07', 800, 520, 'studio', 'break', 'couleur', None),
        ('m08', 800, 600, 'plein-air', 'berline', 'couleur', None),
        ('m09', 640, 800, 'papier', 'berline', 'couleur', '#8C1C13'),
        ('m10', 800, 600, 'studio', 'coupe', 'couleur', None),
        ('m11', 800, 600, 'plein-air', 'fastback', 'sepia', None),
        ('m12', 800, 600, 'studio', 'compacte', 'couleur', None),
        ('d01', 900, 600, 'studio', 'fastback', 'couleur', None),
        ('d02', 640, 860, 'papier', 'fastback', 'couleur', '#1F3A5F'),
        ('d03', 900, 560, 'plein-air', 'fastback', 'couleur', None),
        ('d04', 800, 600, 'crepuscule', 'fastback', 'couleur', None),
        ('d05', 900, 600, 'studio', 'fastback', 'nb', None),
        ('d06', 640, 820, 'papier', 'break', 'couleur', '#2E4D3A'),
        ('d07', 900, 600, 'plein-air', 'break', 'couleur', None),
        ('d08', 900, 640, 'studio', 'fastback', 'sepia', None),
        ('d09', 900, 600, 'salon', 'fastback', 'couleur', None),
        ('d10', 800, 600, 'plein-air', 'fastback', 'couleur', None),
        ('d11', 640, 820, 'papier', 'fastback', 'couleur', '#B5562B'),
        ('d12', 900, 560, 'studio', 'fastback', 'couleur', None),
        ('s01', 800, 600, 'salon', 'coupe', 'couleur', None),
        ('s02', 800, 600, 'salon', 'vintage', 'sepia', None),
        ('s03', 800, 600, 'salon', 'berline', 'couleur', None),
        ('s04', 800, 600, 'salon', 'compacte', 'couleur', None),
        ('s05', 800, 600, 'salon', 'fastback', 'couleur', None),
        ('s06', 800, 600, 'salon', 'break', 'nb', None),
        ('s07', 800, 600, 'salon', 'coupe', 'couleur', None),
        ('s08', 800, 600, 'salon', 'berline', 'sepia', None),
        ('s09', 800, 600, 'salon', 'vintage', 'nb', None),
        ('s10', 800, 600, 'salon', 'fastback', 'couleur', None),
    ]
    for i, (name, w, h, bg, shape, mode, broch) in enumerate(plan):
        color = BODY[rnd.randrange(len(BODY))]
        if name.startswith('d'):
            color = ['#5B2333', '#E6DECB', '#1F3A5F', '#2E4D3A', '#14181C', '#D8D3C4', '#9DBCCD', '#C9A227', '#5B2333', '#E6DECB', '#3E5C76', '#B5562B'][i % 12]
        svg = photo_svg(w, h, bg, shape, color, darken(color, .45), mode, broch, seed=i)
        write(f'photos/{name}.svg', svg)
        specs.append(name)
    return specs


BRANDS = [
    # nom, pays, début, fin
    ('Abarth', 'IT', 1949, None), ('AC', 'GB', 1901, None), ('Alfa Romeo', 'IT', 1910, None), ('Alpine', 'FR', 1955, None),
    ('Alvis', 'GB', 1919, 1967), ('Amilcar', 'FR', 1921, 1939), ('Aston Martin', 'GB', 1913, None), ('Audi', 'DE', 1909, None),
    ('Austin', 'GB', 1905, 1987), ('Autobianchi', 'IT', 1955, 1995), ('Avions Voisin', 'FR', 1919, 1939),
    ('Ballot', 'FR', 1919, 1932), ('Bentley', 'GB', 1919, None), ('BMW', 'DE', 1916, None), ('Borgward', 'DE', 1929, 1961),
    ('Bugatti', 'FR', 1909, None), ('Buick', 'US', 1903, None), ('Bristol', 'GB', 1945, 2011),
    ('Cadillac', 'US', 1902, None), ('Chenard & Walcker', 'FR', 1899, 1946), ('Chevrolet', 'US', 1911, None), ('Chrysler', 'US', 1925, None),
    ('Cisitalia', 'IT', 1946, 1965), ('Citroën', 'FR', 1919, None), ('Cord', 'US', 1929, 1937), ('Corre La Licorne', 'FR', 1901, 1949),
    ('Daimler', 'GB', 1896, 2007), ('Darracq', 'FR', 1896, 1920), ('De Dion-Bouton', 'FR', 1883, 1932), ('De Tomaso', 'IT', 1959, 2004),
    ('Delage', 'FR', 1905, 1953), ('Delahaye', 'FR', 1894, 1954), ('DS', 'FR', 2014, None), ('Duesenberg', 'US', 1913, 1937),
    ('Facel Vega', 'FR', 1954, 1964), ('Ferrari', 'IT', 1947, None), ('Fiat', 'IT', 1899, None), ('Ford', 'US', 1903, None),
    ('Hispano-Suiza', 'ES', 1904, 1946), ('Hotchkiss', 'FR', 1903, 1955), ('Honda', 'JP', 1948, None),
    ('Jaguar', 'GB', 1922, None), ('Lancia', 'IT', 1906, None), ('Lotus', 'GB', 1948, None),
    ('Matra', 'FR', 1964, 2003), ('Mercedes-Benz', 'DE', 1926, None), ('Panhard', 'FR', 1887, 1967), ('Peugeot', 'FR', 1889, None),
    ('Porsche', 'DE', 1931, None), ('Renault', 'FR', 1899, None), ('Saab', 'SE', 1945, 2012), ('Simca', 'FR', 1934, 1980),
    ('Skoda', 'CZ', 1895, None), ('Spyker', 'NL', 1880, None), ('Talbot', 'FR', 1903, 1959), ('Tatra', 'CZ', 1850, None), ('Volvo', 'SE', 1927, None),
]
MISSING_LOGO = {'Corre La Licorne', 'Darracq'}


def slug(name):
    import unicodedata
    s = unicodedata.normalize('NFD', name).encode('ascii', 'ignore').decode().lower()
    return ''.join(c if c.isalnum() else '-' for c in s).strip('-')


def gen_logos():
    rnd = random.Random(11)
    out = []
    for i, (name, pays, debut, fin) in enumerate(BRANDS):
        s = slug(name)
        if name not in MISSING_LOGO:
            style = LOGO_STYLES[(i * 3 + rnd.randrange(3)) % len(LOGO_STYLES)]
            color = LOGO_COLORS[rnd.randrange(len(LOGO_COLORS))]
            write(f'logos/{s}.svg', logo_svg(name, style, color))
        out.append(dict(nom=name, slug=s, pays=pays, debut=debut, fin=fin, initials=initials(name)))
    return out


if __name__ == '__main__':
    gen_flags()
    brands = gen_logos()
    photos = gen_photos()
    with open(os.path.join(ROOT, 'brands.js'), 'w') as f:
        f.write('window.MK_BRANDS = ' + json.dumps(brands, ensure_ascii=False) + ';\n')
    print(len(brands), 'marques,', len(photos), 'photos,', len(FLAGS), 'drapeaux')
