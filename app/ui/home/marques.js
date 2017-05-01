app.controller('MarquesCtrl', function ($scope, Auto) {

  Auto.query({}, function (res) {
    $scope.marques = res.marques;

    /* Filters */
    $scope.pays = [];
    $scope.marques.forEach(function (marque) {
      var pays = marque.pays.toUpperCase();
      var found = $scope.pays.find(function (storedPays) {
        return storedPays.code === pays;
      });
      if (!found) {
        $scope.pays.push({
          code: pays,
          filter: true
        });
      }

      if (marque.debut || marque.fin) {
        marque.annees = (marque.debut ? marque.debut : '...') + ' - ' + (marque.fin ? marque.fin : '...');
      }
    });
    $scope.pays.sort(function (pays1, pays2) {
      return pays1.code.localeCompare(pays2.code);
    });

  });

  $scope.$parent.$root.pageTitle = "";

  $scope.sidebar = [{
    link: '#/saisie/add/marque',
    icon: 'plus',
    tooltip: 'Ajouter une marque'
  }];

  /* Marques */
  $scope.marqueBackgroundImage = function (marque) {
    return {
      'background-image': 'url(img/logo/' + marque.idMarque + '.png)'
    };
  };

  $scope.goToMarque = function (marque) {
    window.location = '#/marque/' + marque.idMarque;
  };

  /* Filters */
  $scope.filterPays = function (value) {
    if (!value.pays) {
      return true;
    }
    var pays = $scope.pays.find(function (pays) {
      return pays.code === value.pays;
    });
    return pays ? pays.filter : false;
  };

  $scope.selectFilter = function (code) {
    $scope.pays.forEach(function (pays) {
      pays.filter = (pays.code === code);
    });
  };

  $scope.toggleFilter = function (pays) {
    pays.filter = !pays.filter;
  };

});