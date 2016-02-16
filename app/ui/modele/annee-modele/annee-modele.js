app.directive('mesautosAnneeModele', function () {

  return {
    scope: {
      cfg: '='
    },
    templateUrl: 'app/ui/modele/annee-modele/annee-modele.html',
    controller: function ($scope) {

      function getImage(idDocumentVersion) {
        return 'img/version/' + idDocumentVersion + '.jpg';
      };

      $scope.backgroundImage = function (idDocumentVersion) {
        return {
          'background-image': 'url(' + getImage(idDocumentVersion) + ')'
        };
      };

      $scope.openInNewWindow = function () {
        window.open(getImage($scope.selected));
      };

    }
  };
});