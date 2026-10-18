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
  }])

  // En-tête de page collant : sa hauteur est exposée dans --sticky-h
  // pour les décalages (scroll-margin, colonnes collantes)
  .directive('maStickyHead', function () {
    var owner = null;

    return {
      restrict: 'A',
      link: function (scope, element) {
        var el = element[0];
        var root = document.documentElement;

        var publish = function () {
          owner = el;
          root.style.setProperty('--sticky-h', el.offsetHeight + 'px');
        };
        var observer = new ResizeObserver(publish);
        observer.observe(el);

        scope.$on('$destroy', function () {
          observer.disconnect();
          if (owner === el) {
            owner = null;
            root.style.removeProperty('--sticky-h');
          }
        });
      }
    };
  })

  // Marque (is-visible) les entrées [data-spy="id"] dont la cible est à l'écran, sous l'en-tête collant
  .directive('maScrollSpy', ['$window', function ($window) {
    var MIN = 24; // hauteur minimale visible pour compter

    return {
      restrict: 'A',
      link: function (scope, element) {
        var frame = null;

        var update = function () {
          frame = null;
          var head = element[0].closest('.sticky-head');
          var top = head ? head.getBoundingClientRect().bottom : 0;
          var bottom = $window.innerHeight;
          var items = element[0].querySelectorAll('[data-spy]');
          for (var i = 0; i < items.length; i++) {
            var target = document.getElementById(items[i].getAttribute('data-spy'));
            var rect = target ? target.getBoundingClientRect() : null;
            items[i].classList.toggle('is-visible', !!rect && rect.bottom > top + MIN && rect.top < bottom - MIN);
          }
        };
        var schedule = function () {
          if (!frame) {
            frame = $window.requestAnimationFrame(update);
          }
        };

        $window.addEventListener('scroll', schedule, { passive: true });
        $window.addEventListener('resize', schedule);
        // après chaque digest : filtres, tri, vue…
        scope.$watch(function () {
          schedule();
        });

        scope.$on('$destroy', function () {
          $window.removeEventListener('scroll', schedule);
          $window.removeEventListener('resize', schedule);
          $window.cancelAnimationFrame(frame);
        });
      }
    };
  }]);
