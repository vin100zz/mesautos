/* Services */
angular.module('autoServices', []).
factory('Auto', function ($resource) {
  return $resource('app/server/:service.php', {}, {
    query: {
      method: 'GET',
      params: {
        'service': 'autos'
      }
    }
  });
});