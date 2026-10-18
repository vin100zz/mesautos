app.controller('MiniaturesCtrl', function ($scope, Auto, ImageManager) {

  $scope.$parent.$root.pageTitle = " - Miniatures";

  $scope.miniatures = Auto.get({
    service: 'list-mini'
  });

  $scope.filtres = [
    { id: 'tous', label: 'Tous' },
    { id: 'possedes', label: 'Possédés' },
    { id: 'manquants', label: 'Manquants' }
  ];
  $scope.filtre = 'tous';

  $scope.setFiltre = function (id) {
    $scope.filtre = id;
  };

  $scope.filtreModele = function (modele) {
    if ($scope.filtre === 'possedes') {
      return modele.mini === 'Y';
    }
    if ($scope.filtre === 'manquants') {
      return modele.mini !== 'Y';
    }
    return true;
  };

  $scope.logo = ImageManager.logoPath;
  $scope.initials = ImageManager.initials;

  // « 2 CV (1948) » → nom « 2 CV », année « 1948 »
  var split = function (modele) {
    var m = / \((\d{4})\)$/.exec((modele.nomModele || '').trim());
    return m ? [modele.nomModele.trim().slice(0, -7).trim(), m[1]] : [(modele.nomModele || '').trim(), ''];
  };
  $scope.nom = function (modele) {
    return split(modele)[0];
  };
  $scope.annee = function (modele) {
    return split(modele)[1];
  };

  var storage = {
    get: function (key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {}
    }
  };

  $scope.isExpanded = function (marque) {
    return storage.get('expanded-' + marque.idMarque) === 'true';
  };

  $scope.toggleMarque = function (marque) {
    storage.set('expanded-' + marque.idMarque, !$scope.isExpanded(marque));
  };

  $scope.toggleMini = function (modele) {
    var mini = modele.mini === 'Y' ? 'N' : 'Y';
    modele.mini = mini;
    Auto.get({
      service: 'update-mini',
      idModele: modele.idModele,
      mini: mini
    }, function (res) {
      $scope.miniatures = res;
    });
  };

});
