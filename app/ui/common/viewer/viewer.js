/*
 * Visionneuse plein écran.
 * Viewer.open(photos, index) avec photos = [{ src, alt, source, date, legende, links: [{label, url}], actions: [{icon, label, emblem, action}] }]
 */
app.service('Viewer', function () {

  var state = this.state = {
    open: false,
    photos: [],
    index: 0,
    info: false,
    menu: false
  };

  this.open = function (photos, index) {
    state.photos = photos || [];
    state.index = index || 0;
    state.info = false;
    state.menu = false;
    state.open = state.photos.length > 0;
  };

  this.close = function () {
    state.open = false;
    state.menu = false;
  };

});

app.directive('maViewer', function ($document, Viewer) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/ui/common/viewer/viewer.html',
    link: function (scope, element) {
      var v = scope.v = Viewer.state;
      var touchX = null;

      scope.cur = function () {
        return v.photos[v.index] || {};
      };

      scope.hasInfo = function () {
        var c = scope.cur();
        return !!(c.source || c.date || c.legende || (c.links && c.links.length));
      };

      scope.prev = function () {
        v.index = (v.index - 1 + v.photos.length) % v.photos.length;
        v.menu = false;
      };

      scope.next = function () {
        v.index = (v.index + 1) % v.photos.length;
        v.menu = false;
      };

      scope.close = Viewer.close;

      scope.run = function (action) {
        v.menu = false;
        action.action();
      };

      // Balayage horizontal sur mobile
      element.on('touchstart', function (event) {
        var t = event.touches && event.touches[0];
        touchX = t ? t.clientX : null;
      });
      element.on('touchend', function (event) {
        var t = event.changedTouches && event.changedTouches[0];
        if (touchX === null || !t || v.photos.length < 2) {
          return;
        }
        var dx = t.clientX - touchX;
        touchX = null;
        if (Math.abs(dx) > 50) {
          scope.$apply(dx > 0 ? scope.prev : scope.next);
        }
      });

      // Préchargement des photos voisines
      scope.$watch(function () {
        return v.open ? v.index : -1;
      }, function (index) {
        if (index < 0 || v.photos.length < 2) {
          return;
        }
        [index + 1, index - 1].forEach(function (i) {
          var p = v.photos[(i + v.photos.length) % v.photos.length];
          if (p && p.src) {
            new Image().src = p.src;
          }
        });
      });

      function onKey(event) {
        if (!v.open) {
          return;
        }
        if (event.key === 'Escape') {
          scope.$apply(v.menu ? function () { v.menu = false; } : Viewer.close);
        } else if (event.key === 'ArrowLeft' && v.photos.length > 1) {
          scope.$apply(scope.prev);
        } else if (event.key === 'ArrowRight' && v.photos.length > 1) {
          scope.$apply(scope.next);
        }
      }
      $document.on('keydown', onKey);
      scope.$on('$destroy', function () {
        $document.off('keydown', onKey);
      });
    }
  };
});
