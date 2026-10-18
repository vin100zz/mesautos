app.controller('AnneesCtrl', function ($scope, Auto) {

  $scope.$parent.$root.pageTitle = " - Nouveautés";

  Auto.get({
    service: 'annees'
  }, function (res) {
    var avec = {};
    var annees = res.annees || [];
    annees.forEach(function (annee) {
      avec[annee] = true;
    });

    var courante = new Date().getFullYear();
    var premiere = annees.length ? Math.floor(Math.min.apply(null, annees) / 10) * 10 : 1900;
    var derniere = Math.floor(courante / 10) * 10;

    $scope.decennies = [];
    for (var d = premiere; d <= derniere; d += 10) {
      var cases = [];
      for (var y = d; y < d + 10; y++) {
        cases.push({
          annee: y,
          futur: y > courante,
          avec: !!avec[y]
        });
      }
      $scope.decennies.push({
        decennie: d,
        annees: cases
      });
    }
  });

});
