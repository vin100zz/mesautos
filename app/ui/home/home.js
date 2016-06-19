app.controller('HomeCtrl', function ($scope, Auto) {

  Auto.query({}, function (res) {
    $scope.marques = res.marques;

    $scope.salons = res.salons.map(function (salon) {
      return {
        annee: salon
      };
    });

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

  /* Salons */
  $scope.salonBackgroundImage = function (salon) {
    return {
      'background-image': 'url(img/salon/' + salon.annee + '/mini/1.jpg)'
    };
  };

  $scope.goToSalon = function (salon) {
    window.location = '#/salon/' + salon.annee;
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

  /* Views */
  $scope.selectedView = 'marques';

  $scope.showView = function (view) {
    $scope.selectedView = view;
  };

  /* Miniatures */
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