app.controller('HomeCtrl', function ($scope, Auto) {

  $scope.marques = Auto.query();

  $scope.$parent.$root.pageTitle = "";

  $scope.sidebar = [{
    link: '#/saisie/add/marque',
    icon: 'plus',
    tooltip: 'Ajouter une marque'
  }];

  $scope.backgroundImage = function (marque) {
    return {
      'background-image': 'url(img/logo/' + marque.idMarque + '.png)'
    };
  }

  $scope.goToMarque = function (marque) {
    window.location = '#/marque/' + marque.idMarque;
  }

  $scope.goToMesAutosAMoi = function () {
    window.location = '#/marque/1129';
  }

});