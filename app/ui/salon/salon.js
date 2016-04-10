app.controller('SalonCtrl', function ($scope, $routeParams, $location, Auto) {

  $scope.salon = Auto.get({
      service: 'salon',
      annee: $routeParams.annee
    },
    function (salon) {
      $scope.$parent.$root.pageTitle = " - Salon " + salon.annee;

      $scope.photos = salon.photos.map(function (photo) {
        return {
          mini: salon.path + '/mini/' + photo,
          plain: salon.path + '/' + photo
        };
      });
    });

});