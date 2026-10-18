var app = angular.module('mesautos', ['ngResource', 'ngRoute', 'ngSanitize', 'ngAnimate', 'autoFilters', 'autoServices', 'autoDirectives', 'akoenig.deckgrid']);

/* Routing */
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
	when('/marques', {
		templateUrl: 'app/ui/home/marques.html',
		controller: 'MarquesCtrl',
		section: 'marques'
	}).
	when('/salons', {
		templateUrl: 'app/ui/home/salons.html',
		controller: 'SalonsCtrl',
		section: 'salons'
	}).
	when('/annees', {
		templateUrl: 'app/ui/home/annees.html',
		controller: 'AnneesCtrl',
		section: 'nouveautes'
	}).
	when('/courses', {
		templateUrl: 'app/ui/home/courses.html',
		controller: 'CoursesCtrl',
		section: 'courses'
	}).
	when('/miniatures', {
		templateUrl: 'app/ui/home/miniatures.html',
		controller: 'MiniaturesCtrl',
		section: 'miniatures'
	}).
	when('/marque/:marqueId', {
		templateUrl: 'app/ui/marque/marque.html',
		controller: 'MarqueCtrl',
		section: 'marques',
		reloadOnSearch: false
	}).
	when('/marque/:marqueId/:modeleId', {
		templateUrl: 'app/ui/marque/marque.html',
		controller: 'MarqueCtrl',
		section: 'marques',
		reloadOnSearch: false
	}).
	when('/modele/:modeleId', {
		templateUrl: 'app/ui/modele/modele.html',
		controller: 'ModeleCtrl',
		section: 'marques'
	}).
	when('/modele/:modeleId/:idGamme', {
		templateUrl: 'app/ui/modele/modele.html',
		controller: 'ModeleCtrl',
		section: 'marques'
	}).
	when('/salon/:annee', {
		templateUrl: 'app/ui/salon/salon.html',
		controller: 'SalonCtrl',
		section: 'salons'
	}).
	when('/annee/:annee', {
		templateUrl: 'app/ui/annee/annee.html',
		controller: 'AnneeCtrl',
		section: 'nouveautes'
	}).
	when('/course/:course/:annee', {
		templateUrl: 'app/ui/course/course.html',
		controller: 'CourseCtrl',
		section: 'courses'
	}).
	otherwise({
		redirectTo: '/marques'
	});
}]);

app.run(function ($rootScope, Saisie, Viewer, Search) {
	$rootScope.openSaisie = Saisie.open;

	$rootScope.$on('$routeChangeStart', function () {
		Viewer.close();
		Search.close();
	});

	$rootScope.$on('$routeChangeSuccess', function (event, current) {
		var route = current && current.$$route;
		var section = route ? route.section : null;
		if (current && current.params && current.params.marqueId === '1129') {
			section = 'perso';
		}
		$rootScope.section = section;
	});
});


/* Main */
app.controller('MainCtrl', function ($scope, Search, Viewer, Saisie) {
	$scope.openSearch = Search.open;

	$scope.locked = function () {
		return Search.state.open || Viewer.state.open || Saisie.state.open;
	};
});
