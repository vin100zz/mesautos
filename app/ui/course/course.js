app.controller('CourseCtrl', function ($scope, $routeParams, $location, $filter, Auto) {

  $scope.course = Auto.get({
      service: 'course',
      nom: $routeParams.course,
      annee: $routeParams.annee
    },
    function (course) {
      $scope.$parent.$root.pageTitle = " - " + $filter('courseFilter')(course.nom) + " (" + course.annee + ")";

      $scope.photos = course.photos.map(function (photo) {
        return {
          mini: course.path + '/mini/' + photo,
          plain: course.path + '/' + photo
        };
      });
    });

});