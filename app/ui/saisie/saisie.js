app.controller('SaisieCtrl', function ($scope, $routeParams, Auto) {

  var cb = function (saisie) {
    $scope.$parent.$root.pageTitle = ' - Saisie';
    $scope.saisie = saisie;
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
    };

    $scope.lienGammeSorterCfg = {
      show: $scope.objet === 'docGamme' && $scope.action === 'edit',
      label: 'Ordre des liens',
      list: $scope.saisie.liens,
      idFn: function (item) {
        return item.idLienGamme;
      },
      labelFn: function (item) {
        var label = item.titre ? (item.titre + ' (' + item.lien + ')') : item.lien;
        return label.length > 42 ? (label.substr(0, 42) + '...') : label
      }
    };
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

  $scope.addLink = function () {
    $scope.saisie.liens.push({
      idLienGamme: Date.now(),
      lien: $scope.saisie.urlLien,
      titre: $scope.saisie.titreLien,
      ordre: $scope.saisie.liens.length+1
    });
  };

  $scope.update = function () {
    if ($scope.saisie.objet === 'marque') {
      $scope.saisie.modeleOrder = [];
      ($scope.saisie.modeles || []).forEach(function (modele) {
        $scope.saisie.modeleOrder.push(modele.idModele);
      });
    }

    Auto.save({
      service: 'update'
    }, $scope.saisie, function (update) {
      history.back();
    });
  };

});