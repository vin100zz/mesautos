app.controller('ModeleCtrl', function ($scope, $route, $routeParams, Auto) {

  Auto.get({
    service: 'modele',
    id: $routeParams.modeleId
  }, function (res) {
    $scope.marque = res.marque;
    $scope.modele = res.modele;
    $scope.anneeModeles = res.anneeModeles;

    $scope.$parent.$root.pageTitle = " - " + $scope.marque.nomMarque + " - " + $scope.modele.nomModele;

    $scope.sidebar = [{
      link: '#/saisie/edit/modele?id=' + $scope.modele.idModele,
      icon: 'edit',
      tooltip: 'Éditer\n' + $scope.modele.nomModele
    }, {
      link: '#/saisie/add/gamme?id=' + $scope.modele.idModele,
      icon: 'plus',
      tooltip: 'Ajouter une gamme\n' + $scope.modele.nomModele
    }];

    $scope.selectedGamme = null;
    $scope.anneeModeles.forEach(function (anneeModele) {
      anneeModele.gammes.forEach(function (gamme) {
        if (gamme.idGamme === $routeParams.idGamme) {
          $scope.selectedGamme = gamme;
        }
      });
    });
    if (!$scope.selectedGamme && $scope.anneeModeles.length && $scope.anneeModeles[0].gammes.length) {
      $scope.selectedGamme = $scope.anneeModeles[0].gammes[0];
    }

    $scope.gammeCfg = {
      gamme: $scope.selectedGamme
    };

    $scope.sidebarCfg = {
      marque: $scope.marque
    };
  });

  $scope.getImageForAnneeModele = function (anneeModele) {
    var idDocumentGamme = anneeModele.gammes[0].docs[0].idDocumentGamme;
    return 'img/version/' + idDocumentGamme + '.jpg';
  };

  $scope.select = function (gamme) {
    $scope.selectedGamme = gamme;
    $scope.gammeCfg.gamme = gamme;
    window.location = '#modele/' + $scope.modele.idModele + '/' + gamme.idGamme;
  };

  // do not reload on hash change
  var lastRoute = $route.current;
  $scope.$on('$locationChangeSuccess', function (event) {
    if ($route.current.$$route.controller === 'ModeleCtrl') {
      $route.current = lastRoute;
    }
  });

});