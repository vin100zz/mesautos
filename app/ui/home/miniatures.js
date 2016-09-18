app.controller('MiniaturesCtrl', function ($scope, Auto) {

  $scope.miniatures = Auto.get({
    service: 'list-mini'
  });

  $scope.isExpanded = function (marque) {
    return localStorage.getItem('expanded-' + marque.idMarque) === 'true';
  };

  $scope.toggleMarque = function (marque) {
    marque.expanded = !marque.expanded;
    localStorage.setItem('expanded-' + marque.idMarque, marque.expanded);
  };

  $scope.toggleMini = function (modele) {
    $scope.miniatures = Auto.get({
      service: 'update-mini',
      idModele: modele.idModele,
      mini: modele.mini === 'Y' ? 'N' : 'Y'
    });
  };

});