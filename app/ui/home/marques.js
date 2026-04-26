app.controller('MarquesCtrl', function ($scope, Auto) {

  var paysByCode = Object.create(null);

  var normalizePaysCode = function (code) {
    return (code || '').toUpperCase();
  };

  var rebuildVisibleMarques = function () {
    var activePays = Object.create(null);
    var hasActiveFilter = false;

    $scope.pays.forEach(function (pays) {
      if (pays.filter) {
        activePays[pays.code] = true;
        hasActiveFilter = true;
      }
    });

    $scope.visibleMarques = $scope.marques
      .filter(function (marque) {
        if (!marque.pays) {
          return true;
        }
        var code = normalizePaysCode(marque.pays);
        return hasActiveFilter ? !!activePays[code] : false;
      })
      .sort(function (marque1, marque2) {
        return marque1.nomMarque.localeCompare(marque2.nomMarque);
      });
  };

  Auto.query({}, function (res) {
    $scope.marques = res.marques || [];
    $scope.visibleMarques = [];

    /* Filters */
    $scope.pays = [];
    paysByCode = Object.create(null);
    $scope.marques.forEach(function (marque) {
      var paysCode = normalizePaysCode(marque.pays);
      if (paysCode && !paysByCode[paysCode]) {
        paysByCode[paysCode] = {
          code: paysCode,
          filter: true
        };
        $scope.pays.push(paysByCode[paysCode]);
      }

      if (marque.debut || marque.fin) {
        marque.annees = (marque.debut ? marque.debut : '...') + ' - ' + (marque.fin ? marque.fin : '...');
      }
    });
    $scope.pays.sort(function (pays1, pays2) {
      return pays1.code.localeCompare(pays2.code);
    });

    rebuildVisibleMarques();

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
    var pays = paysByCode[normalizePaysCode(value.pays)];
    return pays ? pays.filter : false;
  };

  $scope.selectFilter = function (code) {
    var selectedCode = normalizePaysCode(code);
    $scope.pays.forEach(function (pays) {
      pays.filter = (pays.code === selectedCode);
    });
    rebuildVisibleMarques();
  };

  $scope.toggleFilter = function (pays) {
    pays.filter = !pays.filter;
    rebuildVisibleMarques();
  };

});

