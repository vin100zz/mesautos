app.controller('ModeleCtrl', function ($scope, $route, $routeParams, Auto) {

  Auto.get({
    service: 'modele',
    id: $routeParams.modeleId
  }, function (modele) {
    $scope.$parent.$root.pageTitle = " - " + modele.marque.nomMarque + " - " + modele.modele.nomModele;

    $scope.selectedVersion = modele.versions.find(function (version) {
      return version.idVersion === $routeParams.versionId;
    }) || modele.versions[0];

    $scope.anneeModeleCfg = {
      version: $scope.selectedVersion
    };

    $scope.modele = modele;
    $scope.modele.versions = $scope.modele.versions.map(function (version) {
      version.doc = version.docs[0];
      return version;
    });

    $scope.sidebarCfg = {
      marque: modele.marque
    };
  });


  $scope.getLegend = function () {
    var doc = $scope.version.docs[$scope.selectedVersion.idVersion];
    var legend = [];
    if (doc.source != '') legend.push(doc.source);
    if (doc.date != '') legend.push(doc.date);
    if (doc.legende != '') legend.push(doc.legende);
    return legend.join(' - ');
  };

  function getImage(idDocumentVersion) {
    return 'img/version/' + idDocumentVersion + '.jpg';
  };

  $scope.maximize = function (version) {
    $scope.selectedVersion = version;
    $scope.anneeModeleCfg.version = version;
    window.location = '#modele/' + $scope.modele.modele.idModele + '/' + version.idVersion;
  };

  // do not reload on hash change
  var lastRoute = $route.current;
  $scope.$on('$locationChangeSuccess', function (event) {
    $route.current = lastRoute;
  });

});