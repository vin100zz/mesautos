/* Directives */
angular.module('autoDirectives', [])
  .directive('ngSorter', function () {
    return {
      templateUrl: 'app/ui/sorter.html',
      scope: {
        cfg: '=cfg'
      },
      controller: function ($scope) {

        $scope.$watch('allData', function (newValue) {
          if (newValue !== undefined) {
            console.log(scope.allData);
          }
        });

        $scope.selected = null;

        $scope.toggle = function (item) {
          $scope.selected = $scope.cfg.idFn(item);
        }

        var move = function (posFn) {
          if ($scope.selected) {
            for (var index = 0; index < $scope.cfg.list.length; ++index) {
              if ($scope.cfg.idFn($scope.cfg.list[index]) === $scope.selected) {
                break;
              }
            }
            var newPos = posFn(index);
            if (newPos >= 0 && newPos < $scope.cfg.list.length) {
              var spliced = $scope.cfg.list.splice(index, 1);
              $scope.cfg.list.splice(newPos, 0, spliced[0]);
            }
          }
        }

        $scope.moveUp = function (item) {
          move.call(this, function (index) {
            return index - 1;
          })
        }

        $scope.moveDown = function (item) {
          move.call(this, function (index) {
            return index + 1;
          })
        }

      }
    };
  })

  // Directive lazyBg : charge l'image de fond seulement quand l'élément entre en viewport
  .directive('lazyBg', ['$window', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var src = null;
        // Support des interpolations : lazy-bg="{{ 'img/logo/' + marque.idMarque + '.png' }}"
        attrs.$observe('lazyBg', function (value) {
          src = value;
        });

        var setBg = function (url) {
          if (!url) return;
          element[0].style.backgroundImage = 'url(' + url + ')';
        };

        // Si IntersectionObserver disponible, observer l'élément
        if ('IntersectionObserver' in $window) {
          var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                setBg(src);
                observer.unobserve(entry.target);
              }
            });
          });
          observer.observe(element[0]);

          // Nettoyage
          scope.$on('$destroy', function () {
            try { observer.disconnect(); } catch (e) {}
          });
        } else {
          // Fallback : charger immédiatement
          setBg(src);
        }
      }
    };
  }]);
