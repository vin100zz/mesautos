app.controller('ModeleCtrl', function ($scope, $route, $routeParams, Auto, Categorie, ImageManager) {

  Auto.get({
    service: 'modele',
    id: $routeParams.modeleId
  }, function (res) {
    $scope.marque = res.marque;
    $scope.modele = res.modele;
    $scope.anneeModeles = res.anneeModeles;

    $scope.$parent.$root.pageTitle = " - " + $scope.marque.nomMarque + " - " + $scope.modele.nomModele;

    var nomModele = ($scope.modele.nomModele || '').trim();
    var yearInName = / \((\d\d\d\d)\)$/.exec(nomModele);
    $scope.nom = yearInName ? nomModele.substr(0, nomModele.length - 7).trim() : nomModele;
    $scope.annee = yearInName ? yearInName[1] : '';
    $scope.categorie = $scope.modele.categorie ? Categorie.cfg($scope.modele.categorie) : null;
    $scope.logo = ImageManager.logoPath($scope.marque.idMarque);
    $scope.initials = ImageManager.initials($scope.marque.nomMarque);

    $scope.selectedGamme = null;
    $scope.anneeModeles.forEach(function (anneeModele) {
      anneeModele.image = getImageForAnneeModele(anneeModele);
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
  });

  var getImageForAnneeModele = function (anneeModele) {
    var emblemAnneeModele = null;
    anneeModele.gammes.forEach(function (gamme) {
      var emblemGamme = (gamme.docs || []).find(function (doc) {
        return doc.emblem_anneeModele === '1';
      });
      if (emblemGamme) {
        emblemAnneeModele = emblemGamme;
      }
    });
    if (!emblemAnneeModele) {
      anneeModele.gammes.some(function (gamme) {
        emblemAnneeModele = (gamme.docs || [])[0] || null;
        return !!emblemAnneeModele;
      });
    }
    return emblemAnneeModele ? ImageManager.versionPath(emblemAnneeModele.idDocumentGamme) : null;
  };

  $scope.isSelected = function (gamme) {
    return !!$scope.selectedGamme && gamme.idGamme === $scope.selectedGamme.idGamme;
  };

  $scope.isCurrent = function (anneeModele) {
    return !!$scope.selectedGamme && anneeModele.gammes.indexOf($scope.selectedGamme) >= 0;
  };

  $scope.select = function (gamme) {
    if (!gamme) {
      return;
    }
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
