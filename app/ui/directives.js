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

  // En-tête de page collant : condensé (is-stuck) une fois la page défilée ;
  // sa hauteur est exposée dans --sticky-h pour les décalages (scroll-margin, colonnes collantes)
  .directive('maStickyHead', ['$window', function ($window) {
    var CONDENSE = 60; // défilement au-delà du point d'accroche avant de condenser
    var EXPAND = 2;    // écart d'hystérésis : le changement de hauteur ne doit pas faire osciller
    var owner = null;

    return {
      restrict: 'A',
      link: function (scope, element) {
        var el = element[0];
        var root = document.documentElement;
        var sentinel = document.createElement('div');
        var stuck = false;
        var frame = null;

        // repère placé juste avant l'en-tête : sa position ne dépend pas de la hauteur de l'en-tête
        sentinel.className = 'sticky-sentinel';
        el.parentNode.insertBefore(sentinel, el);

        var update = function () {
          frame = null;
          var header = document.querySelector('.site-header');
          var past = (header ? header.getBoundingClientRect().bottom : 0) - sentinel.getBoundingClientRect().top;
          var next = stuck ? past > EXPAND : past > CONDENSE;
          if (next !== stuck) {
            stuck = next;
            el.classList.toggle('is-stuck', stuck);
          }
        };
        var schedule = function () {
          if (!frame) {
            frame = $window.requestAnimationFrame(update);
          }
        };

        var publish = function () {
          owner = el;
          root.style.setProperty('--sticky-h', el.offsetHeight + 'px');
        };
        var observer = new ResizeObserver(publish);
        observer.observe(el);

        $window.addEventListener('scroll', schedule, { passive: true });
        schedule();

        scope.$on('$destroy', function () {
          $window.removeEventListener('scroll', schedule);
          $window.cancelAnimationFrame(frame);
          observer.disconnect();
          sentinel.remove();
          if (owner === el) {
            owner = null;
            root.style.removeProperty('--sticky-h');
          }
        });
      }
    };
  }])

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
