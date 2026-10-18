app.controller('CoursesCtrl', function ($scope, Auto) {

  $scope.$parent.$root.pageTitle = " - Courses";

  Auto.query({}, function (res) {
    $scope.courses = Object.keys(res.courses || {}).map(function (course) {
      return {
        nom: course,
        annees: (res.courses[course] || []).slice().sort(function (a, b) {
          return String(b).localeCompare(String(a), 'fr', { numeric: true });
        }).map(function (annee) {
          return {
            annee: annee,
            image: 'img/course/' + course + '/' + annee + '/1.jpg'
          };
        })
      };
    });
  });

});
