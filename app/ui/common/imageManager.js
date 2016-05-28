app.service('ImageManager', function () {

  this.versionPath = function (id) {
    return 'img/version/' + Math.floor(parseInt(id, 10) / 1000) + '/' + id + '.jpg';
  };

});