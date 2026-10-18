app.controller('MarquesCtrl', function ($scope, Auto, Pays, ImageManager) {

  var paysByCode = Object.create(null);

  $scope.$parent.$root.pageTitle = "";
  $scope.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  $scope.sections = [];
  $scope.hasLetter = {};

  var formatAnnees = function (debut, fin) {
    if (!debut && !fin) {
      return '';
    }
    if (debut && fin && String(debut) === String(fin)) {
      return String(debut);
    }
    return (debut || '…') + ' – ' + (fin || '…');
  };

  var letterOf = function (nom) {
    var c = nom.normalize('NFD').replace(/[̀-ͯ]/g, '').charAt(0).toUpperCase();
    return /[A-Z]/.test(c) ? c : '#';
  };

  var rebuildVisibleMarques = function () {
    var activePays = Object.create(null);

    $scope.pays.forEach(function (pays) {
      if (pays.filter) {
        activePays[pays.code] = true;
      }
    });

    var visibles = $scope.marques
      .filter(function (marque) {
        // les marques sans pays restent toujours visibles
        return !marque.paysCode || !!activePays[marque.paysCode];
      })
      .sort(function (marque1, marque2) {
        return marque1.nomMarque.localeCompare(marque2.nomMarque);
      });

    var sections = [];
    var byLetter = {};
    visibles.forEach(function (marque) {
      var letter = letterOf(marque.nomMarque);
      if (!byLetter[letter]) {
        byLetter[letter] = { letter: letter, items: [] };
        sections.push(byLetter[letter]);
      }
      byLetter[letter].items.push(marque);
    });

    $scope.sections = sections;
    $scope.hasLetter = byLetter;
  };

  Auto.query({}, function (res) {
    $scope.marques = (res.marques || []).map(function (marque) {
      marque.nomMarque = marque.nomMarque.trim();
      marque.paysCode = Pays.code(marque.pays);
      marque.flag = Pays.flag(marque.pays);
      marque.paysNom = Pays.nom(marque.pays);
      marque.logo = ImageManager.logoPath(marque.idMarque);
      marque.initials = ImageManager.initials(marque.nomMarque);
      marque.annees = formatAnnees(marque.debut, marque.fin);
      return marque;
    });

    /* Filtres */
    $scope.pays = [];
    paysByCode = Object.create(null);
    $scope.marques.forEach(function (marque) {
      var code = marque.paysCode;
      if (code && !paysByCode[code]) {
        paysByCode[code] = {
          code: code,
          nom: Pays.nom(code),
          flag: Pays.flag(code),
          filter: true
        };
        $scope.pays.push(paysByCode[code]);
      }
    });
    $scope.pays.sort(function (pays1, pays2) {
      return pays1.nom.localeCompare(pays2.nom);
    });

    rebuildVisibleMarques();
    $scope.loaded = true;
  });

  /* Filtres */
  $scope.selectFilter = function (code) {
    $scope.pays.forEach(function (pays) {
      pays.filter = (pays.code === code);
    });
    rebuildVisibleMarques();
  };

  $scope.toggleFilter = function (pays) {
    pays.filter = !pays.filter;
    rebuildVisibleMarques();
  };

  $scope.selectAll = function () {
    $scope.pays.forEach(function (pays) {
      pays.filter = true;
    });
    rebuildVisibleMarques();
  };

  /* Index alphabétique */
  $scope.scrollTo = function (letter) {
    var section = document.getElementById('lettre-' + letter);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

});
