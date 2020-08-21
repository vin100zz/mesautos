<?php

include_once "db.php";

$idModele = $_REQUEST["id"];

// SQL
$marque = DBAccess::singleRow
(
	"SELECT * FROM marque WHERE idMarque=(SELECT idMarque FROM modele WHERE idModele='$idModele')"
);
$modele = DBAccess::singleRow
(
	"SELECT * FROM modele WHERE idModele='$idModele'"
);
$anneeModeles = DBAccess::query
(
	"SELECT * FROM anneeModele WHERE idModele='$idModele' ORDER BY annee"
);

foreach ($anneeModeles as $key => $anneeModele) {
  $anneeModeles[$key]['gammes'] = DBAccess::query
  (
    "SELECT * FROM gamme WHERE idAnneeModele=" . $anneeModele['idAnneeModele']
  );

  foreach ($anneeModeles[$key]['gammes'] as $key2 => $gamme) {

    $idGamme = $anneeModeles[$key]['gammes'][$key2]['idGamme'];

    $anneeModeles[$key]['gammes'][$key2]['docs'] = DBAccess::query
    (
      "SELECT * FROM documentGamme WHERE idGamme='$idGamme' ORDER BY ordre, idDocumentGamme"
    );

    foreach ($anneeModeles[$key]['gammes'][$key2]['docs'] as $key3 => $doc) {
      $anneeModeles[$key]['gammes'][$key2]['docs'][$key3]['liens'] = DBAccess::query
      (
        "SELECT * FROM lienGamme WHERE idDocumentGamme='" . $anneeModeles[$key]['gammes'][$key2]['docs'][$key3]['idDocumentGamme'] . "' ORDER BY ordre, idLienGamme"
      );
    }

    $text = "../../histo/gamme/$idGamme.txt";

    if(is_file($text) && $desc = implode(file($text)))
    {
      $anneeModeles[$key]['gammes'][$key2]['histo'] = $desc;
    }
  }

}

$response = array();
$response['marque'] = $marque;
$response['modele'] = $modele;
$response['anneeModeles'] = $anneeModeles;

print json_encode($response, JSON_PRETTY_PRINT);


?>
