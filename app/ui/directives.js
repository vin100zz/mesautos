/* Directives */
angular.module('autoDirectives', [])

  // Image absente : marque le conteneur [data-img-host] (ou le parent) avec la classe is-missing
  .directive('maImgFallback', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var img = element[0];
        var host = function () {
          return (img.closest && img.closest('[data-img-host]')) || img.parentNode;
        };
        element.on('error', function () {
          var h = host();
          if (h) {
            h.classList.add('is-missing');
          }
        });
        element.on('load', function () {
          var h = host();
          if (h) {
            h.classList.remove('is-missing');
          }
        });
      }
    };
  })

  // Donne le focus à l'élément dès son affichage
  .directive('maAutofocus', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        $timeout(function () {
          element[0].focus();
          if (element[0].select) {
            element[0].select();
          }
        });
      }
    };
  }]);
