/* Préférences d'affichage (localStorage indisponible : valeurs par défaut) */
app.service('Storage', function () {

  this.get = function (key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

  this.set = function (key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  };

});
