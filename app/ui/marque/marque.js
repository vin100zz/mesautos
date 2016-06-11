app.controller('MarqueCtrl', function ($scope, $routeParams, $location, $anchorScroll, Auto, Categorie, ImageManager) {

  $scope.marque = Auto.get({
      service: 'marque',
      id: $routeParams.marqueId
    },
    function (marque) {
      $scope.$parent.$root.pageTitle = " - " + marque.nomMarque;

      $scope.sidebar = [{
        link: '#/saisie/edit/marque?id=' + marque.idMarque,
        icon: 'edit',
        tooltip: 'Éditer\n' + marque.nomMarque
      }, {
        link: '#/saisie/add/modele?id=' + marque.idMarque,
        icon: 'plus',
        tooltip: 'Ajouter un modèle\n' + marque.nomMarque
      }];

      marque.modeles = marque.modeles.map(modele => {
        modele.nomModele = modele.nomModele.trim();
        var yearInName = / \((\d\d\d\d)\)/.exec(modele.nomModele);
        if (yearInName && yearInName.length > 1) {
          modele.nomModele = modele.nomModele.substr(0, modele.nomModele.length - 7);
          modele.yearInName = yearInName[1];
        }

        modele.categorieCfg = Categorie.cfg(modele.categorie);
        return modele;
      });

      $scope.sidebarCfg = {
        marque: marque,
        tpl: 'app/ui/marque/marque-sidebar.html'
      };

      var events = marque.modeles.map(function (modele) {
        return {
          begin: modele.debut,
          end: modele.fin,
          name: modele.nomModele,
          picture: ImageManager.versionPath(modele.idDocEmblematique),
          link: '#/marque/' + marque.idMarque + '#modele-' + modele.idModele
        };
      });
      drawTimeline({
        container: document.querySelector('#timeline'),
        events: events
      });

      setTimeout(function () {
        $anchorScroll();
      }, 100);
    });

  /* Filters */
  $scope.categories = Categorie.array().map(function (categorie) {
    categorie.filter = true;
    return categorie;
  });

  $scope.filterCategorie = function (value) {
    if (!value.categorie) {
      return true;
    }
    var categorie = $scope.categories.find(function (categorie) {
      return categorie.code === value.categorie;
    });
    return categorie ? categorie.filter : false;
  };

  $scope.selectFilter = function (code) {
    $scope.categories.forEach(function (categorie) {
      categorie.filter = (categorie.code === code);
    });
  };

  $scope.toggleFilter = function (categorie) {
    categorie.filter = !categorie.filter;
  };

  /* Views */
  $scope.selectedView = 'modeles';

  $scope.showView = function (view) {
    $scope.selectedView = view;
  };

  /* Pictures */
  $scope.backgroundImage = function (idDoc) {
    if (!idDoc) {
      return null;
    }
    return {
      'background-image': 'url(' + ImageManager.versionPath(idDoc) + ')'
    };
  };

  $scope.goToModele = function (modele) {
    window.location = "#/modele/" + modele.idModele;
  };

});