app.service('Search', function () {

  var state = this.state = {
    open: false,
    stale: true
  };

  this.open = function () {
    state.open = true;
  };

  this.close = function () {
    state.open = false;
  };

  // A appeler après une saisie : la liste sera rechargée à la prochaine ouverture
  this.invalidate = function () {
    state.stale = true;
  };

});

app.directive('maSearch', function ($document, $timeout, Auto, Pays, ImageManager, Search) {

  // Minuscules, sans accents ni espaces, avec la position d'origine de chaque caractère
  // (« c3 » trouve « C 3 », « mehari » trouve « Méhari »)
  function fold(text) {
    var folded = '';
    var map = [];
    for (var i = 0; i < text.length; i++) {
      var c = text[i].normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      if (!c || /\s/.test(c)) {
        continue;
      }
      for (var k = 0; k < c.length; k++) {
        folded += c[k];
        map.push(i);
      }
    }
    return { text: folded, map: map };
  }

  function entry(kind, name, extra) {
    return angular.extend({ kind: kind, name: name, key: fold(name) }, extra);
  }

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/ui/common/search/search.html',
    link: function (scope, element) {

      var data = null;

      scope.state = Search.state;
      scope.q = { text: '' };
      scope.groups = [];
      scope.flat = [];
      scope.active = 0;

      function load() {
        if (data && !Search.state.stale) {
          return;
        }
        Search.state.stale = false;
        Auto.get({ service: 'list' }, function (res) {
          data = {
            marques: (res.marques || []).map(function (m) {
              return entry('marque', m.nomMarque.trim(), {
                href: '#/marque/' + m.idMarque,
                logo: ImageManager.logoPath(m.idMarque),
                initials: ImageManager.initials(m.nomMarque),
                flag: Pays.flag(m.pays)
              });
            }),
            modeles: (res.modeles || []).map(function (m) {
              return entry('modele', m.nomModele.trim(), {
                href: '#/marque/' + m.idMarque + '#modele-' + m.idModele,
                marque: m.nomMarque,
                flag: Pays.flag(m.pays)
              });
            })
          };
          scope.update();
        });
      }

      scope.update = function () {
        var q = fold(scope.q.text || '').text;
        var groups = [];
        var flat = [];

        if (data && q.length > 1) {
          [['Marques', data.marques, 12], ['Modèles', data.modeles, 80]].forEach(function (g) {
            var items = [];
            g[1].forEach(function (it) {
              var at = it.key.text.indexOf(q);
              if (at < 0) {
                return;
              }
              var start = it.key.map[at];
              var end = it.key.map[at + q.length - 1] + 1;
              items.push(angular.extend({}, it, {
                at: at,
                before: it.name.slice(0, start),
                match: it.name.slice(start, end),
                after: it.name.slice(end)
              }));
            });
            items.sort(function (a, b) {
              return ((a.at === 0 ? 0 : 1) - (b.at === 0 ? 0 : 1)) || a.name.localeCompare(b.name);
            });
            items = items.slice(0, g[2]);
            items.forEach(function (it) {
              it.index = flat.length;
              flat.push(it);
            });
            if (items.length) {
              groups.push({ label: g[0], items: items });
            }
          });
        }

        scope.groups = groups;
        scope.flat = flat;
        scope.active = 0;
      };

      scope.setActive = function (index) {
        scope.active = index;
      };

      scope.close = function () {
        Search.close();
      };

      scope.go = function (item) {
        Search.close();
        window.location = item.href;
      };

      scope.onKey = function (event) {
        var n = scope.flat.length;
        if (event.key === 'ArrowDown' && n) {
          scope.active = (scope.active + 1) % n;
          event.preventDefault();
          reveal();
        } else if (event.key === 'ArrowUp' && n) {
          scope.active = (scope.active - 1 + n) % n;
          event.preventDefault();
          reveal();
        } else if (event.key === 'Enter' && n) {
          scope.go(scope.flat[scope.active]);
          event.preventDefault();
        } else if (event.key === 'Escape') {
          scope.close();
        }
      };

      function reveal() {
        $timeout(function () {
          var row = element[0].querySelector('.search__row.is-active');
          if (row && row.scrollIntoView) {
            row.scrollIntoView({ block: 'nearest' });
          }
        });
      }

      scope.$watch('state.open', function (open) {
        if (open) {
          load();
        }
      });

      // Ctrl+K / Cmd+K ou « / » ouvrent la recherche
      function onGlobalKey(event) {
        var tag = (event.target.tagName || '').toLowerCase();
        var typing = tag === 'input' || tag === 'textarea' || tag === 'select' || event.target.isContentEditable;
        if ((event.key === 'k' && (event.ctrlKey || event.metaKey)) || (event.key === '/' && !typing)) {
          event.preventDefault();
          scope.$apply(Search.open);
        }
      }
      $document.on('keydown', onGlobalKey);
      scope.$on('$destroy', function () {
        $document.off('keydown', onGlobalKey);
      });
    }
  };
});
