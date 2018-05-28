/* Filters */
angular.module('autoFilters', []).filter('categorieType', function () {
    return function (input) {
      input = input.toUpperCase();

      // catégories des modèles
	    if (input == "TOU") return "Voiture de Tourisme";
	    if (input == "PRO") return "Prototype";
	    if (input == "COC") return "Concept Car"; 
      if (input == "CPT") return "Voiture de Compétition";
	    if (input == "REC") return "Voiture de Records";
      if (input == "PL") return "Poids Lourd";     
      if (input == "UTI") return "Utilitaire";
      if (input == "VM") return "Véhicule Militaire";

      // types des versions
      if (input == "BTE") return "Berlinette";
      if (input == "BD") return "Berline découvrable";
      if (input == "UL") return "Utilitaire Léger";
      if (input == "PL") return "Poids Lourd";
      if (input == "BER") return "Berline";
      if (input == "COU") return "Coupé";
      if (input == "CAB") return "Cabriolet";
      if (input == "CC") return "Coupé-Cabriolet";
      if (input == "BRK") return "Break";
      if (input == "SPO") return "Sport";
      if (input == "GP") return "Grand Prix";
      if (input == "F1") return "Formule 1";
      if (input == "RAL") return "Rallye";
      if (input == "GT") return "Grand Tourisme";
      if (input == "GAM") return "Gamme";
      if (input == "CV") return "Convertible";
      if (input == "CL") return "Cabrio-limousine";
      if (input == "LIM") return "Limousine";
      if (input == "COA") return "Coach";
      if (input == "MON") return "Monospace";
      if (input == "ROA") return "Roadster";
      if (input == "CPT") return "Compétition";
      if (input == "VAV") return "Vis-à-Vis";
      if (input == "LAN") return "Landaulet";
      if (input == "PHA") return "Phaéton";
      if (input == "QUA") return "Quadricycle";
      if (input == "2PL") return "Deux Places";
      if (input == "VIC") return "Victoria";
      if (input == "VAN") return "Van";
      if (input == "MOT") return "Moto";
      if (input == "VOI") return "Voiture de ville";
      if (input == "VT") return "Voiturette";
      if (input == "TOR") return "Torpédo";
      if (input == "PIC") return "Pick-Up";
      if (input == "FOU") return "Fourgonnette";
      if (input == "FAM") return "Familiale";
      if (input == "CON") return "Concept car";
      if (input == "DOU") return "Double Phaéton";
      if (input == "AMB") return "Ambulance";
      return input;
    };
  })
  .filter('searchMarque', function () {
    return function (items, searchText) {
      if (!searchText) {
        return items;
      }
      searchText = searchText.toLowerCase();
      var filtered = [];
      angular.forEach(items, function (item) {
        if (item.nomMarque.toLowerCase().indexOf(searchText) >= 0) {
          filtered.push(item);
        }
      });
      return filtered;
    }
  })
  .filter('searchModele', function () {
    return function (items, searchText) {
      if (!searchText) {
        return items;
      }
      searchText = searchText.toLowerCase();
      var filtered = [];
      angular.forEach(items, function (item) {
        if (item.nomModele.toLowerCase().indexOf(searchText) >= 0) {
          filtered.push(item);
        }
      });
      return filtered;
    }
  });