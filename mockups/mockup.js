/* Maquettes statiques de Mes Autos.
   Reproduit le DOM des gabarits Angular (app/ui/**.html) avec des données d'exemple,
   sous les feuilles de style réelles. Paramètres : ?screen=…&theme=…&shot=1 */
(function () {

  var THEMES = [
    { id: 'actuel', name: 'Avant 3A (Atelier)', group: 'Référence' }
  ].concat(window.MK_THEMES || []);

  var SCREENS = [
    { id: 'marques', name: 'Marques' },
    { id: 'marque', name: 'Marque (Citroën)' },
    { id: 'modele', name: 'Modèle (DS)' },
    { id: 'salons', name: 'Salons' },
    { id: 'nouveautes', name: 'Nouveautés' },
    { id: 'annee', name: 'Nouveautés 1967' },
    { id: 'recherche', name: 'Recherche ouverte' }
  ];

  var params = new URLSearchParams(location.search);
  var screen = params.get('screen') || 'marques';
  var theme = params.get('theme') || 'actuel';
  if (params.get('shot')) {
    document.documentElement.classList.add('mk-shot');
  }
  if (theme !== 'actuel') {
    document.getElementById('mk-theme').href = 'themes/' + theme + '.css';
  }
  document.documentElement.setAttribute('data-mk-theme', theme);

  /* ---------------------------------------------------------------- Icônes (app/ui/common/icons.js) */
  var STAR = 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z';
  var PATHS = {
    'car': '<path d="M4 16H3.5a.5.5 0 0 1-.5-.5v-3.3l2.1-4.4A2 2 0 0 1 6.9 6.6h10.2a2 2 0 0 1 1.8 1.2l2.1 4.4v3.3a.5.5 0 0 1-.5.5H20"/><path d="M3.5 12h17"/><path d="M9.5 16h5"/><circle cx="7" cy="16" r="2.2"/><circle cx="17" cy="16" r="2.2"/>',
    'calendar': '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    'bell': '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    'trophy': '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4.5M16 6h3a3 3 0 0 1-3 4.5"/><path d="M12 13v4M9 20h6M10 17h4v3h-4z"/>',
    'star': '<path d="' + STAR + '"/>',
    'star-fill': '<path d="' + STAR + '" fill="currentColor"/>',
    'search': '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    'home': '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5"/>',
    'x': '<path d="M6 6l12 12M18 6L6 18"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'edit': '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>',
    'chevron-left': '<path d="M15 6l-6 6 6 6"/>',
    'chevron-right': '<path d="M9 6l6 6-6 6"/>',
    'chevron-up': '<path d="M6 15l6-6 6 6"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'dots': '<circle cx="5" cy="12" r="1.8" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.8" fill="currentColor" stroke="none"/>',
    'link': '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    'image': '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',
    'grid': '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    'list': '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    'sort': '<path d="M7 4v16M7 20l-3-3M7 20l3-3"/><path d="M17 20V4M17 4l-3 3M17 4l3 3"/>',
    'external': '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
  };
  function icon(name) {
    return '<i class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">' + (PATHS[name] || '') + '</svg></i>';
  }

  /* ---------------------------------------------------------------- Données */
  var PAYS = { FR: 'France', IT: 'Italie', GB: 'Royaume-Uni', DE: 'Allemagne', US: 'États-Unis', ES: 'Espagne', JP: 'Japon', SE: 'Suède', CZ: 'Tchéquie', NL: 'Pays-Bas', BE: 'Belgique', CH: 'Suisse', AT: 'Autriche' };
  var CAT = {
    COC: { short: 'Concept car', color: '#4F7FEA', tint: '#E1EAFF', ink: '#2F4FA8' },
    CPT: { short: 'Compétition', color: '#E5483D', tint: '#FFE1DE', ink: '#A12B22' },
    PRO: { short: 'Prototype', color: '#E07A3F', tint: '#FDE7D8', ink: '#9A4A18' },
    TOU: { short: 'Tourisme', color: '#2FA877', tint: '#DDF3E8', ink: '#1E6B48' },
    UTI: { short: 'Utilitaire', color: '#8D63E6', tint: '#EDE4FF', ink: '#5B3BA6' }
  };
  var CAT_TYPE = { TOU: 'Voiture de Tourisme', UTI: 'Utilitaire', PRO: 'Prototype', COC: 'Concept Car', CPT: 'Voiture de Compétition' };

  function flag(code) { return 'assets/flags/' + code + '.svg'; }
  function photo(id) { return 'assets/photos/' + id + '.svg'; }
  function logo(slug) { return 'assets/logos/' + slug + '.svg'; }
  function annees(d, f) { return (d || '…') + ' – ' + (f || '…'); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function brand(nom) {
    return window.MK_BRANDS.filter(function (b) { return b.nom === nom; })[0];
  }
  var MISSING = { 'Corre La Licorne': true, 'Darracq': true };

  /* ---------------------------------------------------------------- En-tête du site (index.html) */
  function header(section) {
    function nav(id, href, ic, label) {
      return '<a href="' + href + '"' + (section === id ? ' class="is-active"' : '') + '>' + icon(ic) + label + '</a>';
    }
    return '<header class="site-header"><div class="site-header__inner">' +
      '<a class="brand-mark" href="#" aria-label="Mes Autos"><svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><rect x="12" y="0" width="10" height="10" rx="2" fill="#D13F17"/><rect x="0" y="12" width="10" height="10" rx="2" fill="#D13F17"/><rect x="12" y="12" width="10" height="10" rx="2" fill="#F2A51A"/></svg><span>Mes Autos</span></a>' +
      '<nav class="site-nav" aria-label="Sections">' +
      nav('marques', '?screen=marques', 'car', 'Marques') +
      nav('salons', '?screen=salons', 'calendar', 'Salons') +
      nav('nouveautes', '?screen=nouveautes', 'bell', 'Nouveautés') +
      nav('courses', '#', 'trophy', 'Courses') +
      nav('miniatures', '#', 'star', 'Miniatures') +
      '</nav>' +
      '<div class="site-header__tools">' +
      '<button type="button" class="search-trigger">' + icon('search') + '<span>Rechercher</span></button>' +
      '<a class="site-header__link" href="#">' + icon('home') + '<span>Mes autos à moi</span></a>' +
      '</div></div></header>';
  }

  /* ---------------------------------------------------------------- Marques (app/ui/home/marques.html) */
  function screenMarques() {
    var brands = window.MK_BRANDS.slice().sort(function (a, b) { return a.nom.localeCompare(b.nom); });
    var sections = [], by = {};
    brands.forEach(function (b) {
      var l = b.nom.normalize('NFD').charAt(0).toUpperCase();
      if (!by[l]) { by[l] = { letter: l, items: [] }; sections.push(by[l]); }
      by[l].items.push(b);
    });
    var pays = [];
    brands.forEach(function (b) { if (pays.indexOf(b.pays) < 0) { pays.push(b.pays); } });

    var html = '<div class="page"><div class="page-head sticky-head">' +
      '<h1 class="page-title">Marques</h1>' +
      '<nav class="az" aria-label="Index alphabétique">' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (l) {
        return '<button type="button" class="az__letter" data-spy="lettre-' + l + '"' + (by[l] ? '' : ' disabled') + '>' + l + '</button>';
      }).join('') + '</nav>' +
      '<button type="button" class="btn btn--primary">' + icon('plus') + 'Ajouter une marque</button>' +
      '<div class="pays-flags" role="group" aria-label="Pays"><button type="button" class="pays-flags__all">Tous</button>' +
      pays.map(function (p) {
        return '<button type="button" class="pays-flags__flag' + (p === 'US' ? ' is-off' : '') + '" title="' + PAYS[p] + '"><img src="' + flag(p) + '" alt="' + PAYS[p] + '"></button>';
      }).join('') + '</div></div>';

    sections.forEach(function (s) {
      html += '<section class="letter-section" id="lettre-' + s.letter + '"><h2 class="letter-section__letter">' + s.letter + '</h2><div class="brand-wall">' +
        s.items.map(function (m) {
          return '<a class="brand" href="?screen=marque"><span class="brand__frame"><span class="brand__logo' + (MISSING[m.nom] ? ' is-missing' : '') + '" data-img-host>' +
            (MISSING[m.nom] ? '<img alt="">' : '<img loading="lazy" src="' + logo(m.slug) + '" alt="">') +
            '<span class="brand__initials">' + m.initials + '</span></span></span>' +
            '<span class="brand__name">' + esc(m.nom) + '</span>' +
            '<span class="brand__meta"><img class="flag" src="' + flag(m.pays) + '" alt="' + PAYS[m.pays] + '"><span>' + annees(m.debut, m.fin) + '</span></span></a>';
        }).join('') + '</div></section>';
    });
    return { section: 'marques', html: html + '</div>' };
  }

  /* ---------------------------------------------------------------- Marque (app/ui/marque/marque.html) */
  var MODELES = [
    ['B2', '1921', 'TOU', 'm01', '1921 – 1926', '1 452 cm³', '20 ch', '89 841', 'Évolution du Type A, première Citroën produite en grande série.'],
    ['C 5 HP « Trèfle »', '1922', 'TOU', 'm11', '1922 – 1926', '856 cm³', '11 ch', '80 759', 'Petite voiture populaire, souvent jaune, surnommée « Petit Citron ».'],
    ['B10', '1924', 'TOU', 'm02', '1924 – 1925', '1 452 cm³', '20 ch', '17 259', 'Première carrosserie tout acier en Europe.'],
    ['B14', '1926', 'TOU', '', '1926 – 1928', '1 539 cm³', '22 ch', '119 467', ''],
    ['C6', '1928', 'TOU', 'm08', '1928 – 1932', '2 442 cm³', '45 ch', '', ''],
    ['Rosalie 8', '1932', 'TOU', 'm05', '1932 – 1938', '1 452 cm³', '32 ch', '', ''],
    ['Traction Avant 7 A', '1934', 'TOU', 'm03', '1934 – 1957', '1 303 cm³', '32 ch', '759 111', 'Traction avant, caisse autoporteuse et freins hydrauliques : une révolution.'],
    ['TUB', '1939', 'UTI', '', '1939 – 1941', '1 628 cm³', '35 ch', '1 748', ''],
    ['Type H', '1947', 'UTI', 'm07', '1947 – 1981', '1 628 cm³', '50 ch', '473 289', 'Fourgon à tôle ondulée, plancher bas et porte latérale coulissante.'],
    ['2 CV', '1948', 'TOU', 'm04', '1948 – 1990', '375 cm³', '9 ch', '3 872 583', 'Présentée au Salon de Paris 1948 sous les sarcasmes, elle deviendra un mythe.'],
    ['DS 19', '1955', 'TOU', 'd01', '1955 – 1975', '1 911 cm³', '75 ch', '1 455 746', 'Suspension hydropneumatique et ligne de Flaminio Bertoni.'],
    ['ID 19', '1957', 'TOU', 'm12', '1957 – 1975', '1 911 cm³', '66 ch', '', ''],
    ['Ami 6', '1961', 'TOU', 'm08', '1961 – 1969', '602 cm³', '22 ch', '1 039 384', 'Lunette arrière inversée, signée Bertoni.'],
    ['Prototype C-60', '1962', 'PRO', 'm10', '1959 – 1962', '', '', '', 'Étude de berline intermédiaire restée sans suite.'],
    ['Dyane', '1967', 'TOU', 'm06', '1967 – 1984', '602 cm³', '32 ch', '1 443 583', ''],
    ['SM', '1970', 'TOU', 'd04', '1970 – 1975', '2 670 cm³', '170 ch', '12 920', 'V6 Maserati et phares directionnels.'],
    ['Karin', '1980', 'COC', 'm09', '1980', '', '', '', 'Concept car pyramidal du Salon de Paris 1980.']
  ];

  function screenMarque() {
    var b = brand('Citroën');
    var groups = [], cur = null;
    MODELES.forEach(function (m, i) {
      var dec = Math.floor(+m[1] / 10) * 10;
      if (!cur || cur.dec !== dec) { cur = { dec: dec, id: 'groupe-' + groups.length, items: [] }; groups.push(cur); }
      cur.items.push(m);
    });
    var chips = [['TOU', true], ['UTI', true], ['PRO', true], ['COC', false], ['CPT', true]];

    var html = '<div class="page"><div class="sticky-head marque-sticky"><div class="marque-head">' +
      '<span class="logo-tile logo-tile--lg" data-img-host><img src="' + logo(b.slug) + '" alt="Logo Citroën"><span class="logo-tile__initials">CI</span></span>' +
      '<div class="marque-head__text"><div class="marque-head__meta"><img class="flag" src="' + flag('FR') + '" alt=""><span class="label">France<span> · </span>Paris</span><span class="mono marque-head__annees">1919 – …</span></div>' +
      '<h1 class="marque-title">Citroën</h1></div>' +
      '<div class="actions"><button type="button" class="btn btn--secondary btn--sm">' + icon('edit') + 'Modifier la marque</button>' +
      '<button type="button" class="btn btn--primary btn--sm">' + icon('plus') + 'Ajouter un modèle</button></div></div>' +
      '<div class="toolbar"><nav class="segmented tabs" aria-label="Vues de la marque">' +
      '<button type="button" class="is-on" aria-pressed="true">Modèles</button><button type="button">Chronologie</button><button type="button">Histoire</button></nav>' +
      '<div class="chips" role="group" aria-label="Catégories">' +
      chips.map(function (c) {
        var cfg = CAT[c[0]];
        return '<button type="button" class="chip' + (c[1] ? ' is-on' : '') + '"' + (c[1] ? ' style="background: ' + cfg.tint + '; color: ' + cfg.ink + ';"' : '') + '>' + cfg.short + '</button>';
      }).join('') + '</div>' +
      '<nav class="decennies-nav" aria-label="Décennies">' +
      groups.map(function (g) { return '<button type="button" class="decennies-nav__item" data-spy="' + g.id + '">' + g.dec + '</button>'; }).join('') + '</nav>' +
      '<div class="toolbar__right"><button type="button" class="btn btn--secondary btn--sm">' + icon('sort') + 'Plus anciens d’abord</button>' +
      '<div class="segmented segmented--icons" role="group" aria-label="Affichage"><button type="button" class="is-on" aria-label="Grille">' + icon('grid') + '</button><button type="button" aria-label="Liste">' + icon('list') + '</button></div></div>' +
      '</div></div><div>';

    groups.forEach(function (g) {
      html += '<section class="model-group" id="' + g.id + '"><h2 class="section-title">Années ' + g.dec + '</h2><div class="model-grid">' +
        g.items.map(function (m) {
          var cfg = CAT[m[2]];
          var specs = [['Date', m[4]], ['Cylindrée', m[5]], ['Puissance', m[6]], ['Production', m[7]]].filter(function (s) { return s[1]; });
          return '<a class="model-card" href="?screen=modele">' +
            '<span class="frame' + (m[3] ? '' : ' is-empty') + '" data-img-host>' +
            (m[3] ? '<img class="frame__bg" src="' + photo(m[3]) + '" alt=""><img class="frame__img" src="' + photo(m[3]) + '" alt="' + esc(m[0]) + '">' : '') +
            '<span class="frame__empty">' + icon('image') + '</span>' +
            '<span class="cat-pill cat-badge" style="background: ' + cfg.tint + '; color: ' + cfg.ink + ';">' + cfg.short + '</span></span>' +
            '<span class="model-card__body"><span class="model-card__title"><span class="model-card__name">' + esc(m[0]) + '</span><span class="model-card__year mono">' + m[1] + '</span></span>' +
            (specs.length ? '<dl class="specs">' + specs.map(function (s) { return '<div class="specs__row"><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd></div>'; }).join('') + '</dl>' : '') +
            (m[8] ? '<span class="model-card__comment">' + esc(m[8]) + '</span>' : '') +
            '</span></a>';
        }).join('') + '</div></section>';
    });
    return { section: 'marques', html: html + '</div></div>' };
  }

  /* ---------------------------------------------------------------- Modèle (app/ui/modele/modele.html + gamme) */
  function screenModele() {
    var b = brand('Citroën');
    var am = [
      ['1955', 'd01', [['DS 19', '']]],
      ['1957', 'd03', [['ID 19', '']]],
      ['1959', 'd05', [['DS 19', ''], ['ID 19 Break', 'UTI']]],
      ['1962', 'd07', [['DS 19', ''], ['Cabriolet', 'TOU']]],
      ['1965', 'd08', [['DS 21', ''], ['DS 19', '']]],
      ['1967', 'd09', [['DS 21 Pallas', ''], ['DS 21', ''], ['ID 19', '']], true],
      ['1969', 'd10', [['DS 21 Pallas', '']]],
      ['1972', '', [['DS 23', ''], ['', 'PRO']]],
      ['1975', 'd12', [['DS 23 Pallas', '']]]
    ];
    var docs = [
      ['d09', 'Salon de Paris', 'Octobre 1967', 'Stand Citroën, Grand Palais : présentation de la nouvelle face avant à phares directionnels.', 'star-fill'],
      ['d02', 'Prospectus Citroën', '1967', '', 'star'],
      ['d01', 'L’Automobile', 'Novembre 1967', 'Essai routier : 1 500 km au volant de la DS 21 Pallas.'],
      ['d06', 'Prospectus Citroën', '1968', 'Gamme break et familiale.'],
      ['d03', 'Archives Citroën', '', ''],
      ['d11', 'Prospectus Citroën', '1969', ''],
      ['d04', 'L’Action automobile', 'Janvier 1968', 'Sur la route de Deauville.'],
      ['d05', 'Archives Citroën', '1967', 'Photographie d’usine, quai de Javel.'],
      ['d08', 'Collection privée', '', 'Tirage d’époque.'],
      ['d10', 'Auto-Journal', 'Mars 1968', ''],
      ['d12', 'Archives Citroën', '1968', '']
    ];
    var html = '<div class="page"><div class="sticky-head modele-sticky"><div class="modele-head">' +
      '<a class="logo-tile logo-tile--md" href="?screen=marque" aria-label="Citroën" data-img-host><img src="' + logo(b.slug) + '" alt=""><span class="logo-tile__initials">CI</span></a>' +
      '<div class="modele-head__text"><nav class="crumbs" aria-label="Fil d’Ariane"><a href="?screen=marques">Marques</a>' + icon('chevron-right') + '<a href="?screen=marque">Citroën</a></nav>' +
      '<div class="modele-head__line"><h1 class="modele-title">DS</h1><span class="mono modele-head__annee">1955</span>' +
      '<span class="cat-pill" style="background: ' + CAT.TOU.tint + '; color: ' + CAT.TOU.ink + ';">Tourisme</span></div></div>' +
      '<div class="actions"><button type="button" class="btn btn--secondary btn--sm">' + icon('edit') + 'Modifier le modèle</button>' +
      '<button type="button" class="btn btn--primary btn--sm">' + icon('plus') + 'Ajouter une gamme</button></div></div>' +
      '<div class="am-bar"><nav class="am-strip" aria-label="Années-modèles et gammes">' +
      am.map(function (a) {
        return '<div class="am-card' + (a[3] ? ' is-current' : '') + '">' +
          '<button type="button" class="am-card__thumb frame' + (a[1] ? '' : ' is-empty') + '" data-img-host>' +
          (a[1] ? '<img class="frame__img am-card__img" src="' + photo(a[1]) + '" alt="">' : '') + '<span class="frame__empty">' + icon('image') + '</span></button>' +
          '<div class="am-card__body"><div class="am-card__year mono">' + a[0] + '</div>' +
          a[2].map(function (g, i) {
            var on = a[3] && i === 0;
            return '<button type="button" class="am-gamme' + (on ? ' is-on' : '') + '">' +
              (g[0] ? '<span>' + g[0] + '</span>' : '') +
              (g[1] ? '<span class="am-gamme__type' + (g[0] ? ' is-mini' : '') + '">' + CAT_TYPE[g[1]] + '</span>' : '') + '</button>';
          }).join('') + '</div></div>';
      }).join('') + '</nav><button type="button" class="am-toggle" aria-label="Réduire">' + icon('chevron-up') + '</button></div></div>';

    html += '<section class="gamme"><div class="gamme-head"><h2 class="gamme-title">DS 21 Pallas <span class="gamme-title__type">Voiture de Tourisme</span></h2>' +
      '<div class="actions"><button type="button" class="btn btn--secondary btn--sm">' + icon('edit') + 'Modifier la gamme</button>' +
      '<button type="button" class="btn btn--primary btn--sm">' + icon('plus') + 'Ajouter un document</button></div></div>' +
      '<div class="gamme-histo histo histo--note"><div class="cadre"><p></p><p>Finition haut de gamme apparue en 1964 : enjoliveurs de bas de caisse, baguettes inox, sellerie cuir en option et projecteurs à iode. Pour 1968, la face avant reçoit les phares carénés sous verre, dont les longue-portée suivent le braquage.</p></div></div>' +
      '<div class="deckgrid" deckgrid>';
    var cols = [[], [], [], [], []];
    var n = window.innerWidth >= 1500 ? 5 : (window.innerWidth >= 1200 ? 4 : (window.innerWidth >= 860 ? 3 : 2));
    docs.forEach(function (d, i) { cols[i % n].push(d); });
    for (var c = 0; c < n; c++) {
      html += '<div class="column column-1-' + n + '">' + cols[c].map(function (d) {
        return '<div><figure class="doc"><a class="doc__img" href="#" data-img-host><img src="' + photo(d[0]) + '" alt=""><span class="photo-missing">' + icon('image') + '</span></a>' +
          (d[4] ? '<span class="doc__emblem" role="img">' + icon(d[4]) + '</span>' : '') +
          '<button type="button" class="doc__menu-btn" aria-label="Actions">' + icon('dots') + '</button>' +
          '<figcaption class="doc__caption"><div class="doc__line"><span class="doc__source">' + d[1] + '</span>' +
          (d[2] ? '<span class="doc__date mono">' + d[2] + '</span>' : '') +
          (d[3] ? '' : '<button type="button" class="doc__link" aria-label="Liens">' + icon('link') + '</button>') + '</div>' +
          (d[3] ? '<div class="doc__legende">' + d[3] + '</div>' : '') + '</figcaption></figure></div>';
      }).join('') + '</div>';
    }
    return { section: 'marques', html: html + '</div></section></div>' };
  }

  /* ---------------------------------------------------------------- Salons (app/ui/home/salons.html) */
  function screenSalons() {
    var html = '<div class="page"><div class="page-head sticky-head"><h1 class="page-title">Salons</h1></div><div class="year-grid">';
    for (var y = 1975, i = 0; y >= 1946; y--, i++) {
      if (y === 1940 + 7) { continue; }
      var missing = y === 1958;
      html += '<a class="year-tile' + (missing ? ' is-missing' : '') + '" href="#" data-img-host>' +
        (missing ? '<img alt="">' : '<img loading="lazy" src="' + photo('s' + ('0' + (i % 10 + 1)).slice(-2)) + '" alt="">') +
        '<span class="photo-missing">' + icon('image') + '</span><span class="year-tile__label">' + y + '</span></a>';
    }
    return { section: 'salons', html: html + '</div></div>' };
  }

  /* ---------------------------------------------------------------- Nouveautés (app/ui/home/annees.html) */
  function screenNouveautes() {
    var html = '<div class="page"><div class="page-head sticky-head"><h1 class="page-title">Nouveautés</h1></div><div class="decennies">';
    for (var d = 1890; d <= 2020; d += 10) {
      html += '<div class="decennie"><div class="decennie__label">' + d + '</div><div class="decennie__annees">';
      for (var y = d; y < d + 10; y++) {
        var futur = y > 2026;
        var avec = !futur && (y >= 1946 ? (y % 7 !== 3) : ((y * 7) % 5 < 2));
        html += '<span class="decennie__cell">' +
          (avec ? '<a class="decennie__annee" href="?screen=annee">' + y + '</a>' : (futur ? '' : '<span class="decennie__annee is-empty">' + y + '</span>')) + '</span>';
      }
      html += '</div></div>';
    }
    return { section: 'nouveautes', html: html + '</div></div>' };
  }

  /* ---------------------------------------------------------------- Nouveautés d'une année (app/ui/annee/annee.html) */
  function screenAnnee() {
    var pays = [
      ['FR', [['Citroën', 'DS 21 Pallas', 'DS', 'd09'], ['Citroën', 'Dyane', '', 'm06'], ['Peugeot', '204 Coupé', '204', 'm10'], ['Renault', '16 TS', '16', 'm12'], ['Matra', '530 LX', 'M530', 'm05'], ['Simca', '1100 GLS', '1100', 'm04'], ['Alpine', 'A110 1300', 'A110', '']]],
      ['IT', [['Fiat', 'Dino Spider', 'Dino', 'm06'], ['Lancia', 'Fulvia Coupé Rallye', 'Fulvia', 'm10'], ['Alfa Romeo', '1750 Berlina', '', 'm08'], ['Ferrari', '365 GT 2+2', '365', 'd04']]],
      ['DE', [['Porsche', '911 T', '911', 'm05'], ['BMW', '1600-2', '02', 'm12'], ['Mercedes-Benz', '250 CE', '', 'm03']]]
    ];
    var html = '<div class="page"><div class="page-head sticky-head"><nav class="crumbs" aria-label="Fil d’Ariane"><a href="?screen=nouveautes">Nouveautés</a></nav>' +
      '<h1 class="page-title">1967</h1><div class="actions"><a class="btn btn--secondary mono" href="#">' + icon('chevron-left') + '1966</a>' +
      '<a class="btn btn--secondary mono" href="#">1968' + icon('chevron-right') + '</a></div></div>';
    pays.forEach(function (p) {
      html += '<section class="pays-section"><h2 class="section-title"><img class="flag flag--lg" src="' + flag(p[0]) + '" alt="">' + PAYS[p[0]] + '</h2><div class="gamme-grid">' +
        p[1].map(function (g) {
          return '<a class="gamme-card" href="#"><span class="frame' + (g[3] ? '' : ' is-empty') + '" data-img-host>' +
            (g[3] ? '<img class="frame__bg" src="' + photo(g[3]) + '" alt=""><img class="frame__img" src="' + photo(g[3]) + '" alt="">' : '') +
            '<span class="frame__empty">' + icon('image') + '</span></span>' +
            '<span class="gamme-card__marque">' + g[0] + '</span><span class="gamme-card__gamme">' + g[1] + '</span>' +
            (g[2] ? '<span class="gamme-card__modele">' + g[2] + '</span>' : '') + '</a>';
        }).join('') + '</div></section>';
    });
    return { section: 'nouveautes', html: html + '</div>' };
  }

  /* ---------------------------------------------------------------- Recherche (app/ui/common/search/search.html) */
  function searchOverlay() {
    var marques = ['Citroën', 'Cisitalia', 'Chrysler'];
    var modeles = [['Ci', 'troën 2 CV', '', 'Citroën'], ['Ci', 'troën DS 21 Pallas', '', 'Citroën'], ['Ci', 'nquecento', 'Fiat ', 'Fiat'], ['Ci', 'sitalia 202', '', 'Cisitalia']];
    return '<div class="search"><div class="search__backdrop"></div><div class="search__panel" role="dialog" aria-modal="true" aria-label="Rechercher">' +
      '<div class="search__bar">' + icon('search') + '<input type="search" class="search__input" value="ci" placeholder="Rechercher" aria-label="Rechercher">' +
      '<button type="button" class="btn-icon" aria-label="Fermer">' + icon('x') + '</button></div>' +
      '<div class="search__results"><div role="group"><div class="search__group label">Marques</div>' +
      marques.map(function (n, i) {
        var b = brand(n);
        return '<a href="#" class="search__row' + (i === 0 ? ' is-active' : '') + '"><span class="logo-tile search__logo" data-img-host><img src="' + logo(b.slug) + '" alt=""><span class="logo-tile__initials">' + b.initials + '</span></span>' +
          '<span class="search__name"><mark>' + n.slice(0, 2) + '</mark>' + n.slice(2) + '</span><span class="search__meta"><img class="flag" src="' + flag(b.pays) + '" alt=""></span></a>';
      }).join('') + '</div><div role="group"><div class="search__group label">Modèles</div>' +
      modeles.map(function (m) {
        return '<a href="#" class="search__row"><span class="search__name">' + m[2] + '<mark>' + m[0] + '</mark>' + m[1] + '</span><span class="search__meta"><span>' + m[3] + '</span></span></a>';
      }).join('') + '</div></div></div></div>';
  }

  /* ---------------------------------------------------------------- Rendu */
  var render = {
    marques: screenMarques, marque: screenMarque, modele: screenModele, salons: screenSalons,
    nouveautes: screenNouveautes, annee: screenAnnee, recherche: screenMarques
  }[screen] || screenMarques;
  var out = render();
  document.body.innerHTML = header(out.section) + '<div id="app">' + out.html + '</div>' + (screen === 'recherche' ? searchOverlay() : '');
  if (screen === 'recherche') {
    document.body.classList.add('is-locked');
  }

  /* ?lent=1 : photos retardées, pour voir l'état de chargement */
  if (params.get('lent')) {
    Array.prototype.forEach.call(document.querySelectorAll('.frame img, .year-tile img, .doc__img img'), function (img) {
      if (!img.getAttribute('src')) { return; }
      img.style.visibility = 'hidden';
      setTimeout(function () { img.style.visibility = ''; }, +params.get('lent') > 1 ? +params.get('lent') : 4000 + Math.random() * 3000);
    });
  }

  /* Hauteur de l'en-tête collant (directive maStickyHead) */
  var head = document.querySelector('.sticky-head');
  if (head) {
    new ResizeObserver(function () {
      document.documentElement.style.setProperty('--sticky-h', head.offsetHeight + 'px');
    }).observe(head);
  }

  /* Index et décennies surlignés au défilement (directive maScrollSpy) */
  var spies = document.querySelectorAll('.az, .decennies-nav');
  function spy() {
    Array.prototype.forEach.call(spies, function (nav) {
      var top = head ? head.getBoundingClientRect().bottom : 0;
      Array.prototype.forEach.call(nav.querySelectorAll('[data-spy]'), function (it) {
        var t = document.getElementById(it.getAttribute('data-spy'));
        var r = t ? t.getBoundingClientRect() : null;
        it.classList.toggle('is-visible', !!r && r.bottom > top + 24 && r.top < innerHeight - 24);
      });
    });
  }
  addEventListener('scroll', spy, { passive: true });
  addEventListener('resize', spy);
  requestAnimationFrame(spy);
  Array.prototype.forEach.call(document.querySelectorAll('[data-spy]'), function (it) {
    it.addEventListener('click', function () {
      var t = document.getElementById(it.getAttribute('data-spy'));
      if (t) { t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* Liens internes : conserver le thème */
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="?screen="]'), function (a) {
    a.href = a.getAttribute('href') + '&theme=' + theme;
  });

  /* Sélecteur */
  var sw = document.createElement('div');
  sw.className = 'mk-switch';
  function opt(list, val) {
    var html = '', group = null;
    list.forEach(function (it) {
      if (it.group && it.group !== group) { html += (group ? '</optgroup>' : '') + '<optgroup label="' + it.group + '">'; group = it.group; }
      html += '<option value="' + it.id + '"' + (it.id === val ? ' selected' : '') + '>' + it.name + '</option>';
    });
    return html + (group ? '</optgroup>' : '');
  }
  sw.innerHTML = '<a href="index.html">Toutes les propositions</a><select aria-label="Thème">' + opt(THEMES, theme) + '</select><select aria-label="Écran">' + opt(SCREENS, screen) + '</select>';
  document.body.appendChild(sw);
  var sels = sw.querySelectorAll('select');
  function go() { location.search = '?screen=' + sels[1].value + '&theme=' + sels[0].value; }
  sels[0].addEventListener('change', go);
  sels[1].addEventListener('change', go);
})();
