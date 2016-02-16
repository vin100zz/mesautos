app.controller('SaisieCtrl', function ($scope, $routeParams, Auto) {

  var cb = function (saisie) {
    $scope.$parent.$root.pageTitle = ' - Saisie';
    $scope.objet = saisie.objet;
    $scope.action = saisie.action;

    if ($scope.action == "edit")
      $scope.saisie.ordre = parseInt(saisie.ordre);
    else
      $scope.saisie.ordre = 0;

    $scope.modeleSorterCfg = {
      show: $scope.objet === 'marque' && $scope.action === 'edit',
      label: 'Ordre des modèles',
      list: $scope.saisie.modeles,
      idFn: function (item) {
        return item.idModele;
      },
      labelFn: function (item) {
        return item.nomModele;
      }
    }

    $scope.versionSorterCfg = {
      show: $scope.objet === 'modele' && $scope.action === 'edit',
      label: 'Ordre des versions',
      list: $scope.saisie.versions,
      idFn: function (item) {
        return item.idVersion;
      },
      labelFn: function (item) {
        return item.nom + (item.type ? ' ' + item.type : '') + (item.anneeModele ? ' (' + item.anneeModele + ')' : '');
      }
    }
  };

  if ($routeParams.action === 'add' && $routeParams.objet === 'marque') {
    $scope.saisie = {};
    cb({
      action: $routeParams.action,
      objet: $routeParams.objet
    });
  } else {
    $scope.saisie = Auto.get({
      service: 'saisie',
      action: $routeParams.action,
      objet: $routeParams.objet,
      id: $routeParams.id
    }, cb);
  }

  $scope.update = function () {
    if ($scope.saisie.objet === 'marque') {
      $scope.saisie.modeleOrder = [];
      for (var i = 0; i < $scope.saisie.modeles.length; ++i) {
        $scope.saisie.modeleOrder.push($scope.saisie.modeles[i].idModele);
      }
    } else if ($scope.saisie.objet === 'modele') {
      $scope.saisie.versionOrder = [];
      for (var i = 0; i < $scope.saisie.versions.length; ++i) {
        $scope.saisie.versionOrder.push($scope.saisie.versions[i].idVersion);
      }
    }
    Auto.save({
      service: 'update'
    }, this.saisie, function (update) {
      history.back();
    });
  };

});