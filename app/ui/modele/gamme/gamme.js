app.directive('mesautosGamme', function ($document, Auto, ImageManager, Saisie, Viewer) {

  return {
    scope: {
      cfg: '='
    },
    templateUrl: 'app/ui/modele/gamme/gamme.html',
    controller: function ($scope) {

      $scope.openSaisie = Saisie.open;
      $scope.photos = [];

      var reload = function () {
        window.location.reload();
      };

      var closeMenus = function () {
        $scope.photos.forEach(function (photo) {
          photo.menuOpen = false;
        });
      };

      function render() {
        if (!$scope.cfg || !$scope.cfg.gamme) {
          $scope.photos = [];
          return;
        }
        var gamme = $scope.cfg.gamme;

        $scope.photos = (gamme.docs || []).map(function (doc, index) {
          var card = {
            src: ImageManager.versionPath(doc.idDocumentGamme),
            source: doc.source,
            date: doc.date,
            legende: doc.legende,
            alt: [gamme.nom, doc.source, doc.date].filter(Boolean).join(' — '),
            emblemModele: doc.emblem_modele === '1',
            emblemAnnee: doc.emblem_anneeModele === '1',
            menuOpen: false
          };

          card.actions = [{
            icon: 'edit',
            label: 'Modifier le document',
            action: function () {
              Viewer.close();
              Saisie.open('edit', 'docGamme', doc.idDocumentGamme);
            }
          }, {
            icon: 'star',
            emblem: true,
            label: 'Photo de l\'année-modèle',
            action: function () {
              Auto.get({
                service: 'set-emblem-anneeModele',
                id: doc.idDocumentGamme
              }, reload);
            }
          }, {
            icon: 'star-fill',
            emblem: true,
            label: 'Photo du modèle',
            action: function () {
              Auto.get({
                service: 'set-emblem-modele',
                id: doc.idDocumentGamme
              }, reload);
            }
          }];

          card.links = (doc.liens || []).map(function (lien) {
            var label = lien.titre || lien.lien;
            return {
              url: lien.lien,
              label: label.length > 40 ? (label.substr(0, 40) + '…') : label
            };
          });

          card.open = function (event) {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
              return;
            }
            event.preventDefault();
            closeMenus();
            Viewer.open($scope.photos, index);
          };

          card.toggleMenu = function (event) {
            event.stopPropagation();
            var open = !card.menuOpen;
            closeMenus();
            card.menuOpen = open;
          };

          card.run = function (action) {
            card.menuOpen = false;
            action.action();
          };

          return card;
        });
      }

      $scope.$watch('cfg.gamme', render);

      var onDocumentClick = function () {
        if ($scope.photos.some(function (photo) { return photo.menuOpen; })) {
          $scope.$apply(closeMenus);
        }
      };
      $document.on('click', onDocumentClick);
      $scope.$on('$destroy', function () {
        $document.off('click', onDocumentClick);
      });
    }
  };
});
