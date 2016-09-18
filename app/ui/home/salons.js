app.controller('SalonsCtrl', function ($scope, Auto) {

  Auto.query({}, function (res) {
    $scope.salons = res.salons.map(function (salon) {
      return {
        annee: salon
      };
    });
  });

  $scope.salonBackgroundImage = function (salon) {
    return {
      'background-image': 'url(img/salon/' + salon.annee + '/mini/1.jpg)'
    };
  };

  $scope.goToSalon = function (salon) {
    window.location = '#/salon/' + salon.annee;
  };

});