var app = angular.module('mesautos', ['ngResource', 'ngRoute', 'ngSanitize', 'ngAnimate', 'autoFilters', 'autoServices', 'autoDirectives', 'akoenig.deckgrid']);

/* Routing */
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
	when('/home', {
		templateUrl: 'app/ui/home/home.html',
		controller: 'HomeCtrl'
	}).
	when('/marque/:marqueId', {
		templateUrl: 'app/ui/marque/marque.html',
		controller: 'MarqueCtrl'
	}).
	when('/marque/:marqueId/:modeleId', {
		templateUrl: 'app/ui/marque/marque.html',
		controller: 'MarqueCtrl'
	}).
	when('/modele/:modeleId', {
		templateUrl: 'app/ui/modele/modele.html',
		controller: 'ModeleCtrl'
	}).
	when('/modele/:modeleId/:idGamme', {
		templateUrl: 'app/ui/modele/modele.html',
		controller: 'ModeleCtrl'
	}).
	when('/saisie/:action/:objet', {
		templateUrl: 'app/ui/saisie/saisie.html',
		controller: 'SaisieCtrl'
	}).
	when('/salon/:annee', {
		templateUrl: 'app/ui/salon/salon.html',
		controller: 'SalonCtrl'
	}).
	otherwise({
		redirectTo: '/home'
	});
}]);


/* Main */
app.controller('MainCtrl', function ($scope, $routeParams, Auto) {
	$scope.list = Auto.get({
		service: 'list'
	});

	$scope.show = false;

	$scope.showResults = function (evt) {
		$scope.show = $scope.searchText.length > 1;
		evt.stopPropagation();
	};
	$scope.hideResults = function () {
		$scope.show = false;
	};

	$scope.goToMarque = function (marque) {
		$scope.show = false;
		window.location = '#/marque/' + marque.idMarque;
	};
	$scope.goToModele = function (modele) {
		$scope.show = false;
		window.location = '#/marque/' + modele.idMarque + '#modele-' + modele.idModele;
	};
});