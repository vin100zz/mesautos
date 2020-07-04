app.controller('CoursesCtrl', function ($scope, Auto) {

  Auto.query({}, function (res) {
    $scope.courses = res.courses;
  });

  $scope.courseAnneeBackgroundImage = function (course, annee) {
    return {
      'background-image': 'url(img/course/' + course + '/' + annee + '/1.jpg)'
    };
  };

  $scope.goToCourseAnnee = function (course, annee) {
    window.location = '#/course/' + course + '/' + annee;
  };

});