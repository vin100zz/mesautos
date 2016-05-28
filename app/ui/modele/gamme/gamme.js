app.directive('mesautosGamme', function (Deckgrid, Auto) {

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
            icon: 'star',
            label: 'Emblématique',
            action: function () {
              Auto.get({
                service: 'set-emblematique',
                id: doc.idDocumentGamme
              }, function () {
                window.location.reload();
              });
            }
          }];
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
        return 'img/version/' + idDocumentGamme + '.jpg';
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