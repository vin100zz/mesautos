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
  });