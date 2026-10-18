app.controller('AnneeCtrl', function ($scope, $routeParams, Auto, ImageManager, Pays) {

  $scope.annee = parseInt($routeParams.annee, 10);
  $scope.prev = $scope.annee - 1;
  $scope.next = $scope.annee + 1;
  $scope.$parent.$root.pageTitle = " - Année " + $scope.annee;

  Auto.get({
      service: 'annee',
      annee: $routeParams.annee
    },
    function (res) {
      var parPays = {};
      $scope.pays = [];

      (res.gammes || []).forEach(function (gamme) {
        var code = Pays.code(gamme.pays);
        if (!parPays[code]) {
          parPays[code] = {
            code: code,
            nom: code ? Pays.nom(code) : '',
            flag: Pays.flag(code),
            gammes: []
          };
          $scope.pays.push(parPays[code]);
        }
        parPays[code].gammes.push({
          link: '#/modele/' + gamme.idModele + '/' + gamme.idGamme,
          image: ImageManager.versionPath(gamme.idDocEmblematique),
          nomMarque: gamme.nomMarque,
          nomModele: (gamme.nomModele || '').trim(),
          nomGamme: gamme.nom
        });
      });

      $scope.pays.forEach(function (pays) {
        pays.gammes.sort(function (gamme1, gamme2) {
          return gamme1.nomMarque.localeCompare(gamme2.nomMarque);
        });
      });
      $scope.pays.sort(function (pays1, pays2) {
        return pays1.nom.localeCompare(pays2.nom);
      });
      $scope.loaded = true;
    });

});
