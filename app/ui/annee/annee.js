app.controller('AnneeCtrl', function ($scope, $routeParams, $location, $filter, Auto, ImageManager) {

  $scope.annee = Auto.get({
      service: 'annee',
      annee: $routeParams.annee
    },
    function (res) {
      $scope.annee = $routeParams.annee;

      $scope.$parent.$root.pageTitle = " - Année " + $scope.annee;

      $scope.data = {};
      res.gammes.forEach(gamme => {
        if (!$scope.data[gamme.pays]) {
          $scope.data[gamme.pays] = [];
        }
        $scope.data[gamme.pays].push({
          link: '#/modele/' + gamme.idModele + '/' + gamme.idGamme,
          image: ImageManager.versionPath(gamme.idDocEmblematique),
          nomMarque: gamme.nomMarque,
          nomModele: gamme.nomModele,
          nomGamme: gamme.nom,
        });
      });

      Object.values($scope.data).forEach(gammes => {
        gammes.sort((gamme1, gamme2) => gamme1.nomMarque.localeCompare(gamme2.nomMarque))
      });

    });

});