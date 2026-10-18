/* Panneau d'édition : Saisie.open('edit' | 'add', 'marque' | 'modele' | 'gamme' | 'docGamme' | 'docMarque', id) */
app.service('Saisie', function () {

  var state = this.state = {
    open: false,
    seq: 0
  };

  this.open = function (action, objet, id) {
    state.action = action;
    state.objet = objet;
    state.id = id;
    state.open = true;
    state.seq += 1;
  };

  this.close = function () {
    state.open = false;
  };

});

app.directive('maSaisie', function ($route, $document, Auto, Saisie, Search, Categorie, Pays, ImageManager) {

  var NOMS = {
    marque: ['la marque', 'une marque'],
    modele: ['le modèle', 'un modèle'],
    gamme: ['la gamme', 'une gamme'],
    docGamme: ['le document', 'un document'],
    docMarque: ['le document', 'un document']
  };

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/ui/saisie/saisie.html',
    link: function (scope) {

      scope.state = Saisie.state;
      scope.categorie = Categorie;
      scope.pays = Pays;

      function init(saisie) {
        scope.saisie = saisie;
        scope.objet = saisie.objet;
        scope.action = saisie.action;

        if (scope.action === 'edit') {
          scope.saisie.ordre = parseInt(saisie.ordre);
        } else {
          scope.saisie.ordre = 0;
        }

        if (scope.objet === 'docGamme' && scope.action === 'edit') {
          scope.apercu = ImageManager.versionPath(saisie.idDocumentGamme);
        }
        scope.loading = false;
      }

      scope.$watch('state.seq', function (seq) {
        if (!seq) {
          return;
        }
        var s = Saisie.state;
        scope.saisie = null;
        scope.apercu = null;
        scope.saving = false;
        scope.loading = true;
        scope.objet = s.objet;
        scope.action = s.action;

        if (s.action === 'add' && s.objet === 'marque') {
          init({
            action: s.action,
            objet: s.objet
          });
        } else {
          Auto.get({
            service: 'saisie',
            action: s.action,
            objet: s.objet,
            id: s.id
          }, init);
        }
      });

      scope.eyebrow = function () {
        var n = NOMS[scope.objet] || ['', ''];
        return scope.action === 'add' ? 'Ajouter ' + n[1] : 'Modifier ' + n[0];
      };

      scope.titre = function () {
        var s = scope.saisie || {};
        var add = scope.action === 'add';
        switch (scope.objet) {
        case 'marque':
          return add ? 'Nouvelle marque' : s.nomMarque;
        case 'modele':
          return add ? 'Nouveau modèle' : s.nomModele;
        case 'gamme':
          return add ? 'Nouvelle gamme' : (s.nom || s.annee);
        default:
          return add ? 'Nouveau document' : [s.nom, s.annee].filter(Boolean).join(' · ');
        }
      };

      scope.isCategorie = function (item) {
        return !!item.categorie;
      };

      scope.move = function (list, index, delta) {
        var target = index + delta;
        if (target < 0 || target >= list.length) {
          return;
        }
        var item = list.splice(index, 1)[0];
        list.splice(target, 0, item);
      };

      scope.lienLabel = function (lien) {
        return lien.titre ? lien.titre : lien.lien;
      };

      scope.addLink = function () {
        if (!scope.saisie.urlLien) {
          return;
        }
        scope.saisie.liens.push({
          idLienGamme: Date.now(),
          lien: scope.saisie.urlLien,
          titre: scope.saisie.titreLien,
          ordre: scope.saisie.liens.length + 1
        });
        scope.saisie.urlLien = '';
        scope.saisie.titreLien = '';
      };

      scope.removeLink = function (index) {
        scope.saisie.liens.splice(index, 1);
      };

      scope.close = function () {
        Saisie.close();
      };

      scope.update = function () {
        if (!scope.saisie || scope.saving) {
          return;
        }
        if (scope.saisie.objet === 'marque') {
          scope.saisie.modeleOrder = [];
          (scope.saisie.modeles || []).forEach(function (modele) {
            scope.saisie.modeleOrder.push(modele.idModele);
          });
        }

        scope.saving = true;
        Auto.save({
          service: 'update'
        }, scope.saisie, function () {
          Saisie.close();
          Search.invalidate();
          $route.reload();
        }, function () {
          scope.saving = false;
        });
      };

      function onKey(event) {
        if (!Saisie.state.open) {
          return;
        }
        if (event.key === 'Escape') {
          scope.$apply(Saisie.close);
        } else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
          scope.$apply(scope.update);
        }
      }
      $document.on('keydown', onKey);
      scope.$on('$destroy', function () {
        $document.off('keydown', onKey);
      });
    }
  };
});
