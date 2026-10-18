app.controller('CourseCtrl', function ($scope, $routeParams, $filter, Auto, Viewer) {

  $scope.nom = $routeParams.course;
  $scope.annee = $routeParams.annee;
  $scope.$parent.$root.pageTitle = " - " + $filter('courseFilter')($scope.nom) + " (" + $scope.annee + ")";

  Auto.get({
      service: 'course',
      nom: $routeParams.course,
      annee: $routeParams.annee
    },
    function (course) {
      $scope.photos = course.photos.map(function (photo, index) {
        var card = {
          mini: course.path + '/mini/' + photo,
          plain: course.path + '/' + photo,
          src: course.path + '/' + photo,
          alt: $filter('courseFilter')(course.nom) + ' ' + course.annee
        };
        card.open = function (event) {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
            return;
          }
          event.preventDefault();
          Viewer.open($scope.photos, index);
        };
        return card;
      });
    });

  // Années précédente et suivante de la même course
  Auto.query({}, function (res) {
    var annees = ((res.courses || {})[$scope.nom] || []).slice().sort(function (a, b) {
      return String(a).localeCompare(String(b), 'fr', { numeric: true });
    });
    var i = annees.indexOf($scope.annee);
    $scope.prev = i > 0 ? annees[i - 1] : null;
    $scope.next = i >= 0 && i < annees.length - 1 ? annees[i + 1] : null;
  });

});
