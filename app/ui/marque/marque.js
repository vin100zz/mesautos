app.controller('MarqueCtrl', function ($scope, $routeParams, $location, $anchorScroll, $timeout, $window, Auto, Categorie, ImageManager, Pays, Storage) {

  var VUES = ['modeles', 'chronologie', 'histoire'];
  var ZOOMS = [1, 2, 4, 8];

  var annee4 = function (texte) {
    var r = /\d{4}/.exec(texte || '');
    return r ? parseInt(r[0], 10) : null;
  };

  var intervalle = function (a, b) {
    a = (a || '').trim();
    b = (b || '').trim();
    return a && b ? a + ' – ' + b : (a || b);
  };

  /* Vue (dans l'URL : ?vue=chronologie) */
  var lireVue = function () {
    var vue = $location.search().vue;
    return VUES.indexOf(vue) >= 0 ? vue : 'modeles';
  };
  $scope.vue = lireVue();

  $scope.showView = function (vue) {
    $scope.vue = vue;
    $location.search('vue', vue === 'modeles' ? null : vue);
  };

  $scope.$on('$routeUpdate', function () {
    $scope.vue = lireVue();
  });

  /* Préférences d'affichage */
  $scope.affichage = Storage.get('mesautos-affichage') === 'liste' ? 'liste' : 'grille';
  $scope.setAffichage = function (affichage) {
    $scope.affichage = affichage;
    Storage.set('mesautos-affichage', affichage);
  };

  $scope.ordre = Storage.get('mesautos-ordre') === 'desc' ? 'desc' : 'asc';
  $scope.toggleOrdre = function () {
    $scope.ordre = $scope.ordre === 'desc' ? 'asc' : 'desc';
    Storage.set('mesautos-ordre', $scope.ordre);
    rebuild();
  };

  /* Chargement */
  Auto.get({
      service: 'marque',
      id: $routeParams.marqueId
    },
    function (marque) {
      $scope.$parent.$root.pageTitle = " - " + marque.nomMarque;

      $scope.marque = marque;
      $scope.logo = ImageManager.logoPath(marque.idMarque);
      $scope.initials = ImageManager.initials(marque.nomMarque);
      $scope.paysNom = marque.pays ? Pays.nom(marque.pays) : '';
      $scope.flag = Pays.flag(marque.pays);
      $scope.annees = (marque.debut || marque.fin) ? (marque.debut || '…') + ' – ' + (marque.fin || '…') : '';

      var presentes = {};
      $scope.modeles = (marque.modeles || []).map(function (modele) {
        modele.nomModele = modele.nomModele.trim();
        var yearInName = / \((\d\d\d\d)\)$/.exec(modele.nomModele);
        if (yearInName && yearInName.length > 1) {
          modele.nomModele = modele.nomModele.substr(0, modele.nomModele.length - 7).trim();
          modele.yearInName = yearInName[1];
        }

        modele.categorieCfg = Categorie.cfg(modele.categorie);
        presentes[modele.categorie] = true;

        modele.photo = ImageManager.versionPath(modele.idDocEmblematique);
        modele.annee = modele.yearInName ? parseInt(modele.yearInName, 10) : annee4(modele.debut);
        modele.periode = intervalle(modele.debut, modele.fin);

        modele.specs = [];
        if (modele.periode) {
          modele.specs.push({ k: 'Date', v: modele.periode });
        }
        var cylindree = intervalle(modele.cylindree_min, modele.cylindree_max);
        if (cylindree) {
          modele.specs.push({ k: 'Cylindrée', v: cylindree });
        }
        var puissance = intervalle(modele.puissance_min, modele.puissance_max);
        if (puissance) {
          modele.specs.push({ k: 'Puissance', v: puissance });
        }
        if (modele.production) {
          modele.specs.push({ k: 'Production', v: modele.production });
        }
        return modele;
      });

      $scope.categories = Categorie.array().filter(function (categorie) {
        return presentes[categorie.code];
      }).map(function (categorie) {
        categorie.on = true;
        return categorie;
      });

      rebuild();

      $timeout(function () {
        $anchorScroll();
      }, 100);
    });

  /* Filtres */
  var visible = function (modele) {
    if (!Categorie.known(modele.categorie)) {
      return true;
    }
    var categorie = $scope.categories.find(function (c) {
      return c.code === modele.categorie;
    });
    return categorie ? categorie.on : true;
  };

  $scope.toggleCategorie = function (categorie) {
    categorie.on = !categorie.on;
    rebuild();
  };

  $scope.onlyCategorie = function (categorie) {
    $scope.categories.forEach(function (c) {
      c.on = (c === categorie);
    });
    rebuild();
  };

  /* Groupes par décennie (dans l'ordre défini pour la marque) */
  var rebuild = function () {
    if (!$scope.modeles) {
      return;
    }
    var liste = $scope.modeles.filter(visible);
    if ($scope.ordre === 'desc') {
      liste = liste.slice().reverse();
    }

    var groups = [];
    var decennies = [];
    var vues = {};
    if ($scope.modeles.length <= 8) {
      groups.push({ id: 'groupe-0', label: '', items: liste });
    } else {
      var courant = null;
      liste.forEach(function (modele) {
        var decennie = modele.annee ? Math.floor(modele.annee / 10) * 10 : (courant ? courant.decennie : null);
        if (!courant || decennie !== courant.decennie) {
          courant = {
            id: 'groupe-' + groups.length,
            decennie: decennie,
            label: decennie ? 'Années ' + decennie : '',
            items: []
          };
          groups.push(courant);
          if (decennie && !vues[decennie]) {
            vues[decennie] = true;
            decennies.push({ decennie: decennie, id: courant.id });
          }
        }
        courant.items.push(modele);
      });
    }

    $scope.groups = groups.filter(function (g) {
      return g.items.length;
    });
    $scope.decennies = decennies;
    buildTimeline();
  };

  $scope.scrollToId = function (id) {
    var element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* Chronologie */
  $scope.zoom = 1;
  $scope.sel = null;

  $scope.zoomIn = function () {
    $scope.zoom = ZOOMS[Math.min(ZOOMS.indexOf($scope.zoom) + 1, ZOOMS.length - 1)];
    buildTimeline();
  };
  $scope.zoomOut = function () {
    $scope.zoom = ZOOMS[Math.max(ZOOMS.indexOf($scope.zoom) - 1, 0)];
    buildTimeline();
  };

  var buildTimeline = function () {
    if (!$scope.modeles) {
      return;
    }
    var selection = $scope.sel ? $scope.sel.m : null;
    $scope.sel = null;

    var events = $scope.modeles.filter(visible).map(function (m) {
      var y = m.yearInName ? parseInt(m.yearInName, 10) : null;
      var d = annee4(m.debut);
      var f = annee4(m.fin);
      var debut = y || d;
      if (d && y && Math.abs(d - y) <= 3) {
        debut = d;
      }
      if (!debut) {
        return null;
      }
      return { m: m, b: debut, e: f && f > debut ? f : null };
    }).filter(Boolean).sort(function (a, b) {
      return a.b - b.b;
    });

    $scope.hasChrono = $scope.hasChrono || events.length > 0;
    if (!events.length) {
      $scope.chrono = null;
      return;
    }

    var now = new Date().getFullYear();
    var min = events[0].b;
    var max = Math.max.apply(null, events.map(function (ev) {
      return ev.e || ev.b;
    }));
    var start = min - 2;
    var end = max + 3;
    if (max >= now - 2) {
      end = Math.max(end, now + 2);
    }

    var conteneur = document.querySelector('.chrono');
    var gutter = $window.innerWidth <= 860 ? 16 : Math.min(64, Math.max(24, $window.innerWidth * 0.03));
    var avail = Math.max(320, (conteneur ? conteneur.clientWidth : document.documentElement.clientWidth - 2 * gutter) - 18);
    var ppy = Math.max(avail / (end - start), 6) * $scope.zoom;
    var ROW = 36;
    var TOP = 44;
    var rowsEnd = [];
    var x = function (annee) {
      return Math.round((annee - start) * ppy);
    };

    events.forEach(function (ev) {
      var left = x(ev.b);
      var dur = ev.e ? Math.round((ev.e - ev.b) * ppy) : 0;
      var width = Math.max(dur, Math.round(ev.m.nomModele.length * 6.6) + 24);
      var row = rowsEnd.findIndex(function (fin) {
        return fin + 10 <= left;
      });
      if (row === -1) {
        row = rowsEnd.length;
        rowsEnd.push(0);
      }
      rowsEnd[row] = left + width;
      ev.left = left;
      ev.top = TOP + row * ROW;
      ev.width = width;
      ev.dur = dur;
      ev.color = ev.m.categorieCfg.color;
      ev.periode = ev.b + (ev.e ? ' – ' + ev.e : '');
    });

    var width = x(end);
    var height = Math.max(TOP + rowsEnd.length * ROW + 24, 320);
    var grid = [];
    for (var annee = Math.ceil(start / 10) * 10; annee <= end; annee += 10) {
      grid.push({ year: annee, left: x(annee) });
    }

    $scope.chrono = {
      width: width,
      height: height,
      events: events,
      grid: grid,
      today: now >= start && now <= end ? x(now) : null
    };

    if (selection) {
      $scope.select(events.find(function (ev) {
        return ev.m === selection;
      }) || null);
    }
  };

  $scope.select = function (ev) {
    if (!ev || $scope.sel === ev) {
      $scope.sel = null;
      return;
    }
    var c = $scope.chrono;
    ev.popLeft = Math.max(0, Math.min(ev.left - 20, c.width - 270));
    ev.popTop = ev.top + 36;
    if (ev.popTop + 270 > c.height) {
      ev.popTop = Math.max(0, ev.top - 272);
    }
    $scope.sel = ev;
  };

  var resizeTimer = null;
  var onResize = function () {
    $timeout.cancel(resizeTimer);
    resizeTimer = $timeout(buildTimeline, 200);
  };
  angular.element($window).on('resize', onResize);
  $scope.$on('$destroy', function () {
    angular.element($window).off('resize', onResize);
  });

});


/* Texte historique : sommaire, liens externes dans un nouvel onglet, images dans la visionneuse */
app.directive('maHisto', function ($timeout, Viewer) {
  var IMAGE = /\.(jpe?g|png|gif|webp)$/i;

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var root = element[0];

      var scan = function () {
        var toc = [];
        Array.prototype.forEach.call(root.querySelectorAll('.cadre'), function (cadre) {
          var first = cadre.firstElementChild;
          var texte = first && first.tagName === 'P' ? first.textContent.replace(/\s+/g, ' ').trim() : '';
          if (!texte) {
            return;
          }
          var date = '';
          var titre = texte.replace(/\s*:\s*$/, '');
          var m = /^(.{1,24}?)\s*:\s+(.+)$/.exec(titre);
          if (m && /\d/.test(m[1])) {
            date = m[1];
            titre = m[2];
          }
          toc.push({ date: date, titre: titre, el: cadre });
        });
        scope.histoToc = toc;

        Array.prototype.forEach.call(root.querySelectorAll('a[href^="http"]'), function (a) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener');
        });
      };

      scope.$watch(attrs.maHisto, function (html) {
        scope.histoToc = [];
        if (html) {
          $timeout(scan);
        }
      });

      scope.scrollToCadre = function (item) {
        item.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      var photoLinks = function () {
        return Array.prototype.filter.call(root.querySelectorAll('a[href]'), function (a) {
          return a.querySelector('img') && IMAGE.test(a.getAttribute('href'));
        });
      };

      element.on('click', function (event) {
        var a = event.target.closest ? event.target.closest('a') : null;
        if (!a || !root.contains(a) || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) {
          return;
        }
        var links = photoLinks();
        var index = links.indexOf(a);
        if (index < 0) {
          return;
        }
        event.preventDefault();
        var photos = links.map(function (link) {
          var bloc = link.closest('.box') || link.closest('.cadre') || link.parentNode;
          var legende = bloc ? bloc.querySelector('.legende') : null;
          var source = legende ? legende.textContent.trim() : '';
          return {
            src: link.getAttribute('href'),
            alt: source || 'Document',
            source: source
          };
        });
        scope.$apply(function () {
          Viewer.open(photos, index);
        });
      });
    }
  };
});
