function ModeleCtrl($scope, $routeParams, Auto) {
  $scope.modele = Auto.get({
    service: 'modele',
    id: $routeParams.versionId
  }, function (modele) {
    $scope.$parent.$root.pageTitle = " - " + modele.marque.nomMarque + " - " + modele.modele.nomModele;
    $scope.selected = modele.versions[0].docs[0].idDocumentVersion;
  });

  $scope.getLegend = function () {
    var doc = $scope.version.docs[$scope.selected];
    var legend = [];
    if (doc.source != '') legend.push(doc.source);
    if (doc.date != '') legend.push(doc.date);
    if (doc.legende != '') legend.push(doc.legende);
    return legend.join(' - ');
  }

  $scope.backgroundImage = function (idDocumentVersion) {
    return {
      'background-image': 'url(' + getImage(idDocumentVersion) + ')'
    };
  }

  var getImage = function (idDocumentVersion) {
    return 'img/version/' + idDocumentVersion + '.jpg';
  };

  $scope.maximize = function (idDocumentVersion) {
    $scope.selected = idDocumentVersion;
  }

  $scope.openInNewWindow = function () {
    window.open(getImage($scope.selected));
  }
}