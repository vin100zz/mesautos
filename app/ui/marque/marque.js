function MarqueCtrl($scope, $routeParams, $location, $anchorScroll, $http, Auto) {
  $scope.marque = Auto.get({
    service: 'marque',
    id: $routeParams.marqueId
  }, function (marque) {
    $scope.histo = marque.histo;
    $scope.$parent.$root.pageTitle = " - " + marque.nomMarque;

    $scope.sidebar = [{
      link: '#/saisie/add/modele?id=marque.idMarque',
      icon: 'edit',
      tooltip: 'Éditer ' + marque.nomMarque
    }, {
      link: '#/saisie/edit/marque?id=marque.idMarque',
      icon: 'plus',
      tooltip: 'Ajouter un modèle ' + marque.nomMarque
    }];

    marque.modeles = marque.modeles.map(modele => {

      modele.nomModele = modele.nomModele.trim();
      var yearInName = / \((\d\d\d\d)\)/.exec(modele.nomModele);
      if (yearInName && yearInName.length > 1) {
        modele.nomModele = modele.nomModele.substr(0, modele.nomModele.length - 7);
        modele.yearInName = yearInName[1];
      }

      modele.versions = [modele.versions[0]];
      return modele;
    });

    $scope.backgroundImage = function (marque) {
      return {
        'background-image': 'url(img/logo/' + marque.idMarque + '.png)'
      };
    }

    setTimeout(function () {
      $anchorScroll();
    }, 100);

    var events = [];
    for (var i = 0; i < marque.modeles.length; ++i) {
      var modele = marque.modeles[i];
      events.push({
        begin: modele.debut,
        end: modele.fin,
        name: modele.nomModele,
        picture: modele.versions.length > 0 ? modele.versions[0].img : null,
        link: '#/marque/' + marque.idMarque + '#modele-' + modele.idModele
      });
    }

    drawTimeline({
      container: document.querySelector('#timeline'),
      events: events
    });

    $scope.wiki = '';
    var url = 'https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=' + marque.nomMarque + '&callback=JSON_CALLBACK';
    $http.jsonp(url)
      .success(function (data) {
        var pages = data.query.pages;
        for (var id in pages) {
          if (pages.hasOwnProperty(id)) {
            var page = pages[id];
            $scope.wiki += page.extract;
          }
        }
      });
  });

  $scope.toggle = 'MODELES';

  $scope.showModeles = function () {
    $scope.toggle = 'MODELES';
  }
  $scope.showTimeline = function () {
    $scope.toggle = 'TIMELINE';
  }
  $scope.showWiki = function () {
    $scope.toggle = 'WIKI';
  }
  $scope.showHistoire = function () {
    $scope.toggle = 'HISTOIRE';
  }

  $scope.backgroundImage = function (version) {
    return {
      'background-image': 'url(' + version.img + ')'
    };
  }

  $scope.goToModele = function (modele) {
    window.location = "#/modele/" + modele.idModele;
  }
}