app.directive('mesautosGamme', function (Deckgrid, Auto, ImageManager) {

  return {
    scope: {
      cfg: '='
    },
    templateUrl: 'app/ui/modele/gamme/gamme.html',
    controller: function ($scope) {

      if ($scope.cfg) {
        render();
      }

      function render() {
        $scope.photos = $scope.cfg.gamme.docs.map(function (doc) {
          doc.src = getImage(doc.idDocumentGamme);
          doc.actions = [{
            icon: 'edit',
            label: 'Éditer',
            action: function () {
              window.location.hash = '#/saisie/edit/docGamme?id=' + doc.idDocumentGamme;
            }
          }, {
            icon: 'star-o',
            label: 'Emblématique année-modèle',
            action: function () {
              Auto.get({
                service: 'set-emblem-anneeModele',
                id: doc.idDocumentGamme
              }, function () {
                window.location.reload();
              });
            }
          }, {
            icon: 'star',
            label: 'Emblématique modèle',
            action: function () {
              Auto.get({
                service: 'set-emblem-modele',
                id: doc.idDocumentGamme
              }, function () {
                window.location.reload();
              });
            }
          }];
          doc.links = doc.liens.map(function (lien) {
            var label = lien.titre || lien.lien;
            return {
              icon: 'external-link',
              label: label.length > 25 ? (label.substr(0, 25) + '...') : label,
              action: function () {
                window.open(lien.lien);
              }
            };
          });
          return doc;
        });

        $scope.sidebar = [{
          link: '#/saisie/edit/gamme?id=' + $scope.cfg.gamme.idGamme,
          icon: 'edit',
          tooltip: 'Éditer\n' + $scope.cfg.gamme.nom
        }, {
          link: '#/saisie/add/docGamme?id=' + $scope.cfg.gamme.idGamme,
          icon: 'plus',
          tooltip: 'Ajouter un document à\n' + $scope.cfg.gamme.nom
        }];
      }

      function getImage(idDocumentGamme) {
        return ImageManager.versionPath(idDocumentGamme);
      }

      $scope.backgroundImage = function (idDocumentGamme) {
        return {
          'background-image': 'url(' + getImage(idDocumentGamme) + ')'
        };
      };

      $scope.openInNewWindow = function () {
        window.open(getImage($scope.selected));
      };

      $scope.$watch('cfg', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          render();
        }
      }, true);

    }
  };
});