app.controller('AnneesCtrl', function ($scope, Auto) {

  $scope.annees = [];
  for (var i=1900; i<=2020; ++i) {
    $scope.annees.push(i);
  }

  $scope.goToAnnee = function (annee) {
    window.location = '#/annee/' + annee;
  };

});