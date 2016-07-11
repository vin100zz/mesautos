app.service('Categorie', function () {

  var _cfg = {
    "COC": {
      label: "Concept Car",
      color: "blue"
    },
    "CPT": {
      label: "Voiture de Compétition",
      color: "red"
    },
    "PL": {
      label: "Poids Lourd",
      color: "#333"
    },
    "PRO": {
      label: "Prototype",
      color: "orange"
    },
    "TOU": {
      label: "Voiture de Tourisme",
      color: "green"
    },
    "UTI": {
      label: "Utilitaire",
      color: "purple"
    },
    "VM": {
      label: "Véhicule Militaire",
      color: "brown"
    }
  };

  var _defaultCfg = {
    label: "-",
    color: "#999"
  };

  this.array = function () {
    return Object.keys(_cfg).map(function (key) {
      var item = _cfg[key];
      item.code = key;
      return item;
    }).sort(function (item1, item2) {
      return item1.label.localeCompare(item2.label);
    });
  };

  this.cfg = function (code) {
    return _cfg[code] || _defaultCfg;
  };

});