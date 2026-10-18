app.service('Categorie', function () {

  // color : point / barre de chronologie ; tint + ink : pastille pastel
  var _cfg = {
    "COC": {
      label: "Concept Car",
      short: "Concept car",
      color: "#4F7FEA",
      tint: "#E1EAFF",
      ink: "#2F4FA8"
    },
    "REC": {
      label: "Voiture de Records",
      short: "Records",
      color: "#D9A521",
      tint: "#FBF0CF",
      ink: "#7A5A08"
    },
    "CPT": {
      label: "Voiture de Compétition",
      short: "Compétition",
      color: "#E5483D",
      tint: "#FFE1DE",
      ink: "#A12B22"
    },
    "PL": {
      label: "Poids Lourd",
      short: "Poids lourd",
      color: "#8C94A3",
      tint: "#E8EAEE",
      ink: "#4A5260"
    },
    "PRO": {
      label: "Prototype",
      short: "Prototype",
      color: "#E07A3F",
      tint: "#FDE7D8",
      ink: "#9A4A18"
    },
    "TOU": {
      label: "Voiture de Tourisme",
      short: "Tourisme",
      color: "#2FA877",
      tint: "#DDF3E8",
      ink: "#1E6B48"
    },
    "UTI": {
      label: "Utilitaire",
      short: "Utilitaire",
      color: "#8D63E6",
      tint: "#EDE4FF",
      ink: "#5B3BA6"
    },
    "VM": {
      label: "Véhicule Militaire",
      short: "Militaire",
      color: "#9C7F4E",
      tint: "#EFE8DA",
      ink: "#6B5733"
    }
  };

  var _defaultCfg = {
    label: "-",
    short: "—",
    color: "#8A857A",
    tint: "#EEE9DF",
    ink: "#5F5B52"
  };

  // Copies : chaque page peut y stocker son propre état de filtre
  this.array = function () {
    return Object.keys(_cfg).map(function (key) {
      return angular.extend({ code: key }, _cfg[key]);
    }).sort(function (item1, item2) {
      return item1.short.localeCompare(item2.short);
    });
  };

  this.cfg = function (code) {
    return _cfg[code] || _defaultCfg;
  };

  this.known = function (code) {
    return !!_cfg[code];
  };

});
