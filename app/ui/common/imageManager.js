app.service('ImageManager', function () {

  this.versionPath = function (id) {
    if (!id) {
      return null;
    }
    return 'img/version/' + Math.floor(parseInt(id, 10) / 1000) + '/' + id + '.jpg';
  };

  this.logoPath = function (idMarque) {
    return 'img/logo/' + idMarque + '.png';
  };

  // Initiales affichées quand une marque n'a pas de logo
  this.initials = function (nom) {
    return (nom || '').replace(/[^A-Za-zÀ-ÿ]/g, '').slice(0, 2).toUpperCase();
  };

});
