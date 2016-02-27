app.directive('mesautosGamme', function () {

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
          return doc;
        });
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