app.controller('SalonCtrl', function ($scope, $routeParams, Auto, Viewer) {

  $scope.annee = $routeParams.annee;
  $scope.ccc = parseInt($scope.annee, 10) >= 1930 && parseInt($scope.annee, 10) <= 1979;
  $scope.$parent.$root.pageTitle = " - Salon " + $scope.annee;

  Auto.get({
      service: 'salon',
      annee: $routeParams.annee
    },
    function (salon) {
      $scope.photos = salon.photos.map(function (photo, index) {
        var card = {
          mini: salon.path + '/mini/' + photo,
          plain: salon.path + '/' + photo,
          src: salon.path + '/' + photo,
          alt: 'Salon ' + salon.annee
        };
        card.open = function (event) {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
            return;
          }
          event.preventDefault();
          Viewer.open($scope.photos, index);
        };
        return card;
      });
    });

  // Salons précédent et suivant
  Auto.query({}, function (res) {
    var salons = (res.salons || []).slice().sort(function (a, b) {
      return String(a).localeCompare(String(b), 'fr', { numeric: true });
    });
    var i = salons.indexOf($scope.annee);
    $scope.prev = i > 0 ? salons[i - 1] : null;
    $scope.next = i >= 0 && i < salons.length - 1 ? salons[i + 1] : null;
  });

});
