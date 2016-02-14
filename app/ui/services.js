/* Services */
angular.module('autoServices', ['ngResource']).
factory('Auto', function ($resource) {
	return $resource('app/server/:service.php', {}, {
		query: {
			method: 'GET',
			params: {
				'service': 'autos'
			},
			isArray: true
		}
	});
})