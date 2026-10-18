app.controller('SalonsCtrl', function ($scope, Auto) {

  $scope.$parent.$root.pageTitle = " - Salons";

  Auto.query({}, function (res) {
    $scope.salons = (res.salons || []).slice().sort(function (a, b) {
      return String(b).localeCompare(String(a), 'fr', { numeric: true });
    }).map(function (annee) {
      return {
        annee: annee,
        mini: 'img/salon/' + annee + '/mini/1.jpg'
      };
    });
  });

});
