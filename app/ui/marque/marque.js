app.controller('MarqueCtrl', function ($scope, $routeParams, $location, $anchorScroll, $http, Auto, Categorie) {

  $scope.marque = Auto.get({
      service: 'marque',
      id: $routeParams.marqueId
    },
    function (marque) {
      $scope.$parent.$root.pageTitle = " - " + marque.nomMarque;

      $scope.sidebar = [{
        link: '#/saisie/edit/marque?id=' + marque.idMarque,
        icon: 'edit',
        tooltip: 'Éditer ' + marque.nomMarque
      }, {
        link: '#/saisie/add/modele?id=' + marque.idMarque,
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

        modele.version = modele.versions[0];
        modele.categorieCfg = Categorie.cfg(modele.categorie);
        return modele;
      });

      $scope.sidebarCfg = {
        marque: marque,
        tpl: 'app/ui/marque/marque-sidebar.html'
      };

      // TODO
      /*setTimeout(function () {
        $anchorScroll();
      }, 100);*/

    });

  /* Catégories */
  $scope.categories = Categorie.array().map(function (categorie) {
    categorie.filter = true;
    return categorie;
  });

  $scope.filterCategorie = function (value) {
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


  /* Pictures */
  $scope.backgroundImage = function (version) {
    if (!version) {
      return null;
    }
    return {
      'background-image': 'url(' + version.img + ')'
    };
  }

  $scope.goToModele = function (modele) {
    window.location = "#/modele/" + modele.idModele;
  }

});