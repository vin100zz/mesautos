/* Routing */
angular.module('auto', ['autoFilters', 'autoServices', 'autoDirectives']).
config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
	when('', {
		templateUrl: 'app/ui/home/home.html',
		controller: HomeCtrl
	}).
	when('/marque/:marqueId', {
		templateUrl: 'app/ui/marque/marque.html',
		controller: MarqueCtrl
	}).
	when('/marque/:marqueId/:modeleId', {
		templateUrl: 'app/ui/marque/marque.html',
		controller: MarqueCtrl
	}).
	when('/modele/:versionId', {
		templateUrl: 'app/ui/modele/modele.html',
		controller: ModeleCtrl
	}).
	when('/saisie/:action/:objet', {
		templateUrl: 'app/ui/saisie/saisie.html',
		controller: SaisieCtrl
	}).
	otherwise({
		redirectTo: ''
	});
}]);


/* Main */
function MainCtrl($scope, $routeParams, Auto) {
	$scope.list = Auto.get({
		service: 'list'
	});

	$scope.show = false;

	$scope.showResults = function (evt) {
		$scope.show = $scope.searchText.length > 1;
		evt.stopPropagation();
	}
	$scope.hideResults = function () {
		$scope.show = false;
	}

	$scope.goToMarque = function (marque) {
		$scope.show = false;
		window.location = '#/marque/' + marque.idMarque;
	}
	$scope.goToModele = function (modele) {
		$scope.show = false;
		window.location = '#/marque/' + modele.idMarque + '#modele-' + modele.idModele;
	}
}