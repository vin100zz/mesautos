app.service('Pays', function ($filter) {

  var nomPays = $filter('nomPays');

  this.code = function (pays) {
    return (pays || '').toUpperCase();
  };

  this.nom = function (pays) {
    return nomPays(this.code(pays));
  };

  // Les fichiers de img/pays sont en majuscules, sauf Egypt.png
  this.flag = function (pays) {
    var code = this.code(pays);
    if (!code) {
      return null;
    }
    return 'img/pays/' + (code === 'EGYPT' ? 'Egypt' : code) + '.png';
  };

});
