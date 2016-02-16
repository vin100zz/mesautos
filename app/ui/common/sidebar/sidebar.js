app.directive('mesautosSidebar', function () {

  return {
    scope: {
      cfg: '='
    },
    templateUrl: 'app/ui/common/sidebar/sidebar.html',
    controller: function ($scope) {


      $scope.logoBackground = function (marque) {
        return {
          'background-image': 'url(img/logo/' + marque.idMarque + '.png)'
        };
      };

    }
  };
});